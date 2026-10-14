export type Scheme = 'light' | 'dark';

const toggle = '.scheme-toggle';
// Read again by the inline script in the page head, so a stored choice applies before the first paint.
export const schemeKey = 'kumano-kodo.scheme';

export const currentScheme = (doc: Document = document): Scheme => (doc.documentElement.dataset.scheme === 'dark' ? 'dark' : 'light');

export const syncSchemeToggles = (doc: Document = document): void => {
  const pressed = String(currentScheme(doc) === 'dark');
  doc.querySelectorAll(toggle).forEach((button) => button.setAttribute('aria-pressed', pressed));
};

export const setScheme = (scheme: Scheme, doc: Document = document): void => {
  doc.documentElement.dataset.scheme = scheme;
  syncSchemeToggles(doc);
};

// Delegated on the document so headers rendered later (Storybook, Ajax) work without rebinding.
export const bindSchemeToggle = (doc: Document = document, onChange?: (scheme: Scheme) => void): (() => void) => {
  const handler = (event: Event): void => {
    if (!(event.target instanceof Element) || !event.target.closest(toggle)) return;
    const next: Scheme = currentScheme(doc) === 'dark' ? 'light' : 'dark';
    setScheme(next, doc);
    onChange?.(next);
  };
  doc.addEventListener('click', handler);
  return () => doc.removeEventListener('click', handler);
};

// Private windows and blocked storage throw; the choice then lasts for this page only.
export const rememberScheme = (scheme: Scheme): void => {
  try {
    localStorage.setItem(schemeKey, scheme);
  } catch {
    // Nothing to keep it in.
  }
};
