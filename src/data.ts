import {
  TeamMember,
  Offering,
  ExecutiveBoardMember,
  AgendaItem,
  FAQItem,
  BlogPost,
  SummitConfig,
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

export const COMMITTEES = [
  {
    id: 'cc',
    code: 'CC',
    name: "Citizens' Council",
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
    id: 'jkla',
    code: 'JKLA',
    name: 'Jammu Kashmir Legislative Assembly',
    agenda: 'Cross-Border Drug Trafficking and Emerging Narco-Terrorism Threat in Jammu & Kashmir.',
    description: 'Vibrant state assembly debate focusing on regional development, public policy, and administrative governance.',
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
    question: 'Who is behind Aastitva Alliance?',
    answer: "Check out the  About page for the founder's background and motivation for starting the company.",
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Unlocking Jammu’s Youth Potential: Why Academic Infrastructure Matters',
    excerpt: 'How structured MUNs and debate forums are transforming public speaking confidence and critical thinking in J&K schools.',
    date: 'August 2, 2026',
    author: 'Aastitva Academic Team',
    readTime: '4 min read',
    category: 'Academic Vision',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800',
    content: [
      'For years, schools in the Jammu region held immense student talent that lacked a standardized regional event circuit. Organizing an MUN or debate festival often meant teachers and student committees were left juggling judge invitations, venue logistics, study guides, and marketing on their own.',
      'Aastitva Alliance was founded to eliminate this burden. By building professional academic event infrastructure—from pre-vetted Executive Boards to seamless venue logistics—we allow schools to focus on what matters most: student learning, diplomacy, and leadership growth.',
    ],
  },
  {
    id: 'blog-2',
    title: 'The First-Timer’s Guide to Cracking Position Papers and Speech Delivery',
    excerpt: 'Essential tips for high school debaters stepping onto the Model UN committee floor for the first time.',
    date: 'July 28, 2026',
    author: 'Aastitva Academic Team',
    readTime: '6 min read',
    category: 'Delegate Prep',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=800',
    content: [
      'A great MUN position paper isn’t just a summary of your country’s facts—it’s a strategic manifesto. Focus on identifying the root causes of the committee agenda, referencing previous UN resolutions, and proposing 3 concrete, actionable policy solutions.',
      'During your 90-second opening speech, remember the Hook-Point-Action rule: Hook the audience with a striking stat, make your policy Point clear, and finish with a call to Action for your prospective bloc partners.',
    ],
  },
  {
    id: 'blog-3',
    title: 'Behind the Scenes of Aequitas Summit 2026: Venue & Board Preparation',
    excerpt: 'An inside look at how Aastitva Alliance is crafting Jammu’s premier academic summit this October.',
    date: 'July 15, 2026',
    author: 'Aastitva Operations Team',
    readTime: '5 min read',
    category: 'Event Behind-the-Scenes',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800',
    content: [
      'Preparing for an academic conference requires thorough operational planning. From hall acoustic layouts to training rapporteurs on real-time resolution amendments, our team works diligently to ensure smooth committee proceedings.',
      'Stay tuned as we reveal committee agendas, study guides, and diplomatic guest speakers over the coming weeks!',
    ],
  },
];
