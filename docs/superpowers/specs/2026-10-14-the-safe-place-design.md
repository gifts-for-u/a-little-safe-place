# The Safe Place — Technical Design Specification

**Date:** 2026-10-14  
**Status:** Approved by User  
**Target Platform:** GitHub Pages (Static Hosting)  
**Primary Language:** Indonesian (Affectionate, Casual)  
**Visual Style:** Cinematic Anime 2.5D Bedroom at Night (Lo-fi Shinkai/Ghibli aesthetic)  

---

## 1. Project Overview & Mission

**The Safe Place** is a mobile-first, static, interactive comfort website built to comfort a loved one overwhelmed by a heavy workload. It visualizes an intimate, peaceful anime-style bedroom at night during a gentle rain. 

The user can explore five distinct interactive objects in any order without pressure, score, timers, or forms. Rest is framed as a natural human right rather than something that must be earned.

---

## 2. Architectural Architecture & Stack

- **Core Technologies:** HTML5, Modern Vanilla CSS, Vanilla JavaScript (ES Modules).
- **No Heavy Frameworks or Bundlers:** Zero build steps required; fast instant native browser loading.
- **2.5D Layer Composition:** Stacked DOM layers within an overscanned viewport container using CSS 3D transforms (`translate3d`) with perspective.
- **Audio Engine:** Custom Web Audio API ambient rain & calm tone synthesizer (zero external audio file dependency, zero 404 risk, seamless infinite loop, with autoplay triggered on room entry).
- **Deployment:** GitHub Pages static hosting using strict relative paths (`./assets/...`, `./src/...`, `./styles/...`). Remote repository target: `https://github.com/gifts-for-u/a-little-safe-place.git`.

---

## 3. 2.5D Layer Hierarchy & Depth Mapping

The viewport maintains a **10–15% overscan** (`transform: scale(1.12)`) within an `overflow: hidden` container to prevent layer edge exposure during parallax tilting:

1. **Far Background Layer (`.layer-sky`, depth factor: `0.02`):**
   - Night sky, rainy window with blurred distant city lights, CSS/SVG rain droplets.
2. **Room Architecture Layer (`.layer-room`, depth factor: `0.05`):**
   - Anime bedroom walls, warm wood flooring, soft curtains, glowing fairy lights.
3. **Furniture Layer (`.layer-furniture`, depth factor: `0.08`):**
   - Cozy bed with plush pink/cream bedding, bedside nightstand table, study desk.
4. **Interactive Hotspots Layer (`.layer-hotspots`, depth factor: `0.08`):**
   - Five semantically mapped `<button class="hotspot">` elements anchored precisely to furniture coordinates.
   - Touch targets $\ge 48 \times 48\text{px}$.
   - Breathing amber/rose pulse indicators and accessible labels.
5. **Foreground Atmosphere Layer (`.layer-foreground`, depth factor: `0.14`, `pointer-events: none`):**
   - Floating warm amber dust motes, soft camera bokeh circles, subtle vignette edges.

---

## 4. The Five Interactive Objects & Content Copy

All message copy is rendered in pure, accessible HTML text (never baked into raster images).

### 4.1 Bed (Kasur)
- **Visual Trigger:** Bedding softly ripples; subtle golden particle embers rise.
- **Message Theme:** *Rest Without Guilt*
- **Copy:**
  > "hai sayang,  
  > kamu nggak harus menyelesaikan semuanya hari ini. kamu udah berusaha sejauh ini, dan itu berarti. istirahat bukan berarti kamu menyerah. kamu juga berhak berhenti sebentar.  
  >  
  > pelan-pelan aja, ya. satu hal dalam satu waktu.  
  > aku bangga sama kamu."
- **Interactive Action Button:** `"kita istirahat yu"` (triggers a comforting blanket animation covering the bed).

### 4.2 Letter (Surat di Meja Samping)
- **Visual Trigger:** Envelope lifts and opens smoothly, letter paper slides upward.
- **Message Theme:** *A Letter From Me*
- **Panel Design:** Lined aesthetic stationery card with generous line-height, readable without browser zooming on mobile.
- **Copy:**
  > "buat sayangku,  
  >  
  > aku tahu akhir-akhir ini kerjaan kamu lagi banyak banget. mungkin ada hari ketika semuanya datang barengan, sampai kamu nggak sempat berhenti buat nanya kabar diri sendiri.  
  >  
  > aku cuma mau kamu tahu kalau kamu nggak harus menghadapi semuanya sendirian. kamu nggak harus selalu kelihatan kuat di depan aku, dan kamu nggak perlu punya jawaban buat semuanya sekarang.  
  >  
  > aku mungkin nggak bisa langsung menghilangkan semua beban kamu, tapi aku mau terus ada, dengerin kamu, dan nemenin kamu sebisaku. kalau hari ini kamu cuma sanggup melewati hari, itu juga sudah berarti.  
  >  
  > istirahat kalau capek, cerita kalau mau, atau diam bareng aku juga boleh.  
  >  
  > aku sayang kamu, bukan cuma saat kamu hebat atau produktif, tapi juga saat kamu lelah dan lagi nggak punya tenaga buat apa-apa.  
  >  
  > peluk jauh dulu, ya.  
  > — aku, yang selalu dukung kamu."

### 4.3 Stitch Plush (Boneka di Atas Kasur)
- **Visual Trigger:** Gentle cute bounce with floating heart particles.
- **Message Theme:** *A Hug From Me*
- **Asset Note:** Fan-art Stitch character with verified attribution and provenance documented in `assets/ASSET_CREDITS.md`.
- **Copy:**
  > "sini, peluk dulu, sayanggg.  
  > nggak perlu cerita kalau belum siap. nggak perlu cari kata-kata juga.  
  > hari ini pasti berat banget, ya?  
  > anggap aja boneka ini lagi aku pinjemin buat peluk kamu. aku di sini, kok. kamu nggak sendirian."
- **Interactive Action Button:** `"Peluk bonekanya"` (triggers a soft hug squeeze animation).

### 4.4 Laptop (Di Meja Belajar)
- **Visual Trigger:** Laptop screen softly dims; floating abstract work task chips gently fade away.
- **Message Theme:** *Work Can Wait*
- **Copy:**
  > "kerjaannya belum selesai semua? nggak apa-apa, sayang.  
  > kamu bukan mesin yang harus selalu produktif. nilai diri kamu nggak ditentukan dari berapa banyak yang bisa kamu selesaikan dalam sehari.  
  > progress kecil kamu tetap berarti. sekarang, kamu juga boleh jadi prioritas."

### 4.5 Bedside Lamp (Lampu Meja)
- **Visual Trigger:** Lamp bulb warms up, softly illuminating the surrounding nightstand and bedroom corner.
- **Message Theme:** *A Little Light*
- **Copy:**
  > "nggak semua hari harus terasa indah. ada hari yang tugasnya cuma dilewati, dan itu nggak apa-apa.  
  > kalau semuanya terasa berat, kita lewati pelan-pelan aja, ya. kamu nggak harus melihat seluruh jalan sekarang untuk mengambil satu langkah kecil.  
  > aku tetap dukung kamu."
- **Interactive Action:** Toggle lamp intensity (warm glow / dim).

---

## 5. Motion, Gyroscope, & Accessibility Engine

### 5.1 Permission & Sensor Gating
- Zero automatic sensor prompts on load.
- Activation via explicit toggle button: `"✨ Efek Gerak"`.
- Uses `DeviceOrientationEvent.requestPermission()` inside the user click gesture for iOS 13+.
- If denied or unsupported, smoothly switches to automatic pointer/ambient fallback without throwing errors.

### 5.2 Smoothing & Mathematical Clamping
- Orientation inputs (roll/pitch) are clamped to $\pm 15^\circ$ and normalized to range `[-1.0, 1.0]`.
- Linear Interpolation (LERP) formula:
  $$\text{currentPos} += (\text{targetPos} - \text{currentPos}) \times 0.08$$
- `requestAnimationFrame` loop handles transform updates; pauses completely when tab is hidden (`visibilitychange`).

### 5.3 Fallback Hierarchy
1. **Device Orientation (Gyro):** Active on mobile when explicitly enabled.
2. **Pointer Parallax:** Tracks mouse cursor on desktop devices.
3. **Ambient Breathing Parallax:** Gentle sinusoidal oscillation (`Math.sin(time * 0.0008)`) when idle.
4. **Reduced-Motion Mode (`prefers-reduced-motion`):** Freezes all parallax translations and transforms; dialogs transition with soft opacity fades only.

---

## 6. Audio System (Autoplay on Entry)

- **Initial State:** Autoplay ambient sound plays as soon as user clicks "Masuk ke kamar" (or taps the room), satisfying browser User-Activation requirements while immediately filling the room with soothing rain.
- **Control:** Top bar audio chip button: `[🎵 Suara: Mati]` $\leftrightarrow$ `[🎵 Suara: Hidup]` enables user to easily toggle or mute whenever desired.
- **Implementation:** HTML5 Audio / Web Audio API playing the provided comforting Ghibli background track (`./assets/sounds/always with me-ghibli.mp3` - "Always With Me" instrumental) seamlessly looped, combined with optional subtle ambient rain sound.
- **Graceful Lifecycle:** Smooth gain node volume ramping (fade-in / fade-out) over 0.8 seconds on toggle.

---

## 7. File Structure & Responsibilities

```text
a-little-safe-place/
├── index.html               # Main layout, viewport meta, semantic buttons, dialog overlays
├── README.md                # Project documentation, local testing & GitHub Pages deployment guide
├── PRD.md                   # Product requirements document
├── AGENTS.md                # Coding agent guidelines & constraints
├── docs/
│   └── superpowers/
│       └── specs/
│           └── 2026-10-14-the-safe-place-design.md
├── assets/
│   ├── images/
│   │   ├── room/            # Anime bedroom layers
│   │   ├── objects/         # Stitch plush asset
│   │   └── ui/              # SVG icons
│   └── ASSET_CREDITS.md     # Provenance, licenses, attributions
├── src/
│   ├── main.js              # Entrypoint & modal coordination
│   ├── scene.js             # Layer transforms, hotspots positioning, lamp lighting
│   ├── interactions.js      # Modal dialogs, action buttons ("kita istirahat yu", hug, dim)
│   ├── motion.js            # Gyroscope, pointer tracking, LERP loop, reduced motion
│   ├── audio.js             # Web Audio API ambient rain & calm tone generator
│   └── content.js           # Centralized Indonesian text and object metadata
└── styles/
    ├── main.css             # Design tokens, typography, header controls, reset
    ├── scene.css            # 2.5D viewport, layer styling, hotspot pulses & glow
    ├── panels.css           # Glassmorphism dialogs, letter parchment styling, responsive typography
    └── motion.css           # Keyframe animations, ambient drift, reduced motion media queries
```

---

## 8. Verification & Acceptance Criteria

1. **Static Run:** Runs directly in any modern browser via local static server with zero build tools.
2. **Responsive Check:** Tested from 360px portrait phones to 4K desktop screens without horizontal overflow.
3. **Interaction Check:** All five objects open their respective modals; closing restores focus to the triggering button.
4. **Letter Readability:** Letter text is easily readable on mobile without pinching or zooming.
5. **Sensor Safety:** Gyro permission request only occurs on explicit click; gracefully falls back on desktop/unsupported devices.
6. **Audio Safety:** Zero autoplay; audio only plays after explicit click with smooth volume fade.
7. **Asset Attribution:** Stitch asset and room art are properly documented in `assets/ASSET_CREDITS.md`.
