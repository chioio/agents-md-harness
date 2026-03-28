const assert = require("assert");
const fs = require("fs");
const os = require("os");
const path = require("path");
const childProcess = require("child_process");

module.exports = function runForceCleanupTests(ctx) {
  const { test } = ctx;

  test("setup --force prunes stale managed files from the previous manifest", () => {
    const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "agents-md-harness-force-"));
    const target = path.join(tempRoot, "fixture");
    fs.mkdirSync(path.join(target, "_harness", "skills", "harness"), { recursive: true });

    fs.writeFileSync(
      path.join(target, ".agents-md-harness-manifest.json"),
      `${JSON.stringify(
        {
          version: "0.0.0",
          files: ["_harness/skills/harness/audit.md"],
        },
        null,
        2,
      )}\n`,
    );
    fs.writeFileSync(path.join(target, "_harness", "skills", "harness", "audit.md"), "# stale\n");

    childProcess.execFileSync(
      process.execPath,
      ["./bin/agents-md-harness.js", "setup", target, "--force"],
      { cwd: ctx.root },
    );

    assert.equal(
      fs.existsSync(path.join(target, "_harness", "skills", "harness", "audit.md")),
      false,
      "stale managed file should be removed during force setup",
    );
    assert.equal(
      fs.existsSync(path.join(target, "_harness", "skills", "harness", "SKILL.md")),
      true,
      "new managed file should exist after force setup",
    );

    const manifest = JSON.parse(
      fs.readFileSync(path.join(target, ".agents-md-harness-manifest.json"), "utf8"),
    );
    assert.ok(
      manifest.files.includes("_harness/skills/harness/SKILL.md"),
      "manifest should be updated to the current template file set",
    );
  });
};
