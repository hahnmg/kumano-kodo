# What the core theme's issues mean for Kumano Kodo

Every Forge issue about TYPO3's first core theme ("Camino", `theme_camino`), and feedback from the core team, read for
what it means here. Sources: the 33 issues of the Forge category "Themes" and the full-text matches for `camino` and
`theme_camino`, with their comments, as of 2026-10-05. Decisions taken from them:
`docs/proposals/2026-10-05-lessons-from-camino.md`.

**Status here**: **Covered** (built and checked), **Partly** (the rest is named), **Open**, **Not applicable** (the
cause does not exist here), **Not checked**.

## Feedback from the core team (2026-09-30)

| Point                                               | Status here | How                                                                                      |
| --------------------------------------------------- | ----------- | ---------------------------------------------------------------------------------------- |
| Say whether the theme is a starting point or a demo | Partly      | Theme and demo are two packages; a starter set as a choice in the demo is open           |
| Decide what integrators can customise               | Covered     | Site settings, own CSS and JS, template folder, recipe for own elements (README › TYPO3) |
| Support the core extensions                         | Covered     | `indexed_search`, `felogin`, `form`, sitemap (see below)                                 |
| Do not depend on `fluid_styled_content`             | Covered     | Own `lib.contentElement`, set load order, documented failure (README › TYPO3)            |
| Uploads without `fluid_styled_content`              | Covered     | List "Downloads" takes file references; type, size and title come from the file          |

## Accessibility

| Issue                                            | Topic                                    | Core status  | Status here    | How                                                                                        |
| ------------------------------------------------ | ---------------------------------------- | ------------ | -------------- | ------------------------------------------------------------------------------------------ |
| [#108669](https://forge.typo3.org/issues/108669) | Main menu keyboard access                | Accepted     | Covered        | Disclosure buttons with `aria-expanded`, Escape closes (`src/scripts/nav-flyout.ts`)       |
| [#108677](https://forge.typo3.org/issues/108677) | Teaser focus outline clipped             | Closed       | Not checked    | Teaser Card outlines its title link (`teaser-card.css`); clipping inside a rail not tested |
| [#108678](https://forge.typo3.org/issues/108678) | Social links focus outline               | Under Review | Not applicable | No social links element                                                                    |
| [#108680](https://forge.typo3.org/issues/108680) | Rounded focus styles clip content        | Closed       | Not checked    | Focus is a 2px outline with offset everywhere; not tested against round icons              |
| [#108793](https://forge.typo3.org/issues/108793) | Logo links without accessible name       | Closed       | Covered        | Logo link carries `aria-label` with the site name (`Partials/Page/SiteHeader.fluid.html`)  |
| [#108794](https://forge.typo3.org/issues/108794) | Paragraphs wrapped around list items     | Closed       | Not applicable | No own `lib.parseFunc_RTE`; the core's is used                                             |
| [#109464](https://forge.typo3.org/issues/109464) | List-only rich text renders invalid HTML | Closed       | Not applicable | Same: cause was the core theme's own `lib.parseFunc_RTE`                                   |
| [#109507](https://forge.typo3.org/issues/109507) | Teaser scroller focus styles             | New          | Covered        | Track outline inset, dots with the accent ring (`slider.css`, `slider-dots.css`)           |

## Core extensions

| Issue                                            | Topic                                              | Core status  | Status here | How                                                                                                   |
| ------------------------------------------------ | -------------------------------------------------- | ------------ | ----------- | ----------------------------------------------------------------------------------------------------- |
| [#108673](https://forge.typo3.org/issues/108673) | Indexed Search styles                              | Accepted     | Covered     | Search in the header, results as Media List (`Resources/Private/Extensions/IndexedSearch/`)           |
| [#108674](https://forge.typo3.org/issues/108674) | Frontend Login styles                              | Closed       | Covered     | Login Form molecule, logged-in state, demo account (`Resources/Private/Extensions/Felogin/`)          |
| [#108675](https://forge.typo3.org/issues/108675) | Form extension styles                              | Accepted     | Covered     | Form atoms with error states (`Configuration/Form/KumanoKodo/`, `Resources/Private/Extensions/Form/`) |
| [#109670](https://forge.typo3.org/issues/109670) | `fluid_styled_content` resets `lib.contentElement` | Under Review | Covered     | The site set loads fluid_styled_content first where installed; a replacement fails visibly            |

## Content and editing

| Issue                                            | Topic                             | Core status  | Status here    | How                                                                                     |
| ------------------------------------------------ | --------------------------------- | ------------ | -------------- | --------------------------------------------------------------------------------------- |
| [#108670](https://forge.typo3.org/issues/108670) | Author name and title misaligned  | Closed       | Not applicable | No global width on text elements; widths are set per component                          |
| [#108682](https://forge.typo3.org/issues/108682) | Link records can be saved empty   | Closed       | Covered        | Link and entry title are required (`tx_kumanokodo_link.php`, `tx_kumanokodo_entry.php`) |
| [#108683](https://forge.typo3.org/issues/108683) | Author element can be saved empty | Closed       | Covered        | Same: every entry needs a title                                                         |
| [#108736](https://forge.typo3.org/issues/108736) | Templates use the record object   | Closed       | Covered        | Content templates read `record`                                                         |
| [#108786](https://forge.typo3.org/issues/108786) | Frontend language navigation      | Closed       | Covered        | Language switch in the header                                                           |
| [#108847](https://forge.typo3.org/issues/108847) | Use `f:render.contentArea`        | Closed       | Covered        | Page and container templates                                                            |
| [#109379](https://forge.typo3.org/issues/109379) | Dark and light mode toggle        | Under Review | Covered        | Site setting and toggle in the header                                                   |
| [#109403](https://forge.typo3.org/issues/109403) | Example link with hidden `rel`    | Closed       | Not applicable | The demo sets no `rel` on links                                                         |
| [#109553](https://forge.typo3.org/issues/109553) | Social links miss Mastodon URLs   | Closed       | Not applicable | No social links element                                                                 |
| [#110176](https://forge.typo3.org/issues/110176) | Wrong figures in demo content     | Closed       | Not applicable | Own demo content                                                                        |

## Backend

| Issue                                            | Topic                                  | Core status | Status here | How                                                                                         |
| ------------------------------------------------ | -------------------------------------- | ----------- | ----------- | ------------------------------------------------------------------------------------------- |
| [#108671](https://forge.typo3.org/issues/108671) | Content elements without own icons     | Accepted    | Covered     | 20 icons for elements and record types, TYPO3 icon grid (`Resources/Public/Icons/Content/`) |
| [#108676](https://forge.typo3.org/issues/108676) | Backend layouts without preview images | Accepted    | Covered     | A screenshot per layout (`Resources/Public/Images/BackendLayouts/`)                         |
| [#108714](https://forge.typo3.org/issues/108714) | Unused backend preview templates       | New         | Covered     | One preview per element, all 11 registered (`Sets/Site/page.tsconfig`)                      |
| [#109599](https://forge.typo3.org/issues/109599) | Raw HTML in backend previews           | Closed      | Covered     | Previews escape after cropping                                                              |
| [#110384](https://forge.typo3.org/issues/110384) | Missing icon labels in previews        | Closed      | Not checked | Preview labels not audited key by key                                                       |

## SEO

| Issue                                            | Topic                              | Core status      | Status here | How                                                                             |
| ------------------------------------------------ | ---------------------------------- | ---------------- | ----------- | ------------------------------------------------------------------------------- |
| [#108895](https://forge.typo3.org/issues/108895) | Show the website title             | New              | Covered     | Header and footer use the site's website title                                  |
| [#110853](https://forge.typo3.org/issues/110853) | SEO quality of the demo            | New              | Covered     | Title format, descriptions from the intros, one H1 per page, sitemap            |
| [#110854](https://forge.typo3.org/issues/110854) | Structured data                    | New              | Covered     | JSON-LD for WebSite, WebPage and BreadcrumbList (`StructuredDataProcessor.php`) |
| [#109704](https://forge.typo3.org/issues/109704) | Cache-Control is always `no-store` | Closed, intended | Covered     | Same core behaviour; `config.sendCacheHeaders` documented (README › TYPO3)      |

## Setup and packaging

| Issue                                                                                              | Topic                        | Core status          | Status here    | How                                                                                |
| -------------------------------------------------------------------------------------------------- | ---------------------------- | -------------------- | -------------- | ---------------------------------------------------------------------------------- |
| [#108646](https://forge.typo3.org/issues/108646), [#109562](https://forge.typo3.org/issues/109562) | Choosing the theme in setup  | Closed               | Covered        | Theme and demo are two packages; the theme ships no content                        |
| [#108713](https://forge.typo3.org/issues/108713), [#109708](https://forge.typo3.org/issues/109708) | Importable demo, re-exported | Closed, Under Review | Covered        | `composer demo:export` rebuilds and exports the demo                               |
| [#108971](https://forge.typo3.org/issues/108971)                                                   | Theme not installed in DDEV  | Needs Feedback       | Covered        | The DDEV hook installs theme and demo on the first start                           |
| [#109395](https://forge.typo3.org/issues/109395)                                                   | Pages need a backend layout  | Closed               | Partly         | The demo sets layouts on the root page and below; a site without one is not tested |
| [#109789](https://forge.typo3.org/issues/109789)                                                   | CLI setup warning            | Closed               | Not checked    | Setup runs through the DDEV hook, not the setup distribution option                |
| [#110388](https://forge.typo3.org/issues/110388)                                                   | Missing `impexp` dependency  | Under Review         | Covered        | The demo package requires `typo3/cms-impexp`                                       |
| [#109555](https://forge.typo3.org/issues/109555)                                                   | Unused PSR-4 configuration   | Closed               | Not applicable | Both packages have classes                                                         |
| [#109093](https://forge.typo3.org/issues/109093)                                                   | Keep page fields module      | Closed               | Not applicable | Core decision                                                                      |

## Documentation

| Issue                                                                                                                                                | Topic                    | Core status | Status here | How                                                   |
| ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ | ----------- | ----------- | ----------------------------------------------------- |
| [#108672](https://forge.typo3.org/issues/108672), [#108777](https://forge.typo3.org/issues/108777), [#108681](https://forge.typo3.org/issues/108681) | Documentation and README | Closed      | Partly      | README and component docs; docs.typo3.org format open |

The epic [#108537](https://forge.typo3.org/issues/108537) and the extension itself
([#108539](https://forge.typo3.org/issues/108539)) frame the others and ask nothing of a theme.
