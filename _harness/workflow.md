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
5. If the doc change affects template semantics, check whether `template/` or `sample/` also needs updating.
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
5. Decide whether `sample/` should be regenerated or revised for parity.
6. Create a changeset if publish-relevant.
7. Commit.

## README editing workflow

1. Keep README human-facing.
2. Remove agent-operating rules if they drift into README.
3. Move maintainer or agent-specific guidance into root `AGENTS.md` or root `_harness/*`.
4. Keep the two README language versions aligned in meaning, not just roughly similar.

## Release

1. Merge to `main`.
2. Review the release PR.
3. Merge the release PR.
4. Let GitHub Actions publish to npm.
