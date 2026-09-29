import type { LocaleModule, Photos } from '../templates/content';
import type { LocaleContent } from './en';

const build = (p: Photos): LocaleContent => {
    const ui = {
        mainNav: 'Hauptnavigation',
        language: 'Sprache',
        darkMode: 'Dunkler Modus',
        trailStatus: 'Wegzustand und Kontakt',
        categories: 'Kategorien',
        breadcrumb: 'Brotkrumen',
        pages: 'Seiten',
        previousPage: 'Vorherige Seite',
        nextPage: 'Nächste Seite',
        card: 'Karte',
        readMore: 'Weiterlesen',
        emailAddress: 'E-Mail-Adresse',
        emailPlaceholder: 'name@beispiel.de',
        consent: 'Ich möchte den Newsletter erhalten und habe die Datenschutzerklärung gelesen.',
        subscribe: 'Abonnieren',
    };

    const stages = [
        {
            image: p.zedernweg,
            stage: 'Etappe 01',
            stats: '4,0 km · +400 m',
            title: 'Takijiri → Takahara',
            description: 'Der Einstieg. Ein steiler Anstieg durch dichten Wald bis ins Dorf über den Wolken.',
        },
        {
            image: p.wegmarke,
            stage: 'Etappe 02',
            stats: '9,8 km · +620 m',
            title: 'Takahara → Chikatsuyu',
            description: 'Wegmarken 11 bis 34, drei Pässe dazwischen und kein Handyempfang.',
        },
        {
            image: p.talblick,
            stage: 'Etappe 03',
            stats: '25,9 km · +1 180 m',
            title: 'Chikatsuyu → Hongu',
            description: 'Die lange Etappe. Wer sie teilen will, nimmt ab Hosshinmon den Bus.',
        },
        {
            image: p.sonnenpfad,
            stage: 'Etappe 04',
            stats: '14,5 km · +940 m',
            title: 'Koguchi → Nachi',
            description: 'Der Ogumotori-goe, im Ort „Körperbrecher“ genannt. Der Name ist verdient.',
        },
        {
            image: p.kammweg,
            stage: 'Optional',
            stats: '7,0 km · +180 m',
            title: 'Hosshinmon → Hongu',
            description: 'Die Tagesausflug-Variante für alle, die nur hineinschnuppern wollen.',
        },
    ];

    const places = [
        {
            image: p.nachi,
            title: 'Nachi-no-Otaki',
            description:
                'Japans höchster Wasserfall mit einer einzigen Fallstufe, direkt neben der Pagode des Seiganto-ji. Morgens füllt Nebel das Becken.',
            variant: 'featured' as const,
        },
        {
            image: p.onsen,
            title: 'Yunomine Onsen',
            description:
                'Japans ältestes heißes Bad, seit dem zwölften Jahrhundert in Betrieb. Nach dem dritten Tag der eigentliche Grund weiterzugehen.',
        },
        {
            image: p.torii,
            title: 'Kumano Nachi Taisha',
            description: '467 Stufen vom Dorf hinauf. Oben endet die Pilgerreise, und nebenan verkauft ein Automat kalten Tee.',
            variant: 'ruled' as const,
        },
    ];

    const footer = {
        wordmark: 'Kumano Kodo',
        about: 'Ein privates Wandertagebuch. Alle Fotos vom Mai 2026, alle Angaben ohne Gewähr.',
        columns: [
            {
                title: 'Die Route',
                links: [
                    { label: 'Nakahechi', href: '#' },
                    { label: 'Kohechi', href: '#' },
                    { label: 'Wegekarte', href: '#' },
                ],
            },
            {
                title: 'Praktisches',
                links: [
                    { label: 'Anreise und Busse', href: '#' },
                    { label: 'Unterkunft', href: '#' },
                    { label: 'Newsletter', href: '#' },
                ],
            },
            { title: 'Kontakt', links: [{ label: 'post@kumano-kodo.example' }, { label: 'Antwort meist innerhalb einer Woche' }] },
        ],
        copyright: '© 2026 Kumano Kodo Wandertagebuch',
        legal: [
            { label: 'Impressum', href: '#' },
            { label: 'Datenschutz', href: '#' },
            { label: 'Barrierefreiheit', href: '#' },
        ],
    };

    const kumano = {
        nav: [
            { label: 'Die Route', href: '#', active: true, hasChildren: true },
            { label: 'Praktisches', href: '#', hasChildren: true },
            { label: 'Fotos', href: '#' },
        ],
        hero: {
            image: p.nebelberge,
            eyebrow: 'Kii-Halbinsel · Wakayama · 2026 / 05',
            title: 'Vier Tage durch\nden Zedernnebel',
            teaser: 'Der Kumano Kodo ist kein Fernwanderweg, sondern ein Netz alter Pilgerpfade zu drei Schreinen. Ich bin im Mai die Nakahechi-Route gegangen, im Regen.',
            actions: [
                { label: 'Zu den Etappen', href: '#stages' },
                { label: 'Praktische Fragen', href: '#faq' },
            ],
            stats: [
                { label: 'Strecke', value: '68 km' },
                { label: 'Dauer', value: '4 Tage' },
                { label: 'Aufstieg', value: '3 140 m' },
                { label: 'Beste Zeit', value: 'April, Nov.' },
            ],
        },
        intro: [
            'Zwischen Takijiri-oji und Hongu quert der Weg Pässe, die kaum höher als 700 Meter sind, und trotzdem wirkt er abgelegen. Die Wälder sind gepflanzte Sugi-Zedern, dicht an dicht, und wenn sich Nebel zwischen sie legt, sieht man keine zwanzig Meter weit.',
            'Unterwegs zählt man die Oji: kleine Schreine am Wegrand, an denen Pilger früher Rituale vollzogen. Heute stehen dort nummerierte Holzpfosten, die zugleich als Notfallmarken dienen.',
        ],
        stats: [
            { value: '68', label: 'Kilometer gegangen' },
            { value: '94', label: 'Wegmarken gezählt' },
            { value: '3', label: 'Regentage von vier' },
            { value: '1', label: 'Landkrabbe auf dem Weg' },
        ],
        days: [
            {
                date: 'Tag 1 · 13. Mai',
                route: 'Takijiri → Takahara',
                description: '4 km, 400 Höhenmeter am Stück. Kurz, aber der steilste Abschnitt der Route.',
                time: '2:10 Std.',
            },
            {
                date: 'Tag 2 · 14. Mai',
                route: 'Takahara → Chikatsuyu',
                description: '10 km im Dauerregen. Ab Mittag war der Weg ein Bachbett; die Gamaschen änderten nichts.',
                time: '4:40 Std.',
            },
            {
                date: 'Tag 3 · 15. Mai',
                route: 'Chikatsuyu → Hongu',
                description: '26 km, die längste Etappe. Am Mikoshi-Pass riss der Nebel kurz auf; danach ging es bergab.',
                time: '9:20 Std.',
            },
            {
                date: 'Tag 4 · 16. Mai',
                route: 'Koguchi → Nachi',
                description: '14 km über den Ogumotori-goe. Am Ende steht der Nachi-Wasserfall, 133 Meter hoch.',
                time: '7:00 Std.',
            },
        ],
        stages,
        route: {
            label: 'Schematische Karte der Nakahechi-Route mit sechs Stationen',
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
                { label: 'Tag 1 · 4 km', x: 145 },
                { label: 'Tag 2 · 10 km', x: 340 },
                { label: 'Tag 3 · 26 km', x: 520 },
                { label: 'Bus', x: 705 },
                { label: 'Tag 4 · 14 km', x: 880 },
            ],
            legend: { walked: 'Gegangener Abschnitt', end: 'Ende der Pilgerreise', boundary: 'Tagesgrenze mit Übernachtung' },
        },
        places,
        faq: [
            {
                question: 'Muss ich die Unterkünfte im Voraus buchen?',
                answer: 'Ja, und früh. Takahara und Chikatsuyu haben je eine Handvoll Minshuku, und im Mai und November sind sie Monate vorher voll. Der Reservierungsdienst des Tourismusbüros in Tanabe bucht auf Englisch.',
                open: true,
            },
            {
                question: 'Wie schlimm ist der Regen wirklich?',
                answer: 'Drei von vier Tagen waren nass. Wasserdichte Schuhe und Gamaschen helfen weniger als erhofft; trockene Wechselkleidung in einem dichten Beutel hilft mehr.',
            },
            {
                question: 'Kommt man mit dem Bus voran?',
                answer: 'Ja. Busse verbinden Hongu, Hosshinmon, Koguchi und Nachi mehrmals am Tag. So lässt sich eine Etappe leicht auslassen oder teilen.',
            },
            {
                question: 'Gibt es einen Gepäcktransport?',
                answer: 'Ja, zwischen den größeren Orten, einen Tag vorher über das Tourismusbüro in Tanabe gebucht.',
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

    const guide = {
        topbar: {
            label: 'Wegzustand:',
            value: 'Alle vier Nakahechi-Etappen offen · geprüft Mai 2026',
            phone: '+81 00 0000 0000',
            email: 'post@kumano-kodo.example',
        },
        nav: [
            { label: 'Die Route', href: '#', active: true },
            { label: 'Etappen', href: '#' },
            { label: 'Orte', href: '#' },
            { label: 'Praktisches', href: '#' },
            { label: 'Fotos', href: '#' },
        ],
        routes: [
            { image: p.zedernweg, title: 'Nakahechi', meta: '68 km in vier Tagen · dieses Tagebuch', href: '#' },
            { image: p.kammweg, title: 'Tagesausflug', meta: '7 km · Hosshinmon → Hongu', href: '#' },
            { image: p.farn, title: 'Kohechi', meta: 'Koyasan → Hongu · als Nächstes', href: '#' },
        ],
        facts: [
            { icon: 'clock' as const, label: 'Beste Zeit', value: 'April und November', note: 'Mai geht auch, mit Regen rechnen' },
            { icon: 'map-pin' as const, label: 'Start', value: 'Takijiri-oji', note: 'Tag 1 steigt 400 Meter am Stück' },
            { icon: 'home' as const, label: 'Übernachtung', value: 'Minshuku', note: 'Für Mai und November Monate vorher buchen' },
            { icon: 'file' as const, label: 'Gehzeit', value: '23 Std. 10 Min.', note: 'über vier Tage, ohne Pausen' },
        ],
        entries: [
            stageEntry(0, 'Tag 1 · 2:10 Std.'),
            stageEntry(1, 'Tag 2 · 4:40 Std.'),
            stageEntry(2, 'Tag 3 · 9:20 Std.', 'Längste Etappe'),
            stageEntry(3, 'Tag 4 · 7:00 Std.'),
            stageEntry(4, 'Ein halber Tag', 'Tagesausflug'),
            { image: p.nachi, title: places[0].title, subtitle: 'Wasserfall, 133 Meter', meta: 'Ende von Tag 4' },
            { image: p.onsen, title: places[1].title, subtitle: 'Heiße Quelle', meta: 'Nach Tag 3' },
            { image: p.torii, title: places[2].title, subtitle: 'Schrein', meta: '467 Stufen vom Dorf' },
        ],
        prep: [
            {
                title: 'Unterkunft buchen',
                text: 'Takahara und Chikatsuyu haben je eine Handvoll Minshuku, und im Mai und November sind sie Monate vorher voll.',
                variant: 'featured' as const,
            },
            {
                title: 'Für Regen packen',
                text: 'Drei von vier Tagen waren nass. Trockene Wechselkleidung in einem dichten Beutel hilft mehr als Gamaschen.',
            },
            {
                title: 'Gepäck vorausschicken',
                text: 'Das Gepäck reist zwischen den größeren Orten, einen Tag vorher über das Tourismusbüro in Tanabe gebucht.',
            },
        ],
        tiles: [
            { title: 'Anreise und Busse', icon: 'map-pin' as const },
            { title: 'Unterkunft', icon: 'home' as const },
            { title: 'Wegmarken und Sicherheit', icon: 'alert' as const },
            { title: 'Karten und Fahrpläne', icon: 'download' as const },
        ],
        hosts: [{ image: p.laternen, name: 'Gastgeberin im Minshuku', role: 'Chikatsuyu', focus: '„Der Regen gehört dazu.“' }],
        footer: {
            ...footer,
            notice: { title: 'Wegzustand:', text: 'Nach starkem Regen vor dem Aufbruch die Hinweise des Tourismusbüros prüfen.' },
        },
    };

    const richTextSample =
        '<h2>Die lange Etappe</h2>' +
        '<p>26 km von Chikatsuyu nach Hongu, der längste der vier Tage. Am Mikoshi-Pass riss der Nebel kurz auf; danach ging es bergab. Wer sie teilen will, nimmt den <a href="#">Bus ab Hosshinmon</a>.</p>' +
        '<ul><li>Chikatsuyu: früh los, nach dem Frühstück im Minshuku</li><li>Mikoshi-Pass: wo der Nebel aufriss</li><li>Hosshinmon: Bushaltestelle für alle, die die Etappe teilen</li><li>Hongu: Ende der Etappe</li></ul>' +
        '<h3>Wo übernachten</h3><p>Das Minshuku in Chikatsuyu Monate vorher buchen; im Mai und November ist es voll.</p>';

    const home = {
        why: { eyebrow: 'Warum dieser Weg', title: 'Ein Pfad, der seit tausend Jahren begangen wird' },
        bridgeCaption: 'Zwischen Takahara und Chikatsuyu queren ein Dutzend Trockenmauerbrücken den Hang. Kilometer 14.',
        quote: {
            quote: '„Der Regen gehört dazu. Wer bei Sonne kommt, sieht einen anderen Weg.“',
            source: 'Gastgeberin des Minshuku in Chikatsuyu',
        },
        days: { title: 'Wie die vier Tage verliefen', aside: 'Gehzeiten ohne Pausen, mit der Uhr gemessen statt geschätzt.' },
        stages: { eyebrow: 'Etappen', title: 'Fünf Abschnitte, die man einzeln gehen kann' },
        map: {
            eyebrow: 'Wegekarte',
            title: 'Schematisch, nicht maßstäblich',
            aside: 'Die Reihenfolge der Stationen und die Tagesgrenzen stimmen, die Geometrie nicht. Zum Navigieren braucht man die Karte des Tourismusbüros.',
        },
        places: { eyebrow: 'Am Weg', title: 'Drei Orte, die den Umweg lohnen' },
        roadsideCaption: 'Notizen vom Wegrand. Eine Landkrabbe nach dem Regen, eine Zeder im Nebel.',
        practical: {
            eyebrow: 'Praktisches',
            title: 'Was ich gern vorher gewusst hätte',
            intro: 'Die vier Fragen, die mir seit der Rückkehr am häufigsten gestellt wurden.',
        },
        newsletter: {
            title: 'Zwei E-Mails im Jahr, immer wenn eine neue Route beschrieben ist',
            text: 'Als Nächstes kommt der Kohechi, der Bergpfad von Koyasan nach Hongu. Keine Werbung, keine Weitergabe Ihrer Adresse.',
        },
    };

    const pages = {
        start: {
            title: 'Vier Tage auf dem Nakahechi',
            text: 'Ein privates Wandertagebuch vom Mai 2026: die Etappen, die Orte, die einen Umweg lohnen, und was ich gern vor dem Aufbruch gewusst hätte.',
            action: 'Zu den Etappen',
            panelTitle: 'Wege, ihn zu gehen',
            panelMore: 'Routen vergleichen',
            factsLabel: 'Auf einen Blick',
            stages: { eyebrow: 'Etappen', title: 'Vier Tage, je eine Etappe' },
            prep: { eyebrow: 'Praktisches', title: 'Vor dem Aufbruch' },
            plan: 'Die Wanderung planen',
        },
        list: {
            title: 'Etappen und Orte',
            crumbs: ['Start', 'Die Route'],
            chips: ['Alle', 'Etappen', 'Orte', 'Tagesausflüge'],
            search: { label: 'Etappen und Orte durchsuchen', placeholder: 'z. B. Hongu' },
            day: { label: 'Tag', options: ['Alle Tage', 'Tag 1', 'Tag 2', 'Tag 3', 'Tag 4'] },
            count: '12 Einträge',
        },
        detail: {
            crumbs: ['Start', 'Die Route', 'Etappen'],
            caption: 'Blick zurück über das Tal vor dem Anstieg. Tag 3, 15. Mai.',
            downloads: [
                { title: 'Etappenkarte Chikatsuyu → Hongu', meta: 'PDF · 1,2 MB', href: '#' },
                { title: 'Busfahrplan Hosshinmon – Hongu', meta: 'PDF · 96 KB', href: '#' },
                { title: 'Packliste für Regen', meta: 'PDF · 240 KB', href: '#' },
            ],
            factsTitle: 'Etappe in Zahlen',
            facts: [
                { label: 'Tag', value: 'Tag 3 · 15. Mai' },
                { label: 'Strecke', value: '25,9 km' },
                { label: 'Aufstieg', value: '+1 180 m' },
                { label: 'Gehzeit', value: '9:20 Std.' },
            ],
            info: {
                title: 'Etappe teilen?',
                text: 'Ab Hosshinmon den Bus nehmen und nur die letzten 7 km bis Hongu gehen.',
                links: [
                    { label: 'Busfahrplan', href: '#' },
                    { label: 'Übernachten in Chikatsuyu', href: '#' },
                ],
            },
            back: 'Alle Etappen',
            along: 'Entlang der Route',
            subNavTitle: 'Die Route',
        },
    };

    const samples = {
        textarea: { label: 'Nachricht', placeholder: 'Ihre Frage zur Route' },
        search: 'Suche',
        galleryCaption: 'Notizen von vier Tagen auf dem Nakahechi, Mai 2026.',
        table: {
            caption: 'Die Etappen im Überblick',
            head: ['Etappe', 'Strecke', 'Aufstieg', 'Gehzeit'],
            rows: [
                ['Takijiri → Takahara', '4,0 km', '+400 m', '2:10 Std.'],
                ['Takahara → Chikatsuyu', '9,8 km', '+620 m', '4:40 Std.'],
                ['Chikatsuyu → Hongu', '25,9 km', '+1 180 m', '9:20 Std.'],
                ['Koguchi → Nachi', '14,5 km', '+940 m', '7:00 Std.'],
            ],
        },
    };

    return { ui, kumano, guide, richTextSample, home, pages, samples };
};

export const de: LocaleModule<LocaleContent> = {
    alts: {
        zedernweg: 'Zwei Wanderer in Regenponchos zwischen hohen Zedern',
        wegmarke: 'Nummerierter Wegpfosten im Nebelwald',
        talblick: 'Blick über ein Dorf im Tal, Wolken in den Hängen',
        sonnenpfad: 'Sonnendurchfluteter Waldweg zwischen schlanken Zedern',
        kammweg: 'Weite Aussicht über bewaldete Bergrücken',
        nebelberge: 'Nebelverhangene Bergketten der Kii-Halbinsel am frühen Morgen',
        steinbruecke: 'Steinbrücke über einen Bach im Zedernwald',
        nachi: 'Dreistöckige Pagode vor dem Nachi-Wasserfall',
        onsen: 'Steingefasstes Onsen-Becken unter einem Holzdach',
        torii: 'Rotes Torii am Fuß einer Steintreppe',
        krabbe: 'Orange Landkrabbe auf nassem Felsboden',
        nebelbaum: 'Gebogener Baumstamm im nebligen Zedernwald',
        farn: 'Farne am Wegrand',
        laternen: 'Steinlaternen an einem Schrein',
        bus: 'Linienbus an einer Bergstraße',
    },
    build,
};
