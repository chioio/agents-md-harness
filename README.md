# AGENTS.md-harness

> 🪄 Turn `AGENTS.md` into an agent-usable harness.

[English](./README.md) | [简体中文](./README.zh-CN.md)

`agents-md-harness` helps turn `AGENTS.md` from a static instruction file into a usable operating layer for LLM-driven workflows.

Instead of relying on one oversized prompt, it uses:

- `AGENTS.md` as the entrypoint
- `_harness/` as the modular instruction system
- setup, memory, and GC as built-in lifecycle parts

## Why

`AGENTS.md` is becoming a common discovery file for AI coding agents.
But in practice, a single giant document is often hard to maintain, hard to evolve, and inefficient for models to use.

This project explores a more practical structure:

- start with a thin entrypoint
- route before loading context
- keep memory separate from task instructions
- make harness setup explicit instead of implicit
- let the system evolve as the project evolves

## What `setup` gives you

Run:

```bash
npx agents-md-harness setup my-project
```

It copies a starter structure like this:

```text
AGENTS.md
_harness/
  .setup/
  gc/
  memory/
  skills/
```

Then you ask your model:

> Help me setup the harness

The model uses `_harness/.setup/` to guide a short conversation and generate project-specific files such as:

```text
_harness/
  readme.md
  routing.md
  catalog.md
  rules.md
  workflow.md
  memory/project.md
```

## Core ideas

### Prompt-first setup

A good harness depends on the actual project.
So the template starts with a guided conversation, then generates the core files from that context.

### Modular context loading

Agents should not read everything by default.
They should load the minimum useful instruction set for the current task.

### Memory as infrastructure

Project memory and agent-local working memory are part of the harness, not an afterthought.

### GC as maintenance

Harnesses should stay usable over time.
GC is included so memory and guidance can be pruned, compressed, and kept high-signal.

## Sample project

This repo also includes `sample/`, a generated-and-customized sample used to test:

- repeated `setup` runs
- multi-agent behavior
- memory and GC flows
- quality of generated harness markdown

## CLI

Primary command:

```bash
npx agents-md-harness setup
```

Examples:

```bash
npx agents-md-harness setup
npx agents-md-harness setup my-project
npx agents-md-harness setup my-project --force
npx file:. setup my-project
```

`init` still exists as a legacy alias, but `setup` is the preferred command.

## Repository layout

This repository has two layers:

### Repo self-use

The root `AGENTS.md` and root `_harness/` are for maintaining this repository itself.

### Template output

Everything under `template/` is what the CLI copies into user projects.

## Status

Current focus:

- improving setup flow
- improving generated harness quality
- testing memory / GC patterns
- validating multi-agent usage

## License

MIT
