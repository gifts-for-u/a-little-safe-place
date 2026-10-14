/**
 * The Safe Place — Audio Engine Module
 * Manages background music ("Always With Me" - Ghibli) and procedural ambient rain.
 */

const AUDIO_PATH = './assets/sounds/always with me-ghibli.mp3';

let audioElement = null;
let audioContext = null;
let rainNode = null;
let rainGain = null;
let musicGain = null;
let isPlaying = false;
let isInitialized = false;

/**
 * Initializes the audio subsystem and loads the audio track.
 */
export function initAudio() {
  if (isInitialized) return audioElement;

  if (typeof globalThis.Audio !== 'undefined') {
    audioElement = new globalThis.Audio(AUDIO_PATH);
    audioElement.loop = true;
    audioElement.volume = 0.75;
  }

  isInitialized = true;
  return audioElement;
}

/**
 * Procedural rain noise generator using Web Audio API
 */
function setupRainSynth() {
  if (rainNode) return;
  const AudioCtx = globalThis.AudioContext || globalThis.webkitAudioContext;
  if (!AudioCtx) return;

  try {
    if (!audioContext) {
      audioContext = new AudioCtx();
    }
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }

    const bufferSize = audioContext.sampleRate * 2;
    const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    // Pink noise generation for natural rain texture
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
      b6 = white * 0.115926;
    }

    const whiteNoise = audioContext.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Filter to simulate sound of rain on glass window
    const filter = audioContext.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 1200;

    rainGain = audioContext.createGain();
    rainGain.gain.setValueAtTime(0.001, audioContext.currentTime);

    whiteNoise.connect(filter);
    filter.connect(rainGain);
    rainGain.connect(audioContext.destination);

    whiteNoise.start(0);
    rainNode = whiteNoise;
  } catch (err) {
    console.warn('Web Audio rain synth not supported or blocked:', err);
  }
}

/**
 * Starts audio playback with smooth fade-in.
 */
export async function playAudio() {
  if (!isInitialized) {
    initAudio();
  }

  try {
    if (audioElement && audioElement.paused) {
      audioElement.currentTime = audioElement.currentTime || 0;
      audioElement.volume = 0.75;
      await audioElement.play();
    }

    setupRainSynth();
    if (rainGain && audioContext) {
      rainGain.gain.cancelScheduledValues(audioContext.currentTime);
      rainGain.gain.setTargetAtTime(0.18, audioContext.currentTime, 0.4);
    }

    isPlaying = true;
    dispatchAudioStateEvent(true);
    return true;
  } catch (error) {
    console.warn('Audio playback could not start automatically:', error);
    isPlaying = false;
    dispatchAudioStateEvent(false);
    return false;
  }
}

/**
 * Pauses audio playback with smooth fade-out.
 */
export async function pauseAudio() {
  if (audioElement && !audioElement.paused) {
    audioElement.pause();
  }

  if (rainGain && audioContext) {
    try {
      rainGain.gain.cancelScheduledValues(audioContext.currentTime);
      rainGain.gain.setTargetAtTime(0.0001, audioContext.currentTime, 0.2);
    } catch (_) {}
  }

  isPlaying = false;
  dispatchAudioStateEvent(false);
  return false;
}

/**
 * Toggles play / pause state.
 */
export async function toggleAudio() {
  if (isPlaying) {
    return await pauseAudio();
  } else {
    return await playAudio();
  }
}

/**
 * Returns current playing status.
 */
export function isAudioPlaying() {
  return isPlaying;
}

/**
 * Dispatches an event on window so UI buttons can react.
 */
function dispatchAudioStateEvent(playing) {
  if (typeof globalThis.dispatchEvent === 'function' && typeof globalThis.CustomEvent === 'function') {
    globalThis.dispatchEvent(new globalThis.CustomEvent('audio-state-change', {
      detail: { isPlaying: playing }
    }));
  }
}

export const audioEngine = {
  init: initAudio,
  play: playAudio,
  pause: pauseAudio,
  toggle: toggleAudio,
  isPlaying: isAudioPlaying
};

export default audioEngine;
