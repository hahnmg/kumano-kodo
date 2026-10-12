import { attrs } from '../../src/lib/html';

export interface SliderDotsProps {
    count: number;
    active?: number;
    label?: string;
}

export const sliderDots = ({ count, active = 0, label = 'Card' }: SliderDotsProps): string =>
    `<div class="slider-dots">` +
    Array.from(
        { length: count },
        (_, i) =>
            `<button${attrs({
                class: 'slider-dots-dot',
                type: 'button',
                'aria-label': `${label} ${i + 1}`,
                'aria-current': i === active ? 'true' : undefined,
            })}></button>`,
    ).join('') +
    `</div>`;
