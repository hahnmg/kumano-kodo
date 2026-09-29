// Builds web images from the local originals in img/original (not in git, see README):
// three widths per photo, rotated upright, converted to sRGB, all metadata including GPS removed.
import { mkdir, readdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import sharp from 'sharp';

const root = new URL('..', import.meta.url).pathname;
const source = join(root, 'img/original');
const target = join(root, 'img/photos');
const widths = [640, 1200, 2400];

// Chronological, named after what the photo shows.
const photos = {
    'IMG_9792.jpeg': 'trailhead-river',
    'IMG_9796.jpeg': 'signpost',
    'IMG_9866.jpeg': 'sea-of-clouds',
    'IMG_9879.jpeg': 'misty-valley',
    'IMG_9884.jpeg': 'roadside-markers',
    'IMG_9886.jpeg': 'stone-path-walkers',
    'IMG_9936.jpeg': 'forest-stream',
    'IMG_9943.jpeg': 'land-crab',
    'IMG_9964.jpeg': 'vending-machines',
    'IMG_9971.jpeg': 'chikatsuyu-gate',
    'IMG_9997.jpeg': 'morning-bus',
    'IMG_0012.jpeg': 'cedar-canopy',
    'IMG_0016.jpeg': 'walker-in-mist',
    'IMG_0019.jpeg': 'root-path',
    'IMG_0041.jpeg': 'oji-shrine',
    'IMG_0059.jpeg': 'cobbled-path',
    'IMG_0067.jpeg': 'sunlit-path',
    'IMG_0080.jpeg': 'ridge-view',
    'IMG_0086.jpeg': 'fern-frond',
    'IMG_0095.jpeg': 'yunomine-street',
    'IMG_0105.jpeg': 'river-bridge',
    'IMG_0113.jpeg': 'outdoor-bath',
    'IMG_0160.jpeg': 'seaside-station',
    'IMG_0233.jpeg': 'nachi-pagoda',
    'IMG_0272.jpeg': 'harbour-ferry',
    'IMG_0282.jpeg': 'ryokan-room',
    'IMG_0544.jpeg': 'evening-rooftops',
};

// EXIF DateTimeOriginal, read before the metadata is dropped.
const taken = (exif) => {
    const match = exif?.toString('latin1').match(/(\d{4}):(\d{2}):(\d{2}) (\d{2}):(\d{2})/);
    return match ? `${match[1]}-${match[2]}-${match[3]}T${match[4]}:${match[5]}` : null;
};

await mkdir(target, { recursive: true });
const files = new Set(await readdir(source));
const manifest = {};
for (const [file, slug] of Object.entries(photos)) {
    if (!files.has(file)) throw new Error(`Missing original: img/original/${file}`);
    const input = sharp(join(source, file)).rotate();
    const meta = await sharp(join(source, file)).metadata();
    const upright = meta.orientation && meta.orientation >= 5;
    const width = upright ? meta.height : meta.width;
    const height = upright ? meta.width : meta.height;
    const sizes = {};
    for (const w of widths) {
        // The largest step caps the long edge, so portrait photos do not grow to 3200px.
        const largest = w === widths[widths.length - 1];
        const info = await input
            .clone()
            .resize(largest ? { width: w, height: w, fit: 'inside', withoutEnlargement: true } : { width: w, withoutEnlargement: true })
            .withIccProfile('srgb')
            .jpeg({ quality: largest ? 74 : 78, mozjpeg: true, progressive: true })
            .toFile(join(target, `${slug}-${w}.jpg`));
        sizes[w] = info.width;
    }
    manifest[slug] = { width, height, taken: taken(meta.exif), sizes };
}
await writeFile(join(root, 'stories/content/photos.json'), `${JSON.stringify(manifest, null, 4)}\n`);
console.log(`img/photos: ${Object.keys(manifest).length} photos × ${widths.length} widths`);
