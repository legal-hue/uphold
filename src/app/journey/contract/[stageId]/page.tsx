import { contractJourney } from "@/data/journeys/contract";
import ContractStagePage from "./client-page";

export function generateStaticParams() {
  return contractJourney.stages.map((s) => ({ stageId: s.id }));
}

export default function ContractStageRoute() {
  return <ContractStagePage />;
}
