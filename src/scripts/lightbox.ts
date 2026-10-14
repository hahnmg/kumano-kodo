import { startPlayer, withConsent } from './video';

export interface LightboxLabels {
  close: string;
  previous: string;
  next: string;
  play: string;
}

export const defaultLightboxLabels: LightboxLabels = { close: 'Close', previous: 'Previous', next: 'Next', play: 'Play video' };

// Groups carry their labels, so one dialog serves every language on the page.
export const lightboxGroupAttrs = (labels: Partial<LightboxLabels> = {}): Record<string, string> => {
  const l = { ...defaultLightboxLabels, ...labels };
  return { 'data-lightbox-group': '', 'data-label-close': l.close, 'data-label-previous': l.previous, 'data-label-next': l.next };
};

const icon = (path: string) =>
  `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="${path}"/></svg>`;

const template =
  `<figure class="lightbox-figure"><img class="lightbox-image" alt=""><div class="lightbox-player"></div>` +
  `<figcaption class="lightbox-caption type-caption"><span class="lightbox-text"></span><span class="lightbox-count"></span></figcaption></figure>` +
  `<button class="lightbox-button lightbox-close" type="button">${icon('M18 6 6 18M6 6l12 12')}</button>` +
  `<button class="lightbox-button lightbox-nav lightbox-nav-previous" type="button" data-step="-1">${icon('M19 12H5m0 0 6-6m-6 6 6 6')}</button>` +
  `<button class="lightbox-button lightbox-nav lightbox-nav-next" type="button" data-step="1">${icon('M5 12h14m0 0-6-6m6 6-6 6')}</button>`;

interface State {
  links: HTMLAnchorElement[];
  index: number;
  trigger: HTMLElement;
}

export const bindLightbox = (doc: Document = document): (() => void) => {
  let dialog: HTMLDialogElement | null = null;
  let state: State | null = null;

  const ensure = (): HTMLDialogElement => {
    if (dialog?.isConnected) return dialog;
    dialog = doc.createElement('dialog');
    dialog.className = 'lightbox';
    dialog.innerHTML = template;
    doc.body.append(dialog);
    return dialog;
  };

  const show = (index: number): void => {
    if (!state || !dialog) return;
    const n = state.links.length;
    state.index = (index + n) % n;
    const link = state.links[state.index];
    const alt = link.querySelector('img')?.alt ?? '';
    const image = dialog.querySelector<HTMLImageElement>('.lightbox-image');
    const player = dialog.querySelector<HTMLElement>('.lightbox-player');
    const video = link.querySelector<HTMLTemplateElement>('template.video-source');
    // Leaving a video for the next item stops it: the player goes with its element.
    player?.replaceChildren();
    if (image) {
      image.hidden = video !== null;
      if (!video) image.src = link.href;
      image.alt = alt;
    }
    if (video && player) {
      withConsent(link, player, () => {
        player.append(video.content.cloneNode(true));
        startPlayer(player);
      });
    }
    dialog.setAttribute('aria-label', alt);
    dialog.querySelector('.lightbox-text')!.textContent = alt;
    dialog.querySelector('.lightbox-count')!.textContent = n > 1 ? `${state.index + 1} / ${n}` : '';
    dialog.querySelectorAll<HTMLElement>('.lightbox-nav').forEach((b) => (b.hidden = n < 2));
  };

  const open = (link: HTMLAnchorElement): void => {
    const group = link.closest<HTMLElement>('[data-lightbox-group]');
    const links = group ? [...group.querySelectorAll<HTMLAnchorElement>('a[data-lightbox]')] : [link];
    const d = ensure();
    const labels = {
      ...defaultLightboxLabels,
      ...(group ? { close: group.dataset.labelClose, previous: group.dataset.labelPrevious, next: group.dataset.labelNext } : {}),
    };
    d.querySelector('.lightbox-close')?.setAttribute('aria-label', labels.close ?? defaultLightboxLabels.close);
    d.querySelector('.lightbox-nav-previous')?.setAttribute('aria-label', labels.previous ?? defaultLightboxLabels.previous);
    d.querySelector('.lightbox-nav-next')?.setAttribute('aria-label', labels.next ?? defaultLightboxLabels.next);
    state = { links, index: links.indexOf(link), trigger: link };
    show(state.index);
    // jsdom and old browsers lack showModal; the open attribute keeps the dialog usable there.
    if (typeof d.showModal === 'function') d.showModal();
    else d.setAttribute('open', '');
    d.querySelector<HTMLElement>('.lightbox-close')?.focus();
  };

  const close = (): void => {
    if (!dialog) return;
    dialog.querySelector('.lightbox-player')?.replaceChildren();
    if (typeof dialog.close === 'function' && dialog.open) dialog.close();
    else dialog.removeAttribute('open');
  };

  const click = (event: MouseEvent): void => {
    if (!(event.target instanceof Element)) return;
    const link = event.target.closest<HTMLAnchorElement>('a[data-lightbox]');
    // Modifier clicks keep the browser's own behaviour, such as opening the image in a new tab.
    if (link && !event.metaKey && !event.ctrlKey && !event.shiftKey && event.button === 0) {
      event.preventDefault();
      open(link);
      return;
    }
    if (!dialog || !dialog.contains(event.target)) return;
    const step = event.target.closest<HTMLElement>('[data-step]');
    if (step) show((state?.index ?? 0) + Number(step.dataset.step));
    else if (event.target.closest('.lightbox-close') || event.target === dialog) close();
  };

  const key = (event: KeyboardEvent): void => {
    if (!dialog?.hasAttribute('open')) return;
    if (event.key === 'ArrowRight') show((state?.index ?? 0) + 1);
    else if (event.key === 'ArrowLeft') show((state?.index ?? 0) - 1);
    else if (event.key === 'Escape' && typeof dialog.showModal !== 'function') close();
  };

  // Native Escape also ends here, so focus always returns to the image that opened the box.
  const closed = (event: Event): void => {
    if (event.target !== dialog) return;
    dialog?.querySelector('.lightbox-player')?.replaceChildren();
    state?.trigger.focus();
  };

  doc.addEventListener('click', click);
  doc.addEventListener('keydown', key);
  doc.addEventListener('close', closed, true);
  return () => {
    doc.removeEventListener('click', click);
    doc.removeEventListener('keydown', key);
    doc.removeEventListener('close', closed, true);
    dialog?.remove();
  };
};
