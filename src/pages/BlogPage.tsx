import React, { useState } from 'react';
import { BLOG_POSTS } from '../data';
import { Clock, User, ArrowRight, Search, Sparkles } from 'lucide-react';
import { Astitva3DCanvas } from '../components/Astitva3DCanvas';
import { ScrollIndicator } from '../components/ScrollIndicator';
import { ScrollReveal } from '../components/ScrollReveal';

export const BlogPage: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = BLOG_POSTS.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeArticle = BLOG_POSTS.find((p) => p.id === selectedPost);

  return (
    <div className="relative font-sans text-[#FAF5EF] py-12 px-4 sm:px-6 max-w-7xl mx-auto space-y-12">
      {/* Hero Banner with 3D Canvas Emblem */}
      <ScrollReveal direction="zoom" delay={0.1}>
        <div className="bg-gradient-to-br from-[#0D1427]/95 via-[#16203B]/90 to-[#070A14]/95 border border-[#D4AF37]/35 shadow-[0_16px_50px_rgba(0,0,0,0.85)] p-6 sm:p-12 rounded-3xl relative overflow-hidden flex flex-col lg:grid lg:grid-cols-12 gap-8 items-center">
          <div className="w-full lg:col-span-8 space-y-4 text-left z-10 font-jakarta">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold uppercase tracking-widest shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Academic Journal & Guides</span>
            </div>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-cormorant font-bold gold-gradient-text leading-tight">
              Astitva Academic Resources
            </h1>
            <p className="text-sm sm:text-base text-[#C4BBA3] w-full max-w-2xl leading-relaxed">
              In-depth guides on Model UN Rules of Procedure, position paper crafting, public speaking, and regional event logistics.
            </p>
          </div>

          <div className="w-full lg:col-span-4 h-44 sm:h-56 relative flex items-center justify-center z-0">
            <Astitva3DCanvas variant="hero" />
          </div>

          <div className="w-full lg:col-span-12 flex justify-center pt-2">
            <ScrollIndicator targetId="journal-search" label="Browse Resource Articles" />
          </div>
        </div>
      </ScrollReveal>

      {/* Search Bar */}
      <ScrollReveal direction="up" delay={0.1}>
        <div id="journal-search" className="relative max-w-md mx-auto">
          <Search className="w-5 h-5 text-[#D4AF37] absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search guides, position paper tips..."
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-[#171026]/90 border border-[#D4AF37]/40 text-[#FAF5EF] text-xs sm:text-sm focus:outline-none focus:border-[#D4AF37] shadow-xl backdrop-blur-md font-jakarta"
          />
        </div>
      </ScrollReveal>

      {/* Active Article Reading View */}
      {activeArticle ? (
        <ScrollReveal direction="up" delay={0.1}>
          <div className="space-y-8 py-6 text-left max-w-4xl mx-auto animate-page-enter font-jakarta">
            <button
              onClick={() => setSelectedPost(null)}
              className="text-xs text-[#D4AF37] hover:underline font-bold inline-flex items-center gap-1 min-touch"
            >
              ← Back to All Resources
            </button>

            <div className="space-y-4">
              <span className="px-3.5 py-1 rounded bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold uppercase border border-[#D4AF37]/30 inline-block">
                {activeArticle.category}
              </span>

              <h2 className="text-3xl sm:text-5xl font-cormorant font-bold text-var-text-primary leading-tight">
                {activeArticle.title}
              </h2>

              <div className="flex flex-wrap items-center gap-4 text-xs text-var-text-secondary pt-2">
                <span className="flex items-center gap-1 font-semibold">
                  <User className="w-3.5 h-3.5 text-[#D4AF37]" /> {activeArticle.author}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#D4AF37]" /> {activeArticle.readTime}
                </span>
                <span>•</span>
                <span>{activeArticle.date}</span>
              </div>
            </div>

            <div className="h-80 sm:h-[420px] rounded-3xl overflow-hidden my-6 border border-[#D4AF37]/30 shadow-2xl">
              <img
                src={activeArticle.image}
                alt={activeArticle.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-6 text-base text-var-text-secondary leading-relaxed border-l-2 border-[#D4AF37]/50 pl-6 sm:pl-8">
              {activeArticle.content.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>
        </ScrollReveal>
      ) : (
        /* Grid of Article Cards */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredPosts.map((post, idx) => (
            <ScrollReveal key={post.id} direction="up" delay={idx * 0.08}>
              <div className="glass-card rounded-3xl overflow-hidden hover:border-[#D4AF37]/60 transition-all flex flex-col justify-between h-full text-left font-jakarta">
                <div>
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#171026]/90 border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] font-bold uppercase backdrop-blur-md">
                      {post.category}
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-2 text-[11px] text-[#C4BBA3]">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h3 className="text-lg font-cormorant font-bold text-[#FAF5EF] line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-xs text-[#C4BBA3] line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() => setSelectedPost(post.id)}
                    className="text-xs font-bold text-[#D4AF37] hover:underline flex items-center gap-1 min-touch"
                  >
                    <span>Read Full Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      )}
    </div>
  );
};
