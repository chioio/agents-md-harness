# Template: catalog.md

This template guides the generation of `_harness/catalog.md` during setup.

## Purpose

Provide structure and module lookup for the project.

## Structure to generate

```markdown
# CATALOG

## Root

- `AGENTS.md` — entrypoint and loading rules
- `_harness/` — modular sidecar instructions

## Harness files

- `readme.md` — concept overview
- `routing.md` — task-to-file dispatch
- `rules.md` — constraints, boundaries, and evolution rules
- `workflow.md` — standard execution flow and evolution workflow

## Memory

- `_harness/memory/project.md` — shared long-term project memory
- `_harness/memory/agents/*.local.md` — per-agent short-term local memory

## Setup

- `_harness/.setup/PROMPT.md` — prompt-first setup entrypoint
- `_harness/.setup/FLOW.md` — staged setup conversation flow
- `_harness/.setup/templates/` — generation templates for harness files

## GC

- `_harness/gc/README.md` — why GC exists in the harness
- `_harness/gc/POLICY.md` — GC policy for memory and harness files
- `_harness/gc/FLOW.md` — staged GC process

## Project structure

[PLACEHOLDER - MUST ask user these questions before generating:

1. What are the main directories in this project?
2. What do they contain?
3. Are there important modules or components to highlight?
4. Where are tests located?
5. Where is documentation?

DO NOT generate this section with assumptions. Use actual user responses and inspect actual project structure.]

## Evolution model

Harness files are generated through setup and evolve through user-approved proposals:

- **Initial generation**: via `.setup/` conversation flow
- **Runtime evolution**: via propose-review-apply workflow (see `rules.md` and `workflow.md`)
- **Risk-based approval**: low-risk (agent memory) vs high-risk (core harness files)
```

## Questions to ask during setup

1. What are the main directories in this project?
2. What do they contain?
3. Are there important modules or components to highlight?
4. Where are tests located?
5. Where is documentation?
