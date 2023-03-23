import type { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { getTopArtists } from "~/services/artist.server";
import SwipeCard from "~/shared/components/SwipeCard.client";

const Fallback = () => {
  return <div>Loading IDE...</div>;
};

export async function loader({ request }: LoaderArgs) {
  return getTopArtists(request);
}

export default function Swipe() {
  const data = useLoaderData<typeof loader>();
  console.log(data);

  return (
    <div className="full-page my-col center-align even-space-align">
      {typeof document !== "undefined" ? <SwipeCard /> : <Fallback />}
    </div>
  );
}
