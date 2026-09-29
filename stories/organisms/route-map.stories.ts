import type { Meta, StoryObj } from '@storybook/html-vite';
import { localized } from '../templates/content';
import { routeMap, type RouteMapProps } from './route-map.markup';

const meta: Meta<RouteMapProps> = { title: 'Organisms/Route Map', render: localized(routeMap, (c) => c.kumano.route) };
export default meta;

export const RouteMap: StoryObj<RouteMapProps> = {};
