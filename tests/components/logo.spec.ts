import { describe, expect, it } from 'vitest';
import { logo, logoBird } from '../../stories/atoms/logo.markup';
import logos from '../../docs/figma-export/logos.json';
import { expectAccessible, mount } from '../support/accessibility';

describe('logo', () => {
    it('links home with an accessible name', () => {
        const a = mount(logo()).querySelector('a.logo');
        expect(a?.getAttribute('href')).toBe('/');
        expect(a?.getAttribute('aria-label')).toBe('Kumano Kodo');
    });
    it('carries both Figma marks with their bird and text groups', () => {
        const a = mount(logo()).querySelector('a.logo');
        for (const name of ['classic', 'modern'] as const) {
            const svg = a?.querySelector(`.logo__mark--${name}`);
            expect(svg?.getAttribute('viewBox')).toBe(`0 0 ${logos[name].width} ${logos[name].height}`);
            expect(svg?.getAttribute('aria-hidden')).toBe('true');
            expect(svg?.querySelectorAll('.logo__bird path')).toHaveLength(logos[name].bird.length);
            expect(svg?.querySelectorAll('.logo__text path')).toHaveLength(logos[name].text.length);
        }
    });
    it('keeps the classic bird as the emblem', () => {
        expect(mount(logoBird('x')).querySelectorAll('svg.x path')).toHaveLength(logos.classic.bird.length);
    });
    it('passes axe', () => expectAccessible(logo()));
});
