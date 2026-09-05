/* =============================================
   resizer.js — Multi-Platform Auto-Resizer
   Cross-Post Hub for IG, LinkedIn, X/Twitter, Stories
   ============================================= */
'use strict';

var RESIZER_PLATFORMS = [
  {
    key: 'ig_portrait',
    name: 'Instagram Portrait',
    badge: '4:5',
    width: 1080,
    height: 1350,
    icon: '📸',
    desc: 'Highest engagement for Instagram & LinkedIn feeds'
  },
  {
    key: 'square',
    name: 'Square Post',
    badge: '1:1',
    width: 1080,
    height: 1080,
    icon: '🔲',
    desc: 'Standard feed square for Instagram, LinkedIn, and Facebook'
  },
  {
    key: 'story_reel',
    name: 'Story / Reel / TikTok',
    badge: '9:16',
    width: 1080,
    height: 1920,
    icon: '📱',
    desc: 'Full-screen vertical stories, reels, and mobile status'
  },
  {
    key: 'twitter_card',
    name: 'Twitter / X Card',
    badge: '16:9',
    width: 1200,
    height: 675,
    icon: '🐦',
    desc: 'Optimized landscape banner for Twitter/X timelines'
  },
  {
    key: 'pinterest_pin',
    name: 'Pinterest Pin',
    badge: '2:3',
    width: 1000,
    height: 1500,
    icon: '📌',
    desc: 'Tall vertical pin layout for Pinterest search'
  }
];

var RESIZER_STATE = {
  sourceType: 'poster', // 'poster' or 'infographic'
  renderedCanvases: {}
};

/* Open Resizer Modal */
function openResizerModal(sourceType) {
  RESIZER_STATE.sourceType = sourceType || APP.mode || 'poster';
  var modal = $('resizerModal');
  if (!modal) return;

  var sourceCanvas = RESIZER_STATE.sourceType === 'infographic'
    ? $('infographicCanvas')
    : $('posterBig');

  if (!sourceCanvas) {
    showToast('Please create a design first!');
    return;
  }

  modal.classList.remove('hidden');
  renderAllResizerPreviews(sourceCanvas);
}

function closeResizerModal() {
  var modal = $('resizerModal');
  if (modal) modal.classList.add('hidden');
}

/* Render all platform previews */
function renderAllResizerPreviews(sourceCanvas) {
  var grid = $('resizerGrid');
  if (!grid) return;
  grid.innerHTML = '';
  RESIZER_STATE.renderedCanvases = {};

  RESIZER_PLATFORMS.forEach(function(plat) {
    // Generate scaled canvas
    var targetCanvas = document.createElement('canvas');
    targetCanvas.width = plat.width;
    targetCanvas.height = plat.height;
    var ctx = targetCanvas.getContext('2d');

    smartReflowCanvas(ctx, sourceCanvas, plat.width, plat.height);
    RESIZER_STATE.renderedCanvases[plat.key] = targetCanvas;

    // Build DOM card
    var card = document.createElement('div');
    card.className = 'resizer-card';
    card.innerHTML =
      '<div class="resizer-card-hd">' +
        '<div class="resizer-card-title">' +
          '<span class="resizer-icon">' + plat.icon + '</span>' +
          '<div>' +
            '<div style="font-weight:600; font-size:13px; color:var(--ink)">' + plat.name + '</div>' +
            '<div style="font-size:11px; color:var(--mut)">' + plat.width + ' × ' + plat.height + ' px (' + plat.badge + ')</div>' +
          '</div>' +
        '</div>' +
        '<button class="btn btn-ghost btn-sm" onclick="downloadSingleResized(\'' + plat.key + '\')" title="Download this size">↓ Download</button>' +
      '</div>' +
      '<div class="resizer-canvas-preview-wrap">' +
        '<img src="' + targetCanvas.toDataURL('image/jpeg', 0.85) + '" class="resizer-preview-img" alt="' + plat.name + '">' +
      '</div>' +
      '<div style="font-size:11px; color:var(--mut); padding:0 10px 10px 10px">' + plat.desc + '</div>';

    grid.appendChild(card);
  });
}

/* Smart Reflow Algorithm: Fit source canvas seamlessly inside target dimensions */
function smartReflowCanvas(ctx, sourceCanvas, targetW, targetH) {
  var srcW = sourceCanvas.width;
  var srcH = sourceCanvas.height;

  // 1. Sample dominant background color from edge
  var srcCtx = sourceCanvas.getContext('2d');
  var edgePixel = srcCtx.getImageData(10, 10, 1, 1).data;
  var bgColor = 'rgb(' + edgePixel[0] + ',' + edgePixel[1] + ',' + edgePixel[2] + ')';

  // Fill background
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, targetW, targetH);

  // 2. Calculate aspect fit / cover
  var scale = Math.min(targetW / srcW, targetH / srcH);
  var drawW = srcW * scale;
  var drawH = srcH * scale;
  var drawX = (targetW - drawW) / 2;
  var drawY = (targetH - drawH) / 2;

  // Soft subtle ambient background blur for wide/tall aspect padding
  if (drawW < targetW || drawH < targetH) {
    ctx.save();
    ctx.filter = 'blur(40px) brightness(0.7)';
    ctx.drawImage(sourceCanvas, -targetW * 0.1, -targetH * 0.1, targetW * 1.2, targetH * 1.2);
    ctx.restore();

    // Darkening veil for ambient blur
    ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
    ctx.fillRect(0, 0, targetW, targetH);
  }

  // Draw scaled artwork with shadow
  ctx.save();
  ctx.shadowColor = 'rgba(0,0,0,0.4)';
  ctx.shadowBlur = 24;
  ctx.shadowOffsetY = 8;
  ctx.drawImage(sourceCanvas, drawX, drawY, drawW, drawH);
  ctx.restore();
}

/* Download single resized image */
function downloadSingleResized(platKey) {
  var canvas = RESIZER_STATE.renderedCanvases[platKey];
  var plat = RESIZER_PLATFORMS.find(function(p) { return p.key === platKey; });
  if (!canvas || !plat) return;

  var link = document.createElement('a');
  link.download = platKey + '-' + plat.width + 'x' + plat.height + '.png';
  link.href = canvas.toDataURL('image/png');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showToast('✓ ' + plat.name + ' downloaded!');
}

/* Download All Sizes in a ZIP archive */
function downloadAllResizedZip() {
  if (typeof JSZip === 'undefined') {
    showToast('Loading ZIP archive creator...');
    return;
  }

  var zip = new JSZip();
  var folder = zip.folder('creatorkit-social-pack');

  RESIZER_PLATFORMS.forEach(function(plat, idx) {
    var canvas = RESIZER_STATE.renderedCanvases[plat.key];
    if (canvas) {
      var dataUrl = canvas.toDataURL('image/png');
      var base64 = dataUrl.replace(/^data:image\/png;base64,/, '');
      var filename = (idx + 1) + '-' + plat.key + '-' + plat.width + 'x' + plat.height + '.png';
      folder.file(filename, base64, { base64: true });
    }
  });

  zip.generateAsync({ type: 'blob' }).then(function(content) {
    var link = document.createElement('a');
    link.download = 'creatorkit-social-pack-' + Date.now() + '.zip';
    link.href = URL.createObjectURL(content);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('✓ All social sizes downloaded as ZIP!');
  });
}
