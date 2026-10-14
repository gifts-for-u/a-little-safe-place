import assert from 'node:assert';

console.log('Testing src/audio.js state machine...');

// Mock browser Audio and AudioContext for node test environment
class MockAudio {
  constructor(src) {
    this.src = src;
    this.loop = false;
    this.paused = true;
    this.volume = 1;
  }
  play() {
    this.paused = false;
    return Promise.resolve();
  }
  pause() {
    this.paused = true;
  }
}

globalThis.Audio = MockAudio;

// Dynamic import audio module
const { audioEngine, isAudioPlaying, initAudio, playAudio, pauseAudio, toggleAudio } = await import('../src/audio.js');

assert.strictEqual(typeof audioEngine.init, 'function', 'audioEngine.init must be a function');
assert.strictEqual(typeof audioEngine.play, 'function', 'audioEngine.play must be a function');
assert.strictEqual(typeof audioEngine.pause, 'function', 'audioEngine.pause must be a function');
assert.strictEqual(typeof audioEngine.toggle, 'function', 'audioEngine.toggle must be a function');
assert.strictEqual(typeof audioEngine.isPlaying, 'function', 'audioEngine.isPlaying must be a function');

assert.strictEqual(isAudioPlaying(), false, 'Initial audio state must be not playing');

await playAudio();
assert.strictEqual(isAudioPlaying(), true, 'Audio state must be playing after playAudio()');

await pauseAudio();
assert.strictEqual(isAudioPlaying(), false, 'Audio state must be false after pauseAudio()');

const toggled = await toggleAudio();
assert.strictEqual(toggled, true, 'toggleAudio() must return true when started');
assert.strictEqual(isAudioPlaying(), true, 'Audio state must be playing after toggle');

console.log('✓ All audio.test.js tests passed successfully!');
