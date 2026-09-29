import type { LocaleModule, Photos } from '../templates/content';
import type { LocaleContent } from './en';

const build = (p: Photos): LocaleContent => {
    const ui = {
        mainNav: 'メインナビゲーション',
        language: '言語',
        darkMode: 'ダークモード',
        trailStatus: '道の状況と連絡先',
        categories: 'カテゴリー',
        breadcrumb: 'パンくずリスト',
        pages: 'ページ',
        previousPage: '前のページ',
        nextPage: '次のページ',
        card: 'カード',
        readMore: '続きを読む',
        emailAddress: 'メールアドレス',
        emailPlaceholder: 'name@example.jp',
        consent: 'ニュースレターの受信を希望し、プライバシーポリシーを読みました。',
        subscribe: '登録する',
    };

    const stages = [
        {
            image: p.zedernweg,
            stage: '第1区間',
            stats: '4.0 km · +400 m',
            title: '滝尻 → 高原',
            description: '入口となる区間。深い森を急登し、雲の上の集落へ。',
        },
        {
            image: p.wegmarke,
            stage: '第2区間',
            stats: '9.8 km · +620 m',
            title: '高原 → 近露',
            description: '道標11から34まで。峠を三つ越え、携帯の電波は届かない。',
        },
        {
            image: p.talblick,
            stage: '第3区間',
            stats: '25.9 km · +1,180 m',
            title: '近露 → 本宮',
            description: '最長の区間。分けて歩くなら、発心門からバスに乗る。',
        },
        {
            image: p.sonnenpfad,
            stage: '第4区間',
            stats: '14.5 km · +940 m',
            title: '小口 → 那智',
            description: '大雲取越。地元では「胴切り坂」とも呼ばれる。その名にふさわしい道。',
        },
        {
            image: p.kammweg,
            stage: 'オプション',
            stats: '7.0 km · +180 m',
            title: '発心門 → 本宮',
            description: '少しだけ歩いてみたい人のための日帰りコース。',
        },
    ];

    const places = [
        {
            image: p.nachi,
            title: '那智の滝',
            description: '落差日本一の一段の滝。青岸渡寺の三重塔のすぐそばにある。朝は滝壺を霧が満たす。',
            variant: 'featured' as const,
        },
        {
            image: p.onsen,
            title: '湯の峰温泉',
            description: '十二世紀から続く日本最古の温泉。三日目のあと、歩き続ける本当の理由。',
        },
        {
            image: p.torii,
            title: '熊野那智大社',
            description: '集落から467段の石段を上る。頂上で巡礼は終わり、隣の自販機では冷たいお茶が買える。',
            variant: 'ruled' as const,
        },
    ];

    const footer = {
        wordmark: 'Kumano Kodo',
        about: '個人の山歩き日記です。写真はすべて2026年5月撮影。情報の正確さは保証しません。',
        columns: [
            {
                title: 'ルート',
                links: [
                    { label: '中辺路', href: '#' },
                    { label: '小辺路', href: '#' },
                    { label: 'ルートマップ', href: '#' },
                ],
            },
            {
                title: '実用情報',
                links: [
                    { label: 'アクセスとバス', href: '#' },
                    { label: '宿泊', href: '#' },
                    { label: 'ニュースレター', href: '#' },
                ],
            },
            { title: 'お問い合わせ', links: [{ label: 'post@kumano-kodo.example' }, { label: '通常一週間以内に返信します' }] },
        ],
        copyright: '© 2026 熊野古道 山歩き日記',
        legal: [
            { label: '運営者情報', href: '#' },
            { label: 'プライバシー', href: '#' },
            { label: 'アクセシビリティ', href: '#' },
        ],
    };

    const kumano = {
        nav: [
            { label: 'ルート', href: '#', active: true, hasChildren: true },
            { label: '実用情報', href: '#', hasChildren: true },
            { label: '写真', href: '#' },
        ],
        hero: {
            image: p.nebelberge,
            eyebrow: '紀伊半島 · 和歌山 · 2026 / 05',
            title: '杉の霧のなかを\n歩いた四日間',
            teaser: '熊野古道は一本の長距離トレイルではなく、三つの神社へ向かう古い参詣道の網です。五月、雨のなかを中辺路で歩きました。',
            actions: [
                { label: '区間を見る', href: '#stages' },
                { label: 'よくある質問', href: '#faq' },
            ],
            stats: [
                { label: '距離', value: '68 km' },
                { label: '日数', value: '4日' },
                { label: '累積標高', value: '3,140 m' },
                { label: 'ベストシーズン', value: '4月・11月' },
            ],
        },
        intro: [
            '滝尻王子から本宮まで、道は標高700メートルにも満たない峠を越えていくのに、どこか人里離れた感じがする。森は植林された杉が密に並び、霧が立ち込めると二十メートル先も見えない。',
            '道中では王子を数えていく。かつて参詣者が儀式を行った道端の小さな社だ。今は番号付きの木の道標が立ち、非常時の目印も兼ねている。',
        ],
        stats: [
            { value: '68', label: '歩いたキロ数' },
            { value: '94', label: '数えた道標' },
            { value: '3', label: '四日のうち雨の日' },
            { value: '1', label: '道で出会ったカニ' },
        ],
        days: [
            {
                date: '1日目 · 5月13日',
                route: '滝尻 → 高原',
                description: '4 km、一気に400メートルを登る。短いが、ルートで最も急な区間。',
                time: '2時間10分',
            },
            {
                date: '2日目 · 5月14日',
                route: '高原 → 近露',
                description: '降り続く雨のなか10 km。昼からは道が沢のようになり、スパッツも役に立たなかった。',
                time: '4時間40分',
            },
            {
                date: '3日目 · 5月15日',
                route: '近露 → 本宮',
                description: '26 km、最長の区間。三越峠で霧が一瞬晴れ、そのあとは下りだった。',
                time: '9時間20分',
            },
            {
                date: '4日目 · 5月16日',
                route: '小口 → 那智',
                description: '大雲取越を14 km。終点は高さ133メートルの那智の滝。',
                time: '7時間',
            },
        ],
        stages,
        route: {
            label: '六つの地点を結ぶ中辺路の概略図',
            path: 'M40 200 C 140 190, 170 110, 250 100 S 360 160, 430 140 C 500 120, 520 60, 610 70 S 730 150, 800 120 C 870 90, 920 110, 960 86',
            stations: [
                { name: '滝尻', x: 40, y: 200, labelY: 228, anchor: 'start' as const },
                { name: '高原', x: 250, y: 100, labelY: 82, boundary: true },
                { name: '近露', x: 430, y: 140, labelY: 122, boundary: true },
                { name: '本宮', x: 610, y: 70, labelY: 52, boundary: true },
                { name: '小口', x: 800, y: 120, labelY: 102, boundary: true },
                { name: '那智', x: 960, y: 86, labelY: 68, anchor: 'end' as const },
            ],
            days: [
                { label: '1日目 · 4 km', x: 145 },
                { label: '2日目 · 10 km', x: 340 },
                { label: '3日目 · 26 km', x: 520 },
                { label: 'バス', x: 705 },
                { label: '4日目 · 14 km', x: 880 },
            ],
            legend: { walked: '歩いた区間', end: '巡礼の終点', boundary: '宿泊を伴う日の区切り' },
        },
        places,
        faq: [
            {
                question: '宿は事前に予約が必要ですか？',
                answer: 'はい、早めに。高原と近露には民宿が数軒ずつしかなく、5月と11月は数か月前に満室になります。田辺市観光協会の予約サービスは英語でも対応しています。',
                open: true,
            },
            {
                question: '雨はどれくらいひどいですか？',
                answer: '四日のうち三日が雨でした。防水の靴やスパッツは思ったほど役に立たず、密封袋に入れた乾いた着替えのほうが助かります。',
            },
            {
                question: 'バスで移動できますか？',
                answer: 'はい。本宮、発心門、小口、那智の間を一日に何本かバスが走っているので、区間を飛ばしたり分けたりしやすいです。',
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
    });

    const guide = {
        topbar: {
            label: '道の状況：',
            value: '中辺路の四区間すべて通行可 · 2026年5月確認',
            phone: '+81 00 0000 0000',
            email: 'post@kumano-kodo.example',
        },
        nav: [
            { label: 'ルート', href: '#', active: true },
            { label: '区間', href: '#' },
            { label: '見どころ', href: '#' },
            { label: '実用情報', href: '#' },
            { label: '写真', href: '#' },
        ],
        routes: [
            { image: p.zedernweg, title: '中辺路', meta: '四日間で68 km · この日記', href: '#' },
            { image: p.kammweg, title: '日帰り', meta: '7 km · 発心門 → 本宮', href: '#' },
            { image: p.farn, title: '小辺路', meta: '高野山 → 本宮 · 次の予定', href: '#' },
        ],
        facts: [
            { icon: 'clock' as const, label: 'ベストシーズン', value: '4月と11月', note: '5月も可、雨の覚悟を' },
            { icon: 'map-pin' as const, label: '出発地', value: '滝尻王子', note: '1日目は一気に400メートル登る' },
            { icon: 'home' as const, label: '宿泊', value: '民宿', note: '5月と11月は数か月前に予約を' },
            { icon: 'file' as const, label: '歩行時間', value: '23時間10分', note: '四日間の合計、休憩を除く' },
        ],
        entries: [
            stageEntry(0, '1日目 · 2時間10分'),
            stageEntry(1, '2日目 · 4時間40分'),
            stageEntry(2, '3日目 · 9時間20分', '最長区間'),
            stageEntry(3, '4日目 · 7時間'),
            stageEntry(4, '半日', '日帰り'),
            { image: p.nachi, title: places[0].title, subtitle: '滝、落差133メートル', meta: '4日目の終点' },
            { image: p.onsen, title: places[1].title, subtitle: '温泉', meta: '3日目のあと' },
            { image: p.torii, title: places[2].title, subtitle: '神社', meta: '集落から467段' },
        ],
        prep: [
            {
                title: '宿を予約する',
                text: '高原と近露には民宿が数軒ずつしかなく、5月と11月は数か月前に満室になります。',
                variant: 'featured' as const,
            },
            { title: '雨に備える', text: '四日のうち三日が雨でした。スパッツより、密封袋に入れた乾いた着替えが役に立ちます。' },
            {
                title: '荷物を先に送る',
                text: '主な集落の間で荷物を運んでもらえます。前日までに田辺市観光協会で予約します。',
            },
        ],
        tiles: [
            { title: 'アクセスとバス', icon: 'map-pin' as const },
            { title: '宿泊', icon: 'home' as const },
            { title: '道標と安全', icon: 'alert' as const },
            { title: '地図と時刻表', icon: 'download' as const },
        ],
        hosts: [{ image: p.laternen, name: '民宿の女将', role: '近露', focus: '「雨も旅のうちです。」' }],
        footer: {
            ...footer,
            notice: { title: '道の状況：', text: '大雨のあとは、出発前に観光協会のお知らせを確認してください。' },
        },
    };

    const richTextSample =
        '<h2>長い区間</h2>' +
        '<p>近露から本宮まで26 km、四日間で最も長い一日。三越峠で霧が一瞬晴れ、そのあとは下りだった。分けて歩くなら<a href="#">発心門からバス</a>に乗る。</p>' +
        '<ul><li>近露：民宿で朝食をとってから早めに出発</li><li>三越峠：霧が晴れた場所</li><li>発心門：区間を分ける人のためのバス停</li><li>本宮：区間の終点</li></ul>' +
        '<h3>泊まる場所</h3><p>近露の民宿は数か月前に予約を。5月と11月は満室になる。</p>';

    const home = {
        why: { eyebrow: 'この道を選ぶ理由', title: '千年歩かれてきた道' },
        bridgeCaption: '高原と近露の間では、十数本の石積みの橋が斜面を渡る。14キロ地点。',
        quote: { quote: '「雨も旅のうちです。晴れた日に来る人は、別の道を見ています。」', source: '近露の民宿の女将' },
        days: { title: '四日間の記録', aside: '休憩を除いた歩行時間。見積もりではなく時計で計った。' },
        stages: { eyebrow: '区間', title: 'ひとつずつ歩ける五つの区間' },
        map: {
            eyebrow: 'ルートマップ',
            title: '概略図、縮尺なし',
            aside: '地点の順序と日の区切りは正確だが、形は正確ではない。道案内には観光協会の地図が必要。',
        },
        places: { eyebrow: '道中', title: '寄り道する価値のある三つの場所' },
        roadsideCaption: '道端の記録。雨上がりのカニと、霧のなかの杉。',
        practical: { eyebrow: '実用情報', title: '先に知っておきたかったこと', intro: '帰ってきてから最もよく聞かれた四つの質問。' },
        newsletter: {
            title: '新しいルートを書いたときだけ、年に二通のメール',
            text: '次は高野山から本宮へ向かう山道、小辺路です。広告なし、アドレスの共有なし。',
        },
    };

    const pages = {
        start: {
            title: '中辺路を歩いた四日間',
            text: '2026年5月の個人的な山歩き日記。区間、寄り道する価値のある場所、出発前に知っておきたかったこと。',
            action: '区間を見る',
            panelTitle: '歩き方',
            panelMore: 'ルートを比べる',
            factsLabel: 'ひと目でわかる',
            stages: { eyebrow: '区間', title: '四日間、一日一区間' },
            prep: { eyebrow: '実用情報', title: '出発前に' },
            plan: '計画を立てる',
        },
        list: {
            title: '区間と見どころ',
            crumbs: ['ホーム', 'ルート'],
            chips: ['すべて', '区間', '見どころ', '日帰り'],
            search: { label: '区間と見どころを検索', placeholder: '例：本宮' },
            day: { label: '日程', options: ['すべての日', '1日目', '2日目', '3日目', '4日目'] },
            count: '12件',
        },
        detail: {
            crumbs: ['ホーム', 'ルート', '区間'],
            caption: '登りの前に谷を振り返る。3日目、5月15日。',
            downloads: [
                { title: '区間地図 近露 → 本宮', meta: 'PDF · 1.2 MB', href: '#' },
                { title: 'バス時刻表 発心門 – 本宮', meta: 'PDF · 96 KB', href: '#' },
                { title: '雨の日の持ち物リスト', meta: 'PDF · 240 KB', href: '#' },
            ],
            factsTitle: '区間データ',
            facts: [
                { label: '日程', value: '3日目 · 5月15日' },
                { label: '距離', value: '25.9 km' },
                { label: '累積標高', value: '+1,180 m' },
                { label: '歩行時間', value: '9時間20分' },
            ],
            info: {
                title: '区間を分けますか？',
                text: '発心門からバスに乗り、本宮までの最後の7 kmだけを歩く。',
                links: [
                    { label: 'バス時刻表', href: '#' },
                    { label: '近露に泊まる', href: '#' },
                ],
            },
            back: 'すべての区間',
            along: 'ルート沿い',
            subNavTitle: 'ルート',
        },
    };

    const samples = {
        textarea: { label: 'メッセージ', placeholder: 'ルートについてのご質問' },
        search: '検索',
        galleryCaption: '中辺路の四日間の記録、2026年5月。',
        table: {
            caption: '区間の一覧',
            head: ['区間', '距離', '累積標高', '歩行時間'],
            rows: [
                ['滝尻 → 高原', '4.0 km', '+400 m', '2時間10分'],
                ['高原 → 近露', '9.8 km', '+620 m', '4時間40分'],
                ['近露 → 本宮', '25.9 km', '+1,180 m', '9時間20分'],
                ['小口 → 那智', '14.5 km', '+940 m', '7時間'],
            ],
        },
    };

    return { ui, kumano, guide, richTextSample, home, pages, samples };
};

export const ja: LocaleModule<LocaleContent> = {
    alts: {
        zedernweg: '高い杉の間を歩く雨合羽姿の二人',
        wegmarke: '霧の森に立つ番号付きの道標',
        talblick: '谷あいの集落を見渡す眺め、斜面にかかる雲',
        sonnenpfad: '細い杉の間を抜ける日の差す森の道',
        kammweg: '森に覆われた尾根の広い眺め',
        nebelberge: '早朝の霧に包まれた紀伊半島の山並み',
        steinbruecke: '杉林の沢に架かる石橋',
        nachi: '那智の滝の前に立つ三重塔',
        onsen: '木の屋根の下の石で囲まれた温泉',
        torii: '石段のふもとの赤い鳥居',
        krabbe: '濡れた岩の上のオレンジ色のカニ',
        nebelbaum: '霧の杉林の曲がった幹',
        farn: '道端のシダ',
        laternen: '神社の石灯籠',
        bus: '山道を走る路線バス',
    },
    build,
};
