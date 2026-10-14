import type { Meta, StoryObj } from '@storybook/html-vite';
import { esc } from '../../src/lib/html';
import { content, type Content } from '../templates/content';
import { grid, section, stack } from '../layout/layout.markup';
import { ctaCard } from '../molecules/cta-card.markup';
import { faqList } from '../molecules/faq-item.markup';
import { richText } from '../molecules/rich-text.markup';
import { sectionHeading } from '../molecules/section-heading.markup';
import { teaserCard } from '../molecules/teaser-card.markup';

const page =
  (render: (c: Content) => string): StoryObj['render'] =>
  (_, { globals }) =>
    render(content(globals.locale));

// Drafts for Annett's idea of vertical elements in the accent colour; switch theme and scheme in the toolbar.
const meta: Meta = { title: 'Drafts/Vertical accents', tags: ['!autodocs'], parameters: { layout: 'fullscreen' } };
export default meta;

const colourSplit = (column: string, rest: string) =>
  `<div class="draft-colour-split"><div class="draft-colour-column">${column}</div><div>${rest}</div></div>`;

export const ColourColumn: StoryObj = {
  name: 'Colour column in the grid',
  render: page(
    ({ kumano, home }) =>
      section({
        content: colourSplit(
          kumano.stats
            .map(
              (s) =>
                `<p class="draft-colour-figure"><span class="type-stat">${esc(s.value)}</span><span class="type-small">${esc(s.label)}</span></p>`,
            )
            .join(''),
          stack(
            [
              sectionHeading({ eyebrow: home.why.eyebrow, title: home.why.title }),
              richText({ html: kumano.intro.map((p) => `<p>${esc(p)}</p>`).join('') }),
            ],
            'heading',
          ),
        ),
      }) +
      section({
        content: colourSplit(
          `<p class="type-label">${esc(home.practical.eyebrow ?? '')}</p><h2 class="type-h2">${esc(home.practical.title)}</h2>`,
          faqList(kumano.faq),
        ),
      }),
  ),
};

export const CardEdge: StoryObj = {
  name: 'Cards with a colour edge',
  render: page(
    ({ guide, kumano, ui }) =>
      section({
        content: `<div class="draft-edge">${grid(
          guide.prep.map((p) => ctaCard({ ...p, linkLabel: ui.readMore })),
          3,
        )}</div>`,
      }) +
      section({
        content: `<div class="draft-edge">${grid(
          kumano.stages.slice(0, 4).map((s) => teaserCard({ image: s.image, title: s.title, href: s.href, subtitle: s.stats })),
          4,
        )}</div>`,
      }),
  ),
};
