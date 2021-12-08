import type { LinksFunction, LoaderFunction } from 'remix';
import { useLoaderData, NavLink, Outlet } from 'remix';

import Header from '../components/Header';
import { Areas } from '../_constants';
import Footer from '../components/Footer';
import { getUser } from '../_utils/session.server';

import priceStylesUrl from '~/styles/price.css';

export let links: LinksFunction = () => {
    return [{ rel: 'stylesheet', href: priceStylesUrl }];
};

type LoaderData = { userName: string | null };

export let loader: LoaderFunction = async ({ request }): Promise<LoaderData> => {
    let user = await getUser(request);
    let userName = user?.username ? user.username : null;
    return { userName };
};

export default function PriceRoute() {
    const data = useLoaderData<LoaderData>();
    return (
        <div className="price-container">
            <Header />
            <div className="container">
                <div className="link-container">
                    {Areas.map((item) => (
                        <NavLink
                            key={item.number}
                            to={item.number}
                            style={{
                                color: `var(--chart-${item.number})`,
                                borderColor: `var(--chart-${item.number})`,
                                outlineColor: `var(--chart-${item.number})`,
                            }}
                            className={({ isActive }) =>
                                isActive
                                    ? `link link-active link-${item.number}`
                                    : `link link-${item.number}`
                            }
                            prefetch="intent"
                        >
                            {item.title}
                        </NavLink>
                    ))}
                </div>
                <Outlet />
            </div>
            <Footer userName={data.userName} />
        </div>
    );
}
