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
        const { button } = await atom('button');
        const { iconButton } = await atom('icon-button');
        const { newsletterForm } = await server.ssrLoadModule('/stories/molecules/newsletter-form.markup.ts');
        const variant = (html) => fill(html).replaceAll('button--primary', 'button--{variant}');
        atoms.Button =
            `<f:if condition="{href}"><f:then>${variant(button({ label: '__LABEL__', href: '__HREF__' }))}</f:then>` +
            `<f:else>${variant(button({ label: '__LABEL__' })).replace('type="button"', 'type="{type}"')}</f:else></f:if>`;
        atoms.IconButton =
            `<f:if condition="{direction} == 'previous'"><f:then>${fill(iconButton({ direction: 'previous', label: '__LABEL__' }))}</f:then>` +
            `<f:else>${fill(iconButton({ direction: 'next', label: '__LABEL__' }))}</f:else></f:if>`;
        atoms.NewsletterForm = newsletterForm({
            action: '__HREF__',
            emailLabel: '__EMAIL__',
            placeholder: '__PLACEHOLDER__',
            consent: '__CONSENT__',
            submit: '__LABEL__',
        })
            .replaceAll('__HREF__', '{action}')
            .replaceAll('__EMAIL__', '{emailLabel}')
            .replaceAll('__PLACEHOLDER__', '{placeholder}')
            .replaceAll('__CONSENT__', '{consent}')
            .replaceAll('__LABEL__', '{submit}');
        for (const [name, body] of Object.entries(atoms)) await writeFile(join(partials, `${name}.fluid.html`), fluid(body));
        await buildLabels(await server.ssrLoadModule('/stories/templates/content.ts'));
        return iconNames.length;
    } finally {
        await server.close();
    }
};

const xml = (s) => String(s).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

// Frontend labels come from the same ui strings the stories use; English is the source, the others its targets.
// The route map legend joins them: editors do not retype it per map.
const labelsOf = (c) => ({
    ...c.ui,
    mapWalked: c.kumano.route.legend.walked,
    mapEnd: c.kumano.route.legend.end,
    mapBoundary: c.kumano.route.legend.boundary,
});
// EXT:form looks its messages up by validator code; the theme answers the ones its forms raise with its own words.
const formLabelsOf = (c) => ({
    ...Object.fromEntries(
        ['1221560910', '1221560718', '1347992400', '1347992453'].map((code) => [`validation.error.${code}`, c.ui.fieldRequired]),
    ),
    'validation.error.1221559976': c.ui.emailInvalid,
});
// Labels of the theme's own contact form, keyed as EXT:form looks them up.
const contactFormLabelsOf = ({ ui }) => ({
    'kumano-contact.renderingOptions.submitButtonLabel': ui.send,
    'kumano-contact.element.name.properties.label': ui.name,
    'kumano-contact.element.email.properties.label': ui.emailAddress,
    'kumano-contact.element.email.properties.placeholder': ui.emailPlaceholder,
    'kumano-contact.element.message.properties.label': ui.message,
    'kumano-contact.element.consent.properties.label': ui.contactConsent,
    'kumano-contact.finisher.Confirmation.message': ui.formSentText,
});
const writeXliff = async (language, name, pick, { content, locales }) => {
    const source = pick(content('en'));
    for (const locale of Object.keys(locales)) {
        const ui = pick(content(locale));
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
            `    <file source-language="en"${target} datatype="plaintext" original="${name}" product-name="kumano_kodo">\n        <body>\n${units}\n        </body>\n    </file>\n</xliff>\n`;
        await writeFile(join(language, `${locale === 'en' ? '' : `${locale}.`}${name}.xlf`), file);
    }
};
const buildLabels = async (sources) => {
    const language = join(pkg, 'Resources/Private/Language');
    await mkdir(language, { recursive: true });
    await writeXliff(language, 'messages', labelsOf, sources);
    await writeXliff(language, 'form', formLabelsOf, sources);
    await writeXliff(language, 'form_contact', contactFormLabelsOf, sources);
};

// Theme presets for the site settings: what an empty setting falls back to, and which fonts a theme loads.
const buildThemes = async () => {
    const data = JSON.parse(await readFile(join(root, 'docs/figma-export/variables.json'), 'utf8'));
    const theme = data.collections.Theme;
    const head = await readFile(join(root, '.storybook/preview-head.html'), 'utf8');
    // Axes and weights per family exactly as the Storybook preview requests them.
    const fonts = Object.fromEntries(
        [...head.matchAll(/family=([^&"]+)/g)].map(([, spec]) => {
            const [family, axes = ''] = decodeURIComponent(spec).split(':');
            return [family.replaceAll('+', ' '), axes];
        }),
    );
    const weights = { Regular: 400, Medium: 500, SemiBold: 600, Bold: 700 };
    const roles = ['paper', 'surface', 'sunk', 'ink', 'muted', 'line', 'hair', 'moss', 'accent'];
    const body = data.textStyles.find((s) => s.name === 'Text/Body').family;
    const themes = Object.fromEntries(
        theme.modes.map((mode) => {
            const v = (name) => theme.vars[name].v[mode];
            return [
                mode.toLowerCase(),
                {
                    font: { display: v('font/display'), meta: v('font/meta'), body, displayWeight: weights[v('font/display-strong')] },
                    color: Object.fromEntries(
                        ['light', 'dark'].map((scheme) => [scheme, Object.fromEntries(roles.map((r) => [r, v(`palette/${scheme}/${r}`)]))]),
                    ),
                    spacing: {
                        unit: v('space/8'),
                        gutter: v('layout/gutter'),
                        sectionLarge: v('layout/section'),
                        sectionSmall: v('layout/section-sm'),
                        container: v('layout/page'),
                    },
                    radius: { button: v('radius/button'), pill: v('radius/pill') },
                },
            ];
        }),
    );
    const out = join(pkg, 'Resources/Private/Themes');
    await mkdir(out, { recursive: true });
    await writeFile(join(out, 'themes.json'), `${JSON.stringify({ fonts, themes }, null, 4)}\n`);
    await buildSettings(themes);
};

// The set's settings and their labels; every theme override names the value each theme uses when it is empty.
const buildSettings = async (themes) => {
    const set = join(pkg, 'Configuration/Sets/Site');
    const names = Object.keys(themes);
    const title = (s) => s[0].toUpperCase() + s.slice(1);
    const per = (pick, unit = '') => names.map((n) => `${title(n)} ${pick(themes[n])}${unit}`).join(', ');
    const settings = [];
    const add = (key, category, type, def, label, description = '', extra = {}) =>
        settings.push({ key, category, type, def, label, description, ...extra });
    add(
        'theme',
        'appearance',
        'string',
        'caramel',
        'Theme',
        'Colours, typefaces and spacing of the whole site; the settings below override single values.',
        {
            enum: Object.fromEntries(names.map((n) => [n, title(n)])),
        },
    );
    add(
        'brand.upright',
        'appearance',
        'string',
        '熊野古道',
        'Upright name',
        'Set vertically beside the journal title; decorative, hidden from screen readers. Empty: none.',
    );
    add('scheme', 'appearance', 'string', 'light', 'Colour mode on load', '', { enum: { light: 'Light', dark: 'Dark' } });
    add('schemeToggle', 'appearance', 'bool', true, 'Show the dark mode toggle');
    for (const scheme of ['light', 'dark']) {
        for (const role of Object.keys(themes.caramel.color.light)) {
            // A colour setting needs a valid default; the Caramel value stands for "use the theme's colour".
            add(
                `color.${scheme}.${role}`,
                `colors.${scheme}`,
                'color',
                themes.caramel.color[scheme][role],
                title(role),
                `Left at its default, the chosen theme's colour applies: ${per((t) => t.color[scheme][role])}.`,
            );
        }
    }
    const font = (role, label, note) =>
        add(
            `font.${role}`,
            'fonts',
            'string',
            '',
            label,
            `${note} A Google Fonts family name, loaded from this server. Empty: ${per((t) => t.font[role])}.`,
        );
    font('display', 'Display typeface', 'Headings, hero, quote and wordmark.');
    font('body', 'Text typeface', 'Body text, captions, buttons.');
    font('meta', 'Label typeface', 'Small uppercase labels.');
    add('font.displayWeight', 'fonts', 'string', '', 'Display weight', `Empty: ${per((t) => t.font.displayWeight)}.`, {
        enum: { '': 'Theme', 400: '400', 500: '500', 600: '600', 700: '700', 800: '800' },
    });
    const px = (key, category, label, pick, note = '') =>
        add(key, category, 'string', '', label, `${note}Pixels. Empty: ${per(pick, 'px')}.`);
    px('spacing.unit', 'spacing', 'Spacing unit', (t) => t.spacing.unit, 'Scales every gap, padding and margin; 8 is the design grid. ');
    px('spacing.gutter', 'spacing', 'Page margin', (t) => t.spacing.gutter, 'Above 900px; narrower screens keep their own margin. ');
    px('spacing.sectionLarge', 'spacing', 'Large section spacing', (t) => t.spacing.sectionLarge, 'Above 900px. ');
    px('spacing.sectionSmall', 'spacing', 'Section spacing', (t) => t.spacing.sectionSmall, 'Above 900px. ');
    px('spacing.container', 'spacing', 'Content width', (t) => t.spacing.container);
    px('radius.button', 'spacing', 'Corner radius', (t) => t.radius.button, 'Buttons, fields and cards. ');
    px('radius.pill', 'spacing', 'Pill radius', (t) => t.radius.pill, 'Chips and badges. ');
    add('contact.phone', 'contact', 'string', '', 'Phone');
    add('contact.email', 'contact', 'string', '', 'Email');
    add('newsletter.target', 'newsletter', 'page', 0, 'Form target', 'The page that receives the newsletter sign-up.');
    add(
        'search.page',
        'search',
        'page',
        0,
        'Search page',
        'Where the header search sends to. Empty: the first page of the site with the search plugin; without one, the header shows no search.',
    );
    add(
        'custom.css',
        'custom',
        'string',
        '',
        'Own stylesheet',
        'Loaded after the theme, for example EXT:my_site/Resources/Public/Css/site.css.',
    );
    add(
        'custom.js',
        'custom',
        'string',
        '',
        'Own script',
        'Loaded after the theme as a module, for example EXT:my_site/Resources/Public/JavaScript/site.js.',
    );
    add(
        'templates.path',
        'custom',
        'string',
        '',
        'Own templates',
        "A folder like EXT:my_site/Resources/Private/Templates/ with the theme's Pages/, Layouts/, Partials/ and Content/; a file there replaces the theme's file of the same name.",
    );

    const categories = {
        appearance: 'Appearance',
        colors: 'Colours',
        'colors.light': 'Light mode',
        'colors.dark': 'Dark mode',
        fonts: 'Typefaces',
        spacing: 'Spacing and shape',
        contact: 'Contact in the top bar',
        newsletter: 'Newsletter',
        search: 'Search',
        custom: 'Own files',
    };
    const q = (v) => (typeof v === 'string' ? `'${v.replaceAll("'", "''")}'` : String(v));
    const yaml = [
        '# Generated by scripts/build-typo3.mjs from the Figma variables. Do not edit.',
        'categories:',
        '  kumanoKodo: ~',
        ...Object.keys(categories).flatMap((c) => [
            `  kumanoKodo.${c}:`,
            `    parent: kumanoKodo${c.includes('.') ? `.${c.split('.')[0]}` : ''}`,
        ]),
        '',
        'settings:',
        ...settings.flatMap((s) => [
            `  kumanoKodo.${s.key}:`,
            `    type: ${s.type}`,
            `    default: ${q(s.def)}`,
            `    category: kumanoKodo.${s.category}`,
            ...(s.enum ? ['    enum:', ...Object.keys(s.enum).map((v) => `      - ${q(v)}`)] : []),
        ]),
    ];
    await writeFile(join(set, 'settings.definitions.yaml'), `${yaml.join('\n')}\n`);
    const unit = (id, text) =>
        `            <trans-unit id="${id}">\n                <source>${xml(text)}</source>\n            </trans-unit>`;
    const units = [
        unit('label', 'Kumano Kodo'),
        unit('categories.kumanoKodo', 'Kumano Kodo'),
        ...Object.entries(categories).map(([c, l]) => unit(`categories.kumanoKodo.${c}`, l)),
        ...settings.flatMap((s) => [
            unit(`settings.kumanoKodo.${s.key}`, s.label),
            ...(s.description ? [unit(`settings.description.kumanoKodo.${s.key}`, s.description)] : []),
            ...Object.entries(s.enum ?? {}).map(([v, l]) => unit(`settings.kumanoKodo.${s.key}.enum.${v}`, l)),
        ]),
    ];
    await writeFile(
        join(set, 'labels.xlf'),
        `<?xml version="1.0" encoding="UTF-8"?>\n<xliff version="1.2" xmlns="urn:oasis:names:tc:xliff:document:1.2">\n` +
            `    <file source-language="en" datatype="plaintext" original="labels" product-name="kumano_kodo">\n        <body>\n${units.join('\n')}\n        </body>\n    </file>\n</xliff>\n`,
    );
};

await buildThemes();
const cssCount = await buildCss();
await buildJs();
const icons = await buildPartials();
console.log(`TYPO3 assets: global.css + ${cssCount} component stylesheets, 3 scripts, ${icons} icons, logo partials`);
