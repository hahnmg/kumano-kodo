import type { LocaleModule, Photos } from '../templates/content';
import type { LocaleContent } from './en';
import { paths } from './paths';

const build = (p: Photos): LocaleContent => {
    const ui = {
        mainNav: 'メインナビゲーション',
        language: '言語',
        menu: 'メニュー',
        darkMode: 'ダークモード',
        backToTop: 'ページの先頭へ',
        skipToContent: '本文へ移動',
        uploadDrop: 'ここにファイルをドラッグするか',
        uploadChoose: '選択',
        formSteps: 'ステップ',
        newsAll: 'すべての記録',
        newsPrevious: '前の記録',
        newsNext: '次の記録',
        newsPhotos: 'この記録の写真',
        newsDate: '日付',
        newsCategory: 'カテゴリー',
        newsTags: 'タグ',
        newsPages: 'ページ',
        newsPreviousPage: '前のページ',
        newsNextPage: '次のページ',
        // ICU pattern of the long date, as Intl writes it in the stories.
        newsDatePattern: 'y年M月d日',
        newsListSeparator: '、',
        trailStatus: '道の状況と連絡先',
        inSection: 'このセクション',
        breadcrumb: 'パンくずリスト',
        pages: 'ページ',
        previousPage: '前のページ',
        nextPage: '次のページ',
        previous: '前へ',
        next: '次へ',
        close: '閉じる',
        card: 'カード',
        readMore: '続きを読む',
        emailAddress: 'メールアドレス',
        emailPlaceholder: 'name@example.jp',
        consent: 'ニュースレターの受信を希望し、プライバシーポリシーを読みました。',
        subscribe: '登録する',
        search: '検索',
        searchPlaceholder: '日程・場所・ヒントを検索',
        searchSummary: '「%2$s」の検索結果 %1$s 件',
        searchSummaryOne: '「%1$s」の検索結果 1 件',
        searchEmpty: '「%1$s」に一致する結果はありません。本宮など、場所や日程で検索してください。',
        searchResults: '検索結果',
        logIn: 'ログイン',
        username: 'ユーザー名',
        password: 'パスワード',
        stayLoggedIn: 'ログインしたままにする',
        forgotPassword: 'パスワードをお忘れですか？',
        loginFailed: 'ログインできませんでした',
        loginFailedText: 'ユーザー名またはパスワードが正しくありません。',
        loggedInAs: '%1$s としてログイン中',
        logOut: 'ログアウト',
        demoAccess: 'デモ用アカウント',
        demoAccessText: 'ユーザー名 %1$s・パスワード %2$s',
        notFoundTitle: 'ページが見つかりません',
        notFoundText:
            'この道は地図に載っていません。ページが移動したか、アドレスが間違っている可能性があります。上の検索を使うか、ここからもう一度始めてください。',
        papersTitle: '旅の資料',
        papersText:
            'おかえりなさい。私たちの旅の資料はこちらです。区間地図、アクセス、雨の日の持ち物リスト。下の各日から、それぞれの行程に戻れます。',
        papersLink: 'あなたの旅の資料',
        requiredNote: '* の項目は必須です。',
        fieldRequired: 'この項目を入力してください。',
        emailInvalid: '有効なメールアドレスを入力してください。',
        send: '送信',
        formSent: '送信しました',
        formSentText: 'ありがとうございます。メッセージを受け取りました。',
        name: '名前',
        topic: 'テーマ',
        message: 'メッセージ',
        contactConsent: 'メッセージへの返信のために入力内容が使われることに同意します。',
    };

    const stages = [
        {
            image: p['signpost'],
            stage: '1日目',
            stats: '3.7 km',
            title: '滝尻 → 高原',
            description: '15時45分に歩き始めた。最初の一時間はひたすら登り。',
            href: paths.day(1),
        },
        {
            image: p['stone-path-walkers'],
            stage: '2日目',
            stats: '9.8 km',
            title: '高原 → 近露',
            description: '朝7時は集落の下に雲、石畳、沢、17時半に近露の提灯の門。',
            href: paths.day(2),
        },
        {
            image: p['walker-in-mist'],
            stage: '3日目',
            stats: '約25 km',
            title: '近露 → 本宮',
            description: 'いちばん長い日。杉林を抜け、小さな王子の社を過ぎて、湯の峰で泊まった。',
            href: paths.day(3),
        },
        {
            image: p['fern-frond'],
            stage: '4日目',
            stats: '約13 km',
            title: '小雲取越',
            description: '温泉から、海へ向かう二つの峠のうち最初の峠へ。',
            href: paths.day(4),
        },
        {
            image: p['nachi-pagoda'],
            stage: '4日目',
            stats: '約14.5 km',
            title: '大雲取越 → 那智',
            description: '二つ目の峠を越え、最後は滝の前に立つ三重塔。',
            href: paths.day(4),
        },
    ];

    const places = [
        {
            image: p['nachi-pagoda'],
            title: '青岸渡寺と那智の滝',
            description: '滝の前に立つ三重塔、この旅の終点。雨が降り、滝は数分ごとに霧に消えた。',
            variant: 'featured' as const,
        },
        {
            image: p['yunomine-street'],
            title: '湯の峰温泉',
            description: '狭い谷の沢沿いに湯屋が並ぶ。こどもの日を前に、鯉のぼりが川をまたいで泳いでいた。',
        },
        {
            image: p['chikatsuyu-gate'],
            title: '近露',
            description: '集落の入口にある提灯の門。真ん中の提灯には三本足の烏。二日目の終わり。',
            variant: 'ruled' as const,
        },
    ];

    const footer = {
        wordmark: 'Kumano Kodo',
        about: '個人の山歩き日記です。写真は2024年4月20日から25日に撮影。情報の正確さは保証しません。',
        columns: [
            {
                title: 'ルート',
                links: [
                    { label: '中辺路', href: paths.route },
                    { label: '小辺路', href: paths.kohechi },
                    { label: 'ルートマップ', href: paths.map },
                ],
            },
            {
                title: '実用情報',
                links: [
                    { label: 'アクセスとバス', href: paths.practicalPage('getting-there') },
                    { label: '宿泊', href: paths.practicalPage('accommodation') },
                    { label: 'ニュースレター', href: paths.newsletter },
                ],
            },
            {
                title: 'お問い合わせ',
                links: [
                    { label: 'post@kumano-kodo.example' },
                    { label: '通常一週間以内に返信します' },
                    { label: 'フォームから連絡する', href: paths.contact },
                    { label: '一緒に歩いた方はログイン', href: paths.login },
                ],
            },
        ],
        copyright: '© 2024 熊野古道 山歩き日記',
        legal: [
            { label: '運営者情報', href: paths.legal('imprint') },
            { label: 'プライバシー', href: paths.legal('privacy') },
            { label: 'アクセシビリティ', href: paths.legal('accessibility') },
        ],
    };

    const routeMenu = {
        kind: 'mega' as const,
        columns: [
            {
                title: '日程',
                links: [
                    ...[1, 2, 3, 4].map((n) => ({
                        label: `${n}日目 · ${['滝尻 → 高原', '高原 → 近露', '近露 → 本宮', '湯の峰 → 那智'][n - 1]}`,
                        href: paths.day(n),
                    })),
                    { label: '4日間を一覧で見る', href: paths.glance },
                ],
            },
            {
                title: '見どころ',
                links: [
                    { label: places[2].title, href: paths.place('chikatsuyu') },
                    { label: places[1].title, href: paths.place('yunomine') },
                    { label: places[0].title, href: paths.place('nachi') },
                ],
            },
        ],
        text: {
            title: '中辺路',
            html: '<p>田辺から熊野三山へ向かう、かつての御幸道。4月に滝尻から那智まで、四日間で歩いた。</p>',
        },
        teaser: {
            image: stages[2].image,
            title: stages[2].title,
            subtitle: stages[2].stats,
            meta: '4月22日 · 07:18–16:05',
            badge: 'いちばん長い日',
            href: paths.day(3),
        },
        overview: { label: 'ルートのすべて', href: paths.route },
    };
    const practicalMenu = {
        kind: 'dropdown' as const,
        links: [
            { label: '実用情報のすべて', href: paths.practical },
            { label: 'アクセスとバス', href: paths.practicalPage('getting-there') },
            { label: '宿泊', href: paths.practicalPage('accommodation') },
            { label: '道標と安全', href: paths.practicalPage('trail-markers') },
            { label: '地図と時刻表', href: paths.practicalPage('maps') },
            { label: 'ルートと宿の人々', href: paths.ways },
            { label: 'ウォークの申し込み', href: paths.register },
            { label: 'ニュースレター', href: paths.newsletter },
        ],
    };

    const kumano = {
        nav: [
            { label: 'ルート', href: paths.route, active: true, menu: routeMenu },
            { label: '実用情報', href: paths.practical, menu: practicalMenu },
            { label: '写真', href: paths.photos },
            { label: '道中記', href: paths.reports },
        ],
        hero: {
            image: p['sea-of-clouds'],
            eyebrow: '紀伊半島 · 和歌山 · 2024年4月',
            title: '杉の霧のなかを\n歩いた四日間',
            teaser: '熊野古道は一本の長距離トレイルではなく、三つの神社へ向かう古い参詣道の網です。4月、滝尻から那智まで、四日間で中辺路を歩きました。',
            actions: [
                { label: '日程を見る', href: '#stages' },
                { label: 'よくある質問', href: '#faq' },
            ],
            stats: [
                { label: '徒歩', value: '68 km' },
                { label: '日数', value: '4日' },
                { label: '写真', value: '27' },
                { label: '月', value: '4月' },
            ],
        },
        intro: [
            '滝尻から本宮まで、道は標高700メートルにも満たない峠を越えていくのに、どこか人里離れた感じがする。森は植林された杉が密に並び、霧が立ち込めると二十メートル先も見えない。',
            '道中では王子を通り過ぎる。かつて参詣者が祈った道端の小さな社だ。たいていは空き地と石と木の鳥居だけで、足元ばかり見ていると見落としてしまう。',
        ],
        stats: [
            { value: '68', label: '歩いたキロ数' },
            { value: '4', label: '日間、滝尻から那智まで' },
            { value: '27', label: '枚の写真' },
            { value: '1', label: '道で出会ったカニ' },
        ],
        days: [
            {
                date: '1日目 · 4月20日',
                route: '滝尻 → 高原',
                description: '15時45分に歩き始めた。3.7 km、ほとんど登りで、谷を見下ろす集落へ。',
                time: '15:40から',
            },
            {
                date: '2日目 · 4月21日',
                route: '高原 → 近露',
                description: '朝7時、谷に雲。石畳、沢、昼にカニ、17時28分に近露の提灯の門。',
                time: '07:02–17:28',
            },
            {
                date: '3日目 · 4月22日',
                route: '近露 → 本宮 → 湯の峰',
                description: 'いちばん長い日。杉林を約25キロ歩いて本宮へ、さらに湯の峰へ。4時に露天風呂。',
                time: '07:18–16:05',
            },
            {
                date: '4日目 · 4月23日',
                route: '湯の峰 → 那智',
                description: '小雲取越と大雲取越を越えて那智へ、滝の前の三重塔。勝浦から船で旅館へ。',
                time: '10:55–15:48',
            },
        ],
        stages,
        route: {
            label: '六つの地点を結ぶルートの概略図',
            path: 'M40 200 C 140 190, 170 110, 250 100 S 360 160, 430 140 C 500 120, 520 60, 610 70 S 730 150, 800 120 C 870 90, 920 110, 960 86',
            stations: [
                { name: '滝尻', x: 40, y: 200, labelY: 228, anchor: 'start' as const },
                { name: '高原', x: 250, y: 100, labelY: 82, boundary: true },
                { name: '近露', x: 430, y: 140, labelY: 122, boundary: true },
                { name: '本宮', x: 610, y: 70, labelY: 52, boundary: true },
                { name: '小口', x: 800, y: 120, labelY: 102 },
                { name: '那智', x: 960, y: 86, labelY: 68, anchor: 'end' as const },
            ],
            days: [
                { label: '1日目 · 3.7 km', x: 145 },
                { label: '2日目 · 9.8 km', x: 340 },
                { label: '3日目 · 25 km', x: 520 },
                { label: '4日目 · 13 km', x: 705 },
                { label: '4日目 · 14.5 km', x: 880 },
            ],
            legend: { walked: '歩いた区間', end: 'ウォークの終点', boundary: '宿泊を伴う日の区切り' },
        },
        places,
        faq: [
            {
                question: '宿は事前に予約が必要ですか？',
                answer: 'はい、早めに。高原と近露には民宿が数軒ずつしかなく、春と秋は数か月前に満室になります。田辺市観光協会の予約サービスは英語でも対応しています。',
                open: true,
            },
            {
                question: '雨はどのくらい降りますか？',
                answer: '紀伊半島は日本でも特に雨の多い地域です。防水の靴やスパッツは思ったほど役に立たず、密封袋に入れた乾いた着替えのほうが助かります。',
            },
            {
                question: 'バスで移動できますか？',
                answer: 'はい。ルート沿いの集落を一日に何本かバスが結んでいるので、一日を短くしたり出発地へ戻ったりしやすいです。',
            },
            {
                question: '荷物の配送はありますか？',
                answer: 'はい、主な集落の間で利用でき、前日までに田辺市観光協会で予約します。',
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
            label: '道の状況：',
            value: '中辺路の全区間通行可 · 2024年4月時点',
            phone: '+81 00 0000 0000',
            email: 'post@kumano-kodo.example',
        },
        nav: kumano.nav,
        routes: [
            { image: p['stone-path-walkers'], title: '中辺路', meta: '徒歩四日間 · この日記', href: paths.route },
            { image: p['walker-in-mist'], title: '3日目', meta: '近露 → 本宮 · いちばん長い日', href: paths.day(3) },
            { image: p['cedar-canopy'], title: '小辺路', meta: '高野山 → 本宮 · 次の機会に', href: paths.kohechi },
        ],
        facts: [
            { icon: 'clock' as const, label: '時期', value: '4月20日〜23日', note: '徒歩四日間' },
            { icon: 'map-pin' as const, label: '出発地', value: '滝尻', note: '15時40分に歩き始め' },
            { icon: 'home' as const, label: '宿泊', value: '民宿と旅館', note: '数か月前に予約' },
            { icon: 'file' as const, label: '徒歩', value: '約68 km', note: '滝尻から那智まで' },
        ],
        entries: [
            stageEntry(0, '4月20日 · 15:40から'),
            stageEntry(1, '4月21日 · 07:02–17:28'),
            stageEntry(2, '4月22日 · 07:18–16:05', 'いちばん長い日'),
            stageEntry(4, '4月23日 · 10:55–15:48'),
            {
                image: p['chikatsuyu-gate'],
                title: places[2].title,
                subtitle: '提灯の門',
                meta: '4月21日 · 17:28',
                href: paths.place('chikatsuyu'),
            },
            {
                image: p['outdoor-bath'],
                title: places[1].title,
                subtitle: '露天風呂',
                meta: '4月22日 · 16:05',
                href: paths.place('yunomine'),
            },
            { image: p['nachi-pagoda'], title: '那智', subtitle: '三重塔と滝', meta: '4月23日 · 12:31', href: paths.place('nachi') },
            { image: p['ryokan-room'], title: '勝浦', subtitle: '港の旅館', meta: '4月23日 · 15:48', href: paths.day(4) },
        ],
        prep: [
            {
                title: '宿を予約する',
                text: '高原と近露には民宿が数軒ずつしかなく、春と秋は数か月前に満室になります。',
                variant: 'featured' as const,
                href: paths.practicalPage('accommodation'),
            },
            {
                title: '雨に備える',
                text: 'スパッツより、密封袋に入れた乾いた着替えが役に立ちます。',
                href: paths.practicalPage('trail-markers'),
            },
            {
                title: '荷物を先に送る',
                text: '主な集落の間で荷物を運んでもらえます。前日までに田辺市観光協会で予約します。',
                href: paths.practicalPage('getting-there'),
            },
        ],
        tiles: [
            { title: 'アクセスとバス', icon: 'map-pin' as const, href: paths.practicalPage('getting-there') },
            { title: '宿泊', icon: 'home' as const, href: paths.practicalPage('accommodation') },
            { title: '道標と安全', icon: 'alert' as const, href: paths.practicalPage('trail-markers') },
            { title: '地図と時刻表', icon: 'download' as const, href: paths.practicalPage('maps') },
        ],
        hosts: [{ image: p['ryokan-room'], name: '勝浦の旅館', role: '那智のあとの夜', focus: '「夕食は六時です。」' }],
        footer: {
            ...footer,
            notice: { title: '道の状況：', text: '大雨のあとは、出発前に観光協会のお知らせを確認してください。' },
        },
    };

    const richTextSample =
        '<h2>近露までの一日</h2>' +
        '<p>高原から近露まで9.8 km。朝7時、集落の下の谷に雲が溜まっていた。石畳は濡れても滑りにくいが、その間の木の根は滑る。早めに切り上げるなら<a href="/practical/getting-there">幹線道路</a>にバスが走っている。</p>' +
        '<ul><li>07:02 · 高原：集落の下の雲</li><li>09:05 · 杉の間の石畳</li><li>12:03 · 道の上のカニ</li><li>17:28 · 近露の提灯の門</li></ul>' +
        '<h3>泊まる場所</h3><p>近露には川沿いに民宿が数軒ある。春と秋は数か月前に予約を。</p>' +
        '<ol><li><a href="https://www.tb-kumano.jp/en/">田辺市熊野ツーリズムビューロー</a>に問い合わせる</li><li>チェックイン時刻を確認する</li><li>荷物を先に送る</li></ol>';

    const home = {
        crow: {
            eyebrow: '八咫烏',
            title: '三本足の烏',
            text: 'ロゴの鳥は八咫烏、熊野の神々の使いです。古い記録によれば、神武天皇を熊野から大和へと山中で導いたとされます。三本の足は天・地・人を表すとよく言われます。道中では神社の幟や熊野牛王宝印の護符に、そして近露の門の真ん中の提灯にも姿を見せます。',
        },
        why: { eyebrow: 'この道を選ぶ理由', title: '千年歩かれてきた道' },
        bridgeCaption: p['forest-stream'].caption ?? '',
        quote: { quote: '「夕食は六時です。お風呂は十一時まで。」', source: '勝浦の旅館、4月23日' },
        days: { title: '四日間の記録', aside: '時刻は計画ではなく、写真から。' },
        stages: { eyebrow: '日程', title: '四日間、滝尻から那智へ' },
        map: {
            eyebrow: 'ルートマップ',
            title: '概略図、縮尺なし',
            aside: '地点の順序と日の区切りは正確だが、形は正確ではない。道案内には観光協会の地図が必要。',
        },
        places: { eyebrow: '道中', title: '寄り道する価値のある三つの場所' },
        roadsideCaption: `${p['land-crab'].caption ?? ''} · ${p['cedar-canopy'].caption ?? ''}`,
        practical: { eyebrow: '実用情報', title: '帰ってから聞かれたこと', intro: 'いちばん多かった四つの質問。' },
        newsletter: {
            title: '新しいルートを書いたときだけ、年に二通のメール',
            text: '次は高野山から本宮へ向かう山道、小辺路です。広告なし、アドレスの共有なし。',
        },
        draft: {
            kicker: '熊野古道 · 中辺路',
            title: '四月の四日間',
            lede: '滝尻から那智まで、紀伊半島の杉林を四日間歩いた。撮った順に並べた二十七枚の写真。',
            chapters: [
                '15時40分に滝尻の川辺に着き、15分後には道の上にいた。最初の一時間は容赦がない。石段、木の根、また石段。',
                '朝は雲の上で始まり、紙の提灯の門で終わった。その間に、濡れても滑りにくい石畳、杉林の沢、そしてカメラの前でじっとしていた鮮やかな橙色のカニ。',
                'いちばん長い日。近露から杉林を抜け、小さな王子の社を過ぎて本宮へ、さらに湯の峰へ。4時には木の屋根の下の石の湯船に浸かっていた。',
                '小雲取越と大雲取越を越えて那智へ。滝の前に三重塔が立っている。勝浦では港を渡る船で、海の見える旅館へ向かった。',
            ],
            coda: '二日後、最後の夕方。二十分だけ光が差した。',
            mapTitle: '歩いた道',
            practicalTitle: '行く人へ',
            allPhotos: '写真27枚',
        },
    };

    const pages = {
        start: {
            title: '四日間の中辺路',
            text: '2024年4月20日〜23日、滝尻から那智まで徒歩で。日ごとの記録、寄り道する価値のある場所、出発前に知っておきたかったこと。',
            action: '日程を見る',
            panelTitle: '歩き方',
            panelMore: 'すべての日程と見どころ',
            factsLabel: 'ひと目でわかる',
            stages: { eyebrow: '日程', title: '四日間、滝尻から那智へ' },
            prep: { eyebrow: '実用情報', title: '出発前に' },
            plan: '計画を立てる',
        },
        list: {
            title: '日程と見どころ',
            crumbs: ['ホーム', 'ルート'],
            chips: ['すべて', '日程', '見どころ', '宿'],
            search: { label: '日程と見どころを検索', placeholder: '例：近露' },
            day: { label: '日程', options: ['すべての日', '1日目', '2日目', '3日目', '4日目'] },
            count: '8件',
        },
        detail: {
            crumbs: ['ホーム', 'ルート', '日程'],
            caption: p['misty-valley'].caption ?? '',
            downloads: [
                { title: '区間地図 高原 → 近露', meta: 'PDF · 255 KB', href: '/files/downloads/stage-map-takahara-chikatsuyu-ja.pdf' },
                { title: 'アクセスとバス', meta: 'PDF · 210 KB', href: '/files/downloads/getting-there-and-buses-ja.pdf' },
                { title: '雨の日の持ち物リスト', meta: 'PDF · 202 KB', href: '/files/downloads/packing-list-for-rain-ja.pdf' },
            ],
            factsTitle: 'この日の数字',
            facts: [
                { label: '日程', value: '2日目 · 4月21日' },
                { label: '距離', value: '9.8 km' },
                { label: '撮影', value: '07:02–17:28' },
            ],
            info: {
                title: '長すぎる？',
                text: '高原と近露の間の幹線道路にはバスが走っているので、途中で切り上げられます。',
                links: [
                    { label: 'アクセスとバス', href: paths.practicalPage('getting-there') },
                    { label: '近露', href: paths.place('chikatsuyu') },
                ],
            },
            back: 'すべての日程',
            along: 'ルート沿い',
            subNavTitle: 'ルート',
        },
    };

    const site = {
        glance: { title: '一覧で見る' },
        ways: { title: 'ルートと宿の人々' },
        home: 'ホーム',
        route: { title: 'ルート', lede: pages.start.text },
        days: {
            title: '日程と見どころ',
            intro: '四日間を順番に、そのあと立ち寄った場所と泊まった場所。',
            groups: { days: '日程', places: '見どころ', stays: '宿' },
        },
        day: {
            label: '日目',
            previous: '前の日',
            next: '次の日',
            photos: 'この日の写真',
            factsTitle: 'この日の数字',
            facts: { date: '日付', route: 'ルート', distance: '徒歩', photos: '撮影' },
            distances: ['3.7 km', '9.8 km', '約25 km', '約27.5 km'],
            tipTitle: 'この日のヒント',
            tips: [
                '明るいうちに高原に着けるよう早めに出発を。最初の一時間は急で、途中には何もない。',
                '石畳は濡れても安全だが、その間の木の根は滑る。石の上を歩くこと。',
                'いちばん長い日。道路沿いの集落にあるのは店ではなく自販機。',
                '二つの峠で長い一日になる。出発前に那智発の最終バスを確認すること。',
            ],
        },
        places: {
            chikatsuyu: {
                title: '近露',
                text: [
                    '滝尻と本宮のほぼ中間にある川沿いの集落。二日目の夜はほとんどの人がここに泊まり、民宿の多くは川沿いにある。',
                    '集落の入口の提灯の門は見逃しようがない。真ん中の提灯には熊野の神々の使い、三本足の烏が描かれている。',
                ],
                photos: ['vending-machines', 'chikatsuyu-gate', 'morning-bus'] as const,
                day: 2,
            },
            yunomine: {
                title: '湯の峰温泉',
                text: [
                    '日本最古級の温泉のひとつで、本宮から少し歩いたところにある。狭い谷の沢沿いに湯屋が並ぶ。',
                    '4月の終わり、こどもの日を前に鯉のぼりが沢をまたいでいた。夕食の前に、木の屋根の下の露天風呂に浸かった。',
                ],
                photos: ['yunomine-street', 'river-bridge', 'outdoor-bath'] as const,
                day: 3,
            },
            nachi: {
                title: '那智',
                text: [
                    'ウォークの終点。那智の滝の前に青岸渡寺の三重塔が立ち、その隣に熊野那智大社がある。',
                    '那智からは海沿いへバスが出ている。勝浦では港を渡る船で旅館へ向かう。',
                ],
                photos: ['nachi-pagoda', 'harbour-ferry', 'ryokan-room'] as const,
                day: 4,
            },
        },
        practical: {
            title: '実用情報',
            intro: '中辺路を計画する人に伝えたいこと。アクセス、宿、道標、持っていくべき地図。',
            pages: {
                'getting-there': {
                    title: 'アクセスとバス',
                    text: [
                        '滝尻へは、大阪からのJR線にある紀伊田辺駅からバスで行く。所要時間は約40分。',
                        'ルート沿いの集落は一日に何本かのバスで結ばれている。一日を短くしたり、本宮や那智から海沿いへ戻ったりするのに便利。',
                        '主な集落の間では荷物を先に送れる。前日までに田辺市観光協会で予約する。',
                    ],
                },
                accommodation: {
                    title: '宿泊',
                    text: [
                        '中辺路では、家族経営の小さな宿、民宿に泊まる。夕食と朝食が付くことが多く、夕食は早い。',
                        '高原と近露には数軒しかない。春と秋は数か月前に満室になるので、全行程をまとめて予約するのがよい。',
                        '田辺市観光協会の予約サービスは英語で、ルート全体の宿を予約できる。',
                    ],
                },
                'trail-markers': {
                    title: '道標と安全',
                    text: [
                        '中辺路には数百メートルごとに番号付きの木の道標が立っている。自分の位置を誰かに伝えるときに番号が役に立つ。',
                        '一日分の水と食べ物を持っていくこと。集落の間では何も買えない。',
                        '大雨のあとは道の一部が通行止めになることがある。出発前に観光協会のお知らせを確認すること。',
                    ],
                },
                maps: {
                    title: '地図と時刻表',
                    text: [
                        '道案内には観光協会のルートマップを持っていくこと。このサイトの地図は概略図。',
                        'バスの時刻表は季節で変わる。歩く日の時刻表を、特に那智発の最終バスを確認すること。',
                    ],
                },
            },
        },
        photos: { title: '写真', intro: '二十七枚の写真すべて。日ごとに、撮った順に。' },
        newsletter: { title: 'ニュースレター', intro: home.newsletter.text },
        kohechi: {
            title: '小辺路',
            text: [
                '小辺路は高野山から本宮へ向かう山のルート。中辺路より短いが、高い峠が三つある。',
                'まだ歩いていない。次に歩くルートで、書き上げたらここに載せる。',
            ],
        },
        legal: {
            imprint: { title: '運営者情報', text: ['デザインシステムのサンプルテキストです。実際のサイトの運営者情報がここに入ります。'] },
            privacy: {
                title: 'プライバシー',
                text: ['デザインシステムのサンプルテキストです。実際のサイトのプライバシーポリシーがここに入ります。'],
            },
            accessibility: {
                title: 'アクセシビリティ',
                text: ['デザインシステムのサンプルテキストです。実際のサイトのアクセシビリティ方針がここに入ります。'],
            },
        },
    };

    const samples = {
        textarea: { label: 'メッセージ', placeholder: 'ルートについてのご質問' },
        search: '検索',
        galleryCaption: '3日目、4月22日：近露から湯の峰の湯まで。',
        table: {
            caption: '日程の一覧',
            head: ['日付', 'ルート', '徒歩', '撮影'],
            rows: [
                ['4月20日', '滝尻 → 高原', '3.7 km', '15:40から'],
                ['4月21日', '高原 → 近露', '9.8 km', '07:02–17:28'],
                ['4月22日', '近露 → 本宮 → 湯の峰', '約25 km', '07:18–16:05'],
                ['4月23日', '湯の峰 → 那智', '約27.5 km', '10:55–15:48'],
            ],
        },
    };

    // The demo's form with every EXT:form element type.
    const walkForm = {
        title: 'ウォークの申し込み',
        steps: ['あなたについて', 'ウォークについて', '写真'],
        summaryTitle: '入力内容の確認',
        previous: '戻る',
        next: '次へ',
        submit: '申し込みを送信',
        introTitle: '出発の前に',
        introText: '歩く人、ルート、日程を教えてください。1週間以内にお返事します。',
        name: 'お名前',
        email: 'メールアドレス',
        phone: '電話番号',
        website: 'ブログまたはウェブサイト',
        websiteHint: 'ウォークについて書いている場所があれば。',
        groupSize: 'グループの人数',
        arrival: '到着日',
        departure: '出発日',
        departureHint: '日.月.年の形式で。例：25.04.2024',
        account: 'アカウント',
        password: 'パスワード',
        newPassword: '新しいパスワード',
        confirmPassword: 'パスワード（確認）',
        route: 'ルート',
        routes: ['中辺路', '小辺路', '伊勢路', '大辺路'],
        pace: 'ペース',
        paces: ['ゆっくり', '一定', '速め'],
        interests: '興味のあること',
        interestOptions: ['神社', '温泉', '森', '食'],
        languages: '話せる言語',
        languageOptions: ['英語', 'ドイツ語', '日本語', 'フランス語'],
        country: 'お住まいの国',
        notes: 'その他',
        consent: 'ウォークの計画のために個人情報が使われることに同意します。',
        luggageTitle: '荷物',
        luggageText: '荷物は宿から宿へ先に送れます。宿の予約と一緒に手配します。',
        photo: 'あなたの写真',
        routeFile: 'ルート（PDF）',
        remove: '削除',
        photoHint: 'JPGまたはPNG。',
        fileHint: '予定している区間のPDF。',
        sentText: 'ありがとうございます。1週間以内にご連絡します。',
    };

    // Invented trail reports, the demo's news.
    const reports = {
        title: '道中記',
        intro: '4日間の短い記録。天気、場所、バス、そして持ち物について。',
        categories: {
            trail: '道',
            places: '場所',
            practical: '実用',
        },
        items: [
            {
                slug: 'what-we-packed',
                date: '2024-04-25T10:00',
                category: 'practical',
                photos: ['vending-machines', 'ryokan-room', 'signpost', 'roadside-markers'],
                title: '持って行ったもの、置いてきたもの',
                teaser: '4日間の歩きに小さなリュックが2つ。次はもう一つ減らす。',
                tags: ['荷造り'],
                text: [
                    '荷物は宿から宿へ運んでもらえたので、デイパックで歩いた。雨具、乾いた着替え、水、現金、そして紙のバス時刻表。',
                    '要らなかったもの：2足目の靴。欲しかったもの：温泉用の小さなタオルと、自動販売機用の小銭。',
                ],
            },
            {
                slug: 'the-last-bus',
                date: '2024-04-23T16:05',
                category: 'practical',
                photos: ['seaside-station', 'morning-bus', 'nachi-pagoda', 'harbour-ferry'],
                title: '那智からの最終バス',
                teaser: '思っているより早く出る。私たちは4分前に間に合った。',
                tags: ['バス', '那智'],
                text: [
                    '二つの峠を越えると道は塔で終わり、滝はその少し下にある。そこから海岸へバスが出ているが、遅い便はない。',
                    '最終便は到着してからではなく、朝出発する前に確かめること。紀伊勝浦からはフェリーで数分で旅館に渡れる。',
                ],
            },
            {
                slug: 'the-oldest-bath',
                date: '2024-04-22T18:30',
                category: 'places',
                photos: ['outdoor-bath', 'yunomine-street', 'river-bridge', 'evening-rooftops'],
                title: '道沿いでいちばん古い湯',
                teaser: '湯の峰は熱い川を囲む一本の通り。予定より長く滞在した。',
                tags: ['温泉', '湯の峰'],
                text: [
                    '宿の間の川から湯気が立ちのぼる。橋のたもとの源泉で卵をゆで、隣の小さな湯小屋の順番を待つ。',
                    '一番長い日を歩いて疲れて着き、翌朝は予定より遅く出発した。そのぶん那智までの道は長くなった。',
                ],
            },
            {
                slug: 'a-land-crab',
                date: '2024-04-21T12:03',
                category: 'trail',
                photos: ['land-crab', 'fern-frond', 'forest-stream', 'stone-path-walkers'],
                title: 'カニと、ほかの道連れ',
                teaser: '一日のほとんど誰にも会わなかった。そしてカニが道をふさいだ。',
                tags: ['生き物'],
                text: [
                    '高原と近露の間の森は静かだ。ときどきグループに追い越され、また石とシダだけになる。',
                    '昼過ぎ、道の真ん中にカニがいて動かなかった。私たちはよけて通った。',
                ],
            },
            {
                slug: 'fog-on-the-pass',
                date: '2024-04-21T07:02',
                category: 'trail',
                photos: ['sea-of-clouds', 'walker-in-mist', 'misty-valley', 'cedar-canopy'],
                title: '近露への道の霧',
                teaser: '7時、谷が消えていた。最初の1時間は雲の中を歩いた。',
                tags: ['霧', '2日目'],
                text: [
                    '高原からは雲が湖のように集落の下にたまっていた。30分後にはその中にいて、杉が白の中に立っていた。',
                    '石畳は濡れても滑りにくいが、その間の木の根は滑る。10時ごろ日が差し、谷が戻ってきた。',
                ],
            },
        ],
    };

    return { ui, kumano, guide, richTextSample, home, pages, site, samples, walkForm, reports };
};

export const ja: LocaleModule<LocaleContent> = {
    photos: {
        'trailhead-river': { alt: '広い石の河原の上に建つ赤い手すりの木造の建物、背後に森の丘', place: '滝尻' },
        signpost: { alt: '落ち葉の道に立つ「熊野古道 KUMANO KODO」と書かれた木の道標', place: '滝尻' },
        'sea-of-clouds': { alt: '幾重にも連なる森の尾根、谷に雲が溜まっている', place: '高原' },
        'misty-valley': { alt: '霧に満ちた深い谷、森の斜面が灰色に溶けていく', place: '高原' },
        'roadside-markers': { alt: '若木の下、静かな道路脇に立つ木の道標', place: '' },
        'stone-path-walkers': { alt: '背の高い杉の間の石畳を歩く雨具姿の二人', place: '中辺路' },
        'forest-stream': { alt: '杉林を流れる沢と、それを渡る小さな板の橋', place: '中辺路' },
        'land-crab': { alt: '濡れた岩と杉の葉の上にいる橙色のカニ', place: '中辺路' },
        'vending-machines': { alt: '屋根の下に並ぶ飲み物の自販機とソフトクリームの看板、市松模様の床', place: '近露' },
        'chikatsuyu-gate': { alt: '大きな紙の提灯を三つ下げた木の門、真ん中の提灯に三本足の烏', place: '近露' },
        'morning-bus': { alt: '濡れた道路を走る赤と白のバス、背後に霧の山', place: '近露' },
        'cedar-canopy': { alt: '杉の幹を真下から見上げた明るい空', place: '中辺路' },
        'walker-in-mist': { alt: '霧の杉林の細い道を歩く、青いザックカバーの人', place: '本宮へ' },
        'root-path': { alt: 'シダと杉の間の、木の根がむき出しになった道', place: '本宮へ' },
        'oji-shrine': { alt: '森のなかの古びた鳥居の奥にある小さな木の社', place: '本宮へ' },
        'cobbled-path': { alt: 'まっすぐな杉の幹の間を続く古い石畳', place: '本宮へ' },
        'sunlit-path': { alt: '杉の並木の間の森の道に差し込む日の光', place: '本宮へ' },
        'ridge-view': { alt: '松の枝越しに見る森の尾根', place: '本宮へ' },
        'fern-frond': { alt: '巻きをほどき始めたシダの若葉の接写', place: '' },
        'yunomine-street': { alt: '沢沿いの細い温泉街の通り、鯉のぼりが川をまたいで下がっている', place: '湯の峰' },
        'river-bridge': { alt: '吊り橋の架かる広い河原、手前にツツジ', place: '' },
        'outdoor-bath': { alt: '緑に囲まれた木の屋根の下の石造りの露天風呂', place: '湯の峰' },
        'seaside-station': { alt: '雨の海沿いの小さな駅のホーム、柵の向こうに海', place: '' },
        'nachi-pagoda': { alt: '霧のなか、高い滝の前に立つ朱色の三重塔', place: '那智' },
        'harbour-ferry': { alt: '灰色の港を渡る色鮮やかな船', place: '勝浦' },
        'ryokan-room': { alt: '低い座卓のある畳の部屋、窓の外に海', place: '勝浦' },
        'evening-rooftops': { alt: '夕方の光のなかの小さな町の瓦屋根、地平線に山並み', place: '' },
    },
    build,
};
