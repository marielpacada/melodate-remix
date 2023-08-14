import type { ActionArgs } from "@remix-run/node";
import MatchTable from "~/shared/components/MatchTable";

export async function action({ request }: ActionArgs) {
  return null;
}

export default function Artist() {
  return <MatchTable buttonText="follow artists" />;
}
