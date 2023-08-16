import CustomButton from "./CustomButton";
import MatchRecord from "./MatchRecord";

type MatchTableProps = {
  buttonText: string;
  records: any[];
  recordType: string;
  recordIds: any;
};

const getLabelProperty = (record: any) => {
  // if Artist
  if (typeof record["title"] === "undefined") {
    return "name";
  } else return "title"; // if Track
};

export default function MatchTable(props: MatchTableProps) {
  return (
    <>
      <div className="full-width-div match-action-container my-row center-align">
        <CustomButton
          buttonClass="pill-button"
          colorClass="green-button"
          text={props.buttonText}
          isSubmit={true}
          inputName={props.recordType}
          inputValue={props.recordIds}
        />
      </div>

      <div className="full-width-div match-container my-col start-center-align">
        {props.records.map((record, index) => (
          <MatchRecord
            key={index}
            label={record[getLabelProperty(record)]}
            imageAlt={record[getLabelProperty(record)]}
            imageSrc={record["image"]}
          />
        ))}
      </div>
    </>
  );
}
