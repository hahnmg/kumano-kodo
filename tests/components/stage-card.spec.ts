import { describe, expect, it } from 'vitest';
import { stageCard } from '../../stories/molecules/stage-card.markup';
import { kumano } from '../../stories/templates/content';
import { expectAccessible, mount } from '../support/accessibility';

describe('stage-card', () => {
    it('renders image, stage, stats and title', () => {
        const el = mount(stageCard(kumano.stages[0]));
        expect(el.querySelector('img')?.getAttribute('alt')).toBe(kumano.stages[0].image.alt);
        expect(el.querySelector('.stage-card__stage')?.textContent).toBe(kumano.stages[0].stage);
        expect(el.querySelector('h3')?.textContent).toBe(kumano.stages[0].title);
    });
    it('passes axe', () => expectAccessible(stageCard(kumano.stages[0])));
});
