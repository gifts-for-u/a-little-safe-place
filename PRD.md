# The Safe Place — Product Requirements Document

**Status:** Ready for implementation  
**Version:** 1.0  
**Project type:** Personal, mobile-first interactive comfort website  
**Hosting:** GitHub Pages (static hosting; no backend)  
**Primary language:** Indonesian, casual and affectionate  
**Visual direction:** Cinematic anime-inspired 2.5D bedroom at night

---

## 1. Product Overview

**The Safe Place** is a small interactive website made to comfort a partner who is overwhelmed by a heavy workload. It should feel like entering a warm, private bedroom where she can pause, explore a few objects, and receive reassuring messages written as if they came directly from her partner.

The experience should be emotionally gentle and playful, not another task to complete. There is no score, deadline, required sequence, account, or form to fill out.

### Product promise

> A little room where you can put the weight down for a moment.

### Core principles

1. **Comfort over productivity:** Never frame rest as something she must earn.
2. **Explore freely:** The five objects can be opened in any order and skipped.
3. **Personal, not generic:** Messages should sound natural, casual, affectionate, and sincere.
4. **Atmosphere with restraint:** Use warm light, soft rain, gentle movement, and subtle sound only when enabled.
5. **Mobile first:** The experience must work well on a phone, including small screens.
6. **Graceful fallback:** Gyroscope support is optional. The website remains complete without motion sensors.

---

## 2. Goals and Non-Goals

### Goals

- Create an immersive, cinematic bedroom scene with a convincing 2.5D parallax effect.
- Make five objects clickable: **bed, letter, Stitch plush, laptop, and bedside lamp**.
- Give each object a distinct animation and a comforting message.
- Make the letter readable on mobile by displaying it in a large, responsive HTML panel rather than text baked into the room illustration.
- Offer optional device-orientation parallax through an explicit activation button.
- Provide automatic parallax when gyro is unavailable, denied, or disabled.
- Deploy as a static site on GitHub Pages.

### Non-goals

- No backend, database, login, analytics, or user tracking.
- No requirement to create assets in Blender.
- No full 3D scene or 3D engine requirement.
- No requirement to complete every interaction.
- No autoplay audio.
- No notifications or requests for the recipient to reply.
- No claim that fan-made Stitch assets are automatically cleared for all uses.

---

## 3. Target Audience and Usage Context

- **Primary user:** One person receiving comfort after a tiring workday.
- **Device:** Primarily mobile phone; desktop should also work.
- **Typical session:** Around 2–4 minutes, but the user can leave at any time.
- **Environment:** Often at night or after work; the experience should remain comfortable at low screen brightness and with sound off.

---

## 4. Experience and User Flow

### 4.1 Welcome

Show the bedroom scene with a short, gentle introduction. The user can dismiss or continue without completing a setup flow.

Suggested copy:

> **The Safe Place**  
> a little room just for you  
>
> hai sayanggg, sini dulu bentar.  
> di sini nggak ada deadline, nggak ada yang harus kamu selesaikan.  
> kamu boleh istirahat sebentar, ya.  
>
> *klik apa pun yang bikin kamu penasaran.*

Provide a visible **Explore the room / Masuk ke kamar** action. Do not block access behind audio or gyro permission prompts.

### 4.2 Interactive bedroom

Show one cinematic bedroom illustration built from layered assets. Five interactive objects are available in any order:

1. Bed
2. Letter on the bedside table
3. Stitch plush on the bed
4. Laptop
5. Bedside lamp

Each object should have a clear but unobtrusive hover/touch affordance: a soft glow, a small label, or a tiny idle animation. On touch devices, ensure targets are comfortably tappable and do not rely on hover alone.

### 4.3 Object interaction

When an object is activated:

1. Play a short, subtle object animation.
2. Optionally shift focus/zoom slightly toward the object.
3. Display the corresponding message in a readable HTML panel.
4. Keep a clear close/back control.
5. Return to the room without resetting the whole experience.

The room must remain navigable even after an object has been opened. Avoid forced sequencing.

### 4.4 Closing / resting

The user may close any panel or leave the website at any time. An optional closing message may be shown, but it must not require all five objects to be visited.

Suggested closing copy:

> makasih ya udah mampir sebentar, sayang.  
> kamu nggak harus menyelesaikan semuanya malam ini.  
> istirahat dulu, ya. aku di sini.  
> nggak perlu bales apa-apa kok.  
> i love you.

---

## 5. Visual Direction

### 5.1 Art direction

Cinematic anime-inspired bedroom at night:

- Rainy window with distant city lights.
- Warm amber bedside lighting against a muted navy/purple night palette.
- Soft pink, dusty rose, cream, and warm wood accents.
- Layered bedding, plush textures, plants, small notes, books, and fairy lights.
- Gentle bloom/glow and foreground bokeh, used sparingly.
- Intimate, cozy, lived-in room; avoid a sterile UI-dashboard appearance.

The scene should feel visually rich but still calm. Avoid excessive motion, harsh flashes, or overly saturated effects.

### 5.2 2.5D parallax

Use layered 2D artwork to create depth. Suggested layers:

1. **Far background:** sky, distant city lights, rain/window view.
2. **Background architecture:** window frame, curtains, walls, shelves.
3. **Room and furniture:** bed, desk, bedside table, room decor.
4. **Interactive objects:** letter, Stitch plush, laptop, lamp, bed interaction region.
5. **Foreground:** a few leaves, light particles, soft bokeh.

Not every object must be separated if the result would be too expensive to prepare. Separate only the layers and objects needed for motion or interaction.

### 5.3 Asset fallback strategy

Prefer assets with compatible art direction and clear usage rights. Use this order:

1. Find suitable, licensed assets that can be used and modified for this project.
2. Use AI-generated original room artwork and object illustrations when needed.
3. If a complete layered scene is not feasible, use a full 2D illustrated background with transparent clickable hotspots and CSS animations.
4. Do not delay the project indefinitely searching for perfect assets.

**Stitch asset rule:** Use a fan-made Stitch asset only after reviewing the specific asset's license and usage restrictions. A download being free or marked Creative Commons does not automatically clear all character/IP rights. If a suitable asset cannot be used confidently or does not match the art direction, use an original cute blue plush character with large ears instead. Do not imitate exact Stitch branding, logos, or distinctive protected artwork in a substitute character.

### 5.4 Responsive composition

- Desktop: wide scene with all five objects visible where practical.
- Mobile: prioritize the bedroom focal area; allow gentle repositioning or scaling to keep interactive objects tappable.
- Letter/message panels: use HTML/CSS and scale to the viewport; never rely on tiny text embedded in a background image.
- Keep close/back controls visible and reachable.
- Avoid horizontal scrolling.

---

## 6. Feature Requirements

### F1 — Interactive bedroom

**Priority:** Must have

- Render the layered bedroom scene.
- Provide five and only five primary interactive hotspots: bed, letter, Stitch plush, laptop, bedside lamp.
- Each hotspot has a visible label or other clear affordance.
- Support pointer, touch, and keyboard activation.
- Each hotspot opens the correct message panel.

**Acceptance criteria**
- All five objects can be activated on a mobile viewport and desktop.
- Touch targets are approximately 44 × 44 CSS pixels or larger where practical.
- Hotspots are not obscured by decorative layers.
- The user can close a panel and activate a different object without refreshing.

### F2 — Bed: “Rest Without Guilt”

**Priority:** Must have

Visual: bedding shifts softly; a few tiny light particles appear. Avoid a large or startling motion.

Draft message:

> hai sayang,  
> kamu nggak harus menyelesaikan semuanya hari ini. kamu udah berusaha sejauh ini, dan itu berarti. istirahat bukan berarti kamu menyerah. kamu juga berhak berhenti sebentar.  
>
> pelan-pelan aja, ya. satu hal dalam satu waktu.  
> aku bangga sama kamu.

Optional action: **“selimutin aku”** triggers a short blanket animation.

### F3 — Letter: “A Letter From Me”

**Priority:** Must have

Visual: envelope lifts and opens; paper slides out. Then show a large responsive letter panel. Use typewriter text only if it remains comfortable to read and can be skipped/revealed immediately.

Draft message:

> buat sayangku,  
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
> — aku, yang selalu dukung kamu.

### F4 — Stitch plush: “A Hug From Me”

**Priority:** Must have if a suitable asset is available; otherwise use the original blue plush fallback.

Visual: plush waves or gently bobs, then hugs a heart pillow. Keep animation subtle.

Draft message:

> sini, peluk dulu, sayanggg.  
> nggak perlu cerita kalau belum siap. nggak perlu cari kata-kata juga.  
> hari ini pasti berat banget, ya?  
> anggap aja boneka ini lagi aku pinjemin buat peluk kamu. aku di sini, kok. kamu nggak sendirian.

Optional action: **“peluk bonekanya”** plays a short hug animation.

### F5 — Laptop: “Work Can Wait”

**Priority:** Must have

Visual: laptop lid closes slowly; a few abstract notification shapes fade out. Do not reproduce real work notifications or imply that the site interacts with the user's device.

Draft message:

> kerjaannya belum selesai semua? nggak apa-apa, sayang.  
> kamu bukan mesin yang harus selalu produktif. nilai diri kamu nggak ditentukan dari berapa banyak yang bisa kamu selesaikan dalam sehari.  
> progress kecil kamu tetap berarti. sekarang, kamu juga boleh jadi prioritas.

### F6 — Bedside lamp: “A Little Light”

**Priority:** Must have

Visual: the lamp warms up and softly brightens nearby layers. Do not flash or change brightness aggressively.

Draft message:

> nggak semua hari harus terasa indah. ada hari yang tugasnya cuma dilewati, dan itu nggak apa-apa.  
> kalau semuanya terasa berat, kita lewati pelan-pelan aja, ya. kamu nggak harus melihat seluruh jalan sekarang untuk mengambil satu langkah kecil.  
> aku tetap dukung kamu.

### F7 — Optional gyroscope parallax

**Priority:** Should have

- Provide a button such as **“Aktifkan efek gerak”**.
- Do not request sensor permission on initial page load.
- Request permission only in direct response to a user gesture when required by the browser.
- On supported devices, map a small, clamped range of device orientation to subtle layer movement.
- Smooth input with interpolation/low-pass behavior to avoid jitter.
- Provide a visible way to disable the effect.
- If unsupported, denied, unavailable, or disabled, use automatic ambient parallax and normal pointer/touch interactions.
- Do not block core interactions when sensor access is unavailable.
- Respect `prefers-reduced-motion`.

**Acceptance criteria**
- The room remains fully usable when gyro is denied.
- Movement is subtle and does not make hotspots difficult to tap.
- No permission dialog appears without the user asking to enable motion.
- Disabling motion returns the scene to a stable position.

### F8 — Automatic parallax fallback

**Priority:** Must have

When gyro is not active, create subtle movement from a slow ambient animation, with optional pointer movement on desktop. The effect should feel calm rather than like the room is constantly drifting.

### F9 — Audio ambience

**Priority:** Could have

- Optional rain ambience and/or gentle instrumental loop.
- No autoplay audio.
- Provide an obvious mute/on control.
- Audio assets must have a license appropriate for the project.
- Website must be complete and emotionally effective with audio off.

### F10 — Accessibility and reduced motion

**Priority:** Must have

- Respect `prefers-reduced-motion`.
- Provide semantic buttons and accessible names for hotspots.
- Maintain readable contrast and font sizes.
- Ensure keyboard navigation and visible focus states.
- Avoid communicating clickability only through color.
- Avoid rapid flashing, forced motion, or sound-only information.

### F11 — Static deployment

**Priority:** Must have

- Deploy to GitHub Pages.
- No backend, secrets, server-side routes, or runtime API requirements.
- Support a configurable base path for a GitHub Pages project repository.
- Ensure asset paths work from the deployed project subpath.
- Document local development and deployment steps.

---

## 7. Suggested Technical Approach

Preferred stack:

- HTML5
- CSS3
- Vanilla JavaScript using ES modules
- SVG/PNG/WebP artwork with transparent layers
- GSAP for optional timelines and object/camera transitions
- Howler.js only if audio is included
- GitHub Pages for hosting

Avoid introducing a large framework unless implementation needs justify it. Use original/generated illustrations and lightweight image layers rather than a full 3D renderer.

### Suggested project structure

```text
the-safe-place/
├── index.html
├── README.md
├── PRD.md
├── AGENTS.md
├── assets/
│   ├── images/
│   │   ├── room/
│   │   ├── objects/
│   │   └── ui/
│   ├── audio/
│   └── fonts/
├── src/
│   ├── main.js
│   ├── scene.js
│   ├── interactions.js
│   ├── motion.js
│   ├── audio.js
│   └── content.js
└── styles/
    ├── main.css
    ├── scene.css
    ├── panels.css
    └── motion.css
```

The implementation may simplify this structure if the site remains easy to maintain.

---

## 8. Performance Requirements

- Optimize images for mobile; use WebP/AVIF where practical while retaining appropriate fallbacks.
- Avoid shipping oversized source artwork to the browser.
- Lazy-load noncritical audio and optional assets.
- Keep animations transform/opacity-based where possible.
- Avoid animating expensive filters over large full-screen areas continuously.
- Prevent layout shifts when the scene loads.
- Keep the initial scene usable while optional assets load.
- Test on a mid-range mobile device if available.

---

## 9. Privacy and Safety

- Do not collect, transmit, or store personal information.
- No analytics or tracking by default.
- Gyroscope data is processed locally in the browser and must not be transmitted or persisted.
- Do not request microphone, camera, location, contacts, or unrelated permissions.
- Do not pressure the recipient to reply or complete the experience.
- Any third-party asset or library must be reviewed for licensing and privacy implications.

---

## 10. Testing Plan

### Functional
- Welcome/enter flow works.
- All five objects open their correct panels.
- Panels close correctly and return focus to the triggering object where practical.
- Optional animations can be skipped or completed.
- Gyro enable/disable and fallback behavior work.
- Audio remains off until the user enables it.

### Responsive
- Test at narrow mobile widths, common phone portrait sizes, tablet, and desktop.
- Ensure text is readable and no essential object becomes unreachable.
- Ensure the letter panel fits the viewport and supports scrolling if necessary.

### Accessibility
- Keyboard-only navigation.
- Visible focus.
- Screen-reader labels for interactive objects.
- Reduced-motion preference.
- Contrast and readable type size.

### Deployment
- Test locally and on the actual GitHub Pages URL.
- Verify project-subpath asset URLs.
- Confirm there are no broken asset requests or console errors.

---

## 11. Definition of Done

The project is ready when:

- [ ] A cohesive cinematic bedroom scene is rendered.
- [ ] Exactly five primary interactive objects are available.
- [ ] Each object has a distinct visual response and finalized draft message.
- [ ] The letter is readable on mobile.
- [ ] Optional gyro parallax has a clear activation control and a reliable fallback.
- [ ] Reduced-motion preferences are respected.
- [ ] No audio plays without explicit interaction.
- [ ] The site works without a backend.
- [ ] GitHub Pages deployment is documented and verified.
- [ ] Asset sources and licenses are documented.
- [ ] The Stitch asset has been reviewed for both asset-license conditions and relevant character/IP restrictions; otherwise the original plush fallback is used.

---

## 12. Open Implementation Notes

- The exact final art assets are not locked. Prefer a consistent scene over mixing mismatched art styles.
- Do not use text embedded in generated images for the actual message copy; render all important text as HTML.
- Treat the mockup as visual direction, not a production-ready background asset.
- Personalize the affectionate language before publishing if desired.
