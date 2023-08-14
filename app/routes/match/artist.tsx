import type { ActionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getFavoredArtists } from "~/services/match.server";
import MatchTable from "~/shared/components/MatchTable";

export async function action({ request }: ActionArgs) {
  return null;
}

export async function loader() {
  return getFavoredArtists();
}

export default function Artist() {
  const data = useLoaderData<typeof loader>();
  return <MatchTable buttonText="follow artists" records={data} />;
}
