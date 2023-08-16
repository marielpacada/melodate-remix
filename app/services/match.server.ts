import { db } from "./db.server";
import { getFetchResponse, getFetchResponsePostMethod } from "./session.server";

/**
 * Returns Artists that have been swiped right
 * @returns array of Artists
 */
export const getFavoredArtists = async () => {
  const favoredArtists = await db.artist.findMany({
    where: { swiped: true },
  });
  return favoredArtists;
};

/**
 * Returns Tracks of the artists that have been swiped right
 * @returns array of Tracks
 */
export const getFavoredTracks = async () => {
  const favoredTracks = await db.track.findMany({
    where: { artist: { swiped: true } },
    include: { artist: true },
  });
  return favoredTracks;
};

/**
 * Follows profiles of Artists that have been swiped right on user account
 * @param request
 * @param artistIds
 * @returns Promise
 */
export const followArtists = async (request: Request, artistIds: string) => {
  const url =
    "https://api.spotify.com/v1/me/following?type=artist&ids=" + artistIds;
  const response = await getFetchResponse(request, url, "PUT");
  return response;
};

/**
 * Creates playlist of Tracks of Artists that have been swiped right on user account
 * @param request
 * @param trackIds
 * @returns Promise
 */
export const createPlaylist = async (request: Request, trackIds: string) => {
  const userId = await getUserId(request);
  const createPlaylistUrl =
    "https://api.spotify.com/v1/users/" + userId + "/playlists";
  const createPlaylistBody = {
    name: "playlist by melodate ♫",
    description: "find your love at first note ♥",
  };

  // Creates empty playlist
  const playlist = await getFetchResponsePostMethod(
    request,
    createPlaylistUrl,
    createPlaylistBody
  );

  const playlistId = playlist["id"];
  const addToPlaylistUrl =
    "https://api.spotify.com/v1/playlists/" + playlistId + "/tracks";
  const addToPlaylistBody = {
    uris: getTrackUris(trackIds),
  };

  // Populates playlist
  const response = await getFetchResponsePostMethod(
    request,
    addToPlaylistUrl,
    addToPlaylistBody
  );

  return response;
};

/**
 * Returns user's ID
 * @param request
 * @returns string
 */
const getUserId = async (request: Request) => {
  const url = "https://api.spotify.com/v1/me";
  const response = await getFetchResponse(request, url, "GET");
  return response["id"];
};

/**
 * Returns array of Track URIs (Spotify identifier)
 * @param trackIds
 * @returns array of strings
 */
const getTrackUris = (trackIds: string) => {
  if (!trackIds) {
    return [];
  }
  const tracks = trackIds.split(",");
  const trackUris = [];
  for (var id of tracks) {
    const uri = "spotify:track:" + id;
    trackUris.push(uri);
  }
  return trackUris;
};
