import { attrs, cx } from '../../src/lib/html';

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
                class: cx('slider-dots__dot', i === active && 'slider-dots__dot--active'),
                type: 'button',
                'aria-label': `${label} ${i + 1}`,
                'aria-current': i === active ? 'true' : undefined,
            })}></button>`,
    ).join('') +
    `</div>`;
