# Figma replaces Paper as the source of truth

Date: 2026-09-29 Status: accepted Supersedes:
2026-09-23-paper-as-source-of-truth.md, 2026-09-29-version-paper-state-in-git.md

## Context

Paper has no components or instances, no theme modes, no reachable version
history, and its free plan allows 100 MCP calls per week, which one sync nearly
exhausts. The team already pays for Figma Professional (Full seat: 200 MCP calls
per day, 4 modes per collection).

## Decision

- The Figma file `p6SK2xN5ZzBisOW1wKlrDm` is the design reference. Components
  live on the page "Components", composed pages on "Pages".
- Tokens are Figma variables: `Primitives` (hidden raw values), `Color` (modes
  Light and Dark, caramel theme), `Spacing` (space scale, layout values, radii).
  Every variable carries its CSS name as WEB code syntax, e.g.
  `var(--color-ink)`.
- Typography is 16 text styles on 13 font sizes, consolidated from 29 sizes.
- Every colour, spacing and radius in a component is bound to a variable. The
  hero gradient is the one local value.
- `docs/figma-map.json` maps Figma component nodes to code components until Code
  Connect replaces it.
- Design history lives in Figma's version history; the Paper snapshot stays as
  the record of the v3 migration and is no longer updated.

## Consequences

- Editing a component in Figma updates every instance, including the home page.
- Section headings, button text and body sizes changed slightly through
  consolidation; the page is no longer pixel-identical to the v3 export.
- The Paper snapshot script is obsolete.
