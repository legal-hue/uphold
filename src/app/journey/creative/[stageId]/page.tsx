import { creativeJourney } from "@/data/journeys/creative";
import StagePage from "./client-page";

export function generateStaticParams() {
  return creativeJourney.stages.map((s) => ({ stageId: s.id }));
}

export default function CreativeStagePage() {
  return <StagePage />;
}
