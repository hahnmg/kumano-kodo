const slider = '[data-slider]';
const track = '.slider__track';

const parts = (root: Element) => ({
    track: root.querySelector<HTMLElement>(track),
    previous: root.querySelector<HTMLButtonElement>('[data-direction="previous"]'),
    next: root.querySelector<HTMLButtonElement>('[data-direction="next"]'),
    dots: [...root.querySelectorAll<HTMLButtonElement>('.slider-dots__dot')],
});

const items = (el: HTMLElement): HTMLElement[] => [...el.children].filter((c): c is HTMLElement => c instanceof HTMLElement);

// Positions are measured against the first item, so the track's gutter padding does not count.
const offset = (el: HTMLElement, item: HTMLElement): number => item.offsetLeft - (items(el)[0]?.offsetLeft ?? 0);

export const activeIndex = (el: HTMLElement): number => {
    const all = items(el);
    if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 1) return all.length - 1;
    let best = 0;
    all.forEach((item, i) => {
        if (Math.abs(offset(el, item) - el.scrollLeft) < Math.abs(offset(el, all[best]) - el.scrollLeft)) best = i;
    });
    return best;
};

export const syncSliders = (root: ParentNode = document): void => {
    root.querySelectorAll(slider).forEach((s) => {
        const { track: t, previous, next, dots } = parts(s);
        if (!t) return;
        const active = activeIndex(t);
        dots.forEach((dot, i) => {
            dot.classList.toggle('slider-dots__dot--active', i === active);
            if (i === active) dot.setAttribute('aria-current', 'true');
            else dot.removeAttribute('aria-current');
        });
        if (previous) previous.disabled = t.scrollLeft <= 1;
        if (next) next.disabled = t.scrollLeft + t.clientWidth >= t.scrollWidth - 1;
    });
};

const goTo = (t: HTMLElement, index: number): void => {
    const all = items(t);
    const target = all[Math.max(0, Math.min(index, all.length - 1))];
    if (target) t.scrollTo({ left: offset(t, target) });
};

export const bindSliders = (doc: Document = document): (() => void) => {
    const click = (event: Event): void => {
        if (!(event.target instanceof Element)) return;
        const root = event.target.closest(slider);
        const t = root?.querySelector<HTMLElement>(track);
        if (!root || !t) return;
        const arrow = event.target.closest<HTMLElement>('[data-direction]');
        const dot = event.target.closest('.slider-dots__dot');
        if (arrow) goTo(t, activeIndex(t) + (arrow.dataset.direction === 'next' ? 1 : -1));
        else if (dot) goTo(t, parts(root).dots.indexOf(dot as HTMLButtonElement));
    };
    const key = (event: KeyboardEvent): void => {
        const t = event.target instanceof HTMLElement && event.target.matches(track) ? event.target : null;
        if (!t || (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft')) return;
        event.preventDefault();
        goTo(t, activeIndex(t) + (event.key === 'ArrowRight' ? 1 : -1));
    };
    // Scroll does not bubble; capturing on the document sees every track, including ones rendered later.
    let frame = 0;
    const scroll = (event: Event): void => {
        if (!(event.target instanceof Element) || !event.target.matches(track)) return;
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => syncSliders(doc));
    };
    doc.addEventListener('click', click);
    doc.addEventListener('keydown', key);
    doc.addEventListener('scroll', scroll, true);
    return () => {
        doc.removeEventListener('click', click);
        doc.removeEventListener('keydown', key);
        doc.removeEventListener('scroll', scroll, true);
    };
};
