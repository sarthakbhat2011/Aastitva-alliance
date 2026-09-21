import { PartnerMailEntry } from '../types';

export const STORAGE_KEY = 'astitva_partner_mailbox';
export const AUTH_SESSION_KEY = 'astitva_dev_partner_authorized';
export const AUTH_TOKEN_KEY = 'astitva_admin_token';

// Deprecated: Passcode verification now happens exclusively on the server.
// Kept only as a temporary fallback constant to prevent compile breakages until rotated.
export const DEV_PASSCODE = 'bhatsarthakunrivalledunion2011,2001';

export const SAMPLE_PARTNER_MAILS: PartnerMailEntry[] = [
  {
    id: 'AEQ-2026-9281',
    timestamp: '20 Sept 2026, 01:15 pm',
    schoolName: 'Jammu Sanskriti School',
    contactPerson: 'Ekansh Mahajan (Senior Secondary School)',
    email: 'ekanshmahajan@gmail.com',
    phone: '+91 99065 12613',
    eventType: 'Aequitas 2026 Delegate: CCC - Continuous Crisis Committee [General Allocation]',
    preferredDate: '2026-10-29',
    message:
      '[DELEGATE APPLICATION - AEQ-2026-9281]\nDelegate Name: Ekansh Mahajan\nEmail: ekanshmahajan@gmail.com\nPhone: +91 99065 12613\nInstitution: Jammu Sanskriti School\nAcademic Division: Senior Secondary School (Grades 11–12)\nPrior MUN Experience: Junior Delegate (1–3 MUNs)\nHonors / Accolades: None\n1st Choice Committee: CCC - Continuous Crisis Committee (Preferred: General Allocation)\n2nd Choice Committee: UNHRC - United Nations Human Rights Council (Preferred: General Allocation)\n3rd Choice Committee: JKLA - Jammu & Kashmir Legislative Assembly (Preferred: General Allocation)\nFee Status: ₹1,999 (Delegate Remittance Recorded)\nTransaction / UTR ID: Verified (Jammu Sanskriti School)\nStatement of Purpose:\nOfficial delegate registration for Aequitas Summit 2026 representing Jammu Sanskriti School.',
    status: 'New',
  },
  {
    id: 'partner-17861001',
    timestamp: '2026-08-07 18:30',
    schoolName: 'Heritage International School, Jammu',
    contactPerson: 'Devansh Sharma (Academic Coordinator)',
    email: 'academics@heritageschooljammu.in',
    phone: '+91 94191 22334',
    eventType: 'Model United Nations (MUN) Executive Board Allocation',
    preferredDate: '2026-10-15',
    message:
      'Requesting full Executive Board allocation for 6 committees and Rules of Procedure delegate training workshop.',
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
    message:
      'Seeking institutional partner agreement for co-hosting the Jammu Youth Leadership Symposium 2026.',
    status: 'New',
  },
];

/**
 * Server-Side Passcode Verification.
 * Authenticates against /api/auth/verify-passcode using constant-time comparison
 * and obtains a cryptographically signed session token.
 */
export async function verifyPasscode(
  passcode: string,
  purpose: 'admin' | 'drawer' = 'admin'
): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch('/api/auth/verify-passcode', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ passcode, purpose }),
    });

    const data = await res.json();
    if (res.ok && data.success && data.token) {
      if (typeof window !== 'undefined') {
        sessionStorage.setItem(AUTH_SESSION_KEY, 'true');
        sessionStorage.setItem(AUTH_TOKEN_KEY, data.token);
      }
      return { success: true };
    }

    return {
      success: false,
      error: data.error || 'Invalid security passcode. Access restricted.',
    };
  } catch (err) {
    console.error('[Auth Error] Failed to verify passcode with server:', err);
    return {
      success: false,
      error: 'Network error communicating with authentication service.',
    };
  }
}

/**
 * Clear current admin session.
 */
export function clearAdminSession(): void {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem(AUTH_SESSION_KEY);
  sessionStorage.removeItem(AUTH_TOKEN_KEY);
}

/**
 * Get current session token.
 */
export function getAdminToken(): string | null {
  if (typeof window === 'undefined') return null;
  return sessionStorage.getItem(AUTH_TOKEN_KEY);
}

/**
 * Recover any delegate applications that were stored in other localStorage keys
 * (such as 'aequitas_delegate_applications' or legacy receipt keys).
 */
export function recoverLocalCachedApplications(): PartnerMailEntry[] {
  if (typeof window === 'undefined') return [];
  const recovered: PartnerMailEntry[] = [];
  const seenIds = new Set<string>();

  try {
    // 1. Scan primary delegate receipt store 'aequitas_delegate_applications'
    const rawApps = localStorage.getItem('aequitas_delegate_applications');
    if (rawApps) {
      try {
        const parsedApps = JSON.parse(rawApps);
        if (Array.isArray(parsedApps)) {
          parsedApps.forEach((app: any) => {
            if (!app) return;
            const trackingId = app.trackingId || app.id || `AEQ-2026-${Math.floor(1000 + Math.random() * 9000)}`;
            if (seenIds.has(trackingId)) return;
            seenIds.add(trackingId);

            const fullName = (app.fullName || app.name || 'Delegate').trim();
            const email = (app.email || '').trim();
            const phone = (app.phone || '').trim();
            const institution = (app.institution || app.schoolName || 'Institutional Delegate').trim();
            const grade = app.grade || 'Senior Secondary';
            const committee = app.firstChoiceCommittee || 'General Allocation';
            const portfolio = app.firstChoicePortfolio || 'General Allocation';
            const timestamp =
              app.timestamp ||
              new Date().toLocaleString('en-IN', {
                timeZone: 'Asia/Kolkata',
                dateStyle: 'medium',
                timeStyle: 'short',
              });

            const message =
              app.message ||
              `[DELEGATE APPLICATION - ${trackingId}]\nDelegate Name: ${fullName}\nEmail: ${email}\nPhone: ${phone}\nInstitution: ${institution}\nAcademic Division: ${grade}\nPrior MUN Experience: ${app.priorExperience || 'None'}\nHonors / Accolades: ${app.priorAccolades || 'None'}\n1st Choice Committee: ${committee} (Preferred: ${portfolio})\n2nd Choice Committee: ${app.secondChoiceCommittee || 'None'} (Preferred: ${app.secondChoicePortfolio || 'None'})\n3rd Choice Committee: ${app.thirdChoiceCommittee || 'None'} (Preferred: ${app.thirdChoicePortfolio || 'None'})\nFee Status: ${app.feePaid || '₹1,999 (Delegate Remittance Recorded)'}\nTransaction / UTR ID: ${app.transactionId || 'Verified'}\nStatement of Purpose:\n${app.statement || 'Official Delegate Application'}`;

            recovered.push({
              id: trackingId,
              timestamp,
              schoolName: institution,
              contactPerson: `${fullName} (${grade})`,
              email,
              phone,
              eventType: `Aequitas 2026 Delegate: ${committee} [${portfolio}]`,
              preferredDate: '2026-10-29',
              message,
              status: 'New',
            });
          });
        }
      } catch (err) {
        console.warn('Failed parsing aequitas_delegate_applications:', err);
      }
    }

    // 2. Scan ANY other keys in localStorage for delegate objects (e.g. Tanmay Kandal or other cached records)
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (
        !key ||
        key === STORAGE_KEY ||
        key === 'aequitas_delegate_applications' ||
        key === 'astitva_deleted_ids' ||
        key === 'astitva_admin_token'
      ) {
        continue;
      }

      try {
        const val = localStorage.getItem(key);
        if (
          !val ||
          (!val.includes('AEQ-') &&
            !val.includes('fullName') &&
            !val.includes('firstChoiceCommittee') &&
            !val.toLowerCase().includes('kandal') &&
            !val.toLowerCase().includes('tanmay'))
        ) {
          continue;
        }

        const parsed = JSON.parse(val);
        const list = Array.isArray(parsed) ? parsed : [parsed];
        list.forEach((item: any) => {
          if (!item || typeof item !== 'object') return;
          if (
            item.fullName ||
            item.contactPerson ||
            item.email ||
            (item.message && item.message.includes('DELEGATE APPLICATION'))
          ) {
            const id =
              item.trackingId || item.id || `AEQ-2026-${Math.floor(1000 + Math.random() * 9000)}`;
            if (seenIds.has(id)) return;
            seenIds.add(id);

            const name = (item.fullName || item.contactPerson || 'Delegate').trim();
            const inst = (item.institution || item.schoolName || 'Institutional Delegate').trim();
            recovered.push({
              id,
              timestamp:
                item.timestamp ||
                new Date().toLocaleString('en-IN', {
                  timeZone: 'Asia/Kolkata',
                  dateStyle: 'medium',
                  timeStyle: 'short',
                }),
              schoolName: inst,
              contactPerson: name,
              email: item.email || '',
              phone: item.phone || '',
              eventType:
                item.eventType ||
                `Aequitas 2026 Delegate: ${item.firstChoiceCommittee || 'General Allocation'}`,
              preferredDate: '2026-10-29',
              message:
                item.message ||
                `[DELEGATE APPLICATION - ${id}]\nDelegate Name: ${name}\nEmail: ${item.email || ''}\nPhone: ${item.phone || ''}\nInstitution: ${inst}`,
              status: item.status || 'New',
            });
          }
        });
      } catch {
        // Not JSON
      }
    }
  } catch (err) {
    console.error('Error recovering local cached applications:', err);
  }

  return recovered;
}

/**
 * Get all mailbox entries currently cached in browser localStorage.
 * Automatically recovers and reconciles any applications cached in separate storage keys.
 */
export function getLocalMailboxEntries(): PartnerMailEntry[] {
  if (typeof window === 'undefined') return SAMPLE_PARTNER_MAILS;
  try {
    let localMails: PartnerMailEntry[] = [];
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          localMails = parsed;
        }
      } catch (e) {
        // Parse error, fallback to default
      }
    }
    if (localMails.length === 0) {
      localMails = [...SAMPLE_PARTNER_MAILS];
    }

    // Auto-reconcile with cached applications in browser
    const recovered = recoverLocalCachedApplications();
    if (recovered.length > 0) {
      const map = new Map<string, PartnerMailEntry>();
      localMails.forEach((m) => {
        if (m.id) map.set(m.id, m);
      });
      let hasNew = false;
      recovered.forEach((rec) => {
        if (rec.id && !map.has(rec.id)) {
          map.set(rec.id, rec);
          hasNew = true;
        }
      });
      if (hasNew) {
        localMails = Array.from(map.values());
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(localMails));
        } catch (quotaErr) {
          console.warn('LocalStorage quota limit reached:', quotaErr);
        }
      }
    }

    return localMails;
  } catch (err) {
    console.error('Error reading local mailbox entries:', err);
    return SAMPLE_PARTNER_MAILS;
  }
}

/**
 * Batch sync entries from client to server (Admin only).
 */
export async function batchSyncMailboxToServer(entries: PartnerMailEntry[]): Promise<boolean> {
  if (typeof window === 'undefined' || !entries.length) return false;
  const token = getAdminToken();
  if (!token) return false;

  try {
    const res = await fetch('/api/mailbox/batch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ entries: entries.slice(0, 500) }),
    });
    return res.ok;
  } catch (err) {
    console.warn('Batch server sync deferred:', err);
    return false;
  }
}

/**
 * Save an entry to both local storage and the persistent backend server API.
 */
export async function saveEntryToMailbox(entry: PartnerMailEntry): Promise<void> {
  if (typeof window === 'undefined') return;

  // 1. Immediately save to browser localStorage for instant local availability
  try {
    const local = getLocalMailboxEntries();
    const existingIndex = local.findIndex((m) => m.id === entry.id);
    let updated: PartnerMailEntry[];
    if (existingIndex >= 0) {
      updated = [...local];
      updated[existingIndex] = entry;
    } else {
      updated = [entry, ...local];
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('astitva_partner_submitted'));
  } catch (err) {
    console.error('Failed to write to local storage:', err);
  }

  // 2. Transmit to persistent backend Express server on Render
  try {
    const token = getAdminToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch('/api/mailbox', {
      method: 'POST',
      headers,
      body: JSON.stringify(entry),
    });

    if (response.ok) {
      const data = await response.json();
      if (data && Array.isArray(data.mails)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data.mails));
        window.dispatchEvent(new Event('astitva_partner_submitted'));
      }
    }
  } catch (err) {
    // If offline or network issue, entry is already preserved in localStorage
    console.log('Server mailbox sync deferred (saved locally):', err);
  }
}

/**
 * Load all mailbox entries from both local storage and server, merging them seamlessly.
 * Requires admin authorization token for server access.
 */
export async function loadAllMailboxEntries(): Promise<PartnerMailEntry[]> {
  const localMails = getLocalMailboxEntries();

  if (typeof window === 'undefined') return localMails;

  const deletedIds: string[] = (() => {
    try {
      return JSON.parse(localStorage.getItem('astitva_deleted_ids') || '[]');
    } catch {
      return [];
    }
  })();

  const token = getAdminToken();
  if (!token) {
    return localMails.filter((m) => !deletedIds.includes(m.id));
  }

  try {
    const res = await fetch('/api/mailbox', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      const data = await res.json();
      const serverMails: PartnerMailEntry[] = Array.isArray(data.mails) ? data.mails : [];

      // Combine server records and local records safely so legitimate delegate applications are never wiped out
      const map = new Map<string, PartnerMailEntry>();

      // 1. Add server records (excluding any intentionally deleted entries)
      serverMails.forEach((m) => {
        if (m.id && !deletedIds.includes(m.id)) {
          map.set(m.id, m);
        }
      });

      // 2. Preserve local entries (e.g. offline registrations, recovered cache entries)
      const localOnly: PartnerMailEntry[] = [];
      localMails.forEach((m) => {
        if (m.id && !deletedIds.includes(m.id) && !map.has(m.id)) {
          map.set(m.id, m);
          localOnly.push(m);
        }
      });

      // 3. If there are local applications not on the server, push them to server now!
      if (localOnly.length > 0) {
        batchSyncMailboxToServer(localOnly);
      }

      const merged = Array.from(map.values());
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      } catch (quotaErr) {
        console.warn('LocalStorage quota reached; retaining full records in memory:', quotaErr);
      }
      return merged;
    } else if (res.status === 401) {
      // Token expired or invalid
      clearAdminSession();
    }
  } catch (err) {
    console.log('Server mailbox fetch deferred (using local cache):', err);
  }

  return localMails.filter((m) => !deletedIds.includes(m.id));
}

/**
 * Update an entire mailbox entry (all editable fields) on both local storage and server.
 * Requires admin authorization token for server persistence.
 */
export async function updateMailboxFullEntry(entry: PartnerMailEntry): Promise<PartnerMailEntry[]> {
  const local = getLocalMailboxEntries();
  const existingIndex = local.findIndex((m) => m.id === entry.id);
  let updated: PartnerMailEntry[];
  if (existingIndex >= 0) {
    updated = [...local];
    updated[existingIndex] = entry;
  } else {
    updated = [entry, ...local];
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event('astitva_partner_submitted'));

  const token = getAdminToken();
  if (token) {
    try {
      const response = await fetch(`/api/mailbox/${encodeURIComponent(entry.id)}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(entry),
      });

      if (response.ok) {
        const data = await response.json();
        if (data && data.mail) {
          const synced = updated.map((m) => (m.id === data.mail.id ? data.mail : m));
          localStorage.setItem(STORAGE_KEY, JSON.stringify(synced));
          window.dispatchEvent(new Event('astitva_partner_submitted'));
          return synced;
        }
      }
    } catch (err) {
      console.warn('[Mailbox API] Failed to sync full update to server:', err);
    }
  }

  return updated;
}

/**
 * Update the status of a mailbox entry on both local storage and server.
 */
export async function updateMailboxEntryStatus(
  id: string,
  newStatus: PartnerMailEntry['status']
): Promise<PartnerMailEntry[]> {
  const local = getLocalMailboxEntries();
  const updated = local.map((m) => (m.id === id ? { ...m, status: newStatus } : m));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event('astitva_partner_submitted'));

  const token = getAdminToken();
  if (token) {
    try {
      await fetch(`/api/mailbox/${encodeURIComponent(id)}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch (err) {
      console.log('Server status update deferred:', err);
    }
  }

  return updated;
}

/**
 * Delete a mailbox entry from both local storage and server.
 */
export async function deleteMailboxEntry(id: string): Promise<PartnerMailEntry[]> {
  // 1. Record ID in deleted IDs list so it is never resurrected
  let deletedIds: string[] = [];
  try {
    deletedIds = JSON.parse(localStorage.getItem('astitva_deleted_ids') || '[]');
    if (!deletedIds.includes(id)) {
      deletedIds.push(id);
      localStorage.setItem('astitva_deleted_ids', JSON.stringify(deletedIds));
    }
  } catch {
    deletedIds = [id];
  }

  // 2. Filter local entries strictly to remove ONLY this ID
  const local = getLocalMailboxEntries();
  const updated = local.filter((m) => m.id !== id && !deletedIds.includes(m.id));
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    // ignore
  }
  window.dispatchEvent(new Event('astitva_partner_submitted'));

  // 3. Notify server of deletion
  const token = getAdminToken();
  if (token) {
    try {
      const res = await fetch(`/api/mailbox/${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        if (data && Array.isArray(data.mails)) {
          // Merge safely: take server entries (excluding deleted IDs)
          // AND preserve any existing local entries that are not deleted!
          const map = new Map<string, PartnerMailEntry>();
          data.mails.forEach((m: PartnerMailEntry) => {
            if (m.id && !deletedIds.includes(m.id)) {
              map.set(m.id, m);
            }
          });
          updated.forEach((m) => {
            if (m.id && !deletedIds.includes(m.id) && !map.has(m.id)) {
              map.set(m.id, m);
            }
          });
          const safeMerged = Array.from(map.values());
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(safeMerged));
          } catch (e) {
            // ignore
          }
          window.dispatchEvent(new Event('astitva_partner_submitted'));
          return safeMerged;
        }
      }
    } catch (err) {
      console.log('Server delete deferred:', err);
    }
  }

  return updated;
}

/**
 * Submit delegate registration directly to the hardened /api/register server endpoint.
 */
export async function submitRegistrationToServer(payload: {
  fullName: string;
  email: string;
  phone: string;
  institution: string;
  grade: string;
  firstChoiceCommittee: string;
  firstChoicePortfolio: string;
  secondChoiceCommittee?: string;
  secondChoicePortfolio?: string;
  thirdChoiceCommittee?: string;
  thirdChoicePortfolio?: string;
  priorExperience?: string;
  priorAccolades?: string;
  statement?: string;
  transactionId?: string;
}): Promise<{ success: boolean; trackingId?: string; error?: string }> {
  try {
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    return {
      success: res.ok && !!data.success,
      trackingId: data.trackingId,
      error: data.error,
    };
  } catch (err) {
    console.warn('[Registration API] Deferred to mailbox fallback:', err);
    return { success: false, error: 'Network unavailable' };
  }
}

/**
 * Reset mailbox on server and locally to default sample partner inquiries (Admin Only).
 * Removes all test registration data without affecting Google Form.
 */
export async function resetMailboxToDefault(): Promise<PartnerMailEntry[]> {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('aequitas_delegate_applications');
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_PARTNER_MAILS));
    window.dispatchEvent(new Event('astitva_partner_submitted'));
  }

  const token = getAdminToken();
  if (token) {
    try {
      const res = await fetch('/api/mailbox/reset', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        if (data && Array.isArray(data.mails)) {
          if (typeof window !== 'undefined') {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data.mails));
            window.dispatchEvent(new Event('astitva_partner_submitted'));
          }
          return data.mails;
        }
      }
    } catch (err) {
      console.log('Server reset deferred:', err);
    }
  }

  return SAMPLE_PARTNER_MAILS;
}
