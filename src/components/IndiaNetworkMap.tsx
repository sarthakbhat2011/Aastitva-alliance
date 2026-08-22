import React, { useState } from 'react';
import {
  MapPin,
  Mountain,
  Globe,
  CheckCircle2,
  Navigation,
  Compass,
  Sparkles,
  Layers,
  ArrowUpRight,
  Maximize2,
  Radio,
  Share2,
  Activity,
  Zap,
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export interface LocationInfo {
  id: string;
  name: string;
  state: string;
  stateKey: string;
  role: string;
  coordinates: string;
  elevation: string;
  x: number; // ViewBox 0 - 1000
  y: number; // ViewBox 0 - 1050
  region: 'J&K Circuit' | 'North India' | 'Central & Capital' | 'Western India';
  highlights: string[];
}

export const MAP_LOCATIONS: LocationInfo[] = [
  {
    id: 'kashmir',
    name: 'Kashmir (Srinagar)',
    state: 'Jammu & Kashmir',
    stateKey: 'jk',
    role: 'Valley Academic & Youth Leadership Forum',
    coordinates: '34.0837° N, 74.7973° E',
    elevation: '1,585 m',
    x: 430,
    y: 85,
    region: 'J&K Circuit',
    highlights: ['Valley Outreach', 'Inter-School Forums', 'Student Leadership'],
  },
  {
    id: 'jammu',
    name: 'Jammu',
    state: 'Jammu & Kashmir',
    stateKey: 'jk',
    role: 'Primary Founding Secretariat & Operational Conclave Hub',
    coordinates: '32.7266° N, 74.8570° E',
    elevation: '327 m',
    x: 405,
    y: 155,
    region: 'J&K Circuit',
    highlights: ['Inaugural Aequitas Summit', 'Primary Secretariat', 'Academic Circuit'],
  },
  {
    id: 'himachal',
    name: 'Himachal Pradesh (Shimla)',
    state: 'Himachal Pradesh',
    stateKey: 'hp',
    role: 'Regional School Network & Leadership Summits',
    coordinates: '31.1048° N, 77.1734° E',
    elevation: '2,276 m',
    x: 545,
    y: 235,
    region: 'North India',
    highlights: ['Hill Station Schools', 'Youth Conventions', 'Debate Federations'],
  },
  {
    id: 'amritsar',
    name: 'Amritsar',
    state: 'Punjab',
    stateKey: 'pb',
    role: 'Inter-School Debate & Academic Network',
    coordinates: '31.6340° N, 74.8723° E',
    elevation: '234 m',
    x: 345,
    y: 230,
    region: 'North India',
    highlights: ['Heritage School Network', 'Debate Leagues', 'Youth Parliaments'],
  },
  {
    id: 'ludhiana',
    name: 'Ludhiana',
    state: 'Punjab',
    stateKey: 'pb',
    role: 'Academic Summit & Event Network',
    coordinates: '30.9010° N, 75.8573° E',
    elevation: '244 m',
    x: 415,
    y: 260,
    region: 'North India',
    highlights: ['Institutional Alliances', 'Inter-School Quizzes', 'Literary Fests'],
  },
  {
    id: 'chandigarh',
    name: 'Chandigarh',
    state: 'Union Territory',
    stateKey: 'ch',
    role: 'North India Academic Hub & Secretariat Circuit',
    coordinates: '30.7333° N, 76.7794° E',
    elevation: '321 m',
    x: 475,
    y: 265,
    region: 'North India',
    highlights: ['Tri-City Circuit', 'University Forums', 'Executive Board Recruitment'],
  },
  {
    id: 'abohar',
    name: 'Abohar',
    state: 'Punjab (Rajasthan Border)',
    stateKey: 'pb',
    role: 'Grassroots Student Outreach & Academic Network',
    coordinates: '30.1453° N, 74.1994° E',
    elevation: '180 m',
    x: 320,
    y: 310,
    region: 'North India',
    highlights: ['Border Belt Outreach', 'Student Access', 'Academic Workshops'],
  },
  {
    id: 'dehradun',
    name: 'Dehradun',
    state: 'Uttarakhand',
    stateKey: 'uk',
    role: 'Heritage & Boarding School Circuit Connection',
    coordinates: '30.3165° N, 78.0322° E',
    elevation: '640 m',
    x: 665,
    y: 265,
    region: 'North India',
    highlights: ['Boarding School Alliances', 'Diplomatic MUNs', 'Model Parliaments'],
  },
  {
    id: 'haryana',
    name: 'Haryana',
    state: 'Haryana',
    stateKey: 'hr',
    role: 'Academic & MUN Network Operations',
    coordinates: '29.0588° N, 76.0856° E',
    elevation: '220 m',
    x: 460,
    y: 375,
    region: 'North India',
    highlights: ['NCR Fringe Schools', 'Youth Leadership', 'Conventional Debates'],
  },
  {
    id: 'delhi',
    name: 'Delhi (NCR)',
    state: 'National Capital Region',
    stateKey: 'dl',
    role: 'Diplomatic & Academic Circuit Connection',
    coordinates: '28.6139° N, 77.2090° E',
    elevation: '216 m',
    x: 520,
    y: 400,
    region: 'Central & Capital',
    highlights: ['Diplomatic Network', 'National Circuit Mentors', 'University Boards'],
  },
  {
    id: 'meerut',
    name: 'Meerut',
    state: 'Uttar Pradesh',
    stateKey: 'up',
    role: 'Institutional Network Reach & Event Alliances',
    coordinates: '28.9845° N, 77.7064° E',
    elevation: '219 m',
    x: 585,
    y: 385,
    region: 'Central & Capital',
    highlights: ['Western UP Schools', 'Academic Conventions', 'Delegate Training'],
  },
  {
    id: 'jaipur',
    name: 'Jaipur',
    state: 'Rajasthan',
    stateKey: 'rj',
    role: 'Institutional Event Connections & Cultural Symposia',
    coordinates: '26.9124° N, 75.7873° E',
    elevation: '431 m',
    x: 385,
    y: 495,
    region: 'Western India',
    highlights: ['Heritage Institutions', 'Literary Conferences', 'Youth Debates'],
  },
  {
    id: 'pune',
    name: 'Pune',
    state: 'Maharashtra',
    stateKey: 'mh',
    role: 'University & Youth Debate Connections',
    coordinates: '18.5204° N, 73.8567° E',
    elevation: '560 m',
    x: 310,
    y: 875,
    region: 'Western India',
    highlights: ['University Circuit', 'Parliamentary Debate Forums', 'Youth Alliances'],
  },
];

export const IndiaNetworkMap: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('jammu');
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [activeRegionFilter, setActiveRegionFilter] = useState<string>('All');
  const [showNetworkArcs, setShowNetworkArcs] = useState<boolean>(true);

  const regions = ['All', 'J&K Circuit', 'North India', 'Central & Capital', 'Western India'];

  const filteredLocations = MAP_LOCATIONS.filter((loc) => {
    if (activeRegionFilter === 'All') return true;
    return loc.region === activeRegionFilter;
  });

  const selectedData = MAP_LOCATIONS.find((l) => l.id === selectedId) || MAP_LOCATIONS[0];
  const activeStateKey = hoveredState || selectedData.stateKey;

  const jammuNode = MAP_LOCATIONS.find((l) => l.id === 'jammu') || MAP_LOCATIONS[1];

  const handleSelectLocation = (id: string) => {
    sounds.playTap();
    setSelectedId(id);
  };

  return (
    <div className="space-y-8 text-left font-jakarta">
      {/* Category Filter Tabs & Layer Controls */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center flex-wrap gap-2">
          {regions.map((reg) => (
            <button
              key={reg}
              onClick={() => {
                sounds.playTap();
                setActiveRegionFilter(reg);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all min-touch ${
                activeRegionFilter === reg
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#B89220] text-[#070A14] shadow-lg shadow-[#D4AF37]/30 scale-105'
                  : 'bg-[#16203B]/80 text-[#C4BBA3] border border-[#D4AF37]/30 hover:border-[#D4AF37] hover:text-[#FAF5EF]'
              }`}
            >
              {reg}
            </button>
          ))}
        </div>

        <button
          onClick={() => {
            sounds.playTap();
            setShowNetworkArcs(!showNetworkArcs);
          }}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0D1427] border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-mono font-bold hover:bg-[#16203B] transition-all shadow-md"
        >
          <Radio className={`w-3.5 h-3.5 ${showNetworkArcs ? 'animate-pulse text-emerald-400' : 'text-gray-500'}`} />
          <span>{showNetworkArcs ? 'Neural Arcs: Active' : 'Neural Arcs: Hidden'}</span>
        </button>
      </div>

      {/* Main Extravagant Seamless Connected Map Container */}
      <div className="relative rounded-3xl bg-gradient-to-b from-[#050811] via-[#090E1D] to-[#050811] border-2 border-[#D4AF37]/45 p-4 sm:p-8 overflow-hidden min-h-0 sm:min-h-[920px] flex flex-col justify-between shadow-[0_30px_90px_rgba(0,0,0,0.95)]">
        {/* Ambient Topographic Grid & Cosmic Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:32px_32px] opacity-20 pointer-events-none" />
        <div className="absolute top-10 left-10 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#52459E]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header with Cartographic Compass */}
        <div className="relative z-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#D4AF37]/25">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40 shadow-inner animate-rotate-gentle">
              <Compass className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <div>
              <h3 className="text-xl sm:text-3xl font-cormorant font-bold gold-gradient-text">
                Authentic Cartographic Map of India
              </h3>
              <p className="text-xs text-[#C4BBA3]">
                13 Interconnected Hubs • Authentic Geographical Placement & Neural Flow
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3.5 py-1.5 rounded-full bg-[#16203B] text-emerald-400 text-xs font-mono border border-emerald-500/30 flex items-center gap-2 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>HQ: Jammu Operations Core</span>
            </span>
          </div>
        </div>

        {/* INTERCONNECTED GEOGRAPHICAL MAP SVG STAGE */}
        <div className="relative w-full h-[320px] sm:h-[580px] md:h-[740px] my-2 sm:my-4 flex items-center justify-center overflow-hidden">
          <svg
            className="w-full h-full max-w-4xl select-none filter drop-shadow-[0_0_30px_rgba(212,175,55,0.25)]"
            viewBox="0 0 1000 1050"
            fill="none"
          >
            <defs>
              {/* Active State Gradient */}
              <linearGradient id="connActiveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.55" />
                <stop offset="50%" stopColor="#E8A53E" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#52459E" stopOpacity="0.5" />
              </linearGradient>

              {/* Default State Gradient */}
              <linearGradient id="connDefaultGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#16203B" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#0B1224" stopOpacity="0.98" />
              </linearGradient>

              {/* Context Backdrop Gradient */}
              <linearGradient id="connBackdropGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0E162B" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#070C18" stopOpacity="0.7" />
              </linearGradient>

              {/* Arc Glow Filter */}
              <filter id="arcGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* LATITUDE & LONGITUDE GEOGRAPHICAL GRID */}
            <g stroke="#D4AF37" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.2">
              <line x1="80" y1="90" x2="920" y2="90" />
              <text x="90" y="85" fill="#D4AF37" fontSize="10" fontFamily="monospace" opacity="0.7">34° N (Kashmir Valley - 1,585m)</text>

              <line x1="80" y1="190" x2="920" y2="190" />
              <text x="90" y="185" fill="#D4AF37" fontSize="10" fontFamily="monospace" opacity="0.7">32° N (Jammu Headquarters)</text>

              <line x1="80" y1="280" x2="920" y2="280" />
              <text x="90" y="275" fill="#D4AF37" fontSize="10" fontFamily="monospace" opacity="0.7">30° N (Punjab / Chandigarh / UK)</text>

              <line x1="80" y1="400" x2="920" y2="400" />
              <text x="90" y="395" fill="#D4AF37" fontSize="10" fontFamily="monospace" opacity="0.7">28° N (Delhi NCR / Haryana / Western UP)</text>

              <line x1="80" y1="520" x2="920" y2="520" />
              <text x="90" y="515" fill="#D4AF37" fontSize="10" fontFamily="monospace" opacity="0.7">26° N (Rajasthan - Jaipur)</text>

              <line x1="80" y1="880" x2="920" y2="880" />
              <text x="90" y="875" fill="#D4AF37" fontSize="10" fontFamily="monospace" opacity="0.7">18° N (Maharashtra - Pune)</text>

              <line x1="280" y1="40" x2="280" y2="980" />
              <text x="285" y="1000" fill="#D4AF37" fontSize="10" fontFamily="monospace" opacity="0.7">72° E</text>

              <line x1="520" y1="40" x2="520" y2="980" />
              <text x="525" y="1000" fill="#D4AF37" fontSize="10" fontFamily="monospace" opacity="0.7">77° E</text>

              <line x1="740" y1="40" x2="740" y2="980" />
              <text x="745" y="1000" fill="#D4AF37" fontSize="10" fontFamily="monospace" opacity="0.7">81° E</text>
            </g>

            {/* SEAMLESSLY CONNECTED CONTEXT STATES */}
            {/* Gujarat */}
            <polygon
              points="110,595 155,520 200,595 310,610 405,610 290,635 210,650 205,690 180,710 115,695 95,650"
              fill="url(#connBackdropGrad)"
              stroke="#243563"
              strokeWidth="0.8"
              strokeDasharray="3 2"
            />
            <text x="140" y="640" fill="#6B7280" fontSize="11" fontFamily="sans-serif" letterSpacing="1.5" opacity="0.5">
              GUJARAT
            </text>

            {/* Madhya Pradesh */}
            <polygon
              points="405,610 465,560 530,550 585,510 680,525 770,545 745,630 695,720 610,630 530,550 465,560 405,610 290,635 210,650 405,610"
              fill="url(#connBackdropGrad)"
              stroke="#243563"
              strokeWidth="0.8"
              strokeDasharray="3 2"
            />
            <text x="540" y="650" fill="#6B7280" fontSize="12" fontFamily="sans-serif" letterSpacing="2" opacity="0.5">
              MADHYA PRADESH
            </text>

            {/* 1. JAMMU & KASHMIR + LADAKH */}
            <g
              className="cursor-pointer transition-all duration-300 group"
              onMouseEnter={() => {
                sounds.playHover();
                setHoveredState('jk');
              }}
              onMouseLeave={() => setHoveredState(null)}
              onClick={() => handleSelectLocation('jammu')}
            >
              <polygon
                points="320,50 370,25 440,15 500,25 560,45 620,80 645,130 615,175 560,205 490,210 430,205 345,160 315,110"
                fill={activeStateKey === 'jk' ? 'url(#connActiveGrad)' : 'url(#connDefaultGrad)'}
                stroke={activeStateKey === 'jk' ? '#D4AF37' : '#D4AF37'}
                strokeWidth={activeStateKey === 'jk' ? '3' : '1.5'}
                className="transition-all duration-300"
              />
              <text x="430" y="55" fill="#D4AF37" fontSize="12" fontWeight="bold" letterSpacing="2" opacity="0.95">
                JAMMU & KASHMIR
              </text>
            </g>

            {/* 2. HIMACHAL PRADESH */}
            <g
              className="cursor-pointer transition-all duration-300 group"
              onMouseEnter={() => {
                sounds.playHover();
                setHoveredState('hp');
              }}
              onMouseLeave={() => setHoveredState(null)}
              onClick={() => handleSelectLocation('himachal')}
            >
              <polygon
                points="430,205 490,210 560,205 615,175 640,225 625,280 575,290 485,275 450,240"
                fill={activeStateKey === 'hp' ? 'url(#connActiveGrad)' : 'url(#connDefaultGrad)'}
                stroke={activeStateKey === 'hp' ? '#D4AF37' : '#D4AF37'}
                strokeWidth={activeStateKey === 'hp' ? '3' : '1.5'}
                className="transition-all duration-300"
              />
              <text x="505" y="245" fill="#D4AF37" fontSize="10" fontWeight="bold" letterSpacing="1" opacity="0.95">
                HIMACHAL PRADESH
              </text>
            </g>

            {/* 3. PUNJAB */}
            <g
              className="cursor-pointer transition-all duration-300 group"
              onMouseEnter={() => {
                sounds.playHover();
                setHoveredState('pb');
              }}
              onMouseLeave={() => setHoveredState(null)}
              onClick={() => handleSelectLocation('amritsar')}
            >
              <polygon
                points="345,160 430,205 450,240 485,275 455,315 395,345 335,345 285,320 270,260 290,195"
                fill={activeStateKey === 'pb' ? 'url(#connActiveGrad)' : 'url(#connDefaultGrad)'}
                stroke={activeStateKey === 'pb' ? '#D4AF37' : '#D4AF37'}
                strokeWidth={activeStateKey === 'pb' ? '3' : '1.5'}
                className="transition-all duration-300"
              />
              <text x="345" y="295" fill="#D4AF37" fontSize="13" fontWeight="bold" letterSpacing="2" opacity="0.95">
                PUNJAB
              </text>
            </g>

            {/* 4. UTTARAKHAND */}
            <g
              className="cursor-pointer transition-all duration-300 group"
              onMouseEnter={() => {
                sounds.playHover();
                setHoveredState('uk');
              }}
              onMouseLeave={() => setHoveredState(null)}
              onClick={() => handleSelectLocation('dehradun')}
            >
              <polygon
                points="615,175 675,165 740,185 775,230 765,300 710,345 645,340 625,280 640,225"
                fill={activeStateKey === 'uk' ? 'url(#connActiveGrad)' : 'url(#connDefaultGrad)'}
                stroke={activeStateKey === 'uk' ? '#D4AF37' : '#D4AF37'}
                strokeWidth={activeStateKey === 'uk' ? '3' : '1.5'}
                className="transition-all duration-300"
              />
              <text x="655" y="240" fill="#D4AF37" fontSize="11" fontWeight="bold" letterSpacing="1.5" opacity="0.95">
                UTTARAKHAND
              </text>
            </g>

            {/* 5. HARYANA */}
            <g
              className="cursor-pointer transition-all duration-300 group"
              onMouseEnter={() => {
                sounds.playHover();
                setHoveredState('hr');
              }}
              onMouseLeave={() => setHoveredState(null)}
              onClick={() => handleSelectLocation('haryana')}
            >
              <polygon
                points="485,275 575,290 625,280 615,335 585,370 545,385 505,425 455,420 420,380 410,345 395,345 455,315"
                fill={activeStateKey === 'hr' ? 'url(#connActiveGrad)' : 'url(#connDefaultGrad)'}
                stroke={activeStateKey === 'hr' ? '#D4AF37' : '#D4AF37'}
                strokeWidth={activeStateKey === 'hr' ? '3' : '1.5'}
                className="transition-all duration-300"
              />
              <text x="440" y="360" fill="#D4AF37" fontSize="11" fontWeight="bold" letterSpacing="1.5" opacity="0.95">
                HARYANA
              </text>
            </g>

            {/* 6. DELHI (NCR) */}
            <g
              className="cursor-pointer transition-all duration-300 group"
              onMouseEnter={() => {
                sounds.playHover();
                setHoveredState('dl');
              }}
              onMouseLeave={() => setHoveredState(null)}
              onClick={() => handleSelectLocation('delhi')}
            >
              <polygon
                points="505,375 530,380 545,395 540,420 515,425 495,405"
                fill={activeStateKey === 'dl' ? '#D4AF37' : '#16203B'}
                fillOpacity={activeStateKey === 'dl' ? '0.7' : '0.95'}
                stroke="#D4AF37"
                strokeWidth="2.5"
                className="transition-all duration-300"
              />
              <text x="525" y="435" fill="#FAF5EF" fontSize="10" fontWeight="bold">
                DELHI
              </text>
            </g>

            {/* 7. UTTAR PRADESH */}
            <g
              className="cursor-pointer transition-all duration-300 group"
              onMouseEnter={() => {
                sounds.playHover();
                setHoveredState('up');
              }}
              onMouseLeave={() => setHoveredState(null)}
              onClick={() => handleSelectLocation('meerut')}
            >
              <polygon
                points="625,280 645,340 710,345 765,300 825,350 885,420 895,495 860,540 770,545 680,525 585,510 550,480 505,425 545,385 585,370 615,335"
                fill={activeStateKey === 'up' ? 'url(#connActiveGrad)' : 'url(#connDefaultGrad)'}
                stroke={activeStateKey === 'up' ? '#D4AF37' : '#D4AF37'}
                strokeWidth={activeStateKey === 'up' ? '3' : '1.5'}
                className="transition-all duration-300"
              />
              <text x="680" y="440" fill="#D4AF37" fontSize="14" fontWeight="bold" letterSpacing="2.5" opacity="0.95">
                UTTAR PRADESH
              </text>
            </g>

            {/* 8. RAJASTHAN */}
            <g
              className="cursor-pointer transition-all duration-300 group"
              onMouseEnter={() => {
                sounds.playHover();
                setHoveredState('rj');
              }}
              onMouseLeave={() => setHoveredState(null)}
              onClick={() => handleSelectLocation('jaipur')}
            >
              <polygon
                points="270,260 285,320 335,345 395,345 410,345 420,380 455,420 505,425 550,480 585,510 530,550 465,560 405,610 310,610 200,595 155,520 160,430 195,340 240,275"
                fill={activeStateKey === 'rj' ? 'url(#connActiveGrad)' : 'url(#connDefaultGrad)'}
                stroke={activeStateKey === 'rj' ? '#D4AF37' : '#D4AF37'}
                strokeWidth={activeStateKey === 'rj' ? '3' : '1.5'}
                className="transition-all duration-300"
              />
              <text x="260" y="470" fill="#D4AF37" fontSize="16" fontWeight="bold" letterSpacing="3" opacity="0.95">
                RAJASTHAN
              </text>
            </g>

            {/* 9. MAHARASHTRA */}
            <g
              className="cursor-pointer transition-all duration-300 group"
              onMouseEnter={() => {
                sounds.playHover();
                setHoveredState('mh');
              }}
              onMouseLeave={() => setHoveredState(null)}
              onClick={() => handleSelectLocation('pune')}
            >
              <polygon
                points="210,650 290,635 405,610 465,560 530,550 610,630 635,705 615,785 575,860 475,945 365,960 275,945 205,860 195,765 205,690"
                fill={activeStateKey === 'mh' ? 'url(#connActiveGrad)' : 'url(#connDefaultGrad)'}
                stroke={activeStateKey === 'mh' ? '#D4AF37' : '#D4AF37'}
                strokeWidth={activeStateKey === 'mh' ? '3' : '1.5'}
                className="transition-all duration-300"
              />
              <text x="340" y="790" fill="#D4AF37" fontSize="16" fontWeight="bold" letterSpacing="3" opacity="0.95">
                MAHARASHTRA
              </text>
            </g>

            {/* NEURAL NETWORK TRANSIT ARCS (Connecting Jammu Hub to other nodes) */}
            {showNetworkArcs &&
              filteredLocations
                .filter((l) => l.id !== 'jammu')
                .map((loc) => {
                  const isSelected = selectedId === loc.id;
                  const pathD = `M ${jammuNode.x} ${jammuNode.y} Q ${(jammuNode.x + loc.x) / 2 + 30} ${
                    (jammuNode.y + loc.y) / 2 - 20
                  } ${loc.x} ${loc.y}`;

                  return (
                    <g key={`arc-${loc.id}`}>
                      <path
                        d={pathD}
                        fill="none"
                        stroke={isSelected ? '#FAF5EF' : '#D4AF37'}
                        strokeWidth={isSelected ? '2.5' : '1.2'}
                        strokeDasharray={isSelected ? 'none' : '4 3'}
                        strokeOpacity={isSelected ? '0.9' : '0.45'}
                        filter="url(#arcGlow)"
                        className="transition-all duration-500"
                      />
                    </g>
                  );
                })}

            {/* INTERACTIVE CARTOGRAPHIC NETWORK PINS */}
            {filteredLocations.map((loc) => {
              const isSelected = selectedId === loc.id;

              return (
                <g
                  key={loc.id}
                  className="cursor-pointer transition-all duration-300 group"
                  onClick={() => handleSelectLocation(loc.id)}
                  onMouseEnter={() => sounds.playHover()}
                >
                  {/* Outer Pulsing Radar Ring */}
                  <circle
                    cx={loc.x}
                    cy={loc.y}
                    r={isSelected ? '16' : '9'}
                    fill="#D4AF37"
                    fillOpacity={isSelected ? '0.4' : '0.15'}
                    stroke="#D4AF37"
                    strokeWidth={isSelected ? '2' : '0.8'}
                    className={isSelected ? 'animate-ping' : ''}
                  />

                  {/* Core Glowing Location Pin Dot */}
                  <circle
                    cx={loc.x}
                    cy={loc.y}
                    r={isSelected ? '7' : '5'}
                    fill={isSelected ? '#FAF5EF' : '#D4AF37'}
                    stroke="#070A14"
                    strokeWidth="2"
                    className="shadow-2xl"
                  />

                  {/* High-Legibility City Label Badge */}
                  <g transform={`translate(${loc.x}, ${loc.y - 16})`}>
                    <rect
                      x={-(loc.name.length * 3.5 + 12)}
                      y="-13"
                      width={loc.name.length * 7 + 24}
                      height="20"
                      rx="10"
                      fill={isSelected ? '#D4AF37' : '#070A14'}
                      stroke={isSelected ? '#FAF5EF' : '#D4AF37'}
                      strokeWidth={isSelected ? '1.8' : '1'}
                      className="shadow-2xl"
                    />
                    <text
                      x="0"
                      y="1.5"
                      textAnchor="middle"
                      fill={isSelected ? '#070A14' : '#FAF5EF'}
                      fontSize="9.5"
                      fontWeight="bold"
                      fontFamily="system-ui, sans-serif"
                    >
                      {loc.name}
                    </text>
                  </g>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Selected Hub Knowledge Dossier Drawer with Real-Time Coordinates */}
        <div className="relative z-30 mt-2 p-3.5 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#16203B]/95 via-[#0D1427]/95 to-[#16203B]/95 border-2 border-[#D4AF37]/70 shadow-[0_20px_50px_rgba(0,0,0,0.9)] backdrop-blur-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3.5 sm:gap-6 transition-all duration-500 max-h-[220px] sm:max-h-none overflow-y-auto custom-scrollbar">
          <div className="flex items-start gap-3 sm:gap-4 text-left">
            <div className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/50 shrink-0 shadow-inner">
              <Navigation className="w-5 h-5 sm:w-7 sm:h-7 animate-pulse text-[#D4AF37]" />
            </div>
            <div className="space-y-1 sm:space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="font-cormorant font-bold text-lg sm:text-3xl text-[#FAF5EF]">
                  {selectedData.name}
                </h4>
                <span className="px-2 py-0.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                  {selectedData.state}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#52459E]/40 border border-[#52459E]/60 text-[#D4AF37] text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider">
                  {selectedData.region}
                </span>
              </div>

              {/* Coordinates and Elevation HUD */}
              <div className="flex items-center gap-3 text-[10px] sm:text-xs font-mono text-[#D4AF37] opacity-90 flex-wrap">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#D4AF37]" />
                  <span>GPS: {selectedData.coordinates}</span>
                </span>
                <span className="inline-flex items-center gap-1">
                  <Mountain className="w-3 h-3 text-[#D4AF37]" />
                  <span>Elevation: {selectedData.elevation}</span>
                </span>
              </div>

              <p className="text-[11px] sm:text-sm text-[#C4BBA3] leading-relaxed max-w-xl font-jakarta">
                {selectedData.role}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 shrink-0 w-full lg:w-auto">
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
              {selectedData.highlights.map((h, idx) => (
                <span
                  key={idx}
                  className="px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-lg sm:rounded-xl bg-[#070A14] border border-[#D4AF37]/40 text-[#FAF5EF] text-[10px] sm:text-xs font-semibold inline-flex items-center gap-1.5 shadow-md"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{h}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
