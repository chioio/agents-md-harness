---
role: maintainer-guide
scope: task-routing
---

# ROUTING

Route by task before loading more files.

## Task mapping

- understand repo purpose or repo-vs-template boundary -> `readme.md`
- find where a file, directory, or responsibility lives -> `catalog.md`
- modify CLI behavior -> `catalog.md`, `rules.md`, `workflow.md`
- update generated template output -> `catalog.md`, `rules.md`, `workflow.md`
- update public human-facing docs -> `rules.md`, `workflow.md`, then `README.md` / `README.zh-CN.md`
- decide whether a change belongs in root docs, `template/`, or `samples/` -> `readme.md`, `rules.md`, `catalog.md`
- validate sample structure or runtime testing flow -> `catalog.md`, `workflow.md`
- prepare a publish-relevant change -> `rules.md`, `workflow.md`

## Boundary points

- repo self-use guidance -> root `AGENTS.md` or root `_harness/*`
- end-user output -> `template/`
- runtime evaluation scenario -> `samples/`
- public human explanation -> `README.md` + `README.zh-CN.md`

## Principle

Load the minimum relevant file set first.
Expand only when the task crosses repo, template, sample, or release boundaries.

## Agent integration

- multi-agent or runtime-eval questions -> `workflow.md`
- memory ownership questions -> `AGENTS.md`, `memory/project.md`
- capability or reusable skill questions -> `skills/readme.md`
