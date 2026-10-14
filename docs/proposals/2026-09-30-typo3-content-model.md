# Proposal: a content model derived from Storybook

Status: accepted and built 2026-09-30, see
`docs/adr/2026-09-30-typo3-content-model.md`. Replaces the 31 content elements
of `2026-09-30-typo3-content-and-theme-settings`.

## What is wrong with the current model

- One content element per molecule or organism: 31 types, many of them the same
  idea (six card types, three image types, four ways to show facts). An editor
  has to know the component library to pick the right one.
- One item table whose fields change meaning per type (`label` is a date in one
  element, a stage in another).
- The two-column section keeps its elements as inline records inside its form:
  they cannot be seen, moved or dragged in the page module.
- Own fields where the core has one editors know: background, spacing and
  heading level.

The cause: Storybook has three layers, and the model flattened them into one
list.

## Storybook's layers, and what each becomes

| Storybook                                                | Holds                                              | TYPO3                                                             |
| -------------------------------------------------------- | -------------------------------------------------- | ----------------------------------------------------------------- |
| Layout (`stories/layout`)                                | section, stack, grid, split, rail, cluster, center | **Containers** for sections and columns                           |
| Molecules and organisms                                  | the things on a page                               | **Content elements**, grouped into families with a display option |
| Atoms                                                    | button, link, badge, icon, chip, image             | **Fields and options** inside elements, never an element          |
| Frame (header, footer, top bar, navigation, page header) | the same on every page                             | Page properties, site settings, root page content (unchanged)     |

## Containers (layout layer)

Two container types cover every arrangement Storybook uses. In the page module
each shows its columns side by side, and elements are dragged in and out like
anywhere else.

| Container   | Options                                                                                                                                                     | Storybook           |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| **Section** | one column; background, spacing, anchor; optional heading                                                                                                   | `section` + `stack` |
| **Columns** | arrangement: even, content and sidebar, text and media, heading and content, wide and narrow, narrow and wide; vertical alignment; plus the Section options | `section` + `split` |

- An element placed directly on the page is its own section, so simple pages
  need no container at all.
- An element inside a container renders without a section, as in Storybook.
- `grid`, `rail`, `cluster` and `center` stay inside elements: they arrange
  items of one element (cards, links), not different elements.

## Content elements (component layer): 13 instead of 31

Every element uses the same core header fields (heading, eyebrow as subheader,
heading level) plus one text beside the heading. Background and spacing are the
core fields `frame_class` and `space_before_class`, limited to the Storybook
values.

| Element                     | Display options                                                                                               | Storybook components                                                          |
| --------------------------- | ------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| **Text** (core `text`)      | –                                                                                                             | rich-text, section-heading                                                    |
| **Heading** (core `header`) | –                                                                                                             | section-heading                                                               |
| **Text and image**          | image left or right                                                                                           | text-media                                                                    |
| **Images**                  | figure (one or two), gallery, full width                                                                      | figure, gallery, bleed-photo                                                  |
| **Cards**                   | card style: teaser, place, person, call to action, link tile, stage; shown as grid of 2, 3 or 4, or as slider | teaser-card, place-card, person-card, cta-card, link-tile, stage-card, slider |
| **List**                    | media list, day list, downloads, text links, sub navigation                                                   | media-list, day-row, download-list, link, sub-nav                             |
| **Facts**                   | with icons, large figures, label and value                                                                    | icon-fact, stat, fact-list                                                    |
| **Callout**                 | highlight, quote, info box, notice                                                                            | highlight, quote, info-box, notice                                            |
| **Questions**               | –                                                                                                             | faq-item                                                                      |
| **Page top**                | photo hero, hero with list, journal opener                                                                    | hero, hero-split, journal-opener                                              |
| **Chapter**                 | –                                                                                                             | chapter                                                                       |
| **Route map**               | –                                                                                                             | route-map                                                                     |
| **Newsletter**              | –                                                                                                             | newsletter-form                                                               |

Table stays out until a page needs it; the core has no table element without
fluid_styled_content.

## Items: one shape per family

Repeating things are items of their element, each family with fields named for
what they are:

| Items of           | Fields                                                             |
| ------------------ | ------------------------------------------------------------------ |
| Cards              | image or icon, label, title, text, meta, badge, link and link text |
| List               | title, meta, text, link or file                                    |
| Facts              | icon, label, value, note                                           |
| Callout (info box) | links                                                              |
| Questions          | question, answer, open on load                                     |
| Route map          | stations (name, position, label side, boundary), day marks         |

Every card style uses the same card fields; a style that shows fewer fields says
so in the field description. Uniform items (six cards, twelve questions) stay
items, so an editor fills one form. Different things side by side (a text next
to a photo, a place card next to a figure) are elements in a Columns container.

## For editors

- The new content wizard in four groups: Layout (Section, Columns), Text and
  media, Lists and cards, Journal.
- A preview in the page module for each element: heading, style, count of items,
  first image.
- Containers limit what goes where only where the design needs it (Page top only
  first on a page).
- Defaults from Storybook, so a new element looks right before anything is set.

## Decisions (2026-09-30)

1. Containers with `b13/container`.
2. Cards are one element with a style option.
3. The 31 current elements are removed and the demo is rebuilt; no migration.
