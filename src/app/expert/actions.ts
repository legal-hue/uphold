"use server";

export async function submitExpertEnquiry(data: {
  name: string;
  email: string;
  area: string;
  service: string;
  message: string;
}): Promise<{ ok: boolean; error?: string }> {
  try {
    const { name, email, area, service, message } = data;

    const resendKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.FEEDBACK_TO_EMAIL ?? "legal@karensafo.com";

    if (!resendKey) {
      console.warn("RESEND_API_KEY not set — expert enquiry logged only:", { name, email, area, service });
      return { ok: true };
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
        subject: `Expert enquiry: ${service} from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nPractice area: ${area}\nService requested: ${service}\n\nMessage:\n${message}`,
      }),
    });

    return { ok: true };
  } catch (err) {
    console.error("Expert enquiry error:", err);
    return { ok: false, error: "Something went wrong. Please try again or email legal@karensafo.com directly." };
  }
}
