import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import type { Direction } from "react-tinder-card";
import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useRef, useState } from "react";
import { getArtistsToServe } from "~/services/artist.server";
import { db } from "~/services/db.server";
import React from "react";
import SwipeCard from "~/shared/components/SwipeCard.client";
import CustomButton from "~/shared/components/CustomButton";
import Loading from "~/shared/components/Loading";
import TextButton from "~/shared/components/TextButton";

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

export default function Swipe() {
  const data = useLoaderData<typeof loader>();
  const [favoredArtists, setFavoredArtists] = useState<string[]>([]);
  const [cardIndex, setCardIndex] = useState<number>(data.length - 1);
  const cardParentDiv = useRef<any>();
  const cardRefs = Array(data.length)
    .fill(0)
    .map(() => React.createRef<any>());

  const updateSwiped = (
    direction: Direction,
    artistId: string,
    index: number
  ) => {
    if (direction === "right") {
      const updateArtists = [...favoredArtists, artistId];
      setFavoredArtists(updateArtists);
    }
    setCardIndex(index - 1);
  };

  const swipe = (direction: Direction) => {
    if (cardIndex >= 0 && cardIndex < data.length) {
      cardRefs[cardIndex].current.swipe(direction);
    }
  };

  const pauseAudio = (audio: HTMLAudioElement) => {
    audio.pause();
  };

  const playAudio = (audio: HTMLAudioElement) => {
    audio.play();
  };

  const interactAudio = () => {
    const audioElement =
      cardParentDiv.current.children[cardIndex + 1].children[2].children[1]
        .children[1].children[0];
    if (audioElement?.paused) playAudio(audioElement);
    else pauseAudio(audioElement);
  };

  const leaveScreen = () => {
    const audioElement =
      cardParentDiv.current.children[cardIndex + 1].children[2].children[1]
        .children[1].children[0];
    audioElement.pause();
  };

  const useArrowKeys = (e: KeyboardEvent) => {
    if (e.code === "ArrowLeft") swipe("left");
    else if (e.code === "ArrowRight") swipe("right");
    else if (e.code === "Space") {
      // PROBLEM: without this print, only audio of the first card is interactable
      // TODO: figure out why that is
      console.log(cardRefs[cardIndex].current.children);
      interactAudio();
    }
  };

  if (typeof document !== "undefined") {
    document.addEventListener("keydown", useArrowKeys);
    return (
      <div className="my-col start-center-align">
        <div className="full-page my-col center-align" ref={cardParentDiv}>
          <div className="my-col center-align generate-cards">
            <p>
              want more artists? if you generate new cards, you'll lose the ones
              you've swiped right on (╥﹏╥)
            </p>
            <TextButton text="generate new cards" route="/auth/spotify" />
          </div>
          {data.map((artist, index) => (
            <SwipeCard
              key={index}
              ref={cardRefs[index]}
              artistName={artist.name}
              artistImage={artist.image}
              followers={artist.followers}
              genre={artist.genre}
              // Only artists with a track is served (ref: artist.server)
              trackCover={artist.track!.image || artist.image}
              trackTitle={artist.track!.title}
              trackPreview={artist.track!.preview}
              swipeHandler={(direction: Direction) =>
                updateSwiped(direction, artist.id, index)
              }
              cardLeftHandler={leaveScreen}
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

  return <Loading />;
}
