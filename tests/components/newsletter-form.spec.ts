import { describe, expect, it } from 'vitest';
import { newsletterForm } from '../../stories/molecules/newsletter-form.markup';
import { expectAccessible, mount } from '../support/accessibility';

describe('newsletter-form', () => {
    it('posts a required email, a required consent and a submit button', () => {
        const form = mount(newsletterForm({ action: '/subscribe' })).querySelector('form') as HTMLFormElement;
        expect(form.getAttribute('action')).toBe('/subscribe');
        expect((form.querySelector('input[type="email"]') as HTMLInputElement).required).toBe(true);
        expect((form.querySelector('input[type="checkbox"]') as HTMLInputElement).required).toBe(true);
        expect(form.querySelector('button[type="submit"]')).not.toBeNull();
    });
    it('passes axe', () => expectAccessible(newsletterForm({ action: '#' })));
});
