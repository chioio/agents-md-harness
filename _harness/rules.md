---
role: maintainer-guide
scope: constraints
---

# RULES

## Boundary rules

- Root files describe how to maintain this repository.
- `template/` defines end-user output.
- `samples/` is for runtime evaluation, not template source.
- Do not use template files to express repo-internal policy.
- Keep repo self-use, template output, and sample runtime language explicit.

## README rules

- `README.md` and `README.zh-CN.md` are for humans, not agents.
- Keep README focused on project value, usage, and high-level structure.
- Do not dump agent rules, memory policy, or maintainer workflow into README.
- Sync both README languages when user-visible meaning changes.
- Move agent instructions and maintainer guardrails into root `AGENTS.md` and root `_harness/*`.

## Documentation rules

- Public docs must match the real repository structure and CLI behavior.
- When describing generated output, distinguish between:
  - files copied immediately by `setup`
  - files generated later by the guided setup conversation
- When docs change user-visible behavior, re-check `README.md`, `README.zh-CN.md`, and `template/` for consistency.

## Template rules

- Keep template output minimal, reusable, and framework-agnostic where possible.
- Validate template-affecting changes with `pnpm test:cli`.
- Preserve safe overwrite behavior unless CLI semantics are intentionally changed.

## Testing rules

- Use `pnpm test:harness` for sample structure coverage.
- Use `TESTING.md` and `tests/runtime/` for fresh-session and multi-agent evaluation guidance.
- Do not treat markdown text quality checks as the main proof of harness effectiveness.

## Release rules

- Use Changesets for publish-relevant changes.
- Run `pnpm changeset` when package behavior or user-visible shipping docs should release.
- Treat GitHub Actions as the standard publish path.

## Style rules

- Run `pnpm format` before commit when touching tracked files.
- Follow Conventional Commits.
- Prefer precise guardrails over slogan-like wording.
