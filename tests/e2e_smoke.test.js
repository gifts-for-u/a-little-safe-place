import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

console.log('Running End-to-End static verification test...');

const repoRoot = path.resolve('.');

// 1. Check index.html exists
const indexHtmlPath = path.join(repoRoot, 'index.html');
assert.ok(fs.existsSync(indexHtmlPath), 'index.html must exist');
const htmlContent = fs.readFileSync(indexHtmlPath, 'utf-8');

// 2. Verify exactly 5 hotspots in HTML
const requiredHotspotIds = ['hotspot-bed', 'hotspot-letter', 'hotspot-plush', 'hotspot-laptop', 'hotspot-lamp'];
requiredHotspotIds.forEach(id => {
  assert.ok(htmlContent.includes(`id="${id}"`), `index.html must contain #${id}`);
  assert.ok(htmlContent.includes(`class="hotspot ${id}"`), `index.html must have correct class for ${id}`);
});

// 3. Verify Bed button label "kita istirahat yu" in content.js
import { HOTSPOTS } from '../src/content.js';
const bed = HOTSPOTS.find(h => h.id === 'bed');
assert.strictEqual(bed.actionLabel, 'kita istirahat yu');

// 4. Verify relative asset paths in HTML
const assetRegex = /(?:src|href|srcset)="(\.\/assets\/[^"]+)"/g;
let match;
let count = 0;
while ((match = assetRegex.exec(htmlContent)) !== null) {
  count++;
  const relativePath = match[1];
  const fullPath = path.join(repoRoot, relativePath.replace(/^\.\//, ''));
  assert.ok(fs.existsSync(fullPath), `Asset path must exist on disk: ${relativePath}`);
}
assert.ok(count >= 5, 'Must have at least 5 relative asset references verified');

// 5. Verify Audio Asset exists
const audioPath = path.join(repoRoot, 'assets', 'sounds', 'always with me-ghibli.mp3');
assert.ok(fs.existsSync(audioPath), 'Ghibli audio track must exist');
const audioStat = fs.statSync(audioPath);
assert.ok(audioStat.size > 1000000, 'Audio file must be non-empty');

// 6. Verify Images exist
const roomImg = path.join(repoRoot, 'assets', 'images', 'room', 'bedroom_base.webp');
const plushImg = path.join(repoRoot, 'assets', 'images', 'objects', 'stitch_plush.webp');
assert.ok(fs.existsSync(roomImg), 'Bedroom image must exist');
assert.ok(fs.existsSync(plushImg), 'Stitch plush image must exist');

// 7. Verify ASSET_CREDITS.md exists
const creditsPath = path.join(repoRoot, 'assets', 'ASSET_CREDITS.md');
assert.ok(fs.existsSync(creditsPath), 'ASSET_CREDITS.md must exist');

console.log('✓ All 7 End-to-End static verification checks passed successfully!');
