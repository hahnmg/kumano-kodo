const zone = '[data-file-upload]';

const names = (input: HTMLInputElement): string => [...(input.files ?? [])].map((f) => f.name).join(', ');

// Delegated, like the other scripts; the input itself takes the drop, this only shows that it will.
export const bindFileUploads = (doc: Document = document): (() => void) => {
  const mark = (event: Event, on: boolean): void => {
    const z = event.target instanceof Element ? event.target.closest<HTMLElement>(zone) : null;
    z?.toggleAttribute('data-dragover', on);
  };
  const enter = (event: Event): void => mark(event, true);
  const leave = (event: Event): void => mark(event, false);
  const change = (event: Event): void => {
    const input = event.target instanceof HTMLInputElement && event.target.type === 'file' ? event.target : null;
    const z = input?.closest(zone);
    if (!input || !z) return;
    z.removeAttribute('data-dragover');
    const out = z.querySelector('.file-upload-chosen');
    if (out) out.textContent = names(input);
  };
  doc.addEventListener('dragenter', enter);
  doc.addEventListener('dragleave', leave);
  doc.addEventListener('drop', leave);
  doc.addEventListener('change', change);
  return () => {
    doc.removeEventListener('dragenter', enter);
    doc.removeEventListener('dragleave', leave);
    doc.removeEventListener('drop', leave);
    doc.removeEventListener('change', change);
  };
};
