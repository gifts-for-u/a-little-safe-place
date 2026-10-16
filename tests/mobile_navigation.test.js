// Mock browser environment for Node.js
if (typeof globalThis.window === 'undefined') {
  globalThis.window = {
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => true,
    innerWidth: 390,
    innerHeight: 844,
    requestAnimationFrame: () => 1,
    cancelAnimationFrame: () => {}
  };
  globalThis.document = {
    addEventListener: () => {},
    removeEventListener: () => {},
    getElementById: () => null,
    hidden: false
  };
}

import assert from 'node:assert';
import { motionEngine, normalizeOrientation, clamp } from '../src/motion.js';

console.log('Testing mobile panning geometry and motion engine coordination...');

// 1. Mobile Stage Geometry Simulation
const viewportWidth = 390;
const viewportHeight = 844;
const stageAspect = 1376 / 768;
const unscaledStageWidth = viewportHeight * stageAspect; // ~1512.2px
const scale = 1.15;
const effectiveStageWidth = unscaledStageWidth * scale; // ~1739px
const halfStageWidth = effectiveStageWidth / 2; // ~869.5px
const viewportCenter = viewportWidth / 2; // 195px

const mobileCenterOffset = -60;
const mobilePanRange = 540;

// Test Laptop position at max right pan (x = 1.0)
const laptopPercent = 0.879;
const laptopUnscaledOffsetFromCenter = (laptopPercent - 0.5) * unscaledStageWidth; // +573px
const laptopScaledOffsetFromCenter = laptopUnscaledOffsetFromCenter * scale; // +659px

const basePanXRight = mobileCenterOffset - (1.0 * mobilePanRange); // -600px
const laptopScreenX = viewportCenter + laptopScaledOffsetFromCenter + basePanXRight;
console.log(`Laptop screen X at x=1.0: ${laptopScreenX.toFixed(1)}px (viewport width: ${viewportWidth}px)`);

// Laptop should be comfortably centered on the 390px screen
assert.ok(laptopScreenX > 150 && laptopScreenX < 320, 'Laptop must be fully framed on mobile screen');

// Verify stage right edge does not show empty gap
const stageRightEdgeAtMaxRight = viewportCenter + halfStageWidth + basePanXRight;
assert.ok(stageRightEdgeAtMaxRight >= viewportWidth, 'Right edge of scene must cover full screen at x=1.0');

// Test Letter & Lamp at left pan (x = -0.6 and x = -1.0)
const letterPercent = 0.458;
const letterUnscaledOffsetFromCenter = (letterPercent - 0.5) * unscaledStageWidth;
const letterScaledOffsetFromCenter = letterUnscaledOffsetFromCenter * scale;

const basePanXLetter = mobileCenterOffset - (-0.5 * mobilePanRange); // +210px
const letterScreenX = viewportCenter + letterScaledOffsetFromCenter + basePanXLetter;
console.log(`Letter screen X at x=-0.5: ${letterScreenX.toFixed(1)}px`);
assert.ok(letterScreenX > 50 && letterScreenX < 350, 'Letter must be easily visible when panned left');

const lampPercent = 0.318;
const lampUnscaledOffsetFromCenter = (lampPercent - 0.5) * unscaledStageWidth;
const lampScaledOffsetFromCenter = lampUnscaledOffsetFromCenter * scale;

const basePanXLeft = mobileCenterOffset - (-1.0 * mobilePanRange); // +480px
const lampScreenX = viewportCenter + lampScaledOffsetFromCenter + basePanXLeft;
console.log(`Lamp screen X at x=-1.0: ${lampScreenX.toFixed(1)}px`);
assert.ok(lampScreenX > 0 && lampScreenX < viewportWidth, 'Lamp must be visible at max left tilt');

const stageLeftEdgeAtMaxLeft = viewportCenter - halfStageWidth + basePanXLeft;
assert.ok(stageLeftEdgeAtMaxLeft <= 0, 'Left edge of scene must cover full screen at x=-1.0');

// 2. MotionEngine Gyro + Touch Coordination Test
// Simulate gyro enable
motionEngine.enableGyro();
assert.strictEqual(motionEngine.isGyroActive, true);
assert.strictEqual(motionEngine.isCalibrated, false);

// First orientation event (phone held naturally at gamma = 8 deg, beta = 50 deg)
motionEngine._onDeviceOrientation({ gamma: 8, beta: 50 });
assert.strictEqual(motionEngine.isCalibrated, true);
assert.strictEqual(motionEngine.neutralGamma, 8);
assert.strictEqual(motionEngine.neutralBeta, 50);

// With 0 delta, targetX should be 0
assert.strictEqual(motionEngine.targetX, 0);

// Tilt right by 11 degrees (half range)
motionEngine._onDeviceOrientation({ gamma: 19, beta: 50 });
assert.strictEqual(Math.round(motionEngine.gyroTiltX * 100) / 100, 0.5);
assert.strictEqual(Math.round(motionEngine.targetX * 100) / 100, 0.5);

// User also swipes finger left (deltaX = -150px) to pan further right
motionEngine.isTouchDragging = true;
motionEngine.touchStartX = 200;
motionEngine.touchStartY = 300;
motionEngine.touchBasePanX = motionEngine.touchPanX;
motionEngine.touchBasePanY = motionEngine.touchPanY;

motionEngine._onTouchMove({
  touches: [{ clientX: 50, clientY: 300 }]
});

// touchPanX moved by -(-150 / 300) = +0.5
assert.strictEqual(motionEngine.touchPanX, 0.5);
// targetX = clamp(touchPanX (0.5) + gyroTiltX (0.5)) = 1.0
assert.strictEqual(motionEngine.targetX, 1.0);

// Now user tilts back or swipes back towards letter
motionEngine._onDeviceOrientation({ gamma: -3, beta: 50 }); // delta = -11 deg -> gyroTiltX = -0.5
// targetX = clamp(touchPanX (0.5) + gyroTiltX (-0.5)) = 0
assert.strictEqual(motionEngine.targetX, 0);

// Tilt further left to letter
motionEngine._onDeviceOrientation({ gamma: -14, beta: 50 }); // delta = -22 deg -> gyroTiltX = -1.0
// targetX = clamp(0.5 + (-1.0)) = -0.5 (perfect for looking at letter and lamp!)
assert.strictEqual(motionEngine.targetX, -0.5);

motionEngine.disableGyro();
assert.strictEqual(motionEngine.isGyroActive, false);
assert.strictEqual(motionEngine.targetX, 0.5); // Reverts cleanly to touch pan

console.log('✓ All mobile navigation and gyro-touch coordination tests passed!');
