import crypto from 'crypto';
import { Request, Response, NextFunction } from 'express';

// ============================================================================
// ENVIRONMENT & SECRETS MANAGEMENT
// ============================================================================
// Provide secure fallback for migration while prominently logging advisory.
// In production, configure DEV_PASSCODE, ADMIN_DRAWER_PASSCODE & SESSION_SECRET in Render environment.
export const DEV_PASSCODE: string =
  process.env.DEV_PASSCODE || 'bhatsarthakunrivalledunion2011,2001';

export const ADMIN_DRAWER_PASSCODE: string =
  process.env.ADMIN_DRAWER_PASSCODE || 'astitva2026insansadxaequitas';

// Secret key for HMAC token signing (minimum 32 bytes)
export const SESSION_SECRET: string =
  process.env.SESSION_SECRET ||
  crypto.randomBytes(32).toString('hex');

if (!process.env.DEV_PASSCODE || !process.env.SESSION_SECRET) {
  console.warn(
    '[SECURITY NOTICE] DEV_PASSCODE or SESSION_SECRET not set in environment. Using fallback. Set these in Render Environment Variables.'
  );
}

// ============================================================================
// CRYPTOGRAPHIC CONSTANT-TIME PASSCODE VERIFICATION (OWASP ASVS 2.10)
// ============================================================================
/**
 * Constant-time comparison using SHA-256 digest comparison.
 * Eliminates timing attacks and length side-channel leaks.
 */
export function verifyPasscodeConstantTime(provided: string, expected: string): boolean {
  if (typeof provided !== 'string' || typeof expected !== 'string') {
    return false;
  }
  const h1 = crypto.createHash('sha256').update(provided, 'utf8').digest();
  const h2 = crypto.createHash('sha256').update(expected, 'utf8').digest();
  return crypto.timingSafeEqual(h1, h2);
}

// ============================================================================
// CRYPTOGRAPHIC SESSION TOKENS (OWASP ASVS 3.2, 3.4)
// ============================================================================
interface TokenPayload {
  role: 'admin' | 'drawer';
  iat: number;
  exp: number;
  nonce: string;
}

const TOKEN_EXPIRY_MS = 4 * 60 * 60 * 1000; // 4 hours

export function issueAdminToken(role: 'admin' | 'drawer' = 'admin'): string {
  const payload: TokenPayload = {
    role,
    iat: Date.now(),
    exp: Date.now() + TOKEN_EXPIRY_MS,
    nonce: crypto.randomBytes(16).toString('hex'),
  };

  const payloadB64 = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(payloadB64)
    .digest('base64url');

  return `${payloadB64}.${signature}`;
}

export function verifyAdminToken(token: string): { valid: boolean; role?: string } {
  if (!token || typeof token !== 'string') {
    return { valid: false };
  }

  const parts = token.split('.');
  if (parts.length !== 2) {
    return { valid: false };
  }

  const [payloadB64, signature] = parts;
  const expectedSig = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(payloadB64)
    .digest('base64url');

  const bufA = Buffer.from(signature, 'utf8');
  const bufB = Buffer.from(expectedSig, 'utf8');
  if (bufA.length !== bufB.length || !crypto.timingSafeEqual(bufA, bufB)) {
    return { valid: false };
  }

  try {
    const payload: TokenPayload = JSON.parse(
      Buffer.from(payloadB64, 'base64url').toString('utf8')
    );

    if (Date.now() > payload.exp) {
      return { valid: false };
    }

    return { valid: true, role: payload.role };
  } catch {
    return { valid: false };
  }
}

/**
 * Express middleware for endpoints requiring admin privileges.
 */
export function requireAdminAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  let token = '';

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7).trim();
  } else if (req.headers['x-admin-token']) {
    token = String(req.headers['x-admin-token']).trim();
  }

  const { valid, role } = verifyAdminToken(token);
  if (!valid) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized: Valid administration security token required.',
    });
  }

  (req as any).adminRole = role;
  next();
}

// ============================================================================
// RATE LIMITING & ABUSE PREVENTION (OWASP ASVS 2.4, 13.1)
// ============================================================================
interface RateLimitRecord {
  count: number;
  resetTime: number;
}

export function createRateLimiter(options: {
  windowMs: number;
  maxRequests: number;
  message: string;
}) {
  const store = new Map<string, RateLimitRecord>();

  // Cleanup expired entries periodically to prevent memory exhaustion
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of store.entries()) {
      if (now > record.resetTime) {
        store.delete(key);
      }
    }
  }, 60000).unref();

  return (req: Request, res: Response, next: NextFunction) => {
    // Get client IP safely
    const forwarded = req.headers['x-forwarded-for'];
    const ip =
      typeof forwarded === 'string'
        ? forwarded.split(',')[0].trim()
        : req.socket.remoteAddress || 'unknown';

    const key = `${ip}`;
    const now = Date.now();
    let record = store.get(key);

    if (!record || now > record.resetTime) {
      record = { count: 1, resetTime: now + options.windowMs };
      store.set(key, record);
      return next();
    }

    record.count++;
    if (record.count > options.maxRequests) {
      const retrySecs = Math.ceil((record.resetTime - now) / 1000);
      res.setHeader('Retry-After', String(retrySecs));
      return res.status(429).json({
        success: false,
        error: options.message,
        retryAfterSeconds: retrySecs,
      });
    }

    next();
  };
}

// Rate Limiter instances
export const authRateLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 mins
  maxRequests: 10,
  message: 'Too many authentication attempts. Please wait 15 minutes before retrying.',
});

export const registrationRateLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 mins
  maxRequests: 100, // Accommodates school computer labs and shared institutional IP delegations
  message: 'Registration rate limit exceeded. Please wait a few minutes before submitting again.',
});

export const contactRateLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 mins
  maxRequests: 15,
  message: 'Contact inquiry rate limit exceeded. Please wait a few minutes before submitting again.',
});

export const apiGeneralLimiter = createRateLimiter({
  windowMs: 10 * 60 * 1000, // 10 mins
  maxRequests: 200,
  message: 'API request limit exceeded. Please slow down.',
});

// ============================================================================
// INPUT SANITIZATION & STRICT VALIDATION (OWASP ASVS 5.1, 5.2, 5.5)
// ============================================================================
export function sanitizeString(val: unknown, maxLen = 255): string {
  if (val === null || val === undefined) return '';
  const str = String(val).normalize('NFC').trim();
  // Strip control characters except newline and tab
  const cleaned = str.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
  // Disarm potential HTML tags for defense-in-depth against stored XSS
  const disarmed = cleaned.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return disarmed.slice(0, maxLen);
}

export function isValidEmail(email: string): boolean {
  if (!email || email.length > 254 || email.length < 5) return false;
  // RFC 5322 compatible regex
  const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return re.test(email);
}

export function isValidPhone(phone: string): boolean {
  if (!phone) return false;
  const cleaned = phone.replace(/[^\d]/g, '');
  return cleaned.length >= 10 && cleaned.length <= 15 && phone.length <= 25;
}

export function isValidSafeId(id: string): boolean {
  if (!id || typeof id !== 'string') return false;
  return /^[A-Za-z0-9_.:-]{1,128}$/.test(id);
}

export interface CleanRegistration {
  fullName: string;
  email: string;
  phone: string;
  institution: string;
  grade: string;
  priorExperience: string;
  priorAccolades?: string;
  firstChoiceCommittee: string;
  firstChoicePortfolio: string;
  secondChoiceCommittee?: string;
  secondChoicePortfolio?: string;
  thirdChoiceCommittee?: string;
  thirdChoicePortfolio?: string;
  statement?: string;
  transactionId?: string;
  agreedToTerms?: boolean;
}

export function validateRegistrationPayload(body: any): {
  isValid: boolean;
  errors: Record<string, string>;
  data?: CleanRegistration;
} {
  const errors: Record<string, string> = {};

  if (!body || typeof body !== 'object') {
    return { isValid: false, errors: { general: 'Invalid JSON request payload.' } };
  }

  const fullName = sanitizeString(body.fullName, 100);
  if (!fullName || fullName.length < 3) {
    errors.fullName = 'Full legal name must be at least 3 characters.';
  }

  const email = sanitizeString(body.email, 254).toLowerCase();
  if (!isValidEmail(email)) {
    errors.email = 'A valid email address is required.';
  }

  const phone = sanitizeString(body.phone, 25);
  if (!isValidPhone(phone)) {
    errors.phone = 'A valid phone number with at least 10 digits is required.';
  }

  const institution = sanitizeString(body.institution, 150);
  if (!institution || institution.length < 2) {
    errors.institution = 'Institution name is required.';
  }

  const grade = sanitizeString(body.grade, 100) || 'High School (11-12)';
  const priorExperience = sanitizeString(body.priorExperience, 100) || '1-3 MUNs';
  const priorAccolades = sanitizeString(body.priorAccolades, 500);

  const firstChoiceCommittee = sanitizeString(body.firstChoiceCommittee, 120);
  if (!firstChoiceCommittee) {
    errors.firstChoiceCommittee = '1st Choice Committee is required.';
  }

  const firstChoicePortfolio = sanitizeString(body.firstChoicePortfolio, 120);

  const secondChoiceCommittee = sanitizeString(body.secondChoiceCommittee, 120);
  const secondChoicePortfolio = sanitizeString(body.secondChoicePortfolio, 120);
  const thirdChoiceCommittee = sanitizeString(body.thirdChoiceCommittee, 120);
  const thirdChoicePortfolio = sanitizeString(body.thirdChoicePortfolio, 120);

  const statement = sanitizeString(body.statement, 3000);
  const transactionId = sanitizeString(body.transactionId, 64);
  const agreedToTerms = Boolean(body.agreedToTerms);

  if (Object.keys(errors).length > 0) {
    return { isValid: false, errors };
  }

  return {
    isValid: true,
    errors: {},
    data: {
      fullName,
      email,
      phone,
      institution,
      grade,
      priorExperience,
      priorAccolades: priorAccolades || undefined,
      firstChoiceCommittee,
      firstChoicePortfolio: firstChoicePortfolio || 'General Allocation',
      secondChoiceCommittee: secondChoiceCommittee || undefined,
      secondChoicePortfolio: secondChoicePortfolio || undefined,
      thirdChoiceCommittee: thirdChoiceCommittee || undefined,
      thirdChoicePortfolio: thirdChoicePortfolio || undefined,
      statement: statement || undefined,
      transactionId: transactionId || undefined,
      agreedToTerms,
    },
  };
}

export interface CleanContact {
  schoolName: string;
  contactPerson: string;
  email: string;
  phone: string;
  eventType: string;
  preferredDate: string;
  message: string;
}

export function validateContactPayload(body: any): {
  isValid: boolean;
  errors: Record<string, string>;
  data?: CleanContact;
} {
  const errors: Record<string, string> = {};

  if (!body || typeof body !== 'object') {
    return { isValid: false, errors: { general: 'Invalid JSON request payload.' } };
  }

  const schoolName = sanitizeString(body.schoolName, 150);
  if (!schoolName || schoolName.length < 2) {
    errors.schoolName = 'School / institution name is required.';
  }

  const contactPerson = sanitizeString(body.contactPerson, 100);
  if (!contactPerson || contactPerson.length < 2) {
    errors.contactPerson = 'Contact person name is required.';
  }

  const email = sanitizeString(body.email, 254).toLowerCase();
  if (!isValidEmail(email)) {
    errors.email = 'A valid email address is required.';
  }

  const phone = sanitizeString(body.phone, 25);
  const eventType = sanitizeString(body.eventType, 100) || 'General Inquiry';
  const preferredDate = sanitizeString(body.preferredDate, 50) || '2026-10-29';
  const message = sanitizeString(body.message, 3000);

  if (Object.keys(errors).length > 0) {
    return { isValid: false, errors };
  }

  return {
    isValid: true,
    errors: {},
    data: {
      schoolName,
      contactPerson,
      email,
      phone,
      eventType,
      preferredDate,
      message,
    },
  };
}

// ============================================================================
// SECURE LOG SANITIZER (Prevents Log Injection & Masks PII)
// ============================================================================
export function sanitizeForLog(val: unknown): string {
  if (val === null || val === undefined) return '';
  const str = String(val).replace(/[\r\n]/g, ' ').trim();
  // Mask emails: a***@domain.com
  const maskedEmail = str.replace(
    /([a-zA-Z0-9._%+-]{1,2})[a-zA-Z0-9._%+-]*(@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g,
    '$1***$2'
  );
  // Mask phones: +91 99065 12613 -> +91 ****12613
  const maskedPhone = maskedEmail.replace(/(\+?\d{2,4}\s?)\d{3,6}(\d{4})/g, '$1****$2');
  return maskedPhone.slice(0, 150);
}

// ============================================================================
// SECURITY HEADERS MIDDLEWARE (OWASP ASVS 14.4)
// ============================================================================
export function securityHeadersMiddleware(req: Request, res: Response, next: NextFunction) {
  // Content Security Policy
  const cspDirectives = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://fonts.googleapis.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: blob: https://images.unsplash.com https://astitva-alliance-1.onrender.com https://*.onrender.com",
    "connect-src 'self' https://docs.google.com https://astitva-alliance-1.onrender.com https://*.onrender.com http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:*",
    "frame-ancestors 'self'",
    "form-action 'self' https://docs.google.com",
    "base-uri 'self'",
    "object-src 'none'",
    "upgrade-insecure-requests",
  ].join('; ');

  res.setHeader('Content-Security-Policy', cspDirectives);
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()');
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('X-XSS-Protection', '0');

  // HSTS on HTTPS connections
  if (req.secure || req.headers['x-forwarded-proto'] === 'https') {
    res.setHeader(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains; preload'
    );
  }

  // Prevent caching of sensitive API routes
  if (req.path.startsWith('/api/')) {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
  }

  next();
}

// ============================================================================
// CORS ENFORCEMENT
// ============================================================================
export function corsMiddleware(req: Request, res: Response, next: NextFunction) {
  const origin = req.headers['origin'];
  const allowedOrigins = [
    'https://astitva-alliance-1.onrender.com',
    'https://astitva-alliance.onrender.com',
    process.env.ALLOWED_ORIGIN,
  ].filter(Boolean);

  const isLocalhost =
    origin &&
    /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin) &&
    process.env.NODE_ENV !== 'production';

  if (origin && (allowedOrigins.includes(origin) || isLocalhost)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization, X-Admin-Token'
    );
  }

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  next();
}
