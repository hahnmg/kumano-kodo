import type { Image } from '../../src/lib/html';
import type { VideoImage } from '../atoms/video.markup';

// A placeholder clip: four trip photos cross-faded (sea of clouds, walker in mist, cedars, misty valley).
export const trailVideo: NonNullable<Image['video']> = { src: '/img/video/trail.mp4', type: 'video/mp4', width: 1280, height: 720 };

// A photo as the poster of the clip.
export const asVideo = (poster: Image): VideoImage => ({ ...poster, video: trailVideo });
