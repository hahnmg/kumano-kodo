import type { PhotoName } from './content';

// Photos per day in capture order; the column spans and shifts are the layout, so they live here, not in the content.
export const dayPhotos: [PhotoName, number, (0 | 1 | 2)?][][] = [
    [
        ['trailhead-river', 8],
        ['signpost', 4, 1],
    ],
    [
        ['misty-valley', 4],
        ['roadside-markers', 3, 2],
        ['stone-path-walkers', 5, 1],
        ['forest-stream', 5],
        ['land-crab', 4, 2],
        ['vending-machines', 3, 1],
        ['chikatsuyu-gate', 12],
    ],
    [
        ['morning-bus', 3],
        ['cedar-canopy', 4, 1],
        ['walker-in-mist', 5],
        ['root-path', 4, 2],
        ['oji-shrine', 4],
        ['cobbled-path', 4, 1],
        ['sunlit-path', 8],
        ['ridge-view', 4, 1],
        ['fern-frond', 3, 2],
        ['yunomine-street', 4],
        ['river-bridge', 5, 1],
        ['outdoor-bath', 6],
    ],
    [
        ['seaside-station', 4],
        ['nachi-pagoda', 5, 1],
        ['harbour-ferry', 7],
        ['ryokan-room', 5, 1],
    ],
];
