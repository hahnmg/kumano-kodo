#!/usr/bin/env node
// Every Japanese text beside its English source, for native speakers to check. The comment column is theirs.

import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'docs/review/japanese.csv');

const server = await createServer({ configFile: false, logLevel: 'silent', server: { middlewareMode: true } });
try {
  const { content } = await server.ssrLoadModule('/stories/templates/content.ts');
  const [en, ja] = [content('en'), content('ja')];
  const rows = [];
  // Photos, links and settings are the same in every language; only texts that differ by language are listed.
  const walk = (a, b, path) => {
    if (typeof a === 'string' && typeof b === 'string') {
      if (a !== b && path !== 'locale' && /\p{L}/u.test(a)) rows.push([path, a, b]);
      return;
    }
    if (a && b && typeof a === 'object' && path !== 'photos') {
      for (const key of Object.keys(a)) walk(a[key], b[key], path ? `${path}.${key}` : key);
    }
  };
  walk(en, ja, '');
  const cell = (s) => `"${String(s).replaceAll('"', '""')}"`;
  const csv = [['Key', 'English', 'Japanese', 'Comment'], ...rows.map((r) => [...r, ''])].map((r) => r.map(cell).join(',')).join('\r\n');
  await mkdir(dirname(out), { recursive: true });
  // A byte order mark, so spreadsheet programs read the file as UTF-8.
  await writeFile(out, `${String.fromCharCode(0xfeff)}${csv}\r\n`);
  console.log(`Japanese review: ${rows.length} texts → ${out}`);
} finally {
  await server.close();
}
