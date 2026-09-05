/* =============================================
   research.js — Topic Research + Gemini AI
   Wikipedia search, AI summarization,
   article selection → Poster / Carousel
   ============================================= */
'use strict';

/* -------- State -------- */
var RESEARCH_ARTICLES = [];
var RESEARCH_CHECKED = new Set();
var RESEARCH_TOPIC = '';
var GEMINI_KEY = '';
var GEMINI_MODEL = 'gemini-3.6-flash';
var RESEARCH_SOURCE = 'ai'; // 'ai' | 'wiki' | 'both'

/* -------- Init -------- */
document.addEventListener('DOMContentLoaded', function() {
  // Load saved Gemini key, model & source
  GEMINI_KEY = localStorage.getItem('ck-gemini-key') || '';
  GEMINI_MODEL = localStorage.getItem('ck-gemini-model') || 'gemini-3.6-flash';
  RESEARCH_SOURCE = localStorage.getItem('ck-research-source') || 'ai';

  if (GEMINI_KEY) {
    $('rGeminiKey').value = GEMINI_KEY;
    updateAiBadge(true);
  }
  if ($('rGeminiModel')) {
    $('rGeminiModel').value = GEMINI_MODEL;
  }
  updateResearchSourceUI(RESEARCH_SOURCE);
});

/* -------- Source Switcher -------- */
function saveResearchSource(src) {
  RESEARCH_SOURCE = src;
  localStorage.setItem('ck-research-source', src);
  updateResearchSourceUI(src);
}

function updateResearchSourceUI(src) {
  var opts = { 'ai': 'srcOptAi', 'wiki': 'srcOptWiki', 'both': 'srcOptBoth' };
  Object.keys(opts).forEach(function(k) {
    var el = $(opts[k]);
    if (!el) return;
    var isSel = k === src;
    el.classList.toggle('active', isSel);
    var radio = el.querySelector('input[type="radio"]');
    if (radio) radio.checked = isSel;
  });
}

/* -------- Gemini Key & Model -------- */
function toggleAiKey() {
  var panel = $('rAiKeyPanel');
  panel.classList.toggle('hidden');
}

function saveGeminiKey() {
  GEMINI_KEY = $('rGeminiKey').value.trim();
  localStorage.setItem('ck-gemini-key', GEMINI_KEY);
  updateAiBadge(!!GEMINI_KEY);
}

function saveGeminiModel() {
  GEMINI_MODEL = $('rGeminiModel').value;
  localStorage.setItem('ck-gemini-model', GEMINI_MODEL);
  showToast('✓ Gemini model set to ' + GEMINI_MODEL);
}

function updateAiBadge(on) {
  var badge = $('rAiStatus');
  badge.textContent = on ? 'ON ✦' : 'OFF';
  badge.className = 'ai-badge ' + (on ? 'ai-on' : 'ai-off');
}

/* -------- Main Search -------- */
async function doResearch() {
  var topic = ($('rTopic').value || '').trim();
  if (!topic) { $('rTopic').focus(); return; }

  RESEARCH_TOPIC = topic;
  RESEARCH_ARTICLES = [];
  RESEARCH_CHECKED = new Set();
  updateSelectionUI();

  // Show loading
  $('rEmpty').classList.add('hidden');
  $('rResults').classList.add('hidden');
  $('rError').classList.add('hidden');
  $('rLoading').classList.remove('hidden');
  $('rSearchBtn').disabled = true;
  $('rSearchBtn').textContent = 'Searching…';

  try {
    var articles = [];

    if (RESEARCH_SOURCE === 'ai') {
      // 1. Direct Gemini AI Deep Technical Research
      if (!GEMINI_KEY) {
        // Auto open AI key panel if no key provided
        $('rAiKeyPanel').classList.remove('hidden');
        throw new Error('Please paste your free Google Gemini API key above to enable AI Deep Research!');
      }
      showToast('✦ Gemini AI Deep Research for "' + topic + '"');
      articles = await geminiGenerateResearch(topic);

    } else if (RESEARCH_SOURCE === 'wiki') {
      // 2. Wikipedia-only Search
      articles = await fetchWikipedia(topic);
      if (!articles.length) {
        var words = topic.split(/\s+/).filter(Boolean);
        if (words.length > 1) {
          articles = await fetchWikipedia(words[0]);
        }
      }
      if (!articles.length) {
        throw new Error('No Wikipedia articles found for "' + topic + '". Try "Gemini AI Deep Research" option above!');
      }
      // In-browser sentence scoring fallback
      articles = articles.map(function(a) {
        var extracted = extractKeyPointsFallback(a.summary, topic);
        return Object.assign({}, a, extracted, { aiEnriched: false });
      });

    } else {
      // 3. Both (Wikipedia + Gemini AI Enrichment)
      articles = await fetchWikipedia(topic);
      if (!articles.length) {
        var words = topic.split(/\s+/).filter(Boolean);
        if (words.length > 1) {
          articles = await fetchWikipedia(words[0]);
        }
      }
      if (!articles.length) {
        throw new Error('No Wikipedia articles found for "' + topic + '".');
      }
      articles = await enrichArticles(articles, topic);
    }

    RESEARCH_ARTICLES = articles;

    $('rLoading').classList.add('hidden');
    $('rResults').classList.remove('hidden');
    renderCards(articles);
    renderLinks(articles);
    updateBarLabel();
  } catch(err) {
    $('rLoading').classList.add('hidden');
    $('rError').textContent = '⚠ ' + (err.message || 'Something went wrong. Check your connection and try again.');
    $('rError').classList.remove('hidden');
  }

  $('rSearchBtn').disabled = false;
  $('rSearchBtn').textContent = 'Search';
}

/* -------- Wikipedia API -------- */
async function fetchWikipedia(topic) {
  // Step 1: search for pages
  var searchUrl = 'https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch='
    + encodeURIComponent(topic) + '&srlimit=8&format=json&origin=*';
  var searchRes = await fetch(searchUrl);
  if (!searchRes.ok) throw new Error('Wikipedia search failed (HTTP ' + searchRes.status + ')');
  var searchData = await searchRes.json();
  var hits = (searchData.query && searchData.query.search) || [];
  if (!hits.length) return [];

  // Step 2: fetch summaries for top 6 results in parallel
  var top = hits.slice(0, 6);
  var summaries = await Promise.all(top.map(function(hit) {
    return fetchWikiSummary(hit.title).catch(function() { return null; });
  }));

  return summaries.filter(Boolean);
}

async function fetchWikiSummary(title) {
  var url = 'https://en.wikipedia.org/api/rest_v1/page/summary/' + encodeURIComponent(title);
  var res = await fetch(url);
  if (!res.ok) return null;
  var data = await res.json();
  if (data.type === 'disambiguation') return null; // skip disambiguation pages

  return {
    id: data.pageid || title,
    title: data.title || title,
    summary: data.extract || '',
    url: (data.content_urls && data.content_urls.desktop && data.content_urls.desktop.page)
         || ('https://en.wikipedia.org/wiki/' + encodeURIComponent(title)),
    thumbnail: (data.thumbnail && data.thumbnail.source) || null,
    wordCount: data.extract ? data.extract.split(/\s+/).length : 0,
    type: 'wikipedia',
    aiEnriched: false,
    keyPoints: [],
    stats: [],
    bestQuote: '',
    oneLiner: ''
  };
}

/* -------- Gemini Enrichment -------- */
async function enrichArticles(articles, topic) {
  if (!GEMINI_KEY) {
    // Fallback: in-browser extraction
    return articles.map(function(a) {
      var extracted = extractKeyPointsFallback(a.summary, topic);
      return Object.assign({}, a, extracted, { aiEnriched: false });
    });
  }

  var enriched = [];
  var hasErrors = false;
  for (var i = 0; i < articles.length; i += 3) {
    var batch = articles.slice(i, i + 3);
    var results = await Promise.all(batch.map(function(article) {
      return geminiEnrich(article, topic).catch(function(err) {
        hasErrors = true;
        console.warn('Gemini AI failed for article "' + article.title + '":', err);
        var extracted = extractKeyPointsFallback(article.summary, topic);
        return Object.assign({}, article, extracted, { aiEnriched: false, aiError: err.message });
      });
    }));
    enriched = enriched.concat(results);
  }
  if (hasErrors) {
    showToast('⚠ Some articles used fallback due to API error. Check Console (F12).');
  }
  return enriched;
}

async function geminiEnrich(article, topic) {
  var prompt = 'You are a research assistant helping a content creator.\n\n'
    + 'Topic being researched: "' + topic + '"\n'
    + 'Article title: "' + article.title + '"\n'
    + 'Article text: "' + article.summary.slice(0, 1200) + '"\n\n'
    + 'Return ONLY a valid JSON object with this exact structure:\n'
    + '{\n'
    + '  "keyPoints": ["point 1 (max 12 words)", "point 2", "point 3"],\n'
    + '  "stats": ["any statistic or number mentioned with context"],\n'
    + '  "bestQuote": "the single most impactful or shareable sentence from the article",\n'
    + '  "oneLiner": "one sentence (max 20 words) summarizing the whole article"\n'
    + '}';

  var modelToUse = GEMINI_MODEL || 'gemini-1.5-flash';
  var endpoint = 'https://generativelanguage.googleapis.com/v1beta/models/' + modelToUse + ':generateContent?key=' + GEMINI_KEY;

  var requestBody = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: 0.2,
      maxOutputTokens: 2048
    }
  };

  // Add JSON response mime type for models that support structured output (1.5-flash, 1.5-pro, 2.0-flash)
  if (!modelToUse.includes('thinking')) {
    requestBody.generationConfig.responseMimeType = 'application/json';
  }

  var res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody)
  });

  if (!res.ok) {
    var errData = await res.json().catch(function() { return {}; });
    var errMsg = (errData.error && errData.error.message) || ('HTTP ' + res.status);
    console.warn('Gemini API Error (' + modelToUse + '):', errMsg);

    // If model is not found (404), auto-fallback to gemini-3.6-flash
    if (res.status === 404 && modelToUse !== 'gemini-3.6-flash') {
      console.warn('Model ' + modelToUse + ' not available on key/region, retrying with gemini-3.6-flash...');
      var fallbackUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=' + GEMINI_KEY;
      var fallbackBody = JSON.parse(JSON.stringify(requestBody));
      fallbackBody.generationConfig.responseMimeType = 'application/json';
      res = await fetch(fallbackUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fallbackBody)
      });
      if (!res.ok) {
        throw new Error('Gemini API Error: ' + errMsg);
      }
      modelToUse = 'gemini-3.6-flash (fallback)';
    } else {
      throw new Error('Gemini API Error: ' + errMsg);
    }
  }

  var data = await res.json();
  var parts = (data.candidates && data.candidates[0] &&
               data.candidates[0].content && data.candidates[0].content.parts) || [];

  // Find the text part (skip thinking parts if present)
  var text = '';
  for (var p = 0; p < parts.length; p++) {
    var part = parts[p];
    if (part.text && !part.thought) {
      text = part.text;
      // If we find JSON structure, break
      if (text.includes('{')) break;
    }
  }
  // Fallback to last part text if no non-thought part matched
  if (!text && parts.length) {
    text = parts[parts.length - 1].text || '';
  }

  if (!text) throw new Error('Empty response from Gemini API');

  // Strip markdown code fences if present
  text = text.replace(/```json/gi, '').replace(/```/g, '').trim();

  // Parse JSON from response
  var jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('Could not find JSON in response: ' + text.slice(0, 100));
  var parsed = JSON.parse(jsonMatch[0]);

  return Object.assign({}, article, {
    keyPoints: parsed.keyPoints || [],
    stats: parsed.stats || [],
    bestQuote: parsed.bestQuote || '',
    oneLiner: parsed.oneLiner || '',
    aiEnriched: true,
    modelUsed: modelToUse
  });
}

/* -------- Gemini AI Deep Research Generator for Tech Topics -------- */
async function geminiGenerateResearch(topic) {
  var prompt = 'You are a senior technical writer and developer researcher.\n'
    + 'Research topic: "' + topic + '"\n\n'
    + 'Generate 3 to 4 comprehensive, distinct technical research breakdown cards for this topic.\n'
    + 'Return ONLY a JSON array (no markdown code blocks, no intro text) of objects with this exact structure:\n'
    + '[\n'
    + '  {\n'
    + '    "title": "Article or Section Title (e.g., BLoC vs Riverpod Architecture)",\n'
    + '    "summary": "Detailed technical summary of this section (2-3 sentences)",\n'
    + '    "keyPoints": ["bullet point 1", "bullet point 2", "bullet point 3"],\n'
    + '    "stats": ["performance metric or stat or code concept"],\n'
    + '    "bestQuote": "Key takeaway or rule of thumb",\n'
    + '    "oneLiner": "One sentence quick overview",\n'
    + '    "url": "https://pub.dev or https://flutter.dev or relevant doc URL"\n'
    + '  }\n'
    + ']';

  var modelToUse = GEMINI_MODEL || 'gemini-1.5-flash';
  var endpoint = 'https://generativelanguage.googleapis.com/v1beta/models/' + modelToUse + ':generateContent?key=' + GEMINI_KEY;

  var requestBody = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: 0.2,
      maxOutputTokens: 3000
    }
  };

  if (!modelToUse.includes('thinking')) {
    requestBody.generationConfig.responseMimeType = 'application/json';
  }

  var res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody)
  });

  if (!res.ok) {
    throw new Error('Gemini Research failed (HTTP ' + res.status + ')');
  }

  var data = await res.json();
  var parts = (data.candidates && data.candidates[0] &&
               data.candidates[0].content && data.candidates[0].content.parts) || [];

  var text = '';
  for (var p = 0; p < parts.length; p++) {
    if (parts[p].text && !parts[p].thought) {
      text = parts[p].text;
      if (text.includes('[')) break;
    }
  }
  if (!text && parts.length) text = parts[parts.length - 1].text || '';

  text = text.replace(/```json/gi, '').replace(/```/g, '').trim();

  var jsonMatch = text.match(/\[[\s\S]*\]/);
  if (!jsonMatch) throw new Error('Invalid response structure from Gemini Research');

  var list = JSON.parse(jsonMatch[0]);

  return list.map(function(item, idx) {
    return {
      id: 'ai-res-' + idx,
      title: item.title || (topic + ' Part ' + (idx + 1)),
      summary: item.summary || '',
      url: item.url || 'https://flutter.dev',
      thumbnail: null,
      wordCount: item.summary ? item.summary.split(/\s+/).length : 0,
      type: 'ai-research',
      aiEnriched: true,
      modelUsed: modelToUse,
      keyPoints: item.keyPoints || [],
      stats: item.stats || [],
      bestQuote: item.bestQuote || '',
      oneLiner: item.oneLiner || ''
    };
  });
}

/* -------- In-browser fallback extraction -------- */
function extractKeyPointsFallback(text, topic) {
  if (!text) return { keyPoints: [], stats: [], bestQuote: '', oneLiner: '' };

  // Split into sentences
  var sentences = text.split(/(?<=[.!?])\s+/).map(function(s) { return s.trim(); }).filter(function(s) { return s.length > 20; });

  // Score sentences
  var topicWords = (topic || '').toLowerCase().split(/\s+/);
  var scored = sentences.map(function(s) {
    var sl = s.toLowerCase();
    var score = 0;
    // Numbers boost
    var numCount = (s.match(/\d/g) || []).length;
    score += numCount * 2;
    // Topic keyword match
    topicWords.forEach(function(w) { if (w && sl.includes(w)) score += 3; });
    // Good length (10-35 words)
    var wordCount = s.split(/\s+/).length;
    if (wordCount >= 10 && wordCount <= 35) score += 1;
    return { text: s, score: score };
  });
  scored.sort(function(a, b) { return b.score - a.score; });

  // Stats: sentences with numbers
  var stats = scored.filter(function(s) { return /\d/.test(s.text); }).slice(0, 2).map(function(s) {
    return s.text.replace(/^[^A-Z]/, function(c) { return c.toUpperCase(); });
  });

  // Key points: top 3 unique sentences
  var keyPoints = [];
  scored.forEach(function(s) {
    if (keyPoints.length >= 3) return;
    var shortened = s.text.split(/\s+/).slice(0, 14).join(' ');
    if (shortened.length < s.text.length) shortened += '…';
    if (!keyPoints.includes(shortened)) keyPoints.push(shortened);
  });

  var bestQuote = sentences[0] || '';
  var oneLiner = sentences[0] ? sentences[0].split(/\s+/).slice(0, 18).join(' ') + (sentences[0].split(/\s+/).length > 18 ? '…' : '') : '';

  return { keyPoints: keyPoints, stats: stats, bestQuote: bestQuote, oneLiner: oneLiner };
}

/* -------- Granular Snippet Selection State -------- */
var RESEARCH_SNIPPETS = new Map(); // key: snippet text, val: { type, cardIdx, title }
var _floatingBadge = null;

/* -------- Floating Selection Popover -------- */
document.addEventListener('mouseup', function(e) {
  var cardsContainer = $('rCards');
  if (!cardsContainer || !cardsContainer.contains(e.target)) {
    hideFloatingBadge();
    return;
  }
  var sel = window.getSelection();
  var selectedText = sel ? sel.toString().trim() : '';

  if (selectedText.length >= 6) {
    showFloatingBadge(e.clientX, e.clientY, selectedText);
  } else {
    // Delay slightly to prevent premature hide during click
    setTimeout(function() {
      var newSel = window.getSelection();
      if (!newSel || !newSel.toString().trim()) hideFloatingBadge();
    }, 150);
  }
});

function showFloatingBadge(x, y, text) {
  hideFloatingBadge();
  var badge = document.createElement('div');
  badge.className = 'floating-sel-badge';
  badge.innerHTML = '✦ Mark snippet "' + escHtml(text.slice(0, 22)) + (text.length > 22 ? '…' : '') + '"';
  badge.style.left = Math.min(x, window.innerWidth - 180) + 'px';
  badge.style.top = (y - 42) + 'px';
  badge.onclick = function(ev) {
    ev.stopPropagation();
    ev.preventDefault();
    toggleSnippet(text, 'custom', null, -1);
    hideFloatingBadge();
    window.getSelection().removeAllRanges();
    showToast('✓ Snippet marked!');
  };
  document.body.appendChild(badge);
  _floatingBadge = badge;
}

function hideFloatingBadge() {
  if (_floatingBadge && _floatingBadge.parentNode) {
    _floatingBadge.parentNode.removeChild(_floatingBadge);
  }
  _floatingBadge = null;
}

/* -------- Render Summary Cards -------- */
function renderCards(articles) {
  var container = $('rCards');
  container.innerHTML = '';

  articles.forEach(function(article, idx) {
    var card = document.createElement('div');
    card.className = 'article-card' + (RESEARCH_CHECKED.has(idx) ? ' checked' : '');
    card.dataset.idx = idx;

    var html = '<div class="card-top">';
    html += '<div class="card-checkbox" title="Select all text in this card" onclick="event.stopPropagation(); toggleCardAllSnippets(' + idx + ', this.closest(\'.article-card\'))">✓</div>';

    if (article.thumbnail) {
      html += '<img class="card-thumbnail" src="' + escHtml(article.thumbnail) + '" alt="" loading="lazy">';
    }

    html += '<div class="card-meta">';
    html += '<div class="card-title">' + escHtml(article.title) + '</div>';
    html += '<div class="card-tags">';
    if (article.type === 'ai-research') {
      html += '<span class="card-tag wiki" style="color:#A896FF;background:rgba(124,110,250,0.15);border-color:var(--acc-line)">✦ Deep Research</span>';
    } else {
      html += '<span class="card-tag wiki">Wikipedia</span>';
    }
    if (article.wordCount) html += '<span class="card-tag">' + article.wordCount + ' words</span>';
    if (article.aiEnriched) html += '<span class="card-tag" style="color:#4ADE80;background:rgba(74,222,128,0.1);border-color:rgba(74,222,128,0.25)">✦ AI (' + escHtml(article.modelUsed || GEMINI_MODEL) + ')</span>';
    html += '</div>';
    html += '</div>'; // card-meta
    html += '</div>'; // card-top

    // Summary line
    var summaryText = article.oneLiner || article.summary.slice(0, 220);
    if (summaryText) {
      var isMarked = RESEARCH_SNIPPETS.has(summaryText);
      html += '<div class="card-summary"><span class="snippet-mark' + (isMarked ? ' marked' : '') + '" onclick="event.stopPropagation(); toggleSnippet(' + attrEsc(summaryText) + ', \'summary\', this, ' + idx + ')">' + escHtml(summaryText) + '</span></div>';
    }

    // Key points (bullets)
    if (article.keyPoints && article.keyPoints.length) {
      html += '<ul class="card-points">';
      article.keyPoints.forEach(function(p) {
        var isMarked = RESEARCH_SNIPPETS.has(p);
        html += '<li class="' + (isMarked ? 'marked' : '') + '" onclick="event.stopPropagation(); toggleSnippet(' + attrEsc(p) + ', \'bullet\', this, ' + idx + ')">' + escHtml(p) + '</li>';
      });
      html += '</ul>';
    }

    // Stats
    if (article.stats && article.stats.length) {
      html += '<div class="card-stats">';
      article.stats.forEach(function(s) {
        var numMatch = s.match(/\d[\d,.%x+k]*/i);
        var label = numMatch ? numMatch[0] : s.slice(0, 20);
        var isMarked = RESEARCH_SNIPPETS.has(s);
        html += '<span class="card-stat' + (isMarked ? ' marked' : '') + '" title="' + escHtml(s) + '" onclick="event.stopPropagation(); toggleSnippet(' + attrEsc(s) + ', \'stat\', this, ' + idx + ')">' + escHtml(label) + '</span>';
      });
      html += '</div>';
    }

    // Best Quote
    if (article.bestQuote) {
      var quoteText = article.bestQuote.slice(0, 180);
      var isMarked = RESEARCH_SNIPPETS.has(quoteText);
      html += '<div class="card-quote' + (isMarked ? ' marked' : '') + '" onclick="event.stopPropagation(); toggleSnippet(' + attrEsc(quoteText) + ', \'quote\', this, ' + idx + ')">“' + escHtml(quoteText) + '”</div>';
    }

    card.innerHTML = html;
    container.appendChild(card);
  });
}

/* -------- Render Link List -------- */
function renderLinks(articles) {
  var container = $('rLinks');
  container.innerHTML = '';

  articles.forEach(function(article, idx) {
    var item = document.createElement('div');
    item.className = 'link-item' + (RESEARCH_CHECKED.has(idx) ? ' linked' : '');
    item.dataset.idx = idx;

    var domain = 'en.wikipedia.org';
    try { domain = new URL(article.url).hostname; } catch(e) {}

    var html = '<span class="link-num">' + String(idx + 1).padStart(2, '0') + '</span>';
    html += '<div class="link-body">';
    html += '<a class="link-title" href="' + escHtml(article.url) + '" target="_blank" rel="noopener" onclick="event.stopPropagation()">'
          + escHtml(article.title) + '</a>';
    html += '<div class="link-source">';
    html += '<img class="link-favicon" src="https://www.google.com/s2/favicons?domain=' + domain + '&sz=16" alt="">';
    html += '<span>' + escHtml(domain) + '</span>';
    html += '</div>';
    html += '</div>'; // link-body
    html += '<div class="link-check">✓</div>';

    item.innerHTML = html;
    item.onclick = function() { toggleCardAllSnippets(idx, document.querySelector('.article-card[data-idx="' + idx + '"]')); };
    container.appendChild(item);
  });
}

/* -------- Snippet Toggle -------- */
function toggleSnippet(text, type, el, cardIdx) {
  if (!text) return;
  if (RESEARCH_SNIPPETS.has(text)) {
    RESEARCH_SNIPPETS.delete(text);
    if (el) el.classList.remove('marked');
  } else {
    RESEARCH_SNIPPETS.set(text, { type: type, cardIdx: cardIdx });
    if (el) el.classList.add('marked');
  }
  updateSelectionUI();
  updateBarLabel();
}

/* -------- Card Select All Snippets -------- */
function toggleCardAllSnippets(idx, cardEl) {
  var article = RESEARCH_ARTICLES[idx];
  if (!article) return;

  var isAllChecked = RESEARCH_CHECKED.has(idx);

  // Collect all text items in this card
  var items = [];
  if (article.oneLiner) items.push(article.oneLiner);
  else if (article.summary) items.push(article.summary.slice(0, 220));
  (article.keyPoints || []).forEach(function(p) { items.push(p); });
  (article.stats || []).forEach(function(s) { items.push(s); });
  if (article.bestQuote) items.push(article.bestQuote.slice(0, 180));

  if (isAllChecked) {
    RESEARCH_CHECKED.delete(idx);
    if (cardEl) cardEl.classList.remove('checked');
    items.forEach(function(t) { RESEARCH_SNIPPETS.delete(t); });
  } else {
    RESEARCH_CHECKED.add(idx);
    if (cardEl) cardEl.classList.add('checked');
    items.forEach(function(t) { RESEARCH_SNIPPETS.set(t, { type: 'card', cardIdx: idx }); });
  }

  // Re-render card element styles
  if (cardEl) {
    cardEl.querySelectorAll('.snippet-mark, .card-points li, .card-stat, .card-quote').forEach(function(elem) {
      elem.classList.toggle('marked', !isAllChecked);
    });
  }

  var linkEl = document.querySelector('.link-item[data-idx="' + idx + '"]');
  if (linkEl) linkEl.classList.toggle('linked', !isAllChecked);

  updateSelectionUI();
  updateBarLabel();
}

function researchSelectAll() {
  RESEARCH_ARTICLES.forEach(function(_, idx) {
    toggleCardAllSnippets(idx, document.querySelector('.article-card[data-idx="' + idx + '"]'));
  });
}

function researchClearAll() {
  RESEARCH_CHECKED.clear();
  RESEARCH_SNIPPETS.clear();
  document.querySelectorAll('.article-card').forEach(function(c) { c.classList.remove('checked'); });
  document.querySelectorAll('.link-item').forEach(function(l) { l.classList.remove('linked'); });
  document.querySelectorAll('.snippet-mark, .card-points li, .card-stat, .card-quote').forEach(function(el) {
    el.classList.remove('marked');
  });
  updateSelectionUI();
  updateBarLabel();
}

function updateSelectionUI() {
  var count = RESEARCH_SNIPPETS.size || RESEARCH_CHECKED.size;
  $('rSelCount').textContent = count + ' snippet' + (count !== 1 ? 's' : '') + ' marked';
  $('rToPosterBtn').disabled = count === 0;
  $('rToCarouselBtn').disabled = count === 0;
}

/* -------- Get selected articles -------- */
function getCheckedArticles() {
  var result = [];
  RESEARCH_CHECKED.forEach(function(idx) {
    if (RESEARCH_ARTICLES[idx]) result.push(RESEARCH_ARTICLES[idx]);
  });
  return result;
}

/* -------- Send to Poster -------- */
function researchSendToPoster() {
  var textSnippets = Array.from(RESEARCH_SNIPPETS.keys());
  var selectedArticles = getCheckedArticles();

  var mainText = '';
  if (textSnippets.length) {
    mainText = textSnippets.slice(0, 3).join('. ');
  } else if (selectedArticles.length) {
    var first = selectedArticles[0];
    mainText = first.bestQuote || first.oneLiner || first.summary.slice(0, 200);
  } else return;

  // Fill poster fields
  $('pTop').value = RESEARCH_TOPIC.slice(0, 60);
  $('pMain').value = mainText;
  $('pBottom').value = 'Researched: ' + RESEARCH_TOPIC;

  // Switch to poster mode and render
  switchMode('poster');
  if (typeof posterChanged === 'function') posterChanged();
  showToast('✓ Marked text sent to Poster!');
}

/* -------- Send to Carousel -------- */
function researchSendToCarousel() {
  var textSnippets = Array.from(RESEARCH_SNIPPETS.keys());
  var selectedArticles = getCheckedArticles();

  if (!textSnippets.length && !selectedArticles.length) return;

  var parts = [];

  // Hook slide
  $('cHook').value = 'Key Insights: ' + RESEARCH_TOPIC;

  if (textSnippets.length) {
    // Group text snippets into body slides or list slide
    var bullets = [];
    textSnippets.forEach(function(snip) {
      if (snip.length < 80) {
        bullets.push('- ' + snip);
      } else {
        parts.push(snip);
      }
    });
    if (bullets.length) {
      parts.push(bullets.join('\n'));
    }
  } else {
    // Fallback to selected articles
    selectedArticles.forEach(function(art) {
      parts.push(art.oneLiner || art.summary.slice(0, 260));
    });
  }

  // CTA
  $('cCta').value = 'Save this post → Follow for more on ' + RESEARCH_TOPIC;
  if (!$('cHandle').value) $('cHandle').value = '@yourhandle';

  // Join slides with blank lines
  $('cCopy').value = parts.join('\n\n---\n\n');

  // Switch to carousel mode and render
  switchMode('carousel');
  if (typeof renderCarousel === 'function') renderCarousel();
  showToast('✓ ' + (parts.length + 2) + ' Carousel slides created from marked text!');
}

/* -------- Utility -------- */
function escHtml(str) {
  return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function attrEsc(str) {
  return "'" + String(str || '').replace(/'/g, "\\'").replace(/\n/g, ' ') + "'";
}
