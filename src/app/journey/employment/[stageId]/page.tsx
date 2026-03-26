import { employmentJourney } from "@/data/journeys/employment";
import StagePage from "./client-page";

export function generateStaticParams() {
  return employmentJourney.stages.map((s) => ({ stageId: s.id }));
}

export default function EmploymentStagePage() {
  return <StagePage />;
}
