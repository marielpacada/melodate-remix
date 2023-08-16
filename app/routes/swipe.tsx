import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { useState } from "react";
import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getArtistsToServe } from "~/services/artist.server";
import { db } from "~/services/db.server";
import SwipeCard from "~/shared/components/SwipeCard.client";
import CustomButton from "~/shared/components/CustomButton";

declare type Direction = "left" | "right" | "up" | "down";

export async function loader({ request }: LoaderArgs) {
  return getArtistsToServe(request, 30);
}

export async function action({ request }: ActionArgs) {
  const body = await request.formData();
  const artistFormData = body.get("artists"); // returns a single string
  const artists = artistFormData ? artistFormData.toString().split(",") : [];

  for (var id of artists) {
    await db.artist.update({
      where: { id: id },
      data: { swiped: true },
    });
  }

  return redirect("/match/artist");
}

const Fallback = () => {
  return <div>Loading IDE...</div>;
};

export default function Swipe() {
  const data = useLoaderData<typeof loader>();
  const [favoredArtists, setFavoredArtists] = useState<string[]>([]);

  const updateSwiped = (direction: Direction, artistId: string) => {
    if (direction === "right") {
      const updateArtists = [...favoredArtists, artistId];
      setFavoredArtists(updateArtists);
    }
  };

  if (typeof document !== "undefined") {
    return (
      <div className="my-col start-center-align">
        <div className="full-page my-col center-align">
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
              swipeHandler={(direction: Direction) =>
                updateSwiped(direction, artist.id)
              }
            />
          ))}
        </div>

        <div className="full-width-div my-row center-align">
          <CustomButton
            buttonClass="pill-button"
            colorClass="green-button"
            text="view your matches now!"
            isSubmit={true}
            inputName="artists"
            inputValue={favoredArtists}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="full-page my-col center-align even-space-align">
      <Fallback />
    </div>
  );
}
