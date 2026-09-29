import type { Meta, StoryObj } from '@storybook/html-vite';
import { demo } from '../templates/content';
import { notice, type NoticeProps } from './notice.markup';

const meta: Meta<NoticeProps> = { title: 'Molecules/Notice', render: (args) => notice(args), args: demo.footer.notice };
export default meta;

export const Notice: StoryObj<NoticeProps> = {};
