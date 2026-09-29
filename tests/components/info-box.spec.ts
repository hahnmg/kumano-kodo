import { describe, expect, it } from 'vitest';
import { infoBox } from '../../stories/molecules/info-box.markup';
import { expectAccessible, mount } from '../support/accessibility';

const props = {
    title: 'Split the stage?',
    text: 'Take the bus to Hosshinmon.',
    links: [{ label: 'post@kumano-kodo.example', href: 'mailto:post@kumano-kodo.example' }],
};

describe('info-box', () => {
    it('renders an aside with links', () => {
        const el = mount(infoBox(props));
        expect(el.querySelector('aside h2')?.textContent).toBe('Split the stage?');
        expect(el.querySelector('a')?.getAttribute('href')).toBe('mailto:post@kumano-kodo.example');
    });
    it('passes axe', () => expectAccessible(infoBox(props)));
});
