import type { LinksFunction } from 'remix';
import { NavLink, Outlet } from 'remix';

import Header from '../components/Header';
import { areas } from '../_constants';
import Footer from '../components/Footer';

import priceStylesUrl from '~/styles/price.css';

export let links: LinksFunction = () => {
    return [{ rel: 'stylesheet', href: priceStylesUrl }];
};

export default function PriceRoute() {
    return (
        <div className="price-container">
            <Header />
            <div className="container">
                <div className="link-container">
                    {areas.map((item) => (
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
            <Footer />
        </div>
    );
}
