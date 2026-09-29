# Pending Figma sync

Changes made in code first, to be carried into Figma once approved. Tick with the date when synced.

- [x] 2026-09-29 Sample content: Tierheim texts replaced by the Kumano Kodo trail journal (Pages 4:4, component default texts)
- [x] 2026-09-29 English default labels (pagination, header, topbar, page header chips)
- [x] 2026-09-29 Header and topbar contents limited to the page container; footer wordmark inside the container (component descriptions; identical at 1440)
- [x] 2026-09-29 Icon-to-text gaps by icon size: 16 px icon 6, 24 px icon 8, 48 px circle 12
- [x] 2026-09-29 Topbar: 32 between phone and email
- [x] 2026-09-29 Icon fact: icon circle centred to its text block
- [x] 2026-09-29 Checkbox and radio: control centred to its label, no top offset
- [x] 2026-09-29 Hover states as `State=Hover` variants with smart animate 320 ms (Button, Link, Link Tile, Teaser Card, Nav Item, Chip, Sub Nav Item); motion tokens stay code-only

- [ ] Site header: theme swatches removed; dark mode toggle as pressed-state button
- [ ] Themes as page templates: Kumano Home in Caramel, Forest, Ocean, Violet
- [ ] Figure: variant without top rule, used on the detail page
- [ ] Content in three languages (EN, DE, JA): at least one page per language, or text properties per locale

- [ ] Mobile frames (390px) for the four templates, including the open header menu (open question 4)

- [ ] Highlight: new molecule with the logo bird as emblem; Kumano Home row explaining the three-legged crow

- [ ] Slider: arrows disabled at either end, dots follow the scroll position; stage track runs to the viewport edge
- [ ] Lightbox: dark full-screen view with close, previous and next buttons; new `close` icon

- [ ] Navigation flyouts: dropdown (Practical) and full-width mega panel (The route) with link columns, text and teaser; mobile accordion
- [ ] Slider: first card aligned to the container on load, no scrollbar
- [ ] Lightbox: frosted glass background instead of solid

- [ ] Sticky header: docked state with tighter padding, logo at 82 % and frosted background (prototype: fixed position on scroll)

## Known differences between Figma and code

- Photos `farn` and `laternen` are not in the Figma file: the Kohechi row keeps its old image, the Person Card default keeps its old portrait.
- Detail page fact list shows two of the four facts (the component has two rows); the figure has no caption; the breadcrumb has three levels instead of four.
- Hover movement (arrow nudge, download icon) and the drawn accent line are shown as their end state, not as motion.
- CTA Card: both variants share one default text.
