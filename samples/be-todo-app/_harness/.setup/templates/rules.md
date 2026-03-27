# Template: rules.md

This template guides the generation of `_harness/rules.md` during setup.

## Purpose

Define hard constraints, boundaries, and evolution rules for the harness.

## Structure to generate

```markdown
# RULES

- Read `AGENTS.md` first.
- Do not assume every harness file must be loaded.
- Prefer the smallest useful instruction set.
- Escalate only when the task actually needs more context.

## Memory rules

- Store long-term project knowledge in `_harness/memory/project.md`.
- Store short-term per-agent working context in `_harness/memory/agents/*.local.md`.
- Do not commit per-agent local memory files.

## Project-specific rules

[PLACEHOLDER - MUST ask user these questions before generating:

1. What language should documentation be in? (English/Chinese/other)
2. Are there stack-specific conventions? (package manager, code style, etc.)
3. Are there protected files or directories agents should never modify?
4. What actions always require user confirmation?
5. Any other hard constraints or preferences?

DO NOT generate this section with assumptions. Use actual user responses.]

## Harness evolution rules

**Risk levels:**

- **Low risk**: `memory/agents/*.local.md` — can be updated freely by agents
- **Medium risk**: `memory/project.md` — propose changes, wait for user confirmation
- **High risk**: `routing.md`, `catalog.md`, `rules.md`, `workflow.md`, `readme.md` — NEVER auto-update without explicit user approval

**Evolution workflow:**

1. When current harness is insufficient for a task, identify which file needs updating
2. Propose specific changes with clear diff or description
3. Explain why the change is needed and what problem it solves
4. Wait for explicit user approval
5. Apply changes only after approval
6. Update `memory/project.md` to record the evolution event

**When to propose evolution:**

- New task patterns emerge that don't fit existing routing
- Project structure changes significantly (catalog update)
- New constraints or conventions are established (rules update)
- Workflows become more complex or change (workflow update)

**Never:**

- Silently modify high-risk harness files
- Assume user approval without asking
- Batch multiple harness updates without separate approval for each
```

## Questions to ask during setup

1. What language should documentation be in? (English/Chinese/other)
2. Are there stack-specific conventions? (package manager, code style, etc.)
3. Are there protected files or directories agents should never modify?
4. What actions always require user confirmation?
5. Any other hard constraints or preferences?
