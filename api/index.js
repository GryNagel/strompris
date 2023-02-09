var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: !0 }) : target,
  mod
)), __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);

// <stdin>
var stdin_exports = {};
__export(stdin_exports, {
  assets: () => assets_manifest_default,
  assetsBuildDirectory: () => assetsBuildDirectory,
  entry: () => entry,
  future: () => future,
  publicPath: () => publicPath,
  routes: () => routes
});
module.exports = __toCommonJS(stdin_exports);

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
var import_server = require("react-dom/server"), import_react = require("@remix-run/react"), import_jsx_dev_runtime = require("react/jsx-dev-runtime");
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  let markup = (0, import_server.renderToString)(/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react.RemixServer, { context: remixContext, url: request.url }, void 0, !1, {
    fileName: "app/entry.server.tsx",
    lineNumber: 11,
    columnNumber: 31
  }, this));
  return responseHeaders.set("Content-Type", "text/html"), new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders
  });
}

// app/root.tsx
var root_exports = {};
__export(root_exports, {
  CatchBoundary: () => CatchBoundary,
  ErrorBoundary: () => ErrorBoundary,
  default: () => App,
  links: () => links
});
var import_react2 = require("@remix-run/react");

// app/styles/default.css
var default_default = "/build/_assets/default-QAAM4IDN.css";

// app/styles/global.css
var global_default = "/build/_assets/global-G54DVZO6.css";

// app/styles/global-large.css
var global_large_default = "/build/_assets/global-large-H3QEDECF.css";

// app/styles/variables.css
var variables_default = "/build/_assets/variables-YUZDJQHC.css";

// app/styles/variables-dark.css
var variables_dark_default = "/build/_assets/variables-dark-QL5ZZRT2.css";

// app/root.tsx
var import_jsx_dev_runtime2 = require("react/jsx-dev-runtime"), links = () => [
  { rel: "stylesheet", href: default_default },
  { rel: "stylesheet", href: global_default },
  { rel: "stylesheet", href: variables_default },
  {
    rel: "stylesheet",
    href: global_large_default,
    media: "screen and (min-width: 1024px)"
  },
  {
    rel: "stylesheet",
    href: variables_dark_default,
    media: "(prefers-color-scheme: dark)"
  }
];
function Document({
  children,
  title = "Str\xF8mpriser"
}) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("html", { lang: "en", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("head", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("meta", { charSet: "utf-8" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 46,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react2.Meta, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 47,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("title", { children: title }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 48,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(
        "link",
        {
          rel: "icon",
          href: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>\u26A1</text></svg>"
        },
        void 0,
        !1,
        {
          fileName: "app/root.tsx",
          lineNumber: 49,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react2.Links, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 53,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 45,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("body", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react2.Scripts, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 56,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react2.ScrollRestoration, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 57,
        columnNumber: 9
      }, this),
      children,
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react2.LiveReload, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 59,
        columnNumber: 51
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 55,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/root.tsx",
    lineNumber: 44,
    columnNumber: 5
  }, this);
}
function App() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Document, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react2.Outlet, {}, void 0, !1, {
    fileName: "app/root.tsx",
    lineNumber: 68,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/root.tsx",
    lineNumber: 67,
    columnNumber: 5
  }, this);
}
function CatchBoundary() {
  let caught = (0, import_react2.useCatch)();
  return caught.status === 404 ? /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Document, { title: `${caught.status} ${caught.statusText}`, children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "error-wrapper", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "error-container", children: [
    "\u26A1",
    caught.status,
    "\u26A1 ",
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("h1", { children: "Side ikke funnet!" }, void 0, !1, {
      fileName: "app/root.tsx",
      lineNumber: 81,
      columnNumber: 31
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react2.Link, { className: "error-link", to: "/", children: "Hjelp meg hjem" }, void 0, !1, {
      fileName: "app/root.tsx",
      lineNumber: 82,
      columnNumber: 13
    }, this)
  ] }, void 0, !0, {
    fileName: "app/root.tsx",
    lineNumber: 80,
    columnNumber: 11
  }, this) }, void 0, !1, {
    fileName: "app/root.tsx",
    lineNumber: 79,
    columnNumber: 9
  }, this) }, void 0, !1, {
    fileName: "app/root.tsx",
    lineNumber: 78,
    columnNumber: 7
  }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Document, { title: `${caught.status} ${caught.statusText}`, children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "error-container", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("h1", { children: [
    caught.status,
    " ",
    caught.statusText
  ] }, void 0, !0, {
    fileName: "app/root.tsx",
    lineNumber: 94,
    columnNumber: 9
  }, this) }, void 0, !1, {
    fileName: "app/root.tsx",
    lineNumber: 93,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/root.tsx",
    lineNumber: 92,
    columnNumber: 5
  }, this);
}
function ErrorBoundary({ error }) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Document, { title: "Whoops!", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "error-container", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("h1", { children: "App feil" }, void 0, !1, {
      fileName: "app/root.tsx",
      lineNumber: 106,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("pre", { children: error.message }, void 0, !1, {
      fileName: "app/root.tsx",
      lineNumber: 107,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/root.tsx",
    lineNumber: 105,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/root.tsx",
    lineNumber: 104,
    columnNumber: 5
  }, this);
}

// app/routes/index.tsx
var routes_exports = {};
__export(routes_exports, {
  default: () => IndexRoute,
  headers: () => headers,
  links: () => links2,
  loader: () => loader
});
var import_react4 = require("@remix-run/react"), import_date_fns5 = require("date-fns");

// app/utils/date.ts
var import_date_fns = require("date-fns");

// app/constants/date.ts
var viewTimeFormat = "HH:mm", apiDateFormat = "yyyy-MM-dd";

// app/utils/date.ts
var today = new Date();
function createApiDate(date) {
  return (0, import_date_fns.format)(new Date(date), apiDateFormat);
}
function createViewTime(date) {
  return (0, import_date_fns.format)(new Date(date), viewTimeFormat);
}
function createIsoDate(date) {
  return (0, import_date_fns.formatISO)((0, import_date_fns.set)(new Date(date), { minutes: 0, seconds: 0 }));
}
function getHours() {
  let time = (0, import_date_fns.format)(today, "HH");
  return parseInt(time);
}

// app/components/Footer.tsx
var import_jsx_dev_runtime3 = require("react/jsx-dev-runtime");
function Footer() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("footer", { className: "footer", children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("p", { children: " Data fra https://vg.no " }, void 0, !1, {
    fileName: "app/components/Footer.tsx",
    lineNumber: 4,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/components/Footer.tsx",
    lineNumber: 3,
    columnNumber: 5
  }, this);
}

// app/components/Header.tsx
var import_react3 = require("@remix-run/react"), import_jsx_dev_runtime4 = require("react/jsx-dev-runtime");
function Header() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("header", { className: "app-header", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(import_react3.Link, { to: "/", className: "app-logo", children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("h1", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("span", { className: "app-logo-lines" }, void 0, !1, {
        fileName: "app/components/Header.tsx",
        lineNumber: 8,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("span", { className: "app-logo-text", children: [
        "Str",
        /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("span", { className: "lightning", children: "\u26A1" }, void 0, !1, {
          fileName: "app/components/Header.tsx",
          lineNumber: 10,
          columnNumber: 16
        }, this),
        "mpris"
      ] }, void 0, !0, {
        fileName: "app/components/Header.tsx",
        lineNumber: 9,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("span", { className: "app-logo-lines" }, void 0, !1, {
        fileName: "app/components/Header.tsx",
        lineNumber: 12,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/Header.tsx",
      lineNumber: 7,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/components/Header.tsx",
      lineNumber: 6,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("p", { className: "slogan", children: " Planlegg ditt str\xF8mforbruk " }, void 0, !1, {
      fileName: "app/components/Header.tsx",
      lineNumber: 15,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/Header.tsx",
    lineNumber: 5,
    columnNumber: 5
  }, this);
}

// app/styles/index.css
var styles_default = "/build/_assets/index-RLPUUI5V.css";

// app/types/price.ts
var import_zod = require("zod"), CurrentPriceSchema = import_zod.z.object({
  oslo: import_zod.z.number(),
  kristiansand: import_zod.z.number(),
  bergen: import_zod.z.number(),
  trondheim: import_zod.z.number(),
  tromso: import_zod.z.number()
}), PriceByHourSchema = import_zod.z.object({
  oslo: import_zod.z.array(import_zod.z.number()),
  kristiansand: import_zod.z.array(import_zod.z.number()),
  bergen: import_zod.z.array(import_zod.z.number()),
  trondheim: import_zod.z.array(import_zod.z.number()),
  tromso: import_zod.z.array(import_zod.z.number())
}), PricesSchema = import_zod.z.object({
  date: import_zod.z.string(),
  price: CurrentPriceSchema,
  priceByHour: import_zod.z.object({
    date: import_zod.z.string(),
    hours: import_zod.z.array(import_zod.z.string()),
    pricesObj: PriceByHourSchema
  })
});

// app/types/area.ts
var areas = {
  tromso: {
    number: "4",
    title: "Nord",
    original: "tromso"
  },
  bergen: {
    number: "5",
    title: "Vest",
    original: "bergen"
  },
  oslo: {
    number: "1",
    title: "\xD8st",
    original: "oslo"
  },
  kristiansand: {
    number: "2",
    title: "S\xF8r",
    original: "kristiansand"
  },
  trondheim: {
    number: "3",
    title: "Midt",
    original: "trondheim"
  }
};

// app/types/object.ts
var getKeys = Object.keys, getEntries = (obj) => Object.entries(obj);

// app/server/api.server.ts
var import_date_fns2 = require("date-fns");
var apiUrl = "https://redutv-api.vg.no/power-data/v2/nordpool/price-by-date";
async function fetchPrices(date) {
  try {
    let res = await fetch(`${apiUrl}/${date}`);
    if (res.ok) {
      let data = await res.json(), parsed = PricesSchema.safeParse(data);
      if (parsed.success)
        return parsed == null ? void 0 : parsed.data;
      throw parsed == null ? void 0 : parsed.error;
    } else
      throw new Error("Uh ohw");
  } catch (error) {
    throw error;
  }
}
async function getTodaysPrices() {
  let todaysDate = new Date(), today2 = createApiDate(todaysDate);
  return await fetchPrices(today2);
}
async function getTomorrowsPrices() {
  let today2 = new Date(), updateDateTime = (0, import_date_fns2.set)(today2, { hours: 13, minutes: 0 });
  if (!(0, import_date_fns2.isAfter)(today2, updateDateTime))
    return null;
  let tomorrow = createApiDate((0, import_date_fns2.addDays)(today2, 1));
  return await fetchPrices(tomorrow);
}

// app/server/average.server.ts
function getAveragePrice(prices) {
  let average = prices.reduce((acc, currentItem) => acc += currentItem, 0) / prices.length;
  return Math.round((average + Number.EPSILON) * 100) / 100;
}

// app/components/AllPricesChart.tsx
var import_highcharts_react_official = __toESM(require("highcharts-react-official")), import_highcharts = __toESM(require("highcharts")), import_date_fns3 = require("date-fns"), import_date_fns4 = require("date-fns");
var import_jsx_dev_runtime5 = require("react/jsx-dev-runtime");
function AllPricesChart({ data }) {
  let timeNow = createIsoDate(new Date()), timeInAnHour = (0, import_date_fns3.format)((0, import_date_fns4.addHours)((0, import_date_fns3.setMinutes)(new Date(), 0), 1), viewTimeFormat), options = {
    title: {
      text: "Str\xF8mpriser"
    },
    series: Object.entries(data).map(([key, value]) => ({
      name: areas[key].title,
      data: [value],
      color: `var(--chart-${areas[key].number})`
    })),
    xAxis: {
      name: "NOK",
      categories: [
        `${createViewTime(new Date(timeNow))} -
        ${timeInAnHour}`
      ]
    },
    yAxis: {
      title: {
        text: "NOK / kWh"
      }
    },
    chart: {
      type: "column",
      borderRadius: 8,
      style: {
        fontFamily: ""
      }
    },
    accessibility: { enabled: !1 },
    credits: {
      enabled: !1
    }
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_highcharts_react_official.default, { highcharts: import_highcharts.default, constructorType: "chart", options }, void 0, !1, {
    fileName: "app/components/AllPricesChart.tsx",
    lineNumber: 54,
    columnNumber: 10
  }, this);
}

// app/routes/index.tsx
var import_jsx_dev_runtime6 = require("react/jsx-dev-runtime"), links2 = () => [{ rel: "stylesheet", href: styles_default }];
function getCacheExpiry() {
  let now = new Date(), noon = (0, import_date_fns5.set)(now, { hours: 11, minutes: 59 }), midnight = (0, import_date_fns5.set)(now, { hours: 23, minutes: 59 });
  return (0, import_date_fns5.isBefore)(now, noon) ? noon : midnight;
}
var headers = () => ({
  "cache-control": "public",
  Expires: getCacheExpiry().toISOString()
}), loader = async () => {
  let prices = await getTodaysPrices(), averagePrices = getEntries(prices.priceByHour.pricesObj).reduce((acc, [key, value]) => (acc[key] = getAveragePrice(value), acc), {});
  return { prices, averagePrices };
};
function IndexRoute() {
  let { prices, averagePrices } = (0, import_react4.useLoaderData)();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(Header, {}, void 0, !1, {
      fileName: "app/routes/index.tsx",
      lineNumber: 59,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "container", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("h2", { className: "price-header", children: [
        "Str\xF8mprisen her og n\xE5 i \xF8re/kWh (",
        createViewTime((0, import_date_fns5.setMinutes)(new Date(), 0)),
        " -",
        " ",
        createViewTime((0, import_date_fns5.addHours)((0, import_date_fns5.setMinutes)(new Date(), 0), 1)),
        "):"
      ] }, void 0, !0, {
        fileName: "app/routes/index.tsx",
        lineNumber: 61,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("nav", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("ul", { className: "navigation-list", children: getKeys(prices.price).map((key) => /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
        import_react4.Link,
        {
          to: `/price/${areas[key].number}`,
          className: `navigation-link link-${areas[key].number}`,
          style: {
            borderBottom: `20px solid var(--chart-${areas[key].number})`,
            borderTop: `20px solid var(--chart-${areas[key].number})`
          },
          children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("li", { className: "navigation-item", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("h2", { className: "header", children: areas[key].title }, void 0, !1, {
              fileName: "app/routes/index.tsx",
              lineNumber: 78,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("p", { className: "price", children: prices.priceByHour.pricesObj[key][getHours()] }, void 0, !1, {
              fileName: "app/routes/index.tsx",
              lineNumber: 79,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("p", { children: [
              "Dagens gjennomsnitt: ",
              /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("br", {}, void 0, !1, {
                fileName: "app/routes/index.tsx",
                lineNumber: 81,
                columnNumber: 42
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("strong", { children: averagePrices[key] }, void 0, !1, {
                fileName: "app/routes/index.tsx",
                lineNumber: 82,
                columnNumber: 21
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/index.tsx",
              lineNumber: 80,
              columnNumber: 19
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/index.tsx",
            lineNumber: 77,
            columnNumber: 17
          }, this)
        },
        key,
        !1,
        {
          fileName: "app/routes/index.tsx",
          lineNumber: 68,
          columnNumber: 15
        },
        this
      )) }, void 0, !1, {
        fileName: "app/routes/index.tsx",
        lineNumber: 66,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/routes/index.tsx",
        lineNumber: 65,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(AllPricesChart, { data: averagePrices }, void 0, !1, {
        fileName: "app/routes/index.tsx",
        lineNumber: 89,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/index.tsx",
      lineNumber: 60,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(Footer, {}, void 0, !1, {
      fileName: "app/routes/index.tsx",
      lineNumber: 91,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/index.tsx",
    lineNumber: 58,
    columnNumber: 5
  }, this);
}

// app/routes/price.tsx
var price_exports = {};
__export(price_exports, {
  default: () => PriceRoute,
  links: () => links3,
  loader: () => loader2
});
var import_react5 = require("@remix-run/react");

// app/styles/price.css
var price_default = "/build/_assets/price-FKVIGLMM.css";

// app/routes/price.tsx
var import_jsx_dev_runtime7 = require("react/jsx-dev-runtime"), links3 = () => [{ rel: "stylesheet", href: price_default }], loader2 = async () => {
  let today2 = await getTodaysPrices(), tomorrow = await getTomorrowsPrices(), todaysAveragePrices = getEntries(today2.priceByHour.pricesObj).reduce(
    (acc, [key, value]) => (acc[key] = getAveragePrice(value), acc),
    {}
  ), tomorrowsAveragePrices = tomorrow ? getEntries(tomorrow.priceByHour.pricesObj).reduce((acc, [key, value]) => (acc[key] = getAveragePrice(value), acc), {}) : null;
  return { today: today2, tomorrow, todaysAveragePrices, tomorrowsAveragePrices };
};
function PriceRoute() {
  let { today: today2 } = (0, import_react5.useLoaderData)();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("div", { className: "price-container", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(Header, {}, void 0, !1, {
      fileName: "app/routes/price.tsx",
      lineNumber: 51,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("div", { className: "container", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("div", { className: "link-container", children: getKeys(today2.priceByHour.pricesObj).map((key) => /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(
        import_react5.NavLink,
        {
          to: areas[key].number,
          style: {
            color: `var(--chart-${areas[key].number})`,
            borderColor: `var(--chart-${areas[key].number})`,
            outlineColor: `var(--chart-${areas[key].number})`
          },
          className: ({ isActive }) => isActive ? `link link-active link-${areas[key].number}` : `link link-${areas[key].number}`,
          prefetch: "intent",
          children: areas[key].title
        },
        key,
        !1,
        {
          fileName: "app/routes/price.tsx",
          lineNumber: 55,
          columnNumber: 13
        },
        this
      )) }, void 0, !1, {
        fileName: "app/routes/price.tsx",
        lineNumber: 53,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(import_react5.Outlet, {}, void 0, !1, {
        fileName: "app/routes/price.tsx",
        lineNumber: 74,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/price.tsx",
      lineNumber: 52,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(Footer, {}, void 0, !1, {
      fileName: "app/routes/price.tsx",
      lineNumber: 76,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/price.tsx",
    lineNumber: 50,
    columnNumber: 5
  }, this);
}

// app/routes/price/$area.tsx
var area_exports = {};
__export(area_exports, {
  CatchBoundary: () => CatchBoundary2,
  ErrorBoundary: () => ErrorBoundary2,
  default: () => PriceRoute2,
  loader: () => loader3
});
var import_react6 = require("@remix-run/react");

// app/components/PriceChart.tsx
var import_highcharts_react_official2 = __toESM(require("highcharts-react-official")), import_highcharts2 = __toESM(require("highcharts")), import_date_fns6 = require("date-fns"), import_date_fns7 = require("date-fns"), import_jsx_dev_runtime8 = require("react/jsx-dev-runtime");
function PriceChart({
  today: today2,
  tomorrow,
  areaName,
  hours,
  areaNumber
}) {
  let options = {
    title: {
      text: `Str\xF8mpriser - ${areaName}`
    },
    series: [
      {
        name: "Today",
        data: today2,
        color: `var(--chart-${areaNumber})`
      },
      {
        name: "Tomorrow",
        data: tomorrow,
        color: "var(--chart-highlight)"
      }
    ],
    xAxis: {
      name: "NOK",
      categories: hours.map((hour) => hour.split("-")[0]),
      plotBands: [
        {
          from: (0, import_date_fns6.format)(new Date(), "HH"),
          to: (0, import_date_fns6.format)((0, import_date_fns7.addHours)(new Date(), 1), "HH"),
          color: "#E8E8E8"
        }
      ]
    },
    yAxis: {
      title: {
        text: "NOK / kWh"
      }
    },
    chart: {
      type: "areaspline",
      borderRadius: 8,
      style: {
        fontFamily: ""
      }
    },
    subtitle: {
      text: tomorrow ? "" : "Prisene for i morgen kommer mellom 12-13"
    }
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(import_highcharts_react_official2.default, { highcharts: import_highcharts2.default, constructorType: "chart", options }, void 0, !1, {
    fileName: "app/components/PriceChart.tsx",
    lineNumber: 65,
    columnNumber: 10
  }, this);
}

// app/routes/price/$area.tsx
var import_jsx_dev_runtime9 = require("react/jsx-dev-runtime"), loader3 = async ({ params }) => ({ area: Object.values(areas).find((value) => value.number === params.area) });
function PriceRoute2() {
  var _a;
  let matches = (0, import_react6.useMatches)(), { area } = (0, import_react6.useLoaderData)(), data = (_a = matches.find((match) => match.id === "routes/price")) == null ? void 0 : _a.data, parsedToday = PricesSchema.safeParse(data == null ? void 0 : data.today), parsedTomorrow = PricesSchema.safeParse(data == null ? void 0 : data.tomorrow);
  if (!data || !parsedToday.success || !area)
    throw new Error("No data to see here");
  let todaysAverage = (data == null ? void 0 : data.todaysAveragePrices[area.original]) || 0, tomorrowsAverage = (data == null ? void 0 : data.tomorrowsAveragePrices[area.original]) || 0, today2 = parsedToday.data.priceByHour.pricesObj[area.original], tomorrow = parsedTomorrow.success ? parsedTomorrow.data.priceByHour.pricesObj[area.original] : [];
  return /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { className: "price-chart", children: /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(
      PriceChart,
      {
        today: today2,
        hours: parsedToday.data.priceByHour.hours,
        tomorrow,
        areaName: area == null ? void 0 : area.title,
        areaNumber: area == null ? void 0 : area.number
      },
      void 0,
      !1,
      {
        fileName: "app/routes/price/$area.tsx",
        lineNumber: 41,
        columnNumber: 9
      },
      this
    ) }, void 0, !1, {
      fileName: "app/routes/price/$area.tsx",
      lineNumber: 40,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { className: "surcharge", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { className: "average", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("h2", { children: [
          "Dagens gjennomsnittspris for ",
          area == null ? void 0 : area.title,
          ":"
        ] }, void 0, !0, {
          fileName: "app/routes/price/$area.tsx",
          lineNumber: 51,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("p", { className: "average-price", children: [
          todaysAverage,
          " ",
          /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("span", { className: "average-suffix", children: "NOK/kWh" }, void 0, !1, {
            fileName: "app/routes/price/$area.tsx",
            lineNumber: 53,
            columnNumber: 29
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/price/$area.tsx",
          lineNumber: 52,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/price/$area.tsx",
        lineNumber: 50,
        columnNumber: 9
      }, this),
      tomorrowsAverage && /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { className: "average", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("h2", { children: [
          "Morgendagens gjennomsnittspris for ",
          area == null ? void 0 : area.title,
          ":"
        ] }, void 0, !0, {
          fileName: "app/routes/price/$area.tsx",
          lineNumber: 58,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("p", { className: "average-price", children: [
          tomorrowsAverage,
          /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("span", { className: "average-suffix", children: "\xF8re/kWh" }, void 0, !1, {
            fileName: "app/routes/price/$area.tsx",
            lineNumber: 61,
            columnNumber: 15
          }, this),
          todaysAverage > tomorrowsAverage ? "\u25BC" : "\u25B2"
        ] }, void 0, !0, {
          fileName: "app/routes/price/$area.tsx",
          lineNumber: 59,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/price/$area.tsx",
        lineNumber: 57,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/price/$area.tsx",
      lineNumber: 49,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/price/$area.tsx",
    lineNumber: 39,
    columnNumber: 5
  }, this);
}
function CatchBoundary2() {
  let caught = (0, import_react6.useCatch)();
  if (caught.status === 404)
    return /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { className: "error-container", children: caught.data }, void 0, !1, {
      fileName: "app/routes/price/$area.tsx",
      lineNumber: 75,
      columnNumber: 12
    }, this);
  throw new Error(`Her har det skjedd noe rart: ${caught.status}`);
}
function ErrorBoundary2({ error }) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { className: "error-container", children: error.message }, void 0, !1, {
    fileName: "app/routes/price/$area.tsx",
    lineNumber: 81,
    columnNumber: 10
  }, this);
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { version: "ebd15143", entry: { module: "/build/entry.client-IO6ALQKU.js", imports: ["/build/_shared/chunk-4Z5FRTRU.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-MHWWX7UH.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !0, hasErrorBoundary: !0 }, "routes/index": { id: "routes/index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/index-3NK5H42B.js", imports: ["/build/_shared/chunk-CDPH372Q.js", "/build/_shared/chunk-4GMQZEAJ.js", "/build/_shared/chunk-VP43UH7J.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/price": { id: "routes/price", parentId: "root", path: "price", index: void 0, caseSensitive: void 0, module: "/build/routes/price-PIFP5X3O.js", imports: ["/build/_shared/chunk-CDPH372Q.js", "/build/_shared/chunk-VP43UH7J.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/price/$area": { id: "routes/price/$area", parentId: "routes/price", path: ":area", index: void 0, caseSensitive: void 0, module: "/build/routes/price/$area-FVX2ZRGP.js", imports: ["/build/_shared/chunk-4GMQZEAJ.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !0, hasErrorBoundary: !0 } }, cssBundleHref: void 0, url: "/build/manifest-EBD15143.js" };

// server-entry-module:@remix-run/dev/server-build
var assetsBuildDirectory = "public/build", future = { unstable_cssModules: !1, unstable_cssSideEffectImports: !1, unstable_dev: !1, unstable_vanillaExtract: !1, v2_errorBoundary: !1, v2_meta: !1, v2_routeConvention: !1 }, publicPath = "/build/", entry = { module: entry_server_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/index": {
    id: "routes/index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: routes_exports
  },
  "routes/price": {
    id: "routes/price",
    parentId: "root",
    path: "price",
    index: void 0,
    caseSensitive: void 0,
    module: price_exports
  },
  "routes/price/$area": {
    id: "routes/price/$area",
    parentId: "routes/price",
    path: ":area",
    index: void 0,
    caseSensitive: void 0,
    module: area_exports
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  assets,
  assetsBuildDirectory,
  entry,
  future,
  publicPath,
  routes
});
//# sourceMappingURL=index.js.map
