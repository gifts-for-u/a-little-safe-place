/**
 * The Safe Place — Scene Composition & Layer Depth Coordinator
 * Translates parallax motion coordinates into layered 2.5D CSS transforms.
 */

import { motionEngine } from './motion.js';

let layers = [];
let unsubscribeMotion = null;

// Maximum pixel shift for depth factor = 1.0
const MAX_PARALLAX_PIXELS = 260;

/**
 * Initializes scene layers and subscribes to parallax motion coordinates.
 */
export function initScene() {
  if (typeof document === 'undefined') return;

  layers = Array.from(document.querySelectorAll('.scene-stage .layer'));

  if (unsubscribeMotion) {
    unsubscribeMotion();
  }

  unsubscribeMotion = motionEngine.subscribe((coords) => {
    applyParallaxTransforms(coords);
  });
}

/**
 * Applies 3D translations to each layer according to its data-depth.
 */
function applyParallaxTransforms(coords) {
  if (coords.isReducedMotion) {
    for (let i = 0; i < layers.length; i++) {
      layers[i].style.transform = 'translate3d(0, 0, 0)';
    }
    return;
  }

  const { x, y } = coords;
  const isPortrait = typeof window !== 'undefined' && window.innerHeight > window.innerWidth;

  // On mobile portrait, enable smooth camera panning across the 16:9 room canvas
  // x is normalized [-1.0, 1.0].
  // Center naturally on the cozy bed & stitch (artwork ~58%), with full range to window (left) and laptop (right).
  const mobileCenterOffset = -60;
  const mobilePanRange = 540;
  const basePanX = isPortrait ? (mobileCenterOffset - x * mobilePanRange) : 0;
  const basePanY = isPortrait ? -y * 25 : 0;

  for (let i = 0; i < layers.length; i++) {
    const layer = layers[i];
    const depthStr = layer.getAttribute('data-depth') || '0.06';
    const depth = parseFloat(depthStr);

    // Subtle 2.5D depth parallax relative to room depth (0.06)
    // Layers with depth 0.06 (room, furniture, hotspots) have 0 relative delta and stay 100% locked!
    // Layer with depth 0.02 (sky outside window) moves with depth parallax.
    // Layer with depth 0.12 (foreground dust) moves with foreground parallax.
    const relDepth = depth - 0.06;
    const parallaxX = isPortrait ? -x * relDepth * 120 : -x * depth * 220;
    const parallaxY = isPortrait ? -y * relDepth * 80 : -y * depth * 140;

    const totalX = Math.round((basePanX + parallaxX) * 10) / 10;
    const totalY = Math.round((basePanY + parallaxY) * 10) / 10;

    layer.style.transform = `translate3d(${totalX}px, ${totalY}px, 0)`;
  }
}

/**
 * Cleanup scene listeners
 */
export function destroyScene() {
  if (unsubscribeMotion) {
    unsubscribeMotion();
    unsubscribeMotion = null;
  }
}

export const sceneManager = {
  init: initScene,
  destroy: destroyScene
};

export default sceneManager;
