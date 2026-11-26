#!/usr/bin/env node
// Wraps the manual's prose at 80 columns, as the TYPO3 core's .editorconfig asks for RST. Directives, field lists,
// headings and tables stay as they are; inline literals and links are never split. --check only reports.

import { readFile, readdir, writeFile } from 'node:fs/promises';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const width = 80;
const bullet = /^(\*|-|#\.|\d+\.)\s+/;

// Words, with ``literals`` and `interpreted text`_ kept whole.
const words = (text) => text.match(/``[^`]*``\S*|`[^`]*`\S*|\S+/g) ?? [];

const fill = (tokens, first, rest) => {
  const lines = [];
  let line = first;
  let empty = true;
  for (const token of tokens) {
    if (!empty && line.length + 1 + token.length > width) {
      lines.push(line);
      line = rest + token;
    } else {
      line += (empty ? '' : ' ') + token;
    }
    empty = false;
  }
  lines.push(line);
  return lines;
};

const indentOf = (line) => line.length - line.trimStart().length;
const isHeading = (block) => block.length >= 2 && /^([=#\-~^*"])\1+$/.test(block[1].trim());
const isSpecial = (line) => /^(\.\.|:|\||\+[-=]|[=#\-~^*"]{3,}$)/.test(line.trim());

const wrapBullets = (block) => {
  const n = indentOf(block[0]);
  const items = [];
  for (const line of block) {
    if (indentOf(line) === n && bullet.test(line.trim())) items.push([line]);
    else items.at(-1).push(line);
  }
  return items.flatMap((item) => {
    const marker = item[0].trim().match(bullet)[0];
    const rest = ' '.repeat(n + marker.length);
    const nested = item.slice(1);
    // A row of a list-table, or an item with a list of its own: its first line stays, the nested list wraps by level.
    if (nested.length && bullet.test(nested[0].trim()) && nested.every((l) => indentOf(l) >= indentOf(nested[0]))) {
      return [item[0], ...wrapBlock(nested)];
    }
    if (nested.some((l) => indentOf(l) !== rest.length || isSpecial(l) || bullet.test(l.trim()))) return item;
    return fill(
      words(
        item
          .map((l) => l.trim())
          .join(' ')
          .slice(marker.length),
      ),
      ' '.repeat(n) + marker,
      rest,
    );
  });
};

const wrapBlock = (block) => {
  if (isHeading(block) || isSpecial(block[0])) return block;
  const n = indentOf(block[0]);
  if (bullet.test(block[0].trim())) return block.every((l) => indentOf(l) >= n) ? wrapBullets(block) : block;
  if (block.every((l) => indentOf(l) === n && !isSpecial(l))) {
    return fill(words(block.map((l) => l.trim()).join(' ')), ' '.repeat(n), ' '.repeat(n));
  }
  // A definition: the term, then its text indented one step deeper.
  const body = block.slice(1);
  const m = indentOf(body[0]);
  if (m > n && body.every((l) => indentOf(l) === m && !isSpecial(l)) && !bullet.test(body[0].trim())) {
    return [block[0], ...fill(words(body.map((l) => l.trim()).join(' ')), ' '.repeat(m), ' '.repeat(m))];
  }
  return block;
};

// Directives whose content is not prose: entries, code or raw markup keep their lines.
const verbatim = /^\.\.\s+(toctree|code-block|code|literalinclude|raw|csv-table)::/;

export const wrapRst = (source) => {
  const out = [];
  let block = [];
  let keep = -1;
  const flush = () => {
    if (!block.length) return;
    if (keep >= 0 && indentOf(block[0]) > keep) out.push(...block);
    else {
      keep = verbatim.test(block[0].trim()) ? indentOf(block[0]) : -1;
      out.push(...(keep >= 0 ? block : wrapBlock(block)));
    }
    block = [];
  };
  for (const line of source.split('\n')) {
    if (line.trim() === '') {
      flush();
      out.push(line);
    } else {
      block.push(line);
    }
  }
  flush();
  return out.join('\n');
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const root = join(dirname(fileURLToPath(import.meta.url)), '..');
  const docs = join(root, 'typo3/packages/theme_kumano_kodo/Documentation');
  const check = process.argv.includes('--check');
  const files = [];
  const walk = async (dir) => {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) await walk(path);
      else if (entry.name.endsWith('.rst')) files.push(path);
    }
  };
  await walk(docs);
  const changed = [];
  for (const file of files) {
    const source = await readFile(file, 'utf8');
    const wrapped = wrapRst(source);
    if (wrapped === source) continue;
    changed.push(relative(root, file));
    if (!check) await writeFile(file, wrapped);
  }
  if (check && changed.length) {
    console.error(`RST gate failed, wrap at ${width} (node scripts/wrap-rst.mjs):\n  ${changed.join('\n  ')}`);
    process.exit(1);
  }
  console.log(`RST gate: ${files.length} pages${check ? '' : `, ${changed.length} wrapped`}`);
}
