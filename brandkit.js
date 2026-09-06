/* =============================================
   brandkit.js — Global Brand Kit Sync Module
   Client-Side, LocalStorage-backed, 100% Private
   ============================================= */
'use strict';

var BRAND_KIT = {
  name: 'Alex Morgan',
  handle: '@alexcreates',
  primaryColor: '#7C6EFA',
  secondaryColor: '#A896FF',
  bgColor: '#0F0F13',
  textColor: '#EEEEF2',
  fontFamily: 'Inter Tight',
  logoUrl: '' // Base64 data URL
};

/* Load Brand Kit from LocalStorage */
function loadBrandKit() {
  try {
    var saved = localStorage.getItem('ck-brand-kit');
    if (saved) {
      var parsed = JSON.parse(saved);
      Object.assign(BRAND_KIT, parsed);
    }
  } catch (e) {
    console.warn('Could not load brand kit:', e);
  }
}

/* Save Brand Kit to LocalStorage */
function saveBrandKit() {
  try {
    localStorage.setItem('ck-brand-kit', JSON.stringify(BRAND_KIT));
    updateBrandKitModalUI();
    showToast('✓ Brand Kit saved successfully!');
  } catch (e) {
    console.error('Error saving brand kit:', e);
    showToast('Failed to save Brand Kit');
  }
}

/* Open / Close Brand Kit Modal */
function openBrandKitModal() {
  var modal = $('brandKitModal');
  if (!modal) return;
  loadBrandKit();
  updateBrandKitModalUI();
  modal.classList.remove('hidden');
}

function closeBrandKitModal() {
  var modal = $('brandKitModal');
  if (modal) modal.classList.add('hidden');
}

/* Update Modal Form fields & Live Badge Preview */
function updateBrandKitModalUI() {
  if ($('bkName')) $('bkName').value = BRAND_KIT.name;
  if ($('bkHandle')) $('bkHandle').value = BRAND_KIT.handle;
  if ($('bkPrimaryColor')) $('bkPrimaryColor').value = BRAND_KIT.primaryColor;
  if ($('bkSecondaryColor')) $('bkSecondaryColor').value = BRAND_KIT.secondaryColor;
  if ($('bkBgColor')) $('bkBgColor').value = BRAND_KIT.bgColor;
  if ($('bkTextColor')) $('bkTextColor').value = BRAND_KIT.textColor;
  if ($('bkFont')) $('bkFont').value = BRAND_KIT.fontFamily;

  // Live Brand Preview Badge in Modal
  var badge = $('bkPreviewBadge');
  if (badge) {
    badge.style.background = BRAND_KIT.bgColor;
    badge.style.borderColor = BRAND_KIT.primaryColor;
    badge.style.color = BRAND_KIT.textColor;
    badge.style.fontFamily = BRAND_KIT.fontFamily + ', sans-serif';

    if ($('bkPreviewName')) $('bkPreviewName').textContent = BRAND_KIT.name;
    if ($('bkPreviewHandle')) $('bkPreviewHandle').textContent = BRAND_KIT.handle;
    if ($('bkPreviewDot')) $('bkPreviewDot').style.background = BRAND_KIT.primaryColor;

    var logoImg = $('bkPreviewLogo');
    if (logoImg) {
      if (BRAND_KIT.logoUrl) {
        logoImg.src = BRAND_KIT.logoUrl;
        logoImg.style.display = 'block';
        if ($('bkPreviewAvatarFallback')) $('bkPreviewAvatarFallback').style.display = 'none';
      } else {
        logoImg.style.display = 'none';
        if ($('bkPreviewAvatarFallback')) {
          $('bkPreviewAvatarFallback').style.display = 'flex';
          $('bkPreviewAvatarFallback').textContent = (BRAND_KIT.name || 'A').charAt(0).toUpperCase();
          $('bkPreviewAvatarFallback').style.background = BRAND_KIT.primaryColor;
        }
      }
    }
  }
}

/* Handle Modal Form Input changes */
function onBrandKitFieldChanged() {
  if ($('bkName')) BRAND_KIT.name = $('bkName').value;
  if ($('bkHandle')) BRAND_KIT.handle = $('bkHandle').value;
  if ($('bkPrimaryColor')) BRAND_KIT.primaryColor = $('bkPrimaryColor').value;
  if ($('bkSecondaryColor')) BRAND_KIT.secondaryColor = $('bkSecondaryColor').value;
  if ($('bkBgColor')) BRAND_KIT.bgColor = $('bkBgColor').value;
  if ($('bkTextColor')) BRAND_KIT.textColor = $('bkTextColor').value;
  if ($('bkFont')) BRAND_KIT.fontFamily = $('bkFont').value;

  updateBrandKitModalUI();
}

/* Handle Logo / Avatar Upload in Brand Kit */
function onBrandLogoSelected(input) {
  if (input.files && input.files[0]) {
    var file = input.files[0];
    if (!file.type.startsWith('image/')) {
      showToast('Please upload an image file (PNG, JPG, SVG)');
      return;
    }
    var reader = new FileReader();
    reader.onload = function(e) {
      BRAND_KIT.logoUrl = e.target.result;
      updateBrandKitModalUI();
      showToast('✓ Brand logo uploaded!');
    };
    reader.readAsDataURL(file);
    input.value = '';
  }
}

function removeBrandLogo() {
  BRAND_KIT.logoUrl = '';
  if ($('bkLogoInput')) $('bkLogoInput').value = '';
  updateBrandKitModalUI();
  showToast('✓ Brand logo removed');
}

/* =============================================
   1-CLICK GLOBAL APPLY TO CREATORKIT TOOLS
   ============================================= */

/* 1. Apply to Poster Maker */
function applyBrandKitToPoster() {
  loadBrandKit();
  if ($('pBgColor')) $('pBgColor').value = BRAND_KIT.bgColor;
  if ($('pTextColor')) $('pTextColor').value = BRAND_KIT.textColor;
  if ($('pBottom') && BRAND_KIT.handle) {
    if (!$('pBottom').value || $('pBottom').value.startsWith('@')) {
      $('pBottom').value = BRAND_KIT.handle;
    }
  }
  if ($('pFont')) {
    // Map font family
    var opts = Array.from($('pFont').options).map(function(o) { return o.value; });
    var match = opts.find(function(v) { return v.toLowerCase().includes(BRAND_KIT.fontFamily.toLowerCase()); });
    if (match) $('pFont').value = match;
  }
  if (typeof updateColorLabels === 'function') updateColorLabels();
  if (typeof posterChanged === 'function') posterChanged();
  showToast('✨ Applied Brand Kit to Poster Designer!');
}

/* 2. Apply to Carousel Builder */
function applyBrandKitToCarousel() {
  loadBrandKit();
  if ($('cHandle') && BRAND_KIT.handle) {
    $('cHandle').value = BRAND_KIT.handle;
  }
  if (typeof window.CAROUSEL_ACCENT !== 'undefined') {
    window.CAROUSEL_ACCENT = BRAND_KIT.primaryColor;
  }
  if (typeof window.CAROUSEL_THEME !== 'undefined') {
    // Select Dark theme (1) or Light theme (0) based on brand bg
    window.CAROUSEL_THEME = isColorDark(BRAND_KIT.bgColor) ? 1 : 0;
  }
  if ($('cTypeface')) {
    var opts = Array.from($('cTypeface').options).map(function(o) { return o.value; });
    var match = opts.find(function(v) { return v.toLowerCase().includes(BRAND_KIT.fontFamily.toLowerCase().split(' ')[0]); });
    if (match) $('cTypeface').value = match;
  }
  if (typeof carouselChanged === 'function') carouselChanged();
  showToast('✨ Applied Brand Kit to Carousel Deck!');
}

/* 3. Apply to Infographics */
function applyBrandKitToInfographic() {
  loadBrandKit();
  if (typeof INFOGRAPHIC_STATE !== 'undefined') {
    INFOGRAPHIC_STATE.author = BRAND_KIT.handle || BRAND_KIT.name;
    INFOGRAPHIC_STATE.primaryColor = BRAND_KIT.primaryColor;
    INFOGRAPHIC_STATE.fontFamily = BRAND_KIT.fontFamily;
    if ($('infoAuthor')) $('infoAuthor').value = INFOGRAPHIC_STATE.author;
    if (typeof renderInfographic === 'function') renderInfographic();
  }
  showToast('✨ Applied Brand Kit to Infographic!');
}

/* 4. Apply to Invoice / Quotation Studio */
function applyBrandKitToInvoice() {
  loadBrandKit();
  if (typeof INVOICE_STATE !== 'undefined') {
    if (BRAND_KIT.name) INVOICE_STATE.senderName = BRAND_KIT.name;
    if (BRAND_KIT.primaryColor) INVOICE_STATE.accentColor = BRAND_KIT.primaryColor;
    if (BRAND_KIT.fontFamily) INVOICE_STATE.fontFamily = BRAND_KIT.fontFamily;
    if (BRAND_KIT.logoUrl) INVOICE_STATE.logoUrl = BRAND_KIT.logoUrl;
    if (typeof populateInvoiceForm === 'function') populateInvoiceForm();
    if (typeof saveInvoiceDraft === 'function') saveInvoiceDraft();
    if (typeof renderInvoice === 'function') renderInvoice();
  }
  showToast('✨ Applied Brand Kit to Invoice Studio!');
}

/* Helper to check if a hex color is dark */
function isColorDark(hex) {
  if (!hex) return true;
  hex = hex.replace('#', '');
  if (hex.length === 3) hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  var r = parseInt(hex.substr(0, 2), 16);
  var g = parseInt(hex.substr(2, 2), 16);
  var b = parseInt(hex.substr(4, 2), 16);
  var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return yiq < 128;
}

/* Initialize Brand Kit */
function initBrandKit() {
  loadBrandKit();
}
