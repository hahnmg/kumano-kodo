import type { LocaleModule, Photos } from '../templates/content';

// The trip behind the photos: 20 to 23 April 2024, Takijiri to Katsuura, plus one evening two days later.
const build = (p: Photos) => {
    const ui = {
        mainNav: 'Main navigation',
        language: 'Language',
        menu: 'Menu',
        darkMode: 'Dark mode',
        trailStatus: 'Trail status and contact',
        categories: 'Categories',
        breadcrumb: 'Breadcrumb',
        pages: 'Pages',
        previousPage: 'Previous page',
        nextPage: 'Next page',
        previous: 'Previous',
        next: 'Next',
        close: 'Close',
        card: 'Card',
        readMore: 'Read more',
        emailAddress: 'Email address',
        emailPlaceholder: 'name@example.com',
        consent: 'I would like to receive the newsletter and have read the privacy policy.',
        subscribe: 'Subscribe',
    };

    const stages = [
        {
            image: p['signpost'],
            stage: 'Day 1',
            stats: '3.7 km · +400 m',
            title: 'Takijiri → Takahara',
            description: 'Started at a quarter to four, straight off the bus. The first hour climbs the whole way.',
        },
        {
            image: p['stone-path-walkers'],
            stage: 'Day 2',
            stats: '9.8 km · +620 m',
            title: 'Takahara → Chikatsuyu',
            description: 'Clouds below the village at seven, rain from nine, the lantern gate of Chikatsuyu at half past five.',
        },
        {
            image: p['morning-bus'],
            stage: 'Bus',
            stats: '07:18 · Chikatsuyu → Hosshinmon',
            title: 'The part we skipped',
            description: 'The long middle section, done by bus in the rain. No regrets.',
        },
        {
            image: p['walker-in-mist'],
            stage: 'Day 3',
            stats: '7.0 km · +180 m',
            title: 'Hosshinmon → Hongu',
            description: 'Cedars, an oji shrine, a view across the ridges, and Yunomine in the afternoon.',
        },
        {
            image: p['nachi-pagoda'],
            stage: 'Day 4',
            stats: 'By train and bus',
            title: 'Nachi and Katsuura',
            description: 'No hiking. The coast line, the pagoda in front of the falls, a ferry to the ryokan.',
        },
    ];

    const places = [
        {
            image: p['nachi-pagoda'],
            title: 'Seiganto-ji and Nachi falls',
            description: 'The three-storey pagoda in front of the falls. We came by bus at lunchtime, in rain that never quite stopped.',
            variant: 'featured' as const,
        },
        {
            image: p['yunomine-street'],
            title: 'Yunomine Onsen',
            description: 'A narrow valley with the bath houses along the stream. Carp streamers hung across it for Children’s Day.',
        },
        {
            image: p['chikatsuyu-gate'],
            title: 'Chikatsuyu',
            description:
                'The lantern gate at the edge of the village, with the three-legged crow on the middle lantern. The end of day two.',
            variant: 'ruled' as const,
        },
    ];

    const footer = {
        wordmark: 'Kumano Kodo',
        about: 'A private trail journal. Photos from 20 to 25 April 2024, all details without guarantee.',
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
        copyright: '© 2024 Kumano Kodo Trail journal',
        legal: [
            { label: 'Imprint', href: '#' },
            { label: 'Privacy', href: '#' },
            { label: 'Accessibility', href: '#' },
        ],
    };

    // Header flyouts: the route opens a full-width panel, practical a plain dropdown.
    const routeMenu = {
        kind: 'mega' as const,
        columns: [
            { title: 'Days', links: stages.map((s) => ({ label: `${s.stage} · ${s.title}`, href: '#' })) },
            { title: 'Places', links: places.map((pl) => ({ label: pl.title, href: '#' })) },
        ],
        text: {
            title: 'The Nakahechi',
            html: '<p>The old imperial route from Tanabe to the three grand shrines of Kumano. We walked three days of it in April and took the bus where the legs said so.</p>',
        },
        teaser: {
            image: stages[1].image,
            title: stages[1].title,
            subtitle: stages[1].stats,
            meta: '21 April · 07:02–17:28',
            badge: 'Longest day',
            href: '#',
        },
        overview: { label: 'All about the route', href: '#' },
    };
    const practicalMenu = {
        kind: 'dropdown' as const,
        links: ['Getting there and buses', 'Accommodation', 'Trail markers and safety', 'Maps and timetables', 'Newsletter'].map(
            (label) => ({
                label,
                href: '#',
            }),
        ),
    };

    const kumano = {
        nav: [
            { label: 'The route', href: '#', active: true, menu: routeMenu },
            { label: 'Practical', href: '#', menu: practicalMenu },
            { label: 'Photos', href: '#' },
        ],
        hero: {
            image: p['sea-of-clouds'],
            eyebrow: 'Kii Peninsula · Wakayama · April 2024',
            title: 'Four days through\nthe cedar mist',
            teaser: 'The Kumano Kodo is not one long trail but a network of old pilgrim paths to three shrines. We walked the Nakahechi in April, mostly in the rain, and took the bus where it made sense.',
            actions: [
                { label: 'See the days', href: '#stages' },
                { label: 'Practical questions', href: '#faq' },
            ],
            stats: [
                { label: 'On foot', value: '21 km' },
                { label: 'Days', value: '4' },
                { label: 'Photos', value: '27' },
                { label: 'Month', value: 'April' },
            ],
        },
        intro: [
            'Between Takijiri and Hongu the trail crosses passes barely higher than 700 metres, and still it feels remote. The forests are planted sugi cedars, set close together; when the mist settles between them you cannot see twenty metres ahead.',
            'Along the way you pass the oji, small roadside shrines where pilgrims once stopped to pray. Most are a clearing, a stone and a wooden torii, easy to walk past if you are looking at your feet.',
        ],
        stats: [
            { value: '21', label: 'kilometres on foot' },
            { value: '1', label: 'bus that saved a day' },
            { value: '3', label: 'wet days out of four' },
            { value: '1', label: 'land crab on the path' },
        ],
        days: [
            {
                date: 'Day 1 · 20 April',
                route: 'Takijiri → Takahara',
                description:
                    'Off the bus at half past three, on the trail at a quarter to four. 3.7 km, almost all of it uphill, to a village that sits above the valley.',
                time: 'from 15:40',
            },
            {
                date: 'Day 2 · 21 April',
                route: 'Takahara → Chikatsuyu',
                description:
                    'Clouds lying in the valley at seven, rain from nine. Stone paving, a stream, a land crab at noon, the lantern gate of Chikatsuyu at 17:28.',
                time: '07:02–17:28',
            },
            {
                date: 'Day 3 · 22 April',
                route: 'Hosshinmon → Hongu → Yunomine',
                description:
                    'The 07:18 bus over the long middle section, then the last seven kilometres on foot. In the afternoon an outdoor bath in Yunomine.',
                time: '07:18–16:05',
            },
            {
                date: 'Day 4 · 23 April',
                route: 'Nachi and Katsuura',
                description:
                    'A day without hiking: the train along the coast, the pagoda in front of the falls, a ferry across the harbour to the ryokan.',
                time: '10:55–15:48',
            },
        ],
        stages,
        route: {
            label: 'Schematic map of the route with six stations',
            path: 'M40 200 C 140 190, 170 110, 250 100 S 360 160, 430 140 C 500 120, 520 60, 610 70 S 730 150, 800 120 C 870 90, 920 110, 960 86',
            stations: [
                { name: 'Takijiri', x: 40, y: 200, labelY: 228, anchor: 'start' as const },
                { name: 'Takahara', x: 250, y: 100, labelY: 82, boundary: true },
                { name: 'Chikatsuyu', x: 430, y: 140, labelY: 122, boundary: true },
                { name: 'Hosshinmon', x: 610, y: 70, labelY: 52, boundary: true },
                { name: 'Hongu', x: 800, y: 120, labelY: 102, boundary: true },
                { name: 'Nachi', x: 960, y: 86, labelY: 68, anchor: 'end' as const },
            ],
            days: [
                { label: 'Day 1 · 3.7 km', x: 145 },
                { label: 'Day 2 · 9.8 km', x: 340 },
                { label: 'Bus', x: 520 },
                { label: 'Day 3 · 7 km', x: 705 },
                { label: 'Train', x: 880 },
            ],
            legend: { walked: 'Route', end: 'End of the trip', boundary: 'Day boundary with overnight stay' },
        },
        places,
        faq: [
            {
                question: 'Do I need to book accommodation in advance?',
                answer: 'Yes, and early. Takahara and Chikatsuyu each have a handful of minshuku, and in spring and autumn they are full months ahead. The Tanabe tourism office reservation service books in English.',
                open: true,
            },
            {
                question: 'How bad is the rain really?',
                answer: 'Three of our four days were wet. Waterproof boots and gaiters help less than you hope; a dry change of clothes in a sealed bag helps more.',
            },
            {
                question: 'Can you get around by bus?',
                answer: 'Yes. Buses link Chikatsuyu, Hosshinmon and Hongu several times a day. We took the 07:18 and skipped the long middle section.',
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

    // Standard pages of the same trail journal. Phone and email are placeholders.
    const guide = {
        topbar: {
            label: 'Trail status:',
            value: 'All Nakahechi sections open · as of April 2024',
            phone: '+81 00 0000 0000',
            email: 'post@kumano-kodo.example',
        },
        nav: [
            { label: 'The route', href: '#', active: true },
            { label: 'Days', href: '#' },
            { label: 'Places', href: '#' },
            { label: 'Practical', href: '#', menu: practicalMenu },
            { label: 'Photos', href: '#' },
        ],
        routes: [
            { image: p['stone-path-walkers'], title: 'Nakahechi', meta: 'Three days on foot · this journal', href: '#' },
            { image: p['walker-in-mist'], title: 'Day trip', meta: '7 km · Hosshinmon → Hongu', href: '#' },
            { image: p['fern-frond'], title: 'Kohechi', meta: 'Koyasan → Hongu · next time', href: '#' },
        ],
        facts: [
            { icon: 'clock' as const, label: 'When', value: '20 to 23 April', note: 'Three wet days out of four' },
            { icon: 'map-pin' as const, label: 'Start', value: 'Takijiri', note: 'Off the bus at half past three' },
            { icon: 'home' as const, label: 'Overnight', value: 'Minshuku and ryokan', note: 'Booked months ahead' },
            { icon: 'file' as const, label: 'On foot', value: 'About 21 km', note: 'over three days, plus one by train' },
        ],
        entries: [
            stageEntry(0, '20 April · from 15:40'),
            stageEntry(1, '21 April · 07:02–17:28', 'Longest day'),
            stageEntry(2, '22 April · 07:18'),
            stageEntry(3, '22 April · 08:26–12:05'),
            stageEntry(4, '23 April · 10:55–15:48', 'No hiking'),
            { image: p['outdoor-bath'], title: places[1].title, subtitle: 'Outdoor bath', meta: '22 April · 16:05' },
            { image: p['chikatsuyu-gate'], title: places[2].title, subtitle: 'Lantern gate', meta: '21 April · 17:28' },
            { image: p['ryokan-room'], title: 'Katsuura', subtitle: 'Ryokan by the harbour', meta: '23 April · 15:48' },
        ],
        prep: [
            {
                title: 'Book accommodation',
                text: 'Takahara and Chikatsuyu each have a handful of minshuku, and in spring and autumn they are full months ahead.',
                variant: 'featured' as const,
            },
            {
                title: 'Pack for rain',
                text: 'Three of four days were wet. A dry change of clothes in a sealed bag helps more than gaiters.',
            },
            {
                title: 'Take the bus',
                text: 'Buses link the villages along the route. The 07:18 from Chikatsuyu saved us the longest stage.',
            },
        ],
        tiles: [
            { title: 'Getting there and buses', icon: 'map-pin' as const },
            { title: 'Accommodation', icon: 'home' as const },
            { title: 'Trail markers and safety', icon: 'alert' as const },
            { title: 'Maps and timetables', icon: 'download' as const },
        ],
        hosts: [{ image: p['ryokan-room'], name: 'Ryokan in Katsuura', role: 'Last night on the coast', focus: '“Dinner is at six.”' }],
        footer: {
            ...footer,
            notice: { title: 'Trail conditions:', text: 'After heavy rain, check the tourism office notices before you set out.' },
        },
    };

    const richTextSample =
        '<h2>The longest day</h2>' +
        '<p>9.8 km from Takahara to Chikatsuyu. At seven the clouds lay in the valley below the village; from nine it rained. The stone paving holds up in the wet, the roots between it do not. To shorten the day, catch a <a href="#">bus along the main road</a>.</p>' +
        '<ul><li>07:02 · Takahara: clouds below the village</li><li>09:05 · stone paving between the cedars</li><li>12:03 · a land crab on the path</li><li>17:28 · the lantern gate of Chikatsuyu</li></ul>' +
        '<h3>Where to sleep</h3><p>Chikatsuyu has a handful of minshuku along the river. Book months ahead for spring and autumn.</p>';

    const home = {
        crow: {
            eyebrow: 'Yatagarasu',
            title: 'The three-legged crow',
            text: 'The bird in the logo is the Yatagarasu, messenger of the Kumano deities. According to the old chronicles it guided Emperor Jimmu through the mountains from Kumano to Yamato. Its three legs are often read as heaven, earth and humankind. On the trail you meet it on shrine banners and on the goōhōin talismans, and on the middle lantern of the gate in Chikatsuyu.',
        },
        why: { eyebrow: 'Why this trail', title: 'A path in use for a thousand years' },
        bridgeCaption: p['forest-stream'].caption ?? '',
        quote: { quote: '“Dinner is at six. The bath is open until eleven.”', source: 'Ryokan in Katsuura, 23 April' },
        days: { title: 'How the four days went', aside: 'Times from the photos, not from a plan.' },
        stages: { eyebrow: 'Days', title: 'Three days on foot, one by train' },
        map: {
            eyebrow: 'Trail map',
            title: 'Schematic, not to scale',
            aside: 'The order of the stations and the day boundaries are right, the geometry is not. For navigation you need the tourism office map.',
        },
        places: { eyebrow: 'Along the way', title: 'Three places worth the detour' },
        roadsideCaption: `${p['land-crab'].caption ?? ''} · ${p['cedar-canopy'].caption ?? ''}`,
        practical: { eyebrow: 'Practical', title: 'Questions we were asked afterwards', intro: 'The four that came up most often.' },
        newsletter: {
            title: 'Two emails a year, whenever a new route is written up',
            text: 'Next time the Kohechi, the mountain path from Koyasan to Hongu. No marketing, no sharing of your address.',
        },
        // The editorial counter-proposal (Kumano Home · Draft).
        draft: {
            kicker: 'Kumano Kodo · Nakahechi',
            title: 'Four days in April',
            lede: 'Three days on foot through the cedars of the Kii peninsula, one by train along the coast. Twenty-seven photos, in the order they were taken.',
            chapters: [
                'We came off the bus at Takijiri at half past three and were on the trail fifteen minutes later. The first hour does not pretend: steps, roots, then more steps.',
                'The morning began above the clouds and ended at a gate of paper lanterns. In between, rain, stone paving that stays grippy when wet, and a bright orange crab that did not move for the camera.',
                'We skipped the long middle section with the 07:18 bus and walked the last seven kilometres into Hongu. By four we were sitting in a stone pool in Yunomine, under a wooden roof, listening to the rain.',
                'A day with no trail at all. The coast line in the rain, the pagoda standing in front of the falls, and a ferry across the harbour to a ryokan with a view of the water.',
            ],
            coda: 'Two days later, the last evening. The light came out for twenty minutes.',
            mapTitle: 'Where it went',
            practicalTitle: 'If you go',
            allPhotos: '27 photos',
        },
    };

    const detailFacts = [
        { label: 'Day', value: 'Day 2 · 21 April' },
        { label: 'Distance', value: '9.8 km' },
        { label: 'Ascent', value: '+620 m' },
        { label: 'Photos taken', value: '07:02–17:28' },
    ];

    const pages = {
        start: {
            title: 'Four days on the Nakahechi',
            text: 'A private trail journal from April 2024: the days, the places worth a detour and what we wish we had known before setting out.',
            action: 'See the days',
            panelTitle: 'Ways to walk it',
            panelMore: 'Compare the routes',
            factsLabel: 'At a glance',
            stages: { eyebrow: 'Days', title: 'Three days on foot, one by train' },
            prep: { eyebrow: 'Practical', title: 'Before you go' },
            plan: 'Plan the walk',
        },
        list: {
            title: 'Days and places',
            crumbs: ['Start', 'The route'],
            chips: ['All', 'Days', 'Places', 'Stays'],
            search: { label: 'Search days and places', placeholder: 'e.g. Chikatsuyu' },
            day: { label: 'Day', options: ['All days', 'Day 1', 'Day 2', 'Day 3', 'Day 4'] },
            count: '8 entries',
        },
        detail: {
            crumbs: ['Start', 'The route', 'Days'],
            caption: p['misty-valley'].caption ?? '',
            downloads: [
                { title: 'Stage map Takahara → Chikatsuyu', meta: 'PDF · 1.2 MB', href: '#' },
                { title: 'Bus timetable Chikatsuyu – Hosshinmon', meta: 'PDF · 96 KB', href: '#' },
                { title: 'Packing list for rain', meta: 'PDF · 240 KB', href: '#' },
            ],
            factsTitle: 'The day in figures',
            facts: detailFacts,
            info: {
                title: 'Too long?',
                text: 'Buses run along the main road between Takahara and Chikatsuyu, so the day can end early.',
                links: [
                    { label: 'Bus timetable', href: '#' },
                    { label: 'Stay in Chikatsuyu', href: '#' },
                ],
            },
            back: 'All days',
            along: 'Along the route',
            subNavTitle: 'The route',
        },
    };

    const samples = {
        textarea: { label: 'Message', placeholder: 'Your question about the route' },
        search: 'Search',
        galleryCaption: 'Day 3, 22 April: from the 07:18 bus to the bath in Yunomine.',
        table: {
            caption: 'The days at a glance',
            head: ['Day', 'Route', 'Distance', 'Photos taken'],
            rows: [
                ['20 April', 'Takijiri → Takahara', '3.7 km', 'from 15:40'],
                ['21 April', 'Takahara → Chikatsuyu', '9.8 km', '07:02–17:28'],
                ['22 April', 'Hosshinmon → Hongu', '7.0 km', '07:18–16:05'],
                ['23 April', 'Nachi and Katsuura', 'by train', '10:55–15:48'],
            ],
        },
    };

    return { ui, kumano, guide, richTextSample, home, pages, samples };
};

export const en: LocaleModule<ReturnType<typeof build>> = {
    photos: {
        'trailhead-river': { alt: 'Wooden hall with a red railing above a wide stony riverbed, forested hills behind', place: 'Takijiri' },
        signpost: { alt: 'Wooden signpost reading 熊野古道 Kumano Kodo on a path of fallen leaves', place: 'Takijiri' },
        'sea-of-clouds': { alt: 'Ridge after ridge of forested mountains with clouds lying in the valleys', place: 'Takahara' },
        'misty-valley': { alt: 'A steep valley filled with mist, forested slopes fading into grey', place: 'Takahara' },
        'roadside-markers': { alt: 'Wooden trail markers beside a quiet road under young trees', place: 'Above Takahara' },
        'stone-path-walkers': { alt: 'Two walkers in rain gear on a stone-paved path between tall cedars', place: 'Nakahechi' },
        'forest-stream': { alt: 'A stream running through cedar forest, crossed by a small plank bridge', place: 'Nakahechi' },
        'land-crab': { alt: 'An orange land crab on wet rocks and cedar needles', place: 'Nakahechi' },
        'vending-machines': {
            alt: 'Drink vending machines under a roof next to an ice-cream sign, a chequered floor',
            place: 'Before Chikatsuyu',
        },
        'chikatsuyu-gate': {
            alt: 'A wooden gate with three large paper lanterns, the middle one showing a three-legged crow',
            place: 'Chikatsuyu',
        },
        'morning-bus': { alt: 'A red and white bus on a wet road, misty hills behind', place: 'Chikatsuyu' },
        'cedar-canopy': { alt: 'Looking straight up the trunks of cedars into a pale sky', place: 'Nakahechi' },
        'walker-in-mist': {
            alt: 'A walker with a blue rucksack cover on a narrow path through misty cedar forest',
            place: 'Towards Hongu',
        },
        'root-path': { alt: 'A path of exposed roots and earth between ferns and cedars', place: 'Towards Hongu' },
        'oji-shrine': { alt: 'A small wooden shrine behind a weathered torii in the forest', place: 'Towards Hongu' },
        'cobbled-path': { alt: 'Old cobblestones leading between straight cedar trunks', place: 'Towards Hongu' },
        'sunlit-path': { alt: 'Sunlight falling onto a forest path between rows of cedars', place: 'Towards Hongu' },
        'ridge-view': { alt: 'View over forested ridges framed by a pine branch', place: 'Towards Hongu' },
        'fern-frond': { alt: 'Close-up of a fern frond unrolling', place: 'Hongu' },
        'yunomine-street': { alt: 'A narrow village street along a stream with carp streamers hanging across it', place: 'Yunomine' },
        'river-bridge': { alt: 'A wide river bed with a suspension bridge, azaleas in the foreground', place: 'Near Yunomine' },
        'outdoor-bath': { alt: 'A stone-edged outdoor bath under a wooden roof, surrounded by greenery', place: 'Yunomine' },
        'seaside-station': {
            alt: 'A small station platform on the coast in the rain, the sea behind the fence',
            place: 'On the coast line',
        },
        'nachi-pagoda': { alt: 'A red three-storey pagoda in front of a tall waterfall in the mist', place: 'Nachi' },
        'harbour-ferry': { alt: 'A brightly painted ferry crossing a grey harbour', place: 'Katsuura' },
        'ryokan-room': { alt: 'A tatami room with a low table, the window looking out over the water', place: 'Katsuura' },
        'evening-rooftops': {
            alt: 'Tiled roofs of a small town in the evening light, mountains on the horizon',
            place: 'The last evening',
        },
    },
    build,
};

export type LocaleContent = ReturnType<typeof build>;
