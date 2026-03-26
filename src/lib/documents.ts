import type { PracticeArea, TriageOutcome } from "./types";

export interface DocumentTemplate {
  id: string;
  area: PracticeArea;
  name: string;
  description: string;
  stageId: string; // which journey stage this belongs to
  fields: DocumentField[];
  generate: (values: Record<string, string>) => string;
}

export interface DocumentField {
  id: string;
  label: string;
  placeholder: string;
  type: "text" | "textarea" | "date";
  required: boolean;
  prefillFrom?: string; // key in triage answers to prefill from
}

// ─── Employment: Grievance Letter ───

const grievanceLetter: DocumentTemplate = {
  id: "grievance-letter",
  area: "employment",
  name: "Grievance Letter",
  description:
    "A formal written complaint to your employer about how you've been treated.",
  stageId: "grievance",
  fields: [
    {
      id: "your_name",
      label: "Your full name",
      placeholder: "e.g. Sarah Johnson",
      type: "text",
      required: true,
    },
    {
      id: "your_address",
      label: "Your address",
      placeholder: "e.g. 42 Oak Road, London, SE1 2AB",
      type: "text",
      required: true,
    },
    {
      id: "employer_name",
      label: "Your employer's name",
      placeholder: "e.g. Acme Ltd",
      type: "text",
      required: true,
    },
    {
      id: "employer_address",
      label: "Employer's address (or HR address)",
      placeholder: "e.g. 1 Business Park, London, EC1 1AA",
      type: "text",
      required: true,
    },
    {
      id: "recipient_name",
      label: "Who should the letter be addressed to?",
      placeholder: "e.g. HR Department / Jane Smith, HR Manager",
      type: "text",
      required: true,
    },
    {
      id: "job_title",
      label: "Your job title",
      placeholder: "e.g. Customer Service Advisor",
      type: "text",
      required: true,
    },
    {
      id: "start_date",
      label: "When did you start working there?",
      placeholder: "",
      type: "date",
      required: true,
    },
    {
      id: "what_happened",
      label: "Describe what happened",
      placeholder:
        "Set out the key events in date order. Include who was involved, what they did or said, and how it affected you. Be factual and specific.",
      type: "textarea",
      required: true,
    },
    {
      id: "outcome_sought",
      label: "What outcome are you seeking?",
      placeholder:
        "e.g. I would like a formal investigation into my complaint, an apology, and assurance that this will not happen again.",
      type: "textarea",
      required: true,
    },
  ],
  generate: (values) => {
    const today = new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    return `${values.your_name}
${values.your_address}

${today}

${values.recipient_name}
${values.employer_name}
${values.employer_address}

Dear ${values.recipient_name},

FORMAL GRIEVANCE

I am writing to raise a formal grievance in accordance with the company's grievance procedure.

I am employed as a ${values.job_title}, having commenced employment on ${formatFieldDate(values.start_date)}.

Details of my grievance

${values.what_happened}

Outcome sought

${values.outcome_sought}

I am raising this grievance in accordance with the ACAS Code of Practice on Disciplinary and Grievance Procedures. I would be grateful if you could acknowledge receipt of this letter and arrange a grievance meeting at the earliest opportunity.

I reserve the right to be accompanied at any grievance meeting by a colleague or trade union representative, in accordance with section 10 of the Employment Relations Act 1999.

I look forward to hearing from you.

Yours sincerely,

${values.your_name}`;
  },
};

// ─── Housing: Section 11 Notice ───

const section11Notice: DocumentTemplate = {
  id: "section-11-notice",
  area: "housing",
  name: "Repair Request Letter",
  description:
    "A formal letter notifying your landlord of disrepair and requesting repairs under Section 11 of the Landlord and Tenant Act 1985.",
  stageId: "report",
  fields: [
    {
      id: "your_name",
      label: "Your full name",
      placeholder: "e.g. James Thompson",
      type: "text",
      required: true,
    },
    {
      id: "your_address",
      label: "Your address (the property with the problem)",
      placeholder: "e.g. Flat 3, 15 High Street, Manchester, M1 1AA",
      type: "text",
      required: true,
    },
    {
      id: "landlord_name",
      label: "Your landlord's name",
      placeholder: "e.g. ABC Housing Association / Mr Smith",
      type: "text",
      required: true,
    },
    {
      id: "landlord_address",
      label: "Landlord's address",
      placeholder: "e.g. Property Management Office, 10 Main St, Manchester",
      type: "text",
      required: true,
    },
    {
      id: "problems",
      label: "Describe the problems with your property",
      placeholder:
        "e.g. There is severe damp and black mould in the bedroom and bathroom. The kitchen window does not close properly and lets in rainwater. The boiler is not heating the radiators in the living room.",
      type: "textarea",
      required: true,
    },
    {
      id: "first_reported",
      label: "When did you first report this to your landlord?",
      placeholder: "",
      type: "date",
      required: true,
    },
    {
      id: "health_impact",
      label: "How has this affected your health or daily life? (optional)",
      placeholder:
        "e.g. My children have developed breathing problems. I am unable to use the bedroom due to mould.",
      type: "textarea",
      required: false,
    },
  ],
  generate: (values) => {
    const today = new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const healthSection = values.health_impact
      ? `\nImpact on health and daily life\n\n${values.health_impact}\n`
      : "";

    return `${values.your_name}
${values.your_address}

${today}

${values.landlord_name}
${values.landlord_address}

Dear ${values.landlord_name},

FORMAL NOTICE OF DISREPAIR - REQUEST FOR REPAIRS

I am a tenant at the above address. I am writing to formally notify you of disrepair at the property and to request that you carry out the necessary repairs without further delay.

Details of the disrepair

${values.problems}

I first reported these issues on ${formatFieldDate(values.first_reported)}. Despite this, the problems have not been adequately resolved.
${healthSection}
Your legal obligations

Under Section 11 of the Landlord and Tenant Act 1985, you are responsible for keeping in repair and proper working order:

(a) the structure and exterior of the dwelling (including drains, gutters, and external pipes);
(b) the installations for the supply of water, gas, electricity, and sanitation;
(c) the installations for space heating and heating water.

You are also required to comply with the Homes (Fitness for Human Habitation) Act 2018, which requires that the property is fit for human habitation throughout the tenancy.

What I am asking you to do

I am requesting that you:

1. Arrange an inspection of the property within 14 days of this letter.
2. Carry out all necessary repairs within a reasonable time thereafter.
3. Confirm in writing when the repairs will be completed.

If I do not receive a satisfactory response within 14 days, I will consider my options, which may include:

- Reporting the matter to the local authority Environmental Health department
- Seeking legal advice about a claim for damages for disrepair
- Applying to the First-tier Tribunal (Property Chamber)

I reserve all my rights in this matter.

Yours sincerely,

${values.your_name}`;
  },
};

// ─── Contract: Pre-Action Letter ───

const preActionLetter: DocumentTemplate = {
  id: "pre-action-letter",
  area: "contract",
  name: "Letter Before Action",
  description:
    "A formal letter to the other party setting out your claim and giving them a chance to resolve it before court proceedings.",
  stageId: "pre-action",
  fields: [
    {
      id: "your_name",
      label: "Your full name",
      placeholder: "e.g. Priya Patel",
      type: "text",
      required: true,
    },
    {
      id: "your_address",
      label: "Your address",
      placeholder: "e.g. 8 Elm Gardens, Birmingham, B1 1AA",
      type: "text",
      required: true,
    },
    {
      id: "other_party_name",
      label: "The other party's name",
      placeholder: "e.g. XYZ Services Ltd / John Williams",
      type: "text",
      required: true,
    },
    {
      id: "other_party_address",
      label: "The other party's address",
      placeholder: "e.g. Unit 5, Industrial Estate, Birmingham, B2 2BB",
      type: "text",
      required: true,
    },
    {
      id: "contract_date",
      label: "When was the contract or agreement made?",
      placeholder: "",
      type: "date",
      required: true,
    },
    {
      id: "what_was_agreed",
      label: "What was agreed?",
      placeholder:
        "e.g. You agreed to renovate my kitchen for £8,000, to be completed by 1 March 2026.",
      type: "textarea",
      required: true,
    },
    {
      id: "what_went_wrong",
      label: "What went wrong?",
      placeholder:
        "e.g. The work was not completed by the agreed date. The work that was done is of poor quality. The cabinets are misaligned and the plumbing leaks.",
      type: "textarea",
      required: true,
    },
    {
      id: "amount_claimed",
      label: "How much are you claiming?",
      placeholder: "e.g. £3,500",
      type: "text",
      required: true,
    },
    {
      id: "losses_breakdown",
      label: "Break down your losses",
      placeholder:
        "e.g. £2,000 to rectify the poor workmanship (quote attached). £1,000 refund for work not completed. £500 for alternative accommodation while repairs are done.",
      type: "textarea",
      required: true,
    },
  ],
  generate: (values) => {
    const today = new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    return `${values.your_name}
${values.your_address}

${today}

${values.other_party_name}
${values.other_party_address}

Dear ${values.other_party_name},

LETTER BEFORE ACTION - PRE-ACTION PROTOCOL FOR DEBT CLAIMS / BREACH OF CONTRACT

I am writing in accordance with the Pre-Action Protocol for Debt Claims to set out my claim against you before commencing court proceedings.

The agreement

On or around ${formatFieldDate(values.contract_date)}, we entered into an agreement as follows:

${values.what_was_agreed}

The breach

${values.what_went_wrong}

This constitutes a breach of the express and/or implied terms of our agreement.

The claim

As a result of your breach, I have suffered the following losses:

${values.losses_breakdown}

Total claimed: ${values.amount_claimed}

What I am asking you to do

I am giving you 14 days from the date of this letter to:

1. Pay the sum of ${values.amount_claimed} in full; or
2. Propose an alternative resolution.

If I do not receive a satisfactory response within 14 days, I intend to issue court proceedings without further notice. I may also seek to recover:

- Court fees
- Interest under the County Courts Act 1984 or the Late Payment of Commercial Debts (Interest) Act 1998
- Any other costs and losses arising

I would prefer to resolve this matter without going to court, and I am open to discussing a fair settlement or mediation through the Small Claims Mediation Service.

I reserve all my rights.

Yours sincerely,

${values.your_name}`;
  },
};

function formatFieldDate(dateStr: string): string {
  if (!dateStr) return "[date]";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// ─── Employment: Without Prejudice Letter ───

const withoutPrejudiceLetter: DocumentTemplate = {
  id: "without-prejudice-letter",
  area: "employment",
  name: "Without Prejudice Letter",
  description:
    "A confidential settlement proposal to your employer. Cannot be used in tribunal if negotiations fail.",
  stageId: "acas",
  fields: [
    {
      id: "your_name",
      label: "Your full name",
      placeholder: "e.g. Sarah Johnson",
      type: "text",
      required: true,
    },
    {
      id: "your_address",
      label: "Your address",
      placeholder: "e.g. 42 Oak Road, London, SE1 2AB",
      type: "text",
      required: true,
    },
    {
      id: "employer_name",
      label: "Your employer's name",
      placeholder: "e.g. Acme Ltd",
      type: "text",
      required: true,
    },
    {
      id: "employer_address",
      label: "Employer's address (or HR address)",
      placeholder: "e.g. 1 Business Park, London, EC1 1AA",
      type: "text",
      required: true,
    },
    {
      id: "recipient_name",
      label: "Who should the letter be addressed to?",
      placeholder: "e.g. HR Department / Jane Smith, HR Director",
      type: "text",
      required: true,
    },
    {
      id: "job_title",
      label: "Your job title",
      placeholder: "e.g. Customer Service Advisor",
      type: "text",
      required: true,
    },
    {
      id: "background",
      label: "Brief background to the dispute",
      placeholder:
        "e.g. I was dismissed on 1 March 2026 without being given any reason. I had raised a grievance about discrimination on 15 February which was not investigated.",
      type: "textarea",
      required: true,
    },
    {
      id: "claims",
      label: "What claims could you bring?",
      placeholder:
        "e.g. Unfair dismissal, direct discrimination on the grounds of race, failure to follow the ACAS Code of Practice on grievances.",
      type: "textarea",
      required: true,
    },
    {
      id: "settlement_amount",
      label: "What settlement are you proposing?",
      placeholder: "e.g. £15,000",
      type: "text",
      required: true,
    },
    {
      id: "other_terms",
      label: "Any other terms you want? (optional)",
      placeholder:
        "e.g. An agreed reference, removal of any warnings from my file, a non-derogatory clause.",
      type: "textarea",
      required: false,
    },
  ],
  generate: (values) => {
    const today = new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const otherTerms = values.other_terms
      ? `\nI would also propose the following additional terms:\n\n${values.other_terms}\n`
      : "";

    return `WITHOUT PREJUDICE

${values.your_name}
${values.your_address}

${today}

${values.recipient_name}
${values.employer_name}
${values.employer_address}

Dear ${values.recipient_name},

WITHOUT PREJUDICE

I am writing on a without prejudice basis to propose a settlement of the dispute between us. This letter is not admissible in any tribunal or court proceedings should these negotiations not result in a settlement.

Background

I am employed (or was employed) as a ${values.job_title}. The background to this dispute is as follows:

${values.background}

Potential claims

I believe I have potential claims including:

${values.claims}

Settlement proposal

In full and final settlement of all claims arising from my employment and its termination, I propose a payment of ${values.settlement_amount} (gross or net to be agreed), to be paid within 14 days of a signed settlement agreement.
${otherTerms}
This proposal is open for acceptance for 14 days from the date of this letter.

I make this proposal in the genuine hope of resolving this matter without the time, cost, and stress of tribunal proceedings for either party. Should you wish to discuss this further, I am open to negotiation.

This letter is written without prejudice and in accordance with the principles in Walker v Wilsher [1889]. Nothing in this letter should be taken as an admission of any kind.

Yours sincerely,

${values.your_name}`;
  },
};

// ─── Employment: Witness Statement ───

const witnessStatement: DocumentTemplate = {
  id: "witness-statement",
  area: "employment",
  name: "Witness Statement",
  description:
    "Your written evidence for the tribunal hearing. This is the main document where you tell the tribunal what happened.",
  stageId: "hearing",
  fields: [
    {
      id: "your_name",
      label: "Your full name",
      placeholder: "e.g. Sarah Johnson",
      type: "text",
      required: true,
    },
    {
      id: "your_address",
      label: "Your address",
      placeholder: "e.g. 42 Oak Road, London, SE1 2AB",
      type: "text",
      required: true,
    },
    {
      id: "job_title",
      label: "Your job title",
      placeholder: "e.g. Customer Service Advisor",
      type: "text",
      required: true,
    },
    {
      id: "employer_name",
      label: "Your employer's name",
      placeholder: "e.g. Acme Ltd",
      type: "text",
      required: true,
    },
    {
      id: "start_date",
      label: "When did you start working there?",
      placeholder: "",
      type: "date",
      required: true,
    },
    {
      id: "events",
      label: "Describe what happened, in date order",
      placeholder:
        "Set out each key event with the date, who was involved, what was said or done, and how it affected you. Start from the beginning and work through to the most recent event. Be as specific as you can.",
      type: "textarea",
      required: true,
    },
    {
      id: "impact",
      label: "How has this affected you?",
      placeholder:
        "e.g. I lost my income, I suffered anxiety and depression, I had to claim Universal Credit, my family has been under financial strain.",
      type: "textarea",
      required: true,
    },
  ],
  generate: (values) => {
    return `IN THE EMPLOYMENT TRIBUNAL

BETWEEN:

${values.your_name.toUpperCase()}
Claimant

-and-

${values.employer_name.toUpperCase()}
Respondent

WITNESS STATEMENT OF ${values.your_name.toUpperCase()}

I, ${values.your_name}, of ${values.your_address}, say as follows:

1. I make this statement in support of my claim against ${values.employer_name}. The facts set out in this statement are within my own knowledge and are true. Where I refer to information provided by others, I identify the source and believe that information to be true.

2. I was employed by the Respondent as a ${values.job_title}, having commenced employment on ${formatFieldDate(values.start_date)}.

EVENTS

${values.events}

IMPACT

${values.impact}

STATEMENT OF TRUTH

I believe that the facts stated in this witness statement are true. I understand that proceedings for contempt of court may be brought against anyone who makes, or causes to be made, a false statement in a document verified by a statement of truth without an honest belief in its truth.

Signed: ......................................

${values.your_name}

Dated: ......................................`;
  },
};

// ─── Employment: Schedule of Loss ───

const scheduleOfLoss: DocumentTemplate = {
  id: "schedule-of-loss",
  area: "employment",
  name: "Schedule of Loss",
  description:
    "A breakdown of the compensation you are claiming. The tribunal needs this to know what you are asking for and why.",
  stageId: "claim",
  fields: [
    {
      id: "your_name",
      label: "Your full name",
      placeholder: "e.g. Sarah Johnson",
      type: "text",
      required: true,
    },
    {
      id: "employer_name",
      label: "Your employer's name",
      placeholder: "e.g. Acme Ltd",
      type: "text",
      required: true,
    },
    {
      id: "gross_salary",
      label: "Your gross annual salary (before tax)",
      placeholder: "e.g. £30,000",
      type: "text",
      required: true,
    },
    {
      id: "net_monthly",
      label: "Your net monthly pay (take-home)",
      placeholder: "e.g. £2,100",
      type: "text",
      required: true,
    },
    {
      id: "dismissal_date",
      label: "Date of dismissal or last day of employment",
      placeholder: "",
      type: "date",
      required: true,
    },
    {
      id: "notice_entitled",
      label: "How much notice were you entitled to?",
      placeholder: "e.g. 4 weeks / 1 month / 12 weeks",
      type: "text",
      required: true,
    },
    {
      id: "notice_paid",
      label: "Were you paid notice? If so, how much?",
      placeholder: "e.g. No / Yes, 1 week only / Yes, in full",
      type: "text",
      required: true,
    },
    {
      id: "benefits_lost",
      label: "What benefits have you lost? (optional)",
      placeholder:
        "e.g. Pension contributions of £200/month, private health insurance worth £50/month, company car worth £300/month.",
      type: "textarea",
      required: false,
    },
    {
      id: "new_job",
      label: "Have you found new work? If so, when and at what salary?",
      placeholder:
        "e.g. Not yet / Started new role on 1 April 2026 at £25,000 (net monthly £1,750)",
      type: "textarea",
      required: true,
    },
    {
      id: "injury_feelings",
      label: "Injury to feelings (if claiming discrimination)",
      placeholder:
        "e.g. I am claiming in the middle Vento band for sustained discrimination over 6 months. Current range: £11,200 to £33,700.",
      type: "textarea",
      required: false,
    },
    {
      id: "other_losses",
      label: "Any other losses? (optional)",
      placeholder:
        "e.g. Job search costs £150, counselling fees £480, loss of statutory rights £500.",
      type: "textarea",
      required: false,
    },
  ],
  generate: (values) => {
    const today = new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const benefits = values.benefits_lost
      ? `\n4. LOSS OF BENEFITS\n\n${values.benefits_lost}\n`
      : "";

    const injury = values.injury_feelings
      ? `\nINJURY TO FEELINGS\n\n${values.injury_feelings}\n`
      : "";

    const other = values.other_losses
      ? `\nOTHER LOSSES\n\n${values.other_losses}\n`
      : "";

    return `IN THE EMPLOYMENT TRIBUNAL

BETWEEN:

${values.your_name.toUpperCase()}
Claimant

-and-

${values.employer_name.toUpperCase()}
Respondent

SCHEDULE OF LOSS

Prepared by the Claimant
Dated: ${today}

1. BACKGROUND

The Claimant was employed by the Respondent at a gross annual salary of ${values.gross_salary} (net monthly pay: ${values.net_monthly}).

The Claimant's employment ended on ${formatFieldDate(values.dismissal_date)}.

2. NOTICE PAY

The Claimant was entitled to ${values.notice_entitled} notice.

Notice received: ${values.notice_paid}

3. LOSS OF EARNINGS

From the date of dismissal (${formatFieldDate(values.dismissal_date)}) to the date of this schedule:

Net monthly pay: ${values.net_monthly}

Mitigation: ${values.new_job}
${benefits}${injury}${other}
SUMMARY

The Claimant's losses are continuing and this schedule will be updated before the hearing with final figures.

The Claimant reserves the right to amend this schedule as further information becomes available.

Note: This schedule is a guide to help you calculate your losses. You should update the figures with exact amounts before submitting to the tribunal. Consider seeking advice on the correct Vento band for injury to feelings if applicable.`;
  },
};

export const documentTemplates: DocumentTemplate[] = [
  grievanceLetter,
  section11Notice,
  preActionLetter,
  withoutPrejudiceLetter,
  witnessStatement,
  scheduleOfLoss,
];

export function getTemplatesForArea(area: PracticeArea): DocumentTemplate[] {
  return documentTemplates.filter((t) => t.area === area);
}

export function getTemplateById(id: string): DocumentTemplate | undefined {
  return documentTemplates.find((t) => t.id === id);
}
