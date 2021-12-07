import type { LoaderFunction, MetaFunction, ActionFunction } from 'remix';
import { Form } from 'remix';
import { useActionData } from 'remix';
import { Link } from 'remix';
import { useLoaderData } from 'remix';
import { addDays } from 'date-fns';

import PriceChart from '../../components/PriceChart';
import { getPricesForArea } from '../../_utils/price.server';
import { Areas } from '../../_constants';
import type { PriceView } from '../../_models';
import { createIsoDate } from '../../_utils/date';
import { getUser, getUserId } from '../../_utils/session.server';
import { db } from '../../_utils/db.server';

import type { User } from '.prisma/client';

type LoaderData = {
    today: PriceView;
    tomorrow?: PriceView | null;
    areaName: string | undefined;
    user: User | null;
    averagePrice: number;
};

function validateSurcharge(surcharge: string) {
    let parsedSurcharge = parseInt(surcharge);
    if (isNaN(parsedSurcharge)) {
        return `Påslag må være et tall`;
    }
}

export const meta: MetaFunction = ({ params }) => {
    return {
        title: `Strømpriser - ${Areas.find((item) => item.number === params.area)?.title}`,
    };
};

export let loader: LoaderFunction = async ({ params, request }): Promise<LoaderData | null> => {
    const todaysDate = new Date();
    const today = createIsoDate(todaysDate);
    const tomorrow = createIsoDate(addDays(todaysDate, 1));
    let userRes = await getUser(request);
    let user = userRes ? userRes : null;

    if (params.area) {
        let todayRes = await getPricesForArea(params.area, today);
        let tomorrowRes = await getPricesForArea(params.area, tomorrow);

        if (!todayRes) {
            throw Error('Could not get data');
        }

        return {
            today: todayRes,
            tomorrow: tomorrowRes || null,
            averagePrice:
                Math.round(
                    (todayRes.prices.reduce((acc, currentItem) => {
                        acc += currentItem.price;
                        return acc;
                    }, 0) /
                        todayRes.prices.length +
                        Number.EPSILON) *
                        10000
                ) / 10000,
            areaName: Areas.find((item) => item.number === params.area)?.title,
            user,
        };
    }
    return null;
};

type ActionData = {
    formError?: string;
    fieldErrors?: {
        surcharge: string | undefined;
    };
    fields?: {
        surcharge: string | null;
    };
};

export let action: ActionFunction = async ({ request }): Promise<Response | ActionData> => {
    let userId = await getUserId(request);

    if (!userId) {
        return { formError: 'Du må være logget inn' };
    }

    let form = await request.formData();
    let surcharge = form.get('surcharge');

    if (typeof surcharge !== 'string') {
        return { formError: `Skjema ikke sendt inn riktig` };
    }

    const fields = { surcharge };
    const fieldErrors = {
        surcharge: validateSurcharge(surcharge),
    };

    if (Object.values(fieldErrors).some(Boolean)) return { fieldErrors, fields };
    else {
        let user = await db.user.update({ where: { id: userId }, data: { surcharge } });
        return { fields: { surcharge: user.surcharge } };
    }
};

export default function PriceRoute() {
    let data = useLoaderData<LoaderData>();
    const actionData = useActionData<ActionData>();

    return (
        <div>
            <div className="price-chart">
                <PriceChart
                    today={data.today.prices}
                    tomorrow={data.tomorrow?.prices || []}
                    areaName={data.areaName}
                    surcharge={data.user?.surcharge}
                />
            </div>
            <div className="surcharge">
                {data.user ? (
                    <Form method="post">
                        <label htmlFor="surcharge-input" className="surcharge-label">
                            <h2>Påslag i øre: </h2>
                        </label>
                        <input
                            id="surcharge-input"
                            name="surcharge"
                            type="tel"
                            defaultValue={
                                actionData?.fields?.surcharge || data?.user?.surcharge || ''
                            }
                            aria-invalid={Boolean(actionData?.fieldErrors?.surcharge) || undefined}
                            aria-describedby={
                                actionData?.fieldErrors?.surcharge ? 'surcharge-error' : undefined
                            }
                        />
                        {actionData?.fieldErrors?.surcharge ? (
                            <p className="form-validation-error" role="alert" id="password-error">
                                {actionData?.fieldErrors.surcharge}
                            </p>
                        ) : null}
                        <button type="submit" className="button">
                            Legg på påslag
                        </button>
                    </Form>
                ) : (
                    <div>
                        <p>
                            <Link to="/login">Logg inn eller lag bruker</Link> for å kunne sette
                            dine egne påslag på prisen.
                        </p>
                    </div>
                )}
                <div className="average">
                    <h2>Dagens gjennomsnittspris for {data.areaName}:</h2>
                    <p className="average-price">
                        {data.averagePrice} <span className="average-suffix">NOK/kWh</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
