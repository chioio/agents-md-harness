# Runtime Testing

Use this directory for session-based harness evaluation in `samples/todo-app/`.

## Files

- `tasks.json`: runtime task corpus
- `run-codex-eval.js`: safer helper for nested `codex exec` runtime checks

## How to use

1. Open a fresh agent session in `samples/todo-app/`.
2. Pick one task from `tasks.json`.
3. Paste the `task` text directly to the agent.
4. Observe whether the agent starts from `AGENTS.md`, loads the minimum useful harness set, and stays within the correct boundary.
5. Record the result in your own review notes or issue tracker.

## Helper script

If you want to run Codex fresh-session checks from another Codex session, prefer:

```bash
pnpm test:runtime:codex -- fe-minimal-routing --first-response-only
```

This helper:

- keeps live progress visible with `codex exec --json`
- still writes the final message to `.tmp/runtime-eval/*.last.md`
- disables OTEL exporters by default to reduce nested Codex startup noise
- kills only the spawned child process on timeout or interrupt
- does not use `killall codex`

For smoke checks, prefer `--first-response-only` so the inner run stops after routing and boundary judgment instead of continuing into implementation.

For custom prompts:

```bash
node ./tests/runtime/run-codex-eval.js \
  --prompt "在 fe/ 中新增一个 TODO 列表空状态组件。先判断这是 FE 任务，说明应先加载哪些最小必要 harness 文档，再开始设计与实现。" \
  --label custom-fe-check \
  --first-response-only
```

## Suggested order

Start with `level: smoke`:

- quick routing checks
- confirmation boundary checks
- README boundary checks
- basic memory decision checks

Then run `level: deep`:

- FE-BE alignment tasks
- product or architecture document tasks
- short-term memory cycle checks
- GC checks
- multi-agent collaboration checks

## What to record

- task id
- model / runtime
- pass or fail
- key observations
- notable mistakes
- whether behavior was stable across repeated fresh sessions

## Pass signal

Treat the task as passing when the agent:

- enters through `AGENTS.md`
- loads a small and relevant harness set first
- respects README / harness / code / memory boundaries
- uses confirmation rules correctly
- uses short-term and long-term memory in the intended way

For multi-agent tasks, also check:

- role split is coherent
- one shared harness is preserved
- durable decisions go to shared memory rather than scattered local notes
