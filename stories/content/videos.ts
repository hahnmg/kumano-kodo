import type { Image } from '../../src/lib/html';
import type { VideoImage } from '../atoms/video.markup';

// A placeholder clip: four trip photos cross-faded (sea of clouds, walker in mist, cedars, misty valley).
export const trailVideo: NonNullable<Image['video']> = { src: '/img/video/trail.mp4', type: 'video/mp4', width: 1280, height: 720 };

// A photo as the poster of the clip.
export const asVideo = (poster: Image): VideoImage => ({ ...poster, video: trailVideo });

// A YouTube video in the same format. The id is a placeholder until a real clip of the trip exists: the consent
// question can be reviewed, the player itself shows YouTube's "unavailable" page.
export const externalVideo: NonNullable<Image['video']> = {
    src: 'https://www.youtube-nocookie.com/embed/PLACEHOLDER',
    type: 'video/youtube',
    width: 1280,
    height: 720,
    provider: 'YouTube',
};

export const asExternalVideo = (poster: Image): VideoImage => ({ ...poster, video: externalVideo });
