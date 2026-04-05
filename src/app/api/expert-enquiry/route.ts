import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, area, service, message } = await req.json();

    const resendKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.FEEDBACK_TO_EMAIL ?? "legal@karensafo.com";

    if (!resendKey) {
      console.warn("RESEND_API_KEY not set — expert enquiry logged only:", { name, email, area, service });
      return NextResponse.json({ ok: true });
    }

    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendKey}`,
      },
      body: JSON.stringify({
        from: "Upheld Expert Enquiries <noreply@upheld.app>",
        to: [toEmail],
        reply_to: email,
        subject: `Expert enquiry: ${service} — ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nPractice area: ${area}\nService requested: ${service}\n\nMessage:\n${message}`,
      }),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Expert enquiry error:", err);
    return NextResponse.json({ ok: true });
  }
}
