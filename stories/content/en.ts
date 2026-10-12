import type { LocaleModule, Photos } from '../templates/content';
import { paths } from './paths';

// The walk behind the photos: Takijiri to Nachi on foot, 20 to 23 April 2024, plus one evening two days later.
const build = (p: Photos) => {
    const ui = {
        mainNav: 'Main navigation',
        language: 'Language',
        menu: 'Menu',
        darkMode: 'Dark mode',
        backToTop: 'Back to top',
        skipToContent: 'Skip to content',
        uploadDrop: 'Drag a file here or',
        uploadChoose: 'choose one',
        formSteps: 'Steps',
        newsAll: 'All reports',
        newsPrevious: 'Previous report',
        newsNext: 'Next report',
        newsPhotos: 'Photos from this report',
        newsDate: 'Date',
        newsCategory: 'Category',
        newsTags: 'Tags',
        newsPages: 'Pages',
        newsPreviousPage: 'Previous page',
        newsNextPage: 'Next page',
        // ICU pattern of the long date, as Intl writes it in the stories.
        newsDatePattern: 'd MMMM y',
        newsListSeparator: ', ',
        trailStatus: 'Trail status and contact',
        inSection: 'In this section',
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
        search: 'Search',
        searchPlaceholder: 'Search days, places and tips',
        searchSummary: '%1$s results for “%2$s”',
        searchSummaryOne: '1 result for “%1$s”',
        searchEmpty: 'Nothing found for “%1$s”. A place or a day works best, for example Hongu.',
        searchResults: 'Search results',
        logIn: 'Log in',
        username: 'Username',
        password: 'Password',
        stayLoggedIn: 'Stay logged in',
        forgotPassword: 'Forgot your password?',
        loginFailed: 'Login failed',
        loginFailedText: 'Username or password were not accepted.',
        loggedInAs: 'Logged in as %1$s',
        logOut: 'Log out',
        demoAccess: 'Demo access',
        demoAccessText: 'Username %1$s · password %2$s',
        notFoundTitle: 'Page not found',
        notFoundText:
            'This path is not on the map: the page may have moved, or the address has a typo. Search the journal above, or start again from here.',
        papersTitle: 'Travel papers',
        papersText:
            'Welcome back. Here are the papers from our walk: the stage map, how we got there, and what to pack for rain. The days below lead back to each stage.',
        papersLink: 'Your travel papers',
        requiredNote: 'Fields marked * are required.',
        fieldRequired: 'Please fill in this field.',
        emailInvalid: 'Please enter a valid email address.',
        send: 'Send',
        formSent: 'Message sent',
        formSentText: 'Thank you. Your message has arrived.',
        name: 'Name',
        topic: 'Topic',
        message: 'Message',
        contactConsent: 'I agree that my details are used to answer my message.',
    };

    const stages = [
        {
            image: p['signpost'],
            stage: 'Day 1',
            stats: '3.7 km',
            title: 'Takijiri → Takahara',
            description: 'On the trail at a quarter to four. The first hour climbs the whole way.',
            href: paths.day(1),
        },
        {
            image: p['stone-path-walkers'],
            stage: 'Day 2',
            stats: '9.8 km',
            title: 'Takahara → Chikatsuyu',
            description: 'Clouds below the village at seven, stone paving, a stream, the lantern gate of Chikatsuyu at half past five.',
            href: paths.day(2),
        },
        {
            image: p['walker-in-mist'],
            stage: 'Day 3',
            stats: 'about 25 km',
            title: 'Chikatsuyu → Hongu',
            description: 'The longest day, through the cedars and past a small oji shrine, and on to Yunomine for the night.',
            href: paths.day(3),
        },
        {
            image: p['fern-frond'],
            stage: 'Day 4',
            stats: 'about 13 km',
            title: 'Kogumotori-goe',
            description: 'From the hot springs over the first of the two passes that lead to the coast.',
            href: paths.day(4),
        },
        {
            image: p['nachi-pagoda'],
            stage: 'Day 4',
            stats: 'about 14.5 km',
            title: 'Ogumotori-goe → Nachi',
            description: 'The second pass, and at the end the pagoda standing in front of the falls.',
            href: paths.day(4),
        },
    ];

    const places = [
        {
            image: p['nachi-pagoda'],
            title: 'Seiganto-ji and Nachi falls',
            description:
                'The three-storey pagoda in front of the falls, the end of the walk. It rained, and the falls disappeared in the mist every few minutes.',
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
                    { label: 'Nakahechi', href: paths.route },
                    { label: 'Kohechi', href: paths.kohechi },
                    { label: 'Trail map', href: paths.map },
                ],
            },
            {
                title: 'Practical',
                links: [
                    { label: 'Getting there and buses', href: paths.practicalPage('getting-there') },
                    { label: 'Accommodation', href: paths.practicalPage('accommodation') },
                    { label: 'Newsletter', href: paths.newsletter },
                ],
            },
            {
                title: 'Contact',
                links: [
                    { label: 'post@kumano-kodo.example' },
                    { label: 'Usually answered within a week' },
                    { label: 'Write to us', href: paths.contact },
                    { label: 'Walked with us? Log in', href: paths.login },
                ],
            },
        ],
        copyright: '© 2024 Kumano Kodo Trail journal',
        legal: [
            { label: 'Imprint', href: paths.legal('imprint') },
            { label: 'Privacy', href: paths.legal('privacy') },
            { label: 'Accessibility', href: paths.legal('accessibility') },
        ],
    };

    // Header flyouts: the route opens a full-width panel, practical a plain dropdown.
    const routeMenu = {
        kind: 'mega' as const,
        columns: [
            {
                title: 'Days',
                links: [
                    ...[1, 2, 3, 4].map((n) => ({
                        label: `Day ${n} · ${['Takijiri → Takahara', 'Takahara → Chikatsuyu', 'Chikatsuyu → Hongu', 'Yunomine → Nachi'][n - 1]}`,
                        href: paths.day(n),
                    })),
                    { label: 'All four days at a glance', href: paths.glance },
                ],
            },
            {
                title: 'Places',
                links: [
                    { label: places[2].title, href: paths.place('chikatsuyu') },
                    { label: places[1].title, href: paths.place('yunomine') },
                    { label: places[0].title, href: paths.place('nachi') },
                ],
            },
        ],
        text: {
            title: 'The Nakahechi',
            html: '<p>The old imperial route from Tanabe to the three grand shrines of Kumano. We walked it in four days in April, from Takijiri to Nachi.</p>',
        },
        teaser: {
            image: stages[2].image,
            title: stages[2].title,
            subtitle: stages[2].stats,
            meta: '22 April · 07:18–16:05',
            badge: 'Longest day',
            href: paths.day(3),
        },
        overview: { label: 'All about the route', href: paths.route },
    };
    const practicalMenu = {
        kind: 'dropdown' as const,
        links: [
            { label: 'All practical information', href: paths.practical },
            { label: 'Getting there and buses', href: paths.practicalPage('getting-there') },
            { label: 'Accommodation', href: paths.practicalPage('accommodation') },
            { label: 'Trail markers and safety', href: paths.practicalPage('trail-markers') },
            { label: 'Maps and timetables', href: paths.practicalPage('maps') },
            { label: 'Routes and hosts', href: paths.ways },
            { label: 'Register a walk', href: paths.register },
            { label: 'Newsletter', href: paths.newsletter },
        ],
    };

    const kumano = {
        nav: [
            { label: 'The route', href: paths.route, active: true, menu: routeMenu },
            { label: 'Practical', href: paths.practical, menu: practicalMenu },
            { label: 'Photos', href: paths.photos },
            { label: 'Trail reports', href: paths.reports },
        ],
        hero: {
            image: p['sea-of-clouds'],
            eyebrow: 'Kii Peninsula · Wakayama · April 2024',
            title: 'Four days through\nthe cedar mist',
            teaser: 'The Kumano Kodo is not one long trail but a network of old pilgrim paths to three shrines. We walked the Nakahechi in April, from Takijiri to Nachi, in four days.',
            actions: [
                { label: 'See the days', href: '#stages' },
                { label: 'Practical questions', href: '#faq' },
            ],
            stats: [
                { label: 'On foot', value: '68 km' },
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
            { value: '68', label: 'kilometres on foot' },
            { value: '4', label: 'days, Takijiri to Nachi' },
            { value: '27', label: 'photos' },
            { value: '1', label: 'land crab on the path' },
        ],
        days: [
            {
                date: 'Day 1 · 20 April',
                route: 'Takijiri → Takahara',
                description: 'On the trail at a quarter to four. 3.7 km, almost all of it uphill, to a village that sits above the valley.',
                time: 'from 15:40',
            },
            {
                date: 'Day 2 · 21 April',
                route: 'Takahara → Chikatsuyu',
                description:
                    'Clouds lying in the valley at seven. Stone paving, a stream, a land crab at noon, the lantern gate of Chikatsuyu at 17:28.',
                time: '07:02–17:28',
            },
            {
                date: 'Day 3 · 22 April',
                route: 'Chikatsuyu → Hongu → Yunomine',
                description:
                    'The longest day, about 25 kilometres through the cedars to Hongu, and on to Yunomine. At four an outdoor bath.',
                time: '07:18–16:05',
            },
            {
                date: 'Day 4 · 23 April',
                route: 'Yunomine → Nachi',
                description:
                    'Over the Kogumotori-goe and the Ogumotori-goe to Nachi and the pagoda in front of the falls. In Katsuura a ferry to the ryokan.',
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
                { name: 'Hongu', x: 610, y: 70, labelY: 52, boundary: true },
                { name: 'Koguchi', x: 800, y: 120, labelY: 102 },
                { name: 'Nachi', x: 960, y: 86, labelY: 68, anchor: 'end' as const },
            ],
            days: [
                { label: 'Day 1 · 3.7 km', x: 145 },
                { label: 'Day 2 · 9.8 km', x: 340 },
                { label: 'Day 3 · 25 km', x: 520 },
                { label: 'Day 4 · 13 km', x: 705 },
                { label: 'Day 4 · 14.5 km', x: 880 },
            ],
            legend: { walked: 'Walked section', end: 'End of the walk', boundary: 'Day boundary with overnight stay' },
        },
        places,
        faq: [
            {
                question: 'Do I need to book accommodation in advance?',
                answer: 'Yes, and early. Takahara and Chikatsuyu each have a handful of minshuku, and in spring and autumn they are full months ahead. The Tanabe tourism office reservation service books in English.',
                open: true,
            },
            {
                question: 'How much rain should I expect?',
                answer: 'The Kii peninsula is one of the wettest regions of Japan. Waterproof boots and gaiters help less than you hope; a dry change of clothes in a sealed bag helps more.',
            },
            {
                question: 'Can you get around by bus?',
                answer: 'Yes. Buses link the villages along the route several times a day, which makes it easy to shorten a day or to get back to the start.',
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
        href: stages[i].href,
    });

    // Pages of the trail journal besides the home page. Phone and email are placeholders.
    const guide = {
        topbar: {
            label: 'Trail status:',
            value: 'All Nakahechi sections open · as of April 2024',
            phone: '+81 00 0000 0000',
            email: 'post@kumano-kodo.example',
        },
        nav: kumano.nav,
        routes: [
            { image: p['stone-path-walkers'], title: 'Nakahechi', meta: 'Four days on foot · this journal', href: paths.route },
            { image: p['walker-in-mist'], title: 'Day 3', meta: 'Chikatsuyu → Hongu · the longest day', href: paths.day(3) },
            { image: p['cedar-canopy'], title: 'Kohechi', meta: 'Koyasan → Hongu · next time', href: paths.kohechi },
        ],
        facts: [
            { icon: 'clock' as const, label: 'When', value: '20 to 23 April', note: 'Four days on foot' },
            { icon: 'map-pin' as const, label: 'Start', value: 'Takijiri', note: 'On the trail at 15:40' },
            { icon: 'home' as const, label: 'Overnight', value: 'Minshuku and ryokan', note: 'Booked months ahead' },
            { icon: 'file' as const, label: 'On foot', value: 'About 68 km', note: 'Takijiri to Nachi' },
        ],
        entries: [
            stageEntry(0, '20 April · from 15:40'),
            stageEntry(1, '21 April · 07:02–17:28'),
            stageEntry(2, '22 April · 07:18–16:05', 'Longest day'),
            stageEntry(4, '23 April · 10:55–15:48'),
            {
                image: p['chikatsuyu-gate'],
                title: places[2].title,
                subtitle: 'Lantern gate',
                meta: '21 April · 17:28',
                href: paths.place('chikatsuyu'),
            },
            {
                image: p['outdoor-bath'],
                title: places[1].title,
                subtitle: 'Outdoor bath',
                meta: '22 April · 16:05',
                href: paths.place('yunomine'),
            },
            {
                image: p['nachi-pagoda'],
                title: 'Nachi',
                subtitle: 'Pagoda and falls',
                meta: '23 April · 12:31',
                href: paths.place('nachi'),
            },
            { image: p['ryokan-room'], title: 'Katsuura', subtitle: 'Ryokan by the harbour', meta: '23 April · 15:48', href: paths.day(4) },
        ],
        prep: [
            {
                title: 'Book accommodation',
                text: 'Takahara and Chikatsuyu each have a handful of minshuku, and in spring and autumn they are full months ahead.',
                variant: 'featured' as const,
                href: paths.practicalPage('accommodation'),
            },
            {
                title: 'Pack for rain',
                text: 'A dry change of clothes in a sealed bag helps more than gaiters.',
                href: paths.practicalPage('trail-markers'),
            },
            {
                title: 'Send your luggage ahead',
                text: 'Luggage moves between the main villages, booked one day ahead through the Tanabe tourism office.',
                href: paths.practicalPage('getting-there'),
            },
        ],
        tiles: [
            { title: 'Getting there and buses', icon: 'map-pin' as const, href: paths.practicalPage('getting-there') },
            { title: 'Accommodation', icon: 'home' as const, href: paths.practicalPage('accommodation') },
            { title: 'Trail markers and safety', icon: 'alert' as const, href: paths.practicalPage('trail-markers') },
            { title: 'Maps and timetables', icon: 'download' as const, href: paths.practicalPage('maps') },
        ],
        hosts: [{ image: p['ryokan-room'], name: 'Ryokan in Katsuura', role: 'The night after Nachi', focus: '“Dinner is at six.”' }],
        footer: {
            ...footer,
            notice: { title: 'Trail conditions:', text: 'After heavy rain, check the tourism office notices before you set out.' },
        },
    };

    const richTextSample =
        '<h2>The day to Chikatsuyu</h2>' +
        '<p>9.8 km from Takahara to Chikatsuyu. At seven the clouds lay in the valley below the village. The stone paving holds up in the wet, the roots between it do not. Buses run along the <a href="/practical/getting-there">main road</a> if the day has to end early.</p>' +
        '<ul><li>07:02 · Takahara: clouds below the village</li><li>09:05 · stone paving between the cedars</li><li>12:03 · a land crab on the path</li><li>17:28 · the lantern gate of Chikatsuyu</li></ul>' +
        '<h3>Where to sleep</h3><p>Chikatsuyu has a handful of minshuku along the river. Book months ahead for spring and autumn.</p>' +
        '<ol><li>Ask the <a href="https://www.tb-kumano.jp/en/">Tanabe tourism bureau</a></li><li>Note the check-in time</li><li>Send the luggage ahead</li></ol>';

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
        stages: { eyebrow: 'Days', title: 'Four days, Takijiri to Nachi' },
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
        // The editorial home page.
        draft: {
            kicker: 'Kumano Kodo · Nakahechi',
            title: 'Four days in April',
            lede: 'Four days on foot from Takijiri to Nachi, through the cedars of the Kii peninsula. Twenty-seven photos, in the order they were taken.',
            chapters: [
                'At twenty to four we were at the river in Takijiri, a quarter of an hour later on the trail. The first hour does not pretend: steps, roots, then more steps.',
                'The morning began above the clouds and ended at a gate of paper lanterns. In between, stone paving that stays grippy when wet, a stream under the cedars and a bright orange crab that did not move for the camera.',
                'The longest day. From Chikatsuyu through the cedars and past a small oji shrine to Hongu, then on to Yunomine. By four we were sitting in a stone pool under a wooden roof.',
                'Over the Kogumotori-goe and the Ogumotori-goe to Nachi, where the pagoda stands in front of the falls. In Katsuura a ferry took us across the harbour to a ryokan with a view of the water.',
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
        { label: 'Photos taken', value: '07:02–17:28' },
    ];

    const pages = {
        start: {
            title: 'The Nakahechi in four days',
            text: 'From Takijiri to Nachi on foot, 20 to 23 April 2024: the days, the places worth a detour and what we wish we had known before setting out.',
            action: 'See the days',
            panelTitle: 'Ways to walk it',
            panelMore: 'All days and places',
            factsLabel: 'At a glance',
            stages: { eyebrow: 'Days', title: 'Four days, Takijiri to Nachi' },
            prep: { eyebrow: 'Practical', title: 'Before you go' },
            plan: 'Plan the walk',
        },
        list: {
            title: 'Days and places',
            crumbs: ['Home', 'The route'],
            chips: ['All', 'Days', 'Places', 'Stays'],
            search: { label: 'Search days and places', placeholder: 'e.g. Chikatsuyu' },
            day: { label: 'Day', options: ['All days', 'Day 1', 'Day 2', 'Day 3', 'Day 4'] },
            count: '8 entries',
        },
        detail: {
            crumbs: ['Home', 'The route', 'Days'],
            caption: p['misty-valley'].caption ?? '',
            downloads: [
                {
                    title: 'Stage map Takahara → Chikatsuyu',
                    meta: 'PDF · 118 KB',
                    href: '/files/downloads/stage-map-takahara-chikatsuyu-en.pdf',
                },
                { title: 'Getting there and buses', meta: 'PDF · 59 KB', href: '/files/downloads/getting-there-and-buses-en.pdf' },
                { title: 'Packing list for rain', meta: 'PDF · 66 KB', href: '/files/downloads/packing-list-for-rain-en.pdf' },
            ],
            factsTitle: 'The day in figures',
            facts: detailFacts,
            info: {
                title: 'Too long?',
                text: 'Buses run along the main road between Takahara and Chikatsuyu, so the day can end early.',
                links: [
                    { label: 'Getting there and buses', href: paths.practicalPage('getting-there') },
                    { label: 'Chikatsuyu', href: paths.place('chikatsuyu') },
                ],
            },
            back: 'All days',
            along: 'Along the route',
            subNavTitle: 'The route',
        },
    };

    // Texts of the pages behind the links.
    const site = {
        glance: { title: 'At a glance' },
        ways: { title: 'Routes and hosts' },
        home: 'Home',
        route: { title: 'The route', lede: pages.start.text },
        days: {
            title: 'Days and places',
            intro: 'The four days in order, then the places we stopped at and where we slept.',
            groups: { days: 'Days', places: 'Places', stays: 'Stays' },
        },
        day: {
            label: 'Day',
            previous: 'Previous day',
            next: 'Next day',
            photos: 'The day in photos',
            factsTitle: 'The day in figures',
            facts: { date: 'Date', route: 'Route', distance: 'On foot', photos: 'Photos taken' },
            distances: ['3.7 km', '9.8 km', 'about 25 km', 'about 27.5 km'],
            tipTitle: 'Tip for this day',
            tips: [
                'Start early enough to reach Takahara in daylight; the first hour is steep and there is nothing in between.',
                'The stone paving is safe in the wet, the roots between it are not. Walk on the stones.',
                'It is the longest day. The villages along the road have vending machines, not shops.',
                'The two passes make a long day. Check the last bus from Nachi before you set out.',
            ],
        },
        places: {
            chikatsuyu: {
                title: 'Chikatsuyu',
                text: [
                    'A village along the river, halfway between Takijiri and Hongu. Most walkers sleep here after day two, and most minshuku stand along the river.',
                    'The lantern gate at the edge of the village is hard to miss. The middle lantern shows the three-legged crow, the messenger of the Kumano deities.',
                ],
                photos: ['vending-machines', 'chikatsuyu-gate', 'morning-bus'] as const,
                day: 2,
            },
            yunomine: {
                title: 'Yunomine Onsen',
                text: [
                    'One of the oldest hot springs in Japan, a short walk from Hongu. The bath houses stand along a stream in a narrow valley.',
                    'In late April carp streamers hung across the stream for Children’s Day. We sat in an outdoor bath under a wooden roof before dinner.',
                ],
                photos: ['yunomine-street', 'river-bridge', 'outdoor-bath'] as const,
                day: 3,
            },
            nachi: {
                title: 'Nachi',
                text: [
                    'The end of the walk: the three-storey pagoda of Seiganto-ji in front of Nachi falls, and next to it the shrine of Kumano Nachi Taisha.',
                    'From Nachi, buses run to the coast. In Katsuura a ferry crosses the harbour to the ryokan.',
                ],
                photos: ['nachi-pagoda', 'harbour-ferry', 'ryokan-room'] as const,
                day: 4,
            },
        },
        practical: {
            title: 'Practical',
            intro: 'What we would tell anyone planning the Nakahechi: getting there, where to sleep, how the trail is marked, and which maps to take.',
            pages: {
                'getting-there': {
                    title: 'Getting there and buses',
                    text: [
                        'Takijiri is reached by bus from Kii-Tanabe station, which is on the JR line from Osaka. The ride takes about forty minutes.',
                        'Along the route, buses link the villages several times a day. They make it easy to shorten a day, and to get back to the coast from Hongu or Nachi.',
                        'Luggage can be sent ahead between the main villages. Book it through the Tanabe tourism office one day before.',
                    ],
                },
                accommodation: {
                    title: 'Accommodation',
                    text: [
                        'Along the Nakahechi you sleep in minshuku, small family guest houses. Dinner and breakfast are usually included, and dinner is early.',
                        'Takahara and Chikatsuyu have only a handful of them. In spring and autumn they are full months ahead, so book the whole walk at once.',
                        'The Tanabe tourism office runs a reservation service in English that books the whole route.',
                    ],
                },
                'trail-markers': {
                    title: 'Trail markers and safety',
                    text: [
                        'The Nakahechi is marked with numbered wooden posts every few hundred metres. The numbers help if you ever need to tell someone where you are.',
                        'Carry water and something to eat for the whole day; between the villages there is nothing to buy.',
                        'After heavy rain parts of the trail can be closed. Check the tourism office notices before you set out.',
                    ],
                },
                maps: {
                    title: 'Maps and timetables',
                    text: [
                        'For navigation, take the trail map of the tourism office. The map on this site is schematic.',
                        'Bus timetables change with the season. Check them for the day you walk, especially the last bus from Nachi.',
                    ],
                },
            },
        },
        photos: { title: 'Photos', intro: 'All twenty-seven photos, day by day, in the order they were taken.' },
        newsletter: { title: 'Newsletter', intro: home.newsletter.text },
        kohechi: {
            title: 'Kohechi',
            text: [
                'The Kohechi is the mountain route from Koyasan to Hongu, shorter than the Nakahechi but with three high passes.',
                'We have not walked it yet. It is the next route on the list, and it will be here when it is written up.',
            ],
        },
        legal: {
            imprint: { title: 'Imprint', text: ['Sample text of the design system. The imprint of the real site goes here.'] },
            privacy: { title: 'Privacy', text: ['Sample text of the design system. The privacy policy of the real site goes here.'] },
            accessibility: {
                title: 'Accessibility',
                text: ['Sample text of the design system. The accessibility statement of the real site goes here.'],
            },
        },
    };

    const samples = {
        textarea: { label: 'Message', placeholder: 'Your question about the route' },
        search: 'Search',
        galleryCaption: 'Day 3, 22 April: from Chikatsuyu to the bath in Yunomine.',
        table: {
            caption: 'The days at a glance',
            head: ['Day', 'Route', 'On foot', 'Photos taken'],
            rows: [
                ['20 April', 'Takijiri → Takahara', '3.7 km', 'from 15:40'],
                ['21 April', 'Takahara → Chikatsuyu', '9.8 km', '07:02–17:28'],
                ['22 April', 'Chikatsuyu → Hongu → Yunomine', 'about 25 km', '07:18–16:05'],
                ['23 April', 'Yunomine → Nachi', 'about 27.5 km', '10:55–15:48'],
            ],
        },
    };

    // The demo's form with every EXT:form element type.
    const walkForm = {
        title: 'Register a walk',
        steps: ['About you', 'Your walk', 'Photos'],
        summaryTitle: 'Check your details',
        previous: 'Back',
        next: 'Next',
        submit: 'Send registration',
        introTitle: 'Before you set out',
        introText: 'Tell us who walks, which route and when. We answer within a week.',
        name: 'Name',
        email: 'Email address',
        phone: 'Phone',
        website: 'Blog or website',
        websiteHint: 'Where you write about the walk, if anywhere.',
        groupSize: 'Walkers in your group',
        arrival: 'Arrival',
        departure: 'Departure',
        departureHint: 'As day.month.year, for example 25.04.2024.',
        account: 'Your account',
        password: 'Password',
        newPassword: 'New password',
        confirmPassword: 'Repeat the password',
        route: 'Route',
        routes: ['Nakahechi', 'Kohechi', 'Iseji', 'Ohechi'],
        pace: 'Pace',
        paces: ['Slow', 'Steady', 'Brisk'],
        interests: 'What draws you',
        interestOptions: ['Shrines', 'Hot springs', 'The forest', 'The food'],
        languages: 'Languages you speak',
        languageOptions: ['English', 'German', 'Japanese', 'French'],
        country: 'Country you live in',
        notes: 'Anything else',
        consent: 'I agree that my details are used to plan the walk.',
        luggageTitle: 'Luggage',
        luggageText: 'Bags can travel ahead from inn to inn; we book it with the stays.',
        photo: 'A photo of you',
        routeFile: 'Your route as PDF',
        remove: 'Remove',
        photoHint: 'JPG or PNG.',
        fileHint: 'A PDF of your planned stages.',
        sentText: 'Thank you. We will write to you within a week.',
    };

    // Invented trail reports, the demo's news.
    const reports = {
        title: 'Trail reports',
        intro: 'Short reports from the four days: weather, places, buses and what we carried.',
        categories: {
            trail: 'Trail',
            places: 'Places',
            practical: 'Practical',
        },
        items: [
            {
                slug: 'what-we-packed',
                date: '2024-04-25T10:00',
                category: 'practical',
                tags: ['Packing'],
                title: 'What we packed, and what we left at home',
                teaser: 'Two small rucksacks for four days of walking. Next time, one thing less.',
                text: [
                    'The luggage service carried a bag from inn to inn, so we walked with day packs: rain jacket, a dry layer, water, cash and the bus timetable on paper.',
                    'What we did not need: the second pair of shoes. What we missed: a small towel for the onsen and coins for the vending machines.',
                ],
                photos: ['vending-machines', 'ryokan-room', 'signpost', 'roadside-markers'],
            },
            {
                slug: 'the-last-bus',
                date: '2024-04-23T16:05',
                category: 'practical',
                tags: ['Bus', 'Nachi'],
                title: 'The last bus from Nachi',
                teaser: 'It leaves earlier than you think. We made it with four minutes to spare.',
                text: [
                    'After the two passes the path ends at the pagoda, and the falls are a short walk below. From there the buses run down to the coast, but not late.',
                    'Check the last departure before you set out in the morning, not when you arrive. From Kii-Katsuura the ferry crosses to the ryokan in a few minutes.',
                ],
                photos: ['seaside-station', 'morning-bus', 'nachi-pagoda', 'harbour-ferry'],
            },
            {
                slug: 'the-oldest-bath',
                date: '2024-04-22T18:30',
                category: 'places',
                tags: ['Onsen', 'Yunomine'],
                title: 'The oldest bath on the route',
                teaser: 'Yunomine is a single street around a hot river. We stayed longer than we had planned.',
                text: [
                    'Steam rises from the river between the inns. Guests cook eggs in the spring at the bridge and wait their turn for the small bath hut beside it.',
                    'We arrived tired from the longest day and left the next morning later than planned, which made the walk to Nachi a long one.',
                ],
                photos: ['outdoor-bath', 'yunomine-street', 'river-bridge', 'evening-rooftops'],
            },
            {
                slug: 'a-land-crab',
                date: '2024-04-21T12:03',
                category: 'trail',
                tags: ['Animals'],
                title: 'A land crab, and other company',
                teaser: 'For most of the day we met nobody. Then a crab blocked the path.',
                text: [
                    'Between Takahara and Chikatsuyu the forest is quiet. Now and then a group passed us, then we were alone again with the stones and the ferns.',
                    'Shortly after noon a land crab sat in the middle of the path and did not move. We went around it.',
                ],
                photos: ['land-crab', 'fern-frond', 'forest-stream', 'stone-path-walkers'],
            },
            {
                slug: 'fog-on-the-pass',
                date: '2024-04-21T07:02',
                category: 'trail',
                tags: ['Fog', 'Day 2'],
                title: 'Fog on the way to Chikatsuyu',
                teaser: 'At seven the valley was gone. We walked the first hour inside a cloud.',
                text: [
                    'From Takahara the clouds lay below the village like a lake. Half an hour later we were in them, and the cedars stood in white.',
                    'The stone paving is safe in the wet, the roots between the stones are not. By ten the sun came through and the valley returned.',
                ],
                photos: ['sea-of-clouds', 'walker-in-mist', 'misty-valley', 'cedar-canopy'],
            },
        ],
    };

    return { ui, kumano, guide, richTextSample, home, pages, site, samples, walkForm, reports };
};

export const en: LocaleModule<ReturnType<typeof build>> = {
    photos: {
        'trailhead-river': { alt: 'Wooden hall with a red railing above a wide stony riverbed, forested hills behind', place: 'Takijiri' },
        signpost: { alt: 'Wooden signpost reading 熊野古道 Kumano Kodo on a path of fallen leaves', place: 'Takijiri' },
        'sea-of-clouds': { alt: 'Ridge after ridge of forested mountains with clouds lying in the valleys', place: 'Takahara' },
        'misty-valley': { alt: 'A steep valley filled with mist, forested slopes fading into grey', place: 'Takahara' },
        'roadside-markers': { alt: 'Wooden trail markers beside a quiet road under young trees', place: '' },
        'stone-path-walkers': { alt: 'Two walkers in rain gear on a stone-paved path between tall cedars', place: 'Nakahechi' },
        'forest-stream': { alt: 'A stream running through cedar forest, crossed by a small plank bridge', place: 'Nakahechi' },
        'land-crab': { alt: 'An orange land crab on wet rocks and cedar needles', place: 'Nakahechi' },
        'vending-machines': {
            alt: 'Drink vending machines under a roof next to an ice-cream sign, a chequered floor',
            place: 'Chikatsuyu',
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
        'fern-frond': { alt: 'Close-up of a fern frond unrolling', place: '' },
        'yunomine-street': { alt: 'A narrow village street along a stream with carp streamers hanging across it', place: 'Yunomine' },
        'river-bridge': { alt: 'A wide river bed with a suspension bridge, azaleas in the foreground', place: '' },
        'outdoor-bath': { alt: 'A stone-edged outdoor bath under a wooden roof, surrounded by greenery', place: 'Yunomine' },
        'seaside-station': { alt: 'A small station platform on the coast in the rain, the sea behind the fence', place: '' },
        'nachi-pagoda': { alt: 'A red three-storey pagoda in front of a tall waterfall in the mist', place: 'Nachi' },
        'harbour-ferry': { alt: 'A brightly painted ferry crossing a grey harbour', place: 'Katsuura' },
        'ryokan-room': { alt: 'A tatami room with a low table, the window looking out over the water', place: 'Katsuura' },
        'evening-rooftops': { alt: 'Tiled roofs of a small town in the evening light, mountains on the horizon', place: '' },
    },
    build,
};

export type LocaleContent = ReturnType<typeof build>;
