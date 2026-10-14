const slider = '[data-slider]';
const track = '.slider-track';

const parts = (root: Element) => ({
  track: root.querySelector<HTMLElement>(track),
  previous: root.querySelector<HTMLButtonElement>('[data-direction="previous"]'),
  next: root.querySelector<HTMLButtonElement>('[data-direction="next"]'),
  dots: [...root.querySelectorAll<HTMLButtonElement>('.slider-dots-dot')],
});

const items = (el: HTMLElement): HTMLElement[] => [...el.children].filter((c): c is HTMLElement => c instanceof HTMLElement);
const maxScroll = (el: HTMLElement): number => Math.max(0, el.scrollWidth - el.clientWidth);

// Stops are the scroll positions the track can actually reach: one per item until the end is in view,
// then the end itself. When several cards fit, the last ones share that final stop.
export const stops = (el: HTMLElement): number[] => {
  const all = items(el);
  const first = all[0]?.offsetLeft ?? 0;
  const max = maxScroll(el);
  const out: number[] = [];
  for (const item of all) {
    const pos = Math.min(item.offsetLeft - first, max);
    if (!out.length || pos - out[out.length - 1] > 1) out.push(pos);
  }
  return out.length ? out : [0];
};

// While a smooth scroll runs, the position it is heading for counts, so quick repeated clicks add up.
const position = (el: HTMLElement): number => {
  const target = Number(el.dataset.sliderTarget);
  return Number.isFinite(target) && el.dataset.sliderTarget !== undefined ? target : el.scrollLeft;
};

export const activeStop = (el: HTMLElement, at = position(el)): number => {
  const s = stops(el);
  let best = 0;
  s.forEach((pos, i) => {
    if (Math.abs(pos - at) < Math.abs(s[best] - at)) best = i;
  });
  return best;
};

const scrollToStop = (el: HTMLElement, index: number): void => {
  const s = stops(el);
  const left = s[Math.max(0, Math.min(index, s.length - 1))];
  el.dataset.sliderTarget = String(left);
  el.scrollTo({ left });
};

export const syncSliders = (root: ParentNode = document): void => {
  root.querySelectorAll(slider).forEach((s) => {
    const { track: t, previous, next, dots } = parts(s);
    if (!t) return;
    // The target is reached (or abandoned by a swipe) once the track rests near a stop.
    if (t.dataset.sliderTarget !== undefined && Math.abs(Number(t.dataset.sliderTarget) - t.scrollLeft) <= 2) delete t.dataset.sliderTarget;
    const count = stops(t).length;
    const active = activeStop(t);
    dots.forEach((dot, i) => {
      dot.hidden = i >= count;
      if (i === active) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    });
    // aria-disabled, not disabled: a disabled button drops the keyboard focus that just pressed it.
    previous?.setAttribute('aria-disabled', String(active === 0));
    next?.setAttribute('aria-disabled', String(active >= count - 1));
  });
};

const step = (t: HTMLElement, delta: number): void => scrollToStop(t, activeStop(t) + delta);

export const bindSliders = (doc: Document = document): (() => void) => {
  const click = (event: Event): void => {
    if (!(event.target instanceof Element)) return;
    const root = event.target.closest(slider);
    const t = root?.querySelector<HTMLElement>(track);
    if (!root || !t) return;
    const arrow = event.target.closest<HTMLElement>('[data-direction]');
    const dot = event.target.closest('.slider-dots-dot');
    if (arrow) step(t, arrow.dataset.direction === 'next' ? 1 : -1);
    else if (dot) scrollToStop(t, parts(root).dots.indexOf(dot as HTMLButtonElement));
    syncSliders(doc);
  };
  const key = (event: KeyboardEvent): void => {
    const t = event.target instanceof HTMLElement && event.target.matches(track) ? event.target : null;
    if (!t || (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft')) return;
    event.preventDefault();
    step(t, event.key === 'ArrowRight' ? 1 : -1);
    syncSliders(doc);
  };
  // Scroll does not bubble; capturing on the document sees every track, including ones rendered later.
  let frame = 0;
  const schedule = (): void => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => syncSliders(doc));
  };
  const scroll = (event: Event): void => {
    if (event.target instanceof Element && event.target.matches(track)) schedule();
  };
  // A swipe or wheel gesture takes over from a pending arrow target.
  const takeOver = (event: Event): void => {
    const t = event.target instanceof Element ? event.target.closest<HTMLElement>(track) : null;
    if (t) delete t.dataset.sliderTarget;
  };
  const view = doc.defaultView;
  doc.addEventListener('click', click);
  doc.addEventListener('keydown', key);
  doc.addEventListener('scroll', scroll, true);
  doc.addEventListener('pointerdown', takeOver);
  doc.addEventListener('wheel', takeOver, { passive: true });
  view?.addEventListener('resize', schedule);
  return () => {
    doc.removeEventListener('click', click);
    doc.removeEventListener('keydown', key);
    doc.removeEventListener('scroll', scroll, true);
    doc.removeEventListener('pointerdown', takeOver);
    doc.removeEventListener('wheel', takeOver);
    view?.removeEventListener('resize', schedule);
  };
};

// Slideshows ([data-autoplay], the hero) advance on their own and start over at the end. They hold while the pointer
// or the focus is inside, while the page is hidden, and when paused; a visitor who asks for less motion starts paused.
const autoplay = '[data-slider][data-autoplay]';
const lastMove = new WeakMap<HTMLElement, number>();

const setPaused = (root: HTMLElement, paused: boolean): void => {
  root.toggleAttribute('data-paused', paused);
  const button = root.querySelector<HTMLButtonElement>('.hero-pause');
  if (button) {
    button.setAttribute('aria-pressed', String(paused));
    button.setAttribute('aria-label', (paused ? root.dataset.labelPlay : root.dataset.labelPause) ?? '');
  }
  // Announce slide changes only when the visitor moves them, not on every automatic step.
  root.querySelector(track)?.setAttribute('aria-live', paused ? 'polite' : 'off');
};

// The stats and controls lie over the slides; each slide's text ends above them.
export const syncSlideshows = (doc: Document = document): void => {
  doc.querySelectorAll<HTMLElement>(autoplay).forEach((root) => {
    const bar = root.querySelector<HTMLElement>('.hero-bar');
    if (bar) root.style.setProperty('--hero-bar-height', `${bar.offsetHeight}px`);
    if (!root.hasAttribute('data-autoplay-ready')) {
      root.setAttribute('data-autoplay-ready', '');
      setPaused(root, doc.defaultView?.matchMedia('(prefers-reduced-motion: reduce)').matches ?? false);
      lastMove.set(root, Date.now());
    }
  });
};

export const bindSlideshows = (doc: Document = document): (() => void) => {
  const tick = (): void => {
    if (doc.hidden) return;
    doc.querySelectorAll<HTMLElement>(autoplay).forEach((root) => {
      const t = root.querySelector<HTMLElement>(track);
      const held = root.hasAttribute('data-paused') || root.matches(':hover') || root.contains(doc.activeElement);
      const due = Date.now() - (lastMove.get(root) ?? 0) >= Number(root.dataset.autoplay || 7000);
      if (!t || held || !due) return;
      const next = activeStop(t) + 1;
      scrollToStop(t, next >= stops(t).length ? 0 : next);
      lastMove.set(root, Date.now());
      syncSliders(doc);
    });
  };
  const click = (event: Event): void => {
    const button = event.target instanceof Element ? event.target.closest('.hero-pause') : null;
    const root = button?.closest<HTMLElement>(autoplay);
    if (root) setPaused(root, !root.hasAttribute('data-paused'));
  };
  // A move by hand starts the wait for the next automatic one again.
  const moved = (event: Event): void => {
    const root = event.target instanceof Element ? event.target.closest<HTMLElement>(autoplay) : null;
    if (root) lastMove.set(root, Date.now());
  };
  const view = doc.defaultView;
  const timer = view?.setInterval(tick, 500);
  const resize = (): void => syncSlideshows(doc);
  doc.addEventListener('click', click);
  doc.addEventListener('pointerdown', moved);
  doc.addEventListener('keydown', moved);
  view?.addEventListener('resize', resize);
  syncSlideshows(doc);
  return () => {
    if (timer !== undefined) view?.clearInterval(timer);
    doc.removeEventListener('click', click);
    doc.removeEventListener('pointerdown', moved);
    doc.removeEventListener('keydown', moved);
    view?.removeEventListener('resize', resize);
  };
};
