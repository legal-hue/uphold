import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

const SYSTEM_PROMPT = `You are a UK legal document drafter for Upheld, a legal guidance app. You draft professional, clear, and legally sound correspondence for people navigating workplace, housing, or contract disputes.

Rules:
- Write in formal but accessible English
- Use proper legal formatting (headings, numbered lists, clear paragraphs)
- Reference relevant UK legislation accurately
- Be firm but not aggressive — professional and measured
- Include all the details the user has provided
- Add standard legal closing language appropriate to the document type
- Use "without prejudice" only where genuinely appropriate
- Date the letter with today's date
- Do NOT add placeholder text like [insert X] — only use the information provided
- Return ONLY the document text, no markdown code blocks or commentary`;

const TEMPLATE_CONTEXT: Record<string, string> = {
  "grievance-letter": `Draft a formal grievance letter from an employee to their employer.
The letter should:
- State it is a formal grievance under the company's grievance procedure
- Reference the ACAS Code of Practice on Disciplinary and Grievance Procedures
- Set out the facts clearly in chronological order
- State what outcome the employee is seeking
- Reserve the right to be accompanied at any grievance meeting (s.10 Employment Relations Act 1999)
- Be professional and measured in tone`,

  "section-11-notice": `Draft a formal repair request letter from a tenant to their landlord.
The letter should:
- Give formal notice of disrepair at the property
- Set out the specific problems clearly
- Reference Section 11 of the Landlord and Tenant Act 1985
- Reference the Homes (Fitness for Human Habitation) Act 2018
- Request inspection within 14 days and repairs within a reasonable time
- Mention the option of reporting to Environmental Health if not resolved
- Note the right to seek legal advice about a disrepair claim
- Include health impacts if provided`,

  "pre-action-letter": `Draft a formal letter before action for a contract/debt dispute.
The letter should:
- Follow the Pre-Action Protocol for Debt Claims format
- Set out the agreement clearly
- Describe the breach specifically
- Break down the losses claimed
- Give 14 days to respond
- Mention the intention to issue court proceedings if not resolved
- Reference potential for interest under the County Courts Act 1984 or Late Payment of Commercial Debts (Interest) Act 1998
- Mention willingness to consider mediation via the Small Claims Mediation Service`,
};

function buildUserPrompt(
  templateId: string,
  values: Record<string, string>
): string {
  const context =
    TEMPLATE_CONTEXT[templateId] || "Draft a professional legal letter.";

  const details = Object.entries(values)
    .filter(([, val]) => val && val.trim())
    .map(([key, val]) => `- ${key.replace(/_/g, " ")}: ${val}`)
    .join("\n");

  return `${context}

Details provided by the user:
${details}

Draft the complete letter now.`;
}

export async function POST(request: Request) {
  try {
    const { templateId, values } = await request.json();

    if (!templateId || !values) {
      return Response.json(
        { error: "Missing templateId or values" },
        { status: 400 }
      );
    }

    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 2000,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: buildUserPrompt(templateId, values),
        },
      ],
    });

    const text =
      message.content[0].type === "text" ? message.content[0].text : "";

    return Response.json({ document: text });
  } catch (error) {
    console.error("AI document error:", error);
    return Response.json(
      { error: "Failed to generate document" },
      { status: 500 }
    );
  }
}
