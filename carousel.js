/* =============================================
   carousel.js — Carousel Slide Parser,
   Renderer, Theme System, Deck, Download
   ============================================= */
'use strict';

/* -------- Global Carousel State -------- */
var CAROUSEL_SLIDES = [];
var CAROUSEL_THEME = 0;
var CAROUSEL_ACCENT = '#7C6EFA';
var CAROUSEL_SLIDE_IMAGES = {}; // keyed by slide index

/* -------- Typeface map -------- */
var CAROUSEL_FONTS = {
  'inter':      { body: "'Inter Tight', sans-serif",    head: "'Inter Tight', sans-serif",    bw: '600', hw: '700' },
  'space':      { body: "'Space Grotesk', sans-serif",  head: "'Space Grotesk', sans-serif",  bw: '500', hw: '700' },
  'newsreader': { body: 'Newsreader, serif',            head: 'Newsreader, serif',            bw: '400', hw: '600' },
  'archivo':    { body: 'Archivo, sans-serif',          head: 'Archivo, sans-serif',          bw: '600', hw: '800' },
  'bricolage':  { body: "'Bricolage Grotesque', sans-serif", head: "'Bricolage Grotesque', sans-serif", bw: '600', hw: '800' },
  'fraunces':   { body: 'Fraunces, serif',              head: 'Fraunces, serif',              bw: '400', hw: '600' }
};

/* -------- Themes -------- */
var CAROUSEL_THEMES = [
  { name: 'Light',  bg: '#FFFFFF', ink: '#131114', sub: '#6C6A70', card: '#F6F4F1' },
  { name: 'Dark',   bg: '#111118', ink: '#F0EFF5', sub: '#8A8A9A', card: '#1E1E28' },
  { name: 'Bold',   bg: null,      ink: '#FFFFFF', sub: 'rgba(255,255,255,0.7)', card: null },   // accent bg
  { name: 'Warm',   bg: '#FAF6EE', ink: '#1E1510', sub: '#7A6A58', card: '#F0EBE0' }
];

/* -------- Accent Swatches -------- */
var ACCENT_COLORS = [
  '#7C6EFA', '#3B82F6', '#10B981', '#F59E0B',
  '#EF4444', '#EC4899', '#8B5CF6', '#14B8A6'
];

/* -------- Canvas size from ratio -------- */
function getCanvasSize(ratio) {
  if (ratio === '1x1') return { W: 1080, H: 1080 };
  if (ratio === 'li')  return { W: 1080, H: 1350 };
  return { W: 1080, H: 1350 }; // 4x5
}

/* -------- Text wrap for carousel -------- */
function carWrap(ctx, text, maxW) {
  if (!text) return [];
  var words = text.split(' ').filter(Boolean);
  var lines = [], cur = '';
  words.forEach(function(w) {
    var t = cur ? cur + ' ' + w : w;
    if (ctx.measureText(t).width > maxW && cur) { lines.push(cur); cur = w; }
    else cur = t;
  });
  if (cur) lines.push(cur);
  return lines;
}

function drawCarText(ctx, text, cx, y, maxW, lh, align) {
  var lines = carWrap(ctx, text, maxW);
  ctx.textBaseline = 'top';
  lines.forEach(function(l, i) {
    ctx.textAlign = align || 'center';
    ctx.fillText(l, cx, y + i * lh);
  });
  return lines.length * lh;
}

/* -------- Parse text into slides -------- */
function parseSlides(rawText, hook, cta) {
  var slides = [];

  // Hook slide
  if (hook && hook.trim()) {
    slides.push({ type: 'hook', text: hook.trim() });
  }

  // Body slides
  if (rawText && rawText.trim()) {
    var blocks = rawText.split(/\n\s*\n|^---$/m).map(function(b) { return b.trim(); }).filter(Boolean);

    // If only one long block, auto-split by sentences
    if (blocks.length === 1 && rawText.trim().split('\n').length <= 2) {
      var sentences = rawText.trim().split(/(?<=[.!?])\s+/);
      if (sentences.length > 2) {
        var grouped = [];
        for (var i = 0; i < sentences.length; i += 2) {
          grouped.push(sentences.slice(i, i + 2).join(' '));
        }
        blocks = grouped;
      }
    }

    blocks.forEach(function(block) {
      var lines = block.split('\n').map(function(l) { return l.trim(); }).filter(Boolean);
      // Detect list slide
      var isList = lines.every(function(l) { return l.startsWith('-') || l.startsWith('•') || l.startsWith('*'); });
      if (isList) {
        slides.push({ type: 'list', items: lines.map(function(l) { return l.replace(/^[-•*]\s*/, ''); }) });
      } else if (lines.length === 1 && /\d/.test(lines[0]) && lines[0].length < 40) {
        // Stat slide — short line with a number
        slides.push({ type: 'stat', text: lines[0] });
      } else {
        slides.push({ type: 'body', text: lines.join('\n') });
      }
    });
  }

  // CTA slide
  if (cta && cta.trim()) {
    slides.push({ type: 'cta', text: cta.trim() });
  }

  return slides;
}

/* -------- Background graphic renderers -------- */
function drawBgGraphic(ctx, W, H, graphic, theme, accent) {
  if (graphic === 'dots') {
    ctx.fillStyle = theme.ink;
    ctx.globalAlpha = 0.08;
    var step = W * 0.05;
    for (var x = step; x < W; x += step) {
      for (var y = step; y < H; y += step) {
        ctx.beginPath();
        ctx.arc(x, y, W * 0.005, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1;
  } else if (graphic === 'grid') {
    ctx.strokeStyle = theme.ink;
    ctx.globalAlpha = 0.06;
    ctx.lineWidth = 1;
    var colW = W / 5;
    for (var cx = colW; cx < W; cx += colW) {
      ctx.beginPath(); ctx.moveTo(cx, 0); ctx.lineTo(cx, H); ctx.stroke();
    }
    ctx.globalAlpha = 1;
  } else if (graphic === 'blob') {
    // Soft shapes
    var shapes = [
      { x: W * 0.8, y: H * 0.15, r: W * 0.38 },
      { x: W * 0.1, y: H * 0.85, r: W * 0.3 }
    ];
    shapes.forEach(function(sh) {
      var g = ctx.createRadialGradient(sh.x, sh.y, 0, sh.x, sh.y, sh.r);
      g.addColorStop(0, accent + '22');
      g.addColorStop(1, accent + '00');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(sh.x, sh.y, sh.r, 0, Math.PI * 2);
      ctx.fill();
    });
  } else if (graphic === 'numeral') {
    // Will be drawn per-slide elsewhere
  }
}

/* -------- Progress indicator -------- */
function drawProgress(ctx, W, H, indicator, idx, total, accent, ink) {
  if (indicator === 'off' || total <= 1) return;
  var y = H * 0.95;
  var cx = W / 2;

  if (indicator === 'segments') {
    var segW = W * 0.65;
    var segH = H * 0.006;
    var gapW = W * 0.01;
    var totalW = segW;
    var eachW = (totalW - gapW * (total - 1)) / total;
    var startX = cx - segW / 2;
    for (var i = 0; i < total; i++) {
      ctx.fillStyle = i === idx ? accent : ink;
      ctx.globalAlpha = i === idx ? 1 : 0.18;
      roundRectC(ctx, startX + i * (eachW + gapW), y - segH / 2, eachW, segH, segH / 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  } else if (indicator === 'dots') {
    var dotR = W * 0.012;
    var gap = dotR * 3.5;
    var startX = cx - ((total - 1) * gap) / 2;
    for (var i = 0; i < total; i++) {
      ctx.fillStyle = i === idx ? accent : ink;
      ctx.globalAlpha = i === idx ? 1 : 0.2;
      ctx.beginPath();
      ctx.arc(startX + i * gap, y, i === idx ? dotR * 1.3 : dotR, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  } else if (indicator === 'line') {
    var lw = W * 0.65;
    var lh2 = H * 0.004;
    var sx = cx - lw / 2;
    ctx.fillStyle = ink;
    ctx.globalAlpha = 0.15;
    roundRectC(ctx, sx, y - lh2 / 2, lw, lh2, lh2 / 2);
    ctx.fill();
    ctx.fillStyle = accent;
    ctx.globalAlpha = 1;
    roundRectC(ctx, sx, y - lh2 / 2, lw * (idx + 1) / total, lh2, lh2 / 2);
    ctx.fill();
  } else if (indicator === 'counter') {
    ctx.font = '700 ' + (W * 0.028) + 'px \'Inter Tight\', sans-serif';
    ctx.fillStyle = ink;
    ctx.globalAlpha = 0.35;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText((idx + 1) + ' / ' + total, cx, y);
    ctx.globalAlpha = 1;
  }
}

function roundRectC(ctx, x, y, w, h, r) {
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

/* -------- Render a single slide -------- */
function renderSlide(canvas, slide, idx, total, state) {
  var size = getCanvasSize(state.ratio);
  var W = size.W, H = size.H;
  canvas.width = W;
  canvas.height = H;

  var ctx = canvas.getContext('2d');
  var theme = CAROUSEL_THEMES[state.theme] || CAROUSEL_THEMES[0];
  var accent = state.accent || CAROUSEL_ACCENT;
  var fonts = CAROUSEL_FONTS[state.typeface] || CAROUSEL_FONTS['inter'];

  // Background
  var effBg = theme.bg;
  if (theme.name === 'Bold') effBg = accent;
  if (!effBg) effBg = accent;
  ctx.fillStyle = effBg;
  ctx.fillRect(0, 0, W, H);

  // Per-slide background image
  var slideImg = CAROUSEL_SLIDE_IMAGES[idx];
  var mainImgX, mainImgY, mainImgW, mainImgH;
  if (slideImg) {
    var imgMode = state.imgMode || 'top';
    if (imgMode === 'full') {
      var sc = Math.max(W / slideImg.width, H / slideImg.height);
      var dw = slideImg.width * sc, dh = slideImg.height * sc;
      ctx.drawImage(slideImg, (W - dw) / 2, (H - dh) / 2, dw, dh);
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      ctx.fillRect(0, 0, W, H);
    } else {
      var imgAreaH = imgMode === 'top' ? H * 0.38 : H;
      var imgAreaW = imgMode === 'left' || imgMode === 'right' ? W * 0.42 : W;
      var imgX = imgMode === 'right' ? W - imgAreaW : 0;
      var imgY = imgMode === 'top' ? 0 : 0;
      var sc = Math.max(imgAreaW / slideImg.width, imgAreaH / slideImg.height);
      var dw2 = slideImg.width * sc, dh2 = slideImg.height * sc;
      ctx.save();
      ctx.rect(imgX, imgY, imgAreaW, imgAreaH);
      ctx.clip();
      ctx.drawImage(slideImg, imgX + (imgAreaW - dw2) / 2, imgY + (imgAreaH - dh2) / 2, dw2, dh2);
      ctx.restore();
    }
  }

  // Background graphic
  drawBgGraphic(ctx, W, H, state.graphic, theme, accent);

  // Big numeral graphic for stat slides
  if (state.graphic === 'numeral' && slide.type === 'stat') {
    var numMatch = slide.text.match(/\d[\d,.%x+]*/);
    if (numMatch) {
      ctx.font = '800 ' + (W * 0.55) + 'px ' + fonts.head;
      ctx.fillStyle = theme.ink;
      ctx.globalAlpha = 0.06;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(numMatch[0], W / 2, H / 2);
      ctx.globalAlpha = 1;
    }
  }

  // Layout zones
  var pad = W * 0.11;
  var contentStartY = H * 0.12;
  var contentEndY = H * 0.88;
  var mw = W - pad * 2;
  var contentH = contentEndY - contentStartY;

  // Handle + top label
  if (state.handle) {
    ctx.font = '600 ' + (W * 0.024 * (state.textScale || 1)) + 'px ' + fonts.body;
    ctx.fillStyle = theme.ink;
    ctx.globalAlpha = 0.4;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(state.handle, pad, H * 0.055);
    ctx.globalAlpha = 1;
  }

  // Accent top rule
  ctx.fillStyle = accent;
  ctx.fillRect(pad, H * 0.08, W * 0.06, H * 0.004);

  // Render by slide type
  ctx.fillStyle = theme.ink;

  if (slide.type === 'hook') {
    // Big centered headline
    var hookSz = W * 0.13 * (state.textScale || 1);
    while (hookSz > W * 0.05 * (state.textScale || 1)) {
      ctx.font = '800 ' + hookSz + 'px ' + fonts.head;
      var ls = carWrap(ctx, slide.text, mw);
      if (ls.length <= 4) break;
      hookSz -= 4;
    }
    ctx.font = '800 ' + hookSz + 'px ' + fonts.head;
    ctx.fillStyle = theme.ink;
    var hookLines = carWrap(ctx, slide.text, mw);
    var hookLH = hookSz * 1.2;
    var hookY = H * 0.5 - (hookLines.length * hookLH) / 2;
    drawCarText(ctx, slide.text, W / 2, hookY, mw, hookLH, 'center');

    // Tag
    ctx.font = '600 ' + (W * 0.024 * (state.textScale || 1)) + 'px ' + fonts.body;
    ctx.fillStyle = accent;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText('SWIPE →', W / 2, H * 0.82);

  } else if (slide.type === 'body') {
    var bodySz = W * 0.07 * (state.textScale || 1);
    while (bodySz > W * 0.035 * (state.textScale || 1)) {
      ctx.font = fonts.bw + ' ' + bodySz + 'px ' + fonts.body;
      var ls = carWrap(ctx, slide.text, mw);
      if (ls.length <= 6) break;
      bodySz -= 2;
    }
    ctx.font = fonts.bw + ' ' + bodySz + 'px ' + fonts.body;
    ctx.fillStyle = theme.ink;
    var bodyLH = bodySz * 1.6;
    var bodyLines = carWrap(ctx, slide.text, mw);
    var bodyH = bodyLines.length * bodyLH;
    var bodyY = contentStartY + contentH / 2 - bodyH / 2;
    // Handle image top placement
    if (slideImg && state.imgMode === 'top') bodyY = H * 0.44;
    if (slideImg && (state.imgMode === 'left' || state.imgMode === 'right')) {
      var tx = state.imgMode === 'left' ? W * 0.46 : pad;
      var tw = state.imgMode === 'left' ? W - W * 0.46 - pad : W * 0.52 - pad;
      ctx.textAlign = 'left';
      drawCarText(ctx, slide.text, tx, contentStartY + contentH / 2 - bodyH / 2, tw, bodyLH, 'left');
    } else {
      drawCarText(ctx, slide.text, W / 2, bodyY, mw, bodyLH, 'center');
    }

  } else if (slide.type === 'list') {
    var listSz = W * 0.055 * (state.textScale || 1);
    var icon = state.icon || '•';
    var itemLH = listSz * 1.8;
    var listY = contentStartY + H * 0.05;
    if (slideImg && state.imgMode === 'top') listY = H * 0.44;

    ctx.font = fonts.bw + ' ' + listSz + 'px ' + fonts.body;
    ctx.fillStyle = theme.ink;
    ctx.textAlign = 'left';

    slide.items.forEach(function(item, li) {
      var iy = listY + li * itemLH;
      // Icon
      ctx.fillStyle = accent;
      ctx.font = '700 ' + listSz + 'px ' + fonts.body;
      ctx.fillText(icon, pad, iy);
      ctx.fillStyle = theme.ink;
      var iw = ctx.measureText(icon + '  ').width;
      ctx.font = fonts.bw + ' ' + listSz + 'px ' + fonts.body;
      ctx.fillText(item, pad + iw, iy);
    });

  } else if (slide.type === 'stat') {
    // Large number + context
    var numMatch = (slide.text || '').match(/(\d[\d,.%x+k+]*)/);
    var numPart = numMatch ? numMatch[0] : slide.text;
    var restPart = slide.text.replace(numPart, '').trim();

    ctx.font = '800 ' + (W * 0.22 * (state.textScale || 1)) + 'px ' + fonts.head;
    ctx.fillStyle = accent;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    var numY = H * 0.45;
    ctx.fillText(numPart, W / 2, numY);

    if (restPart) {
      ctx.font = fonts.bw + ' ' + (W * 0.055 * (state.textScale || 1)) + 'px ' + fonts.body;
      ctx.fillStyle = theme.ink;
      ctx.globalAlpha = 0.7;
      ctx.textBaseline = 'top';
      drawCarText(ctx, restPart, W / 2, H * 0.62, mw, W * 0.07, 'center');
      ctx.globalAlpha = 1;
    }

  } else if (slide.type === 'cta') {
    // CTA slide
    ctx.font = '700 ' + (W * 0.065 * (state.textScale || 1)) + 'px ' + fonts.head;
    ctx.fillStyle = theme.ink;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    var ctaLH = W * 0.08;
    drawCarText(ctx, slide.text, W / 2, H * 0.42, mw, ctaLH, 'center');

    // Follow pill
    if (state.handle) {
      var pillH = H * 0.07;
      var pillW = W * 0.55;
      var pillX = W / 2 - pillW / 2;
      var pillY = H * 0.66;
      ctx.fillStyle = accent;
      roundRectC(ctx, pillX, pillY, pillW, pillH, pillH / 2);
      ctx.fill();
      ctx.font = '700 ' + (W * 0.038 * (state.textScale || 1)) + 'px ' + fonts.body;
      ctx.fillStyle = '#fff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Follow ' + state.handle, W / 2, pillY + pillH / 2);
    }
  }

  // Slide number label (small, bottom left)
  ctx.font = '500 ' + (W * 0.022 * (state.textScale || 1)) + 'px ' + fonts.body;
  ctx.fillStyle = theme.sub;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'bottom';
  ctx.fillText(String(idx + 1).padStart(2, '0'), pad, H * 0.93);

  // Progress indicator
  drawProgress(ctx, W, H, state.progress, idx, total, accent, theme.ink);
}

/* -------- Build and render the full deck -------- */
var _carTimer = null;
function carouselChanged() {
  clearTimeout(_carTimer);
  _carTimer = setTimeout(function() {
    renderCarousel();
    carouselHistory.push(getCarouselState());
    updateBarLabel();
  }, 200);
}

function getCarouselRenderState() {
  return {
    copy: $('cCopy').value,
    hook: $('cHook').value,
    cta: $('cCta').value,
    handle: $('cHandle').value,
    ratio: $('cRatio').value,
    typeface: $('cTypeface').value,
    icon: $('cIcon').value,
    graphic: $('cGraphic').value,
    imgMode: $('cImgMode').value,
    progress: $('cProgress').value,
    theme: CAROUSEL_THEME,
    accent: CAROUSEL_ACCENT,
    textScale: (window.CAROUSEL_TEXT_SCALE || 100) / 100
  };
}

function renderCarousel() {
  var state = getCarouselRenderState();
  CAROUSEL_SLIDES = parseSlides(state.copy, state.hook, state.cta);

  var deck = $('carouselDeck');
  deck.innerHTML = '';

  if (!CAROUSEL_SLIDES.length) {
    $('deckLabel').textContent = 'No slides yet — paste text above';
    $('carouselZipBtn').disabled = true;
    $('carouselPdfBtn').disabled = true;
    updateBarLabel();
    return;
  }

  $('deckLabel').textContent = CAROUSEL_SLIDES.length + ' slide' + (CAROUSEL_SLIDES.length > 1 ? 's' : '');
  $('carouselZipBtn').disabled = false;
  $('carouselPdfBtn').disabled = false;

  var total = CAROUSEL_SLIDES.length;

  CAROUSEL_SLIDES.forEach(function(slide, i) {
    var slot = document.createElement('div');
    slot.className = 'slide-slot';
    slot.draggable = true;
    slot.dataset.idx = i;

    // Canvas
    var canvas = document.createElement('canvas');
    slot.appendChild(canvas);
    renderSlide(canvas, slide, i, total, state);

    // Meta row
    var meta = document.createElement('div');
    meta.className = 'slide-meta';

    var kind = document.createElement('span');
    kind.className = 'slide-kind';
    kind.textContent = slide.type.toUpperCase();
    meta.appendChild(kind);

    var actions = document.createElement('div');
    actions.style.display = 'flex';
    actions.style.gap = '8px';
    actions.style.alignItems = 'center';

    // Per-slide image button
    var imgBtn = document.createElement('button');
    imgBtn.className = 'slide-img-btn';
    imgBtn.textContent = CAROUSEL_SLIDE_IMAGES[i] ? '🖼 Change' : '+ Image';
    imgBtn.title = 'Upload image for this slide';
    (function(slideIdx, canvasEl) {
      imgBtn.onclick = function() {
        var inp = document.createElement('input');
        inp.type = 'file';
        inp.accept = 'image/*';
        inp.onchange = function() {
          if (!inp.files[0]) return;
          var reader = new FileReader();
          reader.onload = function(ev) {
            var img = new Image();
            img.onload = function() {
              CAROUSEL_SLIDE_IMAGES[slideIdx] = img;
              renderSlide(canvasEl, CAROUSEL_SLIDES[slideIdx], slideIdx, CAROUSEL_SLIDES.length, getCarouselRenderState());
              imgBtn.textContent = '🖼 Change';
            };
            img.src = ev.target.result;
          };
          reader.readAsDataURL(inp.files[0]);
        };
        inp.click();
      };
    })(i, canvas);
    actions.appendChild(imgBtn);

    // Download single slide
    var dl = document.createElement('button');
    dl.className = 'slide-dl';
    dl.textContent = '↓ Save';
    (function(canvasEl, slideIdx) {
      dl.onclick = function() {
        canvasEl.toBlob(function(blob) {
          triggerDownload(URL.createObjectURL(blob), 'slide-' + String(slideIdx + 1).padStart(2, '0') + '.png');
          showToast('✓ Slide ' + (slideIdx + 1) + ' saved');
        }, 'image/png');
      };
    })(canvas, i);
    actions.appendChild(dl);

    meta.appendChild(actions);
    slot.appendChild(meta);
    deck.appendChild(slot);
  });

  // Drag-and-drop reorder
  initDragAndDrop();
  updateBarLabel();
}

/* -------- Drag-and-Drop Reorder -------- */
function initDragAndDrop() {
  var slots = document.querySelectorAll('.slide-slot');
  var dragging = null;

  slots.forEach(function(slot) {
    slot.addEventListener('dragstart', function() {
      dragging = slot;
      setTimeout(function() { slot.classList.add('dragging'); }, 0);
    });
    slot.addEventListener('dragend', function() {
      slot.classList.remove('dragging');
      dragging = null;
    });
    slot.addEventListener('dragover', function(e) {
      e.preventDefault();
      if (!dragging || dragging === slot) return;
      var rect = slot.getBoundingClientRect();
      var mid = rect.left + rect.width / 2;
      if (e.clientX < mid) {
        slot.parentNode.insertBefore(dragging, slot);
      } else {
        slot.parentNode.insertBefore(dragging, slot.nextSibling);
      }
      // Rebuild slide order from DOM
      rebuildSlideOrder();
    });
  });
}

function rebuildSlideOrder() {
  var slots = document.querySelectorAll('.slide-slot');
  var newSlides = [];
  var newImages = {};
  slots.forEach(function(slot, newIdx) {
    var oldIdx = parseInt(slot.dataset.idx);
    newSlides.push(CAROUSEL_SLIDES[oldIdx]);
    if (CAROUSEL_SLIDE_IMAGES[oldIdx]) newImages[newIdx] = CAROUSEL_SLIDE_IMAGES[oldIdx];
    slot.dataset.idx = newIdx;
  });
  CAROUSEL_SLIDES = newSlides;
  CAROUSEL_SLIDE_IMAGES = newImages;
  // Re-render to update progress indicators
  var state = getCarouselRenderState();
  document.querySelectorAll('.slide-slot').forEach(function(slot, i) {
    var canvas = slot.querySelector('canvas');
    renderSlide(canvas, CAROUSEL_SLIDES[i], i, CAROUSEL_SLIDES.length, state);
  });
}

/* -------- Theme Chip Builder -------- */
function buildThemeChips() {
  var container = $('cThemeChips');
  container.innerHTML = '';
  CAROUSEL_THEMES.forEach(function(theme, i) {
    var btn = document.createElement('button');
    btn.className = 'theme-chip';
    btn.setAttribute('aria-pressed', i === CAROUSEL_THEME ? 'true' : 'false');
    btn.setAttribute('aria-label', theme.name + ' theme');

    // Swatch preview
    var sw = document.createElement('span');
    sw.className = 'swatch';
    sw.style.background = theme.name === 'Bold' ? CAROUSEL_ACCENT : (theme.bg || '#fff');
    btn.appendChild(sw);

    var nm = document.createElement('span');
    nm.className = 'tname';
    nm.textContent = theme.name;
    btn.appendChild(nm);

    btn.onclick = function() {
      CAROUSEL_THEME = i;
      document.querySelectorAll('.theme-chip').forEach(function(b, j) {
        b.setAttribute('aria-pressed', j === i ? 'true' : 'false');
      });
      carouselChanged();
    };
    container.appendChild(btn);
  });
}

/* -------- Accent Swatch Builder -------- */
function buildSwatches(extras) {
  var all = ACCENT_COLORS.concat(extras || []);
  var container = $('cSwatches');
  container.innerHTML = '';
  all.forEach(function(color) {
    var btn = document.createElement('button');
    btn.className = 'swatch-dot';
    btn.style.background = color;
    btn.setAttribute('aria-pressed', color === CAROUSEL_ACCENT ? 'true' : 'false');
    btn.setAttribute('aria-label', 'Accent ' + color);
    btn.title = color;
    btn.onclick = function() {
      CAROUSEL_ACCENT = color;
      document.querySelectorAll('.swatch-dot').forEach(function(b) {
        b.setAttribute('aria-pressed', b.style.background === btn.style.background ? 'true' : 'false');
      });
      buildThemeChips(); // refresh Bold swatch
      carouselChanged();
    };
    container.appendChild(btn);
  });
}

/* -------- Logo Color Extraction -------- */
function extractLogoColors(input) {
  if (!input.files || !input.files[0]) return;
  var reader = new FileReader();
  reader.onload = function(e) {
    var img = new Image();
    img.onload = function() {
      var c = document.createElement('canvas');
      var sc = Math.max(img.width, img.height);
      c.width = Math.min(img.width, 80);
      c.height = Math.min(img.height, 80);
      var x = c.getContext('2d');
      x.drawImage(img, 0, 0, c.width, c.height);
      var data = x.getImageData(0, 0, c.width, c.height).data;
      var colorMap = {};
      for (var i = 0; i < data.length; i += 4) {
        var a = data[i + 3];
        if (a < 128) continue;
        var r = Math.round(data[i] / 32) * 32;
        var g = Math.round(data[i + 1] / 32) * 32;
        var b2 = Math.round(data[i + 2] / 32) * 32;
        // Skip near-white and near-black
        if (r > 220 && g > 220 && b2 > 220) continue;
        if (r < 30 && g < 30 && b2 < 30) continue;
        var key = [r, g, b2].join(',');
        colorMap[key] = (colorMap[key] || 0) + 1;
      }
      var sorted = Object.keys(colorMap).sort(function(a, b) { return colorMap[b] - colorMap[a]; });
      var extras = sorted.slice(0, 4).map(function(k) {
        var p = k.split(',');
        return '#' + p.map(function(v) { return ('0' + parseInt(v).toString(16)).slice(-2); }).join('');
      });
      $('cLogoHint').textContent = '✓ Found ' + extras.length + ' brand colors! They appear below.';
      buildSwatches(extras);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(input.files[0]);
}

/* -------- Example Content -------- */
function carouselLoadExample() {
  $('cHook').value = '5 things that changed how I think about design';
  $('cCopy').value = 'Good design removes friction\nNot just for the user — but for yourself too.\n\n---\n- Constraints spark creativity\n- Less is rarely boring\n- White space communicates\n- Typography carries tone\n- Consistency builds trust\n\n---\n87%\nof first impressions are design-related.\n\n---\nShip it, then make it beautiful\nDone is better than perfect. Polish after it works.';
  $('cCta').value = 'Follow for more design insights →';
  $('cHandle').value = '@yourhandle';
  carouselChanged();
}

/* -------- Init -------- */
document.addEventListener('DOMContentLoaded', function() {
  buildThemeChips();
  buildSwatches();
  // Add change listeners for all carousel controls
  ['cCopy','cHook','cCta','cHandle','cRatio','cTypeface','cIcon','cGraphic','cImgMode','cProgress'].forEach(function(id) {
    var el = $(id);
    if (el) el.addEventListener(el.tagName === 'TEXTAREA' || el.type === 'text' ? 'input' : 'change', carouselChanged);
  });
});
