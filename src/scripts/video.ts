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

// The answer to "always load external videos" stays in this browser only; storage can be blocked or private.
const consentKey = 'kumano-kodo.external-media';

export const externalAllowed = (): boolean => {
  try {
    return localStorage.getItem(consentKey) === 'allow';
  } catch {
    return false;
  }
};

export const setExternalAllowed = (allowed: boolean): void => {
  try {
    if (allowed) localStorage.setItem(consentKey, 'allow');
    else localStorage.removeItem(consentKey);
  } catch {
    // Without storage the question comes again next time.
  }
};

// A provider's player waits for the visitor's yes; own files and an earlier "always" start at once.
export const withConsent = (source: ParentNode, host: HTMLElement, start: () => void): void => {
  const notice = source.querySelector<HTMLTemplateElement>('template.video-consent-source');
  const panel = notice?.content.firstElementChild?.cloneNode(true);
  if (!(panel instanceof HTMLElement) || externalAllowed()) {
    start();
    return;
  }
  host.append(panel);
  const load = panel.querySelector<HTMLButtonElement>('.button');
  load?.addEventListener('click', () => {
    if (panel.querySelector<HTMLInputElement>('.choice-input')?.checked) setExternalAllowed(true);
    panel.remove();
    start();
  });
  load?.focus();
};

// Inline, the player takes the poster's place and size; the poster stays underneath as the layout box.
const play = (box: HTMLElement): void => {
  const source = box.querySelector<HTMLTemplateElement>('template.video-source');
  if (!source || 'playing' in box.dataset) return;
  box.dataset.playing = '';
  withConsent(box, box, () => {
    const stage = document.createElement('div');
    stage.className = 'video-stage';
    stage.append(source.content.cloneNode(true));
    box.append(stage);
    startPlayer(stage);
  });
};

// The switch on the privacy page shows the stored answer and changes it; delegated, as videos are.
export const syncMediaConsent = (root: ParentNode = document): void => {
  root.querySelectorAll<HTMLInputElement>('.media-consent .choice-input').forEach((input) => (input.checked = externalAllowed()));
};

export const bindMediaConsent = (root: Document): (() => void) => {
  const onChange = (event: Event): void => {
    const input = event.target instanceof HTMLInputElement ? event.target : null;
    if (input?.closest('.media-consent')) setExternalAllowed(input.checked);
  };
  root.addEventListener('change', onChange);
  syncMediaConsent(root);
  return () => root.removeEventListener('change', onChange);
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
