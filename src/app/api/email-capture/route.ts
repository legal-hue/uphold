import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, area } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const apiKey = process.env.MAILCHIMP_API_KEY;
    const listId = process.env.MAILCHIMP_LIST_ID;
    const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX; // e.g. "us1"

    if (!apiKey || !listId || !serverPrefix) {
      // Silently succeed in dev if keys aren't set yet
      console.warn("Mailchimp env vars not set — skipping subscriber add");
      return NextResponse.json({ ok: true });
    }

    const response = await fetch(
      `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${listId}/members`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString("base64")}`,
        },
        body: JSON.stringify({
          email_address: email,
          status: "subscribed",
          tags: [area ?? "general"],
          merge_fields: {
            SOURCE: "upheld-triage",
          },
        }),
      }
    );

    // 400 with "Member Exists" is fine — they're already subscribed
    if (!response.ok) {
      const body = await response.json();
      if (body.title !== "Member Exists") {
        console.error("Mailchimp error:", body);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Email capture error:", err);
    // Never block the user — return ok regardless
    return NextResponse.json({ ok: true });
  }
}
