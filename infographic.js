/* =============================================
   infographic.js — Comparison & Infographic Maker
   Before/After, Do's & Don'ts, Stat Callouts, 3 Pillars
   ============================================= */
'use strict';

var INFOGRAPHIC_STATE = {
  template: 'before_after', // 'before_after', 'dos_donts', 'old_new', 'stat_metric', 'three_pillars'
  theme: 'dark_contrast',   // 'dark_contrast', 'clean_light', 'emerald_ruby', 'creator_violet', 'cyber_slate'
  ratio: '4x5',             // '4x5' (1080x1350), '1x1' (1080x1080), '16x9' (1200x675)
  category: 'DEVELOPER PLAYBOOK',
  title: 'Junior vs Senior Engineering',
  subtitle: 'The key shift from writing code to architecting systems',
  author: '@alexcreates',

  // Comparison items
  leftHeader: 'Junior Approach',
  leftText: 'Writing code without tests\nDeploying directly to production\nIgnoring edge cases\nDebugging with console.log',

  rightHeader: 'Senior Approach',
  rightText: 'Test-driven architecture\nAutomated CI/CD pipelines\nDesigning for failure recovery\nObservability & structured logs',

  // Stat items
  statNumber: '+340%',
  statLabel: 'Developer Velocity Growth',
  statBulletsText: 'Automating boilerplate with AI\nEliminating manual regressions\nInstant live prototype iteration',

  // 3-Pillar items
  p1Title: 'System Design',
  p1Desc: 'Design clean APIs and decoupled micro-services before coding.',
  p2Title: 'AI Pair Programming',
  p2Desc: 'Automate 80% of routine tests, schemas, and CRUD logic.',
  p3Title: 'User Experience',
  p3Desc: 'Ship polished, high-performance web applications that delight.',

  primaryColor: '#7C6EFA',
  fontFamily: 'Inter Tight'
};

/* Pre-made Infographic Examples */
var INFOGRAPHIC_EXAMPLES = [
  {
    name: 'Junior vs Senior',
    template: 'before_after',
    category: 'SOFTWARE ARCHITECTURE',
    title: 'Junior vs Senior Developer',
    subtitle: 'The fundamental shift from coding to engineering',
    leftHeader: 'Junior Mindset',
    leftText: 'Writes code immediately\nSolves only the immediate bug\nIgnores unit tests\nHardcodes configurations',
    rightHeader: 'Senior Mindset',
    rightText: 'Designs data flow first\nFixes underlying root cause\nComprehensive test suite\nClean environment variables'
  },
  {
    name: 'Do\'s & Don\'ts',
    template: 'dos_donts',
    category: 'CREATOR GROWTH',
    title: 'LinkedIn Posting Rules',
    subtitle: 'How to build high-reach authority in 2026',
    leftHeader: 'Don\'ts',
    leftText: 'Post generic inspirational quotes\nDrop external links in main copy\nPost walls of unbroken text\nIgnore comments in first hour',
    rightHeader: 'Do\'s',
    rightText: 'Share actionable frameworks\nPut resources in comments or profile\nUse short punchy line breaks\nEngage genuinely in replies'
  },
  {
    name: '340% Metric Growth',
    template: 'stat_metric',
    category: 'CASE STUDY',
    title: 'AI Dev Workflow Impact',
    subtitle: 'Measured results across 100+ engineering teams',
    statNumber: '+340%',
    statLabel: 'Sprint Velocity Increase',
    statBulletsText: '85% faster initial prototyping\n90% automated unit test coverage\nZero downtime continuous delivery'
  },
  {
    name: '3-Pillar Framework',
    template: 'three_pillars',
    category: 'STRATEGY',
    title: 'The Modern Creator Stack',
    subtitle: '3 pillars to scale your personal brand',
    p1Title: 'High-Signal Content',
    p1Desc: 'Post actionable carousels, case studies, and proven blueprints.',
    p2Title: 'Visual Consistency',
    p2Desc: 'Use custom brand kits, sleek typography, and crisp layouts.',
    p3Title: 'Community Flywheel',
    p3Desc: 'Turn engaged readers into loyal subscribers and customers.'
  }
];

/* Initialize Infographic Studio */
function initInfographics() {
  buildInfographicExampleChips();
  syncInfographicFormUI();
  renderInfographic();
}

/* Build example buttons */
function buildInfographicExampleChips() {
  var container = $('infoExamplesRow');
  if (!container) return;
  container.innerHTML = '';
  INFOGRAPHIC_EXAMPLES.forEach(function(ex) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn btn-ghost btn-sm';
    btn.style.fontSize = '12px';
    btn.textContent = '💡 ' + ex.name;
    btn.onclick = function() { loadInfographicExample(ex); };
    container.appendChild(btn);
  });
}

function loadInfographicExample(ex) {
  Object.assign(INFOGRAPHIC_STATE, ex);
  syncInfographicFormUI();
  renderInfographic();
  showToast('Loaded: ' + ex.name);
}

/* Template Switcher */
function setInfographicTemplate(tpl) {
  INFOGRAPHIC_STATE.template = tpl;
  document.querySelectorAll('.info-tpl-btn').forEach(function(b) {
    b.classList.toggle('active', b.getAttribute('data-tpl') === tpl);
  });
  toggleInfographicFieldsByTemplate(tpl);
  renderInfographic();
}

/* Theme Switcher */
function setInfographicTheme(theme) {
  INFOGRAPHIC_STATE.theme = theme;
  document.querySelectorAll('.info-theme-btn').forEach(function(b) {
    b.classList.toggle('active', b.getAttribute('data-theme') === theme);
  });
  renderInfographic();
}

/* Aspect Ratio Switcher */
function setInfographicRatio(ratio) {
  INFOGRAPHIC_STATE.ratio = ratio;
  document.querySelectorAll('.info-ratio-btn').forEach(function(b) {
    b.classList.toggle('active', b.getAttribute('data-ratio') === ratio);
  });
  renderInfographic();
}

/* Toggle Form Fields based on Template */
function toggleInfographicFieldsByTemplate(tpl) {
  var compFields = $('infoComparisonFields');
  var statFields = $('infoStatFields');
  var pillarFields = $('infoPillarFields');

  if (compFields) compFields.classList.toggle('hidden', tpl === 'stat_metric' || tpl === 'three_pillars');
  if (statFields) statFields.classList.toggle('hidden', tpl !== 'stat_metric');
  if (pillarFields) pillarFields.classList.toggle('hidden', tpl !== 'three_pillars');

  // Adjust header labels for Do's & Don'ts vs Before/After
  if (tpl === 'dos_donts') {
    if ($('infoLeftHeader') && INFOGRAPHIC_STATE.leftHeader === 'Junior Approach') $('infoLeftHeader').value = 'Don\'ts';
    if ($('infoRightHeader') && INFOGRAPHIC_STATE.rightHeader === 'Senior Approach') $('infoRightHeader').value = 'Do\'s';
  }
}

/* Sync Form UI values with State */
function syncInfographicFormUI() {
  if ($('infoCategory')) $('infoCategory').value = INFOGRAPHIC_STATE.category;
  if ($('infoTitle')) $('infoTitle').value = INFOGRAPHIC_STATE.title;
  if ($('infoSubtitle')) $('infoSubtitle').value = INFOGRAPHIC_STATE.subtitle;
  if ($('infoAuthor')) $('infoAuthor').value = INFOGRAPHIC_STATE.author;

  if ($('infoLeftHeader')) $('infoLeftHeader').value = INFOGRAPHIC_STATE.leftHeader;
  if ($('infoLeftText')) $('infoLeftText').value = INFOGRAPHIC_STATE.leftText;
  if ($('infoRightHeader')) $('infoRightHeader').value = INFOGRAPHIC_STATE.rightHeader;
  if ($('infoRightText')) $('infoRightText').value = INFOGRAPHIC_STATE.rightText;

  if ($('infoStatNumber')) $('infoStatNumber').value = INFOGRAPHIC_STATE.statNumber;
  if ($('infoStatLabel')) $('infoStatLabel').value = INFOGRAPHIC_STATE.statLabel;
  if ($('infoStatBullets')) $('infoStatBullets').value = INFOGRAPHIC_STATE.statBulletsText;

  if ($('infoP1Title')) $('infoP1Title').value = INFOGRAPHIC_STATE.p1Title;
  if ($('infoP1Desc')) $('infoP1Desc').value = INFOGRAPHIC_STATE.p1Desc;
  if ($('infoP2Title')) $('infoP2Title').value = INFOGRAPHIC_STATE.p2Title;
  if ($('infoP2Desc')) $('infoP2Desc').value = INFOGRAPHIC_STATE.p2Desc;
  if ($('infoP3Title')) $('infoP3Title').value = INFOGRAPHIC_STATE.p3Title;
  if ($('infoP3Desc')) $('infoP3Desc').value = INFOGRAPHIC_STATE.p3Desc;

  toggleInfographicFieldsByTemplate(INFOGRAPHIC_STATE.template);
}

/* On Field Changed */
function onInfographicChanged() {
  if ($('infoCategory')) INFOGRAPHIC_STATE.category = $('infoCategory').value;
  if ($('infoTitle')) INFOGRAPHIC_STATE.title = $('infoTitle').value;
  if ($('infoSubtitle')) INFOGRAPHIC_STATE.subtitle = $('infoSubtitle').value;
  if ($('infoAuthor')) INFOGRAPHIC_STATE.author = $('infoAuthor').value;

  if ($('infoLeftHeader')) INFOGRAPHIC_STATE.leftHeader = $('infoLeftHeader').value;
  if ($('infoLeftText')) INFOGRAPHIC_STATE.leftText = $('infoLeftText').value;
  if ($('infoRightHeader')) INFOGRAPHIC_STATE.rightHeader = $('infoRightHeader').value;
  if ($('infoRightText')) INFOGRAPHIC_STATE.rightText = $('infoRightText').value;

  if ($('infoStatNumber')) INFOGRAPHIC_STATE.statNumber = $('infoStatNumber').value;
  if ($('infoStatLabel')) INFOGRAPHIC_STATE.statLabel = $('infoStatLabel').value;
  if ($('infoStatBullets')) INFOGRAPHIC_STATE.statBulletsText = $('infoStatBullets').value;

  if ($('infoP1Title')) INFOGRAPHIC_STATE.p1Title = $('infoP1Title').value;
  if ($('infoP1Desc')) INFOGRAPHIC_STATE.p1Desc = $('infoP1Desc').value;
  if ($('infoP2Title')) INFOGRAPHIC_STATE.p2Title = $('infoP2Title').value;
  if ($('infoP2Desc')) INFOGRAPHIC_STATE.p2Desc = $('infoP2Desc').value;
  if ($('infoP3Title')) INFOGRAPHIC_STATE.p3Title = $('infoP3Title').value;
  if ($('infoP3Desc')) INFOGRAPHIC_STATE.p3Desc = $('infoP3Desc').value;

  renderInfographic();
}

/* =============================================
   Infographic Canvas Rendering Engine
   ============================================= */
function renderInfographic() {
  var canvas = $('infographicCanvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');

  // Dimensions
  var W = 1080;
  var H = 1350; // 4:5 default
  if (INFOGRAPHIC_STATE.ratio === '1x1') {
    H = 1080;
  } else if (INFOGRAPHIC_STATE.ratio === '16x9') {
    W = 1200;
    H = 675;
  }

  canvas.width = W;
  canvas.height = H;

  // Theme Colors
  var theme = getInfographicThemeColors(INFOGRAPHIC_STATE.theme);

  // 1. Background
  drawInfographicBackground(ctx, W, H, theme);

  // 2. Header (Category pill, Main Title, Subtitle)
  var contentTop = drawInfographicHeader(ctx, W, H, theme);

  // 3. Template-specific body
  var tpl = INFOGRAPHIC_STATE.template;
  if (tpl === 'before_after' || tpl === 'dos_donts' || tpl === 'old_new') {
    drawComparisonLayout(ctx, W, H, contentTop, theme);
  } else if (tpl === 'stat_metric') {
    drawStatMetricLayout(ctx, W, H, contentTop, theme);
  } else if (tpl === 'three_pillars') {
    drawThreePillarsLayout(ctx, W, H, contentTop, theme);
  }

  // 4. Footer (Author / Handle & Watermark branding)
  drawInfographicFooter(ctx, W, H, theme);

  // Enable download buttons
  if ($('infoDownloadBtn')) $('infoDownloadBtn').disabled = false;
  if ($('infoCarouselBtn')) $('infoCarouselBtn').disabled = false;
}

/* Theme Palette Definitions */
function getInfographicThemeColors(themeName) {
  if (themeName === 'clean_light') {
    return {
      bg: '#F8F9FC',
      bgCard: '#FFFFFF',
      bgCardLeft: '#FFF1F2',
      bgCardRight: '#F0FDF4',
      text: '#0F172A',
      textMut: '#64748B',
      accent: '#4F46E5',
      leftColor: '#E11D48',
      rightColor: '#16A34A',
      border: '#E2E8F0'
    };
  } else if (themeName === 'emerald_ruby') {
    return {
      bg: '#090D16',
      bgCard: '#111827',
      bgCardLeft: 'rgba(244, 63, 94, 0.08)',
      bgCardRight: 'rgba(16, 185, 129, 0.08)',
      text: '#F8FAFC',
      textMut: '#94A3B8',
      accent: '#38BDF8',
      leftColor: '#FB7185',
      rightColor: '#34D399',
      border: '#1E293B'
    };
  } else if (themeName === 'creator_violet') {
    return {
      bg: '#0F0E17',
      bgCard: '#1A1829',
      bgCardLeft: 'rgba(239, 68, 68, 0.1)',
      bgCardRight: 'rgba(168, 85, 247, 0.12)',
      text: '#FFFFFE',
      textMut: '#A7A9BE',
      accent: '#7C6EFA',
      leftColor: '#F87171',
      rightColor: '#C084FC',
      border: '#2E2B44'
    };
  } else if (themeName === 'cyber_slate') {
    return {
      bg: '#0B0F19',
      bgCard: '#131C2E',
      bgCardLeft: 'rgba(234, 179, 8, 0.08)',
      bgCardRight: 'rgba(6, 182, 212, 0.1)',
      text: '#F1F5F9',
      textMut: '#64748B',
      accent: '#06B6D4',
      leftColor: '#FBBF24',
      rightColor: '#22D3EE',
      border: '#1E293B'
    };
  }
  // Default dark_contrast
  return {
    bg: '#0D0D11',
    bgCard: '#17171E',
    bgCardLeft: 'rgba(239, 68, 68, 0.09)',
    bgCardRight: 'rgba(34, 197, 94, 0.09)',
    text: '#F3F4F6',
    textMut: '#9CA3AF',
    accent: '#7C6EFA',
    leftColor: '#EF4444',
    rightColor: '#22C55E',
    border: '#272732'
  };
}

/* 1. Background */
function drawInfographicBackground(ctx, W, H, theme) {
  ctx.fillStyle = theme.bg;
  ctx.fillRect(0, 0, W, H);

  // Soft subtle ambient glow top-right
  var glow = ctx.createRadialGradient(W * 0.85, H * 0.15, 20, W * 0.85, H * 0.15, W * 0.6);
  glow.addColorStop(0, hexToRgba(theme.accent, 0.15));
  glow.addColorStop(1, hexToRgba(theme.accent, 0));
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);
}

/* 2. Header */
function drawInfographicHeader(ctx, W, H, theme) {
  var padX = W * 0.07;
  var currY = H * 0.06;

  // Category Pill Badge
  if (INFOGRAPHIC_STATE.category) {
    ctx.save();
    var catText = INFOGRAPHIC_STATE.category.toUpperCase();
    ctx.font = 'bold ' + Math.round(W * 0.019) + 'px "Inter Tight", sans-serif';
    var textW = ctx.measureText(catText).width;
    var pillW = textW + 28;
    var pillH = Math.round(W * 0.038);

    ctx.fillStyle = hexToRgba(theme.accent, 0.18);
    roundRect(ctx, padX, currY, pillW, pillH, pillH / 2);
    ctx.fill();

    ctx.strokeStyle = hexToRgba(theme.accent, 0.45);
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = theme.accent;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(catText, padX + (pillW / 2), currY + (pillH / 2));
    ctx.restore();

    currY += pillH + 16;
  }

  // Main Title
  ctx.save();
  ctx.fillStyle = theme.text;
  ctx.font = 'bold ' + Math.round(W * 0.048) + 'px "Bricolage Grotesque", "Inter Tight", sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';

  var titleLines = wrapCanvasText(ctx, INFOGRAPHIC_STATE.title || 'Infographic Title', W - (padX * 2));
  titleLines.forEach(function(line) {
    ctx.fillText(line, padX, currY);
    currY += Math.round(W * 0.058);
  });

  // Subtitle
  if (INFOGRAPHIC_STATE.subtitle) {
    currY += 4;
    ctx.fillStyle = theme.textMut;
    ctx.font = '400 ' + Math.round(W * 0.025) + 'px "Inter Tight", sans-serif';
    var subLines = wrapCanvasText(ctx, INFOGRAPHIC_STATE.subtitle, W - (padX * 2));
    subLines.forEach(function(sline) {
      ctx.fillText(sline, padX, currY);
      currY += Math.round(W * 0.034);
    });
  }
  ctx.restore();

  return currY + 24; // returns bottom Y of header
}

/* 3A. Comparison Layout (Side by Side or Stacked) */
function drawComparisonLayout(ctx, W, H, topY, theme) {
  var padX = W * 0.06;
  var bottomPad = H * 0.09;
  var availH = H - topY - bottomPad;
  var colW = (W - (padX * 2) - 20) / 2;

  var leftItems = (INFOGRAPHIC_STATE.leftText || '').split('\n').filter(Boolean);
  var rightItems = (INFOGRAPHIC_STATE.rightText || '').split('\n').filter(Boolean);

  // Left Column (Before / Don'ts)
  drawComparisonCard(ctx, padX, topY, colW, availH, {
    header: INFOGRAPHIC_STATE.leftHeader || 'Before',
    items: leftItems,
    icon: '✕',
    badgeColor: theme.leftColor,
    bg: theme.bgCardLeft,
    border: hexToRgba(theme.leftColor, 0.35),
    textColor: theme.text,
    mutColor: theme.textMut,
    W: W
  });

  // Right Column (After / Do's)
  drawComparisonCard(ctx, padX + colW + 20, topY, colW, availH, {
    header: INFOGRAPHIC_STATE.rightHeader || 'After',
    items: rightItems,
    icon: '✓',
    badgeColor: theme.rightColor,
    bg: theme.bgCardRight,
    border: hexToRgba(theme.rightColor, 0.35),
    textColor: theme.text,
    mutColor: theme.textMut,
    W: W
  });
}

function drawComparisonCard(ctx, x, y, w, h, opts) {
  ctx.save();

  // Background Card
  ctx.fillStyle = opts.bg;
  roundRect(ctx, x, y, w, h, 18);
  ctx.fill();

  ctx.strokeStyle = opts.border;
  ctx.lineWidth = 2;
  ctx.stroke();

  // Header Pill inside card
  var headY = y + 20;
  ctx.fillStyle = opts.badgeColor;
  roundRect(ctx, x + 20, headY, w - 40, 48, 12);
  ctx.fill();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold ' + Math.round(opts.W * 0.024) + 'px "Inter Tight", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(opts.icon + '  ' + opts.header, x + (w / 2), headY + 24);

  // Bullet Items
  var itemY = headY + 70;
  var itemGap = Math.min(65, (h - 110) / (opts.items.length || 1));

  opts.items.forEach(function(item) {
    // Bullet Dot / Icon
    ctx.fillStyle = opts.badgeColor;
    ctx.beginPath();
    ctx.arc(x + 32, itemY + 10, 6, 0, Math.PI * 2);
    ctx.fill();

    // Text
    ctx.fillStyle = opts.textColor;
    ctx.font = '500 ' + Math.round(opts.W * 0.022) + 'px "Inter Tight", sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';

    var lines = wrapCanvasText(ctx, item, w - 68);
    lines.forEach(function(l, li) {
      ctx.fillText(l, x + 48, itemY + (li * 24));
    });

    itemY += Math.max(itemGap, lines.length * 26 + 18);
  });

  ctx.restore();
}

/* 3B. Big Stat / Growth Metric Layout */
function drawStatMetricLayout(ctx, W, H, topY, theme) {
  var padX = W * 0.07;
  var bottomPad = H * 0.09;
  var availH = H - topY - bottomPad;
  var cardW = W - (padX * 2);

  ctx.save();
  // Center Card
  ctx.fillStyle = theme.bgCard;
  roundRect(ctx, padX, topY, cardW, availH, 24);
  ctx.fill();

  ctx.strokeStyle = theme.border;
  ctx.lineWidth = 2;
  ctx.stroke();

  // Big Stat Number
  var cy = topY + (availH * 0.22);
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  var statGrad = ctx.createLinearGradient(padX, cy, padX + cardW, cy);
  statGrad.addColorStop(0, theme.accent);
  statGrad.addColorStop(1, '#38BDF8');

  ctx.fillStyle = statGrad;
  ctx.font = 'bold ' + Math.round(W * 0.13) + 'px "Bricolage Grotesque", sans-serif';
  ctx.fillText(INFOGRAPHIC_STATE.statNumber || '+340%', W / 2, cy);

  // Stat Label
  cy += Math.round(W * 0.08);
  ctx.fillStyle = theme.text;
  ctx.font = '600 ' + Math.round(W * 0.032) + 'px "Inter Tight", sans-serif';
  ctx.fillText(INFOGRAPHIC_STATE.statLabel || 'Growth Metric', W / 2, cy);

  // Horizontal separator
  cy += 35;
  ctx.strokeStyle = theme.border;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(padX + 40, cy);
  ctx.lineTo(padX + cardW - 40, cy);
  ctx.stroke();

  // Bullet items
  cy += 35;
  var bullets = (INFOGRAPHIC_STATE.statBulletsText || '').split('\n').filter(Boolean);
  ctx.textAlign = 'left';

  bullets.forEach(function(b) {
    // Check icon
    ctx.fillStyle = theme.accent;
    ctx.font = 'bold ' + Math.round(W * 0.026) + 'px "Inter Tight", sans-serif';
    ctx.fillText('✦', padX + 50, cy);

    ctx.fillStyle = theme.text;
    ctx.font = '500 ' + Math.round(W * 0.024) + 'px "Inter Tight", sans-serif';
    ctx.fillText(b, padX + 85, cy);

    cy += 48;
  });

  ctx.restore();
}

/* 3C. 3-Pillars Framework Layout */
function drawThreePillarsLayout(ctx, W, H, topY, theme) {
  var padX = W * 0.06;
  var bottomPad = H * 0.09;
  var availH = H - topY - bottomPad;
  var cardW = W - (padX * 2);
  var pillarH = (availH - 30) / 3;

  var pillars = [
    { num: '01', title: INFOGRAPHIC_STATE.p1Title, desc: INFOGRAPHIC_STATE.p1Desc },
    { num: '02', title: INFOGRAPHIC_STATE.p2Title, desc: INFOGRAPHIC_STATE.p2Desc },
    { num: '03', title: INFOGRAPHIC_STATE.p3Title, desc: INFOGRAPHIC_STATE.p3Desc }
  ];

  pillars.forEach(function(p, idx) {
    var py = topY + (idx * (pillarH + 15));
    drawSinglePillarCard(ctx, padX, py, cardW, pillarH, p, theme, W);
  });
}

function drawSinglePillarCard(ctx, x, y, w, h, p, theme, W) {
  ctx.save();
  ctx.fillStyle = theme.bgCard;
  roundRect(ctx, x, y, w, h, 18);
  ctx.fill();

  ctx.strokeStyle = theme.border;
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Number Badge Circle
  var numX = x + 40;
  var numY = y + (h / 2);
  ctx.fillStyle = hexToRgba(theme.accent, 0.18);
  ctx.beginPath();
  ctx.arc(numX, numY, 26, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = theme.accent;
  ctx.font = 'bold ' + Math.round(W * 0.024) + 'px "Bricolage Grotesque", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(p.num, numX, numY);

  // Title & Desc
  var textX = x + 85;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';

  ctx.fillStyle = theme.text;
  ctx.font = 'bold ' + Math.round(W * 0.026) + 'px "Inter Tight", sans-serif';
  ctx.fillText(p.title || 'Pillar Title', textX, y + 20);

  ctx.fillStyle = theme.textMut;
  ctx.font = '400 ' + Math.round(W * 0.020) + 'px "Inter Tight", sans-serif';
  var descLines = wrapCanvasText(ctx, p.desc || 'Pillar description', w - 105);
  descLines.forEach(function(dline, di) {
    ctx.fillText(dline, textX, y + 54 + (di * 22));
  });

  ctx.restore();
}

/* 4. Footer */
function drawInfographicFooter(ctx, W, H, theme) {
  var padX = W * 0.07;
  var fy = H - (H * 0.045);

  ctx.save();
  ctx.fillStyle = theme.textMut;
  ctx.font = '500 ' + Math.round(W * 0.019) + 'px "Inter Tight", sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText('✦ ' + (INFOGRAPHIC_STATE.author || '@creatorkit'), padX, fy);

  ctx.textAlign = 'right';
  ctx.fillText('creatorkit.studio', W - padX, fy);
  ctx.restore();
}

/* =============================================
   Studio Integration & Export Actions
   ============================================= */

/* 1. Send / Append Infographic as Slide to Carousel */
function sendInfographicToCarousel() {
  var tpl = INFOGRAPHIC_STATE.template;
  var slideText = '';

  if (tpl === 'before_after' || tpl === 'dos_donts' || tpl === 'old_new') {
    var lefts = (INFOGRAPHIC_STATE.leftText || '').split('\n').filter(Boolean).map(function(s) { return '✕ ' + s; }).join('\n');
    var rights = (INFOGRAPHIC_STATE.rightText || '').split('\n').filter(Boolean).map(function(s) { return '✓ ' + s; }).join('\n');

    slideText = (INFOGRAPHIC_STATE.title || 'Comparison') + '\n' +
      (INFOGRAPHIC_STATE.subtitle || '') + '\n\n' +
      '---\n\n' +
      (INFOGRAPHIC_STATE.leftHeader || 'Before') + ' vs ' + (INFOGRAPHIC_STATE.rightHeader || 'After') + '\n\n' +
      lefts + '\n\n' +
      rights;
  } else if (tpl === 'stat_metric') {
    slideText = (INFOGRAPHIC_STATE.title || 'Growth Case Study') + '\n\n' +
      (INFOGRAPHIC_STATE.statNumber || '+340%') + ' ' + (INFOGRAPHIC_STATE.statLabel || '') + '\n\n' +
      (INFOGRAPHIC_STATE.statBulletsText || '');
  } else {
    slideText = (INFOGRAPHIC_STATE.title || 'Framework') + '\n\n' +
      '1. ' + (INFOGRAPHIC_STATE.p1Title || '') + ': ' + (INFOGRAPHIC_STATE.p1Desc || '') + '\n' +
      '2. ' + (INFOGRAPHIC_STATE.p2Title || '') + ': ' + (INFOGRAPHIC_STATE.p2Desc || '') + '\n' +
      '3. ' + (INFOGRAPHIC_STATE.p3Title || '') + ': ' + (INFOGRAPHIC_STATE.p3Desc || '');
  }

  // Inject into Carousel Copy textarea
  if ($('cCopy')) {
    var existing = ($('cCopy').value || '').trim();
    $('cCopy').value = existing ? existing + '\n\n---\n\n' + slideText : slideText;
  }

  // Switch to Carousel mode
  if (typeof switchMode === 'function') switchMode('carousel');
  if (typeof carouselChanged === 'function') carouselChanged();
  showToast('✓ Infographic inserted into Carousel slide deck!');
}

/* 2. Download Infographic Graphic */
function downloadInfographic() {
  var canvas = $('infographicCanvas');
  if (!canvas) return;

  var fmt = ($('infoFmt') ? $('infoFmt').value : 'png') || 'png';
  var mimeType = fmt === 'jpg' || fmt === 'jpeg' ? 'image/jpeg' : 'image/png';
  var filename = 'infographic-' + Date.now() + '.' + (fmt === 'jpg' ? 'jpg' : 'png');

  var link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL(mimeType, 0.95);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showToast('✓ Infographic downloaded in HD!');
}

/* Helper: Canvas Rounded Rectangle */
function roundRect(ctx, x, y, width, height, radius) {
  if (typeof radius === 'undefined') radius = 8;
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

/* Helper: Wrap canvas text */
function wrapCanvasText(ctx, text, maxWidth) {
  var words = (text || '').split(' ');
  var lines = [];
  var currentLine = words[0] || '';

  for (var i = 1; i < words.length; i++) {
    var word = words[i];
    var width = ctx.measureText(currentLine + ' ' + word).width;
    if (width < maxWidth) {
      currentLine += ' ' + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}

/* Helper: Hex to RGBA */
function hexToRgba(hex, alpha) {
  hex = (hex || '#000000').replace('#', '');
  if (hex.length === 3) hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  var r = parseInt(hex.substring(0, 2), 16) || 0;
  var g = parseInt(hex.substring(2, 4), 16) || 0;
  var b = parseInt(hex.substring(4, 6), 16) || 0;
  return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
}
