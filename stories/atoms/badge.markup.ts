import { esc } from '../../src/lib/html';

export interface BadgeProps {
  label: string;
}

export const badge = ({ label }: BadgeProps): string => `<span class="badge type-caption">${esc(label)}</span>`;
