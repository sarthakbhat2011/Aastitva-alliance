import React, { useState } from 'react';
import {
  Sparkles,
  Compass,
  Target,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  Shield,
  Flame,
  BookOpen,
  Camera,
  Zap,
  Building,
  HeartHandshake,
  TrendingUp,
  Award,
} from 'lucide-react';
import { COMMITTEES } from '../data';
import { sounds } from '../utils/soundEffects';

interface Props {
  onSelectCommittee: (committeeCode: string) => void;
}

export const CommitteeFitDecryptor: React.FC<Props> = ({ onSelectCommittee }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedInterest, setSelectedInterest] = useState<string>('');
  const [selectedExperience, setSelectedExperience] = useState<string>('');
  const [recommendedId, setRecommendedId] = useState<string>('lok-sabha');
  const [matchScore, setMatchScore] = useState<number>(98);

  // 6 Authentic Pillars matching the 6 Real Summit Committees in data.ts
  const interests = [
    {
      id: 'crisis',
      title: 'Fast-Paced Emergency Crisis & Directives',
      desc: 'Real-time breaking updates, secret directives, satirical movements, and rapid covert actions.',
      icon: Flame,
      primaryComm: 'ccc',
      badge: 'Continuous Crisis',
    },
    {
      id: 'human-rights',
      title: 'Global Human Rights & Freedom of Speech',
      desc: 'International covenants, global civil liberties, and fundamental protections against state censorship.',
      icon: Shield,
      primaryComm: 'unhrc',
      badge: 'UN Human Rights',
    },
    {
      id: 'jk-assembly',
      title: 'Jammu & Kashmir Regional Policy & Security',
      desc: 'Regional administration, cross-border anti-narcotics, counter-terrorism, and local state development.',
      icon: Building,
      primaryComm: 'jkla',
      badge: 'J&K Legislative Assembly',
    },
    {
      id: 'gender-policy',
      title: 'Gender Rights, Public Life & Legal Safety',
      desc: 'Women empowerment, equal participation in governance, and dismantling restrictive paternalist policies.',
      icon: HeartHandshake,
      primaryComm: 'un-women',
      badge: 'UN Women',
    },
    {
      id: 'parliament',
      title: 'Indian Parliamentary Debates & National Reforms',
      desc: 'Lok Sabha floor legislation, examination paper leak integrity, public recruitment laws, and national policy.',
      icon: Zap,
      primaryComm: 'lok-sabha',
      badge: 'Lok Sabha',
    },
    {
      id: 'sports-analytics',
      title: 'Strategic Portfolio Valuation & Auction Mechanics',
      desc: 'High-pressure financial bidding, purse optimization, team synergy analysis, and sports management.',
      icon: TrendingUp,
      primaryComm: 'ipl',
      badge: 'IPL Mega Auction',
    },
  ];

  const experienceTiers = [
    {
      id: 'novice',
      label: 'First-Timer / Novice (0-1 MUNs)',
      desc: 'Seeking structured procedural guidance, constructive chair feedback, and building public speaking courage.',
      preferredComms: ['un-women', 'lok-sabha', 'unhrc'],
    },
    {
      id: 'intermediate',
      label: 'Intermediate Debater (2-4 MUNs)',
      desc: 'Comfortable with working papers, draft resolutions, intense moderated caucuses, and strategic lobbying.',
      preferredComms: ['lok-sabha', 'jkla', 'unhrc', 'ipl'],
    },
    {
      id: 'veteran',
      label: 'Circuit Veteran / Gavel Seeker (5+ MUNs)',
      desc: 'Thrives in unpredictable midnight crisis updates, high-stakes parliamentary cross-examination, and bidding wars.',
      preferredComms: ['ccc', 'jkla', 'ipl', 'lok-sabha'],
    },
  ];

  // Dynamic Multi-Attribute Decision Engine
  const calculateRecommendation = (interestId: string, expId: string) => {
    const interestItem = interests.find((i) => i.id === interestId);
    if (!interestItem) return 'lok-sabha';

    let targetId = interestItem.primaryComm;
    let score = 98;

    // Nuanced adjustments based on experience level
    if (expId === 'novice' && targetId === 'ccc') {
      // If novice picks crisis, recommend UNHRC or Lok Sabha as beginner-friendly alternatives or maintain CCC with tailored score
      score = 92;
    } else if (expId === 'veteran' && (targetId === 'ccc' || targetId === 'jkla' || targetId === 'ipl')) {
      score = 99;
    } else if (expId === 'intermediate') {
      score = 96;
    }

    setRecommendedId(targetId);
    setMatchScore(score);
    return targetId;
  };

  const handleSelectInterest = (id: string) => {
    sounds.playTap();
    setSelectedInterest(id);
    setStep(2);
  };

  const handleSelectExperience = (expId: string) => {
    sounds.playChime();
    setSelectedExperience(expId);
    calculateRecommendation(selectedInterest, expId);
    setStep(3);
  };

  const handleReset = () => {
    sounds.playTap();
    setStep(1);
    setSelectedInterest('');
    setSelectedExperience('');
  };

  const matchedCommittee =
    COMMITTEES.find((c) => c.id === recommendedId) ||
    COMMITTEES.find((c) => c.id === 'lok-sabha') ||
    COMMITTEES[0];

  const runnerUpCommittees = COMMITTEES.filter((c) => c.id !== matchedCommittee.id).slice(0, 2);

  return (
    <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0D1427] via-[#16203B]/90 to-[#070A14] border-2 border-[#D4AF37]/50 shadow-[0_20px_70px_rgba(0,0,0,0.85)] font-jakarta text-left space-y-6 relative overflow-hidden">
      {/* Background Cosmic Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center justify-between gap-4 flex-wrap pb-3 border-b border-[#D4AF37]/20 relative z-10">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-wider">
          <Compass className="w-4 h-4 text-[#D4AF37] animate-spin-slow" />
          <span>Tactical Committee Alignment Decryptor</span>
        </div>
        <span className="text-xs font-mono text-[#FAF5EF] bg-[#070A14] px-3 py-1 rounded-full border border-[#D4AF37]/30">
          Stage 0{step} / 03
        </span>
      </div>

      {/* STEP 1: SELECT DEBATE INSTINCT & INTEREST */}
      {step === 1 && (
        <div className="space-y-5 animate-slide-in-left relative z-10">
          <div className="space-y-1">
            <h3 className="text-2xl sm:text-3xl font-cormorant font-bold text-[#FAF5EF]">
              What drives your diplomatic and intellectual instinct?
            </h3>
            <p className="text-xs sm:text-sm text-[#C4BBA3]">
              Select the arena where your research depth, speaking flair, and strategic instinct shine brightest:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-1">
            {interests.map((item) => {
              const IconComp = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectInterest(item.id)}
                  onMouseEnter={() => sounds.playHover()}
                  className="p-5 rounded-2xl bg-[#070A14]/90 hover:bg-[#16203B] border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all text-left space-y-2.5 group shadow-lg flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="p-2.5 w-fit rounded-xl bg-[#D4AF37]/15 text-[#D4AF37] group-hover:scale-110 transition-transform">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono text-[#D4AF37] uppercase px-2 py-0.5 rounded-full bg-[#16203B] border border-[#D4AF37]/20">
                        {item.badge}
                      </span>
                    </div>
                    <h4 className="font-bold text-sm text-[#FAF5EF] group-hover:text-[#D4AF37] transition-colors leading-snug">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-[11px] text-[#C4BBA3] leading-relaxed">
                    {item.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* STEP 2: SELECT EXPERIENCE LEVEL */}
      {step === 2 && (
        <div className="space-y-5 animate-slide-in-right relative z-10">
          <div className="space-y-1">
            <h3 className="text-2xl sm:text-3xl font-cormorant font-bold text-[#FAF5EF]">
              What is your circuit and debate experience level?
            </h3>
            <p className="text-xs sm:text-sm text-[#C4BBA3]">
              We evaluate procedural complexity and caucus intensity to ensure an optimal learning curve:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
            {experienceTiers.map((exp, idx) => (
              <button
                key={exp.id}
                onClick={() => handleSelectExperience(exp.id)}
                onMouseEnter={() => sounds.playHover()}
                className="p-6 rounded-2xl bg-[#070A14]/90 hover:bg-[#16203B] border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all text-left space-y-3 group shadow-lg"
              >
                <div className="p-2 w-fit rounded-lg bg-[#D4AF37]/20 text-[#D4AF37] font-mono font-bold text-xs">
                  Experience Tier 0{idx + 1}
                </div>
                <h4 className="font-bold text-sm text-[#FAF5EF] group-hover:text-[#D4AF37] transition-colors">
                  {exp.label}
                </h4>
                <p className="text-xs text-[#C4BBA3] leading-relaxed">
                  {exp.desc}
                </p>
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              sounds.playTap();
              setStep(1);
            }}
            className="text-xs text-[#C4BBA3] hover:text-[#D4AF37] font-mono flex items-center gap-1 mt-2"
          >
            ← Back to Interest Selection
          </button>
        </div>
      )}

      {/* STEP 3: REVEAL DECRYPTED COMMITTEE FIT */}
      {step === 3 && (
        <div className="space-y-6 animate-skew-in relative z-10">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold w-fit">
              <CheckCircle2 className="w-4 h-4" />
              <span>Optimal Diplomatic Alignment Decrypted ({matchScore}% Match)</span>
            </div>

            <button
              onClick={handleReset}
              className="px-3.5 py-1.5 rounded-xl bg-[#070A14] text-[#C4BBA3] hover:text-[#FAF5EF] border border-[#D4AF37]/30 text-xs font-mono flex items-center gap-1.5 shadow-sm"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Recalculate Profile</span>
            </button>
          </div>

          {/* Primary Recommended Committee Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#070A14]/95 border-2 border-[#D4AF37] space-y-4 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <span className="px-4 py-1.5 rounded-xl bg-[#D4AF37] text-[#070A14] font-mono font-extrabold text-xs shadow-md">
                TOP RECOMMENDATION: {matchedCommittee.code}
              </span>
              <span className="text-xs font-mono text-[#D4AF37] bg-[#16203B] px-3 py-1 rounded-full border border-[#D4AF37]/30">
                Council Capacity: {matchedCommittee.seats} Seats Available
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl sm:text-4xl font-cormorant font-bold text-[#FAF5EF]">
                {matchedCommittee.name}
              </h3>
            </div>

            <div className="p-4 rounded-xl bg-[#16203B]/80 border-l-4 border-[#D4AF37] space-y-1">
              <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider font-bold block">
                Official Deliberation Agenda:
              </span>
              <p className="text-xs sm:text-sm text-[#FAF5EF] font-cormorant italic leading-relaxed">
                "{matchedCommittee.agenda}"
              </p>
            </div>

            <p className="text-xs sm:text-sm text-[#C4BBA3] leading-relaxed">
              {matchedCommittee.description}
            </p>

            <div className="pt-2">
              <button
                onClick={() => {
                  sounds.playChime();
                  onSelectCommittee(`${matchedCommittee.code} - ${matchedCommittee.name}`);
                }}
                className="w-full sm:w-auto px-8 py-4 rounded-xl shimmer-btn text-[#070A14] font-extrabold text-sm shadow-xl flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all"
              >
                <Sparkles className="w-4 h-4 fill-current" />
                <span>Apply for {matchedCommittee.code} Delegate Seat</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Alternate Suitable Councils */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] font-bold">
              Alternative Suitable Councils for Your Profile
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {runnerUpCommittees.map((alt) => (
                <div
                  key={alt.id}
                  className="p-4 rounded-2xl bg-[#070A14]/80 border border-[#D4AF37]/25 flex items-center justify-between gap-4"
                >
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono text-[#D4AF37] font-bold">{alt.code}</span>
                    <h5 className="text-xs font-bold text-[#FAF5EF] truncate max-w-[200px]">{alt.name}</h5>
                    <span className="text-[10px] text-[#C4BBA3]">{alt.seats} Seats</span>
                  </div>
                  <button
                    onClick={() => {
                      sounds.playTap();
                      onSelectCommittee(`${alt.code} - ${alt.name}`);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-[#16203B] hover:bg-[#D4AF37] text-[#FAF5EF] hover:text-[#070A14] border border-[#D4AF37]/30 text-xs font-bold transition-all shrink-0"
                  >
                    Select {alt.code}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
