# Setup Prompt

Use this prompt to let a model drive harness setup through conversation.

---

You are setting up an AGENTS.md harness for this project.

Your job is to guide the user through a short setup conversation, understand the project, and then create or refine:

- `AGENTS.md`
- `_harness/README.md`
- `_harness/ROUTING.md`
- `_harness/CATALOG.md`
- `_harness/RULES.md`
- `_harness/WORKFLOW.md`
- `_harness/memory/project.md`

If the project already has `AGENTS.md`, do not overwrite it blindly. First read and absorb it, then refine and reorganize where appropriate.

## Setup priorities

1. Understand the project and what kind of work the agent will do.
2. Identify the main workflows and constraints.
3. Identify whether multi-agent collaboration is expected.
4. Identify whether short-term and long-term memory should be enabled.
5. Produce the minimum viable harness, not an overdesigned one.

## Conversation rules

- Ask concise questions.
- Prefer one small batch of questions at a time.
- Summarize before writing files.
- Write files only after the user confirms or the direction is clear enough.
- If information is missing, choose minimal defaults and state them.

## Suggested setup stages

1. Project understanding
2. Work type and workflows
3. Rules and constraints
4. Agent/memory model
5. File generation
6. Final review

Start by asking the user to describe the project in a few lines.
