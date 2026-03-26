# AGENTS.md-harness

> 🪄 Turn `AGENTS.md` into an agent-usable harness.

[English](./README.md) | [简体中文](./README.zh-CN.md)

`AGENTS.md-harness` explores a simple idea:

Instead of treating `AGENTS.md` as one large static prompt file, treat it as a thin entrypoint that routes an agent into a modular instruction harness.

In other words:

- `AGENTS.md` stays as the standard discovery file
- `_harness/` becomes the sidecar instruction system
- agents read only the minimum relevant instruction files for the task at hand

## Two layers in this repository

This repository now separates **repo self-use** from **template output** on purpose.

### 1) Repo self-use

These files help agents and maintainers work on **this repository itself**:

```text
AGENTS.md
_harness/
  README.md
  CATALOG.md
  RULES.md
  WORKFLOW.md
```

Use this layer for:

- CLI development
- release/publish maintenance
- repository documentation
- template maintenance workflows

### 2) Template output

These files are the **user-facing template** copied into another project by `init`:

```text
template/
  AGENTS.md
  _harness/
    README.md
    ROUTING.md
    CATALOG.md
    RULES.md
    WORKFLOW.md
```

Use this layer for:

- defining what end users get from `npx agents-md-harness init`
- evolving the starter harness template
- preserving a clean generated output independent from this repo's internal maintainer instructions

## Why this split exists

Without an explicit separation, the repository's own maintainer docs and the generated template can blur together:

- maintainers may edit template files to express repo-internal rules
- readers may mistake root `AGENTS.md` for the generated template
- documentation may become ambiguous about what is copied by the CLI

The goal is simple:

- root `AGENTS.md` + root `_harness/*` = **how to work on this repo**
- `template/AGENTS.md` + `template/_harness/*` = **what users receive**

## Core idea

Turn this:

- one static `AGENTS.md`

into this:

- `AGENTS.md` as entrypoint
- `_harness/ROUTING.md` for task-to-file routing
- `_harness/CATALOG.md` for structure lookup
- `_harness/RULES.md` for constraints
- `_harness/WORKFLOW.md` for execution procedures

That remains the product idea — but in this repository, the root-level harness is now specifically for repository self-maintenance, while the template preserves the original user template.

## Repository structure

```text
AGENTS.md                  # maintainer entrypoint for this repo
_harness/                  # maintainer-side harness for this repo
bin/                       # CLI implementation
template/                  # generated template copied by init
README.md                  # public repo documentation
```

## CLI

This package ships a minimal CLI so users can initialize the harness via `npx` or a local package path.

### Usage

```bash
npx agents-md-harness init
npx agents-md-harness init my-project
npx agents-md-harness init my-project --force
npx file:. init my-project
```

### What it creates

The CLI copies the contents of `template/` into the target directory:

```text
AGENTS.md
_harness/
  README.md
  ROUTING.md
  CATALOG.md
  RULES.md
  WORKFLOW.md
```

### Notes

- default target directory is the current directory
- existing files are protected by default
- use `--force` to overwrite generated template files in the target directory
- root repo docs are **not** copied; only `template/` is used as CLI output

## Development

Install dependencies:

```bash
ppnpm install
```

Run the formatter:

```bash
pnpm format
pnpm format:check
```

Quick CLI check:

```bash
pnpm test:cli
npx file:. init ./tmp/fixture-from-file --force
```

Create a changeset for user-facing changes:

```bash
pnpm changeset
```

Apply pending changesets locally:

```bash
pnpm version-packages
```

Publish from a properly configured environment:

```bash
pnpm release
```

## Release flow

This repository uses [Changesets](https://github.com/changesets/changesets) for versioning and npm publishing.

### Maintainer workflow

1. Make your code or documentation changes.
2. Run `pnpm format`.
3. Add a changeset with `pnpm changeset` for any publishable change.
4. Open or update a PR.
5. After merge to `main`, GitHub Actions updates or creates a release PR with version bumps.
6. Merge the release PR.
7. After that merge lands on `main`, the publish workflow runs `changeset publish`.

### GitHub Actions included

- `.github/workflows/changesets-version.yml`
  - creates or updates the release PR on pushes to `main`
- `.github/workflows/publish.yml`
  - publishes to npm on pushes to `main` when version packages are present

### Required repository secrets

For npm publishing, configure:

- `NPM_TOKEN` — npm automation token with publish access to `agents-md-harness`

`GITHUB_TOKEN` is provided automatically by GitHub Actions.

## Commit convention

This repository follows Conventional Commits and is compatible with `@commitlint/config-conventional`.

Recommended examples:

- `feat: add release workflow`
- `fix: preserve existing template files`
- `docs: clarify repo self-use versus template output`
- `chore(release): version packages`

## Status

This repository is an early implementation of the concept.

The current version defines:

- the basic generated file layout
- the role of each template file
- a separate maintainer-side harness for repository development
- a minimal `npx agents-md-harness init` bootstrap flow
- baseline formatting and release automation

## Tagline

**Make agents use AGENTS.**
