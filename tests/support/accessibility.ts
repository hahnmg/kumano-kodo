import axe from 'axe-core';
import { expect } from 'vitest';

export const mount = (html: string): HTMLElement => {
    document.body.innerHTML = `<main>${html}</main>`;
    return document.body.querySelector('main') as HTMLElement;
};

// jsdom has no layout, so colour contrast is checked by scripts/check-contrast.mjs instead.
export const expectAccessible = async (html: string): Promise<void> => {
    for (const scheme of ['light', 'dark']) {
        document.documentElement.dataset.scheme = scheme;
        mount(html);
        const result = await axe.run(document.body, { rules: { 'color-contrast': { enabled: false }, region: { enabled: false } } });
        expect(result.violations.map((v) => `${scheme}: ${v.id}`)).toEqual([]);
    }
};
