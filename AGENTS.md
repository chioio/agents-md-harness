# AGENTS.md

This `AGENTS.md` is for working on the `agents-md-harness` repository itself.
It is **not** the template that end users generate with `npx agents-md-harness init`.

Before acting, classify the task into one of these repo-maintainer modes:

- **Product/code work** -> CLI behavior, packaging, tests, release flow
- **Template work** -> files under `template/` that are copied into user projects
- **Docs work** -> repository documentation and maintainer guidance
- **Release/publish work** -> versioning, packaging, npm/GitHub release concerns

Then load only the minimum relevant documents from `_harness/`.

## Routing

- Repo overview and boundary between repo-vs-template -> `_harness/README.md`
- Find code, template files, and publishable assets -> `_harness/CATALOG.md`
- Check maintainer constraints and editing boundaries -> `_harness/RULES.md`
- Follow task procedures for repo edits, template edits, and validation -> `_harness/WORKFLOW.md`

## Loading principles

- Treat the repository root as **maintainer instructions for this repo**.
- Treat `template/` as **user-facing output templates**.
- Do not edit template files just to change how this repository should be operated.
- Keep repo-maintainer guidance in root `AGENTS.md` and root `_harness/*`.
- Load the smallest useful instruction set before making changes.
