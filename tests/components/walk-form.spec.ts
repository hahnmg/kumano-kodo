import { describe, expect, it } from 'vitest';
import { content, locales, type Locale } from '../../stories/templates/content';
import { walkForm, walkFormSent, type WalkFormStep } from '../../stories/templates/walk-form';
import { expectAccessible, mount } from '../support/accessibility';

const steps: WalkFormStep[] = [0, 1, 2, 'summary'];

describe('walk-form', () => {
  it('marks the current step and offers a way back after the first', () => {
    const c = content('en');
    steps.forEach((step, i) => {
      const el = mount(walkForm(c, step));
      expect(el.querySelector('.form-steps [aria-current="step"]')?.textContent).toContain(
        i < 3 ? c.walkForm.steps[i] : c.walkForm.summaryTitle,
      );
      expect(el.querySelectorAll('.form-navigation button')).toHaveLength(i === 0 ? 1 : 2);
    });
  });
  it('shows every answer in the summary, grouped by page', () => {
    const el = mount(walkForm(content('en'), 'summary'));
    expect(el.querySelectorAll('.form-summary-section')).toHaveLength(3);
    expect(el.querySelectorAll('.form-summary-row').length).toBeGreaterThan(0);
    expect(el.querySelector('.form-note')).toBeNull();
  });
  it('lists several languages in a list box', () => {
    const select = mount(walkForm(content('en'), 1)).querySelector<HTMLSelectElement>('select[multiple]');
    expect(select?.size).toBe(4);
  });
  it('passes axe in every step and language', async () => {
    for (const locale of Object.keys(locales) as Locale[]) {
      for (const step of steps) await expectAccessible(walkForm(content(locale), step));
      await expectAccessible(walkFormSent(content(locale)));
    }
  });
});
