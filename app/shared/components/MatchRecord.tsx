import CustomImage from "./CustomImage";

type MatchRecordProps = {
  label: string;
  imageSrc: string;
  imageAlt: string;
};

export default function MatchRecord(props: MatchRecordProps) {
  return (
    <div className="match-record my-row start-center-align">
      <div className="match-record-image">
        <CustomImage src={props.imageSrc} alt={props.imageAlt} />
      </div>
      <div>{props.label}</div>
    </div>
  );
}
