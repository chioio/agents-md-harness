# Setup Flow

## Goal

Turn a prompt-driven conversation into an initial working harness.

## Stage 1 — Understand the project

Ask:

- What does this project do?
- What kind of tasks should agents help with?
- Is this a solo repo or a team/agent-team repo?

## Stage 2 — Understand execution style

Ask:

- What are the main workflows?
- What should the agent do by default?
- What should always require confirmation?

## Stage 3 — Understand structure and rules

Ask:

- What directories/modules matter most?
- Are there protected areas the agent should avoid?
- Are there stack-specific commands or conventions?

## Stage 4 — Understand memory

Ask:

- Should the harness keep project memory?
- Should short-term memory be agent-specific?

Default model:

- shared long-term memory: `_harness/memory/project.md`
- short-term local memory: `_harness/memory/agents/*.local.md`

## Stage 5 — Write files

Generate or refine:

- `AGENTS.md`
- `_harness/*`
- `_harness/memory/project.md`

## Stage 6 — Review

Summarize:

- what was created
- what defaults were assumed
- what can be refined later
