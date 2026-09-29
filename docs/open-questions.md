# Open questions

| # | Question | Proposal | Impact |
|---|---|---|---|
| 4 | Mobile reference? | Code has provisional steps since 2026-09-29: at 900px and 600px large text styles, gutter and section spacing step down (`scripts/build-tokens.mjs`), grids go to one column, the header folds behind a menu button, the route map scrolls. Draw 390px frames in Figma to confirm or correct them | Until then mobile is derived from the desktop form language, not designed |
| 6 | Hero gradient | Built as a local value, the only unbound fill; confirm or tokenize | One exception to the tokens-only rule |
| 7 | Keep `sections/`, `index.html`, `original/`, `referenz-v3.jpg`, `PROMPT.md`? | Move into `docs/archive/v3-export/` | Clean root; history stays in git |
| 8 | Unified section headings — keep? | Built as proposed: every heading uses `Section Heading` (eyebrow 20px above a 60px H2) | Intro, FAQ and Newsletter headings shifted by a few pixels versus v3 |
| 10 | Merge `Place Card / Ruled` into `Default`? | It differs only by a top rule and a taller image; model both as props of one variant | One variant fewer; the rule and image ratio become props in code |
| 12 | Quote position | Centred in the page instead of starting at grid column 3 (225px), which has no spacing token | Quote sits 56px further left than in v3 |
| 13 | Theme effects Figma cannot show | Keep them code-only and document each in Storybook: ocean accent gradient (rules, dots, hero scrim), violet sun-gradient H1, uppercase display, +0.08em tracking, glow, triple rule | Figma previews of ocean and violet look plainer than the coded result |
