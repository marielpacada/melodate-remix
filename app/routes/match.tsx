import type { ActionArgs } from "@remix-run/node";
import type { Artist, Track } from "@prisma/client";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import {
  getFavoredArtists,
  getFavoredTracks,
  followArtists,
  createPlaylist,
} from "~/services/match.server";
import MatchTab from "~/shared/components/MatchTab";
import MatchTable from "~/shared/components/MatchTable";

export async function loader() {
  const matches = {
    artists: await getFavoredArtists(),
    tracks: await getFavoredTracks(),
  };

  return matches;
}

export async function action({ request }: ActionArgs) {
  const body = await request.formData();
  const formDataType = body.keys().next().value;
  const recordsFormData = body.get(formDataType)?.toString(); // returns a single string

  // Prevents automatically sending request on render
  if (typeof recordsFormData !== "undefined" && recordsFormData.length > 0) {
    if (formDataType === "artists")
      await followArtists(request, recordsFormData);
    else await createPlaylist(request, recordsFormData);
  }

  return null;
}

export default function Match() {
  const data = useLoaderData<typeof loader>();
  const artists = data.artists;
  const tracks = data.tracks;
  const [activeTab, setActiveTab] = useState<string>("artists");

  const handleClickTabs = (event: React.MouseEvent<HTMLElement>) => {
    const tab = event.currentTarget.textContent;
    setActiveTab(tab!); // tab always has text content ('artists' | 'tracks')
  };

  const getRecordIds = (records: Artist[] | Track[]) => {
    const ids = [];
    for (var record of records) ids.push(record.id);
    return ids;
  };

  return (
    <div className="full-page match-page my-col start-center-align">
      <div className="full-width-div match-tab-container my-row center-align">
        <MatchTab
          text="artists"
          isActive={activeTab === "artists"}
          clickHandler={handleClickTabs}
        />
        <MatchTab
          text="tracks"
          isActive={activeTab === "tracks"}
          clickHandler={handleClickTabs}
        />
      </div>
      {activeTab === "artists" ? (
        <MatchTable
          buttonText="follow artists"
          records={artists}
          recordType="artists"
          recordIds={getRecordIds(artists)}
        />
      ) : (
        <MatchTable
          buttonText="create playlist"
          records={tracks}
          recordType="tracks"
          recordIds={getRecordIds(tracks)}
        />
      )}
    </div>
  );
}
