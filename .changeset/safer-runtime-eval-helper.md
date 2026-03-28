---
"agents-md-harness": patch
---

Add a safer nested Codex runtime-eval helper for `samples/todo-app` smoke checks.

The helper keeps JSON progress visible, supports first-response-only smoke runs, and avoids using global `killall codex` cleanup.
