import { describe, expect, it } from 'vitest';
import { richText } from '../../stories/molecules/rich-text.markup';
import { richTextSample } from '../../stories/templates/content';
import { expectAccessible, mount } from '../support/accessibility';

describe('rich-text', () => {
    it('keeps editorial HTML', () => {
        const el = mount(richText({ html: richTextSample }));
        expect(el.querySelectorAll('.rich-text ul > li')).toHaveLength(4);
        expect(el.querySelectorAll('.rich-text ol > li')).toHaveLength(3);
        expect(el.querySelector('.rich-text a[href^="/"]')).not.toBeNull();
        expect(el.querySelector('.rich-text a[href^="https://"]')).not.toBeNull();
    });
    it('passes axe', () => expectAccessible(richText({ html: richTextSample })));
});
