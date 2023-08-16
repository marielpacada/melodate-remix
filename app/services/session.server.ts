import { createCookieSessionStorage } from "@remix-run/node";
import { spotifyStrategy } from "./auth.server";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "_session",
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secrets: [process.env.SPOTIFY_CLIENT_SECRET as string],
    secure: process.env.NODE_ENV === "production",
  },
});

export const { getSession, commitSession, destroySession } = sessionStorage;

/**
 * Gets Spotify session response
 * @param request
 * @param url: API endpoint
 * @returns Promise
 */
export const getFetchResponse = async (
  request: Request,
  url: string,
  method: string
) => {
  const spotifyRequest = await spotifyStrategy.getSession(request);
  const accessToken = spotifyRequest?.accessToken;
  const options = {
    method: method,
    headers: { Authorization: "Bearer " + accessToken },
  };

  let response;
  if (method === "GET") {
    response = await fetch(url, options).then((res) => res.json());
  } else response = {};

  return response;
};
