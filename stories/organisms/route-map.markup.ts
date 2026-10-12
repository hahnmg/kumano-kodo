import { esc } from '../../src/lib/html';

export interface RouteMapProps {
    stations: { name: string; x: number; y: number; labelY: number; anchor?: 'start' | 'middle' | 'end'; boundary?: boolean }[];
    path: string;
    days: { label: string; x: number }[];
    legend: { walked: string; end: string; boundary: string };
    label: string;
}

export const routeMap = ({ stations, path, days, legend, label }: RouteMapProps): string => {
    const last = stations.length - 1;
    return (
        `<figure class="route-map"><div class="route-map-scroll" tabindex="0" role="group" aria-label="${esc(label)}"><svg class="route-map-svg" viewBox="0 0 1000 250" role="img" aria-label="${esc(label)}">` +
        `<path class="route-map-path" d="${esc(path)}"/>` +
        stations
            .filter((s) => s.boundary)
            .map((s) => `<line class="route-map-boundary" x1="${s.x}" y1="${s.y}" x2="${s.x}" y2="228"/>`)
            .join('') +
        stations
            .map(
                (s, i) =>
                    `<circle class="route-map-station${i === last ? ' route-map-station-end' : ''}" cx="${s.x}" cy="${s.y}" r="${i === last ? 8 : 7}"/>` +
                    `<text class="route-map-label" x="${s.x}" y="${s.labelY}" text-anchor="${s.anchor ?? 'middle'}">${esc(s.name)}</text>`,
            )
            .join('') +
        `</svg><ol class="route-map-segments type-caption">` +
        days.map((d) => `<li style="left:${d.x / 10}%">${esc(d.label)}</li>`).join('') +
        `</ol></div><figcaption class="route-map-legend type-caption">` +
        `<span><i class="route-map-key route-map-key-completed"></i>${esc(legend.walked)}</span>` +
        `<span><i class="route-map-key route-map-key-end"></i>${esc(legend.end)}</span>` +
        `<span><i class="route-map-key route-map-key-boundary"></i>${esc(legend.boundary)}</span>` +
        `</figcaption></figure>`
    );
};
