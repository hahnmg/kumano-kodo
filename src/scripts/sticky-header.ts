const header = '.site-header';

// A header counts as docked once it sits at the top while the page is scrolled; the topbar above it scrolls away.
export const syncStickyHeaders = (win: Window = window): void => {
  win.document.querySelectorAll(header).forEach((el) => {
    const docked = win.scrollY > 0 && el.getBoundingClientRect().top <= 0 && getComputedStyle(el).position === 'sticky';
    el.toggleAttribute('data-stuck', docked);
  });
};

export const bindStickyHeader = (win: Window = window): (() => void) => {
  let frame = 0;
  const schedule = (): void => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => syncStickyHeaders(win));
  };
  win.addEventListener('scroll', schedule, { passive: true });
  win.addEventListener('resize', schedule);
  schedule();
  return () => {
    cancelAnimationFrame(frame);
    win.removeEventListener('scroll', schedule);
    win.removeEventListener('resize', schedule);
  };
};
