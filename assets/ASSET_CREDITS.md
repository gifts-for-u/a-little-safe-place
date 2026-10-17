# Asset Credits & Provenance

This document records the provenance, licensing terms, and attributions for all media assets used in **The Safe Place**.

---

## 1. Visual Artwork

### 1.1 Base Bedroom Scene Background (`room_empty.jpg`, `room_empty.webp`, `bedroom_base.jpg`, `bedroom_base.webp`)
- **Description:** Cinematic anime bedroom at night, featuring a rainy window overlooking soft city bokeh lights, warm fairy lights, wooden bookshelves, nightstand, and study desk, with interactive objects cleanly separated into independent 2.5D layers.
- **Style Direction:** Makoto Shinkai / Studio Ghibli lo-fi aesthetic.
- **Provenance:** Custom generated original artwork created specifically for *The Safe Place* project.
- **License / Terms:** Free for personal and web presentation use; zero watermarks; text-free illustration.

### 1.2 Separated Interactive & Furniture 2.5D Layers (`assets/images/objects/`)
- **Files:**
  - `obj_bed.png`, `obj_bed.webp` — Cozy wooden bed with pink/cream pillows, fluffy duvet, and knitted throw blanket (`data-depth="0.065"`).
  - `obj_stitch.png`, `obj_stitch.webp` (`stitch_plush.png`, `stitch_plush.webp`) — 2D anime-stylized blue plush companion sitting on the bed (`data-depth="0.08"`).
  - `obj_endtable.png`, `obj_endtable.webp` — Wooden bedside nightstand / end table layered in front of the bed and beneath the lamp and letter (`data-depth="0.095"`).
  - `obj_lamp.png`, `obj_lamp.webp` — Warm amber bedside table lamp on top of the end table (`data-depth="0.102"`).
  - `obj_letter.png`, `obj_letter.webp` — Handwritten letter sheet, pastel envelope, and fountain pen on top of the end table (`data-depth="0.108"`).
  - `obj_laptop.png`, `obj_laptop.webp` — Open laptop with soft screen glow aligned to the study desk perspective (`data-depth="0.10"`).
- **License / Terms:** Non-commercial personal comfort gift project; original generated/stylized transparent sprites.

### 1.3 UI Vector Icons (`icons.svg`)
- **Description:** Minimalist SVG iconography for Sound, Motion, Moon/Sleep, Heart, Sparkles, and Close buttons.
- **License / Terms:** Open Source (Lucide / Feather / Material style under MIT License).

---

## 2. Audio Assets

### 2.1 Background Instrumental Track (`assets/sounds/always with me-ghibli.mp3`)
- **Track Title:** "Always With Me" (*Itsumo Nando Demo* - いつも何度でも) Instrumental.
- **Original Composition:** Youmi Kimura / Studio Ghibli (*Spirited Away*).
- **Source:** User-provided audio asset in `assets/sounds/`.
- **Use Context:** Non-commercial, personal comfort web project for an intimate audience.

### 2.2 Procedural Ambient Rain (Web Audio API)
- **Description:** Real-time synthesized soft rain noise buffer processed through biquad low-pass & band-pass filters.
- **Source:** Code generated in `src/audio.js`.
- **License:** MIT / Public Domain.
