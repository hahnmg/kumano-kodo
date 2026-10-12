import { describe, expect, it } from 'vitest';
import { heroSplit } from '../../stories/organisms/hero-split.markup';
import { guide } from '../../stories/templates/content';
import { expectAccessible, mount } from '../support/accessibility';

const props = {
    title: 'Four days on the Nakahechi',
    text: 'A private trail journal.',
    action: { label: 'See the stages', href: '#' },
    panel: { title: 'Ways to walk it', items: guide.routes },
};

describe('hero-split', () => {
    it('renders h1, primary action and the panel', () => {
        const el = mount(heroSplit(props));
        expect(el.querySelector('h1')?.textContent).toBe('Four days on the Nakahechi');
        expect(el.querySelector('.button-primary')).not.toBeNull();
        expect(el.querySelector('.media-list')).not.toBeNull();
    });
    it('passes axe', () => expectAccessible(heroSplit(props)));
});
