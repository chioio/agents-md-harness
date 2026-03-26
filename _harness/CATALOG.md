---
role: maintainer-guide
scope: structure-lookup
---

# CATALOG

## Root

- `AGENTS.md` — maintainer entrypoint
- `_harness/` — maintainer harness
- `template/` — user-facing template

## CLI

- `bin/agents-md-harness.js` — CLI entry
- Supports `init` and `setup` commands

## Template

- `template/AGENTS.md` — user entrypoint
- `template/_harness/setup/` — setup framework
- `template/_harness/setup/templates/` — generation templates for harness files
- `template/_harness/gc/` — GC logic
- `template/_harness/memory/` — memory dirs

## Maintainer harness

- `_harness/readme.md` — project context
- `_harness/catalog.md` — structure lookup
- `_harness/rules.md` — maintainer constraints
- `_harness/routing.md` — task routing
- `_harness/workflow.md` — development workflows
- `_harness/gc/` — GC policy and flow
- `_harness/memory/` — project and agent memory
