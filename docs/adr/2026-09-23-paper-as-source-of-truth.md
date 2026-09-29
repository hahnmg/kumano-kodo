# Paper is the source of truth, code is synced from it

Date: 2026-09-23
Status: superseded by 2026-09-29-figma-replaces-paper.md

## Context

The Kumano Kodo home page (v3) was rebuilt in Paper from the Claude Design export.
The goal is a Storybook component library whose visual corrections are made in Paper,
not in code. Paper has no push mechanism: code only changes when an agent reads the
design through the Paper MCP (`get_jsx`, `get_computed_styles`, `get_tokens`).

## Decision

- Paper owns markup structure and visual values. Code owns props, variants,
  behaviour, stories and tests.
- Every component has exactly one generated file, `stories/<group>/<name>.markup.ts`.
  It is regenerated from Paper on sync and never edited by hand.
- `docs/paper-map.json` maps each component to its Paper node. A sync reads only the
  mapped nodes, regenerates their markup builders and compares before/after with diffyard.
- Paper styles reference design tokens only. Hex literals in Paper are a sync error,
  not something to translate in code.
- Components live on their own artboards in Paper. Page artboards compose them and
  introduce no markup of their own.

## Consequences

- Sync is an explicit step ("sync from Paper"), not automatic.
- Structural changes in Paper that break a component's props contract stop the sync
  and go to `docs/open-questions.md`.
- The current page artboard must be split into component artboards before the first sync.
- `sections/`, `index.html`, `original/` and `referenz-v3.jpg` are historical input,
  no longer a reference.
