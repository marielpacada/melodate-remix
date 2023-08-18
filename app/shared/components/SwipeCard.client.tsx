import { useRef } from "react";
import TinderCard from "react-tinder-card";
import CustomImage from "./CustomImage";
import ArtistCardInfo from "./ArtistCardInfo";
import TrackCardInfo from "./TrackCardInfo";

declare type Direction = "left" | "right" | "up" | "down";
declare type SwipeHandler = (direction: Direction) => void;

type SwipeCardProps = {
  key: number;
  artistName: string;
  artistImage: string;
  followers: number;
  genre: string;

  trackCover: string;
  trackTitle: string;
  trackPreview: string;

  swipeHandler: SwipeHandler;
};

export default function SwipeCard(props: SwipeCardProps) {
  const audioParentDiv = useRef<any>();
  const pauseAudio = () => {
    const audioElement =
      audioParentDiv.current.children[1].children[1].children[0];
    audioElement.pause();
  };

  return (
    <TinderCard
      className="tinder-card"
      preventSwipe={["up", "down"]}
      onSwipe={props.swipeHandler}
      onCardLeftScreen={pauseAudio}
    >
      <div className="image-container">
        <CustomImage
          src={props.artistImage}
          alt={props.artistName}
        ></CustomImage>
      </div>
      <div className="my-col top-left-align name-container">
        <ArtistCardInfo
          name={props.artistName}
          followers={props.followers}
          genre={props.genre}
        ></ArtistCardInfo>
      </div>
      <div
        className="my-row space-btwn-align track-container"
        ref={audioParentDiv}
      >
        <TrackCardInfo
          cover={props.trackCover}
          title={props.trackTitle}
          preview={props.trackPreview}
        ></TrackCardInfo>
      </div>
    </TinderCard>
  );
}
