# The Safe Place Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a mobile-first, static, cinematic anime-inspired 2.5D interactive comfort website with five interactive objects, reassuring Indonesian copy, optional gyroscope with multi-tier automatic fallback, and room-entry ambient audio.

**Architecture:** Pure vanilla HTML5, CSS 3D transforms, and modular ES6 JavaScript. The scene is composed of stacked 2.5D depth layers (far sky/rain window, midground anime bedroom, 5 semantic hotspots, foreground floating particles/bokeh) shifted via a LERP-smoothed `requestAnimationFrame` loop. Audio is driven by a custom Web Audio API procedural synthesizer triggered on room entry.

**Tech Stack:** HTML5, Modern Vanilla CSS, Vanilla JavaScript (ES Modules), Web Audio API, GitHub Pages static hosting.

---

## Global Constraints

- **Static Hosting:** 100% static, no backend, no build steps required, all asset and script URLs must use strict relative paths (`./assets/...`, `./src/...`, `./styles/...`).
- **Exactly Five Hotspots:** Bed, Letter on bedside table, Stitch plush on bed, Laptop, Bedside lamp.
- **Interactive Bed Button:** Must be labeled `"kita istirahat yu"`.
- **Text Rendering:** All messages, letter, and UI text must be rendered in accessible HTML elements (never baked into raster images).
- **Motion Gating:** Zero sensor permission requests on load; explicit toggle control `"✨ Efek Gerak"`; reliable fallback order (Gyro -> Pointer Parallax -> Ambient Breathing -> Static on Reduced Motion).
- **Audio Autoplay:** Soothing ambient rain sound initiates automatically when user clicks `"Masuk ke kamar"` (or taps room), satisfying browser User-Activation policies; visible mute/play toggle available at all times.
- **Accessibility:** Touch targets $\ge 48 \times 48\text{px}$; full keyboard navigation; focus restoration on modal close; strict respect of `prefers-reduced-motion`.
- **Asset Attribution:** Document all visual assets, licenses, and Stitch plush provenance in `assets/ASSET_CREDITS.md`.
- **Remote Repo:** `https://github.com/gifts-for-u/a-little-safe-place.git`.

---

## Task Decomposition

### Task 1: Project Scaffolding, Asset Organization & Attribution Setup

**Files:**
- Create: `assets/ASSET_CREDITS.md`
- Create: `assets/images/room/bedroom_base.webp` (or `.png`)
- Create: `assets/images/room/window_rain.webp` (or `.png`)
- Create: `assets/images/objects/stitch_plush.png`
- Create: `assets/ui/icons.svg`

**Interfaces:**
- Consumes: None
- Produces: Visual room layers and Stitch plush asset accessible via `./assets/images/...`

- [ ] **Step 1: Create directory tree for assets, styles, and src**

Create directories: `assets/images/room`, `assets/images/objects`, `assets/ui`, `styles`, `src`.

- [ ] **Step 2: Generate cohesive anime bedroom layered artwork and Stitch plush asset**

Generate high-quality anime illustration assets matching the visual direction (Makoto Shinkai / lo-fi night bedroom, rainy window, warm amber lighting, cozy bed, bedside table, study desk) and transparent Stitch plush character.

- [ ] **Step 3: Create `assets/ASSET_CREDITS.md`**

Document asset provenance, licensing details, and character design notes complying with AGENTS.md.

- [ ] **Step 4: Verify asset existence and dimensions**

Check that generated image files exist and are correctly structured under `assets/`.

- [ ] **Step 5: Commit**

```bash
git add assets/
git commit -m "feat(assets): scaffold directory structure and add room assets with credits"
```

---

### Task 2: Centralized Content & Indonesian Copy Module (`src/content.js`)

**Files:**
- Create: `src/content.js`
- Create: `tests/content.test.js` (or lightweight node test script)

**Interfaces:**
- Consumes: None
- Produces: `ROOM_CONTENT` export containing `HOTSPOTS`, `MESSAGES`, `WELCOME_COPY`, `REST_CARD_COPY`.

- [ ] **Step 1: Write verification test for content completeness**

Create `tests/content.test.js` validating that all 5 hotspots exist (`bed`, `letter`, `plush`, `laptop`, `lamp`), bed action equals `"kita istirahat yu"`, and Indonesian copy matches PRD.md verbatim.

- [ ] **Step 2: Run verification test to verify it fails**

Run `node tests/content.test.js` (expected: module not found).

- [ ] **Step 3: Implement `src/content.js`**

Export frozen object containing:
- `WELCOME_COPY`: `{ title: "The Safe Place", subtitle: "a little room just for you", greeting: "hai sayanggg, sini dulu bentar...", cta: "Masuk ke kamar" }`
- `HOTSPOTS`: array of 5 objects with coordinates, labels, themes.
- `MESSAGES`: detailed copy for Bed, Letter, Stitch plush, Laptop, Lamp.
- `REST_CARD_COPY`: closing message ("makasih ya udah mampir sebentar, sayang...").

- [ ] **Step 4: Run verification test to verify it passes**

Run `node tests/content.test.js` (expected: PASS with 5 hotspots validated).

- [ ] **Step 5: Commit**

```bash
git add src/content.js tests/content.test.js
git commit -m "feat(content): add centralized Indonesian copy module with 5 hotspots"
```

---

### Task 3: Ambient Audio Engine Module (`src/audio.js`)

**Files:**
- Create: `src/audio.js`
- Test: `tests/audio.test.js`

**Interfaces:**
- Consumes: Web Audio API (`AudioContext`, `GainNode`, `BiquadFilterNode`, `AudioBufferSourceNode`)
- Produces: `audioEngine` object with `{ init, play, pause, toggle, isPlaying, setVolume }`.

- [ ] **Step 1: Write verification test for audio state machine**

Create `tests/audio.test.js` asserting `isPlaying` toggles correctly, volume ramping operates within safe limits [0.0, 1.0], and `init()` handles browser activation states safely.

- [ ] **Step 2: Run test to verify it fails**

Run `node tests/audio.test.js` (expected: module not found).

- [ ] **Step 3: Implement `src/audio.js`**

Implement procedural sound generator:
- Synthesizes pink/brown noise through a bandpass filter to simulate gentle rain against glass.
- Dual harmonic oscillators with soft low-pass filter for cozy ambient warmth.
- Master gain node with 0.8s exponential volume ramp on play/pause to avoid audio clipping/popping.
- Export clean API: `init()`, `play()`, `pause()`, `toggle()`, `isPlaying()`.

- [ ] **Step 4: Run test to verify it passes**

Run `node tests/audio.test.js` (expected: PASS).

- [ ] **Step 5: Commit**

```bash
git add src/audio.js tests/audio.test.js
git commit -m "feat(audio): implement Web Audio API procedural rain and ambient sound engine"
```

---

### Task 4: Motion & Multi-Tier Parallax Engine (`src/motion.js`)

**Files:**
- Create: `src/motion.js`
- Test: `tests/motion.test.js`

**Interfaces:**
- Consumes: Browser DOM, `DeviceOrientationEvent`, `window.requestAnimationFrame`, `window.matchMedia('(prefers-reduced-motion: reduce)')`
- Produces: `motionEngine` object with `{ init, toggleGyro, isGyroActive, subscribe, destroy }`.

- [ ] **Step 1: Write test for motion normalization & clamp math**

Create `tests/motion.test.js` verifying that angles outside $\pm 15^\circ$ clamp cleanly to $[-1.0, 1.0]$, LERP math converges smoothly, and reduced-motion forces coordinates to zero.

- [ ] **Step 2: Run test to verify it fails**

Run `node tests/motion.test.js` (expected: module not found).

- [ ] **Step 3: Implement `src/motion.js`**

Implement multi-tier parallax engine:
- Tier 1: Gyroscope with iOS 13+ `requestPermission()` handling.
- Tier 2: Pointer tracking relative to viewport center.
- Tier 3: Sinusoidal ambient breathing drift (`Math.sin(timestamp * 0.0008) * 0.15`).
- Tier 4: Prefers-reduced-motion detection which disables transforms entirely.
- Smooth LERP (`current += (target - current) * 0.08`) running inside `requestAnimationFrame`.
- Auto-pause when tab is hidden (`visibilitychange`).

- [ ] **Step 4: Run test to verify it passes**

Run `node tests/motion.test.js` (expected: PASS).

- [ ] **Step 5: Commit**

```bash
git add src/motion.js tests/motion.test.js
git commit -m "feat(motion): implement multi-tier parallax and gyroscope engine with LERP smoothing"
```

---

### Task 5: Core HTML Structure & Modern CSS Design System (`index.html`, `styles/main.css`, `styles/scene.css`)

**Files:**
- Create: `index.html`
- Create: `styles/main.css`
- Create: `styles/scene.css`
- Create: `styles/motion.css`

**Interfaces:**
- Consumes: Assets from `assets/images/`
- Produces: Responsive 2.5D viewport DOM, 5 `<button class="hotspot">` elements, top navigation control bar, modal containers.

- [ ] **Step 1: Create `index.html` with semantic structure**

Build HTML5 layout:
- `#viewport-container` with `#scene-stage` holding 5 depth layers (`.layer-sky`, `.layer-room`, `.layer-furniture`, `.layer-hotspots`, `.layer-foreground`).
- 5 `<button class="hotspot">` with `aria-label`, `data-hotspot-id`, and floating pulse markers.
- Top control header: Title badge, Sound toggle button, Motion toggle button, and "Mau pamit tidur" button.
- Accessible modal dialog container `<div id="modal-container" role="dialog" aria-modal="true" hidden>`.

- [ ] **Step 2: Implement `styles/main.css` design system**

Implement color tokens (anime midnight navy `#0b101d`, amber glow `#ffb454`, dusty pink `#f2a2b3`, soft cream `#faf5ee`), typography (modern legible sans-serif), header control chip buttons, and clean CSS reset.

- [ ] **Step 3: Implement `styles/scene.css` 2.5D composition**

Implement 1.12x overscan scaling, CSS 3D perspective (`1000px`), absolute positioning for each layer, responsive hotspot coordinates across mobile & desktop, and breathing pulse glow animations.

- [ ] **Step 4: Implement `styles/motion.css` keyframe & accessibility rules**

Define rain streak animations, floating dust particle drifts, and `@media (prefers-reduced-motion: reduce)` overrides.

- [ ] **Step 5: Commit**

```bash
git add index.html styles/main.css styles/scene.css styles/motion.css
git commit -m "feat(ui): build 2.5D scene markup, design system, and responsive styles"
```

---

### Task 6: Dialog Modal System & Interactive Actions (`styles/panels.css`, `src/interactions.js`)

**Files:**
- Create: `styles/panels.css`
- Create: `src/interactions.js`

**Interfaces:**
- Consumes: `src/content.js`
- Produces: `interactionsManager` with `{ openModal, closeModal, isModalOpen, triggerBedAction, triggerPlushAction, toggleLamp }`.

- [ ] **Step 1: Implement `styles/panels.css` modal styling**

Style anime glassmorphism modal panels:
- Backdrop with `backdrop-filter: blur(16px)` and darkened tint.
- Letter styling: realistic warm parchment card with ruled lines, comfortable font size, line-height 1.7, and mobile-friendly vertical scrolling.
- Close button ("×" and "Kembali ke Kamar").
- Interactive action buttons (e.g. `"kita istirahat yu"`, `"Peluk bonekanya"`).

- [ ] **Step 2: Implement `src/interactions.js` logic**

Code modal controller:
- `openModal(hotspotId)`: populates content from `src/content.js`, displays modal, traps keyboard focus, sets `aria-expanded="true"`.
- `closeModal()`: hides modal, restores focus to triggering button.
- Bed action: handles `"kita istirahat yu"` by triggering cozy blanket cover effect.
- Plush action: handles `"Peluk bonekanya"` by triggering heart pulse animation.
- Laptop action: dims screen and dissolves task chips.
- Lamp action: toggles room warm amber light intensity.
- ESC key and outside-click listeners.

- [ ] **Step 3: Verify modal accessibility and interactions**

Verify focus trapping, close triggers, and action button bindings.

- [ ] **Step 4: Commit**

```bash
git add styles/panels.css src/interactions.js
git commit -m "feat(interactions): add glassmorphism modal system and object micro-interactions"
```

---

### Task 7: Scene Composition, Hotspot Anchoring & Controller Integration (`src/scene.js`, `src/main.js`)

**Files:**
- Create: `src/scene.js`
- Create: `src/main.js`

**Interfaces:**
- Consumes: `src/content.js`, `src/audio.js`, `src/motion.js`, `src/interactions.js`
- Produces: Full working app bootstrap.

- [ ] **Step 1: Implement `src/scene.js`**

Implement layer transform coordinator:
- Subscribes to `motionEngine` coordinate changes.
- Applies scaled 3D transforms (`translate3d(x * depth, y * depth, 0)`) to each layer.
- Updates dynamic ambient lamp glow intensity across room layers.

- [ ] **Step 2: Implement `src/main.js` application entry point**

Wire all systems together:
- Show Welcome Modal on first visit.
- On clicking `"Masuk ke kamar"`: close welcome modal AND trigger `audioEngine.play()` for room entry autoplay.
- Wire top header buttons: audio toggle button, motion toggle button, and closing rest card button.
- Attach event listeners to the 5 hotspots to trigger `interactionsManager.openModal(id)`.

- [ ] **Step 3: Test local dev server execution**

Start local static server and verify complete application in browser.

- [ ] **Step 4: Commit**

```bash
git add src/scene.js src/main.js
git commit -m "feat(app): integrate scene coordinator, audio autoplay, and main entrypoint"
```

---

### Task 8: End-to-End Verification, Visual QA & GitHub Pages Documentation

**Files:**
- Create: `README.md`
- Test: Full functional testing across viewports (mobile 375px, tablet 768px, desktop 1440px).

**Interfaces:**
- Consumes: All project files
- Produces: Production-ready static repository verified for GitHub Pages deployment.

- [ ] **Step 1: Perform automated browser QA**

Launch headless browser / devtools check to test:
1. Welcome modal appears; clicking "Masuk ke kamar" closes it and starts ambient sound.
2. Clicking Bed opens Rest Without Guilt modal; clicking "kita istirahat yu" plays blanket animation.
3. Clicking Letter opens readable parchment letter with complete Indonesian text.
4. Clicking Stitch plush opens virtual hug modal; clicking "Peluk bonekanya" pulses heart effect.
5. Clicking Laptop opens Work Can Wait modal.
6. Clicking Lamp opens A Little Light modal and toggles warm illumination.
7. Motion toggle switches between gyro/pointer/ambient drift.
8. No 404 network errors, no uncaught JS exceptions, zero horizontal overflow.

- [ ] **Step 2: Create comprehensive `README.md`**

Write clear guide including:
- Project overview & features.
- Local preview instructions (`npx serve .` or Python `python -m http.server`).
- Step-by-step GitHub Pages activation instructions (Deploy from Branch).
- Link to live target repo: `https://github.com/gifts-for-u/a-little-safe-place`.

- [ ] **Step 3: Commit and verify git status**

```bash
git add README.md
git commit -m "docs: add README with local preview and GitHub Pages deployment guide"
```

- [ ] **Step 4: Verify git log and remote readiness**

Confirm all commits are clean, ready to push to `origin/master` (or `origin/main`).
