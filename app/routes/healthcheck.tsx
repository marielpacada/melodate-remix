import type { LoaderArgs } from "@remix-run/node";
import { db } from "~/services/db.server";

export const loader = async ({ request }: LoaderArgs) => {
  const host =
    request.headers.get("X-Forwarded-Host") ?? request.headers.get("host");

  try {
    const url = new URL("/", `http://${host}`);
    // check if db works
    await Promise.all([
      db.artist.count(),
      fetch(url.toString(), { method: "HEAD" }).then((response) => {
        if (!response.ok) return Promise.reject(response);
      }),
    ]);
    return new Response("OK");
  } catch (error: unknown) {
    console.log("healthcheck ❌", { error });
    return new Response("ERROR", { status: 500 });
  }
};
