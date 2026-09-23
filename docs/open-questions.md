# Open questions

| # | Question | Proposal | Impact |
|---|---|---|---|
| 1 | Approve foundation tokens? | Accept `docs/proposals/foundation-tokens.md` | Blocks binding Paper styles to tokens |
| 2 | Consolidate the 29 font sizes into 12 steps? | Yes, as in the proposal | Visible change up to ±6px on some headings; the page no longer matches the v3 export exactly |
| 3 | Target output of the components? | Plain HTML builders (`.markup.ts`) in Storybook `html-vite` | Decides the Storybook framework; React or Fluid/Twig would change every builder |
| 4 | Mobile reference? | Create mobile artboards in Paper (390px) before the first component | Without them, stories and tests cover desktop only |
| 5 | Themes and dark mode? | The export defines four themes (caramel, forest, ocean, violet), each light and dark. Start with caramel light and dark; add the other themes later as token sets | Dark mode exists, so every component must be built and tested in both modes; Paper needs a dark variant per component artboard |
| 6 | Hero overlay gradient | Keep as a component-local value, not a token | One exception to the tokens-only rule |
| 7 | Keep `sections/`, `index.html`, `original/`, `referenz-v3.jpg`, `PROMPT.md`? | Move into `docs/archive/v3-export/` | Clean root; history stays in git |
