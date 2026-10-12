import { attrs, esc } from '../../src/lib/html';
import { fieldDescription, fieldError, invalidAttrs } from './field-error.markup';
import { icon } from './icon.markup';

export interface FileUploadProps {
    label: string;
    name: string;
    /** "Drag a file here or", followed by the choose label. */
    dropLabel: string;
    chooseLabel: string;
    accept?: string;
    multiple?: boolean;
    required?: boolean;
    error?: string;
    description?: string;
    /** Files already uploaded on an earlier step, each with a box to remove it. */
    files?: string[];
    removeLabel?: string;
}

// The file input lies over the dashed face (same grid cell), so a click or a drop there reaches it without a script;
// src/scripts/file-upload.ts only marks the zone while dragging and names the chosen files.
export const fileUpload = ({
    label,
    name,
    dropLabel,
    chooseLabel,
    accept,
    multiple,
    required,
    error,
    description,
    files = [],
    removeLabel = 'Remove',
}: FileUploadProps): string =>
    `<div class="field file-upload">` +
    `<label class="field-label type-label" for="${esc(name)}">${esc(label)}</label>` +
    `<div class="file-upload-zone" data-file-upload>` +
    `<input${attrs({ class: 'file-upload-input', type: 'file', id: name, name, accept, multiple, required, ...invalidAttrs(name, error, description) })}>` +
    `<span class="file-upload-face">${icon({ name: 'download', size: 20 })}` +
    `<span class="file-upload-prompt type-small">${esc(dropLabel)} <span class="file-upload-choose">${esc(chooseLabel)}</span></span>` +
    `<span class="file-upload-chosen type-caption" aria-live="polite"></span></span>` +
    (files.length
        ? `<ul class="file-upload-list type-small">` +
          files
              .map(
                  (f, i) =>
                      `<li class="file-upload-item"><span class="file-upload-name">${esc(f)}</span>` +
                      `<label class="choice choice-checkbox"><input${attrs({ class: 'choice-input', type: 'checkbox', name: `${name}-remove[${i}]` })}><span class="choice-label type-caption">${esc(removeLabel)}<span class="visually-hidden"> ${esc(f)}</span></span></label></li>`,
              )
              .join('') +
          `</ul>`
        : '') +
    `</div>` +
    fieldError(name, error) +
    fieldDescription(name, description) +
    `</div>`;
