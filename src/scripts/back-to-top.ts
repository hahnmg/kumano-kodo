const button = '.back-to-top';

export const syncBackToTop = (win: Window = window): void => {
    const shown = win.scrollY > win.innerHeight;
    win.document.querySelectorAll(button).forEach((el) => el.toggleAttribute('data-visible', shown));
};

// Focus moves to the start of the page with the view, so keyboard users continue from the top.
export const bindBackToTop = (win: Window = window): (() => void) => {
    const doc = win.document;
    const click = (event: Event): void => {
        if (!(event.target instanceof Element) || !event.target.closest(button)) return;
        const reduce = win.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
        win.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
        doc.querySelector<HTMLElement>('a[href], button')?.focus({ preventScroll: true });
    };
    let frame = 0;
    const schedule = (): void => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => syncBackToTop(win));
    };
    doc.addEventListener('click', click);
    win.addEventListener('scroll', schedule, { passive: true });
    win.addEventListener('resize', schedule);
    return () => {
        cancelAnimationFrame(frame);
        doc.removeEventListener('click', click);
        win.removeEventListener('scroll', schedule);
        win.removeEventListener('resize', schedule);
    };
};
