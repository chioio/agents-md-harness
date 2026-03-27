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
5. If the doc change affects template semantics, check whether `template/` or `samples/` also needs updating.
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
5. Decide whether one or more `samples/` fixtures should be regenerated or revised for parity.
6. Create a changeset if publish-relevant.
7. Commit.

## README editing workflow

1. Keep README human-facing.
2. Remove agent-operating rules if they drift into README.
3. Move maintainer or agent-specific guidance into root `AGENTS.md` or root `_harness/*`.
4. Keep the two README language versions aligned in meaning, not just roughly similar.

## Harness effectiveness testing

Use this workflow when you want to test whether the harness is actually useful, not just present.

### 1. Setup usability

- run `pnpm test:cli` or an equivalent `setup` run into a disposable target
- confirm the starter structure is created as expected
- confirm an agent can continue from `_harness/.setup/` and generate the core harness files

### 2. Routing quality

- give the agent tasks from different categories, such as:
  - README update
  - CLI change
  - template change
  - frontend/backend sample validation
- check whether the agent loads the smallest relevant file set first instead of reading everything
- check whether the agent routes to the correct layer: root docs, `template/`, or `samples/`

### 3. Rules adherence

- test tasks with easy-to-miss boundaries
- confirm the agent keeps README human-facing
- confirm the agent syncs `README.md` and `README.zh-CN.md` when needed
- confirm the agent does not confuse repo self-use guidance with template output

### 4. Memory and GC behavior

- inspect whether durable decisions are preserved in the right place
- inspect whether short-term context stays local and task-scoped
- inspect whether GC guidance helps keep memory compact instead of noisy

### 5. Multi-agent consistency

- give similar tasks to multiple agents or across multiple runs
- check whether they make similar routing and boundary decisions
- check whether they interpret README, template, samples, and root harness roles consistently

### 6. Fixture-project checks

- use `samples/fe-todo-app` to test frontend-oriented harness behavior
- use `samples/be-todo-app` to test backend-oriented harness behavior
- use `pnpm test:harness` for repo-level fixture assertions
- treat `tests/harness/run.js` as the minimal contract test for fixture structure and harness metadata

### Pass criteria

The harness is working if agents become more consistent, less noisy, and less likely to edit the wrong layer while still completing realistic tasks.

## Release

1. Merge to `main`.
2. Review the release PR.
3. Merge the release PR.
4. Let GitHub Actions publish to npm.
