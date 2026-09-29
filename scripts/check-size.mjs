#!/usr/bin/env node
// Size gate: the CSS a page ships (tokens, base, all components) stays under budget.

import { readdir, readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { gzipSync } from 'node:zlib';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const budgetKb = 20;

const files = [];
const walk = async (dir) => {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
        const path = join(dir, entry.name);
        if (entry.isDirectory()) await walk(path);
        else if (entry.name.endsWith('.css')) files.push(path);
    }
};
await walk(join(root, 'src'));
await walk(join(root, 'stories'));

const css = (await Promise.all(files.map((f) => readFile(f)))).join('\n');
const kb = gzipSync(css).length / 1024;
if (kb > budgetKb) {
    console.error(`Size gate failed: ${kb.toFixed(1)} KB gzip CSS > ${budgetKb} KB`);
    process.exit(1);
}
console.log(`Size gate: ${files.length} CSS files, ${kb.toFixed(1)} KB gzip (budget ${budgetKb} KB)`);
