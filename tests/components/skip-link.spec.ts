import { describe, expect, it } from 'vitest';
import { skipLink } from '../../stories/atoms/skip-link.markup';
import { content } from '../../stories/templates/content';
import { kumanoHome } from '../../stories/templates/kumano-home.markup';
import { kumanoJournal } from '../../stories/templates/kumano-journal.markup';
import { dayPage } from '../../stories/templates/site-pages.markup';
import { expectAccessible } from '../support/accessibility';

describe('skip-link', () => {
  it('is the first link of every template and points at main', () => {
    for (const page of [kumanoHome(content('de')), kumanoJournal(content('de')), dayPage(1, content('de'))]) {
      document.body.innerHTML = page;
      const first = document.querySelector('a[href], button');
      expect(first?.className).toContain('skip-link');
      expect(first?.textContent).toBe('Zum Inhalt springen');
      expect(document.querySelector(first!.getAttribute('href')!)?.tagName).toBe('MAIN');
    }
  });
  it('passes axe', () => expectAccessible(skipLink()));
});
