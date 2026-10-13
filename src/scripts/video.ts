// A video loads only on request: its player waits in a <template>, whose content the browser does not fetch.
// The click is the user gesture that lets it start with sound, so the player is rendered without autoplay.
export const startPlayer = (stage: ParentNode): void => {
    const video = stage.querySelector('video');
    if (video) {
        void video.play();
        video.focus();
        return;
    }
    const frame = stage.querySelector('iframe');
    if (frame) {
        const url = new URL(frame.src, location.href);
        url.searchParams.set('autoplay', '1');
        frame.src = url.href;
        frame.allow = [frame.allow, 'autoplay'].filter(Boolean).join('; ');
        frame.focus();
    }
};

// Inline, the player takes the poster's place and size; the poster stays underneath as the layout box.
const play = (box: HTMLElement): void => {
    const source = box.querySelector<HTMLTemplateElement>('template.video-source');
    if (!source || 'playing' in box.dataset) return;
    const stage = document.createElement('div');
    stage.className = 'video-stage';
    stage.append(source.content.cloneNode(true));
    box.append(stage);
    box.dataset.playing = '';
    startPlayer(stage);
};

// Delegated, so videos rendered later (Storybook) work too. Returns the unbinding.
export const bindVideos = (root: Document): (() => void) => {
    const onClick = (event: Event): void => {
        const button = event.target instanceof Element ? event.target.closest('.video-play') : null;
        const box = button?.closest<HTMLElement>('.video');
        if (box) play(box);
    };
    root.addEventListener('click', onClick);
    return () => root.removeEventListener('click', onClick);
};
