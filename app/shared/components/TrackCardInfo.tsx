type TrackCardInfoProps = {
  title: string;
  cover: string;
  preview: string;
};

export default function TrackCardInfo(props: TrackCardInfoProps) {
  return (
    <>
      <div className="my-row center-align track-cover-container">
        <div className="track-cover">
          <img className="fit-image" src={props.cover} alt={props.title}></img>
        </div>
      </div>
      <div className="my-col center-start-align track-audio-container">
        <div className="track-title">{props.title}</div>
        <div className="track-preview">
          <audio controls>
            <source src={props.preview} type="audio/mpeg"></source>
          </audio>
        </div>
      </div>
    </>
  );
}
