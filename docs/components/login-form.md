# Login Form

Figma: Login Form (66:319), states Default, Failed, Logged in. Markup:
`stories/molecules/login-form.markup.ts`.

The frontend login (felogin): username, password, "stay logged in", the button
and the link to reset the password. A failed attempt shows a Notice above the
fields; once logged in the form becomes the logout. At most 440px wide.

| Prop               | Values                         |
| ------------------ | ------------------------------ |
| `action`, `labels` | text                           |
| `forgotHref`       | optional                       |
| `failed`           | shows the failure note         |
| `user`             | logged-in state with this name |

Tokens: `--space-24`.
