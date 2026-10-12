# Rich Text

Figma: Rich Text (19:178). Markup: `stories/molecules/rich-text.markup.ts`. Fluid: `<kk:richText>`.

Editorial HTML from the CMS (h2, h3, p, lists, links). The content is trusted and not escaped; styles use the `--type-*` variables because CMS markup carries no classes.

List markers are an accent dash or number set with `::marker`, so lists keep their semantics in Safari. Links to other
sites (`href` starting with `http`) get a ↗ and the hidden words "external link" in English, German or Japanese, after the
page language.

| Prop | Values |
|---|---|
| `html` | trusted HTML |

Tokens: `--type-h3-*`, `--type-h4-*`, `--type-body-*`, `--color-accent`, `--space-8`, `--space-20`.
