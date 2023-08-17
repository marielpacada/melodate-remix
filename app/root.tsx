import type { LinksFunction, MetaFunction } from "@remix-run/node";
import type { Navigation } from "@remix-run/router";
import Loading from "~/shared/components/Loading";
import stylesPath from "~/shared/styles/styles.css";

import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigation,
} from "@remix-run/react";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesPath }];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Melodate",
  viewport: "width=device-width,initial-scale=1",
});

const getComponent = (nav: Navigation) => {
  if (nav.location?.pathname.startsWith("/match")) return <Outlet />;
  else if (nav.state === "loading") return <Loading />;
  else return <Outlet />;
};

export default function App() {
  const navigation = useNavigation();
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        {getComponent(navigation)}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
