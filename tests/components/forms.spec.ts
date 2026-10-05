import { describe, expect, it } from 'vitest';
import { checkbox } from '../../stories/atoms/checkbox.markup';
import { textField } from '../../stories/atoms/text-field.markup';
import { form } from '../../stories/molecules/form.markup';
import { loginForm } from '../../stories/molecules/login-form.markup';
import { expectAccessible, mount } from '../support/accessibility';

const labels = {
    username: 'Username',
    password: 'Password',
    stayLoggedIn: 'Stay logged in',
    logIn: 'Log in',
    forgotPassword: 'Forgot your password?',
    loginFailed: 'Login failed',
    loginFailedText: 'Username or password were not accepted.',
    loggedInAs: 'Logged in as %1$s',
    logOut: 'Log out',
};

describe('forms', () => {
    it('ties an error to its control', () => {
        const input = mount(textField({ label: 'Email', name: 'email', error: 'Please enter a valid email address.' })).querySelector(
            'input',
        );
        expect(input?.getAttribute('aria-invalid')).toBe('true');
        expect(document.getElementById(input?.getAttribute('aria-describedby') ?? '')?.textContent).toContain('valid email');
    });
    it('logs in with user and password fields that browsers can fill', () => {
        const el = mount(loginForm({ action: '/login', labels }));
        expect(el.querySelector('input[name="user"]')?.getAttribute('autocomplete')).toBe('username');
        expect(el.querySelector('input[name="pass"]')?.getAttribute('type')).toBe('password');
        expect(el.querySelector('[role="note"]')).toBeNull();
    });
    it('shows the failure as a note and the logged-in state as a logout', () => {
        expect(mount(loginForm({ action: '/login', labels, failed: true })).querySelector('[role="note"]')).not.toBeNull();
        const out = mount(loginForm({ action: '/login', labels, user: 'Hanako' }));
        expect(out.textContent).toContain('Logged in as Hanako');
        expect(out.querySelector('input')).toBeNull();
    });
    it('passes axe', async () => {
        await expectAccessible(loginForm({ action: '/login', labels, failed: true }));
        await expectAccessible(
            form({
                action: '/contact',
                fields: [
                    textField({ label: 'Name *', name: 'name', required: true, error: 'Please fill in this field.' }),
                    checkbox({ label: 'I agree *', name: 'consent', required: true, error: 'Please fill in this field.' }),
                ],
                note: 'Fields marked * are required.',
                submit: 'Send',
            }),
        );
    });
});
