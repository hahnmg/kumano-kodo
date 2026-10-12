import { afterEach, describe, expect, it } from 'vitest';
import { bindFileUploads } from '../../src/scripts/file-upload';
import { fileUpload } from '../../stories/atoms/file-upload.markup';
import { expectAccessible, mount } from '../support/accessibility';

const props = { label: 'Your route', name: 'route-file', dropLabel: 'Drag a file here or', chooseLabel: 'choose one', description: 'PDF.' };

describe('file-upload', () => {
    let unbind = () => {};
    afterEach(() => unbind());

    it('labels the file input and points it at its description', () => {
        const el = mount(fileUpload(props));
        const input = el.querySelector<HTMLInputElement>('input[type=file]')!;
        expect(el.querySelector(`label[for="${input.id}"]`)?.textContent).toBe('Your route');
        expect(document.getElementById(input.getAttribute('aria-describedby') ?? '')?.textContent).toBe('PDF.');
    });
    it('lists uploaded files, each with a box to remove it', () => {
        const el = mount(fileUpload({ ...props, files: ['a.pdf', 'b.pdf'], removeLabel: 'Remove' }));
        expect(el.querySelectorAll('.file-upload-item input[type=checkbox]')).toHaveLength(2);
    });
    it('marks the zone while dragging and names the chosen files', () => {
        const el = mount(fileUpload(props));
        unbind = bindFileUploads(document);
        const zone = el.querySelector<HTMLElement>('[data-file-upload]')!;
        const input = el.querySelector<HTMLInputElement>('input[type=file]')!;
        input.dispatchEvent(new Event('dragenter', { bubbles: true }));
        expect(zone.hasAttribute('data-dragover')).toBe(true);
        Object.defineProperty(input, 'files', { value: [new File(['x'], 'nakahechi.pdf')] });
        input.dispatchEvent(new Event('change', { bubbles: true }));
        expect(zone.hasAttribute('data-dragover')).toBe(false);
        expect(el.querySelector('.file-upload-chosen')?.textContent).toBe('nakahechi.pdf');
    });
    it('passes axe', async () => {
        await expectAccessible(fileUpload(props));
        await expectAccessible(fileUpload({ ...props, files: ['a.pdf'], error: 'Please choose a file.' }));
    });
});
