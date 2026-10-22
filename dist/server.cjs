var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/server/security.ts
var security_exports = {};
__export(security_exports, {
  ADMIN_DRAWER_PASSCODE: () => ADMIN_DRAWER_PASSCODE,
  DEV_PASSCODE: () => DEV_PASSCODE,
  SESSION_SECRET: () => SESSION_SECRET,
  apiGeneralLimiter: () => apiGeneralLimiter,
  authRateLimiter: () => authRateLimiter,
  contactRateLimiter: () => contactRateLimiter,
  corsMiddleware: () => corsMiddleware,
  createRateLimiter: () => createRateLimiter,
  isValidEmail: () => isValidEmail,
  isValidPhone: () => isValidPhone,
  isValidSafeId: () => isValidSafeId,
  issueAdminToken: () => issueAdminToken,
  registrationRateLimiter: () => registrationRateLimiter,
  requireAdminAuth: () => requireAdminAuth,
  sanitizeForLog: () => sanitizeForLog,
  sanitizeString: () => sanitizeString,
  securityHeadersMiddleware: () => securityHeadersMiddleware,
  validateContactPayload: () => validateContactPayload,
  validateEventRegistrationPayload: () => validateEventRegistrationPayload,
  validateRegistrationPayload: () => validateRegistrationPayload,
  verifyAdminToken: () => verifyAdminToken,
  verifyPasscodeConstantTime: () => verifyPasscodeConstantTime
});
function verifyPasscodeConstantTime(provided, expected) {
  if (typeof provided !== "string" || typeof expected !== "string") {
    return false;
  }
  const h1 = import_crypto.default.createHash("sha256").update(provided, "utf8").digest();
  const h2 = import_crypto.default.createHash("sha256").update(expected, "utf8").digest();
  return import_crypto.default.timingSafeEqual(h1, h2);
}
function issueAdminToken(role = "admin") {
  const payload = {
    role,
    iat: Date.now(),
    exp: Date.now() + TOKEN_EXPIRY_MS,
    nonce: import_crypto.default.randomBytes(16).toString("hex")
  };
  const payloadB64 = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = import_crypto.default.createHmac("sha256", SESSION_SECRET).update(payloadB64).digest("base64url");
  return `${payloadB64}.${signature}`;
}
function verifyAdminToken(token) {
  if (!token || typeof token !== "string") {
    return { valid: false };
  }
  const parts = token.split(".");
  if (parts.length !== 2) {
    return { valid: false };
  }
  const [payloadB64, signature] = parts;
  const expectedSig = import_crypto.default.createHmac("sha256", SESSION_SECRET).update(payloadB64).digest("base64url");
  const bufA = Buffer.from(signature, "utf8");
  const bufB = Buffer.from(expectedSig, "utf8");
  if (bufA.length !== bufB.length || !import_crypto.default.timingSafeEqual(bufA, bufB)) {
    return { valid: false };
  }
  try {
    const payload = JSON.parse(
      Buffer.from(payloadB64, "base64url").toString("utf8")
    );
    if (Date.now() > payload.exp) {
      return { valid: false };
    }
    return { valid: true, role: payload.role };
  } catch {
    return { valid: false };
  }
}
function requireAdminAuth(req, res, next) {
  const authHeader = req.headers["authorization"];
  let token = "";
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.substring(7).trim();
  } else if (req.headers["x-admin-token"]) {
    token = String(req.headers["x-admin-token"]).trim();
  }
  const { valid, role } = verifyAdminToken(token);
  if (!valid) {
    return res.status(401).json({
      success: false,
      error: "Unauthorized: Valid administration security token required."
    });
  }
  req.adminRole = role;
  next();
}
function createRateLimiter(options) {
  const store = /* @__PURE__ */ new Map();
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of store.entries()) {
      if (now > record.resetTime) {
        store.delete(key);
      }
    }
  }, 6e4).unref();
  return (req, res, next) => {
    const authHeader = req.headers["authorization"] || req.headers["x-admin-token"];
    if (authHeader) {
      const token = String(authHeader).replace(/^Bearer\s+/i, "").trim();
      if (verifyAdminToken(token).valid) {
        return next();
      }
    }
    const forwarded = req.headers["x-forwarded-for"];
    const ip = typeof forwarded === "string" ? forwarded.split(",")[0].trim() : req.socket.remoteAddress || "unknown";
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
      const retrySecs = Math.ceil((record.resetTime - now) / 1e3);
      res.setHeader("Retry-After", String(retrySecs));
      return res.status(429).json({
        success: false,
        error: options.message,
        retryAfterSeconds: retrySecs
      });
    }
    next();
  };
}
function sanitizeString(val, maxLen = 255) {
  if (val === null || val === void 0) return "";
  const str = String(val).normalize("NFC").trim();
  const cleaned = str.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");
  const disarmed = cleaned.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return disarmed.slice(0, maxLen);
}
function isValidEmail(email) {
  if (!email || email.length > 254 || email.length < 5) return false;
  const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return re.test(email);
}
function isValidPhone(phone) {
  if (!phone) return false;
  const cleaned = phone.replace(/[^\d]/g, "");
  return cleaned.length >= 10 && phone.length <= 60;
}
function isValidSafeId(id) {
  if (!id || typeof id !== "string") return false;
  return /^[A-Za-z0-9_.:-]{1,128}$/.test(id);
}
function validateRegistrationPayload(body) {
  const errors = {};
  if (!body || typeof body !== "object") {
    return { isValid: false, errors: { general: "Invalid JSON request payload." } };
  }
  const fullName = sanitizeString(body.fullName, 100);
  if (!fullName || fullName.length < 3) {
    errors.fullName = "Full legal name must be at least 3 characters.";
  }
  const email = sanitizeString(body.email, 254).toLowerCase();
  if (!isValidEmail(email)) {
    errors.email = "A valid email address is required.";
  }
  const phone = sanitizeString(body.phone, 60);
  if (!isValidPhone(phone)) {
    errors.phone = "A valid phone number with at least 10 digits is required.";
  }
  const institution = sanitizeString(body.institution || body.schoolName, 150);
  if (!institution || institution.length < 2) {
    errors.institution = "Institution name is required.";
  }
  const grade = sanitizeString(body.grade, 100) || "High School (11-12)";
  const priorExperience = sanitizeString(body.priorExperience, 100) || "1-3 MUNs";
  const priorAccolades = sanitizeString(body.priorAccolades, 500);
  const firstChoiceCommittee = sanitizeString(body.firstChoiceCommittee, 120);
  if (!firstChoiceCommittee) {
    errors.firstChoiceCommittee = "1st Choice Committee is required.";
  }
  const firstChoicePortfolio = sanitizeString(body.firstChoicePortfolio, 120);
  const secondChoiceCommittee = sanitizeString(body.secondChoiceCommittee, 120);
  const secondChoicePortfolio = sanitizeString(body.secondChoicePortfolio, 120);
  const thirdChoiceCommittee = sanitizeString(body.thirdChoiceCommittee, 120);
  const thirdChoicePortfolio = sanitizeString(body.thirdChoicePortfolio, 120);
  const statement = sanitizeString(body.statement, 3e3);
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
      priorAccolades: priorAccolades || void 0,
      firstChoiceCommittee,
      firstChoicePortfolio: firstChoicePortfolio || "General Allocation",
      secondChoiceCommittee: secondChoiceCommittee || void 0,
      secondChoicePortfolio: secondChoicePortfolio || void 0,
      thirdChoiceCommittee: thirdChoiceCommittee || void 0,
      thirdChoicePortfolio: thirdChoicePortfolio || void 0,
      statement: statement || void 0,
      transactionId: transactionId || void 0,
      agreedToTerms,
      hasAccommodation: Boolean(body.hasAccommodation)
    }
  };
}
function validateEventRegistrationPayload(body) {
  const errors = {};
  if (!body || typeof body !== "object") {
    return { isValid: false, errors: { general: "Invalid JSON request payload." } };
  }
  const category = body.category === "prom" || body.category === "recreational" || body.category === "special" ? body.category : "prom";
  const categoryLabel = sanitizeString(body.categoryLabel, 80) || (category === "prom" ? "Prom Night" : category === "recreational" ? "Recreational Activities" : "Special Event: MUN got Latent");
  const selectionId = sanitizeString(body.selectionId, 80) || "default";
  const selectionTitle = sanitizeString(body.selectionTitle, 120) || "Event Access";
  const price = typeof body.price === "number" ? body.price : 0;
  const formattedPrice = sanitizeString(body.formattedPrice, 30) || (price === 0 ? "FREE" : `\u20B9${price}`);
  const fullName = sanitizeString(body.fullName, 100);
  if (!fullName || fullName.length < 3) {
    errors.fullName = "Full legal name must be at least 3 characters.";
  }
  const email = sanitizeString(body.email, 254).toLowerCase();
  if (!isValidEmail(email)) {
    errors.email = "A valid email address is required.";
  }
  const phone = sanitizeString(body.phone, 60);
  if (!isValidPhone(phone)) {
    errors.phone = "A valid phone number with at least 10 digits is required.";
  }
  const institution = sanitizeString(body.institution, 150);
  if (!institution || institution.length < 2) {
    errors.institution = "Institution / College / School name is required.";
  }
  let age = void 0;
  if (category === "prom") {
    const rawAge = parseInt(String(body.age), 10);
    if (isNaN(rawAge) || rawAge < 18) {
      errors.age = "Prom Night is strictly 18+ for college & undergraduate students.";
    } else {
      age = rawAge;
    }
  } else if (body.age !== void 0 && body.age !== null && String(body.age).trim() !== "") {
    const rawAge = parseInt(String(body.age), 10);
    if (!isNaN(rawAge) && rawAge > 0 && rawAge < 120) {
      age = rawAge;
    }
  }
  let talentDescription = void 0;
  if (category === "special") {
    talentDescription = sanitizeString(body.talentDescription, 2e3);
    if (!talentDescription || talentDescription.trim().length < 5) {
      errors.talentDescription = "Please describe the talent you will showcase.";
    }
  }
  let transactionId = void 0;
  if (price > 0) {
    transactionId = sanitizeString(body.transactionId, 64);
    if (!transactionId || transactionId.length < 5) {
      errors.transactionId = "Please enter your Transaction / UTR ID for verification.";
    }
  }
  const squadMembers = sanitizeString(body.squadMembers, 400);
  const member2Name = sanitizeString(body.member2Name, 100);
  const member3Name = sanitizeString(body.member3Name, 100);
  const member4Name = sanitizeString(body.member4Name, 100);
  if (Object.keys(errors).length > 0) {
    return { isValid: false, errors };
  }
  return {
    isValid: true,
    errors: {},
    data: {
      category,
      categoryLabel,
      selectionId,
      selectionTitle,
      price,
      formattedPrice,
      fullName,
      email,
      phone,
      institution,
      age,
      talentDescription,
      transactionId,
      squadMembers,
      member2Name,
      member3Name,
      member4Name,
      agreedToTerms: Boolean(body.agreedToTerms)
    }
  };
}
function validateContactPayload(body) {
  const errors = {};
  if (!body || typeof body !== "object") {
    return { isValid: false, errors: { general: "Invalid JSON request payload." } };
  }
  const schoolName = sanitizeString(body.schoolName, 150);
  if (!schoolName || schoolName.length < 2) {
    errors.schoolName = "School / institution name is required.";
  }
  const contactPerson = sanitizeString(body.contactPerson, 100);
  if (!contactPerson || contactPerson.length < 2) {
    errors.contactPerson = "Contact person name is required.";
  }
  const email = sanitizeString(body.email, 254).toLowerCase();
  if (!isValidEmail(email)) {
    errors.email = "A valid email address is required.";
  }
  const phone = sanitizeString(body.phone, 25);
  const eventType = sanitizeString(body.eventType, 100) || "General Inquiry";
  const preferredDate = sanitizeString(body.preferredDate, 50) || "2026-10-29";
  const message = sanitizeString(body.message, 3e3);
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
      message
    }
  };
}
function sanitizeForLog(val) {
  if (val === null || val === void 0) return "";
  const str = String(val).replace(/[\r\n]/g, " ").trim();
  const maskedEmail = str.replace(
    /([a-zA-Z0-9._%+-]{1,2})[a-zA-Z0-9._%+-]*(@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g,
    "$1***$2"
  );
  const maskedPhone = maskedEmail.replace(/(\+?\d{2,4}\s?)\d{3,6}(\d{4})/g, "$1****$2");
  return maskedPhone.slice(0, 150);
}
function securityHeadersMiddleware(req, res, next) {
  const cspDirectives = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://fonts.googleapis.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: blob: https://images.unsplash.com https://astitva-alliance-1.onrender.com https://*.onrender.com https://aastitvaalliances.in https://*.aastitvaalliances.in",
    "connect-src 'self' https://docs.google.com https://astitva-alliance-1.onrender.com https://*.onrender.com https://aastitvaalliances.in https://*.aastitvaalliances.in http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:*",
    "frame-ancestors 'self'",
    "form-action 'self' https://docs.google.com",
    "base-uri 'self'",
    "object-src 'none'",
    "upgrade-insecure-requests"
  ].join("; ");
  res.setHeader("Content-Security-Policy", cspDirectives);
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=()");
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("X-XSS-Protection", "0");
  if (req.secure || req.headers["x-forwarded-proto"] === "https") {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains; preload"
    );
  }
  if (req.path.startsWith("/api/")) {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
  }
  next();
}
function corsMiddleware(req, res, next) {
  const origin = req.headers["origin"];
  const allowedOrigins = [
    "https://astitva-alliance-1.onrender.com",
    "https://astitva-alliance.onrender.com",
    "https://aastitvaalliances.in",
    "https://www.aastitvaalliances.in",
    process.env.ALLOWED_ORIGIN
  ].filter(Boolean);
  const isCustomDomain = origin && /^https:\/\/(.*\.)?aastitvaalliances\.in$/.test(origin);
  const isLocalhost = origin && /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin) && process.env.NODE_ENV !== "production";
  if (origin && (allowedOrigins.includes(origin) || isCustomDomain || isLocalhost)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, X-Admin-Token"
    );
  }
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }
  next();
}
var import_crypto, DEV_PASSCODE, ADMIN_DRAWER_PASSCODE, SESSION_SECRET, TOKEN_EXPIRY_MS, authRateLimiter, registrationRateLimiter, contactRateLimiter, apiGeneralLimiter;
var init_security = __esm({
  "src/server/security.ts"() {
    import_crypto = __toESM(require("crypto"), 1);
    DEV_PASSCODE = process.env.DEV_PASSCODE || "bhatsarthakunrivalledunion2011,2001";
    ADMIN_DRAWER_PASSCODE = process.env.ADMIN_DRAWER_PASSCODE || "astitva2026insansadxaequitas";
    SESSION_SECRET = process.env.SESSION_SECRET || import_crypto.default.randomBytes(32).toString("hex");
    if (!process.env.DEV_PASSCODE || !process.env.SESSION_SECRET) {
      console.warn(
        "[SECURITY NOTICE] DEV_PASSCODE or SESSION_SECRET not set in environment. Using fallback. Set these in Render Environment Variables."
      );
    }
    TOKEN_EXPIRY_MS = 4 * 60 * 60 * 1e3;
    authRateLimiter = createRateLimiter({
      windowMs: 15 * 60 * 1e3,
      // 15 mins
      maxRequests: 10,
      message: "Too many authentication attempts. Please wait 15 minutes before retrying."
    });
    registrationRateLimiter = createRateLimiter({
      windowMs: 15 * 60 * 1e3,
      // 15 mins
      maxRequests: 100,
      // Accommodates school computer labs and shared institutional IP delegations
      message: "Registration rate limit exceeded. Please wait a few minutes before submitting again."
    });
    contactRateLimiter = createRateLimiter({
      windowMs: 15 * 60 * 1e3,
      // 15 mins
      maxRequests: 15,
      message: "Contact inquiry rate limit exceeded. Please wait a few minutes before submitting again."
    });
    apiGeneralLimiter = createRateLimiter({
      windowMs: 10 * 60 * 1e3,
      // 10 mins
      maxRequests: 200,
      message: "API request limit exceeded. Please slow down."
    });
  }
});

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_fs = __toESM(require("fs"), 1);
var import_crypto2 = __toESM(require("crypto"), 1);
var import_https = __toESM(require("https"), 1);
var import_vite = require("vite");
init_security();
async function startServer() {
  const app = (0, import_express.default)();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3e3;
  app.disable("x-powered-by");
  app.use(securityHeadersMiddleware);
  app.use(corsMiddleware);
  app.use(import_express.default.json({ limit: "64kb" }));
  app.use(import_express.default.urlencoded({ extended: false, limit: "64kb" }));
  app.use("/api", apiGeneralLimiter);
  const DATA_DIR = import_path.default.join(process.cwd(), "data");
  const MAILBOX_FILE = import_path.default.join(DATA_DIR, "mailbox.json");
  const SHEET_CONFIG_FILE = import_path.default.join(DATA_DIR, "sheet_config.json");
  const SAMPLE_PARTNER_MAILS = [
    {
      id: "AEQ-2026-9281",
      timestamp: "20 Sept 2026, 01:15 pm",
      schoolName: "Jammu Sanskriti School",
      contactPerson: "Ekansh Mahajan (Senior Secondary School)",
      email: "ekanshmahajan@gmail.com",
      phone: "+91 99065 12613",
      eventType: "Aequitas 2026 Delegate: CC - Citizen Council [General Allocation]",
      preferredDate: "2026-10-29",
      message: "[DELEGATE APPLICATION - AEQ-2026-9281]\nDelegate Name: Ekansh Mahajan\nEmail: ekanshmahajan@gmail.com\nPhone: +91 99065 12613\nInstitution: Jammu Sanskriti School\nAcademic Division: Senior Secondary School (Grades 11\u201312)\nPrior MUN Experience: Junior Delegate (1\u20133 MUNs)\nHonors / Accolades: None\n1st Choice Committee: CC - Citizen Council (Preferred: General Allocation)\n2nd Choice Committee: UNHRC - United Nations Human Rights Council (Preferred: General Allocation)\n3rd Choice Committee: BRICS - BRICS Summit (Preferred: General Allocation)\nFee Status: \u20B91,999 (Delegate Remittance Recorded)\nTransaction / UTR ID: Verified (Jammu Sanskriti School)\nStatement of Purpose:\nOfficial delegate registration for Aequitas Summit 2026 representing Jammu Sanskriti School.",
      status: "New"
    },
    {
      id: "partner-17861001",
      timestamp: "2026-08-07 18:30",
      schoolName: "Heritage International School, Jammu",
      contactPerson: "Devansh Sharma (Academic Coordinator)",
      email: "academics@heritageschooljammu.in",
      phone: "+91 94191 22334",
      eventType: "Model United Nations (MUN) Executive Board Allocation",
      preferredDate: "2026-10-15",
      message: "Requesting full Executive Board allocation for 6 committees and Rules of Procedure delegate training workshop.",
      status: "In Review"
    },
    {
      id: "partner-17861002",
      timestamp: "2026-08-07 20:15",
      schoolName: "Delhi Public School, Jammu",
      contactPerson: "Meenakshi Malhotra (Vice Principal)",
      email: "viceprincipal@dpsjammu.in",
      phone: "+91 98765 11223",
      eventType: "Institutional Collaboration & Youth Parliament",
      preferredDate: "2026-11-20",
      message: "Seeking institutional partner agreement for co-hosting the Jammu Youth Leadership Symposium 2026.",
      status: "New"
    }
  ];
  function readMailbox() {
    try {
      if (!import_fs.default.existsSync(DATA_DIR)) {
        import_fs.default.mkdirSync(DATA_DIR, { recursive: true });
      }
      if (!import_fs.default.existsSync(MAILBOX_FILE)) {
        import_fs.default.writeFileSync(MAILBOX_FILE, JSON.stringify(SAMPLE_PARTNER_MAILS, null, 2), "utf-8");
        return SAMPLE_PARTNER_MAILS;
      }
      const raw = import_fs.default.readFileSync(MAILBOX_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : SAMPLE_PARTNER_MAILS;
    } catch (err) {
      console.error("[Storage Error] Failed to read mailbox data safely:", sanitizeForLog(err?.message));
      return SAMPLE_PARTNER_MAILS;
    }
  }
  function writeMailboxAtomic(data) {
    try {
      if (!import_fs.default.existsSync(DATA_DIR)) {
        import_fs.default.mkdirSync(DATA_DIR, { recursive: true });
      }
      const tempPath = `${MAILBOX_FILE}.${import_crypto2.default.randomBytes(6).toString("hex")}.tmp`;
      import_fs.default.writeFileSync(tempPath, JSON.stringify(data, null, 2), "utf-8");
      import_fs.default.renameSync(tempPath, MAILBOX_FILE);
    } catch (err) {
      console.error("[Storage Error] Failed atomic write to mailbox file:", sanitizeForLog(err?.message));
    }
  }
  function readSheetConfig() {
    try {
      if (import_fs.default.existsSync(SHEET_CONFIG_FILE)) {
        const raw = import_fs.default.readFileSync(SHEET_CONFIG_FILE, "utf-8");
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed.sheetUrlOrId === "string") {
          return parsed;
        }
      }
    } catch (err) {
      console.warn("[Sheet Config] Failed to read config safely:", err?.message);
    }
    return { sheetUrlOrId: process.env.GOOGLE_SHEET_URL || "" };
  }
  function writeSheetConfig(cfg) {
    try {
      if (!import_fs.default.existsSync(DATA_DIR)) {
        import_fs.default.mkdirSync(DATA_DIR, { recursive: true });
      }
      import_fs.default.writeFileSync(SHEET_CONFIG_FILE, JSON.stringify(cfg, null, 2), "utf-8");
    } catch (err) {
      console.warn("[Sheet Config] Failed to write config safely:", err?.message);
    }
  }
  app.get("/api/health", (req, res) => {
    res.json({
      status: "ok",
      service: "Aastitva Alliances Infrastructure Engine",
      ssl: "256-Bit SSL Secured",
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
  });
  app.post("/api/auth/verify-passcode", authRateLimiter, (req, res) => {
    const { passcode, purpose } = req.body || {};
    if (!passcode || typeof passcode !== "string") {
      return res.status(400).json({ success: false, error: "Passcode is required." });
    }
    const trimmed = passcode.trim();
    let isMatch = false;
    let role = "admin";
    if (purpose === "drawer") {
      isMatch = verifyPasscodeConstantTime(trimmed, ADMIN_DRAWER_PASSCODE);
      role = "drawer";
    } else {
      isMatch = verifyPasscodeConstantTime(trimmed, DEV_PASSCODE) || verifyPasscodeConstantTime(trimmed, ADMIN_DRAWER_PASSCODE);
      role = isMatch ? "admin" : "admin";
    }
    if (!isMatch) {
      console.warn(`[Security Alert] Failed passcode attempt from IP: ${sanitizeForLog(req.ip)} for purpose: ${sanitizeForLog(purpose)}`);
      return res.status(401).json({
        success: false,
        error: "Invalid security passcode. Access restricted."
      });
    }
    const token = issueAdminToken(role);
    res.json({
      success: true,
      token,
      expiresIn: "4h"
    });
  });
  async function syncToGoogleForm(clean) {
    try {
      const mapCommittee = (val) => {
        if (!val) return "\u2022 CC - Citizens Council";
        const str = String(val).trim();
        if (str.includes("IPC") || str.includes("Press") || str.includes("International Press")) return "\u2022 IPC - International Press Corps";
        if (str.includes("UNHRC") || str.includes("Human Rights")) return "\u2022 UNHRC - United Nations Human Rights Council";
        if (str.includes("BRICS") || str.includes("JKLA") || str.includes("Legislative")) return "\u2022 BRICS - BRICS Summit";
        if (str.includes("Women")) return "\u2022 UN Women - United Nations Entity for Gender Equality";
        if (str.includes("Lok Sabha") || str.includes("House")) return "\u2022 Lok Sabha - Lok Sabha (House of the People)";
        if (str.includes("IPL") || str.includes("Premier")) return "\u2022 IPL - Indian Premier League Auction Council";
        if (str.includes("CC") || str.includes("Citizen") || str.includes("Council") || str.includes("CCC") || str.includes("Crisis")) return "\u2022 CC - Citizens Council";
        return "\u2022 CC - Citizens Council";
      };
      const mapGrade = (val) => {
        if (!val) return "\u2022Senior Secondary School (Grades 11\u201312)";
        const str = String(val).trim();
        if (str.includes("Middle") || str.includes("6-8") || str.includes("6\u20138")) return "\u2022 Middle School (Grades 6\u20138)";
        if (str.includes("Secondary") && !str.includes("Senior") && !str.includes("11-12") && !str.includes("11\u201312")) return "\u2022 Secondary School (Grades 9\u201310)";
        if (str.includes("Senior") || str.includes("11-12") || str.includes("11\u201312") || str.includes("High School")) return "\u2022Senior Secondary School (Grades 11\u201312)";
        if (str.includes("College") || str.includes("Undergraduate")) return "\u2022 Undergraduate / College";
        return "\u2022Senior Secondary School (Grades 11\u201312)";
      };
      const mapExperience = (val) => {
        if (!val) return "\u2022 Junior Delegate (1\u20133 MUNs)";
        const str = String(val).trim();
        if (str.includes("First-Timer") || str.includes("Novice") || str.includes("0 MUNs") || str.includes("Beginner")) return "\u2022 First-Timer / Novice (0 MUNs)";
        if (str.includes("Junior") || str.includes("1-3") || str.includes("1\u20133") || str.includes("Intermediate")) return "\u2022 Junior Delegate (1\u20133 MUNs)";
        if (str.includes("Seasoned") || str.includes("4-7") || str.includes("4\u20137") || str.includes("Advanced")) return "\u2022 Seasoned Delegate (4\u20137 MUNs)";
        if (str.includes("Veteran") || str.includes("8+")) return "\u2022 Veteran Delegate (8+ MUNs)";
        return "\u2022 Junior Delegate (1\u20133 MUNs)";
      };
      const hasAccom = clean.hasAccommodation === true || clean.hasAccommodation === "true" || clean.hasAccommodation === "yes";
      const formData = new URLSearchParams({
        "entry.1134035501": hasAccom ? "YES" : "NO",
        "entry.780764261": (clean.fullName || "").trim(),
        "entry.830016473": (clean.email || "").trim(),
        "entry.86288026": (clean.phone || "").trim(),
        "entry.1083196564": (clean.institution || clean.schoolName || "").trim(),
        "entry.278555826": mapGrade(clean.grade),
        "entry.898367359": mapExperience(clean.priorExperience),
        "entry.291987551": (clean.priorAccolades || "").trim() || "None",
        "entry.977018072": mapCommittee(clean.firstChoiceCommittee),
        "entry.299951131": (clean.firstChoicePortfolio || "").trim() || "General Allocation",
        "entry.580509636": mapCommittee(clean.secondChoiceCommittee || "UNHRC - United Nations Human Rights Council"),
        "entry.777137221": (clean.secondChoicePortfolio || "").trim() || "General Allocation",
        "entry.635888889": mapCommittee(clean.thirdChoiceCommittee || "BRICS - BRICS Summit"),
        "entry.794534023": (clean.thirdChoicePortfolio || "").trim() || "General Allocation",
        "entry.156711483": (clean.statement || "").trim() || "Registered via Aequitas Delegate Portal.",
        "entry.1604443743": (clean.transactionId || "").trim() || "Verified Remittance"
      }).toString();
      const formUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdgVhSI5tgSKD4vk_m8YWI0q6zFuJFytzer4R7-DSbzu7G8rg/formResponse";
      if (typeof fetch === "function") {
        const response = await fetch(formUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
            "Referer": "https://docs.google.com/forms/d/e/1FAIpQLSdgVhSI5tgSKD4vk_m8YWI0q6zFuJFytzer4R7-DSbzu7G8rg/viewform"
          },
          body: formData,
          signal: AbortSignal.timeout(1e4)
        });
        const isSuccess = response.ok || response.status === 200 || response.status === 302 || response.status === 303;
        console.log(
          `[Google Forms Backend Sync] Server synced application to Google Form (Status: ${response.status}${isSuccess ? " - OK" : ""})`
        );
        return isSuccess;
      }
      return new Promise((resolve) => {
        const req = import_https.default.request(
          {
            hostname: "docs.google.com",
            port: 443,
            path: "/forms/d/e/1FAIpQLSdgVhSI5tgSKD4vk_m8YWI0q6zFuJFytzer4R7-DSbzu7G8rg/formResponse",
            method: "POST",
            timeout: 8e3,
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "Content-Length": Buffer.byteLength(formData),
              "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
              "Referer": "https://docs.google.com/forms/d/e/1FAIpQLSdgVhSI5tgSKD4vk_m8YWI0q6zFuJFytzer4R7-DSbzu7G8rg/viewform",
              "Origin": "https://docs.google.com"
            }
          },
          (res) => {
            const isSuccess = res.statusCode !== void 0 && (res.statusCode === 200 || res.statusCode === 302 || res.statusCode === 303);
            console.log(
              `[Google Forms Backend Sync] Server synced application to Google Form (Status: ${res.statusCode}${isSuccess ? " - OK" : ""})`
            );
            res.resume();
            resolve(isSuccess);
          }
        );
        req.on("timeout", () => {
          console.warn("[Google Forms Backend Sync] Request timed out after 8s");
          req.destroy();
          resolve(false);
        });
        req.on("error", (err) => {
          console.warn("[Google Forms Backend Sync] Dispatch warning:", err.message);
          resolve(false);
        });
        req.write(formData);
        req.end();
      });
    } catch (err) {
      console.warn("[Google Forms Backend Sync] Exception during dispatch:", err?.message);
      return false;
    }
  }
  let cachedSquadEntryId = "1147579479";
  let cachedLiveRecreationOptions = [];
  let lastMetadataCheck = 0;
  async function resolveLiveFormMetadata() {
    if (Date.now() - lastMetadataCheck < 3e4 && cachedLiveRecreationOptions.length > 0) {
      return { squadId: cachedSquadEntryId, recreationOptions: cachedLiveRecreationOptions };
    }
    lastMetadataCheck = Date.now();
    try {
      const res = await fetch(
        "https://docs.google.com/forms/d/e/1FAIpQLSc_tPGuiQ7rBUTtBgoUd-gvtaQIDyP_SrC2_klygg6GUy0EHA/viewform",
        { signal: AbortSignal.timeout(5e3) }
      );
      const html = await res.text();
      const match = html.match(/FB_PUBLIC_LOAD_DATA_\s*=\s*(.*?);<\/script>/s);
      if (match) {
        const parsed = JSON.parse(match[1]);
        const questions = parsed[1][1];
        for (const q of questions) {
          const title = (q[1] || "").toLowerCase();
          const entryId = q[4]?.[0]?.[0];
          if (entryId && (title.includes("squad") || title.includes("duo") || title.includes("teammate") || title.includes("partner") || title.includes("member") && !title.includes("number"))) {
            cachedSquadEntryId = String(entryId);
          }
          if (title.includes("recreational")) {
            const rawOpts = q[4]?.[0]?.[1];
            if (Array.isArray(rawOpts)) {
              cachedLiveRecreationOptions = rawOpts.map((o) => String(o[0]));
            }
          }
        }
      }
    } catch (err) {
      console.warn("[Google Form Sync] Notice resolving live form metadata:", err?.message);
    }
    return { squadId: cachedSquadEntryId, recreationOptions: cachedLiveRecreationOptions };
  }
  async function syncEventToGoogleForm(clean, trackingId) {
    try {
      const { squadId, recreationOptions } = await resolveLiveFormMetadata();
      const mapCategory = () => {
        if (clean.category === "prom") return "Prom Night Gala (Strictly 18+ College / UG)";
        if (clean.category === "recreational") return "Recreational Activities (Open to All Ages)";
        return "Special Event: MUN got Latent (100% Free)";
      };
      const mapPromPackage = () => {
        if (clean.category !== "prom") return "\u2022 N/A - Not Applicable";
        const id = (clean.selectionId || "").toLowerCase();
        if (id === "stag") return "\u2022 Stag Entry \u2014 \u20B9599";
        if (id === "duo") return "\u2022 Duo Entry \u2014 \u20B9999";
        if (id === "squad") return "\u2022 Squad Entry \u2014 \u20B91,999";
        return "\u2022 Stag Entry \u2014 \u20B9599";
      };
      const mapRecreationActivity = () => {
        if (clean.category !== "recreational") return "\u2022 N/A - Not Applicable";
        const id = (clean.selectionId || "").toLowerCase();
        const isSquad = id.includes("squad");
        const isDuo = id.includes("duo");
        const findOpt = (predicate, fallback) => {
          if (recreationOptions && recreationOptions.length > 0) {
            const found = recreationOptions.find(predicate);
            if (found) return found;
          }
          return fallback;
        };
        if (id.includes("bgmi")) {
          if (isSquad) return findOpt((o) => o.includes("BGMI") && o.includes("Squad"), "\u2022 Unisex: BGMI \u2014 Squad (\u20B9800)");
          if (isDuo) return findOpt((o) => o.includes("BGMI") && o.includes("Duo"), "\u2022 Unisex: BGMI \u2014 Duo (\u20B9450)");
          return findOpt((o) => o.includes("BGMI") && (o.includes("Individual") || o.includes("Solo")), "\u2022 Unisex: BGMI \u2014 Individual (\u20B9250)");
        }
        if (id.includes("freefire")) {
          if (isSquad) return findOpt((o) => o.includes("FREE FIRE") && o.includes("Squad"), "\u2022 Unisex: FREE FIRE \u2014 Squad (\u20B9800)");
          if (isDuo) return findOpt((o) => o.includes("FREE FIRE") && o.includes("Duo"), "\u2022 Unisex: FREE FIRE \u2014 Duo (\u20B9450)");
          return findOpt((o) => o.includes("FREE FIRE") && (o.includes("Individual") || o.includes("Solo")), "\u2022 Unisex: FREE FIRE \u2014 Individual (\u20B9250)");
        }
        if (id.includes("ludo")) {
          if (isSquad) return findOpt((o) => o.includes("LUDO") && o.includes("Squad"), "\u2022 Unisex: LUDO \u2014 Squad (\u20B9800)");
          if (isDuo) return findOpt((o) => o.includes("LUDO") && o.includes("Duo"), "\u2022 Unisex: LUDO \u2014 Duo (\u20B9450)");
          return findOpt((o) => o.includes("LUDO") && (o.includes("Individual") || o.includes("Solo")), "\u2022 Unisex: LUDO \u2014 Individual (\u20B9250)");
        }
        if (id.includes("mafia")) {
          if (isSquad) return findOpt((o) => o.includes("MAFIA") && o.includes("Squad"), "\u2022 Unisex: MAFIA \u2014 Squad (\u20B9800)");
          if (isDuo) return findOpt((o) => o.includes("MAFIA") && o.includes("Duo"), "\u2022 Unisex: MAFIA \u2014 Duo (\u20B9450)");
          return findOpt((o) => o.includes("MAFIA") && (o.includes("Individual") || o.includes("Solo")), "\u2022 Unisex: MAFIA \u2014 Individual (\u20B9250)");
        }
        if (id.includes("treasure")) return findOpt((o) => o.includes("TREASURE"), "\u2022 Unisex: TREASURE HUNT (\u20B9199)");
        if (id.includes("charade") || id.includes("damsh") || id.includes("dumb")) return findOpt((o) => o.includes("CHARADE"), "\u2022 Unisex:  DUMB CHARADES (\u20B9199)");
        if (id === "chess") return findOpt((o) => o.includes("CHESS"), "\u2022 Unisex: CHESS (\u20B9199)");
        if (id.includes("vanity") || id.includes("rapunzel") || id.includes("brush") || id.includes("hair") || id.includes("diy")) return findOpt((o) => o.toLowerCase().includes("rapunzel") || o.toLowerCase().includes("vanity"), "\u2022 Exclusively for Girls: Rapunzel's vanity (\u20B9199)");
        if (id.includes("minute") || id.includes("win")) return findOpt((o) => o.toLowerCase().includes("minute"), "\u2022 Exclusively for Boys: Minute to Win it challenge (\u20B9199)");
        return "\u2022 Unisex: BGMI \u2014 Individual (\u20B9250)";
      };
      const formPayload = {
        "entry.2071710502": mapCategory(),
        "entry.1817464805": mapPromPackage(),
        "entry.1684941164": mapRecreationActivity(),
        "entry.1040121999": (clean.fullName || "").trim(),
        "entry.1147579479": clean.squadMembers ? clean.squadMembers.trim() : "N/A - Solo Entry",
        "entry.1784915256": clean.age ? String(clean.age) : "N/A",
        "entry.1349604836": (clean.phone || "").trim(),
        "entry.834784784": (clean.email || "").trim(),
        "entry.826925770": (clean.institution || "").trim(),
        "entry.564995734": clean.talentDescription ? clean.talentDescription.trim() : "N/A",
        "entry.1595191915": clean.transactionId ? clean.transactionId.trim() : clean.category === "special" ? "Free Entry (MUN Got Latent)" : "Pending Verification",
        "entry.1617953813": trackingId
      };
      if (squadId && squadId !== "1147579479") {
        formPayload[`entry.${squadId}`] = clean.squadMembers ? clean.squadMembers.trim() : "N/A - Solo Entry";
      }
      const formData = new URLSearchParams(formPayload).toString();
      const formUrl = "https://docs.google.com/forms/d/e/1FAIpQLSc_tPGuiQ7rBUTtBgoUd-gvtaQIDyP_SrC2_klygg6GUy0EHA/formResponse";
      if (typeof fetch === "function") {
        const response = await fetch(formUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
            Referer: "https://docs.google.com/forms/d/e/1FAIpQLSc_tPGuiQ7rBUTtBgoUd-gvtaQIDyP_SrC2_klygg6GUy0EHA/viewform"
          },
          body: formData,
          signal: AbortSignal.timeout(1e4)
        });
        const isSuccess = response.ok || response.status === 200 || response.status === 302 || response.status === 303;
        console.log(
          `[Event Google Forms Sync] Server synced event registration to Google Form (Status: ${response.status}${isSuccess ? " - OK" : ""})`
        );
        return isSuccess;
      }
      return new Promise((resolve) => {
        const req = import_https.default.request(
          {
            hostname: "docs.google.com",
            port: 443,
            path: "/forms/d/e/1FAIpQLSc_tPGuiQ7rBUTtBgoUd-gvtaQIDyP_SrC2_klygg6GUy0EHA/formResponse",
            method: "POST",
            timeout: 8e3,
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "Content-Length": Buffer.byteLength(formData),
              "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
              Referer: "https://docs.google.com/forms/d/e/1FAIpQLSc_tPGuiQ7rBUTtBgoUd-gvtaQIDyP_SrC2_klygg6GUy0EHA/viewform",
              Origin: "https://docs.google.com"
            }
          },
          (res) => {
            const isSuccess = res.statusCode !== void 0 && (res.statusCode === 200 || res.statusCode === 302 || res.statusCode === 303);
            console.log(
              `[Event Google Forms Sync] Server synced event registration to Google Form (Status: ${res.statusCode}${isSuccess ? " - OK" : ""})`
            );
            res.resume();
            resolve(isSuccess);
          }
        );
        req.on("timeout", () => {
          console.warn("[Event Google Forms Sync] Request timed out after 8s");
          req.destroy();
          resolve(false);
        });
        req.on("error", (err) => {
          console.warn("[Event Google Forms Sync] Dispatch warning:", err.message);
          resolve(false);
        });
        req.write(formData);
        req.end();
      });
    } catch (err) {
      console.warn("[Event Google Forms Sync] Exception during dispatch:", err?.message);
      return false;
    }
  }
  app.post("/api/register", registrationRateLimiter, async (req, res) => {
    const validation = validateRegistrationPayload(req.body);
    if (!validation.isValid || !validation.data) {
      return res.status(400).json({
        success: false,
        error: "Validation failed. Please verify the submitted information.",
        validationErrors: validation.errors
      });
    }
    const clean = validation.data;
    const mails = readMailbox();
    const isGenericTxn = (txn) => {
      if (!txn) return true;
      const lower = txn.trim().toLowerCase();
      const genericWords = [
        "pending",
        "pending verification",
        "cash",
        "paid",
        "online",
        "upi",
        "gpay",
        "paytm",
        "phonepe",
        "done",
        "verified",
        "school",
        "none",
        "na",
        "n/a",
        "cheque",
        "draft",
        "transfer",
        "direct",
        "free",
        "exempt",
        "test",
        "testing",
        "sample",
        "yes",
        "no"
      ];
      return genericWords.some((w) => lower === w || lower.startsWith(w));
    };
    const isDuplicate = mails.find((m) => {
      if (clean.transactionId && clean.transactionId.length > 5 && !isGenericTxn(clean.transactionId) && m.message && m.message.includes(`Transaction / UTR ID: ${clean.transactionId}`)) {
        return true;
      }
      if (m.email && clean.email && m.email.toLowerCase() === clean.email.toLowerCase() && m.contactPerson && m.contactPerson.toLowerCase().includes(clean.fullName.toLowerCase()) && m.eventType && m.eventType.includes(clean.firstChoiceCommittee)) {
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
        googleFormSynced: true,
        message: "Registration already recorded successfully."
      });
    }
    const trackingId = `AEQ-2026-${Math.floor(1e3 + Math.random() * 9e3)}`;
    const nowTime = (/* @__PURE__ */ new Date()).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short"
    });
    const newMailboxEntry = {
      id: trackingId,
      timestamp: nowTime,
      schoolName: clean.institution,
      contactPerson: `${clean.fullName} (${clean.grade})`,
      email: clean.email,
      phone: clean.phone,
      eventType: clean.hasAccommodation ? `Aequitas 2026 Delegate (With Accommodation): ${clean.firstChoiceCommittee} [${clean.firstChoicePortfolio}]` : `Aequitas 2026 Delegate: ${clean.firstChoiceCommittee} [${clean.firstChoicePortfolio}]`,
      preferredDate: "2026-10-29",
      message: `[DELEGATE APPLICATION - ${trackingId}]
Delegate Name: ${clean.fullName}
Email: ${clean.email}
Phone: ${clean.phone}
Institution: ${clean.institution}
Academic Division: ${clean.grade}
Prior MUN Experience: ${clean.priorExperience}
Honors / Accolades: ${clean.priorAccolades || "None"}
Accommodation Track: ${clean.hasAccommodation ? "YES (Residential Package - \u20B95,999)" : "NO (Standard Pass - \u20B92,499)"}
1st Choice Committee: ${clean.firstChoiceCommittee} (Preferred: ${clean.firstChoicePortfolio})
2nd Choice Committee: ${clean.secondChoiceCommittee || "None"} (Preferred: ${clean.secondChoicePortfolio || "None"})
3rd Choice Committee: ${clean.thirdChoiceCommittee || "None"} (Preferred: ${clean.thirdChoicePortfolio || "None"})
Fee Status: ${clean.hasAccommodation ? "\u20B95,999 (Residential Delegate Remittance Recorded)" : "\u20B92,499 (Delegate Remittance Recorded)"}
Transaction / UTR ID: ${clean.transactionId || "Pending Verification"}
Statement of Purpose:
${clean.statement || "Standard Application"}`,
      status: "New"
    };
    mails.unshift(newMailboxEntry);
    writeMailboxAtomic(mails);
    console.log(
      `[Delegate Registration] Securely stored delegate application ${trackingId} for ${sanitizeForLog(clean.fullName)} (${sanitizeForLog(clean.institution)})`
    );
    const googleFormSynced = await syncToGoogleForm(clean);
    res.status(201).json({
      success: true,
      trackingId,
      timestamp: nowTime,
      googleFormSynced,
      message: "Registration received securely and queued for Executive Board verification."
    });
  });
  app.post("/api/register-event", registrationRateLimiter, async (req, res) => {
    const validation = validateEventRegistrationPayload(req.body);
    if (!validation.isValid || !validation.data) {
      return res.status(400).json({
        success: false,
        error: "Validation failed. Please verify the submitted information.",
        validationErrors: validation.errors
      });
    }
    const clean = validation.data;
    const mails = readMailbox();
    const trackingId = `ACT-2026-${Math.floor(1e3 + Math.random() * 9e3)}`;
    const nowTime = (/* @__PURE__ */ new Date()).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short"
    });
    const isSpecial = clean.category === "special";
    const isProm = clean.category === "prom";
    const messageLines = [
      `[EVENT ENROLMENT - ${trackingId}]`,
      `Participant Name: ${clean.fullName}`,
      `Category: ${clean.categoryLabel}`,
      `Event / Package: ${clean.selectionTitle}`,
      `Email: ${clean.email}`,
      `Phone: ${clean.phone}`,
      `Institution: ${clean.institution}`
    ];
    if (clean.squadMembers && clean.squadMembers !== "N/A - Solo Entry") {
      messageLines.push(`Squad / Duo Roster: ${clean.squadMembers}`);
    }
    if (clean.age) {
      messageLines.push(`Age: ${clean.age} yrs${isProm ? " (18+ College / UG Verified)" : ""}`);
    }
    messageLines.push(`Fee: ${clean.formattedPrice}`);
    if (clean.transactionId) {
      messageLines.push(`Transaction / UTR ID: ${clean.transactionId}`);
    } else if (isSpecial) {
      messageLines.push(`Registration Type: 100% Free Entry`);
    }
    if (clean.talentDescription) {
      messageLines.push(`Talent Showcase Pitch:
${clean.talentDescription}`);
    }
    const newMailboxEntry = {
      id: trackingId,
      timestamp: nowTime,
      schoolName: clean.institution,
      contactPerson: `${clean.fullName}${clean.age ? ` (${clean.age} yrs)` : ""}`,
      email: clean.email,
      phone: clean.phone,
      eventType: `${clean.categoryLabel}: ${clean.selectionTitle} [${clean.formattedPrice}]`,
      preferredDate: "2026-10-29",
      message: messageLines.join("\n"),
      status: "New"
    };
    mails.unshift(newMailboxEntry);
    writeMailboxAtomic(mails);
    console.log(
      `[Event Registration] Recorded ${trackingId} for ${sanitizeForLog(clean.fullName)} (${clean.categoryLabel}: ${clean.selectionTitle})`
    );
    const googleFormSynced = await syncEventToGoogleForm(clean, trackingId);
    res.status(201).json({
      success: true,
      trackingId,
      timestamp: nowTime,
      googleFormSynced,
      message: "Event registration confirmed securely and synced to Google Form."
    });
  });
  app.get("/api/mailbox", requireAdminAuth, async (req, res) => {
    const cfg = readSheetConfig();
    if (cfg.sheetUrlOrId && Date.now() - lastSheetSyncTime > 15e3) {
      try {
        await syncFromGoogleSheet(cfg.sheetUrlOrId);
      } catch (err) {
        console.warn("[Auto Sheet Sync Notice]:", err?.message);
      }
    }
    const mails = readMailbox();
    res.json({
      success: true,
      count: mails.length,
      mails
    });
  });
  app.post("/api/mailbox", (req, res) => {
    const authHeader = req.headers["authorization"] || req.headers["x-admin-token"];
    const isAdmin = authHeader ? (init_security(), __toCommonJS(security_exports)).verifyAdminToken(String(authHeader).replace("Bearer ", "").trim()).valid : false;
    const body = req.body;
    if (!body || typeof body !== "object") {
      return res.status(400).json({ success: false, error: "Invalid request payload." });
    }
    const mails = readMailbox();
    const entryId = body.id && isValidSafeId(body.id) ? body.id : `AEQ-${Date.now()}-${Math.floor(1e3 + Math.random() * 9e3)}`;
    const sanitized = {
      id: entryId,
      timestamp: sanitizeString(body.timestamp, 60) || (/* @__PURE__ */ new Date()).toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        dateStyle: "medium",
        timeStyle: "short"
      }),
      schoolName: sanitizeString(body.schoolName, 150) || "Not Specified",
      contactPerson: sanitizeString(body.contactPerson, 100) || "Inquirer",
      email: sanitizeString(body.email, 254),
      phone: sanitizeString(body.phone, 30),
      eventType: sanitizeString(body.eventType, 120) || "Delegate Registration",
      preferredDate: sanitizeString(body.preferredDate, 60) || "2026-10-29",
      message: sanitizeString(body.message, 4e3),
      status: ["New", "In Review", "Approved", "Contacted"].includes(body.status) ? body.status : "New"
    };
    const existingIndex = mails.findIndex((m) => m.id === entryId);
    if (existingIndex >= 0) {
      if (!isAdmin) {
        return res.status(200).json({
          success: true,
          mail: { id: mails[existingIndex].id, timestamp: mails[existingIndex].timestamp, status: mails[existingIndex].status },
          message: "Registration confirmed in mailbox."
        });
      }
      mails[existingIndex] = sanitized;
    } else {
      mails.unshift(sanitized);
    }
    writeMailboxAtomic(mails);
    console.log(`[Mailbox Engine] Stored entry ${entryId} for ${sanitizeForLog(sanitized.contactPerson)}`);
    if (!isAdmin) {
      return res.status(201).json({
        success: true,
        mail: { id: sanitized.id, timestamp: sanitized.timestamp, status: sanitized.status }
      });
    }
    res.json({
      success: true,
      count: mails.length,
      mail: sanitized,
      mails
    });
  });
  app.post("/api/mailbox/batch", requireAdminAuth, (req, res) => {
    const { entries } = req.body || {};
    if (!Array.isArray(entries)) {
      return res.status(400).json({ success: false, error: "Expected entries array." });
    }
    if (entries.length > 500) {
      return res.status(400).json({ success: false, error: "Batch size exceeds maximum limit of 500." });
    }
    const mails = readMailbox();
    let addedCount = 0;
    entries.forEach((incoming) => {
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
        message: sanitizeString(incoming.message, 4e3),
        status: ["New", "In Review", "Approved", "Contacted"].includes(incoming.status) ? incoming.status : "New"
      };
      const idx = mails.findIndex((m) => m.id === incoming.id);
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
      mails
    });
  });
  function fetchGoogleSheetCsv(url, redirectsRemaining = 5) {
    return new Promise((resolve, reject) => {
      if (redirectsRemaining <= 0) {
        return reject(new Error("Too many redirects while accessing Google Sheet."));
      }
      import_https.default.get(
        url,
        {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
          }
        },
        (res) => {
          if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
            return resolve(fetchGoogleSheetCsv(res.headers.location, redirectsRemaining - 1));
          }
          if (res.statusCode !== 200) {
            return reject(
              new Error(
                `Google Sheet returned HTTP status ${res.statusCode}. Please ensure the sheet link is shared as 'Anyone with the link can view'.`
              )
            );
          }
          let data = "";
          res.on("data", (chunk) => data += chunk);
          res.on("end", () => resolve(data));
        }
      ).on("error", reject);
    });
  }
  let lastSheetSyncTime = 0;
  async function syncFromGoogleSheet(sheetUrlOrId) {
    const match = sheetUrlOrId.match(/([a-zA-Z0-9-_]{20,})/);
    const sheetId = match ? match[1] : sheetUrlOrId.trim();
    if (!sheetId || sheetId.length < 20) {
      throw new Error("Could not extract valid Google Sheet ID from input.");
    }
    const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;
    const csvText = await fetchGoogleSheetCsv(csvUrl);
    const lines = csvText.trim().split(/\r?\n/);
    if (lines.length < 2) {
      return { importedCount: 0, totalCount: readMailbox().length };
    }
    const mails = readMailbox();
    const existingEmails = new Set(mails.map((m) => (m.email || "").toLowerCase()));
    const existingNames = new Set(mails.map((m) => (m.contactPerson || "").toLowerCase()));
    const existingTxns = new Set(
      mails.map((m) => {
        const match2 = m.message && m.message.match(/Transaction \/ UTR ID: ([^\n\r]+)/);
        return match2 ? match2[1].trim().toLowerCase() : "";
      }).filter((t) => t && t.length > 5 && !t.includes("verified") && !t.includes("google forms"))
    );
    let importedCount = 0;
    lines.slice(1).forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed) return;
      const cols = trimmed.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map((c) => c.trim().replace(/^["']|["']$/g, ""));
      if (cols.length < 3) return;
      const hasTimestampCol = /\d{1,4}[-/.]\d{1,2}[-/.]\d{1,4}|\d{1,2}:\d{2}/.test(cols[0]);
      const offset = hasTimestampCol ? 1 : 0;
      const timestamp = hasTimestampCol && cols[0] ? cols[0] : (/* @__PURE__ */ new Date()).toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        dateStyle: "medium",
        timeStyle: "short"
      });
      const fullName = sanitizeString(cols[offset] || "", 100);
      const email = sanitizeString(cols[offset + 1] || "", 254);
      const phone = sanitizeString(cols[offset + 2] || "", 60);
      const institution = sanitizeString(cols[offset + 3] || "Institutional Delegate", 150);
      let grade = sanitizeString(cols[offset + 4] || "Senior Secondary School (Grades 11\u201312)", 100);
      let experience = sanitizeString(cols[offset + 5] || "Junior Delegate (1\u20133 MUNs)", 100);
      const accolades = sanitizeString(cols[offset + 6] || "None", 500);
      let comm1 = sanitizeString(cols[offset + 7] || "CC - Citizen Council", 120);
      const port1 = sanitizeString(cols[offset + 8] || "General Allocation", 120);
      let comm2 = sanitizeString(cols[offset + 9] || "UNHRC - United Nations Human Rights Council", 120);
      const port2 = sanitizeString(cols[offset + 10] || "General Allocation", 120);
      let comm3 = sanitizeString(cols[offset + 11] || "BRICS - BRICS Summit", 120);
      const port3 = sanitizeString(cols[offset + 12] || "General Allocation", 120);
      const statement = sanitizeString(cols[offset + 13] || "Imported from Google Form Responses", 3e3);
      const utrCode = sanitizeString(cols[offset + 14] || "", 100);
      comm1 = comm1.replace(/^•\s*/, "");
      comm2 = comm2.replace(/^•\s*/, "");
      comm3 = comm3.replace(/^•\s*/, "");
      grade = grade.replace(/^•\s*/, "");
      experience = experience.replace(/^•\s*/, "");
      if (!fullName || fullName.length < 2) return;
      if (email && existingEmails.has(email.toLowerCase())) return;
      if (existingNames.has(fullName.toLowerCase()) || existingNames.has(`${fullName} (${grade})`.toLowerCase())) {
        return;
      }
      if (utrCode && utrCode.length > 5 && existingTxns.has(utrCode.toLowerCase())) {
        return;
      }
      const trackingId = `AEQ-2026-${Math.floor(1e3 + Math.random() * 9e3)}`;
      const entry = {
        id: trackingId,
        timestamp,
        schoolName: institution,
        contactPerson: `${fullName} (${grade})`,
        email: email || "delegate@aequitas.org",
        phone: phone || "+91 99065 12613",
        eventType: `Aequitas 2026 Delegate: ${comm1} [${port1}]`,
        preferredDate: "2026-10-29",
        message: `[DELEGATE APPLICATION - ${trackingId}]
Delegate Name: ${fullName}
Email: ${email}
Phone: ${phone}
Institution: ${institution}
Academic Division: ${grade}
Prior MUN Experience: ${experience}
Honors / Accolades: ${accolades}
1st Choice Committee: ${comm1} (Preferred: ${port1})
2nd Choice Committee: ${comm2} (Preferred: ${port2})
3rd Choice Committee: ${comm3} (Preferred: ${port3})
Fee Status: \u20B92,499 (Delegate Remittance Recorded)
Transaction / UTR ID: ${utrCode || "Verified (Google Forms Sync)"}
Statement of Purpose:
${statement}`,
        status: "New"
      };
      mails.unshift(entry);
      if (email) existingEmails.add(email.toLowerCase());
      existingNames.add(fullName.toLowerCase());
      existingNames.add(`${fullName} (${grade})`.toLowerCase());
      if (utrCode && utrCode.length > 5) existingTxns.add(utrCode.toLowerCase());
      importedCount++;
    });
    if (importedCount > 0) {
      writeMailboxAtomic(mails);
      console.log(`[Google Sheet Sync] Successfully synced ${importedCount} new delegate(s) from sheet ID ${sheetId}`);
    }
    lastSheetSyncTime = Date.now();
    return { importedCount, totalCount: mails.length };
  }
  app.post("/api/mailbox/sync-sheet", requireAdminAuth, async (req, res) => {
    const { sheetUrlOrId } = req.body || {};
    if (!sheetUrlOrId || typeof sheetUrlOrId !== "string") {
      return res.status(400).json({ success: false, error: "Valid Google Sheet URL or ID is required." });
    }
    try {
      const result = await syncFromGoogleSheet(sheetUrlOrId.trim());
      writeSheetConfig({ sheetUrlOrId: sheetUrlOrId.trim() });
      const mails = readMailbox();
      res.json({
        success: true,
        count: mails.length,
        importedCount: result.importedCount,
        message: `Successfully synchronized ${result.importedCount} delegate(s) from Google Sheet!`,
        mails
      });
    } catch (err) {
      console.error("[Google Sheet Sync Error]:", err?.message);
      res.status(500).json({
        success: false,
        error: err?.message || "Failed to sync with Google Sheet. Ensure the sheet is accessible with the link."
      });
    }
  });
  app.get("/api/mailbox/sheet-config", requireAdminAuth, (req, res) => {
    const cfg = readSheetConfig();
    res.json({
      success: true,
      sheetUrlOrId: cfg.sheetUrlOrId || ""
    });
  });
  app.post("/api/mailbox/sheet-config", requireAdminAuth, async (req, res) => {
    const { sheetUrlOrId } = req.body || {};
    if (typeof sheetUrlOrId !== "string") {
      return res.status(400).json({ success: false, error: "Expected sheetUrlOrId string." });
    }
    const trimmed = sheetUrlOrId.trim();
    writeSheetConfig({ sheetUrlOrId: trimmed });
    let importedCount = 0;
    if (trimmed) {
      try {
        const result = await syncFromGoogleSheet(trimmed);
        importedCount = result.importedCount;
      } catch (err) {
        console.warn("[Sheet Config Sync Notice]:", err?.message);
      }
    }
    const mails = readMailbox();
    res.json({
      success: true,
      sheetUrlOrId: trimmed,
      importedCount,
      count: mails.length,
      mails
    });
  });
  app.post("/api/webhook/google-forms", (req, res) => {
    try {
      const body = req.body || {};
      const getVal = (fieldNames) => {
        for (const fn of fieldNames) {
          if (body[fn] !== void 0 && body[fn] !== null) {
            if (Array.isArray(body[fn]) && body[fn].length > 0) return String(body[fn][0]).trim();
            return String(body[fn]).trim();
          }
          if (body.namedValues && body.namedValues[fn] !== void 0 && body.namedValues[fn] !== null) {
            const arr = body.namedValues[fn];
            if (Array.isArray(arr) && arr.length > 0) return String(arr[0]).trim();
            return String(arr).trim();
          }
        }
        return "";
      };
      const fullName = sanitizeString(getVal(["fullName", "Full Legal Name", "name", "Name"]), 100);
      const email = sanitizeString(getVal(["email", "Official Email Address", "Email", "Email Address"]), 254);
      const phone = sanitizeString(getVal(["phone", "WhatsApp / Contact Number", "Phone", "Contact Number"]), 60);
      const institution = sanitizeString(getVal(["institution", "School / Institution / University Name", "schoolName", "Institution", "School"]), 150) || "Institutional Delegate";
      let grade = sanitizeString(getVal(["grade", "Academic Division / Grade", "Grade"]), 100) || "Senior Secondary School (Grades 11\u201312)";
      let experience = sanitizeString(getVal(["priorExperience", "Prior MUN Experience Level", "experience"]), 100) || "Junior Delegate (1\u20133 MUNs)";
      const accolades = sanitizeString(getVal(["priorAccolades", "Prior MUN Honors / Accolades", "accolades"]), 500) || "None";
      let comm1 = sanitizeString(getVal(["firstChoiceCommittee", "1st Choice Committee (Primary)", "comm1"]), 120) || "CC - Citizen Council";
      const port1 = sanitizeString(getVal(["firstChoicePortfolio", "1st Choice Portfolio / Country Preference", "port1"]), 120) || "General Allocation";
      let comm2 = sanitizeString(getVal(["secondChoiceCommittee", "2nd Choice Committee (Alternate)", "comm2"]), 120) || "UNHRC - United Nations Human Rights Council";
      const port2 = sanitizeString(getVal(["secondChoicePortfolio", "2nd Choice Portfolio / Country Preference", "port2"]), 120) || "General Allocation";
      let comm3 = sanitizeString(getVal(["thirdChoiceCommittee", "3rd Choice Committee (Tertiary / Contingency)", "comm3"]), 120) || "BRICS - BRICS Summit";
      const port3 = sanitizeString(getVal(["thirdChoicePortfolio", "3rd Choice Portfolio / Country Preference", "port3"]), 120) || "General Allocation";
      const statement = sanitizeString(
        getVal(["statement", "Statement of Purpose & Motivation", "Statement of Purpose & Motivation"]),
        3e3
      ) || "Registered via Google Form.";
      const utrCode = sanitizeString(
        getVal(["transactionId", "UTR number or UPI ref code ", "UTR number or UPI ref code", "utr", "upi"]),
        100
      );
      comm1 = comm1.replace(/^•\s*/, "");
      comm2 = comm2.replace(/^•\s*/, "");
      comm3 = comm3.replace(/^•\s*/, "");
      grade = grade.replace(/^•\s*/, "");
      experience = experience.replace(/^•\s*/, "");
      if (!fullName || fullName.length < 2) {
        return res.status(400).json({ success: false, error: "Full Name is required." });
      }
      const mails = readMailbox();
      const existing = mails.find((m) => {
        if (email && m.email && m.email.toLowerCase() === email.toLowerCase()) return true;
        if (m.contactPerson && m.contactPerson.toLowerCase().includes(fullName.toLowerCase())) return true;
        if (utrCode && utrCode.length > 5 && m.message && m.message.includes(`Transaction / UTR ID: ${utrCode}`)) return true;
        return false;
      });
      if (existing) {
        return res.status(200).json({
          success: true,
          trackingId: existing.id,
          message: "Delegate already recorded in Developer Mailbox."
        });
      }
      const trackingId = `AEQ-2026-${Math.floor(1e3 + Math.random() * 9e3)}`;
      const nowTime = (/* @__PURE__ */ new Date()).toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        dateStyle: "medium",
        timeStyle: "short"
      });
      const entry = {
        id: trackingId,
        timestamp: nowTime,
        schoolName: institution,
        contactPerson: `${fullName} (${grade})`,
        email: email || "delegate@aequitas.org",
        phone: phone || "+91 99065 12613",
        eventType: `Aequitas 2026 Delegate: ${comm1} [${port1}]`,
        preferredDate: "2026-10-29",
        message: `[DELEGATE APPLICATION - ${trackingId}]
Delegate Name: ${fullName}
Email: ${email}
Phone: ${phone}
Institution: ${institution}
Academic Division: ${grade}
Prior MUN Experience: ${experience}
Honors / Accolades: ${accolades}
1st Choice Committee: ${comm1} (Preferred: ${port1})
2nd Choice Committee: ${comm2} (Preferred: ${port2})
3rd Choice Committee: ${comm3} (Preferred: ${port3})
Fee Status: \u20B92,499 (Delegate Remittance Recorded)
Transaction / UTR ID: ${utrCode || "Verified (Google Forms Webhook)"}
Statement of Purpose:
${statement}`,
        status: "New"
      };
      mails.unshift(entry);
      writeMailboxAtomic(mails);
      console.log(`[Google Forms Webhook] Recorded live delegate application ${trackingId} for ${fullName}`);
      res.status(201).json({
        success: true,
        trackingId,
        message: "Application recorded in Developer Mailbox via Google Forms Webhook."
      });
    } catch (err) {
      console.error("[Google Forms Webhook Error]:", err?.message);
      res.status(500).json({ success: false, error: "Internal webhook error." });
    }
  });
  app.put("/api/mailbox/:id", requireAdminAuth, (req, res) => {
    const { id } = req.params;
    if (!isValidSafeId(id)) {
      return res.status(400).json({ success: false, error: "Invalid entry ID." });
    }
    const mails = readMailbox();
    const idx = mails.findIndex((m) => m.id === id);
    if (idx === -1) {
      return res.status(404).json({ success: false, error: "Entry not found." });
    }
    const body = req.body || {};
    if (body.schoolName !== void 0) {
      mails[idx].schoolName = sanitizeString(body.schoolName, 150);
    }
    if (body.contactPerson !== void 0) {
      mails[idx].contactPerson = sanitizeString(body.contactPerson, 100);
    }
    if (body.email !== void 0) {
      mails[idx].email = sanitizeString(body.email, 254);
    }
    if (body.phone !== void 0) {
      mails[idx].phone = sanitizeString(body.phone, 30);
    }
    if (body.eventType !== void 0) {
      mails[idx].eventType = sanitizeString(body.eventType, 120);
    }
    if (body.preferredDate !== void 0) {
      mails[idx].preferredDate = sanitizeString(body.preferredDate, 60);
    }
    if (body.message !== void 0) {
      mails[idx].message = sanitizeString(body.message, 4e3);
    }
    if (body.status && ["New", "In Review", "Approved", "Contacted"].includes(body.status)) {
      mails[idx].status = body.status;
    }
    writeMailboxAtomic(mails);
    console.log(`[Mailbox API] Admin updated entry ${id} (${sanitizeForLog(mails[idx].contactPerson)})`);
    res.json({
      success: true,
      mail: mails[idx]
    });
  });
  app.delete("/api/mailbox/:id", requireAdminAuth, (req, res) => {
    const { id } = req.params;
    if (!isValidSafeId(id)) {
      return res.status(400).json({ success: false, error: "Invalid entry ID." });
    }
    let mails = readMailbox();
    const initialLen = mails.length;
    mails = mails.filter((m) => m.id !== id);
    if (mails.length === initialLen) {
      return res.status(404).json({ success: false, error: "Entry not found." });
    }
    writeMailboxAtomic(mails);
    console.log(`[Mailbox API] Admin deleted entry ${sanitizeForLog(id)}`);
    res.json({
      success: true,
      count: mails.length,
      mails
    });
  });
  app.post("/api/mailbox/reset", requireAdminAuth, (req, res) => {
    const defaultMails = [
      {
        id: "AEQ-2026-9281",
        timestamp: "20 Sept 2026, 01:15 pm",
        schoolName: "Jammu Sanskriti School",
        contactPerson: "Ekansh Mahajan (Senior Secondary School)",
        email: "ekanshmahajan@gmail.com",
        phone: "+91 99065 12613",
        eventType: "Aequitas 2026 Delegate: CC - Citizen Council [General Allocation]",
        preferredDate: "2026-10-29",
        message: "[DELEGATE APPLICATION - AEQ-2026-9281]\nDelegate Name: Ekansh Mahajan\nEmail: ekanshmahajan@gmail.com\nPhone: +91 99065 12613\nInstitution: Jammu Sanskriti School\nAcademic Division: Senior Secondary School (Grades 11\u201312)\nPrior MUN Experience: Junior Delegate (1\u20133 MUNs)\nHonors / Accolades: None\n1st Choice Committee: CC - Citizen Council (Preferred: General Allocation)\n2nd Choice Committee: UNHRC - United Nations Human Rights Council (Preferred: General Allocation)\n3rd Choice Committee: BRICS - BRICS Summit (Preferred: General Allocation)\nFee Status: \u20B91,999 (Delegate Remittance Recorded)\nTransaction / UTR ID: Verified (Jammu Sanskriti School)\nStatement of Purpose:\nOfficial delegate registration for Aequitas Summit 2026 representing Jammu Sanskriti School.",
        status: "New"
      },
      {
        id: "partner-17861001",
        timestamp: "2026-08-07 18:30",
        schoolName: "Heritage International School, Jammu",
        contactPerson: "Devansh Sharma (Academic Coordinator)",
        email: "academics@heritageschooljammu.in",
        phone: "+91 94191 22334",
        eventType: "Model United Nations (MUN) Executive Board Allocation",
        preferredDate: "2026-10-15",
        message: "Requesting full Executive Board allocation for 6 committees and Rules of Procedure delegate training workshop.",
        status: "In Review"
      },
      {
        id: "partner-17861002",
        timestamp: "2026-08-07 20:15",
        schoolName: "Delhi Public School, Jammu",
        contactPerson: "Meenakshi Malhotra (Vice Principal)",
        email: "viceprincipal@dpsjammu.in",
        phone: "+91 98765 11223",
        eventType: "Institutional Collaboration & Youth Parliament",
        preferredDate: "2026-11-20",
        message: "Seeking institutional partner agreement for co-hosting the Jammu Youth Leadership Symposium 2026.",
        status: "New"
      }
    ];
    writeMailboxAtomic(defaultMails);
    console.log("[Mailbox API] Admin reset mailbox to default sample records.");
    res.json({
      success: true,
      message: "Mailbox reset successfully. Testing records cleared.",
      count: defaultMails.length,
      mails: defaultMails
    });
  });
  app.post("/api/contact", contactRateLimiter, (req, res) => {
    const validation = validateContactPayload(req.body);
    if (!validation.isValid || !validation.data) {
      return res.status(400).json({
        success: false,
        error: "Validation failed.",
        validationErrors: validation.errors
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
      timestamp: (/* @__PURE__ */ new Date()).toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        dateStyle: "medium",
        timeStyle: "short"
      }),
      schoolName: clean.schoolName,
      contactPerson: clean.contactPerson,
      email: clean.email,
      phone: clean.phone,
      eventType: clean.eventType,
      preferredDate: clean.preferredDate,
      message: clean.message,
      status: "New"
    };
    mails.unshift(newEntry);
    writeMailboxAtomic(mails);
    res.json({
      success: true,
      message: "Inquiry logged securely. Response queued within 24 hours.",
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
  });
  app.post("/api/analytics", (req, res) => {
    res.json({ success: true, recorded: true });
  });
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
    app.use("*", async (req, res, next) => {
      const url = req.originalUrl;
      try {
        const indexPath = import_path.default.resolve(process.cwd(), "index.html");
        let template = import_fs.default.readFileSync(indexPath, "utf-8");
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ "Content-Type": "text/html" }).end(template);
      } catch (e) {
        vite.ssrFixStacktrace(e);
        next(e);
      }
    });
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(
      import_express.default.static(distPath, {
        setHeaders: (res, filePath) => {
          if (filePath.endsWith(".html")) {
            res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
            res.setHeader("Pragma", "no-cache");
            res.setHeader("Expires", "0");
          }
        }
      })
    );
    app.get("*", (req, res) => {
      res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
      res.setHeader("Pragma", "no-cache");
      res.setHeader("Expires", "0");
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.use((err, req, res, next) => {
    console.error("[Internal Error]", sanitizeForLog(err?.message || "Unexpected server error"));
    if (res.headersSent) {
      return next(err);
    }
    res.status(err.status || 500).json({
      success: false,
      error: "An unexpected server error occurred. Please try again later."
    });
  });
  app.listen(PORT, "0.0.0.0", () => {
    console.log(
      `Aastitva Alliances server running at http://localhost:${PORT} and http://127.0.0.1:${PORT}`
    );
    const initCfg = readSheetConfig();
    if (initCfg.sheetUrlOrId) {
      syncFromGoogleSheet(initCfg.sheetUrlOrId).then((res) => console.log(`[Startup Sync] Synchronized ${res.importedCount} delegate(s) from linked Google Sheet.`)).catch((err) => console.warn("[Startup Sync Notice]:", err?.message));
    }
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
