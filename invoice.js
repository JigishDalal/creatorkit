/* =============================================
   invoice.js — Professional Invoice & Quotation Studio
   100% Client-Side, Zero Backend, Brand Kit Powered
   ============================================= */
'use strict';

/* Global Tax & Business ID Configurations */
var TAX_ID_TYPES = {
  GSTIN:  { label: 'GST Number (GSTIN)', prefix: 'GSTIN: ', placeholder: 'e.g. 27AAAAA0000A1Z5' },
  EIN:    { label: 'US Tax ID (EIN)',    prefix: 'EIN: ',   placeholder: 'e.g. 12-3456789' },
  VAT_UK: { label: 'UK VAT Number',      prefix: 'VAT: ',   placeholder: 'e.g. GB 123 4567 89' },
  VAT_EU: { label: 'EU VAT ID',          prefix: 'VAT ID: ',placeholder: 'e.g. DE 123456789' },
  ABN:    { label: 'Australia ABN',      prefix: 'ABN: ',   placeholder: 'e.g. 11 222 333 444' },
  BN:     { label: 'Canada BN / GST',    prefix: 'BN: ',    placeholder: 'e.g. 123456789 RT 0001' },
  TRN:    { label: 'UAE / GCC TRN',      prefix: 'TRN: ',   placeholder: 'e.g. 100 1234 5678 0003' },
  UEN:    { label: 'Singapore UEN',      prefix: 'UEN: ',   placeholder: 'e.g. 201912345A' },
  CUSTOM: { label: 'Custom Tax ID',      prefix: '',        placeholder: 'e.g. Tax ID / Reg #' }
};

var INVOICE_STATE = {
  docType: 'INVOICE', // INVOICE | QUOTATION | PROFORMA | RECEIPT
  theme: 'modern',    // modern | executive | creative | classic
  status: 'PENDING',  // PAID | PENDING | DRAFT | APPROVED
  currency: '₹',
  docNumber: 'INV-2026-001',
  issueDate: '',
  dueDate: '',
  
  // Sender (From)
  senderName: 'Aarav Mehta Studio',
  senderEmail: 'aarav@mehtadesign.in',
  senderPhone: '+91 98765 43210',
  senderAddress: 'Bandra West, Mumbai, MH 400050',
  taxType: 'GSTIN',
  senderTaxId: '27AAAAA0000A1Z5',
  
  // Client (Bill To)
  clientName: 'Rahul Sharma',
  clientCompany: 'NextGen Digital Media Pvt Ltd',
  clientEmail: 'finance@nextgendigital.in',
  clientPhone: '+91 98111 22233',
  clientAddress: 'Indiranagar, Bengaluru, KA 560038',
  clientTaxId: '29BBBBB1111B2Z6',
  
  // Line items: [{ id, description, qty, rate, total }]
  items: [
    { id: 1, description: 'Brand Identity & Design System', qty: 1, rate: 45000, total: 45000 },
    { id: 2, description: 'Responsive Web Application UI/UX (Figma)', qty: 1, rate: 35000, total: 35000 },
    { id: 3, description: 'Social Media Templates (10 Custom Posters)', qty: 1, rate: 12000, total: 12000 }
  ],
  
  // Financials
  discountType: 'percent', // percent | fixed
  discountValue: 0,
  taxRate: 18, // percent GST
  shipping: 0,
  
  // Notes & Payment Terms
  paymentTerms: 'Payment due within 10 days of issue date.\nUPI ID: aarav@icici\nBank: HDFC Bank | IFSC: HDFC0001234 | A/C: 50100234567890',
  notes: 'Thank you for your business! All disputes subject to Mumbai jurisdiction.',
  
  // Brand Kit styling
  accentColor: '#7C6EFA',
  secondaryColor: '#A896FF',
  fontFamily: 'Inter Tight',
  logoUrl: ''
};

/* Presets for 1-click loading */
var INVOICE_PRESETS = {
  indiagst: {
    docType: 'INVOICE',
    docNumber: 'INV-2026-088',
    currency: '₹',
    senderName: 'Aarav Mehta Studio',
    senderEmail: 'aarav@mehtadesign.in',
    senderPhone: '+91 98765 43210',
    senderAddress: 'Bandra West, Mumbai, MH 400050',
    taxType: 'GSTIN',
    senderTaxId: '27AAAAA0000A1Z5',
    clientName: 'Rahul Sharma',
    clientCompany: 'NextGen Digital Media Pvt Ltd',
    clientEmail: 'finance@nextgendigital.in',
    clientPhone: '+91 98111 22233',
    clientAddress: 'Indiranagar, Bengaluru, KA 560038',
    clientTaxId: '29BBBBB1111B2Z6',
    items: [
      { id: 1, description: 'UI/UX Design System & Mobile App Prototype', qty: 1, rate: 65000, total: 65000 },
      { id: 2, description: 'Custom Web Development (React + Tailwind)', qty: 1, rate: 45000, total: 45000 },
      { id: 3, description: 'Monthly Cloud Infrastructure & Maintenance', qty: 1, rate: 10000, total: 10000 }
    ],
    taxRate: 18,
    discountValue: 0,
    status: 'PENDING',
    paymentTerms: 'Payment due within 10 days of invoice.\nUPI ID: aarav@icici\nBank: HDFC Bank | IFSC: HDFC0001234 | A/C: 50100234567890',
    notes: 'Thank you for your business! All disputes subject to Mumbai jurisdiction.'
  },
  webdev: {
    docType: 'INVOICE',
    docNumber: 'INV-2026-042',
    clientName: 'Marcus Vance',
    clientCompany: 'Horizon Tech Labs',
    clientEmail: 'finance@horizontech.com',
    clientAddress: '500 Tech Boulevard, Austin, TX',
    items: [
      { id: 1, description: 'Full-Stack Web App Frontend & Dashboard Dev', qty: 1, rate: 2800, total: 2800 },
      { id: 2, description: 'RESTful API & Database Integration', qty: 1, rate: 1200, total: 1200 },
      { id: 3, description: 'Cloud Deployment, SSL & Performance Tuning', qty: 1, rate: 500, total: 500 }
    ],
    taxRate: 0,
    discountValue: 0,
    status: 'PENDING'
  },
  retainer: {
    docType: 'INVOICE',
    docNumber: 'RET-2026-03',
    clientName: 'Elena Rostova',
    clientCompany: 'Luxe Lifestyle Co.',
    clientEmail: 'elena@luxelife.style',
    clientAddress: '240 Regent Street, London, UK',
    items: [
      { id: 1, description: 'Monthly Social Media Creation (20 Carousels + Posters)', qty: 1, rate: 1500, total: 1500 },
      { id: 2, description: 'Weekly Strategy Sync & Performance Analytics', qty: 1, rate: 400, total: 400 }
    ],
    taxRate: 20,
    discountValue: 0,
    status: 'PAID'
  },
  quote: {
    docType: 'QUOTATION',
    docNumber: 'EST-2026-108',
    clientName: 'David Chen',
    clientCompany: 'Apex Mobile Games',
    clientEmail: 'david@apexmg.io',
    clientAddress: '120 Market St, Seattle, WA',
    items: [
      { id: 1, description: 'App Store & Google Play Screenshot Design (10 Screens)', qty: 1, rate: 1200, total: 1200 },
      { id: 2, description: 'Motion Video Teaser / App Preview Reel', qty: 1, rate: 950, total: 950 },
      { id: 3, description: 'A/B Icon Variation Concepts (3 Iterations)', qty: 1, rate: 350, total: 350 }
    ],
    taxRate: 8.5,
    discountValue: 5,
    status: 'DRAFT'
  },
  photography: {
    docType: 'INVOICE',
    docNumber: 'PHO-2026-019',
    clientName: 'Chloe Bennett',
    clientCompany: 'Aura Skincare Brand',
    clientEmail: 'chloe@auraskin.com',
    clientAddress: '88 Beverly Hills Blvd, Los Angeles, CA',
    items: [
      { id: 1, description: 'Commercial Product Studio Shoot (Full Day 8 hrs)', qty: 1, rate: 1600, total: 1600 },
      { id: 2, description: 'High-End Retouching & Color Grading (25 Assets)', qty: 25, rate: 30, total: 750 },
      { id: 3, description: 'Full Commercial Usage & Global Digital Rights', qty: 1, rate: 500, total: 500 }
    ],
    taxRate: 9.25,
    discountValue: 0,
    status: 'PENDING'
  }
};

/* Currencies */
var INVOICE_CURRENCIES = [
  { code: 'USD', symbol: '$', label: 'USD ($)' },
  { code: 'EUR', symbol: '€', label: 'EUR (€)' },
  { code: 'GBP', symbol: '£', label: 'GBP (£)' },
  { code: 'INR', symbol: '₹', label: 'INR (₹)' },
  { code: 'CAD', symbol: 'CA$', label: 'CAD (CA$)' },
  { code: 'AUD', symbol: 'A$', label: 'AUD (A$)' },
  { code: 'JPY', symbol: '¥', label: 'JPY (¥)' },
  { code: 'SGD', symbol: 'S$', label: 'SGD (S$)' },
  { code: 'AED', symbol: 'AED ', label: 'AED (AED)' }
];

/* -------------------------------------------
   Initialization & Form Binding
   ------------------------------------------- */
function initInvoiceStudio() {
  // Set default dates if not set
  if (!INVOICE_STATE.issueDate) {
    var today = new Date();
    INVOICE_STATE.issueDate = today.toISOString().split('T')[0];
    var due = new Date();
    due.setDate(due.getDate() + 14);
    INVOICE_STATE.dueDate = due.toISOString().split('T')[0];
  }
  
  // Try loading saved invoice draft from LocalStorage
  loadInvoiceDraft();
  
  // Sync Brand Kit defaults if available
  if (typeof BRAND_KIT !== 'undefined') {
    if (BRAND_KIT.name && (!INVOICE_STATE.senderName || INVOICE_STATE.senderName === 'Alex Morgan Studio')) {
      INVOICE_STATE.senderName = BRAND_KIT.name;
    }
    if (BRAND_KIT.primaryColor) {
      INVOICE_STATE.accentColor = BRAND_KIT.primaryColor;
    }
    if (BRAND_KIT.fontFamily) {
      INVOICE_STATE.fontFamily = BRAND_KIT.fontFamily;
    }
    if (BRAND_KIT.logoUrl) {
      INVOICE_STATE.logoUrl = BRAND_KIT.logoUrl;
    }
  }

  populateInvoiceForm();
  renderInvoiceItemsTable();
  renderInvoice();
}

/* Save / Load Drafts */
function saveInvoiceDraft() {
  try {
    localStorage.setItem('ck-invoice-draft', JSON.stringify(INVOICE_STATE));
  } catch (e) {
    console.warn('Could not save invoice draft:', e);
  }
}

function loadInvoiceDraft() {
  try {
    var saved = localStorage.getItem('ck-invoice-draft');
    if (saved) {
      var parsed = JSON.parse(saved);
      Object.assign(INVOICE_STATE, parsed);
    }
  } catch (e) {
    console.warn('Could not load invoice draft:', e);
  }
}

/* Sync values from INVOICE_STATE to DOM Form */
function populateInvoiceForm() {
  if ($('invDocType')) $('invDocType').value = INVOICE_STATE.docType;
  if ($('invTheme')) $('invTheme').value = INVOICE_STATE.theme;
  if ($('invStatus')) $('invStatus').value = INVOICE_STATE.status;
  if ($('invDocNumber')) $('invDocNumber').value = INVOICE_STATE.docNumber;
  if ($('invIssueDate')) $('invIssueDate').value = INVOICE_STATE.issueDate;
  if ($('invDueDate')) $('invDueDate').value = INVOICE_STATE.dueDate;
  if ($('invCurrency')) $('invCurrency').value = INVOICE_STATE.currency;
  
  // Sender
  if ($('invSenderName')) $('invSenderName').value = INVOICE_STATE.senderName;
  if ($('invSenderEmail')) $('invSenderEmail').value = INVOICE_STATE.senderEmail;
  if ($('invSenderPhone')) $('invSenderPhone').value = INVOICE_STATE.senderPhone;
  if ($('invSenderAddress')) $('invSenderAddress').value = INVOICE_STATE.senderAddress;
  if ($('invTaxType')) $('invTaxType').value = INVOICE_STATE.taxType || 'GSTIN';
  if ($('invSenderTaxId')) $('invSenderTaxId').value = INVOICE_STATE.senderTaxId || '';
  
  var taxInfo = TAX_ID_TYPES[INVOICE_STATE.taxType || 'GSTIN'] || TAX_ID_TYPES.CUSTOM;
  if ($('invTaxIdLabel')) $('invTaxIdLabel').textContent = taxInfo.label;
  if ($('invSenderTaxId')) $('invSenderTaxId').placeholder = taxInfo.placeholder;
  
  // Client
  if ($('invClientName')) $('invClientName').value = INVOICE_STATE.clientName;
  if ($('invClientCompany')) $('invClientCompany').value = INVOICE_STATE.clientCompany;
  if ($('invClientEmail')) $('invClientEmail').value = INVOICE_STATE.clientEmail;
  if ($('invClientPhone')) $('invClientPhone').value = INVOICE_STATE.clientPhone;
  if ($('invClientAddress')) $('invClientAddress').value = INVOICE_STATE.clientAddress;
  if ($('invClientTaxId')) $('invClientTaxId').value = INVOICE_STATE.clientTaxId || '';
  
  // Financials
  if ($('invTaxRate')) $('invTaxRate').value = INVOICE_STATE.taxRate;
  if ($('invDiscountValue')) $('invDiscountValue').value = INVOICE_STATE.discountValue;
  if ($('invShipping')) $('invShipping').value = INVOICE_STATE.shipping;
  
  // Notes
  if ($('invPaymentTerms')) $('invPaymentTerms').value = INVOICE_STATE.paymentTerms;
  if ($('invNotes')) $('invNotes').value = INVOICE_STATE.notes;
  if ($('invAccentColor')) $('invAccentColor').value = INVOICE_STATE.accentColor;
  
  // Logo UI
  updateInvoiceLogoUI();
}

/* Update visual thumbnail & status for invoice logo */
function updateInvoiceLogoUI() {
  var thumb = $('invLogoThumb');
  var emptyIcon = $('invLogoEmptyIcon');
  var statusText = $('invLogoStatusText');
  var removeBtn = $('invRemoveLogoBtn');
  
  if (INVOICE_STATE.logoUrl) {
    if (thumb) { thumb.src = INVOICE_STATE.logoUrl; thumb.style.display = 'block'; }
    if (emptyIcon) emptyIcon.style.display = 'none';
    if (statusText) statusText.textContent = 'Logo Attached ✓';
    if (removeBtn) removeBtn.style.display = 'inline-flex';
  } else {
    if (thumb) { thumb.style.display = 'none'; thumb.src = ''; }
    if (emptyIcon) emptyIcon.style.display = 'flex';
    if (statusText) statusText.textContent = 'No Logo Attached';
    if (removeBtn) removeBtn.style.display = 'none';
  }
}

/* Tax ID Type Selector changed */
function onTaxTypeChanged() {
  var type = $('invTaxType') ? $('invTaxType').value : 'GSTIN';
  INVOICE_STATE.taxType = type;
  var info = TAX_ID_TYPES[type] || TAX_ID_TYPES.CUSTOM;
  if ($('invTaxIdLabel')) $('invTaxIdLabel').textContent = info.label;
  if ($('invSenderTaxId')) $('invSenderTaxId').placeholder = info.placeholder;
  saveInvoiceDraft();
  renderInvoice();
}

/* Handle input changes */
function onInvoiceFieldChanged() {
  if ($('invDocType')) INVOICE_STATE.docType = $('invDocType').value;
  if ($('invTheme')) INVOICE_STATE.theme = $('invTheme').value;
  if ($('invStatus')) INVOICE_STATE.status = $('invStatus').value;
  if ($('invDocNumber')) INVOICE_STATE.docNumber = $('invDocNumber').value;
  if ($('invIssueDate')) INVOICE_STATE.issueDate = $('invIssueDate').value;
  if ($('invDueDate')) INVOICE_STATE.dueDate = $('invDueDate').value;
  if ($('invCurrency')) INVOICE_STATE.currency = $('invCurrency').value;
  
  // Sender
  if ($('invSenderName')) INVOICE_STATE.senderName = $('invSenderName').value;
  if ($('invSenderEmail')) INVOICE_STATE.senderEmail = $('invSenderEmail').value;
  if ($('invSenderPhone')) INVOICE_STATE.senderPhone = $('invSenderPhone').value;
  if ($('invSenderAddress')) INVOICE_STATE.senderAddress = $('invSenderAddress').value;
  if ($('invTaxType')) INVOICE_STATE.taxType = $('invTaxType').value;
  if ($('invSenderTaxId')) INVOICE_STATE.senderTaxId = $('invSenderTaxId').value;
  
  // Client
  if ($('invClientName')) INVOICE_STATE.clientName = $('invClientName').value;
  if ($('invClientCompany')) INVOICE_STATE.clientCompany = $('invClientCompany').value;
  if ($('invClientEmail')) INVOICE_STATE.clientEmail = $('invClientEmail').value;
  if ($('invClientPhone')) INVOICE_STATE.clientPhone = $('invClientPhone').value;
  if ($('invClientAddress')) INVOICE_STATE.clientAddress = $('invClientAddress').value;
  if ($('invClientTaxId')) INVOICE_STATE.clientTaxId = $('invClientTaxId').value;
  
  // Financials
  if ($('invTaxRate')) INVOICE_STATE.taxRate = parseFloat($('invTaxRate').value) || 0;
  if ($('invDiscountValue')) INVOICE_STATE.discountValue = parseFloat($('invDiscountValue').value) || 0;
  if ($('invShipping')) INVOICE_STATE.shipping = parseFloat($('invShipping').value) || 0;
  
  // Notes
  if ($('invPaymentTerms')) INVOICE_STATE.paymentTerms = $('invPaymentTerms').value;
  if ($('invNotes')) INVOICE_STATE.notes = $('invNotes').value;
  if ($('invAccentColor')) INVOICE_STATE.accentColor = $('invAccentColor').value;
  
  saveInvoiceDraft();
  renderInvoice();
  if (typeof updateBarLabel === 'function') updateBarLabel();
}

/* -------------------------------------------
   Line Items Management
   ------------------------------------------- */
function renderInvoiceItemsTable() {
  var container = $('invItemsList');
  if (!container) return;
  
  container.innerHTML = '';
  INVOICE_STATE.items.forEach(function(item, idx) {
    var card = document.createElement('div');
    card.className = 'inv-item-card';
    card.innerHTML = `
      <div class="inv-item-card-top">
        <input type="text" class="inv-item-desc-input" placeholder="Item description / deliverable" value="${escapeHtml(item.description)}" oninput="updateInvoiceItem(${idx}, 'description', this.value)">
        <button class="inv-del-btn" onclick="removeInvoiceItem(${idx})" title="Remove item" ${INVOICE_STATE.items.length <= 1 ? 'disabled style="opacity:0.25; cursor:not-allowed"' : ''}>✕</button>
      </div>
      <div class="inv-item-card-bottom">
        <div class="inv-subfield">
          <label class="inv-sublabel">Qty / Hrs</label>
          <input type="number" min="0" step="any" class="inv-num-input" placeholder="1" value="${item.qty}" oninput="updateInvoiceItem(${idx}, 'qty', this.value)">
        </div>
        <div class="inv-subfield">
          <label class="inv-sublabel">Unit Price (${INVOICE_STATE.currency})</label>
          <input type="number" min="0" step="any" class="inv-num-input" placeholder="0" value="${item.rate}" oninput="updateInvoiceItem(${idx}, 'rate', this.value)">
        </div>
        <div class="inv-subfield inv-subfield-total">
          <label class="inv-sublabel" style="text-align:right">Line Total</label>
          <div class="inv-item-calc-total">${INVOICE_STATE.currency}${(item.qty * item.rate).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

function addInvoiceItem() {
  INVOICE_STATE.items.push({
    id: Date.now(),
    description: 'New service or deliverable item',
    qty: 1,
    rate: 100,
    total: 100
  });
  renderInvoiceItemsTable();
  saveInvoiceDraft();
  renderInvoice();
}

function removeInvoiceItem(index) {
  if (INVOICE_STATE.items.length <= 1) return;
  INVOICE_STATE.items.splice(index, 1);
  renderInvoiceItemsTable();
  saveInvoiceDraft();
  renderInvoice();
}

function updateInvoiceItem(index, field, value) {
  var item = INVOICE_STATE.items[index];
  if (!item) return;
  
  if (field === 'description') {
    item.description = value;
  } else if (field === 'qty') {
    item.qty = parseFloat(value) || 0;
    item.total = item.qty * item.rate;
  } else if (field === 'rate') {
    item.rate = parseFloat(value) || 0;
    item.total = item.qty * item.rate;
  }
  
  // Update total display in card without full table redraw to preserve focus
  var card = $('invItemsList') ? $('invItemsList').children[index] : null;
  if (card) {
    var totalDiv = card.querySelector('.inv-item-calc-total');
    if (totalDiv) {
      totalDiv.textContent = INVOICE_STATE.currency + (item.qty * item.rate).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
  }
  
  saveInvoiceDraft();
  renderInvoice();
  if (typeof updateBarLabel === 'function') updateBarLabel();
}

/* -------------------------------------------
   Financial Calculation Helpers
   ------------------------------------------- */
function calculateInvoiceTotals() {
  var subtotal = 0;
  INVOICE_STATE.items.forEach(function(it) {
    subtotal += (it.qty * it.rate);
  });
  
  var discount = 0;
  if (INVOICE_STATE.discountType === 'percent') {
    discount = (subtotal * (INVOICE_STATE.discountValue || 0)) / 100;
  } else {
    discount = INVOICE_STATE.discountValue || 0;
  }
  
  var taxableAmount = Math.max(0, subtotal - discount);
  var taxAmount = (taxableAmount * (INVOICE_STATE.taxRate || 0)) / 100;
  var grandTotal = taxableAmount + taxAmount + (INVOICE_STATE.shipping || 0);
  
  return {
    subtotal: subtotal,
    discount: discount,
    taxAmount: taxAmount,
    grandTotal: grandTotal
  };
}

/* -------------------------------------------
   Load Presets
   ------------------------------------------- */
function loadInvoicePreset(presetKey) {
  var preset = INVOICE_PRESETS[presetKey];
  if (!preset) return;
  
  Object.assign(INVOICE_STATE, preset);
  // Clone items to avoid reference issues
  INVOICE_STATE.items = JSON.parse(JSON.stringify(preset.items));
  
  populateInvoiceForm();
  renderInvoiceItemsTable();
  saveInvoiceDraft();
  renderInvoice();
  showToast('✓ Loaded ' + preset.docType + ' preset!');
}

/* -------------------------------------------
   1-Click Brand Kit Sync
   ------------------------------------------- */
function applyBrandKitToInvoice() {
  if (typeof loadBrandKit === 'function') loadBrandKit();
  if (typeof BRAND_KIT === 'undefined') return;
  
  if (BRAND_KIT.name) INVOICE_STATE.senderName = BRAND_KIT.name;
  if (BRAND_KIT.primaryColor) INVOICE_STATE.accentColor = BRAND_KIT.primaryColor;
  if (BRAND_KIT.fontFamily) INVOICE_STATE.fontFamily = BRAND_KIT.fontFamily;
  if (BRAND_KIT.logoUrl) INVOICE_STATE.logoUrl = BRAND_KIT.logoUrl;
  
  populateInvoiceForm();
  saveInvoiceDraft();
  renderInvoice();
  showToast('✨ Synced Brand Kit to Invoice!');
}

function onInvoiceLogoSelected(input) {
  if (input.files && input.files[0]) {
    var file = input.files[0];
    if (!file.type.startsWith('image/')) {
      showToast('Please upload an image file (PNG, JPG, SVG)');
      return;
    }
    var reader = new FileReader();
    reader.onload = function(e) {
      INVOICE_STATE.logoUrl = e.target.result;
      updateInvoiceLogoUI();
      saveInvoiceDraft();
      renderInvoice();
      showToast('✓ Logo attached to invoice!');
    };
    reader.readAsDataURL(file);
    input.value = ''; // Reset so same file can be re-selected if needed
  }
}

function removeInvoiceLogo() {
  INVOICE_STATE.logoUrl = '';
  if ($('invLogoInput')) $('invLogoInput').value = '';
  updateInvoiceLogoUI();
  saveInvoiceDraft();
  renderInvoice();
  showToast('✓ Logo removed from invoice');
}

/* -------------------------------------------
   Canvas Rendering Engine (High-Resolution A4)
   ------------------------------------------- */
function renderInvoice() {
  var canvas = $('invoiceCanvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  
  // Standard A4 aspect ratio at 2x resolution: 1240 x 1754
  var W = 1240;
  var H = 1754;
  canvas.width = W;
  canvas.height = H;
  
  var accent = INVOICE_STATE.accentColor || '#7C6EFA';
  var font = INVOICE_STATE.fontFamily || 'Inter Tight';
  var sym = INVOICE_STATE.currency || '$';
  var totals = calculateInvoiceTotals();
  var pad = 64; // outer margins
  
  // 1. Background
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, W, H);
  
  // Theme specific top banner / decorative styles
  if (INVOICE_STATE.theme === 'executive') {
    // Solid dark slate executive top bar
    ctx.fillStyle = '#0F172A';
    ctx.fillRect(0, 0, W, 140);
  } else if (INVOICE_STATE.theme === 'creative') {
    // Vibrant accent gradient bar
    var grad = ctx.createLinearGradient(0, 0, W, 0);
    grad.addColorStop(0, accent);
    grad.addColorStop(1, '#6366F1');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, 14);
  } else if (INVOICE_STATE.theme === 'modern') {
    // Crisp thin accent top line
    ctx.fillStyle = accent;
    ctx.fillRect(0, 0, W, 8);
  }
  
  var curY = INVOICE_STATE.theme === 'executive' ? 50 : 56;
  
  // 2. Header: Logo & Sender vs Document Title & Doc Number
  var isExecutive = INVOICE_STATE.theme === 'executive';
  
  // Draw Logo if available
  if (INVOICE_STATE.logoUrl) {
    var img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = function() {
      // Re-render when image finishes loading
      drawInvoiceContent(ctx, W, H, accent, font, sym, totals, pad, img);
    };
    img.src = INVOICE_STATE.logoUrl;
    if (img.complete) {
      drawInvoiceContent(ctx, W, H, accent, font, sym, totals, pad, img);
    } else {
      drawInvoiceContent(ctx, W, H, accent, font, sym, totals, pad, null);
    }
  } else {
    drawInvoiceContent(ctx, W, H, accent, font, sym, totals, pad, null);
  }
}

function drawInvoiceContent(ctx, W, H, accent, font, sym, totals, pad, logoImg) {
  var isExec = INVOICE_STATE.theme === 'executive';
  var topY = isExec ? 48 : 56;
  
  // Clear canvas before full paint
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, W, H);
  
  if (isExec) {
    ctx.fillStyle = '#0F172A';
    ctx.fillRect(0, 0, W, 150);
  } else if (INVOICE_STATE.theme === 'creative') {
    var grad = ctx.createLinearGradient(0, 0, W, 0);
    grad.addColorStop(0, accent);
    grad.addColorStop(1, '#818CF8');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, 14);
  } else {
    ctx.fillStyle = accent;
    ctx.fillRect(0, 0, W, 10);
  }
  
  // Left: Logo or Sender Brand Title
  var leftX = pad;
  var logoHeight = 56;
  
  if (logoImg && logoImg.width > 0) {
    var ratio = logoImg.width / logoImg.height;
    var drawW = Math.min(200, logoHeight * ratio);
    ctx.drawImage(logoImg, leftX, topY, drawW, logoHeight);
    leftX += drawW + 18;
  }
  
  // Sender Name
  ctx.font = '700 32px ' + font + ', sans-serif';
  ctx.fillStyle = isExec ? '#FFFFFF' : '#0F172A';
  ctx.textAlign = 'left';
  ctx.fillText(INVOICE_STATE.senderName || 'Your Business Name', leftX, topY + (logoImg ? 38 : 30));
  
  // Right: Document Title (INVOICE / QUOTATION) & Status Badge
  var rightX = W - pad;
  ctx.textAlign = 'right';
  ctx.font = '800 42px ' + font + ', sans-serif';
  ctx.fillStyle = isExec ? '#FFFFFF' : accent;
  ctx.fillText(INVOICE_STATE.docType, rightX, topY + 32);
  
  // Status Pill Badge
  var status = INVOICE_STATE.status || 'PENDING';
  var badgeW = 110;
  var badgeH = 32;
  var badgeX = rightX - badgeW;
  var badgeY = topY + 48;
  
  ctx.save();
  var badgeBg = '#FEF3C7', badgeColor = '#B45309'; // Amber pending
  if (status === 'PAID') { badgeBg = '#DCFCE7'; badgeColor = '#15803D'; }
  else if (status === 'APPROVED') { badgeBg = '#E0E7FF'; badgeColor = '#4338CA'; }
  else if (status === 'DRAFT') { badgeBg = '#F3F4F6'; badgeColor = '#4B5563'; }
  
  roundRect(ctx, badgeX, badgeY, badgeW, badgeH, 16);
  ctx.fillStyle = badgeBg;
  ctx.fill();
  ctx.font = '700 14px ' + font + ', sans-serif';
  ctx.fillStyle = badgeColor;
  ctx.textAlign = 'center';
  ctx.fillText(status, badgeX + (badgeW / 2), badgeY + 21);
  ctx.restore();
  
  // Divider / Transition below header
  var curY = isExec ? 190 : 145;
  
  // 3. Sender Info & Client / Meta Columns
  var col1X = pad;
  var col2X = pad + 380;
  var col3X = W - pad - 290;
  
  // FROM Column
  ctx.textAlign = 'left';
  ctx.font = '700 13px ' + font + ', sans-serif';
  ctx.fillStyle = '#64748B';
  ctx.fillText('FROM', col1X, curY);
  
  ctx.font = '700 19px ' + font + ', sans-serif';
  ctx.fillStyle = '#0F172A';
  ctx.fillText(INVOICE_STATE.senderName || '', col1X, curY + 28);
  
  // Format Sender Tax ID
  var senderTaxDisplay = (INVOICE_STATE.senderTaxId || '').trim();
  if (senderTaxDisplay) {
    var typeInfo = TAX_ID_TYPES[INVOICE_STATE.taxType || 'GSTIN'] || TAX_ID_TYPES.CUSTOM;
    if (typeInfo && typeInfo.prefix && !senderTaxDisplay.toUpperCase().startsWith(typeInfo.prefix.trim().toUpperCase()) && !senderTaxDisplay.includes(':')) {
      senderTaxDisplay = typeInfo.prefix + senderTaxDisplay;
    }
  }
  
  ctx.font = '400 16px ' + font + ', sans-serif';
  ctx.fillStyle = '#475569';
  var senderLines = [
    INVOICE_STATE.senderEmail,
    INVOICE_STATE.senderPhone,
    INVOICE_STATE.senderAddress,
    senderTaxDisplay
  ].filter(Boolean);
  
  var lineOffset = 54;
  senderLines.forEach(function(line) {
    ctx.fillText(line, col1X, curY + lineOffset);
    lineOffset += 24;
  });
  
  // BILL TO Column
  ctx.font = '700 13px ' + font + ', sans-serif';
  ctx.fillStyle = '#64748B';
  ctx.fillText('BILL TO', col2X, curY);
  
  ctx.font = '700 20px ' + font + ', sans-serif';
  ctx.fillStyle = '#0F172A';
  ctx.fillText(INVOICE_STATE.clientName || 'Client Name', col2X, curY + 28);
  
  var cOffset = 54;
  if (INVOICE_STATE.clientCompany) {
    ctx.font = '600 17px ' + font + ', sans-serif';
    ctx.fillStyle = '#334155';
    ctx.fillText(INVOICE_STATE.clientCompany, col2X, curY + cOffset);
    cOffset += 24;
  }
  
  // Format Client Tax ID
  var clientTaxDisplay = (INVOICE_STATE.clientTaxId || '').trim();
  if (clientTaxDisplay && !clientTaxDisplay.includes(':')) {
    var cPrefix = (INVOICE_STATE.taxType === 'GSTIN') ? 'GSTIN: ' : (INVOICE_STATE.taxType === 'VAT_UK' || INVOICE_STATE.taxType === 'VAT_EU') ? 'VAT: ' : 'Tax ID: ';
    clientTaxDisplay = cPrefix + clientTaxDisplay;
  }
  
  ctx.font = '400 16px ' + font + ', sans-serif';
  ctx.fillStyle = '#475569';
  var clientLines = [
    INVOICE_STATE.clientEmail,
    INVOICE_STATE.clientPhone,
    INVOICE_STATE.clientAddress,
    clientTaxDisplay
  ].filter(Boolean);
  
  clientLines.forEach(function(line) {
    ctx.fillText(line, col2X, curY + cOffset);
    cOffset += 24;
  });
  
  // META Column (Doc Number, Issue Date, Due Date)
  ctx.font = '700 13px ' + font + ', sans-serif';
  ctx.fillStyle = '#64748B';
  ctx.fillText('DOCUMENT DETAILS', col3X, curY);
  
  var metaDetails = [
    { label: INVOICE_STATE.docType + ' #', val: INVOICE_STATE.docNumber || '001' },
    { label: 'Issue Date:', val: formatDate(INVOICE_STATE.issueDate) },
    { label: 'Due Date:', val: formatDate(INVOICE_STATE.dueDate) }
  ];
  
  var mOffset = 28;
  metaDetails.forEach(function(m) {
    ctx.font = '600 16.5px ' + font + ', sans-serif';
    ctx.fillStyle = '#64748B';
    ctx.fillText(m.label, col3X, curY + mOffset);
    
    ctx.textAlign = 'right';
    ctx.font = '700 17px ' + font + ', sans-serif';
    ctx.fillStyle = '#0F172A';
    ctx.fillText(m.val, W - pad, curY + mOffset);
    ctx.textAlign = 'left';
    
    mOffset += 30;
  });
  
  // 4. Line Items Table Header
  curY += Math.max(lineOffset, cOffset, mOffset) + 40;
  
  // Table Header Background
  var tblW = W - (pad * 2);
  var tblH = 46;
  ctx.fillStyle = isExec ? '#F1F5F9' : '#F8FAFC';
  roundRect(ctx, pad, curY, tblW, tblH, 8);
  ctx.fill();
  
  // Table Header text
  ctx.font = '700 14px ' + font + ', sans-serif';
  ctx.fillStyle = '#475569';
  
  var colItemX = pad + 20;
  var colQtyX  = pad + tblW - 360;
  var colRateX = pad + tblW - 200;
  var colTotX  = pad + tblW - 20;
  
  ctx.textAlign = 'left';
  ctx.fillText('DESCRIPTION', colItemX, curY + 28);
  
  ctx.textAlign = 'right';
  ctx.fillText('QTY', colQtyX, curY + 28);
  ctx.fillText('RATE', colRateX, curY + 28);
  ctx.fillText('AMOUNT', colTotX, curY + 28);
  
  curY += tblH + 10;
  
  // 5. Line Items Rows
  INVOICE_STATE.items.forEach(function(item, idx) {
    var lineH = 48;
    
    // Optional light alternate row striping
    if (idx % 2 === 1) {
      ctx.fillStyle = '#FAFAFD';
      ctx.fillRect(pad, curY - 6, tblW, lineH);
    }
    
    // Item Description
    ctx.textAlign = 'left';
    ctx.font = '500 17.5px ' + font + ', sans-serif';
    ctx.fillStyle = '#1E293B';
    ctx.fillText(item.description, colItemX, curY + 22);
    
    // Qty
    ctx.textAlign = 'right';
    ctx.font = '400 17.5px ' + font + ', sans-serif';
    ctx.fillStyle = '#475569';
    ctx.fillText(item.qty.toString(), colQtyX, curY + 22);
    
    // Rate
    ctx.fillText(sym + item.rate.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }), colRateX, curY + 22);
    
    // Line Total
    ctx.font = '700 18px ' + font + ', sans-serif';
    ctx.fillStyle = '#0F172A';
    ctx.fillText(sym + (item.qty * item.rate).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }), colTotX, curY + 22);
    
    // Subtle separator line
    ctx.strokeStyle = '#E2E8F0';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(pad, curY + 36);
    ctx.lineTo(pad + tblW, curY + 36);
    ctx.stroke();
    
    curY += lineH + 6;
  });
  
  curY += 24;
  
  // 6. Lower Section: Left (Payment Details & Notes) vs Right (Financial Totals)
  var summaryBoxW = 380;
  var summaryX = W - pad - summaryBoxW;
  var notesW = tblW - summaryBoxW - 54;
  
  // Left: Payment Terms & Notes
  var notesY = curY;
  if (INVOICE_STATE.paymentTerms) {
    ctx.textAlign = 'left';
    ctx.font = '700 13px ' + font + ', sans-serif';
    ctx.fillStyle = '#64748B';
    ctx.fillText('PAYMENT INSTRUCTIONS', pad, notesY);
    
    ctx.font = '400 15.5px ' + font + ', sans-serif';
    ctx.fillStyle = '#334155';
    var payLines = INVOICE_STATE.paymentTerms.split('\n');
    var pY = notesY + 26;
    payLines.forEach(function(l) {
      ctx.fillText(l, pad, pY);
      pY += 24;
    });
    notesY = pY + 20;
  }
  
  if (INVOICE_STATE.notes) {
    ctx.textAlign = 'left';
    ctx.font = '700 13px ' + font + ', sans-serif';
    ctx.fillStyle = '#64748B';
    ctx.fillText('NOTES & TERMS', pad, notesY);
    
    ctx.font = '400 15px ' + font + ', sans-serif';
    ctx.fillStyle = '#64748B';
    var noteLines = wrapTextLines(ctx, INVOICE_STATE.notes, notesW);
    var nY = notesY + 24;
    noteLines.forEach(function(nl) {
      ctx.fillText(nl, pad, nY);
      nY += 22;
    });
  }
  
  // Right: Summary Calculations Table
  var sumY = curY;
  
  // Subtotal
  ctx.textAlign = 'left';
  ctx.font = '500 17.5px ' + font + ', sans-serif';
  ctx.fillStyle = '#64748B';
  ctx.fillText('Subtotal', summaryX, sumY);
  ctx.textAlign = 'right';
  ctx.font = '700 18px ' + font + ', sans-serif';
  ctx.fillStyle = '#0F172A';
  ctx.fillText(sym + totals.subtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }), W - pad, sumY);
  sumY += 32;
  
  // Discount
  if (totals.discount > 0) {
    ctx.textAlign = 'left';
    ctx.font = '500 17.5px ' + font + ', sans-serif';
    ctx.fillStyle = '#10B981';
    var discLabel = 'Discount' + (INVOICE_STATE.discountType === 'percent' ? ' (' + INVOICE_STATE.discountValue + '%)' : '');
    ctx.fillText(discLabel, summaryX, sumY);
    ctx.textAlign = 'right';
    ctx.font = '700 18px ' + font + ', sans-serif';
    ctx.fillText('-' + sym + totals.discount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }), W - pad, sumY);
    sumY += 32;
  }
  
  // Tax / VAT
  if (INVOICE_STATE.taxRate > 0) {
    ctx.textAlign = 'left';
    ctx.font = '500 17.5px ' + font + ', sans-serif';
    ctx.fillStyle = '#64748B';
    ctx.fillText('Tax (' + INVOICE_STATE.taxRate + '%)', summaryX, sumY);
    ctx.textAlign = 'right';
    ctx.font = '700 18px ' + font + ', sans-serif';
    ctx.fillStyle = '#0F172A';
    ctx.fillText(sym + totals.taxAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }), W - pad, sumY);
    sumY += 32;
  }
  
  // Shipping / Fee
  if (INVOICE_STATE.shipping > 0) {
    ctx.textAlign = 'left';
    ctx.font = '500 17.5px ' + font + ', sans-serif';
    ctx.fillStyle = '#64748B';
    ctx.fillText('Shipping / Fee', summaryX, sumY);
    ctx.textAlign = 'right';
    ctx.font = '700 18px ' + font + ', sans-serif';
    ctx.fillStyle = '#0F172A';
    ctx.fillText(sym + INVOICE_STATE.shipping.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }), W - pad, sumY);
    sumY += 32;
  }
  
  sumY += 12;
  
  // Grand Total Card Box
  var grandBoxH = 76;
  roundRect(ctx, summaryX - 14, sumY, summaryBoxW + 14, grandBoxH, 10);
  ctx.fillStyle = '#F8FAFC';
  ctx.fill();
  ctx.strokeStyle = accent;
  ctx.lineWidth = 1.8;
  ctx.stroke();
  
  ctx.textAlign = 'left';
  ctx.font = '700 20px ' + font + ', sans-serif';
  ctx.fillStyle = '#0F172A';
  ctx.fillText('Total Due', summaryX + 4, sumY + 45);
  
  ctx.textAlign = 'right';
  ctx.font = '800 32px ' + font + ', sans-serif';
  ctx.fillStyle = accent;
  ctx.fillText(sym + totals.grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }), W - pad - 6, sumY + 47);
  
  // 7. Footer: Thank You Watermark / Clean Signature line
  var footY = H - 52;
  ctx.strokeStyle = '#E2E8F0';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(pad, footY - 24);
  ctx.lineTo(W - pad, footY - 24);
  ctx.stroke();
  
  ctx.textAlign = 'left';
  ctx.font = '500 14px ' + font + ', sans-serif';
  ctx.fillStyle = '#94A3B8';
  ctx.fillText('Generated with CreatorKit Studio • Professional Client-Side Billing', pad, footY);
  
  ctx.textAlign = 'right';
  ctx.fillText('Page 1 of 1', W - pad, footY);
}

/* -------------------------------------------
   Export: PDF, PNG, Print
   ------------------------------------------- */
function downloadInvoicePDF() {
  var canvas = $('invoiceCanvas');
  if (!canvas) { showToast('No document to export'); return; }
  if (typeof window.jspdf === 'undefined') { showToast('Loading PDF engine…'); return; }
  
  var jsPDF = window.jspdf.jsPDF;
  var doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });
  
  var data = canvas.toDataURL('image/jpeg', 0.95);
  doc.addImage(data, 'JPEG', 0, 0, 210, 297); // Standard A4 mm dimensions
  
  var filename = (INVOICE_STATE.docType || 'INVOICE') + '_' + (INVOICE_STATE.docNumber || '001') + '.pdf';
  doc.save(filename);
  showToast('✓ PDF Invoice downloaded!');
}

function downloadInvoicePNG() {
  var canvas = $('invoiceCanvas');
  if (!canvas) return;
  var url = canvas.toDataURL('image/png');
  var filename = (INVOICE_STATE.docType || 'INVOICE') + '_' + (INVOICE_STATE.docNumber || '001') + '.png';
  triggerDownload(url, filename);
  showToast('✓ High-Res PNG downloaded!');
}

function printInvoice() {
  var canvas = $('invoiceCanvas');
  if (!canvas) return;
  var dataUrl = canvas.toDataURL('image/png');
  
  var win = window.open('', '_blank');
  win.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${escapeHtml(INVOICE_STATE.docType)} - ${escapeHtml(INVOICE_STATE.docNumber)}</title>
        <style>
          @page { size: A4; margin: 0; }
          body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; }
          img { width: 100%; height: 100vh; object-fit: contain; }
        </style>
      </head>
      <body>
        <img src="${dataUrl}" onload="window.print(); window.close();" />
      </body>
    </html>
  `);
  win.document.close();
}

/* -------------------------------------------
   Canvas Helper Utilities
   ------------------------------------------- */
function roundRect(ctx, x, y, width, height, radius) {
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

function wrapTextLines(ctx, text, maxWidth) {
  var words = text.split(' ');
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

function formatDate(dateStr) {
  if (!dateStr) return '';
  var parts = dateStr.split('-');
  if (parts.length === 3) {
    var d = new Date(parts[0], parts[1] - 1, parts[2]);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }
  return dateStr;
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
