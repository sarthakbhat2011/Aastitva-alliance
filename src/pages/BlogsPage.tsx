import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BookOpen,
  Search,
  ArrowLeft,
  ArrowRight,
  Clock,
  User,
  Sparkles,
  Share2,
  Check,
  ChevronRight,
  Bookmark,
  ExternalLink,
  Layers,
  Globe,
  Award,
  Zap,
  Quote,
  ShieldCheck,
} from 'lucide-react';
import { BLOG_POSTS } from '../data';
import { BlogPost, Page } from '../types';
import { PerspectiveCard } from '../components/motion/PerspectiveCard';
import { ScrollReveal } from '../components/ScrollReveal';
import { CinematicScene } from '../components/cinematic/CinematicScene';
import { CinematicMaskReveal } from '../components/cinematic/CinematicMaskReveal';
import { MagneticElement } from '../components/motion/MagneticElement';
import { sounds } from '../utils/soundEffects';

interface Props {
  onNavigate: (page: Page) => void;
  onOpenRegister?: () => void;
  initialPostId?: string;
}

export const BlogsPage: React.FC<Props> = ({ onNavigate, onOpenRegister, initialPostId }) => {
  const [selectedPostId, setSelectedPostId] = useState<string | null>(initialPostId || null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedLink, setCopiedLink] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  const selectedPost = BLOG_POSTS.find((p) => p.id === selectedPostId);

  // Categories list
  const categories = [
    'All',
    'Media Literacy & Critical Thinking',
    'Career & Resume Strategy',
    'Ecosystem & Industry Analysis',
    'Future of Work & Employability',
  ];

  // Filtered posts for listing
  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.author && post.author.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Track reading scroll progress when in reader mode
  useEffect(() => {
    if (!selectedPostId) {
      setReadingProgress(0);
      return;
    }

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        setReadingProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [selectedPostId]);

  const handleSelectPost = (id: string) => {
    sounds.playTap();
    setSelectedPostId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    sounds.playTap();
    setSelectedPostId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyLink = () => {
    sounds.playChime();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  // Switch to next or previous post
  const currentIndex = BLOG_POSTS.findIndex((p) => p.id === selectedPostId);
  const prevPost = currentIndex > 0 ? BLOG_POSTS[currentIndex - 1] : null;
  const nextPost = currentIndex >= 0 && currentIndex < BLOG_POSTS.length - 1 ? BLOG_POSTS[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-[#050811] text-[#FAF5EF] font-sans selection:bg-[#D4AF37] selection:text-[#070A14] relative">
      {/* Top Reading Progress Bar (in article view) */}
      {selectedPost && (
        <div className="fixed top-0 left-0 w-full h-1 bg-[#16203B] z-50">
          <motion.div
            className="h-full bg-gradient-to-r from-[#D4AF37] via-[#F4E0A5] to-[#E8A53E] shadow-[0_0_12px_rgba(212,175,55,0.8)]"
            style={{ width: `${readingProgress}%` }}
          />
        </div>
      )}

      {/* Decorative Celestial Core Ambient Halos */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/6 left-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-[#16203B]/30 to-[#D4AF37]/10 rounded-full blur-[140px] opacity-50" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-bl from-[#0D1427]/40 via-[#2E1065]/20 to-[#D4AF37]/10 rounded-full blur-[130px] opacity-40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* ========================================================================= */}
        {/* VIEW 1: FULL ARTICLE READER (LINE-BY-LINE AS IN PDF)                      */}
        {/* ========================================================================= */}
        {selectedPost ? (
          <article className="max-w-4xl mx-auto space-y-10">
            {/* Top Navigation Strip */}
            <div className="flex items-center justify-between border-b border-[#D4AF37]/25 pb-4">
              <MagneticElement strength={0.3}>
                <button
                  onClick={handleBackToList}
                  onMouseEnter={() => sounds.playHover()}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#0D1427] hover:bg-[#16203B] border border-[#D4AF37]/35 text-[#D4AF37] text-xs font-mono font-semibold transition-all cursor-pointer shadow-sm hover:shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to All Dispatches</span>
                </button>
              </MagneticElement>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0D1427] hover:bg-[#16203B] border border-[#D4AF37]/25 text-[#FAF5EF] text-xs font-mono transition-all cursor-pointer"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Link Copied</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Share</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Article Header Card */}
            <header className="space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/35 text-[#D4AF37] text-xs font-mono font-semibold">
                <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                <span>{selectedPost.category}</span>
                <span className="text-[#C4BBA3]">/</span>
                <span>{selectedPost.readTime}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold text-white leading-tight tracking-tight">
                {selectedPost.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#C4BBA3] border-y border-[#D4AF37]/20 py-3">
                <div className="flex items-center gap-1.5 text-white">
                  <User className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{selectedPost.author}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{selectedPost.date}</span>
                </div>
                <span>•</span>
                <span className="text-[#D4AF37] font-semibold">Authoritative Dispatch</span>
              </div>

              {/* Cover Artwork Banner */}
              <div className="w-full h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden border-2 border-[#D4AF37]/40 shadow-[0_20px_60px_rgba(0,0,0,0.8)] relative group">
                <img
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-[#070A14]/80 backdrop-blur-md border border-[#D4AF37]/30 text-left text-xs font-mono text-[#D4AF37] flex items-center justify-between">
                  <span>Aastitva Intellectual Archives // Document ID: {selectedPost.id}</span>
                  <span className="hidden sm:inline text-white/70">Verified ROP & Research Edition</span>
                </div>
              </div>
            </header>

            {/* Article Body - LINE BY LINE EXACT REPRODUCTION */}
            <main className="space-y-8 text-left text-base sm:text-lg leading-relaxed text-[#FAF5EF]/95 font-inter">
              {selectedPost.sections?.map((sec, sIdx) => (
                <section
                  key={sIdx}
                  className="space-y-5 rounded-2xl p-5 sm:p-7 bg-[#070A14]/80 border border-[#D4AF37]/25 shadow-lg backdrop-blur-sm"
                >
                  {/* Section Subheading (e.g. Author byline) */}
                  {sec.subheading && (
                    <p className="text-sm font-mono text-[#D4AF37] uppercase tracking-wider font-semibold">
                      {sec.subheading}
                    </p>
                  )}

                  {/* Section Heading */}
                  {sec.heading && (
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-playfair font-bold text-white pt-2 border-b border-[#D4AF37]/25 pb-3">
                      {sec.heading}
                    </h2>
                  )}

                  {/* Paragraphs */}
                  {sec.paragraphs?.map((para, pIdx) => (
                    <p key={pIdx} className="text-[#E6E1D8] text-sm sm:text-base leading-relaxed">
                      {para}
                    </p>
                  ))}

                  {/* Bullet points */}
                  {sec.bullets && sec.bullets.length > 0 && (
                    <ul className="space-y-3 pl-1 pt-1">
                      {sec.bullets.map((b, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-3 text-sm sm:text-base text-[#FAF5EF]">
                          <span className="w-2 h-2 rounded-full bg-[#D4AF37] shrink-0 mt-2 shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
                          <span className="leading-relaxed">{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Numbered list */}
                  {sec.numberedList && sec.numberedList.length > 0 && (
                    <ol className="space-y-3.5 pl-1 pt-1">
                      {sec.numberedList.map((item, nIdx) => (
                        <li key={nIdx} className="flex items-start gap-3.5 text-sm sm:text-base text-[#FAF5EF]">
                          <span className="w-6 h-6 rounded-lg bg-[#D4AF37] text-[#070A14] font-bold font-mono text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                            {nIdx + 1}
                          </span>
                          <span className="leading-relaxed pt-0.5">{item}</span>
                        </li>
                      ))}
                    </ol>
                  )}

                  {/* Callout box / Quote */}
                  {sec.callout && (
                    <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-[#16203B]/90 to-[#0D1427]/90 border-l-4 border-[#D4AF37] shadow-inner text-sm sm:text-base text-[#FAF5EF] italic leading-relaxed whitespace-pre-line">
                      <div className="flex items-center gap-2 text-xs font-mono not-italic text-[#D4AF37] font-semibold mb-2 uppercase">
                        <Quote className="w-3.5 h-3.5" />
                        <span>Crucial Takeaway</span>
                      </div>
                      {sec.callout}
                    </div>
                  )}

                  {/* Structured Table (e.g., What you did vs What it's worth on a resume) */}
                  {sec.table && (
                    <div className="overflow-x-auto rounded-xl border border-[#D4AF37]/30 shadow-md">
                      <table className="w-full text-left text-xs sm:text-sm font-inter">
                        <thead className="bg-[#16203B] text-[#D4AF37] font-mono uppercase tracking-wider text-[11px] border-b border-[#D4AF37]/30">
                          <tr>
                            {sec.table.headers.map((h, hIdx) => (
                              <th key={hIdx} className="px-4 py-3 font-bold">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#D4AF37]/15 bg-[#050811]/90">
                          {sec.table.rows.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-[#0D1427] transition-colors">
                              <td className="px-4 py-3 font-semibold text-white">{row[0]}</td>
                              <td className="px-4 py-3 text-[#C4BBA3]">{row[1]}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </section>
              ))}

              {/* Sources & Citations Section */}
              {selectedPost.sources && selectedPost.sources.length > 0 && (
                <div className="p-5 sm:p-6 rounded-2xl bg-[#0B1224]/90 border border-[#D4AF37]/35 space-y-3">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-[#D4AF37] font-bold flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                    <span>Authoritative Citations & References</span>
                  </h3>
                  <ul className="space-y-1.5 text-xs text-[#C4BBA3] font-mono">
                    {selectedPost.sources.map((src, srcIdx) => (
                      <li key={srcIdx} className="flex items-start gap-2">
                        <span className="text-[#D4AF37]">•</span>
                        <span>{src}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </main>

            {/* Bottom Next / Prev Switcher Strip */}
            <nav className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-[#D4AF37]/25 pt-8">
              {prevPost ? (
                <button
                  onClick={() => handleSelectPost(prevPost.id)}
                  className="p-4 rounded-xl bg-[#070A14] hover:bg-[#0D1427] border border-[#D4AF37]/30 text-left transition-all group cursor-pointer shadow-md"
                >
                  <span className="text-[10px] font-mono text-[#D4AF37] flex items-center gap-1 group-hover:-translate-x-1 transition-transform">
                    <ArrowLeft className="w-3 h-3" /> Previous Dispatch
                  </span>
                  <p className="font-playfair font-bold text-sm text-white mt-1 line-clamp-1">
                    {prevPost.title}
                  </p>
                </button>
              ) : (
                <div />
              )}

              {nextPost && (
                <button
                  onClick={() => handleSelectPost(nextPost.id)}
                  className="p-4 rounded-xl bg-[#070A14] hover:bg-[#0D1427] border border-[#D4AF37]/30 text-right transition-all group cursor-pointer shadow-md sm:col-start-2"
                >
                  <span className="text-[10px] font-mono text-[#D4AF37] flex items-center justify-end gap-1 group-hover:translate-x-1 transition-transform">
                    Next Dispatch <ArrowRight className="w-3 h-3" />
                  </span>
                  <p className="font-playfair font-bold text-sm text-white mt-1 line-clamp-1">
                    {nextPost.title}
                  </p>
                </button>
              )}
            </nav>

            {/* Action CTA Card at End of Article */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#16203B] via-[#0D1427] to-[#16203B] border-2 border-[#D4AF37]/50 shadow-[0_25px_80px_rgba(0,0,0,0.9)] text-center space-y-4">
              <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest block font-bold">
                Put These Skills Into Practice
              </span>
              <h3 className="text-2xl sm:text-3xl font-playfair font-bold text-white">
                Experience the 2026 Summit Stage First-Hand
              </h3>
              <p className="text-xs sm:text-sm text-[#C4BBA3] max-w-xl mx-auto">
                Test your negotiation, position paper drafting, and crisis resilience in real-time before executive board adjudicators.
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <MagneticElement strength={0.3}>
                  <button
                    onClick={() => {
                      sounds.playTap();
                      if (onOpenRegister) {
                        onOpenRegister();
                      } else {
                        onNavigate('summit');
                      }
                    }}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#EAE0C8] to-[#E8A53E] text-[#050811] font-bold text-xs shadow-lg hover:brightness-110 active:scale-95 transition-all inline-flex items-center gap-2 cursor-pointer btn-sheen-sweep"
                  >
                    <span>Register for Summit 2026</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </MagneticElement>

                <button
                  onClick={handleBackToList}
                  className="px-5 py-3 rounded-xl bg-[#0B1224] border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-mono hover:bg-[#16203B] transition-colors cursor-pointer"
                >
                  Browse More Dispatches
                </button>
              </div>
            </div>
          </article>
        ) : (
          /* ========================================================================= */
          /* VIEW 2: BLOGS DIRECTORY & LISTING WITH 3D PERSPECTIVE CARDS              */
          /* ========================================================================= */
          <div className="space-y-12 sm:space-y-16">
            {/* Header Hero Section */}
            <header className="space-y-4 text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-mono font-bold tracking-wider uppercase">
                <BookOpen className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>AASTITVA DISPATCHES // THOUGHT LEADERSHIP PORTAL</span>
              </div>

              <h1 className="text-3xl sm:text-5xl md:text-6xl font-playfair font-bold text-white tracking-tight leading-tight">
                Academic Papers & Thought Leadership
              </h1>

              <p className="text-sm sm:text-base text-[#C4BBA3] leading-relaxed">
                Analytical essays, media literacy frameworks, and career roadmaps crafted for ambitious student diplomats, educators, and event organizers.
              </p>
            </header>

            {/* Filter & Live Search Toolbar */}
            <div className="space-y-4 max-w-4xl mx-auto">
              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-[#D4AF37] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search articles by title, keyword, or concept (e.g. 'resume', 'fact-check', 'adaptability')..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#070A14]/90 border border-[#D4AF37]/35 text-white placeholder-[#8E8674] text-xs sm:text-sm focus:border-[#D4AF37] focus:outline-none transition-all shadow-inner"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-[#C4BBA3] hover:text-white"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                {categories.map((cat) => {
                  const isActive = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => {
                        sounds.playTap();
                        setSelectedCategory(cat);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#D4AF37] text-[#070A14] font-bold shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                          : 'bg-[#0D1427]/80 hover:bg-[#16203B] text-[#C4BBA3] border border-[#D4AF37]/25'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Featured Hero Article Spotlight (if no query active) */}
            {!searchQuery && selectedCategory === 'All' && BLOG_POSTS[0] && (
              <div className="max-w-5xl mx-auto">
                <PerspectiveCard maxTilt={5} scale={1.01}>
                  <div
                    onClick={() => handleSelectPost(BLOG_POSTS[0].id)}
                    className="group cursor-pointer rounded-3xl bg-gradient-to-r from-[#16203B]/90 via-[#0D1427]/90 to-[#16203B]/90 border-2 border-[#D4AF37]/50 shadow-[0_20px_70px_rgba(0,0,0,0.8)] overflow-hidden grid grid-cols-1 md:grid-cols-12 gap-0 text-left transition-all hover:border-[#D4AF37]"
                  >
                    <div className="md:col-span-7 p-6 sm:p-8 md:p-10 flex flex-col justify-between space-y-4">
                      <div className="space-y-3">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-[11px] font-mono font-bold">
                          <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                          <span>FEATURED DISPATCH</span>
                          <span className="text-[#C4BBA3]">•</span>
                          <span>{BLOG_POSTS[0].readTime}</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-playfair font-bold text-white group-hover:text-[#D4AF37] transition-colors leading-snug">
                          {BLOG_POSTS[0].title}
                        </h2>
                        <p className="text-xs sm:text-sm text-[#C4BBA3] leading-relaxed line-clamp-3">
                          {BLOG_POSTS[0].excerpt}
                        </p>
                      </div>

                      <div className="pt-2 flex items-center justify-between border-t border-[#D4AF37]/20 text-xs font-mono">
                        <div className="flex items-center gap-1.5 text-white">
                          <User className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <span>{BLOG_POSTS[0].author}</span>
                        </div>
                        <span className="text-[#D4AF37] font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                          Read Complete Paper →
                        </span>
                      </div>
                    </div>

                    <div className="md:col-span-5 h-64 md:h-auto relative overflow-hidden">
                      <img
                        src={BLOG_POSTS[0].image}
                        alt={BLOG_POSTS[0].title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0D1427] via-transparent to-transparent opacity-80" />
                    </div>
                  </div>
                </PerspectiveCard>
              </div>
            )}

            {/* Grid of All Dispatches */}
            <div className="space-y-6 max-w-6xl mx-auto">
              <div className="flex items-center justify-between border-b border-[#D4AF37]/25 pb-3 text-left">
                <h3 className="text-lg font-playfair font-bold text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#D4AF37]" />
                  <span>
                    {selectedCategory === 'All' ? 'All Publications' : selectedCategory} ({filteredPosts.length})
                  </span>
                </h3>
                <span className="text-xs font-mono text-[#D4AF37]">Click article to read in full</span>
              </div>

              {filteredPosts.length === 0 ? (
                <div className="p-12 text-center rounded-2xl bg-[#070A14]/60 border border-[#D4AF37]/20 space-y-3">
                  <p className="text-sm font-mono text-[#C4BBA3]">No publications found matching your search.</p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('All');
                    }}
                    className="text-xs font-mono text-[#D4AF37] underline cursor-pointer"
                  >
                    Reset all filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  {filteredPosts.map((post) => (
                    <PerspectiveCard key={post.id} maxTilt={6} scale={1.02}>
                      <div
                        onClick={() => handleSelectPost(post.id)}
                        className="group cursor-pointer rounded-2xl bg-[#070A14]/90 hover:bg-[#0D1427] border border-[#D4AF37]/30 hover:border-[#D4AF37] p-5 sm:p-6 text-left transition-all shadow-lg flex flex-col justify-between h-full space-y-4"
                      >
                        <div className="space-y-3">
                          <div className="h-44 sm:h-48 rounded-xl overflow-hidden border border-[#D4AF37]/20 relative">
                            <img
                              src={post.image}
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#070A14] via-transparent to-transparent opacity-70" />
                            <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-[#050811]/85 border border-[#D4AF37]/35 text-[10px] font-mono text-[#D4AF37] font-semibold">
                              {post.readTime}
                            </div>
                          </div>

                          <span className="text-[10px] font-mono uppercase tracking-wider text-[#D4AF37] font-bold block">
                            {post.category}
                          </span>

                          <h4 className="text-lg sm:text-xl font-playfair font-bold text-white group-hover:text-[#D4AF37] transition-colors line-clamp-2">
                            {post.title}
                          </h4>

                          <p className="text-xs text-[#C4BBA3] line-clamp-3 leading-relaxed">
                            {post.excerpt}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-[#D4AF37]/20 flex items-center justify-between text-xs font-mono text-[#8E8674]">
                          <span className="text-white/80">{post.author}</span>
                          <span className="text-[#D4AF37] font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                            Read Line-by-Line →
                          </span>
                        </div>
                      </div>
                    </PerspectiveCard>
                  ))}
                </div>
              )}
            </div>

            {/* Aastitva Editorial Manifesto */}
            <div className="max-w-4xl mx-auto p-6 sm:p-8 rounded-3xl bg-[#0D1427]/80 border border-[#D4AF37]/30 text-left space-y-3">
              <span className="text-[11px] font-mono text-[#D4AF37] uppercase tracking-widest font-bold block">
                The Aastitva Academic Covenant
              </span>
              <h4 className="text-xl font-playfair font-bold text-white">
                Why We Publish Analytical Dispatches
              </h4>
              <p className="text-xs sm:text-sm text-[#C4BBA3] leading-relaxed">
                Academic diplomacy is more than a 3-day competition. Aastitva Alliance publishes continuous research, policy analyses, and educational frameworks to ensure that delegates, faculty advisors, and institutional leaders have access to actionable intellectual infrastructure year-round.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
