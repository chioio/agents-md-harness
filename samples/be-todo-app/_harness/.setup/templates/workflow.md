# Template: workflow.md

This template guides the generation of `_harness/workflow.md` during setup.

## Purpose

Define standard execution flows and procedures for agents.

## Structure to generate

```markdown
# WORKFLOW

1. Read `AGENTS.md`.
2. Classify the task.
3. Route to the most relevant harness file.
4. Load only additional files when needed.
5. Execute the task under the selected constraints.

## Memory workflow

- Update shared durable knowledge in `_harness/memory/project.md` when it becomes project-relevant.
- Keep temporary agent context in `_harness/memory/agents/<agent>.local.md`.

## Project-specific workflows

[PLACEHOLDER - MUST ask user these questions before generating:

1. What are the main workflows in this project?
2. What should agents do by default?
3. What always requires confirmation?
4. Are there specific testing or deployment procedures?

DO NOT generate this section with assumptions. Use actual user responses.]

## Setup workflow

- Prefer prompt-first setup over manual file authoring.
- Use `_harness/.setup/PROMPT.md` to enter setup mode.
- Use `_harness/.setup/FLOW.md` to structure the conversation and outputs.

## Evolution workflow

When harness needs updating:

1. **Detect insufficiency** — recognize when current harness cannot guide the task effectively
2. **Identify target** — determine which file needs updating (routing/catalog/rules/workflow)
3. **Draft proposal** — prepare specific changes with clear rationale
4. **Present to user** — show diff or description, explain the need
5. **Wait for approval** — do not proceed without explicit user confirmation
6. **Apply changes** — update the file only after approval
7. **Record evolution** — log the change in `memory/project.md`

## GC workflow

- Periodically run harness GC to keep memory and guidance compact.
- Clean short-term local memory aggressively.
- Keep long-term memory durable and high-signal.
```

## Questions to ask during setup

1. What are the main workflows in this project?
2. What should agents do by default?
3. What always requires confirmation?
4. Are there specific testing or deployment procedures?
