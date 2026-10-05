import { attrs, esc, fill } from '../../src/lib/html';
import { button } from '../atoms/button.markup';
import { checkbox } from '../atoms/checkbox.markup';
import { link } from '../atoms/link.markup';
import { textField } from '../atoms/text-field.markup';
import { notice } from './notice.markup';

export interface LoginFormLabels {
    username: string;
    password: string;
    stayLoggedIn: string;
    logIn: string;
    forgotPassword: string;
    loginFailed: string;
    loginFailedText: string;
    loggedInAs: string;
    logOut: string;
}

export interface LoginFormProps {
    action: string;
    labels: LoginFormLabels;
    forgotHref?: string;
    failed?: boolean;
    // Set once logged in: the form becomes the logout.
    user?: string;
}

export const loginForm = ({ action, labels: l, forgotHref, failed = false, user }: LoginFormProps): string =>
    user
        ? `<form${attrs({ class: 'login-form login-form--status', action, method: 'post' })}><p class="type-body">${esc(fill(l.loggedInAs, user))}</p>` +
          `<div>${button({ label: l.logOut, type: 'submit', variant: 'outline' })}</div></form>`
        : `<form${attrs({ class: 'login-form', action, method: 'post' })}>` +
          (failed ? notice({ title: l.loginFailed, text: l.loginFailedText }) : '') +
          textField({ label: l.username, name: 'user', autocomplete: 'username', required: true }) +
          textField({ label: l.password, name: 'pass', type: 'password', autocomplete: 'current-password', required: true }) +
          checkbox({ label: l.stayLoggedIn, name: 'permalogin' }) +
          `<div class="login-form__actions">${button({ label: l.logIn, type: 'submit' })}` +
          (forgotHref ? link({ label: l.forgotPassword, href: forgotHref }) : '') +
          `</div></form>`;
