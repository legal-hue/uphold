import type { Journey } from "@/lib/types";

export const creativeJourney: Journey = {
  area: "creative",
  stages: [
    {
      id: "assess",
      number: 1,
      name: "Assess your position",
      shortName: "Assess",
      description:
        "Get clear on exactly what happened, what you're owed, and what legal protections apply to you as a creative professional.",
      guidance: [
        "You create things of value. That value deserves to be protected. The law is on your side — but you need to know what you have before you can enforce it.",
        "Start by writing down exactly what was agreed: the brief, the deliverables, the fee, the payment terms, and any deadlines. What did you deliver? What did they receive? When was payment due?",
        "As a creator, you automatically own the copyright in your work from the moment it's created — you don't need to register it. If a client wants to own it, they need an assignment in writing. Licences (permission to use) are different from ownership.",
        "For unpaid invoices, the Late Payment of Commercial Debts (Interest) Act 1998 entitles you to claim 8% above the Bank of England base rate on overdue payments from businesses — plus a fixed compensation charge of £40–£100 depending on the debt size.",
      ],
      checklist: [
        {
          id: "assess-1",
          text: "Write down what was agreed (brief, fee, deadline, deliverables)",
          helpText: "Include any verbal conversations you can remember, dates, and who said what.",
          required: true,
        },
        {
          id: "assess-2",
          text: "Gather all written agreements — contracts, emails, DMs, WhatsApp",
          helpText: "Screenshots of messages count. Even informal agreements in writing are evidence.",
          required: true,
        },
        {
          id: "assess-3",
          text: "Confirm what you delivered and when",
          helpText: "Gather files, delivery confirmations, timestamps, or any acknowledgement from the client.",
          required: true,
        },
        {
          id: "assess-4",
          text: "Calculate exactly what you're owed",
          helpText: "Include the original fee, any late payment interest (8% + BoE base rate), and fixed compensation charges.",
          required: true,
        },
        {
          id: "assess-5",
          text: "Check who owns the copyright in your work",
          helpText: "If no written assignment exists, you likely still own it — even if they've been using it.",
          required: false,
        },
      ],
      documentsAvailable: ["Invoice template", "Timeline template"],
      estimatedDuration: "1–2 hours",
      tips: [
        "Save everything in two places. Clients sometimes delete messages or block creators.",
        "If they've been using your work without paying you, document the usage now — screenshots, URLs, dates.",
        "You can claim late payment interest automatically — you don't need to have mentioned it in your original contract.",
        "If the client is a business, you have stronger statutory rights than if they're an individual.",
      ],
      resources: [
        { label: "Gov.uk: Late Payment of Commercial Debts", url: "https://www.gov.uk/late-commercial-payments-interest-debt-recovery" },
        { label: "IPSE: Rights for freelancers and the self-employed", url: "https://www.ipse.co.uk" },
        { label: "Creators' Rights Alliance", url: "https://creatorsrights.org.uk" },
      ],
      transitionMessage: "Good. You've got clarity on your position. Now let's build your evidence.",
    },
    {
      id: "evidence",
      number: 2,
      name: "Build your evidence",
      shortName: "Evidence",
      description:
        "Organise what you have. Courts and mediators decide on evidence — yours needs to be clear and complete.",
      guidance: [
        "Your evidence needs to show two things: (1) what was agreed, and (2) that you held up your end of it. If you can show both, you're in a strong position.",
        "Written evidence is strongest. Emails, contracts, signed terms and conditions, WhatsApp messages, DMs — all of these can be used. Take screenshots and back them up.",
        "Proof of delivery is critical for unpaid work claims. This could be a delivery email, a download confirmation, a signed-off file, or even just the client using your work publicly.",
        "For copyright cases, you need to show you created the work first. Timestamps on files, draft versions, original source files, metadata — all of this establishes your authorship and the timeline.",
      ],
      checklist: [
        {
          id: "evidence-1",
          text: "Collect all written communications about the project",
          helpText: "Emails, messages, contracts, briefs, feedback, invoices. Export or screenshot everything.",
          required: true,
        },
        {
          id: "evidence-2",
          text: "Secure proof that you delivered the work",
          helpText: "Email with file attached, download link sent, client acknowledgement, or evidence they used it.",
          required: true,
        },
        {
          id: "evidence-3",
          text: "Document your invoice and payment terms",
          helpText: "Keep a copy of every invoice and any acknowledgement of receipt.",
          required: true,
        },
        {
          id: "evidence-4",
          text: "For copyright claims: gather original source files with timestamps",
          helpText: "RAW files, PSD/AI/Sketch originals, drafts, version history. These prove you created the work.",
          required: false,
        },
        {
          id: "evidence-5",
          text: "Document any unauthorised use of your work",
          helpText: "Screenshots of their website, posts, print materials — with the URL and date captured.",
          required: false,
        },
      ],
      documentsAvailable: ["Evidence checklist"],
      estimatedDuration: "1–3 days",
      tips: [
        "If a client is ignoring you, check if they're still publicly using your work. Screenshot it now.",
        "Original files (RAW, PSD, etc.) are strong evidence of authorship — back them up somewhere safe.",
        "Bank statements showing no payment received are evidence too.",
        "Don't confront or threaten — just document quietly while you build your case.",
      ],
      resources: [
        { label: "UK Copyright Service: guidance for creators", url: "https://www.copyrightservice.co.uk" },
        { label: "IPO: Copyright basics", url: "https://www.gov.uk/ownership-of-copyright" },
      ],
      transitionMessage: "Your evidence is in order. Time to put them on notice with a formal letter.",
    },
    {
      id: "letter",
      number: 3,
      name: "Send a Letter Before Action",
      shortName: "Letter",
      description:
        "A formal letter giving the other party a final chance to pay or resolve things — required before court action.",
      guidance: [
        "A Letter Before Action (LBA) is a formal written notice that you intend to take legal action if the matter is not resolved. It is required by the courts — you cannot skip this step.",
        "An LBA does several things at once: it puts the other party on notice, it demonstrates to the court that you tried to resolve things, and it often works on its own. Many disputes are settled at this stage.",
        "Your letter should set out: what was agreed, what you delivered, what you're owed (including late payment interest), and a deadline to respond — usually 7–14 days. State clearly that you will proceed to court if not resolved.",
        "Send it by email and by recorded post if you have their address. Keep copies of everything.",
      ],
      checklist: [
        {
          id: "letter-1",
          text: "Draft your Letter Before Action",
          helpText: "Use the template — set out what was agreed, what you delivered, what you're owed, and the deadline to respond.",
          required: true,
        },
        {
          id: "letter-2",
          text: "Calculate the full amount claimed",
          helpText: "Original fee + late payment interest (8% above base rate) + fixed compensation (£40 for debts under £1,000; £70 for £1,000–£9,999; £100 for £10,000+).",
          required: true,
        },
        {
          id: "letter-3",
          text: "Send the letter by email with read receipt",
          helpText: "Request a read receipt. Save a copy of the sent email.",
          required: true,
        },
        {
          id: "letter-4",
          text: "Also send by recorded post if you have their address",
          helpText: "Keep the tracking confirmation and proof of delivery.",
          required: false,
        },
        {
          id: "letter-5",
          text: "Set a clear deadline and note it in your calendar",
          helpText: "7 days is standard for clear-cut cases. 14 days for anything more complex.",
          required: true,
        },
      ],
      documentsAvailable: ["Letter Before Action", "Pre-action Letter"],
      estimatedDuration: "1–3 days",
      tips: [
        "Keep the tone professional and factual — not emotional or threatening.",
        "If they respond with a dispute, acknowledge it calmly and state your position. Don't escalate.",
        "If they ignore you, that works in your favour at court — it shows you gave them every opportunity.",
        "AI can help you draft a professional version using your specific facts.",
      ],
      resources: [
        { label: "Gov.uk: Before you make a court claim", url: "https://www.gov.uk/before-you-make-a-court-claim" },
        { label: "Citizens Advice: Letter before court action", url: "https://www.citizensadvice.org.uk/law-and-courts/legal-system/small-claims/sending-a-letter-before-claim/" },
      ],
      transitionMessage: "Letter sent. If they don't respond or pay, you can proceed to Small Claims Court.",
    },
    {
      id: "court",
      number: 4,
      name: "Small Claims Court",
      shortName: "Court",
      description:
        "For disputes up to £10,000. Cheap, designed for individuals, and no lawyers required.",
      guidance: [
        "The Small Claims Court is specifically designed for disputes like yours — it's cheap, relatively fast, and you don't need a lawyer. Judges are used to hearing from individuals representing themselves.",
        "You file online at gov.uk. The fee depends on the claim amount: from £35 for claims under £300 up to £455 for claims up to £10,000. You can include the court fee in your claim — if you win, they pay it.",
        "Once you file, the court sends the claim form to the defendant. They have 14 days to acknowledge it and 28 days to file a defence. If they don't respond, you can apply for a default judgment.",
        "If the case goes to a hearing, it will usually be a short, informal appointment. You present your evidence, they present theirs, and the judge decides. Come prepared with a clear, organised file of documents.",
        "Winning a judgment is one thing — enforcing it is another. If they still don't pay after judgment, you can apply for an attachment of earnings, a charging order on property, or a High Court Enforcement Officer. This is straightforward but takes time.",
      ],
      checklist: [
        {
          id: "court-1",
          text: "File your claim on Money Claim Online (MCOL) or Paper N1",
          helpText: "For claims up to £10,000 use MCOL at gov.uk/make-court-claim-for-money. For higher value, use the paper N1 form.",
          required: true,
        },
        {
          id: "court-2",
          text: "Prepare your Particulars of Claim",
          helpText: "A short statement setting out what was agreed, what happened, and what you're claiming. Keep it factual and concise.",
          required: true,
        },
        {
          id: "court-3",
          text: "Organise your evidence bundle",
          helpText: "All documents paginated and indexed. The court and the other party each need a copy.",
          required: true,
        },
        {
          id: "court-4",
          text: "Attend or prepare for the hearing",
          helpText: "Dress smartly. Arrive early. Bring water and your own document bundle. Address the judge as 'Your Honour' or 'Judge'.",
          required: false,
        },
        {
          id: "court-5",
          text: "If you win, monitor payment within the judgment deadline",
          helpText: "Usually 14 days. If they don't pay, apply for enforcement immediately.",
          required: false,
        },
      ],
      documentsAvailable: ["Particulars of Claim", "Schedule of Loss"],
      estimatedDuration: "4–12 weeks",
      tips: [
        "You can claim the court fee, travel costs, and any loss of earnings in your claim.",
        "A default judgment (when they don't respond) is quick and you can immediately seek enforcement.",
        "If the dispute is over copyright rather than money, the Intellectual Property Enterprise Court (IPEC) is the right forum — it handles IP claims up to £500,000.",
        "For amounts under £600, consider the Free Debt Recovery service from some local councils.",
      ],
      resources: [
        { label: "Gov.uk: Make a court claim for money", url: "https://www.gov.uk/make-court-claim-for-money" },
        { label: "Money Claim Online (MCOL)", url: "https://www.moneyclaim.gov.uk" },
        { label: "IPEC: Copyright and IP claims", url: "https://www.gov.uk/guidance/intellectual-property-enterprise-court-ipec" },
        { label: "Citizens Advice: Small claims", url: "https://www.citizensadvice.org.uk/law-and-courts/legal-system/small-claims/" },
      ],
      transitionMessage: "Whether you settle or win at court — your rights have been upheld.",
    },
  ],
};
