#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

const REPO_ROOT = path.resolve(__dirname, "..", "..");
const TASKS_FILE = path.join(__dirname, "tasks.json");
const DEFAULT_OUTPUT_DIR = path.join(REPO_ROOT, ".tmp", "runtime-eval");
const DEFAULT_SAMPLE_DIR = path.join(REPO_ROOT, "samples", "todo-app");
const DEFAULT_TIMEOUT_MS = 5 * 60 * 1000;
const FIRST_RESPONSE_ONLY_SUFFIX = [
  "",
  "只做第一轮响应：",
  "- 判断任务类型",
  "- 说明最小必要 harness 文档",
  "- 说明是否需要确认",
  "- 说明 memory 处理建议",
  "- 不要修改文件",
  "- 回答完就结束",
].join("\n");

function printHelp() {
  console.log(`Run a safer Codex fresh-session runtime evaluation.

Usage:
  node ./tests/runtime/run-codex-eval.js <taskId> [--timeout-ms <ms>]
  node ./tests/runtime/run-codex-eval.js <taskId> --first-response-only [--timeout-ms <ms>]
  node ./tests/runtime/run-codex-eval.js --prompt <text> --label <name> [--timeout-ms <ms>]
  pnpm test:runtime:codex -- <taskId> [--first-response-only]

Options:
  --task <taskId>       Task id from tests/runtime/tasks.json
  --prompt <text>       Raw prompt to send to codex exec
  --label <name>        Output file label for raw prompts
  --first-response-only Stop after the first response instead of letting the inner run keep implementing
  --timeout-ms <ms>     Kill only the spawned child after the timeout
  --output-dir <dir>    Directory for event logs and final message files
  --codex-arg <arg>     Extra argument forwarded to codex exec (repeatable)
  -h, --help            Show help

Notes:
  - This wrapper always enables --json so progress stays visible.
  - It also writes -o final output, but does not treat a missing final file as a hang while the run is still active.
  - Cleanup is targeted to the spawned child process only; it never uses killall.`);
}

function fail(message) {
  console.error(message);
  process.exit(1);
}

function sanitizeLabel(input) {
  return input.replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/^-+|-+$/g, "") || "runtime-eval";
}

function loadTasks() {
  return JSON.parse(fs.readFileSync(TASKS_FILE, "utf8"));
}

function parseArgs(argv) {
  const args = argv.slice(2);
  const parsed = {
    codexArgs: [],
    outputDir: DEFAULT_OUTPUT_DIR,
    timeoutMs: DEFAULT_TIMEOUT_MS,
  };

  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];

    if (arg === "-h" || arg === "--help") {
      parsed.help = true;
      continue;
    }

    if (arg === "--") {
      continue;
    }

    if (arg === "--task") {
      parsed.taskId = args[++i];
      continue;
    }

    if (arg === "--prompt") {
      parsed.prompt = args[++i];
      continue;
    }

    if (arg === "--label") {
      parsed.label = args[++i];
      continue;
    }

    if (arg === "--first-response-only") {
      parsed.firstResponseOnly = true;
      continue;
    }

    if (arg === "--timeout-ms") {
      const value = Number(args[++i]);
      if (!Number.isFinite(value) || value <= 0) {
        fail("`--timeout-ms` must be a positive number.");
      }
      parsed.timeoutMs = value;
      continue;
    }

    if (arg === "--output-dir") {
      parsed.outputDir = path.resolve(REPO_ROOT, args[++i]);
      continue;
    }

    if (arg === "--codex-arg") {
      const value = args[++i];
      if (!value) {
        fail("`--codex-arg` requires a value.");
      }
      parsed.codexArgs.push(value);
      continue;
    }

    if (arg.startsWith("-")) {
      fail(`Unknown option: ${arg}`);
    }

    if (!parsed.taskId && !parsed.prompt) {
      parsed.taskId = arg;
      continue;
    }

    fail(`Unexpected argument: ${arg}`);
  }

  return parsed;
}

function resolvePrompt(parsed) {
  if (parsed.prompt) {
    return {
      label: sanitizeLabel(parsed.label || `custom-${Date.now()}`),
      prompt: parsed.firstResponseOnly
        ? `${parsed.prompt}${FIRST_RESPONSE_ONLY_SUFFIX}`
        : parsed.prompt,
    };
  }

  if (!parsed.taskId) {
    fail("Provide a task id or `--prompt`.");
  }

  const tasks = loadTasks();
  const task = tasks.find((entry) => entry.id === parsed.taskId);

  if (!task) {
    const known = tasks
      .map((entry) => entry.id)
      .sort()
      .join("\n");
    fail(`Unknown task id: ${parsed.taskId}\n\nKnown task ids:\n${known}`);
  }

  return {
    label: sanitizeLabel(task.id),
    prompt: parsed.firstResponseOnly ? `${task.task}${FIRST_RESPONSE_ONLY_SUFFIX}` : task.task,
  };
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function main() {
  const parsed = parseArgs(process.argv);

  if (parsed.help) {
    printHelp();
    return;
  }

  const { label, prompt } = resolvePrompt(parsed);
  ensureDir(parsed.outputDir);

  const eventsPath = path.join(parsed.outputDir, `${label}.events.jsonl`);
  const finalPath = path.join(parsed.outputDir, `${label}.last.md`);
  const codexArgs = [
    "exec",
    "--ephemeral",
    "--sandbox",
    "read-only",
    "--json",
    "-C",
    DEFAULT_SAMPLE_DIR,
    "-o",
    finalPath,
    ...parsed.codexArgs,
    prompt,
  ];
  const childEnv = {
    ...process.env,
    OTEL_SDK_DISABLED: process.env.OTEL_SDK_DISABLED || "true",
    OTEL_TRACES_EXPORTER: process.env.OTEL_TRACES_EXPORTER || "none",
    OTEL_METRICS_EXPORTER: process.env.OTEL_METRICS_EXPORTER || "none",
    OTEL_LOGS_EXPORTER: process.env.OTEL_LOGS_EXPORTER || "none",
  };

  const eventsStream = fs.createWriteStream(eventsPath, { flags: "w" });
  const child = spawn("codex", codexArgs, {
    cwd: REPO_ROOT,
    stdio: ["ignore", "pipe", "pipe"],
    env: childEnv,
  });

  let exited = false;
  let timedOut = false;

  function writeChunk(chunk, target) {
    target.write(chunk);
    eventsStream.write(chunk);
  }

  function stopChild(reason, signal) {
    if (exited) {
      return;
    }

    console.error(`[runtime-eval] ${reason}; sending ${signal} to child pid ${child.pid}`);
    child.kill(signal);
  }

  const timeout = setTimeout(() => {
    timedOut = true;
    stopChild(`timeout after ${parsed.timeoutMs}ms`, "SIGINT");

    setTimeout(() => {
      if (!exited) {
        stopChild("child did not exit after SIGINT", "SIGTERM");
      }
    }, 5000).unref();
  }, parsed.timeoutMs);

  process.on("SIGINT", () => {
    stopChild("received SIGINT", "SIGINT");
  });

  process.on("SIGTERM", () => {
    stopChild("received SIGTERM", "SIGTERM");
  });

  console.error(`[runtime-eval] task=${label}`);
  console.error(`[runtime-eval] events=${eventsPath}`);
  console.error(`[runtime-eval] final=${finalPath}`);

  child.stdout.on("data", (chunk) => writeChunk(chunk, process.stdout));
  child.stderr.on("data", (chunk) => writeChunk(chunk, process.stderr));

  child.on("error", (error) => {
    clearTimeout(timeout);
    eventsStream.end();
    fail(`Failed to start codex exec: ${error.message}`);
  });

  child.on("close", (code, signal) => {
    exited = true;
    clearTimeout(timeout);
    eventsStream.end();

    if (!fs.existsSync(finalPath)) {
      console.error("[runtime-eval] final message file was not written.");
    }

    if (signal) {
      console.error(`[runtime-eval] child exited from signal ${signal}.`);
      process.exitCode = 1;
      return;
    }

    if (timedOut) {
      console.error("[runtime-eval] run timed out before completion.");
      process.exitCode = 1;
      return;
    }

    process.exitCode = code || 0;
  });
}

main();
