import { describe, expect, it } from 'vitest';
import { routeMap } from '../../stories/organisms/route-map.markup';
import { kumano } from '../../stories/templates/content';
import { expectAccessible, mount } from '../support/accessibility';

describe('route-map', () => {
    it('draws every station and marks the last as the end', () => {
        const el = mount(routeMap(kumano.route));
        expect(el.querySelectorAll('.route-map__station')).toHaveLength(6);
        expect(el.querySelectorAll('.route-map__station--end')).toHaveLength(1);
        expect(el.querySelectorAll('.route-map__boundary')).toHaveLength(
            kumano.route.stations.filter((s) => 'boundary' in s && s.boundary).length,
        );
        expect(el.querySelector('svg')?.getAttribute('role')).toBe('img');
    });
    it('passes axe', () => expectAccessible(routeMap(kumano.route)));
});
