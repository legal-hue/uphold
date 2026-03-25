import type { Journey } from "@/lib/types";

export const contractJourney: Journey = {
  area: "contract",
  stages: [
    {
      id: "assess",
      number: 1,
      name: "Assess your situation",
      shortName: "Assess",
      description:
        "Understand what was agreed, what went wrong, and whether you have a legal claim.",
      guidance: [
        "A contract is an agreement between two parties where both sides promise to do something. It doesn't have to be written down — verbal agreements can be legally binding too.",
        "To have a breach of contract claim, you generally need to show: there was a clear agreement, the other party failed to do what they promised, and you suffered a loss as a result.",
        "Gather the contract or agreement (if written), and any communications about what was agreed. Even texts, emails, and invoices can show what the deal was.",
        "The time limit for breach of contract claims is 6 years from the date of the breach under the Limitation Act 1980. But don't wait — the sooner you act, the better.",
      ],
      checklist: [
        {
          id: "assess-1",
          text: "Find and read the contract or agreement",
          helpText:
            "Look for the specific terms that have been broken. Note clause numbers if it's a written contract.",
          required: true,
        },
        {
          id: "assess-2",
          text: "Write down what was agreed and what went wrong",
          helpText:
            "Be specific. What did each side promise? What wasn't delivered? When did it go wrong?",
          required: true,
        },
        {
          id: "assess-3",
          text: "Calculate your financial losses",
          helpText:
            "What has the breach actually cost you? Include direct costs and any consequential losses.",
          required: true,
        },
        {
          id: "assess-4",
          text: "Check your time limits",
          helpText:
            "6 years from the breach for most contract claims. Check when the breach happened.",
          required: true,
        },
      ],
      documentsAvailable: [],
      estimatedDuration: "1-2 hours",
      tips: [
        "Even if there's no written contract, you may have a claim based on what was agreed verbally or implied by conduct.",
        "Screenshots, texts, and emails count as evidence of an agreement.",
        "If the contract has a dispute resolution clause, check what it says — you may need to follow a specific process.",
        "Consider whether the amount at stake justifies the time and cost of pursuing a claim.",
      ],
    },
    {
      id: "evidence",
      number: 2,
      name: "Gather your evidence",
      shortName: "Evidence",
      description:
        "Collect everything that proves what was agreed and what went wrong. Documentation is key.",
      guidance: [
        "In contract disputes, the evidence usually tells the story. Courts decide based on what can be proved, not just what's claimed.",
        "The strongest evidence is the contract itself, followed by correspondence showing what was agreed, invoices and payment records, and any expert evidence about quality of work or goods.",
        "If the other party did some of what was agreed but not all, document exactly what was and wasn't delivered. Photos of faulty work or goods are very helpful.",
        "Keep records of all your losses — receipts for replacement goods or services, costs of putting things right, and any other expenses caused by the breach.",
      ],
      checklist: [
        {
          id: "evidence-1",
          text: "Gather the contract and all amendments",
          helpText:
            "Include the original agreement, any variations, and terms and conditions.",
          required: true,
        },
        {
          id: "evidence-2",
          text: "Collect all correspondence about the agreement",
          helpText:
            "Emails, texts, letters, invoices, quotes — anything showing what was discussed and agreed.",
          required: true,
        },
        {
          id: "evidence-3",
          text: "Document your losses with receipts and records",
          helpText:
            "Keep receipts for replacement goods/services, quotes for remedial work, and records of any other costs.",
          required: true,
        },
        {
          id: "evidence-4",
          text: "Take photos of faulty work or goods (if applicable)",
          helpText:
            "Clear, dated photos showing the problems. Include before and after if you have them.",
          required: false,
        },
        {
          id: "evidence-5",
          text: "Get quotes for remedial work (if applicable)",
          helpText:
            "At least two quotes from independent professionals showing what it would cost to fix the problem.",
          required: false,
        },
      ],
      documentsAvailable: ["Evidence checklist"],
      estimatedDuration: "1-2 weeks",
      tips: [
        "Organise everything in date order — it makes your case much easier to follow.",
        "If you paid by bank transfer, your bank statements prove the payment.",
        "Independent expert quotes or reports strengthen your position significantly.",
        "Don't throw anything away, even if it seems unimportant now.",
      ],
    },
    {
      id: "contact",
      number: 3,
      name: "Contact the other party",
      shortName: "Contact",
      description:
        "Try to resolve the dispute directly before escalating. Courts expect you to make a genuine effort.",
      guidance: [
        "Before taking legal action, you should try to resolve the dispute directly with the other party. Courts expect this and may penalise you in costs if you don't.",
        "Write a clear, professional letter or email setting out: what was agreed, what went wrong, what you've lost, and what you want them to do about it. Give them a reasonable deadline to respond (14-28 days).",
        "Keep the tone businesslike. Even if you're frustrated, aggressive language weakens your position and makes settlement less likely.",
        "If they respond with a reasonable offer, consider it carefully. Settling early saves time, stress, and money — even if you don't get everything you want.",
      ],
      checklist: [
        {
          id: "contact-1",
          text: "Write a clear letter or email setting out the issue",
          helpText:
            "State what was agreed, what went wrong, your losses, and what you want. Be factual and professional.",
          required: true,
        },
        {
          id: "contact-2",
          text: "Give them a reasonable deadline to respond (14-28 days)",
          helpText:
            "Be specific: 'Please respond by [date].'",
          required: true,
        },
        {
          id: "contact-3",
          text: "Keep a record of all communication",
          helpText:
            "Save every email, letter, and note of phone calls.",
          required: true,
        },
        {
          id: "contact-4",
          text: "Consider any response or counter-offer",
          helpText:
            "Be open to compromise. A settlement is often better than a long court battle.",
          required: false,
        },
      ],
      documentsAvailable: [],
      estimatedDuration: "2-4 weeks",
      tips: [
        "Always communicate in writing — verbal conversations are hard to prove.",
        "If they make an offer, take time to think about it. Don't reject it in anger.",
        "A 'without prejudice' offer means it can't be used in court — use this label if you want to negotiate openly.",
        "If they don't respond at all, that's actually helpful — it shows a court they were uncooperative.",
      ],
    },
    {
      id: "mediation",
      number: 4,
      name: "Consider mediation",
      shortName: "Mediation",
      description:
        "An independent mediator can help you reach an agreement. It's faster, cheaper, and less stressful than court.",
      guidance: [
        "Mediation is where an independent person helps both sides find a solution. It's voluntary, confidential, and much cheaper than going to court.",
        "For claims under £10,000, the Small Claims Mediation Service is free and provided by HMCTS. For larger claims, you can use private mediators.",
        "Mediation works well when both sides want to resolve things but can't agree on terms. The mediator doesn't decide who's right — they help you find common ground.",
        "If mediation doesn't work, you haven't lost anything. The discussions are confidential and can't be used in court. You can still proceed with your claim.",
      ],
      checklist: [
        {
          id: "mediation-1",
          text: "Propose mediation to the other party",
          helpText:
            "Suggest it in writing. Courts look favourably on parties who try mediation.",
          required: true,
        },
        {
          id: "mediation-2",
          text: "Research mediation services",
          helpText:
            "Small Claims Mediation Service (free for claims under £10,000), or find a private mediator through the Civil Mediation Council.",
          required: true,
        },
        {
          id: "mediation-3",
          text: "Prepare for the mediation session",
          helpText:
            "Know what you want, what you'd accept, and what your bottom line is.",
          required: false,
        },
        {
          id: "mediation-4",
          text: "If successful: get the agreement in writing",
          helpText:
            "A mediated settlement should be written down and signed by both parties.",
          required: false,
        },
      ],
      documentsAvailable: [],
      estimatedDuration: "1-4 weeks",
      tips: [
        "Refusing mediation without good reason can result in cost penalties at court.",
        "The Small Claims Mediation Service is a one-hour phone call — it's quick and easy.",
        "Go into mediation with a realistic idea of what you'd accept.",
        "Even if mediation doesn't resolve everything, it can narrow the issues for court.",
      ],
    },
    {
      id: "pre-action",
      number: 5,
      name: "Letter before action",
      shortName: "Pre-Action",
      description:
        "A formal legal letter giving the other party a final chance to resolve the matter before you issue court proceedings.",
      guidance: [
        "A letter before action (also called a letter before claim) is a formal letter that must be sent before issuing court proceedings. It's a requirement of the Pre-Action Protocol.",
        "The letter should clearly set out: who you are, what the dispute is about, what you want, how much you're claiming, and that you will issue court proceedings if they don't respond within 14 days.",
        "The Pre-Action Protocol requires you to give the other party a reasonable opportunity to respond and to consider alternative dispute resolution before going to court.",
        "This letter often prompts a settlement. Many people don't take a dispute seriously until they receive formal legal correspondence.",
      ],
      checklist: [
        {
          id: "pre-action-1",
          text: "Write your letter before action",
          helpText:
            "Use our template as a starting point. Include the key facts, your losses, and a 14-day deadline.",
          required: true,
        },
        {
          id: "pre-action-2",
          text: "Send it by recorded delivery or tracked email",
          helpText:
            "You need proof that they received it.",
          required: true,
        },
        {
          id: "pre-action-3",
          text: "Wait 14 days for a response",
          helpText:
            "They may settle, make a counter-offer, or ignore you. Any of these outcomes informs your next step.",
          required: true,
        },
        {
          id: "pre-action-4",
          text: "Consider any settlement offer",
          helpText:
            "Weigh the offer against the time and cost of going to court.",
          required: false,
        },
      ],
      documentsAvailable: ["Letter Before Action"],
      estimatedDuration: "2-3 weeks",
      tips: [
        "A well-written letter before action settles many disputes. It's worth getting it right.",
        "Include the phrase 'in accordance with the Pre-Action Protocol' — it shows you know the process.",
        "Keep copies of the letter and proof of delivery.",
        "If they ignore your letter, that strengthens your position at court.",
      ],
    },
    {
      id: "court",
      number: 6,
      name: "Court proceedings",
      shortName: "Court",
      description:
        "If the dispute can't be resolved, you can issue a court claim. For claims under £10,000, the Small Claims Court is designed for people without lawyers.",
      guidance: [
        "If all attempts to resolve the dispute have failed, you can issue a claim through the county court. For claims under £10,000, your case will be allocated to the Small Claims Track.",
        "The Small Claims Court is designed for ordinary people — you don't need a solicitor, the procedures are simpler, and even if you lose, you usually won't have to pay the other side's legal costs.",
        "To issue a claim, you can use Money Claims Online (for claims up to £100,000) or fill in an N1 form. You'll need to pay a court fee (which you can usually recover if you win).",
        "After you issue the claim, the other party has 14 days to respond. If they don't, you can apply for judgment in default. If they do, the court will set a hearing date.",
      ],
      checklist: [
        {
          id: "court-1",
          text: "Work out the correct court fee",
          helpText:
            "Fees depend on the claim amount. Check gov.uk for current fees. You may be eligible for a fee remission.",
          required: true,
        },
        {
          id: "court-2",
          text: "Issue your claim online or using form N1",
          helpText:
            "Money Claims Online at moneyclaims.service.gov.uk is the easiest option for most people.",
          required: true,
        },
        {
          id: "court-3",
          text: "Prepare your evidence bundle for the hearing",
          helpText:
            "Organise all documents in date order, paginated, with an index. The court and the other party each need a copy.",
          required: true,
        },
        {
          id: "court-4",
          text: "Attend the hearing",
          helpText:
            "Small claims hearings are informal. The judge will guide the process. Be clear, honest, and organised.",
          required: true,
        },
      ],
      documentsAvailable: [],
      estimatedDuration: "2-6 months",
      tips: [
        "Court fees range from £35 (claims up to £300) to £455 (claims up to £10,000). Check if you qualify for fee remission.",
        "The Small Claims Court is less formal than you might expect. Judges are usually patient with self-represented parties.",
        "Bring three copies of everything to the hearing: one for you, one for the judge, one for the other party.",
        "If the other side doesn't respond to your claim within 14 days, apply for default judgment — you may win without a hearing.",
      ],
    },
    {
      id: "enforcement",
      number: 7,
      name: "Enforcement",
      shortName: "Enforce",
      description:
        "If you win but the other party won't pay, there are enforcement options to recover what you're owed.",
      guidance: [
        "Winning a court judgment is one thing — getting paid is another. If the other party doesn't pay within the time set by the court (usually 14 days), you can take enforcement action.",
        "The main enforcement options are: a warrant of control (bailiffs collect the money or seize goods), an attachment of earnings order (money is taken from their wages), a third-party debt order (money is taken from their bank account), or a charging order (a charge is placed on their property).",
        "Each enforcement method has a court fee, but these are usually added to what the other party owes you.",
        "If the other party genuinely can't pay, you may need to accept payment in instalments. The court can order this.",
      ],
      checklist: [
        {
          id: "enforce-1",
          text: "Wait for the payment deadline to pass",
          helpText:
            "Usually 14 days from the judgment date. Don't take enforcement action before then.",
          required: true,
        },
        {
          id: "enforce-2",
          text: "Send a final payment demand",
          helpText:
            "A short letter reminding them of the judgment and the consequences of not paying.",
          required: true,
        },
        {
          id: "enforce-3",
          text: "Choose an enforcement method",
          helpText:
            "Warrant of control is the most common first step. Your choice depends on the debtor's circumstances.",
          required: false,
        },
        {
          id: "enforce-4",
          text: "Apply to the court for enforcement",
          helpText:
            "Complete the relevant form (N323 for warrant of control, N337 for attachment of earnings, etc.).",
          required: false,
        },
      ],
      documentsAvailable: [],
      estimatedDuration: "2-8 weeks",
      tips: [
        "Consider doing a basic financial check before choosing your enforcement method.",
        "A warrant of control (bailiffs) is usually the fastest option.",
        "If the debtor is a company, check they're still trading before spending money on enforcement.",
        "You can use multiple enforcement methods if the first one doesn't work.",
      ],
    },
  ],
};
