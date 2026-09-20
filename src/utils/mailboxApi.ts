import { PartnerMailEntry } from '../types';

export const STORAGE_KEY = 'astitva_partner_mailbox';
export const AUTH_SESSION_KEY = 'astitva_dev_partner_authorized';
export const AUTH_TOKEN_KEY = 'astitva_admin_token';

// Deprecated: Passcode verification now happens exclusively on the server.
// Kept only as a temporary fallback constant to prevent compile breakages until rotated.
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

  const token = getAdminToken();
  if (!token) {
    // Not authenticated on server; return local cache
    return localMails;
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

      // For authenticated developer sessions, the server is the authoritative source of truth.
      // Overwrite local cache with authoritative server records so deleted/reset records stay deleted.
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(serverMails));
      } catch (quotaErr) {
        console.warn('LocalStorage quota reached; retaining full records in memory:', quotaErr);
      }
      return serverMails;
    } else if (res.status === 401) {
      // Token expired or invalid
      clearAdminSession();
    }
  } catch (err) {
    console.log('Server mailbox fetch deferred (using local cache):', err);
  }

  return localMails;
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
  const local = getLocalMailboxEntries();
  const updated = local.filter((m) => m.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event('astitva_partner_submitted'));

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
          localStorage.setItem(STORAGE_KEY, JSON.stringify(data.mails));
          window.dispatchEvent(new Event('astitva_partner_submitted'));
          return data.mails;
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
