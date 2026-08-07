import React, { useState, useEffect } from 'react';
import { PartnerMailEntry } from '../types';
import {
  Lock,
  Unlock,
  Key,
  Mail,
  Trash2,
  Edit3,
  X,
  Search,
  CheckCircle2,
  AlertCircle,
  Building,
  User,
  Phone,
  Calendar,
  LogOut,
  RefreshCw,
  ShieldCheck,
  PlusCircle,
  Save,
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const DEV_PASSCODE = 'mailsofpartners@2026';
const STORAGE_KEY = 'astitva_partner_mailbox';
const AUTH_SESSION_KEY = 'astitva_dev_partner_authorized';

const SAMPLE_PARTNER_MAILS: PartnerMailEntry[] = [
  {
    id: 'partner-17861001',
    timestamp: '2026-08-07 18:30',
    schoolName: 'Heritage International School, Jammu',
    contactPerson: 'Devansh Sharma (Academic Coordinator)',
    email: 'academics@heritageschooljammu.in',
    phone: '+91 94191 22334',
    eventType: 'Model United Nations (MUN) Executive Board Allocation',
    preferredDate: '2026-10-15',
    message: 'Requesting full Executive Board allocation for 6 committees and Rules of Procedure delegate training workshop.',
    status: 'In Review',
  },
  {
    id: 'partner-17861002',
    timestamp: '2026-08-07 20:15',
    schoolName: 'Delhi Public School, Jammu',
    contactPerson: 'Meenakshi Malhotra (Vice Principal)',
    email: 'viceprincipal@dpsjammu.in',
    phone: '+91 98765 11223',
    eventType: 'Institutional Collaboration & Youth Parliament',
    preferredDate: '2026-11-20',
    message: 'Seeking institutional partner agreement for co-hosting the Jammu Youth Leadership Symposium 2026.',
    status: 'New',
  },
];

export const DeveloperMailboxModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);

  const [mails, setMails] = useState<PartnerMailEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Editing Mail Entry State
  const [editingMail, setEditingMail] = useState<PartnerMailEntry | null>(null);

  // Load Initial Mail Data & Check Auth Session
  useEffect(() => {
    const checkAuth = sessionStorage.getItem(AUTH_SESSION_KEY) === 'true';
    setIsAuthorized(checkAuth);

    const loadMails = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          setMails(JSON.parse(stored));
        } else {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_PARTNER_MAILS));
          setMails(SAMPLE_PARTNER_MAILS);
        }
      } catch (err) {
        setMails(SAMPLE_PARTNER_MAILS);
      }
    };

    if (isOpen) {
      loadMails();
    }

    const handleCustomSubmit = () => loadMails();
    window.addEventListener('astitva_partner_submitted', handleCustomSubmit);
    window.addEventListener('storage', loadMails);

    return () => {
      window.removeEventListener('astitva_partner_submitted', handleCustomSubmit);
      window.removeEventListener('storage', loadMails);
    };
  }, [isOpen]);

  const saveMailsToStorage = (updated: PartnerMailEntry[]) => {
    setMails(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  // Handle Passcode Login
  const handleAuthorize = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === DEV_PASSCODE) {
      setIsAuthorized(true);
      sessionStorage.setItem(AUTH_SESSION_KEY, 'true');
      setPasscodeError('');
      setPasscode('');
    } else {
      setPasscodeError('Invalid Developer Authorization Code. Access Denied.');
    }
  };

  // Revoke Credentials (Lock Mailbox)
  const handleRevokeCredentials = () => {
    setIsAuthorized(false);
    sessionStorage.removeItem(AUTH_SESSION_KEY);
    setPasscode('');
    setPasscodeError('');
  };

  // Delete Individual Entry
  const handleDeleteMail = (id: string) => {
    if (window.confirm('Are you sure you want to delete this partner mail entry?')) {
      const updated = mails.filter((m) => m.id !== id);
      saveMailsToStorage(updated);
    }
  };

  // Save Edit Entry
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMail) return;

    const updated = mails.map((m) => (m.id === editingMail.id ? editingMail : m));
    saveMailsToStorage(updated);
    setEditingMail(null);
  };

  if (!isOpen) return null;

  const filteredMails = mails.filter(
    (m) =>
      m.schoolName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.eventType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#070A14]/90 backdrop-blur-md animate-page-enter">
      <div className="relative w-full max-w-5xl bg-[#0D1427] border border-[#D4AF37]/40 rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-[#243563] flex items-center justify-between bg-[#16203B]/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-serif font-bold text-[#FAF5EF] flex items-center gap-2">
                Developer Mailbox
                <span className="px-2.5 py-0.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] font-bold tracking-wider uppercase">
                  Partner With Us Inquiries
                </span>
              </h2>
              <p className="text-xs text-[#C4BBA3]">
                Strictly dedicated to Institutional & Organizational Partnership registrations.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAuthorized && (
              <button
                onClick={handleRevokeCredentials}
                className="px-3.5 py-1.5 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-bold hover:bg-rose-500/30 transition-all flex items-center gap-1.5"
                title="Lock Mailbox and require developer code again"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Revoke Credentials</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-[#C4BBA3] hover:text-white hover:bg-[#243563] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {!isAuthorized ? (
            /* STEP 1: AUTHORIZATION GATE SCREEN */
            <div className="max-w-md mx-auto py-12 px-6 text-center space-y-6 bg-[#16203B]/40 rounded-2xl border border-[#243563]">
              <div className="w-16 h-16 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] flex items-center justify-center mx-auto shadow-lg">
                <Lock className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-serif font-bold text-[#FAF5EF]">
                  Developer Authentication Required
                </h3>
                <p className="text-xs text-[#C4BBA3] leading-relaxed">
                  Enter the developer authorization code to inspect, manage, edit, and delete partner registrations.
                </p>
              </div>

              <form onSubmit={handleAuthorize} className="space-y-4 text-left">
                <div>
                  <label className="block text-xs font-semibold text-[#D4AF37] mb-1.5 uppercase tracking-wider">
                    Developer Authorization Code
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      value={passcode}
                      onChange={(e) => setPasscode(e.target.value)}
                      placeholder="Enter developer code..."
                      className="w-full px-4 py-3 rounded-xl bg-[#070A14] border border-[#243563] text-white text-sm focus:outline-none focus:border-[#D4AF37] pr-10"
                      required
                    />
                    <Key className="w-4 h-4 text-[#C4BBA3] absolute right-3 top-3.5" />
                  </div>
                </div>

                {passcodeError && (
                  <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{passcodeError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl shimmer-btn text-[#070A14] font-bold text-sm shadow-lg hover:brightness-110 flex items-center justify-center gap-2"
                >
                  <Unlock className="w-4 h-4" />
                  <span>Authorize Access</span>
                </button>
              </form>

              <div className="pt-2 text-[11px] text-[#A39B88]">
                <ShieldCheck className="w-3.5 h-3.5 inline text-emerald-400 mr-1" />
                Protected Developer Gateway • 256-Bit SSL Encrypted Session
              </div>
            </div>
          ) : (
            /* STEP 2: AUTHORIZED DEVELOPER MAILBOX DASHBOARD */
            <div className="space-y-6">
              {/* Search & Actions Ribbon */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#16203B]/40 p-4 rounded-2xl border border-[#243563]">
                <div className="relative w-full sm:w-80">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search partner registrations..."
                    className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#070A14] border border-[#243563] text-xs text-white placeholder-[#768074] focus:outline-none focus:border-[#D4AF37]"
                  />
                  <Search className="w-4 h-4 text-[#C4BBA3] absolute left-3 top-2.5" />
                </div>

                <div className="flex items-center gap-3 text-xs text-[#C4BBA3]">
                  <span className="px-3 py-1.5 rounded-xl bg-[#070A14] border border-[#243563] text-[#D4AF37] font-semibold">
                    Total Inquiries: <strong className="text-white">{filteredMails.length}</strong>
                  </span>
                  <button
                    onClick={() => {
                      const stored = localStorage.getItem(STORAGE_KEY);
                      if (stored) setMails(JSON.parse(stored));
                    }}
                    className="p-2 rounded-xl bg-[#070A14] border border-[#243563] hover:text-[#D4AF37] transition-colors"
                    title="Refresh Mailbox"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Mails List */}
              {filteredMails.length === 0 ? (
                <div className="py-16 text-center space-y-3 bg-[#16203B]/20 rounded-2xl border border-[#243563]/50">
                  <Mail className="w-12 h-12 text-[#C4BBA3]/40 mx-auto" />
                  <h4 className="text-lg font-serif font-bold text-[#FAF5EF]">
                    No Partner Inquiries Found
                  </h4>
                  <p className="text-xs text-[#C4BBA3] max-w-sm mx-auto">
                    Submissions from the "Partner With Us" form will appear here in real time.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {filteredMails.map((mail) => (
                    <div
                      key={mail.id}
                      className="glass-card rounded-2xl p-5 border border-[#243563] hover:border-[#D4AF37]/50 transition-all space-y-4"
                    >
                      {/* Card Top Ribbon */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#243563]/60">
                        <div className="flex items-center gap-2.5">
                          <Building className="w-4 h-4 text-[#D4AF37] shrink-0" />
                          <h3 className="text-base font-serif font-bold text-[#FAF5EF]">
                            {mail.schoolName}
                          </h3>
                        </div>

                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              mail.status === 'New'
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                                : mail.status === 'In Review'
                                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                                : mail.status === 'Approved'
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                : 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                            }`}
                          >
                            {mail.status}
                          </span>

                          <span className="text-[11px] text-[#768074] flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> {mail.timestamp}
                          </span>
                        </div>
                      </div>

                      {/* Card Main Info Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-wider block">
                            Contact Representative
                          </span>
                          <span className="text-white font-medium flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5 text-[#C4BBA3]" /> {mail.contactPerson}
                          </span>
                        </div>

                        <div className="space-y-1">
                          <span className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-wider block">
                            Email & Phone
                          </span>
                          <span className="text-[#C4BBA3] block">{mail.email}</span>
                          <span className="text-[#C4BBA3] block">{mail.phone}</span>
                        </div>

                        <div className="space-y-1 sm:col-span-2 md:col-span-1">
                          <span className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-wider block">
                            Partnership Scope / Event Type
                          </span>
                          <span className="text-emerald-300 font-semibold">{mail.eventType}</span>
                        </div>
                      </div>

                      {/* Message / Scope Detail */}
                      {mail.message && (
                        <div className="p-3 rounded-xl bg-[#070A14]/70 border border-[#243563] text-xs text-[#C4BBA3] leading-relaxed">
                          <strong className="text-white font-semibold block mb-1">
                            Scope & Directives:
                          </strong>
                          {mail.message}
                        </div>
                      )}

                      {/* Card Action Toolbar */}
                      <div className="pt-2 flex items-center justify-end gap-2 border-t border-[#243563]/40">
                        <button
                          onClick={() => setEditingMail({ ...mail })}
                          className="px-3 py-1.5 rounded-xl bg-[#16203B] hover:bg-[#243563] text-xs font-semibold text-[#D4AF37] border border-[#243563] transition-colors flex items-center gap-1.5"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit Mail Entry</span>
                        </button>

                        <button
                          onClick={() => handleDeleteMail(mail.id)}
                          className="px-3 py-1.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-xs font-semibold text-rose-300 border border-rose-500/30 transition-colors flex items-center gap-1.5"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-[#243563] bg-[#16203B]/60 flex items-center justify-between text-xs text-[#C4BBA3]">
          <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>Protected Developer Gateway • 256-Bit Encrypted Session</span>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-[#243563] text-white font-semibold hover:bg-[#324887] transition-colors"
          >
            Close Dashboard
          </button>
        </div>
      </div>

      {/* EDIT MAIL ENTRY MODAL SUB-VIEW */}
      {editingMail && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-[#070A14]/95 backdrop-blur-md">
          <div className="w-full max-w-lg bg-[#0D1427] border border-[#D4AF37]/50 rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#243563]">
              <h3 className="text-lg font-serif font-bold text-[#FAF5EF] flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-[#D4AF37]" /> Edit Partner Mail Entry
              </h3>
              <button
                onClick={() => setEditingMail(null)}
                className="text-[#C4BBA3] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-3 text-xs">
              <div>
                <label className="block text-[#D4AF37] font-semibold mb-1">School / Institution Name</label>
                <input
                  type="text"
                  value={editingMail.schoolName}
                  onChange={(e) => setEditingMail({ ...editingMail, schoolName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#070A14] border border-[#243563] text-white focus:outline-none focus:border-[#D4AF37]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#D4AF37] font-semibold mb-1">Contact Representative</label>
                  <input
                    type="text"
                    value={editingMail.contactPerson}
                    onChange={(e) => setEditingMail({ ...editingMail, contactPerson: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#070A14] border border-[#243563] text-white focus:outline-none focus:border-[#D4AF37]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[#D4AF37] font-semibold mb-1">Contact Phone</label>
                  <input
                    type="text"
                    value={editingMail.phone}
                    onChange={(e) => setEditingMail({ ...editingMail, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#070A14] border border-[#243563] text-white focus:outline-none focus:border-[#D4AF37]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#D4AF37] font-semibold mb-1">Email Address</label>
                <input
                  type="email"
                  value={editingMail.email}
                  onChange={(e) => setEditingMail({ ...editingMail, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#070A14] border border-[#243563] text-white focus:outline-none focus:border-[#D4AF37]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#D4AF37] font-semibold mb-1">Partnership / Event Type</label>
                  <input
                    type="text"
                    value={editingMail.eventType}
                    onChange={(e) => setEditingMail({ ...editingMail, eventType: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#070A14] border border-[#243563] text-white focus:outline-none focus:border-[#D4AF37]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[#D4AF37] font-semibold mb-1">Status Tag</label>
                  <select
                    value={editingMail.status}
                    onChange={(e) =>
                      setEditingMail({
                        ...editingMail,
                        status: e.target.value as 'New' | 'In Review' | 'Approved' | 'Contacted',
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-[#070A14] border border-[#243563] text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="New">New</option>
                    <option value="In Review">In Review</option>
                    <option value="Approved">Approved</option>
                    <option value="Contacted">Contacted</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#D4AF37] font-semibold mb-1">Scope & Directives Message</label>
                <textarea
                  rows={3}
                  value={editingMail.message}
                  onChange={(e) => setEditingMail({ ...editingMail, message: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#070A14] border border-[#243563] text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingMail(null)}
                  className="px-4 py-2 rounded-xl bg-[#16203B] text-white font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl shimmer-btn text-[#070A14] font-bold flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Mail Entry</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
