import { Form } from "@remix-run/react";

type PillButtonProps = {
  colorClass: string;
  text: string;
  route: string;
};

export default function PillButton(props: PillButtonProps) {
  return (
    <Form
      className={"pill-button my-row center-align "
        .concat(props.colorClass)
        .trim()}
      action={props.route}
      method="post"
    >
      <button>{props.text}</button>
    </Form>
  );
}
