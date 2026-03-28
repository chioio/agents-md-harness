#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const VERSION = "0.1.0";
const ROOT = path.resolve(__dirname, "..");
const TEMPLATE_ROOT = path.join(ROOT, "template");
const MANIFEST_FILE = ".agents-md-harness-manifest.json";
const LEGACY_REMOVED_FILES = ["_harness/skills/harness/audit.md"];

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

function removePath(targetPath) {
  if (!fs.existsSync(targetPath)) {
    return;
  }

  const stats = fs.lstatSync(targetPath);
  if (stats.isDirectory()) {
    fs.rmSync(targetPath, { recursive: true, force: true });
    return;
  }

  fs.unlinkSync(targetPath);
}

function removeEmptyParentDirs(rootDir, targetPath) {
  let current = path.dirname(targetPath);
  const resolvedRoot = path.resolve(rootDir);

  while (current.startsWith(resolvedRoot) && current !== resolvedRoot) {
    if (!fs.existsSync(current)) {
      current = path.dirname(current);
      continue;
    }

    if (fs.readdirSync(current).length > 0) {
      break;
    }

    fs.rmdirSync(current);
    current = path.dirname(current);
  }
}

function listTemplateFiles(srcDir, baseDir = srcDir) {
  const files = [];

  for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
    const srcPath = path.join(srcDir, entry.name);

    if (entry.isDirectory()) {
      files.push(...listTemplateFiles(srcPath, baseDir));
      continue;
    }

    files.push(path.relative(baseDir, srcPath));
  }

  return files.sort();
}

function readManifest(targetDir) {
  const manifestPath = path.join(targetDir, MANIFEST_FILE);
  if (!fs.existsSync(manifestPath)) {
    return null;
  }

  return JSON.parse(fs.readFileSync(manifestPath, "utf8"));
}

function writeManifest(targetDir, files) {
  const manifestPath = path.join(targetDir, MANIFEST_FILE);
  const payload = {
    version: VERSION,
    generatedAt: new Date().toISOString(),
    files,
  };

  fs.writeFileSync(manifestPath, `${JSON.stringify(payload, null, 2)}\n`);
}

function pruneManagedFiles(targetDir, previousManifest, currentFiles) {
  if (!previousManifest || !Array.isArray(previousManifest.files)) {
    return;
  }

  const currentSet = new Set(currentFiles);
  for (const relativePath of previousManifest.files) {
    if (currentSet.has(relativePath)) {
      continue;
    }

    const targetPath = path.join(targetDir, relativePath);
    removePath(targetPath);
    removeEmptyParentDirs(targetDir, targetPath);
  }
}

function pruneLegacyRemovedFiles(targetDir, currentFiles) {
  const currentSet = new Set(currentFiles);

  for (const relativePath of LEGACY_REMOVED_FILES) {
    if (currentSet.has(relativePath)) {
      continue;
    }

    const targetPath = path.join(targetDir, relativePath);
    removePath(targetPath);
    removeEmptyParentDirs(targetDir, targetPath);
  }
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
  const templateFiles = listTemplateFiles(TEMPLATE_ROOT);
  const previousManifest = force ? readManifest(targetDir) : null;
  if (force) {
    pruneManagedFiles(targetDir, previousManifest, templateFiles);
    pruneLegacyRemovedFiles(targetDir, templateFiles);
  }
  copyDir(TEMPLATE_ROOT, targetDir, force);
  writeManifest(targetDir, templateFiles);
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
