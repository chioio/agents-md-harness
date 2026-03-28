---
"agents-md-harness": minor
---

Add a built-in `skills/harness` audit capability to the generated harness template.

The new skill includes:

- `SKILL.md` for harness-focused audit commands
- `audit.py` to write a full `.tmp/HARNESS_AUDIT.md` report
- `token_audit.py` for compact token tables

It also updates `setup --force` so stale managed files from older template revisions are pruned during regeneration.
