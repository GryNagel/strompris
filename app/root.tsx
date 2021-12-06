import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from 'remix';
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

export default function App() {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <Meta />
                <title>Strømpriser</title>
                <link
                    rel="icon"
                    href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>⚡</text></svg>"
                ></link>
                <Links />
            </head>
            <body>
                <Outlet />
                <Scripts />
                <ScrollRestoration />
                {process.env.NODE_ENV === 'development' ? <LiveReload /> : null}
            </body>
        </html>
    );
}
