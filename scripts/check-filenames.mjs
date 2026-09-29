#!/usr/bin/env node
// Filename gate: project files are lowercase-kebab; dots separate roles (button.markup.ts).

import { readdir } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dirs = ['stories', 'src', 'tests', 'scripts', 'docs/components'];
const pattern = /^[a-z0-9]+(-[a-z0-9]+)*(\.[a-z0-9]+(-[a-z0-9]+)*)*$/;

const bad = [];
const walk = async (dir) => {
    for (const entry of await readdir(dir, { withFileTypes: true }).catch(() => [])) {
        const path = join(dir, entry.name);
        if (!pattern.test(entry.name)) bad.push(relative(root, path));
        if (entry.isDirectory()) await walk(path);
    }
};
for (const d of dirs) await walk(join(root, d));

if (bad.length) {
    console.error(`Filename gate failed:\n  ${bad.join('\n  ')}`);
    process.exit(1);
}
console.log('Filename gate: all names lowercase-kebab');
