import {
  Form,
  require_jsx_dev_runtime,
  useLoaderData
} from "/build/_shared/chunk-U37AYAMS.js";
import {
  __commonJS,
  __toESM
} from "/build/_shared/chunk-5KL4PAQL.js";

// empty-module:~/services/auth.server
var require_auth = __commonJS({
  "empty-module:~/services/auth.server"(exports, module) {
    module.exports = {};
  }
});

// app/routes/index.tsx
var import_auth = __toESM(require_auth());

// app/shared/components/PillButton.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
function PillButton(props) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
    Form,
    {
      className: "pill-button my-row center-align ".concat(props.colorClass).trim(),
      action: props.route,
      method: "post",
      children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { children: props.text }, void 0, false, {
        fileName: "app/shared/components/PillButton.tsx",
        lineNumber: 18,
        columnNumber: 7
      }, this)
    },
    void 0,
    false,
    {
      fileName: "app/shared/components/PillButton.tsx",
      lineNumber: 11,
      columnNumber: 5
    },
    this
  );
}

// app/routes/index.tsx
var import_jsx_dev_runtime2 = __toESM(require_jsx_dev_runtime());
function Index() {
  const data = useLoaderData();
  const user = data == null ? void 0 : data.user;
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "full-page my-col even-space-align", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(
      "img",
      {
        className: "melodate-logo",
        src: "melodate-logo.svg",
        alt: "melodate logo"
      },
      void 0,
      false,
      {
        fileName: "app/routes/index.tsx",
        lineNumber: 16,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "landing-text", children: "find your love at first note" }, void 0, false, {
      fileName: "app/routes/index.tsx",
      lineNumber: 21,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(
      PillButton,
      {
        colorClass: "green-button",
        text: user ? "already logged in" : "login to spotify",
        route: "/auth/spotify"
      },
      void 0,
      false,
      {
        fileName: "app/routes/index.tsx",
        lineNumber: 22,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, true, {
    fileName: "app/routes/index.tsx",
    lineNumber: 15,
    columnNumber: 5
  }, this);
}
export {
  Index as default
};
//# sourceMappingURL=/build/routes/index-Z42JVNS4.js.map
