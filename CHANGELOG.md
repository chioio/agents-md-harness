# agents-md-harness

## 0.1.0-alpha.2

### Minor Changes

- d6470af: Add a built-in `skills/harness` audit capability to the generated harness template.

  The new skill includes:

  - `SKILL.md` for harness-focused audit commands
  - `audit.py` to write a full `.tmp/HARNESS_AUDIT.md` report
  - `token_audit.py` for compact token tables

  It also updates `setup --force` so stale managed files from older template revisions are pruned during regeneration.

## 0.1.0-alpha.1

### Patch Changes

- 7f0beaf: Add a safer nested Codex runtime-eval helper for `samples/todo-app` smoke checks.

  The helper keeps JSON progress visible, supports first-response-only smoke runs, and avoids using global `killall codex` cleanup.

## 0.1.0-alpha.0

### Patch Changes

- Restructure template as conversation-driven framework
- 86052db: Rename the generated output source directory from `scaffold/` to `template/` across the package, CLI copy path, packaging metadata, and maintainer documentation.
- 86052db: docs: clarify repository self-use harness versus generated scaffold output
