import type { Journey } from "@/lib/types";

export const housingJourney: Journey = {
  area: "housing",
  stages: [
    {
      id: "report",
      number: 1,
      name: "Report the problem",
      shortName: "Report",
      description:
        "Notify your landlord in writing. This is the essential first step — they can only be held responsible once they know about the problem.",
      guidance: [
        "Your landlord is legally responsible for repairs to the structure and exterior of your home, heating and hot water systems, and plumbing. But they can only be held responsible once they know about the problem.",
        "The most important thing you can do right now is report the problem in writing. An email or letter creates a dated record that you told them. A phone call is harder to prove.",
        "Be specific about what's wrong, where it is, and when it started. Take photos and videos before, during, and after you report it.",
        "Under Awaab's Law (for social housing), your landlord must investigate within 14 days and start emergency repairs within 24 hours if there's a serious risk to health.",
      ],
      checklist: [
        {
          id: "report-1",
          text: "Write a letter or email to your landlord describing the problem",
          helpText:
            "Include what's wrong, which rooms are affected, when it started, and how it's affecting you.",
          required: true,
        },
        {
          id: "report-2",
          text: "Take photos and videos of the disrepair",
          helpText:
            "Photograph every affected area. Include wide shots and close-ups. Date-stamp if possible.",
          required: true,
        },
        {
          id: "report-3",
          text: "Keep a copy of your report and note the date you sent it",
          helpText:
            "Email yourself a copy. If you posted it, take a photo before sending.",
          required: true,
        },
        {
          id: "report-4",
          text: "Set a reminder for 14 days to check if they've responded",
          helpText:
            "If they haven't responded in 14 days, you'll move to the next stage.",
          required: false,
        },
      ],
      documentsAvailable: ["Repair Request Letter"],
      estimatedDuration: "1-2 hours",
      tips: [
        "Always report in writing — emails are best because they're automatically dated.",
        "If you've already reported verbally, follow up in writing saying 'as discussed on [date]...'",
        "Keep taking photos regularly — it shows the problem is ongoing or getting worse.",
        "Don't stop paying rent because of disrepair — it can be used against you.",
      ],
    },
    {
      id: "evidence",
      number: 2,
      name: "Build your evidence",
      shortName: "Evidence",
      description:
        "Document everything. Photos, medical records, correspondence — the more evidence you have, the stronger your position.",
      guidance: [
        "Evidence is what turns a complaint into a case. Your landlord may dispute what you say, but they can't argue with dated photos, medical records, and written correspondence.",
        "The key types of evidence for housing disrepair are: photos and videos of the conditions, your correspondence with the landlord, any inspection reports, medical evidence if your health has been affected, and a log of how long the problems have persisted.",
        "If the disrepair is affecting your health, see your GP and ask them to record that your living conditions are contributing to your symptoms. This is powerful evidence.",
        "Consider asking your local council's Environmental Health department to inspect the property. Their report carries significant weight.",
      ],
      checklist: [
        {
          id: "evidence-1",
          text: "Take dated photos and videos of all affected areas",
          helpText:
            "Do this regularly — weekly if the problem is ongoing. Show the progression.",
          required: true,
        },
        {
          id: "evidence-2",
          text: "Save all correspondence with your landlord",
          helpText:
            "Emails, letters, text messages, portal messages — save everything.",
          required: true,
        },
        {
          id: "evidence-3",
          text: "See your GP if your health is being affected",
          helpText:
            "Ask them to note that your housing conditions may be contributing to your symptoms.",
          required: false,
        },
        {
          id: "evidence-4",
          text: "Request an Environmental Health inspection from your council",
          helpText:
            "Call your local council and ask for the Environmental Health team. The inspection is free.",
          required: false,
        },
        {
          id: "evidence-5",
          text: "Keep a diary of how the problem affects your daily life",
          helpText:
            "Note specific incidents: couldn't use the bedroom, children had to sleep in the living room, etc.",
          required: false,
        },
      ],
      documentsAvailable: ["Evidence checklist"],
      estimatedDuration: "1-4 weeks",
      tips: [
        "Date everything. A photo without a date is much weaker as evidence.",
        "If you have children, document how the conditions affect them specifically — this strengthens your case significantly.",
        "Your landlord cannot blame you for damp and mould — the government has been clear on this.",
        "An Environmental Health inspection report is one of the strongest pieces of evidence you can have.",
      ],
    },
    {
      id: "escalate",
      number: 3,
      name: "Escalate to your council",
      shortName: "Council",
      description:
        "If your landlord hasn't acted, involve your local authority. Environmental Health can inspect and take enforcement action.",
      guidance: [
        "If your landlord hasn't responded to your written report within a reasonable time (usually 14-28 days), it's time to escalate.",
        "Contact your local council's Environmental Health department. They have the power to inspect your property, serve improvement notices on your landlord, and in serious cases, take emergency action.",
        "Under the Housing Health and Safety Rating System (HHSRS), Environmental Health officers assess hazards in your home and can require your landlord to fix them.",
        "If you're a social housing tenant, you can also complain to the Housing Ombudsman. They have the power to order your landlord to make repairs and pay compensation.",
      ],
      checklist: [
        {
          id: "escalate-1",
          text: "Contact your council's Environmental Health team",
          helpText:
            "Search '[your council name] environmental health housing complaint' online, or call the council switchboard.",
          required: true,
        },
        {
          id: "escalate-2",
          text: "Request a property inspection",
          helpText:
            "Ask them to inspect under the Housing Health and Safety Rating System.",
          required: true,
        },
        {
          id: "escalate-3",
          text: "If social housing: complain to the Housing Ombudsman",
          helpText:
            "You must complain to your landlord first. If that doesn't work, the Ombudsman can investigate.",
          required: false,
        },
        {
          id: "escalate-4",
          text: "Follow up on your complaint within 14 days",
          helpText:
            "If you haven't heard back, chase it. Note who you spoke to and when.",
          required: false,
        },
      ],
      documentsAvailable: [],
      estimatedDuration: "2-4 weeks",
      tips: [
        "Environmental Health inspections are free — you don't need to pay for anything.",
        "Keep a record of every contact with the council including dates, names, and reference numbers.",
        "If the council issues an improvement notice, your landlord must comply. Failure to do so is a criminal offence.",
        "You can involve your local councillor or MP if the council is slow to respond.",
      ],
    },
    {
      id: "legal-letter",
      number: 4,
      name: "Send a legal letter",
      shortName: "Legal Letter",
      description:
        "A formal letter before action puts your landlord on notice that you're prepared to take legal steps if they don't fix the problem.",
      guidance: [
        "If your landlord still hasn't acted, it's time to send a formal letter before action. This is a legal letter that tells your landlord you intend to take court action if the repairs aren't done.",
        "The letter should set out what's wrong, how long it's been, what you've already done to report it, and what you want them to do. Give them a clear deadline — usually 14 days.",
        "This letter shows a court that you've been reasonable and given your landlord every opportunity to fix the problem before resorting to legal action.",
        "Many cases settle at this stage. A well-written letter before action often prompts landlords to take the issue seriously for the first time.",
      ],
      checklist: [
        {
          id: "legal-1",
          text: "Write your letter before action",
          helpText:
            "Set out the disrepair, the dates you reported it, the impact on you, and what you want done. Give 14 days to respond.",
          required: true,
        },
        {
          id: "legal-2",
          text: "Send it by recorded delivery or email (so you have proof)",
          helpText:
            "Keep the proof of postage or the sent email with read receipt.",
          required: true,
        },
        {
          id: "legal-3",
          text: "Wait for the 14-day deadline to pass",
          helpText:
            "If they respond with a plan to fix things, consider whether it's acceptable.",
          required: true,
        },
        {
          id: "legal-4",
          text: "Consider getting a solicitor's free initial assessment",
          helpText:
            "Many housing disrepair solicitors work on a no-win no-fee basis. The initial assessment is usually free.",
          required: false,
        },
      ],
      documentsAvailable: ["Repair Request Letter"],
      estimatedDuration: "2-3 weeks",
      tips: [
        "Many housing disrepair solicitors offer no-win no-fee. It's worth getting a free assessment at this stage.",
        "Keep your tone professional and factual. Emotional language weakens the letter.",
        "If your landlord offers to do the repairs at this stage, get it in writing with a specific timeline.",
        "Don't accept a 'we'll look into it' response. Push for specific dates and actions.",
      ],
    },
    {
      id: "court",
      number: 5,
      name: "Court proceedings",
      shortName: "Court",
      description:
        "If your landlord won't fix the problem, you can take them to court for an order to repair and compensation for what you've been through.",
      guidance: [
        "If your landlord hasn't resolved the problem after your letter before action, you can issue court proceedings. You'll be claiming for a mandatory order for repairs and compensation.",
        "You can bring a claim under Section 11 of the Landlord and Tenant Act 1985 (failure to repair) and/or the Homes (Fitness for Human Habitation) Act 2018.",
        "Compensation in housing disrepair cases typically includes: damages for inconvenience and loss of amenity (a percentage of your rent for the period of disrepair), damages for any health impact, and special damages for damaged belongings.",
        "Most housing disrepair claims are handled by specialist solicitors on a no-win no-fee basis. You don't usually need to fund this yourself.",
      ],
      checklist: [
        {
          id: "court-1",
          text: "Seek legal advice from a housing disrepair specialist",
          helpText:
            "Many offer free initial consultations and work on no-win no-fee.",
          required: true,
        },
        {
          id: "court-2",
          text: "Prepare your evidence bundle",
          helpText:
            "All photos, correspondence, medical evidence, inspection reports in one organised file.",
          required: true,
        },
        {
          id: "court-3",
          text: "Consider mediation if offered",
          helpText:
            "Courts expect you to try to settle. Mediation can be faster and less stressful than a hearing.",
          required: false,
        },
        {
          id: "court-4",
          text: "Issue a claim if the landlord won't settle",
          helpText:
            "Your solicitor can handle this, or you can issue a claim yourself through Money Claims Online.",
          required: false,
        },
      ],
      documentsAvailable: [],
      estimatedDuration: "2-6 months",
      tips: [
        "Most housing disrepair cases settle before reaching a full hearing.",
        "No-win no-fee solicitors are common for housing disrepair — you shouldn't need to pay upfront.",
        "Keep living in the property and paying rent during the process. Moving out can weaken your position.",
        "Document any new damage or worsening conditions as the case progresses.",
      ],
    },
    {
      id: "resolution",
      number: 6,
      name: "Resolution",
      shortName: "Resolution",
      description:
        "The repairs are done and your claim is resolved. Make sure everything is properly completed and documented.",
      guidance: [
        "Whether you settled or won at court, make sure the repairs are actually completed properly and that any compensation is paid.",
        "Inspect the repairs carefully. If they're not done to a proper standard, raise it immediately. Take photos showing the completed work.",
        "If compensation was agreed, make sure it's paid within the agreed timeframe. If it's not, you may need to enforce the judgment or settlement.",
        "Keep all documents from the case safely stored. If the problems return, you'll have a strong foundation to take action again quickly.",
      ],
      checklist: [
        {
          id: "resolution-1",
          text: "Inspect the completed repairs",
          helpText:
            "Check that everything has been fixed properly. Take photos of the completed work.",
          required: true,
        },
        {
          id: "resolution-2",
          text: "Confirm compensation has been paid (if applicable)",
          helpText:
            "Check your bank account. If not paid within the agreed time, contact your solicitor.",
          required: false,
        },
        {
          id: "resolution-3",
          text: "Store all case documents safely",
          helpText:
            "Keep everything — you may need it if problems recur.",
          required: false,
        },
        {
          id: "resolution-4",
          text: "Report any new issues promptly in writing",
          helpText:
            "If problems return, report immediately. Your history strengthens any future claim.",
          required: false,
        },
      ],
      documentsAvailable: [],
      estimatedDuration: "1-4 weeks",
      tips: [
        "Don't sign anything saying the repairs are complete until you've actually checked them.",
        "Take 'after' photos to compare with your 'before' evidence.",
        "If problems recur within a short time, it may indicate the repair was inadequate.",
        "Consider leaving a review or report to help others in similar situations.",
      ],
    },
  ],
};
