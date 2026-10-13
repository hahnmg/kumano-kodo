import type { Image } from '../../src/lib/html';

// A placeholder clip: four trip photos cross-faded (sea of clouds, walker in mist, cedars, misty valley).
export const trailVideo: NonNullable<Image['video']> = { src: '/img/video/trail.mp4', type: 'video/mp4' };

// A photo as the poster of the clip.
export const asVideo = (poster: Image): Image => ({ ...poster, video: trailVideo });
