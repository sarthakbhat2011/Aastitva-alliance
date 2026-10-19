/**
 * Utility to generate an official high-resolution Event Access Pass PNG
 * for Prom Night, Recreational Activities & Special Events (MUN Got Latent).
 *
 * Requirements:
 * - Attendee Name
 * - Category (Prom Night / Recreational Activities / Special Event)
 * - Specific Package or Activity Name
 * - Institution Name
 * - Age (if applicable)
 * - Tracking / Application ID
 * - High resolution (1200 x 720) exportable as PNG
 */

export interface EventPassData {
  fullName: string;
  category: 'prom' | 'recreational' | 'special';
  categoryLabel: string;
  selectionTitle: string;
  priceFormatted: string;
  institution: string;
  age?: string | number;
  trackingId: string;
}

const POETIC_QUOTES: Record<string, { quote: string; author: string }> = {
  prom: {
    quote: '“Under the constellation of youth and revelry, tonight we make memories that time cannot dim.”',
    author: '— AEQUITAS & AASTITVA ALLIANCES • OFFICIAL PROM NIGHT CONCLAVE',
  },
  recreational: {
    quote: '“In the spirit of fair play, fierce camaraderie, and intellect—every arena is a stage for greatness.”',
    author: '— AEQUITAS & AASTITVA ALLIANCES • RECREATIONAL LEAGUE',
  },
  special: {
    quote: '“Authentic talent knows no bounds; step into the spotlight and let your craft inspire the world.”',
    author: '— AEQUITAS & AASTITVA ALLIANCES • MUN GOT LATENT JURY DESK',
  },
};

export function generateEventPassDataUrl(data: EventPassData): string {
  if (typeof document === 'undefined') return '';

  const canvas = document.createElement('canvas');
  const width = 1200;
  const height = 720;
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  // 1. Background: Deep luxury obsidian & cosmic midnight navy
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  if (data.category === 'prom') {
    bgGrad.addColorStop(0, '#090514');
    bgGrad.addColorStop(0.5, '#150A2A');
    bgGrad.addColorStop(1, '#050711');
  } else if (data.category === 'recreational') {
    bgGrad.addColorStop(0, '#040F1E');
    bgGrad.addColorStop(0.5, '#0A1E3A');
    bgGrad.addColorStop(1, '#040711');
  } else {
    // Special Event
    bgGrad.addColorStop(0, '#0E0818');
    bgGrad.addColorStop(0.5, '#1B0F2A');
    bgGrad.addColorStop(1, '#080512');
  }
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Radial subtle glow in center
  const radialGlow = ctx.createRadialGradient(width / 2, height / 2, 50, width / 2, height / 2, 600);
  if (data.category === 'prom') {
    radialGlow.addColorStop(0, 'rgba(168, 85, 247, 0.18)');
    radialGlow.addColorStop(0.5, 'rgba(212, 175, 55, 0.12)');
  } else if (data.category === 'recreational') {
    radialGlow.addColorStop(0, 'rgba(56, 189, 248, 0.18)');
    radialGlow.addColorStop(0.5, 'rgba(212, 175, 55, 0.10)');
  } else {
    radialGlow.addColorStop(0, 'rgba(234, 179, 8, 0.18)');
    radialGlow.addColorStop(0.5, 'rgba(236, 72, 153, 0.12)');
  }
  radialGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = radialGlow;
  ctx.fillRect(0, 0, width, height);

  // 2. Concentric geometric watermarks
  ctx.save();
  ctx.strokeStyle = 'rgba(212, 175, 55, 0.05)';
  ctx.lineWidth = 1;
  [140, 240, 360, 500].forEach((r) => {
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, r, 0, Math.PI * 2);
    ctx.stroke();
  });
  ctx.restore();

  // 3. Double Imperial Gold Borders
  ctx.save();
  ctx.strokeStyle = '#D4AF37';
  ctx.lineWidth = 3;
  ctx.strokeRect(36, 36, width - 72, height - 72);

  ctx.strokeStyle = 'rgba(212, 175, 55, 0.35)';
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

  // 4. Header Bar: Conclave Designation & Security Code
  ctx.save();
  ctx.textAlign = 'left';
  ctx.font = 'bold 12px "Space Grotesk", sans-serif';
  ctx.fillStyle = '#D4AF37';
  ctx.letterSpacing = '3px';
  ctx.fillText('AEQUITAS SUMMIT 2026 × AASTITVA ALLIANCES', 90, 88);

  ctx.textAlign = 'right';
  ctx.font = 'bold 12px "Space Grotesk", monospace';
  ctx.fillStyle = '#10B981';
  ctx.letterSpacing = '1px';
  ctx.fillText(`VERIFIED PASS: ${data.trackingId}`, width - 90, 88);

  // Thin separator
  ctx.strokeStyle = 'rgba(212, 175, 55, 0.3)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(90, 104);
  ctx.lineTo(width - 90, 104);
  ctx.stroke();
  ctx.restore();

  // 5. Category Banner & Title
  ctx.save();
  ctx.textAlign = 'center';
  ctx.font = 'bold 13px "Space Grotesk", sans-serif';
  ctx.fillStyle = data.category === 'prom' ? '#C084FC' : data.category === 'recreational' ? '#38BDF8' : '#FDE047';
  ctx.letterSpacing = '4px';
  ctx.fillText(data.categoryLabel.toUpperCase(), width / 2, 145);

  // Participant Name (Majestic Display)
  ctx.font = 'bold 36px "Cinzel", "Playfair Display", serif';
  ctx.fillStyle = '#FAF5EF';
  ctx.shadowColor = 'rgba(212, 175, 55, 0.4)';
  ctx.shadowBlur = 12;
  const nameToRender = data.fullName.toUpperCase();
  ctx.fillText(nameToRender, width / 2, 195);
  ctx.shadowBlur = 0;

  // Selected Activity / Package & Price Pill
  ctx.font = 'bold 16px "Space Grotesk", sans-serif';
  ctx.fillStyle = '#D4AF37';
  ctx.letterSpacing = '1px';
  ctx.fillText(`${data.selectionTitle}  •  ${data.priceFormatted}`, width / 2, 230);
  ctx.restore();

  // 6. Attribute Cards (Institution & Participant Metadata)
  const leftX = 90;
  const rightX = width / 2 + 20;
  const boxWidth = width / 2 - 110;
  const boxHeight = 75;
  const boxY = 260;

  const drawAttrCard = (x: number, label: string, value: string) => {
    ctx.save();
    // Card background
    ctx.fillStyle = 'rgba(22, 32, 59, 0.6)';
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(x, boxY, boxWidth, boxHeight, 12);
    ctx.fill();
    ctx.stroke();

    // Label
    ctx.textAlign = 'left';
    ctx.font = 'bold 10px "Space Grotesk", sans-serif';
    ctx.fillStyle = '#D4AF37';
    ctx.letterSpacing = '2px';
    ctx.fillText(label, x + 20, boxY + 26);

    // Value
    ctx.font = 'bold 15px "Space Grotesk", sans-serif';
    ctx.fillStyle = '#FAF5EF';
    let displayValue = value || 'Not Specified';
    if (displayValue.length > 34) {
      displayValue = displayValue.slice(0, 32) + '...';
    }
    ctx.fillText(displayValue, x + 20, boxY + 54);
    ctx.restore();
  };

  drawAttrCard(leftX, 'INSTITUTION / COLLEGE / SCHOOL', data.institution);
  const metaLabel = data.age ? `PARTICIPANT AGE: ${data.age} YRS` : 'OPEN DIVISION';
  drawAttrCard(rightX, 'CATEGORY STATUS / ACCESS TIER', metaLabel);

  // 7. Poetic Conclave Creed
  ctx.save();
  const quoteY = 360;
  const quoteBoxHeight = 160;
  const quoteBoxWidth = width - 180;
  const quoteBoxX = 90;

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

  // Quote Header
  ctx.textAlign = 'center';
  ctx.font = 'bold 10px "Space Grotesk", sans-serif';
  ctx.fillStyle = '#D4AF37';
  ctx.letterSpacing = '4px';
  ctx.fillText('OFFICIAL CONCLAVE ACCESS CODE', width / 2, quoteY + 28);

  const selectedQuote = POETIC_QUOTES[data.category] || POETIC_QUOTES.prom;

  ctx.font = 'italic 19px "Cormorant Garamond", "Playfair Display", serif';
  ctx.fillStyle = '#FFF5DC';
  ctx.shadowColor = 'rgba(212, 175, 55, 0.3)';
  ctx.shadowBlur = 8;
  ctx.fillText(selectedQuote.quote, width / 2, quoteY + 75);
  ctx.shadowBlur = 0;

  ctx.font = 'bold 10px "Space Grotesk", sans-serif';
  ctx.fillStyle = 'rgba(212, 175, 55, 0.85)';
  ctx.letterSpacing = '3px';
  ctx.fillText(selectedQuote.author, width / 2, quoteY + 125);
  ctx.restore();

  // 8. Footer Bar
  ctx.save();
  const footerY = 555;
  ctx.strokeStyle = 'rgba(212, 175, 55, 0.25)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(90, footerY);
  ctx.lineTo(width - 90, footerY);
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.font = 'bold 13px "Cinzel", "Times New Roman", serif';
  ctx.fillStyle = '#FAF5EF';
  ctx.letterSpacing = '2px';
  ctx.fillText('OCTOBER 29–30, 2026 • RADISSON BLU HOTEL, JAMMU', width / 2, footerY + 34);

  ctx.font = '10px "Space Grotesk", sans-serif';
  ctx.fillStyle = '#C4BBA3';
  ctx.letterSpacing = '2px';
  ctx.fillText('AASTITVA ALLIANCES × AEQUITAS SECRETARIAT • OFFICIAL EVENT PASS', width / 2, footerY + 54);

  ctx.font = 'bold 9px "Space Grotesk", sans-serif';
  ctx.fillStyle = '#D4AF37';
  ctx.letterSpacing = '3px';
  ctx.fillText(
    `★ ADMIT ONE • STATUS: ${data.priceFormatted === 'FREE' ? 'CONFIRMED FREE REGISTRATION' : 'REMITTANCE RECORDED'} • VALID ID REQUIRED AT ENTRY`,
    width / 2,
    footerY + 74
  );
  ctx.restore();

  return canvas.toDataURL('image/png');
}

export function downloadEventPassPng(dataUrl: string, attendeeName: string, eventTitle: string) {
  if (typeof document === 'undefined' || !dataUrl) return;

  const sanitizedName = (attendeeName || 'Attendee')
    .trim()
    .replace(/[^a-zA-Z0-9_-]/g, '_');
  const sanitizedEvent = (eventTitle || 'Event')
    .trim()
    .replace(/[^a-zA-Z0-9_-]/g, '_');
  const filename = `Aequitas_2026_${sanitizedEvent}_Pass_${sanitizedName}.png`;

  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
