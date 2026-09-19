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
  Save,
  Sparkles,
  Award,
  Quote,
  Copy,
  Check,
  Compass,
  GraduationCap,
  Trophy,
  Filter,
} from 'lucide-react';
import {
  loadAllMailboxEntries,
  getLocalMailboxEntries,
  updateMailboxEntryStatus,
  deleteMailboxEntry,
  saveEntryToMailbox,
  DEV_PASSCODE,
  STORAGE_KEY,
  AUTH_SESSION_KEY,
  SAMPLE_PARTNER_MAILS,
} from '../utils/mailboxApi';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface ParsedDelegateInfo {
  isDelegate: boolean;
  trackingId?: string;
  delegateName?: string;
  email?: string;
  phone?: string;
  institution?: string;
  division?: string;
  priorExperience?: string;
  accolades?: string;
  firstChoiceCommittee?: string;
  firstChoicePortfolio?: string;
  secondChoiceCommittee?: string;
  secondChoicePortfolio?: string;
  thirdChoiceCommittee?: string;
  thirdChoicePortfolio?: string;
  statementOfPurpose?: string;
}

function parseDelegateMessage(mail: PartnerMailEntry): ParsedDelegateInfo {
  const msg = mail.message || '';
  const isDelegate =
    mail.id.startsWith('AEQ-') ||
    msg.includes('[DELEGATE APPLICATION') ||
    msg.includes('[QUICK REGISTRATION') ||
    msg.includes('DELEGATE REGISTRATION') ||
    mail.eventType.toLowerCase().includes('delegate');

  if (!isDelegate) {
    return { isDelegate: false };
  }

  const getField = (pattern: RegExp): string => {
    const match = msg.match(pattern);
    return match && match[1] ? match[1].trim() : '';
  };

  const trackingId = mail.id || getField(/\[(?:DELEGATE APPLICATION|QUICK REGISTRATION) - ([^\]]+)\]/i);

  let delegateName = getField(/(?:Delegate Name|Delegate):\s*([^\n\r]+)/i);
  if (!delegateName) {
    const nameMatch = mail.contactPerson.match(/^([^(]+)/);
    delegateName = nameMatch ? nameMatch[1].trim() : mail.contactPerson;
  }

  const institution = getField(/Institution:\s*([^\n\r]+)/i) || mail.schoolName;

  let division = getField(/(?:Academic Division|Division|Grade):\s*([^\n\r]+)/i);
  if (!division) {
    const gradeMatch = mail.contactPerson.match(/\(([^)]+)\)/);
    if (gradeMatch) division = gradeMatch[1];
  }

  const priorExperience = getField(/(?:Prior MUN Experience|Experience):\s*([^\n\r]+)/i);
  const accolades = getField(/Honors \/ Accolades:\s*([^\n\r]+)/i);

  let firstChoiceCommittee = '';
  let firstChoicePortfolio = '';
  const firstChoiceMatch = msg.match(/1st Choice(?: Committee)?:\s*([^\n\r]+)/i);
  if (firstChoiceMatch) {
    const rawFirst = firstChoiceMatch[1].trim();
    const prefMatch = rawFirst.match(/(.*?)(?:\(Preferred:\s*([^)]+)\)|\[([^\]]+)\])/i);
    if (prefMatch) {
      firstChoiceCommittee = prefMatch[1].trim();
      firstChoicePortfolio = (prefMatch[2] || prefMatch[3] || '').trim();
    } else {
      firstChoiceCommittee = rawFirst;
    }
  }

  let secondChoiceCommittee = '';
  let secondChoicePortfolio = '';
  const secondChoiceMatch = msg.match(/2nd Choice(?: Committee)?:\s*([^\n\r]+)/i);
  if (secondChoiceMatch) {
    const rawSecond = secondChoiceMatch[1].trim();
    const prefMatch = rawSecond.match(/(.*?)(?:\(Preferred:\s*([^)]+)\)|\[([^\]]+)\])/i);
    if (prefMatch) {
      secondChoiceCommittee = prefMatch[1].trim();
      secondChoicePortfolio = (prefMatch[2] || prefMatch[3] || '').trim();
    } else {
      secondChoiceCommittee = rawSecond;
    }
  }

  let thirdChoiceCommittee = '';
  let thirdChoicePortfolio = '';
  const thirdChoiceMatch = msg.match(/3rd Choice(?: Committee)?:\s*([^\n\r]+)/i);
  if (thirdChoiceMatch) {
    const rawThird = thirdChoiceMatch[1].trim();
    const prefMatch = rawThird.match(/(.*?)(?:\(Preferred:\s*([^)]+)\)|\[([^\]]+)\])/i);
    if (prefMatch) {
      thirdChoiceCommittee = prefMatch[1].trim();
      thirdChoicePortfolio = (prefMatch[2] || prefMatch[3] || '').trim();
    } else {
      thirdChoiceCommittee = rawThird;
    }
  }

  let statementOfPurpose = '';
  const sopIndex = msg.indexOf('Statement of Purpose:');
  if (sopIndex !== -1) {
    statementOfPurpose = msg.substring(sopIndex + 'Statement of Purpose:'.length).trim();
  }

  return {
    isDelegate: true,
    trackingId,
    delegateName,
    email: mail.email,
    phone: mail.phone,
    institution,
    division,
    priorExperience,
    accolades: accolades && accolades.toLowerCase() !== 'none' ? accolades : undefined,
    firstChoiceCommittee,
    firstChoicePortfolio,
    secondChoiceCommittee,
    secondChoicePortfolio,
    thirdChoiceCommittee,
    thirdChoicePortfolio,
    statementOfPurpose,
  };
}

export const DeveloperMailboxModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);

  const [mails, setMails] = useState<PartnerMailEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'delegates' | 'partners'>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Editing Mail Entry State
  const [editingMail, setEditingMail] = useState<PartnerMailEntry | null>(null);

  const [isSyncing, setIsSyncing] = useState(false);

  // Load Initial Mail Data & Check Auth Session
  useEffect(() => {
    const checkAuth = sessionStorage.getItem(AUTH_SESSION_KEY) === 'true';
    setIsAuthorized(checkAuth);

    const loadMails = async () => {
      // 1. Instantly display local cache so there's zero lag
      const local = getLocalMailboxEntries();
      setMails(local);

      // 2. Fetch live persistent database from server on Render and merge
      try {
        setIsSyncing(true);
        const liveMails = await loadAllMailboxEntries();
        setMails(liveMails);
      } catch (err) {
        console.error('Mailbox sync error:', err);
      } finally {
        setIsSyncing(false);
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

  // Delete Individual Entry (Syncs to server & local storage)
  const handleDeleteMail = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this registration / mail entry?')) {
      const updated = await deleteMailboxEntry(id);
      setMails(updated);
    }
  };

  // Quick Update Status (Syncs to server & local storage)
  const handleQuickStatusChange = async (id: string, newStatus: PartnerMailEntry['status']) => {
    const updated = await updateMailboxEntryStatus(id, newStatus);
    setMails(updated);
  };

  // Save Edit Entry (Syncs to server & local storage)
  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMail) return;

    await saveEntryToMailbox(editingMail);
    const updated = mails.map((m) => (m.id === editingMail.id ? editingMail : m));
    setMails(updated);
    setEditingMail(null);
  };

  // Copy Dossier
  const handleCopySummary = (mail: PartnerMailEntry, parsed: ParsedDelegateInfo) => {
    let summaryText = '';
    if (parsed.isDelegate) {
      summaryText = `[AEQUITAS SUMMIT DELEGATE ALLOTMENT DOSSIER]
Application ID: ${parsed.trackingId || mail.id}
Delegate Name: ${parsed.delegateName}
Institution: ${parsed.institution}
Academic Division: ${parsed.division || 'N/A'}
Experience Level: ${parsed.priorExperience || 'N/A'}
Email: ${mail.email}
Phone: ${mail.phone}
1st Choice Committee: ${parsed.firstChoiceCommittee || 'N/A'} (Preferred Portfolio: ${parsed.firstChoicePortfolio || 'Open Allocation'})
2nd Choice Committee: ${parsed.secondChoiceCommittee || 'N/A'} (Preferred Portfolio: ${parsed.secondChoicePortfolio || 'Open Allocation'})
3rd Choice Committee: ${parsed.thirdChoiceCommittee || 'N/A'} (Preferred Portfolio: ${parsed.thirdChoicePortfolio || 'Open Allocation'})
${parsed.accolades ? `Honors / Accolades: ${parsed.accolades}\n` : ''}${parsed.statementOfPurpose ? `Statement of Purpose:\n"${parsed.statementOfPurpose}"\n` : ''}Registration Timestamp: ${mail.timestamp}
Current Status: ${mail.status}`;
    } else {
      summaryText = `[INSTITUTIONAL PARTNER INQUIRY]
Inquiry ID: ${mail.id}
School / Organization: ${mail.schoolName}
Contact Representative: ${mail.contactPerson}
Email: ${mail.email}
Phone: ${mail.phone}
Scope / Event Type: ${mail.eventType}
Directives / Message:
${mail.message}
Registration Timestamp: ${mail.timestamp}
Current Status: ${mail.status}`;
    }

    navigator.clipboard.writeText(summaryText);
    setCopiedId(mail.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!isOpen) return null;

  // Filter logic
  const filteredMails = mails.filter((m) => {
    const parsed = parseDelegateMessage(m);

    // Type filter
    if (typeFilter === 'delegates' && !parsed.isDelegate) return false;
    if (typeFilter === 'partners' && parsed.isDelegate) return false;

    // Status filter
    if (statusFilter !== 'all' && m.status !== statusFilter) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchBasic =
        m.schoolName.toLowerCase().includes(q) ||
        m.contactPerson.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        m.phone.toLowerCase().includes(q) ||
        m.eventType.toLowerCase().includes(q) ||
        m.message.toLowerCase().includes(q);

      const matchDelegate =
        parsed.delegateName?.toLowerCase().includes(q) ||
        parsed.firstChoiceCommittee?.toLowerCase().includes(q) ||
        parsed.firstChoicePortfolio?.toLowerCase().includes(q) ||
        parsed.secondChoiceCommittee?.toLowerCase().includes(q) ||
        parsed.secondChoicePortfolio?.toLowerCase().includes(q);

      return matchBasic || Boolean(matchDelegate);
    }

    return true;
  });

  const totalDelegates = mails.filter((m) => parseDelegateMessage(m).isDelegate).length;
  const totalPartners = mails.length - totalDelegates;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#070A14]/90 backdrop-blur-md animate-page-enter">
      <div className="relative w-full max-w-5xl bg-[#0D1427] border border-[#D4AF37]/40 rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="px-5 sm:px-7 py-4.5 border-b border-[#243563] flex items-center justify-between bg-[#16203B]/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shadow-md shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-[#FAF5EF] flex items-center gap-2">
                Developer Mailbox & Secretariat Desk
              </h2>
              <p className="text-xs text-[#C4BBA3]">
                Centralized registry for Aequitas Summit Delegate applications & Institutional Partnerships.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {isAuthorized && (
              <>
                <button
                  onClick={() => {
                    sessionStorage.removeItem('astitva_site_unlocked');
                    window.dispatchEvent(new Event('astitva_lock_site'));
                    onClose();
                  }}
                  className="px-3 py-1.5 rounded-xl bg-[#070A14] text-[#D4AF37] border border-[#D4AF37]/40 text-xs font-bold hover:bg-[#16203B] transition-all flex items-center gap-1.5 cursor-pointer"
                  title="Lock main website back into Coming Soon mode for visitors"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Lock to Coming Soon</span>
                </button>
                <button
                  onClick={handleRevokeCredentials}
                  className="px-3 py-1.5 rounded-xl bg-rose-500/15 text-rose-300 border border-rose-500/40 text-xs font-bold hover:bg-rose-500/25 transition-all flex items-center gap-1.5 cursor-pointer"
                  title="Lock Mailbox and require developer code again"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Lock Desk</span>
                </button>
              </>
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
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-5">
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
                  Enter the developer authorization code to inspect, filter, verify, and manage all registrations and delegate dossiers.
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
            <div className="space-y-5">
              {/* Search, Filter Pills & Stats Ribbon */}
              <div className="flex flex-col gap-3.5 bg-[#16203B]/45 p-4 rounded-2xl border border-[#243563]">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  {/* Search Bar */}
                  <div className="relative flex-1 sm:max-w-md">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search delegate name, school, email, committee..."
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#070A14] border border-[#243563] text-xs text-white placeholder-[#768074] focus:outline-none focus:border-[#D4AF37]"
                    />
                    <Search className="w-4 h-4 text-[#C4BBA3] absolute left-3 top-3" />
                  </div>

                  {/* Actions & Refresh */}
                  <div className="flex items-center gap-2 self-end sm:self-auto text-xs text-[#C4BBA3]">
                    <span className="px-3 py-1.5 rounded-xl bg-[#070A14] border border-[#243563] text-[#D4AF37] font-semibold">
                      Showing: <strong className="text-white">{filteredMails.length}</strong> / {mails.length}
                    </span>
                    <button
                      onClick={async () => {
                        setIsSyncing(true);
                        try {
                          const live = await loadAllMailboxEntries();
                          setMails(live);
                        } finally {
                          setIsSyncing(false);
                        }
                      }}
                      className="px-3 py-1.5 rounded-xl bg-[#070A14] border border-[#243563] hover:text-[#D4AF37] hover:border-[#D4AF37]/40 transition-all flex items-center gap-1.5 cursor-pointer"
                      title="Sync live records from server disk"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-[#D4AF37]' : ''}`} />
                      <span className="text-[11px] font-mono">{isSyncing ? 'Syncing...' : 'Sync Live'}</span>
                    </button>
                  </div>
                </div>

                {/* Filter Tabs Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-[#243563]/50">
                  {/* Category Pills */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setTypeFilter('all')}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                        typeFilter === 'all'
                          ? 'bg-[#D4AF37] text-[#070A14]'
                          : 'bg-[#070A14] text-[#C4BBA3] hover:text-white border border-[#243563]'
                      }`}
                    >
                      All Records ({mails.length})
                    </button>
                    <button
                      onClick={() => setTypeFilter('delegates')}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                        typeFilter === 'delegates'
                          ? 'bg-[#D4AF37] text-[#070A14]'
                          : 'bg-[#070A14] text-[#C4BBA3] hover:text-white border border-[#243563]'
                      }`}
                    >
                      <GraduationCap className="w-3.5 h-3.5" />
                      <span>Delegates ({totalDelegates})</span>
                    </button>
                    <button
                      onClick={() => setTypeFilter('partners')}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                        typeFilter === 'partners'
                          ? 'bg-[#D4AF37] text-[#070A14]'
                          : 'bg-[#070A14] text-[#C4BBA3] hover:text-white border border-[#243563]'
                      }`}
                    >
                      <Building className="w-3.5 h-3.5" />
                      <span>Partners ({totalPartners})</span>
                    </button>
                  </div>

                  {/* Status Dropdown Filter */}
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-[#A39B88] font-mono text-[11px] flex items-center gap-1">
                      <Filter className="w-3 h-3" /> Status:
                    </span>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-2.5 py-1 rounded-lg bg-[#070A14] border border-[#243563] text-xs text-[#FAF5EF] focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="all">All Statuses</option>
                      <option value="New">New</option>
                      <option value="In Review">In Review</option>
                      <option value="Approved">Approved</option>
                      <option value="Contacted">Contacted</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Mails & Applications List */}
              {filteredMails.length === 0 ? (
                <div className="py-16 text-center space-y-3 bg-[#16203B]/20 rounded-2xl border border-[#243563]/50">
                  <Mail className="w-12 h-12 text-[#C4BBA3]/40 mx-auto" />
                  <h4 className="text-lg font-serif font-bold text-[#FAF5EF]">
                    No Registrations Found
                  </h4>
                  <p className="text-xs text-[#C4BBA3] max-w-sm mx-auto">
                    {searchQuery || typeFilter !== 'all' || statusFilter !== 'all'
                      ? 'No inquiries match your current search or filter criteria. Try clearing filters.'
                      : 'Submissions from the registration portal and partner desk will appear here in real time.'}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredMails.map((mail) => {
                    const parsed = parseDelegateMessage(mail);

                    return (
                      <div
                        key={mail.id}
                        className={`rounded-2xl p-5 sm:p-6 transition-all space-y-4 border ${
                          parsed.isDelegate
                            ? 'bg-gradient-to-br from-[#0D1427]/95 via-[#070A14]/95 to-[#0A0F1D]/95 border-[#D4AF37]/35 hover:border-[#D4AF37]/70 shadow-lg'
                            : 'bg-[#0B1020]/90 border-[#243563] hover:border-sky-500/50'
                        }`}
                      >
                        {/* CARD TOP HEADER: Category badge, Tracking ID, Status, Timestamp */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3.5 border-b border-[#243563]/60">
                          <div className="flex items-center flex-wrap gap-2">
                            {parsed.isDelegate ? (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/40">
                                <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                                Aequitas Summit Delegate
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-sky-500/15 text-sky-300 border border-sky-500/40">
                                <Building className="w-3 h-3 text-sky-400" />
                                Institutional Partner Inquiry
                              </span>
                            )}

                            <span className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-[#16203B] text-[#C4BBA3] border border-[#243563]">
                              {mail.id}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 self-start sm:self-auto">
                            {/* Status Selector Pill */}
                            <select
                              value={mail.status}
                              onChange={(e) =>
                                handleQuickStatusChange(
                                  mail.id,
                                  e.target.value as PartnerMailEntry['status']
                                )
                              }
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider cursor-pointer focus:outline-none ${
                                mail.status === 'New'
                                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                                  : mail.status === 'In Review'
                                  ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                                  : mail.status === 'Approved'
                                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                  : 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                              }`}
                            >
                              <option value="New" className="bg-[#070A14] text-amber-300">
                                Status: New
                              </option>
                              <option value="In Review" className="bg-[#070A14] text-blue-300">
                                Status: In Review
                              </option>
                              <option value="Approved" className="bg-[#070A14] text-emerald-300">
                                Status: Approved
                              </option>
                              <option value="Contacted" className="bg-[#070A14] text-purple-300">
                                Status: Contacted
                              </option>
                            </select>

                            <span className="text-[11px] text-[#768074] flex items-center gap-1 font-mono">
                              <Calendar className="w-3 h-3" /> {mail.timestamp}
                            </span>
                          </div>
                        </div>

                        {/* IDENTITY & ACADEMIC DOSSIER */}
                        {parsed.isDelegate ? (
                          <div className="space-y-3.5">
                            {/* Delegate Name & Institution */}
                            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                              <div>
                                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#FAF5EF]">
                                  {parsed.delegateName}
                                </h3>
                                <div className="flex items-center flex-wrap gap-2 mt-1">
                                  <span className="text-xs text-[#C4BBA3] flex items-center gap-1.5 font-medium">
                                    <Building className="w-3.5 h-3.5 text-[#D4AF37]" />
                                    {parsed.institution}
                                  </span>
                                  {parsed.division && (
                                    <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                                      {parsed.division}
                                    </span>
                                  )}
                                  {parsed.priorExperience && (
                                    <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-amber-500/15 text-amber-300 border border-amber-500/30">
                                      {parsed.priorExperience}
                                    </span>
                                  )}
                                </div>
                              </div>

                              {/* Clickable Quick Contact Pills */}
                              <div className="flex items-center flex-wrap gap-2 mt-2 sm:mt-0">
                                <a
                                  href={`mailto:${mail.email}`}
                                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#070A14] border border-[#243563] hover:border-[#D4AF37] text-xs text-[#DDD6FE] transition-colors"
                                  title="Send Email to Delegate"
                                >
                                  <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
                                  <span>{mail.email}</span>
                                </a>
                                <a
                                  href={`tel:${mail.phone}`}
                                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#070A14] border border-[#243563] hover:border-emerald-500/60 text-xs text-emerald-300 transition-colors"
                                  title="Call or WhatsApp Delegate"
                                >
                                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                                  <span>{mail.phone}</span>
                                </a>
                              </div>
                            </div>

                            {/* COMMITTEE ALLOCATIONS & PREFERENCES (Triple Column Grid) */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                              {/* 1st Choice */}
                              <div className="p-3.5 rounded-xl bg-[#16203B]/60 border border-[#D4AF37]/45 space-y-1.5 relative overflow-hidden">
                                <div className="flex items-center justify-between">
                                  <span className="text-[10px] font-mono uppercase font-bold text-[#D4AF37] tracking-wider flex items-center gap-1">
                                    <Award className="w-3 h-3 text-[#D4AF37]" />
                                    1st Preference (Primary)
                                  </span>
                                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#D4AF37]/20 text-[#D4AF37]">
                                    Top Choice
                                  </span>
                                </div>
                                <p className="text-xs font-bold text-white leading-snug">
                                  {parsed.firstChoiceCommittee || 'Not specified'}
                                </p>
                                <p className="text-[11px] text-[#C4BBA3]">
                                  <span className="text-[#A39B88]">Portfolio: </span>
                                  <strong className="text-amber-200">
                                    {parsed.firstChoicePortfolio || 'Open Allocation'}
                                  </strong>
                                </p>
                              </div>

                              {/* 2nd Choice */}
                              <div className="p-3.5 rounded-xl bg-[#0D1427]/70 border border-[#243563] space-y-1.5 relative overflow-hidden">
                                <div className="flex items-center justify-between">
                                  <span className="text-[10px] font-mono uppercase font-bold text-[#A39B88] tracking-wider flex items-center gap-1">
                                    <Compass className="w-3 h-3 text-[#A39B88]" />
                                    2nd Preference (Alternate)
                                  </span>
                                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#243563]/60 text-[#C4BBA3]">
                                    Alternate
                                  </span>
                                </div>
                                <p className="text-xs font-bold text-[#DDD6FE] leading-snug">
                                  {parsed.secondChoiceCommittee || 'None specified'}
                                </p>
                                <p className="text-[11px] text-[#C4BBA3]">
                                  <span className="text-[#A39B88]">Portfolio: </span>
                                  <strong className="text-sky-200">
                                    {parsed.secondChoicePortfolio || 'Open Allocation'}
                                  </strong>
                                </p>
                              </div>

                              {/* 3rd Choice */}
                              <div className="p-3.5 rounded-xl bg-[#1A0B2E]/60 border border-purple-500/35 space-y-1.5 relative overflow-hidden">
                                <div className="flex items-center justify-between">
                                  <span className="text-[10px] font-mono uppercase font-bold text-purple-300 tracking-wider flex items-center gap-1">
                                    <CheckCircle2 className="w-3 h-3 text-purple-400" />
                                    3rd Preference (Tertiary)
                                  </span>
                                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300">
                                    Contingency
                                  </span>
                                </div>
                                <p className="text-xs font-bold text-purple-200 leading-snug">
                                  {parsed.thirdChoiceCommittee || 'None specified'}
                                </p>
                                <p className="text-[11px] text-[#C4BBA3]">
                                  <span className="text-[#A39B88]">Portfolio: </span>
                                  <strong className="text-purple-300">
                                    {parsed.thirdChoicePortfolio || 'Open Allocation'}
                                  </strong>
                                </p>
                              </div>
                            </div>

                            {/* Honors / Accolades Banner (if present) */}
                            {parsed.accolades && (
                              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-2.5 text-xs text-amber-200">
                                <Trophy className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                                <div>
                                  <strong className="text-white block text-[10px] uppercase font-mono tracking-wider mb-0.5">
                                    Honors & Prior MUN Accolades:
                                  </strong>
                                  <p className="text-[#FAF5EF]/90">{parsed.accolades}</p>
                                </div>
                              </div>
                            )}

                            {/* Statement of Purpose & Academic Motivation (if present) */}
                            {parsed.statementOfPurpose && (
                              <div className="p-3.5 sm:p-4 rounded-xl bg-[#050811]/90 border-l-3 border-l-[#D4AF37] border-y border-r border-[#243563] space-y-1.5">
                                <div className="flex items-center gap-2 text-[10px] font-mono uppercase font-bold text-[#D4AF37] tracking-wider">
                                  <Quote className="w-3.5 h-3.5 text-[#D4AF37]" />
                                  <span>Statement of Purpose & Academic Motivation</span>
                                </div>
                                <p className="text-xs text-[#FAF5EF]/90 italic leading-relaxed whitespace-pre-wrap">
                                  "{parsed.statementOfPurpose}"
                                </p>
                              </div>
                            )}
                          </div>
                        ) : (
                          /* INSTITUTIONAL PARTNER INQUIRY LAYOUT */
                          <div className="space-y-3.5">
                            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                              <div>
                                <h3 className="text-lg sm:text-xl font-serif font-bold text-[#FAF5EF]">
                                  {mail.schoolName}
                                </h3>
                                <p className="text-xs text-[#C4BBA3] flex items-center gap-1.5 mt-0.5">
                                  <User className="w-3.5 h-3.5 text-[#D4AF37]" />
                                  <span>{mail.contactPerson}</span>
                                </p>
                              </div>

                              <div className="flex items-center flex-wrap gap-2 mt-2 sm:mt-0">
                                <a
                                  href={`mailto:${mail.email}`}
                                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#070A14] border border-[#243563] hover:border-[#D4AF37] text-xs text-[#DDD6FE] transition-colors"
                                >
                                  <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
                                  <span>{mail.email}</span>
                                </a>
                                <a
                                  href={`tel:${mail.phone}`}
                                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#070A14] border border-[#243563] hover:border-emerald-500/60 text-xs text-emerald-300 transition-colors"
                                >
                                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                                  <span>{mail.phone}</span>
                                </a>
                              </div>
                            </div>

                            <div className="p-3 rounded-xl bg-[#16203B]/40 border border-[#243563] space-y-1">
                              <span className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-wider block font-mono">
                                Partnership Scope / Event Type:
                              </span>
                              <p className="text-xs font-semibold text-emerald-300">{mail.eventType}</p>
                            </div>

                            {mail.message && (
                              <div className="p-3.5 rounded-xl bg-[#070A14]/80 border border-[#243563] text-xs text-[#C4BBA3] leading-relaxed">
                                <strong className="text-white font-semibold block mb-1 font-mono text-[10px] uppercase tracking-wider">
                                  Directives & Message:
                                </strong>
                                <p className="whitespace-pre-wrap">{mail.message}</p>
                              </div>
                            )}
                          </div>
                        )}

                        {/* CARD ACTION TOOLBAR */}
                        <div className="pt-2.5 flex items-center justify-between gap-2 border-t border-[#243563]/50">
                          {/* Quick Copy Dossier Summary Button */}
                          <button
                            onClick={() => handleCopySummary(mail, parsed)}
                            className="px-3 py-1.5 rounded-xl bg-[#070A14] hover:bg-[#16203B] text-xs font-semibold text-[#D4AF37] border border-[#243563] hover:border-[#D4AF37]/50 transition-all flex items-center gap-1.5 cursor-pointer"
                            title="Copy full clean summary to clipboard"
                          >
                            {copiedId === mail.id ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                                <span className="text-emerald-300">Dossier Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Copy Dossier</span>
                              </>
                            )}
                          </button>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setEditingMail({ ...mail })}
                              className="px-3 py-1.5 rounded-xl bg-[#16203B] hover:bg-[#243563] text-xs font-semibold text-[#FAF5EF] border border-[#243563] transition-colors flex items-center gap-1.5 cursor-pointer"
                            >
                              <Edit3 className="w-3.5 h-3.5 text-[#D4AF37]" />
                              <span>Edit</span>
                            </button>

                            <button
                              onClick={() => handleDeleteMail(mail.id)}
                              className="px-3 py-1.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-xs font-semibold text-rose-300 border border-rose-500/30 transition-colors flex items-center gap-1.5 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Delete</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 sm:px-7 py-3.5 border-t border-[#243563] bg-[#16203B]/70 flex items-center justify-between text-xs text-[#C4BBA3]">
          <span className="flex items-center gap-1.5 text-emerald-400 font-medium text-[11px] sm:text-xs">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>Encrypted Developer Gateway • Secretariat Authorization Active</span>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-[#243563] text-white font-semibold hover:bg-[#324887] transition-colors cursor-pointer"
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
                <Edit3 className="w-4 h-4 text-[#D4AF37]" /> Edit Registration Entry
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
                  <label className="block text-[#D4AF37] font-semibold mb-1">Contact Representative / Delegate</label>
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
                  <label className="block text-[#D4AF37] font-semibold mb-1">Partnership / Event Scope</label>
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
                <label className="block text-[#D4AF37] font-semibold mb-1">Scope & Directives / Message</label>
                <textarea
                  rows={4}
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
                  <span>Save Entry</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
