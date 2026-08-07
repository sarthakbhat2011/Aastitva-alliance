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
  partnerSchool: 'Heritage School Jammu & DPS Jammu Alliance',
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
    id: 'executive-board',
    title: 'Executive Board & HR Allocation',
    subtitle: 'Handpicked Chairs, Co-Chairs, Rapporteurs & Judges',
    description: 'We recruit, vet, and deploy Jammu’s most accomplished chairs and judges to ensure unbiased moderation and rigorous debate.',
    details: [
      'Comprehensive Executive Board roster matching your committee topics',
      'Pre-vetted chairs with proven UN procedure expertise',
      'Subsidized hospitality and travel management for outstation board members',
      'Real-time scoring and marking matrix for fair delegate awards',
    ],
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200',
    category: 'Academic Quality',
    highlights: ['25+ Certified Board Members', 'Zero-Bias Guarantee', 'Complete ROP Compliance'],
  },
  {
    id: 'venue-sourcing',
    title: 'Venue Sourcing & Infrastructure',
    subtitle: 'Premium Auditoriums & Convention Halls in Jammu',
    description: 'Securing prestige locations equipped with acoustic sound, stage lighting, committee rooms, and delegate dining areas.',
    details: [
      'Access to partner convention centres, luxury auditoriums, and heritage venues',
      'Full technical setup: microphones, projectors, podiums, and podium banners',
      'Catering arrangements adhering to strict hygiene and dietary standards',
      'On-site ushering and security coordination',
    ],
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1200',
    category: 'Logistics',
    highlights: ['Pre-Negotiated Rates', 'Full AV & Stage Infrastructure', 'VIP Hospitality'],
  },
  {
    id: 'training-sessions',
    title: 'Delegate & Secretariat Preparation',
    subtitle: 'Pre-Event Prep, Research Guides & Strategy Workshops',
    description: 'Empowering students with hands-on training modules before the summit so first-timers step onto the floor with confidence.',
    details: [
      'Module 1: Opening Speech Crafting & Body Language',
      'Module 2: In-Depth Topic Background Research & Position Papers',
      'Module 3: Unmoderated Caucusing & Coalition Building',
      'Module 4: Draft Resolution Writing & Clause Defense',
    ],
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1200',
    category: 'Education',
    highlights: ['Interactive Simulations', 'Customized Study Guides', 'First-Timer Bootcamp'],
  },
  {
    id: 'marketing-pr',
    title: 'Marketing & Delegate Acquisition',
    subtitle: 'Filling Seats via Campus Outreach & Social PR',
    description: 'Driving participation across Jammu school networks with targeted campaigns, posters, delegate handbooks, and social media buzz.',
    details: [
      'Campus ambassador deployment across 30+ Jammu educational institutions',
      'Professional digital media assets, reels, and graphic design templates',
      'Press release distribution to regional newspapers and youth portals',
      'Centralized online registration portal with instant ticketing & invoicing',
    ],
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1200',
    category: 'Growth & Outreach',
    highlights: ['30+ School Networks', 'Custom Registration Portal', 'Local PR Distribution'],
  },
  {
    id: 'network-access',
    title: 'Exposure & Network Access',
    subtitle: 'Connecting Schools to Jammu’s Growing Academic Circuit',
    description: 'Building long-term institutional prestige by connecting your institution with regional debate federations and student leaders.',
    details: [
      'Inter-school leaderboard and invitation sharing',
      'Access to guest speakers, diplomat alumni, and academic dignitaries',
      'Inclusion in the official Jammu Inter-School Academic Circuit Calendar',
      'Post-event student showcase and merit certificate verification',
    ],
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=1200',
    category: 'Prestige',
    highlights: ['Diplomatic Network', 'Circuit Membership', 'Verified Credentials'],
  },
  {
    id: 'all-events',
    title: 'All Academic Events Infrastructure',
    subtitle: 'MUNs, Debates, Quizzes, Literary & Cultural Fests',
    description: 'Beyond MUNs—we provide end-to-end framework execution for parliamentary debates, youth parliament, science expos, and literary fests.',
    details: [
      'Asian Parliamentary & British Parliamentary debate formatting',
      'Quizmaster procurement and buzzer system infrastructure',
      'Cultural festival stage management and judging criteria',
      'Customized rulebooks and scoring rubrics tailored to your school',
    ],
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=1200',
    category: 'Full Scope',
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
    category: 'General',
    question: 'Do you only work with Model United Nations (MUNs)?',
    answer: 'No! While MUNs are our core specialty, Aastitva Alliance is a complete academic event infrastructure partner. We manage Conventional Debates, Youth Parliaments, Literary Fests, Inter-School Quizzes, Science Expos, and Cultural Symposia across Jammu.',
  },
  {
    id: 'faq-2',
    category: 'Executive Board',
    question: 'How do you choose your Executive Board members?',
    answer: 'Our board members undergo a rigorous 3-stage screening process evaluating past delegate experience, committee moderation credentials, Rules of Procedure (ROP) mastery, and conflict resolution skills to guarantee unbiased, top-tier committee management.',
  },
  {
    id: 'faq-3',
    category: 'General',
    question: 'Can we customize a package for our school’s specific budget?',
    answer: 'Absolutely. We offer modular options. Whether your school only needs Executive Board allocation & study guides, or wants full turnkey execution including venue sourcing, delegate kits, and marketing, we tailor our proposals to fit your budget.',
  },
  {
    id: 'faq-4',
    category: 'Training',
    question: 'How do training sessions work for first-time student debaters?',
    answer: 'We conduct pre-event orientation workshops (either in-person at your school campus or live online) covering opening speech delivery, resolution writing, country policy research, and parliamentary decorum so all delegates participate confidently.',
  },
  {
    id: 'faq-5',
    category: 'General',
    question: 'What is the lead time required to partner with Aastitva Alliance?',
    answer: 'Ideally, 3 to 6 weeks before your target event date. However, for express setups (e.g. Executive Board emergency deployment or last-minute venue sourcing), we can activate our infrastructure within 7-10 days.',
  },
  {
    id: 'faq-6',
    category: 'Sponsorship',
    question: 'How does Aastitva help us acquire event sponsors?',
    answer: 'We prepare corporate sponsorship proposals, connect events with local Jammu businesses and regional brands, and provide sponsor branding materials including backdrop logos, stall layouts, and social media spotlights.',
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
