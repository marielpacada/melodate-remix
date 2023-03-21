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

// node_modules/@remix-run/dev/dist/config/defaults/entry.server.node.tsx
var entry_server_node_exports = {};
__export(entry_server_node_exports, {
  default: () => handleRequest
});
var import_stream = require("stream"), import_node = require("@remix-run/node"), import_react = require("@remix-run/react"), import_isbot = __toESM(require("isbot")), import_server = require("react-dom/server"), import_jsx_runtime = require("react/jsx-runtime"), ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return (0, import_isbot.default)(request.headers.get("user-agent")) ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let { pipe, abort } = (0, import_server.renderToPipeableStream)(
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_react.RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          let body = new import_stream.PassThrough();
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new import_node.Response(body, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let { pipe, abort } = (0, import_server.renderToPipeableStream)(
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_react.RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          let body = new import_stream.PassThrough();
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new import_node.Response(body, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          console.error(error), responseStatusCode = 500;
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}

// app/root.tsx
var root_exports = {};
__export(root_exports, {
  default: () => App,
  links: () => links,
  meta: () => meta
});

// app/shared/styles/styles.css
var styles_default = "/build/_assets/styles-MVQWT7XF.css";

// app/root.tsx
var import_react2 = require("@remix-run/react"), import_jsx_runtime2 = require("react/jsx-runtime"), links = () => [{ rel: "stylesheet", href: styles_default }], meta = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1"
});
function App() {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("html", { lang: "en", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("head", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react2.Meta, {}),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react2.Links, {})
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("body", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react2.Outlet, {}),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react2.ScrollRestoration, {}),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react2.Scripts, {}),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react2.LiveReload, {})
    ] })
  ] });
}

// app/routes/auth/spotify.callback.tsx
var spotify_callback_exports = {};
__export(spotify_callback_exports, {
  loader: () => loader
});

// app/services/auth.server.ts
var import_remix_auth = require("remix-auth"), import_remix_auth_spotify = require("remix-auth-spotify");

// app/services/session.server.ts
var import_node2 = require("@remix-run/node"), sessionStorage = (0, import_node2.createCookieSessionStorage)({
  cookie: {
    name: "_session",
    sameSite: "lax",
    path: "/",
    httpOnly: !0,
    secrets: ["s3cr3t"],
    secure: !0
  }
}), { getSession, commitSession, destroySession } = sessionStorage;

// app/services/auth.server.ts
if (!process.env.SPOTIFY_CLIENT_ID)
  throw new Error("Missing SPOTIFY_CLIENT_ID env");
if (!process.env.SPOTIFY_CLIENT_SECRET)
  throw new Error("Missing SPOTIFY_CLIENT_SECRET env");
if (!process.env.SPOTIFY_CALLBACK_URL)
  throw new Error("Missing SPOTIFY_CALLBACK_URL env");
var scopes = [
  "user-top-read",
  "playlist-modify-public",
  "user-follow-modify"
].join(" "), spotifyStrategy = new import_remix_auth_spotify.SpotifyStrategy(
  {
    clientID: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    callbackURL: process.env.SPOTIFY_CALLBACK_URL,
    sessionStorage,
    scope: scopes
  },
  async ({ accessToken, refreshToken, extraParams, profile }) => {
    var _a, _b;
    return {
      accessToken,
      refreshToken,
      expiresAt: Date.now() + extraParams.expiresIn * 1e3,
      tokenType: extraParams.tokenType,
      user: {
        id: profile.id,
        email: profile.emails[0].value,
        name: profile.displayName,
        image: (_b = (_a = profile.__json.images) == null ? void 0 : _a[0]) == null ? void 0 : _b.url
      }
    };
  }
), authenticator = new import_remix_auth.Authenticator(sessionStorage, {
  sessionKey: spotifyStrategy.sessionKey,
  sessionErrorKey: spotifyStrategy.sessionErrorKey
});
authenticator.use(spotifyStrategy);

// app/routes/auth/spotify.callback.tsx
function loader({ request }) {
  return authenticator.authenticate("spotify", request, {
    successRedirect: "/",
    failureRedirect: "/login"
  });
}

// app/routes/auth/spotify.tsx
var spotify_exports = {};
__export(spotify_exports, {
  action: () => action,
  loader: () => loader2
});
var import_node3 = require("@remix-run/node");
function loader2() {
  return (0, import_node3.redirect)("/login");
}
async function action({ request }) {
  return await authenticator.authenticate("spotify", request);
}

// app/routes/logout.tsx
var logout_exports = {};
__export(logout_exports, {
  action: () => action2,
  loader: () => loader3
});
var import_node4 = require("@remix-run/node");
async function action2({ request }) {
  return (0, import_node4.redirect)("/", {
    headers: {
      "Set-Cookie": await destroySession(
        await getSession(request.headers.get("cookie"))
      )
    }
  });
}
function loader3() {
  throw (0, import_node4.json)({}, { status: 404 });
}

// app/routes/index.tsx
var routes_exports = {};
__export(routes_exports, {
  default: () => Index,
  loader: () => loader4
});
var import_react4 = require("@remix-run/react");

// app/shared/components/PillButton.tsx
var import_react3 = require("@remix-run/react"), import_jsx_runtime3 = require("react/jsx-runtime");
function PillButton(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
    import_react3.Form,
    {
      className: "pill-button my-row center-align ".concat(props.colorClass).trim(),
      action: props.route,
      method: "post",
      children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { children: props.text })
    }
  );
}

// app/routes/index.tsx
var import_jsx_runtime4 = require("react/jsx-runtime");
async function loader4({ request }) {
  return spotifyStrategy.getSession(request);
}
function Index() {
  let data = (0, import_react4.useLoaderData)(), user = data == null ? void 0 : data.user, name = user == null ? void 0 : user.name;
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "full-page my-col even-space-align", children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      "img",
      {
        className: "melodate-logo",
        src: "melodate-logo.svg",
        alt: "melodate logo"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "landing-text", children: "find your love at first note" }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      PillButton,
      {
        colorClass: "green-button",
        text: user ? "hello, ".concat(name) : "login to spotify",
        route: "/auth/spotify"
      }
    )
  ] });
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { version: "f9ce29c6", entry: { module: "/build/entry.client-KMLSDIUS.js", imports: ["/build/_shared/chunk-HRGT5UAV.js", "/build/_shared/chunk-Q3IECNXJ.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-XMJII2QL.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/auth/spotify": { id: "routes/auth/spotify", parentId: "root", path: "auth/spotify", index: void 0, caseSensitive: void 0, module: "/build/routes/auth/spotify-JTSZ3MEP.js", imports: void 0, hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/auth/spotify.callback": { id: "routes/auth/spotify.callback", parentId: "root", path: "auth/spotify/callback", index: void 0, caseSensitive: void 0, module: "/build/routes/auth/spotify.callback-XSQ4CKVG.js", imports: void 0, hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/index": { id: "routes/index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/index-5CV2KA2F.js", imports: void 0, hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/logout": { id: "routes/logout", parentId: "root", path: "logout", index: void 0, caseSensitive: void 0, module: "/build/routes/logout-GPTXG6BX.js", imports: void 0, hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 } }, cssBundleHref: void 0, hmr: void 0, url: "/build/manifest-F9CE29C6.js" };

// server-entry-module:@remix-run/dev/server-build
var assetsBuildDirectory = "public/build", future = { unstable_cssModules: !1, unstable_cssSideEffectImports: !1, unstable_dev: !1, unstable_postcss: !1, unstable_tailwind: !1, unstable_vanillaExtract: !1, v2_errorBoundary: !1, v2_meta: !1, v2_routeConvention: !1 }, publicPath = "/build/", entry = { module: entry_server_node_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/auth/spotify.callback": {
    id: "routes/auth/spotify.callback",
    parentId: "root",
    path: "auth/spotify/callback",
    index: void 0,
    caseSensitive: void 0,
    module: spotify_callback_exports
  },
  "routes/auth/spotify": {
    id: "routes/auth/spotify",
    parentId: "root",
    path: "auth/spotify",
    index: void 0,
    caseSensitive: void 0,
    module: spotify_exports
  },
  "routes/logout": {
    id: "routes/logout",
    parentId: "root",
    path: "logout",
    index: void 0,
    caseSensitive: void 0,
    module: logout_exports
  },
  "routes/index": {
    id: "routes/index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: routes_exports
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
