# Bleed Photo

Figma: Bleed Photo (61:227). Markup: `stories/molecules/bleed-image.markup.ts`.

One photo across the full viewport width, at most 90 % of the screen height, with its caption in the page container.
Opens in the lightbox. The home page uses it for the sea of clouds and the last evening.

| Prop      | Values                                  |
| --------- | --------------------------------------- |
| `image`   | photo with srcset and caption           |
| `caption` | optional, defaults to the photo caption |
| `labels`  | lightbox labels                         |

Tokens: `--color-muted`, `--space-12`, `--gutter`, `--container-page`.
