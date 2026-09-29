import type { LocaleModule, Photos } from '../templates/content';
import type { LocaleContent } from './en';

const build = (p: Photos): LocaleContent => {
    const ui = {
        mainNav: 'Hauptnavigation',
        language: 'Sprache',
        menu: 'Menü',
        darkMode: 'Dunkler Modus',
        trailStatus: 'Wegzustand und Kontakt',
        categories: 'Kategorien',
        breadcrumb: 'Brotkrumen',
        pages: 'Seiten',
        previousPage: 'Vorherige Seite',
        nextPage: 'Nächste Seite',
        previous: 'Zurück',
        next: 'Weiter',
        close: 'Schließen',
        card: 'Karte',
        readMore: 'Weiterlesen',
        emailAddress: 'E-Mail-Adresse',
        emailPlaceholder: 'name@beispiel.de',
        consent: 'Ich möchte den Newsletter erhalten und habe die Datenschutzerklärung gelesen.',
        subscribe: 'Abonnieren',
    };

    const stages = [
        {
            image: p['signpost'],
            stage: 'Tag 1',
            stats: '3,7 km · +400 m',
            title: 'Takijiri → Takahara',
            description: 'Um Viertel vor vier los, direkt aus dem Bus. Die erste Stunde geht nur bergauf.',
        },
        {
            image: p['stone-path-walkers'],
            stage: 'Tag 2',
            stats: '9,8 km · +620 m',
            title: 'Takahara → Chikatsuyu',
            description: 'Um sieben Wolken unter dem Dorf, ab neun Regen, um halb sechs das Laternentor von Chikatsuyu.',
        },
        {
            image: p['morning-bus'],
            stage: 'Bus',
            stats: '07:18 · Chikatsuyu → Hosshinmon',
            title: 'Das Stück, das wir ausgelassen haben',
            description: 'Den langen Mittelteil im Regen mit dem Bus. Kein Bedauern.',
        },
        {
            image: p['walker-in-mist'],
            stage: 'Tag 3',
            stats: '7,0 km · +180 m',
            title: 'Hosshinmon → Hongu',
            description: 'Zedern, ein Oji-Schrein, ein Blick über die Kämme und am Nachmittag Yunomine.',
        },
        {
            image: p['nachi-pagoda'],
            stage: 'Tag 4',
            stats: 'Mit Zug und Bus',
            title: 'Nachi und Katsuura',
            description: 'Kein Wandern. Die Küstenbahn, die Pagode vor dem Wasserfall, eine Fähre zum Ryokan.',
        },
    ];

    const places = [
        {
            image: p['nachi-pagoda'],
            title: 'Seiganto-ji und Nachi-Fall',
            description: 'Die dreistöckige Pagode vor dem Wasserfall. Wir kamen mittags mit dem Bus, im Regen, der nie ganz aufhörte.',
            variant: 'featured' as const,
        },
        {
            image: p['yunomine-street'],
            title: 'Yunomine Onsen',
            description: 'Ein enges Tal, die Badehäuser am Bach entlang. Zum Kindertag hingen Karpfenfahnen quer darüber.',
        },
        {
            image: p['chikatsuyu-gate'],
            title: 'Chikatsuyu',
            description: 'Das Laternentor am Ortsrand, auf der mittleren Laterne die dreibeinige Krähe. Das Ende von Tag zwei.',
            variant: 'ruled' as const,
        },
    ];

    const footer = {
        wordmark: 'Kumano Kodo',
        about: 'Ein privates Wandertagebuch. Fotos vom 20. bis 25. April 2024, alle Angaben ohne Gewähr.',
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
        copyright: '© 2024 Kumano Kodo Wandertagebuch',
        legal: [
            { label: 'Impressum', href: '#' },
            { label: 'Datenschutz', href: '#' },
            { label: 'Barrierefreiheit', href: '#' },
        ],
    };

    const routeMenu = {
        kind: 'mega' as const,
        columns: [
            { title: 'Tage', links: stages.map((s) => ({ label: `${s.stage} · ${s.title}`, href: '#' })) },
            { title: 'Orte', links: places.map((pl) => ({ label: pl.title, href: '#' })) },
        ],
        text: {
            title: 'Der Nakahechi',
            html: '<p>Die alte Kaiserroute von Tanabe zu den drei großen Schreinen von Kumano. Wir sind im April drei Tage davon gegangen und haben den Bus genommen, wo die Beine es sagten.</p>',
        },
        teaser: {
            image: stages[1].image,
            title: stages[1].title,
            subtitle: stages[1].stats,
            meta: '21. April · 07:02–17:28',
            badge: 'Längster Tag',
            href: '#',
        },
        overview: { label: 'Alles zur Route', href: '#' },
    };
    const practicalMenu = {
        kind: 'dropdown' as const,
        links: ['Anreise und Busse', 'Unterkunft', 'Wegmarken und Sicherheit', 'Karten und Fahrpläne', 'Newsletter'].map((label) => ({
            label,
            href: '#',
        })),
    };

    const kumano = {
        nav: [
            { label: 'Die Route', href: '#', active: true, menu: routeMenu },
            { label: 'Praktisches', href: '#', menu: practicalMenu },
            { label: 'Fotos', href: '#' },
        ],
        hero: {
            image: p['sea-of-clouds'],
            eyebrow: 'Kii-Halbinsel · Wakayama · April 2024',
            title: 'Vier Tage durch\nden Zedernnebel',
            teaser: 'Der Kumano Kodo ist kein einzelner Fernwanderweg, sondern ein Netz alter Pilgerpfade zu drei Schreinen. Wir sind im April den Nakahechi gegangen, meist im Regen, und haben den Bus genommen, wo es passte.',
            actions: [
                { label: 'Zu den Tagen', href: '#stages' },
                { label: 'Praktische Fragen', href: '#faq' },
            ],
            stats: [
                { label: 'Zu Fuß', value: '21 km' },
                { label: 'Tage', value: '4' },
                { label: 'Fotos', value: '27' },
                { label: 'Monat', value: 'April' },
            ],
        },
        intro: [
            'Zwischen Takijiri und Hongu quert der Weg Pässe, die kaum höher als 700 Meter sind, und trotzdem wirkt er abgelegen. Die Wälder sind gepflanzte Sugi-Zedern, dicht an dicht; wenn sich Nebel zwischen sie legt, sieht man keine zwanzig Meter weit.',
            'Unterwegs kommt man an den Oji vorbei, kleinen Schreinen am Weg, an denen Pilger früher beteten. Meist sind es eine Lichtung, ein Stein und ein hölzernes Torii, leicht zu übersehen, wenn man auf die Füße schaut.',
        ],
        stats: [
            { value: '21', label: 'Kilometer zu Fuß' },
            { value: '1', label: 'Bus, der einen Tag rettete' },
            { value: '3', label: 'nasse Tage von vier' },
            { value: '1', label: 'Landkrabbe auf dem Weg' },
        ],
        days: [
            {
                date: 'Tag 1 · 20. April',
                route: 'Takijiri → Takahara',
                description:
                    'Um halb vier aus dem Bus, um Viertel vor vier auf dem Weg. 3,7 km, fast alles bergauf, zu einem Dorf über dem Tal.',
                time: 'ab 15:40',
            },
            {
                date: 'Tag 2 · 21. April',
                route: 'Takahara → Chikatsuyu',
                description:
                    'Um sieben Wolken im Tal, ab neun Regen. Steinpflaster, ein Bach, mittags eine Landkrabbe, um 17:28 das Laternentor von Chikatsuyu.',
                time: '07:02–17:28',
            },
            {
                date: 'Tag 3 · 22. April',
                route: 'Hosshinmon → Hongu → Yunomine',
                description:
                    'Mit dem Bus um 07:18 über den langen Mittelteil, dann die letzten sieben Kilometer zu Fuß. Am Nachmittag ein Außenbad in Yunomine.',
                time: '07:18–16:05',
            },
            {
                date: 'Tag 4 · 23. April',
                route: 'Nachi und Katsuura',
                description:
                    'Ein Tag ohne Wandern: die Bahn an der Küste, die Pagode vor dem Wasserfall, eine Fähre über den Hafen zum Ryokan.',
                time: '10:55–15:48',
            },
        ],
        stages,
        route: {
            label: 'Schematische Karte der Route mit sechs Stationen',
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
                { label: 'Tag 1 · 3,7 km', x: 145 },
                { label: 'Tag 2 · 9,8 km', x: 340 },
                { label: 'Bus', x: 520 },
                { label: 'Tag 3 · 7 km', x: 705 },
                { label: 'Zug', x: 880 },
            ],
            legend: { walked: 'Route', end: 'Ende der Reise', boundary: 'Tagesgrenze mit Übernachtung' },
        },
        places,
        faq: [
            {
                question: 'Muss ich die Unterkünfte im Voraus buchen?',
                answer: 'Ja, und früh. Takahara und Chikatsuyu haben je eine Handvoll Minshuku, und im Frühling und Herbst sind sie Monate vorher voll. Der Reservierungsdienst des Tourismusbüros in Tanabe bucht auf Englisch.',
                open: true,
            },
            {
                question: 'Wie schlimm ist der Regen wirklich?',
                answer: 'Drei unserer vier Tage waren nass. Wasserdichte Schuhe und Gamaschen helfen weniger als erhofft; trockene Wechselkleidung in einem dichten Beutel hilft mehr.',
            },
            {
                question: 'Kommt man mit dem Bus voran?',
                answer: 'Ja. Busse verbinden Chikatsuyu, Hosshinmon und Hongu mehrmals am Tag. Wir haben den um 07:18 genommen und den langen Mittelteil ausgelassen.',
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
            value: 'Alle Nakahechi-Abschnitte offen · Stand April 2024',
            phone: '+81 00 0000 0000',
            email: 'post@kumano-kodo.example',
        },
        nav: [
            { label: 'Die Route', href: '#', active: true },
            { label: 'Tage', href: '#' },
            { label: 'Orte', href: '#' },
            { label: 'Praktisches', href: '#', menu: practicalMenu },
            { label: 'Fotos', href: '#' },
        ],
        routes: [
            { image: p['stone-path-walkers'], title: 'Nakahechi', meta: 'Drei Tage zu Fuß · dieses Tagebuch', href: '#' },
            { image: p['walker-in-mist'], title: 'Tagesausflug', meta: '7 km · Hosshinmon → Hongu', href: '#' },
            { image: p['fern-frond'], title: 'Kohechi', meta: 'Koyasan → Hongu · beim nächsten Mal', href: '#' },
        ],
        facts: [
            { icon: 'clock' as const, label: 'Wann', value: '20. bis 23. April', note: 'Drei nasse Tage von vier' },
            { icon: 'map-pin' as const, label: 'Start', value: 'Takijiri', note: 'Um halb vier aus dem Bus' },
            { icon: 'home' as const, label: 'Übernachtung', value: 'Minshuku und Ryokan', note: 'Monate vorher gebucht' },
            { icon: 'file' as const, label: 'Zu Fuß', value: 'Rund 21 km', note: 'an drei Tagen, dazu einer mit dem Zug' },
        ],
        entries: [
            stageEntry(0, '20. April · ab 15:40'),
            stageEntry(1, '21. April · 07:02–17:28', 'Längster Tag'),
            stageEntry(2, '22. April · 07:18'),
            stageEntry(3, '22. April · 08:26–12:05'),
            stageEntry(4, '23. April · 10:55–15:48', 'Ohne Wandern'),
            { image: p['outdoor-bath'], title: places[1].title, subtitle: 'Außenbad', meta: '22. April · 16:05' },
            { image: p['chikatsuyu-gate'], title: places[2].title, subtitle: 'Laternentor', meta: '21. April · 17:28' },
            { image: p['ryokan-room'], title: 'Katsuura', subtitle: 'Ryokan am Hafen', meta: '23. April · 15:48' },
        ],
        prep: [
            {
                title: 'Unterkunft buchen',
                text: 'Takahara und Chikatsuyu haben je eine Handvoll Minshuku, und im Frühling und Herbst sind sie Monate vorher voll.',
                variant: 'featured' as const,
            },
            {
                title: 'Für Regen packen',
                text: 'Drei von vier Tagen waren nass. Trockene Wechselkleidung in einem dichten Beutel hilft mehr als Gamaschen.',
            },
            {
                title: 'Den Bus nehmen',
                text: 'Busse verbinden die Orte entlang der Route. Der um 07:18 ab Chikatsuyu hat uns die längste Etappe erspart.',
            },
        ],
        tiles: [
            { title: 'Anreise und Busse', icon: 'map-pin' as const },
            { title: 'Unterkunft', icon: 'home' as const },
            { title: 'Wegmarken und Sicherheit', icon: 'alert' as const },
            { title: 'Karten und Fahrpläne', icon: 'download' as const },
        ],
        hosts: [
            {
                image: p['ryokan-room'],
                name: 'Ryokan in Katsuura',
                role: 'Letzte Nacht an der Küste',
                focus: '„Abendessen gibt es um sechs.“',
            },
        ],
        footer: {
            ...footer,
            notice: { title: 'Wegzustand:', text: 'Nach starkem Regen vor dem Aufbruch die Hinweise des Tourismusbüros prüfen.' },
        },
    };

    const richTextSample =
        '<h2>Der längste Tag</h2>' +
        '<p>9,8 km von Takahara nach Chikatsuyu. Um sieben lagen die Wolken im Tal unter dem Dorf, ab neun regnete es. Das Steinpflaster hält bei Nässe, die Wurzeln dazwischen nicht. Wer den Tag kürzen will, nimmt einen <a href="#">Bus an der Hauptstraße</a>.</p>' +
        '<ul><li>07:02 · Takahara: Wolken unter dem Dorf</li><li>09:05 · Steinpflaster zwischen den Zedern</li><li>12:03 · eine Landkrabbe auf dem Weg</li><li>17:28 · das Laternentor von Chikatsuyu</li></ul>' +
        '<h3>Wo übernachten</h3><p>Chikatsuyu hat eine Handvoll Minshuku am Fluss. Für Frühling und Herbst Monate vorher buchen.</p>';

    const home = {
        crow: {
            eyebrow: 'Yatagarasu',
            title: 'Die dreibeinige Krähe',
            text: 'Der Vogel im Logo ist die Yatagarasu, Botin der Kumano-Gottheiten. Den alten Chroniken nach führte sie Kaiser Jimmu durch die Berge von Kumano nach Yamato. Ihre drei Beine werden oft als Himmel, Erde und Mensch gedeutet. Am Weg begegnet man ihr auf Schreinfahnen, den Goōhōin-Amuletten und auf der mittleren Laterne des Tors in Chikatsuyu.',
        },
        why: { eyebrow: 'Warum dieser Weg', title: 'Ein Pfad, der seit tausend Jahren begangen wird' },
        bridgeCaption: p['forest-stream'].caption ?? '',
        quote: { quote: '„Abendessen gibt es um sechs. Das Bad ist bis elf offen.“', source: 'Ryokan in Katsuura, 23. April' },
        days: { title: 'Wie die vier Tage verliefen', aside: 'Uhrzeiten aus den Fotos, nicht aus einem Plan.' },
        stages: { eyebrow: 'Tage', title: 'Drei Tage zu Fuß, einer mit dem Zug' },
        map: {
            eyebrow: 'Wegekarte',
            title: 'Schematisch, nicht maßstäblich',
            aside: 'Die Reihenfolge der Stationen und die Tagesgrenzen stimmen, die Geometrie nicht. Zum Navigieren braucht man die Karte des Tourismusbüros.',
        },
        places: { eyebrow: 'Am Weg', title: 'Drei Orte, die den Umweg lohnen' },
        roadsideCaption: `${p['land-crab'].caption ?? ''} · ${p['cedar-canopy'].caption ?? ''}`,
        practical: { eyebrow: 'Praktisches', title: 'Was man uns danach gefragt hat', intro: 'Die vier Fragen, die am häufigsten kamen.' },
        newsletter: {
            title: 'Zwei E-Mails im Jahr, immer wenn eine neue Route beschrieben ist',
            text: 'Beim nächsten Mal der Kohechi, der Bergpfad von Koyasan nach Hongu. Keine Werbung, keine Weitergabe Ihrer Adresse.',
        },
        draft: {
            kicker: 'Kumano Kodo · Nakahechi',
            title: 'Vier Tage im April',
            lede: 'Drei Tage zu Fuß durch die Zedern der Kii-Halbinsel, einer mit dem Zug an der Küste. Siebenundzwanzig Fotos, in der Reihenfolge, in der sie entstanden sind.',
            chapters: [
                'Um halb vier stiegen wir in Takijiri aus dem Bus, eine Viertelstunde später waren wir auf dem Weg. Die erste Stunde macht keine Umstände: Stufen, Wurzeln, noch mehr Stufen.',
                'Der Morgen begann über den Wolken und endete an einem Tor aus Papierlaternen. Dazwischen Regen, Steinpflaster, das auch nass griffig bleibt, und eine leuchtend orange Krabbe, die für die Kamera stillhielt.',
                'Den langen Mittelteil haben wir mit dem Bus um 07:18 übersprungen und die letzten sieben Kilometer nach Hongu zu Fuß gemacht. Um vier saßen wir in Yunomine in einem Steinbecken unter einem Holzdach und hörten dem Regen zu.',
                'Ein Tag ganz ohne Weg. Die Küstenbahn im Regen, die Pagode vor dem Wasserfall und eine Fähre über den Hafen zu einem Ryokan mit Blick aufs Wasser.',
            ],
            coda: 'Zwei Tage später, der letzte Abend. Für zwanzig Minuten kam das Licht heraus.',
            mapTitle: 'Wo es langging',
            practicalTitle: 'Wer hinfährt',
            allPhotos: '27 Fotos',
        },
    };

    const pages = {
        start: {
            title: 'Vier Tage auf dem Nakahechi',
            text: 'Ein privates Wandertagebuch vom April 2024: die Tage, die Orte, die einen Umweg lohnen, und was wir gern vor dem Aufbruch gewusst hätten.',
            action: 'Zu den Tagen',
            panelTitle: 'Wege, ihn zu gehen',
            panelMore: 'Routen vergleichen',
            factsLabel: 'Auf einen Blick',
            stages: { eyebrow: 'Tage', title: 'Drei Tage zu Fuß, einer mit dem Zug' },
            prep: { eyebrow: 'Praktisches', title: 'Vor dem Aufbruch' },
            plan: 'Die Wanderung planen',
        },
        list: {
            title: 'Tage und Orte',
            crumbs: ['Start', 'Die Route'],
            chips: ['Alle', 'Tage', 'Orte', 'Unterkünfte'],
            search: { label: 'Tage und Orte durchsuchen', placeholder: 'z. B. Chikatsuyu' },
            day: { label: 'Tag', options: ['Alle Tage', 'Tag 1', 'Tag 2', 'Tag 3', 'Tag 4'] },
            count: '8 Einträge',
        },
        detail: {
            crumbs: ['Start', 'Die Route', 'Tage'],
            caption: p['misty-valley'].caption ?? '',
            downloads: [
                { title: 'Etappenkarte Takahara → Chikatsuyu', meta: 'PDF · 1,2 MB', href: '#' },
                { title: 'Busfahrplan Chikatsuyu – Hosshinmon', meta: 'PDF · 96 KB', href: '#' },
                { title: 'Packliste für Regen', meta: 'PDF · 240 KB', href: '#' },
            ],
            factsTitle: 'Der Tag in Zahlen',
            facts: [
                { label: 'Tag', value: 'Tag 2 · 21. April' },
                { label: 'Strecke', value: '9,8 km' },
                { label: 'Aufstieg', value: '+620 m' },
                { label: 'Fotos', value: '07:02–17:28' },
            ],
            info: {
                title: 'Zu lang?',
                text: 'An der Hauptstraße zwischen Takahara und Chikatsuyu fahren Busse, der Tag kann also früher enden.',
                links: [
                    { label: 'Busfahrplan', href: '#' },
                    { label: 'Übernachten in Chikatsuyu', href: '#' },
                ],
            },
            back: 'Alle Tage',
            along: 'Entlang der Route',
            subNavTitle: 'Die Route',
        },
    };

    const samples = {
        textarea: { label: 'Nachricht', placeholder: 'Ihre Frage zur Route' },
        search: 'Suche',
        galleryCaption: 'Tag 3, 22. April: vom Bus um 07:18 bis zum Bad in Yunomine.',
        table: {
            caption: 'Die Tage im Überblick',
            head: ['Tag', 'Route', 'Strecke', 'Fotos'],
            rows: [
                ['20. April', 'Takijiri → Takahara', '3,7 km', 'ab 15:40'],
                ['21. April', 'Takahara → Chikatsuyu', '9,8 km', '07:02–17:28'],
                ['22. April', 'Hosshinmon → Hongu', '7,0 km', '07:18–16:05'],
                ['23. April', 'Nachi und Katsuura', 'mit dem Zug', '10:55–15:48'],
            ],
        },
    };

    return { ui, kumano, guide, richTextSample, home, pages, samples };
};

export const de: LocaleModule<LocaleContent> = {
    photos: {
        'trailhead-river': {
            alt: 'Holzhalle mit rotem Geländer über einem breiten steinigen Flussbett, dahinter bewaldete Hügel',
            place: 'Takijiri',
        },
        signpost: { alt: 'Hölzerner Wegweiser mit der Aufschrift 熊野古道 Kumano Kodo auf einem Pfad voller Laub', place: 'Takijiri' },
        'sea-of-clouds': { alt: 'Bewaldete Bergkämme hintereinander, in den Tälern liegen Wolken', place: 'Takahara' },
        'misty-valley': { alt: 'Ein steiles Tal voller Nebel, die bewaldeten Hänge verschwimmen im Grau', place: 'Takahara' },
        'roadside-markers': { alt: 'Hölzerne Wegmarken an einer ruhigen Straße unter jungen Bäumen', place: 'Oberhalb von Takahara' },
        'stone-path-walkers': {
            alt: 'Zwei Wandernde in Regenkleidung auf einem gepflasterten Weg zwischen hohen Zedern',
            place: 'Nakahechi',
        },
        'forest-stream': { alt: 'Ein Bach im Zedernwald, über den ein schmaler Holzsteg führt', place: 'Nakahechi' },
        'land-crab': { alt: 'Eine orange Landkrabbe auf nassen Steinen und Zedernnadeln', place: 'Nakahechi' },
        'vending-machines': {
            alt: 'Getränkeautomaten unter einem Dach neben einer Eiswaffel-Figur, karierter Boden',
            place: 'Vor Chikatsuyu',
        },
        'chikatsuyu-gate': {
            alt: 'Ein Holztor mit drei großen Papierlaternen, auf der mittleren eine dreibeinige Krähe',
            place: 'Chikatsuyu',
        },
        'morning-bus': { alt: 'Ein rot-weißer Bus auf nasser Straße, dahinter neblige Hügel', place: 'Chikatsuyu' },
        'cedar-canopy': { alt: 'Blick an den Stämmen von Zedern hinauf in einen hellen Himmel', place: 'Nakahechi' },
        'walker-in-mist': {
            alt: 'Eine wandernde Person mit blauem Rucksackschutz auf einem schmalen Pfad im nebligen Zedernwald',
            place: 'Richtung Hongu',
        },
        'root-path': { alt: 'Ein Weg aus freiliegenden Wurzeln und Erde zwischen Farnen und Zedern', place: 'Richtung Hongu' },
        'oji-shrine': { alt: 'Ein kleiner Holzschrein hinter einem verwitterten Torii im Wald', place: 'Richtung Hongu' },
        'cobbled-path': { alt: 'Altes Kopfsteinpflaster zwischen geraden Zedernstämmen', place: 'Richtung Hongu' },
        'sunlit-path': { alt: 'Sonnenlicht fällt auf einen Waldweg zwischen Reihen von Zedern', place: 'Richtung Hongu' },
        'ridge-view': { alt: 'Blick über bewaldete Kämme, eingerahmt von einem Kiefernzweig', place: 'Richtung Hongu' },
        'fern-frond': { alt: 'Nahaufnahme eines sich entrollenden Farnwedels', place: 'Hongu' },
        'yunomine-street': { alt: 'Eine schmale Dorfstraße an einem Bach, Karpfenfahnen hängen quer darüber', place: 'Yunomine' },
        'river-bridge': { alt: 'Ein breites Flussbett mit einer Hängebrücke, im Vordergrund Azaleen', place: 'Bei Yunomine' },
        'outdoor-bath': { alt: 'Ein steingefasstes Außenbad unter einem Holzdach, ringsum Grün', place: 'Yunomine' },
        'seaside-station': { alt: 'Ein kleiner Bahnsteig an der Küste im Regen, hinter dem Zaun das Meer', place: 'An der Küstenbahn' },
        'nachi-pagoda': { alt: 'Eine rote dreistöckige Pagode vor einem hohen Wasserfall im Nebel', place: 'Nachi' },
        'harbour-ferry': { alt: 'Eine bunt bemalte Fähre überquert einen grauen Hafen', place: 'Katsuura' },
        'ryokan-room': { alt: 'Ein Tatami-Zimmer mit niedrigem Tisch, das Fenster geht aufs Wasser', place: 'Katsuura' },
        'evening-rooftops': { alt: 'Ziegeldächer einer kleinen Stadt im Abendlicht, am Horizont Berge', place: 'Der letzte Abend' },
    },
    build,
};
