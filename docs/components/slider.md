# Slider

Figma: Section Heading with controls, Stage Card, Slider Dots. Markup: `stories/organisms/slider.markup.ts`. Fluid: `<kk:slider>`.
Script: `src/scripts/slider.ts`.

Section heading with arrows, a scrolling track and dots. The script works with the positions the track can actually
reach: one per item until the end is in view, then the end. Dots beyond those are hidden, so on a wide screen with three
cards in view there are three dots, on a phone five. Arrows step to the next reachable position and are disabled at
either end; quick clicks add up; the dots follow scrolling and swiping; the arrow keys work when the track has focus. Without the
script the track still scrolls and snaps. In a bleed section the track runs to the viewport edge while its first item, the heading and the dots line up with the page container; the scrollbar is hidden.

| Prop | Values |
|---|---|
| `heading` | Section Heading props without `variant` |
| `items` | rendered items, for example Stage Cards |
| `labels` | optional `{ previous, next, item }`, English by default |

Tokens: `--gutter`, `--space-40`, `--color-accent`.
