#!/usr/bin/env node
// The feature image of the manual: the start page in each theme, one after the other. Text is drawn as paths in
// each theme's own typeface, as an SVG shown with <img> cannot load web fonts. Run when the themes change.

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as fontkit from 'fontkit';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pkg = join(root, 'typo3/packages/kumano_kodo');
const cache = join(root, 'node_modules/.cache/kumano-fonts');
const out = join(pkg, 'Documentation/Images/Themes.svg');
const { themes } = JSON.parse(await readFile(join(pkg, 'Resources/Private/Themes/themes.json'), 'utf8'));

const [width, height] = [1200, 675];
const seconds = 3;
const names = Object.keys(themes);
const label = (name) => name[0].toUpperCase() + name.slice(1);

// Without a browser's user agent Google answers with TTF, which fontkit reads as it is.
const loadFont = async (family, weight) => {
    const file = join(cache, `${family.replaceAll(' ', '-')}-${weight}.ttf`);
    try {
        return fontkit.create(await readFile(file));
    } catch {
        const css = await (await fetch(`https://fonts.googleapis.com/css2?family=${family.replaceAll(' ', '+')}:wght@${weight}`)).text();
        const url = css.match(/url\((https:[^)]+\.ttf)\)/)?.[1];
        if (!url) throw new Error(`No TTF for ${family} ${weight}`);
        const data = Buffer.from(await (await fetch(url)).arrayBuffer());
        await mkdir(cache, { recursive: true });
        await writeFile(file, data);
        return fontkit.create(data);
    }
};

const round = (d) => d.replace(/-?\d+\.\d+/g, (n) => String(Math.round(Number(n) * 10) / 10));

// Each text is drawn once at the origin and placed with <use>: the themes share Inter, and every layer repeats the
// row of names.
const defs = new Map();
const text = (font, value, size, x, y, fill, tracking = 0) => {
    const key = `${font.familyName}|${font.subfamilyName}|${size}|${value}`;
    if (!defs.has(key)) {
        const scale = size / font.unitsPerEm;
        const run = font.layout(value);
        let pen = 0;
        const d = run.glyphs.map((glyph, i) => {
            const path = glyph.path
                .scale(scale, -scale)
                .translate(pen + run.positions[i].xOffset * scale, 0)
                .toSVG();
            pen += run.positions[i].xAdvance * scale + tracking;
            return path;
        });
        defs.set(key, { id: `g${defs.size}`, d: round(d.join('')), width: pen - tracking });
    }
    const { id, width } = defs.get(key);
    return { svg: `<use href="#${id}" x="${x}" y="${y}" fill="${fill}"/>`, width };
};

const rect = (x, y, w, h, fill, r = 0) =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}"${r ? ` rx="${Math.min(r, h / 2)}"` : ''} fill="${fill}"/>`;

const page = async (name, theme) => {
    const c = theme.color.light;
    const display = await loadFont(theme.font.display, theme.font.displayWeight);
    const body = await loadFont(theme.font.body, 400);
    const bodyStrong = await loadFont(theme.font.body, 600);
    const radius = theme.radius.button;
    const parts = [rect(0, 0, width, height, c.paper)];
    // Header: wordmark, menu, hairline.
    parts.push(text(display, 'Kumano Kodo', 26, 56, 54, c.ink).svg);
    [0, 1, 2].forEach((i) => parts.push(rect(860 + i * 100, 42, 76, 8, c.line, 4)));
    parts.push(rect(0, 88, width, 1, c.line));
    // Hero: eyebrow, title in the display face, lead, button.
    parts.push(rect(56, 142, 200, 8, c.accent, 4));
    parts.push(text(display, 'Four days through', 58, 56, 224, c.ink).svg);
    parts.push(text(display, 'the cedar mist', 58, 56, 292, c.ink).svg);
    parts.push(rect(56, 330, 520, 10, c.line, 5), rect(56, 352, 430, 10, c.line, 5));
    const button = text(bodyStrong, 'See the days', 17, 0, 0, c.paper);
    const bw = Math.round(button.width + 56);
    parts.push(rect(56, 396, bw, 52, c.ink, radius));
    parts.push(text(bodyStrong, 'See the days', 17, 84, 428, c.paper).svg);
    // The photo and three cards as surfaces.
    parts.push(rect(660, 132, 484, 316, c.sunk));
    [0, 1, 2].forEach((i) => {
        const x = 56 + i * 372;
        parts.push(rect(x, 492, 344, 72, c.sunk), rect(x, 576, 220, 8, c.line, 4));
    });
    // The theme's name in a row of all of them.
    let x = 56;
    for (const other of names) {
        const current = other === name;
        const word = text(current ? bodyStrong : body, label(other), 15, x, 640, current ? c.accent : c.muted);
        parts.push(word.svg);
        if (current) parts.push(rect(x, 648, Math.round(word.width), 2, c.accent));
        x += word.width + 28;
    }
    return parts.join('');
};

// Each theme holds the stage for its share of the loop and fades into the next.
const step = 100 / names.length;
const fade = 2;
const keyframes = names
    .map((_, i) => {
        const [start, end] = [i * step, (i + 1) * step];
        const frames =
            i === 0
                ? `0%,${end - fade}%{opacity:1}${end}%,${100 - fade}%{opacity:0}100%{opacity:1}`
                : `0%,${start - fade}%{opacity:0}${start}%,${end - fade}%{opacity:1}${end}%,100%{opacity:0}`;
        return `@keyframes t${i}{${frames}}.t${i}{animation:t${i} ${names.length * seconds}s infinite}`;
    })
    .join('');
const style = `.t{opacity:0}.t0{opacity:1}${keyframes}@media (prefers-reduced-motion:reduce){.t{animation:none}}`;

const layers = [];
for (const [i, name] of names.entries()) layers.push(`<g class="t t${i}">${await page(name, themes[name])}</g>`);
const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img">` +
    `<title>The start page in the five themes: ${names.map(label).join(', ')}</title><style>${style}</style>` +
    `<defs>${[...defs.values()].map(({ id, d }) => `<path id="${id}" d="${d}"/>`).join('')}</defs>${layers.join('')}</svg>\n`;
await mkdir(dirname(out), { recursive: true });
await writeFile(out, svg);
console.log(`Feature image: ${names.length} themes, ${(svg.length / 1024).toFixed(1)} KB → ${out}`);
