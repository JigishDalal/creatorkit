/* =============================================
   app.js — Shared State, Mode Switching,
   Undo/Redo, Dark Mode, Utilities
   ============================================= */
'use strict';

/* -------- Global App State -------- */
var APP = {
  mode: 'poster',
  theme: 'dark'
};

/* -------- Text Scale State -------- */
var POSTER_TEXT_SCALE = 100;  // percent, 50–200
var CAROUSEL_TEXT_SCALE = 100;

function adjustPosterScale(delta) {
  POSTER_TEXT_SCALE = Math.min(200, Math.max(50, POSTER_TEXT_SCALE + delta));
  updateScaleUI('poster');
  if (typeof posterChanged === 'function') posterChanged();
}

function adjustCarouselScale(delta) {
  CAROUSEL_TEXT_SCALE = Math.min(200, Math.max(50, CAROUSEL_TEXT_SCALE + delta));
  updateScaleUI('carousel');
  if (typeof carouselChanged === 'function') carouselChanged();
}

function updateScaleUI(mode) {
  if (mode === 'poster') {
    var pct = POSTER_TEXT_SCALE;
    $('pTextScaleLabel').textContent = pct + '%';
    // fill: map 50-200 range to 0-100% visually
    $('pScaleFill').style.width = ((pct - 50) / 150 * 100) + '%';
  } else {
    var pct = CAROUSEL_TEXT_SCALE;
    $('cTextScaleLabel').textContent = pct + '%';
    $('cScaleFill').style.width = ((pct - 50) / 150 * 100) + '%';
  }
}


/* -------- DOM Helpers -------- */
function $(id) { return document.getElementById(id); }
function qs(sel) { return document.querySelector(sel); }

/* -------- Toast -------- */
var _toastTimer = null;
function showToast(msg) {
  var el = $('toast');
  el.textContent = msg;
  el.classList.add('on');
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(function() { el.classList.remove('on'); }, 2600);
}

/* -------- Debounce -------- */
function debounce(fn, ms) {
  var t;
  return function() {
    var args = arguments;
    clearTimeout(t);
    t = setTimeout(function() { fn.apply(null, args); }, ms);
  };
}

/* -------- Theme Toggle -------- */
function toggleTheme() {
  APP.theme = APP.theme === 'dark' ? 'light' : 'dark';
  applyTheme();
  localStorage.setItem('ck-theme', APP.theme);
}
function applyTheme() {
  document.documentElement.setAttribute('data-theme', APP.theme);
  $('themeIcon').textContent = APP.theme === 'dark' ? '☀️' : '🌙';
}
(function initTheme() {
  var saved = localStorage.getItem('ck-theme');
  APP.theme = saved || 'dark';
  applyTheme();
})();

/* -------- Mode Switching -------- */
function switchMode(mode) {
  APP.mode = mode;
  // Tabs
  document.querySelectorAll('.tab-btn').forEach(function(btn) {
    var isActive = btn.dataset.mode === mode;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
  });
  // Panels
  $('posterMode').classList.toggle('hidden', mode !== 'poster');
  $('carouselMode').classList.toggle('hidden', mode !== 'carousel');
  if ($('appStoreMode')) $('appStoreMode').classList.toggle('hidden', mode !== 'appstore');
  if ($('bgRemoverMode')) $('bgRemoverMode').classList.toggle('hidden', mode !== 'bgremover');
  if ($('infographicMode')) $('infographicMode').classList.toggle('hidden', mode !== 'infographic');
  if ($('invoiceMode')) $('invoiceMode').classList.toggle('hidden', mode !== 'invoice');
  // Download bar
  $('posterDlControls').classList.toggle('hidden', mode !== 'poster');
  $('carouselDlControls').classList.toggle('hidden', mode !== 'carousel');
  if ($('appStoreDlControls')) $('appStoreDlControls').classList.toggle('hidden', mode !== 'appstore');
  if ($('bgRemoverDlControls')) $('bgRemoverDlControls').classList.toggle('hidden', mode !== 'bgremover');
  if ($('infographicDlControls')) $('infographicDlControls').classList.toggle('hidden', mode !== 'infographic');
  if ($('invoiceDlControls')) $('invoiceDlControls').classList.toggle('hidden', mode !== 'invoice');
  $('dlBarKey').textContent = mode === 'poster' ? 'Poster' : mode === 'carousel' ? 'Carousel' : mode === 'appstore' ? 'Store Posters' : mode === 'infographic' ? 'Infographic' : mode === 'invoice' ? 'Invoice Studio' : 'BG Remover';
  
  // Trigger active mode render
  if (mode === 'poster' && typeof posterChanged === 'function') {
    posterChanged();
  } else if (mode === 'infographic' && typeof renderInfographic === 'function') {
    renderInfographic();
  } else if (mode === 'invoice' && typeof renderInvoice === 'function') {
    renderInvoice();
  } else if (mode === 'appstore' && typeof renderAppStorePreviews === 'function') {
    renderAppStorePreviews();
  }
  
  // Update bar label
  updateBarLabel();
}

function updateBarLabel() {
  if (APP.mode === 'poster') {
    var txt = ($('pMain').value || '').trim();
    $('dlBarVal').textContent = txt || 'Write something above';
  } else if (APP.mode === 'carousel') {
    var slides = window.CAROUSEL_SLIDES || [];
    $('dlBarVal').textContent = slides.length
      ? slides.length + ' slide' + (slides.length > 1 ? 's' : '') + ' ready'
      : 'Paste some text to start';
  } else if (APP.mode === 'appstore') {
    if (typeof APP_STORE_STATE !== 'undefined') {
      var count = APP_STORE_STATE.screens.length;
      var preset = STORE_PRESETS[APP_STORE_STATE.preset];
      $('dlBarVal').textContent = count + ' screen' + (count > 1 ? 's' : '') + ' • ' + (preset ? preset.name : '');
    } else {
      $('dlBarVal').textContent = 'Design store posters';
    }
  } else if (APP.mode === 'infographic') {
    var infoTitle = (typeof INFOGRAPHIC_STATE !== 'undefined' && INFOGRAPHIC_STATE.title) ? INFOGRAPHIC_STATE.title : 'Comparison Graphic';
    $('dlBarVal').textContent = infoTitle + ' • 5 Templates';
  } else if (APP.mode === 'invoice') {
    if (typeof INVOICE_STATE !== 'undefined') {
      var totals = typeof calculateInvoiceTotals === 'function' ? calculateInvoiceTotals() : { grandTotal: 0 };
      $('dlBarVal').textContent = (INVOICE_STATE.docType || 'INVOICE') + ' ' + (INVOICE_STATE.docNumber || '') + ' • ' + (INVOICE_STATE.currency || '$') + totals.grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    } else {
      $('dlBarVal').textContent = 'Invoice & Quotation Studio';
    }
  } else if (APP.mode === 'bgremover') {
    if (typeof BG_STATE !== 'undefined' && BG_STATE.processedImage) {
      $('dlBarVal').textContent = 'Cutout ready (' + (BG_STATE.activeBgColor === 'transparent' ? 'Transparent PNG' : 'Custom Backdrop') + ')';
    } else if (typeof BG_STATE !== 'undefined' && BG_STATE.originalImage) {
      $('dlBarVal').textContent = 'Image loaded — click Remove Background';
    } else {
      $('dlBarVal').textContent = 'Upload or drop a photo';
    }
  }
}

/* -------- Undo / Redo -------- */
function makeUndoSystem(undoBtnId, redoBtnId) {
  var history = [];
  var idx = -1;
  var MAX = 20;

  function updateBtns() {
    $(undoBtnId).disabled = idx <= 0;
    $(redoBtnId).disabled = idx >= history.length - 1;
  }

  function push(state) {
    // trim forward history
    history = history.slice(0, idx + 1);
    history.push(JSON.parse(JSON.stringify(state)));
    if (history.length > MAX) history.shift();
    idx = history.length - 1;
    updateBtns();
  }

  function undo(applyFn) {
    if (idx > 0) { idx--; applyFn(JSON.parse(JSON.stringify(history[idx]))); updateBtns(); }
  }

  function redo(applyFn) {
    if (idx < history.length - 1) { idx++; applyFn(JSON.parse(JSON.stringify(history[idx]))); updateBtns(); }
  }

  function reset() { history = []; idx = -1; updateBtns(); }

  return { push: push, undo: undo, redo: redo, reset: reset };
}

/* -------- Poster Undo/Redo -------- */
var posterHistory = makeUndoSystem('posterUndoBtn', 'posterRedoBtn');

function getPosterState() {
  return {
    top: $('pTop').value,
    main: $('pMain').value,
    bottom: $('pBottom').value,
    size: $('pSize').value,
    font: $('pFont').value,
    pos: $('pPos').value,
    textColor: $('pTextColor').value,
    bgColor: $('pBgColor').value,
    style: window.POSTER_STYLE || 'clean'
  };
}

function applyPosterState(s) {
  $('pTop').value = s.top || '';
  $('pMain').value = s.main || '';
  $('pBottom').value = s.bottom || '';
  $('pSize').value = s.size || '1080,1350';
  $('pFont').value = s.font || '';
  $('pPos').value = s.pos || '';
  $('pTextColor').value = s.textColor || '#ffffff';
  $('pBgColor').value = s.bgColor || '#111111';
  updateColorLabels();
  if (typeof selectPosterStyle === 'function' && s.style) selectPosterStyle(s.style);
  if (typeof renderPoster === 'function') renderPoster();
}

function posterUndo() {
  posterHistory.undo(applyPosterState);
}
function posterRedo() {
  posterHistory.redo(applyPosterState);
}

/* -------- Carousel Undo/Redo -------- */
var carouselHistory = makeUndoSystem('carouselUndoBtn', 'carouselRedoBtn');

function getCarouselState() {
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
    theme: window.CAROUSEL_THEME || 0,
    accent: window.CAROUSEL_ACCENT || '#7C6EFA'
  };
}

function applyCarouselState(s) {
  $('cCopy').value = s.copy || '';
  $('cHook').value = s.hook || '';
  $('cCta').value = s.cta || '';
  $('cHandle').value = s.handle || '';
  $('cRatio').value = s.ratio || '4x5';
  $('cTypeface').value = s.typeface || 'inter';
  $('cIcon').value = s.icon || '•';
  $('cGraphic').value = s.graphic || 'none';
  $('cImgMode').value = s.imgMode || 'top';
  $('cProgress').value = s.progress || 'segments';
  window.CAROUSEL_THEME = s.theme || 0;
  window.CAROUSEL_ACCENT = s.accent || '#7C6EFA';
  if (typeof renderCarousel === 'function') renderCarousel();
}

function carouselUndo() {
  carouselHistory.undo(applyCarouselState);
}
function carouselRedo() {
  carouselHistory.redo(applyCarouselState);
}

/* -------- Color Label Sync -------- */
function updateColorLabels() {
  var tc = $('pTextColor').value;
  var bc = $('pBgColor').value;
  $('pTextColorLabel').textContent = tc;
  $('pBgColorLabel').textContent = bc;
}
$('pTextColor').addEventListener('input', updateColorLabels);
$('pBgColor').addEventListener('input', updateColorLabels);

/* -------- Keyboard shortcuts -------- */
document.addEventListener('keydown', function(e) {
  var isMac = navigator.platform.indexOf('Mac') >= 0;
  var ctrl = isMac ? e.metaKey : e.ctrlKey;
  if (!ctrl) return;
  if (e.key === 'z') {
    e.preventDefault();
    if (APP.mode === 'poster') posterUndo();
    else carouselUndo();
  } else if (e.key === 'y') {
    e.preventDefault();
    if (APP.mode === 'poster') posterRedo();
    else carouselRedo();
  }
});

/* -------- Poster Image Upload -------- */
var POSTER_BG_IMAGE = null;

function loadPosterImage(input) {
  if (!input.files || !input.files[0]) return;
  var file = input.files[0];
  var reader = new FileReader();
  reader.onload = function(e) {
    var img = new Image();
    img.onload = function() {
      POSTER_BG_IMAGE = img;
      $('pClearImgWrap').style.display = 'block';
      $('pBgImgHint').textContent = '✓ Image loaded. It will appear as poster background.';
      if (typeof renderPoster === 'function') renderPoster();
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function clearPosterImage() {
  POSTER_BG_IMAGE = null;
  $('pBgImg').value = '';
  $('pClearImgWrap').style.display = 'none';
  $('pBgImgHint').textContent = 'Upload a photo to use as the poster background.';
  if (typeof renderPoster === 'function') renderPoster();
}

/* -------- Download: Poster -------- */
function downloadPoster() {
  var fmt = $('pFmt').value;
  var canvas = $('posterBig');
  if (!canvas) return;

  if (fmt === 'svg') {
    // Wrap canvas PNG in SVG
    var dataUrl = canvas.toDataURL('image/png');
    var W = canvas.width, H = canvas.height;
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="' + W + '" height="' + H + '">'
      + '<image width="' + W + '" height="' + H + '" xlink:href="' + dataUrl + '"/>'
      + '</svg>';
    var blob = new Blob([svg], { type: 'image/svg+xml' });
    triggerDownload(URL.createObjectURL(blob), 'poster.svg');
  } else if (fmt === 'jpg') {
    canvas.toBlob(function(blob) {
      triggerDownload(URL.createObjectURL(blob), 'poster.jpg');
    }, 'image/jpeg', 0.92);
  } else {
    canvas.toBlob(function(blob) {
      triggerDownload(URL.createObjectURL(blob), 'poster.png');
    }, 'image/png');
  }
  showToast('✓ Downloading poster…');
}

/* -------- Download: Carousel ZIP -------- */
function downloadCarouselZip() {
  var canvases = document.querySelectorAll('#carouselDeck canvas');
  if (!canvases.length) { showToast('No slides to download'); return; }
  if (typeof JSZip === 'undefined') { showToast('Loading ZIP library…'); return; }

  var zip = new JSZip();
  var folder = zip.folder('carousel');
  var promises = [];

  canvases.forEach(function(canvas, i) {
    promises.push(new Promise(function(res) {
      canvas.toBlob(function(blob) {
        folder.file('slide-' + String(i + 1).padStart(2, '0') + '.png', blob);
        res();
      }, 'image/png');
    }));
  });

  Promise.all(promises).then(function() {
    return zip.generateAsync({ type: 'blob' });
  }).then(function(blob) {
    triggerDownload(URL.createObjectURL(blob), 'carousel.zip');
    showToast('✓ ZIP downloaded!');
  });
}

/* -------- Download: Carousel PDF -------- */
function downloadCarouselPDF() {
  var canvases = document.querySelectorAll('#carouselDeck canvas');
  if (!canvases.length) { showToast('No slides to export'); return; }
  if (typeof window.jspdf === 'undefined') { showToast('Loading PDF library…'); return; }

  var jsPDF = window.jspdf.jsPDF;
  var first = canvases[0];
  var W = first.width, H = first.height;
  var mmW = 210, mmH = Math.round(H / W * 210); // A4-ish width
  var pdf = new jsPDF({ orientation: W > H ? 'landscape' : 'portrait', unit: 'mm', format: [mmW, mmH] });

  canvases.forEach(function(canvas, i) {
    if (i > 0) pdf.addPage([mmW, mmH]);
    var data = canvas.toDataURL('image/jpeg', 0.92);
    pdf.addImage(data, 'JPEG', 0, 0, mmW, mmH);
  });

  pdf.save('carousel.pdf');
  showToast('✓ PDF saved!');
}

/* -------- Trigger file download -------- */
function triggerDownload(url, filename) {
  var a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(function() {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 500);
}

/* -------- Init -------- */
document.addEventListener('DOMContentLoaded', function() {
  updateColorLabels();
  if (typeof initBgRemover === 'function') initBgRemover();
  if (typeof initAppStore === 'function') initAppStore();
  if (typeof initBrandKit === 'function') initBrandKit();
  if (typeof initInfographics === 'function') initInfographics();
  if (typeof initInvoiceStudio === 'function') initInvoiceStudio();
  switchMode('poster');
});
