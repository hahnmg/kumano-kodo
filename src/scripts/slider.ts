const slider = '[data-slider]';
const track = '.slider__track';

const parts = (root: Element) => ({
    track: root.querySelector<HTMLElement>(track),
    previous: root.querySelector<HTMLButtonElement>('[data-direction="previous"]'),
    next: root.querySelector<HTMLButtonElement>('[data-direction="next"]'),
    dots: [...root.querySelectorAll<HTMLButtonElement>('.slider-dots__dot')],
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
        if (t.dataset.sliderTarget !== undefined && Math.abs(Number(t.dataset.sliderTarget) - t.scrollLeft) <= 2)
            delete t.dataset.sliderTarget;
        const count = stops(t).length;
        const active = activeStop(t);
        dots.forEach((dot, i) => {
            dot.hidden = i >= count;
            dot.classList.toggle('slider-dots__dot--active', i === active);
            if (i === active) dot.setAttribute('aria-current', 'true');
            else dot.removeAttribute('aria-current');
        });
        if (previous) previous.disabled = active === 0;
        if (next) next.disabled = active >= count - 1;
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
        const dot = event.target.closest('.slider-dots__dot');
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
