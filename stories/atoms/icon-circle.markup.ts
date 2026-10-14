import { icon, type IconName } from './icon.markup';

export interface IconCircleProps {
  name: IconName;
}

export const iconCircle = ({ name }: IconCircleProps): string => `<span class="icon-circle">${icon({ name })}</span>`;
