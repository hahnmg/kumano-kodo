// Every page of the trail journal. Content links point here; the Storybook router and the link test read the same table.
export const placeSlugs = ['chikatsuyu', 'yunomine', 'nachi'] as const;
export const practicalSlugs = ['getting-there', 'accommodation', 'trail-markers', 'maps'] as const;
export const legalSlugs = ['imprint', 'privacy', 'accessibility'] as const;

export type PlaceSlug = (typeof placeSlugs)[number];
export type PracticalSlug = (typeof practicalSlugs)[number];
export type LegalSlug = (typeof legalSlugs)[number];

export const paths = {
    home: '/',
    route: '/route',
    map: '/route#map',
    days: '/days',
    day: (n: number) => `/days/${n}`,
    place: (slug: PlaceSlug) => `/places/${slug}`,
    practical: '/practical',
    practicalPage: (slug: PracticalSlug) => `/practical/${slug}`,
    photos: '/photos',
    newsletter: '/newsletter',
    kohechi: '/kohechi',
    legal: (slug: LegalSlug) => `/${slug}`,
};

// Path → Storybook story id (title "Site", ids follow the story export names).
export const routes: Record<string, string> = {
    '/': 'site--home',
    '/route': 'site--route',
    '/days': 'site--days',
    ...Object.fromEntries([1, 2, 3, 4].map((n) => [paths.day(n), `site--day-${n}`])),
    ...Object.fromEntries(placeSlugs.map((s) => [paths.place(s), `site--place-${s}`])),
    '/practical': 'site--practical',
    ...Object.fromEntries(practicalSlugs.map((s) => [paths.practicalPage(s), `site--practical-${s}`])),
    '/photos': 'site--photos',
    '/newsletter': 'site--newsletter',
    '/kohechi': 'site--kohechi',
    ...Object.fromEntries(legalSlugs.map((s) => [paths.legal(s), `site--${s}`])),
};

export const storyFor = (href: string): string | undefined => routes[href.split('#')[0].split('?')[0] || '/'];
