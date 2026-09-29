import type { Image } from '../../src/lib/html';
import manifest from '../content/photos.json';
import { de } from '../content/de';
import { en, type LocaleContent } from '../content/en';
import { ja } from '../content/ja';

// Web versions of the trip photos, built by scripts/build-images.mjs from the local originals.
export const photoNames = Object.keys(manifest) as PhotoName[];
export type PhotoName = keyof typeof manifest;
export type Photos = Record<PhotoName, Image>;

export interface PhotoText {
    alt: string;
    place: string;
}

export interface LocaleModule<C> {
    photos: Record<PhotoName, PhotoText>;
    build: (photos: Photos) => C;
}

export const locales = { ja: '日本語', de: 'Deutsch', en: 'English' } as const;
export type Locale = keyof typeof locales;
export const isLocale = (value: unknown): value is Locale => typeof value === 'string' && value in locales;

const modules: Record<Locale, LocaleModule<LocaleContent>> = { en, de, ja };

const build = (locale: Locale) => {
    const m = modules[locale];
    // Captions carry place, date and time from the photo itself.
    const when = (iso: string) => {
        const d = new Date(`${iso}:00`);
        const day = new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long' }).format(d);
        const time = new Intl.DateTimeFormat(locale, { hour: '2-digit', minute: '2-digit', hour12: false }).format(d);
        return `${day}, ${time}`;
    };
    const photos = Object.fromEntries(
        photoNames.map((n) => {
            const file = manifest[n];
            const text = m.photos[n];
            const url = (w: string) => `img/photos/${n}-${w}.jpg`;
            return [
                n,
                {
                    src: url('1200'),
                    srcset: Object.entries(file.sizes)
                        .map(([w, px]) => `${url(w)} ${px}w`)
                        .join(', '),
                    full: url('2400'),
                    width: 1200,
                    height: Math.round((1200 * file.height) / file.width),
                    alt: text.alt,
                    caption: file.taken ? `${text.place}, ${when(file.taken)}` : text.place,
                },
            ];
        }),
    ) as Photos;
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
