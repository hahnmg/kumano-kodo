const entities: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

export const esc = (value: string | number): string => String(value).replace(/[&<>"']/g, (c) => entities[c]);

export const attrs = (map: Record<string, string | number | boolean | undefined | null>): string =>
    Object.entries(map)
        .filter(([, v]) => v !== undefined && v !== null && v !== false)
        .map(([k, v]) => (v === true ? ` ${k}` : ` ${k}="${esc(v as string | number)}"`))
        .join('');

export const cx = (...names: (string | false | undefined | null)[]): string => names.filter(Boolean).join(' ');

export interface Image {
    src: string;
    alt: string;
}

export const img = ({ src, alt }: Image, className: string, width?: number, height?: number): string =>
    `<img${attrs({ class: className, src, alt, width, height, loading: 'lazy', decoding: 'async' })}>`;
