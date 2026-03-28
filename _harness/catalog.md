---
role: maintainer-guide
scope: structure-lookup
---

# CATALOG

## Root

- `AGENTS.md` — maintainer entrypoint
- `_harness/` — maintainer harness
- `template/` — user-facing template
- `samples/` — runtime evaluation scenarios
- `tests/` — repo-level structure tests and session task corpus
- `TESTING.md` — testing method for the project itself

## CLI

- `bin/agents-md-harness.js` — CLI entry
- Supports `setup` (with legacy `init` alias)

## Template

- `template/AGENTS.md` — user entrypoint
- `template/_harness/.setup/` — setup framework
- `template/_harness/.setup/templates/` — generation templates for harness files
- `template/_harness/gc/` — GC logic
- `template/_harness/memory/` — memory dirs
- `template/_harness/skills/` — reusable project and harness skills

## Tests

- `tests/harness/` — structure and contract tests
- `tests/runtime/README.md` — runtime evaluation workflow
- `tests/runtime/tasks.json` — fresh-session task corpus
- `tests/runtime/run-codex-eval.js` — safer nested Codex runtime-eval helper

## Maintainer harness

- `_harness/readme.md` — project context
- `_harness/catalog.md` — structure lookup
- `_harness/rules.md` — maintainer constraints
- `_harness/routing.md` — task routing
- `_harness/workflow.md` — development workflows
- `_harness/gc/` — GC policy and flow
- `_harness/memory/` — project and agent memory
