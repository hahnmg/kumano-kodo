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

- [x] 2026-09-29 Site header: theme swatches removed; dark mode toggle as pressed-state button
- [x] 2026-09-29 Themes as page templates: Kumano Home in Caramel, Forest, Ocean, Violet
- [x] 2026-09-29 Figure: variant without top rule, used on the detail page
- [x] 2026-09-29 Content in three languages: start page copies in DE and JA, texts taken from the code locale files

- [x] 2026-09-29 Mobile: reference frames from code screenshots (section 40:3204), mobile header as component; designed mobile frames still open (open question 4)

- [x] 2026-09-29 Highlight: new molecule with the logo bird as emblem; Kumano Home row explaining the three-legged crow

- [x] 2026-09-29 Slider: arrows disabled at either end, dots follow the scroll position; stage track runs to the viewport edge
- [x] 2026-09-29 Lightbox: dark full-screen view with close, previous and next buttons; new `close` icon

- [x] 2026-09-29 Navigation flyouts: dropdown (Practical) and full-width mega panel (The route) with link columns, text and teaser; mobile accordion
- [x] 2026-09-29 Slider: first card aligned to the container on load, no scrollbar
- [x] 2026-09-29 Lightbox: frosted glass background instead of solid

- [x] 2026-09-29 Sticky header: docked state with tighter padding, logo at 82 % and frosted background (prototype: fixed position on scroll)

- [x] 2026-10-05 Slider dots: only as many as reachable positions (three on desktop, five on phones)
- [x] 2026-10-05 Form state Sent (the confirmation as Info Box); page not found with the links stacked
- [x] 2026-10-05 Logo · Title: the website title in Heading/Logo for sites without a logo of their own
- [x] 2026-10-05 Text Field state Focus (frame over the box); Search Field box as tall as the button
- [x] 2026-10-05 Theme mode Mono (Inter, radii 0, black and white, signal orange)
- [ ] Site Footer without wordmark and a starter page frame in Mono
- [x] 2026-09-30 Spacing rule as variables: `layout/heading-gap` (56), `layout/element-gap` (96), `layout/column-gap` (40)
- [x] 2026-10-05 Text Field and Checkbox with an Invalid state; Search Toggle in the header, Search Panel, Search Form (row and stacked, open at the top of the mobile menu), Search Results, Login Form, Form
- [x] 2026-10-05 Site Footer: "Walked with us? Log in" in the contact column leads to the log-in page
- [x] 2026-10-05 Pages: search, log-in, contact, travel papers and page-not-found frames (section Site pages)
- [x] 2026-10-05 Days overview with the days as Slider of Stage Cards (state Hover: title in accent); Practical with the FAQ in "heading-content"
- [x] 2026-10-12 Functional names: Stage Card → Portrait Card, Day Row → Timeline Item, Place Card → Feature Card, Bleed Photo → Bleed Image, Journal Opener → Page Intro; `color/moss` → `color/secondary`
- [x] 2026-10-12 Forms: Button Style=Secondary; Select Multiple=Yes; File Upload; Choice Group; Form states Step and Summary
- [ ] Pages: frames for Register a walk (`/register`, the walk form over three steps) and Routes and hosts (`/ways-to-walk-it`); menus with their new links
- [ ] News (2026-10-12): Pagination as component; page frames Trail reports (list) and Report (detail with gallery); main menu with Trail reports
- [ ] Block 2 (2026-10-12): Back To Top atom; rich text list markers and ↗ on external links; place pages and contact with links/form moved (links to the page end, form in the main column); FAQ chevron on the first line
- [ ] Pages: apply the spacing rule (heading to content 56, elements in a section 96) to the older page frames; the Site pages use it

- [x] 2026-09-30 Journal Opener, Chapter and Bleed Photo as components
- [x] 2026-09-30 Components page in three sections (Atoms, Molecules, Organisms) as in Storybook, 160 apart
- [ ] Home page as editorial journal, composed from those components
- [ ] Site pages: route overview, day page, place page, practical subpage, photos, text page (days and places, practical overview: done 2026-10-05)
- [ ] All 27 trip photos (web versions in img/photos) replace the earlier set
- [ ] Contents: the walk Takijiri → Nachi, 20–23 April 2024, in EN, DE, JA
- [x] 2026-09-30 Scheme Toggle and Menu Button move to Atoms, Nav Dropdown and Nav Mega to Molecules (Nav Flyout)

## Known differences between Figma and code

- Mobile exists in Figma only as screenshots of the coded Storybook; they are not built from components.
- The Site pages use the photos Figma already holds (the earlier set); places and stays show the components' sample photo until the trip photos are in Figma.
- Language copies exist for the start page only; the other templates are English in Figma.
- The header dark mode toggle, menu, flyouts, slider, lightbox and sticky state are drawn as states; their behaviour lives in `src/scripts/`.

- Detail page fact list shows two of the four facts (the component has two rows); the figure has no caption; the breadcrumb has three levels instead of four.
- Hover movement (arrow nudge, download icon) and the drawn accent line are shown as their end state, not as motion.
- CTA Card: both variants share one default text.
- Page Intro: the upright site name breaks after each character; Figma has no vertical writing mode.
