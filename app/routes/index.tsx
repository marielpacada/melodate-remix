import type { LoaderArgs } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";

import { spotifyStrategy } from "~/services/auth.server";

import PillButton from "~/shared/components/PillButton";

export async function loader({ request }: LoaderArgs) {
  return spotifyStrategy.getSession(request);
}

export default function Index() {
  const data = useLoaderData<typeof loader>();
  const user = data?.user;
  const name = user?.name?.toLowerCase().split(" ")[0] as string;

  return (
    <div className="full-page my-col center-align even-space-align">
      <img
        className="melodate-logo"
        src="melodate-logo.svg"
        alt="melodate logo"
      />

      <div className="landing-text">find your love at first note</div>

      <div className="logout-text full-width-div my-col center-align">
        <PillButton
          colorClass="green-button"
          text={user ? "login as " + name : "login to spotify"}
          route="/auth/spotify"
        />
        {user && (
          <div className="full-width-div">
            <p className="inline-child">not you?</p>
            <Form className="inline-child" action="/logout" method="post">
              <button className="logout-button">logout</button>
            </Form>
          </div>
        )}
      </div>
    </div>
  );
}
