# AGENTS.md

This repository defines an instruction harness for agents.

Read this file first, but do not assume you must read everything.
Classify the task, then load only the minimum relevant documents from `_harness/`.

## Routing

- Project overview and quick orientation -> `_harness/README.md`
- Task-to-file routing -> `_harness/ROUTING.md`
- Project/module structure lookup -> `_harness/CATALOG.md`
- Hard rules and constraints -> `_harness/RULES.md`
- Execution procedures and task flows -> `_harness/WORKFLOW.md`

## Loading Principles

- Prefer minimum necessary reads.
- Route before loading.
- Load the most relevant file first.
- Combine multiple files only when the task truly needs them.
- Treat this repository as a prototype for turning `AGENTS.md` into an agent-usable harness.
