# Skills

Harness skills are capability units inside `_harness/skills/`.

A harness skill should use this shape:

1. **frontmatter** — quick routing metadata
2. **protocol body** — execution guidance

## What a skill is for

- capture a reusable capability
- define when the capability should be used
- describe how the capability should execute
- keep capability logic separate from global rules and workflows

## What goes in frontmatter

Use frontmatter for routing-level information:

- `name`
- `purpose`
- `triggers`
- `inputs`
- `outputs`

## What goes in the protocol body

Use the markdown body for execution:

- what the skill does
- required steps
- constraints
- examples
- expected outputs

## Rule of thumb

- frontmatter decides **whether to use the skill**
- protocol body decides **how to run the skill**
