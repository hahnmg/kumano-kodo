import type { Image } from '../../src/lib/html';
import { de } from '../content/de';
import { en, type LocaleContent } from '../content/en';
import { ja } from '../content/ja';

export const photoNames = [
    'zedernweg',
    'wegmarke',
    'talblick',
    'sonnenpfad',
    'kammweg',
    'nebelberge',
    'steinbruecke',
    'nachi',
    'onsen',
    'torii',
    'krabbe',
    'nebelbaum',
    'farn',
    'laternen',
    'bus',
] as const;
export type PhotoName = (typeof photoNames)[number];
export type Photos = Record<PhotoName, Image>;

export interface LocaleModule<C> {
    alts: Record<PhotoName, string>;
    build: (photos: Photos) => C;
}

export const locales = { ja: '日本語', de: 'Deutsch', en: 'English' } as const;
export type Locale = keyof typeof locales;
export const isLocale = (value: unknown): value is Locale => typeof value === 'string' && value in locales;

const modules: Record<Locale, LocaleModule<LocaleContent>> = { en, de, ja };

const build = (locale: Locale) => {
    const m = modules[locale];
    const photos = Object.fromEntries(photoNames.map((n) => [n, { src: `img/${n}.jpg`, alt: m.alts[n] }])) as Photos;
    const languages = (Object.keys(locales) as Locale[]).map((l) => ({
        code: l.toUpperCase(),
        locale: l,
        href: '#',
        active: l === locale,
    }));
    return { locale, photos, languages, ...m.build(photos) };
};

export type Content = ReturnType<typeof build>;

const cache = new Map<Locale, Content>();
export const content = (locale: unknown = 'en'): Content => {
    const l = isLocale(locale) ? locale : 'en';
    if (!cache.has(l)) cache.set(l, build(l));
    return cache.get(l) as Content;
};

// Story args override the sample only where a control was actually set.
export const localized =
    <P>(render: (props: P) => string, sample: (c: Content) => Partial<P>) =>
    (args: Partial<P>, context: { globals: Record<string, unknown> }): string =>
        render({
            ...sample(content(context.globals.locale)),
            ...Object.fromEntries(Object.entries(args).filter(([, v]) => v !== undefined)),
        } as P);

// English defaults for tests and single-language use.
export const { photos, kumano, guide, richTextSample, languages } = content('en');
