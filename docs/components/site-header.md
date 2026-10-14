# Site Header

Figma: Site Header (36:213), Site Header · Mobile (37:317), Nav Item (21:100),
Search Toggle (65:238), Search Panel (66:227). Markup:
`stories/organisms/site-header.markup.ts`.

Logo, main navigation, languages and the dark mode toggle. The header is sticky;
a topbar above it scrolls away. Once docked, `src/scripts/sticky-header.ts` sets
`data-stuck` and the header tightens, scales the logo to 82 % and turns frosted;
a bottom margin returns the height it gives up, so the page does not jump. Nav
items with a `menu` become disclosure buttons that open a flyout: `dropdown` (a
link list under the item) or `mega` (a full-width panel with link columns, a
rich-text block with overview link and a teaser with image).
`src/scripts/nav-flyout.ts` opens one at a time and closes on Escape, an outside
click or when focus leaves the item. Below 900px navigation, languages and
toggle fold behind a menu button and flyouts open inline as an accordion;
`src/scripts/menu-toggle.ts` opens it (`data-menu-open`, `aria-expanded`) and
closes it on Escape. The toggle is a pressed-state button;
`src/scripts/scheme-toggle.ts` switches `data-scheme` on `<html>` and keeps
`aria-pressed` in step. Language links carry `lang`, `hreflang` and
`data-locale`; in Storybook they switch the story language.

| Prop        | Values                                                                                                                                                                |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `nav`       | `{ label, href, active?, menu?, open? }[]`; `menu` is `{ kind: 'dropdown', links }` or `{ kind: 'mega', columns, text?, teaser?, overview? }`                         |
| `languages` | optional `{ code, locale, href, active? }[]`                                                                                                                          |
| `labels`    | optional `{ nav, languages, scheme, menu }` accessible names, English by default                                                                                      |
| `search`    | optional Search Form props: a search button before the languages opens it in a panel across the header; folded behind the menu button the form stands open at the top |

Tokens: `--color-paper`, `--color-line`, `--color-ink`, `--color-accent`,
`--gutter`, `--motion-fast`.
