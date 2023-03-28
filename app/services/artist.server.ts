import { spotifyStrategy } from "./auth.server";
import { db } from "./db.server";

const getFetchResponse = async (request: Request, url: string) => {
  const spotifyRequest = await spotifyStrategy.getSession(request);
  const accessToken = spotifyRequest?.accessToken;
  const options = {
    method: "GET",
    headers: { Authorization: "Bearer " + accessToken },
  };

  const response = await fetch(url, options).then((res) => res.json());
  return response;
};

const getUserTopArtists = async (request: Request) => {
  const url = "https://api.spotify.com/v1/me/top/artists";
  const response = await getFetchResponse(request, url);

  const topArtistIds = [];

  const topArtists = response["items" as keyof object];
  for (var artist of topArtists) {
    topArtistIds.push(artist["id" as keyof object]);
  }

  return topArtistIds;
};

export const getRelatedArtists = async (request: Request) => {
  const artistIds = await getUserTopArtists(request);

  for (var id of artistIds) {
    const url = "https://api.spotify.com/v1/artists/" + id + "/related-artists";
    const response = await getFetchResponse(request, url);
    const relatedArtists = response["artists" as keyof object]; // returns 20 artists

    for (var artist of relatedArtists) {
      const data = {
        id: artist["id" as keyof object],
        name: artist["name" as keyof object],
        genre: artist["genres" as keyof object].toString(),
        followers: artist["followers" as keyof object]["total" as keyof object],
        image: artist["images" as keyof object][0]["url" as keyof object],
        popularity: artist["popularity" as keyof object],
      };

      const doesExist = await db.artist.findUnique({
        where: {
          id: data["id" as keyof object],
        },
      });

      if (!doesExist) {
        await db.artist.create({ data });
      }
    }
  }

  return {};
};
