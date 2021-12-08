import type { ActionFunction, LinksFunction, MetaFunction } from 'remix';
import { Form } from 'remix';
import { useActionData, useSearchParams, Link } from 'remix';

import stylesUrl from '../styles/login.css';

import { db } from '~/_utils/db.server';
import { createUserSession, login, register } from '~/_utils/session.server';

export const meta: MetaFunction = () => {
    return {
        title: `Strømpriser - Logg inn`,
    };
};

export const links: LinksFunction = () => {
    return [{ rel: 'stylesheet', href: stylesUrl }];
};

function validateUsername(username: unknown) {
    if (typeof username !== 'string' || username.length < 3) {
        return `Brukernavnet må ha minst 3 karakterer`;
    }
}

function validatePassword(password: unknown) {
    if (typeof password !== 'string' || password.length < 6) {
        return `Passord må ha minst 6 karakterer`;
    }
}

type ActionData = {
    formError?: string;
    fieldErrors?: {
        username: string | undefined;
        password: string | undefined;
    };
    fields?: {
        loginType: string;
        username: string;
        password: string;
    };
};

export const action: ActionFunction = async ({ request }): Promise<Response | ActionData> => {
    const form = await request.formData();
    const loginType = form.get('loginType');
    const username = form.get('username');
    const password = form.get('password');
    const redirectTo = form.get('redirectTo') || '/';

    if (
        typeof loginType !== 'string' ||
        typeof username !== 'string' ||
        typeof password !== 'string' ||
        typeof redirectTo !== 'string'
    ) {
        return { formError: `Skjema ikke sendt inn riktig` };
    }

    const fields = { loginType, username, password };
    const fieldErrors = {
        username: validateUsername(username),
        password: validatePassword(password),
    };
    if (Object.values(fieldErrors).some(Boolean)) return { fieldErrors, fields };

    switch (loginType) {
        case 'login': {
            const user = await login({ username, password });
            if (!user) {
                return {
                    fields,
                    formError: `Brukernav/Passord er feil :(`,
                };
            }
            return createUserSession(user.id, redirectTo);
        }
        case 'register': {
            const userExists = await db.user.findFirst({
                where: { username },
            });
            if (userExists) {
                return {
                    fields,
                    formError: `Bruker med brukernavn ${username} eksisterer allerede`,
                };
            }
            const user = await register({ username, password });
            if (!user) {
                return {
                    fields,
                    formError: `Noe gikk feil ved opprettelsen av ny bruker.`,
                };
            }
            return createUserSession(user.id, redirectTo);
        }
        default: {
            return { fields, formError: `Innloggingstypen er ikke gyldig` };
        }
    }
};

export default function Login() {
    const actionData = useActionData<ActionData>();
    const [searchParams] = useSearchParams();
    return (
        <div className="container">
            <div className="content" data-light="">
                <h1>Logg inn</h1>
                <Form
                    method="post"
                    aria-describedby={actionData?.formError ? 'form-error-message' : undefined}
                >
                    <input
                        type="hidden"
                        name="redirectTo"
                        value={searchParams.get('redirectTo') ?? undefined}
                    />
                    <fieldset>
                        <legend className="sr-only">Logg inn eller ny konto?</legend>
                        <label>
                            <input
                                type="radio"
                                name="loginType"
                                value="login"
                                defaultChecked={
                                    !actionData?.fields?.loginType ||
                                    actionData?.fields?.loginType === 'login'
                                }
                            />
                            Logg inn
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="loginType"
                                value="register"
                                defaultChecked={actionData?.fields?.loginType === 'register'}
                            />
                            Ny konto
                        </label>
                    </fieldset>
                    <div>
                        <label htmlFor="username-input">Brukernavn</label>
                        <input
                            type="text"
                            id="username-input"
                            name="username"
                            defaultValue={actionData?.fields?.username}
                            aria-invalid={Boolean(actionData?.fieldErrors?.username)}
                            aria-describedby={
                                actionData?.fieldErrors?.username ? 'username-error' : undefined
                            }
                        />
                        {actionData?.fieldErrors?.username ? (
                            <p className="form-validation-error" role="alert" id="username-error">
                                {actionData?.fieldErrors.username}
                            </p>
                        ) : null}
                    </div>
                    <div>
                        <label htmlFor="password-input">Passord</label>
                        <input
                            id="password-input"
                            name="password"
                            defaultValue={actionData?.fields?.password}
                            type="password"
                            aria-invalid={Boolean(actionData?.fieldErrors?.password) || undefined}
                            aria-describedby={
                                actionData?.fieldErrors?.password ? 'password-error' : undefined
                            }
                        />
                        {actionData?.fieldErrors?.password ? (
                            <p className="form-validation-error" role="alert" id="password-error">
                                {actionData?.fieldErrors.password}
                            </p>
                        ) : null}
                    </div>
                    <div id="form-error-message">
                        {actionData?.formError ? (
                            <p className="form-validation-error" role="alert">
                                {actionData?.formError}
                            </p>
                        ) : null}
                    </div>
                    <button type="submit" className="button">
                        Send inn
                    </button>
                </Form>
            </div>
            <div className="links">
                <ul>
                    <li>
                        <Link to="/">Hjem</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}
