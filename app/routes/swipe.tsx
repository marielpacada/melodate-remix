import type { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getArtistsToServe } from "~/services/artist.server";

import SwipeCard from "~/shared/components/SwipeCard.client";

const Fallback = () => {
  return <div>Loading IDE...</div>;
};

// THE WAY YOU CAN CHECK IF LOADING IS 204 STATUS CODE I THINK
// so that we can serve a loading screen of sorts???
export async function loader({ request, context }: LoaderArgs) {
  return getArtistsToServe(request, 30);
}

export default function Swipe() {
  const data = useLoaderData<typeof loader>();

  if (typeof document !== "undefined") {
    return (
      <div className="full-page my-col center-align even-space-align">
        {data.map((artist, index) => (
          <SwipeCard
            key={index}
            artistName={artist.name}
            artistImage={artist.image}
            followers={artist.followers}
            genre={artist.genre}
            // Only artists with a track is served (ref: artist.server)
            trackCover={artist.track!.image || artist.image}
            trackTitle={artist.track!.title}
            trackPreview={artist.track!.preview}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="full-page my-col center-align even-space-align">
      <Fallback />
    </div>
  );
}
