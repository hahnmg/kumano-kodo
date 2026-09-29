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
| 8 | Unify section headings? | Eyebrow-to-heading spacing is 20, 44 or 64px and heading size 48–66px across sections; make `Section Heading / Default` (20px, 60px) the only spacing and size | Visible change in Intro, Places, Day list, FAQ and Newsletter headings |
| 9 | Rebuild the Desktop page from components? | Paper has no instances; replace each section's inner parts with duplicates of the component artboards, named identically | Until then, edits on the Components page do not show on the Desktop page |
| 10 | Merge `Place Card / Ruled` into `Default`? | It differs only by a top rule and a taller image; model both as props of one variant | One artboard fewer; the rule and image ratio become props in code |
| 11 | Upgrade to Paper Pro? | Yes, before the token step; binding tokens and a full snapshot alone exceed the free 100 calls/week | Without it, each sync waits for the weekly reset (next: 2026-10-03) |
