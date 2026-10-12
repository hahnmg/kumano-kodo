import { img, type Image } from '../../src/lib/html';

export type AvatarSize = 'large' | 'small';

export interface AvatarProps extends Image {
    size?: AvatarSize;
}

const px: Record<AvatarSize, number> = { large: 136, small: 56 };

export const avatar = ({ size = 'large', ...image }: AvatarProps): string =>
    img({ ...image, width: px[size], height: px[size] }, `avatar avatar-${size}`, `${px[size]}px`);
