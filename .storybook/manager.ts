import { addons } from 'storybook/manager-api';
import { brandTheme } from './brand';

addons.setConfig({ theme: brandTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') });
