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

const getArtistTopTrack = async (request: Request, artistId: string) => {
  const url =
    "https://api.spotify.com/v1/artists/" + artistId + "/top-tracks?country=US";
  const response = await getFetchResponse(request, url);

  if (response["tracks"].length === 0) return {};

  const track = response["tracks"][0];
  const trackData = {
    id: track["id"],
    title: track["name"],
    image: "placeholder image", // you can actually get this from the response :)
    // see the old version
    preview: track["preview_url"],
  };

  return trackData;
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

  // return the random 30 artists!!!!
  return await getRandomArtists(30);
};

export const seedTrackData = async (request: Request) => {
  const artistsToServe = await seedArtistData(request);

  return {};
};

// the database is populated with related artists of user's top artists
// now what?

// what do we want to serve to swipe?
// first, how many?                         30
// second, that meet which requirements?    some kind of popularity metric???

// CRISIS:   our current model does not already have the artist's top track
//           we would have to call another endpoint to get their top track

// QUESTION: do we want to do this for all the related artists?
//           or do we want to do this only for those we have chosen that we are going to serve to the component?
//
//
// THIS ALL TAKES TOO LONG
// solutions:
//    - get the random artists server side
//    - populate the track field of those artists only
