# AGENTS.md — The Safe Place

This file defines implementation instructions for coding agents working on **The Safe Place**.

## 1. Mission

Build a mobile-first, static, interactive comfort website: a cinematic anime-inspired bedroom at night, rendered as a layered 2.5D scene. The recipient can interact with five objects to reveal personal, reassuring messages.

The experience should feel gentle, intimate, polished, and lightweight. Do not turn it into a productivity app, a checklist, or a multi-step task.

Read `PRD.md` before making implementation decisions. If this file and `PRD.md` conflict, preserve explicit product constraints and update the documents together when a change is necessary.

## 2. Hard Constraints

- Host on **GitHub Pages**.
- Static-only: no backend, database, login, secrets, server functions, or runtime API requirement.
- Mobile-first and responsive.
- Visual direction: **cinematic anime-inspired 2.5D bedroom**, rainy night, warm amber lighting, muted navy/purple, pink/cream bedding, cozy details.
- Exactly five primary clickable objects:
  1. Bed
  2. Letter on bedside table
  3. Stitch plush (only if asset licensing and use conditions are suitable; otherwise an original blue plush character)
  4. Laptop
  5. Bedside lamp
- The letter and other messages must be real HTML text, never text baked into a raster image.
- Gyroscope/parallax is optional and must have a clear activation control.
- If gyro is unavailable or permission is denied, the website must still work using automatic/pointer parallax.
- Do not autoplay audio.
- Respect `prefers-reduced-motion`.
- Do not use Blender as a required workflow.
- Do not add analytics or tracking.

## 3. Before Coding

1. Inspect the existing repository and preserve any useful project conventions.
2. Read `PRD.md` completely.
3. Check available assets, their source URLs, formats, dimensions, and license terms.
4. Record asset provenance in `README.md` or `assets/ASSET_CREDITS.md`.
5. If no compatible background exists, create or source original layered artwork. Do not wait indefinitely for a perfect asset.
6. Confirm that the GitHub Pages base path will be handled correctly.
7. Make a concise implementation plan before major edits.

## 4. Asset and IP Policy

### General assets
- Prefer a cohesive art direction over mixing unrelated packs.
- Prefer original, generated, or clearly licensed assets.
- Keep source files and final web-optimized files organized.
- Optimize images and textures for mobile.
- Record source, author, license, required attribution, and any restrictions.
- Do not assume that “free download” means unrestricted use.
- Do not hotlink third-party images in production; download and serve local assets when the license allows it.

### Stitch plush
- A fan-made Stitch model/image may be used only after checking the specific asset's license and terms.
- Free download or a Creative Commons label does not automatically clear rights in the underlying character.
- Do not use a fan asset if the license is unclear or incompatible with the intended deployment.
- If uncertain, use an original cute blue plush with large ears and a distinct design that does not copy Stitch's exact character design, logos, or branding.
- Document the decision and source in the asset credits.

### Generated images
- Use generated artwork as a visual asset, not as a source of text. Render message copy in HTML.
- If generating a room image, request no lettering, labels, logos, or UI text.
- For 2.5D, separate only the layers that need independent movement or click interaction. Avoid unnecessary asset-production complexity.
- If a suitable layered scene is not practical, use a full 2D background with transparent hotspots and CSS animations rather than blocking delivery.

## 5. Suggested Architecture

Use vanilla HTML/CSS/JavaScript unless the existing repository already has a justified framework.

Suggested layout:

```text
index.html
README.md
PRD.md
AGENTS.md
assets/
  images/
    room/
    objects/
    ui/
  audio/
  fonts/
src/
  main.js
  scene.js
  interactions.js
  motion.js
  audio.js
  content.js
styles/
  main.css
  scene.css
  panels.css
  motion.css
```

Keep the project as simple as possible. The exact structure can be adapted to the repository.

### Module responsibilities
- `main.js`: initialization and event wiring.
- `scene.js`: scene layers, parallax targets, hotspots.
- `interactions.js`: object state and message-panel behavior.
- `motion.js`: gyro permission, device orientation, pointer/automatic fallback, reduced-motion handling.
- `audio.js`: optional user-controlled audio.
- `content.js`: Indonesian message copy and object metadata.
- CSS: scene composition, responsive behavior, panels, and animations.

Avoid unnecessary dependencies. GSAP may be used for timelines if it materially improves transitions. Howler.js is optional and should only be added if audio is implemented.

## 6. 2.5D Scene Implementation

- Use stacked image layers with intentional depth and small differences in movement.
- Use CSS transforms (`translate3d`) for motion where possible.
- Give layers enough overscan so their edges do not become visible when shifted.
- Keep the scene's clickable regions aligned with the visible objects at all viewport sizes.
- Do not let decorative overlays intercept clicks; use `pointer-events: none` on noninteractive decoration.
- Use a stable focal point and clamp movement so the room never drifts excessively.
- Ensure the scene looks intentional when motion is disabled.
- Do not require all layers to move; subtle motion is better than constant movement.
- The scene must remain navigable with one hand on a phone.

### Hotspots
- Provide exactly five primary hotspots; avoid adding extra clickable objects without updating the PRD.
- Use semantic `<button>` elements with accessible labels.
- Aim for touch targets around 44 × 44 CSS pixels or larger.
- Keep focus indicators visible for keyboard users.
- Do not rely on hover as the only way to discover or activate an object.
- Use subtle idle motion/glow and labels, but avoid cluttering the artwork.
- Ensure opening a panel does not destroy scene state.

## 7. Gyroscope and Motion Behavior

### Activation
- Do not request orientation permission automatically on page load.
- Provide an explicit button such as “Aktifkan efek gerak”.
- If the browser exposes a permission API for device orientation, request it only inside the direct user-gesture handler.
- Handle unsupported APIs, permission denial, thrown errors, and missing sensor events without breaking the experience.
- Provide a visible way to turn motion off again.

### Mapping and smoothing
- Map a small range of orientation values to a subtle translation, not a full 3D rotation.
- Clamp all values to a safe range.
- Smooth readings using interpolation or a low-pass approach to reduce jitter.
- Avoid abrupt jumps when enabling or disabling motion.
- Do not make interactive objects move away from their tap targets.
- Process orientation locally only. Do not send it to any service or store it.

### Fallback order
1. Gyroscope/device orientation when explicitly enabled and supported.
2. Pointer-based parallax on devices with a pointer, if reduced motion is not requested.
3. Very subtle automatic ambient movement.
4. Static scene when `prefers-reduced-motion: reduce` is active.

The fallback must never be an error state. The website should remain complete and usable without gyro.

### Reduced motion
- Read and respect `prefers-reduced-motion`.
- When reduced motion is enabled, disable or substantially reduce parallax, continuous particle movement, typewriter effects, and camera transitions.
- Do not use flashing, aggressive zooms, or rapid brightness changes.
- Keep a direct “show full message” option if text is animated.

## 8. Interaction and Message Panels

- Clicking a hotspot plays its small object animation and opens the matching panel.
- Each panel has a clear close/back button.
- Closing a panel returns the user to the room without reloading the page.
- Restore focus to the object button when the panel closes where practical.
- Use a readable font size, line-height, and contrast.
- The letter panel should fit mobile screens; allow vertical scrolling if needed.
- Do not embed message text in images.
- Keep messages affectionate and conversational Indonesian, not overly formal or clinical.
- Avoid guilt-inducing language, pressure to reply, or claims that the recipient must feel better.
- Allow all messages to be skipped or closed immediately.

### Required object copy themes
- Bed: rest without guilt.
- Letter: you do not have to carry everything alone.
- Stitch/original plush: virtual hug and companionship.
- Laptop: work can wait; worth is not productivity.
- Lamp: hope and taking one small step at a time.

The draft copy is in `PRD.md`; keep copy centralized in `content.js` rather than duplicating it across event handlers.

## 9. Audio

- No autoplay.
- Audio starts only after an explicit user action.
- Provide a visible mute/stop control.
- Keep ambience low volume and loop smoothly if applicable.
- Handle missing or failed audio files gracefully.
- Do not make any content depend on sound.
- Record audio asset licenses and attribution.

## 10. Performance

- Prefer WebP/AVIF for large imagery where appropriate; retain compatibility as needed.
- Use appropriately sized assets; do not ship huge source artwork unnecessarily.
- Lazy-load noncritical assets.
- Animate transforms and opacity rather than layout properties.
- Avoid continuous full-screen blur/filter animations.
- Avoid unnecessary timers and event listeners.
- Use `requestAnimationFrame` only when needed and stop work when the page is hidden.
- Remove orientation and pointer listeners when motion is disabled or the page is not active.
- Test on a real mobile device when available.

## 11. Accessibility and Responsive Design

- Mobile-first CSS; no horizontal scrolling.
- Test narrow phone widths, phone landscape where reasonable, tablet, and desktop.
- Use semantic buttons and meaningful accessible names.
- Maintain visible keyboard focus and sensible tab order.
- Keep text readable and contrast sufficient.
- Use `aria-expanded`/`aria-controls` where appropriate for panel toggles.
- Do not rely on color or motion alone to communicate state.
- Respect reduced motion.
- Ensure the interface is usable with audio off and gyro off.

## 12. GitHub Pages Requirements

- Use relative paths or a configurable base path so assets work when deployed under a repository subpath.
- Do not assume the site is hosted at the domain root.
- Keep all runtime files static.
- Do not introduce secrets, API keys, or server-only environment variables.
- Document how to run locally and how to enable GitHub Pages.
- Verify the actual deployed URL and all image/audio requests after deployment.
- If a build step is used, ensure its output directory matches the GitHub Pages configuration.

## 13. Testing Checklist

### Functional
- [ ] Welcome/enter action works.
- [ ] Bed opens the rest message.
- [ ] Letter opens the readable letter panel.
- [ ] Plush opens the virtual hug message and animation/fallback.
- [ ] Laptop opens the work-can-wait message.
- [ ] Lamp opens the little-light message.
- [ ] All panels close and return to the scene.
- [ ] Objects can be opened in any order.
- [ ] Audio stays off until enabled.
- [ ] Gyro can be enabled and disabled.
- [ ] Gyro denial or lack of support does not break the site.
- [ ] Reduced-motion mode is respected.

### Visual and responsive
- [ ] Five hotspots align with visible objects.
- [ ] Hotspots remain tappable on mobile.
- [ ] The letter is readable without zooming the browser.
- [ ] No layer edges are exposed during parallax.
- [ ] Motion remains subtle and does not cause discomfort.
- [ ] Scene remains attractive when static.

### Deployment
- [ ] Local run instructions work.
- [ ] GitHub Pages base-path assets load.
- [ ] No broken image/audio requests.
- [ ] No uncaught JavaScript errors.
- [ ] Asset credits and license notes are complete.

## 14. Coding Workflow

For each task:

1. Inspect relevant files before editing.
2. Implement the smallest coherent change.
3. Test the affected interaction and responsive states.
4. Check console/network errors when possible.
5. Update README or asset credits if dependencies/assets change.
6. Keep PRD and AGENTS synchronized when scope or hard constraints change.
7. Summarize files changed, tests performed, known limitations, and any remaining asset/license decisions.

Do not claim a test or deployment succeeded unless it was actually run and verified.

## 15. Definition of Done

The implementation is complete when all required features in `PRD.md` are met, the five objects work, the letter is readable on mobile, gyro is optional with a reliable fallback, the site works without a backend, asset provenance is documented, and the GitHub Pages deployment is verified.
