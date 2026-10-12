const item = '.site-header-item';
const toggle = '.site-header-toggle';

const setOpen = (li: Element, open: boolean): void => {
    li.toggleAttribute('data-open', open);
    li.querySelector(`:scope > ${toggle}`)?.setAttribute('aria-expanded', String(open));
};

const closeAll = (doc: Document, except?: Element): void =>
    doc.querySelectorAll(`${item}[data-open]`).forEach((li) => li !== except && setOpen(li, false));

// Disclosure navigation: a click toggles one flyout and closes the others; Escape, a click
// elsewhere or tabbing out of the item closes it again.
export const bindNavFlyouts = (doc: Document = document): (() => void) => {
    const click = (event: Event): void => {
        const target = event.target instanceof Element ? event.target : null;
        const button = target?.closest(toggle);
        const li = button?.closest(item);
        if (li) {
            const open = !li.hasAttribute('data-open');
            closeAll(doc, li);
            setOpen(li, open);
            // A panel that holds a form, such as the search, takes the focus straight into its field.
            if (open) li.querySelector<HTMLElement>('.nav-flyout input')?.focus();
            return;
        }
        if (!target?.closest(`${item}[data-open]`)) closeAll(doc);
    };
    const key = (event: KeyboardEvent): void => {
        if (event.key !== 'Escape') return;
        const li = doc.querySelector(`${item}[data-open]`);
        if (!li) return;
        setOpen(li, false);
        li.querySelector<HTMLElement>(toggle)?.focus();
    };
    const focusout = (event: FocusEvent): void => {
        const li = event.target instanceof Element ? event.target.closest(`${item}[data-open]`) : null;
        if (li && !(event.relatedTarget instanceof Node && li.contains(event.relatedTarget))) setOpen(li, false);
    };
    doc.addEventListener('click', click);
    doc.addEventListener('keydown', key);
    doc.addEventListener('focusout', focusout);
    return () => {
        doc.removeEventListener('click', click);
        doc.removeEventListener('keydown', key);
        doc.removeEventListener('focusout', focusout);
    };
};
