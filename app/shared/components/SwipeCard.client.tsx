import TinderCard from "react-tinder-card";
import ArtistCardImage from "./ArtistCardImage";
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
  return (
    <TinderCard
      className="tinder-card"
      preventSwipe={["up", "down"]}
      onSwipe={props.swipeHandler}
    >
      <div className="image-container">
        <ArtistCardImage
          src={props.artistImage}
          alt={props.artistName}
        ></ArtistCardImage>
      </div>
      <div className="my-col top-left-align name-container">
        <ArtistCardInfo
          name={props.artistName}
          followers={props.followers}
          genre={props.genre}
        ></ArtistCardInfo>
      </div>
      <div className="my-row space-btwn-align track-container">
        <TrackCardInfo
          cover={props.trackCover}
          title={props.trackTitle}
          preview={props.trackPreview}
        ></TrackCardInfo>
      </div>
    </TinderCard>
  );
}
