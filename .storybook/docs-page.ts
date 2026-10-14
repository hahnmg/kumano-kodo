import { createElement as h, Fragment, type MouseEvent } from 'react';
import { SELECT_STORY } from 'storybook/internal/core-events';
import { addons } from 'storybook/preview-api';
import { Controls, Description, Primary, Stories, Subtitle, Title, useOf } from '@storybook/addon-docs/blocks';
import usage from '../docs/component-usage.json';
import type { Usage } from './component-usage';

// A plain click switches the story in place; modifier clicks open the link as the browser would.
const open = (storyId: string) => (event: MouseEvent) => {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
  event.preventDefault();
  addons.getChannel().emit(SELECT_STORY, { storyId, viewMode: 'story' });
};

// The pages a component appears on, grouped by Site and Templates; links open the page story in the manager.
const UsedOn = () => {
  const { preparedMeta } = useOf('meta');
  const pages = (usage as Record<string, Usage[]>)[preparedMeta.title] ?? [];
  if (!pages.length) return null;
  const groups = Map.groupBy(pages, (page) => page.group);
  return h(
    'section',
    { className: 'docs-used-on' },
    h('h3', null, 'Used on'),
    ...[...groups].map(([group, list]) =>
      h(
        'p',
        { key: group },
        h('strong', null, `${group}: `),
        ...list.flatMap((page, i) => [
          i ? ', ' : '',
          h('a', { key: page.id, href: `/?path=/story/${page.id}`, target: '_top', onClick: open(page.id) }, page.name),
        ]),
      ),
    ),
  );
};

export const DocsPage = () => h(Fragment, null, h(Title), h(Subtitle), h(Description), h(UsedOn), h(Primary), h(Controls), h(Stories));
