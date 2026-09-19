/**
 * Utility to generate an official high-resolution Delegate Pass PNG
 * for Aequitas Model United Nations Summit 2026.
 *
 * Requirements:
 * - Delegate Name
 * - Institution
 * - Class / Academic Division
 * - A beautiful poetic quote for excellence
 * - High resolution (1200x720) exportable as PNG
 */

export interface DelegatePassData {
  fullName: string;
  institution: string;
  grade: string;
  trackingId?: string;
}

const POETIC_QUOTE =
  '“To stand with conviction, speak with honor, and think beyond the horizon—this is the enduring hallmark of diplomatic excellence.”';

const POETIC_EPIGRAPH = '— AEQUITAS SECRETARIAT • CONCLAVE COVENANT OF EXCELLENCE';

export function generateDelegatePassDataUrl(data: DelegatePassData): string {
  if (typeof document === 'undefined') return '';

  const canvas = document.createElement('canvas');
  // High-resolution canvas dimensions (1200 x 720)
  const width = 1200;
  const height = 720;
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  // 1. Background: Deep obsidian & navy royal gradient
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, '#040711');
  bgGrad.addColorStop(0.5, '#0B1224');
  bgGrad.addColorStop(1, '#050811');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Radial subtle glow in center
  const radialGlow = ctx.createRadialGradient(width / 2, height / 2, 50, width / 2, height / 2, 600);
  radialGlow.addColorStop(0, 'rgba(212, 175, 55, 0.08)');
  radialGlow.addColorStop(0.6, 'rgba(22, 32, 59, 0.25)');
  radialGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = radialGlow;
  ctx.fillRect(0, 0, width, height);

  // 2. Concentric celestial watermarks
  ctx.save();
  ctx.strokeStyle = 'rgba(212, 175, 55, 0.04)';
  ctx.lineWidth = 1;
  const radii = [140, 240, 360, 500];
  radii.forEach((r) => {
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, r, 0, Math.PI * 2);
    ctx.stroke();
  });
  ctx.restore();

  // 3. Double Imperial Gold Borders
  ctx.save();
  // Outer border
  ctx.strokeStyle = '#D4AF37';
  ctx.lineWidth = 3;
  ctx.strokeRect(36, 36, width - 72, height - 72);

  // Inner border
  ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)';
  ctx.lineWidth = 1;
  ctx.strokeRect(48, 48, width - 96, height - 96);

  // Corner ornamental flourishes
  const cornerLength = 26;
  ctx.strokeStyle = '#F3E5AB';
  ctx.lineWidth = 4;

  // Top-Left
  ctx.beginPath();
  ctx.moveTo(36, 36 + cornerLength);
  ctx.lineTo(36, 36);
  ctx.lineTo(36 + cornerLength, 36);
  ctx.stroke();

  // Top-Right
  ctx.beginPath();
  ctx.moveTo(width - 36 - cornerLength, 36);
  ctx.lineTo(width - 36, 36);
  ctx.lineTo(width - 36, 36 + cornerLength);
  ctx.stroke();

  // Bottom-Left
  ctx.beginPath();
  ctx.moveTo(36, height - 36 - cornerLength);
  ctx.lineTo(36, height - 36);
  ctx.lineTo(36 + cornerLength, height - 36);
  ctx.stroke();

  // Bottom-Right
  ctx.beginPath();
  ctx.moveTo(width - 36 - cornerLength, height - 36);
  ctx.lineTo(width - 36, height - 36);
  ctx.lineTo(width - 36, height - 36 - cornerLength);
  ctx.stroke();
  ctx.restore();

  // 4. Header: Emblem & Summit Titles
  ctx.save();
  ctx.textAlign = 'center';

  // Radiant Gold Star / Crest
  ctx.fillStyle = '#D4AF37';
  ctx.font = '22px sans-serif';
  ctx.fillText('✦', width / 2, 82);

  // Summit Title
  ctx.font = 'bold 20px "Cinzel", "Playfair Display", "Times New Roman", serif';
  ctx.fillStyle = '#D4AF37';
  ctx.letterSpacing = '3px';
  ctx.fillText('AEQUITAS MODEL UNITED NATIONS SUMMIT 2026', width / 2, 114);

  // Subtitle
  ctx.font = 'bold 11px "Space Grotesk", "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#C4BBA3';
  ctx.letterSpacing = '5px';
  ctx.fillText('OFFICIAL DELEGATE CREDENTIAL PASS • DIPLOMATIC ROSTER', width / 2, 136);

  // Decorative divider
  const divGrad = ctx.createLinearGradient(120, 150, width - 120, 150);
  divGrad.addColorStop(0, 'rgba(212, 175, 55, 0)');
  divGrad.addColorStop(0.3, 'rgba(212, 175, 55, 0.6)');
  divGrad.addColorStop(0.5, '#F3E5AB');
  divGrad.addColorStop(0.7, 'rgba(212, 175, 55, 0.6)');
  divGrad.addColorStop(1, 'rgba(212, 175, 55, 0)');
  ctx.strokeStyle = divGrad;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(120, 152);
  ctx.lineTo(width - 120, 152);
  ctx.stroke();
  ctx.restore();

  // 5. Main Delegate Profile Details
  // Label: DELEGATE NAME
  ctx.save();
  ctx.textAlign = 'center';
  ctx.font = 'bold 11px "Space Grotesk", "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#D4AF37';
  ctx.letterSpacing = '4px';
  ctx.fillText('DELEGATE NAME', width / 2, 186);

  // Value: Full Name
  ctx.font = 'bold 42px "Playfair Display", "Cormorant Garamond", serif';
  ctx.fillStyle = '#FAF5EF';
  ctx.shadowColor = 'rgba(212, 175, 55, 0.35)';
  ctx.shadowBlur = 15;
  ctx.fillText(data.fullName || 'Delegate Name', width / 2, 234);
  ctx.shadowBlur = 0;
  ctx.restore();

  // Two Attribute Boxes: Institution & Class
  const boxY = 265;
  const boxHeight = 85;
  const boxWidth = 470;
  const gap = 40;
  const leftX = width / 2 - boxWidth - gap / 2;
  const rightX = width / 2 + gap / 2;

  // Function to draw an attribute card
  const drawAttrCard = (x: number, label: string, value: string) => {
    ctx.save();
    // Card Background
    ctx.fillStyle = 'rgba(13, 20, 39, 0.85)';
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.35)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(x, boxY, boxWidth, boxHeight, 14);
    ctx.fill();
    ctx.stroke();

    // Small Gold Corner Accent
    ctx.fillStyle = '#D4AF37';
    ctx.fillRect(x + 14, boxY + 12, 3, 14);

    // Label
    ctx.font = 'bold 11px "Space Grotesk", sans-serif';
    ctx.fillStyle = '#D4AF37';
    ctx.letterSpacing = '2px';
    ctx.textAlign = 'left';
    ctx.fillText(label, x + 25, boxY + 24);

    // Value
    ctx.font = 'bold 18px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#FAF5EF';
    // Truncate if too long
    let displayValue = value || 'Not Specified';
    if (displayValue.length > 36) {
      displayValue = displayValue.slice(0, 34) + '...';
    }
    ctx.fillText(displayValue, x + 25, boxY + 58);
    ctx.restore();
  };

  drawAttrCard(leftX, 'INSTITUTION / SCHOOL', data.institution);
  drawAttrCard(rightX, 'CLASS / DIVISION', data.grade);

  // 6. Beautiful Poetic Quote for Excellence
  ctx.save();
  const quoteY = 380;
  const quoteBoxHeight = 160;
  const quoteBoxWidth = width - 180;
  const quoteBoxX = 90;

  // Quote Box Background
  const quoteBg = ctx.createLinearGradient(quoteBoxX, quoteY, quoteBoxX + quoteBoxWidth, quoteY + quoteBoxHeight);
  quoteBg.addColorStop(0, 'rgba(22, 32, 59, 0.7)');
  quoteBg.addColorStop(0.5, 'rgba(13, 20, 39, 0.9)');
  quoteBg.addColorStop(1, 'rgba(22, 32, 59, 0.7)');
  ctx.fillStyle = quoteBg;
  ctx.strokeStyle = 'rgba(212, 175, 55, 0.45)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.roundRect(quoteBoxX, quoteY, quoteBoxWidth, quoteBoxHeight, 18);
  ctx.fill();
  ctx.stroke();

  // Quote Header Icon / Tag
  ctx.textAlign = 'center';
  ctx.font = 'bold 10px "Space Grotesk", sans-serif';
  ctx.fillStyle = '#D4AF37';
  ctx.letterSpacing = '4px';
  ctx.fillText('COVENANT FOR DIPLOMATIC EXCELLENCE', width / 2, quoteY + 28);

  // Quote Content (Split in 2 lines for majestic editorial readability)
  ctx.font = 'italic 20px "Cormorant Garamond", "Playfair Display", serif';
  ctx.fillStyle = '#FFF5DC';
  ctx.shadowColor = 'rgba(212, 175, 55, 0.3)';
  ctx.shadowBlur = 8;
  ctx.fillText(
    '“Where conviction finds its voice, and intellect shapes the horizon—',
    width / 2,
    quoteY + 70
  );
  ctx.fillText(
    'excellence is not an act, but the sovereign art of existence.”',
    width / 2,
    quoteY + 102
  );
  ctx.shadowBlur = 0;

  // Epigraph
  ctx.font = 'bold 10px "Space Grotesk", sans-serif';
  ctx.fillStyle = 'rgba(212, 175, 55, 0.75)';
  ctx.letterSpacing = '3px';
  ctx.fillText(POETIC_EPIGRAPH, width / 2, quoteY + 138);
  ctx.restore();

  // 7. Footer Credentials & Security Verification Bar
  ctx.save();
  const footerY = 570;

  // Divider
  ctx.strokeStyle = 'rgba(212, 175, 55, 0.25)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(90, footerY);
  ctx.lineTo(width - 90, footerY);
  ctx.stroke();

  // Center: Date, Venue & Executive Secretariat
  ctx.textAlign = 'center';
  ctx.font = 'bold 13px "Cinzel", "Times New Roman", serif';
  ctx.fillStyle = '#FAF5EF';
  ctx.letterSpacing = '2px';
  ctx.fillText('OCTOBER 29–30, 2026 • JAMMU, J&K', width / 2, footerY + 34);

  ctx.font = '10px "Space Grotesk", sans-serif';
  ctx.fillStyle = '#C4BBA3';
  ctx.letterSpacing = '2px';
  ctx.fillText('AASTITVA ALLIANCE • EXECUTIVE SECRETARIAT • OFFICIAL CONCLAVE SEAL', width / 2, footerY + 54);
  ctx.restore();

  return canvas.toDataURL('image/png');
}

export function downloadDelegatePassPng(dataUrl: string, delegateName: string) {
  if (typeof document === 'undefined' || !dataUrl) return;

  const sanitized = (delegateName || 'Delegate')
    .trim()
    .replace(/[^a-zA-Z0-9_-]/g, '_');
  const filename = `Aequitas_Summit_2026_Delegate_Pass_${sanitized}.png`;

  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
