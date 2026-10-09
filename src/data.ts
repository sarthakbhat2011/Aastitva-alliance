import {
  TeamMember,
  Offering,
  ExecutiveBoardMember,
  AgendaItem,
  FAQItem,
  BlogPost,
  SummitConfig,
  CountdownTime,
} from './types';

export const INITIAL_SUMMIT_CONFIG: SummitConfig = {
  name: 'Aequitas Model United Nations Summit 2026',
  partnerSchool: 'ABC Alliance',
  date: 'October 29-30, 2026',
  targetTimestamp: new Date('2026-10-29T09:00:00+05:30').getTime(),
  venue: 'To Be Revealed Soon (Prestige Venue in Jammu)',
  address: 'Jammu, Jammu & Kashmir',
  tagline: 'Bridging Academic Diplomacy & Youth Leadership in Jammu',
  registrationOpen: true,
  totalSeats: 350,
  registeredCount: 218,
};

export const calculateCountdown = (
  targetTimestamp: number = INITIAL_SUMMIT_CONFIG.targetTimestamp
): CountdownTime => {
  const now = Date.now();
  const difference = targetTimestamp - now;

  if (difference > 0) {
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    return { days, hours, minutes, seconds };
  }
  return { days: 0, hours: 0, minutes: 0, seconds: 0 };
};

export const COMMITTEES = [
  {
    id: 'cc',
    code: 'CC',
    name: 'Citizen Council',
    agenda: 'Deliberation on the role of satirical movements, public protests and civil society campaigns in shaping democratic accountability, while balancing public order and national security.',
    description: 'Deliberation on the role of satirical movements, public protests and civil society campaigns in shaping democratic accountability, while balancing public order and national security.',
    seats: 40,
  },
  {
    id: 'unhrc',
    code: 'UNHRC',
    name: 'United Nations Human Rights Council',
    agenda: 'Addressing Restrictions on Freedom of Expression and Their Implications for the Protection of Fundamental Human Rights.',
    description: 'Deliberations on global human rights safeguards, humanitarian protection, and international treaty compliance.',
    seats: 60,
  },
  {
    id: 'brics',
    code: 'BRICS',
    name: 'BRICS Summit',
    agenda: 'Strengthening Multilateralism, Alternative Financial Architectures & Strategic Economic Cooperation in a Multipolar World.',
    description: 'High-level multilateral diplomatic summit focusing on geopolitical alignment, global economic frameworks, and cross-border cooperation.',
    seats: 55,
  },
  {
    id: 'un-women',
    code: 'UN Women',
    name: 'United Nations Entity for Gender Equality',
    agenda: 'Restrictions imposed on women in the name of safety and their impact on equal participation in public life.',
    description: 'Focused forum addressing women empowerment, legal protections, and equal participation in governance.',
    seats: 50,
  },
  {
    id: 'lok-sabha',
    code: 'Lok Sabha',
    name: 'Lok Sabha (House of the People)',
    agenda: 'Addressing Examination Paper Leaks in India and Strengthening the Integrity of Public Recruitment and Competitive Examinations.',
    description: 'Indian parliamentary floor debate simulating legislative bill drafting, party consensus, and national policy.',
    seats: 65,
  },
  {
    id: 'ipl',
    code: 'IPL',
    name: 'IPL Mega Auction',
    agenda: 'Strategic Franchise Portfolio Acquisition, Auction Mechanics & High-Stakes Player Valuation.',
    description: 'Dynamic sports management simulation testing analytical bidding, budget caps, squad synergy, and team strategy.',
    seats: 45,
  },
  {
    id: 'ipc',
    code: 'IPC',
    name: 'International Press Corps',
    agenda: 'Investigative Journalism, Press Conferences, Live Crisis Reporting & Media Ethics in Modern Geopolitics.',
    description: 'Dynamic press delegation simulating investigative reporting, press conferences, editorial drafting, and photojournalism across all committee proceedings.',
    seats: 30,
  },
];

export const TEAM_MEMBERS: TeamMember[] = [];

export const OFFERINGS: Offering[] = [
  {
    id: 'executive-board-hr',
    title: 'Executive Board & HR Allocation',
    subtitle: 'Chairs, Judges, Rapporteurs & Academic Moderation Coordination',
    description: 'Assisting host institutions in sourcing, vetting, and coordinating qualified chairs and judges to ensure structured moderation and rigorous debate.',
    details: [
      'Comprehensive Executive Board roster matching your committee topics',
      'Guidance on appointing moderators with established UN procedure familiarity',
      'Hospitality and travel coordination support for outstation board members',
      'Standardized scoring matrices and rubrics for fair delegate evaluation',
    ],
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200',
    category: 'EXECUTIVE BOARD & HUMAN RESOURCE:',
    highlights: [],
  },
  {
    id: 'venue-logistics',
    title: 'Venue & Logistics',
    subtitle: 'Space Sourcing, Audio-Visual Setup, Seating & On-Site Planning',
    description: 'Assisting host schools with venue shortlisting, room allocations, acoustic audio setup, and on-site event logistics.',
    details: [
      'Assistance with venue shortlisting, site inspection, and floor-plan layout planning',
      'Technical setup coordination: microphones, projectors, podiums, and signage',
      'Catering arrangements adhering to institutional hygiene standards',
      'On-site ushering and delegate crowd-flow coordination',
    ],
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1200',
    category: 'VENUE SOURCING & LOGISTICS:',
    highlights: ['Venue Layout Planning', 'Audio-Visual Setup', 'On-Site Logistics'],
  },
  {
    id: 'marketing-acquisition',
    title: 'Marketing & Participant Outreach',
    subtitle: 'Targeted Outreach Strategies, Digital Media & Registration Management',
    description: 'Supporting host institutions with outreach planning, structured registration workflows, informational brochures, and digital announcement assets.',
    details: [
      'Structuring student ambassador workflows and delegate outreach materials',
      'Professional digital media assets, announcement graphics, and delegate handbooks',
      'Institutional invitation templates and communication guidelines',
      'Centralized online registration form setup with automated delegate tracking',
    ],
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1200',
    category: 'MARKETING & PARTICIPANT OUTREACH:',
    highlights: ['Outreach Planning', 'Custom Registration Setup', 'Digital Design Kits'],
  },
  {
    id: 'event-day-coordination',
    title: 'Event-Day Execution & Coordination',
    subtitle: 'Floor Directorship, Session Timekeeping, ROP Flow & On-Site Logistics',
    description: 'Providing on-ground operational coordination, session timing, inter-committee liaison, and immediate logistical troubleshooting.',
    details: [
      'On-site floor directorship and session schedule management',
      'Committee documentation flow, resolution printing, and runner coordination',
      'Executive board liaison desk and delegate support desk',
      'Audio-visual troubleshooting and immediate operational escalation handling',
    ],
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1200',
    category: 'EVENT DAY EXECUTION AND COORDINATION:',
    highlights: ['Floor Directorship', 'Session Timekeeping', 'Real-Time Logistics'],
  },
  {
    id: 'network-exposure-access',
    title: 'Network & Exposure Access',
    subtitle: 'Institutional Circuit Integration, Guest Speakers & Academic Collaboration',
    description: 'Helping schools establish and grow their academic footprint by connecting events with regional student communities and debate circuits.',
    details: [
      'Inter-school invitation coordination and circuit outreach templates',
      'Assistance with inviting guest speakers, academic dignitaries, and alumni',
      'Guidance on establishing recurring annual conference traditions',
      'Post-event merit certificate templates and participant records',
    ],
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=1200',
    category: 'NETWORK AND EXPOSURE ACCESS:',
    highlights: ['Circuit Networking', 'Academic Collaboration', 'Verified Certificates'],
  },
  {
    id: 'event-day-execution',
    title: 'Multi-Format Academic Events',
    subtitle: 'Operational Frameworks for Parliamentary Debates, Expos, and Youth Conclaves',
    description: 'Beyond Model UNs—we provide operational frameworks for parliamentary debates, youth parliaments, quiz competitions, and literary conclaves.',
    details: [
      'Asian Parliamentary & British Parliamentary debate formatting guidance',
      'Quiz competitions and academic showcase coordination support',
      'Cultural festival stage management and judging criteria templates',
      'Customized rulebooks and scoring rubrics tailored to your institution',
    ],
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=1200',
    category: 'MULTI-FORMAT ACADEMIC EVENTS:',
    highlights: ['Multi-Format Support', 'Custom Rubrics', 'Turnkey Coordination'],
  },
];

export const EXECUTIVE_BOARD: ExecutiveBoardMember[] = [];

export const AGENDA_SNAPSHOT: AgendaItem[] = [
  {
    time: '08:30 AM - 09:30 AM',
    title: 'Delegate Registration & Welcome Kit Distribution',
    description: 'Check-in at main lobby, badge collection, placards, and welcome tea.',
    location: 'Grand Foyer',
    type: 'ceremony',
  },
  {
    time: '09:30 AM - 10:30 AM',
    title: 'Grand Inaugural Ceremony & Keynote Address',
    description: 'Opening remarks by School Principal, Guest Dignitaries, and Aastitva Leadership.',
    location: 'Main Auditorium',
    type: 'keynote',
  },
  {
    time: '10:45 AM - 01:15 PM',
    title: 'Committee Session I (General Speakers List)',
    description: 'Motion to open debate, agenda adoption, and initial position paper presentations.',
    location: 'Designated Committee Rooms',
    type: 'session',
  },
  {
    time: '01:15 PM - 02:15 PM',
    title: 'Networking Lunch & Informal Caucusing',
    description: 'Buffet lunch served; delegates form regional alliances and bloc strategy.',
    location: 'Banquet Hall',
    type: 'break',
  },
  {
    time: '02:15 PM - 05:00 PM',
    title: 'Committee Session II (Moderated & Unmoderated Caucuses)',
    description: 'Sub-topic debates, crisis updates introduced by Executive Board, and clause drafting.',
    location: 'Designated Committee Rooms',
    type: 'session',
  },
  {
    time: '05:00 PM - 06:00 PM',
    title: 'Resolution Presentation & Closing Awards',
    description: 'Voting on draft resolutions followed by Best Delegate and High Recommendation awards.',
    location: 'Main Auditorium',
    type: 'ceremony',
  },
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Events & Formats',
    question: 'What kind of events do you organise?',
    answer: "MUNs, literary fests, quizzes, debates, and cultural events; we're not limited to any one format.",
  },
  {
    id: 'faq-2',
    category: 'Packages & Offerings',
    question: 'Can we customise a package instead of taking the full offering?',
    answer: 'Yes, pick individual services from our range of offerings, or the full package, depending on what you need.',
  },
  {
    id: 'faq-3',
    category: 'Sponsorship',
    question: "What's the cost/process to become a sponsor?",
    answer: "Contact us directly; we'll tailor sponsorship options to your goals and the event's scale.",
  },
  {
    id: 'faq-4',
    category: 'Privacy & Data',
    question: 'How is the personal information used when they register?',
    answer: 'Only for event coordination; see our Privacy Policy for full details.',
  },
  {
    id: 'faq-5',
    category: 'Student Participation',
    question: 'Do students need prior experience to participate?',
    answer: 'No, we offer training sessions for first-timers, so no prior MUN/debate experience is required.',
  },
  {
    id: 'faq-6',
    category: 'Our Advantage',
    question: 'How are you different from a school/organisation just organising the event themselves?',
    answer: 'We bring dedicated infrastructure, vetted personnel, and prior groundwork so the client’s own staff and students can focus on the event itself, not logistics.',
  },
  {
    id: 'faq-7',
    category: 'Packages & Comparison',
    question: 'Can we compare packages before deciding?',
    answer: "Yes, reach out, and we'll walk you through what fits your event size, format, and budget.",
  },
  {
    id: 'faq-8',
    category: 'Event Duration',
    question: 'Do you support multi-day events?',
    answer: 'Yes, custom plans are available.',
  },
  {
    id: 'faq-9',
    category: 'Venue & Logistics',
    question: 'What if our school already has a venue , can we still use your other services?',
    answer: 'Yes. You can use Executive Board, Training, or Marketing independently of Venue Sourcing.',
  },
  {
    id: 'faq-10',
    category: 'Publishing & Media',
    question: 'Can we request that certain content not be published?',
    answer: "Sure, let us know your preferences, and we'll accommodate them.",
  },
  {
    id: 'faq-11',
    category: 'Leadership & Founder',
    question: 'Who is behind Aastitva Alliances?',
    answer: "Check out the  About page for the founder's background and motivation for starting the company.",
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'news-feeds-lie-mun-teaches',
    title: 'News Feeds Lie to You, MUN Teaches You to Read Between Them',
    excerpt: "Picture this. You're lying in bed at 1 AM, one eye open, battery at 4%, and a headline appears that makes your blood boil. Congratulations. You've just been recruited. Nobody told you, and you work for free.",
    date: 'October 2026',
    author: 'Aastitva Academic Team',
    readTime: '7 min read',
    category: 'Media Literacy & Critical Thinking',
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=1200',
    content: [
      "Picture this. You're lying in bed at 1 AM, one eye open, battery at 4%, and a headline appears that makes your blood boil. You feel something. Righteousness. Purpose. The urge to forward it to 14 groups, including the one with your relatives who still send \"Good Morning\" images of roses.",
      "Congratulations. You've just been recruited. Nobody told you, and you work for free. Your feed isn't lying. It's something way worse.",
      "A feed doesn't care if something is true. It cares if you'll react. And science says we make its job embarrassingly easy.",
      "This is where Model United Nations quietly fixes you. In a MUN, you're assigned a country, and you must find out what it actually wants.",
    ],
    sections: [
      {
        paragraphs: [
          "Picture this. You're lying in bed at 1 AM, one eye open, battery at 4%, and a headline appears that makes your blood boil. You feel something. Righteousness. Purpose. The urge to forward it to 14 groups, including the one with your relatives who still send \"Good Morning\" images of roses.",
          "Congratulations. You've just been recruited. Nobody told you, and you work for free.",
        ],
      },
      {
        heading: "Your feed isn't lying. It's something way worse.",
        paragraphs: [
          "A feed doesn't care if something is true. It cares if you'll react. And science says we make its job embarrassingly easy.",
          "An MIT study tracked around 126,000 stories on Twitter from 2006 to 2017. False stories were 70 percent more likely to be retweeted than true ones, and true stories took about six times as long to reach 1,500 people. So the truth is basically a guy who shows up to the party after everyone's already left, carrying a PDF.",
          "\"It must be bots,\" you'll say, because blaming bots is the most comforting thing humans do after blaming the Wi-Fi. The researchers removed the bots, and the gap stayed. It was us. We did this. The researchers' best explanation is that false stories tend to be more novel, and people love sharing novel things. Which makes sense. \"Local panchayat passes routine budget\" never started a single group fight.",
        ],
      },
      {
        heading: "This isn't just a you problem. It's a world problem.",
        paragraphs: [
          "Every year the World Economic Forum surveys experts about what might wreck the planet. In 2024, misinformation topped the list of short-term risks. In the 2026 edition it sits at #2 over the next two years, and younger respondents worried about it more than about geoeconomic confrontation. So the youth are worried. Good. That's the first time in history young people and experts agreed on something without a 40-tweet thread.",
          "Why should an employer care? Because nearly 70% of employers call analytical thinking an essential skill. Weighing a source before trusting it is analytical thinking you can actually use. It's also what separates you from the cousin who forwarded the \"NASA confirms the sun will be off for 3 days\" message.",
        ],
      },
      {
        heading: "Influencer fads: a brief history of things that were going to change your life",
        paragraphs: [
          "Nothing is more reliable than a fad. A fad is a trend with great lighting and no references.",
          "Let's meet some archetypes, none of them real, all of them familiar:",
        ],
        bullets: [
          "The 4:30 AM guy. He wakes up before the sun, journals, cold-plunges, and says \"discipline\" every 11 seconds. He is also selling a course. The cold plunge is free. The course is not.",
          "The finfluencer. He's standing next to a rented sports car, saying \"this one stock will change everything,\" and he's right. It will change his everything, specifically his commission.",
          "The wellness oracle. A miracle ingredient, a \"doctor\" who turns out to specialize in a completely different organ, and a thumbnail with a red arrow pointing at nothing. Last month's miracle is this month's \"toxic.\" You need a new miracle every quarter.",
          "The challenge. Dump water on yourself. Drink a thing. Do a dance. Some of these are harmless fun, and some end in an ER, and the algorithm cannot tell the difference.",
        ],
        callout: "Here's the awkward part. Influencers aren't evil, they're just overworked sources. A UNESCO survey of 500 creators across 45 countries found that 62% don't vet the accuracy of content before sharing it, and only 37% verify through a fact-checking site. Meanwhile, 69% believed they were promoting critical thinking and digital literacy. That's a pretty bold self-review for someone whose research process was \"my friend sent it.\" Also, only about half properly disclosed sponsors or funding. So when someone says \"I genuinely love this product,\" ask who's paying for the \"genuinely.\"",
      },
      {
        paragraphs: [
          "This matters because 21% of Americans get news from online influencers, rising to 37% among those under 30. Your news anchor now has a ring light and a discount code.",
          "The good news is that there's a one-question defense for every fad: who benefits if I believe this? If the answer is \"the person talking,\" proceed with the caution you'd use on a stranger offering you a \"special rate\" outside a railway station.",
        ],
      },
      {
        heading: "The good news: this is a skill, not a talent",
        paragraphs: [
          "Stanford researchers studied how people judge what they see online, and their lead researcher, Sam Wineburg, summarized the early results in one word: \"bleak.\" Inspiring.",
          "But the fix is cheap. It's called lateral reading, and it's what professional fact-checkers do: leave the page, open new tabs, and check what other sources say about the source. It works. Students taught with the Stanford curriculum improved by about two and a half points on a 14-point scale, versus just over half a point for those who weren't. In one course, only 3 of 87 students used lateral reading at the start. By the end, 67 did. So the skill can be learned. The problem is that nobody puts \"open a second tab\" on the syllabus.",
        ],
      },
      {
        heading: "Where MUN comes in",
        paragraphs: [
          "This is where Model United Nations quietly fixes you.",
          "In a MUN, you're assigned a country, and you must find out what it actually wants. A government's statement, a UN report, a think-tank paper, and a newspaper editorial all describe the same issue, and they will absolutely not agree. Many conferences also expect credible sources in your position paper, so \"I saw it somewhere\" stops being an answer.",
          "Then you walk into committee, and the room becomes a live fact-check:",
        ],
        bullets: [
          "Every claim is someone's position. When a delegate drops a statistic, you ask who produced it and who it helps.",
          "You get challenged in real time. Someone asks where your number came from. You find out, in front of 60 people, whether you did the reading. It's like an exam, except the invigilator is also a 17-year-old in a blazer.",
          "You defend sides you disagree with. You can't win by dismissing the other side. You have to understand why they believe it, which is the opposite of how the internet works.",
          "You see framing in action. Two blocs agree on the data and write opposite resolutions. Suddenly \"emphasis\" and \"omission\" stop being vocabulary words and start being a tactic.",
        ],
        callout: "Nobody hands you a media literacy worksheet. You just can't survive without one.",
      },
      {
        heading: "A five-minute habit",
        paragraphs: [
          "Before you share anything that makes you feel something strong:",
        ],
        numberedList: [
          "Pause. If it made you furious, that's the cue to slow down.",
          "Leave the page. Open a new tab and search the source's name, not the headline.",
          "Find the original. The report, the speech, or the data, not a screenshot of it.",
          "Check who else is covering it. If only one outlet is running a \"huge\" story, ask why.",
          "Follow the money. Is anyone selling a course, a supplement, or a \"limited seats\" webinar?",
          "Ask what's missing. Whose voice isn't in this?",
        ],
      },
      {
        paragraphs: [
          "That's the same loop a good delegate runs before every speech, except theirs ends with a \"yield the floor\" and yours ends with not embarrassing yourself in a family group.",
        ],
      },
      {
        heading: "Read between the feeds",
        paragraphs: [
          "Your timeline will keep optimizing for your attention. That won't change. What can change is whether you notice it doing that.",
          "If you want to practice somewhere the stakes are low and the thinking is real, check out the MUNs and academic events on our platform. Sign up, get a country, and start asking where everything comes from. Worst case, you leave with a certificate and a lifelong habit of saying \"source?\" at dinner, which will make you wildly unpopular and consistently correct.",
        ],
      },
    ],
    sources: [
      'Vosoughi, Roy & Aral, Science (2018), via MIT News',
      'Stanford History Education Group, Civic Online Reasoning (Sam Wineburg)',
      'UNESCO, "Behind the Screens" survey of digital content creators (2024)',
      'World Economic Forum, Global Risks Report 2026 and Future of Jobs Report 2025',
    ],
  },
  {
    id: 'how-to-put-diplomat-on-resume',
    title: 'How to Put "Diplomat" on Your Resume Without Lying',
    excerpt: "First, a confession: you are not a diplomat. You didn't represent a nation, you didn't sign a treaty, and the United Nations has no idea who you are. The real experience is strong enough.",
    date: 'October 2026',
    author: 'Aastitva Academic Team',
    readTime: '8 min read',
    category: 'Career & Resume Strategy',
    image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=1200',
    content: [
      "First, a confession: you are not a diplomat. You didn't represent a nation, you didn't sign a treaty, and the United Nations has no idea who you are. If your resume says \"Ambassador of France,\" a recruiter will have follow-up questions, and you won't enjoy them.",
      "The good news is you don't need the fake title. The real experience is strong enough. To prove it, we're going to work backwards, the way a good strategist does: start at the goal, then ask what has to be true one step earlier. We begin at the job offer and end at the committee room.",
      "Employers aren't hiring \"a Model UN person.\" They're hiring someone who can do the job, and they're checking for evidence.",
      "Every bullet, story, and skill above comes from one place: showing up, getting a country you didn't pick, and learning to argue, listen, and draft under pressure.",
    ],
    sections: [
      {
        paragraphs: [
          "First, a confession: you are not a diplomat. You didn't represent a nation, you didn't sign a treaty, and the United Nations has no idea who you are. If your resume says \"Ambassador of France,\" a recruiter will have follow-up questions, and you won't enjoy them.",
          "The good news is you don't need the fake title. The real experience is strong enough. To prove it, we're going to work backwards, the way a good strategist does: start at the goal, then ask what has to be true one step earlier. We begin at the job offer and end at the committee room.",
        ],
      },
      {
        heading: "The destination: the offer",
        paragraphs: [
          "Employers aren't hiring \"a Model UN person.\" They're hiring someone who can do the job, and they're checking for evidence. In NACE's Job Outlook 2026 survey, 70% of employers report using skills-based hiring, up from 65% the year before. Its CEO, Shawn VanDerziel, has made the point that listing skills isn't enough. Employers want examples.",
          "So the goal isn't a fancier title. It's evidence. Now let's see what produces evidence.",
        ],
      },
      {
        heading: "Step 5: The interview story",
        paragraphs: [
          "Before the offer comes the interview, and the interview runs on stories. When someone asks, \"Tell me about a time you handled a disagreement,\" you already have one.",
          "Use this structure:",
        ],
        bullets: [
          "Situation: a committee of delegates with conflicting priorities.",
          "Task: build enough agreement to pass a resolution.",
          "Action: find overlapping interests, trade concessions, rewrite a clause.",
          "Result: it passed, or it failed and you know why.",
        ],
        callout: "Don't skip the failure version. \"Here's what went wrong and what I changed\" often sounds more credible than a perfect run, because interviewers know nobody wins every committee.",
      },
      {
        paragraphs: [
          "You can also link your story to what employers say they need. The WEF's jobs data shows 61% of employers rate leadership and social influence as a core skill, and 67% say the same of resilience, flexibility, and agility. Your story is proof of both.",
          "But a story needs a trigger. Which means the interviewer has to notice MUN on your resume.",
        ],
      },
      {
        heading: "Step 4: Where it sits on the page",
        paragraphs: [
          "Placement depends on what else you have:",
        ],
        bullets: [
          "Early career, no internships yet: put it near the top under \"Leadership\" or \"Experience.\"",
          "Later on: move it to \"Leadership & Activities.\"",
          "Chair, Secretariat, or Organizing Committee roles: give them their own entry. Running a conference means budgets, logistics, vendors, and volunteer teams. That's project and event management on one line.",
        ],
      },
      {
        paragraphs: [
          "Your skills section can back this up: Negotiation, Public Speaking, Policy Research, Drafting, Stakeholder Management. Each one should have a bullet somewhere above it to prove it.",
          "But placement only helps if the bullets are worth reading.",
        ],
      },
      {
        heading: "Step 3: The bullets",
        paragraphs: [
          "NACE data on what employers look for shows problem-solving at 88.3%, written communication at 77.1%, and verbal communication at 69.3%. A strong bullet shows these with action verb + what you did + how + result.",
        ],
        callout: "Weak:\nParticipated in Model UN conference.\n\nBetter:\nRepresented xyz in committee at conference, researching xyz topic and delivering 'n' number of speeches to 'n' of delegates.\n\nBest:\nNegotiated with delegates from 'n' number of countries to build a bloc of xyz co-sponsors, then co-authored a resolution on xyz topic that passed in the committee.",
      },
      {
        paragraphs: [
          "More starters, with every bracket to be filled in with your real details:",
        ],
        bullets: [
          "\"Researched [X] policy positions and drafted a [X]-page position paper, ranked among the top submissions in committee.\"",
          "\"Persuaded [X] delegations to amend a clause by identifying shared interests, resulting in [outcome].\"",
          "\"Responded to [X] unscripted crisis updates by rewriting strategy and delivering revised speeches within minutes.\"",
          "\"Chaired a [X]-delegate committee, managing the agenda and enforcing procedure across [X] sessions.\"",
        ],
      },
      {
        paragraphs: [
          "No number? Use an honest scale (\"a 60-delegate committee\") rather than inventing one. \"Co-authored\" isn't \"wrote,\" and \"passed\" isn't \"ended global conflict.\"",
        ],
      },
      {
        heading: "The tripwires (read before you hit save)",
        bullets: [
          "Don't write \"Diplomat.\" You were a delegate in a simulation, and the simulation is the impressive part.",
          "Don't inflate awards. \"Best Delegate\" and \"Verbal Mention\" are different things.",
          "Don't oversell scale. \"Represented India at the UN\" is misleading. \"Represented India in a UNGA simulation at [conference]\" is true and still strong.",
          "Don't just list it. \"MUN, 2024\" tells a recruiter nothing.",
        ],
        callout: "But bullets need raw material. You can only write what you can translate.",
      },
      {
        heading: "Step 2: Translate the activity into a skill",
        paragraphs: [
          "Every MUN activity already maps to something employers pay for:",
        ],
        table: {
          headers: ["What you did", "What it's worth on a resume"],
          rows: [
            ["Position paper", "Research, synthesis, writing to a deadline"],
            ["Speaker's list", "Public speaking to unfamiliar audiences"],
            ["Moderated and unmoderated caucus", "Negotiation, coalition-building"],
            ["Drafting a resolution", "Collaborative writing with competing stakeholders"],
            ["Crisis directive", "Decision-making under pressure"],
            ["Defending a stance you disagree with", "Perspective-taking, persuasion"],
            ["Points of information", "Thinking on your feet"],
          ],
        },
      },
      {
        paragraphs: [
          "NACE found that over 80% of employers highlight key skills in their job descriptions. So mirror their words. If the posting says \"stakeholder management,\" that's what your caucus work was.",
          "But you can't translate what you can't remember. Which brings us to the facts.",
        ],
      },
      {
        heading: "Step 1: Collect your proof (while it's fresh)",
        paragraphs: [
          "Most students leave a MUN with a certificate and a vague memory. Write down the details before they fade:",
        ],
        bullets: [
          "The exact facts: your role, committee, conference name, and year.",
          "The numbers: how many delegates, how many speeches, how many co-sponsors.",
          "The outcome: did your resolution or clause pass? What changed?",
          "The award wording: copy it exactly from the certificate. Take a photo.",
          "The feedback: ask your chair for a line or two, or for a LinkedIn recommendation.",
        ],
        callout: "Honesty isn't just ethical. It's strategic. You want to be the candidate who can talk about it for ten minutes without the story changing.",
      },
      {
        paragraphs: [
          "But you can only collect proof from something you've actually done.",
        ],
      },
      {
        heading: "Step 0: The MUN itself",
        paragraphs: [
          "And that's the beginning, which for you is the end of this article. Every bullet, story, and skill above comes from one place: showing up, getting a country you didn't pick, and learning to argue, listen, and draft under pressure.",
          "If your \"Leadership\" section is empty right now, you know what to do. Browse the MUNs and academic events on our platform, pick one, and register. Take notes as you go. By the time you're back at Step 5, you won't have to inflate a thing.",
        ],
      },
    ],
    sources: [
      'NACE, Job Outlook 2025 and Job Outlook 2026 Spring Update',
      'World Economic Forum, Future of Jobs Report 2025',
    ],
  },
  {
    id: 'why-are-indian-muns-starting-to-feel-the-same',
    title: 'Why Are Indian MUNs Starting to Feel the Same?',
    excerpt: 'Every MUN season begins with excitement. But for delegates, something quieter has set in: familiarity. Here is why the next leap forward isn\'t bigger conferences, but stronger ecosystems.',
    date: 'October 2026',
    author: 'Ritvika Khanna',
    readTime: '5 min read',
    category: 'Ecosystem & Industry Analysis',
    image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=1200',
    content: [
      "Every MUN season begins with excitement. Committee matrices drop, promotional videos flood Instagram, and WhatsApp groups spring back to life as delegates compare Executive Boards, venues and line-ups.",
      "Then the conference happens: lively sessions, late-night lobbying, memorable speeches, and a closing ceremony of awards and photographs. A week later, feeds fill with appreciation posts and medal pictures.",
      "For organisers, that is success. For delegates, something quieter has set in. The experience has started to feel familiar.",
      "A great conference should leave every delegate with somewhere meaningful to go next.",
    ],
    sections: [
      {
        subheading: 'By Ritvika Khanna',
        paragraphs: [
          "Every MUN season begins with excitement. Committee matrices drop, promotional videos flood Instagram, and WhatsApp groups spring back to life as delegates compare Executive Boards, venues and line-ups.",
          "Then the conference happens: lively sessions, late-night lobbying, memorable speeches, and a closing ceremony of awards and photographs. A week later, feeds fill with appreciation posts and medal pictures.",
          "For organisers, that is success. For delegates, something quieter has set in. The experience has started to feel familiar.",
          "Familiarity isn't decline. Indian MUNs are arguably stronger than ever, with better-managed conferences, more experienced Executive Boards and better-prepared delegates. But that maturity has a side effect. Conferences have converged on the same formula: proven committee structures, near-identical branding, imitative social media, and a race for bigger venues, larger committees and more distinguished chief guests. These make events better organised. They rarely change what a delegate learns.",
          "So the problem isn't any single conference. It's the ecosystem around them.",
        ],
      },
      {
        heading: "What's missing is what comes after",
        paragraphs: [
          "Educational research consistently finds that learning lasts when it's reinforced through reflection, mentorship and continued engagement. A 2023 study on the \"Conference as Curriculum\" approach argues that conferences have far more impact when designed as part of an ongoing learning journey rather than as standalone events.",
          "Most Indian MUNs stop at the closing ceremony. Delegates spend weeks researching conflicts and policy, then three intense days negotiating and building relationships across the country. Then it all ends. Placards are packed away, WhatsApp groups go quiet, and months of engagement shrink to a certificate in a folder.",
          "Other spaces don't work this way. Schools build alumni networks, universities nurture research communities, and professional bodies run mentorship programmes, because growth is continuous. MUN should be no different, especially since it's far more than a public speaking contest. Research on MUN simulations links participation to stronger critical thinking, negotiation, communication, teamwork and intercultural understanding. These are competencies valued in higher education, policymaking and the workplace. The question isn't whether MUN builds valuable skills. It's why so few opportunities exist to keep using them.",
          "Imagine if every delegate joined an alumni network where policy conversations continued all year. Experienced delegates could mentor first-timers months after committees close. Collaborative research, youth consultations, internships and university partnerships could become natural next steps. Research on learning communities suggests that peer mentorship and sustained collaboration improve outcomes, because knowledge deepens through continuous interaction. A delegate still engaged long after the closing ceremony learns more than one whose experience ended with an award.",
        ],
      },
      {
        heading: "Sponsors vs. partners",
        paragraphs: [
          "Seeing conferences as long-term platforms sharpens a distinction that's often blurred. A sponsor provides resources to run an event. A partner provides opportunities that keep developing delegates after it ends.",
          "The future of MUNs won't be decided by whose logo is on the backdrop. It will be decided by what delegates gain after they leave the venue. A university partner can open academic pathways, a policy organisation can introduce research initiatives, youth networks can enable international collaboration, and think tanks can offer mentorship.",
        ],
      },
      {
        heading: "Why internationalisation matters",
        paragraphs: [
          "Inviting international participants isn't valuable because it looks prestigious. It matters because diplomacy improves when perspectives are genuinely diverse. Discussions on climate resilience, migration, AI or sustainable development get richer when participants bring experiences from different political systems and cultures. Global participation isn't decoration. It extends MUN's educational purpose.",
        ],
      },
      {
        heading: "Where this leaves us",
        paragraphs: [
          "None of this means Indian MUNs are heading the wrong way. Their professionalism and creativity deserve recognition. But the next leap may come not from bigger conferences but from stronger ecosystems. The conferences that define the next decade won't be remembered for venues, registration numbers or celebrity chief guests. They'll be remembered for the communities they build and the networks they sustain.",
          "A great conference should leave every delegate with somewhere meaningful to go next.",
        ],
      },
    ],
  },
  {
    id: 'the-skills-your-degree-wont-teach-you',
    title: "The Skills Your Degree Won't Teach You (But Every Employer Is Looking For)",
    excerpt: "Think about the last time you sat in a lecture hall. Public speaking, negotiation, and thinking on your feet aren't in most syllabi. Yet they often decide who gets the offer when two candidates have the same grades.",
    date: 'October 2026',
    author: 'Aastitva Academic Team',
    readTime: '6 min read',
    category: 'Future of Work & Employability',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200',
    content: [
      "Think about the last time you sat in a lecture hall. You probably took notes, memorized a framework, and wrote it all back on an exam paper. Now think about the last time someone asked you a question you couldn't prepare for. Those two moments rarely look alike, and the gap between them is where careers are quietly made or lost.",
      "Public speaking, negotiation, and thinking on your feet aren't in most syllabi. Yet they often decide who gets the offer when two candidates have the same grades.",
      "This is where Model United Nations (MUN) conferences quietly do a lot of heavy lifting. On the surface, a MUN is a simulation: you're handed a country, a committee, and a crisis. In practice, it's a few days of exactly the skills above, under pressure.",
      "Explore the MUNs and academic events listed on our platform. Pick one, show up, and let yourself be a little uncomfortable. The skills you leave with are the ones the syllabus left out.",
    ],
    sections: [
      {
        paragraphs: [
          "Think about the last time you sat in a lecture hall. You probably took notes, memorized a framework, and wrote it all back on an exam paper. Now think about the last time someone asked you a question you couldn't prepare for. Those two moments rarely look alike, and the gap between them is where careers are quietly made or lost.",
          "Public speaking, negotiation, and thinking on your feet aren't in most syllabi. Yet they often decide who gets the offer when two candidates have the same grades.",
        ],
      },
      {
        heading: "The skill behind all the others: adaptability",
        paragraphs: [
          "If there's one thing employers keep saying they want, it's adaptability. Industries now change faster than curricula can, and the numbers back that up. Employers worldwide expect 39% of workers' core skills to change by 2030. The same report projects that job disruption will equal 22% of jobs by 2030, with 170 million new roles created and 92 million displaced. A tool that was new when you started your degree may be outdated by graduation.",
          "Employers know which skills they need to handle that. Nearly 70% call analytical thinking essential, and 67% say the same of resilience, flexibility, and agility. That second group of skills has gained 17 percentage points in importance since the previous report.",
          "The people building the technology say the same thing. OpenAI's Sam Altman has told students that the specific subject matters less than the general skills underneath it. He names \"an ability to learn new things fast and adapt to them\" as a key attribute. He has also argued that knowing which questions to ask will become more valuable than knowing the answers.",
          "Why employers care so much about it:",
        ],
        bullets: [
          "Workplaces keep shifting. New technology and changing markets mean the playbook gets rewritten constantly. Companies need people who don't freeze when it does.",
          "Learning matters more than knowing. A fact can expire. The ability to learn, and to unlearn what's no longer true, doesn't.",
          "Setbacks are guaranteed. Plans fall apart, feedback stings, priorities flip overnight. Adaptable people absorb all of that and keep delivering.",
        ],
        callout: "You can't build this by reading about it. You build it by being put in situations where the script runs out.",
      },
      {
        heading: "The other gaps nobody warns you about",
        paragraphs: [
          "Critical thinking. Textbooks hand you tidy problems with tidy answers. Real work hands you messy ones. Anthropic's president, Daniela Amodei, has said critical thinking and learning how to interact with other people will matter more in the future, not less.",
          "Practical communication. Writing a clear email, pitching an idea, disagreeing without damaging a relationship: these are what let you influence a team rather than just sit on one. The WEF found that 61% of employers rate leadership and social influence as a core skill. Amodei says that when Anthropic hires, it looks for \"great communicators\" with strong people skills and emotional intelligence. That is a company that builds AI telling you the human skills still decide who gets hired.",
          "Digital and AI fluency. Nvidia's Jensen Huang put it bluntly at the Milken Institute conference. His point was that you won't lose your job to AI, but you may lose it \"to someone who uses AI.\" Using modern tools well, and being able to explain what you did with them, is fast becoming a baseline expectation.",
        ],
      },
      {
        heading: "Where this gets practiced",
        paragraphs: [
          "So where do students pick these up, if not in the classroom?",
          "This is where Model United Nations (MUN) conferences quietly do a lot of heavy lifting. On the surface, a MUN is a simulation: you're handed a country, a committee, and a crisis. In practice, it's a few days of exactly the skills above, under pressure.",
          "You research a topic you didn't choose and defend a position you may not personally hold. You speak in front of a room, sometimes with thirty seconds to make your point. You negotiate with delegates who want something different from you, and you find out fast that the loudest voice rarely wins. When a new crisis lands mid-session and your carefully prepared speech is suddenly useless, you learn to adapt on the spot.",
          "Charles Dickens wrote in Oliver Twist that \"sudden shifts and changes are no bad preparation for political life.\" Almost two centuries later, a MUN committee room is a fair test of that line. A crisis directive drops, alliances flip, and you have minutes to respond.",
          "AI can help you research a resolution in minutes. It can't stand up and persuade a room of strangers for you. That is the point Huang, Altman, and Amodei are all circling: the tools are getting cheaper, and the human skills are what set you apart.",
          "None of that shows up on a transcript. All of it shows up in an interview, a team meeting, or a client call.",
        ],
      },
      {
        heading: "Start building the skills now",
        paragraphs: [
          "Your degree gives you knowledge, and that matters. But knowledge is only part of what gets you hired, and the rest has to be built on purpose, through experience.",
          "Explore the MUNs and academic events listed on our platform. Pick one, show up, and let yourself be a little uncomfortable. The skills you leave with are the ones the syllabus left out.",
        ],
      },
    ],
    sources: [
      'World Economic Forum, Future of Jobs Report 2025 (the 39%, 22%, 70%, 67%, and 61% figures)',
      'Fortune/ABC News interviews with Daniela Amodei',
      'Milken Institute Global Conference 2025 (Huang)',
    ],
  },
];
