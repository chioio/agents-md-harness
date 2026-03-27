# Template: routing.md

This template guides the generation of `_harness/routing.md` during setup.

## Purpose

Map task types to relevant harness files for efficient loading.

## Structure to generate

```markdown
# ROUTING

Route by task before loading more files.

## Task-to-file mapping

[PLACEHOLDER - MUST ask user these questions before generating:

1. What are the most common task types in this project?
2. Which harness files are most relevant for each task type?

Then generate task-to-file mappings based on user responses.

Example format:

- "understand project" → readme.md
- "find module/file" → catalog.md
- "check constraints" → rules.md
- "execute workflow" → workflow.md

DO NOT generate this section with generic examples. Customize based on actual project task patterns.]

## Principle

Load the minimum relevant file set for the current task.
```

## Questions to ask during setup

1. What are the most common task types in this project?
2. Which harness files are most relevant for each task type?
