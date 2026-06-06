const RESEND_ENDPOINT = "https://api.resend.com/emails";

/**
 * Send an internal notification email to the Upheld owner (e.g. billing
 * events). Best-effort: never throws, so a notification failure can't break
 * the webhook response that Stripe is waiting on.
 */
export async function notifyOwner(subject: string, text: string): Promise<void> {
  const resendKey = process.env.RESEND_API_KEY;
  const toEmail =
    process.env.STRIPE_NOTIFY_EMAIL ??
    process.env.FEEDBACK_TO_EMAIL ??
    "legal@karensafo.com";

  if (!resendKey) {
    console.warn("RESEND_API_KEY not set — owner notification skipped:", subject);
    return;
  }

  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendKey}`,
      },
      body: JSON.stringify({
        from: "Upheld Billing <noreply@upheld.app>",
        to: [toEmail],
        subject,
        text,
      }),
    });
    if (!res.ok) {
      console.error("Owner notification email failed:", await res.text());
    }
  } catch (err) {
    console.error("Owner notification email error:", err);
  }
}
