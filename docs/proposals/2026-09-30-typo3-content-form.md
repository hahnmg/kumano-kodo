# Proposal: one form for every content element

Status: accepted and built 2026-09-30, see
`docs/adr/2026-09-30-typo3-content-form.md`. Builds on
`2026-09-30-typo3-content-model.md`.

## What is wrong

- No fixed order: the display option is first in one element and last in
  another; headings are the core palette, loose fields or an own field; images
  sit on the first tab between text fields.
- One field, several meanings: `subheader` is eyebrow, date, quotation source or
  list title; `tx_kumanokodo_link` is a button, a link below a list or a form
  target; `tx_kumanokodo_meta` is a meta line or a screen reader description.
- Own fields where the core, a site setting or the design already decides: an
  own title field, an own screen reader name, spacing in pixels, route map
  legends, the newsletter target, the upright site name.
- Cards and list entries are two tables with nearly the same fields in different
  order.

## Decisions

1. **One form layout.** What an element is goes on the first tab, how it looks
   on Appearance:

    | Tab        | Fields, always in this order                                                                           |
    | ---------- | ------------------------------------------------------------------------------------------------------ |
    | General    | type and column · display · heading (eyebrow, heading, level, text beside it) · text · entries · links |
    | Images     | image                                                                                                  |
    | Appearance | background, space above, anchor · photo position, columns, alignment                                   |

2. **Spacing belongs to the design.** Heading to content is
   `--section-heading-gap` (56), elements inside a section are
   `--section-element-gap` (96). Both are theme variables in Figma; the pixel
   fields go.
3. **One entry table** for cards, list entries, chips and links, in one order:
   image or icon · label · title · text · meta · link and link text · options.
   Facts, questions, stations and day marks stay their own tables.
4. **Links are entries.** Buttons, the link below a list and info box links are
   one inline field "Links".
5. **Rich text everywhere** with a small preset (bold, italic, link).
6. **Hero with list** becomes a Columns container in the arrangement "Hero"
   holding Page top and a List.
7. **Moved out of elements:** chapter numerals are counted, the screen reader
   name is the hidden heading, legends are interface labels, the newsletter
   target and the upright site name are site settings, the figure's top rule is
   a style of Images.
