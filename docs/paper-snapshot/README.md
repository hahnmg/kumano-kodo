# Paper snapshot

Generated. Do not edit. Each commit that touches this folder records the Paper state at
that point; `git log -p docs/paper-snapshot` is the design history.

| Path | Content |
|---|---|
| `components/<component>--<variant>.jsx` | Markup of each mapped component, inline styles |
| `pages/<slug>.jsx` | Markup of each page artboard |
| `tokens.css` | Paper tokens as CSS variables |
| `screenshots/` | One PNG per component artboard, one JPG per page at 0.5x |

## Update

Paper desktop must be running with the file from `docs/paper-map.json` open.

```
node scripts/paper-snapshot.mjs
node scripts/paper-snapshot.mjs --only button,stage-card
node scripts/paper-snapshot.mjs --no-screenshots
```

A full run costs about 60 MCP calls: one for markup and one for the screenshot of every
artboard. The free Paper plan allows 100 calls per week, Pro 1M.

## Restore

Markup uses inline styles because `write_html` only accepts inline styles, so an agent
can write an old state back into Paper. That creates new node IDs; update
`docs/paper-map.json` afterwards. Images reference Paper-hosted asset URLs and only
restore while those assets exist.
