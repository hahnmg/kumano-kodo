import { attrs, esc } from '../../src/lib/html';

export interface RouteMapStation {
    name: string;
    x: number;
    y: number;
    labelY: number;
    anchor?: 'start' | 'middle' | 'end';
    boundary?: boolean;
    href?: string;
    highlight?: boolean;
}

export interface RouteMapProps {
    stations: readonly RouteMapStation[];
    path: string;
    days: readonly { label: string; x: number; href?: string }[];
    legend: { walked: string; end: string; boundary: string; day?: string };
    label: string;
}

const linked = (href: string | undefined, content: string, cls: string) =>
    href ? `<a${attrs({ class: cls, href })}>${content}</a>` : content;

export const routeMap = ({ stations, path, days, legend, label }: RouteMapProps): string => {
    const last = stations.length - 1;
    // The highlighted stretch runs from the first to the last flagged station.
    const lit = stations.filter((s) => s.highlight).map((s) => s.x);
    const span = lit.length > 1 ? [Math.min(...lit), Math.max(...lit)] : undefined;
    const inSpan = (x: number) => !span || (x >= span[0] && x <= span[1]);
    const clip = span ? `route-map-day-${span[0]}-${span[1]}` : '';
    const station = (s: RouteMapStation, i: number) =>
        linked(
            s.href,
            (s.href ? `<circle class="route-map-target" cx="${s.x}" cy="${s.y}" r="16"/>` : '') +
                `<circle class="route-map-station${i === last ? ' route-map-station-end' : ''}${inSpan(s.x) ? '' : ' route-map-station-muted'}" cx="${s.x}" cy="${s.y}" r="${i === last ? 8 : 7}"/>` +
                `<text class="route-map-label" x="${s.x}" y="${s.labelY}" text-anchor="${s.anchor ?? 'middle'}">${esc(s.name)}</text>`,
            'route-map-link',
        );
    return (
        `<figure class="route-map${span ? ' route-map-highlighted' : ''}"><div class="route-map-scroll" tabindex="0" role="group" aria-label="${esc(label)}">` +
        `<svg class="route-map-svg" viewBox="0 0 1000 250" role="${stations.some((s) => s.href) ? 'group' : 'img'}" aria-label="${esc(label)}">` +
        (span ? `<clipPath id="${clip}"><rect x="${span[0]}" y="0" width="${span[1] - span[0]}" height="250"/></clipPath>` : '') +
        `<path class="route-map-path" d="${esc(path)}"/>` +
        (span ? `<path class="route-map-path-day" d="${esc(path)}" clip-path="url(#${clip})"/>` : '') +
        stations
            .filter((s) => s.boundary)
            .map((s) => `<line class="route-map-boundary" x1="${s.x}" y1="${s.y}" x2="${s.x}" y2="228"/>`)
            .join('') +
        stations.map(station).join('') +
        `</svg><ol class="route-map-segments type-caption">` +
        days.map((d) => `<li style="left:${d.x / 10}%">${linked(d.href, esc(d.label), 'route-map-day-link')}</li>`).join('') +
        `</ol></div><figcaption class="route-map-legend type-caption">` +
        (span && legend.day ? `<span><i class="route-map-key route-map-key-day"></i>${esc(legend.day)}</span>` : '') +
        `<span><i class="route-map-key route-map-key-completed"></i>${esc(legend.walked)}</span>` +
        `<span><i class="route-map-key route-map-key-end"></i>${esc(legend.end)}</span>` +
        `<span><i class="route-map-key route-map-key-boundary"></i>${esc(legend.boundary)}</span>` +
        `</figcaption></figure>`
    );
};
