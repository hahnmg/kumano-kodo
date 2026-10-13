import { storyNameFromExport, toId } from 'storybook/internal/csf';

// Which pages use which component: every page story is rendered in English and searched for the component's marker,
// by default the class named like its file. Components that share their classes (form fields) name their own marker
// as a pattern in `parameters.usage`. scripts/build-usage.mjs writes the result.
interface StoryModule {
    default: { title: string; args?: Record<string, unknown>; render?: Render; parameters?: { usage?: string } };
    [name: string]: unknown;
}

type Render = (args: Record<string, unknown>, context: { globals: Record<string, string> }) => string;

export interface Usage {
    id: string;
    name: string;
    group: string;
}

const pages = import.meta.glob<StoryModule>(['../stories/site/*.stories.ts', '../stories/templates/*.stories.ts'], { eager: true });
const components = import.meta.glob<StoryModule>('../stories/{atoms,molecules,organisms,layout}/*.stories.ts', { eager: true });

const stories = (mod: StoryModule) =>
    Object.entries(mod)
        .filter(([name]) => name !== 'default')
        .map(([name, value]) => {
            const story = value as { name?: string; args?: Record<string, unknown>; render?: Render };
            const render = story.render ?? mod.default.render;
            const html = render ? render({ ...mod.default.args, ...story.args }, { globals: { locale: 'en', scheme: 'light' } }) : '';
            return {
                id: toId(mod.default.title, storyNameFromExport(name)),
                name: story.name ?? storyNameFromExport(name),
                group: mod.default.title,
                html,
            };
        });

const classPattern = (name: string) => new RegExp(`class="(?:[^"]*\\s)?${name}(?:\\s|")`);

// The pattern a component is found by, or nothing where neither its file class nor a declared marker exists.
export const markerOf = (path: string, mod: StoryModule): RegExp | undefined => {
    if (mod.default.parameters?.usage) return new RegExp(mod.default.parameters.usage);
    const file = classPattern(path.split('/').pop()!.replace('.stories.ts', ''));
    return file.test(stories(mod)[0]?.html ?? '') ? file : undefined;
};

export const componentStories = Object.entries(components).filter(([path]) => !path.endsWith('/overview.stories.ts'));

export const componentUsage = (): Record<string, Usage[]> => {
    const all = Object.values(pages).flatMap(stories);
    return Object.fromEntries(
        componentStories
            .map(([path, mod]): [string, Usage[]] => {
                const marker = markerOf(path, mod);
                const used = marker ? all.filter((page) => marker.test(page.html)) : [];
                return [mod.default.title, used.map(({ id, name, group }) => ({ id, name, group }))];
            })
            .sort(([a], [b]) => a.localeCompare(b)),
    );
};
