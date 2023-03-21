import type { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { spotifyStrategy } from "~/services/auth.server";
import PillButton from "~/shared/components/PillButton";

export async function loader({ request }: LoaderArgs) {
  return spotifyStrategy.getSession(request);
}

export default function Index() {
  const data = useLoaderData<typeof loader>();
  const user = data?.user;
  const name = user?.name as string;

  return (
    <div className="full-page my-col even-space-align">
      <img
        className="melodate-logo"
        src="melodate-logo.svg"
        alt="melodate logo"
      />
      <div className="landing-text">find your love at first note</div>
      <PillButton
        colorClass="green-button"
        text={user ? "hello, ".concat(name) : "login to spotify"}
        route="/auth/spotify"
      />
    </div>
  );
}
