import { describe, expect, it } from 'vitest';
import { heroSplit } from '../../stories/organisms/hero-split.markup';
import { demo } from '../../stories/templates/content';
import { expectAccessible, mount } from '../support/accessibility';

const props = {
    title: 'Ein Zuhause',
    text: 'Wir versorgen Tiere.',
    action: { label: 'Tiere kennenlernen', href: '#' },
    panel: { title: 'Tiere nach Art', items: demo.categories },
};

describe('hero-split', () => {
    it('renders h1, primary action and the panel', () => {
        const el = mount(heroSplit(props));
        expect(el.querySelector('h1')?.textContent).toBe('Ein Zuhause');
        expect(el.querySelector('.button--primary')).not.toBeNull();
        expect(el.querySelector('.media-list')).not.toBeNull();
    });
    it('passes axe', () => expectAccessible(heroSplit(props)));
});
