import { describe, expect, it } from 'vitest';
import { hero } from '../../stories/organisms/hero.markup';
import { kumano } from '../../stories/templates/content';
import { expectAccessible, mount } from '../support/accessibility';

describe('hero', () => {
    it('has one h1, a light and an outline action and the stats', () => {
        const el = mount(hero(kumano.hero));
        expect(el.querySelectorAll('h1')).toHaveLength(1);
        expect(el.querySelector('.button--light')?.textContent).toBe('See the stages');
        expect(el.querySelector('.button--outline')).not.toBeNull();
        expect(el.querySelectorAll('.stat--on-image')).toHaveLength(4);
    });
    it('passes axe', () => expectAccessible(hero(kumano.hero)));
});
