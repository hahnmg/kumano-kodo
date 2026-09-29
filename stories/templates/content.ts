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

// Fictional sample content for the standard templates; deliberately no real organisation or contact data.
export const demo = {
    topbar: {
        label: 'Besuchszeiten:',
        value: 'Jeden 1. Sonntag im Monat von 14 bis 16 Uhr',
        phone: '0000 000000',
        email: 'info@example.org',
    },
    nav: [
        { label: 'Tiervermittlung', href: '#', active: true },
        { label: 'Fundtiere', href: '#' },
        { label: 'Über uns', href: '#' },
        { label: 'Mitmachen', href: '#' },
        { label: 'Rat und Hilfe', href: '#' },
    ],
    animals: [
        { image: photos.zedernweg, title: 'Gürkchen', subtitle: 'Mischling', meta: 'weiblich · geboren 2025' },
        { image: photos.nachi, title: 'Mokky', subtitle: 'Weimaraner-Mix', meta: 'männlich' },
        { image: photos.onsen, title: 'Donnie', subtitle: 'Mischling', meta: 'männlich', badge: 'älteres Tier' },
        { image: photos.torii, title: 'Buddy', subtitle: 'Beagle-Mix', meta: 'männlich · geboren 2021' },
        { image: photos.steinbruecke, title: 'Luna', subtitle: 'Schäferhund-Mix', meta: 'weiblich' },
        { image: photos.krabbe, title: 'Rocky', subtitle: 'Boxer', meta: 'männlich' },
        { image: photos.nebelbaum, title: 'Kira', subtitle: 'Labrador-Mix', meta: 'weiblich' },
        { image: photos.farn, title: 'Bruno', subtitle: 'Mischling', meta: 'männlich' },
    ],
    categories: [
        { image: photos.zedernweg, title: 'Hunde', meta: '39 Tiere', href: '#' },
        { image: photos.onsen, title: 'Katzen', meta: '19 Tiere', href: '#' },
        { image: photos.krabbe, title: 'Kleintiere', meta: '10 Tiere', href: '#' },
    ],
    facts: [
        { icon: 'clock' as const, label: 'Besuchszeiten', value: 'Jeden 1. Sonntag im Monat', note: 'von 14 bis 16 Uhr' },
        { icon: 'phone' as const, label: 'Telefon', value: '0000 000000', note: 'Montag bis Sonntag 14:00 bis 16:30 Uhr' },
        { icon: 'map-pin' as const, label: 'Adresse', value: 'Musterweg 1', note: '00000 Musterstadt' },
        { icon: 'home' as const, label: 'Vermittelt', value: '2 997 Tiere', note: 'seit 2012' },
    ],
    help: [
        {
            title: 'Spenden',
            text: 'Futter, Tierarzt, Pflege: Jede Spende kommt unmittelbar bei unseren Tieren an.',
            variant: 'featured' as const,
        },
        { title: 'Gassi gehen', text: 'Unsere Hunde freuen sich über jeden Spaziergang – und über Menschen, die regelmäßig kommen.' },
        {
            title: 'Tier gefunden?',
            text: 'Zugelaufene Tiere melden Sie uns bitte umgehend. Hier sehen Sie, welche Fundtiere bei uns sind.',
        },
    ],
    tiles: [
        { title: 'Tierabgabe', icon: 'home' as const },
        { title: 'Infos zum Tierrecht', icon: 'file' as const },
        { title: 'Jungvögeln helfen?', icon: 'alert' as const },
        { title: 'Downloadbereich', icon: 'download' as const },
    ],
    team: [
        { image: photos.steinbruecke, name: 'Alex Beispiel', role: 'Bereichsleitung Hunde', focus: 'Schwerpunkt Hunde' },
        { image: photos.farn, name: 'Kim Muster', role: 'Tierpflegerin', focus: 'Schwerpunkt Hunde' },
        { image: photos.laternen, name: 'Sam Probe', role: 'Tierpfleger', focus: 'Schwerpunkt Katzen' },
        { image: photos.talblick, name: 'Robin Test', role: 'Tierpflegerin', focus: 'Schwerpunkt Kleintiere' },
    ],
    footer: {
        wordmark: 'Tierheim',
        about: 'Tierschutzverein Musterstadt e. V. Beispielinhalt für das Design-System.',
        columns: [
            { title: 'Öffnungszeiten', links: [{ label: 'Besuch: 1. Sonntag im Monat' }, { label: 'Telefon: täglich 14–16:30 Uhr' }] },
            {
                title: 'Mitmachen',
                links: [
                    { label: 'Spenden', href: '#' },
                    { label: 'Gassi gehen', href: '#' },
                    { label: 'Pflegestelle', href: '#' },
                ],
            },
            { title: 'Kontakt', links: [{ label: 'info@example.org' }, { label: '0000 000000' }] },
        ],
        notice: { title: 'Notfälle außerhalb der Öffnungszeiten:', text: 'Wenden Sie sich an die nächstgelegene Polizeiwache.' },
        copyright: '© 2026 Tierschutzverein Musterstadt e. V. (Beispiel)',
        legal: [
            { label: 'Kontakt', href: '#' },
            { label: 'Impressum', href: '#' },
            { label: 'Datenschutz', href: '#' },
        ],
    },
};

export const richTextSample =
    '<h2>Tierhaltung in Mietwohnungen</h2>' +
    '<p>Ob Hund oder Katze erlaubt sind, regelt der Mietvertrag. Mehr dazu unter <a href="#">Tiervermittlung</a>.</p>' +
    '<ul><li>Kleintiere sind in der Regel erlaubt</li><li>Hunde brauchen eine Zustimmung</li><li>Für Katzen gilt eine Einzelfallprüfung</li></ul>' +
    '<h3>Was gilt bei Eigentum?</h3><p>Hier entscheidet die Hausordnung der Eigentümergemeinschaft.</p>';
