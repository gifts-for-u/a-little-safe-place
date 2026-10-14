/**
 * The Safe Place — Main Application Entry Point
 * Orchestrates UI controls, audio autoplay on room entry, and component bootstrapping.
 */

import { audioEngine } from './audio.js';
import { motionEngine } from './motion.js';
import { sceneManager } from './scene.js';
import { interactionsManager } from './interactions.js';
import { HOTSPOTS } from './content.js';

document.addEventListener('DOMContentLoaded', async () => {
  // 1. Load and inject SVG Icons sprite
  await loadSvgSprite();

  // 2. Initialize subsystems
  interactionsManager.init();
  motionEngine.init();
  sceneManager.init();
  audioEngine.init();

  // 3. Setup UI Element references
  const welcomeModal = document.getElementById('welcome-modal');
  const btnEnterRoom = document.getElementById('btn-enter-room');
  const btnAudioToggle = document.getElementById('btn-audio-toggle');
  const btnMotionToggle = document.getElementById('btn-motion-toggle');
  const btnRestCard = document.getElementById('btn-rest-card');

  // 4. Welcome Screen Enter Action (Autoplay on Entry)
  btnEnterRoom?.addEventListener('click', async () => {
    welcomeModal?.classList.add('dismissed');

    // Autoplay audio on user room-entry gesture
    const started = await audioEngine.play();
    updateAudioButtonUI(started);

    interactionsManager.showToast('Selamat datang di The Safe Place... 🌙✨', 3500);
  });

  // 5. Header Audio Toggle Button
  btnAudioToggle?.addEventListener('click', async () => {
    const isPlaying = await audioEngine.toggle();
    updateAudioButtonUI(isPlaying);
    interactionsManager.showToast(isPlaying ? 'Musik latar dinyalakan 🎵' : 'Musik latar disenyapkan 🔇');
  });

  // Listen to audio-state-change event
  window.addEventListener('audio-state-change', (e) => {
    updateAudioButtonUI(e.detail.isPlaying);
  });

  function updateAudioButtonUI(playing) {
    if (!btnAudioToggle) return;
    btnAudioToggle.setAttribute('aria-pressed', playing ? 'true' : 'false');
    const label = btnAudioToggle.querySelector('.chip-label');
    const iconUse = btnAudioToggle.querySelector('use');

    if (playing) {
      if (label) label.textContent = 'Musik: Hidup';
      if (iconUse) iconUse.setAttribute('href', '#icon-sound-on');
      btnAudioToggle.setAttribute('aria-label', 'Senyapkan suara musik latar');
    } else {
      if (label) label.textContent = 'Musik: Mati';
      if (iconUse) iconUse.setAttribute('href', '#icon-sound-off');
      btnAudioToggle.setAttribute('aria-label', 'Nyalakan suara musik latar');
    }
  }

  // 6. Header Motion / Gyro Toggle Button
  btnMotionToggle?.addEventListener('click', async () => {
    const isActive = await motionEngine.toggleGyro();
    updateMotionButtonUI(isActive);
    if (isActive) {
      interactionsManager.showToast('Efek gerak sensor giroskop aktif ✨');
    } else {
      interactionsManager.showToast('Mode gerak otomatis / pointer aktif 🧭');
    }
  });

  window.addEventListener('gyro-state-change', (e) => {
    updateMotionButtonUI(e.detail.isGyroActive);
  });

  function updateMotionButtonUI(active) {
    if (!btnMotionToggle) return;
    btnMotionToggle.setAttribute('aria-pressed', active ? 'true' : 'false');
    const label = btnMotionToggle.querySelector('.chip-label');
    if (label) {
      label.textContent = active ? 'Gerak: Gyro' : 'Efek Gerak';
    }
  }

  // 7. Header Rest Card Button
  btnRestCard?.addEventListener('click', () => {
    interactionsManager.openRestCard(btnRestCard);
  });

  // 8. Bind the 5 Hotspot Buttons
  HOTSPOTS.forEach((hotspot) => {
    const btn = document.getElementById(`hotspot-${hotspot.id}`);
    if (btn) {
      btn.addEventListener('click', () => {
        interactionsManager.openModal(hotspot.id, btn);
      });
    }
  });

  console.log('✨ The Safe Place initialized successfully.');
});

/**
 * Loads external SVG sprite and injects it into the DOM
 */
async function loadSvgSprite() {
  const container = document.getElementById('svg-sprite-container');
  if (!container) return;

  try {
    const res = await fetch('./assets/ui/icons.svg');
    if (res.ok) {
      const svgText = await res.text();
      container.innerHTML = svgText;
    }
  } catch (err) {
    console.warn('Could not load icons.svg, inline fallbacks may apply:', err);
  }
}
