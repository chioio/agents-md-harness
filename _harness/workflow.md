---
role: maintainer-guide
scope: workflows
---

# WORKFLOW

## Docs maintenance

1. Decide whether the task is public docs, repo self-use harness docs, or template output docs.
2. Update the smallest correct layer.
3. If `README.md` changes in meaning, sync `README.zh-CN.md` in the same pass.
4. Re-check file paths, commands, and generated-output descriptions against the real repository.
5. If docs change template semantics, update tests or sample docs if needed.
6. Run `pnpm format` if needed.

## CLI development

1. Modify `bin/agents-md-harness.js`
2. Validate with `pnpm test:cli`
3. Update public docs if CLI behavior changed
4. Update root harness docs if maintainer guidance also changed
5. Run `pnpm format`
6. Create a changeset if the change is publish-relevant
7. Commit

## Template update

1. Modify `template/`
2. Validate with `pnpm test:cli`
3. Update public docs if generated output or setup flow changed
4. Sync both README languages for user-visible changes
5. Update structure tests if needed
6. Create a changeset if the change is publish-relevant
7. Commit

## README editing

1. Keep README human-facing.
2. Remove agent-operating rules if they drift into README.
3. Move maintainer or agent-specific guidance into root `AGENTS.md` or root `_harness/*`.
4. Keep the two README language versions aligned in meaning.

## Harness effectiveness testing

Use this workflow when you want to test whether the harness actually changes agent behavior.
Default runtime scenario: `samples/todo-app`.

### 1. Contract checks

- run `pnpm test:cli`
- run `pnpm test:harness`
- treat these as structure guards for template output and `samples/todo-app`

### 2. Fresh-session checks

- open a fresh agent session in `samples/todo-app`
- give it a task from `tests/runtime/tasks.json`
- check whether it starts from `AGENTS.md`
- check whether it loads the smallest useful harness set first
- check whether it routes before reading everything

### 3. Boundary checks

- test README, repo-vs-template, and risky-change tasks
- confirm the agent keeps README human-facing
- confirm the agent does not confuse repo self-use guidance with template output
- confirm risky tasks are aligned or confirmed before implementation

### 4. Memory and GC checks

- inspect whether durable decisions go to the right shared memory
- inspect whether short-term context stays task-scoped
- inspect whether GC guidance compresses noise instead of preserving it

### 5. Consistency checks

- repeat the same task across multiple fresh sessions
- compare multiple agents when useful
- check whether routing, boundary decisions, and memory usage stay broadly consistent

### Pass criteria

The harness is working if fresh-session agents become more consistent, less noisy, more likely to start from `AGENTS.md`, and less likely to edit the wrong layer.

## Release

1. Merge to main
2. Review release PR
3. Merge release PR
4. Auto-publish to npm
