import axe from 'axe-core';
import { expect } from 'vitest';

// Components are mounted inside <main>; whole pages bring their own landmarks.
export const mount = (html: string, page = false): HTMLElement => {
    document.body.innerHTML = page ? html : `<main>${html}</main>`;
    return (page ? document.body : document.body.querySelector('main')) as HTMLElement;
};

// jsdom has no layout, so colour contrast is checked by scripts/check-contrast.mjs instead.
export const expectAccessible = async (html: string, page = false): Promise<void> => {
    for (const scheme of ['light', 'dark']) {
        document.documentElement.dataset.scheme = scheme;
        mount(html, page);
        const result = await axe.run(document.body, { rules: { 'color-contrast': { enabled: false }, region: { enabled: page } } });
        expect(result.violations.map((v) => `${scheme}: ${v.id} ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`)).toEqual([]);
    }
};
