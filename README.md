# Kumano Kodo design system

Components and tokens for the Kumano Kodo sitepackage. **Figma is the design source**; this repository turns it into a
Storybook of plain HTML components.

- Figma: https://www.figma.com/design/p6SK2xN5ZzBisOW1wKlrDm (pages Foundations, Components, Pages)
- Storybook: https://hahnmg.github.io/kumano-kodo/ (deployed from `develop`)

## Run it

```
npm ci
npm run storybook        # http://localhost:6006
```

The toolbar switches **theme** (caramel, forest, ocean, violet) and **scheme** (light, dark). "Atoms/Overview" shows all
atoms on one page.

| Command             | Does                                                                                  |
| ------------------- | ------------------------------------------------------------------------------------- |
| `npm run tokens`    | Generates `src/tokens/tokens.css` from `docs/figma-export/variables.json`             |
| `npm run storybook` | Local Storybook                                                                       |
| `npm run build`     | Tokens, contrast gate, static Storybook in `storybook-static/`                        |
| `npm run lint`      | ESLint, Stylelint (no hex colours in components), lowercase-kebab filenames, Prettier |
| `npm test`          | Component specs with axe in light and dark                                            |
| `npm run size`      | CSS size budget                                                                       |

All four gates (`build`, `lint`, `size`, `test`) must pass before a merge; the Pages workflow runs them too.

## How a change travels

1. **Change it in Figma.** Colours, spacing, radii and fonts are variables; components are Figma components with
   variants and text properties.
2. **Tokens:** export the variables into `docs/figma-export/variables.json` (an agent does this via the Figma MCP), then
   `npm run tokens`.
3. **Components:** an agent reads the changed Figma component and updates its files. There is no automatic sync.

Each component has four files and nothing else holds its markup:

```
docs/components/<name>.md            definition: purpose, props, tokens, Figma node
stories/<group>/<name>.markup.ts     the markup builder, the only copy of the HTML
stories/<group>/<name>.css           styles, tokens only
stories/<group>/<name>.stories.ts    Storybook: playground plus one story per variant
tests/components/<name>.spec.ts      structure and accessibility, using the same builder
```

## Where things are

| Path                                   | Content                                                     |
| -------------------------------------- | ----------------------------------------------------------- |
| `docs/adr/`                            | Decisions, newest last                                      |
| `docs/open-questions.md`               | Open decisions with proposal and impact                     |
| `docs/figma-map.json`                  | Figma node of each component                                |
| `src/`                                 | Generated tokens, base styles, HTML helpers                 |
| `scripts/`                             | Token build and gates                                       |
| `img/`                                 | Photos used in stories                                      |
| `original/`, `sections/`, `index.html` | The v3 Claude Design export the design started from         |
| `docs/paper-snapshot/`                 | Record of the intermediate Paper version, no longer updated |
