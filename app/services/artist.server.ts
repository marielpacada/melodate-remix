import type { Artist } from "@prisma/client";
import { spotifyStrategy } from "./auth.server";
import { db } from "./db.server";

/**
 * Gets Spotify session response
 * @param request
 * @param url: API endpoint
 * @returns Promise
 */
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

/**
 * Gets user's top artists
 * @param request
 * @returns array of strings, length 20
 */
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

/**
 * Gets random selection of artists
 * @param count
 * @returns array of Artists, length count
 */
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

/**
 * Populates Artist table
 * @param request
 * Results in table with at most 400 Artist records
 */
const seedArtistData = async (request: Request) => {
  const artistIds = await getUserTopArtists(request); // array of 20

  for (var id of artistIds) {
    const url = "https://api.spotify.com/v1/artists/" + id + "/related-artists";
    const response = await getFetchResponse(request, url);
    const relatedArtists = response["artists"]; // array of 20

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

/**
 * Populates Track table
 * @param request
 * @param artists
 * Results in table with exactly length of param artists
 */
const seedTrackData = async (request: Request, artists: Array<Artist>) => {
  for (var artist of artists) {
    const artistId = artist["id"];
    const url =
      "https://api.spotify.com/v1/artists/" +
      artistId +
      "/top-tracks?country=US";
    const response = await getFetchResponse(request, url);

    // if the artists does not have any top tracks listed
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

/**
 * Returns Artists that will then be loaded in swipe route
 */
export const getArtistsToServe = async (request: Request, count: number) => {
  await seedArtistData(request);
  const artistList = await getRandomArtists(count);
  await seedTrackData(request, artistList);

  // fetch records from Artist because we need artist fields
  const artistsWithTracks = await db.artist.findMany({
    where: { trackId: { not: null } },
    include: { track: true },
  });

  return artistsWithTracks;
};
