import type { Meta, StoryObj } from '@storybook/html-vite';
import { kumano } from '../templates/content';
import { routeMap, type RouteMapProps } from './route-map.markup';

const meta: Meta<RouteMapProps> = { title: 'Organisms/Route Map', render: (args) => routeMap(args), args: kumano.route };
export default meta;

export const RouteMap: StoryObj<RouteMapProps> = {};
