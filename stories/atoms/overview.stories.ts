import type { Meta, StoryObj } from '@storybook/html-vite';
import { avatar } from './avatar.markup';
import { badge } from './badge.markup';
import { button } from './button.markup';
import { checkbox } from './checkbox.markup';
import { chip } from './chip.markup';
import { icon, iconNames } from './icon.markup';
import { iconButton } from './icon-button.markup';
import { iconCircle } from './icon-circle.markup';
import { link } from './link.markup';
import { logo } from './logo.markup';
import { radio } from './radio.markup';
import { searchField } from './search-field.markup';
import { select } from './select.markup';
import { sliderDots } from './slider-dots.markup';
import { textField } from './text-field.markup';
import { textarea } from './textarea.markup';
import './avatar.css';
import './badge.css';
import './button.css';
import './checkbox.css';
import './chip.css';
import './icon.css';
import './icon-button.css';
import './icon-circle.css';
import './link.css';
import './logo.css';
import './select.css';
import './slider-dots.css';
import './text-field.css';
import './textarea.css';

const row = (label: string, html: string) =>
    `<div style="display:flex;gap:32px;align-items:center;padding:24px 0;border-top:1px solid var(--color-line)">` +
    `<span class="type-label" style="width:140px;color:var(--color-muted)">${label}</span>${html}</div>`;

const meta: Meta = { title: 'Atoms/Overview', parameters: { layout: 'fullscreen' } };
export default meta;

export const All: StoryObj = {
    render: () =>
        `<div style="padding:56px;background:var(--color-paper)">` +
        row('Logo', logo()) +
        row(
            'Button',
            button({ label: 'Subscribe' }) +
                `<span style="display:inline-flex;gap:12px;padding:24px;background:url(img/nebelberge.jpg) center/cover">${button({ label: 'See the stages', variant: 'light' })}${button({ label: 'Practical questions', variant: 'outline' })}</span>`,
        ) +
        row('Link', link({ label: 'Mehr erfahren', href: '#' }) + link({ label: 'Zurück zur Übersicht', href: '#', direction: 'back' })) +
        row(
            'Chip · Badge',
            chip({ label: 'Hunde', href: '#', active: true }) +
                chip({ label: 'Katzen', href: '#' }) +
                chip({ label: 'Kleintiere', href: '#' }) +
                badge({ label: 'älteres Tier' }),
        ) +
        row('Icons', iconNames.map((name) => icon({ name })).join('')) +
        row(
            'Controls',
            iconButton({ direction: 'previous' }) +
                iconButton({ direction: 'next' }) +
                iconCircle({ name: 'clock' }) +
                sliderDots({ count: 5 }),
        ) +
        row(
            'Avatar',
            avatar({ src: 'img/zedernweg.jpg', alt: 'Dennis Kral' }) + avatar({ src: 'img/onsen.jpg', alt: 'Katzen', size: 'small' }),
        ) +
        row(
            'Fields',
            `<div style="display:grid;grid-template-columns:repeat(2,minmax(0,360px));gap:32px">` +
                textField({ label: 'Email address', name: 'email', placeholder: 'name@example.com' }) +
                select({ label: 'Geschlecht', name: 'sex', options: ['alle', 'männlich', 'weiblich'] }) +
                searchField({ label: 'Suchen', name: 'q', placeholder: 'z. B. Mischling' }) +
                textarea({ label: 'Nachricht', name: 'message', placeholder: 'Ihre Nachricht' }) +
                `</div>`,
        ) +
        row(
            'Choices',
            checkbox({ label: 'I would like to receive the newsletter.', name: 'c' }) +
                radio({ label: 'Hund', name: 'r', value: 'dog', checked: true }) +
                radio({ label: 'Katze', name: 'r', value: 'cat' }),
        ) +
        `</div>`,
};
