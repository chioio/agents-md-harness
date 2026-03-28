# Runtime Testing

Use this directory for session-based harness evaluation in `samples/todo-app/`.

## Files

- `tasks.json`: runtime task corpus

## How to use

1. Open a fresh agent session in `samples/todo-app/`.
2. Pick one task from `tasks.json`.
3. Paste the `task` text directly to the agent.
4. Observe whether the agent starts from `AGENTS.md`, loads the minimum useful harness set, and stays within the correct boundary.
5. Record the result in your own review notes or issue tracker.

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
