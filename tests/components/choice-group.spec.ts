import { describe, expect, it } from 'vitest';
import { choiceGroup } from '../../stories/molecules/choice-group.markup';
import { expectAccessible, mount } from '../support/accessibility';

const options = [
  { label: 'Nakahechi', value: '1', checked: true },
  { label: 'Kohechi', value: '2' },
];

describe('choice-group', () => {
  it('names the group with its legend', () => {
    const el = mount(choiceGroup({ legend: 'Route', name: 'route', options }));
    expect(el.querySelector('fieldset > legend')?.textContent).toBe('Route');
    expect([...el.querySelectorAll('input')].map((i) => (i as HTMLInputElement).type)).toEqual(['radio', 'radio']);
  });
  it('sends checkboxes as a list and ties an error to the first box only', () => {
    const el = mount(choiceGroup({ legend: 'Interests', name: 'interests', type: 'checkbox', options, error: 'Please choose one.' }));
    const inputs = [...el.querySelectorAll('input')];
    expect(inputs[0].getAttribute('name')).toBe('interests[]');
    expect(inputs[0].getAttribute('aria-invalid')).toBe('true');
    expect(inputs[1].hasAttribute('aria-invalid')).toBe(false);
  });
  it('passes axe', async () => {
    await expectAccessible(choiceGroup({ legend: 'Route', name: 'route', options }));
    await expectAccessible(choiceGroup({ legend: 'Interests', name: 'interests', type: 'checkbox', options, error: 'Please choose one.' }));
  });
});
