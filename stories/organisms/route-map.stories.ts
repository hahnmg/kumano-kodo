import type { Meta, StoryObj } from '@storybook/html-vite';
import { linkRoute } from '../content/paths';
import { localized } from '../templates/content';
import { routeMap, type RouteMapProps } from './route-map.markup';

const meta: Meta<RouteMapProps> = { title: 'Organisms/Route Map', render: localized(routeMap, (c) => c.kumano.route) };
export default meta;

export const RouteMap: StoryObj<RouteMapProps> = {};

// Stations lead to their place or day, the day marks to the days.
export const Linked: StoryObj<RouteMapProps> = { render: localized(routeMap, (c) => linkRoute(c.kumano.route)) };

// As on a day page: the day in accent, the rest of the route stepped back.
export const Day: StoryObj<RouteMapProps> = { render: localized(routeMap, (c) => linkRoute(c.kumano.route, 2)) };
