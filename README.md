# ✦ CreatorKit — All-in-One Creator Studio

> **Design stunning posters, multi-slide social carousels, official App Store & Play Store showcases, isolate image backgrounds with client-side AI, and generate professional brand-synced invoices & quotations.**  
> 100% Free • No Watermarks • Zero Backend • Everything Runs Privately on Your Device.

🌐 **Live Demo**: [https://jigishdalal.github.io/creatorkit/](https://jigishdalal.github.io/creatorkit/)

---

## 🚀 How to Run & Setup

Because CreatorKit now includes a **Video Captions Studio** that uses an AI model (OpenAI Whisper) to generate transcripts, it requires a Python backend.

### 1. Prerequisites
- Python 3.8 or higher installed on your computer.
- `ffmpeg` installed (required for Whisper to extract audio).
  - **Mac:** `brew install ffmpeg`
  - **Windows:** Download from [gyan.dev](https://www.gyan.dev/ffmpeg/builds/)
  - **Linux:** `sudo apt install ffmpeg`

### 2. Setup
Open your terminal in the project directory and run:

```bash
# Install required Python packages
pip install -r requirements.txt
```

### 3. Running the App
Start the custom backend server by running:

```bash
python server.py
```
Then, open your web browser and navigate to: [http://localhost:8000](http://localhost:8000)

> [!WARNING]
> **Vercel Hosting Limitations:**
> You **cannot** host this full stack easily on Vercel's free tier. 
> 1. Vercel Serverless Functions have a strict **50MB size limit**, but the Whisper ML model and `ffmpeg` binaries are much larger.
> 2. Vercel has a **10-second timeout**, but transcribing video often takes longer.
> **Alternative Hosting:** To host this online, you should use services designed for longer-running applications like **Render**, **Railway**, **Fly.io**, or an AWS EC2 / DigitalOcean Droplet.

---

## 🌟 Features Overview

CreatorKit brings Canva-grade creation tools together in a lightweight, responsive, and privacy-focused web application.

```
┌────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                                 CreatorKit                                                 │
├──────────────┬──────────────────┬──────────────────┬───────────────────┬───────────────────┬───────────────┤
│  🖼 Poster   │   📑 Carousel    │   📱 App Store   │   ✂️ BG Remover   │  📊 Infographics  │  🧾 Invoices  │
│  Designers   │  Social Decks    │  Store Posters   │   AI Cutouts      │  Comparisons/Stats│  & Quotations │
├──────────────┴──────────────────┴──────────────────┴───────────────────┴───────────────────┴───────────────┤
│   🎨 Global 1-Click Brand Kit                     📐 Multi-Platform Social Auto-Resizer (ZIP)              │
└────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
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
* **Realistic Device Mockups & Per-Screen Customization**:
  * Apple iPhone (Dynamic Island pill, glare reflections, metallic rim)
  * Android Phone (Centered punch-hole camera)
  * Clay Minimalist Finish & Floating Borderless Cards
  * **Per-Screen Frame Overrides**: Select **"🚫 Remove Mobile Screen (Text Only)"** or **"🖼 Single Full Image (Hero Banner)"** for specific slides (e.g. title hook or full illustration) without altering the device frame on other screens in your deck.
* **Batch Screenshot Import**: Upload all your app screenshots at once to auto-create the full deck.
* **Flexible Export Options**:
  * **1-Click ZIP Download**: Generates high-res PNG images (`screen-1-1290x2796.png`, etc.) packaged in a ZIP file ready for store submission.
  * **Single-Screen PNG Download**: Download only the currently active screen directly.

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

### 5. 📊 Comparison & Infographic Card Maker
* **5 High-Engagement Post Frameworks**:
  * ⚖️ **Before vs After**: Side-by-side problem vs. solution breakdown.
  * ✅ **Do's & Don'ts**: Best practices vs. common mistakes comparison.
  * 🔄 **Old vs New Way**: Legacy workflow vs. modern AI approach.
  * 📈 **Stat & Metric Callouts**: Bold headline percentage growth (e.g. `+340%`) with key breakdown bullets.
  * 🏛️ **3-Pillar Framework**: 3-step numbered methodology cards (`01`, `02`, `03`).
* **5 Curated Color Themes**: *Dark Obsidian, Neon Cyber, Creator Violet, Tech Cyan, Clean Editorial*.
* **Aspect Ratios**: Portrait 4:5 (`1080 × 1350 px`), Square 1:1 (`1080 × 1080 px`), and Landscape Banner 16:9 (`1200 × 675 px`).
* **Interconnected Studio Workflows**:
  * `📑 Insert in Carousel →`: Injects formatted comparison slide directly into your active Carousel deck with 1 click.
  * `↓ Download Infographic (HD)`: Export high-res PNG or JPEG graphics for single-image posts.

---

### 6. 🎨 1-Click Brand Kit (Global Branding Sync)
* **Centralized Identity Hub**:
  * Configure your **Author / Brand Name** and **Social Handle** (`@yourhandle`).
  * Set **Primary Accent Color** and **Secondary Accent Color**.
  * Choose **Default Background & Text Colors**.
  * Select your **Brand Typography** (*Inter Tight, Space Grotesk, Playfair Display, Bricolage, Newsreader, Archivo Black*).
  * Upload custom **Brand Logo / Avatar Image**.
* **100% Client-Side Privacy**: Saved securely to your browser's `localStorage` (`ck-brand-kit`) with zero server sync.
* **Universal 1-Click Sync (`✨ Brand Kit`)**:
  * **Poster Designer**: Automatically syncs brand colors, typography, and sets your handle in the bottom credit line.
  * **Carousel Decks**: Syncs author handle, slide accent colors, and matching dark/light themes.
  * **Infographic Maker**: Rebrands category tag, author watermark, and accent highlights.

---

### 7. 📐 Multi-Platform Social Auto-Resizer (Cross-Post Hub)
* **Design Once, Publish Everywhere**:
  * 📸 **Instagram Portrait 4:5** (`1080 × 1350 px`)
  * 🔲 **Square 1:1 (IG / LinkedIn / X)** (`1080 × 1080 px`)
  * 📱 **Story / Reel / TikTok 9:16** (`1080 × 1920 px`)
  * 🐦 **Twitter / X Timeline Card 16:9** (`1200 × 675 px`)
  * 📌 **Pinterest Pin 2:3** (`1000 × 1500 px`)
* **Smart Ambient Padding & Scaling Engine**:
  * Intelligently fits artwork with ambient background blur and drop-shadows so no typography is ever cropped or distorted.
* **1-Click Batch Download (ZIP)**:
  * Generates a packaged ZIP archive containing all 5 social network sizes with clean file names (`01-ig-portrait-1080x1350.png`, `02-square-1080x1080.png`, etc.).

---

### 8. 🧾 Invoice & Quotation Studio (Brand Kit Powered)
* **Reuses Global Brand Kit**:
  * 1-Click syncs your **Brand Name**, **Logo**, **Primary Accent Color**, and **Typography** into official commercial documents.
* **Multiple Commercial Document Types**:
  * 🧾 **Invoice**
  * 📊 **Quotation / Estimate**
  * 📑 **Proforma Invoice**
  * 🧾 **Payment Receipt**
* **3 Designer Layout Themes**:
  * *Modern Minimalist*, *Executive Slate*, *Creative Studio*.
* **1-Click Industry Sample Presets**:
  * 🇮🇳 *India GST Tech / Creative Retainer* (₹ INR, 18% GST, GSTIN)
  * 💻 *US Web Development Project* ($ USD, EIN)
  * 🇬🇧 *UK Creative Retainer* (£ GBP, 20% VAT)
  * 📊 *Project Quote / Estimate*
  * 📸 *Commercial Photography & Video Package*
* **Global Tax & Business ID Selector**:
  * Built-in support for **GSTIN** (India 🇮🇳), **EIN / Tax ID** (USA 🇺🇸), **VAT Reg** (UK 🇬🇧), **VAT ID** (EU 🇪🇺), **ABN** (Australia 🇦🇺), **BN / GST** (Canada 🇨🇦), **TRN** (UAE / GCC 🇦🇪), **UEN** (Singapore 🇸🇬), and Custom Tax IDs.
  * Dedicated support for **Client GSTIN / Tax ID** for B2B tax compliance.
* **Dynamic Real-Time Billing Engine**:
  * Add/remove line items dynamically with auto-calculated quantities, rates, and item totals.
  * Auto-calculated **Subtotal**, **Discounts** (% or flat), **Tax / VAT / GST rates**, and **Shipping / Extra Fees**.
  * Dynamic currency switcher: `INR (₹)`, `USD ($)`, `EUR (€)`, `GBP (£)`, `CAD (CA$)`, `AUD (A$)`, `JPY (¥)`, `SGD (S$)`, `AED (AED)`.
  * Interactive Status Pills: `PAID`, `PENDING (DUE)`, `DRAFT`, `APPROVED`.
* **Export & Print**:
  * 📄 **Download PDF**: High-resolution, vector-crisp A4 document export ready to email clients.
  * 🖼 **Download PNG**: Instant image snapshot for WhatsApp, Slack, or SMS communication.
  * 🖨 **Print / Save as PDF**: Native browser print window with dedicated 300 DPI print styling.
  * 💾 **Auto-Saved Drafts**: Retains current state in `localStorage` so client work is never lost.

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
   python3 server.py

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
