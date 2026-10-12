import { describe, expect, it } from 'vitest';
import { routeMap } from '../../stories/organisms/route-map.markup';
import { linkRoute } from '../../stories/content/paths';
import { kumano } from '../../stories/templates/content';
import { expectAccessible, mount } from '../support/accessibility';

describe('route-map', () => {
    it('draws every station and marks the last as the end', () => {
        const el = mount(routeMap(kumano.route));
        expect(el.querySelectorAll('.route-map-station')).toHaveLength(6);
        expect(el.querySelectorAll('.route-map-station-end')).toHaveLength(1);
        expect(el.querySelectorAll('.route-map-boundary')).toHaveLength(
            kumano.route.stations.filter((s) => 'boundary' in s && s.boundary).length,
        );
        expect(el.querySelector('svg')?.getAttribute('role')).toBe('img');
    });
    it('passes axe', () => expectAccessible(routeMap(kumano.route)));
    it('links every station and day mark', () => {
        const el = mount(routeMap(linkRoute(kumano.route)));
        expect(el.querySelectorAll('a.route-map-link')).toHaveLength(6);
        expect(el.querySelectorAll('a.route-map-day-link')).toHaveLength(kumano.route.days.length);
        expect(el.querySelector('svg')?.getAttribute('role')).toBe('group');
        expect(el.querySelector('.route-map-path-day')).toBeNull();
    });
    it('draws one day in accent and steps the other stations back', () => {
        const el = mount(routeMap(linkRoute(kumano.route, 2)));
        expect(el.querySelector('.route-map-path-day')?.getAttribute('clip-path')).toBe('url(#route-map-day-250-430)');
        expect(el.querySelectorAll('.route-map-station-muted')).toHaveLength(4);
        expect(el.querySelector('.route-map-key-day')).not.toBeNull();
    });
    it('passes axe with links and a day', () => expectAccessible(routeMap(linkRoute(kumano.route, 2))));
});
