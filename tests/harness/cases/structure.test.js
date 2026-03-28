const assert = require("assert");

module.exports = function runStructureTests(ctx) {
  const { test, exists, read } = ctx;
  const sample = "samples/todo-app";
  const fe = `${sample}/fe`;
  const be = `${sample}/be`;

  test("full-stack sample contains one shared harness", () => {
    [
      `${sample}/AGENTS.md`,
      `${sample}/_harness/readme.md`,
      `${sample}/_harness/catalog.md`,
      `${sample}/_harness/routing.md`,
      `${sample}/_harness/rules.md`,
      `${sample}/_harness/workflow.md`,
      `${sample}/_harness/memory/project.md`,
    ].forEach((rel) => assert.ok(exists(rel), `missing ${rel}`));

    assert.equal(exists(`${fe}/AGENTS.md`), false, "fe should not have its own AGENTS.md");
    assert.equal(exists(`${be}/AGENTS.md`), false, "be should not have its own AGENTS.md");
    assert.equal(exists(`${fe}/_harness`), false, "fe should not have its own _harness");
    assert.equal(exists(`${be}/_harness`), false, "be should not have its own _harness");
  });

  test("shared harness support directories exist", () => {
    [
      `${sample}/_harness/.setup/FLOW.md`,
      `${sample}/_harness/.setup/PROMPT.md`,
      `${sample}/_harness/gc/flow.md`,
      `${sample}/_harness/gc/policy.md`,
      `${sample}/_harness/gc/readme.md`,
      `${sample}/_harness/skills/readme.md`,
      `${sample}/_harness/skills/template.md`,
      `${sample}/_harness/skills/harness/SKILL.md`,
      `${sample}/_harness/skills/harness/audit.py`,
      `${sample}/_harness/skills/harness/token_audit.py`,
      `${sample}/_harness/memory/agents/.gitkeep`,
    ].forEach((rel) => assert.ok(exists(rel), `missing ${rel}`));
  });

  test("fe app has a TanStack React structure", () => {
    [
      `${fe}/package.json`,
      `${fe}/index.html`,
      `${fe}/src/main.tsx`,
      `${fe}/src/app.tsx`,
      `${fe}/src/router.tsx`,
      `${fe}/src/routes/root.tsx`,
      `${fe}/src/components/todo-app.tsx`,
      `${fe}/src/api/todos.ts`,
    ].forEach((rel) => assert.ok(exists(rel), `missing ${rel}`));

    const pkg = JSON.parse(read(`${fe}/package.json`));
    assert.ok(
      pkg.dependencies["@tanstack/react-query"],
      "fe sample must include @tanstack/react-query",
    );
    assert.ok(
      pkg.dependencies["@tanstack/react-router"],
      "fe sample must include @tanstack/react-router",
    );
    assert.ok(pkg.devDependencies.tailwindcss, "fe sample must include tailwindcss");
    assert.ok(pkg.dependencies.react, "fe sample must include react");
  });

  test("be app has a Go service structure", () => {
    [
      `${be}/go.mod`,
      `${be}/cmd/api/main.go`,
      `${be}/internal/todo/model.go`,
      `${be}/internal/todo/service.go`,
      `${be}/internal/httpapi/router.go`,
    ].forEach((rel) => assert.ok(exists(rel), `missing ${rel}`));

    const goMod = read(`${be}/go.mod`);
    assert.ok(
      goMod.includes("module github.com/chioio/agents-md-harness/samples/todo-app/be"),
      "be sample must declare the consolidated go module path",
    );
  });
};
