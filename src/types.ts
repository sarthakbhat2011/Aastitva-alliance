export type Page =
  | 'home'
  | 'about'
  | 'offerings'
  | 'how-it-works'
  | 'summit'
  | 'sponsors'
  | 'blog'
  | 'faq'
  | 'contact';

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  credentials: string[];
  image: string;
  school: string;
}

export interface Offering {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
  image: string;
  category: string;
  highlights: string[];
}

export interface ExecutiveBoardMember {
  id: string;
  name: string;
  role: string;
  committee: string;
  bio: string;
  image: string;
  experience: string;
}

export interface AgendaItem {
  time: string;
  title: string;
  description: string;
  location: string;
  type: 'keynote' | 'session' | 'break' | 'ceremony';
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Executive Board' | 'Training' | 'Sponsorship';
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  readTime: string;
  category: string;
  image: string;
  content: string[];
}

export interface SummitConfig {
  name: string;
  partnerSchool: string;
  date: string; // ISO date string or formatted date
  targetTimestamp: number;
  venue: string;
  address: string;
  tagline: string;
  registrationOpen: boolean;
  totalSeats: number;
  registeredCount: number;
}

export interface ContactFormData {
  schoolName: string;
  contactPerson: string;
  email: string;
  phone: string;
  eventType: string;
  preferredDate: string;
  message: string;
  captchaVerified: boolean;
}

export interface RegistrationFormData {
  fullName: string;
  email: string;
  phone: string;
  institution: string;
  grade: string;
  firstChoiceCommittee: string;
  firstChoicePortfolio: string;
  secondChoiceCommittee: string;
  secondChoicePortfolio: string;
  priorExperience: string;
}

export interface AnalyticsStats {
  pageViews: number;
  uniqueVisitors: number;
  loadTimeMs: number;
  ttiMs: number;
  sslSecure: boolean;
  renderStatus: string;
  cdmCachedRatio: string;
}

export interface PartnerMailEntry {
  id: string;
  timestamp: string;
  schoolName: string;
  contactPerson: string;
  email: string;
  phone: string;
  eventType: string;
  preferredDate?: string;
  message: string;
  status: 'New' | 'In Review' | 'Approved' | 'Contacted';
}
