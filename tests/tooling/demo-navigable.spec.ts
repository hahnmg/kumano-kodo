import { describe, expect, it } from 'vitest';
import content from '../../typo3/Build/Demo/content.json';

interface DemoPage {
  key: string;
  navHide: boolean;
  doktype?: number;
}

const demo = content as unknown as {
  pages: DemoPage[];
  site: { errorHandling?: Record<string, string> };
};
// The search page is reached through the header's search form, not a link.
const reachedOtherwise = new Set(['home', 'search', ...Object.values(demo.site.errorHandling ?? {})]);

describe('demo', () => {
  it('links every page it hides from the menu, so nothing built is out of reach', () => {
    const linked = new Set([...JSON.stringify(demo).matchAll(/page:([a-z0-9-]+)/g)].map(([, key]) => key));
    const orphans = demo.pages
      .filter((p) => p.navHide && (p.doktype ?? 1) === 1 && !reachedOtherwise.has(p.key) && !linked.has(p.key))
      .map((p) => p.key);
    expect(orphans).toEqual([]);
  });
});
