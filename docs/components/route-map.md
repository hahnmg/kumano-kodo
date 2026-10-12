# Route Map

Figma: Route Map (10:41). Markup: `stories/organisms/route-map.markup.ts`. Fluid: `<kk:routeMap>`.

Schematic route as SVG with stations, day boundaries, day labels and legend.

| Prop | Values |
|---|---|
| `path` | SVG path in a 1000×250 box |
| `stations` | `{ name, x, y, labelY, anchor?, boundary? }[]` |
| `days` | `{ label, x }[]` |
| `legend`, `label` | texts |

Tokens: `--color-secondary`, `--color-accent`, `--color-line`, `--color-hair`, `--color-paper`.
