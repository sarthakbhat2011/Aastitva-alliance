export interface PromPackage {
  id: string;
  name: string;
  price: number;
  formattedPrice: string;
  badge: string;
  description: string;
}

export interface RecreationalActivity {
  id: string;
  name: string;
  category: 'unisex' | 'girls' | 'boys';
  categoryLabel: string;
  price: number;
  formattedPrice: string;
  description: string;
}

export const PROM_PACKAGES: PromPackage[] = [
  {
    id: 'stag',
    name: 'Stag Entry',
    price: 599,
    formattedPrice: '₹599',
    badge: 'Individual Pass',
    description: 'Single attendee access to the Prom Night gala, ballroom dance floor, and all prom games.',
  },
  {
    id: 'duo',
    name: 'Duo Entry',
    price: 999,
    formattedPrice: '₹999',
    badge: 'Pair Pass',
    description: 'Admit two attendees together with seamless couple / partner entry and joint event activities.',
  },
  {
    id: 'squad',
    name: 'Squad Entry',
    price: 1999,
    formattedPrice: '₹1,999',
    badge: 'Group Pass (Up to 4)',
    description: 'Full squad pass for 4 friends to celebrate together with premier table allocation and group games.',
  },
];

export const PROM_ACTIVITIES = [
  'Unseen Encounter (Leap of Faith)',
  'Truth or Dare',
  'Jar of Dreams',
  'Musical chair',
  'Egyptian wrap',
];

export const RECREATIONAL_ACTIVITIES: RecreationalActivity[] = [
  // Unisex Activities
  {
    id: 'bgmi',
    name: 'BGMI',
    category: 'unisex',
    categoryLabel: 'Unisex',
    price: 199,
    formattedPrice: '₹199',
    description: 'Competitive Battlegrounds Mobile India battle royale tournament with intense tactical combat.',
  },
  {
    id: 'freefire',
    name: 'FREE FIRE',
    category: 'unisex',
    categoryLabel: 'Unisex',
    price: 199,
    formattedPrice: '₹199',
    description: 'High-octane Free Fire survival clash testing reaction time and squad synchronization.',
  },
  {
    id: 'ludo',
    name: 'LUDO',
    category: 'unisex',
    categoryLabel: 'Unisex',
    price: 199,
    formattedPrice: '₹199',
    description: 'Fast-paced strategic board game showdown with cut-throat rolls and bracket knockout.',
  },
  {
    id: 'mafia',
    name: 'MAFIA',
    category: 'unisex',
    categoryLabel: 'Unisex',
    price: 199,
    formattedPrice: '₹199',
    description: 'Ultimate social deduction, deception, psychological bluffing, and investigative challenge.',
  },
  {
    id: 'treasure-hunt',
    name: 'TREASURE HUNT',
    category: 'unisex',
    categoryLabel: 'Unisex',
    price: 199,
    formattedPrice: '₹199',
    description: 'Cryptic riddle-solving across the venue to discover the secret conclave artifact first.',
  },
  {
    id: 'damsharaj',
    name: 'DAMSHARAJ',
    category: 'unisex',
    categoryLabel: 'Unisex',
    price: 199,
    formattedPrice: '₹199',
    description: 'Expressive charades contest requiring silent acting, high speed guessing, and cinematic knowledge.',
  },
  {
    id: 'chess',
    name: 'CHESS',
    category: 'unisex',
    categoryLabel: 'Unisex',
    price: 199,
    formattedPrice: '₹199',
    description: 'Classic blitz & rapid cerebral grandmaster tournament across opening strategies and endgames.',
  },

  // Exclusively for girls
  {
    id: 'hair-brush-diy',
    name: 'Hair brush DIY activity',
    category: 'girls',
    categoryLabel: 'Exclusively for girls',
    price: 199,
    formattedPrice: '₹199',
    description: 'Creative styling, aesthetic customization, and hands-on artistic crafting workshop.',
  },

  // Exclusively for boys
  {
    id: 'minute-to-win-it',
    name: 'Minute to Win it challenge',
    category: 'boys',
    categoryLabel: 'Exclusively for boys',
    price: 199,
    formattedPrice: '₹199',
    description: 'High-adrenaline 60-second dexterity, balance, and reflex showdown with eliminations.',
  },
];

export const SPECIAL_EVENT = {
  id: 'mun-got-latent',
  name: 'MUN got Latent',
  category: 'special',
  price: 0,
  formattedPrice: 'FREE',
  description:
    'Since there is only one special event which is MUN got Latent and it is absolutely free here different individuals would get a chance to showcase their talent in front of the panel of judges.',
  talentQuestion: 'What talent do you think you can showcase?',
};
