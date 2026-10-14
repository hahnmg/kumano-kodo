import { describe, expect, it } from 'vitest';
import { table } from '../../stories/molecules/table.markup';
import { expectAccessible, mount } from '../support/accessibility';

const props = { caption: 'Stages', head: ['Stage', 'Distance'], rows: [['Chikatsuyu → Hongu', '25,9 km']] };

describe('table', () => {
  it('has a caption and column headers', () => {
    const el = mount(table(props));
    expect(el.querySelector('caption')?.textContent).toBe('Stages');
    expect(el.querySelectorAll('th[scope="col"]')).toHaveLength(2);
  });
  it('passes axe', () => expectAccessible(table(props)));
  // As TYPO3's parseFunc gives a table from the text editor: no caption, no scope, the component's class and wrapper.
  it('passes axe as a table from the text editor', () =>
    expectAccessible(
      '<div class="rich-text"><div class="table-wrap"><table class="table"><thead><tr><th>Day</th><th>Distance</th></tr></thead>' +
        '<tbody><tr><td>Day 2</td><td>9.8 km</td></tr></tbody></table></div></div>',
    ));
});
