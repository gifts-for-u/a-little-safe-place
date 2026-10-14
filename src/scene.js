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

  for (let i = 0; i < layers.length; i++) {
    const layer = layers[i];
    const depthStr = layer.getAttribute('data-depth') || '0.05';
    const depth = parseFloat(depthStr);

    const shiftX = Math.round(x * depth * MAX_PARALLAX_PIXELS * 10) / 10;
    const shiftY = Math.round(y * depth * MAX_PARALLAX_PIXELS * 10) / 10;

    layer.style.transform = `translate3d(${shiftX}px, ${shiftY}px, 0)`;
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
