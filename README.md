# AGENTS.md-harness

Turn AGENTS.md into an agent-usable harness.

`agents-md-harness` is a minimal CLI that scaffolds a modular AGENTS.md-based harness for agent-driven projects.

It gives a project a small but structured instruction layer:

- a root `AGENTS.md` entrypoint
- a modular `_harness/` directory
- setup scaffolding for project-specific markdown generation
- a `skills/` area for reusable project and harness capabilities
- memory and GC primitives for longer-running agent workflows

## Why

Most `AGENTS.md` files grow into a single flat document.
That makes them harder for agents to route, load selectively, and maintain over time.

This project turns that single entry file into a lightweight harness:

- `AGENTS.md` stays short and acts as the entrypoint
- `_harness/` holds modular docs for routing, rules, catalog, workflow, memory, and GC
- agents can load only the context they need
- the harness can keep evolving instead of collapsing into one giant file

## Core ideas

### AGENTS.md as an entrypoint

Keep the root file short.
It should tell an agent what kind of project it is in, where to route next, and what must be confirmed before risky changes.

### Modular context loading

Agents should not read everything by default.
They should load the minimum useful instruction set for the current task.

### Memory as infrastructure

Project memory and agent-local working memory are part of the harness, not an afterthought.

### GC as maintenance

Harnesses should stay usable over time.
GC is included so memory and guidance can be pruned, compressed, and kept high-signal.

## Implementation Principles

Harness-first. Policy-driven. Guardrail-oriented.

- `AGENTS.md` is the entrypoint, not the whole system.
- The harness exists to shape agent behavior, not just generate markdown.
- Prefer routing, policy, workflow, and guardrails over broad project narration.
- Load the minimum useful context before acting.
- Keep README human-facing; keep agent rules in harness files.
- Separate short-term task memory from durable project memory.
- Test harness quality through real agent sessions, not only static file checks.
- Prefer one shared harness for collaboration unless separation is clearly necessary.

## CLI

Primary command:

```bash
npx agents-md-harness setup
```

Examples:

```bash
npx agents-md-harness setup
npx agents-md-harness setup my-project
npx agents-md-harness setup my-project --force
npx file:. setup my-project
```

`init` still exists as a legacy alias, but `setup` is the preferred command.

## Repository layout

This repository has three working areas:

### Repo self-use

The root `AGENTS.md` and root `_harness/` are for maintaining this repository itself.

### Template output

Everything under `template/` is what the CLI copies into user projects.

### Sample scenario

`samples/todo-app/` is the runtime evaluation scenario.
It provides a concrete full-stack workspace for testing routing, memory, GC, doc generation, and multi-agent collaboration under one shared harness.

## Status

Current focus:

- improving setup flow
- improving generated harness quality
- validating fresh-session agent behavior
- testing memory / GC patterns
- improving session-based harness evaluation

## Testing

The main test target is fresh-session agent behavior inside `samples/todo-app`.

Use:

- `pnpm test:cli`
- `pnpm test:harness`
- fresh-session checks in `samples/todo-app` using tasks from `tests/runtime/tasks.json`

See [TESTING.md](./TESTING.md).

## License

MIT
