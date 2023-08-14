import CustomButton from "./CustomButton";
import MatchRecord from "./MatchRecord";

type MatchTableProps = {
  buttonText: string;
};

export default function MatchTable(props: MatchTableProps) {
  return (
    <>
      <div className="full-width-div match-action-container my-row center-align">
        <CustomButton
          buttonClass="pill-button"
          colorClass="green-button"
          text={props.buttonText}
          isSubmit={false}
          route="/"
        />
      </div>

      <div className="full-width-div match-container my-col flex-start-align">
        <MatchRecord />
      </div>
    </>
  );
}
