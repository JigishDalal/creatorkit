/* =============================================
   appstore.js — Professional App Store & Google Play Store
   Screenshot & Poster Generator Module
   ============================================= */
'use strict';

/* -------- Official Store Presets & Dimensions -------- */
var STORE_PRESETS = {
  'ios_6_7': {
    name: 'iOS iPhone 6.7" / 6.9" (15/16 Pro Max)',
    W: 1290,
    H: 2796,
    platform: 'ios',
    defaultFrame: 'iphone'
  },
  'ios_6_5': {
    name: 'iOS iPhone 6.5" (11 Pro Max / XS Max)',
    W: 1242,
    H: 2688,
    platform: 'ios',
    defaultFrame: 'iphone'
  },
  'ios_5_5': {
    name: 'iOS iPhone 5.5" (8 Plus / Classic)',
    W: 1242,
    H: 2208,
    platform: 'ios',
    defaultFrame: 'iphone'
  },
  'ios_ipad': {
    name: 'iOS iPad Pro 12.9" / 13"',
    W: 2048,
    H: 2732,
    platform: 'ios',
    defaultFrame: 'ipad'
  },
  'android_phone': {
    name: 'Google Play Phone (1080 × 2400)',
    W: 1080,
    H: 2400,
    platform: 'android',
    defaultFrame: 'android'
  },
  'android_16_9': {
    name: 'Google Play Phone (1080 × 1920)',
    W: 1080,
    H: 1920,
    platform: 'android',
    defaultFrame: 'android'
  },
  'android_tablet': {
    name: 'Google Play 10" Tablet (1600 × 2560)',
    W: 1600,
    H: 2560,
    platform: 'android',
    defaultFrame: 'tablet'
  },
  'play_feature': {
    name: 'Google Play Feature Graphic (1024 × 500)',
    W: 1024,
    H: 500,
    platform: 'android',
    defaultFrame: 'none'
  }
};

/* -------- Professional Canva-Style Store Themes -------- */
var STORE_THEMES = [
  {
    id: 'whatsapp_green',
    name: 'WhatsApp Emerald',
    bgType: 'solid',
    bgColor: '#00A884',
    textColor: '#FFFFFF',
    subColor: 'rgba(255,255,255,0.88)',
    accent: '#25D366',
    badgeBg: 'rgba(0,0,0,0.2)',
    badgeBorder: 'rgba(255,255,255,0.3)'
  },
  {
    id: 'chatgpt_aura',
    name: 'ChatGPT Aura Mesh',
    bgType: 'aura',
    bgColor: '#FAF5FF',
    auraColor1: '#FCE7F3', // soft rose pink
    auraColor2: '#E0E7FF', // soft indigo
    auraColor3: '#F5F3FF', // soft violet
    textColor: '#0F172A',
    subColor: '#475569',
    accent: '#6366F1',
    badgeBg: 'rgba(99,102,241,0.08)',
    badgeBorder: 'rgba(99,102,241,0.25)'
  },
  {
    id: 'dark_grid',
    name: 'Cyber Gaming Grid',
    bgType: 'grid',
    bgColor: '#08080C',
    gridColor: 'rgba(239, 68, 68, 0.15)',
    textColor: '#FFFFFF',
    subColor: '#94A3B8',
    accent: '#EF4444',
    badgeBg: 'rgba(239,68,68,0.15)',
    badgeBorder: '#EF4444'
  },
  {
    id: 'imposter_red',
    name: 'Imposter Impact',
    bgType: 'imposter_grid',
    bgColor: '#B91C1C',
    gridColor: 'rgba(0, 0, 0, 0.22)',
    textColor: '#FFFFFF',
    subColor: '#FEE2E2',
    accent: '#FEF08A',
    badgeBg: 'rgba(0,0,0,0.3)',
    badgeBorder: '#FFFFFF'
  },
  {
    id: 'creator_violet',
    name: 'Spotify Sunset',
    bgType: 'gradient',
    bgColor: '#0F0F1A',
    gradStart: '#4C1D95',
    gradMid: '#831843',
    gradEnd: '#0F0F1A',
    textColor: '#FFFFFF',
    subColor: '#FBCFE8',
    accent: '#F43F5E',
    badgeBg: 'rgba(255,255,255,0.12)',
    badgeBorder: 'rgba(255,255,255,0.35)'
  },
  {
    id: 'fintech_dark',
    name: 'FinTech Titanium',
    bgType: 'fintech_radial',
    bgColor: '#090A0F',
    glowColor: 'rgba(59, 130, 246, 0.18)',
    textColor: '#FFFFFF',
    subColor: '#94A3B8',
    accent: '#38BDF8',
    badgeBg: 'rgba(56,189,248,0.12)',
    badgeBorder: '#38BDF8'
  },
  {
    id: 'wellness_peach',
    name: 'Calm Peach Glow',
    bgType: 'gradient',
    bgColor: '#FFFBEB',
    gradStart: '#FFF7ED',
    gradMid: '#FFEDD5',
    gradEnd: '#FED7AA',
    textColor: '#292524',
    subColor: '#57534E',
    accent: '#D97706',
    badgeBg: 'rgba(217,119,6,0.1)',
    badgeBorder: 'rgba(217,119,6,0.3)'
  },
  {
    id: 'minimal_white',
    name: 'YouTube Clean Studio',
    bgType: 'studio_white',
    bgColor: '#FFFFFF',
    textColor: '#09090B',
    subColor: '#52525B',
    accent: '#EF4444',
    badgeBg: 'rgba(0,0,0,0.05)',
    badgeBorder: 'rgba(0,0,0,0.12)'
  }
];

/* -------- 8 Ready-Made 1-Click Professional Templates -------- */
var STORE_TEMPLATES = [
  {
    id: 'tpl_whatsapp',
    name: 'WhatsApp Emerald',
    tag: 'Top Chart',
    themeId: 'whatsapp_green',
    frameStyle: 'iphone',
    layoutPos: 'bottom',
    typeface: "'Inter Tight', sans-serif",
    textScale: 100,
    badge: '✦ #1 MESSAGING APP',
    headline: 'Simple. Reliable. Private.',
    subline: 'Message privately with end-to-end encryption'
  },
  {
    id: 'tpl_chatgpt',
    name: 'ChatGPT Aura',
    tag: 'SaaS AI',
    themeId: 'chatgpt_aura',
    frameStyle: 'iphone',
    layoutPos: 'bottom',
    typeface: "'Inter Tight', sans-serif",
    textScale: 95,
    badge: '✦ POWERED BY AI',
    headline: 'See your ideas come to life',
    subline: 'Generate text, voice chats & creative visuals'
  },
  {
    id: 'tpl_zedge',
    name: 'Zedge Cyber Grid',
    tag: 'Gaming Dark',
    themeId: 'dark_grid',
    frameStyle: 'iphone',
    layoutPos: 'tilted',
    typeface: "'Space Grotesk', sans-serif",
    textScale: 100,
    badge: '★ 4.8 RATED APP',
    headline: 'EXPLORE MILLIONS OF THEMES',
    subline: 'Wallpapers, ringtones & live video lockscreens'
  },
  {
    id: 'tpl_imposter',
    name: 'Imposter Impact',
    tag: 'Punchy Heavy',
    themeId: 'imposter_red',
    frameStyle: 'android',
    layoutPos: 'bottom',
    typeface: "'Archivo Black', sans-serif",
    textScale: 105,
    badge: '🔥 PARTY GAME',
    headline: 'ONE PHONE EVERYONE PLAYS',
    subline: '500+ Word categories & fast ticking timers'
  },
  {
    id: 'tpl_youtube',
    name: 'YouTube Shorts Studio',
    tag: 'Video Creator',
    themeId: 'minimal_white',
    frameStyle: 'iphone',
    layoutPos: 'bottom',
    typeface: "'Bricolage Grotesque', sans-serif",
    textScale: 105,
    badge: '✦ CREATOR SUITE',
    headline: 'Create & Share In Seconds',
    subline: 'Fun videos easily with music, filters & sound'
  },
  {
    id: 'tpl_fintech',
    name: 'FinTech Titanium',
    tag: 'Obsidian Pro',
    themeId: 'fintech_dark',
    frameStyle: 'iphone',
    layoutPos: 'center',
    typeface: "'Space Grotesk', sans-serif",
    textScale: 95,
    badge: '🔒 BANK-GRADE SECURITY',
    headline: 'Invest Smarter with Real-Time Data',
    subline: 'Zero commission trading and global crypto'
  },
  {
    id: 'tpl_wellness',
    name: 'Wellness Calm',
    tag: 'Mindful Serif',
    themeId: 'wellness_peach',
    frameStyle: 'clay',
    layoutPos: 'bottom',
    typeface: "'Playfair Display', serif",
    textScale: 95,
    badge: '🌿 EDITORS CHOICE',
    headline: 'Find Your Daily Peace of Mind',
    subline: 'Guided sleep meditations, breathwork & sounds'
  },
  {
    id: 'tpl_spotify',
    name: 'Spotify Electric',
    tag: 'Sunset Energy',
    themeId: 'creator_violet',
    frameStyle: 'floating',
    layoutPos: 'bottom',
    typeface: "'Inter Tight', sans-serif",
    textScale: 100,
    badge: '🎧 100M+ TRACKS',
    headline: 'Music & Podcasts You Love',
    subline: 'Unlimited offline playback & curated mixes'
  }
];

/* -------- Global App Store State -------- */
var APP_STORE_STATE = {
  preset: 'ios_6_7',
  activeTemplateId: 'tpl_whatsapp',
  themeId: 'whatsapp_green',
  frameStyle: 'iphone',
  layoutPos: 'bottom',
  typeface: "'Inter Tight', sans-serif",
  textScale: 100,
  activeScreenIndex: 0,
  screens: [
    {
      id: 1,
      badge: '✦ #1 MESSAGING APP',
      headline: 'Simple. Reliable. Private.',
      subline: 'Message privately with end-to-end encryption',
      image: null
    },
    {
      id: 2,
      badge: '💬 PRIVATE CALLS',
      headline: 'Make Calls Across The World',
      subline: 'High quality video & voice connections',
      image: null
    },
    {
      id: 3,
      badge: '👥 GROUP CHATS',
      headline: 'Group Chat With Friends & Family',
      subline: 'Stay connected wherever you are',
      image: null
    },
    {
      id: 4,
      badge: '📸 DAILY UPDATES',
      headline: 'Share Daily Moments Through Status',
      subline: 'Disappearing photos, voice notes & videos',
      image: null
    }
  ]
};

/* Demo Mock Screenshot generator */
function createDemoScreenImage(screenIdx, title) {
  var c = document.createElement('canvas');
  c.width = 750;
  c.height = 1624;
  var ctx = c.getContext('2d');

  var grad = ctx.createLinearGradient(0, 0, 0, c.height);
  if (screenIdx === 0) {
    grad.addColorStop(0, '#0F172A');
    grad.addColorStop(1, '#020617');
  } else if (screenIdx === 1) {
    grad.addColorStop(0, '#1E1B4B');
    grad.addColorStop(1, '#0F172A');
  } else if (screenIdx === 2) {
    grad.addColorStop(0, '#111827');
    grad.addColorStop(1, '#030712');
  } else {
    grad.addColorStop(0, '#18181B');
    grad.addColorStop(1, '#09090B');
  }
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, c.width, c.height);

  // App Bar Mock
  ctx.fillStyle = 'rgba(255,255,255,0.08)';
  ctx.fillRect(36, 120, c.width - 72, 76);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 28px sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText(title ? title.split(' ')[0] + ' View' : 'App Preview', 65, 168);

  // Mock UI Cards
  for (var i = 0; i < 4; i++) {
    var cy = 230 + i * 295;
    ctx.fillStyle = 'rgba(255,255,255,0.06)';
    roundRectStore(ctx, 36, cy, c.width - 72, 260, 24);
    ctx.fill();

    // Mock Icon
    var iconGrad = ctx.createLinearGradient(60, cy + 30, 140, cy + 110);
    iconGrad.addColorStop(0, '#7C6EFA');
    iconGrad.addColorStop(1, '#EC4899');
    ctx.fillStyle = iconGrad;
    roundRectStore(ctx, 60, cy + 30, 80, 80, 20);
    ctx.fill();

    // Card Header
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 26px sans-serif';
    ctx.fillText('Interactive Flow ' + (i + 1), 165, cy + 65);

    // Card Subtext
    ctx.fillStyle = '#94A3B8';
    ctx.font = '20px sans-serif';
    ctx.fillText('Seamless native performance & sync', 165, cy + 102);

    // Pill Button Mock
    ctx.fillStyle = 'rgba(255,255,255,0.1)';
    roundRectStore(ctx, 60, cy + 150, c.width - 120, 70, 16);
    ctx.fill();
    ctx.fillStyle = '#E2E8F0';
    ctx.font = 'bold 20px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Explore Details →', c.width / 2, cy + 192);
    ctx.textAlign = 'left';
  }

  var img = new Image();
  img.src = c.toDataURL('image/png');
  return img;
}

function roundRectStore(ctx, x, y, w, h, r) {
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

/* -------- Initialize App Store Generator -------- */
function initAppStore() {
  buildStoreTemplateGallery();
  buildStoreThemePicker();
  buildStoreDeck();
  populateActiveScreenForm();
}

/* Build Ready-Made Template Gallery Grid */
function buildStoreTemplateGallery() {
  var grid = $('asTemplateGrid');
  if (!grid) return;
  grid.innerHTML = '';

  STORE_TEMPLATES.forEach(function(tpl) {
    var thumb = document.createElement('button');
    thumb.type = 'button';
    thumb.className = 'style-thumb';
    thumb.setAttribute('aria-pressed', tpl.id === APP_STORE_STATE.activeTemplateId ? 'true' : 'false');
    thumb.title = tpl.name + ' (' + tpl.tag + ')';

    var canvas = document.createElement('canvas');
    canvas.width = 110;
    canvas.height = 190;
    renderTemplateThumbMini(canvas, tpl);
    thumb.appendChild(canvas);

    var label = document.createElement('span');
    label.className = 'sname';
    label.innerHTML = '<b>' + tpl.name.split(' ')[0] + '</b><br>' + (tpl.tag || '');
    thumb.appendChild(label);

    thumb.onclick = function() {
      applyStoreTemplate(tpl.id);
    };

    grid.appendChild(thumb);
  });
}

/* Mini thumbnail renderer for template gallery */
function renderTemplateThumbMini(canvas, tpl) {
  var ctx = canvas.getContext('2d');
  var W = canvas.width, H = canvas.height;
  var theme = STORE_THEMES.find(function(t) { return t.id === tpl.themeId; }) || STORE_THEMES[0];

  drawStoreBackground(ctx, W, H, theme);

  // Mini headline
  ctx.fillStyle = theme.textColor;
  ctx.font = '800 9px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.fillText(tpl.headline.split(' ')[0] || 'App', W / 2, 14);

  // Mini device mockup
  var pw = W * 0.72;
  var ph = pw * 2.0;
  var px = (W - pw) / 2;
  var py = H * 0.28;

  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  roundRectStore(ctx, px, py, pw, ph, 8);
  ctx.fill();

  ctx.fillStyle = '#000000';
  roundRectStore(ctx, px + 2, py + 2, pw - 4, ph - 4, 6);
  ctx.fill();

  // Screen gradient inside mini mockup
  var sGrad = ctx.createLinearGradient(px, py, px, py + ph);
  sGrad.addColorStop(0, '#1E293B');
  sGrad.addColorStop(1, '#0F172A');
  ctx.fillStyle = sGrad;
  roundRectStore(ctx, px + 4, py + 4, pw - 8, ph - 8, 4);
  ctx.fill();
}

/* 1-Click Apply Ready-Made Template */
function applyStoreTemplate(tplId) {
  var tpl = STORE_TEMPLATES.find(function(t) { return t.id === tplId; });
  if (!tpl) return;

  APP_STORE_STATE.activeTemplateId = tplId;
  APP_STORE_STATE.themeId = tpl.themeId;
  APP_STORE_STATE.frameStyle = tpl.frameStyle;
  APP_STORE_STATE.layoutPos = tpl.layoutPos;
  APP_STORE_STATE.typeface = tpl.typeface;
  APP_STORE_STATE.textScale = tpl.textScale;

  // Sync Form Controls
  if ($('asFrameStyle')) $('asFrameStyle').value = tpl.frameStyle;
  if ($('asLayoutPos')) $('asLayoutPos').value = tpl.layoutPos;
  if ($('asTypeface')) $('asTypeface').value = tpl.typeface;
  if ($('asTextScaleLabel')) $('asTextScaleLabel').textContent = tpl.textScale + '%';

  // Apply default copy to active screen if empty
  var activeScreen = APP_STORE_STATE.screens[APP_STORE_STATE.activeScreenIndex];
  if (activeScreen && (!activeScreen.headline || activeScreen.headline === 'Simple. Reliable. Private.' || activeScreen.headline.startsWith('Screen '))) {
    activeScreen.headline = tpl.headline;
    activeScreen.subline = tpl.subline;
    activeScreen.badge = tpl.badge || '';
  }

  buildStoreTemplateGallery();
  buildStoreThemePicker();
  populateActiveScreenForm();
  renderAllStoreScreens();
  showToast('✓ Template "' + tpl.name + '" applied!');
}

/* Build theme selector chips */
function buildStoreThemePicker() {
  var container = $('asThemeChips');
  if (!container) return;
  container.innerHTML = '';
  STORE_THEMES.forEach(function(th) {
    var chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'theme-chip';
    chip.setAttribute('aria-pressed', th.id === APP_STORE_STATE.themeId ? 'true' : 'false');
    chip.title = th.name;

    var swatch = document.createElement('div');
    swatch.className = 'swatch';
    if (th.bgType === 'gradient') {
      swatch.style.background = 'linear-gradient(135deg, ' + th.gradStart + ', ' + (th.gradEnd || th.bgColor) + ')';
    } else if (th.bgType === 'aura') {
      swatch.style.background = 'radial-gradient(circle, ' + th.auraColor1 + ', ' + th.auraColor2 + ')';
    } else {
      swatch.style.background = th.bgColor;
    }
    swatch.style.width = '100%';
    swatch.style.height = '34px';
    swatch.style.borderRadius = '0';

    var name = document.createElement('span');
    name.className = 'tname';
    name.textContent = th.name;

    chip.appendChild(swatch);
    chip.appendChild(name);

    chip.onclick = function() {
      APP_STORE_STATE.themeId = th.id;
      buildStoreThemePicker();
      renderAllStoreScreens();
    };
    container.appendChild(chip);
  });
}

/* Populate editor form for active screen */
function populateActiveScreenForm() {
  var idx = APP_STORE_STATE.activeScreenIndex;
  var screen = APP_STORE_STATE.screens[idx];
  if (!screen) return;

  var label = $('asActiveScreenLabel');
  if (label) label.textContent = 'Editing Screen ' + (idx + 1) + ' of ' + APP_STORE_STATE.screens.length;

  var bInp = $('asBadge');
  if (bInp) bInp.value = screen.badge || '';

  var hInp = $('asHeadline');
  if (hInp) hInp.value = screen.headline || '';

  var sInp = $('asSubline');
  if (sInp) sInp.value = screen.subline || '';

  var frameInp = $('asScreenFrameOverride');
  if (frameInp) frameInp.value = screen.frameStyle || 'inherit';

  var rmImgBtn = $('asRemoveImgBtn');
  if (rmImgBtn) rmImgBtn.style.display = screen.image ? 'inline-flex' : 'none';
}

function onScreenFrameOverrideChange(val) {
  var idx = APP_STORE_STATE.activeScreenIndex;
  if (APP_STORE_STATE.screens[idx]) {
    APP_STORE_STATE.screens[idx].frameStyle = val;
    renderStoreScreen(idx);
  }
}

function onStoreBadgeInput(val) {
  var idx = APP_STORE_STATE.activeScreenIndex;
  if (APP_STORE_STATE.screens[idx]) {
    APP_STORE_STATE.screens[idx].badge = val;
    renderStoreScreen(idx);
  }
}

function onStoreHeadlineInput(val) {
  var idx = APP_STORE_STATE.activeScreenIndex;
  if (APP_STORE_STATE.screens[idx]) {
    APP_STORE_STATE.screens[idx].headline = val;
    renderStoreScreen(idx);
    updateBarLabel();
  }
}

function onStoreSublineInput(val) {
  var idx = APP_STORE_STATE.activeScreenIndex;
  if (APP_STORE_STATE.screens[idx]) {
    APP_STORE_STATE.screens[idx].subline = val;
    renderStoreScreen(idx);
  }
}

function onStorePresetChange(val) {
  APP_STORE_STATE.preset = val;
  var preset = STORE_PRESETS[val];
  if (preset && $('asFrameStyle')) {
    $('asFrameStyle').value = preset.defaultFrame;
    APP_STORE_STATE.frameStyle = preset.defaultFrame;
  }
  buildStoreDeck();
  updateBarLabel();
}

function onStoreFrameChange(val) {
  APP_STORE_STATE.frameStyle = val;
  renderAllStoreScreens();
}

function onStoreLayoutChange(val) {
  APP_STORE_STATE.layoutPos = val;
  renderAllStoreScreens();
}

function onStoreTypefaceChange(val) {
  APP_STORE_STATE.typeface = val;
  renderAllStoreScreens();
}

function adjustStoreScale(delta) {
  APP_STORE_STATE.textScale = Math.min(180, Math.max(60, APP_STORE_STATE.textScale + delta));
  var lbl = $('asTextScaleLabel');
  if (lbl) lbl.textContent = APP_STORE_STATE.textScale + '%';
  var fill = $('asScaleFill');
  if (fill) fill.style.width = ((APP_STORE_STATE.textScale - 60) / 120 * 100) + '%';
  renderAllStoreScreens();
}

/* Upload image for active screen */
function onStoreScreenshotSelected(input) {
  if (!input.files || !input.files[0]) return;
  var file = input.files[0];
  var reader = new FileReader();
  reader.onload = function(e) {
    var img = new Image();
    img.onload = function() {
      var idx = APP_STORE_STATE.activeScreenIndex;
      if (APP_STORE_STATE.screens[idx]) {
        APP_STORE_STATE.screens[idx].image = img;
        populateActiveScreenForm();
        renderStoreScreen(idx);
        showToast('✓ Screenshot uploaded for Screen ' + (idx + 1));
      }
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

/* Batch upload multiple screenshots at once */
function onStoreBatchSelected(input) {
  if (!input.files || input.files.length === 0) return;
  var files = Array.from(input.files);
  var loaded = 0;

  files.forEach(function(file, i) {
    var reader = new FileReader();
    reader.onload = function(e) {
      var img = new Image();
      img.onload = function() {
        if (!APP_STORE_STATE.screens[i]) {
          APP_STORE_STATE.screens.push({
            id: i + 1,
            badge: '✦ FEATURE ' + (i + 1),
            headline: 'Screen ' + (i + 1),
            subline: 'Highlight key features here',
            image: img
          });
        } else {
          APP_STORE_STATE.screens[i].image = img;
        }
        loaded++;
        if (loaded === files.length) {
          buildStoreDeck();
          populateActiveScreenForm();
          showToast('✓ ' + loaded + ' screenshots imported!');
        }
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

function removeActiveStoreImage() {
  var idx = APP_STORE_STATE.activeScreenIndex;
  if (APP_STORE_STATE.screens[idx]) {
    APP_STORE_STATE.screens[idx].image = null;
    var inp = $('asScreenImgInput');
    if (inp) inp.value = '';
    populateActiveScreenForm();
    renderStoreScreen(idx);
    showToast('Screenshot removed for Screen ' + (idx + 1));
  }
}

/* Add, Duplicate, Remove screen */
function addStoreScreen() {
  var newId = APP_STORE_STATE.screens.length + 1;
  APP_STORE_STATE.screens.push({
    id: newId,
    badge: '✦ NEW FEATURE',
    headline: 'Exciting New Feature',
    subline: 'Everything you need in one place',
    image: null
  });
  APP_STORE_STATE.activeScreenIndex = APP_STORE_STATE.screens.length - 1;
  buildStoreDeck();
  populateActiveScreenForm();
  showToast('+ Screen ' + newId + ' added');
}

function deleteStoreScreen(idx) {
  if (APP_STORE_STATE.screens.length <= 1) {
    showToast('You must have at least one screen.');
    return;
  }
  APP_STORE_STATE.screens.splice(idx, 1);
  if (APP_STORE_STATE.activeScreenIndex >= APP_STORE_STATE.screens.length) {
    APP_STORE_STATE.activeScreenIndex = APP_STORE_STATE.screens.length - 1;
  }
  buildStoreDeck();
  populateActiveScreenForm();
  showToast('Screen deleted');
}

/* -------- Build & Render Multi-Screen Deck -------- */
function buildStoreDeck() {
  var deck = $('appStoreDeck');
  if (!deck) return;
  deck.innerHTML = '';

  var preset = STORE_PRESETS[APP_STORE_STATE.preset] || STORE_PRESETS['ios_6_7'];

  APP_STORE_STATE.screens.forEach(function(screen, i) {
    var slot = document.createElement('div');
    slot.className = 'store-slot' + (i === APP_STORE_STATE.activeScreenIndex ? ' active' : '');
    slot.dataset.index = i;

    var canvas = document.createElement('canvas');
    canvas.id = 'storeCanvas_' + i;
    canvas.width = preset.W;
    canvas.height = preset.H;
    slot.appendChild(canvas);

    // Meta bar
    var meta = document.createElement('div');
    meta.className = 'store-slot-meta';

    var title = document.createElement('span');
    title.className = 'store-slot-num';
    title.textContent = 'Screen ' + (i + 1);

    var actions = document.createElement('div');
    actions.style.display = 'flex';
    actions.style.gap = '6px';
    actions.style.alignItems = 'center';

    // Edit button
    var editBtn = document.createElement('button');
    editBtn.className = 'btn btn-ghost btn-sm';
    editBtn.textContent = '✏️ Edit';
    editBtn.style.padding = '3px 7px';
    editBtn.onclick = function(e) {
      e.stopPropagation();
      APP_STORE_STATE.activeScreenIndex = i;
      buildStoreDeck();
      populateActiveScreenForm();
    };
    actions.appendChild(editBtn);

    // Single Download
    var dlBtn = document.createElement('button');
    dlBtn.className = 'btn btn-ghost btn-sm';
    dlBtn.textContent = '↓ Save';
    dlBtn.style.padding = '3px 7px';
    dlBtn.onclick = function(e) {
      e.stopPropagation();
      downloadSingleStoreScreen(i);
    };
    actions.appendChild(dlBtn);

    // Delete
    var delBtn = document.createElement('button');
    delBtn.className = 'btn btn-ghost btn-sm';
    delBtn.textContent = '✕';
    delBtn.style.padding = '3px 6px';
    delBtn.title = 'Delete this screen';
    delBtn.onclick = function(e) {
      e.stopPropagation();
      deleteStoreScreen(i);
    };
    actions.appendChild(delBtn);

    meta.appendChild(title);
    meta.appendChild(actions);
    slot.appendChild(meta);

    slot.onclick = function() {
      APP_STORE_STATE.activeScreenIndex = i;
      buildStoreDeck();
      populateActiveScreenForm();
    };

    deck.appendChild(slot);
  });

  renderAllStoreScreens();
}

function renderAllStoreScreens() {
  APP_STORE_STATE.screens.forEach(function(screen, i) {
    renderStoreScreen(i);
  });
}

/* Render individual store screenshot canvas */
function renderStoreScreen(index) {
  var canvas = $('storeCanvas_' + index);
  if (!canvas) return;

  var preset = STORE_PRESETS[APP_STORE_STATE.preset] || STORE_PRESETS['ios_6_7'];
  var W = preset.W, H = preset.H;
  canvas.width = W;
  canvas.height = H;

  var ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, W, H);

  var theme = STORE_THEMES.find(function(t) { return t.id === APP_STORE_STATE.themeId; }) || STORE_THEMES[0];
  var screen = APP_STORE_STATE.screens[index];
  if (!screen) return;

  var frame = (screen && screen.frameStyle && screen.frameStyle !== 'inherit') ? screen.frameStyle : APP_STORE_STATE.frameStyle;

  // Full Canvas 100% Image-Only Mode (No mockups, no text, edge-to-edge artwork)
  if (frame === 'full_canvas') {
    var img = screen.image || createDemoScreenImage(index, screen.headline);
    if (img) {
      var scale = Math.max(W / img.width, H / img.height);
      var sw = img.width * scale;
      var sh = img.height * scale;
      var sx = (W - sw) / 2;
      var sy = (H - sh) / 2;
      ctx.drawImage(img, sx, sy, sw, sh);
    } else {
      drawStoreBackground(ctx, W, H, theme);
    }
    return;
  }

  // 1. Draw Background
  drawStoreBackground(ctx, W, H, theme);

  // 2. Draw Headlines & Badge
  var textBottomY = drawStoreTypography(ctx, W, H, screen, theme);

  // 3. Draw Device Mockup & App Screenshot
  var img = screen.image || createDemoScreenImage(index, screen.headline);
  drawStoreDeviceMockup(ctx, W, H, img, textBottomY, theme, screen);
}

/* Background renderer (Mesh Aura, Solid, Grid, Radial Glow) */
function drawStoreBackground(ctx, W, H, theme) {
  if (theme.bgType === 'aura') {
    // 1. Base pastel canvas
    ctx.fillStyle = theme.bgColor;
    ctx.fillRect(0, 0, W, H);

    // 2. Dreamy Aura Glow Orbs (ChatGPT / Perplexity aesthetic)
    var rad1 = ctx.createRadialGradient(W * 0.2, H * 0.18, 0, W * 0.2, H * 0.18, W * 0.65);
    rad1.addColorStop(0, theme.auraColor1);
    rad1.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = rad1;
    ctx.fillRect(0, 0, W, H);

    var rad2 = ctx.createRadialGradient(W * 0.8, H * 0.45, 0, W * 0.8, H * 0.45, W * 0.7);
    rad2.addColorStop(0, theme.auraColor2);
    rad2.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = rad2;
    ctx.fillRect(0, 0, W, H);

    var rad3 = ctx.createRadialGradient(W * 0.4, H * 0.85, 0, W * 0.4, H * 0.85, W * 0.6);
    rad3.addColorStop(0, theme.auraColor3);
    rad3.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = rad3;
    ctx.fillRect(0, 0, W, H);

  } else if (theme.bgType === 'grid' || theme.bgType === 'imposter_grid') {
    ctx.fillStyle = theme.bgColor;
    ctx.fillRect(0, 0, W, H);

    // Grid lines (Zedge / Imposter Game)
    ctx.strokeStyle = theme.gridColor;
    ctx.lineWidth = Math.max(1.5, W * 0.0018);
    var gridSz = Math.round(W * 0.065);
    for (var x = 0; x < W; x += gridSz) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }
    for (var y = 0; y < H; y += gridSz) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }

  } else if (theme.bgType === 'fintech_radial') {
    ctx.fillStyle = theme.bgColor;
    ctx.fillRect(0, 0, W, H);

    var rad = ctx.createRadialGradient(W / 2, H * 0.4, 0, W / 2, H * 0.4, W * 0.75);
    rad.addColorStop(0, theme.glowColor);
    rad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = rad;
    ctx.fillRect(0, 0, W, H);

  } else if (theme.bgType === 'gradient') {
    var grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, theme.gradStart);
    if (theme.gradMid) grad.addColorStop(0.5, theme.gradMid);
    grad.addColorStop(1, theme.gradEnd || theme.bgColor);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

  } else {
    // Solid clean brand backdrop (WhatsApp style)
    ctx.fillStyle = theme.bgColor;
    ctx.fillRect(0, 0, W, H);

    // Subtle soft ambient top highlight
    var topShine = ctx.createRadialGradient(W / 2, 0, 0, W / 2, 0, W * 0.9);
    topShine.addColorStop(0, 'rgba(255,255,255,0.09)');
    topShine.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = topShine;
    ctx.fillRect(0, 0, W, H * 0.5);
  }
}

/* Typography & Tag Badge renderer */
function drawStoreTypography(ctx, W, H, screen, theme) {
  var padX = W * 0.08;
  var maxW = W - padX * 2;
  var scale = (APP_STORE_STATE.textScale || 100) / 100;
  var fam = APP_STORE_STATE.typeface || "'Inter Tight', sans-serif";

  var curY = H * 0.065;

  // 1. Tag / Badge Pill (e.g. ✦ #1 PRODUCTIVITY APP)
  if (screen.badge && screen.badge.trim()) {
    var bText = screen.badge.trim().toUpperCase();
    var bFontSz = Math.round(W * 0.024 * scale);
    ctx.font = '700 ' + bFontSz + 'px ' + fam;
    var bTextW = ctx.measureText(bText).width;
    var pillPadX = Math.round(W * 0.035);
    var pillPadY = Math.round(H * 0.007);
    var pillW = bTextW + pillPadX * 2;
    var pillH = bFontSz + pillPadY * 2.2;
    var pillX = (W - pillW) / 2;

    ctx.fillStyle = theme.badgeBg || 'rgba(255,255,255,0.15)';
    roundRectStore(ctx, pillX, curY, pillW, pillH, pillH / 2);
    ctx.fill();

    if (theme.badgeBorder) {
      ctx.strokeStyle = theme.badgeBorder;
      ctx.lineWidth = Math.max(1, W * 0.0015);
      roundRectStore(ctx, pillX, curY, pillW, pillH, pillH / 2);
      ctx.stroke();
    }

    ctx.fillStyle = theme.textColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(bText, W / 2, curY + pillH / 2);

    curY += pillH + (H * 0.018);
  }

  // 2. Main Headline
  var headline = (screen.headline || '').trim();
  var subline = (screen.subline || '').trim();

  var headSz = Math.round(W * 0.076 * scale);
  ctx.font = '800 ' + headSz + 'px ' + fam;
  ctx.fillStyle = theme.textColor;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';

  var lines = wrapStoreText(ctx, headline, maxW);
  var lh = headSz * 1.15;
  lines.forEach(function(line, li) {
    ctx.fillText(line, W / 2, curY + li * lh);
  });
  var totalHeadH = lines.length * lh;
  curY += totalHeadH;

  // 3. Sub-Headline
  if (subline) {
    curY += (H * 0.012);
    var subSz = Math.round(W * 0.038 * scale);
    ctx.font = '500 ' + subSz + 'px ' + fam;
    ctx.fillStyle = theme.subColor;
    var subLines = wrapStoreText(ctx, subline, maxW);
    var subLh = subSz * 1.3;
    subLines.forEach(function(sLine, sli) {
      ctx.fillText(sLine, W / 2, curY + sli * subLh);
    });
    curY += subLines.length * subLh;
  }

  return curY;
}

function wrapStoreText(ctx, text, maxW) {
  if (!text) return [];
  var words = text.split(' ').filter(Boolean);
  var lines = [], cur = '';
  words.forEach(function(w) {
    var test = cur ? cur + ' ' + w : w;
    if (ctx.measureText(test).width > maxW && cur) {
      lines.push(cur);
      cur = w;
    } else {
      cur = test;
    }
  });
  if (cur) lines.push(cur);
  return lines;
}

/* Device Mockup renderer */
function drawStoreDeviceMockup(ctx, W, H, img, textBottomY, theme, screen) {
  var frame = (screen && screen.frameStyle && screen.frameStyle !== 'inherit') ? screen.frameStyle : APP_STORE_STATE.frameStyle;
  var layout = APP_STORE_STATE.layoutPos;

  // 1. Remove mobile frame entirely if hidden
  if (frame === 'hidden') {
    return;
  }

  // 2. Full single image hero display (No phone bezels)
  if (frame === 'full_bleed') {
    if (img) {
      ctx.save();
      var hasText = screen && ((screen.headline && screen.headline.trim()) || (screen.subline && screen.subline.trim()) || (screen.badge && screen.badge.trim()));
      var heroY = hasText ? textBottomY + Math.round(H * 0.025) : Math.round(H * 0.04);
      var heroH = H - heroY - Math.round(H * 0.045);
      var heroW = W * 0.90;
      var heroX = (W - heroW) / 2;
      var heroR = Math.round(W * 0.04);

      if (layout === 'tilted') {
        ctx.translate(W / 2, heroY + heroH / 2);
        ctx.rotate(-0.05);
        ctx.translate(-W / 2, -(heroY + heroH / 2));
      }

      ctx.shadowColor = 'rgba(0, 0, 0, 0.45)';
      ctx.shadowBlur = Math.round(W * 0.05);
      ctx.shadowOffsetY = Math.round(H * 0.02);
      roundRectStore(ctx, heroX, heroY, heroW, heroH, heroR);
      ctx.fillStyle = '#000000';
      ctx.fill();
      ctx.restore();

      ctx.save();
      if (layout === 'tilted') {
        ctx.translate(W / 2, heroY + heroH / 2);
        ctx.rotate(-0.05);
        ctx.translate(-W / 2, -(heroY + heroH / 2));
      }
      roundRectStore(ctx, heroX, heroY, heroW, heroH, heroR);
      ctx.clip();

      // Cover-fit image
      var scale = Math.max(heroW / img.width, heroH / img.height);
      var sw = img.width * scale;
      var sh = img.height * scale;
      var sx = heroX + (heroW - sw) / 2;
      var sy = heroY + (heroH - sh) / 2;
      ctx.drawImage(img, sx, sy, sw, sh);
      ctx.restore();
    }
    return;
  }

  // Device dimensions
  var phoneW = W * 0.84;
  var phoneH = phoneW * 2.12;

  var phoneX = (W - phoneW) / 2;
  var phoneY = layout === 'center'
    ? textBottomY + (H - textBottomY - phoneH) / 2
    : H * 0.28;

  if (layout === 'tilted') {
    ctx.save();
    ctx.translate(W / 2, phoneY + phoneH / 2);
    ctx.rotate(-0.06); // ~3.5 deg tilt
    ctx.translate(-W / 2, -(phoneY + phoneH / 2));
  }

  // Realistic multi-tier shadow
  ctx.save();
  ctx.shadowColor = 'rgba(0, 0, 0, 0.45)';
  ctx.shadowBlur = Math.round(W * 0.055);
  ctx.shadowOffsetY = Math.round(H * 0.026);

  var cornerR = Math.round(phoneW * 0.125);

  if (frame === 'none') {
    roundRectStore(ctx, phoneX, phoneY, phoneW, phoneH, cornerR);
    ctx.fillStyle = '#000000';
    ctx.fill();
    ctx.restore();

    ctx.save();
    roundRectStore(ctx, phoneX, phoneY, phoneW, phoneH, cornerR);
    ctx.clip();
    if (img) ctx.drawImage(img, phoneX, phoneY, phoneW, phoneH);
    ctx.restore();

  } else if (frame === 'floating') {
    roundRectStore(ctx, phoneX, phoneY, phoneW, phoneH, cornerR);
    ctx.fillStyle = '#000000';
    ctx.fill();
    ctx.restore();

    ctx.save();
    roundRectStore(ctx, phoneX, phoneY, phoneW, phoneH, cornerR);
    ctx.clip();
    if (img) ctx.drawImage(img, phoneX, phoneY, phoneW, phoneH);
    ctx.restore();

    ctx.strokeStyle = 'rgba(255,255,255,0.22)';
    ctx.lineWidth = Math.max(2, W * 0.003);
    roundRectStore(ctx, phoneX, phoneY, phoneW, phoneH, cornerR);
    ctx.stroke();

  } else if (frame === 'android') {
    // Android Device with punch-hole
    roundRectStore(ctx, phoneX, phoneY, phoneW, phoneH, cornerR);
    ctx.fillStyle = '#18181B';
    ctx.fill();
    ctx.restore();

    var bezel = Math.round(phoneW * 0.032);
    var screenX = phoneX + bezel, screenY = phoneY + bezel;
    var screenW = phoneW - bezel * 2, screenH = phoneH - bezel * 2;
    var screenR = cornerR - bezel;

    ctx.save();
    roundRectStore(ctx, screenX, screenY, screenW, screenH, screenR);
    ctx.clip();
    if (img) ctx.drawImage(img, screenX, screenY, screenW, screenH);

    // Punch hole camera
    ctx.fillStyle = '#09090B';
    ctx.beginPath();
    ctx.arc(phoneX + phoneW / 2, screenY + bezel * 2.2, Math.round(phoneW * 0.022), 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

  } else if (frame === 'clay') {
    // Clay / Matte minimal finish
    roundRectStore(ctx, phoneX, phoneY, phoneW, phoneH, cornerR);
    ctx.fillStyle = '#F4F4F5';
    ctx.fill();
    ctx.restore();

    var bezel = Math.round(phoneW * 0.038);
    var screenX = phoneX + bezel, screenY = phoneY + bezel;
    var screenW = phoneW - bezel * 2, screenH = phoneH - bezel * 2;
    var screenR = cornerR - bezel;

    ctx.save();
    roundRectStore(ctx, screenX, screenY, screenW, screenH, screenR);
    ctx.clip();
    if (img) ctx.drawImage(img, screenX, screenY, screenW, screenH);
    ctx.restore();

  } else {
    // Apple iPhone with Dynamic Island pill & metallic rim
    roundRectStore(ctx, phoneX, phoneY, phoneW, phoneH, cornerR);
    ctx.fillStyle = '#18181B';
    ctx.fill();
    ctx.restore();

    var bezel = Math.round(phoneW * 0.036);
    var screenX = phoneX + bezel, screenY = phoneY + bezel;
    var screenW = phoneW - bezel * 2, screenH = phoneH - bezel * 2;
    var screenR = cornerR - bezel;

    // Screen Content
    ctx.save();
    roundRectStore(ctx, screenX, screenY, screenW, screenH, screenR);
    ctx.clip();
    if (img) ctx.drawImage(img, screenX, screenY, screenW, screenH);

    // Dynamic Island
    var pillW = Math.round(phoneW * 0.28);
    var pillH = Math.round(pillW * 0.32);
    var pillX = phoneX + (phoneW - pillW) / 2;
    var pillY = screenY + Math.round(phoneW * 0.025);
    ctx.fillStyle = '#000000';
    roundRectStore(ctx, pillX, pillY, pillW, pillH, pillH / 2);
    ctx.fill();

    // Glass glare reflection
    var shine = ctx.createLinearGradient(screenX, screenY, screenX + screenW, screenY + screenH);
    shine.addColorStop(0, 'rgba(255,255,255,0.07)');
    shine.addColorStop(0.35, 'rgba(255,255,255,0.0)');
    ctx.fillStyle = shine;
    ctx.fillRect(screenX, screenY, screenW, screenH);

    ctx.restore();

    // Metallic rim
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
    ctx.lineWidth = Math.max(2, W * 0.0025);
    roundRectStore(ctx, phoneX, phoneY, phoneW, phoneH, cornerR);
    ctx.stroke();
  }

  if (layout === 'tilted') {
    ctx.restore();
  }
}

/* -------- Export & Downloads -------- */
function downloadActiveStoreScreen() {
  var idx = APP_STORE_STATE.activeScreenIndex || 0;
  downloadSingleStoreScreen(idx);
}

function downloadSingleStoreScreen(idx) {
  var canvas = $('storeCanvas_' + idx);
  if (!canvas) return;
  var preset = STORE_PRESETS[APP_STORE_STATE.preset] || STORE_PRESETS['ios_6_7'];
  canvas.toBlob(function(blob) {
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'screen-' + (idx + 1) + '-' + preset.W + 'x' + preset.H + '.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast('✓ Screen ' + (idx + 1) + ' saved!');
  }, 'image/png');
}

/* Download All Screens in a ZIP file */
async function downloadAllStoreScreensZip() {
  if (typeof JSZip === 'undefined') {
    showToast('Error: JSZip library not loaded.');
    return;
  }

  var btn = $('asDownloadAllBtn');
  var origText = btn ? btn.textContent : 'Download All (ZIP)';
  if (btn) {
    btn.disabled = true;
    btn.textContent = '⏳ Compressing ZIP...';
  }
  showToast('Generating high-res store screenshots...');

  try {
    var zip = new JSZip();
    var preset = STORE_PRESETS[APP_STORE_STATE.preset] || STORE_PRESETS['ios_6_7'];

    for (var i = 0; i < APP_STORE_STATE.screens.length; i++) {
      var canvas = $('storeCanvas_' + i);
      if (canvas) {
        var dataUrl = canvas.toDataURL('image/png');
        var base64Data = dataUrl.replace(/^data:image\/png;base64,/, '');
        var num = String(i + 1).padStart(2, '0');
        zip.file(num + '-screen-' + preset.W + 'x' + preset.H + '.png', base64Data, { base64: true });
      }
    }

    var content = await zip.generateAsync({ type: 'blob' });
    var url = URL.createObjectURL(content);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'appstore-screenshots-' + preset.platform + '-' + preset.W + 'x' + preset.H + '.zip';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    if (btn) {
      btn.disabled = false;
      btn.textContent = origText;
    }
    showToast('✓ All ' + APP_STORE_STATE.screens.length + ' store posters downloaded in ZIP!');
  } catch (err) {
    console.error('ZIP export error:', err);
    if (btn) {
      btn.disabled = false;
      btn.textContent = origText;
    }
    showToast('Failed to export ZIP file.');
  }
}

/* Initialize on load */
document.addEventListener('DOMContentLoaded', function() {
  initAppStore();
});
