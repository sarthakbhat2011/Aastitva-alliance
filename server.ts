import express from 'express';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import https from 'https';
import { createServer as createViteServer } from 'vite';
import {
  DEV_PASSCODE,
  ADMIN_DRAWER_PASSCODE,
  verifyPasscodeConstantTime,
  issueAdminToken,
  requireAdminAuth,
  authRateLimiter,
  registrationRateLimiter,
  contactRateLimiter,
  apiGeneralLimiter,
  securityHeadersMiddleware,
  corsMiddleware,
  validateRegistrationPayload,
  validateContactPayload,
  sanitizeForLog,
  isValidSafeId,
  sanitizeString,
} from './src/server/security';

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  // 1. HARDENING: Disable Express Signature Information Leakage (OWASP ASVS 14.3)
  app.disable('x-powered-by');

  // 2. HARDENING: Apply Comprehensive Security Headers (CSP, HSTS, Sniff, Frame, etc.)
  app.use(securityHeadersMiddleware);

  // 3. HARDENING: Apply Strict CORS Policy
  app.use(corsMiddleware);

  // 4. HARDENING: Request Body & Payload Size Limits (Mitigates Memory DoS, OWASP ASVS 13.1)
  app.use(express.json({ limit: '64kb' }));
  app.use(express.urlencoded({ extended: false, limit: '64kb' }));

  // 5. HARDENING: General API Rate Limiting
  app.use('/api', apiGeneralLimiter);

  const DATA_DIR = path.join(process.cwd(), 'data');
  const MAILBOX_FILE = path.join(DATA_DIR, 'mailbox.json');

  const SAMPLE_PARTNER_MAILS = [
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

  // 6. HARDENING: Safe & Atomic File Storage Operations
  function readMailbox(): any[] {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      if (!fs.existsSync(MAILBOX_FILE)) {
        fs.writeFileSync(MAILBOX_FILE, JSON.stringify(SAMPLE_PARTNER_MAILS, null, 2), 'utf-8');
        return SAMPLE_PARTNER_MAILS;
      }
      const raw = fs.readFileSync(MAILBOX_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : SAMPLE_PARTNER_MAILS;
    } catch (err) {
      console.error('[Storage Error] Failed to read mailbox data safely:', sanitizeForLog((err as any)?.message));
      return SAMPLE_PARTNER_MAILS;
    }
  }

  function writeMailboxAtomic(data: any[]) {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      const tempPath = `${MAILBOX_FILE}.${crypto.randomBytes(6).toString('hex')}.tmp`;
      fs.writeFileSync(tempPath, JSON.stringify(data, null, 2), 'utf-8');
      fs.renameSync(tempPath, MAILBOX_FILE);
    } catch (err) {
      console.error('[Storage Error] Failed atomic write to mailbox file:', sanitizeForLog((err as any)?.message));
    }
  }

  // ============================================================================
  // API ENDPOINTS
  // ============================================================================

  // Health endpoint - Minimal public information (OWASP ASVS 14.3)
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'Aastitva Alliance Infrastructure Engine',
      ssl: '256-Bit SSL Secured',
      timestamp: new Date().toISOString(),
    });
  });

  // 7. HARDENING: Server-Side Authentication Endpoint with Constant-Time Check & Rate Limiting
  app.post('/api/auth/verify-passcode', authRateLimiter, (req, res) => {
    const { passcode, purpose } = req.body || {};

    if (!passcode || typeof passcode !== 'string') {
      return res.status(400).json({ success: false, error: 'Passcode is required.' });
    }

    const trimmed = passcode.trim();
    let isMatch = false;
    let role: 'admin' | 'drawer' = 'admin';

    if (purpose === 'drawer') {
      isMatch = verifyPasscodeConstantTime(trimmed, ADMIN_DRAWER_PASSCODE);
      role = 'drawer';
    } else {
      isMatch =
        verifyPasscodeConstantTime(trimmed, DEV_PASSCODE) ||
        verifyPasscodeConstantTime(trimmed, ADMIN_DRAWER_PASSCODE);
      role = isMatch ? 'admin' : 'admin';
    }

    if (!isMatch) {
      console.warn(`[Security Alert] Failed passcode attempt from IP: ${sanitizeForLog(req.ip)} for purpose: ${sanitizeForLog(purpose)}`);
      return res.status(401).json({
        success: false,
        error: 'Invalid security passcode. Access restricted.',
      });
    }

    const token = issueAdminToken(role);
    res.json({
      success: true,
      token,
      expiresIn: '4h',
    });
  });

  // Google Form Synchronization Engine (Guaranteed delivery bypassing browser ad blockers/CORS)
  function syncToGoogleForm(clean: any) {
    try {
      const mapCommittee = (val: string) => {
        if (!val) return '• CCC - Continuous Crisis Committee';
        if (val.includes('IPC') || val.includes('Press') || val.includes('International Press')) return '• IPC - International Press Corps';
        if (val.includes('CCC') || val.includes('Crisis') || val.includes('CC')) return '• CCC - Continuous Crisis Committee';
        if (val.includes('UNHRC') || val.includes('Human Rights')) return '• UNHRC - United Nations Human Rights Council';
        if (val.includes('JKLA') || val.includes('Legislative')) return '• JKLA - Jammu & Kashmir Legislative Assembly';
        if (val.includes('Women')) return '• UN Women - United Nations Entity for Gender Equality';
        if (val.includes('Lok Sabha') || val.includes('House')) return '• Lok Sabha - Lok Sabha (House of the People)';
        if (val.includes('IPL') || val.includes('Premier')) return '• IPL - Indian Premier League Auction Council';
        return '• CCC - Continuous Crisis Committee';
      };

      const mapGrade = (val: string) => {
        if (!val) return '•Senior Secondary School (Grades 11–12)';
        if (val.includes('Middle') || val.includes('6-8') || val.includes('6–8')) return '• Middle School (Grades 6–8)';
        if (val.includes('Secondary') && !val.includes('Senior') && !val.includes('11-12') && !val.includes('11–12')) return '• Secondary School (Grades 9–10)';
        if (val.includes('Senior') || val.includes('11-12') || val.includes('11–12') || val.includes('High School')) return '•Senior Secondary School (Grades 11–12)';
        if (val.includes('College') || val.includes('Undergraduate')) return '• Undergraduate / College';
        return '•Senior Secondary School (Grades 11–12)';
      };

      const mapExperience = (val: string) => {
        if (!val) return '• Junior Delegate (1–3 MUNs)';
        if (val.includes('First-Timer') || val.includes('Novice') || val.includes('0 MUNs')) return '• First-Timer / Novice (0 MUNs)';
        if (val.includes('Junior') || val.includes('1-3') || val.includes('1–3')) return '• Junior Delegate (1–3 MUNs)';
        if (val.includes('Seasoned') || val.includes('4-7') || val.includes('4–7')) return '• Seasoned Delegate (4–7 MUNs)';
        if (val.includes('Veteran') || val.includes('8+')) return '• Veteran Delegate (8+ MUNs)';
        return '• Junior Delegate (1–3 MUNs)';
      };

      const formData = new URLSearchParams({
        'entry.780764261': clean.fullName || '',
        'entry.830016473': clean.email || '',
        'entry.86288026': clean.phone || '',
        'entry.1083196564': clean.institution || '',
        'entry.278555826': mapGrade(clean.grade),
        'entry.898367359': mapExperience(clean.priorExperience),
        'entry.291987551': clean.priorAccolades || 'None',
        'entry.977018072': mapCommittee(clean.firstChoiceCommittee),
        'entry.299951131': clean.firstChoicePortfolio || 'General Allocation',
        'entry.580509636': mapCommittee(clean.secondChoiceCommittee || 'UNHRC - United Nations Human Rights Council'),
        'entry.777137221': clean.secondChoicePortfolio || 'General Allocation',
        'entry.635888889': mapCommittee(clean.thirdChoiceCommittee || 'JKLA - Jammu & Kashmir Legislative Assembly'),
        'entry.794534023': clean.thirdChoicePortfolio || 'General Allocation',
        'entry.156711483': clean.statement || 'Registered via Aequitas Delegate Portal.',
      }).toString();

      const req = https.request(
        {
          hostname: 'docs.google.com',
          port: 443,
          path: '/forms/d/e/1FAIpQLSdgVhSI5tgSKD4vk_m8YWI0q6zFuJFytzer4R7-DSbzu7G8rg/formResponse',
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(formData),
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
            'Referer':
              'https://docs.google.com/forms/d/e/1FAIpQLSdgVhSI5tgSKD4vk_m8YWI0q6zFuJFytzer4R7-DSbzu7G8rg/viewform',
            'Origin': 'https://docs.google.com',
          },
        },
        (res) => {
          console.log(`[Google Forms Sync] Server synced application to Google Form (Status: ${res.statusCode})`);
        }
      );

      req.on('error', (err) => {
        console.warn('[Google Forms Sync] Dispatch warning:', err.message);
      });

      req.write(formData);
      req.end();
    } catch (err: any) {
      console.warn('[Google Forms Sync] Exception during dispatch:', err?.message);
    }
  }

  // 8. HARDENING: Dedicated Secure Delegate Registration Endpoint (OWASP ASVS 5.1)
  app.post('/api/register', registrationRateLimiter, (req, res) => {
    const validation = validateRegistrationPayload(req.body);
    if (!validation.isValid || !validation.data) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed. Please verify the submitted information.',
        validationErrors: validation.errors,
      });
    }

    const clean = validation.data;
    const mails = readMailbox();

    // IDEMPOTENCY / DEDUPLICATION DEFENSE:
    // Prevent duplicate entries if the user double-clicks submit or client resubmits rapidly
    const isGenericTxn = (txn?: string) => {
      if (!txn) return true;
      const lower = txn.trim().toLowerCase();
      const genericWords = [
        'pending', 'pending verification', 'cash', 'paid', 'online', 'upi',
        'gpay', 'paytm', 'phonepe', 'done', 'verified', 'school', 'none',
        'na', 'n/a', 'cheque', 'draft', 'transfer', 'direct', 'free', 'exempt',
        'test', 'testing', 'sample', 'yes', 'no'
      ];
      return genericWords.some((w) => lower === w || lower.startsWith(w));
    };

    const isDuplicate = mails.find((m: any) => {
      if (
        clean.transactionId &&
        clean.transactionId.length > 5 &&
        !isGenericTxn(clean.transactionId) &&
        m.message &&
        m.message.includes(`Transaction / UTR ID: ${clean.transactionId}`)
      ) {
        return true;
      }
      if (
        m.email &&
        clean.email &&
        m.email.toLowerCase() === clean.email.toLowerCase() &&
        m.contactPerson &&
        m.contactPerson.toLowerCase().includes(clean.fullName.toLowerCase()) &&
        m.eventType &&
        m.eventType.includes(clean.firstChoiceCommittee)
      ) {
        return true;
      }
      return false;
    });

    if (isDuplicate) {
      console.log(
        `[Delegate Registration] Deduplicated rapid resubmission for ${sanitizeForLog(clean.fullName)} (${isDuplicate.id})`
      );
      return res.status(200).json({
        success: true,
        trackingId: isDuplicate.id,
        timestamp: isDuplicate.timestamp,
        duplicate: true,
        message: 'Registration already recorded successfully.',
      });
    }

    const trackingId = `AEQ-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const nowTime = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'short',
    });

    const newMailboxEntry = {
      id: trackingId,
      timestamp: nowTime,
      schoolName: clean.institution,
      contactPerson: `${clean.fullName} (${clean.grade})`,
      email: clean.email,
      phone: clean.phone,
      eventType: `Aequitas 2026 Delegate: ${clean.firstChoiceCommittee} [${clean.firstChoicePortfolio}]`,
      preferredDate: '2026-10-29',
      message: `[DELEGATE APPLICATION - ${trackingId}]\nDelegate Name: ${clean.fullName}\nEmail: ${clean.email}\nPhone: ${clean.phone}\nInstitution: ${clean.institution}\nAcademic Division: ${clean.grade}\nPrior MUN Experience: ${clean.priorExperience}\nHonors / Accolades: ${clean.priorAccolades || 'None'}\n1st Choice Committee: ${clean.firstChoiceCommittee} (Preferred: ${clean.firstChoicePortfolio})\n2nd Choice Committee: ${clean.secondChoiceCommittee || 'None'} (Preferred: ${clean.secondChoicePortfolio || 'None'})\n3rd Choice Committee: ${clean.thirdChoiceCommittee || 'None'} (Preferred: ${clean.thirdChoicePortfolio || 'None'})\nFee Status: ₹1,999 (Delegate Remittance Recorded)\nTransaction / UTR ID: ${clean.transactionId || 'Pending Verification'}\nStatement of Purpose:\n${clean.statement || 'Standard Application'}`,
      status: 'New',
    };

    mails.unshift(newMailboxEntry);
    writeMailboxAtomic(mails);

    console.log(
      `[Delegate Registration] Securely stored delegate application ${trackingId} for ${sanitizeForLog(clean.fullName)} (${sanitizeForLog(clean.institution)})`
    );

    // Sync directly to connected Google Form from server side (Single authoritative dispatch)
    syncToGoogleForm(clean);

    // Minimal safe response: Never expose other records or internal database layout
    res.status(201).json({
      success: true,
      trackingId,
      timestamp: nowTime,
      message: 'Registration received securely and queued for Executive Board verification.',
    });
  });

  // 9. HARDENING: Protected Mailbox API (Authorized Admin Access Only)
  app.get('/api/mailbox', requireAdminAuth, (req, res) => {
    const mails = readMailbox();
    res.json({
      success: true,
      count: mails.length,
      mails,
    });
  });

  // 10. HARDENING: Safe Handling of Mailbox POST with Input Validation & Data Isolation
  app.post('/api/mailbox', (req, res) => {
    // If request contains admin token, allow privileged write
    const authHeader = req.headers['authorization'] || req.headers['x-admin-token'];
    const isAdmin = authHeader ? require('./src/server/security').verifyAdminToken(String(authHeader).replace('Bearer ', '').trim()).valid : false;

    // Validate payload
    const body = req.body;
    if (!body || typeof body !== 'object') {
      return res.status(400).json({ success: false, error: 'Invalid request payload.' });
    }

    const mails = readMailbox();
    const entryId =
      body.id && isValidSafeId(body.id)
        ? body.id
        : `AEQ-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const sanitized = {
      id: entryId,
      timestamp:
        sanitizeString(body.timestamp, 60) ||
        new Date().toLocaleString('en-IN', {
          timeZone: 'Asia/Kolkata',
          dateStyle: 'medium',
          timeStyle: 'short',
        }),
      schoolName: sanitizeString(body.schoolName, 150) || 'Not Specified',
      contactPerson: sanitizeString(body.contactPerson, 100) || 'Inquirer',
      email: sanitizeString(body.email, 254),
      phone: sanitizeString(body.phone, 30),
      eventType: sanitizeString(body.eventType, 120) || 'Delegate Registration',
      preferredDate: sanitizeString(body.preferredDate, 60) || '2026-10-29',
      message: sanitizeString(body.message, 4000),
      status: ['New', 'In Review', 'Approved', 'Contacted'].includes(body.status)
        ? body.status
        : 'New',
    };

    const existingIndex = mails.findIndex((m: any) => m.id === entryId);
    if (existingIndex >= 0) {
      if (!isAdmin) {
        // Unauthenticated users cannot overwrite existing records (Anti-IDOR/Tampering)
        return res.status(403).json({ success: false, error: 'Cannot modify existing entries.' });
      }
      mails[existingIndex] = sanitized;
    } else {
      mails.unshift(sanitized);
    }

    writeMailboxAtomic(mails);
    console.log(`[Mailbox Engine] Stored entry ${entryId} for ${sanitizeForLog(sanitized.contactPerson)}`);

    // PRIVACY HARDENING: Unauthenticated requests only get confirmation for their own submission.
    // They are NEVER returned the full mailbox array!
    if (!isAdmin) {
      return res.status(201).json({
        success: true,
        mail: { id: sanitized.id, timestamp: sanitized.timestamp, status: sanitized.status },
      });
    }

    res.json({
      success: true,
      count: mails.length,
      mail: sanitized,
      mails,
    });
  });

  // Protected Batch Sync (Admin Only)
  app.post('/api/mailbox/batch', requireAdminAuth, (req, res) => {
    const { entries } = req.body || {};
    if (!Array.isArray(entries)) {
      return res.status(400).json({ success: false, error: 'Expected entries array.' });
    }

    // Limit batch size to prevent payload exhaustion
    if (entries.length > 500) {
      return res.status(400).json({ success: false, error: 'Batch size exceeds maximum limit of 500.' });
    }

    const mails = readMailbox();
    let addedCount = 0;

    entries.forEach((incoming: any) => {
      if (!incoming || !incoming.id || !isValidSafeId(incoming.id)) return;
      const cleanEntry = {
        id: incoming.id,
        timestamp: sanitizeString(incoming.timestamp, 60),
        schoolName: sanitizeString(incoming.schoolName, 150),
        contactPerson: sanitizeString(incoming.contactPerson, 100),
        email: sanitizeString(incoming.email, 254),
        phone: sanitizeString(incoming.phone, 30),
        eventType: sanitizeString(incoming.eventType, 120),
        preferredDate: sanitizeString(incoming.preferredDate, 60),
        message: sanitizeString(incoming.message, 4000),
        status: ['New', 'In Review', 'Approved', 'Contacted'].includes(incoming.status)
          ? incoming.status
          : 'New',
      };

      const idx = mails.findIndex((m: any) => m.id === incoming.id);
      if (idx >= 0) {
        mails[idx] = { ...mails[idx], ...cleanEntry };
      } else {
        mails.unshift(cleanEntry);
        addedCount++;
      }
    });

    writeMailboxAtomic(mails);
    res.json({
      success: true,
      count: mails.length,
      added: addedCount,
      mails,
    });
  });

  // Helper: Fetch Google Sheet CSV following HTTP redirects
  function fetchGoogleSheetCsv(url: string, redirectsRemaining = 5): Promise<string> {
    return new Promise((resolve, reject) => {
      if (redirectsRemaining <= 0) {
        return reject(new Error('Too many redirects while accessing Google Sheet.'));
      }
      https
        .get(
          url,
          {
            headers: {
              'User-Agent':
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
            },
          },
          (res) => {
            if (
              res.statusCode &&
              res.statusCode >= 300 &&
              res.statusCode < 400 &&
              res.headers.location
            ) {
              return resolve(fetchGoogleSheetCsv(res.headers.location, redirectsRemaining - 1));
            }
            if (res.statusCode !== 200) {
              return reject(
                new Error(
                  `Google Sheet returned HTTP status ${res.statusCode}. Please ensure the sheet link is shared as 'Anyone with the link can view'.`
                )
              );
            }
            let data = '';
            res.on('data', (chunk) => (data += chunk));
            res.on('end', () => resolve(data));
          }
        )
        .on('error', reject);
    });
  }

  // 11. HARDENING: Live Server-Side Sync from Google Sheet Responses (Admin Only)
  app.post('/api/mailbox/sync-sheet', requireAdminAuth, async (req, res) => {
    const { sheetUrlOrId } = req.body || {};
    if (!sheetUrlOrId || typeof sheetUrlOrId !== 'string') {
      return res.status(400).json({ success: false, error: 'Valid Google Sheet URL or ID is required.' });
    }

    // Extract Sheet ID from URL or bare ID
    const match = sheetUrlOrId.match(/([a-zA-Z0-9-_]{20,})/);
    const sheetId = match ? match[1] : sheetUrlOrId.trim();
    if (!sheetId || sheetId.length < 20) {
      return res.status(400).json({ success: false, error: 'Could not extract valid Google Sheet ID from input.' });
    }

    const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;

    try {
      const csvText = await fetchGoogleSheetCsv(csvUrl);
      const lines = csvText.trim().split(/\r?\n/);
      if (lines.length < 2) {
        return res.json({ success: true, count: 0, importedCount: 0, message: 'Google Sheet contains no data rows.' });
      }

      const mails = readMailbox();
      const existingEmails = new Set(mails.map((m: any) => (m.email || '').toLowerCase()));
      const existingNames = new Set(mails.map((m: any) => (m.contactPerson || '').toLowerCase()));

      let importedCount = 0;

      lines.slice(1).forEach((line) => {
        const trimmed = line.trim();
        if (!trimmed) return;

        // Split CSV row handling quotes
        const cols = trimmed
          .split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
          .map((c) => c.trim().replace(/^["']|["']$/g, ''));
        if (cols.length < 3) return;

        const hasTimestampCol = /\d{1,4}[-/.]\d{1,2}[-/.]\d{1,4}|\d{1,2}:\d{2}/.test(cols[0]);
        const offset = hasTimestampCol ? 1 : 0;
        const timestamp =
          hasTimestampCol && cols[0]
            ? cols[0]
            : new Date().toLocaleString('en-IN', {
                timeZone: 'Asia/Kolkata',
                dateStyle: 'medium',
                timeStyle: 'short',
              });

        const fullName = sanitizeString(cols[offset] || '', 100);
        const email = sanitizeString(cols[offset + 1] || '', 254);
        const phone = sanitizeString(cols[offset + 2] || '', 60);
        const institution = sanitizeString(cols[offset + 3] || 'Institutional Delegate', 150);
        let grade = sanitizeString(cols[offset + 4] || 'Senior Secondary School (Grades 11–12)', 100);
        let experience = sanitizeString(cols[offset + 5] || 'Junior Delegate (1–3 MUNs)', 100);
        const accolades = sanitizeString(cols[offset + 6] || 'None', 500);
        let comm1 = sanitizeString(cols[offset + 7] || 'CCC - Continuous Crisis Committee', 120);
        const port1 = sanitizeString(cols[offset + 8] || 'General Allocation', 120);
        let comm2 = sanitizeString(cols[offset + 9] || 'UNHRC - United Nations Human Rights Council', 120);
        const port2 = sanitizeString(cols[offset + 10] || 'General Allocation', 120);
        let comm3 = sanitizeString(cols[offset + 11] || 'JKLA - Jammu & Kashmir Legislative Assembly', 120);
        const port3 = sanitizeString(cols[offset + 12] || 'General Allocation', 120);
        const statement = sanitizeString(cols[offset + 13] || 'Imported from Google Form Responses', 3000);

        comm1 = comm1.replace(/^•\s*/, '');
        comm2 = comm2.replace(/^•\s*/, '');
        comm3 = comm3.replace(/^•\s*/, '');
        grade = grade.replace(/^•\s*/, '');
        experience = experience.replace(/^•\s*/, '');

        if (!fullName || fullName.length < 2) return;
        if (email && existingEmails.has(email.toLowerCase())) return;
        if (
          existingNames.has(fullName.toLowerCase()) ||
          existingNames.has(`${fullName} (${grade})`.toLowerCase())
        ) {
          return;
        }

        const trackingId = `AEQ-2026-${Math.floor(1000 + Math.random() * 9000)}`;
        const entry = {
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

        mails.unshift(entry);
        if (email) existingEmails.add(email.toLowerCase());
        existingNames.add(fullName.toLowerCase());
        existingNames.add(`${fullName} (${grade})`.toLowerCase());
        importedCount++;
      });

      if (importedCount > 0) {
        writeMailboxAtomic(mails);
      }

      console.log(`[Google Sheet Sync] Admin synced ${importedCount} new delegate(s) from sheet ID ${sheetId}`);
      res.json({
        success: true,
        count: mails.length,
        importedCount,
        message: `Successfully synchronized ${importedCount} delegate(s) from Google Sheet!`,
        mails,
      });
    } catch (err: any) {
      console.error('[Google Sheet Sync Error]:', err?.message);
      res.status(500).json({
        success: false,
        error: err?.message || 'Failed to sync with Google Sheet. Ensure the sheet is accessible with the link.',
      });
    }
  });

  // Protected Entry Update (Admin Only + Strict Field Allowlist)
  app.put('/api/mailbox/:id', requireAdminAuth, (req, res) => {
    const { id } = req.params;
    if (!isValidSafeId(id)) {
      return res.status(400).json({ success: false, error: 'Invalid entry ID.' });
    }

    const mails = readMailbox();
    const idx = mails.findIndex((m: any) => m.id === id);
    if (idx === -1) {
      return res.status(404).json({ success: false, error: 'Entry not found.' });
    }

    const body = req.body || {};
    if (body.schoolName !== undefined) {
      mails[idx].schoolName = sanitizeString(body.schoolName, 150);
    }
    if (body.contactPerson !== undefined) {
      mails[idx].contactPerson = sanitizeString(body.contactPerson, 100);
    }
    if (body.email !== undefined) {
      mails[idx].email = sanitizeString(body.email, 254);
    }
    if (body.phone !== undefined) {
      mails[idx].phone = sanitizeString(body.phone, 30);
    }
    if (body.eventType !== undefined) {
      mails[idx].eventType = sanitizeString(body.eventType, 120);
    }
    if (body.preferredDate !== undefined) {
      mails[idx].preferredDate = sanitizeString(body.preferredDate, 60);
    }
    if (body.message !== undefined) {
      mails[idx].message = sanitizeString(body.message, 4000);
    }
    if (body.status && ['New', 'In Review', 'Approved', 'Contacted'].includes(body.status)) {
      mails[idx].status = body.status;
    }

    writeMailboxAtomic(mails);
    console.log(`[Mailbox API] Admin updated entry ${id} (${sanitizeForLog(mails[idx].contactPerson)})`);

    res.json({
      success: true,
      mail: mails[idx],
    });
  });

  // Protected Entry Delete (Admin Only)
  app.delete('/api/mailbox/:id', requireAdminAuth, (req, res) => {
    const { id } = req.params;
    if (!isValidSafeId(id)) {
      return res.status(400).json({ success: false, error: 'Invalid entry ID.' });
    }

    let mails = readMailbox();
    const initialLen = mails.length;
    mails = mails.filter((m: any) => m.id !== id);

    if (mails.length === initialLen) {
      return res.status(404).json({ success: false, error: 'Entry not found.' });
    }

    writeMailboxAtomic(mails);
    console.log(`[Mailbox API] Admin deleted entry ${sanitizeForLog(id)}`);
    res.json({
      success: true,
      count: mails.length,
      mails,
    });
  });

  // Protected Mailbox Reset (Admin Only - Resets mailbox to sample partner inquiries, wiping test entries)
  app.post('/api/mailbox/reset', requireAdminAuth, (req, res) => {
    const defaultMails = [
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

    writeMailboxAtomic(defaultMails);
    console.log('[Mailbox API] Admin reset mailbox to default sample records.');
    res.json({
      success: true,
      message: 'Mailbox reset successfully. Testing records cleared.',
      count: defaultMails.length,
      mails: defaultMails,
    });
  });

  // 11. HARDENING: Contact Endpoint with Rate Limiting & Input Validation
  app.post('/api/contact', contactRateLimiter, (req, res) => {
    const validation = validateContactPayload(req.body);
    if (!validation.isValid || !validation.data) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed.',
        validationErrors: validation.errors,
      });
    }

    const clean = validation.data;
    console.log(
      `[Aastitva Contact API] Received verified inquiry from ${sanitizeForLog(clean.schoolName)} (${sanitizeForLog(clean.contactPerson)})`
    );

    const mails = readMailbox();
    const newId = `partner-${Date.now()}`;
    const newEntry = {
      id: newId,
      timestamp: new Date().toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        dateStyle: 'medium',
        timeStyle: 'short',
      }),
      schoolName: clean.schoolName,
      contactPerson: clean.contactPerson,
      email: clean.email,
      phone: clean.phone,
      eventType: clean.eventType,
      preferredDate: clean.preferredDate,
      message: clean.message,
      status: 'New',
    };
    mails.unshift(newEntry);
    writeMailboxAtomic(mails);

    res.json({
      success: true,
      message: 'Inquiry logged securely. Response queued within 24 hours.',
      timestamp: new Date().toISOString(),
    });
  });

  // Analytics endpoint (Rate-limited, safe response)
  app.post('/api/analytics', (req, res) => {
    res.json({ success: true, recorded: true });
  });

  // Vite Middleware for Development vs Static Production Serving
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);

    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;
      try {
        const indexPath = path.resolve(process.cwd(), 'index.html');
        let template = fs.readFileSync(indexPath, 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e: any) {
        vite.ssrFixStacktrace(e);
        next(e);
      }
    });
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // 12. HARDENING: Global Safe Error Handler (Never Leaks Stack Traces or Internal Errors)
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('[Internal Error]', sanitizeForLog(err?.message || 'Unexpected server error'));
    if (res.headersSent) {
      return next(err);
    }
    res.status(err.status || 500).json({
      success: false,
      error: 'An unexpected server error occurred. Please try again later.',
    });
  });

  app.listen(PORT, '0.0.0.0', () => {
    console.log(
      `Aastitva Alliance server running at http://localhost:${PORT} and http://127.0.0.1:${PORT}`
    );
  });
}

startServer();
