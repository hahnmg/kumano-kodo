# Version the Paper state in git

Date: 2026-09-29
Status: superseded by 2026-09-29-figma-replaces-paper.md

## Context

Paper documents no version history, restore or export of a file state, and the MCP
offers none. The Paper MCP server of the desktop app is reachable at
`127.0.0.1:29979/mcp`, so a script can read the design without an agent.
The free plan allows 100 MCP calls per week.

## Decision

- `scripts/paper-snapshot.mjs` writes markup (inline styles), tokens and screenshots of
  every mapped artboard to `docs/paper-snapshot/`.
- Every sync from Paper runs the snapshot and commits it together with the code change.
- `--only` and `--no-screenshots` limit a run to what changed.

## Consequences

- Design changes are reviewable as text diffs in the same commit as their code.
- Restoring an old state is a rebuild through `write_html`, with new node IDs.
- On the free plan a full snapshot uses about 60 of the 100 weekly calls; regular syncs
  need Paper Pro.
