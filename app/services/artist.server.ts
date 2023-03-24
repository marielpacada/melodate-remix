import { spotifyStrategy } from "./auth.server";

// we want this function to store the top artist ids in our database as a TopUserArtist obj
export const getUserTopArtists = async (request: Request) => {
  const spotifyRequest = await spotifyStrategy.getSession(request);
  const accessToken = spotifyRequest?.accessToken;

  // This returns 20 artists.
  const response = await fetch("https://api.spotify.com/v1/me/top/artists", {
    method: "GET",
    headers: { Authorization: "Bearer " + accessToken },
  }).then((res) => res.json());

  return response;
};
