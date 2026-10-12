// A hero video loads only on request: its player waits in a <template>, whose content the browser does not fetch.
// The click is the user gesture that lets it start with sound, so the player is rendered without autoplay.
const start = (stage: HTMLElement): HTMLVideoElement | null => {
    const video = stage.querySelector('video');
    if (video) {
        void video.play();
        video.focus();
        return video;
    }
    const frame = stage.querySelector('iframe');
    if (frame) {
        const url = new URL(frame.src, location.href);
        url.searchParams.set('autoplay', '1');
        frame.src = url.href;
        frame.allow = [frame.allow, 'autoplay'].filter(Boolean).join('; ');
        frame.focus();
    }
    return null;
};

const stop = (hero: HTMLElement) => {
    hero.querySelector('.hero-player')?.replaceChildren();
    delete hero.dataset.playing;
    hero.querySelector<HTMLButtonElement>('.hero-play')?.focus();
};

const play = (hero: HTMLElement) => {
    const template = hero.querySelector<HTMLTemplateElement>('template.hero-player-source');
    const stage = hero.querySelector<HTMLElement>('.hero-player');
    if (!template || !stage) return;
    stage.replaceChildren(template.content.cloneNode(true));
    hero.dataset.playing = '';
    start(stage)?.addEventListener('ended', () => stop(hero));
};

// Delegated, so heroes rendered later (Storybook) work too. Returns the unbinding.
export const bindHeroVideos = (root: Document): (() => void) => {
    const onClick = (event: Event) => {
        const button = event.target instanceof Element ? event.target.closest('.hero-play, .hero-close') : null;
        const hero = button?.closest<HTMLElement>('.hero[data-video]');
        if (!button || !hero) return;
        if (button.classList.contains('hero-play')) play(hero);
        else stop(hero);
    };
    const onKey = (event: KeyboardEvent) => {
        const hero = event.target instanceof Element ? event.target.closest<HTMLElement>('.hero[data-playing]') : null;
        if (event.key === 'Escape' && hero) stop(hero);
    };
    root.addEventListener('click', onClick);
    root.addEventListener('keydown', onKey);
    return () => {
        root.removeEventListener('click', onClick);
        root.removeEventListener('keydown', onKey);
    };
};
