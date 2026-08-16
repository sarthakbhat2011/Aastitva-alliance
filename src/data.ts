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
  date: 'October 24-25, 2026',
  targetTimestamp: new Date('2026-10-24T09:00:00+05:30').getTime(),
  venue: 'To Be Revealed Soon (Prestige Venue in Jammu)',
  address: 'Jammu, Jammu & Kashmir',
  tagline: 'Bridging Academic Diplomacy & Youth Leadership in Jammu',
  registrationOpen: true,
  totalSeats: 350,
  registeredCount: 218,
};

export const COMMITTEES = [
  {
    id: 'ccc',
    code: 'CCC',
    name: 'Continuous Crisis Committee',
    agenda: 'Deliberation on the role of satirical movements, public protests, and civil society campaigns in shaping democratic accountability while balancing public order and national security.',
    description: 'High-stakes crisis simulation requiring rapid decision-making, directive drafting, and real-time covert action response.',
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
    subtitle: 'Handpicked Chairs, Judges, Rapporteurs & Academic Moderation',
    description: 'We recruit, vet, and deploy Jammu’s most accomplished chairs and judges to ensure unbiased moderation and rigorous debate.',
    details: [
      'Comprehensive Executive Board roster matching your committee topics',
      'Pre-vetted chairs with proven UN procedure expertise',
      'Subsidized hospitality and travel management for outstation board members',
      'Real-time scoring and marking matrix for fair delegate awards',
    ],
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200',
    category: 'EXECUTIVE BOARD & HUMAN RESOURCE:',
    highlights: ['25+ Certified Board Members', 'Zero-Bias Guarantee', 'Complete ROP Compliance'],
  },
  {
    id: 'venue-logistics',
    title: 'Venue & Logistics',
    subtitle: 'Securing and Managing Space, AV, Seating, Staging & Dining',
    description: 'Securing prestige locations equipped with acoustic sound, stage lighting, committee rooms, and delegate dining areas.',
    details: [
      'Access to partner convention centres, luxury auditoriums, and heritage venues',
      'Full technical setup: microphones, projectors, podiums, and podium banners',
      'Catering arrangements adhering to strict hygiene and dietary standards',
      'On-site ushering and security coordination',
    ],
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1200',
    category: 'VENUE SOURCING & LOGISTICS:',
    highlights: ['Pre-Negotiated Rates', 'Full AV & Stage Infrastructure', 'VIP Hospitality'],
  },
  {
    id: 'marketing-acquisition',
    title: 'MARKETING & PARTICIPANT ACQUISITION',
    subtitle: 'Campus Outreach Across 30+ Schools, Social Media & Registrations',
    description: 'Driving participation across Jammu school networks with targeted campaigns, posters, delegate handbooks, and social media buzz.',
    details: [
      'Campus ambassador deployment across 30+ Jammu educational institutions',
      'Professional digital media assets, reels, and graphic design templates',
      'Press release distribution to regional newspapers and youth portals',
      'Centralized online registration portal with instant ticketing & invoicing',
    ],
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1200',
    category: 'MARKETING & PARTICIPANT ACQUISITION:',
    highlights: ['30+ School Networks', 'Custom Registration Portal', 'Local PR Distribution'],
  },
  {
    id: 'event-day-coordination',
    title: 'NETWORK & EXPOSURE ACCESS',
    subtitle: 'On-Ground Floor Execution, Timings, ROP Enforcement & Crisis Flow',
    description: 'Running the actual day-of operations, timing, coordination between teams, and handling real-time logistics.',
    details: [
      'Real-time floor directorship and session timekeeping',
      'Crisis room simulation triggering and directive printing',
      'Executive board liaison and delegate support desk',
      'Audio-visual troubleshooting and immediate escalation handling',
    ],
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1200',
    category: 'EVENT DAY EXECUTION and COORDINATION:',
    highlights: ['Live Floor Directorship', 'Crisis Trigger Management', 'Real-Time Logistics'],
  },
  {
    id: 'network-exposure-access',
    title: 'NETWORK AND EXPOSURE ACCESS',
    subtitle: 'Institutional Circuit Integration, Dignitary Network & Youth Leadership',
    description: 'Building long-term institutional prestige by connecting your institution with regional debate federations and student leaders.',
    details: [
      'Inter-school leaderboard and invitation sharing',
      'Access to guest speakers, diplomat alumni, and academic dignitaries',
      'Inclusion in the official Jammu Inter-School Academic Circuit Calendar',
      'Post-event student showcase and merit certificate verification',
    ],
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=1200',
    category: 'NETWORK AND EXPOSURE ACCESS',
    highlights: ['Diplomatic Network', 'Circuit Membership', 'Verified Credentials'],
  },
  {
    id: 'event-day-execution',
    title: 'EVENT-DAY EXECUTION',
    subtitle: 'Full End-to-End Operational Directorship for Flawless Summit Day',
    description: 'Beyond MUNs—we provide end-to-end framework execution for parliamentary debates, youth parliament, science expos, and literary fests.',
    details: [
      'Asian Parliamentary & British Parliamentary debate formatting',
      'Quizmaster procurement and buzzer system infrastructure',
      'Cultural festival stage management and judging criteria',
      'Customized rulebooks and scoring rubrics tailored to your school',
    ],
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=1200',
    category: 'EVENT-DAY EXECUTION',
    highlights: ['Turnkey Event Execution', 'Multi-Format Support', 'Custom Rubrics'],
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
      'Preparing for 350+ delegates requires precision planning. From acoustically treating committee halls to training rapporteurs on real-time resolution amendments, our team has been working around the clock with Heritage School and DPS Jammu.',
      'Stay tuned as we reveal committee agendas, study guides, and VIP diplomatic guest speakers over the coming weeks!',
    ],
  },
];
