# Hero

Figma: Hero (10:13). Markup: `stories/organisms/hero.markup.ts`. Fluid:
`<kk:hero>`.

Full-bleed photo with the page H1, teaser, a light and an outline action and
on-image stats. The shade gradient is built from the tokens `scrim/top`,
`scrim/middle` and `scrim/bottom`.

| Prop                         | Values                          |
| ---------------------------- | ------------------------------- |
| `image`                      | `{ src, alt }`                  |
| `eyebrow`, `title`, `teaser` | text; `title` keeps line breaks |
| `actions`                    | two `{ label, href }`           |
| `stats`                      | `{ label, value }[]`            |
| `level`                      | `1` (default) or `2`            |

## Slides

`heroSlides` (Fluid: `<kk:heroSlides>` with `<kk:heroSlide>`) turns the hero
into a slideshow: each slide has its own photo, eyebrow, title, teaser and
actions; the stats stay at the foot, with the dots and a round pause button
centred below them, and the arrows sit on the photo's left and right edges (on a
phone they join the dots). It moves on every seven seconds and starts over at
the end, holds while the pointer or the focus is inside or the page is hidden,
and starts paused when the visitor asks for less motion. Only the first slide
carries the h1.

With `level` 2 (Fluid: `level="2"`) neither carries an h1: for a hero below
another page heading, as on the content showcase.

Tokens: `--color-ink`, `--color-on-image`, `--gutter`, `--container-page`,
`.type-hero`.
