import { esc } from '../../src/lib/html';
import { checkbox } from '../atoms/checkbox.markup';
import { richText } from './rich-text.markup';

export interface MediaConsentProps {
  text: string;
  toggle: string;
}

// The place to change "always load external videos" again; src/scripts/video.ts keeps the box in step.
export const mediaConsent = ({ text, toggle }: MediaConsentProps): string =>
  `<div class="media-consent">${richText({ html: `<p>${esc(text)}</p>` })}${checkbox({ label: toggle, name: 'media-consent' })}</div>`;
