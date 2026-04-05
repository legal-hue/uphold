import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

const SYSTEM_PROMPT = `You are a UK legal information tool for Upheld. You explain the legal factors that courts and tribunals typically consider in cases with given characteristics, and the options generally available to someone in that position. You provide legal information, not personal legal advice.

Your role is to generate a Legal Factors Review with four sections:
- Strengths: Legal factors and evidence that typically support cases like this
- Weaknesses: Factors that courts and tribunals commonly scrutinise in cases like this
- Opportunities: Legal provisions, tools, or processes available in cases like this
- Threats: Risks, deadlines, or obstacles that commonly arise in cases like this

Rules:
- Write in plain English, no legal jargon
- Be empathetic but honest
- Frame points as general legal principles, not personal assessments ("Employees in this position generally...", "Courts typically consider...", "In cases like this..." rather than "You have..." or "Your case is...")
- Reference specific UK legislation where relevant (e.g. Employment Rights Act 1996, Landlord and Tenant Act 1985, Consumer Rights Act 2015, Employment Rights Act 2025)
- Each point should be 1-2 sentences
- Generate 3-5 points per section
- Mention Upheld tools where relevant (Evidence Builder, Document Generator, Journey guidance)
- Always mention key deadlines (ET1 3 months minus 1 day for employment, 6 years for housing/contract)
- For employment: consider the Employment Rights Act 2025 which introduces day-one unfair dismissal rights from January 2027
- For employment: mention that costs are rarely awarded against individual claimants in employment tribunals unless a claim is found to be vexatious
- For employment: mention that 1 in 3 tribunal claimants represent themselves
- For housing: mention that Section 21 no-fault evictions have been abolished and the Deregulation Act 2015 protects tenants from retaliatory eviction when they report repairs
- For housing: mention Awaab's Law for social housing tenants (landlord must investigate within 14 days, emergency repairs within 24 hours)
- For contracts: if the claim is under £10,000, mention that the Small Claims Track generally carries no costs risk even if the claim is unsuccessful
- For creator economy disputes: mention that verbal and written digital agreements are legally binding, copyright is automatic on creation, and late payment of commercial debts attracts statutory interest

Return ONLY valid JSON in this exact format, no markdown:
{"strengths":["..."],"weaknesses":["..."],"opportunities":["..."],"threats":["..."]}`;

function buildUserPrompt(
  area: string,
  answers: Record<string, string | string[]>,
  result: string
): string {
  const answerLines = Object.entries(answers)
    .map(([key, val]) => {
      const display = Array.isArray(val) ? val.join(", ") : val;
      return `- ${key}: ${display}`;
    })
    .join("\n");

  const areaLabel =
    area === "employment"
      ? "employment / workplace dispute"
      : area === "housing"
        ? "housing disrepair"
        : "contract dispute";

  return `Explain the legal factors courts and tribunals typically consider in a ${areaLabel} case with these characteristics. The triage scored it as "${result}" (strong/maybe/difficult).

Case characteristics:
${answerLines}

Generate a Legal Factors Review explaining what courts generally consider in cases with these features, and the options typically available.`;
}

export async function POST(request: Request) {
  try {
    const { area, answers, result } = await request.json();

    if (!area || !answers) {
      return Response.json(
        { error: "Missing area or answers" },
        { status: 400 }
      );
    }

    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1500,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: buildUserPrompt(area, answers, result),
        },
      ],
    });

    const text =
      message.content[0].type === "text" ? message.content[0].text : "";

    const analysis = JSON.parse(text);

    return Response.json(analysis);
  } catch (error) {
    console.error("AI assessment error:", error);
    return Response.json(
      { error: "Failed to generate assessment" },
      { status: 500 }
    );
  }
}
