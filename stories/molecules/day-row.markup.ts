import { esc } from '../../src/lib/html';

export interface DayRowProps {
    date: string;
    route: string;
    description: string;
    time: string;
}

export const dayRow = ({ date, route, description, time }: DayRowProps): string =>
    `<li class="day-row">` +
    `<p class="day-row__date type-label">${esc(date)}</p>` +
    `<h3 class="day-row__route type-h4">${esc(route)}</h3>` +
    `<p class="day-row__description type-small">${esc(description)}</p>` +
    `<p class="day-row__time type-caption">${esc(time)}</p>` +
    `</li>`;

export const dayList = (rows: DayRowProps[]): string => `<ol class="day-list">${rows.map(dayRow).join('')}</ol>`;
