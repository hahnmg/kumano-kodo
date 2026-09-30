# Logo

Figma: `Logo` (2:878) and `Logo modern` (55:3167) on the Components page. Paths: `docs/figma-export/logos.json`.
Markup: `stories/atoms/logo.markup.ts`.

Both marks as exported from Figma, linked home. Caramel shows the classic mark, every other theme the modern one; CSS
picks by `data-theme`, so the markup is the same everywhere. In each mark the group `bird` takes the accent colour and
the group `text` the ink colour, so both follow theme and scheme. Below 900px the mark scales down beside the menu
button.

| Prop    | Values                                 |
| ------- | -------------------------------------- |
| `href`  | default `/`                            |
| `label` | accessible name, default "Kumano Kodo" |

In TYPO3 an editor can replace the mark on the root page (field Logo, tab Appearance). An uploaded SVG takes the theme
colours only when its groups are named `bird` and `text`, as the Figma layers are; everything else keeps its own
colours.

Tokens: `--color-accent`, `--color-ink`.
