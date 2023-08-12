import { Form } from "@remix-run/react";

interface CommonProps {
  colorClass: string;
  text: string;
}

interface FormSubmitProps extends CommonProps {
  isSubmit: true;
  inputName: string;
  inputValue: any;
}

interface FormActionProps extends CommonProps {
  isSubmit: false;
  route: string;
}

type PillButtonProps = FormSubmitProps | FormActionProps;

export default function PillButton(props: PillButtonProps) {
  return (
    <Form
      method="post"
      action={props.isSubmit ? undefined : props.route}
      className={"pill-button-form my-row center-align "
        .concat(props.colorClass)
        .trim()}
    >
      {props.isSubmit && (
        <input type="hidden" name={props.inputName} value={props.inputValue} />
      )}
      <button
        className="pill-button"
        type={props.isSubmit ? "submit" : undefined}
      >
        {props.text}
      </button>
    </Form>
  );
}
