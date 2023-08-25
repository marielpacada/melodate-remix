import CustomButton from "./CustomButton";
import MatchRecord from "./MatchRecord";
import EmptyTable from "./EmptyTable";
import TextButton from "./TextButton";

type MatchTableProps = {
  buttonText: string;
  buttonDisabled?: boolean;
  records: any[];
  recordType: string;
  recordIds: any;
};

const getLabelProperty = (record: any) => {
  if (typeof record["title"] === "undefined") {
    return "name"; // if Artist
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
          isDisabled={props.buttonDisabled}
          isSubmit={true}
          inputName={props.recordType}
          inputValue={props.recordIds}
        />
      </div>
      <div className="full-width-div match-container my-col start-center-align">
        {props.records.length > 0 ? (
          props.records.map((record, index) => (
            <MatchRecord
              key={index}
              id={record["id"]}
              type={props.recordType}
              label={record[getLabelProperty(record)]}
              imageAlt={record[getLabelProperty(record)]}
              imageSrc={record["image"]}
            />
          ))
        ) : (
          <EmptyTable />
        )}
      </div>
      {props.records.length > 0 && (
        <TextButton text="swipe on new artists" route="/auth/spotify" />
      )}
    </>
  );
}
