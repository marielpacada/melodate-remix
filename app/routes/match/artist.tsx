import type { ActionArgs } from "@remix-run/node";
import type { Artist } from "@prisma/client";
import { useLoaderData } from "@remix-run/react";
import { getFavoredArtists, followArtists } from "~/services/match.server";
import MatchTable from "~/shared/components/MatchTable";

export async function loader() {
  return getFavoredArtists();
}

export async function action({ request }: ActionArgs) {
  const body = await request.formData();
  const recordsFormData = body.get("artists")?.toString(); // returns a single string
  await followArtists(request, recordsFormData!);
  return null;
}

const getArtistIds = (data: Artist[]) => {
  const artistIds = [];
  for (var artist of data) {
    artistIds.push(artist.id);
  }
  return artistIds;
};

export default function ArtistMatch() {
  const data = useLoaderData<typeof loader>();
  return (
    <MatchTable
      buttonText="follow artists"
      records={data}
      recordType="artists"
      recordIds={getArtistIds(data)}
    />
  );
}
