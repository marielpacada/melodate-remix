import TinderCard from "react-tinder-card";
import ArtistCardImage from "./ArtistCardImage";
import ArtistCardInfo from "./ArtistCardInfo";
import TrackCardInfo from "./TrackCardInfo";

type SwipeCardProps = {
  key: number;
  artistName: string;
  artistImage: string;
  followers: number;
  genre: string;
  trackCover: string;
  trackTitle: string;
  trackPreview: string;
};

export default function SwipeCard(props: SwipeCardProps) {
  return (
    <TinderCard className="tinder-card">
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
