# README

This directory is the sidecar harness for `AGENTS.md`.

It holds modular instruction documents that an agent can load on demand instead of relying on one large static instruction file.

## Purpose

- keep the root `AGENTS.md` thin
- separate overview, routing, rules, structure, and workflows
- let agents use AGENTS as a self-service instruction system

## Files

- `ROUTING.md` — how tasks map to instruction files
- `CATALOG.md` — structure and module lookup
- `RULES.md` — hard constraints and behavior rules
- `WORKFLOW.md` — execution flows and procedures

## Memory

- `memory/project.md` stores durable shared project memory
- `memory/agents/*.local.md` stores per-agent short-term working memory and should stay local

## Prompt-first setup

The preferred way to use this harness is prompt-first.

Use `_harness/setup/PROMPT.md` as the conversation entrypoint for a model-driven setup flow.
Use `_harness/setup/FLOW.md` as the staged setup protocol.

## GC

This template includes a GC layer under `gc/` so the harness can prune stale short-term context and compress long-term knowledge over time.
