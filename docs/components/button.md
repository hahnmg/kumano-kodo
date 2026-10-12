# Button

Figma: `Button` (5:9), Style Primary, Secondary, Light and Outline. Markup: `stories/atoms/button.markup.ts`. Fluid: `<kk:button>`.

The one call to action of a section. Renders a `button`, or a link when `href` is set.

| Prop | Values |
|---|---|
| `label` | text |
| `variant` | `primary` (default) and `secondary` (an outline, for example a form's way back) on page ground, `light` and `outline` on photos only |
| `href` | optional; switches to a link |
| `type` | `button` (default), `submit` |

Tokens: `--color-ink`, `--color-paper`, `--color-on-image`, `--color-on-image-ink`, `--space-14`, `--space-28`, `--radius`, `.type-button`.
