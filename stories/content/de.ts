import type { LocaleModule, Photos } from '../templates/content';
import type { LocaleContent } from './en';
import { paths } from './paths';

const build = (p: Photos): LocaleContent => {
    const ui = {
        mainNav: 'Hauptnavigation',
        language: 'Sprache',
        menu: 'Menü',
        darkMode: 'Dunkler Modus',
        backToTop: 'Nach oben',
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
        search: 'Suche',
        searchPlaceholder: 'Tage, Orte und Tipps durchsuchen',
        searchSummary: '%1$s Ergebnisse für „%2$s“',
        searchSummaryOne: '1 Ergebnis für „%1$s“',
        searchEmpty: 'Nichts gefunden für „%1$s“. Am besten klappt ein Ort oder ein Tag, zum Beispiel Hongu.',
        searchResults: 'Suchergebnisse',
        logIn: 'Anmelden',
        username: 'Benutzername',
        password: 'Passwort',
        stayLoggedIn: 'Angemeldet bleiben',
        forgotPassword: 'Passwort vergessen?',
        loginFailed: 'Anmeldung fehlgeschlagen',
        loginFailedText: 'Benutzername oder Passwort wurden nicht akzeptiert.',
        loggedInAs: 'Angemeldet als %1$s',
        logOut: 'Abmelden',
        demoAccess: 'Demo-Zugang',
        demoAccessText: 'Benutzername %1$s · Passwort %2$s',
        notFoundTitle: 'Seite nicht gefunden',
        notFoundText:
            'Dieser Weg steht auf keiner Karte: Die Seite ist umgezogen, oder in der Adresse steckt ein Tippfehler. Durchsuchen Sie das Tagebuch oben, oder beginnen Sie hier neu.',
        papersTitle: 'Reiseunterlagen',
        papersText:
            'Willkommen zurück. Hier liegen die Unterlagen unserer Wanderung: die Etappenkarte, die Anreise und die Packliste für Regen. Die Tage darunter führen zurück zu jeder Etappe.',
        papersLink: 'Ihre Reiseunterlagen',
        requiredNote: 'Mit * markierte Felder sind Pflichtfelder.',
        fieldRequired: 'Bitte füllen Sie dieses Feld aus.',
        emailInvalid: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
        send: 'Senden',
        formSent: 'Nachricht gesendet',
        formSentText: 'Danke. Ihre Nachricht ist angekommen.',
        name: 'Name',
        topic: 'Thema',
        message: 'Nachricht',
        contactConsent: 'Ich bin einverstanden, dass meine Angaben zur Beantwortung meiner Nachricht verwendet werden.',
    };

    const stages = [
        {
            image: p['signpost'],
            stage: 'Tag 1',
            stats: '3,7 km',
            title: 'Takijiri → Takahara',
            description: 'Um Viertel vor vier auf dem Weg. Die erste Stunde geht nur bergauf.',
            href: paths.day(1),
        },
        {
            image: p['stone-path-walkers'],
            stage: 'Tag 2',
            stats: '9,8 km',
            title: 'Takahara → Chikatsuyu',
            description: 'Um sieben Wolken unter dem Dorf, Steinpflaster, ein Bach, um halb sechs das Laternentor von Chikatsuyu.',
            href: paths.day(2),
        },
        {
            image: p['walker-in-mist'],
            stage: 'Tag 3',
            stats: 'rund 25 km',
            title: 'Chikatsuyu → Hongu',
            description: 'Der längste Tag, durch die Zedern und an einem kleinen Oji-Schrein vorbei, weiter nach Yunomine zum Übernachten.',
            href: paths.day(3),
        },
        {
            image: p['fern-frond'],
            stage: 'Tag 4',
            stats: 'rund 13 km',
            title: 'Kogumotori-goe',
            description: 'Von den heißen Quellen über den ersten der beiden Pässe, die zur Küste führen.',
            href: paths.day(4),
        },
        {
            image: p['nachi-pagoda'],
            stage: 'Tag 4',
            stats: 'rund 14,5 km',
            title: 'Ogumotori-goe → Nachi',
            description: 'Der zweite Pass, und am Ende die Pagode vor dem Wasserfall.',
            href: paths.day(4),
        },
    ];

    const places = [
        {
            image: p['nachi-pagoda'],
            title: 'Seiganto-ji und Nachi-Fall',
            description:
                'Die dreistöckige Pagode vor dem Wasserfall, das Ende der Wanderung. Es regnete, und der Fall verschwand alle paar Minuten im Nebel.',
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
                    { label: 'Nakahechi', href: paths.route },
                    { label: 'Kohechi', href: paths.kohechi },
                    { label: 'Wegekarte', href: paths.map },
                ],
            },
            {
                title: 'Praktisches',
                links: [
                    { label: 'Anreise und Busse', href: paths.practicalPage('getting-there') },
                    { label: 'Unterkunft', href: paths.practicalPage('accommodation') },
                    { label: 'Newsletter', href: paths.newsletter },
                ],
            },
            {
                title: 'Kontakt',
                links: [
                    { label: 'post@kumano-kodo.example' },
                    { label: 'Antwort meist innerhalb einer Woche' },
                    { label: 'Mitgewandert? Anmelden', href: paths.login },
                ],
            },
        ],
        copyright: '© 2024 Kumano Kodo Wandertagebuch',
        legal: [
            { label: 'Impressum', href: paths.legal('imprint') },
            { label: 'Datenschutz', href: paths.legal('privacy') },
            { label: 'Barrierefreiheit', href: paths.legal('accessibility') },
        ],
    };

    const routeMenu = {
        kind: 'mega' as const,
        columns: [
            {
                title: 'Tage',
                links: [1, 2, 3, 4].map((n) => ({
                    label: `Tag ${n} · ${['Takijiri → Takahara', 'Takahara → Chikatsuyu', 'Chikatsuyu → Hongu', 'Yunomine → Nachi'][n - 1]}`,
                    href: paths.day(n),
                })),
            },
            {
                title: 'Orte',
                links: [
                    { label: places[2].title, href: paths.place('chikatsuyu') },
                    { label: places[1].title, href: paths.place('yunomine') },
                    { label: places[0].title, href: paths.place('nachi') },
                ],
            },
        ],
        text: {
            title: 'Der Nakahechi',
            html: '<p>Die alte Kaiserroute von Tanabe zu den drei großen Schreinen von Kumano. Wir sind sie im April in vier Tagen gegangen, von Takijiri bis Nachi.</p>',
        },
        teaser: {
            image: stages[2].image,
            title: stages[2].title,
            subtitle: stages[2].stats,
            meta: '22. April · 07:18–16:05',
            badge: 'Längster Tag',
            href: paths.day(3),
        },
        overview: { label: 'Alles zur Route', href: paths.route },
    };
    const practicalMenu = {
        kind: 'dropdown' as const,
        links: [
            { label: 'Alles Praktische', href: paths.practical },
            { label: 'Anreise und Busse', href: paths.practicalPage('getting-there') },
            { label: 'Unterkunft', href: paths.practicalPage('accommodation') },
            { label: 'Wegmarken und Sicherheit', href: paths.practicalPage('trail-markers') },
            { label: 'Karten und Fahrpläne', href: paths.practicalPage('maps') },
            { label: 'Newsletter', href: paths.newsletter },
        ],
    };

    const kumano = {
        nav: [
            { label: 'Die Route', href: paths.route, active: true, menu: routeMenu },
            { label: 'Praktisches', href: paths.practical, menu: practicalMenu },
            { label: 'Fotos', href: paths.photos },
        ],
        hero: {
            image: p['sea-of-clouds'],
            eyebrow: 'Kii-Halbinsel · Wakayama · April 2024',
            title: 'Vier Tage durch\nden Zedernnebel',
            teaser: 'Der Kumano Kodo ist kein einzelner Fernwanderweg, sondern ein Netz alter Pilgerpfade zu drei Schreinen. Wir sind im April den Nakahechi gegangen, von Takijiri bis Nachi, in vier Tagen.',
            actions: [
                { label: 'Zu den Tagen', href: '#stages' },
                { label: 'Praktische Fragen', href: '#faq' },
            ],
            stats: [
                { label: 'Zu Fuß', value: '68 km' },
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
            { value: '68', label: 'Kilometer zu Fuß' },
            { value: '4', label: 'Tage, Takijiri bis Nachi' },
            { value: '27', label: 'Fotos' },
            { value: '1', label: 'Landkrabbe auf dem Weg' },
        ],
        days: [
            {
                date: 'Tag 1 · 20. April',
                route: 'Takijiri → Takahara',
                description: 'Um Viertel vor vier auf dem Weg. 3,7 km, fast alles bergauf, zu einem Dorf über dem Tal.',
                time: 'ab 15:40',
            },
            {
                date: 'Tag 2 · 21. April',
                route: 'Takahara → Chikatsuyu',
                description:
                    'Um sieben Wolken im Tal. Steinpflaster, ein Bach, mittags eine Landkrabbe, um 17:28 das Laternentor von Chikatsuyu.',
                time: '07:02–17:28',
            },
            {
                date: 'Tag 3 · 22. April',
                route: 'Chikatsuyu → Hongu → Yunomine',
                description:
                    'Der längste Tag, rund 25 Kilometer durch die Zedern nach Hongu und weiter nach Yunomine. Um vier ein Außenbad.',
                time: '07:18–16:05',
            },
            {
                date: 'Tag 4 · 23. April',
                route: 'Yunomine → Nachi',
                description:
                    'Über den Kogumotori-goe und den Ogumotori-goe nach Nachi zur Pagode vor dem Wasserfall. In Katsuura eine Fähre zum Ryokan.',
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
                { name: 'Hongu', x: 610, y: 70, labelY: 52, boundary: true },
                { name: 'Koguchi', x: 800, y: 120, labelY: 102 },
                { name: 'Nachi', x: 960, y: 86, labelY: 68, anchor: 'end' as const },
            ],
            days: [
                { label: 'Tag 1 · 3,7 km', x: 145 },
                { label: 'Tag 2 · 9,8 km', x: 340 },
                { label: 'Tag 3 · 25 km', x: 520 },
                { label: 'Tag 4 · 13 km', x: 705 },
                { label: 'Tag 4 · 14,5 km', x: 880 },
            ],
            legend: { walked: 'Gegangener Abschnitt', end: 'Ende der Wanderung', boundary: 'Tagesgrenze mit Übernachtung' },
        },
        places,
        faq: [
            {
                question: 'Muss ich die Unterkünfte im Voraus buchen?',
                answer: 'Ja, und früh. Takahara und Chikatsuyu haben je eine Handvoll Minshuku, und im Frühling und Herbst sind sie Monate vorher voll. Der Reservierungsdienst des Tourismusbüros in Tanabe bucht auf Englisch.',
                open: true,
            },
            {
                question: 'Mit wie viel Regen muss man rechnen?',
                answer: 'Die Kii-Halbinsel gehört zu den regenreichsten Gegenden Japans. Wasserdichte Schuhe und Gamaschen helfen weniger als erhofft; trockene Wechselkleidung in einem dichten Beutel hilft mehr.',
            },
            {
                question: 'Kommt man mit dem Bus voran?',
                answer: 'Ja. Busse verbinden die Orte entlang der Route mehrmals am Tag. So lässt sich ein Tag verkürzen oder man kommt zum Start zurück.',
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
        href: stages[i].href,
    });

    const guide = {
        topbar: {
            label: 'Wegzustand:',
            value: 'Alle Nakahechi-Abschnitte offen · Stand April 2024',
            phone: '+81 00 0000 0000',
            email: 'post@kumano-kodo.example',
        },
        nav: kumano.nav,
        routes: [
            { image: p['stone-path-walkers'], title: 'Nakahechi', meta: 'Vier Tage zu Fuß · dieses Tagebuch', href: paths.route },
            { image: p['walker-in-mist'], title: 'Tag 3', meta: 'Chikatsuyu → Hongu · der längste Tag', href: paths.day(3) },
            { image: p['cedar-canopy'], title: 'Kohechi', meta: 'Koyasan → Hongu · beim nächsten Mal', href: paths.kohechi },
        ],
        facts: [
            { icon: 'clock' as const, label: 'Wann', value: '20. bis 23. April', note: 'Vier Tage zu Fuß' },
            { icon: 'map-pin' as const, label: 'Start', value: 'Takijiri', note: 'Um 15:40 auf dem Weg' },
            { icon: 'home' as const, label: 'Übernachtung', value: 'Minshuku und Ryokan', note: 'Monate vorher gebucht' },
            { icon: 'file' as const, label: 'Zu Fuß', value: 'Rund 68 km', note: 'Takijiri bis Nachi' },
        ],
        entries: [
            stageEntry(0, '20. April · ab 15:40'),
            stageEntry(1, '21. April · 07:02–17:28'),
            stageEntry(2, '22. April · 07:18–16:05', 'Längster Tag'),
            stageEntry(4, '23. April · 10:55–15:48'),
            {
                image: p['chikatsuyu-gate'],
                title: places[2].title,
                subtitle: 'Laternentor',
                meta: '21. April · 17:28',
                href: paths.place('chikatsuyu'),
            },
            {
                image: p['outdoor-bath'],
                title: places[1].title,
                subtitle: 'Außenbad',
                meta: '22. April · 16:05',
                href: paths.place('yunomine'),
            },
            {
                image: p['nachi-pagoda'],
                title: 'Nachi',
                subtitle: 'Pagode und Wasserfall',
                meta: '23. April · 12:31',
                href: paths.place('nachi'),
            },
            { image: p['ryokan-room'], title: 'Katsuura', subtitle: 'Ryokan am Hafen', meta: '23. April · 15:48', href: paths.day(4) },
        ],
        prep: [
            {
                title: 'Unterkunft buchen',
                text: 'Takahara und Chikatsuyu haben je eine Handvoll Minshuku, und im Frühling und Herbst sind sie Monate vorher voll.',
                variant: 'featured' as const,
                href: paths.practicalPage('accommodation'),
            },
            {
                title: 'Für Regen packen',
                text: 'Trockene Wechselkleidung in einem dichten Beutel hilft mehr als Gamaschen.',
                href: paths.practicalPage('trail-markers'),
            },
            {
                title: 'Gepäck vorausschicken',
                text: 'Das Gepäck reist zwischen den größeren Orten, einen Tag vorher über das Tourismusbüro in Tanabe gebucht.',
                href: paths.practicalPage('getting-there'),
            },
        ],
        tiles: [
            { title: 'Anreise und Busse', icon: 'map-pin' as const, href: paths.practicalPage('getting-there') },
            { title: 'Unterkunft', icon: 'home' as const, href: paths.practicalPage('accommodation') },
            { title: 'Wegmarken und Sicherheit', icon: 'alert' as const, href: paths.practicalPage('trail-markers') },
            { title: 'Karten und Fahrpläne', icon: 'download' as const, href: paths.practicalPage('maps') },
        ],
        hosts: [
            { image: p['ryokan-room'], name: 'Ryokan in Katsuura', role: 'Die Nacht nach Nachi', focus: '„Abendessen gibt es um sechs.“' },
        ],
        footer: {
            ...footer,
            notice: { title: 'Wegzustand:', text: 'Nach starkem Regen vor dem Aufbruch die Hinweise des Tourismusbüros prüfen.' },
        },
    };

    const richTextSample =
        '<h2>Der Tag nach Chikatsuyu</h2>' +
        '<p>9,8 km von Takahara nach Chikatsuyu. Um sieben lagen die Wolken im Tal unter dem Dorf. Das Steinpflaster hält bei Nässe, die Wurzeln dazwischen nicht. Wenn der Tag früher enden muss, fahren Busse an der <a href="/practical/getting-there">Hauptstraße</a>.</p>' +
        '<ul><li>07:02 · Takahara: Wolken unter dem Dorf</li><li>09:05 · Steinpflaster zwischen den Zedern</li><li>12:03 · eine Landkrabbe auf dem Weg</li><li>17:28 · das Laternentor von Chikatsuyu</li></ul>' +
        '<h3>Wo übernachten</h3><p>Chikatsuyu hat eine Handvoll Minshuku am Fluss. Für Frühling und Herbst Monate vorher buchen.</p>' +
        '<ol><li>Beim <a href="https://www.tb-kumano.jp/en/">Tourismusbüro Tanabe</a> anfragen</li><li>Die Check-in-Zeit notieren</li><li>Das Gepäck vorausschicken</li></ol>';

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
        stages: { eyebrow: 'Tage', title: 'Vier Tage, Takijiri bis Nachi' },
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
            lede: 'Vier Tage zu Fuß von Takijiri nach Nachi, durch die Zedern der Kii-Halbinsel. Siebenundzwanzig Fotos, in der Reihenfolge, in der sie entstanden sind.',
            chapters: [
                'Um zwanzig vor vier standen wir am Fluss in Takijiri, eine Viertelstunde später auf dem Weg. Die erste Stunde macht keine Umstände: Stufen, Wurzeln, noch mehr Stufen.',
                'Der Morgen begann über den Wolken und endete an einem Tor aus Papierlaternen. Dazwischen Steinpflaster, das auch nass griffig bleibt, ein Bach unter den Zedern und eine leuchtend orange Krabbe, die für die Kamera stillhielt.',
                'Der längste Tag. Von Chikatsuyu durch die Zedern und an einem kleinen Oji-Schrein vorbei nach Hongu, dann weiter nach Yunomine. Um vier saßen wir in einem Steinbecken unter einem Holzdach.',
                'Über den Kogumotori-goe und den Ogumotori-goe nach Nachi, wo die Pagode vor dem Wasserfall steht. In Katsuura brachte uns eine Fähre über den Hafen zu einem Ryokan mit Blick aufs Wasser.',
            ],
            coda: 'Zwei Tage später, der letzte Abend. Für zwanzig Minuten kam das Licht heraus.',
            mapTitle: 'Wo es langging',
            practicalTitle: 'Wer hinfährt',
            allPhotos: '27 Fotos',
        },
    };

    const pages = {
        start: {
            title: 'Der Nakahechi in vier Tagen',
            text: 'Zu Fuß von Takijiri nach Nachi, 20. bis 23. April 2024: die Tage, die Orte, die einen Umweg lohnen, und was wir gern vor dem Aufbruch gewusst hätten.',
            action: 'Zu den Tagen',
            panelTitle: 'Wege, ihn zu gehen',
            panelMore: 'Alle Tage und Orte',
            factsLabel: 'Auf einen Blick',
            stages: { eyebrow: 'Tage', title: 'Vier Tage, Takijiri bis Nachi' },
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
                {
                    title: 'Etappenkarte Takahara → Chikatsuyu',
                    meta: 'PDF · 122 KB',
                    href: '/files/downloads/stage-map-takahara-chikatsuyu-de.pdf',
                },
                { title: 'Anreise und Busse', meta: 'PDF · 58 KB', href: '/files/downloads/getting-there-and-buses-de.pdf' },
                { title: 'Packliste für Regen', meta: 'PDF · 81 KB', href: '/files/downloads/packing-list-for-rain-de.pdf' },
            ],
            factsTitle: 'Der Tag in Zahlen',
            facts: [
                { label: 'Tag', value: 'Tag 2 · 21. April' },
                { label: 'Strecke', value: '9,8 km' },
                { label: 'Fotos', value: '07:02–17:28' },
            ],
            info: {
                title: 'Zu lang?',
                text: 'An der Hauptstraße zwischen Takahara und Chikatsuyu fahren Busse, der Tag kann also früher enden.',
                links: [
                    { label: 'Anreise und Busse', href: paths.practicalPage('getting-there') },
                    { label: 'Chikatsuyu', href: paths.place('chikatsuyu') },
                ],
            },
            back: 'Alle Tage',
            along: 'Entlang der Route',
            subNavTitle: 'Die Route',
        },
    };

    const site = {
        home: 'Start',
        route: { title: 'Die Route', lede: pages.start.text },
        days: {
            title: 'Tage und Orte',
            intro: 'Die vier Tage der Reihe nach, dann die Orte, an denen wir Halt gemacht und übernachtet haben.',
            groups: { days: 'Tage', places: 'Orte', stays: 'Unterkünfte' },
        },
        day: {
            label: 'Tag',
            previous: 'Vorheriger Tag',
            next: 'Nächster Tag',
            photos: 'Der Tag in Fotos',
            factsTitle: 'Der Tag in Zahlen',
            facts: { date: 'Datum', route: 'Route', distance: 'Zu Fuß', photos: 'Fotos' },
            distances: ['3,7 km', '9,8 km', 'rund 25 km', 'rund 27,5 km'],
            tipTitle: 'Tipp für diesen Tag',
            tips: [
                'Früh genug losgehen, um Takahara bei Tageslicht zu erreichen; die erste Stunde ist steil, und dazwischen gibt es nichts.',
                'Das Steinpflaster ist bei Nässe sicher, die Wurzeln dazwischen nicht. Auf den Steinen gehen.',
                'Es ist der längste Tag. Die Orte an der Straße haben Automaten, keine Läden.',
                'Die beiden Pässe ergeben einen langen Tag. Vor dem Aufbruch den letzten Bus ab Nachi prüfen.',
            ],
        },
        places: {
            chikatsuyu: {
                title: 'Chikatsuyu',
                text: [
                    'Ein Dorf am Fluss, auf halbem Weg zwischen Takijiri und Hongu. Die meisten übernachten hier nach Tag zwei, und die meisten Minshuku stehen am Fluss.',
                    'Das Laternentor am Ortsrand ist kaum zu übersehen. Die mittlere Laterne zeigt die dreibeinige Krähe, die Botin der Kumano-Gottheiten.',
                ],
                photos: ['vending-machines', 'chikatsuyu-gate', 'morning-bus'] as const,
                day: 2,
            },
            yunomine: {
                title: 'Yunomine Onsen',
                text: [
                    'Eine der ältesten heißen Quellen Japans, ein kurzes Stück von Hongu entfernt. Die Badehäuser stehen an einem Bach in einem engen Tal.',
                    'Ende April hingen zum Kindertag Karpfenfahnen quer über dem Bach. Vor dem Abendessen saßen wir in einem Außenbad unter einem Holzdach.',
                ],
                photos: ['yunomine-street', 'river-bridge', 'outdoor-bath'] as const,
                day: 3,
            },
            nachi: {
                title: 'Nachi',
                text: [
                    'Das Ende der Wanderung: die dreistöckige Pagode des Seiganto-ji vor dem Nachi-Fall, daneben der Schrein Kumano Nachi Taisha.',
                    'Von Nachi fahren Busse an die Küste. In Katsuura fährt eine Fähre über den Hafen zum Ryokan.',
                ],
                photos: ['nachi-pagoda', 'harbour-ferry', 'ryokan-room'] as const,
                day: 4,
            },
        },
        practical: {
            title: 'Praktisches',
            intro: 'Was wir allen sagen würden, die den Nakahechi planen: Anreise, Unterkunft, Wegmarkierung und welche Karten man mitnehmen sollte.',
            pages: {
                'getting-there': {
                    title: 'Anreise und Busse',
                    text: [
                        'Takijiri erreicht man mit dem Bus ab dem Bahnhof Kii-Tanabe, der an der JR-Strecke von Osaka liegt. Die Fahrt dauert etwa vierzig Minuten.',
                        'Entlang der Route verbinden Busse die Orte mehrmals am Tag. So lässt sich ein Tag verkürzen, und man kommt von Hongu oder Nachi zurück an die Küste.',
                        'Gepäck lässt sich zwischen den größeren Orten vorausschicken. Gebucht wird es einen Tag vorher über das Tourismusbüro in Tanabe.',
                    ],
                },
                accommodation: {
                    title: 'Unterkunft',
                    text: [
                        'Am Nakahechi schläft man in Minshuku, kleinen Familienpensionen. Abendessen und Frühstück sind meist dabei, und das Abendessen ist früh.',
                        'Takahara und Chikatsuyu haben nur eine Handvoll davon. Im Frühling und Herbst sind sie Monate vorher voll, also am besten die ganze Wanderung auf einmal buchen.',
                        'Das Tourismusbüro in Tanabe betreibt einen Reservierungsdienst auf Englisch, der die ganze Route bucht.',
                    ],
                },
                'trail-markers': {
                    title: 'Wegmarken und Sicherheit',
                    text: [
                        'Der Nakahechi ist mit nummerierten Holzpfosten im Abstand von einigen hundert Metern markiert. Die Nummern helfen, wenn man jemandem sagen muss, wo man ist.',
                        'Wasser und Essen für den ganzen Tag mitnehmen; zwischen den Orten gibt es nichts zu kaufen.',
                        'Nach starkem Regen können Teile des Weges gesperrt sein. Vor dem Aufbruch die Hinweise des Tourismusbüros prüfen.',
                    ],
                },
                maps: {
                    title: 'Karten und Fahrpläne',
                    text: [
                        'Zum Navigieren die Wegekarte des Tourismusbüros mitnehmen. Die Karte auf dieser Seite ist schematisch.',
                        'Die Busfahrpläne ändern sich mit der Saison. Für den Wandertag prüfen, besonders den letzten Bus ab Nachi.',
                    ],
                },
            },
        },
        photos: { title: 'Fotos', intro: 'Alle siebenundzwanzig Fotos, Tag für Tag, in der Reihenfolge, in der sie entstanden sind.' },
        newsletter: { title: 'Newsletter', intro: home.newsletter.text },
        kohechi: {
            title: 'Kohechi',
            text: [
                'Der Kohechi ist die Bergroute von Koyasan nach Hongu, kürzer als der Nakahechi, aber mit drei hohen Pässen.',
                'Wir sind ihn noch nicht gegangen. Er ist die nächste Route auf der Liste und erscheint hier, sobald er beschrieben ist.',
            ],
        },
        legal: {
            imprint: { title: 'Impressum', text: ['Beispieltext des Designsystems. Hier steht das Impressum der echten Seite.'] },
            privacy: {
                title: 'Datenschutz',
                text: ['Beispieltext des Designsystems. Hier steht die Datenschutzerklärung der echten Seite.'],
            },
            accessibility: {
                title: 'Barrierefreiheit',
                text: ['Beispieltext des Designsystems. Hier steht die Erklärung zur Barrierefreiheit der echten Seite.'],
            },
        },
    };

    const samples = {
        textarea: { label: 'Nachricht', placeholder: 'Ihre Frage zur Route' },
        search: 'Suche',
        galleryCaption: 'Tag 3, 22. April: von Chikatsuyu bis zum Bad in Yunomine.',
        table: {
            caption: 'Die Tage im Überblick',
            head: ['Tag', 'Route', 'Zu Fuß', 'Fotos'],
            rows: [
                ['20. April', 'Takijiri → Takahara', '3,7 km', 'ab 15:40'],
                ['21. April', 'Takahara → Chikatsuyu', '9,8 km', '07:02–17:28'],
                ['22. April', 'Chikatsuyu → Hongu → Yunomine', 'rund 25 km', '07:18–16:05'],
                ['23. April', 'Yunomine → Nachi', 'rund 27,5 km', '10:55–15:48'],
            ],
        },
    };

    return { ui, kumano, guide, richTextSample, home, pages, site, samples };
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
        'roadside-markers': { alt: 'Hölzerne Wegmarken an einer ruhigen Straße unter jungen Bäumen', place: '' },
        'stone-path-walkers': {
            alt: 'Zwei Wandernde in Regenkleidung auf einem gepflasterten Weg zwischen hohen Zedern',
            place: 'Nakahechi',
        },
        'forest-stream': { alt: 'Ein Bach im Zedernwald, über den ein schmaler Holzsteg führt', place: 'Nakahechi' },
        'land-crab': { alt: 'Eine orange Landkrabbe auf nassen Steinen und Zedernnadeln', place: 'Nakahechi' },
        'vending-machines': { alt: 'Getränkeautomaten unter einem Dach neben einer Eiswaffel-Figur, karierter Boden', place: 'Chikatsuyu' },
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
        'fern-frond': { alt: 'Nahaufnahme eines sich entrollenden Farnwedels', place: '' },
        'yunomine-street': { alt: 'Eine schmale Dorfstraße an einem Bach, Karpfenfahnen hängen quer darüber', place: 'Yunomine' },
        'river-bridge': { alt: 'Ein breites Flussbett mit einer Hängebrücke, im Vordergrund Azaleen', place: '' },
        'outdoor-bath': { alt: 'Ein steingefasstes Außenbad unter einem Holzdach, ringsum Grün', place: 'Yunomine' },
        'seaside-station': { alt: 'Ein kleiner Bahnsteig an der Küste im Regen, hinter dem Zaun das Meer', place: '' },
        'nachi-pagoda': { alt: 'Eine rote dreistöckige Pagode vor einem hohen Wasserfall im Nebel', place: 'Nachi' },
        'harbour-ferry': { alt: 'Eine bunt bemalte Fähre überquert einen grauen Hafen', place: 'Katsuura' },
        'ryokan-room': { alt: 'Ein Tatami-Zimmer mit niedrigem Tisch, das Fenster geht aufs Wasser', place: 'Katsuura' },
        'evening-rooftops': { alt: 'Ziegeldächer einer kleinen Stadt im Abendlicht, am Horizont Berge', place: '' },
    },
    build,
};
