# agents-md-harness

## 0.1.0-alpha.1

### Patch Changes

- 7f0beaf: Add a safer nested Codex runtime-eval helper for `samples/todo-app` smoke checks.

  The helper keeps JSON progress visible, supports first-response-only smoke runs, and avoids using global `killall codex` cleanup.

## 0.1.0-alpha.0

### Patch Changes

- Restructure template as conversation-driven framework
- 86052db: Rename the generated output source directory from `scaffold/` to `template/` across the package, CLI copy path, packaging metadata, and maintainer documentation.
- 86052db: docs: clarify repository self-use harness versus generated scaffold output
