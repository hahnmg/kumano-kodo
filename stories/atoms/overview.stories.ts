import type { Meta, StoryObj } from '@storybook/html-vite';
import { content } from '../templates/content';
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

export const Overview: StoryObj = {
  render: (_, { globals }) => {
    const { ui, kumano, pages, guide, photos, samples } = content(globals.locale);
    return (
      `<div style="padding:56px;background:var(--color-paper)">` +
      row('Logo', logo()) +
      row(
        'Button',
        button({ label: ui.subscribe }) +
          `<span style="display:inline-flex;gap:12px;padding:24px;background:url(img/photos/sea-of-clouds-1200.jpg) center/cover">${button({ label: kumano.hero.actions[0].label, variant: 'light' })}${button({ label: kumano.hero.actions[1].label, variant: 'outline' })}</span>`,
      ) +
      row('Link', link({ label: ui.readMore, href: '#' }) + link({ label: pages.detail.back, href: '#', direction: 'back' })) +
      row(
        'Chip · Badge',
        pages.list.chips
          .slice(1)
          .map((label, i) => chip({ label, href: '#', active: i === 0 }))
          .join('') + badge({ label: pages.list.chips[3] }),
      ) +
      row('Icons', iconNames.map((name) => icon({ name })).join('')) +
      row(
        'Controls',
        iconButton({ direction: 'previous' }) +
          iconButton({ direction: 'next' }) +
          iconCircle({ name: 'clock' }) +
          sliderDots({ count: 5, label: ui.card }),
      ) +
      row('Avatar', avatar(photos['stone-path-walkers']) + avatar({ ...photos['outdoor-bath'], size: 'small' })) +
      row(
        'Fields',
        `<div style="display:grid;grid-template-columns:repeat(2,minmax(0,360px));gap:32px">` +
          textField({ label: ui.emailAddress, name: 'email', placeholder: ui.emailPlaceholder }) +
          select({ label: pages.list.day.label, name: 'day', options: pages.list.day.options }) +
          searchField({ label: samples.search, name: 'q', placeholder: pages.list.search.placeholder }) +
          textarea({ ...samples.textarea, name: 'message' }) +
          `</div>`,
      ) +
      row(
        'Choices',
        checkbox({ label: ui.consent, name: 'c' }) +
          radio({ label: guide.routes[0].title, name: 'r', value: 'nakahechi', checked: true }) +
          radio({ label: guide.routes[2].title, name: 'r', value: 'kohechi' }),
      ) +
      `</div>`
    );
  },
};
