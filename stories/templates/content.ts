import type { Image } from '../../src/lib/html';

const photo = (name: string, alt: string): Image => ({ src: `img/${name}.jpg`, alt });

export const photos = {
    zedernweg: photo('zedernweg', 'Zwei Wanderer in Regenponchos zwischen hohen Zedern'),
    wegmarke: photo('wegmarke', 'Nummerierter Wegpfosten im Nebelwald'),
    talblick: photo('talblick', 'Blick über ein Dorf im Tal, Wolken in den Hängen'),
    sonnenpfad: photo('sonnenpfad', 'Sonnendurchfluteter Waldweg zwischen schlanken Zedern'),
    kammweg: photo('kammweg', 'Weite Aussicht über bewaldete Bergrücken'),
    nebelberge: photo('nebelberge', 'Nebelverhangene Bergketten der Kii-Halbinsel am frühen Morgen'),
    steinbruecke: photo('steinbruecke', 'Steinbrücke über einen Bach im Zedernwald'),
    nachi: photo('nachi', 'Dreistöckige Pagode vor dem Nachi-Wasserfall'),
    onsen: photo('onsen', 'Steingefasstes Onsen-Becken unter einem Holzdach'),
    torii: photo('torii', 'Rotes Torii am Fuß einer Steintreppe'),
    krabbe: photo('krabbe', 'Orange Landkrabbe auf nassem Felsboden'),
    nebelbaum: photo('nebelbaum', 'Gebogener Baumstamm im nebligen Zedernwald'),
    farn: photo('farn', 'Farne am Wegrand'),
    laternen: photo('laternen', 'Steinlaternen an einem Schrein'),
    bus: photo('bus', 'Linienbus an einer Bergstraße'),
};

export const kumano = {
    nav: [
        { label: 'The route', href: '#', active: true, hasChildren: true },
        { label: 'Practical', href: '#', hasChildren: true },
        { label: 'Photos', href: '#' },
    ],
    languages: [
        { code: 'JA', href: '#' },
        { code: 'DE', href: '#' },
        { code: 'EN', href: '#', active: true },
    ],
    hero: {
        image: photos.nebelberge,
        eyebrow: 'Kii Peninsula · Wakayama · 2026 / 05',
        title: 'Four days through\nthe cedar mist',
        teaser: 'The Kumano Kodo is not a long-distance trail but a network of old pilgrim paths to three shrines. I walked the Nakahechi route in May, in the rain.',
        actions: [
            { label: 'See the stages', href: '#stages' },
            { label: 'Practical questions', href: '#faq' },
        ],
        stats: [
            { label: 'Distance', value: '68 km' },
            { label: 'Duration', value: '4 days' },
            { label: 'Ascent', value: '3 140 m' },
            { label: 'Best season', value: 'April, Nov.' },
        ],
    },
    intro: [
        'Between Takijiri-oji and Hongu the trail crosses passes barely higher than 700 metres, and still it feels remote. The forests are planted sugi cedars, set close together, and when mist settles between them you cannot see twenty metres ahead.',
        'Along the way you count the oji: small roadside shrines where pilgrims once performed rituals. Today numbered wooden posts stand there, doubling as emergency markers.',
    ],
    stats: [
        { value: '68', label: 'kilometres walked' },
        { value: '94', label: 'trail markers counted' },
        { value: '3', label: 'rainy days out of four' },
        { value: '1', label: 'land crab on the path' },
    ],
    days: [
        {
            date: 'Day 1 · 13 May',
            route: 'Takijiri → Takahara',
            description: '4 km, 400 metres of climbing in one go. Short, but the steepest section of the route.',
            time: '2:10 h',
        },
        {
            date: 'Day 2 · 14 May',
            route: 'Takahara → Chikatsuyu',
            description: '10 km in steady rain. From midday the path was a streambed; the gaiters made no difference.',
            time: '4:40 h',
        },
        {
            date: 'Day 3 · 15 May',
            route: 'Chikatsuyu → Hongu',
            description: '26 km, the longest stage. At Mikoshi pass the mist broke briefly; after that it was downhill.',
            time: '9:20 h',
        },
        {
            date: 'Day 4 · 16 May',
            route: 'Koguchi → Nachi',
            description: '14 km over the Ogumotori-goe. It ends at Nachi waterfall, 133 metres high.',
            time: '7:00 h',
        },
    ],
    stages: [
        {
            image: photos.zedernweg,
            stage: 'Stage 01',
            stats: '4,0 km · +400 m',
            title: 'Takijiri → Takahara',
            description: 'The entry point. A steep climb through dense forest to the village above the clouds.',
        },
        {
            image: photos.wegmarke,
            stage: 'Stage 02',
            stats: '9,8 km · +620 m',
            title: 'Takahara → Chikatsuyu',
            description: 'Markers 11 to 34, three passes in between and no mobile reception.',
        },
        {
            image: photos.talblick,
            stage: 'Stage 03',
            stats: '25,9 km · +1 180 m',
            title: 'Chikatsuyu → Hongu',
            description: 'The long stage. To split it, catch the bus at Hosshinmon.',
        },
        {
            image: photos.sonnenpfad,
            stage: 'Stage 04',
            stats: '14,5 km · +940 m',
            title: 'Koguchi → Nachi',
            description: 'The Ogumotori-goe, locally called the body breaker. It earns the name.',
        },
        {
            image: photos.kammweg,
            stage: 'Optional',
            stats: '7,0 km · +180 m',
            title: 'Hosshinmon → Hongu',
            description: 'The day-trip version for anyone who only wants a taste.',
        },
    ],
    route: {
        label: 'Schematische Darstellung der Nakahechi-Route mit sechs Stationen',
        path: 'M40 200 C 140 190, 170 110, 250 100 S 360 160, 430 140 C 500 120, 520 60, 610 70 S 730 150, 800 120 C 870 90, 920 110, 960 86',
        stations: [
            { name: 'Takijiri', x: 40, y: 200, labelY: 228, anchor: 'start' as const },
            { name: 'Takahara', x: 250, y: 100, labelY: 82, boundary: true },
            { name: 'Chikatsuyu', x: 430, y: 140, labelY: 122, boundary: true },
            { name: 'Hongu', x: 610, y: 70, labelY: 52, boundary: true },
            { name: 'Koguchi', x: 800, y: 120, labelY: 102, boundary: true },
            { name: 'Nachi', x: 960, y: 86, labelY: 68, anchor: 'end' as const },
        ],
        days: [
            { label: 'Day 1 · 4 km', x: 145 },
            { label: 'Day 2 · 10 km', x: 340 },
            { label: 'Day 3 · 26 km', x: 520 },
            { label: 'Bus', x: 705 },
            { label: 'Day 4 · 14 km', x: 880 },
        ],
        legend: { walked: 'Walked section', end: 'End of the pilgrimage', boundary: 'Day boundary with overnight stay' },
    },
    places: [
        {
            image: photos.nachi,
            title: 'Nachi-no-Otaki',
            description: "Japan's tallest single-drop waterfall, right beside the Seiganto-ji pagoda. In the morning mist fills the basin.",
            variant: 'featured' as const,
        },
        {
            image: photos.onsen,
            title: 'Yunomine Onsen',
            description: "Japan's oldest hot spring, in use since the twelfth century. After day three, the real reason to keep going.",
        },
        {
            image: photos.torii,
            title: 'Kumano Nachi Taisha',
            description: '467 steps up from the village. The pilgrimage ends at the top, and next door a vending machine sells cold tea.',
            variant: 'ruled' as const,
        },
    ],
    faq: [
        {
            question: 'Do I need to book accommodation in advance?',
            answer: 'Yes, and early. Takahara and Chikatsuyu each have a handful of minshuku, and in May and November they are full months ahead. The Tanabe tourism office reservation service books in English.',
            open: true,
        },
        {
            question: 'How bad is the rain really?',
            answer: 'Three of four days were wet. Waterproof boots and gaiters help less than you hope; a dry change of clothes in a sealed bag helps more.',
        },
        {
            question: 'Can you get around by bus?',
            answer: 'Yes. Buses link Hongu, Hosshinmon, Koguchi and Nachi several times a day, which makes it easy to skip or split a stage.',
        },
        {
            question: 'Is there a luggage transfer?',
            answer: 'Yes, between the main villages, booked through the Tanabe tourism office one day ahead.',
        },
    ],
    footer: {
        wordmark: 'Kumano Kodo',
        about: 'A private trail journal. All photos from May 2026, all details without guarantee.',
        columns: [
            {
                title: 'The route',
                links: [
                    { label: 'Nakahechi', href: '#' },
                    { label: 'Kohechi', href: '#' },
                    { label: 'Trail map', href: '#' },
                ],
            },
            {
                title: 'Practical',
                links: [
                    { label: 'Getting there and buses', href: '#' },
                    { label: 'Accommodation', href: '#' },
                    { label: 'Newsletter', href: '#' },
                ],
            },
            { title: 'Contact', links: [{ label: 'post@kumano-kodo.example' }, { label: 'Usually answered within a week' }] },
        ],
        copyright: '© 2026 Kumano Kodo Trail journal',
        legal: [
            { label: 'Imprint', href: '#' },
            { label: 'Privacy', href: '#' },
            { label: 'Accessibility', href: '#' },
        ],
    },
};

// Standard pages of the same trail journal. Figures come from the journal itself; phone and email are placeholders.
const stageEntry = (i: number, meta: string, badge?: string) => ({
    image: kumano.stages[i].image,
    title: kumano.stages[i].title,
    subtitle: kumano.stages[i].stats,
    meta,
    badge,
});

export const guide = {
    topbar: {
        label: 'Trail status:',
        value: 'All four Nakahechi stages open · checked May 2026',
        phone: '+81 00 0000 0000',
        email: 'post@kumano-kodo.example',
    },
    nav: [
        { label: 'The route', href: '#', active: true },
        { label: 'Stages', href: '#' },
        { label: 'Places', href: '#' },
        { label: 'Practical', href: '#' },
        { label: 'Photos', href: '#' },
    ],
    routes: [
        { image: photos.zedernweg, title: 'Nakahechi', meta: '68 km in four days · this journal', href: '#' },
        { image: photos.kammweg, title: 'Day trip', meta: '7 km · Hosshinmon → Hongu', href: '#' },
        { image: photos.farn, title: 'Kohechi', meta: 'Koyasan → Hongu · next up', href: '#' },
    ],
    facts: [
        { icon: 'clock' as const, label: 'Best season', value: 'April and November', note: 'May works too, expect rain' },
        { icon: 'map-pin' as const, label: 'Start', value: 'Takijiri-oji', note: 'Day 1 climbs 400 metres in one go' },
        { icon: 'home' as const, label: 'Overnight', value: 'Minshuku', note: 'Book months ahead for May and November' },
        { icon: 'file' as const, label: 'Walking time', value: '23 h 10 min', note: 'over four days, without breaks' },
    ],
    entries: [
        stageEntry(0, 'Day 1 · 2:10 h'),
        stageEntry(1, 'Day 2 · 4:40 h'),
        stageEntry(2, 'Day 3 · 9:20 h', 'Longest stage'),
        stageEntry(3, 'Day 4 · 7:00 h'),
        stageEntry(4, 'Half a day', 'Day trip'),
        { image: photos.nachi, title: 'Nachi-no-Otaki', subtitle: 'Waterfall, 133 metres', meta: 'End of day 4' },
        { image: photos.onsen, title: 'Yunomine Onsen', subtitle: 'Hot spring', meta: 'After day 3' },
        { image: photos.torii, title: 'Kumano Nachi Taisha', subtitle: 'Shrine', meta: '467 steps from the village' },
    ],
    prep: [
        {
            title: 'Book accommodation',
            text: 'Takahara and Chikatsuyu each have a handful of minshuku, and in May and November they are full months ahead.',
            variant: 'featured' as const,
        },
        { title: 'Pack for rain', text: 'Three of four days were wet. A dry change of clothes in a sealed bag helps more than gaiters.' },
        {
            title: 'Send your luggage ahead',
            text: 'Luggage moves between the main villages, booked one day ahead through the Tanabe tourism office.',
        },
    ],
    tiles: [
        { title: 'Getting there and buses', icon: 'map-pin' as const },
        { title: 'Accommodation', icon: 'home' as const },
        { title: 'Trail markers and safety', icon: 'alert' as const },
        { title: 'Maps and timetables', icon: 'download' as const },
    ],
    hosts: [{ image: photos.laternen, name: 'Minshuku host', role: 'Chikatsuyu', focus: '“The rain is part of it.”' }],
    footer: {
        ...kumano.footer,
        notice: { title: 'Trail conditions:', text: 'After heavy rain, check the tourism office notices before you set out.' },
    },
};

export const richTextSample =
    '<h2>The long stage</h2>' +
    '<p>26 km from Chikatsuyu to Hongu, the longest of the four days. At Mikoshi pass the mist broke briefly; after that it was downhill. To split it, catch the <a href="#">bus at Hosshinmon</a>.</p>' +
    '<ul><li>Chikatsuyu: leave early, after breakfast at the minshuku</li><li>Mikoshi pass: where the mist broke</li><li>Hosshinmon: bus stop for anyone splitting the stage</li><li>Hongu: end of the stage</li></ul>' +
    '<h3>Where to sleep</h3><p>Book the minshuku in Chikatsuyu months ahead; in May and November it is full.</p>';
