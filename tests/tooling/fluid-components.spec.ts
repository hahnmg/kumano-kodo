import { describe, expect, it } from 'vitest';
import reference from '../../docs/fluid-components.json';

const sources = import.meta.glob('../../typo3/packages/kumano_kodo/Resources/Private/Components/*/*.fluid.html', {
    query: '?raw',
    import: 'default',
    eager: true,
}) as Record<string, string>;

describe('fluid components', () => {
    it('describe themselves and each argument, for the reference', () => {
        for (const [file, source] of Object.entries(sources)) {
            expect(source, file).toMatch(/<f:comment>\s*\S/);
            for (const [tag] of source.matchAll(/<f:argument\b[^>]*\/>/g)) expect(tag, file).toMatch(/description="[^"]+"/);
        }
    });
    it('match the generated reference', () => {
        const names = Object.keys(sources)
            .map((file) => file.split('/').at(-2)!)
            .map((n) => n[0].toLowerCase() + n.slice(1));
        expect(reference.map((c) => c.name).sort()).toEqual(names.sort());
    });
});
