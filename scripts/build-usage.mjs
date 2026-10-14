#!/usr/bin/env node
// Writes docs/component-usage.json: for each component, the page stories it appears on (see .storybook/component-usage.ts).

import { writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { format, resolveConfig } from 'prettier';
import { createServer } from 'vite';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'docs/component-usage.json');
const server = await createServer({ configFile: false, root, logLevel: 'silent', server: { middlewareMode: true } });
try {
  const { componentUsage } = await server.ssrLoadModule('/.storybook/component-usage.ts');
  const usage = componentUsage();
  await writeFile(out, await format(JSON.stringify(usage, null, 4), { ...(await resolveConfig(out)), filepath: out }));
  const used = Object.values(usage).filter((pages) => pages.length).length;
  console.log(`Usage: ${used} of ${Object.keys(usage).length} components appear on pages → docs/component-usage.json`);
} finally {
  await server.close();
}
