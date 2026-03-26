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
pnpm install
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

Create a changeset for publishable changes:

```bash
pnpm changeset
```

Preview pending releases:

```bash
pnpm exec changeset status
```

Apply pending changesets locally if you need to inspect the generated release commit:

```bash
pnpm version-packages
```

Do not run manual npm publishing from your laptop for normal releases. The GitHub Actions release flow is the source of truth.

## Release flow

This repository uses [Changesets](https://github.com/changesets/changesets) for versioning and npm publishing.

### Recommended branch model

- `main` is the only branch that matters to the automated release flow.
- feature branches can open PRs into `main` as usual.
- a long-lived `dev` branch is **not required** for standard Changesets releases in this repository.

If you still want a `dev` branch for broader integration testing, keep it as a human workflow choice only. Do not wire publishing or release PR creation to `dev` unless you intentionally redesign the release model.

### Standard maintainer workflow

1. Make code or documentation changes on a feature branch.
2. Run `pnpm format` and the relevant checks.
3. Add a changeset with `pnpm changeset` for every publishable change.
4. Open a PR into `main`.
5. After that PR merges to `main`, GitHub Actions creates or updates the Changesets release PR on branch `changeset-release/main`.
6. Review and merge the release PR.
7. The merge commit from that release PR lands on `main` as `github-actions[bot]`, which triggers the publish workflow.
8. The publish workflow runs `changeset publish` and publishes the new version to npm.

### Why publish only after the release PR merge

Both workflows trigger on pushes to `main`, but they are intentionally split by actor:

- `changesets-version.yml` runs only for non-bot pushes, which means normal maintainer merges create or update the release PR.
- `publish.yml` runs only for `github-actions[bot]` pushes, which means only the merged release PR commit can publish.

That prevents normal feature merges from trying to publish immediately, while still keeping the flow fully automatic once the release PR is approved.

### Existing alpha and manual release history

The repository currently contains an earlier manual/alpha release step (`0.1.0-alpha.0`) plus a later Changesets-managed release PR branch. Going forward, treat that alpha as historical bootstrap noise:

- do not continue a separate alpha/pre-release lane unless you explicitly add Changesets pre mode
- do not hand-edit package versions on feature branches
- do not run ad hoc `pnpm release` as the normal release path

The canonical flow is now: **changeset files in PRs → automated release PR on `main` → merge release PR → automated npm publish**.

### GitHub Actions included

- `.github/workflows/changesets-version.yml`
  - runs on pushes to `main` from maintainers
  - creates or updates the release PR with version bumps and changelog updates
- `.github/workflows/publish.yml`
  - runs on pushes to `main` created by `github-actions[bot]`
  - publishes to npm only after the release PR merge

### Required GitHub and npm configuration

For the publish workflow to succeed, make sure these settings exist outside the repo:

1. **GitHub Actions permissions**
   - repository Actions must be allowed to create and approve pull requests as needed
   - the default `GITHUB_TOKEN` must have permission to write contents and pull requests
2. **Branch protection for `main`**
   - allow the Changesets release PR to merge
   - if you require status checks, include both workflow checks appropriately
3. **npm trusted publishing**
   - add this GitHub repository/workflow as a trusted publisher in npm for the `agents-md-harness` package
   - `id-token: write` is already configured in the workflow for this path

If trusted publishing is not configured, the publish job will fail even though the workflow YAML is correct.

## Commit convention

This repository follows Conventional Commits.

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
