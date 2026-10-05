# Search Results

Figma: Search Results (66:239). Markup: `stories/molecules/search-results.markup.ts`.

The answer to a search: a summary line, then the results as Media List rows without a picture, each with its path and the passage that matched, the match in `<mark>`. Pagination follows when there is more than one page. Sample results in Storybook come from a real search over the journal texts (`stories/templates/search-sample.ts`).

| Prop | Values |
|---|---|
| `label` | name of the results region |
| `summary` | for example "3 results for “bus”", or the empty-state text |
| `items` | `title`, `href`, `path`, `excerpt` (markup) |
| `pagination` | optional markup of the Pagination molecule |

Tokens: `--color-line`, `--color-muted`, `--color-sunk`, `--space-16`, `--space-40`; rows as Media List.
