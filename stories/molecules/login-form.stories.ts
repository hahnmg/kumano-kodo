import type { Meta, StoryObj } from '@storybook/html-vite';
import { content, type Content } from '../templates/content';
import { loginForm, type LoginFormProps } from './login-form.markup';

const labels = ({ ui }: Content) => ({
    username: ui.username,
    password: ui.password,
    stayLoggedIn: ui.stayLoggedIn,
    logIn: ui.logIn,
    forgotPassword: ui.forgotPassword,
    loginFailed: ui.loginFailed,
    loginFailedText: ui.loginFailedText,
    loggedInAs: ui.loggedInAs,
    logOut: ui.logOut,
});

const render =
    (props: Partial<LoginFormProps>): StoryObj['render'] =>
    (_, { globals }) =>
        loginForm({ action: '#', forgotHref: '#', labels: labels(content(globals.locale)), ...props });

const meta: Meta = { title: 'Molecules/Login Form' };
export default meta;

export const LoginForm: StoryObj = { render: render({}) };
export const Failed: StoryObj = { render: render({ failed: true }) };
export const LoggedIn: StoryObj = { render: render({ user: 'Hanako' }) };
