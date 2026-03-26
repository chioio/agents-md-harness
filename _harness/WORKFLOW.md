---
role: maintainer-guide
scope: workflows
---

# WORKFLOW

## CLI development

1. Modify `bin/agents-md-harness.js`
2. Test with `pnpm test:cli`
3. Run `pnpm format`
4. Create changeset
5. Commit

## Template update

1. Modify `template/`
2. Test with `pnpm test:cli`
3. Create changeset
4. Commit

## Release

1. Merge to main
2. Review release PR
3. Merge release PR
4. Auto-publish to npm
