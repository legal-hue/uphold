import { housingJourney } from "@/data/journeys/housing";
import HousingStagePage from "./client-page";

export function generateStaticParams() {
  return housingJourney.stages.map((s) => ({ stageId: s.id }));
}

export default function HousingStageRoute() {
  return <HousingStagePage />;
}
