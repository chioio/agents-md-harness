# Template: readme.md

This template guides the generation of `_harness/readme.md` during setup.

## Purpose

Provide concept overview and purpose of the harness.

## Structure to generate

```markdown
# README

This directory is the sidecar harness for `AGENTS.md`.

It holds modular instruction documents that an agent can load on demand instead of relying on one large static instruction file.

## Purpose

- keep the root `AGENTS.md` thin
- separate overview, routing, rules, structure, and workflows
- let agents use AGENTS as a self-service instruction system
- enable harness to evolve with the project through user-approved proposals

## Files

- `routing.md` — how tasks map to instruction files
- `catalog.md` — structure and module lookup
- `rules.md` — hard constraints and behavior rules
- `workflow.md` — execution flows and procedures

## Memory

- `memory/project.md` stores durable shared project memory
- `memory/agents/*.local.md` stores per-agent short-term working memory and should stay local

## Project context

[PLACEHOLDER - MUST ask user these questions before generating:

1. What does this project do?
2. What are the key technologies?
3. Is this a solo or team project?
4. What kind of agent tasks are expected?

DO NOT generate this section with assumptions. Use actual user responses.]

## Prompt-first setup

The preferred way to use this harness is prompt-first.

Use `_harness/.setup/PROMPT.md` as the conversation entrypoint for a model-driven setup flow.
Use `_harness/.setup/FLOW.md` as the staged setup protocol.

## GC

This template includes a GC layer under `gc/` so the harness can prune stale short-term context and compress long-term knowledge over time.
```

## Questions to ask during setup

1. What does this project do?
2. What are the key technologies?
3. Is this a solo or team project?
4. What kind of agent tasks are expected?
