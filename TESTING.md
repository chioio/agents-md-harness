# Testing

`agents-md-harness` should be tested through fresh agent sessions.
The main runtime scenario is `samples/todo-app/`.

## What to test

The project is working if an agent entering a project through `AGENTS.md` becomes:

- more likely to use `AGENTS.md` as the entrypoint
- more likely to load the minimum useful `_harness/*` documents
- less likely to confuse README, harness, code, and memory layers
- more likely to align first and confirm risky changes before implementation
- more consistent across fresh sessions

## Test layers

### 1. Contract tests

Run the repo contract checks:

```bash
pnpm test:cli
pnpm test:harness
```

These verify:

- template setup output contracts
- `samples/todo-app` structure contracts

### 2. Fresh-session tests

This is the primary validation path.

Open a fresh agent session in `samples/todo-app/` and give it a task from `tests/runtime/tasks.json`.

When you must trigger a fresh Codex session from another Codex session, prefer:

```bash
pnpm test:runtime:codex -- fe-minimal-routing --first-response-only
```

This keeps JSON progress visible and avoids treating a missing final `-o` file as proof of a hung run.
The helper also disables OTEL exporters by default for nested Codex runs.
For smoke checks, prefer `--first-response-only` to stop after the first routing / boundary response.
Do not use `killall codex` for runtime-eval cleanup.

Check:

- did it start from `AGENTS.md`
- did it load a small, relevant harness set first
- did it route to the correct layer
- did it avoid reading everything
- did it choose the right confirm / do-not-confirm boundary
- did it use memory in the intended way
- did it coordinate correctly across product, architecture, development, testing, and UI/UX roles when the task requires multiple agents

### 3. Repeated fresh-session checks

Run the same task across multiple fresh sessions in `samples/todo-app/`.

Pass criteria:

- routing is broadly consistent
- wrong-layer edits become less frequent
- noisy full-context loading becomes less frequent

### 4. Multi-agent checks

Use `samples/todo-app/` for tasks that require role splitting.

Check:

- whether multiple agents classify the task boundaries consistently
- whether they keep one shared harness instead of inventing per-module rules
- whether short-term memory stays task-scoped
- whether durable decisions are written into the right shared memory location

## Task corpus

Use `tests/runtime/tasks.json` as the task library for manual or session-based evaluation in `samples/todo-app/`.
See `tests/runtime/README.md` for the lightweight runtime workflow.

Task levels:

- `smoke`: quick regression checks for routing, confirmation boundaries, README boundary, and basic memory decisions
- `deep`: fuller evaluation for FE-BE alignment, document generation, short-term memory cycles, GC, and multi-agent collaboration
