import { esc } from '../../src/lib/html';
import { paths, placeSlugs, practicalSlugs } from '../content/paths';
import type { SearchResult } from '../molecules/search-results.markup';
import type { Content } from './content';

// A real search over the journal's own texts, so the sample results are what the site would answer.
export const searchSample = (c: Content, query: string): SearchResult[] => {
  const s = c.site;
  const pages = [
    ...c.kumano.days.map((d, i) => ({
      title: d.route,
      href: paths.day(i + 1),
      path: [s.route.title, s.days.title],
      texts: [d.description, c.home.draft.chapters[i]],
    })),
    ...placeSlugs.map((slug) => ({
      title: s.places[slug].title,
      href: paths.place(slug),
      path: [s.route.title, s.days.title],
      texts: s.places[slug].text,
    })),
    ...practicalSlugs.map((slug) => ({
      title: s.practical.pages[slug].title,
      href: paths.practicalPage(slug),
      path: [s.practical.title],
      texts: s.practical.pages[slug].text,
    })),
    { title: s.kohechi.title, href: paths.kohechi, path: [s.route.title], texts: s.kohechi.text },
  ];
  const needle = query.toLowerCase();
  return pages.flatMap((p) => {
    const passage = p.texts.flatMap((t) => t.split(/(?<=[.。!?])\s*/)).find((sentence) => sentence.toLowerCase().includes(needle));
    if (!passage) return [];
    const at = passage.toLowerCase().indexOf(needle);
    const excerpt =
      esc(passage.slice(0, at)) + `<mark>${esc(passage.slice(at, at + query.length))}</mark>` + esc(passage.slice(at + query.length));
    return [{ title: p.title, href: p.href, path: [c.site.home, ...p.path].join(' › '), excerpt }];
  });
};
