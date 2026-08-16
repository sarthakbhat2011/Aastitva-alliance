import React, { useState } from 'react';
import { BookOpen, Sparkles, ArrowRight, Tag, Clock, Newspaper, CheckCircle2 } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export const AastitvaJournalViewer: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<number>(0);

  const articles = [
    {
      id: 1,
      title: 'The Philosophy of Existence in Modern Student Conclaves',
      tag: 'Foundational Epigraph',
      date: 'August 2026',
      readTime: '4 min read',
      excerpt: 'What is missing in modern academic events is rarely the initial idea, but everything standing between that idea and its full existence.',
      content: 'Every event an organiser dreams of already exists somewhere in a proposal, a conversation, a hope that students will show up and something meaningful will happen. Aastitva Alliance was born to collapse that distance, providing high-integrity infrastructure across Northern India.',
    },
    {
      id: 2,
      title: 'Beyond the Blueprint: Jammu Government School Outreach',
      tag: 'Grassroots Conscience',
      date: 'July 2026',
      readTime: '5 min read',
      excerpt: 'Existence is not a privilege reserved solely for schools that can already afford it. It should be something every student gets a chance at.',
      content: 'Visiting government schools across Jammu revealed the true gaps in delegate access and debate infrastructure. Our mission is to ensure underprivileged student communities receive first-class training, background dossiers, and subsidized conference opportunities.',
    },
    {
      id: 3,
      title: 'Why Trust a New Company: The Founder\'s Personal Covenant',
      tag: 'Institutional Governance',
      date: 'June 2026',
      readTime: '3 min read',
      excerpt: 'A visionary approach operating without bureaucracy, opacity of middlemen, or corporate apathy.',
      content: 'This is an unbreakable promise: no hidden costs, no vague promises, just honest conversations from day one. Word-of-mouth reputation and founder direct personal responsibility are our hallmarks.',
    },
  ];

  const activeArt = articles[selectedArticle];

  return (
    <div className="w-full rounded-3xl bg-gradient-to-b from-[#0B1224]/95 via-[#070A14]/95 to-[#050811]/95 border-2 border-[#D4AF37]/50 shadow-[0_25px_80px_rgba(0,0,0,0.9)] overflow-hidden font-jakarta text-left space-y-0 relative">
      {/* Windows XP Futuristic Dispatch Reader Titlebar */}
      <div className="bg-gradient-to-r from-[#16203B] via-[#0D1427] to-[#16203B] px-4 py-2.5 border-b border-[#D4AF37]/35 flex items-center justify-between select-none font-mono">
        <div className="flex items-center gap-2.5">
          <div className="p-1 rounded bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37]">
            <Newspaper className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-bold text-[#FAF5EF] tracking-wider">
            Aastitva_Gazette_Reader.exe [Verified Dispatches]
          </span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-3 h-3 rounded-full bg-amber-500/80 border border-amber-300/40" />
          <span className="w-3 h-3 rounded-full bg-emerald-500/80 border border-emerald-300/40" />
          <span className="w-3 h-3 rounded-full bg-rose-500/80 border border-rose-300/40" />
        </div>
      </div>

      {/* Main Journal Grid */}
      <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Dispatch List */}
        <div className="lg:col-span-5 space-y-2">
          <div className="text-[10px] font-mono uppercase text-[#D4AF37] font-bold tracking-widest pb-1 border-b border-[#D4AF37]/20">
            Official Dispatches ({articles.length})
          </div>

          <div className="space-y-2">
            {articles.map((art, idx) => {
              const isSelected = idx === selectedArticle;
              return (
                <button
                  key={art.id}
                  onClick={() => {
                    sounds.playTap();
                    setSelectedArticle(idx);
                  }}
                  onMouseEnter={() => sounds.playHover()}
                  className={`w-full p-4 rounded-2xl border text-left transition-all space-y-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-[#16203B] border-[#D4AF37] text-[#FAF5EF] shadow-lg scale-[1.01]'
                      : 'bg-[#070A14]/70 border-[#D4AF37]/20 text-[#C4BBA3] hover:border-[#D4AF37]/60 hover:bg-[#0D1427]'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#D4AF37]">
                    <span>{art.tag}</span>
                    <span>{art.date}</span>
                  </div>
                  <h4 className="font-bold text-xs sm:text-sm text-[#FAF5EF] line-clamp-2">
                    {art.title}
                  </h4>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Article Reading Pane */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-[#070A14]/90 border border-[#D4AF37]/35 space-y-4 shadow-inner">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-mono font-bold uppercase border border-[#D4AF37]/40">
              {activeArt.tag}
            </span>
            <span className="text-xs font-mono text-[#C4BBA3]">
              {activeArt.readTime}
            </span>
          </div>

          <h3 className="text-xl sm:text-3xl font-cormorant font-bold text-[#FAF5EF]">
            {activeArt.title}
          </h3>

          <p className="text-xs sm:text-sm text-[#FAF5EF] font-cormorant italic leading-relaxed border-l-2 border-[#D4AF37] pl-3">
            "{activeArt.excerpt}"
          </p>

          <p className="text-xs sm:text-sm text-[#C4BBA3] leading-relaxed pt-2">
            {activeArt.content}
          </p>
        </div>
      </div>
    </div>
  );
};
