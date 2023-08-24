import { Form } from "@remix-run/react";

interface CommonProps {
  buttonClass: string;
  colorClass: string;
  text: string;
  isDisabled?: boolean;
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

type CustomButtonProps = FormSubmitProps | FormActionProps;

export default function CustomButton(props: CustomButtonProps) {
  const formClass = props.buttonClass
    .concat("-form my-row center-align ")
    .concat(props.colorClass);

  return (
    <Form
      method="post"
      action={props.isSubmit ? undefined : props.route}
      className={formClass}
    >
      {props.isSubmit && (
        <input type="hidden" name={props.inputName} value={props.inputValue} />
      )}
      <button
        disabled={props.isDisabled}
        className={props.buttonClass}
        type={props.isSubmit ? "submit" : undefined}
      >
        {props.text}
      </button>
    </Form>
  );
}
