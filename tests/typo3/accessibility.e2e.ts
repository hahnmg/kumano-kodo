import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const themes = ['caramel', 'forest', 'ocean', 'violet', 'mono'];
const schemes = ['light', 'dark'];
const pages = [
  '/',
  '/practical/showcase',
  '/days/1',
  '/reports',
  '/reports/the-last-bus',
  '/register',
  '/login',
  '/gibt-es-nicht',
  '/de/',
  '/ja/days/1',
];

for (const theme of themes) {
  for (const scheme of schemes) {
    for (const path of pages) {
      test(`${theme} ${scheme} ${path}`, async ({ page }) => {
        await page.goto(path);
        // The themes as shipped: the site's own overrides (the inline :root[data-theme] block) go.
        await page.evaluate(
          ([t, s]) => {
            document.documentElement.dataset.theme = t;
            document.documentElement.dataset.scheme = s;
            for (const style of document.querySelectorAll('style')) {
              if (style.textContent?.trimStart().startsWith(':root[data-theme]')) style.remove();
            }
          },
          [theme, scheme],
        );
        // The scheme switch starts colour transitions; axe would read their in-between colours.
        await page.evaluate(() => Promise.all([document.fonts.ready, ...document.getAnimations().map((a) => a.finished)]));
        const tags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];
        const rules = await new AxeBuilder({ page }).withTags(tags).disableRules(['color-contrast']).analyze();
        // axe cannot see the photo under the hero's figures and measures them against the page behind it.
        const contrast = await new AxeBuilder({ page }).withRules(['color-contrast']).exclude('.hero-bar').analyze();
        const violations = [...rules.violations, ...contrast.violations];
        expect(violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`)).toEqual([]);
      });
    }
  }
}
