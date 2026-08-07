import React, { useState } from 'react';
import { Settings, Save, Lock, KeyRound, ShieldCheck, Calendar, MapPin, Building, Users, LogOut } from 'lucide-react';
import { SummitConfig } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  config: SummitConfig;
  onUpdateConfig: (newConfig: SummitConfig) => void;
}

export const AdminContentDrawer: React.FC<Props> = ({
  isOpen,
  onClose,
  config,
  onUpdateConfig,
}) => {
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [formData, setFormData] = useState<SummitConfig>({ ...config });
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleAuthenticate = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === 'astitva2026insansadxaequitas') {
      setIsAuthenticated(true);
      setErrorMsg('');
    } else {
      setErrorMsg('Invalid Security Key. Access Restricted.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateConfig(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateVal = e.target.value;
    const timestamp = new Date(dateVal).getTime();
    setFormData((prev) => ({
      ...prev,
      date: new Date(dateVal).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
      targetTimestamp: isNaN(timestamp) ? prev.targetTimestamp : timestamp,
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-md bg-[#1B143A] border-l border-[#D4AF37]/40 text-[#FAF5EF] p-6 h-full overflow-y-auto flex flex-col justify-between shadow-2xl">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#52459E]/40 mb-6">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
              <h3 className="text-lg font-serif font-bold text-[#FAF5EF]">
                Executive Control Hub
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#C4BBA3] hover:text-[#FAF5EF] hover:bg-[#52459E]/30"
            >
              ✕
            </button>
          </div>

          {!isAuthenticated ? (
            /* Security Gate */
            <div className="space-y-6 py-4">
              <div className="bg-[#231B42] border border-[#D4AF37]/30 rounded-2xl p-6 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/40 flex items-center justify-center mx-auto text-[#D4AF37]">
                  <Lock className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-base font-serif font-bold text-[#FAF5EF]">
                    Restricted Access
                  </h4>
                  <p className="text-xs text-[#C4BBA3] mt-1">
                    Only authorized Aastitva Alliance directors with executive credentials can update live summit configuration.
                  </p>
                </div>

                <form onSubmit={handleAuthenticate} className="space-y-4 pt-2">
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-[#D4AF37] absolute left-3 top-3" />
                    <input
                      type="password"
                      placeholder="Enter Admin Passcode..."
                      value={passcode}
                      onChange={(e) => {
                        setPasscode(e.target.value);
                        setErrorMsg('');
                      }}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#140E2A] border border-[#52459E]/50 text-[#FAF5EF] placeholder:text-[#A39B88] text-xs focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  {errorMsg && (
                    <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold">
                      {errorMsg}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F3E5C8] to-[#C4B39C] text-[#140E2A] font-bold text-xs shadow-lg hover:brightness-110 transition-all"
                  >
                    Authenticate Access
                  </button>
                </form>
              </div>

              <div className="p-4 rounded-xl bg-[#231B42]/50 border border-[#52459E]/30 text-[11px] text-[#A39B88] space-y-1">
                <p className="font-semibold text-[#D4AF37]">Security Compliance Protocol:</p>
                <p>Content modification authority is logged under audit key <code className="text-[#FAF5EF]">astitva2026insansadxaequitas</code>.</p>
              </div>
            </div>
          ) : (
            /* Authenticated Editor */
            <div className="space-y-6">
              <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Authenticated Executive Session</span>
                </div>
                <button
                  onClick={() => setIsAuthenticated(false)}
                  className="p-1 hover:text-white transition-colors"
                  title="Lock Session"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                <div>
                  <label className="block text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-1">
                    Summit Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#231B42] border border-[#52459E]/40 text-[#FAF5EF] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Building className="w-3.5 h-3.5" /> Partner School
                  </label>
                  <input
                    type="text"
                    value={formData.partnerSchool}
                    onChange={(e) => setFormData({ ...formData, partnerSchool: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#231B42] border border-[#52459E]/40 text-[#FAF5EF] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> Event Date & Target Timestamp
                  </label>
                  <input
                    type="datetime-local"
                    onChange={handleDateChange}
                    className="w-full px-3 py-2 rounded-lg bg-[#231B42] border border-[#52459E]/40 text-[#FAF5EF] focus:outline-none focus:border-[#D4AF37]"
                  />
                  <p className="text-[11px] text-[#C4BBA3] mt-1">Current Display: {formData.date}</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> Venue Location
                  </label>
                  <input
                    type="text"
                    value={formData.venue}
                    onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#231B42] border border-[#52459E]/40 text-[#FAF5EF] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-1">
                    Banner Announcement Quote
                  </label>
                  <input
                    type="text"
                    value={formData.tagline}
                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#231B42] border border-[#52459E]/40 text-[#FAF5EF] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-1 flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" /> Delegates Registered
                    </label>
                    <input
                      type="number"
                      value={formData.registeredCount}
                      onChange={(e) =>
                        setFormData({ ...formData, registeredCount: parseInt(e.target.value) || 0 })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-[#231B42] border border-[#52459E]/40 text-[#FAF5EF] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-1">
                      Delegate Seat Cap
                    </label>
                    <input
                      type="number"
                      value={formData.totalSeats}
                      onChange={(e) =>
                        setFormData({ ...formData, totalSeats: parseInt(e.target.value) || 0 })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-[#231B42] border border-[#52459E]/40 text-[#FAF5EF] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F3E5C8] to-[#C4B39C] text-[#140E2A] font-bold text-xs shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" /> Deploy Live Changes
                  </button>
                </div>

                {saved && (
                  <div className="p-3 rounded-lg bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs text-center font-semibold animate-fade-in">
                    ✓ Live Summit parameters successfully published across app!
                  </div>
                )}
              </form>
            </div>
          )}
        </div>

        <div className="pt-6 border-t border-[#52459E]/40 text-center text-xs text-[#A39B88]">
          Aastitva CMS Engine • Security Protocol Active
        </div>
      </div>
    </div>
  );
};

