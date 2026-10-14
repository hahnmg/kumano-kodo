import { describe, expect, it } from 'vitest';
import { componentStories, componentUsage, markerOf } from '../../.storybook/component-usage';
import usage from '../../docs/component-usage.json';

describe('component usage', () => {
  it('finds every component by its file class or a declared marker', () => {
    const missing = componentStories.filter(([path, mod]) => !markerOf(path, mod)).map(([, mod]) => mod.default.title);
    expect(missing).toEqual([]);
  });
  it('is current: run scripts/build-usage.mjs after changing a page or component', () => {
    expect(componentUsage()).toEqual(usage);
  });
});
