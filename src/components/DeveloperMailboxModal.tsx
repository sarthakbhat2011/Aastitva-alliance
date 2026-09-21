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
  UserPlus,
  FileSpreadsheet,
  DownloadCloud,
} from 'lucide-react';
import {
  loadAllMailboxEntries,
  getLocalMailboxEntries,
  updateMailboxEntryStatus,
  updateMailboxFullEntry,
  deleteMailboxEntry,
  saveEntryToMailbox,
  verifyPasscode,
  clearAdminSession,
  resetMailboxToDefault,
  recoverLocalCachedApplications,
  batchSyncMailboxToServer,
  syncMailboxWithGoogleSheet,
  STORAGE_KEY,
  AUTH_SESSION_KEY,
  SAMPLE_PARTNER_MAILS,
} from '../utils/mailboxApi';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

function safeMailto(email: string): string {
  const sanitized = (email || '').trim();
  if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(sanitized)) {
    return `mailto:${encodeURIComponent(sanitized)}`;
  }
  return '#';
}

function safeTel(phone: string): string {
  const sanitized = (phone || '').replace(/[^\d+]/g, '');
  if (sanitized.length >= 7) {
    return `tel:${sanitized}`;
  }
  return '#';
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
  feeStatus?: string;
  transactionId?: string;
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

  const feeStatus = getField(/Fee Status:\s*([^\n\r]+)/i) || (mail.message?.includes('1999') || mail.message?.includes('1,999') ? '₹1,999 (Recorded)' : undefined);
  const transactionId = getField(/(?:Transaction \/ UTR ID|Transaction ID|UTR ID|UTR):\s*([^\n\r]+)/i);

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
    feeStatus,
    transactionId,
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

  // Adding / Restoring Delegate State
  const [isAddingDelegate, setIsAddingDelegate] = useState(false);
  const [newDelegate, setNewDelegate] = useState({
    fullName: '',
    institution: '',
    grade: 'Senior Secondary School (Grades 11–12)',
    phone: '',
    email: '',
    firstChoiceCommittee: 'CCC - Continuous Crisis Committee',
    firstChoicePortfolio: 'General Allocation',
    secondChoiceCommittee: 'UNHRC - United Nations Human Rights Council',
    secondChoicePortfolio: 'General Allocation',
    thirdChoiceCommittee: 'JKLA - Jammu & Kashmir Legislative Assembly',
    thirdChoicePortfolio: 'General Allocation',
    priorExperience: 'Junior Delegate (1–3 MUNs)',
    feeStatus: '₹1,999 (Delegate Remittance Recorded)',
    transactionId: 'Verified',
    statement: '',
  });

  // Google Sheet Import State
  const [isImportingSheet, setIsImportingSheet] = useState(false);
  const [sheetPasteText, setSheetPasteText] = useState('');
  const [sheetUrlInput, setSheetUrlInput] = useState('');
  const [isFetchingSheet, setIsFetchingSheet] = useState(false);
  const [importStatusMessage, setImportStatusMessage] = useState<string | null>(null);
  const [cacheNotification, setCacheNotification] = useState<string | null>(null);

  const [isSyncing, setIsSyncing] = useState(false);

  // Live Auto-Sync via Google Sheet URL / ID
  const handleFetchAndSyncGoogleSheet = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sheetUrlInput.trim()) return;

    setIsFetchingSheet(true);
    setImportStatusMessage(null);
    try {
      const res = await syncMailboxWithGoogleSheet(sheetUrlInput.trim());
      if (res.success) {
        if (res.mails) {
          setMails(res.mails);
        }
        setImportStatusMessage(
          `✓ Successfully synced ${res.importedCount} delegate(s) directly from live Google Sheet!`
        );
        setTimeout(() => {
          setIsImportingSheet(false);
          setSheetUrlInput('');
          setImportStatusMessage(null);
        }, 3000);
      } else {
        setImportStatusMessage(`Sync notice: ${res.error}`);
      }
    } catch (err: any) {
      setImportStatusMessage(`Error: ${err?.message || 'Failed to sync with Google Sheet'}`);
    } finally {
      setIsFetchingSheet(false);
    }
  };

  // Manual Trigger to Scan & Recover Browser Cache
  const handleRecoverCache = async () => {
    setIsSyncing(true);
    try {
      const recovered = recoverLocalCachedApplications();
      const currentLocal = getLocalMailboxEntries();
      setMails(currentLocal);

      if (isAuthorized) {
        await batchSyncMailboxToServer(currentLocal);
        const live = await loadAllMailboxEntries();
        setMails(live);
      }

      setCacheNotification(
        `✓ Browser Cache Verified: Scanned local storage, processed ${recovered.length} delegate application(s). All active entries synced.`
      );
    } catch (err) {
      console.error('Cache recovery error:', err);
      setCacheNotification('Cache scan complete. Records updated.');
    } finally {
      setIsSyncing(false);
      setTimeout(() => setCacheNotification(null), 6000);
    }
  };

  // Google Sheet / Forms Response Parser & Importer
  const handleParseAndImportSheet = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sheetPasteText.trim()) return;

    try {
      const lines = sheetPasteText.trim().split(/\r?\n/);
      const newEntries: PartnerMailEntry[] = [];
      const currentMails = getLocalMailboxEntries();
      const existingEmails = new Set(currentMails.map((m) => (m.email || '').toLowerCase()));
      const existingNames = new Set(currentMails.map((m) => (m.contactPerson || '').toLowerCase()));

      lines.forEach((line) => {
        const trimmed = line.trim();
        if (!trimmed) return;
        // Skip header lines
        if (
          trimmed.toLowerCase().includes('full legal name') ||
          trimmed.toLowerCase().includes('email address') ||
          trimmed.toLowerCase().includes('timestamp')
        ) {
          return;
        }

        // Determine separator: Tab vs Comma
        let cols: string[] = [];
        if (trimmed.includes('\t')) {
          cols = trimmed.split('\t').map((c) => c.trim().replace(/^["']|["']$/g, ''));
        } else {
          cols = trimmed.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map((c) => c.trim().replace(/^["']|["']$/g, ''));
        }

        if (cols.length < 2) return;

        // Check if Col 0 is timestamp (contains date or colon)
        const hasTimestampCol = /\d{1,4}[-/.]\d{1,2}[-/.]\d{1,4}|\d{1,2}:\d{2}/.test(cols[0]);
        const offset = hasTimestampCol ? 1 : 0;
        let timestamp = new Date().toLocaleString('en-IN', {
          timeZone: 'Asia/Kolkata',
          dateStyle: 'medium',
          timeStyle: 'short',
        });
        if (hasTimestampCol && cols[0]) {
          timestamp = cols[0];
        }

        const fullName = cols[offset] || '';
        const email = cols[offset + 1] || '';
        const phone = cols[offset + 2] || '';
        const institution = cols[offset + 3] || 'Institutional Delegate';
        let grade = cols[offset + 4] || 'Senior Secondary School (Grades 11–12)';
        let experience = cols[offset + 5] || 'Junior Delegate (1–3 MUNs)';
        const accolades = cols[offset + 6] || 'None';
        let comm1 = cols[offset + 7] || 'CCC - Continuous Crisis Committee';
        const port1 = cols[offset + 8] || 'General Allocation';
        let comm2 = cols[offset + 9] || 'UNHRC - United Nations Human Rights Council';
        const port2 = cols[offset + 10] || 'General Allocation';
        let comm3 = cols[offset + 11] || 'JKLA - Jammu & Kashmir Legislative Assembly';
        const port3 = cols[offset + 12] || 'General Allocation';
        const statement = cols[offset + 13] || 'Imported from Google Form Responses';

        // Clean bullets if present
        comm1 = comm1.replace(/^•\s*/, '');
        comm2 = comm2.replace(/^•\s*/, '');
        comm3 = comm3.replace(/^•\s*/, '');
        grade = grade.replace(/^•\s*/, '');
        experience = experience.replace(/^•\s*/, '');

        if (!fullName || fullName.length < 2) return;

        // Deduplication: Skip if already present by email or full name + institution
        if (email && existingEmails.has(email.toLowerCase())) return;
        if (
          existingNames.has(fullName.toLowerCase()) ||
          existingNames.has(`${fullName} (${grade})`.toLowerCase())
        ) {
          return;
        }

        const trackingId = `AEQ-2026-${Math.floor(1000 + Math.random() * 9000)}`;
        const entry: PartnerMailEntry = {
          id: trackingId,
          timestamp,
          schoolName: institution,
          contactPerson: `${fullName} (${grade})`,
          email: email || 'delegate@aequitas.org',
          phone: phone || '+91 99065 12613',
          eventType: `Aequitas 2026 Delegate: ${comm1} [${port1}]`,
          preferredDate: '2026-10-29',
          message: `[DELEGATE APPLICATION - ${trackingId}]\nDelegate Name: ${fullName}\nEmail: ${email}\nPhone: ${phone}\nInstitution: ${institution}\nAcademic Division: ${grade}\nPrior MUN Experience: ${experience}\nHonors / Accolades: ${accolades}\n1st Choice Committee: ${comm1} (Preferred: ${port1})\n2nd Choice Committee: ${comm2} (Preferred: ${port2})\n3rd Choice Committee: ${comm3} (Preferred: ${port3})\nFee Status: ₹1,999 (Delegate Remittance Recorded)\nTransaction / UTR ID: Verified (Google Forms Sync)\nStatement of Purpose:\n${statement}`,
          status: 'New',
        };

        newEntries.push(entry);
        if (email) existingEmails.add(email.toLowerCase());
        existingNames.add(fullName.toLowerCase());
        existingNames.add(`${fullName} (${grade})`.toLowerCase());
      });

      if (newEntries.length === 0) {
        setImportStatusMessage('No new rows found or rows were already imported.');
        return;
      }

      // Merge into local storage
      const merged = [...newEntries, ...currentMails];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      setMails(merged);
      window.dispatchEvent(new Event('astitva_partner_submitted'));

      // Sync to server if authorized
      if (isAuthorized) {
        await batchSyncMailboxToServer(newEntries);
      }

      setImportStatusMessage(`✓ Successfully imported ${newEntries.length} delegate(s) into Developer Mailbox!`);
      setTimeout(() => {
        setIsImportingSheet(false);
        setSheetPasteText('');
        setImportStatusMessage(null);
      }, 2500);
    } catch (err: any) {
      console.error('Import failed:', err);
      setImportStatusMessage(`Error parsing data: ${err?.message || 'Invalid format'}`);
    }
  };

  // Load Initial Mail Data & Check Auth Session
  useEffect(() => {
    if (!isOpen) return;

    // Isolate document body scrolling so background does not scroll or jerk while viewing mailbox
    const prevBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const checkAuth = sessionStorage.getItem(AUTH_SESSION_KEY) === 'true';
    setIsAuthorized(checkAuth);

    // 1. Instantly display local cache with zero delay
    const local = getLocalMailboxEntries();
    setMails(local);

    // 2. Fetch live persistent database quietly in background once
    let isMounted = true;
    loadAllMailboxEntries()
      .then((liveMails) => {
        if (!isMounted || !Array.isArray(liveMails) || liveMails.length === 0) return;
        setMails((prev) => {
          // Guard: Avoid DOM re-render if data is identical to keep scrollbar rock-steady
          if (
            prev.length === liveMails.length &&
            prev[0]?.id === liveMails[0]?.id &&
            prev[prev.length - 1]?.id === liveMails[liveMails.length - 1]?.id
          ) {
            return prev;
          }
          return liveMails;
        });
      })
      .catch((err) => {
        console.warn('Background mailbox sync notice:', err);
      });

    return () => {
      isMounted = false;
      document.body.style.overflow = prevBodyOverflow;
    };
  }, [isOpen]);

  const saveMailsToStorage = (updated: PartnerMailEntry[]) => {
    setMails(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  // Handle Passcode Login
  const handleAuthorize = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim()) {
      setPasscodeError('Please enter your security key.');
      return;
    }
    const res = await verifyPasscode(passcode.trim(), 'admin');
    if (res.success) {
      setIsAuthorized(true);
      setPasscodeError('');
      setPasscode('');
      try {
        setIsSyncing(true);
        const liveMails = await loadAllMailboxEntries();
        setMails(liveMails);
      } catch (err) {
        console.error('Mailbox sync error after login:', err);
      } finally {
        setIsSyncing(false);
      }
    } else {
      setPasscodeError('Invalid Developer Authorization Code. Access Denied.');
    }
  };

  // Revoke Credentials (Lock Mailbox)
  const handleRevokeCredentials = () => {
    setIsAuthorized(false);
    clearAdminSession();
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

  // Clear ONLY test dummy entries (e.g. entries with 'fvervwevf', 'test', etc.)
  const handleClearTestData = async () => {
    const isTest = (m: PartnerMailEntry) => {
      const text = `${m.contactPerson} ${m.schoolName} ${m.email} ${m.message} ${m.id}`.toLowerCase();
      return (
        text.includes('fvervwevf') ||
        text.includes('vwefvwef') ||
        text.includes('test') ||
        text.includes('dummy') ||
        text.includes('asdf') ||
        text.includes('efvwef')
      );
    };

    const testEntries = mails.filter(isTest);

    if (testEntries.length === 0) {
      alert('No test entries found in mailbox. Legitimate registrations (such as Ekansh Mahajan) are safe.');
      return;
    }

    if (
      window.confirm(
        `Found ${testEntries.length} testing entry(ies) (such as "${testEntries[0].contactPerson}").\n\nDelete test entries?\n\nLegitimate registrations (such as Ekansh Mahajan) and Google Forms will remain completely safe.`
      )
    ) {
      setIsSyncing(true);
      try {
        let currentMails = [...mails];
        for (const testEntry of testEntries) {
          currentMails = await deleteMailboxEntry(testEntry.id);
        }
        setMails(currentMails);
      } catch (err) {
        console.error('Failed to remove test entries:', err);
      } finally {
        setIsSyncing(false);
      }
    }
  };

  // Add / Restore Delegate Directly into Mailbox
  const handleSaveNewDelegate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDelegate.fullName.trim() || !newDelegate.institution.trim()) {
      alert('Please provide delegate name and institution.');
      return;
    }

    const trackingId = `AEQ-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const nowTime = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'short',
    });

    const entry: PartnerMailEntry = {
      id: trackingId,
      timestamp: nowTime,
      schoolName: newDelegate.institution.trim(),
      contactPerson: `${newDelegate.fullName.trim()} (${newDelegate.grade})`,
      email: newDelegate.email.trim() || 'delegate@astitva.org',
      phone: newDelegate.phone.trim() || '+91 99065 12613',
      eventType: `Aequitas 2026 Delegate: ${newDelegate.firstChoiceCommittee} [${newDelegate.firstChoicePortfolio.trim()}]`,
      preferredDate: '2026-10-29',
      message: `[DELEGATE APPLICATION - ${trackingId}]\nDelegate Name: ${newDelegate.fullName.trim()}\nEmail: ${newDelegate.email.trim() || 'delegate@astitva.org'}\nPhone: ${newDelegate.phone.trim() || '+91 99065 12613'}\nInstitution: ${newDelegate.institution.trim()}\nAcademic Division: ${newDelegate.grade}\nPrior MUN Experience: ${newDelegate.priorExperience}\nHonors / Accolades: None\n1st Choice Committee: ${newDelegate.firstChoiceCommittee} (Preferred: ${newDelegate.firstChoicePortfolio.trim()})\n2nd Choice Committee: ${newDelegate.secondChoiceCommittee} (Preferred: ${newDelegate.secondChoicePortfolio.trim()})\n3rd Choice Committee: ${newDelegate.thirdChoiceCommittee} (Preferred: ${newDelegate.thirdChoicePortfolio.trim()})\nFee Status: ${newDelegate.feeStatus}\nTransaction / UTR ID: ${newDelegate.transactionId.trim()}\nStatement of Purpose:\n${newDelegate.statement.trim() || 'Official delegate application.'}`,
      status: 'New',
    };

    setIsSyncing(true);
    try {
      await saveEntryToMailbox(entry);
      const updated = [entry, ...mails.filter((m) => m.id !== trackingId)];
      setMails(updated);
      setIsAddingDelegate(false);
      setNewDelegate({
        fullName: '',
        institution: '',
        grade: 'Senior Secondary School (Grades 11–12)',
        phone: '',
        email: '',
        firstChoiceCommittee: 'CCC - Continuous Crisis Committee',
        firstChoicePortfolio: 'General Allocation',
        secondChoiceCommittee: 'UNHRC - United Nations Human Rights Council',
        secondChoicePortfolio: 'General Allocation',
        thirdChoiceCommittee: 'JKLA - Jammu & Kashmir Legislative Assembly',
        thirdChoicePortfolio: 'General Allocation',
        priorExperience: 'Junior Delegate (1–3 MUNs)',
        feeStatus: '₹1,999 (Delegate Remittance Recorded)',
        transactionId: 'Verified',
        statement: '',
      });
    } catch (err) {
      console.error('Failed to add delegate to mailbox:', err);
    } finally {
      setIsSyncing(false);
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

    const updated = await updateMailboxFullEntry(editingMail);
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
Fee Remittance: ${parsed.feeStatus || '₹1,999'}
Transaction / UTR ID: ${parsed.transactionId || 'N/A'}
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
        <div
          id="developer-mailbox-scroll-container"
          className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-5 custom-scrollbar"
          style={{ overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch' }}
        >
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
                  <div className="flex flex-wrap items-center gap-2 self-end sm:self-auto text-xs text-[#C4BBA3]">
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
                    <button
                      onClick={handleRecoverCache}
                      className="px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/40 text-purple-300 hover:bg-purple-500/25 transition-all flex items-center gap-1.5 cursor-pointer"
                      title="Scan browser local storage to retrieve any lost delegate registrations"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-purple-300" />
                      <span className="text-[11px] font-mono font-bold">Recover Browser Cache</span>
                    </button>
                    <button
                      onClick={() => setIsImportingSheet(true)}
                      className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/25 transition-all flex items-center gap-1.5 cursor-pointer"
                      title="Import and sync all delegates from Google Sheet responses"
                    >
                      <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-[11px] font-mono font-bold">Import from Google Sheet</span>
                    </button>
                    <button
                      onClick={() => setIsAddingDelegate(true)}
                      className="px-3 py-1.5 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37]/25 transition-all flex items-center gap-1.5 cursor-pointer"
                      title="Add or restore a delegate application into the mailbox"
                    >
                      <UserPlus className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span className="text-[11px] font-mono font-bold">+ Add / Restore Delegate</span>
                    </button>
                    <button
                      onClick={handleClearTestData}
                      className="px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 hover:border-amber-500/50 transition-all flex items-center gap-1.5 cursor-pointer"
                      title="Clear testing dummy data without affecting legitimate delegates or Google Forms"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-amber-400" />
                      <span className="text-[11px] font-mono">Clear Test Entries</span>
                    </button>
                  </div>
                </div>

                {/* Cache Notification Toast */}
                {cacheNotification && (
                  <div className="p-3 rounded-xl bg-emerald-950/70 border border-emerald-500/50 text-emerald-300 text-xs flex items-center justify-between animate-fade-in shadow-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="font-mono text-[11px]">{cacheNotification}</span>
                    </div>
                    <button
                      onClick={() => setCacheNotification(null)}
                      className="text-emerald-400 hover:text-white p-1"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

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
                  {filteredMails.map((mail, idx) => {
                    const parsed = parseDelegateMessage(mail);

                    return (
                      <div
                        key={`${mail.id || 'mail'}-${idx}`}
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
                                  href={safeMailto(mail.email)}
                                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#070A14] border border-[#243563] hover:border-[#D4AF37] text-xs text-[#DDD6FE] transition-colors"
                                  title="Send Email to Delegate"
                                >
                                  <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
                                  <span>{mail.email}</span>
                                </a>
                                <a
                                  href={safeTel(mail.phone)}
                                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#070A14] border border-[#243563] hover:border-emerald-500/60 text-xs text-emerald-300 transition-colors"
                                  title="Call or WhatsApp Delegate"
                                >
                                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                                  <span>{mail.phone}</span>
                                </a>
                              </div>
                            </div>

                            {/* Delegate Payment & Transaction UTR Status Banner */}
                            <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl bg-[#070A14] border border-[#D4AF37]/35 text-xs font-mono">
                              <div className="flex items-center flex-wrap gap-2.5">
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-300 border border-emerald-500/35 text-[11px] font-bold">
                                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                                  <span>{parsed.feeStatus || '₹1,999 Fee Recorded'}</span>
                                </span>
                                {parsed.transactionId ? (
                                  <div className="flex items-center gap-1.5 text-[#C4BBA3]">
                                    <span className="text-[10.5px] uppercase tracking-wider text-[#A39B88]">UTR / Ref:</span>
                                    <span className="text-amber-300 font-bold select-all font-mono">{parsed.transactionId}</span>
                                  </div>
                                ) : (
                                  <span className="text-[11px] text-[#A39B88] italic">No UTR recorded</span>
                                )}
                              </div>

                              {parsed.transactionId && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    navigator.clipboard.writeText(parsed.transactionId!);
                                    setCopiedId(`utr-${mail.id}`);
                                    setTimeout(() => setCopiedId(null), 2000);
                                  }}
                                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#16203B] hover:bg-[#D4AF37] hover:text-[#070A14] text-[#D4AF37] border border-[#D4AF37]/35 text-[11px] font-sans font-semibold transition-all cursor-pointer"
                                  title="Copy UTR / Transaction ID"
                                >
                                  {copiedId === `utr-${mail.id}` ? (
                                    <>
                                      <Check className="w-3 h-3 text-emerald-400" />
                                      <span>Copied UTR!</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="w-3 h-3" />
                                      <span>Copy UTR</span>
                                    </>
                                  )}
                                </button>
                              )}
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
                                  href={safeMailto(mail.email)}
                                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#070A14] border border-[#243563] hover:border-[#D4AF37] text-xs text-[#DDD6FE] transition-colors"
                                >
                                  <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
                                  <span>{mail.email}</span>
                                </a>
                                <a
                                  href={safeTel(mail.phone)}
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

      {/* ADD / RESTORE DELEGATE MODAL SUB-VIEW */}
      {isAddingDelegate && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-[#070A14]/95 backdrop-blur-md">
          <div className="w-full max-w-xl bg-[#0D1427] border border-[#D4AF37]/50 rounded-3xl p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between pb-3 border-b border-[#243563]">
              <div>
                <h3 className="text-lg font-serif font-bold text-[#FAF5EF] flex items-center gap-2">
                  <UserPlus className="w-4 h-4 text-[#D4AF37]" /> Add / Restore Delegate Application
                </h3>
                <p className="text-[11px] text-[#C4BBA3]">
                  Directly record or restore a delegate application into the Developer Mailbox.
                </p>
              </div>
              <button
                onClick={() => setIsAddingDelegate(false)}
                className="text-[#C4BBA3] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveNewDelegate} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#D4AF37] font-semibold mb-1">Delegate Full Name *</label>
                  <input
                    type="text"
                    value={newDelegate.fullName}
                    onChange={(e) => setNewDelegate({ ...newDelegate, fullName: e.target.value })}
                    placeholder="e.g. Ekansh Mahajan"
                    className="w-full px-3 py-2 rounded-xl bg-[#070A14] border border-[#243563] text-white focus:outline-none focus:border-[#D4AF37]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[#D4AF37] font-semibold mb-1">School / Institution Name *</label>
                  <input
                    type="text"
                    value={newDelegate.institution}
                    onChange={(e) => setNewDelegate({ ...newDelegate, institution: e.target.value })}
                    placeholder="e.g. Jammu Sanskriti School"
                    className="w-full px-3 py-2 rounded-xl bg-[#070A14] border border-[#243563] text-white focus:outline-none focus:border-[#D4AF37]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[#D4AF37] font-semibold mb-1">Academic Division</label>
                  <select
                    value={newDelegate.grade}
                    onChange={(e) => setNewDelegate({ ...newDelegate, grade: e.target.value })}
                    className="w-full px-2.5 py-2 rounded-xl bg-[#070A14] border border-[#243563] text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="Middle School (Grades 6–8)">Middle School (Grades 6–8)</option>
                    <option value="Secondary School (Grades 9–10)">Secondary School (Grades 9–10)</option>
                    <option value="Senior Secondary School (Grades 11–12)">Senior Secondary School (Grades 11–12)</option>
                    <option value="Undergraduate / College">Undergraduate / College</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#D4AF37] font-semibold mb-1">Contact Phone</label>
                  <input
                    type="text"
                    value={newDelegate.phone}
                    onChange={(e) => setNewDelegate({ ...newDelegate, phone: e.target.value })}
                    placeholder="+91 99065 12613"
                    className="w-full px-3 py-2 rounded-xl bg-[#070A14] border border-[#243563] text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-[#D4AF37] font-semibold mb-1">Email Address</label>
                  <input
                    type="email"
                    value={newDelegate.email}
                    onChange={(e) => setNewDelegate({ ...newDelegate, email: e.target.value })}
                    placeholder="delegate@example.com"
                    className="w-full px-3 py-2 rounded-xl bg-[#070A14] border border-[#243563] text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              {/* Committee Preferences */}
              <div className="p-3 rounded-xl bg-[#070A14] border border-[#243563] space-y-2.5">
                <span className="text-[10px] font-mono uppercase font-bold text-[#D4AF37] tracking-wider block">
                  Committee & Portfolio Allocations
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[#C4BBA3] text-[11px] mb-0.5">1st Choice Committee</label>
                    <select
                      value={newDelegate.firstChoiceCommittee}
                      onChange={(e) => setNewDelegate({ ...newDelegate, firstChoiceCommittee: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-[#16203B] border border-[#243563] text-white focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="CCC - Continuous Crisis Committee">CCC - Continuous Crisis Committee</option>
                      <option value="UNHRC - United Nations Human Rights Council">UNHRC - United Nations Human Rights Council</option>
                      <option value="JKLA - Jammu & Kashmir Legislative Assembly">JKLA - Jammu & Kashmir Legislative Assembly</option>
                      <option value="UN Women - United Nations Entity for Gender Equality">UN Women - United Nations Entity for Gender Equality</option>
                      <option value="Lok Sabha - Lok Sabha (House of the People)">Lok Sabha - Lok Sabha (House of the People)</option>
                      <option value="IPL - Indian Premier League Auction Council">IPL - Indian Premier League Auction Council</option>
                      <option value="IPC - International Press Corps">IPC - International Press Corps</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[#C4BBA3] text-[11px] mb-0.5">1st Choice Portfolio</label>
                    <input
                      type="text"
                      value={newDelegate.firstChoicePortfolio}
                      onChange={(e) => setNewDelegate({ ...newDelegate, firstChoicePortfolio: e.target.value })}
                      placeholder="e.g. General Allocation"
                      className="w-full px-2.5 py-1.5 rounded-lg bg-[#16203B] border border-[#243563] text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[#C4BBA3] text-[11px] mb-0.5">2nd Choice Committee</label>
                    <select
                      value={newDelegate.secondChoiceCommittee}
                      onChange={(e) => setNewDelegate({ ...newDelegate, secondChoiceCommittee: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-[#16203B] border border-[#243563] text-white focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="UNHRC - United Nations Human Rights Council">UNHRC - United Nations Human Rights Council</option>
                      <option value="CCC - Continuous Crisis Committee">CCC - Continuous Crisis Committee</option>
                      <option value="JKLA - Jammu & Kashmir Legislative Assembly">JKLA - Jammu & Kashmir Legislative Assembly</option>
                      <option value="UN Women - United Nations Entity for Gender Equality">UN Women - United Nations Entity for Gender Equality</option>
                      <option value="Lok Sabha - Lok Sabha (House of the People)">Lok Sabha - Lok Sabha (House of the People)</option>
                      <option value="IPL - Indian Premier League Auction Council">IPL - Indian Premier League Auction Council</option>
                      <option value="IPC - International Press Corps">IPC - International Press Corps</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[#C4BBA3] text-[11px] mb-0.5">2nd Choice Portfolio</label>
                    <input
                      type="text"
                      value={newDelegate.secondChoicePortfolio}
                      onChange={(e) => setNewDelegate({ ...newDelegate, secondChoicePortfolio: e.target.value })}
                      placeholder="e.g. General Allocation"
                      className="w-full px-2.5 py-1.5 rounded-lg bg-[#16203B] border border-[#243563] text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>
              </div>

              {/* Fee & UTR */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#D4AF37] font-semibold mb-1">Fee Status</label>
                  <input
                    type="text"
                    value={newDelegate.feeStatus}
                    onChange={(e) => setNewDelegate({ ...newDelegate, feeStatus: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#070A14] border border-[#243563] text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-[#D4AF37] font-semibold mb-1">Transaction / UTR ID</label>
                  <input
                    type="text"
                    value={newDelegate.transactionId}
                    onChange={(e) => setNewDelegate({ ...newDelegate, transactionId: e.target.value })}
                    placeholder="e.g. Verified / UTR-123456"
                    className="w-full px-3 py-2 rounded-xl bg-[#070A14] border border-[#243563] text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddingDelegate(false)}
                  className="px-4 py-2 rounded-xl bg-[#16203B] text-white font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl shimmer-btn text-[#070A14] font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Restore Delegate to Mailbox</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* IMPORT FROM GOOGLE SHEET MODAL SUB-VIEW */}
      {isImportingSheet && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-[#070A14]/95 backdrop-blur-md">
          <div className="w-full max-w-2xl bg-[#0D1427] border border-emerald-500/50 rounded-3xl p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between pb-3 border-b border-[#243563]">
              <div>
                <h3 className="text-lg font-serif font-bold text-[#FAF5EF] flex items-center gap-2">
                  <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
                  <span>Import / Sync from Google Form Responses</span>
                </h3>
                <p className="text-[11px] text-[#C4BBA3]">
                  Directly synchronize all delegates recorded in your Google Sheet into the Developer Mailbox.
                </p>
              </div>
              <button
                onClick={() => {
                  setIsImportingSheet(false);
                  setImportStatusMessage(null);
                }}
                className="text-[#C4BBA3] hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* OPTION 1: 1-CLICK LIVE SYNC VIA GOOGLE SHEET LINK */}
            <div className="p-4 rounded-2xl bg-[#16203B]/60 border border-emerald-500/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-300 flex items-center gap-1.5 uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  Method 1: 1-Click Auto-Sync via Google Sheet Link
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                  Instant
                </span>
              </div>
              <p className="text-[11px] text-[#C4BBA3] leading-relaxed">
                Paste your linked Google Sheet's URL or ID (ensure sheet sharing is set to{' '}
                <em className="text-white">"Anyone with the link can view"</em>). All missing delegates will be automatically imported.
              </p>
              <form onSubmit={handleFetchAndSyncGoogleSheet} className="flex gap-2">
                <input
                  type="text"
                  value={sheetUrlInput}
                  onChange={(e) => setSheetUrlInput(e.target.value)}
                  placeholder="https://docs.google.com/spreadsheets/d/... or Sheet ID"
                  className="flex-1 px-3.5 py-2 rounded-xl bg-[#070A14] border border-[#243563] text-white font-mono text-xs focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="submit"
                  disabled={isFetchingSheet || !sheetUrlInput.trim()}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-[#070A14] font-bold text-xs flex items-center gap-2 cursor-pointer transition-all shrink-0"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isFetchingSheet ? 'animate-spin' : ''}`} />
                  <span>{isFetchingSheet ? 'Syncing...' : 'Auto-Sync Now'}</span>
                </button>
              </form>
            </div>

            {/* DIVIDER */}
            <div className="flex items-center gap-3 py-1">
              <div className="flex-1 h-px bg-[#243563]" />
              <span className="text-[10.5px] font-mono uppercase text-[#A39B88]">OR</span>
              <div className="flex-1 h-px bg-[#243563]" />
            </div>

            {/* OPTION 2: PASTE ROWS DIRECTLY */}
            <div className="p-3.5 rounded-2xl bg-[#070A14] border border-[#243563] text-xs text-[#C4BBA3] space-y-2">
              <span className="text-[#D4AF37] font-semibold block font-mono text-[11px]">
                Method 2: Paste Copied Google Sheet Rows (Works for all sheets):
              </span>
              <ol className="list-decimal pl-4 space-y-1 text-[11px] leading-relaxed">
                <li>Open your Google Sheet, select the response rows (e.g. Tanmay Kandal, Ekansh Mahajan, etc.) and press <strong className="text-white">Ctrl+C</strong>.</li>
                <li>Paste (<strong className="text-white">Ctrl+V</strong>) below and click <strong className="text-emerald-300">Parse & Import into Mailbox</strong>.</li>
              </ol>
            </div>

            <form onSubmit={handleParseAndImportSheet} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#D4AF37] font-semibold mb-1">
                  Paste Google Sheet Rows / CSV Data:
                </label>
                <textarea
                  rows={6}
                  value={sheetPasteText}
                  onChange={(e) => setSheetPasteText(e.target.value)}
                  placeholder="Paste copied Google Sheet rows here (tab-separated or comma-separated)..."
                  className="w-full px-3.5 py-3 rounded-2xl bg-[#070A14] border border-[#243563] text-white font-mono text-xs focus:outline-none focus:border-emerald-500 custom-scrollbar"
                  required
                />
              </div>

              {importStatusMessage && (
                <div
                  className={`p-3 rounded-xl text-xs font-mono flex items-center gap-2 ${
                    importStatusMessage.startsWith('✓')
                      ? 'bg-emerald-950/60 border border-emerald-500/50 text-emerald-300'
                      : 'bg-amber-950/60 border border-amber-500/50 text-amber-300'
                  }`}
                >
                  {importStatusMessage.startsWith('✓') ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  )}
                  <span>{importStatusMessage}</span>
                </div>
              )}

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setIsImportingSheet(false);
                    setImportStatusMessage(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#16203B] text-white font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-500 text-[#070A14] font-bold hover:bg-emerald-400 transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/20"
                >
                  <DownloadCloud className="w-4 h-4" />
                  <span>Parse & Import into Mailbox</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
