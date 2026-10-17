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
    const depthStr = layer.getAttribute('data-depth') || '0.03';
    const depth = parseFloat(depthStr);

    // Multi-layer 2.5D depth parallax relative to the base room depth (0.03):
    // - room (0.03) forms the architectural anchor
    // - bed (0.065), plush (0.085), lamp (0.095), laptop (0.10), letter (0.11) shift with increasing depth
    // - foreground dust (0.16) floats closest to the viewer
    const relDepth = depth - 0.03;
    const parallaxX = isPortrait ? -x * relDepth * 280 : -x * depth * 320;
    const parallaxY = isPortrait ? -y * relDepth * 160 : -y * depth * 200;

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
