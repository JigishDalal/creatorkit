/* =============================================
   poster.js — Professional Templates & Canvas Engine
   ============================================= */
'use strict';

/* -------- Active template & style -------- */
var ACTIVE_TEMPLATE = 'editorial_vogue';
var POSTER_STYLE = 'editorial';

/* -------- Ready-Made Professional Templates -------- */
var POSTER_TEMPLATES = [
  {
    id: 'editorial_vogue',
    name: 'Editorial Luxe',
    tag: 'Fashion & Art',
    style: 'editorial',
    font: '"Playfair Display", serif|500',
    textColor: '#1A1208',
    bgColor: '#FAF8F3',
    topLine: 'MAGAZINE ISSUE',
    mainText: 'The Future of Visual Design & Aesthetics',
    bottomLine: '— Vol. 04 / Editorial Edition'
  },
  {
    id: 'swiss_international',
    name: 'Swiss Grid',
    tag: 'Modernist',
    style: 'swiss',
    font: '"Archivo Black", sans-serif|400',
    textColor: '#FFFFFF',
    bgColor: '#E63946',
    topLine: 'INTERNATIONAL DESIGN',
    mainText: 'Form Follows Function Always',
    bottomLine: 'SWISS TYPOGRAPHY // 2026'
  },
  {
    id: 'aura_iridescent',
    name: 'Aura Glass',
    tag: 'Trending',
    style: 'auraglass',
    font: '"Space Grotesk", sans-serif|700',
    textColor: '#FFFFFF',
    bgColor: '#090A16',
    topLine: 'CREATIVE CONCEPT',
    mainText: 'Embrace The Infinite Glow of Innovation',
    bottomLine: '@creatorkit'
  },
  {
    id: 'cyber_neon',
    name: 'Cyber Neon',
    tag: 'Tech Matrix',
    style: 'neon',
    font: '"Space Grotesk", sans-serif|700',
    textColor: '#00F0FF',
    bgColor: '#07051A',
    topLine: 'SYSTEM MATRIX',
    mainText: 'The Future is Built in The Shadows',
    bottomLine: '// CYBER_LOG 0x89'
  },
  {
    id: 'brutalist_pop',
    name: 'Brutalist Pop',
    tag: 'Y2K Tech',
    style: 'brutalist',
    font: '"Space Grotesk", sans-serif|700',
    textColor: '#111111',
    bgColor: '#E2F567',
    topLine: 'RAW ENERGY',
    mainText: 'Break The Rules. Build The Future.',
    bottomLine: 'VERIFIED // 2026'
  },
  {
    id: 'vintage_retro',
    name: 'Vintage Retro',
    tag: 'Classic 70s',
    style: 'retro',
    font: 'Anton, sans-serif|400',
    textColor: '#2A1600',
    bgColor: '#F2E8D0',
    topLine: 'ORIGINAL VINTAGE',
    mainText: 'Classics Never Go Out of Style',
    bottomLine: 'EST. 1974'
  },
  {
    id: 'clean_luxe',
    name: 'Obsidian Serif',
    tag: 'Minimal Luxe',
    style: 'clean',
    font: '"Instrument Serif", serif|400',
    textColor: '#FFFFFF',
    bgColor: '#111111',
    topLine: 'MINIMAL STATEMENT',
    mainText: 'Simplicity is the Ultimate Sophistication',
    bottomLine: '— Leonardo da Vinci'
  },
  {
    id: 'dev_monokai',
    name: 'Minimal Mono',
    tag: 'Code Terminal',
    style: 'minimono',
    font: '"Press Start 2P", monospace|400',
    textColor: '#A6E3A1',
    bgColor: '#1E1E2E',
    topLine: 'BUILD_SYSTEM',
    mainText: 'Clean Code. Pure Logic. Infinite Scale.',
    bottomLine: '● UTF-8 // COMPILED'
  },
  {
    id: 'warm_sunset',
    name: 'Warm Sunset',
    tag: 'Warm Aura',
    style: 'gradient',
    font: '"Instrument Sans", sans-serif|700',
    textColor: '#FFFFFF',
    bgColor: '#D9480F',
    topLine: 'GOLDEN HOUR',
    mainText: 'Chase The Light Everywhere You Go',
    bottomLine: 'SUNSET EDITION'
  },
  {
    id: 'film_noir',
    name: 'Film Cinema',
    tag: 'Widescreen',
    style: 'film',
    font: '"Space Grotesk", sans-serif|500',
    textColor: '#EEEEF4',
    bgColor: '#0A0F1C',
    topLine: 'CINEMATIC VISION',
    mainText: 'Every Frame Tells An Unforgettable Story',
    bottomLine: "DIRECTOR'S CUT"
  },
  {
    id: 'organic_hand',
    name: 'Handcrafted',
    tag: 'Organic Note',
    style: 'hand',
    font: 'Caveat, cursive|700',
    textColor: '#2D1A00',
    bgColor: '#FEFBF0',
    topLine: 'DAILY REFLECTIONS',
    mainText: 'Small intentional steps create lasting change.',
    bottomLine: '— Mindful Journal'
  },
  {
    id: 'dark_bold',
    name: 'Bold Accent',
    tag: 'Punchy Heavy',
    style: 'bold',
    font: '"Archivo Black", sans-serif|400',
    textColor: '#FFFFFF',
    bgColor: '#111111',
    topLine: 'BOLD IMPACT',
    mainText: 'MAKE THEM STOP AND STARE AT YOUR POST',
    bottomLine: '@creatorkit'
  }
];

/* -------- Harmonious Color Palettes -------- */
var COLOR_PALETTES = [
  { name: 'Dark Obsidian', text: '#FFFFFF', bg: '#111111', border: '#7C6EFA' },
  { name: 'Cream Linen', text: '#1A1208', bg: '#FAF8F3', border: '#D4AF37' },
  { name: 'Cyber Cyan', text: '#00F0FF', bg: '#07051A', border: '#00F0FF' },
  { name: 'Pop Lime', text: '#111111', bg: '#E2F567', border: '#111111' },
  { name: 'Swiss Red', text: '#FFFFFF', bg: '#E63946', border: '#FFFFFF' },
  { name: 'Dev Monokai', text: '#A6E3A1', bg: '#1E1E2E', border: '#89DCEB' },
  { name: 'Velvet Berry', text: '#FFFFFF', bg: '#2D0A24', border: '#F72585' },
  { name: 'Sunset Warm', text: '#FFFFFF', bg: '#D9480F', border: '#FFD43B' },
  { name: 'Forest Matcha', text: '#F4FCE3', bg: '#1E3A2F', border: '#94D82D' },
  { name: 'Nordic Frost', text: '#0C1E3A', bg: '#E7F5FF', border: '#1971C2' }
];

/* -------- Canvas Text & Drawing Utilities -------- */

function wrapLines(ctx, text, maxWidth) {
  if (!text) return [];
  var words = text.split(' ').filter(Boolean);
  var lines = [];
  var line = '';
  for (var i = 0; i < words.length; i++) {
    var test = line ? line + ' ' + words[i] : words[i];
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = words[i];
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function drawTextCenter(ctx, text, cx, startY, maxWidth, lineH) {
  var lines = wrapLines(ctx, text, maxWidth);
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  lines.forEach(function(l, i) { ctx.fillText(l, cx, startY + i * lineH); });
  return lines.length * lineH;
}

function drawTextLeft(ctx, text, x, startY, maxWidth, lineH) {
  var lines = wrapLines(ctx, text, maxWidth);
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  lines.forEach(function(l, i) { ctx.fillText(l, x, startY + i * lineH); });
  return lines.length * lineH;
}

function autoFontSize(ctx, text, maxWidth, startPx, minPx, fontSpec, maxLines, scale) {
  scale = scale || 1;
  maxLines = maxLines || 6;
  var sz = startPx * scale;
  var mn = minPx * scale;
  while (sz > mn) {
    ctx.font = fontSpec.replace('SIZE', Math.round(sz));
    var lines = wrapLines(ctx, text, maxWidth);
    if (lines.length <= maxLines) break;
    sz = Math.max(mn, sz - 3);
  }
  return sz;
}

function roundRect(ctx, x, y, w, h, r) {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function drawBarcode(ctx, x, y, w, h, color) {
  ctx.fillStyle = color;
  var barWidths = [2, 4, 1, 3, 2, 5, 1, 2, 4, 2, 1, 3, 2, 4, 1, 3];
  var totalRatio = barWidths.reduce(function(a, b) { return a + b; }, 0);
  var unit = w / totalRatio;
  var curX = x;
  barWidths.forEach(function(bw, i) {
    if (i % 2 === 0) {
      ctx.fillRect(curX, y, bw * unit, h);
    }
    curX += bw * unit;
  });
}

function drawCornerBrackets(ctx, padX, padY, W, H, color, len) {
  ctx.strokeStyle = color;
  ctx.lineWidth = Math.max(1, W * 0.002);
  len = len || W * 0.03;
  ctx.beginPath(); ctx.moveTo(padX, padY + len); ctx.lineTo(padX, padY); ctx.lineTo(padX + len, padY); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(W - padX - len, padY); ctx.lineTo(W - padX, padY); ctx.lineTo(W - padX, padY + len); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(padX, H - padY - len); ctx.lineTo(padX, H - padY); ctx.lineTo(padX + len, H - padY); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(W - padX - len, H - padY); ctx.lineTo(W - padX, H - padY); ctx.lineTo(W - padX, H - padY - len); ctx.stroke();
}

function parseFontOverride(val) {
  if (!val) return null;
  var parts = val.split('|');
  return { family: parts[0], weight: parts[1] || '400' };
}

/* =============================================
   14 POSTER CANVAS ENGINE STYLES (Dynamic Math)
   ============================================= */
var POSTER_STYLES = [

  /* 1. CLEAN / OBSIDIAN SERIF */
  {
    id: 'clean',
    name: 'Clean',
    defaultBg: '#FFFFFF',
    defaultText: '#15171A',
    draw: function(ctx, W, H, s) {
      var bg = s.bgColor || this.defaultBg;
      var ink = s.textColor || this.defaultText;
      var pad = W * 0.11;
      var mw = W - pad * 2;
      var fo = parseFontOverride(s.font);
      var fam = fo ? fo.family : '"Instrument Serif", serif';
      var fw = fo ? fo.weight : '400';

      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // Top line
      if (s.topLine) {
        ctx.font = 'normal ' + (W * 0.022 * (s.scale || 1)) + 'px "Instrument Sans", sans-serif';
        ctx.fillStyle = ink;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.globalAlpha = 0.6;
        ctx.fillText(s.topLine.toUpperCase(), W / 2, H * 0.10);
        ctx.globalAlpha = 1;
      }

      // Calculate main text bounds
      var mainText = s.mainText || '';
      var startSz = W * 0.13;
      var sz = autoFontSize(ctx, mainText, mw, startSz, W * 0.045, fw + ' SIZEpx ' + fam, 6, s.scale);
      ctx.font = fw + ' ' + sz + 'px ' + fam;
      var lines = wrapLines(ctx, mainText, mw);
      var lh = sz * 1.22;
      var blockH = lines.length * lh;

      // Available middle zone
      var startY = H * 0.18;
      var endY = H * 0.82;
      var availH = endY - startY;
      var mainY = s.pos === 'top' ? startY + H * 0.02 : s.pos === 'bottom' ? endY - blockH - H * 0.02 : startY + (availH - blockH) / 2;

      // Top framing rule (placed above text block)
      ctx.strokeStyle = ink;
      ctx.lineWidth = Math.max(1, W * 0.0015);
      var topRuleY = Math.min(mainY - H * 0.035, H * 0.18);
      ctx.beginPath(); ctx.moveTo(pad, topRuleY); ctx.lineTo(W - pad, topRuleY); ctx.stroke();

      // Draw Main Text
      ctx.fillStyle = ink;
      drawTextCenter(ctx, mainText, W / 2, mainY, mw, lh);

      // Bottom framing rule (placed below text block)
      var botRuleY = Math.max(mainY + blockH + H * 0.035, H * 0.82);
      ctx.beginPath(); ctx.moveTo(pad, botRuleY); ctx.lineTo(W - pad, botRuleY); ctx.stroke();

      // Bottom line
      if (s.bottomLine) {
        ctx.font = 'normal ' + (W * 0.022 * (s.scale || 1)) + 'px "Instrument Sans", sans-serif';
        ctx.fillStyle = ink;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.globalAlpha = 0.6;
        ctx.fillText(s.bottomLine, W / 2, H * 0.90);
        ctx.globalAlpha = 1;
      }
    }
  },

  /* 2. BOLD */
  {
    id: 'bold',
    name: 'Bold',
    defaultBg: '#111111',
    defaultText: '#FFFFFF',
    draw: function(ctx, W, H, s) {
      var bg = s.bgColor || this.defaultBg;
      var ink = s.textColor || this.defaultText;
      var pad = W * 0.09;
      var mw = W - pad * 2;
      var fo = parseFontOverride(s.font);
      var fam = fo ? fo.family : '"Archivo Black", sans-serif';
      var fw = fo ? fo.weight : '400';

      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = '#7C6EFA';
      ctx.fillRect(0, 0, W * 0.025, H);

      if (s.topLine) {
        ctx.font = '600 ' + (W * 0.026 * (s.scale || 1)) + 'px "Instrument Sans", sans-serif';
        ctx.fillStyle = '#7C6EFA';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.fillText(s.topLine.toUpperCase(), pad, H * 0.08);
      }

      var mainText = (s.mainText || '').toUpperCase();
      var startSz = W * 0.15;
      var sz = autoFontSize(ctx, mainText, mw, startSz, W * 0.05, fw + ' SIZEpx ' + fam, 6, s.scale);
      ctx.font = fw + ' ' + sz + 'px ' + fam;
      var lines = wrapLines(ctx, mainText, mw);
      var lh = sz * 1.12;
      var blockH = lines.length * lh;

      var startY = H * 0.16;
      var endY = H * 0.80;
      var availH = endY - startY;
      var mainY = s.pos === 'top' ? startY : s.pos === 'bottom' ? endY - blockH : startY + (availH - blockH) / 2;

      // Highlight backplate behind first line
      var fl = lines[0] || '';
      ctx.font = fw + ' ' + sz + 'px ' + fam;
      var flW = ctx.measureText(fl).width;
      ctx.fillStyle = '#7C6EFA';
      ctx.globalAlpha = 0.18;
      roundRect(ctx, pad - 4, mainY - 2, Math.min(flW + 8, mw + 8), sz * 1.1, 4);
      ctx.fill();
      ctx.globalAlpha = 1;

      ctx.fillStyle = ink;
      drawTextLeft(ctx, mainText, pad, mainY, mw, lh);

      var ruleY = Math.max(mainY + blockH + H * 0.03, H * 0.84);
      ctx.strokeStyle = ink;
      ctx.globalAlpha = 0.2;
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(pad, ruleY); ctx.lineTo(W - pad, ruleY); ctx.stroke();
      ctx.globalAlpha = 1;

      if (s.bottomLine) {
        ctx.font = '400 ' + (W * 0.022 * (s.scale || 1)) + 'px "Instrument Sans", sans-serif';
        ctx.fillStyle = ink;
        ctx.globalAlpha = 0.55;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.fillText(s.bottomLine, pad, ruleY + H * 0.025);
        ctx.globalAlpha = 1;
      }
    }
  },

  /* 3. EDITORIAL */
  {
    id: 'editorial',
    name: 'Editorial',
    defaultBg: '#FAF8F3',
    defaultText: '#1A1208',
    draw: function(ctx, W, H, s) {
      var bg = s.bgColor || this.defaultBg;
      var ink = s.textColor || this.defaultText;
      var padL = W * 0.18;
      var mw = W - padL - W * 0.08;
      var fo = parseFontOverride(s.font);
      var fam = fo ? fo.family : '"Playfair Display", serif';
      var fw = fo ? fo.weight : '400';

      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      ctx.strokeStyle = ink;
      ctx.lineWidth = Math.max(1, W * 0.003);
      ctx.beginPath(); ctx.moveTo(W * 0.12, H * 0.08); ctx.lineTo(W * 0.12, H * 0.92); ctx.stroke();

      if (s.topLine) {
        ctx.save();
        ctx.translate(W * 0.07, H * 0.50);
        ctx.rotate(-Math.PI / 2);
        ctx.font = '400 ' + (W * 0.022 * (s.scale || 1)) + 'px "Instrument Sans", sans-serif';
        ctx.fillStyle = ink;
        ctx.globalAlpha = 0.5;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(s.topLine.toUpperCase(), 0, 0);
        ctx.restore();
        ctx.globalAlpha = 1;
      }

      ctx.font = 'italic ' + (W * 0.022 * (s.scale || 1)) + 'px ' + fam;
      ctx.fillStyle = ink;
      ctx.globalAlpha = 0.4;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      ctx.fillText('— Statement', padL, H * 0.09);
      ctx.globalAlpha = 1;

      var mainText = s.mainText || '';
      var startSz = W * 0.13;
      var sz = autoFontSize(ctx, mainText, mw, startSz, W * 0.045, fw + ' SIZEpx ' + fam, 6, s.scale);
      ctx.font = fw + ' ' + sz + 'px ' + fam;
      var lines = wrapLines(ctx, mainText, mw);
      var lh = sz * 1.28;
      var blockH = lines.length * lh;

      var startY = H * 0.16;
      var endY = H * 0.82;
      var availH = endY - startY;
      var mainY = s.pos === 'top' ? startY : s.pos === 'bottom' ? endY - blockH : startY + (availH - blockH) / 2;

      ctx.fillStyle = ink;
      drawTextLeft(ctx, mainText, padL, mainY, mw, lh);

      var ruleY = Math.min(mainY + blockH + H * 0.035, H * 0.86);
      ctx.strokeStyle = ink;
      ctx.globalAlpha = 0.3;
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(padL, ruleY); ctx.lineTo(padL + mw * 0.5, ruleY); ctx.stroke();
      ctx.globalAlpha = 1;

      if (s.bottomLine) {
        ctx.font = 'italic ' + (W * 0.02 * (s.scale || 1)) + 'px ' + fam;
        ctx.fillStyle = ink;
        ctx.globalAlpha = 0.55;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'bottom';
        ctx.fillText(s.bottomLine, padL, H * 0.92);
        ctx.globalAlpha = 1;
      }
    }
  },

  /* 4. RETRO */
  {
    id: 'retro',
    name: 'Retro',
    defaultBg: '#F2E8D0',
    defaultText: '#2A1600',
    draw: function(ctx, W, H, s) {
      var bg = s.bgColor || this.defaultBg;
      var ink = s.textColor || this.defaultText;
      var pad = W * 0.09;
      var mw = W - pad * 2;
      var fo = parseFontOverride(s.font);
      var fam = fo ? fo.family : 'Anton, sans-serif';
      var fw = fo ? fo.weight : '400';

      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      var bw = W * 0.022;
      ctx.strokeStyle = ink;
      ctx.lineWidth = bw;
      ctx.strokeRect(bw / 2, bw / 2, W - bw, H - bw);
      ctx.lineWidth = bw * 0.4;
      var inner = bw * 2;
      ctx.strokeRect(inner, inner, W - inner * 2, H - inner * 2);

      ctx.font = '400 ' + (W * 0.04 * (s.scale || 1)) + 'px serif';
      ctx.fillStyle = ink;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('✦', W / 2, H * 0.09);
      ctx.fillText('✦', W / 2, H * 0.91);

      if (s.topLine) {
        ctx.font = '400 ' + (W * 0.026 * (s.scale || 1)) + 'px "Instrument Sans", sans-serif';
        ctx.fillStyle = ink;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.globalAlpha = 0.7;
        ctx.fillText(s.topLine.toUpperCase(), W / 2, H * 0.15);
        ctx.globalAlpha = 1;
      }

      var mainText = (s.mainText || '').toUpperCase();
      var startSz = W * 0.16;
      var sz = autoFontSize(ctx, mainText, mw, startSz, W * 0.055, fw + ' SIZEpx ' + fam, 6, s.scale);
      ctx.font = fw + ' ' + sz + 'px ' + fam;
      var lines = wrapLines(ctx, mainText, mw);
      var lh = sz * 1.1;
      var blockH = lines.length * lh;

      var startY = H * 0.22;
      var endY = H * 0.78;
      var availH = endY - startY;
      var mainY = s.pos === 'top' ? startY : s.pos === 'bottom' ? endY - blockH : startY + (availH - blockH) / 2;

      ctx.lineWidth = Math.max(2, W * 0.003);
      var topRY = mainY - H * 0.03;
      var botRY = mainY + blockH + H * 0.03;
      ctx.beginPath(); ctx.moveTo(pad, topRY); ctx.lineTo(W - pad, topRY); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(pad, botRY); ctx.lineTo(W - pad, botRY); ctx.stroke();

      ctx.fillStyle = ink;
      drawTextCenter(ctx, mainText, W / 2, mainY, mw, lh);

      if (s.bottomLine) {
        ctx.font = '400 ' + (W * 0.022 * (s.scale || 1)) + 'px "Instrument Sans", sans-serif';
        ctx.fillStyle = ink;
        ctx.globalAlpha = 0.65;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(s.bottomLine, W / 2, H * 0.84);
        ctx.globalAlpha = 1;
      }
    }
  },

  /* 5. DARK */
  {
    id: 'dark',
    name: 'Dark',
    defaultBg: '#080810',
    defaultText: '#F0F0F5',
    draw: function(ctx, W, H, s) {
      var bg = s.bgColor || this.defaultBg;
      var ink = s.textColor || this.defaultText;
      var pad = W * 0.1;
      var mw = W - pad * 2;
      var fo = parseFontOverride(s.font);
      var fam = fo ? fo.family : '"Space Grotesk", sans-serif';
      var fw = fo ? fo.weight : '700';

      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = ink;
      ctx.globalAlpha = 0.05;
      var step = W * 0.045;
      for (var x = step; x < W; x += step) {
        for (var y = step; y < H; y += step) {
          ctx.beginPath();
          ctx.arc(x, y, W * 0.003, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;

      if (s.topLine) {
        ctx.font = '600 ' + (W * 0.024 * (s.scale || 1)) + 'px "Instrument Sans", sans-serif';
        ctx.fillStyle = '#7C6EFA';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(s.topLine.toUpperCase(), W / 2, H * 0.10);
      }

      var mainText = s.mainText || '';
      var startSz = W * 0.14;
      var sz = autoFontSize(ctx, mainText, mw, startSz, W * 0.045, fw + ' SIZEpx ' + fam, 6, s.scale);
      ctx.font = fw + ' ' + sz + 'px ' + fam;
      var lines = wrapLines(ctx, mainText, mw);
      var lh = sz * 1.2;
      var blockH = lines.length * lh;

      var startY = H * 0.18;
      var endY = H * 0.80;
      var availH = endY - startY;
      var mainY = s.pos === 'top' ? startY : s.pos === 'bottom' ? endY - blockH : startY + (availH - blockH) / 2;

      ctx.fillStyle = ink;
      drawTextCenter(ctx, mainText, W / 2, mainY, mw, lh);

      ctx.strokeStyle = '#7C6EFA';
      ctx.lineWidth = W * 0.004;
      var acY = mainY + blockH + H * 0.035;
      ctx.beginPath(); ctx.moveTo(W / 2 - W * 0.08, acY); ctx.lineTo(W / 2 + W * 0.08, acY); ctx.stroke();

      if (s.bottomLine) {
        ctx.font = '500 ' + (W * 0.022 * (s.scale || 1)) + 'px "Instrument Sans", sans-serif';
        ctx.fillStyle = ink;
        ctx.globalAlpha = 0.4;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.fillText(s.bottomLine, W / 2, H * 0.92);
        ctx.globalAlpha = 1;
      }
    }
  },

  /* 6. NEON */
  {
    id: 'neon',
    name: 'Neon',
    defaultBg: '#07051A',
    defaultText: '#00F0FF',
    draw: function(ctx, W, H, s) {
      var bg = s.bgColor || this.defaultBg;
      var ink = s.textColor || this.defaultText;
      var pad = W * 0.1;
      var mw = W - pad * 2;
      var fo = parseFontOverride(s.font);
      var fam = fo ? fo.family : '"Space Grotesk", sans-serif';
      var fw = fo ? fo.weight : '700';

      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      var grad = ctx.createRadialGradient(W / 2, H * 0.5, 0, W / 2, H * 0.5, W * 0.6);
      grad.addColorStop(0, 'rgba(124,110,250,0.18)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      if (s.topLine) {
        ctx.font = '600 ' + (W * 0.024 * (s.scale || 1)) + 'px "Instrument Sans", sans-serif';
        ctx.fillStyle = '#CC44FF';
        ctx.shadowColor = '#CC44FF';
        ctx.shadowBlur = W * 0.02;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(s.topLine.toUpperCase(), W / 2, H * 0.10);
        ctx.shadowBlur = 0;
      }

      var mainText = s.mainText || '';
      var startSz = W * 0.14;
      var sz = autoFontSize(ctx, mainText, mw, startSz, W * 0.045, fw + ' SIZEpx ' + fam, 6, s.scale);
      ctx.font = fw + ' ' + sz + 'px ' + fam;
      var lines = wrapLines(ctx, mainText, mw);
      var lh = sz * 1.2;
      var blockH = lines.length * lh;

      var startY = H * 0.18;
      var endY = H * 0.80;
      var availH = endY - startY;
      var mainY = s.pos === 'top' ? startY : s.pos === 'bottom' ? endY - blockH : startY + (availH - blockH) / 2;

      var glowLevels = [[ink, W * 0.04], [ink, W * 0.02], [ink, W * 0.008]];
      glowLevels.forEach(function(g) {
        ctx.font = fw + ' ' + sz + 'px ' + fam;
        ctx.fillStyle = g[0];
        ctx.shadowColor = g[0];
        ctx.shadowBlur = g[1];
        drawTextCenter(ctx, mainText, W / 2, mainY, mw, lh);
      });
      ctx.shadowBlur = 0;

      ctx.strokeStyle = '#7C6EFA';
      ctx.lineWidth = W * 0.002;
      ctx.shadowColor = '#7C6EFA';
      ctx.shadowBlur = W * 0.01;
      var topRY = mainY - H * 0.035;
      var botRY = mainY + blockH + H * 0.035;
      ctx.beginPath(); ctx.moveTo(pad, topRY); ctx.lineTo(W - pad, topRY); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(pad, botRY); ctx.lineTo(W - pad, botRY); ctx.stroke();
      ctx.shadowBlur = 0;

      if (s.bottomLine) {
        ctx.font = '500 ' + (W * 0.022 * (s.scale || 1)) + 'px "Instrument Sans", sans-serif';
        ctx.fillStyle = '#CC44FF';
        ctx.shadowColor = '#CC44FF';
        ctx.shadowBlur = W * 0.01;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.fillText(s.bottomLine, W / 2, H * 0.93);
        ctx.shadowBlur = 0;
      }
    }
  },

  /* 7. GEOMETRIC */
  {
    id: 'geo',
    name: 'Geo',
    defaultBg: '#FFFFFF',
    defaultText: '#15151E',
    draw: function(ctx, W, H, s) {
      var bg = s.bgColor || this.defaultBg;
      var ink = s.textColor || this.defaultText;
      var pad = W * 0.1;
      var mw = W - pad * 2;
      var fo = parseFontOverride(s.font);
      var fam = fo ? fo.family : '"Instrument Sans", sans-serif';
      var fw = fo ? fo.weight : '700';

      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = '#7C6EFA';
      ctx.globalAlpha = 0.1;
      ctx.beginPath();
      ctx.arc(W * 0.85, H * 0.22, W * 0.55, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;

      ctx.fillStyle = '#A896FF';
      ctx.globalAlpha = 0.07;
      ctx.fillRect(0, H * 0.72, W * 0.6, H * 0.28);
      ctx.globalAlpha = 1;

      ctx.fillStyle = '#7C6EFA';
      ctx.globalAlpha = 0.9;
      ctx.beginPath();
      ctx.arc(pad, H * 0.10, W * 0.018, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;

      if (s.topLine) {
        ctx.font = '600 ' + (W * 0.024 * (s.scale || 1)) + 'px "Instrument Sans", sans-serif';
        ctx.fillStyle = '#7C6EFA';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(s.topLine.toUpperCase(), pad + W * 0.04, H * 0.10);
      }

      var mainText = s.mainText || '';
      var startSz = W * 0.14;
      var sz = autoFontSize(ctx, mainText, mw, startSz, W * 0.045, fw + ' SIZEpx ' + fam, 6, s.scale);
      ctx.font = fw + ' ' + sz + 'px ' + fam;
      var lines = wrapLines(ctx, mainText, mw);
      var lh = sz * 1.2;
      var blockH = lines.length * lh;

      var startY = H * 0.18;
      var endY = H * 0.82;
      var availH = endY - startY;
      var mainY = s.pos === 'top' ? startY : s.pos === 'bottom' ? endY - blockH : startY + (availH - blockH) / 2;

      ctx.fillStyle = ink;
      drawTextLeft(ctx, mainText, pad, mainY, mw, lh);

      if (s.bottomLine) {
        ctx.font = '400 ' + (W * 0.022 * (s.scale || 1)) + 'px "Instrument Sans", sans-serif';
        ctx.fillStyle = ink;
        ctx.globalAlpha = 0.5;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'bottom';
        ctx.fillText(s.bottomLine, pad, H * 0.91);
        ctx.globalAlpha = 1;
      }
    }
  },

  /* 8. FILM */
  {
    id: 'film',
    name: 'Film',
    defaultBg: '#0A0F1C',
    defaultText: '#EEEEF4',
    draw: function(ctx, W, H, s) {
      var bg = s.bgColor || this.defaultBg;
      var ink = s.textColor || this.defaultText;
      var pad = W * 0.1;
      var mw = W - pad * 2;
      var fo = parseFontOverride(s.font);
      var fam = fo ? fo.family : '"Space Grotesk", sans-serif';
      var fw = fo ? fo.weight : '500';
      var barH = H * 0.13;

      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, W, barH);
      ctx.fillRect(0, H - barH, W, barH);

      ctx.strokeStyle = ink;
      ctx.globalAlpha = 0.2;
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(pad, barH + H * 0.025); ctx.lineTo(W - pad, barH + H * 0.025); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(pad, H - barH - H * 0.025); ctx.lineTo(W - pad, H - barH - H * 0.025); ctx.stroke();
      ctx.globalAlpha = 1;

      if (s.topLine) {
        ctx.font = '500 ' + (W * 0.022 * (s.scale || 1)) + 'px "Instrument Sans", sans-serif';
        ctx.fillStyle = ink;
        ctx.globalAlpha = 0.7;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(s.topLine.toUpperCase(), W / 2, barH / 2);
        ctx.globalAlpha = 1;
      }

      var mainText = s.mainText || '';
      var zoneH = H - barH * 2 - H * 0.08;
      var startSz = W * 0.13;
      var sz = autoFontSize(ctx, mainText, mw, startSz, W * 0.045, fw + ' SIZEpx ' + fam, 6, s.scale);
      ctx.font = fw + ' ' + sz + 'px ' + fam;
      var lines = wrapLines(ctx, mainText, mw);
      var lh = sz * 1.25;
      var blockH = lines.length * lh;

      var startY = barH + H * 0.04;
      var mainY = s.pos === 'top' ? startY : s.pos === 'bottom' ? startY + zoneH - blockH : startY + (zoneH - blockH) / 2;

      ctx.fillStyle = ink;
      drawTextCenter(ctx, mainText, W / 2, mainY, mw, lh);

      if (s.bottomLine) {
        ctx.font = '400 ' + (W * 0.022 * (s.scale || 1)) + 'px "Instrument Sans", sans-serif';
        ctx.fillStyle = ink;
        ctx.globalAlpha = 0.6;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(s.bottomLine, W / 2, H - barH / 2);
        ctx.globalAlpha = 1;
      }
    }
  },

  /* 9. HAND */
  {
    id: 'hand',
    name: 'Hand',
    defaultBg: '#FEFBF0',
    defaultText: '#2D1A00',
    draw: function(ctx, W, H, s) {
      var bg = s.bgColor || this.defaultBg;
      var ink = s.textColor || this.defaultText;
      var pad = W * 0.11;
      var mw = W - pad * 2;
      var fo = parseFontOverride(s.font);
      var fam = fo ? fo.family : 'Caveat, cursive';
      var fw = fo ? fo.weight : '700';

      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      ctx.strokeStyle = ink;
      ctx.globalAlpha = 0.04;
      ctx.lineWidth = 1;
      var lineSpacing = H * 0.065;
      for (var y = lineSpacing; y < H; y += lineSpacing) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }
      ctx.globalAlpha = 1;

      if (s.topLine) {
        ctx.font = '500 ' + (W * 0.03 * (s.scale || 1)) + 'px ' + fam;
        ctx.fillStyle = ink;
        ctx.globalAlpha = 0.55;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(s.topLine, W / 2, H * 0.10);
        ctx.globalAlpha = 1;
      }

      var mainText = s.mainText || '';
      var startSz = W * 0.15;
      var sz = autoFontSize(ctx, mainText, mw, startSz, W * 0.05, fw + ' SIZEpx ' + fam, 6, s.scale);
      ctx.font = fw + ' ' + sz + 'px ' + fam;
      var lines = wrapLines(ctx, mainText, mw);
      var lh = sz * 1.3;
      var blockH = lines.length * lh;

      var startY = H * 0.18;
      var endY = H * 0.80;
      var availH = endY - startY;
      var mainY = s.pos === 'top' ? startY : s.pos === 'bottom' ? endY - blockH : startY + (availH - blockH) / 2;

      ctx.fillStyle = ink;
      drawTextCenter(ctx, mainText, W / 2, mainY, mw, lh);

      ctx.strokeStyle = '#D4500A';
      ctx.lineWidth = Math.max(2, W * 0.003);
      ctx.globalAlpha = 0.65;
      lines.forEach(function(line, li) {
        ctx.font = fw + ' ' + sz + 'px ' + fam;
        var lw = ctx.measureText(line).width;
        var lx = W / 2 - lw / 2;
        var ly = mainY + li * lh + sz * 1.05;
        ctx.beginPath();
        ctx.moveTo(lx, ly);
        for (var xi = 0; xi <= lw; xi += lw / 10) {
          var wave = Math.sin(xi / lw * Math.PI * 3) * (W * 0.003);
          ctx.lineTo(lx + xi, ly + wave);
        }
        ctx.stroke();
      });
      ctx.globalAlpha = 1;

      if (s.bottomLine) {
        ctx.font = '500 ' + (W * 0.025 * (s.scale || 1)) + 'px ' + fam;
        ctx.fillStyle = ink;
        ctx.globalAlpha = 0.55;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.fillText(s.bottomLine, W / 2, H * 0.92);
        ctx.globalAlpha = 1;
      }
    }
  },

  /* 10. GRADIENT */
  {
    id: 'gradient',
    name: 'Gradient',
    defaultBg: null,
    defaultText: '#FFFFFF',
    draw: function(ctx, W, H, s) {
      var ink = s.textColor || this.defaultText;
      var pad = W * 0.1;
      var mw = W - pad * 2;
      var fo = parseFontOverride(s.font);
      var fam = fo ? fo.family : '"Instrument Sans", sans-serif';
      var fw = fo ? fo.weight : '700';

      var grad;
      if (s.bgColor && s.bgColor !== '#111111') {
        grad = ctx.createLinearGradient(0, 0, W, H);
        grad.addColorStop(0, s.bgColor);
        grad.addColorStop(1, '#7C6EFA');
      } else {
        grad = ctx.createLinearGradient(0, 0, W, H);
        grad.addColorStop(0, '#FF6B35');
        grad.addColorStop(0.45, '#C44ADE');
        grad.addColorStop(1, '#3B5BDB');
      }
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = '#FFFFFF';
      ctx.globalAlpha = 0.03;
      for (var i = 0; i < 2000; i++) {
        ctx.fillRect(Math.random() * W, Math.random() * H, 1, 1);
      }
      ctx.globalAlpha = 1;

      ctx.strokeStyle = 'rgba(255,255,255,0.15)';
      ctx.lineWidth = W * 0.015;
      ctx.beginPath();
      ctx.arc(W * 0.1, H * 0.9, W * 0.5, Math.PI * 1.5, Math.PI * 0);
      ctx.stroke();

      if (s.topLine) {
        ctx.font = '600 ' + (W * 0.024 * (s.scale || 1)) + 'px "Instrument Sans", sans-serif';
        ctx.fillStyle = ink;
        ctx.globalAlpha = 0.75;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(s.topLine.toUpperCase(), W / 2, H * 0.10);
        ctx.globalAlpha = 1;
      }

      var mainText = s.mainText || '';
      var startSz = W * 0.14;
      var sz = autoFontSize(ctx, mainText, mw, startSz, W * 0.045, fw + ' SIZEpx ' + fam, 6, s.scale);
      ctx.font = fw + ' ' + sz + 'px ' + fam;
      var lines = wrapLines(ctx, mainText, mw);
      var lh = sz * 1.25;
      var blockH = lines.length * lh;

      var startY = H * 0.18;
      var endY = H * 0.80;
      var availH = endY - startY;
      var mainY = s.pos === 'top' ? startY : s.pos === 'bottom' ? endY - blockH : startY + (availH - blockH) / 2;

      ctx.fillStyle = ink;
      ctx.shadowColor = 'rgba(0,0,0,0.3)';
      ctx.shadowBlur = W * 0.015;
      ctx.shadowOffsetY = W * 0.005;
      drawTextCenter(ctx, mainText, W / 2, mainY, mw, lh);
      ctx.shadowBlur = 0;
      ctx.shadowOffsetY = 0;

      if (s.bottomLine) {
        ctx.font = '500 ' + (W * 0.022 * (s.scale || 1)) + 'px "Instrument Sans", sans-serif';
        ctx.fillStyle = ink;
        ctx.globalAlpha = 0.7;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.fillText(s.bottomLine, W / 2, H * 0.93);
        ctx.globalAlpha = 1;
      }
    }
  },

  /* 11. AURA GLASS */
  {
    id: 'auraglass',
    name: 'Aura Glass',
    defaultBg: '#090A16',
    defaultText: '#FFFFFF',
    draw: function(ctx, W, H, s) {
      var ink = s.textColor || this.defaultText;
      var pad = W * 0.1;
      var fo = parseFontOverride(s.font);
      var fam = fo ? fo.family : '"Space Grotesk", sans-serif';
      var fw = fo ? fo.weight : '700';

      var bgGrad = ctx.createLinearGradient(0, 0, W, H);
      bgGrad.addColorStop(0, '#0F0C20');
      bgGrad.addColorStop(1, '#060711');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, W, H);

      var g1 = ctx.createRadialGradient(W * 0.2, H * 0.3, 0, W * 0.2, H * 0.3, W * 0.55);
      g1.addColorStop(0, 'rgba(124, 110, 250, 0.45)');
      g1.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, W, H);

      var g2 = ctx.createRadialGradient(W * 0.8, H * 0.7, 0, W * 0.8, H * 0.7, W * 0.5);
      g2.addColorStop(0, 'rgba(0, 240, 255, 0.35)');
      g2.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, W, H);

      var cardX = pad * 0.7;
      var cardY = H * 0.10;
      var cardW = W - cardX * 2;
      var cardH = H * 0.80;

      ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
      ctx.shadowBlur = W * 0.04;
      ctx.shadowOffsetY = W * 0.02;

      ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
      roundRect(ctx, cardX, cardY, cardW, cardH, W * 0.04);
      ctx.fill();

      ctx.shadowBlur = 0;
      ctx.shadowOffsetY = 0;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
      ctx.lineWidth = Math.max(1, W * 0.002);
      ctx.stroke();

      if (s.topLine) {
        var topText = '✦  ' + s.topLine.toUpperCase();
        ctx.font = '600 ' + (W * 0.022 * (s.scale || 1)) + 'px "Instrument Sans", sans-serif';
        var tw = ctx.measureText(topText).width;
        var pillW = tw + W * 0.06;
        var pillH = W * 0.045;
        var pillX = W / 2 - pillW / 2;
        var pillY = cardY + H * 0.04;

        ctx.fillStyle = 'rgba(124, 110, 250, 0.25)';
        roundRect(ctx, pillX, pillY, pillW, pillH, pillH / 2);
        ctx.fill();

        ctx.strokeStyle = '#7C6EFA';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.fillStyle = '#00F0FF';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(topText, W / 2, pillY + pillH / 2);
      }

      var mainText = s.mainText || '';
      var innerMw = cardW - W * 0.12;
      var startSz = W * 0.13;
      var sz = autoFontSize(ctx, mainText, innerMw, startSz, W * 0.045, fw + ' SIZEpx ' + fam, 6, s.scale);
      ctx.font = fw + ' ' + sz + 'px ' + fam;
      var lines = wrapLines(ctx, mainText, innerMw);
      var lh = sz * 1.25;
      var blockH = lines.length * lh;

      var startY = cardY + H * 0.11;
      var endY = cardY + cardH - H * 0.09;
      var availH = endY - startY;
      var mainY = s.pos === 'top' ? startY : s.pos === 'bottom' ? endY - blockH : startY + (availH - blockH) / 2;

      ctx.fillStyle = ink;
      ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
      ctx.shadowBlur = W * 0.02;
      drawTextCenter(ctx, mainText, W / 2, mainY, innerMw, lh);
      ctx.shadowBlur = 0;

      if (s.bottomLine) {
        ctx.font = '500 ' + (W * 0.022 * (s.scale || 1)) + 'px "Instrument Sans", sans-serif';
        ctx.fillStyle = ink;
        ctx.globalAlpha = 0.65;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.fillText(s.bottomLine, W / 2, cardY + cardH - H * 0.04);
        ctx.globalAlpha = 1;
      }
    }
  },

  /* 12. SWISS GRID */
  {
    id: 'swiss',
    name: 'Swiss Grid',
    defaultBg: '#F4F4F6',
    defaultText: '#111215',
    draw: function(ctx, W, H, s) {
      var bg = s.bgColor || this.defaultBg;
      var ink = s.textColor || this.defaultText;
      var pad = W * 0.08;
      var mw = W - pad * 2;
      var fo = parseFontOverride(s.font);
      var fam = fo ? fo.family : '"Archivo Black", sans-serif';
      var fw = fo ? fo.weight : '400';

      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = '#E63946';
      ctx.fillRect(pad, H * 0.05, W * 0.15, W * 0.015);

      ctx.font = '900 ' + (W * 0.14 * (s.scale || 1)) + 'px "Archivo Black", sans-serif';
      ctx.fillStyle = '#E63946';
      ctx.globalAlpha = 0.9;
      ctx.textAlign = 'right';
      ctx.textBaseline = 'top';
      ctx.fillText('01.', W - pad, H * 0.04);
      ctx.globalAlpha = 1;

      ctx.strokeStyle = ink;
      ctx.lineWidth = Math.max(2, W * 0.003);
      ctx.beginPath(); ctx.moveTo(pad, H * 0.17); ctx.lineTo(W - pad, H * 0.17); ctx.stroke();

      if (s.topLine) {
        ctx.font = '700 ' + (W * 0.024 * (s.scale || 1)) + 'px "Instrument Sans", sans-serif';
        ctx.fillStyle = ink;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.fillText(s.topLine.toUpperCase(), pad, H * 0.19);
      }

      var mainText = (s.mainText || '').toUpperCase();
      var startSz = W * 0.14;
      var sz = autoFontSize(ctx, mainText, mw, startSz, W * 0.05, fw + ' SIZEpx ' + fam, 6, s.scale);
      ctx.font = fw + ' ' + sz + 'px ' + fam;
      var lines = wrapLines(ctx, mainText, mw);
      var lh = sz * 1.1;
      var blockH = lines.length * lh;

      var startY = H * 0.24;
      var endY = H * 0.80;
      var availH = endY - startY;
      var mainY = s.pos === 'top' ? startY : s.pos === 'bottom' ? endY - blockH : startY + (availH - blockH) / 2;

      ctx.fillStyle = ink;
      drawTextLeft(ctx, mainText, pad, mainY, mw, lh);

      ctx.strokeStyle = ink;
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(pad, H * 0.84); ctx.lineTo(W - pad, H * 0.84); ctx.stroke();

      if (s.bottomLine) {
        ctx.font = '600 ' + (W * 0.022 * (s.scale || 1)) + 'px "Instrument Sans", sans-serif';
        ctx.fillStyle = ink;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.fillText(s.bottomLine.toUpperCase(), pad, H * 0.865);
      }

      ctx.font = '500 ' + (W * 0.018 * (s.scale || 1)) + 'px "Instrument Sans", sans-serif';
      ctx.fillStyle = ink;
      ctx.globalAlpha = 0.5;
      ctx.textAlign = 'right';
      ctx.textBaseline = 'top';
      ctx.fillText('SWISS TYPE // 2026', W - pad, H * 0.865);
      ctx.globalAlpha = 1;
    }
  },

  /* 13. BRUTALIST */
  {
    id: 'brutalist',
    name: 'Brutalist',
    defaultBg: '#E2F567',
    defaultText: '#000000',
    draw: function(ctx, W, H, s) {
      var bg = s.bgColor || this.defaultBg;
      var ink = s.textColor || this.defaultText;
      var pad = W * 0.09;
      var mw = W - pad * 2;
      var fo = parseFontOverride(s.font);
      var fam = fo ? fo.family : '"Space Grotesk", sans-serif';
      var fw = fo ? fo.weight : '700';

      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      drawCornerBrackets(ctx, W * 0.04, H * 0.04, W, H, ink, W * 0.04);

      if (s.topLine) {
        var tag = '[ ' + s.topLine.toUpperCase() + ' ]';
        ctx.font = '700 ' + (W * 0.024 * (s.scale || 1)) + 'px "Space Grotesk", monospace';
        ctx.fillStyle = ink;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.fillText(tag, pad, H * 0.08);
      }

      var mainText = s.mainText || '';
      var boxPadding = W * 0.06;
      var innerMw = mw - boxPadding * 2;
      var startSz = W * 0.13;
      var sz = autoFontSize(ctx, mainText, innerMw, startSz, W * 0.045, fw + ' SIZEpx ' + fam, 6, s.scale);
      ctx.font = fw + ' ' + sz + 'px ' + fam;
      var lines = wrapLines(ctx, mainText, innerMw);
      var lh = sz * 1.2;
      var textH = lines.length * lh;
      var blockH = textH + boxPadding * 2;

      var startY = H * 0.15;
      var endY = H * 0.80;
      var availH = endY - startY;
      var boxY = s.pos === 'top' ? startY : s.pos === 'bottom' ? endY - blockH : startY + (availH - blockH) / 2;

      var boxX = pad;
      var boxW = mw;
      var offset = W * 0.015;

      ctx.fillStyle = ink;
      ctx.fillRect(boxX + offset, boxY + offset, boxW, blockH);

      ctx.fillStyle = bg === '#000000' || bg === '#111111' ? '#1E1E26' : '#FFFFFF';
      ctx.fillRect(boxX, boxY, boxW, blockH);
      ctx.strokeStyle = ink;
      ctx.lineWidth = Math.max(2, W * 0.004);
      ctx.strokeRect(boxX, boxY, boxW, blockH);

      ctx.fillStyle = bg === '#000000' || bg === '#111111' ? '#FFFFFF' : ink;
      drawTextLeft(ctx, mainText, boxX + boxPadding, boxY + boxPadding, innerMw, lh);

      drawBarcode(ctx, pad, H * 0.86, W * 0.28, H * 0.04, ink);

      if (s.bottomLine) {
        ctx.font = '700 ' + (W * 0.02 * (s.scale || 1)) + 'px "Space Grotesk", sans-serif';
        ctx.fillStyle = ink;
        ctx.textAlign = 'right';
        ctx.textBaseline = 'bottom';
        ctx.fillText(s.bottomLine.toUpperCase(), W - pad, H * 0.895);
      }
    }
  },

  /* 14. MINIMAL MONO */
  {
    id: 'minimono',
    name: 'Minimal Mono',
    defaultBg: '#1E1E2E',
    defaultText: '#A6E3A1',
    draw: function(ctx, W, H, s) {
      var bg = s.bgColor || this.defaultBg;
      var ink = s.textColor || this.defaultText;
      var pad = W * 0.1;
      var fo = parseFontOverride(s.font);
      var fam = fo ? fo.family : '"Space Grotesk", monospace';
      var fw = fo ? fo.weight : '700';

      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.fillRect(0, 0, W, H * 0.07);

      var dotY = H * 0.035;
      var dots = ['#FF5F56', '#FFBD2E', '#27C93F'];
      dots.forEach(function(c, i) {
        ctx.fillStyle = c;
        ctx.beginPath();
        ctx.arc(pad * 0.5 + i * W * 0.028, dotY, W * 0.009, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.font = '500 ' + (W * 0.02 * (s.scale || 1)) + 'px monospace';
      ctx.fillStyle = '#89DCEB';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText((s.topLine ? s.topLine.toLowerCase() : 'poster') + '.js', W / 2, dotY);

      var gutterX = pad * 0.6;
      ctx.font = '400 ' + (W * 0.018 * (s.scale || 1)) + 'px monospace';
      ctx.fillStyle = '#6C7086';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      for (var l = 1; l <= 12; l++) {
        var numStr = (l < 10 ? '0' : '') + l;
        ctx.fillText(numStr, gutterX, H * 0.12 + (l - 1) * H * 0.06);
      }

      ctx.strokeStyle = '#313244';
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(pad * 1.1, H * 0.07); ctx.lineTo(pad * 1.1, H * 0.88); ctx.stroke();

      var mainText = s.mainText || '';
      var codeMw = W - pad * 1.5 - pad * 0.5;
      var startSz = W * 0.12;
      var sz = autoFontSize(ctx, mainText, codeMw, startSz, W * 0.045, fw + ' SIZEpx ' + fam, 6, s.scale);
      ctx.font = fw + ' ' + sz + 'px ' + fam;
      var lines = wrapLines(ctx, mainText, codeMw);
      var lh = sz * 1.25;
      var blockH = lines.length * lh;

      var startY = H * 0.12;
      var endY = H * 0.86;
      var availH = endY - startY;
      var mainY = s.pos === 'top' ? startY : s.pos === 'bottom' ? endY - blockH : startY + (availH - blockH) / 2;

      ctx.fillStyle = ink;
      drawTextLeft(ctx, mainText, pad * 1.5, mainY, codeMw, lh);

      ctx.fillStyle = '#11111B';
      ctx.fillRect(0, H * 0.92, W, H * 0.08);

      if (s.bottomLine) {
        ctx.font = '500 ' + (W * 0.02 * (s.scale || 1)) + 'px monospace';
        ctx.fillStyle = '#F5E0DC';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText('// ' + s.bottomLine, pad * 0.6, H * 0.96);
      }

      ctx.font = '500 ' + (W * 0.018 * (s.scale || 1)) + 'px monospace';
      ctx.fillStyle = '#A6E3A1';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillText('● UTF-8', W - pad * 0.6, H * 0.96);
    }
  }
];

/* -------- Apply Ready-Made Template -------- */
function applyPosterTemplate(id, applyCopy) {
  var tpl = POSTER_TEMPLATES.find(function(t) { return t.id === id; });
  if (!tpl) return;

  ACTIVE_TEMPLATE = id;
  POSTER_STYLE = tpl.style;

  $('pFont').value = tpl.font || '';
  $('pTextColor').value = tpl.textColor;
  $('pBgColor').value = tpl.bgColor;
  $('pTextColorLabel').textContent = tpl.textColor;
  $('pBgColorLabel').textContent = tpl.bgColor;

  if (applyCopy || !$('pMain').value) {
    $('pTop').value = tpl.topLine || '';
    $('pMain').value = tpl.mainText || '';
    $('pBottom').value = tpl.bottomLine || '';
  }

  document.querySelectorAll('.template-thumb').forEach(function(el) {
    el.setAttribute('aria-pressed', el.dataset.tpl === id ? 'true' : 'false');
  });

  $('posterStyleName').textContent = tpl.name + ' Template';
  posterChanged();
  showToast('Applied ' + tpl.name + ' Template');
}

/* -------- Build Template Gallery Grid -------- */
function buildTemplateGrid() {
  var grid = $('posterTemplateGrid');
  if (!grid) return;
  grid.innerHTML = '';

  POSTER_TEMPLATES.forEach(function(tpl) {
    var btn = document.createElement('button');
    btn.className = 'style-thumb template-thumb';
    btn.dataset.tpl = tpl.id;
    btn.setAttribute('aria-pressed', tpl.id === ACTIVE_TEMPLATE ? 'true' : 'false');
    btn.setAttribute('aria-label', tpl.name + ' template');
    btn.onclick = function() { applyPosterTemplate(tpl.id, false); };

    var tc = document.createElement('canvas');
    tc.width = 110;
    tc.height = 138;
    btn.appendChild(tc);

    var nm = document.createElement('span');
    nm.className = 'sname';
    nm.textContent = tpl.name;
    btn.appendChild(nm);

    grid.appendChild(btn);
    renderTemplateThumb(tc, tpl);
  });
}

function renderTemplateThumb(canvas, tpl) {
  var ctx = canvas.getContext('2d');
  var W = canvas.width, H = canvas.height;
  var style = POSTER_STYLES.find(function(s) { return s.id === tpl.style; }) || POSTER_STYLES[0];
  var dummyState = {
    topLine: tpl.topLine || 'HEADER',
    mainText: tpl.mainText || 'Sample Text',
    bottomLine: tpl.bottomLine || '@creatorkit',
    font: tpl.font || '',
    pos: '',
    textColor: tpl.textColor,
    bgColor: tpl.bgColor,
    scale: 0.88
  };
  try {
    style.draw(ctx, W, H, dummyState);
  } catch(e) {}
}

/* -------- Build Color Palette Swatches -------- */
function buildPaletteSwatches() {
  var container = $('pSwatches');
  if (!container) return;
  container.innerHTML = '';

  COLOR_PALETTES.forEach(function(pal) {
    var btn = document.createElement('button');
    btn.className = 'swatch';
    btn.style.background = pal.bg;
    btn.style.border = '2px solid ' + pal.text;
    btn.title = pal.name + ' (' + pal.text + ' / ' + pal.bg + ')';
    btn.onclick = function() {
      setPosterColors(pal.text, pal.bg);
      showToast('Applied ' + pal.name + ' Palette');
    };
    container.appendChild(btn);
  });
}

/* -------- Color Presets & Shuffler -------- */
function setPosterColors(textColor, bgColor) {
  $('pTextColor').value = textColor;
  $('pBgColor').value = bgColor;
  $('pTextColorLabel').textContent = textColor;
  $('pBgColorLabel').textContent = bgColor;
  posterChanged();
}

function shufflePosterColors() {
  var curText = $('pTextColor').value;
  var curBg = $('pBgColor').value;
  setPosterColors(curBg, curText);
  showToast('🔀 Shuffled Colors');
}

/* -------- Example Inspiration Quotes -------- */
var SAMPLE_QUOTES = [
  { top: 'CREATIVE VISION', main: 'Simplicity is the ultimate sophistication.', bottom: '— Leonardo da Vinci' },
  { top: 'DAILY MOTIVATION', main: 'Think differently and push the boundaries.', bottom: '— Steve Jobs' },
  { top: 'DESIGN PRINCIPLE', main: 'Good design is as little design as possible.', bottom: '— Dieter Rams' },
  { top: 'INNOVATION', main: 'The best way to predict the future is to create it.', bottom: '@creatorkit' }
];
var _sampleIdx = 0;

function posterLoadExample() {
  var sample = SAMPLE_QUOTES[_sampleIdx % SAMPLE_QUOTES.length];
  _sampleIdx++;
  $('pTop').value = sample.top;
  $('pMain').value = sample.main;
  $('pBottom').value = sample.bottom;
  posterChanged();
}

/* -------- Text Scale Adjuster -------- */
window.POSTER_TEXT_SCALE = 100;
function adjustPosterScale(delta) {
  var sc = Math.max(50, Math.min(180, (window.POSTER_TEXT_SCALE || 100) + delta));
  window.POSTER_TEXT_SCALE = sc;
  var lbl = $('pTextScaleLabel');
  if (lbl) lbl.textContent = sc + '%';
  var fill = $('pScaleFill');
  if (fill) fill.style.width = ((sc - 50) / 130 * 100) + '%';
  posterChanged();
}

/* -------- Background Image & AI Cutout Handling -------- */
window.POSTER_BG_IMAGE = null;
window.POSTER_ORIGINAL_IMAGE = null;
window.POSTER_BG_IS_CUTOUT = false;

function loadPosterImage(input) {
  if (!input.files || !input.files[0]) return;
  var file = input.files[0];
  var reader = new FileReader();
  reader.onload = function(e) {
    var img = new Image();
    img.onload = function() {
      window.POSTER_ORIGINAL_IMAGE = img;
      window.POSTER_BG_IMAGE = img;
      window.POSTER_BG_IS_CUTOUT = false;
      var wrap = $('pClearImgWrap');
      if (wrap) wrap.style.display = 'block';
      var rmBtn = $('pRemoveBgBtn');
      if (rmBtn) { rmBtn.style.display = 'inline-flex'; rmBtn.innerHTML = '✨ Remove Background'; rmBtn.disabled = false; }
      var revBtn = $('pRevertBgBtn');
      if (revBtn) revBtn.style.display = 'none';
      posterChanged();
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function clearPosterImage() {
  window.POSTER_BG_IMAGE = null;
  window.POSTER_ORIGINAL_IMAGE = null;
  window.POSTER_BG_IS_CUTOUT = false;
  $('pBgImg').value = '';
  var wrap = $('pClearImgWrap');
  if (wrap) wrap.style.display = 'none';
  posterChanged();
}

async function removePosterBgAI() {
  var imgToProcess = window.POSTER_ORIGINAL_IMAGE || window.POSTER_BG_IMAGE;
  if (!imgToProcess) {
    showToast('Please upload an image first.');
    return;
  }
  var btn = $('pRemoveBgBtn');
  var origText = btn ? btn.innerHTML : '✨ Remove Background';
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '⏳ Removing BG...';
  }
  showToast('AI is isolating subject... please wait.');

  // 1. Try modern client-side AI background removal (@imgly/background-removal)
  try {
    var module = await import('https://cdn.jsdelivr.net/npm/@imgly/background-removal@1.5.7/+esm');
    var removeBackground = module.removeBackground || (module.default && module.default.removeBackground) || module.default;
    if (typeof removeBackground === 'function') {
      var blob = await removeBackground(imgToProcess.src, {
        progress: function(key, current, total) {
          if (total > 0 && btn) {
            var pct = Math.round((current / total) * 100);
            btn.innerHTML = '⏳ AI ' + pct + '%...';
          }
        }
      });
      var url = URL.createObjectURL(blob);
      var cutoutImg = new Image();
      cutoutImg.onload = function() {
        window.POSTER_BG_IMAGE = cutoutImg;
        window.POSTER_BG_IS_CUTOUT = true;
        if (btn) {
          btn.disabled = false;
          btn.style.display = 'none';
        }
        var revBtn = $('pRevertBgBtn');
        if (revBtn) revBtn.style.display = 'inline-flex';
        showToast('✨ Background removed cleanly!');
        posterChanged();
      };
      cutoutImg.src = url;
      return;
    }
  } catch (err) {
    console.warn('AI Model CDN load note, running smart canvas keying fallback:', err);
  }

  // 2. High-performance Smart Canvas Cutout Fallback
  try {
    var cutoutCanvas = smartCanvasCutout(imgToProcess);
    var cutoutImg2 = new Image();
    cutoutImg2.onload = function() {
      window.POSTER_BG_IMAGE = cutoutImg2;
      window.POSTER_BG_IS_CUTOUT = true;
      if (btn) {
        btn.disabled = false;
        btn.style.display = 'none';
      }
      var revBtn = $('pRevertBgBtn');
      if (revBtn) revBtn.style.display = 'inline-flex';
      showToast('✨ Background removed!');
      posterChanged();
    };
    cutoutImg2.src = cutoutCanvas.toDataURL('image/png');
  } catch (fallbackErr) {
    console.error('Cutout processing error:', fallbackErr);
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = origText;
    }
    showToast('Could not remove background from this image.');
  }
}

function revertPosterBgOriginal() {
  if (!window.POSTER_ORIGINAL_IMAGE) return;
  window.POSTER_BG_IMAGE = window.POSTER_ORIGINAL_IMAGE;
  window.POSTER_BG_IS_CUTOUT = false;
  var revBtn = $('pRevertBgBtn');
  if (revBtn) revBtn.style.display = 'none';
  var rmBtn = $('pRemoveBgBtn');
  if (rmBtn) {
    rmBtn.style.display = 'inline-flex';
    rmBtn.innerHTML = '✨ Remove Background';
    rmBtn.disabled = false;
  }
  showToast('Reverted to original image');
  posterChanged();
}

/* Smart Canvas Cutout (Edge & Chroma Feathering) */
function smartCanvasCutout(img) {
  var c = document.createElement('canvas');
  var w = img.naturalWidth || img.width || 800;
  var h = img.naturalHeight || img.height || 800;
  c.width = w;
  c.height = h;
  var ctx = c.getContext('2d');
  ctx.drawImage(img, 0, 0);
  var imgData = ctx.getImageData(0, 0, w, h);
  var data = imgData.data;

  // Sample corner pixels to detect background color
  var pts = [
    [0, 0], [w - 1, 0], [0, h - 1], [w - 1, h - 1],
    [Math.floor(w / 2), 0], [0, Math.floor(h / 2)], [w - 1, Math.floor(h / 2)]
  ];
  var rSum = 0, gSum = 0, bSum = 0;
  pts.forEach(function(p) {
    var idx = (p[1] * w + p[0]) * 4;
    rSum += data[idx];
    gSum += data[idx + 1];
    bSum += data[idx + 2];
  });
  var bgR = rSum / pts.length;
  var bgG = gSum / pts.length;
  var bgB = bSum / pts.length;

  var thresh = 35;
  var feather = 20;

  for (var i = 0; i < data.length; i += 4) {
    var r = data[i], g = data[i + 1], b = data[i + 2];
    var diff = Math.sqrt(Math.pow(r - bgR, 2) + Math.pow(g - bgG, 2) + Math.pow(b - bgB, 2));
    if (diff < thresh) {
      data[i + 3] = 0;
    } else if (diff < thresh + feather) {
      var alpha = (diff - thresh) / feather;
      data[i + 3] = Math.round(alpha * data[i + 3]);
    }
  }

  ctx.putImageData(imgData, 0, 0);
  return c;
}

/* -------- Get current poster state for rendering -------- */
function getPosterRenderState() {
  return {
    topLine: $('pTop').value,
    mainText: $('pMain').value,
    bottomLine: $('pBottom').value,
    font: $('pFont').value,
    pos: $('pPos').value,
    textColor: $('pTextColor').value,
    bgColor: $('pBgColor').value,
    bgImage: window.POSTER_BG_IMAGE || null,
    isCutout: window.POSTER_BG_IS_CUTOUT || false,
    scale: (window.POSTER_TEXT_SCALE || 100) / 100
  };
}

function getPosterState() {
  return {
    top: $('pTop').value,
    main: $('pMain').value,
    bottom: $('pBottom').value,
    font: $('pFont').value,
    pos: $('pPos').value,
    textColor: $('pTextColor').value,
    bgColor: $('pBgColor').value,
    style: POSTER_STYLE,
    template: ACTIVE_TEMPLATE,
    scale: window.POSTER_TEXT_SCALE
  };
}

/* -------- History Undo / Redo -------- */
var posterUndoSys = makeUndoSystem('posterUndoBtn', 'posterRedoBtn');
var posterHistory = {
  push: function(st) { posterUndoSys.push(st); },
  applyState: function(st) {
    if (!st) return;
    $('pTop').value = st.top || '';
    $('pMain').value = st.main || '';
    $('pBottom').value = st.bottom || '';
    $('pFont').value = st.font || '';
    $('pPos').value = st.pos || '';
    $('pTextColor').value = st.textColor || '#ffffff';
    $('pBgColor').value = st.bgColor || '#111111';
    $('pTextColorLabel').textContent = $('pTextColor').value;
    $('pBgColorLabel').textContent = $('pBgColor').value;
    window.POSTER_TEXT_SCALE = st.scale || 100;
    var lbl = $('pTextScaleLabel'); if (lbl) lbl.textContent = window.POSTER_TEXT_SCALE + '%';
    POSTER_STYLE = st.style || 'editorial';
    ACTIVE_TEMPLATE = st.template || 'editorial_vogue';
    renderPoster();
  }
};
function posterUndo() { posterUndoSys.undo(posterHistory.applyState); }
function posterRedo() { posterUndoSys.redo(posterHistory.applyState); }

/* -------- Main poster render -------- */
var _posterRenderTimer = null;
function posterChanged() {
  clearTimeout(_posterRenderTimer);
  _posterRenderTimer = setTimeout(function() {
    renderPoster();
    posterHistory.push(getPosterState());
    updateBarLabel();
  }, 150);
}

function renderPoster() {
  var style = POSTER_STYLES.find(function(s) { return s.id === POSTER_STYLE; });
  if (!style) style = POSTER_STYLES[0];

  var sizeVal = $('pSize').value.split(',');
  var W = parseInt(sizeVal[0]), H = parseInt(sizeVal[1]);
  var canvas = $('posterBig');
  canvas.width = W;
  canvas.height = H;

  var ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, W, H);

  var rs = getPosterRenderState();

  if (rs.bgImage) {
    if (rs.isCutout) {
      // 1. Draw template background and design aesthetics first
      style.draw(ctx, W, H, rs);

      // 2. Draw transparent subject cutout in center/lower-third with crisp balance
      var img = rs.bgImage;
      var maxSubjectH = H * 0.52;
      var scale = Math.min(maxSubjectH / img.height, (W * 0.82) / img.width);
      var dw = img.width * scale, dh = img.height * scale;
      var dx = (W - dw) / 2;
      var dy = H - dh - (H * 0.08); // anchored lower portion

      ctx.save();
      ctx.shadowColor = 'rgba(0,0,0,0.25)';
      ctx.shadowBlur = Math.round(W * 0.02);
      ctx.shadowOffsetY = Math.round(H * 0.015);
      ctx.drawImage(img, dx, dy, dw, dh);
      ctx.restore();

    } else {
      // Full background photo
      var img = rs.bgImage;
      var scale = Math.max(W / img.width, H / img.height);
      var dw = img.width * scale, dh = img.height * scale;
      var dx = (W - dw) / 2, dy = (H - dh) / 2;
      ctx.drawImage(img, dx, dy, dw, dh);
      ctx.fillStyle = 'rgba(0,0,0,0.45)';
      ctx.fillRect(0, 0, W, H);
      if (rs.textColor === '#111111' || rs.textColor === '#15151e') {
        rs.textColor = '#ffffff';
      }
      style.draw(ctx, W, H, rs);
    }
  } else {
    style.draw(ctx, W, H, rs);
  }

  $('posterDlBtn').disabled = false;
  updateA11y(ctx, W, H);
}

/* -------- Download Poster -------- */
function downloadPoster() {
  var canvas = $('posterBig');
  var fmt = $('pFmt').value || 'png';
  var mime = fmt === 'jpg' ? 'image/jpeg' : fmt === 'svg' ? 'image/svg+xml' : 'image/png';
  var ext = fmt === 'jpg' ? 'jpg' : fmt === 'svg' ? 'svg' : 'png';

  if (fmt === 'svg') {
    var W = canvas.width, H = canvas.height;
    var svgStr = '<svg xmlns="http://www.w3.org/2000/svg" width="' + W + '" height="' + H + '">' +
      '<foreignObject width="100%" height="100%">' +
      '<img xmlns="http://www.w3.org/1999/xhtml" src="' + canvas.toDataURL('image/png') + '" width="' + W + '" height="' + H + '"/>' +
      '</foreignObject></svg>';
    var blob = new Blob([svgStr], { type: 'image/svg+xml' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'poster.' + ext;
    a.click();
    showToast('Downloaded SVG poster');
  } else {
    var dataUrl = canvas.toDataURL(mime, 0.95);
    var a = document.createElement('a');
    a.href = dataUrl;
    a.download = 'poster.' + ext;
    a.click();
    showToast('Downloaded ' + ext.toUpperCase() + ' poster');
  }
}

/* -------- A11y contrast note -------- */
function updateA11y(ctx, W, H) {
  var el = $('posterA11y');
  try {
    var d = ctx.getImageData(W / 2 - 20, H / 2 - 20, 40, 40).data;
    var r = 0, g = 0, b = 0, n = 0;
    for (var i = 0; i < d.length; i += 4) { r += d[i]; g += d[i+1]; b += d[i+2]; n++; }
    r /= n; g /= n; b /= n;
    var lum = function(c) { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
    var L = 0.2126 * lum(r) + 0.7152 * lum(g) + 0.0722 * lum(b);
    var tc = $('pTextColor').value || '#ffffff';
    var tr = parseInt(tc.slice(1,3), 16), tg = parseInt(tc.slice(3,5), 16), tb = parseInt(tc.slice(5,7), 16);
    var TL = 0.2126 * lum(tr) + 0.7152 * lum(tg) + 0.0722 * lum(tb);
    var ratio = (Math.max(L, TL) + 0.05) / (Math.min(L, TL) + 0.05);
    var level = ratio >= 7 ? 'AAA ✓' : ratio >= 4.5 ? 'AA ✓' : ratio >= 3 ? 'AA Large ✓' : '✕ Low';
    el.innerHTML = 'Contrast ratio: <b>' + ratio.toFixed(1) + ':1</b> — WCAG ' + level;
  } catch(e) {
    el.innerHTML = '';
  }
}

/* -------- Init -------- */
document.fonts.ready.then(function() {
  if (!$('pMain').value) {
    var initTpl = POSTER_TEMPLATES[0];
    $('pTop').value = initTpl.topLine;
    $('pMain').value = initTpl.mainText;
    $('pBottom').value = initTpl.bottomLine;
    $('pFont').value = initTpl.font;
    $('pTextColor').value = initTpl.textColor;
    $('pBgColor').value = initTpl.bgColor;
    $('pTextColorLabel').textContent = initTpl.textColor;
    $('pBgColorLabel').textContent = initTpl.bgColor;
  }
  buildTemplateGrid();
  buildPaletteSwatches();
  renderPoster();
  posterHistory.push(getPosterState());
});
