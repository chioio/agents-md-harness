# README

This `_harness/` directory documents how to work on the `agents-md-harness` repository itself.

It is the maintainer-side harness for:

- developing the CLI
- maintaining the user template files in `template/`
- updating documentation
- validating packaging and release behavior

## Critical boundary

There are **two distinct instruction layers** in this repo:

1. **Repo self-use harness**
   - files: root `AGENTS.md` and root `_harness/*`
   - audience: agents or maintainers working on this repository
   - purpose: describe how to change, test, release, and document this package

2. **Generated user template**
   - files: `template/AGENTS.md` and `template/_harness/*`
   - audience: end users running `npx agents-md-harness init`
   - purpose: provide a starter AGENTS.md harness for a user project

## Maintainer expectation

When editing this repository:

- update root docs for repository behavior
- update `template/` only when changing what users should receive
- keep the distinction explicit in docs and structure
- verify the CLI still copies `template/` unchanged into target directories

## Related files

- `CATALOG.md` — where repo code, template files, and release files live
- `RULES.md` — hard boundaries for maintainer edits
- `WORKFLOW.md` — recommended procedures for repo changes and validation
