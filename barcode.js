/* =============================================
   barcode.js — Clean Barcode & QR Code Studio
   100% Client-Side, Zero Backend, Privacy First
   ============================================= */
'use strict';

/* Standard Print & Thermal Label Dimensions (in millimeters) */
var BARCODE_PRINT_SIZES = {
  '50x25': { name: '50 × 25 mm (2" × 1" — Thermal Sticker)', w: 50, h: 25, type: 'label' },
  '50x30': { name: '50 × 30 mm (2" × 1.2" — Price Tag)', w: 50, h: 30, type: 'label' },
  '58x40': { name: '58 × 40 mm (POS Thermal Roll)', w: 58, h: 40, type: 'label' },
  '70x35': { name: '70 × 35 mm (2.75" × 1.4" — Apparel Hangtag)', w: 70, h: 35, type: 'label' },
  '100x50': { name: '100 × 50 mm (4" × 2" — Shelf / Bin Tag)', w: 100, h: 50, type: 'label' },
  'square_50': { name: '50 × 50 mm (2" × 2" — Square Sticker)', w: 50, h: 50, type: 'label' },
  'a4_24': { name: 'A4 Sheet Grid (24 Labels — 3 × 8)', w: 70, h: 36, type: 'sheet', cols: 3, rows: 8, sheetW: 210, sheetH: 297 },
  'custom': { name: 'Custom Size (mm)', w: 50, h: 30, type: 'custom' }
};

/* Global Barcode & QR State */
var BARCODE_STATE = {
  codeType: 'qrcode', // 'barcode' | 'qrcode'
  linkCategory: 'location', // 'location' | 'website' | 'instagram' | 'whatsapp' | 'wifi' | 'custom'
  dataToConvert: 'https://maps.google.com/?q=FreshMart+Supermarket',
  barcodeFormat: 'CODE128', // 'CODE128' | 'EAN13' | 'UPC' | 'CODE39' | 'EAN8'
  labelMode: 'shop_label', // 'only_code' | 'shop_label'
  
  // Specific link inputs
  locationUrl: 'https://maps.google.com/?q=FreshMart+Supermarket',
  websiteUrl: 'https://freshmart.com',
  instagramHandle: 'freshmart',
  whatsappPhone: '+15551234567',
  whatsappMsg: 'Hello! I would like to order.',
  wifiSsid: 'FreshMart_Guest',
  wifiPass: 'fresh123',
  
  // Shop & Location Text shown on the label
  shopName: 'FreshMart Supermarket',
  locationText: '124 Main Street • Aisle 3',
  websiteText: 'www.freshmart.com',
  socialText: '@freshmart',
  itemOrPrice: 'Scan for Location & Store Hours',
  
  // Print & Dimension
  printSize: '50x30',
  customWidthMm: 50,
  customHeightMm: 30,
  
  // Styling
  displayValue: true,
  barColor: '#000000',
  bgColor: '#ffffff',
  accentColor: '#7C6EFA',
  fontFamily: 'Inter Tight',
  borderStyle: 'dashed', // 'dashed' | 'solid' | 'none'
  viewMode: 'single' // 'single' | 'sheet'
};

/* -------------------------------------------
   Initialization & Form Sync
   ------------------------------------------- */
function initBarcodeStudio() {
  loadBarcodeState();
  populateBarcodeForm();
  renderBarcode();
}

function saveBarcodeState() {
  try {
    localStorage.setItem('ck-barcode-clean-state-v2', JSON.stringify(BARCODE_STATE));
  } catch (e) {
    console.warn('Could not save barcode state:', e);
  }
}

function loadBarcodeState() {
  try {
    var saved = localStorage.getItem('ck-barcode-clean-state-v2');
    if (saved) {
      var parsed = JSON.parse(saved);
      Object.assign(BARCODE_STATE, parsed);
    }
  } catch (e) {
    console.warn('Could not load barcode state:', e);
  }
}

function populateBarcodeForm() {
  if ($('bcDataToConvert')) $('bcDataToConvert').value = BARCODE_STATE.dataToConvert || '';
  if ($('bcFormat')) $('bcFormat').value = BARCODE_STATE.barcodeFormat || 'CODE128';
  if ($('bcDisplayValue')) $('bcDisplayValue').checked = BARCODE_STATE.displayValue !== false;
  if ($('bcShopName')) $('bcShopName').value = BARCODE_STATE.shopName || '';
  if ($('bcLocation')) $('bcLocation').value = BARCODE_STATE.locationText || '';
  if ($('bcWebsiteText')) $('bcWebsiteText').value = BARCODE_STATE.websiteText || '';
  if ($('bcSocialText')) $('bcSocialText').value = BARCODE_STATE.socialText || '';
  if ($('bcItemOrPrice')) $('bcItemOrPrice').value = BARCODE_STATE.itemOrPrice || '';
  if ($('bcPrintSize')) $('bcPrintSize').value = BARCODE_STATE.printSize || '50x30';
  if ($('bcCustomW')) $('bcCustomW').value = BARCODE_STATE.customWidthMm || 50;
  if ($('bcCustomH')) $('bcCustomH').value = BARCODE_STATE.customHeightMm || 30;
  if ($('bcBorderStyle')) $('bcBorderStyle').value = BARCODE_STATE.borderStyle || 'dashed';

  // Category specific inputs
  if ($('bcLocInput')) $('bcLocInput').value = BARCODE_STATE.locationUrl || '';
  if ($('bcWebInput')) $('bcWebInput').value = BARCODE_STATE.websiteUrl || '';
  if ($('bcInstaInput')) $('bcInstaInput').value = BARCODE_STATE.instagramHandle || '';
  if ($('bcWaPhone')) $('bcWaPhone').value = BARCODE_STATE.whatsappPhone || '';
  if ($('bcWaMsg')) $('bcWaMsg').value = BARCODE_STATE.whatsappMsg || '';
  if ($('bcWifiSsid')) $('bcWifiSsid').value = BARCODE_STATE.wifiSsid || '';
  if ($('bcWifiPass')) $('bcWifiPass').value = BARCODE_STATE.wifiPass || '';

  updateCodeTypeButtonsUI();
  updateLinkCategoryUI();
  updateLabelModeButtonsUI();
  updateVisibilityUI();
}

function onBarcodeFieldChanged() {
  if ($('bcDataToConvert')) BARCODE_STATE.dataToConvert = $('bcDataToConvert').value.trim();
  if ($('bcFormat')) BARCODE_STATE.barcodeFormat = $('bcFormat').value;
  if ($('bcDisplayValue')) BARCODE_STATE.displayValue = $('bcDisplayValue').checked;
  if ($('bcShopName')) BARCODE_STATE.shopName = $('bcShopName').value;
  if ($('bcLocation')) BARCODE_STATE.locationText = $('bcLocation').value;
  if ($('bcWebsiteText')) BARCODE_STATE.websiteText = $('bcWebsiteText').value;
  if ($('bcSocialText')) BARCODE_STATE.socialText = $('bcSocialText').value;
  if ($('bcItemOrPrice')) BARCODE_STATE.itemOrPrice = $('bcItemOrPrice').value;
  if ($('bcPrintSize')) BARCODE_STATE.printSize = $('bcPrintSize').value;
  if ($('bcCustomW')) BARCODE_STATE.customWidthMm = parseFloat($('bcCustomW').value) || 50;
  if ($('bcCustomH')) BARCODE_STATE.customHeightMm = parseFloat($('bcCustomH').value) || 30;
  if ($('bcBorderStyle')) BARCODE_STATE.borderStyle = $('bcBorderStyle').value;

  updateVisibilityUI();
  saveBarcodeState();
  renderBarcode();
  if (typeof updateBarLabel === 'function') updateBarLabel();
}

/* -------------------------------------------
   Link Categories: Location, Website, Social, etc.
   ------------------------------------------- */
function selectLinkCategory(cat) {
  BARCODE_STATE.linkCategory = cat;

  if (cat === 'location') {
    BARCODE_STATE.codeType = 'qrcode';
    var loc = BARCODE_STATE.locationUrl || 'https://maps.google.com/?q=FreshMart+Supermarket';
    BARCODE_STATE.dataToConvert = loc;
  } else if (cat === 'website') {
    BARCODE_STATE.codeType = 'qrcode';
    var web = BARCODE_STATE.websiteUrl || 'https://freshmart.com';
    BARCODE_STATE.dataToConvert = web;
  } else if (cat === 'instagram') {
    BARCODE_STATE.codeType = 'qrcode';
    var handle = (BARCODE_STATE.instagramHandle || 'freshmart').replace('@', '');
    BARCODE_STATE.dataToConvert = 'https://instagram.com/' + handle;
  } else if (cat === 'whatsapp') {
    BARCODE_STATE.codeType = 'qrcode';
    var cleanPhone = (BARCODE_STATE.whatsappPhone || '15551234567').replace(/[^0-9]/g, '');
    var msg = encodeURIComponent(BARCODE_STATE.whatsappMsg || 'Hello!');
    BARCODE_STATE.dataToConvert = 'https://wa.me/' + cleanPhone + (msg ? ('?text=' + msg) : '');
  } else if (cat === 'wifi') {
    BARCODE_STATE.codeType = 'qrcode';
    var ssid = BARCODE_STATE.wifiSsid || 'StoreWiFi';
    var pass = BARCODE_STATE.wifiPass || 'pass123';
    BARCODE_STATE.dataToConvert = 'WIFI:T:WPA;S:' + ssid + ';P:' + pass + ';;';
  } else if (cat === 'custom') {
    // If custom text/barcode
    if (!BARCODE_STATE.dataToConvert || BARCODE_STATE.dataToConvert.startsWith('http') || BARCODE_STATE.dataToConvert.startsWith('WIFI:')) {
      BARCODE_STATE.dataToConvert = 'PRD-SHOP-890';
    }
  }

  if ($('bcDataToConvert')) $('bcDataToConvert').value = BARCODE_STATE.dataToConvert;
  updateCodeTypeButtonsUI();
  updateLinkCategoryUI();
  updateVisibilityUI();
  saveBarcodeState();
  renderBarcode();
  showToast('✓ Converted for ' + cat.toUpperCase());
}

function onLinkHelperChanged(cat) {
  if (cat === 'location') {
    var url = $('bcLocInput') ? $('bcLocInput').value.trim() : '';
    if (url && !url.startsWith('http')) {
      url = 'https://maps.google.com/?q=' + encodeURIComponent(url);
    }
    BARCODE_STATE.locationUrl = url;
    BARCODE_STATE.dataToConvert = url;
  } else if (cat === 'website') {
    var web = $('bcWebInput') ? $('bcWebInput').value.trim() : '';
    if (web && !web.startsWith('http://') && !web.startsWith('https://')) {
      web = 'https://' + web;
    }
    BARCODE_STATE.websiteUrl = web;
    BARCODE_STATE.dataToConvert = web;
    if ($('bcWebsiteText') && (!BARCODE_STATE.websiteText || BARCODE_STATE.websiteText.includes('freshmart'))) {
      BARCODE_STATE.websiteText = web.replace(/^https?:\/\//, '');
      $('bcWebsiteText').value = BARCODE_STATE.websiteText;
    }
  } else if (cat === 'instagram') {
    var handle = $('bcInstaInput') ? $('bcInstaInput').value.trim().replace('@', '') : '';
    BARCODE_STATE.instagramHandle = handle;
    BARCODE_STATE.dataToConvert = 'https://instagram.com/' + handle;
    if ($('bcSocialText')) {
      BARCODE_STATE.socialText = '@' + handle;
      $('bcSocialText').value = BARCODE_STATE.socialText;
    }
  } else if (cat === 'whatsapp') {
    var phone = $('bcWaPhone') ? $('bcWaPhone').value.trim().replace(/[^0-9]/g, '') : '';
    var msg = $('bcWaMsg') ? encodeURIComponent($('bcWaMsg').value.trim()) : '';
    BARCODE_STATE.whatsappPhone = phone;
    BARCODE_STATE.whatsappMsg = $('bcWaMsg') ? $('bcWaMsg').value : '';
    BARCODE_STATE.dataToConvert = 'https://wa.me/' + phone + (msg ? ('?text=' + msg) : '');
  } else if (cat === 'wifi') {
    var ssid = $('bcWifiSsid') ? $('bcWifiSsid').value.trim() : 'StoreWiFi';
    var pass = $('bcWifiPass') ? $('bcWifiPass').value.trim() : '';
    BARCODE_STATE.wifiSsid = ssid;
    BARCODE_STATE.wifiPass = pass;
    BARCODE_STATE.dataToConvert = 'WIFI:T:WPA;S:' + ssid + ';P:' + pass + ';;';
  }

  if ($('bcDataToConvert')) $('bcDataToConvert').value = BARCODE_STATE.dataToConvert;
  saveBarcodeState();
  renderBarcode();
}

function updateLinkCategoryUI() {
  var cat = BARCODE_STATE.linkCategory || 'location';
  var chips = ['chipLinkLoc', 'chipLinkWeb', 'chipLinkWa', 'chipLinkInsta', 'chipLinkWifi', 'chipLinkText'];
  chips.forEach(function(id) {
    if ($(id)) $(id).classList.remove('active');
  });

  if (cat === 'location' && $('chipLinkLoc')) $('chipLinkLoc').classList.add('active');
  if (cat === 'website' && $('chipLinkWeb')) $('chipLinkWeb').classList.add('active');
  if (cat === 'whatsapp' && $('chipLinkWa')) $('chipLinkWa').classList.add('active');
  if (cat === 'instagram' && $('chipLinkInsta')) $('chipLinkInsta').classList.add('active');
  if (cat === 'wifi' && $('chipLinkWifi')) $('chipLinkWifi').classList.add('active');
  if (cat === 'custom' && $('chipLinkText')) $('chipLinkText').classList.add('active');

  // Toggle helper panels
  var panels = ['helperLoc', 'helperWeb', 'helperWa', 'helperInsta', 'helperWifi'];
  panels.forEach(function(id) {
    if ($(id)) $(id).style.display = 'none';
  });

  if (cat === 'location' && $('helperLoc')) $('helperLoc').style.display = 'block';
  if (cat === 'website' && $('helperWeb')) $('helperWeb').style.display = 'block';
  if (cat === 'whatsapp' && $('helperWa')) $('helperWa').style.display = 'block';
  if (cat === 'instagram' && $('helperInsta')) $('helperInsta').style.display = 'block';
  if (cat === 'wifi' && $('helperWifi')) $('helperWifi').style.display = 'block';
}

/* -------------------------------------------
   Code Type Toggle: Barcode vs QR Code
   ------------------------------------------- */
function setBarcodeCodeType(type) {
  BARCODE_STATE.codeType = type;
  updateCodeTypeButtonsUI();
  updateVisibilityUI();
  saveBarcodeState();
  renderBarcode();
  if (typeof updateBarLabel === 'function') updateBarLabel();
  showToast(type === 'qrcode' ? '⛶ Converted to QR Code' : '▇ Converted to Barcode');
}

function updateCodeTypeButtonsUI() {
  var isBarcode = BARCODE_STATE.codeType === 'barcode';
  if ($('btnTypeCodeBarcode')) $('btnTypeCodeBarcode').classList.toggle('active', isBarcode);
  if ($('btnTypeCodeQr')) $('btnTypeCodeQr').classList.toggle('active', !isBarcode);
}

/* -------------------------------------------
   Label Mode Toggle: Only Code vs With Shop & Location
   ------------------------------------------- */
function setBarcodeLabelMode(mode) {
  BARCODE_STATE.labelMode = mode;
  updateLabelModeButtonsUI();
  updateVisibilityUI();
  saveBarcodeState();
  renderBarcode();
  if (typeof updateBarLabel === 'function') updateBarLabel();
  showToast(mode === 'only_code' ? '🎯 Only Code Mode (Pure Sticker)' : '🏪 Shop & Location Label Mode');
}

function updateLabelModeButtonsUI() {
  var isOnlyCode = BARCODE_STATE.labelMode === 'only_code';
  if ($('btnModeOnlyCode')) $('btnModeOnlyCode').classList.toggle('active', isOnlyCode);
  if ($('btnModeShopLabel')) $('btnModeShopLabel').classList.toggle('active', !isOnlyCode);
}

function updateVisibilityUI() {
  var isBarcode = BARCODE_STATE.codeType === 'barcode';
  var isOnlyCode = BARCODE_STATE.labelMode === 'only_code';
  var isCustomSize = BARCODE_STATE.printSize === 'custom';

  if ($('bcFormatWrap')) $('bcFormatWrap').style.display = isBarcode ? 'block' : 'none';
  if ($('bcDisplayValueWrap')) $('bcDisplayValueWrap').style.display = isBarcode ? 'flex' : 'none';

  if ($('bcShopDetailsCard')) {
    $('bcShopDetailsCard').style.display = isOnlyCode ? 'none' : 'block';
  }

  if ($('bcCustomSizeRow')) {
    $('bcCustomSizeRow').style.display = isCustomSize ? 'grid' : 'none';
  }
}

/* -------------------------------------------
   1-Click Brand Kit Sync
   ------------------------------------------- */
function applyBrandKitToBarcode() {
  if (typeof loadBrandKit === 'function') loadBrandKit();
  if (typeof BRAND_KIT === 'undefined') return;

  if (BRAND_KIT.name) BARCODE_STATE.shopName = BRAND_KIT.name;
  if (BRAND_KIT.primaryColor) BARCODE_STATE.accentColor = BRAND_KIT.primaryColor;
  if (BRAND_KIT.fontFamily) BARCODE_STATE.fontFamily = BRAND_KIT.fontFamily;
  if (BRAND_KIT.handle) {
    BARCODE_STATE.socialText = BRAND_KIT.handle;
    BARCODE_STATE.instagramHandle = BRAND_KIT.handle.replace('@', '');
  }

  populateBarcodeForm();
  saveBarcodeState();
  renderBarcode();
  showToast('✨ Synced Brand Kit identity!');
}

/* -------------------------------------------
   Single View vs A4 Sheet View
   ------------------------------------------- */
function setBarcodeViewMode(mode) {
  BARCODE_STATE.viewMode = mode;
  if ($('bcViewSingleBtn')) $('bcViewSingleBtn').classList.toggle('active', mode === 'single');
  if ($('bcViewSheetBtn')) $('bcViewSheetBtn').classList.toggle('active', mode === 'sheet');
  renderBarcode();
}

function getActivePrintDimensions() {
  var sz = BARCODE_PRINT_SIZES[BARCODE_STATE.printSize];
  if (!sz || BARCODE_STATE.printSize === 'custom') {
    return {
      w: Math.max(20, BARCODE_STATE.customWidthMm || 50),
      h: Math.max(15, BARCODE_STATE.customHeightMm || 30),
      name: 'Custom (' + (BARCODE_STATE.customWidthMm || 50) + '×' + (BARCODE_STATE.customHeightMm || 30) + ' mm)',
      type: 'custom'
    };
  }
  return sz;
}

/* -------------------------------------------
   Core Rendering Pipeline (Canvas 300 DPI)
   ------------------------------------------- */
function renderBarcode() {
  var canvas = $('barcodeCanvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  if (!ctx) return;

  var dims = getActivePrintDimensions();

  if (BARCODE_STATE.viewMode === 'sheet') {
    renderA4SheetPreview(canvas, ctx, dims);
    return;
  }

  var SCALE = 12;
  var W = Math.round(dims.w * SCALE);
  var H = Math.round(dims.h * SCALE);

  canvas.width = W;
  canvas.height = H;

  if ($('bcDimensionsBadge')) {
    var inchesW = (dims.w / 25.4).toFixed(2);
    var inchesH = (dims.h / 25.4).toFixed(2);
    $('bcDimensionsBadge').textContent = dims.w + ' × ' + dims.h + ' mm (' + inchesW + '" × ' + inchesH + '") • 300 DPI';
  }

  // 1. Background
  ctx.fillStyle = BARCODE_STATE.bgColor || '#ffffff';
  ctx.fillRect(0, 0, W, H);

  // 2. Sticker Border Guide
  if (BARCODE_STATE.borderStyle !== 'none') {
    ctx.save();
    ctx.strokeStyle = BARCODE_STATE.borderStyle === 'dashed' ? '#CBD5E1' : '#E2E8F0';
    ctx.lineWidth = Math.max(2, Math.round(SCALE * 0.18));
    if (BARCODE_STATE.borderStyle === 'dashed') {
      ctx.setLineDash([8, 6]);
    }
    var bPad = Math.round(SCALE * 0.6);
    ctx.strokeRect(bPad, bPad, W - bPad * 2, H - bPad * 2);
    ctx.restore();
  }

  // 3. Render Mode
  if (BARCODE_STATE.labelMode === 'only_code') {
    renderOnlyCodeLayout(ctx, W, H, SCALE);
  } else {
    renderShopLocationLabel(ctx, W, H, SCALE);
  }
}

/* -------------------------------------------
   Layout 1: ONLY CODE (Clean Barcode / QR Code)
   ------------------------------------------- */
function renderOnlyCodeLayout(ctx, W, H, SCALE) {
  var pad = Math.round(Math.min(W, H) * 0.08);
  var availW = W - pad * 2;
  var availH = H - pad * 2;
  var data = (BARCODE_STATE.dataToConvert || '123456789').trim();

  if (BARCODE_STATE.codeType === 'qrcode') {
    var qrSize = Math.min(availW, availH);
    var qrX = (W - qrSize) / 2;
    var qrY = (H - qrSize) / 2;
    drawQrCodeGraphic(ctx, qrX, qrY, qrSize, qrSize, data);
  } else {
    drawBarcodeGraphic(ctx, pad, pad, availW, availH, {
      showText: BARCODE_STATE.displayValue,
      customText: data
    });
  }
}

/* -------------------------------------------
   Layout 2: SHOP, LOCATION & SOCIAL/LINK LABEL
   ------------------------------------------- */
function renderShopLocationLabel(ctx, W, H, SCALE) {
  var padX = Math.round(W * 0.06);
  var padY = Math.round(H * 0.06);
  var font = BARCODE_STATE.fontFamily || 'Inter Tight';
  var currY = padY;
  var data = (BARCODE_STATE.dataToConvert || 'https://maps.google.com').trim();

  // 1. SHOP NAME (Top line, bold, centered)
  var shopName = (BARCODE_STATE.shopName || '').trim();
  if (shopName) {
    var shopFontSize = Math.max(13, Math.round(H * 0.09));
    ctx.font = '700 ' + shopFontSize + 'px ' + font + ', sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillStyle = '#0F172A';

    var maxW = W - padX * 2;
    var fittedShop = fitTextToWidth(ctx, shopName.toUpperCase(), maxW);
    ctx.fillText(fittedShop, W / 2, currY);
    currY += shopFontSize + Math.round(SCALE * 0.35);
  }

  // 2. LOCATION TEXT (Dedicated line underneath shop name)
  var locText = (BARCODE_STATE.locationText || '').trim();
  if (locText) {
    var locFontSize = Math.max(10, Math.round(H * 0.065));
    ctx.font = '600 ' + locFontSize + 'px ' + font + ', sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillStyle = '#334155';

    var displayLoc = locText.startsWith('📍') ? locText : ('📍 ' + locText);
    var fittedLoc = fitTextToWidth(ctx, displayLoc, W - padX * 2);
    ctx.fillText(fittedLoc, W / 2, currY);
    currY += locFontSize + Math.round(SCALE * 0.35);
  }

  // 3. SOCIAL & WEBSITE BADGE (e.g. 🌐 freshmart.com • 📸 @freshmart)
  var webText = (BARCODE_STATE.websiteText || '').trim();
  var socText = (BARCODE_STATE.socialText || '').trim();
  var socialLine = '';
  if (webText && socText) {
    socialLine = '🌐 ' + webText + '  •  📸 ' + socText;
  } else if (webText) {
    socialLine = '🌐 ' + webText;
  } else if (socText) {
    socialLine = '📸 ' + socText;
  }

  if (socialLine) {
    var socFontSize = Math.max(9, Math.round(H * 0.055));
    ctx.font = '500 ' + socFontSize + 'px ' + font + ', sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillStyle = '#64748B';

    var fittedSoc = fitTextToWidth(ctx, socialLine, W - padX * 2);
    ctx.fillText(fittedSoc, W / 2, currY);
    currY += socFontSize + Math.round(SCALE * 0.4);
  }

  // Thin separator rule
  if (shopName || locText || socialLine) {
    ctx.strokeStyle = '#E2E8F0';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(padX, currY);
    ctx.lineTo(W - padX, currY);
    ctx.stroke();
    currY += Math.round(SCALE * 0.4);
  }

  // 4. FOOTER NOTE / PRICE AT BOTTOM
  var itemOrPrice = (BARCODE_STATE.itemOrPrice || '').trim();
  var footH = itemOrPrice ? (Math.max(10, Math.round(H * 0.065)) + Math.round(SCALE * 0.3)) : 0;
  var bottomPad = padY + footH;

  // 5. BARCODE OR QR CODE IN CENTER
  var availCodeW = W - padX * 2;
  var availCodeH = H - currY - bottomPad;
  if (availCodeH < 25) availCodeH = 25;

  if (BARCODE_STATE.codeType === 'qrcode') {
    var qrSize = Math.min(availCodeW, availCodeH);
    var qrX = (W - qrSize) / 2;
    var qrY = currY + (availCodeH - qrSize) / 2;
    drawQrCodeGraphic(ctx, qrX, qrY, qrSize, qrSize, data);
  } else {
    drawBarcodeGraphic(ctx, padX, currY, availCodeW, availCodeH, {
      showText: BARCODE_STATE.displayValue,
      customText: data
    });
  }

  // 6. FOOTER TEXT
  if (itemOrPrice) {
    var footFontSize = Math.max(10, Math.round(H * 0.062));
    ctx.font = '600 ' + footFontSize + 'px ' + font + ', sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillStyle = '#0F172A';
    var fittedFoot = fitTextToWidth(ctx, itemOrPrice, W - padX * 2);
    ctx.fillText(fittedFoot, W / 2, H - padY);
  }
}

function fitTextToWidth(ctx, text, maxWidth) {
  if (ctx.measureText(text).width <= maxWidth) return text;
  var str = text;
  while (str.length > 3 && ctx.measureText(str + '…').width > maxWidth) {
    str = str.slice(0, -1);
  }
  return str + '…';
}

/* -------------------------------------------
   Barcode Graphic Drawer
   ------------------------------------------- */
function drawBarcodeGraphic(ctx, x, y, width, height, opts) {
  opts = opts || {};
  var code = (opts.customText || BARCODE_STATE.dataToConvert || '123456789').trim();
  var fmt = BARCODE_STATE.barcodeFormat || 'CODE128';
  var showText = opts.showText !== false;
  var barColor = BARCODE_STATE.barColor || '#000000';
  var bgColor = BARCODE_STATE.bgColor || '#ffffff';

  var offCanvas = document.createElement('canvas');
  var generated = false;

  if (typeof window.JsBarcode === 'function') {
    try {
      window.JsBarcode(offCanvas, code, {
        format: fmt,
        lineColor: barColor,
        background: bgColor,
        width: 2,
        height: Math.max(30, Math.round(height * 0.7)),
        displayValue: showText,
        font: 'monospace',
        fontSize: 16,
        textMargin: 4,
        margin: 4
      });
      generated = true;
    } catch (err) {
      console.warn('JsBarcode notice (using fallback):', err.message);
    }
  }

  if (!generated) {
    drawFallbackBarcode(offCanvas, code, barColor, bgColor, showText);
  }

  if (offCanvas.width > 0 && offCanvas.height > 0) {
    var aspect = offCanvas.width / offCanvas.height;
    var drawW = width;
    var drawH = width / aspect;

    if (drawH > height) {
      drawH = height;
      drawW = height * aspect;
    }

    var drawX = x + (width - drawW) / 2;
    var drawY = y + (height - drawH) / 2;

    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(offCanvas, drawX, drawY, drawW, drawH);
    ctx.imageSmoothingEnabled = true;
  }
}

/* Pure JS Code128-B Fallback */
function drawFallbackBarcode(canvas, text, barColor, bgColor, showText) {
  var bars = encodeCode128B(text);
  var barW = 3;
  var barH = 70;
  var textH = showText ? 24 : 0;
  var pad = 10;

  canvas.width = bars.length * barW + pad * 2;
  canvas.height = barH + textH + pad * 2;

  var ctx = canvas.getContext('2d');
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = barColor;
  for (var i = 0; i < bars.length; i++) {
    if (bars[i] === '1') {
      ctx.fillRect(pad + i * barW, pad, barW, barH);
    }
  }

  if (showText) {
    ctx.font = '600 16px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText(text, canvas.width / 2, pad + barH + 4);
  }
}

var CODE128_PATTERNS = [
  "212222","222122","222221","121223","121322","131222","122213","122312","132212","221213",
  "221312","231212","112232","122132","122231","113222","123122","123221","223211","221132",
  "221231","213212","223112","312131","311222","321122","321221","312212","322112","322211",
  "212123","212321","232121","111323","131123","131321","112313","132113","132311","211313",
  "231113","231311","112133","112331","132131","113123","113321","133121","313121","211331",
  "231131","213113","213311","213131","311123","311321","331121","312113","312311","332111",
  "314111","221411","431111","111224","111422","121124","121421","141122","141221","112214",
  "112412","122114","122411","142112","142211","241211","221114","413111","241112","134111",
  "111242","121142","121241","114212","124112","124211","411212","421112","421211","212141",
  "214121","412121","111143","111341","131141","114113","114311","411113","411311","113141",
  "114131","311141","411131","211412","211214","211232","2331112"
];

function encodeCode128B(text) {
  var indices = [104];
  var checkSum = 104;

  for (var i = 0; i < text.length; i++) {
    var code = text.charCodeAt(i) - 32;
    if (code < 0 || code > 95) code = 0;
    indices.push(code);
    checkSum += code * (i + 1);
  }

  indices.push(checkSum % 103);
  indices.push(106);

  var binary = '';
  for (var j = 0; j < indices.length; j++) {
    var pat = CODE128_PATTERNS[indices[j]];
    if (!pat) continue;
    var isBar = true;
    for (var k = 0; k < pat.length; k++) {
      var count = parseInt(pat.charAt(k), 10);
      for (var c = 0; c < count; c++) {
        binary += isBar ? '1' : '0';
      }
      isBar = !isBar;
    }
  }
  return binary;
}

/* -------------------------------------------
   QR Code Graphic Drawer
   ------------------------------------------- */
function drawQrCodeGraphic(ctx, x, y, width, height, text) {
  text = (text || 'https://maps.google.com').trim();
  var tempDiv = document.createElement('div');
  tempDiv.style.position = 'absolute';
  tempDiv.style.left = '-9999px';
  tempDiv.style.top = '-9999px';
  document.body.appendChild(tempDiv);

  var drawn = false;
  if (typeof window.QRCode === 'function') {
    try {
      new window.QRCode(tempDiv, {
        text: text,
        width: 300,
        height: 300,
        colorDark: BARCODE_STATE.barColor || '#000000',
        colorLight: BARCODE_STATE.bgColor || '#ffffff',
        correctLevel: 2
      });
      var qrCanvas = tempDiv.querySelector('canvas');
      if (qrCanvas && qrCanvas.width > 0) {
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(qrCanvas, x, y, width, height);
        ctx.imageSmoothingEnabled = true;
        drawn = true;
      }
    } catch (e) {
      console.warn('QRCode render error:', e);
    }
  }

  if (!drawn) {
    drawFallbackQrCode(ctx, x, y, width, height);
  }

  document.body.removeChild(tempDiv);
}

function drawFallbackQrCode(ctx, x, y, width, height) {
  ctx.fillStyle = BARCODE_STATE.bgColor || '#FFFFFF';
  ctx.fillRect(x, y, width, height);
  ctx.fillStyle = BARCODE_STATE.barColor || '#000000';

  var s = Math.round(width * 0.28);
  drawQrFinder(ctx, x, y, s);
  drawQrFinder(ctx, x + width - s, y, s);
  drawQrFinder(ctx, x, y + height - s, s);

  var dot = Math.max(2, Math.round(width * 0.04));
  for (var r = 0; r < 8; r++) {
    for (var c = 0; c < 8; c++) {
      if ((r * 3 + c * 5) % 4 === 0) {
        ctx.fillRect(x + width * 0.32 + c * dot, y + height * 0.32 + r * dot, dot, dot);
      }
    }
  }
}

function drawQrFinder(ctx, x, y, size) {
  ctx.fillStyle = BARCODE_STATE.barColor || '#000000';
  ctx.fillRect(x, y, size, size);
  ctx.fillStyle = BARCODE_STATE.bgColor || '#FFFFFF';
  ctx.fillRect(x + size * 0.2, y + size * 0.2, size * 0.6, size * 0.6);
  ctx.fillStyle = BARCODE_STATE.barColor || '#000000';
  ctx.fillRect(x + size * 0.4, y + size * 0.4, size * 0.2, size * 0.2);
}

/* -------------------------------------------
   A4 Sheet Grid Preview
   ------------------------------------------- */
function renderA4SheetPreview(canvas, ctx, dims) {
  var SCALE = 4;
  var W = Math.round(210 * SCALE);
  var H = Math.round(297 * SCALE);

  canvas.width = W;
  canvas.height = H;

  if ($('bcDimensionsBadge')) {
    $('bcDimensionsBadge').textContent = 'A4 Sheet Print Preview (210 × 297 mm) • 24 Stickers Grid Ready';
  }

  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = '#E2E8F0';
  ctx.lineWidth = 1;
  ctx.strokeRect(0, 0, W, H);

  var singleW = Math.round(dims.w * 8);
  var singleH = Math.round(dims.h * 8);
  var offSingle = document.createElement('canvas');
  offSingle.width = singleW;
  offSingle.height = singleH;
  var offCtx = offSingle.getContext('2d');

  offCtx.fillStyle = BARCODE_STATE.bgColor || '#ffffff';
  offCtx.fillRect(0, 0, singleW, singleH);

  if (BARCODE_STATE.labelMode === 'only_code') {
    renderOnlyCodeLayout(offCtx, singleW, singleH, 8);
  } else {
    renderShopLocationLabel(offCtx, singleW, singleH, 8);
  }

  var cols = dims.cols || 3;
  var rows = dims.rows || 8;
  var marginX = Math.round(W * 0.04);
  var marginY = Math.round(H * 0.04);
  var cellW = (W - marginX * 2) / cols;
  var cellH = (H - marginY * 2) / rows;

  for (var r = 0; r < rows; r++) {
    for (var c = 0; c < cols; c++) {
      var lx = marginX + c * cellW + 3;
      var ly = marginY + r * cellH + 3;
      var lw = cellW - 6;
      var lh = cellH - 6;

      ctx.save();
      ctx.strokeStyle = '#CBD5E1';
      ctx.setLineDash([4, 4]);
      ctx.strokeRect(lx, ly, lw, lh);
      ctx.restore();

      ctx.drawImage(offSingle, lx + 2, ly + 2, lw - 4, lh - 4);
    }
  }
}

/* -------------------------------------------
   Export: Print, PNG, PDF, SVG, Clipboard
   ------------------------------------------- */
function printBarcodeLabel() {
  var dims = getActivePrintDimensions();
  var canvas = document.createElement('canvas');
  var SCALE = 12;
  canvas.width = Math.round(dims.w * SCALE);
  canvas.height = Math.round(dims.h * SCALE);
  var ctx = canvas.getContext('2d');

  ctx.fillStyle = BARCODE_STATE.bgColor || '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (BARCODE_STATE.labelMode === 'only_code') {
    renderOnlyCodeLayout(ctx, canvas.width, canvas.height, SCALE);
  } else {
    renderShopLocationLabel(ctx, canvas.width, canvas.height, SCALE);
  }

  var dataUrl = canvas.toDataURL('image/png');
  var win = window.open('', '_blank');
  win.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Print Label - ${escapeHtml(BARCODE_STATE.dataToConvert)}</title>
        <style>
          @page { size: ${dims.w}mm ${dims.h}mm; margin: 0; }
          body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; width: ${dims.w}mm; height: ${dims.h}mm; overflow: hidden; }
          img { width: 100%; height: 100%; object-fit: contain; }
        </style>
      </head>
      <body>
        <img src="${dataUrl}" onload="window.print(); window.close();" />
      </body>
    </html>
  `);
  win.document.close();
  showToast('🖨 Opening Thermal Label Print Dialog…');
}

function printBarcodeA4Sheet() {
  var dims = getActivePrintDimensions();
  var cols = dims.cols || 3;
  var rows = dims.rows || 8;
  var total = cols * rows;

  var canvas = document.createElement('canvas');
  var SCALE = 10;
  canvas.width = Math.round(dims.w * SCALE);
  canvas.height = Math.round(dims.h * SCALE);
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = BARCODE_STATE.bgColor || '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (BARCODE_STATE.labelMode === 'only_code') {
    renderOnlyCodeLayout(ctx, canvas.width, canvas.height, SCALE);
  } else {
    renderShopLocationLabel(ctx, canvas.width, canvas.height, SCALE);
  }
  var dataUrl = canvas.toDataURL('image/png');

  var labelsHtml = '';
  for (var i = 0; i < total; i++) {
    labelsHtml += `<div class="sticker-cell"><img src="${dataUrl}" /></div>`;
  }

  var win = window.open('', '_blank');
  win.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Print Sheet - 24 Labels</title>
        <style>
          @page { size: A4 portrait; margin: 8mm 6mm; }
          * { box-sizing: border-box; }
          body { margin: 0; padding: 0; font-family: sans-serif; background: #fff; }
          .sheet-grid {
            display: grid;
            grid-template-columns: repeat(${cols}, 1fr);
            grid-template-rows: repeat(${rows}, 1fr);
            gap: 2mm 3mm;
            width: 100%;
            height: calc(297mm - 16mm);
          }
          .sticker-cell {
            border: 1px dashed #D1D5DB;
            padding: 1mm;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            page-break-inside: avoid;
          }
          .sticker-cell img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
        </style>
      </head>
      <body>
        <div class="sheet-grid">${labelsHtml}</div>
        <script>window.onload = function() { window.print(); window.close(); };</script>
      </body>
    </html>
  `);
  win.document.close();
  showToast('📑 Opening A4 Sheet Print Dialog…');
}

function downloadBarcodePNG() {
  var canvas = $('barcodeCanvas');
  if (!canvas) return;
  var url = canvas.toDataURL('image/png');
  var filename = (BARCODE_STATE.codeType === 'qrcode' ? 'qr_' : 'barcode_') + sanitizeFilename(BARCODE_STATE.dataToConvert || 'code') + '.png';
  triggerDownload(url, filename);
  showToast('✓ PNG downloaded!');
}

function downloadBarcodePDF() {
  var canvas = $('barcodeCanvas');
  if (!canvas) return;
  if (typeof window.jspdf === 'undefined') {
    showToast('Loading PDF engine…');
    return;
  }

  var dims = getActivePrintDimensions();
  var jsPDF = window.jspdf.jsPDF;
  var isLandscape = dims.w > dims.h;

  var doc = new jsPDF({
    orientation: isLandscape ? 'landscape' : 'portrait',
    unit: 'mm',
    format: [dims.w, dims.h]
  });

  var data = canvas.toDataURL('image/png');
  doc.addImage(data, 'PNG', 0, 0, dims.w, dims.h);

  var filename = (BARCODE_STATE.codeType === 'qrcode' ? 'qr_' : 'barcode_') + sanitizeFilename(BARCODE_STATE.dataToConvert || 'code') + '.pdf';
  doc.save(filename);
  showToast('✓ PDF downloaded!');
}

function downloadBarcodeSVG() {
  var dims = getActivePrintDimensions();
  var code = (BARCODE_STATE.dataToConvert || '123456789').trim();

  if (BARCODE_STATE.codeType === 'qrcode') {
    downloadBarcodePNG();
    return;
  }

  var bars = encodeCode128B(code);
  var barW = 2;
  var barH = 50;
  var totalW = bars.length * barW;

  var svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${totalW + 20} ${barH + 30}" width="${dims.w}mm" height="${dims.h}mm">
    <rect width="100%" height="100%" fill="${BARCODE_STATE.bgColor || '#ffffff'}"/>
    <g fill="${BARCODE_STATE.barColor || '#000000'}">`;

  for (var i = 0; i < bars.length; i++) {
    if (bars[i] === '1') {
      svg += `<rect x="${10 + i * barW}" y="10" width="${barW}" height="${barH}"/>`;
    }
  }

  if (BARCODE_STATE.displayValue) {
    svg += `<text x="${(totalW + 20) / 2}" y="${barH + 24}" font-family="monospace" font-size="14" font-weight="600" text-anchor="middle" fill="${BARCODE_STATE.barColor || '#000000'}">${escapeHtml(code)}</text>`;
  }

  svg += `</g></svg>`;

  var blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
  var url = URL.createObjectURL(blob);
  var filename = 'barcode_' + sanitizeFilename(code) + '.svg';
  triggerDownload(url, filename);
  showToast('✓ Vector SVG downloaded!');
}

function copyBarcodeToClipboard() {
  var canvas = $('barcodeCanvas');
  if (!canvas) return;

  if (navigator.clipboard && window.ClipboardItem) {
    canvas.toBlob(function(blob) {
      if (!blob) {
        showToast('Could not create image blob');
        return;
      }
      navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
        .then(function() { showToast('✓ Copied to clipboard!'); })
        .catch(function() { showToast('Clipboard access denied'); });
    }, 'image/png');
  } else {
    showToast('Clipboard API not supported');
  }
}

function sanitizeFilename(str) {
  return (str || '').replace(/[^a-zA-Z0-9_-]/g, '_').toLowerCase();
}
