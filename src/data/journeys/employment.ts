import type { Journey } from "@/lib/types";

export const employmentJourney: Journey = {
  area: "employment",
  stages: [
    {
      id: "assess",
      number: 1,
      name: "Assess your situation",
      shortName: "Assess",
      description:
        "Understand what happened, what your rights are, and whether you have a claim. This is where you get clarity.",
      guidance: [
        "You've already taken the first step by completing your triage assessment. Now it's time to get clear on exactly what happened and what legal protections apply to you.",
        "Think about the key events: what happened, when, who was involved, and how it affected you. Write it all down while it's fresh.",
        "Check your employment contract and staff handbook. These documents set out what your employer promised you and the procedures they should have followed.",
        "Understand your time limits. For most employment tribunal claims, you have 3 months minus 1 day from the date of the event. This is strict. Don't leave it until the last moment.",
      ],
      checklist: [
        {
          id: "assess-1",
          text: "Write down what happened in date order",
          helpText:
            "Include who said or did what, when, and any witnesses. Be as specific as possible.",
          required: true,
        },
        {
          id: "assess-2",
          text: "Check your employment contract",
          helpText:
            "Look for notice periods, disciplinary procedures, and any restrictive clauses.",
          required: true,
        },
        {
          id: "assess-3",
          text: "Read your staff handbook (if you have one)",
          helpText:
            "Check grievance procedures, disciplinary processes, and equality policies.",
          required: false,
        },
        {
          id: "assess-4",
          text: "Note your key dates and deadlines",
          helpText:
            "When did the event happen? When does your 3-month time limit expire? When did you start employment?",
          required: true,
        },
        {
          id: "assess-5",
          text: "Identify the type of claim you may have",
          helpText:
            "Unfair dismissal, discrimination, whistleblowing, unpaid wages. Your triage result will guide you.",
          required: true,
        },
      ],
      documentsAvailable: ["Timeline template", "Rights checker"],
      estimatedDuration: "1-2 hours",
      tips: [
        "Write things down as soon as possible. Memory fades quickly.",
        "Don't worry about legal language. Just describe what happened in your own words.",
        "If you're still employed, be careful about accessing documents. Don't remove originals. Take photos or copies.",
        "Keep all correspondence: emails, texts, letters. Don't delete anything.",
      ],
    },
    {
      id: "evidence",
      number: 2,
      name: "Gather your evidence",
      shortName: "Evidence",
      description:
        "Build the strongest possible record of what happened. Evidence wins cases.",
      guidance: [
        "Tribunals decide cases based on evidence, not just what you say happened. The stronger your evidence, the stronger your position.",
        "There are different types of evidence: documents (emails, letters, contracts), records (payslips, rotas, performance reviews), witness accounts, and your own detailed notes.",
        "Think about who else saw or heard what happened. Colleagues, managers, HR, anyone who can support your account. You can ask them to provide a witness statement later.",
        "If your employer has documents you need but don't have access to, don't worry. You can request disclosure during the tribunal process. For now, focus on what you can gather.",
      ],
      checklist: [
        {
          id: "evidence-1",
          text: "Collect all relevant emails and messages",
          helpText:
            "Forward work emails to a personal account if you still have access. Screenshot any relevant texts or WhatsApp messages.",
          required: true,
        },
        {
          id: "evidence-2",
          text: "Gather your employment documents",
          helpText:
            "Contract, offer letter, payslips, P45/P60, staff handbook, any written warnings or reviews.",
          required: true,
        },
        {
          id: "evidence-3",
          text: "Save copies of any grievances or complaints you've made",
          helpText:
            "Include your employer's responses. Keep the originals safe.",
          required: false,
        },
        {
          id: "evidence-4",
          text: "Make a list of potential witnesses",
          helpText:
            "Anyone who saw or heard what happened, or who you told about it at the time.",
          required: false,
        },
        {
          id: "evidence-5",
          text: "Take photos or screenshots of anything relevant",
          helpText:
            "Working conditions, text messages, internal systems, rotas, anything that supports your account.",
          required: false,
        },
        {
          id: "evidence-6",
          text: "Keep a diary of ongoing events",
          helpText:
            "If things are still happening, write down each incident with the date, time, and details.",
          required: false,
        },
      ],
      documentsAvailable: ["Evidence checklist", "Witness statement template"],
      estimatedDuration: "2-5 days",
      tips: [
        "Save everything in at least two places: your phone and your email, or a cloud folder.",
        "Don't tamper with or alter any evidence. Present things exactly as they are.",
        "Contemporaneous notes (made at or near the time) carry more weight than notes made later.",
        "If you're still employed, be discreet. Don't discuss your potential claim with colleagues unnecessarily.",
      ],
    },
    {
      id: "grievance",
      number: 3,
      name: "Raise a grievance",
      shortName: "Grievance",
      description:
        "A formal complaint to your employer. Not always required, but usually recommended before going further.",
      guidance: [
        "A grievance is a formal written complaint to your employer about how you've been treated. It puts your concerns on the record and gives your employer a chance to respond.",
        "You don't have to raise a grievance before going to tribunal, but it's usually a good idea. If you skip it without good reason, a tribunal may reduce any award by up to 25%.",
        "Your grievance should be clear, factual, and specific. Set out what happened, when, and what outcome you want. You don't need to use legal language. Just be honest and direct.",
        "Your employer should follow the ACAS Code of Practice on grievances. This means they should hold a meeting, let you bring a companion, and give you a written outcome with a right of appeal.",
      ],
      checklist: [
        {
          id: "grievance-1",
          text: "Write your grievance letter",
          helpText:
            "Set out the facts clearly: what happened, when, who was involved, and what you want your employer to do about it.",
          required: true,
        },
        {
          id: "grievance-2",
          text: "Submit it in writing to the right person",
          helpText:
            "Usually HR or your manager's manager. Check your handbook for the correct procedure.",
          required: true,
        },
        {
          id: "grievance-3",
          text: "Keep a copy of everything you send",
          helpText: "Email it to yourself or save a screenshot of the submission.",
          required: true,
        },
        {
          id: "grievance-4",
          text: "Attend the grievance meeting",
          helpText:
            "You have the right to bring a companion, a colleague or trade union rep.",
          required: false,
        },
        {
          id: "grievance-5",
          text: "Review the written outcome",
          helpText:
            "Your employer should give you a written response. If you disagree, you have the right to appeal.",
          required: false,
        },
      ],
      documentsAvailable: ["Grievance letter template"],
      estimatedDuration: "1-3 weeks",
      tips: [
        "Keep your grievance professional, even if you're angry. Stick to facts.",
        "You can raise a grievance even after you've left your job.",
        "Don't wait too long. Your tribunal deadline keeps running while the grievance process is underway.",
        "If your employer doesn't follow the ACAS Code, that can count in your favour at tribunal.",
      ],
      resources: [
        { label: "ACAS: How to raise a grievance", url: "https://www.acas.org.uk/raising-a-grievance-at-work" },
        { label: "Citizens Advice: Complaining about your employer", url: "https://www.citizensadvice.org.uk/work/problems-at-work/complaining-about-your-employer/" },
        { label: "ACAS Code of Practice on Disciplinary and Grievance Procedures", url: "https://www.acas.org.uk/acas-code-of-practice-on-disciplinary-and-grievance-procedures" },
      ],
      transitionMessage: "Your grievance is on record. The next step is to contact ACAS before you can file a tribunal claim.",
    },
    {
      id: "acas",
      number: 4,
      name: "Early conciliation (ACAS)",
      shortName: "ACAS",
      description:
        "You must contact ACAS before you can file a tribunal claim. It's free, and it might resolve things without a hearing.",
      guidance: [
        "Before you can submit a claim to the employment tribunal, you must contact ACAS for early conciliation. This is a legal requirement. You cannot skip it.",
        "Early conciliation is free. An ACAS conciliator will contact both you and your employer to see if the dispute can be settled without going to tribunal. The process usually takes up to 6 weeks, and your tribunal deadline is paused during this time.",
        "Be realistic about what ACAS does. They are a go-between, not your advocate. They pass messages between you and your employer and try to find common ground. They won't tell you whether your case is strong or give you legal advice. Don't expect them to take your side, that's not their role.",
        "Many people find ACAS frustrating. Contact can be minimal, and your conciliator may have a heavy caseload. Don't let this discourage you. The real value of ACAS is that it pauses your deadline, gives you a chance to settle, and gets you the certificate you need to proceed to tribunal.",
        "If conciliation doesn't work, ACAS will issue you an Early Conciliation Certificate. You need this reference number to file your tribunal claim. Once you receive it, you usually have at least 1 month to file.",
      ],
      checklist: [
        {
          id: "acas-1",
          text: "Submit an early conciliation notification to ACAS",
          helpText:
            "You can do this online at acas.org.uk or by calling 0300 123 1100. It's free.",
          required: true,
        },
        {
          id: "acas-2",
          text: "Speak to the ACAS conciliator when they contact you",
          helpText:
            "They'll explain the process and ask about your situation. Be honest and open.",
          required: true,
        },
        {
          id: "acas-3",
          text: "Consider any settlement offer carefully",
          helpText:
            "If your employer offers a settlement, take time to think about it. You don't have to accept.",
          required: false,
        },
        {
          id: "acas-4",
          text: "Receive your Early Conciliation Certificate",
          helpText:
            "If conciliation doesn't resolve things, ACAS will send you a certificate with a reference number.",
          required: true,
        },
        {
          id: "acas-5",
          text: "Note your new tribunal deadline",
          helpText:
            "Once you receive your certificate, you usually have at least 1 month to file your claim.",
          required: true,
        },
      ],
      documentsAvailable: ["Without Prejudice Letter"],
      estimatedDuration: "1-6 weeks",
      tips: [
        "Don't wait until the last day of your time limit to contact ACAS. Do it as soon as you're ready.",
        "You don't need a lawyer for early conciliation.",
        "Everything you say to ACAS is confidential and cannot be used at tribunal.",
        "If your employer makes a settlement offer, ask for time to consider it. Don't feel pressured to accept on the spot.",
        "If you want to propose your own settlement, use a 'without prejudice' letter. This means it can't be held against you if negotiations fail.",
      ],
      resources: [
        { label: "ACAS: Start early conciliation (free)", url: "https://www.acas.org.uk/early-conciliation" },
        { label: "GOV.UK: Employment tribunal process", url: "https://www.gov.uk/employment-tribunals" },
        { label: "Equality Advisory Support Service", url: "https://www.equalityadvisoryservice.com" },
      ],
      transitionMessage: "You have your ACAS certificate. You can now prepare and file your ET1 tribunal claim.",
    },
    {
      id: "claim",
      number: 5,
      name: "Prepare your claim",
      shortName: "Claim",
      description:
        "Fill in your ET1 form and submit it to the employment tribunal. This is where you formally set out your case.",
      guidance: [
        "The ET1 is the form you use to start a claim at the employment tribunal. You can submit it online through the government's employment tribunal service.",
        "The most important section is the 'details of claim'. This is where you explain what happened and why it was wrong. Be clear, factual, and organised. Set out events in date order.",
        "You'll also need to set out what remedy (outcome) you're seeking. This is usually compensation, but could also include reinstatement or a recommendation.",
        "Once you submit your ET1, the tribunal will send a copy to your employer, who then has 28 days to respond with an ET3 (their defence). The tribunal will also set a timetable for the case.",
      ],
      checklist: [
        {
          id: "claim-1",
          text: "Gather your ACAS Early Conciliation Certificate number",
          helpText: "You'll need this to submit your ET1 form.",
          required: true,
        },
        {
          id: "claim-2",
          text: "Write your details of claim",
          helpText:
            "Set out what happened in date order. Include who did what, when, and what rules or rights were broken.",
          required: true,
        },
        {
          id: "claim-3",
          text: "Calculate your losses (schedule of loss)",
          helpText:
            "Lost wages, benefits, pension contributions, injury to feelings. Be specific with figures.",
          required: true,
        },
        {
          id: "claim-4",
          text: "Complete the ET1 form",
          helpText:
            "Available online at employmenttribunals.service.gov.uk. Fill in all sections carefully.",
          required: true,
        },
        {
          id: "claim-5",
          text: "Submit before your deadline",
          helpText:
            "Check your deadline carefully. Late claims are almost always rejected.",
          required: true,
        },
        {
          id: "claim-6",
          text: "Save a copy of your submitted claim",
          helpText:
            "You should receive a confirmation. Save it as proof of submission.",
          required: true,
        },
      ],
      documentsAvailable: [
        "Details of claim template",
        "Schedule of Loss",
      ],
      estimatedDuration: "3-7 days",
      tips: [
        "Get your claim in well before the deadline. Technical problems on the last day won't be accepted as an excuse.",
        "You can amend your claim later, but it's better to get it right first time.",
        "If you're unsure about the legal basis of your claim, consider getting a one-off advice session from a lawyer or free legal clinic.",
        "Keep your details of claim focused. Include everything relevant, but don't pad it with opinion or emotion.",
      ],
      resources: [
        { label: "GOV.UK: Submit your ET1 claim online", url: "https://www.gov.uk/employment-tribunals/make-a-claim" },
        { label: "ACAS: Guide to tribunal claims", url: "https://www.acas.org.uk/employment-tribunal-claims" },
        { label: "Free legal clinics (Law Works)", url: "https://www.lawworks.org.uk/legal-advice-individuals" },
      ],
      transitionMessage: "Your claim has been submitted. Now prepare for the hearing.",
    },
    {
      id: "hearing",
      number: 6,
      name: "Tribunal hearing",
      shortName: "Hearing",
      description:
        "Prepare for your day in court. Know what to expect and how to present your case clearly.",
      guidance: [
        "A tribunal hearing can feel daunting, but preparation is everything. Many self-represented claimants who prepare well perform better than those with lawyers who don't. The tribunal expects people to represent themselves, 1 in 3 claimants do.",
        "Before the hearing, you'll need to prepare: a bundle of documents (all evidence both sides will refer to, paginated and indexed), your witness statement (your written evidence, the tribunal reads this instead of you telling your story from scratch), and a chronology or cast list if the judge asks for one.",
        "At the hearing, the judge will read your witness statement first. You'll be asked to confirm it's true. Then the employer's representative will cross-examine you, this means they ask questions to test your account. Stay calm. Listen carefully. If you don't understand a question, say so. If you don't remember, say 'I don't recall.' Never guess.",
        "You will also get to cross-examine the employer's witnesses. Prepare specific questions in advance. The best questions point to documents in the bundle that contradict what they're saying. Don't argue or make speeches, just ask clear questions.",
        "Costs are almost never awarded against individuals in employment tribunals. Even if you lose, you normally walk away owing nothing. The only exception is if your claim was vexatious or had no reasonable prospect of success, which is rare. Don't let fear of costs stop you.",
        "Dress smartly but comfortably. Arrive 30 minutes early. Bring water, snacks, and your own copy of the bundle. Address the judge as 'Sir' or 'Madam'. Take notes. Hearings can last a full day. The tribunal staff at the reception desk are there to help you and will show you where to go.",
      ],
      checklist: [
        {
          id: "hearing-1",
          text: "Prepare your witness statement",
          helpText:
            "A written account of your evidence, in your own words, covering everything relevant to your claim.",
          required: true,
        },
        {
          id: "hearing-2",
          text: "Agree and prepare the hearing bundle",
          helpText:
            "A paginated file of all documents both sides will refer to. Usually the respondent prepares this, but check.",
          required: true,
        },
        {
          id: "hearing-3",
          text: "Prepare questions for cross-examination",
          helpText:
            "Think about what the other side will say and prepare questions to challenge their account.",
          required: true,
        },
        {
          id: "hearing-4",
          text: "Prepare a chronology and cast list",
          helpText:
            "A simple timeline of key events and a list of who's who. Judges appreciate this.",
          required: false,
        },
        {
          id: "hearing-5",
          text: "Plan your journey to the tribunal",
          helpText:
            "Check the address, travel time, and parking. Aim to arrive 30 minutes early.",
          required: false,
        },
        {
          id: "hearing-6",
          text: "Read your witness statement the night before",
          helpText:
            "Refresh your memory. You'll be asked to confirm it's true at the start of your evidence.",
          required: true,
        },
      ],
      documentsAvailable: [
        "Witness Statement",
        "Cross-examination guide",
      ],
      estimatedDuration: "1-3 weeks preparation",
      tips: [
        "Address the judge as 'Sir' or 'Madam' (Employment Judge) or 'Members of the Tribunal'.",
        "Listen carefully to questions. If you don't understand, ask for it to be repeated.",
        "Don't argue with the judge or opposing counsel. Stay calm and professional.",
        "It's OK to say 'I don't remember' if you genuinely can't recall something. Don't guess.",
        "Take notes during the hearing. You may need to refer back to what was said.",
      ],
      resources: [
        { label: "Personal Support Unit (PSU), support at tribunal", url: "https://www.thepsu.org" },
        { label: "ACAS: Going to a tribunal hearing", url: "https://www.acas.org.uk/employment-tribunal-hearing" },
        { label: "Citizens Advice: Representing yourself at tribunal", url: "https://www.citizensadvice.org.uk/work/problems-at-work/employment-tribunals/the-tribunal-hearing/" },
      ],
      transitionMessage: "The hearing is done. Whatever happens next, you stood up for your rights.",
    },
    {
      id: "after",
      number: 7,
      name: "After the hearing",
      shortName: "After",
      description:
        "The hearing is over. Now understand the judgment, enforcement, and what comes next.",
      guidance: [
        "The tribunal may give its decision on the day (a reserved judgment), or it may take several weeks to send a written judgment. Both are normal.",
        "If you win, the judgment will set out what your employer must do, usually pay you compensation. If they don't comply, you can enforce the judgment.",
        "If you lose, you may have the right to appeal on a point of law (not just because you disagree). Appeals go to the Employment Appeal Tribunal (EAT) and must be filed within 42 days.",
        "Whatever the outcome, take time to process it. You've been through something significant. Lean on your support network and look after yourself.",
      ],
      checklist: [
        {
          id: "after-1",
          text: "Read the judgment carefully",
          helpText:
            "The tribunal will send a written judgment. Read it in full and note the key findings.",
          required: true,
        },
        {
          id: "after-2",
          text: "Check for any remedy hearing date",
          helpText:
            "Sometimes the tribunal decides liability first, then has a separate hearing on how much to award.",
          required: false,
        },
        {
          id: "after-3",
          text: "If you won: check your employer pays within 14 days",
          helpText:
            "The standard payment period is 14 days. If they don't pay, you can enforce through the county court.",
          required: false,
        },
        {
          id: "after-4",
          text: "If you lost: consider whether to appeal",
          helpText:
            "Appeals must be on a point of law, not just disagreement. The deadline is 42 days from the judgment being sent.",
          required: false,
        },
        {
          id: "after-5",
          text: "Update your records and close your file",
          helpText:
            "Keep all documents safely stored. You may need them in future.",
          required: false,
        },
      ],
      documentsAvailable: ["Enforcement guide"],
      estimatedDuration: "Varies",
      tips: [
        "Even if you lose, the process itself has value. You stood up for your rights.",
        "If your employer doesn't pay, don't chase them informally forever. Use the enforcement process. It's straightforward.",
        "Consider whether your experience could help others. Many people who go through this process go on to support others in similar situations.",
        "Look after your mental health. This has been a marathon. Give yourself credit.",
      ],
    },
  ],
};
