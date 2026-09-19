import { PartnerMailEntry } from '../types';

export const STORAGE_KEY = 'astitva_partner_mailbox';
export const AUTH_SESSION_KEY = 'astitva_dev_partner_authorized';
export const DEV_PASSCODE = 'bhatsarthakunrivalledunion2011,2001';

export const SAMPLE_PARTNER_MAILS: PartnerMailEntry[] = [
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

/**
 * Get all mailbox entries currently cached in browser localStorage.
 */
export function getLocalMailboxEntries(): PartnerMailEntry[] {
  if (typeof window === 'undefined') return SAMPLE_PARTNER_MAILS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_PARTNER_MAILS));
      return SAMPLE_PARTNER_MAILS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : SAMPLE_PARTNER_MAILS;
  } catch (err) {
    console.error('Error reading local mailbox entries:', err);
    return SAMPLE_PARTNER_MAILS;
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
    const response = await fetch('/api/mailbox', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
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
 */
export async function loadAllMailboxEntries(): Promise<PartnerMailEntry[]> {
  const localMails = getLocalMailboxEntries();

  if (typeof window === 'undefined') return localMails;

  try {
    const res = await fetch('/api/mailbox');
    if (res.ok) {
      const data = await res.json();
      const serverMails: PartnerMailEntry[] = Array.isArray(data.mails) ? data.mails : [];

      // Combine server and local without duplicates (keyed by ID)
      const map = new Map<string, PartnerMailEntry>();

      // Put server entries first
      serverMails.forEach((m) => {
        if (m.id) map.set(m.id, m);
      });

      // Also ensure any local-only entries are preserved
      const unsyncedEntries: PartnerMailEntry[] = [];
      localMails.forEach((m) => {
        if (m.id && !map.has(m.id)) {
          map.set(m.id, m);
          unsyncedEntries.push(m);
        }
      });

      const merged = Array.from(map.values());
      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));

      // If there are unsynced local entries, sync them up to the server in background
      if (unsyncedEntries.length > 0) {
        fetch('/api/mailbox/batch', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ entries: unsyncedEntries }),
        }).catch((err) => console.log('Batch sync background notice:', err));
      }

      return merged;
    }
  } catch (err) {
    console.log('Server mailbox fetch deferred (using local cache):', err);
  }

  return localMails;
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

  try {
    await fetch(`/api/mailbox/${encodeURIComponent(id)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });
  } catch (err) {
    console.log('Server status update deferred:', err);
  }

  return updated;
}

/**
 * Delete a mailbox entry from both local storage and server.
 */
export async function deleteMailboxEntry(id: string): Promise<PartnerMailEntry[]> {
  const local = getLocalMailboxEntries();
  const updated = local.filter((m) => m.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event('astitva_partner_submitted'));

  try {
    await fetch(`/api/mailbox/${encodeURIComponent(id)}`, {
      method: 'DELETE',
    });
  } catch (err) {
    console.log('Server delete deferred:', err);
  }

  return updated;
}
