# Proposal: foundation tokens

Status: implemented as Figma variables and text styles, see ADR 2026-09-29-figma-replaces-paper.md

Values are taken from the current Paper page, which mirrors the "caramel / light"
theme of the original export. Tailwind v4 namespaces, as Paper expects.

## Colour

| Token | Value | Used for |
|---|---|---|
| `--color-paper` | `#FBF7F1` | page background |
| `--color-sunk` | `#F3ECE1` | stages and FAQ bands |
| `--color-surface` | `#FFFFFF` | inputs, light button |
| `--color-ink` | `#241A12` | text, strong rules, dark button |
| `--color-muted` | `#665445` | body copy, captions |
| `--color-line` | `#E3D8C9` | hairlines |
| `--color-hair` | `#CFC0AB` | stronger hairlines, inactive dots |
| `--color-moss` | `#4A6350` | route on the map |
| `--color-accent` | `#96481F` | eyebrows, day labels, active state |
| `--color-on-image` | `#FFFFFF` | hero text |

The hero overlay gradient and the theme swatches in the header stay local to their
components (see open questions).

## Type

| Token | Value |
|---|---|
| `--font-display` | Fraunces |
| `--font-body` | Inter |
| `--font-weight-regular` | 400 |
| `--font-weight-medium` | 500 |
| `--font-weight-semibold` | 600 |

Font sizes in use: 11, 11.5, 12, 12.5, 13, 13.5, 14, 15, 15.5, 16, 17, 17.5, 18.72, 19,
20, 26, 28, 28.8, 31.68, 34, 48, 48.96, 51.84, 54, 60, 62, 66, 130, 144 px.
Proposed scale, pending the consolidation question:

| Token | Size / leading | Replaces |
|---|---|---|
| `--text-label` | 12 / 20 | 11, 11.5, 12, 12.5 (uppercase, tracked) |
| `--text-caption` | 13.5 / 23 | 13, 13.5, 14 |
| `--text-small` | 15.5 / 26 | 15, 15.5, 16 |
| `--text-body` | 17 / 29 | 17, 17.5 |
| `--text-lead` | 19 / 32 | 18.72, 19 |
| `--text-h4` | 28 / 30 | 26, 28, 28.8 |
| `--text-h3` | 34 / 36 | 31.68, 34 |
| `--text-h2` | 60 / 64 | 48, 51.84, 54, 60, 66 |
| `--text-quote` | 49 / 56 | 48.96 |
| `--text-stat` | 62 / 62 | 62 |
| `--text-display` | 130 / 137 | 130 |
| `--text-wordmark` | 144 / 132 | 144 |

## Spacing and layout

| Token | Value | Used for |
|---|---|---|
| `--spacing-gutter` | 56px | page side padding |
| `--spacing-section` | 128px | vertical section padding |
| `--spacing-grid-gap` | 24px | 12-column grid gap |
| `--container-page` | 1328px | content width at 1440 |
| `--radius-button` | 2px | buttons |
| `--radius-dot` | 2px | slider dots |

## Out of this proposal

Mobile values. Paper has no mobile artboards yet, so no breakpoint tokens are proposed.
