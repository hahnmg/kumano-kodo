import { esc } from '../../src/lib/html';

export interface DayRowProps {
    date: string;
    route: string;
    description: string;
    time: string;
}

export const timelineItem = ({ date, route, description, time }: DayRowProps): string =>
    `<li class="timeline-item">` +
    `<p class="timeline-item-date type-label">${esc(date)}</p>` +
    `<h3 class="timeline-item-title type-h4">${esc(route)}</h3>` +
    `<p class="timeline-item-text type-small">${esc(description)}</p>` +
    `<p class="timeline-item-time type-caption">${esc(time)}</p>` +
    `</li>`;

export const timeline = (rows: DayRowProps[]): string => `<ol class="timeline">${rows.map(timelineItem).join('')}</ol>`;
