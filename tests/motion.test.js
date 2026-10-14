import assert from 'node:assert';
import { clamp, lerp, normalizeOrientation } from '../src/motion.js';

console.log('Testing src/motion.js math and normalization...');

// 1. Clamp test
assert.strictEqual(clamp(5, -10, 10), 5);
assert.strictEqual(clamp(-15, -10, 10), -10);
assert.strictEqual(clamp(20, -10, 10), 10);

// 2. Lerp test
const lerpVal = lerp(0, 10, 0.1);
assert.strictEqual(Math.round(lerpVal * 100) / 100, 1);

// 3. Normalization of Orientation test (-15 to 15 deg)
// Neutral angle (gamma: 0, beta: 45)
const zeroNorm = normalizeOrientation(0, 45);
assert.strictEqual(zeroNorm.x, 0);
assert.strictEqual(zeroNorm.y, 0);

// Extreme positive clamp (gamma: 30, beta: 90)
const posNorm = normalizeOrientation(30, 90);
assert.strictEqual(posNorm.x, 1);
assert.strictEqual(posNorm.y, 1);

// Extreme negative clamp (gamma: -30, beta: 0)
const negNorm = normalizeOrientation(-30, 0);
assert.strictEqual(negNorm.x, -1);
assert.strictEqual(negNorm.y, -1);

console.log('✓ All motion.test.js math tests passed successfully!');
