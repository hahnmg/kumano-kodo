import { describe, expect, it } from 'vitest';
import { infoBox } from '../../stories/molecules/info-box.markup';
import { expectAccessible, mount } from '../support/accessibility';

const props = { title: 'Interesse?', text: 'Rufen Sie an.', links: [{ label: 'info@example.org', href: 'mailto:info@example.org' }] };

describe('info-box', () => {
    it('renders an aside with links', () => {
        const el = mount(infoBox(props));
        expect(el.querySelector('aside h2')?.textContent).toBe('Interesse?');
        expect(el.querySelector('a')?.getAttribute('href')).toBe('mailto:info@example.org');
    });
    it('passes axe', () => expectAccessible(infoBox(props)));
});
