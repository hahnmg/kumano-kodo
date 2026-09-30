#!/usr/bin/env node
// Builds the TYPO3 sitepackage's public assets and generated partials from the design system.
// Run after `npm run tokens`; the output is committed with the package.

import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { basename, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build, createServer } from 'vite';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pkg = join(root, 'typo3/packages/kumano_kodo');
const css = join(pkg, 'Resources/Public/Css');
const js = join(pkg, 'Resources/Public/JavaScript');
const partials = join(pkg, 'Resources/Private/Templates/Partials/Kumano');

// Every page carries the frame, so its parts and all atoms ship in one file; the rest loads with its element.
const frame = [
    'layout/layout',
    'organisms/topbar',
    'organisms/site-header',
    'organisms/site-footer',
    'organisms/page-header',
    'molecules/breadcrumb',
    'molecules/nav-flyout',
    'molecules/notice',
    'molecules/rich-text',
    'molecules/teaser-card',
];

const componentCss = async () => {
    const found = [];
    for (const group of ['atoms', 'molecules', 'organisms', 'layout']) {
        for (const file of await readdir(join(root, 'stories', group))) {
            if (file.endsWith('.css')) found.push(`${group}/${basename(file, '.css')}`);
        }
    }
    return found.sort();
};

const buildCss = async () => {
    const all = await componentCss();
    const global = [
        'src/tokens/tokens.css',
        'src/styles/base.css',
        ...all.filter((c) => c.startsWith('atoms/')).map((c) => `stories/${c}.css`),
    ];
    global.push(...frame.map((c) => `stories/${c}.css`));
    await rm(css, { recursive: true, force: true });
    await mkdir(join(css, 'Components'), { recursive: true });
    const parts = await Promise.all(global.map(async (f) => `/* ${f} */\n${await readFile(join(root, f), 'utf8')}`));
    await writeFile(join(css, 'global.css'), parts.join('\n'));
    const own = all.filter((c) => !c.startsWith('atoms/') && !frame.includes(c));
    for (const c of own)
        await writeFile(join(css, 'Components', `${basename(c)}.css`), await readFile(join(root, 'stories', `${c}.css`), 'utf8'));
    return own.length;
};

const buildJs = () =>
    build({
        configFile: false,
        logLevel: 'warn',
        build: {
            outDir: js,
            emptyOutDir: true,
            minify: true,
            lib: {
                entry: Object.fromEntries(['site', 'slider', 'lightbox'].map((n) => [n, join(root, `src/entries/${n}.ts`)])),
                formats: ['es'],
                fileName: (_, name) => `${name}.js`,
            },
        },
    });

// The SVGs stay single-sourced in the TypeScript builders; sentinels mark where Fluid variables go.
const buildPartials = async () => {
    const server = await createServer({ configFile: false, logLevel: 'silent', server: { middlewareMode: true } });
    try {
        const { icon, iconNames } = await server.ssrLoadModule('/stories/atoms/icon.markup.ts');
        const { logo, logoBird } = await server.ssrLoadModule('/stories/atoms/logo.markup.ts');
        const fluid = (body) =>
            // No whitespace around the body: every newline would become a text node in the rendered markup.
            `<html xmlns:f="http://typo3.org/ns/TYPO3/CMS/Fluid/ViewHelpers" data-namespace-typo3-fluid="true">${body.replaceAll('\n', '')}</html>`;
        const sized = (svg) => svg.replaceAll('"9999"', '"{size}"').replaceAll('__LABEL__', '{label}');
        const cases = iconNames
            .map(
                (name) =>
                    `<f:case value="${name}"><f:if condition="{label}"><f:then>${sized(icon({ name, size: 9999, label: '__LABEL__' }))}</f:then>` +
                    `<f:else>${sized(icon({ name, size: 9999 }))}</f:else></f:if></f:case>`,
            )
            .join('\n');
        await mkdir(partials, { recursive: true });
        await writeFile(join(partials, 'Icon.fluid.html'), fluid(`<f:switch expression="{name}">\n${cases}\n</f:switch>`));
        await writeFile(
            join(partials, 'Logo.fluid.html'),
            fluid(logo({ href: '__HREF__', label: '__LABEL__' }).replace('__HREF__', '{href}').replace('__LABEL__', '{label}')),
        );
        await writeFile(join(partials, 'LogoBird.fluid.html'), fluid(logoBird('{class}')));
        const atom = async (file) => server.ssrLoadModule(`/stories/atoms/${file}.markup.ts`);
        const { menuButton } = await atom('menu-button');
        const { schemeToggle } = await atom('scheme-toggle');
        const { link } = await atom('link');
        const { chip } = await atom('chip');
        const { badge } = await atom('badge');
        const fill = (html) => html.replaceAll('__LABEL__', '{label}').replaceAll('__HREF__', '{href}');
        const atoms = {
            MenuButton: fill(menuButton({ label: '__LABEL__' })),
            SchemeToggle: fill(schemeToggle({ label: '__LABEL__' })),
            Badge: fill(badge({ label: '__LABEL__' })),
            Link:
                `<f:if condition="{direction} == 'back'"><f:then>${fill(link({ label: '__LABEL__', href: '__HREF__', direction: 'back' }))}</f:then>` +
                `<f:else>${fill(link({ label: '__LABEL__', href: '__HREF__' }))}</f:else></f:if>`,
            Chip:
                `<f:if condition="{active}"><f:then>${fill(chip({ label: '__LABEL__', href: '__HREF__', active: true }))}</f:then>` +
                `<f:else>${fill(chip({ label: '__LABEL__', href: '__HREF__' }))}</f:else></f:if>`,
        };
        for (const [name, body] of Object.entries(atoms)) await writeFile(join(partials, `${name}.fluid.html`), fluid(body));
        await buildLabels(await server.ssrLoadModule('/stories/templates/content.ts'));
        return iconNames.length;
    } finally {
        await server.close();
    }
};

const xml = (s) => String(s).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

// Frontend labels come from the same ui strings the stories use; English is the source, the others its targets.
const buildLabels = async ({ content, locales }) => {
    const language = join(pkg, 'Resources/Private/Language');
    await mkdir(language, { recursive: true });
    const source = content('en').ui;
    for (const locale of Object.keys(locales)) {
        const ui = content(locale).ui;
        const target = locale === 'en' ? '' : ` target-language="${locale}"`;
        const units = Object.keys(source)
            .map(
                (id) =>
                    `            <trans-unit id="${id}">\n                <source>${xml(source[id])}</source>\n` +
                    (locale === 'en' ? '' : `                <target>${xml(ui[id])}</target>\n`) +
                    `            </trans-unit>`,
            )
            .join('\n');
        const file =
            `<?xml version="1.0" encoding="UTF-8"?>\n<xliff version="1.2" xmlns="urn:oasis:names:tc:xliff:document:1.2">\n` +
            `    <file source-language="en"${target} datatype="plaintext" original="messages" product-name="kumano_kodo">\n        <body>\n${units}\n        </body>\n    </file>\n</xliff>\n`;
        await writeFile(join(language, `${locale === 'en' ? '' : `${locale}.`}messages.xlf`), file);
    }
};

const cssCount = await buildCss();
await buildJs();
const icons = await buildPartials();
console.log(`TYPO3 assets: global.css + ${cssCount} component stylesheets, 3 scripts, ${icons} icons, logo partials`);
