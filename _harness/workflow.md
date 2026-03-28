---
role: maintainer-guide
scope: workflows
---

# WORKFLOW

## Docs maintenance

1. Decide whether the task is:
   - public human-facing docs
   - repo self-use harness docs
   - template output docs
2. Update the smallest correct layer.
3. If `README.md` changes in meaning, sync `README.zh-CN.md` in the same pass.
4. Re-check examples, file paths, command names, and generated-output descriptions against the real repository.
5. If the doc change affects template semantics, check whether `template/` or structure tests also need updating.
6. Run `pnpm format` if needed.

## CLI development

1. Modify `bin/agents-md-harness.js`.
2. Validate with `pnpm test:cli`.
3. Update public docs if CLI behavior changed.
4. Sync both README languages when user-visible behavior changes.
5. Update root harness docs if maintainer guidance also changed.
6. Run `pnpm format`.
7. Create a changeset if publish-relevant.
8. Commit.

## Template update

1. Modify `template/`.
2. Validate with `pnpm test:cli`.
3. Update public docs if generated output or setup flow changed.
4. Sync both README languages for user-visible changes.
5. Update structure tests if needed.
6. Create a changeset if publish-relevant.
7. Commit.

## README editing workflow

1. Keep README human-facing.
2. Remove agent-operating rules if they drift into README.
3. Move maintainer or agent-specific guidance into root `AGENTS.md` or root `_harness/*`.
4. Keep the two README language versions aligned in meaning, not just roughly similar.

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
- check whether it routes to the correct layer instead of reading everything

### 3. Boundary checks

- test tasks with easy-to-miss confirm boundaries
- confirm the agent keeps README human-facing
- confirm the agent does not confuse repo self-use guidance with template output
- confirm risky tasks are aligned or confirmed before implementation

### 4. Memory and GC behavior

- inspect whether durable decisions are preserved in the right place
- inspect whether short-term context stays local and task-scoped
- inspect whether GC guidance helps keep memory compact instead of noisy

### 5. Consistency checks

- repeat the same task across multiple fresh sessions in `samples/todo-app`
- check whether routing and boundary decisions stay broadly consistent
- use multi-agent comparison when useful, but keep fresh-session behavior as the primary signal

### Pass criteria

The harness is working if fresh-session agents become more consistent, less noisy, more likely to start from `AGENTS.md`, and less likely to edit the wrong layer.

## Release

1. Merge to `main`.
2. Review the release PR.
3. Merge the release PR.
4. Let GitHub Actions publish to npm.
