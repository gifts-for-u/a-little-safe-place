import assert from 'node:assert';
import { WELCOME_COPY, HOTSPOTS, MESSAGES, REST_CARD_COPY } from '../src/content.js';

console.log('Testing src/content.js...');

// 1. Verify Welcome Copy
assert.ok(WELCOME_COPY.title, 'WELCOME_COPY should have title');
assert.ok(WELCOME_COPY.greeting.includes('hai sayanggg'), 'Greeting should match Indonesian text');
assert.strictEqual(WELCOME_COPY.cta, 'Masuk ke kamar', 'CTA should be "Masuk ke kamar"');

// 2. Verify Hotspots count and identity
assert.strictEqual(HOTSPOTS.length, 5, 'Must have exactly 5 hotspots');
const expectedIds = ['bed', 'letter', 'plush', 'laptop', 'lamp'];
const actualIds = HOTSPOTS.map(h => h.id);
assert.deepStrictEqual(actualIds, expectedIds, 'Hotspot IDs must match expected 5 objects');

// 3. Verify Bed interactive action
const bedHotspot = HOTSPOTS.find(h => h.id === 'bed');
assert.ok(bedHotspot.actionLabel, 'Bed must have actionLabel');
assert.strictEqual(bedHotspot.actionLabel, 'kita istirahat yu', 'Bed button must be "kita istirahat yu"');

// 4. Verify Messages exist and are not empty
expectedIds.forEach(id => {
  const msg = MESSAGES[id];
  assert.ok(msg, `Message for ${id} must exist`);
  assert.ok(msg.title, `Message for ${id} must have title`);
  assert.ok(msg.body && msg.body.length > 20, `Message for ${id} must have substantial text`);
});

// 5. Verify Letter copy
assert.ok(MESSAGES.letter.body.includes('buat sayangku'), 'Letter must contain "buat sayangku"');

// 6. Verify Rest Card Copy
assert.ok(REST_CARD_COPY.body.includes('makasih ya udah mampir sebentar'), 'Rest card must match PRD text');

console.log('✓ All content.js tests passed successfully!');
