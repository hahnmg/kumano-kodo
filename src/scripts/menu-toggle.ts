const button = '.menu-button';

const setOpen = (header: Element, open: boolean): void => {
    header.toggleAttribute('data-menu-open', open);
    header.querySelector(button)?.setAttribute('aria-expanded', String(open));
};

// Delegated like the scheme toggle; Escape closes an open menu and returns focus to its button.
export const bindMenuToggle = (doc: Document = document): (() => void) => {
    const click = (event: Event): void => {
        const toggle = event.target instanceof Element ? event.target.closest(button) : null;
        const header = toggle?.closest('.site-header');
        if (header) setOpen(header, !header.hasAttribute('data-menu-open'));
    };
    const key = (event: KeyboardEvent): void => {
        // An open flyout takes the first Escape; the menu closes on the next one.
        if (event.key !== 'Escape' || doc.querySelector('.site-header__item[data-open]')) return;
        doc.querySelectorAll('.site-header[data-menu-open]').forEach((header) => {
            setOpen(header, false);
            header.querySelector<HTMLElement>(button)?.focus();
        });
    };
    doc.addEventListener('click', click);
    doc.addEventListener('keydown', key);
    return () => {
        doc.removeEventListener('click', click);
        doc.removeEventListener('keydown', key);
    };
};
