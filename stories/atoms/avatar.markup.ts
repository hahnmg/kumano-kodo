import { attrs } from '../../src/lib/html';

export type AvatarSize = 'large' | 'small';

export interface AvatarProps {
    src: string;
    alt: string;
    size?: AvatarSize;
}

const px: Record<AvatarSize, number> = { large: 136, small: 56 };

export const avatar = ({ src, alt, size = 'large' }: AvatarProps): string =>
    `<img${attrs({ class: `avatar avatar--${size}`, src, alt, width: px[size], height: px[size], loading: 'lazy' })}>`;
