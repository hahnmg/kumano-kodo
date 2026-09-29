# Open questions

| # | Question | Proposal | Impact |
|---|---|---|---|
| 3 | Target output of the components? | Plain HTML builders (`.markup.ts`) in Storybook `html-vite` | Decides the Storybook framework; React or Fluid/Twig would change every builder |
| 4 | Mobile reference? | Add mobile frames (390px) in Figma before the first coded component | Without them, stories and tests cover desktop only |
| 5 | Further themes? | Caramel Light and Dark exist as the `Color` collection modes. Forest, ocean and violet need a second collection or more modes (plan limit: 4 per collection) | Theme switching in Storybook |
| 6 | Hero gradient | Built as a local value, the only unbound fill; confirm or tokenize | One exception to the tokens-only rule |
| 7 | Keep `sections/`, `index.html`, `original/`, `referenz-v3.jpg`, `PROMPT.md`? | Move into `docs/archive/v3-export/` | Clean root; history stays in git |
| 8 | Unified section headings — keep? | Built as proposed: every heading uses `Section Heading` (eyebrow 20px above a 60px H2) | Intro, FAQ and Newsletter headings shifted by a few pixels versus v3 |
| 10 | Merge `Place Card / Ruled` into `Default`? | It differs only by a top rule and a taller image; model both as props of one variant | One variant fewer; the rule and image ratio become props in code |
| 12 | Quote position | Centred in the page instead of starting at grid column 3 (225px), which has no spacing token | Quote sits 56px further left than in v3 |
