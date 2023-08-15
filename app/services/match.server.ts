import { db } from "./db.server";

/**
 * Returns Artists that have been swiped right
 */
export const getFavoredArtists = async () => {
  const favoredArtists = await db.artist.findMany({
    where: { swiped: true },
  });

  return favoredArtists;
};

/**
 * Return Tracks of the artists that have been swiped right
 */
export const getFavoredTracks = async () => {
  const favoredTracks = [];
  const trackObjects = await db.artist.findMany({
    where: { swiped: true },
    select: { track: true },
  });

  for (const object of trackObjects) {
    favoredTracks.push(object["track"]);
  }

  return favoredTracks;
};
