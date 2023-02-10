import { isBefore, set } from 'date-fns';
import type { LinksFunction } from '@remix-run/react/dist/routeModules';
import type { HeadersFunction, LoaderFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';

import indexStylesUrl from '~/styles/index.css';

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: indexStylesUrl }];
};

function getCacheExpiry() {
  const now = new Date();
  const noon = set(now, { hours: 11, minutes: 59 });
  const midnight = set(now, { hours: 23, minutes: 59 });
  if (isBefore(now, noon)) {
    return noon;
  }
  return midnight;
}

export const headers: HeadersFunction = () => {
  return {
    'cache-control': 'public',
    Expires: getCacheExpiry().toISOString(),
  };
};

export const loader: LoaderFunction = async () => {
  return redirect('/area');
};
