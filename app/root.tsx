import type { LinksFunction, MetaFunction } from "@remix-run/node";
import Loading from "./shared/components/Loading";
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

export default function App() {
  const navigation = useNavigation();
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        {navigation.state !== "idle" ? <Loading /> : <Outlet />}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
