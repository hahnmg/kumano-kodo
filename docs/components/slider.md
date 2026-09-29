# Slider

Figma: Section Heading with controls, Stage Card, Slider Dots. Markup: `stories/organisms/slider.markup.ts`.
Script: `src/scripts/slider.ts`.

Section heading with arrows, a scrolling track and dots. The arrows move by one item and are disabled at either end,
the dots jump to an item and follow the scroll position, the arrow keys work when the track has focus. Without the
script the track still scrolls and snaps. In a bleed section the track runs to the viewport edge while its first item, the heading and the dots line up with the page container; the scrollbar is hidden.

| Prop | Values |
|---|---|
| `heading` | Section Heading props without `variant` |
| `items` | rendered items, for example Stage Cards |
| `labels` | optional `{ previous, next, item }`, English by default |

Tokens: `--gutter`, `--space-40`, `--color-accent`.
