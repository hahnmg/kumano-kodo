import { addons } from 'storybook/manager-api';
import { brandTheme } from './brand';

addons.setConfig({ theme: brandTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') });

// Pages that moved: links sent before keep working.
const moved: Record<string, string> = {
  '/docs/introduction--docs': '/docs/start--docs',
  '/docs/feedback--docs': '/docs/status--docs',
  '/docs/core-theme-issues--docs': '/docs/status--docs',
  '/docs/fluid-components--docs': '/docs/reference-fluid-components--docs',
};
const params = new URLSearchParams(window.location.search);
const target = moved[params.get('path') ?? ''];
if (target) {
  params.set('path', target);
  window.location.replace(`${window.location.pathname}?${params.toString()}${window.location.hash}`);
}
