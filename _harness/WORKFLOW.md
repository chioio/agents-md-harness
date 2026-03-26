# WORKFLOW

## Standard repo task flow

1. Read root `AGENTS.md`.
2. Classify the task: repo code, template files, docs, or release.
3. Load only the minimum relevant maintainer docs from root `_harness/`.
4. Make changes in the correct layer:
   - root docs/harness for repository self-use
   - `template/` for generated template output
   - `bin/` for CLI behavior
5. Run the smallest useful validation for the touched surface.
6. If publish-relevant, add a changeset and use a Conventional Commit.

## Typical procedures

### Repo self-use documentation change

- Edit root `AGENTS.md` and/or root `_harness/*`
- Update `README.md` if public docs should reflect the distinction
- Validate formatting or consistency as needed

### Template change

- Edit files under `template/`
- Ensure generated output still matches intended user-facing semantics
- Run `init` into a temp directory to inspect generated files

### CLI behavior change

- Edit `bin/agents-md-harness.js`
- Run local CLI verification, ideally with both direct node execution and package-style usage when practical
- Confirm files still come from `template/`

### Release/documentation maintenance

- Update docs, package metadata, or changesets as needed
- Check `.changeset/` and `package.json` alignment

## Minimum validation guidance

- For docs-only changes: confirm files are coherent and boundaries are explicit
- For template changes: run `init` into a temp directory and inspect the emitted structure
- For CLI changes: verify `init`, overwrite protection, and `--force` behavior when relevant

## Definition of done for this repo

A change is complete when:

- the correct layer was edited
- repo-vs-template boundaries remain explicit
- affected docs are aligned
- local validation covers the changed behavior
- the commit message follows Conventional Commits
