import { Link, Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useCatch } from 'remix';
import type { LinksFunction } from 'remix';

import globalStylesUrl from '~/styles/global.css';
import darkStylesUrl from '~/styles/dark.css';

export let links: LinksFunction = () => {
    return [
        { rel: 'stylesheet', href: globalStylesUrl },
        {
            rel: 'stylesheet',
            href: darkStylesUrl,
            media: '(prefers-color-scheme: dark)',
        },
    ];
};

function Document({
    children,
    title = 'Strømpriser',
}: {
    children: React.ReactNode;
    title?: string;
}) {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <Meta />
                <title>{title}</title>
                <link
                    rel="icon"
                    href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>⚡</text></svg>"
                ></link>
                <Links />
            </head>
            <body>
                <Scripts />
                <ScrollRestoration />
                {children}
                {process.env.NODE_ENV === 'development' ? <LiveReload /> : null}
            </body>
        </html>
    );
}

export default function App() {
    return (
        <Document>
            <Outlet />
        </Document>
    );
}

export function CatchBoundary() {
    const caught = useCatch();

    if (caught.status === 404) {
        return (
            <Document title={`${caught.status} ${caught.statusText}`}>
                <div className="error-wrapper">
                    <div className="error-container">
                        ⚡{caught.status}⚡ <h1>Side ikke funnet!</h1>
                        <Link className="error-link" to="/">
                            Hjelp meg hjem
                        </Link>
                    </div>
                </div>
            </Document>
        );
    }

    return (
        <Document title={`${caught.status} ${caught.statusText}`}>
            <div className="error-container">
                <h1>
                    {caught.status} {caught.statusText}
                </h1>
            </div>
        </Document>
    );
}

export function ErrorBoundary({ error }: { error: Error }) {
    return (
        <Document title="Whoops!">
            <div className="error-container">
                <h1>App feil</h1>
                <pre>{error.message}</pre>
            </div>
        </Document>
    );
}
