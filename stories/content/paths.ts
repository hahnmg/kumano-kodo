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
  reports: '/reports',
  reportsPage: (n: number) => (n === 1 ? '/reports' : `/reports/page/${n}`),
  report: (slug: string) => `/reports/${slug}`,
  newsletter: '/newsletter',
  kohechi: '/kohechi',
  search: '/search',
  login: '/login',
  contact: '/contact',
  notFound: '/page-not-found',
  papers: '/travel-papers',
  register: '/register',
  ways: '/ways-to-walk-it',
  glance: '/at-a-glance',
  legal: (slug: LegalSlug) => `/${slug}`,
};

// Where the route map's stations and day marks lead: a place page where there is one, else the day that reaches it.
export const routeLinks = {
  stations: [paths.day(1), paths.day(1), paths.place('chikatsuyu'), paths.day(3), paths.day(4), paths.place('nachi')],
  days: [paths.day(1), paths.day(2), paths.day(3), paths.day(4), paths.day(4)],
};

// The stations each day walks, by index: from the boundary it starts at to the one it ends at.
export const dayStations = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 5],
] as const;

interface LinkableRoute {
  stations: readonly object[];
  days: readonly object[];
}

// The route with its links, and with one day's stations flagged for the day page.
export const linkRoute = <R extends LinkableRoute>(route: R, day?: number): R => ({
  ...route,
  stations: route.stations.map((s, i) => ({
    ...s,
    href: routeLinks.stations[i],
    highlight: day !== undefined && i >= dayStations[day - 1][0] && i <= dayStations[day - 1][1],
  })),
  days: route.days.map((d, i) => ({ ...d, href: routeLinks.days[i] })),
});

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
  '/reports': 'site--reports',
  '/reports/page/2': 'site--reports-page-2',
  '/newsletter': 'site--newsletter',
  '/kohechi': 'site--kohechi',
  '/search': 'site--search',
  '/login': 'site--login',
  '/contact': 'site--contact',
  '/page-not-found': 'site--not-found',
  '/travel-papers': 'site--papers',
  '/register': 'site--register',
  '/ways-to-walk-it': 'site--ways',
  '/at-a-glance': 'site--at-a-glance',
  ...Object.fromEntries(legalSlugs.map((s) => [paths.legal(s), `site--${s}`])),
};

// One story per trail report, keyed by its slug.
export const reportSlugs = ['what-we-packed', 'the-last-bus', 'the-oldest-bath', 'a-land-crab', 'fog-on-the-pass'] as const;
for (const slug of reportSlugs) routes[paths.report(slug)] = `site--report-${slug}`;

export const storyFor = (href: string): string | undefined => routes[href.split('#')[0].split('?')[0] || '/'];
