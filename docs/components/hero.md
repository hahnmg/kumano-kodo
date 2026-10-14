# Hero

Figma: Hero (10:13). Markup: `stories/organisms/hero.markup.ts`. Fluid: `<kk:hero>`.

Full-bleed photo with the page H1, teaser, a light and an outline action and on-image stats. The shade gradient is the one colour outside the tokens; it is to become a token.

| Prop | Values |
|---|---|
| `image` | `{ src, alt }` |
| `eyebrow`, `title`, `teaser` | text; `title` keeps line breaks |
| `actions` | two `{ label, href }` |
| `stats` | `{ label, value }[]` |

Tokens: `--color-ink`, `--color-on-image`, `--gutter`, `--container-page`, `.type-hero`.
