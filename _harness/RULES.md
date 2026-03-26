---
role: maintainer-guide
scope: constraints
---

# RULES

## Boundary rules

- Root files = repo maintenance
- `template/` = end user output
- Do not mix the two

## Template rules

- Test with `pnpm test:cli`
- Keep minimal and framework-focused

## Release rules

- Use Changesets for changes
- Run `pnpm changeset`
- Let GitHub Actions publish

## Code style

- Run `pnpm format` before commit
- Follow Conventional Commits
