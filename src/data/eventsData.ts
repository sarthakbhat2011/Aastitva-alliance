export interface PromPackage {
  id: string;
  name: string;
  price: number;
  formattedPrice: string;
  badge: string;
  description: string;
}

export interface RecreationalPackageTier {
  id: 'individual' | 'duo' | 'squad';
  name: string;
  price: number;
  formattedPrice: string;
  badge: string;
}

export const RECREATIONAL_TIERS: RecreationalPackageTier[] = [
  {
    id: 'individual',
    name: 'Individual Entry',
    price: 250,
    formattedPrice: '₹250',
    badge: 'Solo Player',
  },
  {
    id: 'duo',
    name: 'Duo Entry',
    price: 450,
    formattedPrice: '₹450',
    badge: 'Pair (2 Players)',
  },
  {
    id: 'squad',
    name: 'Squad Entry',
    price: 800,
    formattedPrice: '₹800',
    badge: 'Squad (Up to 4 Players)',
  },
];

export interface RecreationalActivity {
  id: string;
  name: string;
  category: 'unisex' | 'girls' | 'boys';
  categoryLabel: string;
  hasTiers?: boolean;
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
  'Musical chairs',
  'Egyptian wrap',
];

export const RECREATIONAL_ACTIVITIES: RecreationalActivity[] = [
  // Unisex Activities with Tiered Packages (Individual ₹250 / Duo ₹450 / Squad ₹800)
  {
    id: 'bgmi',
    name: 'BGMI',
    category: 'unisex',
    categoryLabel: 'Unisex',
    hasTiers: true,
    price: 250,
    formattedPrice: 'From ₹250',
    description: 'Competitive Battlegrounds Mobile India tournament with Solo (₹250), Duo (₹450), and Squad (₹800) brackets.',
  },
  {
    id: 'freefire',
    name: 'FREE FIRE',
    category: 'unisex',
    categoryLabel: 'Unisex',
    hasTiers: true,
    price: 250,
    formattedPrice: 'From ₹250',
    description: 'High-octane Free Fire survival clash with Solo (₹250), Duo (₹450), and Squad (₹800) brackets.',
  },
  {
    id: 'ludo',
    name: 'LUDO',
    category: 'unisex',
    categoryLabel: 'Unisex',
    hasTiers: true,
    price: 250,
    formattedPrice: 'From ₹250',
    description: 'Fast-paced strategic board game showdown with Solo (₹250), Duo (₹450), and Squad (₹800) brackets.',
  },
  {
    id: 'mafia',
    name: 'MAFIA',
    category: 'unisex',
    categoryLabel: 'Unisex',
    hasTiers: true,
    price: 250,
    formattedPrice: 'From ₹250',
    description: 'Ultimate social deduction and deception battle with Solo (₹250), Duo (₹450), and Squad (₹800) brackets.',
  },

  // Flat ₹200 Activities
  {
    id: 'treasure-hunt',
    name: 'TREASURE HUNT',
    category: 'unisex',
    categoryLabel: 'Unisex',
    hasTiers: false,
    price: 200,
    formattedPrice: '₹200',
    description: 'Cryptic riddle-solving across the venue to discover the secret conclave artifact first.',
  },
  {
    id: 'dumb-charades',
    name: 'DUMB CHARADES',
    category: 'unisex',
    categoryLabel: 'Unisex',
    hasTiers: false,
    price: 200,
    formattedPrice: '₹200',
    description: 'Expressive charades contest requiring silent acting, high speed guessing, and cinematic knowledge.',
  },
  {
    id: 'chess',
    name: 'CHESS',
    category: 'unisex',
    categoryLabel: 'Unisex',
    hasTiers: false,
    price: 200,
    formattedPrice: '₹200',
    description: 'Classic blitz & rapid cerebral grandmaster tournament across opening strategies and endgames.',
  },

  // Exclusively for girls (Flat ₹200)
  {
    id: 'rapunzels-vanity',
    name: "Rapunzel's vanity",
    category: 'girls',
    categoryLabel: 'Exclusively for girls',
    hasTiers: false,
    price: 200,
    formattedPrice: '₹200',
    description: 'Creative styling, aesthetic customization, and hands-on artistic crafting workshop.',
  },

  // Exclusively for boys (Flat ₹200)
  {
    id: 'minute-to-win-it',
    name: 'Minute to Win it challenge',
    category: 'boys',
    categoryLabel: 'Exclusively for boys',
    hasTiers: false,
    price: 200,
    formattedPrice: '₹200',
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
