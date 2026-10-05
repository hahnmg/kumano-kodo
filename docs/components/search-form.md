# Search Form

Figma: not yet drawn. Markup: `stories/molecules/search-form.markup.ts`.

The search as a form landmark: Search Field and a submit button in one row, stacked on phones. Sends `q` with GET. Used in the header's search panel and on the results page.

| Prop | Values |
|---|---|
| `action`, `label`, `submit` | text |
| `placeholder`, `value` | optional |
| `landmark` | name of the search landmark, default `label`; a page with two search forms needs two names |

Tokens: `--space-24`.
