import type { Artist } from "@prisma/client";
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
  const topArtists = response["items"];

  for (var artist of topArtists) {
    topArtistIds.push(artist["id"]);
  }

  return topArtistIds;
};

const getRandomArtists = async (count: number) => {
  const randomPick = (values: string[]) => {
    const index = Math.floor(Math.random() * values.length);
    return values[index];
  };

  const recordCount = await db.artist.count();
  const skip = Math.max(0, Math.floor(Math.random() * recordCount) - count);
  const orderDirection = randomPick(["asc", "desc"]);
  const orderBy = randomPick([
    "id",
    "name",
    "genre",
    "followers",
    "popularity",
  ]);

  return await db.artist.findMany({
    take: count,
    skip: skip,
    orderBy: { [orderBy]: orderDirection },
  });
};

const seedArtistData = async (request: Request) => {
  const artistIds = await getUserTopArtists(request);

  for (var id of artistIds) {
    const url = "https://api.spotify.com/v1/artists/" + id + "/related-artists";
    const response = await getFetchResponse(request, url);
    const relatedArtists = response["artists"]; // returns 20 artists

    for (var artist of relatedArtists) {
      const artistData = {
        id: artist["id"],
        name: artist["name"],
        genre: artist["genres"].toString(),
        followers: artist["followers"]["total"],
        image: artist["images"][0]["url"],
        popularity: artist["popularity"],
      };

      const doesArtistExist = await db.artist.findUnique({
        where: {
          id: artistData["id"],
        },
      });

      if (!doesArtistExist) {
        await db.artist.create({ data: artistData });
      }
    }
  }
};

const seedTrackData = async (request: Request, artists: Array<Artist>) => {
  for (var artist of artists) {
    const artistId = artist["id"];
    const url =
      "https://api.spotify.com/v1/artists/" +
      artistId +
      "/top-tracks?country=US";
    const response = await getFetchResponse(request, url);

    if (response["tracks"].length === 0) {
      continue;
    }

    const track = response["tracks"][0];
    const trackId = track["id"];
    const trackData = {
      id: trackId,
      title: track["name"],
      image: track["album"]["images"][0]["url"],
      preview: track["preview_url"],
    };

    const doesTrackExist = await db.track.findUnique({
      where: {
        id: trackId,
      },
    });

    if (!doesTrackExist) {
      await db.track.create({ data: trackData });
      await db.track.update({
        where: { id: trackId },
        data: { artist: { connect: { id: artistId } } },
      });
    }
  }
};

export const getArtistsToServe = async (request: Request, count: number) => {
  await seedArtistData(request);
  const artistList = await getRandomArtists(count);
  await seedTrackData(request, artistList);

  const artistsWithTracks = await db.artist.findMany({
    where: { trackId: { not: null } },
    include: { track: true },
  });

  return artistsWithTracks;
};
