const fs = require("fs");
const path = require("path");
const assert = require("assert");

const root = process.cwd();

function read(rel) {
  return fs.readFileSync(path.join(root, rel), "utf8");
}

function exists(rel) {
  return fs.existsSync(path.join(root, rel));
}

function test(name, fn) {
  try {
    fn();
    console.log(`✓ ${name}`);
  } catch (error) {
    console.error(`✗ ${name}`);
    console.error(error.message);
    process.exitCode = 1;
  }
}

function expectFrontmatter(rel) {
  const content = read(rel);
  assert.ok(content.startsWith("---\n"), `${rel} must start with frontmatter`);
}

const frontend = "samples/fe-todo-app";
const backend = "samples/be-todo-app";

test("frontend sample has a TanStack React app structure", () => {
  [
    `${frontend}/package.json`,
    `${frontend}/index.html`,
    `${frontend}/src/main.tsx`,
    `${frontend}/src/app.tsx`,
    `${frontend}/src/components/todo-app.tsx`,
    `${frontend}/src/api/todos.ts`,
    `${frontend}/_harness/readme.md`,
  ].forEach((rel) => assert.ok(exists(rel), `missing ${rel}`));

  const pkg = JSON.parse(read(`${frontend}/package.json`));
  assert.equal(
    pkg.dependencies["@tanstack/react-query"] !== undefined,
    true,
    "frontend sample must include @tanstack/react-query",
  );
  assert.equal(pkg.dependencies.react !== undefined, true, "frontend sample must include react");
});

test("backend sample has a Go service structure", () => {
  [
    `${backend}/go.mod`,
    `${backend}/cmd/api/main.go`,
    `${backend}/internal/todo/model.go`,
    `${backend}/internal/todo/service.go`,
    `${backend}/internal/httpapi/router.go`,
    `${backend}/_harness/readme.md`,
  ].forEach((rel) => assert.ok(exists(rel), `missing ${rel}`));

  const goMod = read(`${backend}/go.mod`);
  assert.ok(
    goMod.includes("module github.com/chioio/agents-md-harness/samples/be-todo-app"),
    "backend sample must declare go module",
  );
});

test("frontend harness core files have frontmatter", () => {
  [
    `${frontend}/AGENTS.md`,
    `${frontend}/_harness/readme.md`,
    `${frontend}/_harness/catalog.md`,
    `${frontend}/_harness/routing.md`,
    `${frontend}/_harness/rules.md`,
    `${frontend}/_harness/workflow.md`,
    `${frontend}/_harness/memory/project.md`,
  ].forEach(expectFrontmatter);
});

test("backend harness core files have frontmatter", () => {
  [
    `${backend}/AGENTS.md`,
    `${backend}/_harness/readme.md`,
    `${backend}/_harness/catalog.md`,
    `${backend}/_harness/routing.md`,
    `${backend}/_harness/rules.md`,
    `${backend}/_harness/workflow.md`,
    `${backend}/_harness/memory/project.md`,
  ].forEach(expectFrontmatter);
});

test("sample harness docs mention the correct app types", () => {
  assert.ok(
    read(`${frontend}/AGENTS.md`).includes("TanStack React application"),
    "frontend AGENTS should mention TanStack React",
  );
  assert.ok(
    read(`${backend}/AGENTS.md`).includes("Go service"),
    "backend AGENTS should mention Go service",
  );
  assert.ok(
    read(`${frontend}/_harness/catalog.md`).includes("src/components/"),
    "frontend catalog should mention src/components",
  );
  assert.ok(
    read(`${backend}/_harness/catalog.md`).includes("internal/httpapi/"),
    "backend catalog should mention internal/httpapi",
  );
});

if (!process.exitCode) {
  console.log("\nHarness fixture tests passed.");
}
