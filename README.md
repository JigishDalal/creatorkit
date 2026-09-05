# ✦ CreatorKit — All-in-One Creator Studio

> **Design stunning posters, multi-slide social carousels, official App Store & Play Store screenshot showcases, and isolate image backgrounds with client-side AI.**  
> 100% Free • No Watermarks • Zero Backend • Everything Runs Privately on Your Device.

🌐 **Live Demo**: [https://jigishdalal.github.io/creatorkit/](https://jigishdalal.github.io/creatorkit/)

---

## 🌟 Features Overview

CreatorKit brings Canva-grade creation tools together in a lightweight, responsive, and privacy-focused web application.

```
┌────────────────────────────────────────────────────────────────────────┐
│                              CreatorKit                                │
├──────────────┬──────────────────┬──────────────────┬───────────────────┤
│  🖼 Poster   │   📑 Carousel    │   📱 App Store   │   ✂️ BG Remover   │
│  Designers   │  Social Decks    │  Store Posters   │   AI Cutouts      │
└──────────────┴──────────────────┴──────────────────┴───────────────────┘
```

---

### 1. 🖼 Poster & Quote Maker
* **12 Ready-Made Canva-Style Templates**:
  * *Vogue Editorial*, *Swiss Bold*, *Cyber Neon*, *Brutalist Acid*, *Aura Glass*, *Film Cinema*, *Handcrafted Note*, and more.
* **10 Curated Color Palettes**: Single-click color themes + **`🔀 Shuffle`** button for instant design variations.
* **Dynamic Typography Framing Engine**: Auto-scales text and anchors decorative rules dynamically without overlapping multi-line headlines.
* **Custom Typefaces**: Support for Google Fonts (*Playfair Display, Instrument Serif, Archivo Black, Anton, Space Grotesk, Caveat, Press Start 2P*).
* **Multi-Size Export**: Instagram Portrait (4:5), Square (1:1), Story/Reel (9:16), and Print A4 Poster.
* **Format Support**: Export in full HD **PNG**, **JPEG**, or vector-wrapped **SVG**.

---

### 2. 📑 Carousel Slide Deck Builder
* **Smart Text-to-Slide Parser**: Paste any article or notes — blank lines or `---` delimiters automatically generate structured slide decks.
* **Slide Type Detection**: Auto-detects Hook slides, bulleted lists, and numeric stat slides.
* **Branding & Look**:
  * Themes: *Light, Dark, Bold Accent, Warm Editorial*.
  * Typefaces: *Inter Tight, Space Grotesk, Newsreader, Archivo, Bricolage, Fraunces*.
  * Custom list icons (`•`, `→`, `✓`, `★`, `◆`) and slide progress bars (*Segments, Dots, Thin Line, Counter*).
* **Logo Color Extractor**: Upload your brand logo to automatically extract and apply its dominant color palette.
* **Multi-Format Export**:
  * **PDF (LinkedIn Carousels)**: Formatted for direct upload to LinkedIn document posts.
  * **ZIP (PNG Slides)**: High-resolution PNGs packaged for Instagram and Twitter/X threads.

---

### 3. 📱 App Store & Google Play Store Poster Generator
* **Official Store Sizes & Aspect Ratios**:
  * **Apple App Store (iOS)**:
    * iPhone 6.7" / 6.9" (`1290 × 2796 px`) — iPhone 15/16 Pro Max
    * iPhone 6.5" (`1242 × 2688 px`) — iPhone 11 Pro Max / XS Max
    * iPhone 5.5" (`1242 × 2208 px`) — iPhone 8 Plus / Classic
    * iPad Pro 12.9" / 13" (`2048 × 2732 px`)
  * **Google Play Store (Android)**:
    * Modern Phone (`1080 × 2400 px`, 20:9)
    * Standard Phone (`1080 × 1920 px`, 16:9)
    * Android 10" Tablet (`1600 × 2560 px`)
    * Google Play Feature Graphic (`1024 × 500 px`)
* **8 Ready-Made 1-Click Store Templates**:
  * 💬 *WhatsApp Emerald* (Brand solid + stacked punchy headline)
  * ✨ *ChatGPT Aura* (Dreamy ambient gradient orbs mesh)
  * 🎮 *Zedge Cyber Grid* (Dark tech grid + 3D tilted device)
  * 🔴 *Imposter Impact* (High-contrast crimson grid + heavy uppercase typography)
  * 🎬 *YouTube Shorts Studio* (Clean studio white + action verb headlines)
  * 💎 *FinTech Titanium* (Obsidian black + radial glow ring)
  * 🌿 *Wellness Calm* (Gentle sunrise peach + elegant serif font)
  * ⚡ *Spotify Electric* (Vibrant violet/magenta sunset gradient)
* **Realistic Device Mockups**:
  * Modern Apple iPhone (Dynamic Island, glass reflection, metallic rim)
  * Android Phone (Centered punch-hole camera)
  * Clay Minimalist Frame & Floating Borderless Cards
* **Batch Screenshot Import**: Upload all your app screenshots at once to auto-create the full deck.
* **1-Click ZIP Download**: Generates high-res PNG images (`01-screen-1290x2796.png`, etc.) packaged in a ZIP file ready for store submission.

---

### 4. ✂️ AI Background Remover
* **100% Free & In-Browser**: Powered by client-side WebAssembly/AI models (`@imgly/background-removal`).
* **Complete Privacy**: Photos never leave your machine — zero servers, zero third-party APIs.
* **Drag-and-Drop Dropzone**: Upload any PNG, JPG, or WebP photo or product image.
* **1-Click Test Samples**: Built-in test photos (Portrait, Sneaker, Camera, Coffee Cup).
* **Backdrop Color Replacer**:
  * Transparent PNG (Checkerboard)
  * Solid Color Presets (Pure White, Dark Slate, Creator Violet, Coral, Mint, Gold) or Custom Color Picker.
* **Instant Studio Integration**:
  * `🖼 Use Cutout in Poster Maker →`
  * `📑 Use Cutout in Carousel Slide →`
  * `↓ Download HD Image`

---

## 🛠 Tech Stack

* **Frontend**: Vanilla JavaScript (ES6+), HTML5 Canvas API
* **Styling**: Vanilla CSS3 Design System with custom tokens, responsive breakpoints, and dark/light theme switching
* **Libraries**:
  * [JSZip](https://stuk.github.io/jszip/) — Client-side ZIP archive creation
  * [jsPDF](https://github.com/parallax/jsPDF) — Multi-page PDF generation for LinkedIn
  * [@imgly/background-removal](https://github.com/imgly/background-removal-js) — Client-side neural background removal

---

## 💻 Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/JigishDalal/creatorkit.git
   cd creatorkit
   ```

2. **Run with any local web server**:
   ```bash
   # Using Python 3:
   python3 -m http.server 3456

   # Or using Node serve / npx:
   npx serve . --listen 3456
   ```

3. Open **`http://localhost:3456/`** in your browser.

---

## 🚀 Deployment (GitHub Pages)

CreatorKit is 100% static and requires no build pipeline.

1. Push your code to the `main` branch.
2. In your repository, go to **Settings > Pages**.
3. Under **Build and deployment**, set **Source** to `Deploy from a branch` and select `main / (root)`.
4. Your site is live at `https://<your-username>.github.io/creatorkit/`.

---

## 📄 License

MIT License — Free for personal and commercial use.
