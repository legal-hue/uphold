import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, area, service, message } = await req.json();

    if (!name || !email || !area || !service) {
      return NextResponse.json(
        { ok: false, error: "Please complete the required fields." },
        { status: 400 }
      );
    }

    if (service === "discovery_call" && !phone) {
      return NextResponse.json(
        { ok: false, error: "Please add a phone number for the call." },
        { status: 400 }
      );
    }

    const resendKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.FEEDBACK_TO_EMAIL ?? "legal@karensafo.com";

    if (!resendKey) {
      console.warn("RESEND_API_KEY not set — expert enquiry logged only:", { name, email, area, service });
      return NextResponse.json({ ok: true });
    }

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendKey}`,
      },
      body: JSON.stringify({
        from: "Upheld Expert Enquiries <noreply@upheld.app>",
        to: [toEmail],
        reply_to: email,
        subject: `Expert enquiry: ${service} from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "Not provided"}\nPractice area: ${area}\nService requested: ${service}\n\nMessage:\n${message || "Not provided"}`,
      }),
    });

    if (!resendResponse.ok) {
      const details = await resendResponse.text();
      console.error("Resend expert enquiry error:", details);
      return NextResponse.json(
        { ok: false, error: "Could not send your enquiry. Please email legal@karensafo.com directly." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Expert enquiry error:", err);
    return NextResponse.json(
      { ok: false, error: "Could not send your enquiry. Please email legal@karensafo.com directly." },
      { status: 500 }
    );
  }
}
