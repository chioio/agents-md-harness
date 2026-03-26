# CATALOG

This file is the structural index for the `agents-md-harness` repository.

## Root

- `AGENTS.md` — maintainer entrypoint for working on this repository
- `README.md` — public repository documentation
- `package.json` — package metadata, scripts, publish surface
- `package-lock.json` — npm lockfile
- `LICENSE` — package license
- `bin/` — CLI entrypoint implementation
- `template/` — user-facing files copied by `init`
- `_harness/` — maintainer-side modular instructions for this repo
- `.changeset/` — release notes and versioning metadata
- `.github/` — release automation workflows

## Maintainer harness modules

- `_harness/README.md` — repo-self-use overview and boundary model
- `_harness/CATALOG.md` — repository map
- `_harness/RULES.md` — edit constraints and responsibility boundaries
- `_harness/WORKFLOW.md` — task procedures and validation patterns

## CLI implementation

- `bin/agents-md-harness.js` — `init` command implementation
  - resolves package root
  - uses `template/` as the copy source
  - copies template files into the chosen target directory

## User template output

- `template/AGENTS.md` — generated entrypoint for end-user projects
- `template/_harness/README.md` — generated harness overview
- `template/_harness/ROUTING.md` — generated routing rules
- `template/_harness/CATALOG.md` — generated structure index
- `template/_harness/RULES.md` — generated constraint rules
- `template/_harness/WORKFLOW.md` — generated task flow

## Change surface guide

- Change root `AGENTS.md` or root `_harness/*` when changing **repo maintainer guidance**.
- Change `README.md` when changing **public documentation of the package/repo**.
- Change `template/*` when changing **what `init` generates for users**.
- Change `bin/*` when changing **CLI behavior**.
- Add a changeset when the package behavior or user-visible docs change in a publish-relevant way.
