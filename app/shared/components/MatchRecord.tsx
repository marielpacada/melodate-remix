import CustomImage from "./CustomImage";

type MatchRecordProps = {
  id: string;
  type: string;
  label: string;
  imageSrc: string;
  imageAlt: string;
};

const openSpotifyLink = (type: string, id: string) => {
  const recordType = type.slice(0, -1);
  const link = "https://open.spotify.com/" + recordType + "/" + id;
  window.open(link, "_blank");
};

export default function MatchRecord(props: MatchRecordProps) {
  return (
    <div
      className="match-record my-row start-center-align"
      onClick={() => openSpotifyLink(props.type, props.id)}
    >
      <div className="match-record-image">
        <CustomImage src={props.imageSrc} alt={props.imageAlt} />
      </div>
      <div className="match-label">{props.label}</div>
    </div>
  );
}
