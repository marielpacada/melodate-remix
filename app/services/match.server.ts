import { db } from "./db.server";

export const getFavoredArtists = async () => {
  const favoredArtists = await db.artist.findMany({
    where: { swiped: true },
  });

  return favoredArtists;
};

// write function for getting tracks
