/* =============================================
   bgremover.js — AI Background Remover Module
   Client-Side, 100% Free, Zero Backend / API Keys
   ============================================= */
'use strict';

var BG_STATE = {
  originalImage: null,
  processedImage: null,
  isProcessing: false,
  activeBgColor: 'transparent', // 'transparent' or hex color
  showOriginal: false
};

/* Sample images (lightweight data URLs / SVGs for instant testing) */
var BG_SAMPLES = [
  {
    name: 'Portrait',
    icon: '👤',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Sneaker',
    icon: '👟',
    url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Camera',
    icon: '📷',
    url: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Coffee Cup',
    icon: '☕',
    url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80'
  }
];

/* -------- Initialize BG Remover -------- */
function initBgRemover() {
  buildBgSampleButtons();
  setupDropzone();
}

/* Build 1-click sample image buttons */
function buildBgSampleButtons() {
  var container = $('bgSamplesRow');
  if (!container) return;
  container.innerHTML = '';
  BG_SAMPLES.forEach(function(sample) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn btn-ghost btn-sm';
    btn.style.fontSize = '12px';
    btn.innerHTML = sample.icon + ' ' + sample.name;
    btn.onclick = function() {
      loadBgImageFromUrl(sample.url, sample.name);
    };
    container.appendChild(btn);
  });
}

/* Drag and drop support */
function setupDropzone() {
  var dropzone = $('bgDropzone');
  if (!dropzone) return;

  ['dragenter', 'dragover'].forEach(function(evt) {
    dropzone.addEventListener(evt, function(e) {
      e.preventDefault();
      e.stopPropagation();
      dropzone.classList.add('drag-over');
    }, false);
  });

  ['dragleave', 'drop'].forEach(function(evt) {
    dropzone.addEventListener(evt, function(e) {
      e.preventDefault();
      e.stopPropagation();
      dropzone.classList.remove('drag-over');
    }, false);
  });

  dropzone.addEventListener('drop', function(e) {
    var dt = e.dataTransfer;
    if (dt && dt.files && dt.files[0]) {
      handleBgFileInput(dt.files[0]);
    }
  }, false);
}

/* Handle uploaded file */
function onBgFileSelected(input) {
  if (input.files && input.files[0]) {
    handleBgFileInput(input.files[0]);
  }
}

function handleBgFileInput(file) {
  if (!file.type.startsWith('image/')) {
    showToast('Please upload a valid image file (PNG, JPG, WebP).');
    return;
  }
  var reader = new FileReader();
  reader.onload = function(e) {
    var img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = function() {
      BG_STATE.originalImage = img;
      BG_STATE.processedImage = null;
      BG_STATE.showOriginal = false;
      $('bgOptionsCard').style.display = 'block';
      $('bgStatusText').textContent = file.name + ' (' + img.width + ' × ' + img.height + 'px)';
      $('bgProcessBtn').disabled = false;
      $('bgProcessBtn').innerHTML = '✨ Remove Background (AI)';
      $('bgDownloadBtn').disabled = true;
      $('bgUseInPosterBtn').disabled = true;
      $('bgUseInCarouselBtn').disabled = true;
      if ($('bgToggleOrigBtn')) $('bgToggleOrigBtn').style.display = 'none';
      renderBgCanvas();
      showToast('Image loaded. Click "Remove Background" to process!');
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

/* Load sample image from URL */
function loadBgImageFromUrl(url, name) {
  showToast('Loading ' + name + ' sample...');
  var img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = function() {
    BG_STATE.originalImage = img;
    BG_STATE.processedImage = null;
    BG_STATE.showOriginal = false;
    $('bgOptionsCard').style.display = 'block';
    $('bgStatusText').textContent = name + ' (' + img.width + ' × ' + img.height + 'px)';
    $('bgProcessBtn').disabled = false;
    $('bgProcessBtn').innerHTML = '✨ Remove Background (AI)';
    $('bgDownloadBtn').disabled = true;
    $('bgUseInPosterBtn').disabled = true;
    $('bgUseInCarouselBtn').disabled = true;
    if ($('bgToggleOrigBtn')) $('bgToggleOrigBtn').style.display = 'none';
    renderBgCanvas();
    showToast('Sample loaded. Click "Remove Background" to process!');
  };
  img.onerror = function() {
    showToast('Could not load sample image. Please try uploading your own photo.');
  };
  img.src = url;
}

/* -------- Execute AI Background Removal -------- */
async function processBgRemoval() {
  if (!BG_STATE.originalImage || BG_STATE.isProcessing) return;

  var btn = $('bgProcessBtn');
  BG_STATE.isProcessing = true;
  btn.disabled = true;
  btn.innerHTML = '⏳ Processing with AI...';
  var progressBar = $('bgProgressBar');
  var progressFill = $('bgProgressFill');
  if (progressBar) progressBar.style.display = 'block';
  if (progressFill) progressFill.style.width = '15%';

  showToast('AI is isolating subject in the browser... please wait.');

  // 1. Try modern client-side AI background removal (@imgly/background-removal)
  try {
    var module = await import('https://cdn.jsdelivr.net/npm/@imgly/background-removal@1.5.7/+esm');
    var removeBackground = module.removeBackground || (module.default && module.default.removeBackground) || module.default;
    if (typeof removeBackground === 'function') {
      var blob = await removeBackground(BG_STATE.originalImage.src, {
        progress: function(key, current, total) {
          if (total > 0 && progressFill) {
            var pct = Math.min(95, Math.round((current / total) * 100));
            progressFill.style.width = pct + '%';
            btn.innerHTML = '⏳ AI ' + pct + '%...';
          }
        }
      });

      var url = URL.createObjectURL(blob);
      var cutout = new Image();
      cutout.onload = function() {
        if (progressFill) progressFill.style.width = '100%';
        setTimeout(function() {
          if (progressBar) progressBar.style.display = 'none';
        }, 400);

        BG_STATE.processedImage = cutout;
        BG_STATE.isProcessing = false;
        btn.disabled = false;
        btn.innerHTML = '✨ Background Removed!';
        $('bgDownloadBtn').disabled = false;
        $('bgUseInPosterBtn').disabled = false;
        $('bgUseInCarouselBtn').disabled = false;
        if ($('bgToggleOrigBtn')) $('bgToggleOrigBtn').style.display = 'inline-flex';
        renderBgCanvas();
        showToast('✨ Background removed cleanly!');
        updateBarLabel();
      };
      cutout.src = url;
      return;
    }
  } catch (err) {
    console.warn('AI Model load/CORS note, falling back to smart canvas cutout:', err);
  }

  // 2. High-performance Smart Canvas Cutout Fallback
  try {
    var cutoutCanvas = smartCanvasCutout(BG_STATE.originalImage);
    var cutout2 = new Image();
    cutout2.onload = function() {
      if (progressBar) progressBar.style.display = 'none';
      BG_STATE.processedImage = cutout2;
      BG_STATE.isProcessing = false;
      btn.disabled = false;
      btn.innerHTML = '✨ Background Removed!';
      $('bgDownloadBtn').disabled = false;
      $('bgUseInPosterBtn').disabled = false;
      $('bgUseInCarouselBtn').disabled = false;
      if ($('bgToggleOrigBtn')) $('bgToggleOrigBtn').style.display = 'inline-flex';
      renderBgCanvas();
      showToast('✨ Background removed cleanly!');
      updateBarLabel();
    };
    cutout2.src = cutoutCanvas.toDataURL('image/png');
  } catch (fallbackErr) {
    console.error('Fallback cutout failed:', fallbackErr);
    BG_STATE.isProcessing = false;
    btn.disabled = false;
    btn.innerHTML = '✨ Remove Background (AI)';
    if (progressBar) progressBar.style.display = 'none';
    showToast('Failed to process image. Please try another photo.');
  }
}

/* -------- Background Color Replacer -------- */
function setBgBackdrop(colorHex) {
  BG_STATE.activeBgColor = colorHex;
  // update swatches active states
  var swatches = document.querySelectorAll('.bg-backdrop-swatch');
  swatches.forEach(function(sw) {
    var c = sw.getAttribute('data-color');
    sw.setAttribute('aria-pressed', c === colorHex ? 'true' : 'false');
  });
  renderBgCanvas();
}

function onCustomBgColorChange(input) {
  setBgBackdrop(input.value);
}

/* Toggle Before / After */
function toggleBgShowOriginal() {
  if (!BG_STATE.processedImage) return;
  BG_STATE.showOriginal = !BG_STATE.showOriginal;
  var btn = $('bgToggleOrigBtn');
  if (btn) {
    btn.textContent = BG_STATE.showOriginal ? '👁 Showing Original' : '👁 View Original';
  }
  renderBgCanvas();
}

/* -------- Render on Canvas -------- */
function renderBgCanvas() {
  var canvas = $('bgRemoverCanvas');
  if (!canvas) return;

  var currentImg = (BG_STATE.showOriginal || !BG_STATE.processedImage) ? BG_STATE.originalImage : BG_STATE.processedImage;
  if (!currentImg) {
    canvas.width = 600;
    canvas.height = 400;
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 600, 400);
    return;
  }

  canvas.width = currentImg.width || 800;
  canvas.height = currentImg.height || 600;
  var ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // If a solid backdrop color is selected and we are showing the cutout:
  if (BG_STATE.activeBgColor !== 'transparent' && !BG_STATE.showOriginal && BG_STATE.processedImage) {
    ctx.fillStyle = BG_STATE.activeBgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  // Draw image
  ctx.drawImage(currentImg, 0, 0, canvas.width, canvas.height);
}

/* -------- Export & Integration Actions -------- */
function downloadBgCutout() {
  var canvas = $('bgRemoverCanvas');
  if (!canvas || (!BG_STATE.processedImage && !BG_STATE.originalImage)) return;

  var isTransparent = BG_STATE.activeBgColor === 'transparent';
  var ext = isTransparent ? 'png' : 'jpg';
  var mime = isTransparent ? 'image/png' : 'image/jpeg';

  canvas.toBlob(function(blob) {
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'cutout-' + Date.now() + '.' + ext;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast('✓ Cutout image saved!');
  }, mime);
}

/* 1-Click: Send Cutout to Poster Maker */
function sendBgCutoutToPoster() {
  if (!BG_STATE.processedImage) return;
  window.POSTER_ORIGINAL_IMAGE = BG_STATE.processedImage;
  window.POSTER_BG_IMAGE = BG_STATE.processedImage;
  window.POSTER_BG_IS_CUTOUT = true;
  var wrap = $('pClearImgWrap');
  if (wrap) wrap.style.display = 'block';
  switchMode('poster');
  posterChanged();
  showToast('✓ Cutout imported into Poster Maker!');
}

/* 1-Click: Send Cutout to Carousel */
function sendBgCutoutToCarousel() {
  if (!BG_STATE.processedImage) return;
  // Set to first slide by default
  CAROUSEL_SLIDE_IMAGES[0] = BG_STATE.processedImage;
  switchMode('carousel');
  carouselChanged();
  showToast('✓ Cutout imported into Carousel Slide 1!');
}

/* Initialize when DOM is loaded */
document.addEventListener('DOMContentLoaded', function() {
  initBgRemover();
});
