# Slider Dots

Figma: `Slider Dots` (5:17). Markup: `stories/atoms/slider-dots.markup.ts`.

Position indicator for a carousel; each dot is a labelled button. The current dot carries `aria-current`. A dot draws
a 6px bar but takes clicks on 24 × 24px (WCAG 2.5.8) without making the row taller.

| Prop | Values |
|---|---|
| `count` | number of cards |
| `active` | zero-based index |
| `label` | prefix for accessible names, default "Karte" |

Tokens: `--color-hair`, `--color-accent`, `--space-8`, `--radius`.
