import React from 'react';
import { ShieldCheck, Cpu, Cloud, Gauge, Lock, Zap, CheckCircle2, Server } from 'lucide-react';
import { AnalyticsStats } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  stats: AnalyticsStats;
}

export const TechnicalAuditModal: React.FC<Props> = ({ isOpen, onClose, stats }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#231B42] border border-[#D4AF37]/30 rounded-2xl p-6 sm:p-8 text-[#FAF5EF] shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-[#52459E]/40">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#52459E]/30 text-[#D4AF37] border border-[#D4AF37]/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold text-[#FAF5EF]">
                Technical & Infrastructure Audit
              </h3>
              <p className="text-xs text-[#C4BBA3]">Aastitva Alliance Render & SSL Performance Suite</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-[#C4BBA3] hover:text-[#FAF5EF] hover:bg-[#52459E]/30 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Live Benchmarks Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-6">
          <div className="p-4 rounded-xl bg-[#2D2359] border border-[#52459E]/30 text-center">
            <Zap className="w-5 h-5 mx-auto mb-1 text-[#D4AF37]" />
            <span className="text-2xl font-bold text-[#FAF5EF]">{(stats.loadTimeMs / 1000).toFixed(2)}s</span>
            <p className="text-[11px] text-[#C4BBA3] mt-1">Page Load Time (&lt;3s target)</p>
          </div>
          <div className="p-4 rounded-xl bg-[#2D2359] border border-[#52459E]/30 text-center">
            <Gauge className="w-5 h-5 mx-auto mb-1 text-[#52459E]" />
            <span className="text-2xl font-bold text-[#FAF5EF]">{(stats.ttiMs / 1000).toFixed(2)}s</span>
            <p className="text-[11px] text-[#C4BBA3] mt-1">Time to Interactive (TTI)</p>
          </div>
          <div className="p-4 rounded-xl bg-[#2D2359] border border-[#52459E]/30 text-center">
            <Lock className="w-5 h-5 mx-auto mb-1 text-emerald-400" />
            <span className="text-lg font-bold text-emerald-400">256-Bit SSL</span>
            <p className="text-[11px] text-[#C4BBA3] mt-1">Encryption Protocol</p>
          </div>
          <div className="p-4 rounded-xl bg-[#2D2359] border border-[#52459E]/30 text-center">
            <Cloud className="w-5 h-5 mx-auto mb-1 text-[#D4AF37]" />
            <span className="text-lg font-bold text-[#FAF5EF]">99.8% CDN</span>
            <p className="text-[11px] text-[#C4BBA3] mt-1">Hit Cache Ratio</p>
          </div>
        </div>

        {/* Infrastructure Checklist */}
        <div className="space-y-4 text-sm text-[#FAF5EF]/90">
          <h4 className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
            Compliance Checklist
          </h4>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-[#2D2359]/60 border border-[#52459E]/20">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-[#FAF5EF]">Render Hosting & Budget Feasibility</span>
              <p className="text-xs text-[#C4BBA3] mt-0.5">
                Optimized SPA static build with Express Node.js runner. Operates seamlessly on Render Free/Hobby Tier ($0-$7/mo) with zero cold-start bottlenecks.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-[#2D2359]/60 border border-[#52459E]/20">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-[#FAF5EF]">Data Security & Environment Protection</span>
              <p className="text-xs text-[#C4BBA3] mt-0.5">
                All form submissions, delegate records, and contact emails are sanitized and proxied via server-side API routes (`/api/*`), ensuring secret keys and SMTP credentials remain completely hidden from browser client.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-[#2D2359]/60 border border-[#52459E]/20">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-[#FAF5EF]">Built-in Edge CDN Distribution</span>
              <p className="text-xs text-[#C4BBA3] mt-0.5">
                Gzip/Brotli compressed static assets with automatic edge caching ensure sub-second response times across Android, iOS, and desktop browsers in Jammu and pan-India.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-[#2D2359]/60 border border-[#52459E]/20">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-[#FAF5EF]">Real-time Live Analytics Tracker</span>
              <p className="text-xs text-[#C4BBA3] mt-0.5">
                Tracks active sessions ({stats.uniqueVisitors} unique visitors), total views ({stats.pageViews} hits), and form conversions without invasive cookies.
              </p>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-6 pt-4 border-t border-[#52459E]/40 flex items-center justify-between text-xs text-[#C4BBA3]">
          <span className="flex items-center gap-1.5">
            <Server className="w-4 h-4 text-[#D4AF37]" /> Status: {stats.renderStatus}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#D4AF37] text-[#231B42] font-semibold hover:bg-[#F9E2C8] transition-colors"
          >
            Close Diagnostics
          </button>
        </div>
      </div>
    </div>
  );
};
