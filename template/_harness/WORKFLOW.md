# WORKFLOW

1. Read `AGENTS.md`.
2. Classify the task.
3. Route to the most relevant harness file.
4. Load only additional files when needed.
5. Execute the task under the selected constraints.

## Memory workflow

- Update shared durable knowledge in `_harness/memory/project.md` when it becomes project-relevant.
- Keep temporary agent context in `_harness/memory/agents/<agent>.local.md`.

## Setup workflow

- Prefer prompt-first setup over manual file authoring.
- Use `_harness/setup/PROMPT.md` to enter setup mode.
- Use `_harness/setup/FLOW.md` to structure the conversation and outputs.

## GC workflow

- Periodically run harness GC to keep memory and guidance compact.
- Clean short-term local memory aggressively.
- Keep long-term memory durable and high-signal.
