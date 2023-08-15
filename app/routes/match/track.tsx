import type { ActionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getFavoredTracks } from "~/services/match.server";
import MatchTable from "~/shared/components/MatchTable";

export async function action({ request }: ActionArgs) {
  return null;
}

export async function loader() {
  return getFavoredTracks();
}

export default function Track() {
  const data = useLoaderData<typeof loader>();
  return <MatchTable buttonText="create playlist" records={data} />;
}
