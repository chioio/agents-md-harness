---
role: maintainer-guide
scope: project-context
---

# README

This `_harness/` directory is the repo self-use harness for maintaining `agents-md-harness` itself.

It is not the same as the generated user harness under `template/_harness/`.

## Purpose

- guide agents working on this repository
- keep repo-maintainer guidance separate from template output
- help agents route doc, CLI, template, and release tasks correctly
- preserve the boundary between human-facing public docs and agent-facing harness rules

## Repository context

This project is an agent-oriented open source tool with two layers:

1. **Repo self-use layer**
   - root `AGENTS.md`
   - root `_harness/*`
   - used for maintaining this repository itself

2. **Template output layer**
   - `template/AGENTS.md`
   - `template/_harness/*`
   - copied into user projects by `setup`

## What agents commonly do here

- modify CLI behavior in `bin/`
- evolve the user template in `template/`
- maintain public docs such as `README.md` and `README.zh-CN.md`
- validate generated output with `pnpm test:cli`
- maintain release-facing metadata and changesets

## Reading order

- start with root `AGENTS.md`
- use `routing.md` to choose the smallest useful file set
- use `rules.md` for boundaries and synchronization rules
- use `workflow.md` for execution procedures
- use `catalog.md` for path lookup when touching files across layers
