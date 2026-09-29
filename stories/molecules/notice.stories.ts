import type { Meta, StoryObj } from '@storybook/html-vite';
import { localized } from '../templates/content';
import { notice, type NoticeProps } from './notice.markup';

const meta: Meta<NoticeProps> = { title: 'Molecules/Notice', render: localized(notice, (c) => c.guide.footer.notice) };
export default meta;

export const Notice: StoryObj<NoticeProps> = {};
