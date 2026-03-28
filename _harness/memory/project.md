# Project Memory

## Recent changes

- 2026-03-27: Restructured template for setup conversation
- 2026-03-27: Changed to lowercase file names
- 2026-03-27: Added PLACEHOLDER markers
- 2026-03-28: Static tests were reduced to structure-only guards.
- 2026-03-28: Earlier raw-model eval experiments were superseded.
- 2026-03-28: Primary proof of harness quality is now fresh-session agent behavior.

## Key decisions

- Template = framework only
- Setup must be conversational
- CLI and agent setup are separate
- Harness quality should be validated mainly through fresh-session agent behavior, not markdown content assertions
- `samples/todo-app` is the primary runtime evaluation scenario for session, memory, GC, and multi-agent testing
