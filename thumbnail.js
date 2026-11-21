/* =============================================
   thumbnail.js — High-CTR YouTube Thumbnail Studio
   Wayin.ai-Style Video-First Workflow & AI Cutouts
   100% Client-Side, Zero Backend, Privacy First
   ============================================= */
'use strict';

/* Preset High-CTR Templates Matching Real Viral Feeds */
var THUMBNAIL_PRESETS = {
  productivity: {
    name: 'Productivity & Calendar',
    headline: 'everything done by 10AM',
    highlightWord: '10AM',
    subtitle: 'Daily Time Blocking Blueprint',
    badgeText: '⏰ TIME SYSTEM',
    fontFamily: 'Inter Tight',
    fontSize: 84,
    tiltAngle: -2,
    textColor: '#FFFFFF',
    highlightColor: '#38BDF8',
    strokeColor: '#000000',
    strokeWidth: 12,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowBlur: 20,
    bgType: 'gradient',
    bgGradient: 'radial-cyber',
    bgOverlay: 20,
    cutoutPosition: 'left',
    cutoutScale: 98,
    cutoutGlowColor: '#38BDF8',
    cutoutGlowWidth: 8,
    graphicEnabled: true,
    graphicType: 'calendar',
    graphicPosition: 'right',
    graphicFrameStyle: 'card',
    graphicScale: 95,
    graphicTilt: 3,
    showChannelBadge: false,
    channelBadgeText: 'PRODUCTIVE',
    channelBadgeShape: 'pill',
    channelBadgeColor: '#2563EB',
    showToolBadges: false,
    toolBadgesText: 'with Google Calendar',
    timestampText: '14:01',
    videoTitle: "I'm Begging You to Manage Your Time (Before It's Too Late)",
    channelName: 'Sarthak Virmani'
  },
  secondbrain: {
    name: 'Second Brain with Notion',
    headline: 'Second Brain',
    highlightWord: 'Brain',
    subtitle: 'with Notion + ChatGPT',
    badgeText: '✨ FREE AI SYSTEM',
    fontFamily: 'Instrument Sans',
    fontSize: 88,
    tiltAngle: 0,
    textColor: '#FFFFFF',
    highlightColor: '#F59E0B',
    strokeColor: '#000000',
    strokeWidth: 10,
    shadowColor: 'rgba(0,0,0,0.4)',
    shadowBlur: 18,
    bgType: 'gradient',
    bgGradient: 'soft-studio',
    bgOverlay: 15,
    cutoutPosition: 'right',
    cutoutScale: 102,
    cutoutGlowColor: '#FFFFFF',
    cutoutGlowWidth: 10,
    graphicEnabled: true,
    graphicType: 'notion',
    graphicPosition: 'left',
    graphicFrameStyle: 'laptop',
    graphicScale: 95,
    graphicTilt: -2,
    showChannelBadge: false,
    channelBadgeText: 'NOTION',
    channelBadgeShape: 'pill',
    channelBadgeColor: '#000000',
    showToolBadges: true,
    toolBadgesText: 'with Notion + ChatGPT',
    timestampText: '10:05',
    videoTitle: 'I Built a FREE AI Second Brain That Organizes Everything for Me!',
    channelName: 'The Tech Girl'
  },
  marketnews: {
    name: 'BIZ News & Market',
    headline: 'नया रिकॉर्ड हाई बनाएगा निफ्टी',
    highlightWord: 'रिकॉर्ड',
    subtitle: 'Goldman Sachs का बड़ा दावा!',
    badgeText: '🔥 BREAKING NEWS',
    fontFamily: 'Archivo Black',
    fontSize: 74,
    tiltAngle: 0,
    textColor: '#FFFFFF',
    highlightColor: '#FACC15',
    strokeColor: '#000000',
    strokeWidth: 12,
    shadowColor: '#1E3A8A',
    shadowBlur: 20,
    bgType: 'gradient',
    bgGradient: 'blue-studio',
    bgOverlay: 10,
    cutoutPosition: 'right',
    cutoutScale: 102,
    cutoutGlowColor: '#38BDF8',
    cutoutGlowWidth: 10,
    graphicEnabled: false,
    graphicType: 'chart',
    graphicPosition: 'left',
    graphicFrameStyle: 'card',
    graphicScale: 90,
    graphicTilt: 0,
    showChannelBadge: true,
    channelBadgeText: 'BIZ ADDA',
    channelBadgeShape: 'circle',
    channelBadgeColor: '#0284C7',
    showToolBadges: false,
    toolBadgesText: '',
    timestampText: '10:43',
    videoTitle: 'BIZ Adda : नया रिकॉर्ड हाई बनाएगा निफ्टी, Goldman Sachs का बड़ा दावा!',
    channelName: 'BIZ Tak'
  },
  techkeynote: {
    name: 'Keynote & Supercut',
    headline: 'Ignite Keynote in 14 Minutes',
    highlightWord: '14 Minutes',
    subtitle: 'Everything Announced in One Video',
    badgeText: '⚡ SUPERCUT',
    fontFamily: 'Space Grotesk',
    fontSize: 78,
    tiltAngle: 0,
    textColor: '#FFFFFF',
    highlightColor: '#EF4444',
    strokeColor: '#0F172A',
    strokeWidth: 12,
    shadowColor: '#7F1D1D',
    shadowBlur: 24,
    bgType: 'gradient',
    bgGradient: 'radial-stage',
    bgOverlay: 35,
    cutoutPosition: 'right',
    cutoutScale: 100,
    cutoutGlowColor: '#F87171',
    cutoutGlowWidth: 10,
    graphicEnabled: true,
    graphicType: 'code',
    graphicPosition: 'left',
    graphicFrameStyle: 'card',
    graphicScale: 90,
    graphicTilt: -3,
    showChannelBadge: true,
    channelBadgeText: 'PC MAG',
    channelBadgeShape: 'square',
    channelBadgeColor: '#DC2626',
    showToolBadges: false,
    toolBadgesText: '',
    timestampText: '13:47',
    videoTitle: "Microsoft's Ignite Keynote Address in 14 Minutes",
    channelName: 'PCMag'
  },
  storydrama: {
    name: 'Story & Cinematic Drama',
    headline: 'Listen to this Story',
    highlightWord: 'Story',
    subtitle: 'Atleast ONCE in Life!',
    badgeText: '🎙️ MUST LISTEN',
    fontFamily: 'Playfair Display',
    fontSize: 84,
    tiltAngle: -2,
    textColor: '#F8FAFC',
    highlightColor: '#FBBF24',
    strokeColor: '#000000',
    strokeWidth: 10,
    shadowColor: '#78350F',
    shadowBlur: 24,
    bgType: 'gradient',
    bgGradient: 'radial-podcast',
    bgOverlay: 40,
    cutoutPosition: 'left',
    cutoutScale: 102,
    cutoutGlowColor: '#FDE68A',
    cutoutGlowWidth: 8,
    graphicEnabled: false,
    graphicType: 'card',
    graphicPosition: 'right',
    graphicFrameStyle: 'card',
    graphicScale: 90,
    graphicTilt: 0,
    showChannelBadge: false,
    channelBadgeText: '',
    channelBadgeShape: 'pill',
    channelBadgeColor: '#DC2626',
    showToolBadges: false,
    toolBadgesText: '',
    timestampText: '8:38',
    videoTitle: 'Ped Aur Bachcha | Full Story | Main Tenu Phir Milangi',
    channelName: 'Laksh maheshwari'
  },
  mrbeast: {
    name: 'MrBeast Viral Impact',
    headline: "DON'T DO THIS!",
    highlightWord: "DON'T",
    subtitle: 'Worst Mistake Ever Made',
    badgeText: '⚠️ WARNING',
    fontFamily: 'Anton',
    fontSize: 92,
    tiltAngle: -4,
    textColor: '#FFFFFF',
    highlightColor: '#FFE600',
    strokeColor: '#000000',
    strokeWidth: 16,
    shadowColor: '#000000',
    shadowBlur: 24,
    bgType: 'gradient',
    bgGradient: 'radial-cyber',
    bgOverlay: 25,
    cutoutPosition: 'right',
    cutoutScale: 105,
    cutoutGlowColor: '#FFFFFF',
    cutoutGlowWidth: 12,
    graphicEnabled: false,
    graphicType: 'card',
    graphicPosition: 'left',
    graphicFrameStyle: 'card',
    graphicScale: 90,
    graphicTilt: 0,
    showChannelBadge: false,
    channelBadgeText: '',
    channelBadgeShape: 'pill',
    channelBadgeColor: '#FFE600',
    showToolBadges: false,
    toolBadgesText: '',
    timestampText: '14:28',
    videoTitle: 'I Spent 50 Hours In The Most Extreme Place On Earth',
    channelName: 'MrBeast'
  },
  claudecode: {
    name: 'Claude Code (Tech Tutorial)',
    headline: 'Stop Paying for Claude Code',
    highlightWord: 'FREE!',
    subtitle: '(Use it for FREE!)',
    badgeText: '⚡ 100% FREE AI',
    fontFamily: 'Inter Tight',
    fontSize: 76,
    tiltAngle: -2,
    textColor: '#FFFFFF',
    highlightColor: '#4ADE80',
    strokeColor: '#000000',
    strokeWidth: 12,
    shadowColor: 'rgba(0,0,0,0.6)',
    shadowBlur: 20,
    bgType: 'gradient',
    bgGradient: 'radial-cyber',
    bgOverlay: 25,
    cutoutPosition: 'center',
    cutoutScale: 98,
    cutoutGlowColor: '#4ADE80',
    cutoutGlowWidth: 10,
    graphicEnabled: false,
    graphicType: 'code',
    graphicPosition: 'left',
    graphicFrameStyle: 'card',
    graphicScale: 90,
    graphicTilt: 0,
    showChannelBadge: false,
    channelBadgeText: '',
    channelBadgeShape: 'pill',
    channelBadgeColor: '#000000',
    showToolBadges: false,
    toolBadgesText: '',
    showTeaserCaption: true,
    teaserCaptionText: "without using the internet. Hi everyone, I'm Ishan Sharma and today I'll show you",
    timestampText: '10:40',
    videoTitle: 'Stop Paying for Claude Code(Use it for FREE!)',
    channelName: 'Ishan Sharma'
  },
  financewealth: {
    name: 'Finance & Passive Income',
    headline: 'HOW I MADE $10,000/MO',
    highlightWord: '$10,000',
    subtitle: 'Realistic Step-by-Step Blueprint',
    badgeText: '💰 PASSIVE INCOME',
    fontFamily: 'Bebas Neue',
    fontSize: 94,
    lineHeight: 0.98,
    allCaps: true,
    textAlign: 'left',
    tiltAngle: -2,
    textColor: '#FFFFFF',
    highlightColor: '#22C55E',
    strokeColor: '#000000',
    strokeWidth: 14,
    shadowColor: 'rgba(0,0,0,0.6)',
    shadowBlur: 20,
    bgType: 'gradient',
    bgGradient: 'radial-cyber',
    bgOverlay: 20,
    cutoutPosition: 'left',
    cutoutScale: 98,
    cutoutGlowColor: '#22C55E',
    cutoutGlowWidth: 10,
    graphicEnabled: true,
    graphicType: 'chart',
    graphicPosition: 'right',
    graphicFrameStyle: 'card',
    graphicScale: 92,
    graphicTilt: 2,
    showChannelBadge: false,
    channelBadgeText: '',
    channelBadgeShape: 'pill',
    channelBadgeColor: '#000000',
    showToolBadges: false,
    toolBadgesText: '',
    timestampText: '16:42',
    videoTitle: 'How I Built a $10,000/Month Online Business In My 20s',
    channelName: 'Wealth Blueprint'
  },
  techreview: {
    name: 'Tech Review & MKBHD Style',
    headline: 'DO NOT BUY THIS PHONE!',
    highlightWord: 'DO NOT BUY',
    subtitle: '2 Weeks Later Real Truth',
    badgeText: '⚠️ HONEST TRUTH',
    fontFamily: 'Montserrat',
    fontSize: 84,
    lineHeight: 1.02,
    allCaps: true,
    textAlign: 'left',
    tiltAngle: 0,
    textColor: '#FFFFFF',
    highlightColor: '#EF4444',
    strokeColor: '#000000',
    strokeWidth: 14,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowBlur: 20,
    bgType: 'gradient',
    bgGradient: 'radial-stage',
    bgOverlay: 30,
    cutoutPosition: 'right',
    cutoutScale: 102,
    cutoutGlowColor: '#EF4444',
    cutoutGlowWidth: 10,
    graphicEnabled: false,
    graphicType: 'code',
    graphicPosition: 'left',
    graphicFrameStyle: 'card',
    graphicScale: 90,
    graphicTilt: 0,
    showChannelBadge: false,
    channelBadgeText: '',
    channelBadgeShape: 'pill',
    channelBadgeColor: '#000000',
    showToolBadges: false,
    toolBadgesText: '',
    timestampText: '12:15',
    videoTitle: 'Do NOT Buy The New Flagship! (2 Weeks Later Review)',
    channelName: 'Tech Unboxed'
  },
  codingapp: {
    name: 'Coding & SaaS in 24 Hours',
    headline: 'I BUILT AN APP IN 24 HOURS',
    highlightWord: '24 HOURS',
    subtitle: 'From Zero to First $1,000 MRR',
    badgeText: '🚀 FULL TUTORIAL',
    fontFamily: 'Space Grotesk',
    fontSize: 78,
    lineHeight: 1.05,
    allCaps: true,
    textAlign: 'left',
    tiltAngle: -2,
    textColor: '#FFFFFF',
    highlightColor: '#38BDF8',
    strokeColor: '#000000',
    strokeWidth: 12,
    shadowColor: 'rgba(0,0,0,0.6)',
    shadowBlur: 20,
    bgType: 'gradient',
    bgGradient: 'radial-cyber',
    bgOverlay: 25,
    cutoutPosition: 'right',
    cutoutScale: 98,
    cutoutGlowColor: '#38BDF8',
    cutoutGlowWidth: 10,
    graphicEnabled: true,
    graphicType: 'code',
    graphicPosition: 'left',
    graphicFrameStyle: 'card',
    graphicScale: 90,
    graphicTilt: -2,
    showChannelBadge: false,
    channelBadgeText: '',
    channelBadgeShape: 'pill',
    channelBadgeColor: '#000000',
    showToolBadges: false,
    toolBadgesText: '',
    timestampText: '18:54',
    videoTitle: 'I Built an Entire SaaS in 24 Hours with AI (Full Breakdown)',
    channelName: 'Code Craft'
  },
  gamingchallenge: {
    name: 'Gaming 100 vs 1 Challenge',
    headline: '100 PLAYERS VS 1 PRO',
    highlightWord: '100 PLAYERS',
    subtitle: 'World Record Impossible Win',
    badgeText: '🏆 $50,000 CHALLENGE',
    fontFamily: 'Anton',
    fontSize: 92,
    lineHeight: 0.98,
    allCaps: true,
    textAlign: 'left',
    tiltAngle: -4,
    textColor: '#FFFFFF',
    highlightColor: '#A855F7',
    strokeColor: '#000000',
    strokeWidth: 16,
    shadowColor: 'rgba(0,0,0,0.8)',
    shadowBlur: 24,
    bgType: 'gradient',
    bgGradient: 'radial-cyber',
    bgOverlay: 30,
    cutoutPosition: 'right',
    cutoutScale: 105,
    cutoutGlowColor: '#A855F7',
    cutoutGlowWidth: 12,
    graphicEnabled: false,
    graphicType: 'card',
    graphicPosition: 'left',
    graphicFrameStyle: 'card',
    graphicScale: 90,
    graphicTilt: 0,
    showChannelBadge: false,
    channelBadgeText: '',
    channelBadgeShape: 'pill',
    channelBadgeColor: '#000000',
    showToolBadges: false,
    toolBadgesText: '',
    timestampText: '21:10',
    videoTitle: 'I Put 100 Casual Players Against 1 Pro Gamer',
    channelName: 'Pro Arena'
  },
  podcastinterview: {
    name: 'Podcast & Deep Interview',
    headline: 'THE TRUTH ABOUT AI',
    highlightWord: 'TRUTH',
    subtitle: 'What They Aren\'t Telling You',
    badgeText: '🎙️ EPISODE 248',
    fontFamily: 'Playfair Display',
    fontSize: 84,
    lineHeight: 1.05,
    allCaps: false,
    textAlign: 'left',
    tiltAngle: 0,
    textColor: '#F8FAFC',
    highlightColor: '#F59E0B',
    strokeColor: '#000000',
    strokeWidth: 8,
    shadowColor: 'rgba(0,0,0,0.6)',
    shadowBlur: 22,
    bgType: 'gradient',
    bgGradient: 'radial-podcast',
    bgOverlay: 40,
    cutoutPosition: 'left',
    cutoutScale: 100,
    cutoutGlowColor: '#F59E0B',
    cutoutGlowWidth: 8,
    graphicEnabled: false,
    graphicType: 'card',
    graphicPosition: 'right',
    graphicFrameStyle: 'card',
    graphicScale: 90,
    graphicTilt: 0,
    showChannelBadge: false,
    channelBadgeText: '',
    channelBadgeShape: 'pill',
    channelBadgeColor: '#000000',
    showToolBadges: false,
    toolBadgesText: '',
    timestampText: '1:42:15',
    videoTitle: 'The Shocking Truth About the Future of AI (Deep Dive)',
    channelName: 'The Longform Podcast'
  }
};

/* Studio State */
var THUMBNAIL_STATE = {
  // Typography
  headline: 'everything done by 10AM',
  highlightWord: '10AM',
  subtitle: 'Daily Time Blocking Blueprint',
  badgeText: '⏰ TIME SYSTEM',
  fontFamily: 'Inter Tight',
  fontSize: 84,
  lineHeight: 1.05,
  allCaps: false,
  textAlign: 'left', // 'left' | 'center' | 'right'
  tiltAngle: -2,
  textColor: '#FFFFFF',
  highlightColor: '#38BDF8',
  strokeColor: '#000000',
  strokeWidth: 12,
  shadowColor: 'rgba(0,0,0,0.5)',
  shadowBlur: 20,
  
  // Background
  bgType: 'gradient', // 'gradient' | 'image'
  bgGradient: 'radial-cyber',
  bgOverlay: 20,
  uploadedBgImage: null,
  
  // Creator Cutout / Reaction Face
  cutoutImage: null,
  cutoutPosition: 'left', // 'left' | 'right' | 'center'
  cutoutScale: 98,
  cutoutGlowColor: '#FFFFFF',
  cutoutGlowWidth: 8,
  dualToneRim: true,
  rimKeyColor: '#F59E0B',
  rimFillColor: '#38BDF8',
  rimIntensity: 10,
  facialClarity: 25,
  
  // Head Halo Spotlight & Atmospheric Depth
  showHalo: true,
  haloColor: '#38BDF8',
  haloRadius: 65,
  atmosphereEffect: 'fog', // 'none' | 'fog' | 'sparks' | 'dust' | 'bokeh'
  
  // Secondary Screenshot / Graphic Card (e.g. Calendar, Notion, Code, Chart)
  graphicEnabled: true,
  graphicType: 'calendar', // 'calendar' | 'notion' | 'code' | 'chart' | 'upload'
  graphicPosition: 'right', // 'right' | 'left'
  graphicFrameStyle: 'card', // 'card' | 'laptop' | 'clean'
  graphicScale: 95,
  graphicTilt: 3,
  graphicImage: null, // HTMLImageElement (uploaded)
  graphicPerspective: true,
  
  // Channel Corner Logo Badge (e.g. BIZ ADDA, PC MAG)
  showChannelBadge: false,
  channelBadgeText: 'CREATOR',
  channelBadgeShape: 'pill', // 'pill' | 'circle' | 'square'
  channelBadgeColor: '#0284C7',
  
  // Tool & Tech Badges (e.g. Notion + ChatGPT)
  showToolBadges: false,
  toolBadgesText: 'with Notion + ChatGPT',
  
  // Teaser Subtitles / Caption Overlay (Ishan Sharma viral spoken hook)
  showTeaserCaption: false,
  teaserCaptionText: "without using the internet. Hi everyone, I'm Ishan Sharma and today I'll show you",

  // YouTube UI Timestamp preview overlay
  showYtTimestamp: true,
  timestampText: '14:01',
  
  // YouTube Feed Simulator metadata
  videoTitle: "I'm Begging You to Manage Your Time (Before It's Too Late)",
  channelName: 'Sarthak Virmani',
  currentView: 'canvas', // 'canvas' | 'feed'
  simSubView: 'home', // 'home' | 'mobile' | 'search' | 'sidebar'
  simTheme: 'dark', // 'dark' | 'light'

  // Video Keyframe Extractor State (Wayin.ai Workflow)
  videoDuration: 0,
  videoCurrentTime: 0,
  
  // Export resolution
  exportResolution: 'hd' // 'hd' (1280x720) | 'fhd' (1920x1080)
};

/* Generated A/B Variations Cache */
var CURRENT_VARIATIONS = [];

/* Build safe, properly quoted Canvas font string with mapped fallbacks */
function buildCanvasFont(family, weight, sizePx) {
  family = family || 'Inter Tight';
  sizePx = Math.round(sizePx);
  var fallback = 'sans-serif';
  var actualWeight = weight || 900;

  if (family === 'Anton' || family === 'Bebas Neue' || family === 'Archivo Black') {
    actualWeight = 400; // Inherent heavy display fonts
    fallback = 'sans-serif';
  } else if (family === 'Playfair Display' || family === 'Instrument Serif' || family === 'Newsreader' || family === 'Cormorant Garamond') {
    fallback = 'serif';
    actualWeight = actualWeight > 700 ? 700 : actualWeight;
  } else if (family === 'Caveat') {
    fallback = 'cursive';
    actualWeight = 700;
  } else if (family === 'Space Grotesk' || family === 'Montserrat' || family === 'Inter Tight' || family === 'Bricolage Grotesque' || family === 'Instrument Sans') {
    fallback = 'sans-serif';
    actualWeight = Math.min(900, Math.max(700, actualWeight));
  }

  var quoted = family.indexOf(' ') !== -1 ? '"' + family + '"' : family;
  return actualWeight + ' ' + sizePx + 'px ' + quoted + ', ' + fallback;
}

/* Initialize Thumbnail Studio */
function initThumbnailStudio() {
  loadThumbnailState();
  populateThumbnailForm();
  setupVideoDropzone();
  renderThumbnail();

  // Pre-warm / re-render canvas as soon as Google Web Fonts arrive
  if (typeof document !== 'undefined' && document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function() {
      renderThumbnail();
      updateFeedSimulator();
    });
  }
}

function saveThumbnailState() {
  try {
    var stateCopy = Object.assign({}, THUMBNAIL_STATE);
    delete stateCopy.cutoutImage;
    delete stateCopy.uploadedBgImage;
    delete stateCopy.graphicImage;
    localStorage.setItem('ck-thumbnail-state', JSON.stringify(stateCopy));
  } catch (e) {
    console.warn('Could not save thumbnail state:', e);
  }
}

function loadThumbnailState() {
  try {
    var saved = localStorage.getItem('ck-thumbnail-state');
    if (saved) {
      var parsed = JSON.parse(saved);
      Object.assign(THUMBNAIL_STATE, parsed);
    }
  } catch (e) {
    console.warn('Could not load thumbnail state:', e);
  }
}

function populateThumbnailForm() {
  if ($('ytHeadline')) $('ytHeadline').value = THUMBNAIL_STATE.headline || '';
  if ($('ytHighlight')) $('ytHighlight').value = THUMBNAIL_STATE.highlightWord || '';
  if ($('ytSubtitle')) $('ytSubtitle').value = THUMBNAIL_STATE.subtitle || '';
  if ($('ytBadge')) $('ytBadge').value = THUMBNAIL_STATE.badgeText || '';
  if ($('ytFont')) $('ytFont').value = THUMBNAIL_STATE.fontFamily || 'Inter Tight';
  if ($('ytFontSize')) {
    $('ytFontSize').value = THUMBNAIL_STATE.fontSize || 84;
    if ($('ytFontSizeVal')) $('ytFontSizeVal').textContent = THUMBNAIL_STATE.fontSize + 'px';
  }
  if ($('ytTilt')) {
    $('ytTilt').value = THUMBNAIL_STATE.tiltAngle || 0;
    if ($('ytTiltVal')) $('ytTiltVal').textContent = (THUMBNAIL_STATE.tiltAngle || 0) + '°';
  }
  if ($('ytTextColor')) $('ytTextColor').value = THUMBNAIL_STATE.textColor || '#FFFFFF';
  if ($('ytHighlightColor')) $('ytHighlightColor').value = THUMBNAIL_STATE.highlightColor || '#38BDF8';
  if ($('ytStrokeColor')) $('ytStrokeColor').value = THUMBNAIL_STATE.strokeColor || '#000000';
  if ($('ytStrokeWidth')) {
    $('ytStrokeWidth').value = THUMBNAIL_STATE.strokeWidth || 12;
    if ($('ytStrokeWidthVal')) $('ytStrokeWidthVal').textContent = THUMBNAIL_STATE.strokeWidth + 'px';
  }
  if ($('ytLineHeight')) {
    $('ytLineHeight').value = THUMBNAIL_STATE.lineHeight || 1.05;
    if ($('ytLineHeightVal')) $('ytLineHeightVal').textContent = (THUMBNAIL_STATE.lineHeight || 1.05);
  }
  if ($('ytAllCaps')) $('ytAllCaps').checked = THUMBNAIL_STATE.allCaps === true;
  if ($('ytTextAlign')) $('ytTextAlign').value = THUMBNAIL_STATE.textAlign || 'left';
  
  // Cutout
  if ($('ytCutoutPos')) $('ytCutoutPos').value = THUMBNAIL_STATE.cutoutPosition || 'left';
  if ($('ytCutoutGlowColor')) $('ytCutoutGlowColor').value = THUMBNAIL_STATE.cutoutGlowColor || '#38BDF8';
  if ($('ytCutoutGlowWidth')) {
    $('ytCutoutGlowWidth').value = THUMBNAIL_STATE.cutoutGlowWidth || 8;
    if ($('ytCutoutGlowWidthVal')) $('ytCutoutGlowWidthVal').textContent = THUMBNAIL_STATE.cutoutGlowWidth + 'px';
  }
  if ($('ytDualToneRim')) $('ytDualToneRim').checked = THUMBNAIL_STATE.dualToneRim !== false;
  if ($('ytRimKeyColor')) $('ytRimKeyColor').value = THUMBNAIL_STATE.rimKeyColor || '#F59E0B';
  if ($('ytRimFillColor')) $('ytRimFillColor').value = THUMBNAIL_STATE.rimFillColor || '#38BDF8';
  if ($('ytRimIntensity')) {
    $('ytRimIntensity').value = THUMBNAIL_STATE.rimIntensity || 10;
    if ($('ytRimIntensityVal')) $('ytRimIntensityVal').textContent = (THUMBNAIL_STATE.rimIntensity || 10) + 'px';
  }
  if ($('ytFacialClarity')) {
    $('ytFacialClarity').value = THUMBNAIL_STATE.facialClarity || 25;
    if ($('ytFacialClarityVal')) $('ytFacialClarityVal').textContent = (THUMBNAIL_STATE.facialClarity || 25) + '%';
  }

  // Head Halo & Atmosphere
  if ($('ytShowHalo')) $('ytShowHalo').checked = THUMBNAIL_STATE.showHalo !== false;
  if ($('ytHaloColor')) $('ytHaloColor').value = THUMBNAIL_STATE.haloColor || '#38BDF8';
  if ($('ytHaloRadius')) {
    $('ytHaloRadius').value = THUMBNAIL_STATE.haloRadius || 65;
    if ($('ytHaloRadiusVal')) $('ytHaloRadiusVal').textContent = (THUMBNAIL_STATE.haloRadius || 65) + 'px';
  }
  if ($('ytAtmosphereEffect')) $('ytAtmosphereEffect').value = THUMBNAIL_STATE.atmosphereEffect || 'fog';
  if ($('ytGraphicPerspective')) $('ytGraphicPerspective').checked = THUMBNAIL_STATE.graphicPerspective !== false;
  
  // Graphic Card
  if ($('ytGraphicEnabled')) $('ytGraphicEnabled').checked = THUMBNAIL_STATE.graphicEnabled !== false;
  if ($('ytGraphicType')) $('ytGraphicType').value = THUMBNAIL_STATE.graphicType || 'calendar';
  if ($('ytGraphicPos')) $('ytGraphicPos').value = THUMBNAIL_STATE.graphicPosition || 'right';
  if ($('ytGraphicFrame')) $('ytGraphicFrame').value = THUMBNAIL_STATE.graphicFrameStyle || 'card';
  if ($('ytGraphicTilt')) {
    $('ytGraphicTilt').value = THUMBNAIL_STATE.graphicTilt || 0;
    if ($('ytGraphicTiltVal')) $('ytGraphicTiltVal').textContent = (THUMBNAIL_STATE.graphicTilt || 0) + '°';
  }
  if ($('ytGraphicScale')) {
    $('ytGraphicScale').value = THUMBNAIL_STATE.graphicScale || 95;
    if ($('ytGraphicScaleVal')) $('ytGraphicScaleVal').textContent = (THUMBNAIL_STATE.graphicScale || 95) + '%';
  }
  
  // Channel Badge
  if ($('ytShowChannelBadge')) $('ytShowChannelBadge').checked = THUMBNAIL_STATE.showChannelBadge === true;
  if ($('ytChannelBadgeText')) $('ytChannelBadgeText').value = THUMBNAIL_STATE.channelBadgeText || '';
  if ($('ytChannelBadgeShape')) $('ytChannelBadgeShape').value = THUMBNAIL_STATE.channelBadgeShape || 'pill';
  if ($('ytChannelBadgeColor')) $('ytChannelBadgeColor').value = THUMBNAIL_STATE.channelBadgeColor || '#0284C7';
  
  // Tool Badges
  if ($('ytShowToolBadges')) $('ytShowToolBadges').checked = THUMBNAIL_STATE.showToolBadges === true;
  if ($('ytToolBadgesText')) $('ytToolBadgesText').value = THUMBNAIL_STATE.toolBadgesText || 'with Notion + ChatGPT';

  // Teaser Subtitles / Caption Overlay
  if ($('ytShowTeaser')) $('ytShowTeaser').checked = THUMBNAIL_STATE.showTeaserCaption === true;
  if ($('ytTeaserText')) $('ytTeaserText').value = THUMBNAIL_STATE.teaserCaptionText || '';

  // Atmosphere
  if ($('ytBgGradient')) $('ytBgGradient').value = THUMBNAIL_STATE.bgGradient || 'radial-cyber';
  if ($('ytBgOverlay')) {
    $('ytBgOverlay').value = THUMBNAIL_STATE.bgOverlay || 20;
    if ($('ytBgOverlayVal')) $('ytBgOverlayVal').textContent = THUMBNAIL_STATE.bgOverlay + '%';
  }
  
  // Timestamp & Meta
  if ($('ytShowTimestamp')) $('ytShowTimestamp').checked = THUMBNAIL_STATE.showYtTimestamp !== false;
  if ($('ytTimestampText')) $('ytTimestampText').value = THUMBNAIL_STATE.timestampText || '14:01';
  if ($('ytVideoTitleInput')) $('ytVideoTitleInput').value = THUMBNAIL_STATE.videoTitle || '';
  if ($('ytChannelNameInput')) $('ytChannelNameInput').value = THUMBNAIL_STATE.channelName || '';
  if ($('ytResSelect')) $('ytResSelect').value = THUMBNAIL_STATE.exportResolution || 'hd';
}

function onThumbnailFieldChanged() {
  if ($('ytHeadline')) THUMBNAIL_STATE.headline = $('ytHeadline').value;
  if ($('ytHighlight')) THUMBNAIL_STATE.highlightWord = $('ytHighlight').value;
  if ($('ytSubtitle')) THUMBNAIL_STATE.subtitle = $('ytSubtitle').value;
  if ($('ytBadge')) THUMBNAIL_STATE.badgeText = $('ytBadge').value;
  if ($('ytFont')) THUMBNAIL_STATE.fontFamily = $('ytFont').value;
  if ($('ytFontSize')) {
    THUMBNAIL_STATE.fontSize = parseInt($('ytFontSize').value, 10);
    if ($('ytFontSizeVal')) $('ytFontSizeVal').textContent = THUMBNAIL_STATE.fontSize + 'px';
  }
  if ($('ytTilt')) {
    THUMBNAIL_STATE.tiltAngle = parseInt($('ytTilt').value, 10);
    if ($('ytTiltVal')) $('ytTiltVal').textContent = THUMBNAIL_STATE.tiltAngle + '°';
  }
  if ($('ytTextColor')) THUMBNAIL_STATE.textColor = $('ytTextColor').value;
  if ($('ytHighlightColor')) THUMBNAIL_STATE.highlightColor = $('ytHighlightColor').value;
  if ($('ytStrokeColor')) THUMBNAIL_STATE.strokeColor = $('ytStrokeColor').value;
  if ($('ytStrokeWidth')) {
    THUMBNAIL_STATE.strokeWidth = parseInt($('ytStrokeWidth').value, 10);
    if ($('ytStrokeWidthVal')) $('ytStrokeWidthVal').textContent = THUMBNAIL_STATE.strokeWidth + 'px';
  }
  if ($('ytLineHeight')) {
    THUMBNAIL_STATE.lineHeight = parseFloat($('ytLineHeight').value);
    if ($('ytLineHeightVal')) $('ytLineHeightVal').textContent = THUMBNAIL_STATE.lineHeight;
  }
  if ($('ytAllCaps')) THUMBNAIL_STATE.allCaps = $('ytAllCaps').checked;
  if ($('ytTextAlign')) THUMBNAIL_STATE.textAlign = $('ytTextAlign').value;
  
  // Cutout
  if ($('ytCutoutPos')) THUMBNAIL_STATE.cutoutPosition = $('ytCutoutPos').value;
  if ($('ytCutoutGlowColor')) THUMBNAIL_STATE.cutoutGlowColor = $('ytCutoutGlowColor').value;
  if ($('ytCutoutGlowWidth')) {
    THUMBNAIL_STATE.cutoutGlowWidth = parseInt($('ytCutoutGlowWidth').value, 10);
    if ($('ytCutoutGlowWidthVal')) $('ytCutoutGlowWidthVal').textContent = THUMBNAIL_STATE.cutoutGlowWidth + 'px';
  }
  if ($('ytDualToneRim')) THUMBNAIL_STATE.dualToneRim = $('ytDualToneRim').checked;
  if ($('ytRimKeyColor')) THUMBNAIL_STATE.rimKeyColor = $('ytRimKeyColor').value;
  if ($('ytRimFillColor')) THUMBNAIL_STATE.rimFillColor = $('ytRimFillColor').value;
  if ($('ytRimIntensity')) {
    THUMBNAIL_STATE.rimIntensity = parseInt($('ytRimIntensity').value, 10);
    if ($('ytRimIntensityVal')) $('ytRimIntensityVal').textContent = THUMBNAIL_STATE.rimIntensity + 'px';
  }
  if ($('ytFacialClarity')) {
    THUMBNAIL_STATE.facialClarity = parseInt($('ytFacialClarity').value, 10);
    if ($('ytFacialClarityVal')) $('ytFacialClarityVal').textContent = THUMBNAIL_STATE.facialClarity + '%';
  }

  // Head Halo & Atmosphere
  if ($('ytShowHalo')) THUMBNAIL_STATE.showHalo = $('ytShowHalo').checked;
  if ($('ytHaloColor')) THUMBNAIL_STATE.haloColor = $('ytHaloColor').value;
  if ($('ytHaloRadius')) {
    THUMBNAIL_STATE.haloRadius = parseInt($('ytHaloRadius').value, 10);
    if ($('ytHaloRadiusVal')) $('ytHaloRadiusVal').textContent = THUMBNAIL_STATE.haloRadius + 'px';
  }
  if ($('ytAtmosphereEffect')) THUMBNAIL_STATE.atmosphereEffect = $('ytAtmosphereEffect').value;
  if ($('ytGraphicPerspective')) THUMBNAIL_STATE.graphicPerspective = $('ytGraphicPerspective').checked;
  
  // Graphic Card
  if ($('ytGraphicEnabled')) THUMBNAIL_STATE.graphicEnabled = $('ytGraphicEnabled').checked;
  if ($('ytGraphicType')) THUMBNAIL_STATE.graphicType = $('ytGraphicType').value;
  if ($('ytGraphicPos')) THUMBNAIL_STATE.graphicPosition = $('ytGraphicPos').value;
  if ($('ytGraphicFrame')) THUMBNAIL_STATE.graphicFrameStyle = $('ytGraphicFrame').value;
  if ($('ytGraphicTilt')) {
    THUMBNAIL_STATE.graphicTilt = parseInt($('ytGraphicTilt').value, 10);
    if ($('ytGraphicTiltVal')) $('ytGraphicTiltVal').textContent = THUMBNAIL_STATE.graphicTilt + '°';
  }
  if ($('ytGraphicScale')) {
    THUMBNAIL_STATE.graphicScale = parseInt($('ytGraphicScale').value, 10);
    if ($('ytGraphicScaleVal')) $('ytGraphicScaleVal').textContent = THUMBNAIL_STATE.graphicScale + '%';
  }
  
  // Channel Badge
  if ($('ytShowChannelBadge')) THUMBNAIL_STATE.showChannelBadge = $('ytShowChannelBadge').checked;
  if ($('ytChannelBadgeText')) THUMBNAIL_STATE.channelBadgeText = $('ytChannelBadgeText').value;
  if ($('ytChannelBadgeShape')) THUMBNAIL_STATE.channelBadgeShape = $('ytChannelBadgeShape').value;
  if ($('ytChannelBadgeColor')) THUMBNAIL_STATE.channelBadgeColor = $('ytChannelBadgeColor').value;
  
  // Tool Badges
  if ($('ytShowToolBadges')) THUMBNAIL_STATE.showToolBadges = $('ytShowToolBadges').checked;
  if ($('ytToolBadgesText')) THUMBNAIL_STATE.toolBadgesText = $('ytToolBadgesText').value;

  // Teaser Subtitles / Caption Overlay
  if ($('ytShowTeaser')) THUMBNAIL_STATE.showTeaserCaption = $('ytShowTeaser').checked;
  if ($('ytTeaserText')) THUMBNAIL_STATE.teaserCaptionText = $('ytTeaserText').value;

  // Atmosphere
  if ($('ytBgGradient')) THUMBNAIL_STATE.bgGradient = $('ytBgGradient').value;
  if ($('ytBgOverlay')) {
    THUMBNAIL_STATE.bgOverlay = parseInt($('ytBgOverlay').value, 10);
    if ($('ytBgOverlayVal')) $('ytBgOverlayVal').textContent = THUMBNAIL_STATE.bgOverlay + '%';
  }
  
  // Timestamp & Meta
  if ($('ytShowTimestamp')) THUMBNAIL_STATE.showYtTimestamp = $('ytShowTimestamp').checked;
  if ($('ytTimestampText')) THUMBNAIL_STATE.timestampText = $('ytTimestampText').value;
  if ($('ytVideoTitleInput')) THUMBNAIL_STATE.videoTitle = $('ytVideoTitleInput').value;
  if ($('ytChannelNameInput')) THUMBNAIL_STATE.channelName = $('ytChannelNameInput').value;
  if ($('ytResSelect')) THUMBNAIL_STATE.exportResolution = $('ytResSelect').value;

  saveThumbnailState();
  renderThumbnail();
  if (typeof updateBarLabel === 'function') updateBarLabel();
}

/* 1-Click Load Preset Template */
function loadThumbnailPreset(key) {
  var p = THUMBNAIL_PRESETS[key];
  if (!p) return;
  Object.assign(THUMBNAIL_STATE, JSON.parse(JSON.stringify(p)));
  populateThumbnailForm();
  saveThumbnailState();
  renderThumbnail();
  showToast('✓ Applied ' + p.name + ' template!');
}

/* 1-Click Brand Kit Sync */
function applyBrandKitToThumbnail() {
  if (typeof loadBrandKit === 'function') loadBrandKit();
  if (typeof BRAND_KIT === 'undefined') return;

  if (BRAND_KIT.primaryColor) {
    THUMBNAIL_STATE.highlightColor = BRAND_KIT.primaryColor;
    THUMBNAIL_STATE.cutoutGlowColor = BRAND_KIT.primaryColor;
    THUMBNAIL_STATE.channelBadgeColor = BRAND_KIT.primaryColor;
  }
  if (BRAND_KIT.fontFamily) THUMBNAIL_STATE.fontFamily = BRAND_KIT.fontFamily;
  if (BRAND_KIT.handle) {
    THUMBNAIL_STATE.badgeText = 'BY ' + BRAND_KIT.handle.toUpperCase();
    THUMBNAIL_STATE.channelBadgeText = BRAND_KIT.handle.toUpperCase();
  }

  populateThumbnailForm();
  saveThumbnailState();
  renderThumbnail();
  showToast('✨ Synced Brand Kit identity to Thumbnail!');
}

/* ----------------------------------------------------
   VIDEO KEYFRAME EXTRACTOR (Wayin.ai Promptless Flow)
   Extract high-CTR moments directly from video file
   ---------------------------------------------------- */
function setupVideoDropzone() {
  var dropzone = $('ytVideoDropzone');
  if (!dropzone) return;

  ['dragenter', 'dragover'].forEach(function(evt) {
    dropzone.addEventListener(evt, function(e) {
      e.preventDefault();
      e.stopPropagation();
      dropzone.style.borderColor = 'var(--accent)';
      dropzone.style.background = 'rgba(124,110,250,0.1)';
    }, false);
  });

  ['dragleave', 'drop'].forEach(function(evt) {
    dropzone.addEventListener(evt, function(e) {
      e.preventDefault();
      e.stopPropagation();
      dropzone.style.borderColor = 'var(--line)';
      dropzone.style.background = 'transparent';
    }, false);
  });

  dropzone.addEventListener('drop', function(e) {
    var dt = e.dataTransfer;
    if (dt && dt.files && dt.files[0]) {
      loadThumbnailVideo(dt.files[0]);
    }
  }, false);
}

function onThumbnailVideoSelected(input) {
  if (input.files && input.files[0]) {
    loadThumbnailVideo(input.files[0]);
    input.value = '';
  }
}

function loadThumbnailVideo(file) {
  if (!file) return;
  if (!file.type.startsWith('video/')) {
    showToast('Please select a valid video file (MP4, MOV, WebM)');
    return;
  }
  var url = URL.createObjectURL(file);
  initVideoPlayer(url, file.name);
}

function initVideoPlayer(url, title) {
  var video = $('ytVideoElem');
  if (!video) return;

  video.crossOrigin = 'anonymous';
  video.src = url;

  video.onloadedmetadata = function() {
    THUMBNAIL_STATE.videoDuration = video.duration || 10;
    THUMBNAIL_STATE.videoCurrentTime = 0;

    var seeker = $('ytVideoSeeker');
    if (seeker) {
      seeker.min = 0;
      seeker.max = video.duration;
      seeker.step = 0.05;
      seeker.value = 0;
    }

    if ($('ytVideoControlsWrap')) $('ytVideoControlsWrap').style.display = 'block';
    updateVideoTimeDisplay(0, video.duration);

    // Seek to first frame and draw preview
    video.currentTime = Math.min(1.0, video.duration / 2);
    showToast('🎬 Loaded "' + (title || 'Video') + '"! Scrub timeline to grab keyframes.');
  };

  video.onseeked = function() {
    drawVideoFramePreview();
    updateVideoTimeDisplay(video.currentTime, video.duration);
  };
}

function onThumbnailVideoSeek(val) {
  var video = $('ytVideoElem');
  if (!video || !video.duration) return;
  var targetTime = parseFloat(val);
  video.currentTime = targetTime;
}

function stepThumbnailVideo(delta) {
  var video = $('ytVideoElem');
  if (!video || !video.duration) return;
  var newTime = Math.min(Math.max(0, video.currentTime + delta), video.duration);
  video.currentTime = newTime;
  if ($('ytVideoSeeker')) $('ytVideoSeeker').value = newTime;
}

function drawVideoFramePreview() {
  var video = $('ytVideoElem');
  var previewCanvas = $('ytVideoFramePreview');
  if (!video || !previewCanvas) return;

  var ctx = previewCanvas.getContext('2d');
  previewCanvas.width = video.videoWidth || 640;
  previewCanvas.height = video.videoHeight || 360;
  ctx.drawImage(video, 0, 0, previewCanvas.width, previewCanvas.height);
}

function updateVideoTimeDisplay(curr, total) {
  var badge = $('ytVideoTimeBadge');
  if (badge) {
    badge.textContent = formatVideoTime(curr) + ' / ' + formatVideoTime(total);
  }
}

function formatVideoTime(secs) {
  secs = Math.floor(secs || 0);
  var m = Math.floor(secs / 60);
  var s = secs % 60;
  var strM = m < 10 ? '0' + m : m;
  var strS = s < 10 ? '0' + s : s;
  return strM + ':' + strS;
}

/* Capture Action 1: Use Video Frame as Full Canvas Backdrop */
function captureVideoAsBackdrop() {
  var video = $('ytVideoElem');
  if (!video || !video.videoWidth) {
    showToast('Load a video file first to capture frames');
    return;
  }
  var temp = document.createElement('canvas');
  temp.width = video.videoWidth;
  temp.height = video.videoHeight;
  var tctx = temp.getContext('2d');
  tctx.drawImage(video, 0, 0);

  var img = new Image();
  img.onload = function() {
    THUMBNAIL_STATE.uploadedBgImage = img;
    THUMBNAIL_STATE.bgType = 'image';
    if ($('ytRemoveBgBtn')) $('ytRemoveBgBtn').style.display = 'inline-flex';
    renderThumbnail();
    showToast('📸 Frame at ' + formatVideoTime(video.currentTime) + ' set as thumbnail backdrop!');
  };
  img.src = temp.toDataURL('image/jpeg', 0.95);
}

/* Capture Action 2: Extract Face / Subject with In-Browser AI Cutout */
function captureVideoAsCutout() {
  var video = $('ytVideoElem');
  if (!video || !video.videoWidth) {
    showToast('Load a video file first to extract subject');
    return;
  }
  var temp = document.createElement('canvas');
  temp.width = video.videoWidth;
  temp.height = video.videoHeight;
  var tctx = temp.getContext('2d');
  tctx.drawImage(video, 0, 0);
  var frameDataUrl = temp.toDataURL('image/png');

  var btn = $('ytAiCutoutBtn');
  if (btn) btn.innerHTML = '⏳ AI Isolating Subject...';
  showToast('⏳ AI is isolating face/person from video frame...');

  extractCutoutFromDataUrl(frameDataUrl, function(cutoutImg) {
    THUMBNAIL_STATE.cutoutImage = cutoutImg;
    THUMBNAIL_STATE.cutoutPosition = 'right';
    if ($('ytRemoveCutoutBtn')) $('ytRemoveCutoutBtn').style.display = 'inline-flex';
    if (btn) btn.innerHTML = '✂️ Extract Face / Subject with AI Cutout';
    renderThumbnail();
    showToast('✨ Creator cutout extracted from video & applied with neon glow!');
  });
}

/* Capture Action 3: Use Video Frame in Secondary Mockup Card */
function captureVideoAsGraphic() {
  var video = $('ytVideoElem');
  if (!video || !video.videoWidth) {
    showToast('Load a video file first to capture graphic card');
    return;
  }
  var temp = document.createElement('canvas');
  temp.width = video.videoWidth;
  temp.height = video.videoHeight;
  var tctx = temp.getContext('2d');
  tctx.drawImage(video, 0, 0);

  var img = new Image();
  img.onload = function() {
    THUMBNAIL_STATE.graphicImage = img;
    THUMBNAIL_STATE.graphicEnabled = true;
    THUMBNAIL_STATE.graphicPosition = 'left';
    if ($('ytGraphicEnabled')) $('ytGraphicEnabled').checked = true;
    if ($('ytRemoveGraphicBtn')) $('ytRemoveGraphicBtn').style.display = 'inline-flex';
    renderThumbnail();
    showToast('🃏 Frame placed into Graphic Mockup Card!');
  };
  img.src = temp.toDataURL('image/jpeg', 0.95);
}

/* 1-Click Procedural Sample Video Generator (Works 100% Offline & Instant) */
function loadSampleVideoClip() {
  showToast('Generating instant sample creator clip in memory...');
  var c = document.createElement('canvas');
  c.width = 640;
  c.height = 360;
  var ctx = c.getContext('2d');

  var stream = c.captureStream(25);
  var mediaRecorder;
  try {
    mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
  } catch (e) {
    showToast('MediaRecorder not supported, loading direct sample frame');
    return;
  }

  var chunks = [];
  mediaRecorder.ondataavailable = function(e) { chunks.push(e.data); };
  mediaRecorder.onstop = function() {
    var blob = new Blob(chunks, { type: 'video/webm' });
    var url = URL.createObjectURL(blob);
    initVideoPlayer(url, 'sample-creator-timeline.webm');
  };

  mediaRecorder.start();
  var frameCount = 0;
  var totalFrames = 100; // 4 seconds at 25 fps

  var timer = setInterval(function() {
    var progress = frameCount / totalFrames;
    ctx.fillStyle = '#0F172A';
    ctx.fillRect(0, 0, 640, 360);

    // Dynamic background grid
    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.lineWidth = 1;
    for (var x = 0; x < 640; x += 40) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 360); ctx.stroke();
    }

    if (progress < 0.45) {
      // Scene 1: Thinking / Skeptical
      ctx.fillStyle = '#38BDF8';
      ctx.beginPath(); ctx.arc(320, 160, 65, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#000';
      ctx.font = '700 24px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('🤔', 320, 170);
      ctx.fillStyle = '#FFF';
      ctx.font = '700 20px -apple-system, sans-serif';
      ctx.fillText('Scene 1: Skeptical Moment', 320, 260);
      ctx.font = '14px monospace';
      ctx.fillStyle = '#94A3B8';
      ctx.fillText('Time: ' + (progress * 4).toFixed(1) + 's (Great for Curious Hooks)', 320, 290);
    } else {
      // Scene 2: Shocked / Viral Highlight
      ctx.fillStyle = '#F59E0B';
      ctx.beginPath(); ctx.arc(320, 160, 72, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#000';
      ctx.font = '700 32px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('😱', 320, 172);
      ctx.fillStyle = '#FFF';
      ctx.font = '900 22px -apple-system, sans-serif';
      ctx.fillText('Scene 2: VIRAL REACTION PEAK!', 320, 260);
      ctx.font = '14px monospace';
      ctx.fillStyle = '#FDE047';
      ctx.fillText('Time: ' + (progress * 4).toFixed(1) + 's (Maximum Click-Pull!)', 320, 290);
    }

    frameCount++;
    if (frameCount >= totalFrames) {
      clearInterval(timer);
      mediaRecorder.stop();
    }
  }, 25);
}

/* Helper to isolate subject from DataURL via client-side AI or smart canvas */
async function extractCutoutFromDataUrl(dataUrl, callback) {
  var img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = async function() {
    // 1. Try modern client-side AI background removal (@imgly/background-removal)
    try {
      var module = await import('https://cdn.jsdelivr.net/npm/@imgly/background-removal@1.5.7/+esm');
      var removeBackground = module.removeBackground || (module.default && module.default.removeBackground) || module.default;
      if (typeof removeBackground === 'function') {
        var blob = await removeBackground(dataUrl);
        var url = URL.createObjectURL(blob);
        var cutout = new Image();
        cutout.onload = function() {
          callback(cutout);
        };
        cutout.src = url;
        return;
      }
    } catch (err) {
      console.warn('AI background removal module note, falling back to smart canvas cutout:', err);
    }

    // 2. High-performance Smart Canvas Cutout Fallback
    try {
      if (typeof smartCanvasCutout === 'function') {
        var cutoutCanvas = smartCanvasCutout(img);
        var cutout2 = new Image();
        cutout2.onload = function() {
          callback(cutout2);
        };
        cutout2.src = cutoutCanvas.toDataURL('image/png');
        return;
      }
    } catch (e) {
      console.error('Canvas cutout fallback failed:', e);
    }

    // Fallback: return original image
    callback(img);
  };
  img.src = dataUrl;
}

/* ----------------------------------------------------
   1-CLICK A/B TEST VARIATIONS GENERATOR (Promptless)
   Generates 4 distinct viral visual directions in 1 click
   ---------------------------------------------------- */
var VARIATION_RECIPES = [
  {
    name: '💥 Viral Impact',
    badge: 'MrBeast Contrast',
    fontFamily: 'Anton',
    fontSize: 90,
    tiltAngle: -4,
    textColor: '#FFFFFF',
    highlightColor: '#FFE600',
    strokeColor: '#000000',
    strokeWidth: 16,
    shadowBlur: 24,
    bgType: 'gradient',
    bgGradient: 'radial-cyber',
    bgOverlay: 25,
    cutoutScale: 104,
    cutoutGlowColor: '#FFFFFF',
    cutoutGlowWidth: 12,
    graphicEnabled: false
  },
  {
    name: '🃏 Split Proof',
    badge: 'Productivity & Tech',
    fontFamily: 'Inter Tight',
    fontSize: 82,
    tiltAngle: 0,
    textColor: '#FFFFFF',
    highlightColor: '#38BDF8',
    strokeColor: '#000000',
    strokeWidth: 10,
    shadowBlur: 16,
    bgType: 'gradient',
    bgGradient: 'radial-cyber',
    bgOverlay: 15,
    cutoutPosition: 'left',
    cutoutScale: 98,
    cutoutGlowColor: '#38BDF8',
    cutoutGlowWidth: 8,
    graphicEnabled: true,
    graphicPosition: 'right',
    graphicTilt: 3
  },
  {
    name: '🎙️ Cinematic Drama',
    badge: 'Story & Podcast',
    fontFamily: 'Playfair Display',
    fontSize: 84,
    tiltAngle: -2,
    textColor: '#F8FAFC',
    highlightColor: '#F59E0B',
    strokeColor: '#000000',
    strokeWidth: 10,
    shadowBlur: 22,
    bgType: 'gradient',
    bgGradient: 'radial-podcast',
    bgOverlay: 40,
    cutoutPosition: 'left',
    cutoutScale: 100,
    cutoutGlowColor: '#FDE68A',
    cutoutGlowWidth: 8,
    graphicEnabled: false
  },
  {
    name: '🔍 Reaction Zoom',
    badge: 'Maximum Emotion',
    fontFamily: 'Space Grotesk',
    fontSize: 86,
    tiltAngle: 2,
    textColor: '#FFFFFF',
    highlightColor: '#A855F7',
    strokeColor: '#0F172A',
    strokeWidth: 14,
    shadowBlur: 28,
    bgType: 'gradient',
    bgGradient: 'linear-gaming',
    bgOverlay: 20,
    cutoutPosition: 'right',
    cutoutScale: 116,
    cutoutGlowColor: '#C084FC',
    cutoutGlowWidth: 14,
    badgeText: '⚠️ MUST WATCH'
  }
];

function generateThumbnailVariations() {
  var wrap = $('ytVariationsWrap');
  var list = $('ytVariationsList');
  if (!wrap || !list) return;

  list.innerHTML = '';
  CURRENT_VARIATIONS = [];

  VARIATION_RECIPES.forEach(function(recipe, idx) {
    var vState = Object.assign({}, THUMBNAIL_STATE, recipe);
    CURRENT_VARIATIONS.push(vState);

    // Create thumbnail card
    var card = document.createElement('div');
    card.className = 'yt-var-card';
    card.style.cssText = 'background:var(--card2); border:1px solid var(--line); border-radius:8px; padding:10px; display:flex; flex-direction:column; gap:8px';

    var header = document.createElement('div');
    header.style.cssText = 'display:flex; justify-content:space-between; align-items:center';
    header.innerHTML = '<span style="font-weight:700; font-size:12px">' + recipe.name + '</span><span class="badge" style="font-size:9.5px; padding:1px 6px">' + recipe.badge + '</span>';

    var miniCanvas = document.createElement('canvas');
    miniCanvas.width = 640;
    miniCanvas.height = 360;
    miniCanvas.style.cssText = 'width:100%; aspect-ratio:16/9; border-radius:6px; display:block; background:#000';
    renderThumbnailToCanvas(miniCanvas, vState);

    var applyBtn = document.createElement('button');
    applyBtn.type = 'button';
    applyBtn.className = 'btn btn-primary btn-sm';
    applyBtn.style.cssText = 'width:100%; justify-content:center; font-size:11px';
    applyBtn.textContent = '✓ Apply this Variation';
    applyBtn.onclick = function() {
      applyThumbnailVariation(idx);
    };

    card.appendChild(header);
    card.appendChild(miniCanvas);
    card.appendChild(applyBtn);
    list.appendChild(card);
  });

  wrap.style.display = 'block';
  showToast('⚡ 4 A/B variations generated! Click any to apply.');
}

function applyThumbnailVariation(idx) {
  var v = CURRENT_VARIATIONS[idx];
  if (!v) return;
  Object.assign(THUMBNAIL_STATE, v);
  populateThumbnailForm();
  saveThumbnailState();
  renderThumbnail();
  showToast('✓ Applied ' + VARIATION_RECIPES[idx].name + ' to active thumbnail!');
}

/* Standardized canvas renderer for main view or variations */
function renderThumbnailToCanvas(canvas, state) {
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  if (!ctx) return;

  var W = canvas.width;
  var H = canvas.height;
  var scaleFactor = W / 1280;

  // Background
  var origBg = THUMBNAIL_STATE.bgGradient;
  var origOverlay = THUMBNAIL_STATE.bgOverlay;
  THUMBNAIL_STATE.bgGradient = state.bgGradient || 'radial-cyber';
  THUMBNAIL_STATE.bgOverlay = state.bgOverlay || 20;
  drawThumbnailBackground(ctx, W, H);
  THUMBNAIL_STATE.bgGradient = origBg;
  THUMBNAIL_STATE.bgOverlay = origOverlay;

  // Graphic Mockup
  if (state.graphicEnabled) {
    var savedPos = THUMBNAIL_STATE.graphicPosition;
    THUMBNAIL_STATE.graphicPosition = state.graphicPosition || 'right';
    drawThumbnailGraphicCard(ctx, W, H, scaleFactor);
    THUMBNAIL_STATE.graphicPosition = savedPos;
  }

  // Cutout
  if (THUMBNAIL_STATE.cutoutImage) {
    var savedCutPos = THUMBNAIL_STATE.cutoutPosition;
    var savedCutScale = THUMBNAIL_STATE.cutoutScale;
    var savedGlow = THUMBNAIL_STATE.cutoutGlowColor;
    var savedGlowW = THUMBNAIL_STATE.cutoutGlowWidth;

    THUMBNAIL_STATE.cutoutPosition = state.cutoutPosition || 'right';
    THUMBNAIL_STATE.cutoutScale = state.cutoutScale || 100;
    THUMBNAIL_STATE.cutoutGlowColor = state.cutoutGlowColor || '#FFFFFF';
    THUMBNAIL_STATE.cutoutGlowWidth = state.cutoutGlowWidth || 8;

    drawThumbnailCutout(ctx, W, H, scaleFactor);

    THUMBNAIL_STATE.cutoutPosition = savedCutPos;
    THUMBNAIL_STATE.cutoutScale = savedCutScale;
    THUMBNAIL_STATE.cutoutGlowColor = savedGlow;
    THUMBNAIL_STATE.cutoutGlowWidth = savedGlowW;
  }

  // Typography
  var savedFont = THUMBNAIL_STATE.fontFamily;
  var savedSize = THUMBNAIL_STATE.fontSize;
  var savedTilt = THUMBNAIL_STATE.tiltAngle;
  var savedHCol = THUMBNAIL_STATE.highlightColor;
  var savedStroke = THUMBNAIL_STATE.strokeWidth;
  var savedBadge = THUMBNAIL_STATE.badgeText;

  THUMBNAIL_STATE.fontFamily = state.fontFamily || 'Inter Tight';
  THUMBNAIL_STATE.fontSize = state.fontSize || 84;
  THUMBNAIL_STATE.tiltAngle = state.tiltAngle || 0;
  THUMBNAIL_STATE.highlightColor = state.highlightColor || '#38BDF8';
  THUMBNAIL_STATE.strokeWidth = state.strokeWidth || 12;
  if (state.badgeText) THUMBNAIL_STATE.badgeText = state.badgeText;

  drawThumbnailTypography(ctx, W, H, scaleFactor);

  THUMBNAIL_STATE.fontFamily = savedFont;
  THUMBNAIL_STATE.fontSize = savedSize;
  THUMBNAIL_STATE.tiltAngle = savedTilt;
  THUMBNAIL_STATE.highlightColor = savedHCol;
  THUMBNAIL_STATE.strokeWidth = savedStroke;
  THUMBNAIL_STATE.badgeText = savedBadge;

  // Teaser Subtitles
  if (state.showTeaserCaption && state.teaserCaptionText) {
    var savedTeaser = THUMBNAIL_STATE.showTeaserCaption;
    var savedTeaserTxt = THUMBNAIL_STATE.teaserCaptionText;
    THUMBNAIL_STATE.showTeaserCaption = true;
    THUMBNAIL_STATE.teaserCaptionText = state.teaserCaptionText;
    drawThumbnailTeaserCaption(ctx, W, H, scaleFactor);
    THUMBNAIL_STATE.showTeaserCaption = savedTeaser;
    THUMBNAIL_STATE.teaserCaptionText = savedTeaserTxt;
  }

  // Timestamp
  drawYtTimestampOverlay(ctx, W, H, scaleFactor);
}

/* Upload Cutout / Reaction Face Image */
function onThumbnailCutoutSelected(input) {
  if (input.files && input.files[0]) {
    var file = input.files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
      var img = new Image();
      img.onload = function() {
        THUMBNAIL_STATE.cutoutImage = img;
        if ($('ytRemoveCutoutBtn')) $('ytRemoveCutoutBtn').style.display = 'inline-flex';
        renderThumbnail();
        showToast('✓ Cutout image imported!');
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
    input.value = '';
  }
}

function removeThumbnailCutout() {
  THUMBNAIL_STATE.cutoutImage = null;
  if ($('ytRemoveCutoutBtn')) $('ytRemoveCutoutBtn').style.display = 'none';
  renderThumbnail();
  showToast('Cutout removed');
}

/* Upload Graphic Card Screenshot / Image */
function onThumbnailGraphicSelected(input) {
  if (input.files && input.files[0]) {
    var file = input.files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
      var img = new Image();
      img.onload = function() {
        THUMBNAIL_STATE.graphicImage = img;
        THUMBNAIL_STATE.graphicEnabled = true;
        if ($('ytGraphicEnabled')) $('ytGraphicEnabled').checked = true;
        if ($('ytRemoveGraphicBtn')) $('ytRemoveGraphicBtn').style.display = 'inline-flex';
        renderThumbnail();
        showToast('✓ Screenshot imported into Graphic Card!');
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
    input.value = '';
  }
}

function removeThumbnailGraphic() {
  THUMBNAIL_STATE.graphicImage = null;
  if ($('ytRemoveGraphicBtn')) $('ytRemoveGraphicBtn').style.display = 'none';
  renderThumbnail();
  showToast('Graphic card reset to preset template');
}

/* Upload Custom Background Image */
function onThumbnailBgSelected(input) {
  if (input.files && input.files[0]) {
    var file = input.files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
      var img = new Image();
      img.onload = function() {
        THUMBNAIL_STATE.uploadedBgImage = img;
        THUMBNAIL_STATE.bgType = 'image';
        if ($('ytRemoveBgBtn')) $('ytRemoveBgBtn').style.display = 'inline-flex';
        renderThumbnail();
        showToast('✓ Custom background loaded!');
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
    input.value = '';
  }
}

function removeThumbnailBg() {
  THUMBNAIL_STATE.uploadedBgImage = null;
  THUMBNAIL_STATE.bgType = 'gradient';
  if ($('ytRemoveBgBtn')) $('ytRemoveBgBtn').style.display = 'none';
  renderThumbnail();
  showToast('Background reset to gradient');
}

/* 1-Click Send Cutout from BG Remover */
function sendBgCutoutToThumbnail() {
  if (typeof BG_STATE === 'undefined' || !BG_STATE.processedImage) {
    showToast('No cutout available in BG Remover');
    return;
  }
  var img = new Image();
  img.onload = function() {
    THUMBNAIL_STATE.cutoutImage = img;
    if ($('ytRemoveCutoutBtn')) $('ytRemoveCutoutBtn').style.display = 'inline-flex';
    switchMode('thumbnail');
    renderThumbnail();
    showToast('✓ Cutout transferred into Thumbnail Studio!');
  };
  img.src = BG_STATE.processedImage;
}

/* -------------------------------------------
   Core Thumbnail Rendering Pipeline
   1280 × 720 px (Official YouTube standard)
   ------------------------------------------- */
function renderThumbnail() {
  var canvas = $('thumbnailCanvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  if (!ctx) return;

  var isFHD = THUMBNAIL_STATE.exportResolution === 'fhd';
  var W = isFHD ? 1920 : 1280;
  var H = isFHD ? 1080 : 720;
  var scaleFactor = W / 1280;

  canvas.width = W;
  canvas.height = H;

  // 1. Draw Background (Gradient or Custom Image)
  drawThumbnailBackground(ctx, W, H);

  // 2. Draw Midground Atmospheric Depth Layer (Volumetric Fog, Bokeh)
  drawAtmosphereDepthLayer(ctx, W, H, scaleFactor, 'midground');

  // 3. Draw Head Halo / Spotlight behind subject
  if (THUMBNAIL_STATE.showHalo !== false) {
    drawHeadHaloSpotlight(ctx, W, H, scaleFactor);
  }

  // 4. Draw Secondary Graphic / Screenshot Card (Calendar, Notion, Code, Chart)
  if (THUMBNAIL_STATE.graphicEnabled) {
    drawThumbnailGraphicCard(ctx, W, H, scaleFactor);
  }

  // 5. Draw Cutout Image (if attached) with Dual-Tone Rim & Facial Clarity
  if (THUMBNAIL_STATE.cutoutImage) {
    drawThumbnailCutout(ctx, W, H, scaleFactor);
  }

  // 6. Draw Foreground Atmospheric Depth Layer (Floating Sparks, Particles, Bokeh)
  drawAtmosphereDepthLayer(ctx, W, H, scaleFactor, 'foreground');

  // 7. Draw Typography, Attention Pill & Tool Badges
  drawThumbnailTypography(ctx, W, H, scaleFactor);

  // 8. Draw Channel Corner Logo Badge (BIZ ADDA, PC MAG, etc.)
  if (THUMBNAIL_STATE.showChannelBadge && THUMBNAIL_STATE.channelBadgeText) {
    drawThumbnailChannelBadge(ctx, W, H, scaleFactor);
  }

  // 9. Draw Teaser Caption Bar (Ishan Sharma viral spoken hook)
  if (THUMBNAIL_STATE.showTeaserCaption && THUMBNAIL_STATE.teaserCaptionText) {
    drawThumbnailTeaserCaption(ctx, W, H, scaleFactor);
  }

  // 10. Draw YouTube UI Simulation Overlay (Timestamp)
  if (THUMBNAIL_STATE.showYtTimestamp) {
    drawYtTimestampOverlay(ctx, W, H, scaleFactor);
  }

  // 11. Update Live YouTube Feed Simulator if active
  updateFeedSimulator();
}

/* Background Renderer */
function drawThumbnailBackground(ctx, W, H) {
  if (THUMBNAIL_STATE.bgType === 'image' && THUMBNAIL_STATE.uploadedBgImage) {
    var img = THUMBNAIL_STATE.uploadedBgImage;
    var iAspect = img.width / img.height;
    var cAspect = W / H;
    var drawW, drawH, drawX, drawY;

    if (iAspect > cAspect) {
      drawH = H;
      drawW = H * iAspect;
      drawX = (W - drawW) / 2;
      drawY = 0;
    } else {
      drawW = W;
      drawH = W / iAspect;
      drawX = 0;
      drawY = (H - drawH) / 2;
    }
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  } else {
    var gType = THUMBNAIL_STATE.bgGradient || 'radial-cyber';
    var grad;

    if (gType === 'radial-cyber') {
      grad = ctx.createRadialGradient(W * 0.7, H * 0.4, 60, W * 0.7, H * 0.5, W * 0.85);
      grad.addColorStop(0, '#1E1B4B');
      grad.addColorStop(0.5, '#0F0E1E');
      grad.addColorStop(1, '#05050A');
    } else if (gType === 'light-clean') {
      grad = ctx.createLinearGradient(0, 0, W, H);
      grad.addColorStop(0, '#FFFFFF');
      grad.addColorStop(0.6, '#F1F5F9');
      grad.addColorStop(1, '#E2E8F0');
    } else if (gType === 'soft-studio') {
      grad = ctx.createRadialGradient(W * 0.5, H * 0.4, 80, W * 0.5, H * 0.5, W * 0.85);
      grad.addColorStop(0, '#F8FAFC');
      grad.addColorStop(0.6, '#E2E8F0');
      grad.addColorStop(1, '#CBD5E1');
    } else if (gType === 'blue-studio') {
      grad = ctx.createLinearGradient(0, 0, W, H);
      grad.addColorStop(0, '#0284C7');
      grad.addColorStop(0.45, '#0369A1');
      grad.addColorStop(1, '#0F172A');
    } else if (gType === 'radial-stage') {
      grad = ctx.createRadialGradient(W * 0.35, H * 0.5, 60, W * 0.4, H * 0.5, W * 0.85);
      grad.addColorStop(0, '#991B1B');
      grad.addColorStop(0.5, '#450A0A');
      grad.addColorStop(1, '#090505');
    } else if (gType === 'linear-tech') {
      grad = ctx.createLinearGradient(0, 0, W, H);
      grad.addColorStop(0, '#0F172A');
      grad.addColorStop(0.6, '#0B1120');
      grad.addColorStop(1, '#020617');
    } else if (gType === 'linear-finance') {
      grad = ctx.createLinearGradient(0, 0, W, H);
      grad.addColorStop(0, '#064E3B');
      grad.addColorStop(0.4, '#022C22');
      grad.addColorStop(1, '#02130F');
    } else if (gType === 'radial-podcast') {
      grad = ctx.createRadialGradient(W * 0.35, H * 0.5, 80, W * 0.5, H * 0.5, W * 0.8);
      grad.addColorStop(0, '#451A03');
      grad.addColorStop(0.5, '#1C0A02');
      grad.addColorStop(1, '#080301');
    } else if (gType === 'linear-gaming') {
      grad = ctx.createLinearGradient(0, 0, W, H);
      grad.addColorStop(0, '#4C1D95');
      grad.addColorStop(0.5, '#2E1065');
      grad.addColorStop(1, '#0F051D');
    } else {
      grad = ctx.createLinearGradient(0, 0, 0, H);
      grad.addColorStop(0, '#18181B');
      grad.addColorStop(1, '#000000');
    }

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // Subtle atmospheric glow
    ctx.save();
    var glow = ctx.createRadialGradient(W * 0.75, H * 0.4, 20, W * 0.75, H * 0.4, 380);
    glow.addColorStop(0, hexToRgba(THUMBNAIL_STATE.highlightColor || '#38BDF8', 0.22));
    glow.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, W, H);
    ctx.restore();
  }

  // Dark vignette overlay
  var overlayPct = (THUMBNAIL_STATE.bgOverlay || 20) / 100;
  if (overlayPct > 0) {
    ctx.fillStyle = 'rgba(0, 0, 0, ' + overlayPct + ')';
    ctx.fillRect(0, 0, W, H);
  }
}

/* Secondary Graphic / Screenshot Mockup Card */
function drawThumbnailGraphicCard(ctx, W, H, scaleFactor) {
  var pos = THUMBNAIL_STATE.graphicPosition || 'right';
  var scale = (THUMBNAIL_STATE.graphicScale || 95) / 100;
  var tilt = (THUMBNAIL_STATE.graphicTilt || 0) * Math.PI / 180;

  var cardW = Math.round(W * 0.46 * scale);
  var cardH = Math.round(H * 0.64 * scale);
  var cardX = pos === 'right' ? (W - cardW - (45 * scaleFactor)) : (45 * scaleFactor);
  var cardY = Math.round(H * 0.24);

  ctx.save();
  ctx.translate(cardX + cardW / 2, cardY + cardH / 2);
  ctx.rotate(tilt);
  ctx.translate(-cardW / 2, -cardH / 2);

  // Soft modern drop shadow
  if (THUMBNAIL_STATE.graphicPerspective !== false) {
    ctx.shadowColor = 'rgba(0, 0, 0, 0.55)';
    ctx.shadowBlur = 36 * scaleFactor;
    ctx.shadowOffsetY = 16 * scaleFactor;
  } else {
    ctx.shadowColor = 'rgba(0, 0, 0, 0.42)';
    ctx.shadowBlur = 24 * scaleFactor;
    ctx.shadowOffsetY = 10 * scaleFactor;
  }

  var frameStyle = THUMBNAIL_STATE.graphicFrameStyle || 'card';

  if (frameStyle === 'laptop') {
    // Stylized laptop screen bezel
    ctx.fillStyle = '#0F172A';
    drawRoundRect(ctx, -8 * scaleFactor, -8 * scaleFactor, cardW + 16 * scaleFactor, cardH + 16 * scaleFactor, 12 * scaleFactor);
    ctx.fill();

    // Aluminum laptop base
    ctx.fillStyle = '#94A3B8';
    drawRoundRect(ctx, -24 * scaleFactor, cardH + 8 * scaleFactor, cardW + 48 * scaleFactor, 14 * scaleFactor, 4 * scaleFactor);
    ctx.fill();
  }

  // Clip content inside rounded card
  ctx.save();
  drawRoundRect(ctx, 0, 0, cardW, cardH, 14 * scaleFactor);
  ctx.clip();

  // Draw either uploaded image or selected procedural template
  if (THUMBNAIL_STATE.graphicImage) {
    ctx.drawImage(THUMBNAIL_STATE.graphicImage, 0, 0, cardW, cardH);
  } else {
    var type = THUMBNAIL_STATE.graphicType || 'calendar';
    if (type === 'calendar') {
      renderCalendarMockup(ctx, cardW, cardH, scaleFactor);
    } else if (type === 'notion') {
      renderNotionMockup(ctx, cardW, cardH, scaleFactor);
    } else if (type === 'code') {
      renderCodeMockup(ctx, cardW, cardH, scaleFactor);
    } else if (type === 'chart') {
      renderChartMockup(ctx, cardW, cardH, scaleFactor);
    } else {
      renderCalendarMockup(ctx, cardW, cardH, scaleFactor);
    }
  }

  // Studio-grade 3D specular glass reflection sheen
  if (THUMBNAIL_STATE.graphicPerspective !== false) {
    var gloss = ctx.createLinearGradient(0, 0, cardW, cardH * 0.7);
    gloss.addColorStop(0, 'rgba(255, 255, 255, 0.22)');
    gloss.addColorStop(0.35, 'rgba(255, 255, 255, 0.04)');
    gloss.addColorStop(0.38, 'transparent');
    gloss.addColorStop(1, 'transparent');
    ctx.fillStyle = gloss;
    ctx.fillRect(0, 0, cardW, cardH);
  }

  ctx.restore();

  // Subtle clean card border
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
  ctx.lineWidth = 1.5 * scaleFactor;
  drawRoundRect(ctx, 0, 0, cardW, cardH, 14 * scaleFactor);
  ctx.stroke();

  ctx.restore();
}

/* Procedural Google Calendar UI Mockup (Matching #1 Sarthak Virmani Thumbnail) */
function renderCalendarMockup(ctx, W, H, scaleFactor) {
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, W, H);

  // Top header bar
  ctx.fillStyle = '#F8FAFC';
  ctx.fillRect(0, 0, W, 42 * scaleFactor);
  ctx.fillStyle = '#0F172A';
  ctx.font = '700 ' + Math.round(13 * scaleFactor) + 'px -apple-system, Roboto, sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText('November 2026', 14 * scaleFactor, 21 * scaleFactor);

  // Day columns
  var days = ['Mon 10', 'Tue 11', 'Wed 12', 'Thu 13', 'Fri 14'];
  var colW = W / days.length;
  ctx.fillStyle = '#64748B';
  ctx.font = '600 ' + Math.round(10.5 * scaleFactor) + 'px -apple-system, Roboto, sans-serif';
  ctx.textAlign = 'center';

  for (var d = 0; d < days.length; d++) {
    var cx = d * colW + colW / 2;
    ctx.fillText(days[d], cx, 54 * scaleFactor);

    ctx.strokeStyle = '#F1F5F9';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(d * colW, 42 * scaleFactor);
    ctx.lineTo(d * colW, H);
    ctx.stroke();
  }

  // Time-blocked calendar pills
  var blocks = [
    { col: 0, top: 70, h: 48, colr: '#93C5FD', txt: '9:00 AM Deep Work' },
    { col: 0, top: 130, h: 68, colr: '#38BDF8', txt: '10:00 TIME BLOCK DONE ✓' },
    { col: 1, top: 80, h: 60, colr: '#C4B5FD', txt: 'Design Sprint' },
    { col: 1, top: 155, h: 50, colr: '#FDE047', txt: 'Client Strategy' },
    { col: 2, top: 70, h: 80, colr: '#86EFAC', txt: 'Script Writing' },
    { col: 2, top: 165, h: 44, colr: '#FCA5A5', txt: 'YouTube Edit' },
    { col: 3, top: 85, h: 55, colr: '#F9A8D4', txt: 'Product Launch' },
    { col: 3, top: 150, h: 65, colr: '#67E8F9', txt: 'Recording Day' },
    { col: 4, top: 75, h: 70, colr: '#FDBA74', txt: 'Weekly Review' },
    { col: 4, top: 160, h: 48, colr: '#A7F3D0', txt: 'Gym & Break' }
  ];

  for (var b = 0; b < blocks.length; b++) {
    var blk = blocks[b];
    var bx = blk.col * colW + 4 * scaleFactor;
    var by = blk.top * scaleFactor;
    var bw = colW - 8 * scaleFactor;
    var bh = blk.h * scaleFactor;

    ctx.fillStyle = blk.colr;
    drawRoundRect(ctx, bx, by, bw, bh, 5 * scaleFactor);
    ctx.fill();

    ctx.fillStyle = '#0F172A';
    ctx.font = '700 ' + Math.round(9 * scaleFactor) + 'px -apple-system, Roboto, sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(blk.txt, bx + 4 * scaleFactor, by + 4 * scaleFactor, bw - 8 * scaleFactor);
  }
}

/* Procedural Notion & AI Workspace Mockup */
function renderNotionMockup(ctx, W, H, scaleFactor) {
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, W, H);

  var sideW = Math.round(W * 0.3);
  ctx.fillStyle = '#F7F7F5';
  ctx.fillRect(0, 0, sideW, H);

  ctx.fillStyle = '#37352F';
  ctx.font = '700 ' + Math.round(11 * scaleFactor) + 'px -apple-system, Roboto, sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText('⚡ Workspace', 14 * scaleFactor, 24 * scaleFactor);

  var navs = ['📁 Areas', '🎯 Projects', '📝 Second Brain', '📚 Resources', '⚙️ Settings'];
  ctx.font = '500 ' + Math.round(9.5 * scaleFactor) + 'px -apple-system, Roboto, sans-serif';
  ctx.fillStyle = '#787774';
  for (var n = 0; n < navs.length; n++) {
    ctx.fillText(navs[n], 16 * scaleFactor, (54 + n * 24) * scaleFactor);
  }

  var mainX = sideW + 18 * scaleFactor;
  ctx.font = '32px sans-serif';
  ctx.fillText('🧠', mainX, 36 * scaleFactor);

  ctx.fillStyle = '#111827';
  ctx.font = '800 ' + Math.round(16 * scaleFactor) + 'px -apple-system, Roboto, sans-serif';
  ctx.fillText('Second Brain OS', mainX, 68 * scaleFactor);

  var tasks = [
    '✓ Time Blocking & Focus Sprints',
    '✓ Automated ChatGPT Knowledge Hub',
    '✓ Instant Notion Sync & Organization',
    '✓ Daily Habits & Goals Dashboard'
  ];
  ctx.font = '600 ' + Math.round(10.5 * scaleFactor) + 'px -apple-system, Roboto, sans-serif';
  for (var t = 0; t < tasks.length; t++) {
    ctx.fillStyle = t === 0 ? '#10B981' : '#374151';
    ctx.fillText(tasks[t], mainX, (102 + t * 26) * scaleFactor);
  }

  ctx.fillStyle = '#FEF3C7';
  drawRoundRect(ctx, mainX, (H - 38 * scaleFactor), 72 * scaleFactor, 22 * scaleFactor, 4 * scaleFactor);
  ctx.fill();
  ctx.fillStyle = '#D97706';
  ctx.font = '700 ' + Math.round(9 * scaleFactor) + 'px sans-serif';
  ctx.fillText('AI ACTIVE', mainX + 8 * scaleFactor, H - 26 * scaleFactor);
}

/* Procedural Code Editor Mockup */
function renderCodeMockup(ctx, W, H, scaleFactor) {
  ctx.fillStyle = '#0F172A';
  ctx.fillRect(0, 0, W, H);

  ctx.fillStyle = '#1E293B';
  ctx.fillRect(0, 0, W, 28 * scaleFactor);

  var dotColors = ['#EF4444', '#F59E0B', '#10B981'];
  for (var d = 0; d < 3; d++) {
    ctx.fillStyle = dotColors[d];
    ctx.beginPath();
    ctx.arc((14 + d * 14) * scaleFactor, 14 * scaleFactor, 4 * scaleFactor, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.fillStyle = '#94A3B8';
  ctx.font = '600 ' + Math.round(9.5 * scaleFactor) + 'px Menlo, monospace';
  ctx.textAlign = 'center';
  ctx.fillText('index.js — CreatorKit', W / 2, 14 * scaleFactor);

  var lines = [
    { num: '1', txt: 'import { AI, Agent } from "@creatorkit/core";', col: '#93C5FD' },
    { num: '2', txt: '', col: '' },
    { num: '3', txt: '// Initialize High-CTR Engine', col: '#64748B' },
    { num: '4', txt: 'const agent = new Agent({', col: '#F472B6' },
    { num: '5', txt: '  model: "ultra-fast",', col: '#34D399' },
    { num: '6', txt: '  clickThroughRate: "MAX_VIRAL",', col: '#FBBF24' },
    { num: '7', txt: '  contrast: 100,', col: '#A78BFA' },
    { num: '8', txt: '});', col: '#F472B6' },
    { num: '9', txt: '', col: '' },
    { num: '10', txt: 'await agent.renderInstantThumbnail();', col: '#38BDF8' }
  ];

  ctx.textAlign = 'left';
  for (var l = 0; l < lines.length; l++) {
    var ly = (48 + l * 18) * scaleFactor;
    ctx.fillStyle = '#475569';
    ctx.fillText(lines[l].num, 14 * scaleFactor, ly);
    ctx.fillStyle = lines[l].col || '#FFFFFF';
    ctx.fillText(lines[l].txt, 42 * scaleFactor, ly);
  }
}

/* Procedural Stock Chart Mockup */
function renderChartMockup(ctx, W, H, scaleFactor) {
  ctx.fillStyle = '#090D16';
  ctx.fillRect(0, 0, W, H);

  ctx.fillStyle = '#22C55E';
  ctx.font = '800 ' + Math.round(13 * scaleFactor) + 'px -apple-system, sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText('▲ +38.6% RECORD BREAKOUT', 16 * scaleFactor, 14 * scaleFactor);

  ctx.save();
  ctx.strokeStyle = '#22C55E';
  ctx.lineWidth = 3 * scaleFactor;
  ctx.shadowColor = '#22C55E';
  ctx.shadowBlur = 12 * scaleFactor;

  ctx.beginPath();
  ctx.moveTo(16 * scaleFactor, H * 0.78);
  ctx.bezierCurveTo(W * 0.3, H * 0.72, W * 0.5, H * 0.45, W - 20 * scaleFactor, H * 0.22);
  ctx.stroke();
  ctx.restore();

  ctx.fillStyle = '#15803D';
  drawRoundRect(ctx, W - 120 * scaleFactor, H * 0.16, 105 * scaleFactor, 24 * scaleFactor, 5 * scaleFactor);
  ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 ' + Math.round(10 * scaleFactor) + 'px sans-serif';
  ctx.fillText('ALL-TIME HIGH', W - 112 * scaleFactor, H * 0.23);
}

/* ----------------------------------------------------
   STUDIO LIGHTING & ATMOSPHERIC DEPTH SHADERS
   Dual-Tone Rim, Head Halo Spotlight & Atmospheric Depth
   ---------------------------------------------------- */

/* Head Halo / Backdrop Spotlight (Separates dark hair from dark backdrops) */
function drawHeadHaloSpotlight(ctx, W, H, scaleFactor) {
  if (THUMBNAIL_STATE.showHalo === false) return;
  var haloCol = THUMBNAIL_STATE.haloColor || '#38BDF8';
  var radius = (THUMBNAIL_STATE.haloRadius || 65) * scaleFactor * 3.8;

  // Determine center position of spotlight behind subject
  var cx = W * 0.72;
  var cy = H * 0.32;

  if (THUMBNAIL_STATE.cutoutImage) {
    var scale = (THUMBNAIL_STATE.cutoutScale || 100) / 100;
    var targetH = Math.round(H * 0.94 * scale);
    var targetW = Math.round(targetH * (THUMBNAIL_STATE.cutoutImage.width / THUMBNAIL_STATE.cutoutImage.height));
    var posX = W - targetW - 20;
    if (THUMBNAIL_STATE.cutoutPosition === 'left') posX = 20;
    else if (THUMBNAIL_STATE.cutoutPosition === 'center') posX = (W - targetW) / 2;
    var posY = H - targetH;

    cx = posX + targetW * 0.5;
    cy = posY + targetH * 0.28;
  } else if (THUMBNAIL_STATE.cutoutPosition === 'left') {
    cx = W * 0.28;
    cy = H * 0.32;
  }

  ctx.save();
  var grad = ctx.createRadialGradient(cx, cy, radius * 0.05, cx, cy, radius);
  grad.addColorStop(0, hexToRgba(haloCol, 0.65));
  grad.addColorStop(0.35, hexToRgba(haloCol, 0.32));
  grad.addColorStop(0.7, hexToRgba(haloCol, 0.08));
  grad.addColorStop(1, 'transparent');

  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

/* Atmospheric Depth Shader (Midground Volumetric Fog, Foreground Sparks/Dust/Bokeh) */
function drawAtmosphereDepthLayer(ctx, W, H, scaleFactor, stage) {
  var effect = THUMBNAIL_STATE.atmosphereEffect || 'fog';
  if (!effect || effect === 'none') return;

  ctx.save();

  if (stage === 'midground') {
    if (effect === 'fog') {
      // Atmospheric ground mist / volumetric haze
      var fogGrad = ctx.createLinearGradient(0, H * 0.45, 0, H);
      fogGrad.addColorStop(0, 'transparent');
      fogGrad.addColorStop(0.55, hexToRgba(THUMBNAIL_STATE.highlightColor || '#38BDF8', 0.12));
      fogGrad.addColorStop(1, 'rgba(5, 7, 15, 0.65)');
      ctx.fillStyle = fogGrad;
      ctx.fillRect(0, 0, W, H);

      // Soft volumetric rim beam
      var beam = ctx.createRadialGradient(W * 0.65, H * 0.35, 50 * scaleFactor, W * 0.65, H * 0.5, W * 0.6);
      beam.addColorStop(0, hexToRgba(THUMBNAIL_STATE.rimKeyColor || '#F59E0B', 0.12));
      beam.addColorStop(1, 'transparent');
      ctx.fillStyle = beam;
      ctx.fillRect(0, 0, W, H);
    } else if (effect === 'bokeh') {
      // Midground defocused light discs
      var bokehPoints = [
        { x: W * 0.15, y: H * 0.25, r: 65 * scaleFactor, a: 0.12, col: THUMBNAIL_STATE.highlightColor || '#38BDF8' },
        { x: W * 0.35, y: H * 0.70, r: 85 * scaleFactor, a: 0.10, col: THUMBNAIL_STATE.rimKeyColor || '#F59E0B' },
        { x: W * 0.85, y: H * 0.20, r: 50 * scaleFactor, a: 0.14, col: '#FFFFFF' },
        { x: W * 0.92, y: H * 0.65, r: 70 * scaleFactor, a: 0.08, col: THUMBNAIL_STATE.highlightColor || '#38BDF8' },
        { x: W * 0.50, y: H * 0.15, r: 40 * scaleFactor, a: 0.09, col: '#FFFFFF' }
      ];
      bokehPoints.forEach(function(bp) {
        var bg = ctx.createRadialGradient(bp.x, bp.y, bp.r * 0.2, bp.x, bp.y, bp.r);
        bg.addColorStop(0, hexToRgba(bp.col, bp.a * 1.5));
        bg.addColorStop(0.75, hexToRgba(bp.col, bp.a * 0.8));
        bg.addColorStop(1, 'transparent');
        ctx.fillStyle = bg;
        ctx.beginPath();
        ctx.arc(bp.x, bp.y, bp.r, 0, Math.PI * 2);
        ctx.fill();
      });
    }
  } else if (stage === 'foreground') {
    if (effect === 'sparks') {
      // High-CTR dynamic ember particles floating upwards/diagonally
      var sparks = [
        { x: W * 0.78, y: H * 0.82, r: 3.5, a: 0.85 },
        { x: W * 0.83, y: H * 0.74, r: 2.5, a: 0.90 },
        { x: W * 0.72, y: H * 0.68, r: 4.2, a: 0.80 },
        { x: W * 0.88, y: H * 0.62, r: 2.0, a: 0.75 },
        { x: W * 0.68, y: H * 0.58, r: 3.0, a: 0.82 },
        { x: W * 0.92, y: H * 0.48, r: 4.0, a: 0.90 },
        { x: W * 0.80, y: H * 0.42, r: 2.8, a: 0.70 },
        { x: W * 0.65, y: H * 0.38, r: 2.2, a: 0.65 },
        { x: W * 0.86, y: H * 0.30, r: 3.8, a: 0.85 },
        { x: W * 0.22, y: H * 0.78, r: 3.2, a: 0.75 },
        { x: W * 0.28, y: H * 0.65, r: 2.0, a: 0.80 },
        { x: W * 0.18, y: H * 0.52, r: 2.8, a: 0.65 }
      ];
      var sparkCol = THUMBNAIL_STATE.rimKeyColor || '#F59E0B';
      sparks.forEach(function(s) {
        var rad = s.r * scaleFactor;
        var sg = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, rad * 3.5);
        sg.addColorStop(0, '#FFFFFF');
        sg.addColorStop(0.35, hexToRgba(sparkCol, s.a));
        sg.addColorStop(1, 'transparent');
        ctx.fillStyle = sg;
        ctx.beginPath();
        ctx.arc(s.x, s.y, rad * 3.5, 0, Math.PI * 2);
        ctx.fill();
      });
    } else if (effect === 'particles') {
      // Cinematic subtle dust specks / stars
      var dust = [
        { x: W * 0.12, y: H * 0.18, r: 2.0, a: 0.45 },
        { x: W * 0.28, y: H * 0.32, r: 1.8, a: 0.55 },
        { x: W * 0.45, y: H * 0.22, r: 2.4, a: 0.60 },
        { x: W * 0.62, y: H * 0.28, r: 1.5, a: 0.40 },
        { x: W * 0.76, y: H * 0.15, r: 2.6, a: 0.70 },
        { x: W * 0.88, y: H * 0.25, r: 2.0, a: 0.50 },
        { x: W * 0.38, y: H * 0.82, r: 2.2, a: 0.45 },
        { x: W * 0.58, y: H * 0.75, r: 1.8, a: 0.35 },
        { x: W * 0.82, y: H * 0.85, r: 2.5, a: 0.55 }
      ];
      dust.forEach(function(d) {
        var rad = d.r * scaleFactor;
        ctx.fillStyle = 'rgba(255, 255, 255, ' + d.a + ')';
        ctx.beginPath();
        ctx.arc(d.x, d.y, rad, 0, Math.PI * 2);
        ctx.fill();
      });
    } else if (effect === 'bokeh') {
      // Foreground optical blur floaters
      var fgBokeh = [
        { x: W * 0.08, y: H * 0.85, r: 90 * scaleFactor, a: 0.16, col: THUMBNAIL_STATE.highlightColor || '#38BDF8' },
        { x: W * 0.95, y: H * 0.18, r: 75 * scaleFactor, a: 0.14, col: THUMBNAIL_STATE.rimKeyColor || '#F59E0B' }
      ];
      fgBokeh.forEach(function(bp) {
        var bg = ctx.createRadialGradient(bp.x, bp.y, bp.r * 0.3, bp.x, bp.y, bp.r);
        bg.addColorStop(0, hexToRgba(bp.col, bp.a));
        bg.addColorStop(1, 'transparent');
        ctx.fillStyle = bg;
        ctx.beginPath();
        ctx.arc(bp.x, bp.y, bp.r, 0, Math.PI * 2);
        ctx.fill();
      });
    }
  }

  ctx.restore();
}

/* Cutout Image with Directional Dual-Tone Rim Light & Facial Clarity */
function drawThumbnailCutout(ctx, W, H, scaleFactor) {
  var img = THUMBNAIL_STATE.cutoutImage;
  if (!img) return;

  var scale = (THUMBNAIL_STATE.cutoutScale || 100) / 100;
  var targetH = Math.round(H * 0.94 * scale);
  var targetW = Math.round(targetH * (img.width / img.height));

  var posX = W - targetW - 20; // Default: 'right'
  if (THUMBNAIL_STATE.cutoutPosition === 'left') {
    posX = 20;
  } else if (THUMBNAIL_STATE.cutoutPosition === 'center') {
    posX = (W - targetW) / 2;
  }
  var posY = H - targetH;

  var glowW = (THUMBNAIL_STATE.cutoutGlowWidth || 8) * scaleFactor;
  var isDualTone = THUMBNAIL_STATE.dualToneRim !== false;
  var keyColor = THUMBNAIL_STATE.rimKeyColor || '#F59E0B';
  var fillColor = THUMBNAIL_STATE.rimFillColor || '#38BDF8';
  var rimIntensity = (THUMBNAIL_STATE.rimIntensity || 10) * scaleFactor;

  // 1. Directional Dual-Tone Rim Light or Classic Rim Glow Pass
  if (isDualTone && rimIntensity > 0) {
    ctx.save();
    // Key light hits from inner side of canvas, Fill light hits from outer edge
    var keyDir = THUMBNAIL_STATE.cutoutPosition === 'left' ? 1 : -1;

    // Render Key Light Rim Pass (warm light with directional offset)
    ctx.shadowColor = keyColor;
    ctx.shadowBlur = rimIntensity * 1.8;
    for (var i = 1; i <= 3; i++) {
      var offsetK = (rimIntensity / 3) * i;
      ctx.drawImage(img, posX + (keyDir * offsetK), posY, targetW, targetH);
    }

    // Render Fill Light Rim Pass (cool light with opposing directional offset)
    ctx.shadowColor = fillColor;
    ctx.shadowBlur = rimIntensity * 1.4;
    for (var j = 1; j <= 2; j++) {
      var offsetF = (rimIntensity / 3) * j;
      ctx.drawImage(img, posX - (keyDir * offsetF), posY, targetW, targetH);
    }
    ctx.restore();
  } else if (glowW > 0) {
    // Classic symmetrical glow fallback
    ctx.save();
    ctx.shadowColor = THUMBNAIL_STATE.cutoutGlowColor || '#FFFFFF';
    ctx.shadowBlur = glowW * 1.5;

    for (var dx = -glowW; dx <= glowW; dx += Math.max(2, glowW / 2)) {
      for (var dy = -glowW; dy <= glowW; dy += Math.max(2, glowW / 2)) {
        if (dx * dx + dy * dy <= glowW * glowW) {
          ctx.drawImage(img, posX + dx, posY + dy, targetW, targetH);
        }
      }
    }
    ctx.restore();
  }

  // 2. Main Cutout Draw with Facial Clarity Contrast
  ctx.save();
  var clarity = THUMBNAIL_STATE.facialClarity || 25;
  if (clarity > 0) {
    var contrast = 100 + Math.round(clarity * 0.4);
    var brightness = 100 + Math.round(clarity * 0.12);
    ctx.filter = 'contrast(' + contrast + '%) brightness(' + brightness + '%)';
  }
  ctx.drawImage(img, posX, posY, targetW, targetH);
  ctx.restore();

  // 3. Pixar Eye Pop Specular Catchlights
  if (clarity >= 20) {
    ctx.save();
    var eyeY = posY + targetH * 0.28;
    var eyeR = Math.max(2, 3.2 * scaleFactor);

    var eye1X = posX + targetW * 0.44;
    var eye2X = posX + targetW * 0.58;

    // Specular catchlights (subtle white micro-glint with soft bloom)
    [eye1X, eye2X].forEach(function(ex) {
      var glint = ctx.createRadialGradient(ex, eyeY, 0.5, ex, eyeY, eyeR * 2.5);
      glint.addColorStop(0, '#FFFFFF');
      glint.addColorStop(0.4, 'rgba(255, 255, 255, 0.85)');
      glint.addColorStop(1, 'transparent');
      ctx.fillStyle = glint;
      ctx.beginPath();
      ctx.arc(ex, eyeY, eyeR * 2.5, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.restore();
  }
}

/* Typography, Attention Badges & Tool Badges */
function drawThumbnailTypography(ctx, W, H, scaleFactor) {
  var font = THUMBNAIL_STATE.fontFamily || 'Inter Tight';
  var tilt = (THUMBNAIL_STATE.tiltAngle || 0) * Math.PI / 180;
  var align = THUMBNAIL_STATE.textAlign || 'left';
  
  // Calculate dynamic bounding box so text never collides with Cutout or Secondary Graphic Card
  var leftBound = 60 * scaleFactor;
  var rightBound = W - 60 * scaleFactor;

  if (THUMBNAIL_STATE.cutoutImage) {
    if (THUMBNAIL_STATE.cutoutPosition === 'left') {
      leftBound = Math.round(W * 0.44);
    } else if (THUMBNAIL_STATE.cutoutPosition === 'right') {
      rightBound = Math.round(W * 0.58);
    }
  }

  if (THUMBNAIL_STATE.graphicEnabled) {
    if (THUMBNAIL_STATE.graphicPosition === 'left') {
      leftBound = Math.max(leftBound, Math.round(W * 0.46));
    } else if (THUMBNAIL_STATE.graphicPosition === 'right') {
      rightBound = Math.min(rightBound, Math.round(W * 0.56));
    }
  }

  var maxTextW = Math.max(260 * scaleFactor, rightBound - leftBound);
  var startX = align === 'center' ? (leftBound + maxTextW / 2) : (align === 'right' ? rightBound : leftBound);
  var startY = 76 * scaleFactor;

  // 1. Attention Badge Pill
  var badgeText = (THUMBNAIL_STATE.badgeText || '').trim();
  if (badgeText) {
    if (THUMBNAIL_STATE.allCaps) badgeText = badgeText.toUpperCase();
    var bFontSize = Math.round(22 * scaleFactor);
    ctx.font = buildCanvasFont(font, 800, bFontSize);
    var bTextW = ctx.measureText(badgeText).width;
    var bPadX = 14 * scaleFactor;
    var bPadY = 7 * scaleFactor;
    var bBoxW = bTextW + bPadX * 2;
    var bBoxH = bFontSize + bPadY * 2;

    var bX = align === 'center' ? (startX - bBoxW / 2) : (align === 'right' ? (startX - bBoxW) : startX);

    ctx.save();
    ctx.translate(bX, startY);
    ctx.rotate(tilt);

    ctx.fillStyle = THUMBNAIL_STATE.highlightColor || '#38BDF8';
    drawRoundRect(ctx, 0, 0, bBoxW, bBoxH, 6 * scaleFactor);
    ctx.fill();

    ctx.fillStyle = '#000000';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(badgeText, bPadX, bBoxH / 2 + 1);
    ctx.restore();

    startY += bBoxH + (16 * scaleFactor);
  }

  // 2. Main Headline with Highlight Word
  var rawHeadline = (THUMBNAIL_STATE.headline || '').trim();
  if (rawHeadline) {
    var headline = THUMBNAIL_STATE.allCaps ? rawHeadline.toUpperCase() : rawHeadline;
    var baseFontSize = Math.round((THUMBNAIL_STATE.fontSize || 84) * scaleFactor);
    var strokeW = Math.round((THUMBNAIL_STATE.strokeWidth || 12) * scaleFactor);
    var shadowBlur = Math.round((THUMBNAIL_STATE.shadowBlur || 20) * scaleFactor);
    var lineH = baseFontSize * (THUMBNAIL_STATE.lineHeight || 1.05);

    ctx.font = buildCanvasFont(font, 900, baseFontSize);
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';

    var lines = wrapTextToWidth(ctx, headline, maxTextW);
    var highlightWordUpper = (THUMBNAIL_STATE.highlightWord || '').trim().toUpperCase();

    ctx.save();
    ctx.translate(startX, startY);
    ctx.rotate(tilt);

    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];
      var words = line.split(' ');
      var lineW = ctx.measureText(line).width;
      var currLineY = i * lineH;

      var lineStartX = 0;
      if (align === 'center') {
        lineStartX = -lineW / 2;
      } else if (align === 'right') {
        lineStartX = -lineW;
      }

      var currWordX = lineStartX;

      for (var w = 0; w < words.length; w++) {
        var word = words[w];
        var cleanWord = word.replace(/^[^\w\d$€£₹]+|[^\w\d$€£₹]+$/g, '').toUpperCase();
        var isHighlighted = highlightWordUpper.length > 0 && (cleanWord === highlightWordUpper || word.toUpperCase() === highlightWordUpper);
        var wordW = ctx.measureText(word).width;

        if (isHighlighted) {
          ctx.save();
          ctx.fillStyle = THUMBNAIL_STATE.highlightColor || '#38BDF8';
          drawRoundRect(ctx, currWordX - 6 * scaleFactor, currLineY - 2 * scaleFactor, wordW + 12 * scaleFactor, baseFontSize + 6 * scaleFactor, 8 * scaleFactor);
          ctx.fill();
          ctx.restore();
        }

        if (strokeW > 0) {
          ctx.save();
          ctx.strokeStyle = isHighlighted ? '#000000' : (THUMBNAIL_STATE.strokeColor || '#000000');
          ctx.lineWidth = strokeW;
          ctx.lineJoin = 'round';
          ctx.lineCap = 'round';
          if (shadowBlur > 0) {
            ctx.shadowColor = THUMBNAIL_STATE.shadowColor || '#000000';
            ctx.shadowBlur = shadowBlur;
            ctx.shadowOffsetY = 6 * scaleFactor;
          }
          ctx.strokeText(word, currWordX, currLineY);
          ctx.restore();
        }

        ctx.fillStyle = isHighlighted ? '#000000' : (THUMBNAIL_STATE.textColor || '#FFFFFF');
        ctx.fillText(word, currWordX, currLineY);

        currWordX += ctx.measureText(word + ' ').width;
      }
    }

    ctx.restore();
    startY += (lines.length * lineH) + (14 * scaleFactor);
  }

  // 3. Subtitle / Punchline
  var subtitle = (THUMBNAIL_STATE.subtitle || '').trim();
  if (subtitle) {
    var subFontSize = Math.round(32 * scaleFactor);
    ctx.font = buildCanvasFont(font, 700, subFontSize);
    var subW = ctx.measureText(subtitle).width;
    var subBoxW = subW + 20 * scaleFactor;
    var subBoxH = subFontSize + 12 * scaleFactor;
    var subX = align === 'center' ? (startX - subBoxW / 2) : (align === 'right' ? (startX - subBoxW) : startX);

    ctx.save();
    ctx.translate(subX, startY);
    ctx.rotate(tilt);

    ctx.fillStyle = 'rgba(0, 0, 0, 0.78)';
    drawRoundRect(ctx, 0, 0, subBoxW, subBoxH, 6 * scaleFactor);
    ctx.fill();

    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(subtitle, 10 * scaleFactor, subBoxH / 2 + 1);
    ctx.restore();

    startY += subBoxH + (18 * scaleFactor);
  }

  // 4. Tool & Tech Badges
  if (THUMBNAIL_STATE.showToolBadges && THUMBNAIL_STATE.toolBadgesText) {
    drawThumbnailToolBadges(ctx, startX, startY, tilt, scaleFactor);
  }
}

/* Tool & Tech Badges */
function drawThumbnailToolBadges(ctx, startX, startY, tilt, scaleFactor) {
  var txt = THUMBNAIL_STATE.toolBadgesText || 'with Notion + ChatGPT';
  var fontSize = Math.round(22 * scaleFactor);

  ctx.save();
  ctx.translate(startX, startY);
  ctx.rotate(tilt);

  ctx.font = '700 ' + fontSize + 'px -apple-system, Roboto, sans-serif';
  var textW = ctx.measureText(txt).width;
  var boxW = textW + 80 * scaleFactor;
  var boxH = fontSize + 18 * scaleFactor;

  ctx.fillStyle = 'rgba(15, 23, 42, 0.88)';
  drawRoundRect(ctx, 0, 0, boxW, boxH, 8 * scaleFactor);
  ctx.fill();

  var iconSize = 22 * scaleFactor;
  ctx.fillStyle = '#FFFFFF';
  drawRoundRect(ctx, 10 * scaleFactor, (boxH - iconSize) / 2, iconSize, iconSize, 4 * scaleFactor);
  ctx.fill();
  ctx.fillStyle = '#000000';
  ctx.font = '900 ' + Math.round(14 * scaleFactor) + 'px serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('N', 10 * scaleFactor + iconSize / 2, boxH / 2);

  ctx.fillStyle = '#10B981';
  ctx.beginPath();
  ctx.arc(42 * scaleFactor, boxH / 2, iconSize / 2, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 ' + Math.round(13 * scaleFactor) + 'px sans-serif';
  ctx.fillText('✦', 42 * scaleFactor, boxH / 2);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 ' + fontSize + 'px -apple-system, Roboto, sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText(txt, 62 * scaleFactor, boxH / 2 + 1);

  ctx.restore();
}

/* Channel Corner Logo Badge */
function drawThumbnailChannelBadge(ctx, W, H, scaleFactor) {
  var txt = (THUMBNAIL_STATE.channelBadgeText || 'CREATOR').trim();
  var shape = THUMBNAIL_STATE.channelBadgeShape || 'pill';
  var colr = THUMBNAIL_STATE.channelBadgeColor || '#0284C7';

  var posX = 36 * scaleFactor;
  var posY = 36 * scaleFactor;

  ctx.save();
  ctx.fillStyle = colr;

  if (shape === 'circle') {
    var radius = 40 * scaleFactor;
    ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
    ctx.shadowBlur = 12 * scaleFactor;

    ctx.beginPath();
    ctx.arc(posX + radius, posY + radius, radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 3 * scaleFactor;
    ctx.stroke();

    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    var words = txt.split(' ');
    if (words.length >= 2) {
      ctx.font = '900 ' + Math.round(16 * scaleFactor) + 'px -apple-system, Roboto, sans-serif';
      ctx.fillText(words[0], posX + radius, posY + radius - 9 * scaleFactor);
      ctx.fillText(words[1], posX + radius, posY + radius + 11 * scaleFactor);
    } else {
      ctx.font = '900 ' + Math.round(18 * scaleFactor) + 'px -apple-system, Roboto, sans-serif';
      ctx.fillText(txt, posX + radius, posY + radius);
    }
  } else if (shape === 'square') {
    var sqSize = 74 * scaleFactor;
    drawRoundRect(ctx, posX, posY, sqSize, sqSize, 10 * scaleFactor);
    ctx.fill();

    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    var wordsSq = txt.split(' ');
    if (wordsSq.length >= 2) {
      ctx.font = '900 ' + Math.round(15 * scaleFactor) + 'px -apple-system, Roboto, sans-serif';
      ctx.fillText(wordsSq[0], posX + sqSize / 2, posY + sqSize / 2 - 8 * scaleFactor);
      ctx.fillText(wordsSq[1], posX + sqSize / 2, posY + sqSize / 2 + 10 * scaleFactor);
    } else {
      ctx.font = '900 ' + Math.round(16 * scaleFactor) + 'px -apple-system, Roboto, sans-serif';
      ctx.fillText(txt, posX + sqSize / 2, posY + sqSize / 2);
    }
  } else {
    ctx.font = '800 ' + Math.round(18 * scaleFactor) + 'px -apple-system, Roboto, sans-serif';
    var bW = ctx.measureText(txt).width + 28 * scaleFactor;
    var bH = 34 * scaleFactor;
    drawRoundRect(ctx, posX, posY, bW, bH, 8 * scaleFactor);
    ctx.fill();

    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(txt, posX + bW / 2, posY + bH / 2 + 1);
  }

  ctx.restore();
}

/* Viral Teaser Subtitles / Caption Overlay (e.g. Ishan Sharma CC style hook) */
function drawThumbnailTeaserCaption(ctx, W, H, scaleFactor) {
  var text = THUMBNAIL_STATE.teaserCaptionText;
  if (!text) return;

  ctx.save();
  var fontSize = Math.round(18 * scaleFactor);
  ctx.font = '600 ' + fontSize + 'px -apple-system, Roboto, BlinkMacSystemFont, sans-serif';
  
  var textW = ctx.measureText(text).width;
  var padX = 16 * scaleFactor;
  var padY = 8 * scaleFactor;
  var boxW = Math.min(textW + padX * 2, W * 0.88);
  var boxH = Math.round(38 * scaleFactor);
  var boxX = Math.round((W - boxW) / 2);
  var boxY = Math.round(H - (THUMBNAIL_STATE.showYtTimestamp ? 70 : 44) * scaleFactor);

  // High-contrast translucent dark backdrop pill
  ctx.fillStyle = 'rgba(0, 0, 0, 0.82)';
  drawRoundRect(ctx, boxX, boxY, boxW, boxH, 8 * scaleFactor);
  ctx.fill();

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.lineWidth = 1;
  ctx.stroke();

  // White clean caption text
  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, W / 2, boxY + boxH / 2, boxW - 20 * scaleFactor);

  ctx.restore();
}

/* YouTube Simulated Timestamp Overlay (14:01) */
function drawYtTimestampOverlay(ctx, W, H, scaleFactor) {
  var txt = THUMBNAIL_STATE.timestampText || '14:01';
  var fontSize = Math.round(18 * scaleFactor);
  ctx.font = '700 ' + fontSize + 'px -apple-system, Roboto, sans-serif';

  var textW = ctx.measureText(txt).width;
  var padX = 8 * scaleFactor;
  var padY = 4 * scaleFactor;
  var boxW = textW + padX * 2;
  var boxH = fontSize + padY * 2;
  var boxX = W - boxW - (16 * scaleFactor);
  var boxY = H - boxH - (16 * scaleFactor);

  ctx.save();
  ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
  drawRoundRect(ctx, boxX, boxY, boxW, boxH, 4 * scaleFactor);
  ctx.fill();

  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(txt, boxX + boxW / 2, boxY + boxH / 2 + 1);
  ctx.restore();
}

/* ----------------------------------------------------
   MULTI-VIEW YOUTUBE SIMULATOR (Home, Mobile, Search, Sidebar)
   ---------------------------------------------------- */
function setThumbnailView(view) {
  THUMBNAIL_STATE.currentView = view;
  var isFeed = view === 'feed';

  if ($('ytViewCanvasBtn')) $('ytViewCanvasBtn').classList.toggle('active', !isFeed);
  if ($('ytViewFeedBtn')) $('ytViewFeedBtn').classList.toggle('active', isFeed);
  if ($('thumbnailCanvasWrap')) $('thumbnailCanvasWrap').style.display = isFeed ? 'none' : 'flex';
  if ($('ytFeedSimulatorWrap')) $('ytFeedSimulatorWrap').style.display = isFeed ? 'block' : 'none';

  if (isFeed) {
    updateFeedSimulator();
  }
}

function setSimSubView(subView) {
  THUMBNAIL_STATE.simSubView = subView;

  ['home', 'mobile', 'search', 'sidebar'].forEach(function(v) {
    var btn = $('ytSimView' + v.charAt(0).toUpperCase() + v.slice(1) + 'Btn');
    var viewDiv = $('ytSimView' + v.charAt(0).toUpperCase() + v.slice(1));
    if (btn) btn.classList.toggle('active', v === subView);
    if (viewDiv) viewDiv.style.display = (v === subView) ? (v === 'mobile' ? 'block' : 'block') : 'none';
  });

  updateFeedSimulator();
}

function toggleYtSimTheme() {
  var container = $('ytFeedSimContainer');
  if (!container) return;
  var isDark = container.classList.contains('yt-theme-light');
  container.classList.toggle('yt-theme-light', !isDark);
  THUMBNAIL_STATE.simTheme = !isDark ? 'light' : 'dark';
  var icon = $('ytThemeIcon');
  if (icon) icon.textContent = !isDark ? '🌙' : '☀️';
  showToast('Switched YouTube Simulator to ' + (!isDark ? 'Light' : 'Dark') + ' Mode');
}

/* Update all 4 views in real-time */
function updateFeedSimulator() {
  var canvas = $('thumbnailCanvas');
  if (!canvas) return;

  var dataUrl = '';
  try {
    dataUrl = canvas.toDataURL('image/jpeg', 0.88);
  } catch (e) {
    console.warn('Could not export canvas to feed:', e);
    return;
  }

  // Update thumbnails across all 4 layouts
  if ($('ytFeedThumbImg')) $('ytFeedThumbImg').src = dataUrl;
  if ($('ytMobileThumbImg')) $('ytMobileThumbImg').src = dataUrl;
  if ($('ytSearchThumbImg')) $('ytSearchThumbImg').src = dataUrl;
  if ($('ytSidebarThumbImg')) $('ytSidebarThumbImg').src = dataUrl;

  // Update text metadata across views
  var title = THUMBNAIL_STATE.videoTitle || THUMBNAIL_STATE.headline || 'Untitled Video';
  var channel = THUMBNAIL_STATE.channelName || 'CreatorKit Channel';
  var time = THUMBNAIL_STATE.timestampText || '14:01';

  ['ytFeedTitle', 'ytMobileTitle', 'ytSearchTitle', 'ytSidebarTitle'].forEach(function(id) {
    if ($(id)) $(id).textContent = title;
  });
  ['ytFeedChannel', 'ytMobileChannel', 'ytSearchChannel', 'ytSidebarChannel'].forEach(function(id) {
    if ($(id)) $(id).textContent = channel + ' ✓';
  });
  ['ytFeedBadgeTime', 'ytMobileBadgeTime', 'ytSearchBadgeTime', 'ytSidebarBadgeTime'].forEach(function(id) {
    if ($(id)) $(id).textContent = time;
  });
}

/* -------------------------------------------
   Helper Functions
   ------------------------------------------- */
function wrapTextToWidth(ctx, text, maxWidth) {
  var words = text.split(' ');
  var lines = [];
  var currentLine = words[0] || '';

  for (var i = 1; i < words.length; i++) {
    var word = words[i];
    var testLine = currentLine + ' ' + word;
    if (ctx.measureText(testLine).width <= maxWidth) {
      currentLine = testLine;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}

function hexToRgba(hex, alpha) {
  hex = (hex || '#000000').replace('#', '');
  if (hex.length === 3) hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  var r = parseInt(hex.substring(0, 2), 16) || 0;
  var g = parseInt(hex.substring(2, 4), 16) || 0;
  var b = parseInt(hex.substring(4, 6), 16) || 0;
  return 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
}

function drawRoundRect(ctx, x, y, width, height, radius) {
  if (typeof radius === 'undefined') radius = 8;
  if (width < 2 * radius) radius = width / 2;
  if (height < 2 * radius) radius = height / 2;
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

function sanitizeFilename(str) {
  return (str || 'thumbnail')
    .toLowerCase()
    .replace(/[^a-z0-9_\-]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .substring(0, 32) || 'thumbnail';
}

/* -------------------------------------------
   Export: PNG, JPEG (Optimized < 2MB), Clipboard
   ------------------------------------------- */
function downloadThumbnailPNG() {
  var canvas = $('thumbnailCanvas');
  if (!canvas) return;
  var url = canvas.toDataURL('image/png');
  var filename = 'youtube_thumbnail_' + sanitizeFilename(THUMBNAIL_STATE.headline || 'thumb') + '.png';
  triggerDownload(url, filename);
  showToast('✓ High-Res Thumbnail PNG downloaded!');
}

function downloadThumbnailJPEG() {
  var canvas = $('thumbnailCanvas');
  if (!canvas) return;
  var url = canvas.toDataURL('image/jpeg', 0.92);
  var filename = 'youtube_thumbnail_' + sanitizeFilename(THUMBNAIL_STATE.headline || 'thumb') + '.jpg';
  triggerDownload(url, filename);
  showToast('✓ YouTube-Optimized JPEG downloaded (<2MB)!');
}

function copyThumbnailToClipboard() {
  var canvas = $('thumbnailCanvas');
  if (!canvas) return;

  if (navigator.clipboard && window.ClipboardItem) {
    canvas.toBlob(function(blob) {
      if (!blob) {
        showToast('Could not create image blob');
        return;
      }
      navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
        .then(function() { showToast('✓ Thumbnail copied to clipboard!'); })
        .catch(function() { showToast('Clipboard access denied'); });
    }, 'image/png');
  } else {
    showToast('Clipboard API not supported');
  }
}
