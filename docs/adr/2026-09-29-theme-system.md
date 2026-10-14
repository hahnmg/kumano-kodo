# Four themes as Figma variable modes

Date: 2026-09-29 Status: accepted

## Context

The v3 export (identical to the Claude Design artifact "TYPO3 15 Default
Sitepackage Design") defines four themes, caramel, forest, ocean and violet,
each light and dark. A theme changes more than colour: display and meta font,
display weight, the spacing unit `--step` (8, 6, 10, 8px), section spacing,
radius and body line height. Figma Professional allows four modes per
collection.

## Decision

- Collection `Theme` has the modes Caramel, Forest, Ocean and Violet. It holds
  the palettes (`palette/light/*`, `palette/dark/*`), fonts, line heights, radii
  and the spacing scale.
- `space/N` stays named after its caramel value and scales by `--step / 8` per
  theme; `space/1` and `space/2` are fixed hairline gaps.
- Collection `Color` keeps the modes Light and Dark and aliases each role to the
  palette of the active theme. A frame picks one mode in each collection.
- Text styles bind font family, font style and line height to `Theme` variables.
- `color/on-image-ink` is a constant for dark text on the white hero button, so
  it stays readable in dark mode.

## Consequences

- Figma cannot express the theme effects that rely on gradients, text case or
  box shadows: ocean's accent gradient on rules, dots and hero scrim; violet's
  sun gradient in the H1, uppercase display type, glow and triple rule. These
  live in code only.
- Display tracking stays per text style; violet's +0.08em is not represented in
  Figma.
