#!/usr/bin/env node
// Paper keeps no history we can reach, so its state is versioned here. See docs/paper-snapshot/README.md.

import { access, mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { setTimeout as sleep } from 'node:timers/promises';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'docs/paper-snapshot');
const endpoint = process.env.PAPER_MCP_URL ?? 'http://127.0.0.1:29979/mcp';
const downloads = process.env.PAPER_EXPORT_DIR ?? join(homedir(), 'Downloads');

const args = process.argv.slice(2);
const only = args.includes('--only') ? args[args.indexOf('--only') + 1].split(',') : null;
const withScreenshots = !args.includes('--no-screenshots');

const map = JSON.parse(await readFile(join(root, 'docs/paper-map.json'), 'utf8'));
const fileId = map.file.id;
const components = only ? map.components.filter((component) => only.includes(component.component)) : map.components;
const pages = only ? [] : map.pages;

if (only && components.length === 0) {
    throw new Error(`No mapped component matches: ${only.join(', ')}`);
}

let sessionId;
let requestId = 0;

async function rpc(method, params, { notification = false } = {}) {
    const body = { jsonrpc: '2.0', method, params };
    if (!notification) {
        body.id = ++requestId;
    }
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json, text/event-stream',
            ...(sessionId && { 'mcp-session-id': sessionId }),
        },
        body: JSON.stringify(body),
    });
    sessionId ??= response.headers.get('mcp-session-id');
    const text = await response.text();
    if (notification) {
        return null;
    }
    const data = text
        .split('\n')
        .filter((line) => line.startsWith('data: '))
        .map((line) => JSON.parse(line.slice(6)));
    const message = data.find((entry) => entry.id === body.id) ?? JSON.parse(text);
    if (message.error) {
        throw new Error(`${method}: ${message.error.message}`);
    }
    return message.result;
}

// Paper prepends a file header to every tool result; the payload is the last text item.
async function tool(name, args) {
    const result = await rpc('tools/call', { name, arguments: { fileId, ...args } });
    const texts = result.content.filter((item) => item.type === 'text').map((item) => item.text);
    if (result.isError) {
        throw new Error(`${name}: ${texts.join(' ')}`);
    }
    const header = JSON.parse(texts[0]);
    if (header.file?.id !== fileId) {
        throw new Error(`Paper answered for file ${header.file?.id}, expected ${fileId}`);
    }
    return texts.at(-1);
}

const exists = (path) =>
    access(path).then(
        () => true,
        () => false,
    );

async function waitFor(path) {
    for (let attempt = 0; attempt < 50; attempt++) {
        if (await exists(path)) {
            return;
        }
        await sleep(200);
    }
    throw new Error(`Export did not appear: ${path}`);
}

// Paper writes to ~/Downloads as "<artboard name, / → _><@scale unless 1x>.<ext>".
// For large images the result omits the path although the file is written.
async function exportScreenshot(pageId, { artboard, name, setting, target }) {
    const suffix = setting.scale === '1x' ? '' : `@${setting.scale}`;
    const expected = join(downloads, `${name.replaceAll('/', '_')}${suffix}.${setting.format}`);
    if (await exists(expected)) {
        throw new Error(`Remove the stale export first: ${expected}`);
    }
    const { exports } = JSON.parse(await tool('export', { pageId, nodes: { [artboard]: [setting] } }));
    const path = exports.find((entry) => entry.nodeId === artboard)?.filePath ?? expected;
    await waitFor(path);
    await rename(path, join(out, 'screenshots', target));
}

await rpc('initialize', {
    protocolVersion: '2025-06-18',
    capabilities: {},
    clientInfo: { name: 'kumano-kodo-paper-snapshot', version: '1.0.0' },
});
await rpc('notifications/initialized', {}, { notification: true });

for (const dir of ['components', 'pages', 'screenshots']) {
    await mkdir(join(out, dir), { recursive: true });
}

for (const component of components) {
    const jsx = await tool('get_jsx', { nodeId: component.node, format: 'inline-styles' });
    await writeFile(join(out, 'components', `${component.component}--${component.variant}.jsx`), `${jsx.trim()}\n`);
}

for (const page of pages) {
    const jsx = await tool('get_jsx', { nodeId: page.artboard, format: 'inline-styles' });
    await writeFile(join(out, 'pages', `${page.slug}.jsx`), `${jsx.trim()}\n`);
}

await writeFile(join(out, 'tokens.css'), `${(await tool('get_tokens', { format: 'css' })).trim()}\n`);

if (!withScreenshots) {
    console.log(`Snapshot without screenshots: ${components.length} components, ${pages.length} pages`);
    process.exit(0);
}

for (const component of components) {
    await exportScreenshot(map.file.componentsPage, {
        artboard: component.artboard,
        name: component.name,
        setting: { format: 'png', scale: '1x' },
        target: `${component.component}--${component.variant}.png`,
    });
}

for (const page of pages) {
    await exportScreenshot(page.page, {
        artboard: page.artboard,
        name: page.name,
        setting: { format: 'jpg', scale: '0.5x' },
        target: `page-${page.slug}@0.5x.jpg`,
    });
}

console.log(`Snapshot: ${components.length} components, ${pages.length} pages → docs/paper-snapshot/`);
