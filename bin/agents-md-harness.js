#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const VERSION = "0.1.0";
const ROOT = path.resolve(__dirname, "..");
const TEMPLATE_ROOT = path.join(ROOT, "template");

function printHelp() {
  console.log(`agents-md-harness v${VERSION}

Usage:
  agents-md-harness setup [targetDir] [--force]
  agents-md-harness init [targetDir] [--force]   # compatibility alias
  agents-md-harness --help

Commands:
  setup      Initialize an AGENTS.md-harness template into targetDir
  init       Compatibility alias for setup

Options:
  --force    Overwrite existing files in the target directory
  -h, --help Show help
`);
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function copyDir(srcDir, destDir, force) {
  ensureDir(destDir);

  for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath, force);
      continue;
    }

    if (fs.existsSync(destPath) && !force) {
      throw new Error(`Refusing to overwrite existing file: ${destPath}`);
    }

    fs.copyFileSync(srcPath, destPath);
  }
}

function runInit(targetArg, force) {
  const targetDir = path.resolve(process.cwd(), targetArg || ".");
  ensureDir(targetDir);
  copyDir(TEMPLATE_ROOT, targetDir, force);
  console.log(`✓ Initialized AGENTS.md-harness template into ${targetDir}

Next steps:
1. cd ${path.relative(process.cwd(), targetDir) || "."}
2. Ask your AI agent: "Help me setup the harness"
3. The agent will guide you through a conversation to generate customized harness files

The harness files will be created in _harness/ based on your project needs.
`);
}

function main(argv) {
  const args = argv.slice(2);
  const help = args.includes("--help") || args.includes("-h");

  if (help || args.length === 0) {
    printHelp();
    return;
  }

  const command = args[0];

  if (command !== "setup" && command !== "init") {
    console.error(`Unknown command: ${command}`);
    printHelp();
    process.exitCode = 1;
    return;
  }

  const force = args.includes("--force");
  const targetArg = args.find((arg, index) => index > 0 && !arg.startsWith("-")) || ".";

  try {
    runInit(targetArg, force);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

main(process.argv);
