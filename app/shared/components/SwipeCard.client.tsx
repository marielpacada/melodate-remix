import type { ForwardRefRenderFunction } from "react";
import type { Props, SwipeHandler } from "react-tinder-card";
import { useRef, forwardRef } from "react";
import TinderCard from "react-tinder-card";
import CustomImage from "./CustomImage";
import ArtistCardInfo from "./ArtistCardInfo";
import TrackCardInfo from "./TrackCardInfo";

export interface SwipeCardProps {
  key: number;
  artistName: string;
  artistImage: string;
  followers: number;
  genre: string;

  trackCover: string;
  trackTitle: string;
  trackPreview: string;

  swipeHandler: SwipeHandler;
}

const SwipeCard: ForwardRefRenderFunction<React.FC<Props>, SwipeCardProps> = (
  props,
  ref
) => {
  const {
    artistName,
    artistImage,
    followers,
    genre,

    trackCover,
    trackTitle,
    trackPreview,

    swipeHandler,
  } = props;

  const audioParentDiv = useRef<any>();
  const pauseAudio = () => {
    const audioElement =
      audioParentDiv.current.children[1].children[1].children[0];
    audioElement.pause();
  };

  return (
    <TinderCard
      ref={ref}
      className="tinder-card"
      preventSwipe={["up", "down"]}
      onSwipe={swipeHandler}
      onCardLeftScreen={pauseAudio}
    >
      <div className="image-container">
        <CustomImage src={artistImage} alt={artistName}></CustomImage>
      </div>
      <div className="my-col top-left-align name-container">
        <ArtistCardInfo
          name={artistName}
          followers={followers}
          genre={genre}
        ></ArtistCardInfo>
      </div>
      <div
        className="my-row space-btwn-align track-container"
        ref={audioParentDiv}
      >
        <TrackCardInfo
          cover={trackCover}
          title={trackTitle}
          preview={trackPreview}
        ></TrackCardInfo>
      </div>
    </TinderCard>
  );
};

export default forwardRef<React.FC<Props>, SwipeCardProps>(SwipeCard);
