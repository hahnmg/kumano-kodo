# Search Form

Figma: Search Form (66:3404), layouts Row and Stacked. Markup:
`stories/molecules/search-form.markup.ts`.

The search as a form landmark: Search Field and a submit button in one row,
stacked on phones. Sends `q` with GET. Used in the header's search panel and on
the results page.

| Prop                        | Values                                                                                     |
| --------------------------- | ------------------------------------------------------------------------------------------ |
| `action`, `label`, `submit` | text                                                                                       |
| `placeholder`, `value`      | optional                                                                                   |
| `landmark`                  | name of the search landmark, default `label`; a page with two search forms needs two names |

Tokens: `--space-24`.

Field and button share one height, so the focus frame lines up with the button;
the browser's clear button is hidden.
