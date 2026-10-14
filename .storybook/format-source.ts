// "Show code" gets the rendered string: one line, wrapped in the layout divs stories use for width.
// This drops those presentation wrappers and indents the markup so it can be copied into a template.

const inline = new Set(['a', 'abbr', 'b', 'code', 'em', 'i', 'small', 'span', 'strong', 'sub', 'sup', 'time']);
const indent = '    ';

const isWrapper = (el: Element): boolean => el.tagName === 'DIV' && el.attributes.length === 1 && el.hasAttribute('style');

const openTag = (el: Element): string =>
  `<${el.localName}${[...el.attributes].map((a) => (a.value === '' ? ` ${a.name}` : ` ${a.name}="${a.value.replace(/"/g, '&quot;')}"`)).join('')}>`;

const isVoid = (el: Element): boolean => !el.outerHTML.includes(`</${el.localName}>`);

const inlineOnly = (el: Element): boolean =>
  [...el.childNodes].every((n) => n.nodeType === Node.TEXT_NODE || (n instanceof Element && inline.has(n.localName) && inlineOnly(n)));

const format = (node: Node, depth: number): string[] => {
  const pad = indent.repeat(depth);
  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.textContent?.replace(/\s+/g, ' ').trim();
    return text ? [pad + text] : [];
  }
  if (!(node instanceof Element)) return [];
  if (isWrapper(node)) return [...node.childNodes].flatMap((c) => format(c, depth));
  // Icons, inline text and empty or void elements read best on one line.
  if (node.localName === 'svg' || isVoid(node) || node.childNodes.length === 0 || inlineOnly(node)) return [pad + node.outerHTML];
  return [pad + openTag(node), ...[...node.childNodes].flatMap((c) => format(c, depth + 1)), `${pad}</${node.localName}>`];
};

export const formatSource = (html: string): string => {
  const template = document.createElement('template');
  template.innerHTML = html;
  return [...template.content.childNodes].flatMap((n) => format(n, 0)).join('\n');
};
