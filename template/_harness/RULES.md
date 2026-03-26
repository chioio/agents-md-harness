# RULES

- Read `AGENTS.md` first.
- Do not assume every harness file must be loaded.
- Prefer the smallest useful instruction set.
- Escalate only when the task actually needs more context.

## Memory rules

- Store long-term project knowledge in `_harness/memory/project.md`.
- Store short-term per-agent working context in `_harness/memory/agents/*.local.md`.
- Do not commit per-agent local memory files.
