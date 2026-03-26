import { PracticeArea } from "./types";

export interface SwotAnalysis {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

export function generateSwot(
  area: PracticeArea,
  answers: Record<string, string | string[]>
): SwotAnalysis {
  if (area === "employment") return generateEmploymentSwot(answers);
  if (area === "housing") return generateHousingSwot(answers);
  return generateContractSwot(answers);
}

function generateEmploymentSwot(
  answers: Record<string, string | string[]>
): SwotAnalysis {
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const opportunities: string[] = [];
  const threats: string[] = [];

  // Analyse what happened
  const situation = answers.what_happened as string;
  if (situation === "dismissed" || situation === "constructive") {
    strengths.push(
      "Your situation involves a potentially actionable claim that tribunals regularly consider"
    );
  }
  if (situation === "discrimination") {
    strengths.push(
      "Discrimination claims do not require a minimum length of service and can attract higher compensation"
    );
  }
  if (situation === "wages") {
    strengths.push(
      "Unpaid wages and holiday pay claims are typically straightforward to evidence with payslips and contracts"
    );
  }

  // Length of service
  const service = answers.length_of_service as string;
  if (service === "over_2_years") {
    strengths.push(
      "With over 2 years' service, you have full unfair dismissal protection under current law"
    );
  } else if (service === "6_to_2_years") {
    weaknesses.push(
      "With less than 2 years' service, unfair dismissal protection is limited unless your claim involves discrimination, whistleblowing, or another automatically unfair reason"
    );
    opportunities.push(
      "From January 2027, the Employment Rights Act 2025 introduces day-one unfair dismissal rights. Depending on your timeline, this may become relevant"
    );
  } else if (service === "under_6_months") {
    weaknesses.push(
      "Short service limits which claims are available to you, though discrimination and whistleblowing claims have no minimum service requirement"
    );
  }

  // Protected characteristics
  const characteristics = answers.protected_characteristic;
  if (
    Array.isArray(characteristics) &&
    characteristics.length > 0 &&
    !characteristics.includes("none")
  ) {
    strengths.push(
      "A potential discrimination element strengthens your position. Discrimination claims have no service requirement and no cap on compensation"
    );
    opportunities.push(
      "Discrimination claims often result in higher settlements because employers want to avoid tribunal publicity"
    );
  }

  // Grievance
  const grievance = answers.grievance as string;
  if (grievance === "yes_written") {
    strengths.push(
      "You have raised a formal written grievance, which demonstrates you gave your employer the opportunity to resolve the matter"
    );
  } else if (grievance === "no" || grievance === "not_sure") {
    weaknesses.push(
      "No formal grievance has been raised. While not always required, tribunals may reduce compensation by up to 25% if the ACAS Code of Practice on grievances was not followed"
    );
    opportunities.push(
      "Upheld can generate a formal grievance letter for you, pre-populated with your details, to send before proceeding further"
    );
  }

  // Evidence
  const evidence = answers.evidence;
  if (Array.isArray(evidence) && evidence.length > 0 && !evidence.includes("none")) {
    const evidenceTypes = evidence.length;
    if (evidenceTypes >= 3) {
      strengths.push(
        "You have multiple types of evidence, which gives you a solid foundation to build your case"
      );
    } else {
      strengths.push(
        "You have some evidence to support your claim. Building on this will strengthen your position"
      );
    }
    if (evidence.includes("witnesses")) {
      strengths.push(
        "Witness evidence can be particularly persuasive at tribunal, especially from colleagues who observed events first-hand"
      );
    }
  } else {
    weaknesses.push(
      "You do not currently have documented evidence. This is common at this stage, but gathering evidence early is important"
    );
    opportunities.push(
      "Upheld's Evidence Builder helps you organise documents, emails, photos, and witness details into a clear timeline before they are lost or forgotten"
    );
  }

  // ACAS
  const acas = answers.acas as string;
  if (acas === "yes_certificate") {
    strengths.push(
      "You have completed ACAS early conciliation and have your certificate, which means you are ready to file a tribunal claim if needed"
    );
  } else if (acas === "yes_ongoing") {
    opportunities.push(
      "ACAS conciliation is still open, which means there is an opportunity to negotiate a settlement without the cost and stress of a tribunal hearing"
    );
  } else {
    threats.push(
      "You must contact ACAS before filing a tribunal claim. This is a legal requirement and your deadline clock is running"
    );
    opportunities.push(
      "ACAS early conciliation is free, confidential, and can lead to a negotiated settlement. Many cases resolve at this stage"
    );
  }

  // Employment status
  const stillEmployed = answers.still_employed as string;
  if (stillEmployed === "yes" || stillEmployed === "notice") {
    opportunities.push(
      "You are still employed, which means you may have access to workplace documents, systems, and potential witnesses. Gather evidence carefully while you can"
    );
    threats.push(
      "Be cautious about what you access or copy from work systems. Take photos or notes rather than removing original documents"
    );
  }

  // Universal threats
  threats.push(
    "Employment tribunal claims must generally be filed within 3 months minus 1 day. Missing this deadline could mean losing your right to bring a claim entirely"
  );
  threats.push(
    "Your employer is likely to have legal representation. Being well prepared and organised is essential to levelling the playing field"
  );

  // Universal opportunities
  opportunities.push(
    "Upheld's Document Generator can create pre-populated correspondence for grievances, without prejudice letters, and pre-action letters to support your negotiations"
  );

  return { strengths, weaknesses, opportunities, threats };
}

function generateHousingSwot(
  answers: Record<string, string | string[]>
): SwotAnalysis {
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const opportunities: string[] = [];
  const threats: string[] = [];

  const problem = answers.what_problem as string;
  if (problem === "damp_mould" || problem === "structural") {
    strengths.push(
      "Damp, mould, and structural issues are well-established grounds for housing disrepair claims under the Landlord and Tenant Act 1985"
    );
  }
  if (problem === "heating" || problem === "water") {
    strengths.push(
      "Heating and water supply issues are fundamental obligations under Section 11 of the Landlord and Tenant Act 1985. Your landlord has a clear legal duty to repair"
    );
  }

  const reported = answers.reported_landlord as string;
  if (reported === "yes_writing") {
    strengths.push(
      "You have notified your landlord in writing, which is crucial. Your landlord's obligation to repair typically only arises once they have been made aware of the problem"
    );
  } else if (reported === "yes_verbal") {
    weaknesses.push(
      "You have reported the issue verbally but not in writing. Written notice is much stronger evidence of when your landlord was made aware"
    );
    opportunities.push(
      "Upheld can generate a formal Section 11 repair request letter pre-populated with your details to send to your landlord now"
    );
  } else {
    weaknesses.push(
      "You have not yet reported the issue to your landlord. They cannot be held liable for repairs they do not know about"
    );
    opportunities.push(
      "Upheld can generate a formal repair request notice for you to send immediately, creating the paper trail you need"
    );
  }

  const evidence = answers.evidence;
  if (Array.isArray(evidence) && evidence.length > 0 && !evidence.includes("none")) {
    strengths.push(
      "You have evidence of the disrepair. Photographs with dates, correspondence, and records of the impact on your health are all valuable"
    );
  } else {
    weaknesses.push(
      "You have limited evidence at this stage. Photographs, dated records, and medical evidence of health impacts will significantly strengthen your claim"
    );
    opportunities.push(
      "Start documenting everything now with Upheld's Evidence Builder. Even evidence gathered from today onwards strengthens your position"
    );
  }

  const healthImpact = answers.health_impact as string;
  if (healthImpact === "yes") {
    strengths.push(
      "Health impacts from disrepair can significantly increase the value of your claim and demonstrate the urgency of the situation"
    );
    opportunities.push(
      "A GP letter confirming the health impact of the disrepair conditions is a powerful piece of evidence. Consider booking an appointment"
    );
  }

  threats.push(
    "Landlords may dispute the extent of disrepair or claim they were not properly notified. A strong paper trail protects you"
  );
  threats.push(
    "Housing disrepair claims have a 6-year limitation period, but delays can make evidence harder to gather and conditions harder to prove"
  );
  opportunities.push(
    "Many housing disrepair claims settle before court. A well-drafted letter before action often prompts landlords to act"
  );
  opportunities.push(
    "Your local council's Environmental Health team can inspect the property and issue enforcement notices at no cost to you"
  );

  return { strengths, weaknesses, opportunities, threats };
}

function generateContractSwot(
  answers: Record<string, string | string[]>
): SwotAnalysis {
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const opportunities: string[] = [];
  const threats: string[] = [];

  const contractType = answers.contract_type as string;
  if (contractType === "written") {
    strengths.push(
      "You have a written contract, which clearly sets out the terms and obligations of both parties. This makes it easier to demonstrate a breach"
    );
  } else if (contractType === "verbal") {
    weaknesses.push(
      "Verbal contracts are legally binding but harder to prove. Without written terms, disputes often come down to one party's word against another"
    );
    opportunities.push(
      "Gather any supporting evidence of the agreed terms: emails, text messages, invoices, or witness accounts that confirm what was agreed"
    );
  }

  const issue = answers.what_issue as string;
  if (issue === "non_payment") {
    strengths.push(
      "Non-payment claims are among the most straightforward contract disputes. If services were provided and payment was agreed, you have a clear basis for a claim"
    );
  }
  if (issue === "poor_service") {
    opportunities.push(
      "Under the Consumer Rights Act 2015, services must be carried out with reasonable care and skill. If the standard fell short, you have statutory protection"
    );
  }
  if (issue === "breach") {
    strengths.push(
      "A clear breach of a specific contractual term is a strong foundation for a claim, particularly if you can point to the exact clause that was broken"
    );
  }

  const value = answers.value as string;
  if (value === "under_10k") {
    opportunities.push(
      "Claims under 10,000 go through the Small Claims Track, which is designed for people without lawyers. No risk of paying the other side's legal costs if you lose"
    );
  } else if (value === "10k_to_25k") {
    threats.push(
      "Claims above 10,000 may go through the Fast Track, where costs rules are stricter and legal representation becomes more common on both sides"
    );
  }

  const attempted = answers.attempted_resolution as string;
  if (attempted === "yes") {
    strengths.push(
      "You have already attempted to resolve the matter directly, which courts view favourably and is expected under the Pre-Action Protocol"
    );
  } else {
    weaknesses.push(
      "You have not yet attempted to resolve the dispute directly. Courts expect parties to try to settle before issuing proceedings"
    );
    opportunities.push(
      "Upheld can generate a pre-action letter setting out your claim and giving the other party a reasonable time to respond before you consider court action"
    );
  }

  threats.push(
    "Contract claims generally have a 6-year limitation period from the date of breach, but acting sooner preserves evidence and demonstrates seriousness"
  );
  threats.push(
    "The other party may dispute the terms, the breach, or the loss you have suffered. Strong documentation is your best protection"
  );
  opportunities.push(
    "Mediation is available for contract disputes and can resolve matters faster and more cheaply than court proceedings"
  );

  return { strengths, weaknesses, opportunities, threats };
}
