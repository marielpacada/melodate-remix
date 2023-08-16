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
  } else response = await fetch(url, options); // PUT requests return empty responses (json breaks)

  return response;
};

/**
 * Posts request to user account
 * @param request
 * @param url: API endpoint
 * @param bodyObject: request body
 * @returns Promise
 */
export const getFetchResponsePostMethod = async (
  request: Request,
  url: string,
  bodyObject: object
) => {
  const spotifyRequest = await spotifyStrategy.getSession(request);
  const accessToken = spotifyRequest?.accessToken;
  const options = {
    method: "POST",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyObject),
  };

  const response = await fetch(url, options).then((res) => res.json());
  return response;
};
