type MatchTabProps = {
  text: string;
  isActive: boolean;

  clickHandler: (event: React.MouseEvent<HTMLElement>) => void;
};

export default function MatchTab(props: MatchTabProps) {
  const getClasses = () => {
    if (props.isActive) return "my-row center-align match-tab active-tab";
    return "my-row center-align match-tab pink-button";
  };

  return (
    <div className={getClasses()} onClick={props.clickHandler}>
      {props.text}
    </div>
  );
}
