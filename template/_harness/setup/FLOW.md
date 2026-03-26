# Setup Flow

## Goal

Turn a prompt-driven conversation into an initial working harness by generating all core files.

## CRITICAL RULES

- **DO NOT skip user interaction**
- **DO NOT generate files before collecting user input**
- **MUST go through all stages and ask questions**
- Each stage requires user response before proceeding
- Only generate files in Stage 5 after completing Stages 1-4

## Stage 1 — Understand the project

Ask:

- What does this project do?
- What kind of tasks should agents help with?
- Is this a solo repo or a team/agent-team repo?
- What language should documentation be in?

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
- Any hard constraints or preferences?

## Stage 4 — Understand memory

Ask:

- Should the harness keep project memory?
- Should short-term memory be agent-specific?

Default model:

- shared long-term memory: `_harness/memory/project.md`
- short-term local memory: `_harness/memory/agents/*.local.md`

## Stage 5 — Generate files

Using templates in `_harness/setup/templates/`, generate:

1. `_harness/readme.md` — project context and harness overview
2. `_harness/catalog.md` — project structure based on actual directories
3. `_harness/rules.md` — constraints and user preferences
4. `_harness/routing.md` — task-to-file mapping for common tasks
5. `_harness/workflow.md` — project-specific workflows
6. `_harness/memory/project.md` — initial project memory

## Stage 6 — Review

Summarize:

- what was generated
- what defaults were assumed
- how to evolve the harness later (via propose-review-apply workflow)
