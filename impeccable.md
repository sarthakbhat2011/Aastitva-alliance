# Impeccable Design Vocabulary & Anti-Slop Rules for Aastitva Alliance

This repository enforces **Impeccable UI Design Standards** (inspired by [impeccable.style](https://impeccable.style/)).

---

## 🎨 1. Typography & Font Roles

- **Prestige Editorial Serif (`Cormorant Garamond` / `Playfair Display`)**:
  - Reserved **strictly** for primary hero headlines, major section titles, and editorial pull-quotes.
  - Must never be used inside tiny buttons, badge pills, or form inputs.
- **Interface & UI Sans (`Plus Jakarta Sans` / `Inter`)**:
  - Used for all navigation links, body copy, form inputs, button labels, and metadata tags.
  - Ensures maximum legibility and zero typographic confusion.

---

## 🚫 2. Anti-Slop Rules (`/polish`)

1. **No Badge-Pill Soup**:
   - Never stack 3+ uppercase badge pills directly above a headline. Use subtle text sub-headers with left accent border lines (`border-l-2 border-[#D4AF37] pl-4`) instead.
2. **No Over-Nested Cards**:
   - Enforce the **80/20 Un-boxed Layout Ratio**: 80% of text flows cleanly directly on the page canvas background, and ONLY 20% (forms, primary action cards, 3D emblem containers) use card containers.
3. **No Raw Browser Emojis in Text**:
   - Replace all raw browser emojis (`🏛️`, `⚡`, `🏆`) with crisp vector SVG icons from `lucide-react`.

---

## 🎯 3. Visual Hierarchy (`/distill`)

- Every section must have **one dominant visual focal point**.
- Primary buttons use high-contrast gold shimmers (`shimmer-btn`), while secondary buttons use understated border buttons.
- Subtitle metadata must maintain a minimum 4.5:1 contrast ratio across all 3 themes (**Original Gold**, **Light Mode**, **OLED Dark**).

---

## ⚡ 4. Explicit CTAs (`/clarify`)

- Every call-to-action button must state explicit intent (*"Schedule Institutional Briefing"*, *"Register for Summit 2026"*, *"Explore Offerings"*).
- All touch targets must maintain a minimum 44px height for mobile ergonomics.
