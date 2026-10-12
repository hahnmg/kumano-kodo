import type { Meta, StoryObj } from '@storybook/html-vite';
import { localized } from '../templates/content';
import { fileUpload, type FileUploadProps } from './file-upload.markup';

const meta: Meta<FileUploadProps> = {
    title: 'Atoms/File Upload',
    render: localized(
        (p: FileUploadProps) => `<div style="max-width:539px">${fileUpload(p)}</div>`,
        (c) => ({
            label: c.walkForm.routeFile,
            dropLabel: c.ui.uploadDrop,
            chooseLabel: c.ui.uploadChoose,
            description: c.walkForm.fileHint,
            removeLabel: c.walkForm.remove,
        }),
    ),
    args: { name: 'route-file', accept: 'application/pdf' },
};
export default meta;

export const FileUpload: StoryObj<FileUploadProps> = {};
export const Uploaded: StoryObj<FileUploadProps> = { args: { files: ['nakahechi.pdf'] } };
export const Invalid: StoryObj<FileUploadProps> = {
    render: localized(
        (p: FileUploadProps) => `<div style="max-width:539px">${fileUpload(p)}</div>`,
        (c) => ({
            label: `${c.walkForm.routeFile} *`,
            dropLabel: c.ui.uploadDrop,
            chooseLabel: c.ui.uploadChoose,
            error: c.ui.fieldRequired,
            required: true,
        }),
    ),
};
