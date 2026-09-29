import type { Meta, StoryObj } from '@storybook/html-vite';
import { guide } from '../templates/content';
import { notice, type NoticeProps } from './notice.markup';

const meta: Meta<NoticeProps> = { title: 'Molecules/Notice', render: (args) => notice(args), args: guide.footer.notice };
export default meta;

export const Notice: StoryObj<NoticeProps> = {};
