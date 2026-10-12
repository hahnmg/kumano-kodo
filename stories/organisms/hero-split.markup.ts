import { esc } from '../../src/lib/html';
import { button } from '../atoms/button.markup';
import { mediaList, type MediaListProps } from '../molecules/media-list.markup';

export interface HeroSplitProps {
    title: string;
    text: string;
    action: { label: string; href: string };
    panel: MediaListProps;
}

export const heroSplit = ({ title, text, action, panel }: HeroSplitProps): string =>
    `<section class="hero-split"><div class="hero-split-inner"><div class="hero-split-text">` +
    `<h1 class="type-h2">${esc(title)}</h1><p class="type-lead">${esc(text)}</p><div>${button(action)}</div></div>` +
    `<div class="hero-split-panel">${mediaList(panel)}</div></div></section>`;
