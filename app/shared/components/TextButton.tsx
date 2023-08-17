import { Form } from "@remix-run/react";

type TextButtonProps = {
  text: string;
  route: string;
};

export default function TextButton(props: TextButtonProps) {
  return (
    <Form action={props.route} method="post">
      <button className="text-button">{props.text}</button>
    </Form>
  );
}
