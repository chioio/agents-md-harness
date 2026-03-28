const { root, read, exists } = require("./helpers");
const runStructureTests = require("./cases/structure.test");
const runForceCleanupTests = require("./cases/force-cleanup.test");

let failed = false;

function test(name, fn) {
  try {
    fn();
    console.log(`✓ ${name}`);
  } catch (error) {
    failed = true;
    console.error(`✗ ${name}`);
    console.error(error.message);
    process.exitCode = 1;
  }
}

runStructureTests({ root, read, exists, test });
runForceCleanupTests({ root, read, exists, test });

if (!failed) {
  console.log("\nHarness structure tests passed.");
}
