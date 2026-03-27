---
role: maintainer-guide
scope: task-routing
---

# ROUTING

Route by task before loading more files.

## Task mapping

- understand what this repo is -> `readme.md`
- find where a file or responsibility lives -> `catalog.md`
- modify CLI behavior -> `catalog.md`, `rules.md`, `workflow.md`
- update generated template output -> `catalog.md`, `rules.md`, `workflow.md`
- update public README docs -> `rules.md`, `workflow.md`, then `README.md` / `README.zh-CN.md`
- check whether a change belongs in root docs vs template docs -> `readme.md`, `rules.md`, `catalog.md`
- sync bilingual README content -> `rules.md`, `workflow.md`
- validate sample or generated output -> `catalog.md`, `workflow.md`
- prepare a publish-relevant change -> `rules.md`, `workflow.md`

## Common decision points

- if the change is about **how this repository is maintained**, edit root `AGENTS.md` or root `_harness/*`
- if the change is about **what users receive**, edit `template/`
- if the change is about **public human-facing project explanation**, edit `README.md` and sync `README.zh-CN.md`
- if the change is about **example/demo behavior**, inspect whether `sample/` also needs updating

## Principle

Load the minimum relevant file set, then expand only if the task crosses repo, template, sample, or release boundaries.
