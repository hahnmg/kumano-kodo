# Proposal: class names in the core's hyphen style

Status: accepted and built 2026-10-12 (4176471).

## Rules

- **Hyphens only**, as fluid_styled_content: a part is `block-part`, a variant `block-variant`, a variant of a part `block-part-variant`. No `__`, no `--`.
- **States are attributes**, never classes: `aria-current`, `aria-expanded`, `aria-invalid`, `aria-pressed`, `data-open`, `data-stuck`. CSS selects them.
- **Names say what a thing does**, not what the demo is about. Blocks named after the trail journal get functional names; the colour token `--color-moss` becomes `--color-secondary`.
- **No prefix.** Unchanged: `type-*` utilities, `data-*` hooks, `data-theme`/`data-scheme`, layout custom properties such as `--stack-gap`.
- **Follows along:** Figma components, Storybook titles and the component docs take the new block names (Stage Card → Portrait Card).
- **Not in scope:** content element types (`kumano_*`) and table and field names in TYPO3; they are stored data, renaming them would break existing content.

## Renamed for their function

| Before | After | Why |
| --- | --- | --- |
| `stage-card` | `portrait-card` | A card with a 4:5 image, label and stats; not tied to stages |
| `day-row`, `day-list` | `timeline-item`, `timeline` | Any dated sequence, not only days of a walk |
| `journal-opener` | `page-intro` | The opening of any page without a hero image |
| `bleed-photo` | `bleed-image` | Any image across the viewport |
| `place-card` | `feature-card` | Image, title and text for any featured item |
| `route-map-key-walked` | `route-map-key-completed` | The finished part of any route |
| `chapter__photo(s)` | `chapter-media(-item)` | Media, not only photos |
| `--color-moss` | `--color-secondary` | The second colour of every theme |

## States become attributes

| Before | After |
| --- | --- |
| `.breadcrumb__item--current` | `.breadcrumb-item[aria-current]` |
| `.chip--active` | `.chip[aria-current]` |
| `.field--invalid` | `.field:has([aria-invalid="true"])` |
| `.slider-dots__dot--active` | `.slider-dots-dot[aria-current]` |

## One collision resolved

`slider__dots` (the dots area of the slider) and `slider-dots` (the dots component) would both become `slider-dots`; the area is `slider-indicator`.

## Every class (312, 234 change)

**bleed-photo** → `bleed-image`: `bleed-photo` → `bleed-image`, `bleed-photo__caption` → `bleed-image-caption`, `bleed-photo__image` → `bleed-image-image`

**breadcrumb**: `breadcrumb__item` → `breadcrumb-item`, `breadcrumb__item--current` → `.breadcrumb-item[aria-current]`, `breadcrumb__list` → `breadcrumb-list`

**button**: `button--light` → `button-light`, `button--outline` → `button-outline`, `button--primary` → `button-primary`

**chapter**: `chapter__caption` → `chapter-caption`, `chapter__date` → `chapter-date`, `chapter__head` → `chapter-head`, `chapter__image` → `chapter-image`, `chapter__inner` → `chapter-inner`, `chapter__number` → `chapter-number`, `chapter__photo` → `chapter-media-item`, `chapter__photo--landscape` → `chapter-media-item-landscape`, `chapter__photo--shift-1` → `chapter-media-item-shift-1`, `chapter__photo--shift-2` → `chapter-media-item-shift-2`, `chapter__photos` → `chapter-media`, `chapter__text` → `chapter-text`, `chapter__title` → `chapter-title`

**chip**: `chip--active` → `.chip[aria-current]`

**choice**: `choice--checkbox` → `choice-checkbox`, `choice__input` → `choice-input`, `choice__label` → `choice-label`

**cta-card**: `cta-card--featured` → `cta-card-featured`, `cta-card__link` → `cta-card-link`, `cta-card__text` → `cta-card-text`, `cta-card__title` → `cta-card-title`

**day-list** → `timeline`: `day-list` → `timeline`

**day-row** → `timeline-item`: `day-row` → `timeline-item`, `day-row__date` → `timeline-item-date`, `day-row__description` → `timeline-item-text`, `day-row__route` → `timeline-item-title`, `day-row__time` → `timeline-item-time`

**download-list**: `download-list__meta` → `download-list-meta`, `download-list__row` → `download-list-row`, `download-list__text` → `download-list-text`

**fact-list**: `fact-list--inline` → `fact-list-inline`, `fact-list__items` → `fact-list-items`, `fact-list__row` → `fact-list-row`, `fact-list__title` → `fact-list-title`

**faq-item**: `faq-item__answer` → `faq-item-answer`, `faq-item__question` → `faq-item-question`

**field**: `field--invalid` → `.field:has([aria-invalid="true"])`, `field__box` → `field-box`, `field__control` → `field-control`, `field__control--select` → `field-control-select`, `field__control--textarea` → `field-control-textarea`, `field__error` → `field-error`, `field__label` → `field-label`

**figure**: `figure--pair` → `figure-pair`, `figure--unruled` → `figure-unruled`, `figure__caption` → `figure-caption`, `figure__image` → `figure-image`, `figure__images` → `figure-images`

**form**: `form__note` → `form-note`

**gallery**: `gallery__caption` → `gallery-caption`, `gallery__grid` → `gallery-grid`, `gallery__image` → `gallery-image`

**grid**: `grid--2` → `grid-2`, `grid--3` → `grid-3`, `grid--4` → `grid-4`

**hero**: `hero__actions` → `hero-actions`, `hero__content` → `hero-content`, `hero__eyebrow` → `hero-eyebrow`, `hero__image` → `hero-image`, `hero__shade` → `hero-shade`, `hero__stats` → `hero-stats`, `hero__teaser` → `hero-teaser`, `hero__title` → `hero-title`

**hero-split**: `hero-split__inner` → `hero-split-inner`, `hero-split__text` → `hero-split-text`

**highlight**: `highlight__body` → `highlight-body`, `highlight__emblem` → `highlight-emblem`, `highlight__eyebrow` → `highlight-eyebrow`, `highlight__text` → `highlight-text`, `highlight__title` → `highlight-title`

**icon-fact**: `icon-fact__label` → `icon-fact-label`, `icon-fact__note` → `icon-fact-note`, `icon-fact__text` → `icon-fact-text`, `icon-fact__value` → `icon-fact-value`

**info-box**: `info-box__links` → `info-box-links`, `info-box__text` → `info-box-text`, `info-box__title` → `info-box-title`

**journal-opener** → `page-intro`: `journal-opener` → `page-intro`, `journal-opener__inner` → `page-intro-inner`, `journal-opener__kicker` → `page-intro-eyebrow`, `journal-opener__lede` → `page-intro-lede`, `journal-opener__meta` → `page-intro-meta`, `journal-opener__title` → `page-intro-title`, `journal-opener__vertical` → `page-intro-upright`

**lightbox**: `lightbox__button` → `lightbox-button`, `lightbox__caption` → `lightbox-caption`, `lightbox__close` → `lightbox-close`, `lightbox__count` → `lightbox-count`, `lightbox__figure` → `lightbox-figure`, `lightbox__image` → `lightbox-image`, `lightbox__nav` → `lightbox-nav`, `lightbox__nav--next` → `lightbox-nav-next`, `lightbox__nav--previous` → `lightbox-nav-previous`

**link**: `link--back` → `link-back`, `link--forward` → `link-forward`, `link__arrow` → `link-arrow`, `link__label` → `link-label`

**link-tile**: `link-tile__title` → `link-tile-title`

**login-form**: `login-form__actions` → `login-form-actions`

**logo**: `logo--title` → `logo-title`, `logo__bird` → `logo-bird`, `logo__mark` → `logo-mark`, `logo__mark--classic` → `logo-mark-classic`, `logo__mark--modern` → `logo-mark-modern`, `logo__text` → `logo-text`

**media-list**: `media-list__items` → `media-list-items`, `media-list__meta` → `media-list-meta`, `media-list__more` → `media-list-more`, `media-list__row` → `media-list-row`, `media-list__text` → `media-list-text`, `media-list__title` → `media-list-title`

**menu-button**: `menu-button__bar` → `menu-button-bar`

**nav-flyout**: `nav-flyout--dropdown` → `nav-flyout-dropdown`, `nav-flyout--mega` → `nav-flyout-mega`, `nav-flyout--search` → `nav-flyout-search`, `nav-flyout__grid` → `nav-flyout-grid`, `nav-flyout__link` → `nav-flyout-link`, `nav-flyout__links` → `nav-flyout-links`, `nav-flyout__teaser` → `nav-flyout-teaser`, `nav-flyout__text` → `nav-flyout-text`, `nav-flyout__title` → `nav-flyout-title`

**notice**: `notice__body` → `notice-body`, `notice__title` → `notice-title`

**page-header**: `page-header__chips` → `page-header-chips`, `page-header__inner` → `page-header-inner`, `page-header__title` → `page-header-title`

**pagination**: `pagination__item` → `pagination-item`, `pagination__list` → `pagination-list`

**person-card**: `person-card__focus` → `person-card-focus`, `person-card__name` → `person-card-name`, `person-card__role` → `person-card-role`

**place-card** → `feature-card`: `place-card` → `feature-card`, `place-card--default` → `feature-card-default`, `place-card--ruled` → `feature-card-ruled`, `place-card__description` → `feature-card-text`, `place-card__image` → `feature-card-image`, `place-card__title` → `feature-card-title`

**quote**: `quote__source` → `quote-source`, `quote__text` → `quote-text`

**route-map**: `route-map__boundary` → `route-map-boundary`, `route-map__days` → `route-map-segments`, `route-map__key` → `route-map-key`, `route-map__key--boundary` → `route-map-key-boundary`, `route-map__key--end` → `route-map-key-end`, `route-map__key--walked` → `route-map-key-completed`, `route-map__label` → `route-map-label`, `route-map__legend` → `route-map-legend`, `route-map__path` → `route-map-path`, `route-map__scroll` → `route-map-scroll`, `route-map__station` → `route-map-station`, `route-map__station--end` → `route-map-station-end`, `route-map__svg` → `route-map-svg`

**scheme-toggle**: `scheme-toggle__dot` → `scheme-toggle-dot`

**search-results**: `search-results__excerpt` → `search-results-excerpt`, `search-results__items` → `search-results-items`, `search-results__summary` → `search-results-summary`, `search-results__text` → `search-results-text`

**section**: `section--bleed` → `section-bleed`, `section--space-flush-top` → `section-space-flush-top`, `section--space-large` → `section-space-large`, `section--space-none` → `section-space-none`, `section--sunk` → `section-sunk`, `section__inner` → `section-inner`

**section-heading**: `section-heading--with-aside` → `section-heading-with-aside`, `section-heading__aside` → `section-heading-aside`, `section-heading__controls` → `section-heading-controls`, `section-heading__eyebrow` → `section-heading-eyebrow`, `section-heading__main` → `section-heading-main`, `section-heading__title` → `section-heading-title`

**site-footer**: `site-footer__about` → `site-footer-about`, `site-footer__column` → `site-footer-column`, `site-footer__columns` → `site-footer-columns`, `site-footer__legal` → `site-footer-legal`, `site-footer__notice` → `site-footer-notice`, `site-footer__wordmark` → `site-footer-wordmark`

**site-header**: `site-header__item` → `site-header-item`, `site-header__item--mega` → `site-header-item-mega`, `site-header__item--search` → `site-header-item-search`, `site-header__languages` → `site-header-languages`, `site-header__link` → `site-header-link`, `site-header__list` → `site-header-list`, `site-header__nav` → `site-header-nav`, `site-header__panel` → `site-header-panel`, `site-header__search-toggle` → `site-header-search-toggle`, `site-header__toggle` → `site-header-toggle`, `site-header__tools` → `site-header-tools`

**slider**: `slider__dots` → `slider-indicator`, `slider__track` → `slider-track`

**slider-dots**: `slider-dots__dot` → `slider-dots-dot`, `slider-dots__dot--active` → `.slider-dots-dot[aria-current]`

**split**: `split--align-center` → `split-align-center`, `split--align-end` → `split-align-end`, `split--align-start` → `split-align-start`, `split--content-sidebar` → `split-content-sidebar`, `split--even` → `split-even`, `split--heading-content` → `split-heading-content`, `split--narrow-wide` → `split-narrow-wide`, `split--text-media` → `split-text-media`, `split--wide-narrow` → `split-wide-narrow`

**stage-card** → `portrait-card`: `stage-card` → `portrait-card`, `stage-card__description` → `portrait-card-text`, `stage-card__image` → `portrait-card-image`, `stage-card__meta` → `portrait-card-meta`, `stage-card__stage` → `portrait-card-label`, `stage-card__stats` → `portrait-card-stats`, `stage-card__title` → `portrait-card-title`

**stat**: `stat--large` → `stat-large`, `stat--on-image` → `stat-on-image`, `stat__label` → `stat-label`, `stat__value` → `stat-value`

**sub-nav**: `sub-nav__link` → `sub-nav-link`, `sub-nav__list` → `sub-nav-list`, `sub-nav__title` → `sub-nav-title`

**teaser-card**: `teaser-card__body` → `teaser-card-body`, `teaser-card__image` → `teaser-card-image`, `teaser-card__media` → `teaser-card-media`, `teaser-card__meta` → `teaser-card-meta`, `teaser-card__subtitle` → `teaser-card-subtitle`, `teaser-card__title` → `teaser-card-title`

**text-media**: `text-media--image-right` → `text-media-image-right`, `text-media__body` → `text-media-body`, `text-media__image` → `text-media-image`, `text-media__text` → `text-media-text`

**topbar**: `topbar__contact` → `topbar-contact`, `topbar__hours` → `topbar-hours`

Unchanged (78): `avatar`, `badge`, `button`, `center`, `chapter`, `chip`, `choice`, `choice-field`, `cluster`, `cta-card`, `download-list`, `fact-list`, `faq-item`, `faq-list`, `field`, `figure`, `form`, `gallery`, `grid`, `hero`, `hero-split`, `highlight`, `icon`, `icon-button`, `icon-circle`, `icon-fact`, `info-box`, `lightbox`, `lightbox-link`, `link`, `link-tile`, `login-form`, `logo`, `media-list`, `menu-button`, `nav-flyout`, `newsletter-form`, `notice`, `page-header`, `person-card`, `quote`, `rail`, `rich-text`, `route-map`, `scheme-toggle`, `search-form`, `section`, `section-heading`, `site-footer`, `site-header`, `slider`, `slider-dots`, `split`, `stack`, `stat`, `stat-row`, `table`, `table-wrap`, `teaser-card`, `text-media`, `topbar`, `type-body`, `type-button`, `type-caption`, `type-h2`, `type-h3`, `type-h3-regular`, `type-h4`, `type-h4-regular`, `type-hero`, `type-label`, `type-lead`, `type-logo`, `type-quote`, `type-small`, `type-stat`, `type-wordmark`, `visually-hidden`
