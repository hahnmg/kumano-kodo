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
    srcset?: string;
    // The largest file, for the lightbox.
    full?: string;
    width?: number;
    height?: number;
    caption?: string;
}

// `sizes` tells the browser how wide the image is shown, so it picks the smallest file from srcset that is sharp.
export const img = (image: Image, className: string, sizes = '(width <= 900px) 100vw, 50vw', eager = false): string =>
    `<img${attrs({
        class: className,
        src: image.src,
        srcset: image.srcset,
        sizes: image.srcset ? sizes : undefined,
        alt: image.alt,
        width: image.width,
        height: image.height,
        loading: eager ? 'eager' : 'lazy',
        decoding: 'async',
    })}>`;

// Fills %1$s-style placeholders, the format TYPO3's f:translate reads from the same strings.
export const fill = (template: string, ...values: (string | number)[]): string =>
    template.replace(/%(\d+)\$s/g, (_, n: string) => String(values[Number(n) - 1] ?? ''));
