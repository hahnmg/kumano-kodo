# Lightbox

Figma: Lightbox (37:242). Script: `src/scripts/lightbox.ts`. Styles:
`stories/molecules/lightbox.css`.

Images in Gallery and Figure are links to the image file (`a[data-lightbox]`),
grouped by `data-lightbox-group` on the figure. Without the script a click opens
the image. With it, a modal `<dialog>` shows the image on dark ground with its
alt text and a counter; arrows and the arrow keys step through the group, the
close button, Escape or a click beside the image close it, and focus returns to
the image that opened it. Labels come from the group's `data-label-*`
attributes, set through the `labels` prop of Gallery and Figure.

Tokens: `--color-on-image`, `--color-on-image-ink`, `--gutter`, `--space-*`,
`--radius-full`, `--motion-*`.
