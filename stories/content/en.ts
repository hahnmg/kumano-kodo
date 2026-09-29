import type { LocaleModule, Photos } from '../templates/content';

const build = (p: Photos) => {
    const ui = {
        mainNav: 'Main navigation',
        language: 'Language',
        darkMode: 'Dark mode',
        trailStatus: 'Trail status and contact',
        categories: 'Categories',
        breadcrumb: 'Breadcrumb',
        pages: 'Pages',
        previousPage: 'Previous page',
        nextPage: 'Next page',
        card: 'Card',
        readMore: 'Read more',
        emailAddress: 'Email address',
        emailPlaceholder: 'name@example.com',
        consent: 'I would like to receive the newsletter and have read the privacy policy.',
        subscribe: 'Subscribe',
    };

    const stages = [
        {
            image: p.zedernweg,
            stage: 'Stage 01',
            stats: '4.0 km · +400 m',
            title: 'Takijiri → Takahara',
            description: 'The entry point. A steep climb through dense forest to the village above the clouds.',
        },
        {
            image: p.wegmarke,
            stage: 'Stage 02',
            stats: '9.8 km · +620 m',
            title: 'Takahara → Chikatsuyu',
            description: 'Markers 11 to 34, three passes in between and no mobile reception.',
        },
        {
            image: p.talblick,
            stage: 'Stage 03',
            stats: '25.9 km · +1,180 m',
            title: 'Chikatsuyu → Hongu',
            description: 'The long stage. To split it, catch the bus at Hosshinmon.',
        },
        {
            image: p.sonnenpfad,
            stage: 'Stage 04',
            stats: '14.5 km · +940 m',
            title: 'Koguchi → Nachi',
            description: 'The Ogumotori-goe, locally called the body breaker. It earns the name.',
        },
        {
            image: p.kammweg,
            stage: 'Optional',
            stats: '7.0 km · +180 m',
            title: 'Hosshinmon → Hongu',
            description: 'The day-trip version for anyone who only wants a taste.',
        },
    ];

    const places = [
        {
            image: p.nachi,
            title: 'Nachi-no-Otaki',
            description: "Japan's tallest single-drop waterfall, right beside the Seiganto-ji pagoda. In the morning mist fills the basin.",
            variant: 'featured' as const,
        },
        {
            image: p.onsen,
            title: 'Yunomine Onsen',
            description: "Japan's oldest hot spring, in use since the twelfth century. After day three, the real reason to keep going.",
        },
        {
            image: p.torii,
            title: 'Kumano Nachi Taisha',
            description: '467 steps up from the village. The pilgrimage ends at the top, and next door a vending machine sells cold tea.',
            variant: 'ruled' as const,
        },
    ];

    const footer = {
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
    };

    const kumano = {
        nav: [
            { label: 'The route', href: '#', active: true, hasChildren: true },
            { label: 'Practical', href: '#', hasChildren: true },
            { label: 'Photos', href: '#' },
        ],
        hero: {
            image: p.nebelberge,
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
                { label: 'Ascent', value: '3,140 m' },
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
        stages,
        route: {
            label: 'Schematic map of the Nakahechi route with six stations',
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
        places,
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
        footer,
    };

    const stageEntry = (i: number, meta: string, badge?: string) => ({
        image: stages[i].image,
        title: stages[i].title,
        subtitle: stages[i].stats,
        meta,
        badge,
    });

    // Standard pages of the same trail journal. Figures come from the journal itself; phone and email are placeholders.
    const guide = {
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
            { image: p.zedernweg, title: 'Nakahechi', meta: '68 km in four days · this journal', href: '#' },
            { image: p.kammweg, title: 'Day trip', meta: '7 km · Hosshinmon → Hongu', href: '#' },
            { image: p.farn, title: 'Kohechi', meta: 'Koyasan → Hongu · next up', href: '#' },
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
            { image: p.nachi, title: places[0].title, subtitle: 'Waterfall, 133 metres', meta: 'End of day 4' },
            { image: p.onsen, title: places[1].title, subtitle: 'Hot spring', meta: 'After day 3' },
            { image: p.torii, title: places[2].title, subtitle: 'Shrine', meta: '467 steps from the village' },
        ],
        prep: [
            {
                title: 'Book accommodation',
                text: 'Takahara and Chikatsuyu each have a handful of minshuku, and in May and November they are full months ahead.',
                variant: 'featured' as const,
            },
            {
                title: 'Pack for rain',
                text: 'Three of four days were wet. A dry change of clothes in a sealed bag helps more than gaiters.',
            },
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
        hosts: [{ image: p.laternen, name: 'Minshuku host', role: 'Chikatsuyu', focus: '“The rain is part of it.”' }],
        footer: {
            ...footer,
            notice: { title: 'Trail conditions:', text: 'After heavy rain, check the tourism office notices before you set out.' },
        },
    };

    const richTextSample =
        '<h2>The long stage</h2>' +
        '<p>26 km from Chikatsuyu to Hongu, the longest of the four days. At Mikoshi pass the mist broke briefly; after that it was downhill. To split it, catch the <a href="#">bus at Hosshinmon</a>.</p>' +
        '<ul><li>Chikatsuyu: leave early, after breakfast at the minshuku</li><li>Mikoshi pass: where the mist broke</li><li>Hosshinmon: bus stop for anyone splitting the stage</li><li>Hongu: end of the stage</li></ul>' +
        '<h3>Where to sleep</h3><p>Book the minshuku in Chikatsuyu months ahead; in May and November it is full.</p>';

    const home = {
        why: { eyebrow: 'Why this trail', title: 'A path in use for a thousand years' },
        bridgeCaption: 'Between Takahara and Chikatsuyu a dozen dry-stone bridges cross the slope. Kilometre 14.',
        quote: {
            quote: '“The rain is part of it. Whoever comes in sunshine sees a different trail.”',
            source: 'Host of the minshuku in Chikatsuyu',
        },
        days: { title: 'How the four days went', aside: 'Walking times without breaks, measured by the clock rather than estimated.' },
        stages: { eyebrow: 'Stages', title: 'Five sections you can walk on their own' },
        map: {
            eyebrow: 'Trail map',
            title: 'Schematic, not to scale',
            aside: 'The order of the stations and the day boundaries are accurate, the geometry is not. For navigation you need the tourism office map.',
        },
        places: { eyebrow: 'Along the way', title: 'Three places worth the detour' },
        roadsideCaption: 'Notes from the roadside. A land crab after the rain, a cedar in the mist.',
        practical: {
            eyebrow: 'Practical',
            title: 'What I wish I had known',
            intro: 'The four questions I have been asked most often since coming back.',
        },
        newsletter: {
            title: 'Two emails a year, whenever a new route is written up',
            text: 'Next up is the Kohechi, the mountain path from Koyasan to Hongu. No marketing, no sharing of your address.',
        },
    };

    const detailFacts = [
        { label: 'Day', value: 'Day 3 · 15 May' },
        { label: 'Distance', value: '25.9 km' },
        { label: 'Ascent', value: '+1,180 m' },
        { label: 'Walking time', value: '9:20 h' },
    ];

    const pages = {
        start: {
            title: 'Four days on the Nakahechi',
            text: 'A private trail journal from May 2026: the stages, the places worth a detour and what I wish I had known before setting out.',
            action: 'See the stages',
            panelTitle: 'Ways to walk it',
            panelMore: 'Compare the routes',
            factsLabel: 'At a glance',
            stages: { eyebrow: 'Stages', title: 'Four days, one stage each' },
            prep: { eyebrow: 'Practical', title: 'Before you go' },
            plan: 'Plan the walk',
        },
        list: {
            title: 'Stages and places',
            crumbs: ['Start', 'The route'],
            chips: ['All', 'Stages', 'Places', 'Day trips'],
            search: { label: 'Search stages and places', placeholder: 'e.g. Hongu' },
            day: { label: 'Day', options: ['All days', 'Day 1', 'Day 2', 'Day 3', 'Day 4'] },
            count: '12 entries',
        },
        detail: {
            crumbs: ['Start', 'The route', 'Stages'],
            caption: 'Looking back over the valley before the climb. Day 3, 15 May.',
            downloads: [
                { title: 'Stage map Chikatsuyu → Hongu', meta: 'PDF · 1.2 MB', href: '#' },
                { title: 'Bus timetable Hosshinmon – Hongu', meta: 'PDF · 96 KB', href: '#' },
                { title: 'Packing list for rain', meta: 'PDF · 240 KB', href: '#' },
            ],
            factsTitle: 'Stage facts',
            facts: detailFacts,
            info: {
                title: 'Split the stage?',
                text: 'Catch the bus at Hosshinmon and walk only the last 7 km to Hongu.',
                links: [
                    { label: 'Bus timetable', href: '#' },
                    { label: 'Stay in Chikatsuyu', href: '#' },
                ],
            },
            back: 'All stages',
            along: 'Along the route',
            subNavTitle: 'The route',
        },
    };

    const samples = {
        textarea: { label: 'Message', placeholder: 'Your question about the route' },
        search: 'Search',
        galleryCaption: 'Notes from four days on the Nakahechi, May 2026.',
        table: {
            caption: 'Stages at a glance',
            head: ['Stage', 'Distance', 'Ascent', 'Walking time'],
            rows: [
                ['Takijiri → Takahara', '4.0 km', '+400 m', '2:10 h'],
                ['Takahara → Chikatsuyu', '9.8 km', '+620 m', '4:40 h'],
                ['Chikatsuyu → Hongu', '25.9 km', '+1,180 m', '9:20 h'],
                ['Koguchi → Nachi', '14.5 km', '+940 m', '7:00 h'],
            ],
        },
    };

    return { ui, kumano, guide, richTextSample, home, pages, samples };
};

export const en: LocaleModule<ReturnType<typeof build>> = {
    alts: {
        zedernweg: 'Two walkers in rain ponchos between tall cedars',
        wegmarke: 'Numbered trail post in the misty forest',
        talblick: 'View over a village in the valley, clouds on the slopes',
        sonnenpfad: 'Sunlit forest path between slender cedars',
        kammweg: 'Wide view over forested ridges',
        nebelberge: 'Misty mountain ranges of the Kii peninsula in the early morning',
        steinbruecke: 'Stone bridge over a stream in the cedar forest',
        nachi: 'Three-storey pagoda in front of Nachi waterfall',
        onsen: 'Stone-edged onsen pool under a wooden roof',
        torii: 'Red torii at the foot of a stone staircase',
        krabbe: 'Orange land crab on wet rock',
        nebelbaum: 'Curved tree trunk in the misty cedar forest',
        farn: 'Ferns at the edge of the path',
        laternen: 'Stone lanterns at a shrine',
        bus: 'Bus on a mountain road',
    },
    build,
};

export type LocaleContent = ReturnType<typeof build>;
