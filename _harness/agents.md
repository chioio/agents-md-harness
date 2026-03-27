---
role: maintainer-guide
scope: agent-integration
---

# AGENTS

This file defines how the harness should think about agents.

## Principle

The harness should not reinvent or fully redefine the user's existing agent stack.

It should only define:

- how agents plug into the harness
- how short-term memory is separated per agent
- how long-term memory is shared
- how roles are mapped at the harness level

## What not to do

Do not create a heavy built-in `agents/` directory with persona files unless the user explicitly asks for that.

## Default model

- shared long-term memory: `_harness/memory/project.md`
- per-agent short-term memory: `_harness/memory/agents/*.local.md`
- project-specific capabilities: `_harness/skills/`

## Role mapping

The harness may describe lightweight role expectations such as:

- implementation
- review
- planning
- testing

But it should map to the user's existing agents where possible instead of replacing them.
