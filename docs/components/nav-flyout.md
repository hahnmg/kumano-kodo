# Nav Flyout

Figma: Nav Dropdown (37:181), Nav Mega (37:194). Markup: `stories/molecules/nav-flyout.markup.ts`. Script: `src/scripts/nav-flyout.ts`.

The panel under a nav item. `dropdown` is a link list; `mega` is a panel with link columns, a rich-text block with an
overview link and a teaser with image. On its own it renders in place; the site header places it under its item or
across the full width, opens one at a time and folds it into an accordion on narrow screens.

| Prop   | Values                                                                             |
| ------ | ---------------------------------------------------------------------------------- |
| `kind` | `dropdown` with `links`, or `mega` with `columns`, `text?`, `teaser?`, `overview?` |

Tokens: `--color-paper`, `--color-line`, `--color-accent`, `--color-ink`, `--color-muted`, `--space-*`.
