import { spotifyStrategy } from "./auth.server";

export const getTopArtists = async (request: Request) => {
  const spotifyRequest = await spotifyStrategy.getSession(request);
  const accessToken = spotifyRequest?.accessToken;

  const res = await fetch("https://api.spotify.com/v1/me/top/artists", {
    headers: { Authorization: "Bearer " + accessToken },
  });

  return res;
};
