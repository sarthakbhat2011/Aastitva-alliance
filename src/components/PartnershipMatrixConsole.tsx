import React, { useState } from 'react';
import { Award, ShieldCheck, CheckCircle2, Sparkles, Building, Landmark, Target } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface Props {
  onPartnerClick?: () => void;
}

export const PartnershipMatrixConsole: React.FC<Props> = ({ onPartnerClick }) => {
  const [selectedTier, setSelectedTier] = useState<number>(0);

  const tiers = [
    {
      id: 1,
      title: 'Institutional Founding Partner',
      badge: 'Academic Tier I',
      reach: '2,500+ Regional Student Delegates',
      highlights: [
        'Prominent Main Stage & Conclave Branding',
        'Official Co-Host Status in Summit Brochure',
        'Opening Ceremony Keynote Address Slot',
        'Direct Access to Delegate Talent Pool',
      ],
      desc: 'Top-tier academic institutional collaboration for major schools and universities across Jammu, Kashmir, and Northern India.',
    },
    {
      id: 2,
      title: 'Council & Committee Sponsor',
      badge: 'Deliberation Tier II',
      reach: '6 Official Councils (CCC, UNHRC, Lok Sabha...)',
      highlights: [
        'Dedicated Committee Room Naming Rights',
        'Logo Integration on Background Study Guides',
        'Exclusive Award Trophy Presentation',
        'Delegate Kit Custom Merchandise Insert',
      ],
      desc: 'Targeted council alignment sponsoring specific committee chambers and academic awards.',
    },
    {
      id: 3,
      title: 'Grassroots & Subsidized Access Partner',
      badge: 'Social Impact Tier III',
      reach: 'Government & Underprivileged Schools',
      highlights: [
        '100% Direct Student Subsidy Transparency',
        'Grassroots Education Impact Report',
        'Social Responsibility Award Honors',
        'Community Outreach Recognition',
      ],
      desc: 'Aligned with the conscience of Aastitva—sponsoring delegate seats and training for students least likely to afford conference entry.',
    },
  ];

  const active = tiers[selectedTier];

  return (
    <div className="w-full rounded-3xl bg-gradient-to-b from-[#0B1224]/95 via-[#070A14]/95 to-[#050811]/95 border-2 border-[#D4AF37]/50 shadow-[0_25px_80px_rgba(0,0,0,0.9)] overflow-hidden font-jakarta text-left space-y-0 relative">
      {/* Windows XP Futuristic Alliances Titlebar */}
      <div className="bg-gradient-to-r from-[#16203B] via-[#0D1427] to-[#16203B] px-4 py-2.5 border-b border-[#D4AF37]/35 flex items-center justify-between select-none font-mono">
        <div className="flex items-center gap-2.5">
          <div className="p-1 rounded bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37]">
            <Award className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-bold text-[#FAF5EF] tracking-wider">
            Aastitva_Alliances_Matrix.sys [Institutional Partnerships]
          </span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-3 h-3 rounded-full bg-amber-500/80 border border-amber-300/40" />
          <span className="w-3 h-3 rounded-full bg-emerald-500/80 border border-emerald-300/40" />
          <span className="w-3 h-3 rounded-full bg-rose-500/80 border border-rose-300/40" />
        </div>
      </div>

      {/* Main Alliances Body */}
      <div className="p-6 sm:p-10 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {tiers.map((t, idx) => (
            <button
              key={t.id}
              onClick={() => {
                sounds.playTap();
                setSelectedTier(idx);
              }}
              onMouseEnter={() => sounds.playHover()}
              className={`p-4 rounded-2xl border text-left transition-all space-y-1.5 ${
                idx === selectedTier
                  ? 'bg-[#16203B] border-[#D4AF37] text-[#FAF5EF] shadow-lg scale-102'
                  : 'bg-[#070A14] border-[#D4AF37]/20 text-[#C4BBA3] hover:border-[#D4AF37]/60 hover:bg-[#0D1427]'
              }`}
            >
              <span className="text-[10px] font-mono text-[#D4AF37] uppercase font-bold block">{t.badge}</span>
              <h4 className="font-bold text-xs sm:text-sm text-[#FAF5EF]">{t.title}</h4>
            </button>
          ))}
        </div>

        {/* Selected Tier Details */}
        <div className="p-6 rounded-2xl bg-[#070A14]/90 border border-[#D4AF37]/35 space-y-4 shadow-inner">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono text-[#D4AF37] uppercase font-bold">{active.badge}</span>
              <h3 className="text-xl sm:text-2xl font-cormorant font-bold text-[#FAF5EF]">{active.title}</h3>
            </div>
            <span className="px-3 py-1 rounded-full bg-[#16203B] text-emerald-400 font-mono text-xs border border-emerald-500/30">
              Audience: {active.reach}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-[#C4BBA3] leading-relaxed">{active.desc}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
            {active.highlights.map((h, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-[#0D1427]/80 border border-[#D4AF37]/20 text-xs text-[#FAF5EF] flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{h}</span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-[#D4AF37]/20 flex items-center justify-between gap-4 flex-wrap">
            <button
              onClick={() => {
                sounds.playChime();
                onPartnerClick && onPartnerClick();
              }}
              className="px-6 py-2.5 rounded-xl shimmer-btn text-[#070A14] font-bold text-xs shadow-lg hover:scale-105 active:scale-95 transition-all"
            >
              <span>Initiate Institutional MoU</span>
            </button>

            <span className="text-[10px] font-mono text-[#C4BBA3]">
              Zero Bureaucracy • Founder Direct Personal Responsibility
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
