import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

const SYSTEM_PROMPT = `You are a UK legal case analyst for Upheld, a legal guidance app. You provide clear, empathetic, non-jargon analysis of people's legal situations based on their triage quiz answers.

Your role is to generate a Case Assessment with four sections:
- Strengths: What strengthens their position
- Weaknesses: What needs attention or could be improved
- Opportunities: Actions, tools, or legal provisions they can use
- Threats: Risks, deadlines, or obstacles to be aware of

Rules:
- Write in plain English, no legal jargon
- Be empathetic but honest — don't sugarcoat weaknesses
- Reference specific UK legislation where relevant (e.g. Employment Rights Act 1996, Landlord and Tenant Act 1985, Consumer Rights Act 2015, Employment Rights Act 2025)
- Each point should be 1-2 sentences, specific to their situation
- Generate 3-5 points per section
- Mention Upheld tools where relevant (Evidence Builder, Document Generator, Journey guidance)
- Always mention key deadlines (ET1 3 months minus 1 day for employment, 6 years for housing/contract)
- For employment: consider the Employment Rights Act 2025 which introduces day-one unfair dismissal rights from January 2027
- For employment: ALWAYS mention that costs are almost never awarded against individual claimants in employment tribunals. The person will not have to pay the employer's legal costs unless the claim is vexatious.
- For employment: mention that 1 in 3 tribunal claimants represent themselves successfully
- For housing: ALWAYS mention that Section 21 no-fault evictions have been abolished and tenants are protected from retaliatory eviction under the Deregulation Act 2015. The landlord CANNOT evict them for complaining about repairs.
- For housing: mention Awaab's Law for social housing tenants (landlord must investigate within 14 days, emergency repairs within 24 hours)
- For contracts: if the claim is under £10,000, ALWAYS mention that Small Claims Court has no costs risk — even if they lose, they won't pay the other side's legal costs
- For creator economy disputes: mention that verbal/DM agreements are legally binding, copyright is automatic, and late payment of commercial debts attracts statutory interest

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

  return `Analyse this ${areaLabel} case. The triage scored it as "${result}" (strong/maybe/difficult).

Quiz answers:
${answerLines}

Generate a personalised Case Assessment for this person's specific situation.`;
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
