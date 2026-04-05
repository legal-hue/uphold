import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { rating, text, trigger } = await req.json();

    const resendKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.FEEDBACK_TO_EMAIL ?? "karenbarnieh@gmail.com";

    if (!resendKey) {
      console.warn("RESEND_API_KEY not set — feedback logged only:", { rating, text, trigger });
      return NextResponse.json({ ok: true });
    }

    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendKey}`,
      },
      body: JSON.stringify({
        from: "Upheld Feedback <noreply@upheld.app>",
        to: [toEmail],
        subject: `Upheld feedback — ${rating} star${rating !== 1 ? "s" : ""}`,
        text: `Rating: ${rating}/5\nTrigger: ${trigger ?? "unknown"}\n\nFeedback:\n${text ?? "(no message)"}`,
      }),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Feedback error:", err);
    return NextResponse.json({ ok: true });
  }
}
