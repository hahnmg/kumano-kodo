#!/usr/bin/env node
// Contrast gate: every text/background pair the components use must reach WCAG AA in every theme × scheme combination.

import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const { collections } = JSON.parse(await readFile(join(root, 'docs/figma-export/variables.json'), 'utf8'));
const theme = collections.Theme;

const luminance = (hex) => {
    const [r, g, b] = [1, 3, 5]
        .map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
        .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
    const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x);
    return (l1 + 0.05) / (l2 + 0.05);
};

const pairs = [
    ['ink', 'paper', 4.5],
    ['muted', 'paper', 4.5],
    ['accent', 'paper', 4.5],
    ['ink', 'sunk', 4.5],
    ['muted', 'sunk', 4.5],
    ['accent', 'sunk', 4.5],
    ['paper', 'ink', 4.5],
];

const failures = [];
for (const mode of theme.modes) {
    for (const scheme of ['light', 'dark']) {
        const color = (role) => theme.vars[`palette/${scheme}/${role}`].v[mode];
        for (const [fg, bg, min] of pairs) {
            const r = ratio(color(fg), color(bg));
            if (r < min) failures.push(`${mode}/${scheme}: ${fg} on ${bg} = ${r.toFixed(2)} (min ${min})`);
        }
    }
}

if (failures.length) {
    console.error(`Contrast gate failed:\n  ${failures.join('\n  ')}`);
    process.exit(1);
}
console.log(`Contrast gate: ${pairs.length} pairs × ${theme.modes.length * 2} combinations pass`);
