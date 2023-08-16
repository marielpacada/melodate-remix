import type { ActionArgs } from "@remix-run/node";
import type { Track } from "@prisma/client";
import { useLoaderData } from "@remix-run/react";
import { getFavoredTracks, createPlaylist } from "~/services/match.server";
import MatchTable from "~/shared/components/MatchTable";

export async function loader() {
  return getFavoredTracks();
}

export async function action({ request }: ActionArgs) {
  const body = await request.formData();
  const recordsFormData = body.get("tracks")?.toString(); // returns a single string
  // Prevents from creating empty playlist each time user navs to /match/track
  if (typeof recordsFormData !== "undefined" && recordsFormData.length > 0) {
    await createPlaylist(request, recordsFormData);
  }
  return null;
}

const getTrackIds = (data: Track[]) => {
  const trackIds = [];
  for (var track of data) {
    trackIds.push(track.id);
  }
  return trackIds;
};

export default function TrackMatch() {
  const data = useLoaderData<typeof loader>();
  return (
    <MatchTable
      buttonText="create playlist"
      records={data}
      recordType="tracks"
      recordIds={getTrackIds(data)}
    />
  );
}
