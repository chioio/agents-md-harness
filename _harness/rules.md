---
role: maintainer-guide
scope: constraints
---

# RULES

## Boundary rules

- Root files describe how to maintain this repository.
- `template/` defines end-user output.
- `sample/` is a generated-and-customized fixture for testing and demonstration, not the source template.
- Do not use template files to express repo-internal maintainer policy.
- Keep repo-self-use vs template-output language explicit in docs.

## README rules

- `README.md` and `README.zh-CN.md` are for humans trying to understand the project.
- Do not turn the README into agent-operating policy, maintainer workflow dump, or internal constraint storage.
- Keep README focused on project value, core concept, usage, and high-level repository structure.
- Put agent instructions, maintainer constraints, and execution procedures in root `AGENTS.md` and root `_harness/*` instead.
- When one README changes in user-visible meaning, sync the other language version in the same change.
- If one README intentionally lags, state that explicitly in the PR or commit context; do not let them drift silently.

## Documentation rules

- Public docs must match the current repository structure and CLI behavior.
- When documenting generated output, distinguish between:
  - files copied immediately by `setup`
  - files generated later by the guided setup conversation
- When updating docs for user-facing behavior, check whether `README.md`, `README.zh-CN.md`, and `template/` all still agree.

## Template rules

- Keep the generated template minimal, reusable, and framework-agnostic where possible.
- Validate template-affecting changes with `pnpm test:cli`.
- Preserve safe overwrite behavior unless the user explicitly asks for different CLI semantics.

## Sample rules

- Update `sample/` only when demonstrating or validating intended generated behavior.
- Do not treat `sample/` as the canonical source of template truth.
- If template semantics change materially, decide explicitly whether `sample/` also needs to be regenerated or revised.

## Release rules

- Use Changesets for publish-relevant changes.
- Run `pnpm changeset` for package or user-visible documentation changes that should ship.
- Treat GitHub Actions as the standard publish path.

## Style rules

- Run `pnpm format` before commit when touching tracked files.
- Follow Conventional Commits.
- Prefer precise wording over marketing-heavy wording in maintainer docs.
