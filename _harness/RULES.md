# RULES

## Core boundaries

- Root `AGENTS.md` and root `_harness/*` are for **this repository's own development and maintenance**.
- `template/AGENTS.md` and `template/_harness/*` are for **generated user projects**.
- Do not rely on template files to explain how contributors should work on this repository.
- Do not rewrite maintainer guidance by editing only `template/`.

## Editing rules

- Keep repo-self-use and generated-template responsibilities clearly separated.
- Avoid duplicating maintainer instructions inside generated template files.
- Avoid changing template semantics unless the intended generated output truly changes.
- When docs discuss both layers, label them explicitly as **repo self-use** vs **template output**.

## Validation rules

- For CLI or packaging changes, verify the package still copies from `template/`.
- Prefer local end-to-end checks over assumptions.
- Preserve safe defaults: existing files should still be protected unless `--force` is used.

## Documentation rules

- Root docs should help maintainers understand the repository.
- Template docs should help end users understand the generated harness.
- README should explain the difference between repository internals and template output.

## Release rules

- Use Conventional Commits.
- Add/update a changeset when the change is publish-relevant.
- Keep publishable package contents aligned with `package.json#files`.
