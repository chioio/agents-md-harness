# AGENTS.md-harness

> 🪄 Turn `AGENTS.md` into an agent-usable harness.

`AGENTS.md-harness` explores a simple idea:

Instead of treating `AGENTS.md` as one large static prompt file, treat it as a thin entrypoint that routes an agent into a modular instruction harness.

In other words:

- `AGENTS.md` stays as the standard discovery file
- `_harness/` becomes the sidecar instruction system
- agents read only the minimum relevant instruction files for the task at hand

## Why

As projects grow, `AGENTS.md` often becomes:

- too long
- too mixed
- too expensive to inject repeatedly
- too hard to maintain

This repository proposes a different model:

- keep `AGENTS.md` thin
- separate routing, rules, structure, and workflows
- let agents use AGENTS as a self-service instruction system

## Core Idea

Turn this:

- one static `AGENTS.md`

into this:

- `AGENTS.md` as entrypoint
- `_harness/ROUTING.md` for task-to-file routing
- `_harness/CATALOG.md` for structure lookup
- `_harness/RULES.md` for constraints
- `_harness/WORKFLOW.md` for execution procedures

## Repository Structure

```text
AGENTS.md
_harness/
  README.md
  ROUTING.md
  CATALOG.md
  RULES.md
  WORKFLOW.md
```

## How It Works

### `AGENTS.md`
A thin entrypoint file that tells the agent:

- classify the task first
- route before loading
- load only the minimum relevant files from `_harness/`

### `_harness/README.md`
Explains what the harness is and how the pieces fit together.

### `_harness/ROUTING.md`
Defines how an agent maps a task to the right instruction file(s).

### `_harness/CATALOG.md`
Acts as the structural index for the repository.

### `_harness/RULES.md`
Holds hard constraints and content boundaries.

### `_harness/WORKFLOW.md`
Defines standard agent usage flow and procedural patterns.

## Design Goals

- **Thin entrypoint** — keep the root `AGENTS.md` small
- **Task-based routing** — choose docs based on the task
- **Minimal loading** — avoid reading everything by default
- **Modular instructions** — split by responsibility
- **Agent self-use** — let agents actively use AGENTS, not just passively receive it

## Non-Goals (v1)

- full schema design
- automatic parser/runtime enforcement
- deep module trees
- universal compatibility guarantees across all tools

## Status

This repository is an early scaffold for the concept.

The current version defines:

- the basic file layout
- the role of each file
- the first-pass routing model

## Tagline

**Make agents use AGENTS.**
