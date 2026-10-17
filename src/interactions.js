/**
 * The Safe Place — Interactions & Dialog Modal System
 * Manages modal display, keyboard focus trapping, and object micro-interactions.
 */

import { HOTSPOTS, MESSAGES, REST_CARD_COPY } from './content.js';

let modalBackdrop = null;
let modalContainer = null;
let modalTitle = null;
let modalSubtitle = null;
let modalBody = null;
let modalBadge = null;
let modalBtnAction = null;
let modalBtnActionText = null;
let modalBtnClose = null;
let modalBtnBack = null;
let toastElement = null;

let lastFocusedElement = null;
let currentOpenId = null;
let isLampWarm = true;

/**
 * Initializes DOM references and events for modals.
 */
export function initInteractions() {
  if (typeof document === 'undefined') return;

  modalBackdrop = document.getElementById('modal-backdrop');
  modalContainer = document.getElementById('modal-container');
  modalTitle = document.getElementById('modal-title');
  modalSubtitle = document.getElementById('modal-subtitle');
  modalBody = document.getElementById('modal-body');
  modalBadge = document.getElementById('modal-badge');
  modalBtnAction = document.getElementById('modal-btn-action');
  modalBtnActionText = document.getElementById('modal-btn-action-text');
  modalBtnClose = document.getElementById('modal-btn-close');
  modalBtnBack = document.getElementById('modal-btn-back');
  toastElement = document.getElementById('toast');

  // Close buttons
  modalBtnClose?.addEventListener('click', closeModal);
  modalBtnBack?.addEventListener('click', closeModal);

  // Click on backdrop outside dialog closes modal
  modalBackdrop?.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      closeModal();
    }
  });

  // Action button click
  modalBtnAction?.addEventListener('click', () => {
    handleActionClick(currentOpenId);
  });

  // Global ESC key listener
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isModalOpen()) {
      closeModal();
    }
  });
}

/**
 * Opens a modal dialog for a given hotspot object ID.
 */
export function openModal(id, triggerElement = null) {
  if (!modalBackdrop || !modalContainer) return;

  lastFocusedElement = triggerElement || document.activeElement;
  currentOpenId = id;

  const hotspot = HOTSPOTS.find((h) => h.id === id);
  const msg = MESSAGES[id];

  if (!msg) {
    console.warn(`No message found for hotspot id: ${id}`);
    return;
  }

  pulseObjectSprite(id);

  // Setup header
  if (modalBadge) modalBadge.textContent = hotspot ? hotspot.label : 'The Safe Place';
  if (modalTitle) modalTitle.textContent = msg.title;
  if (modalSubtitle) modalSubtitle.textContent = msg.subtitle || '';
  if (modalBody) modalBody.textContent = msg.body;

  // Modal type styling distinction
  modalContainer.classList.remove('is-rest');
  if (id === 'letter') {
    modalContainer.classList.add('is-letter');
  } else {
    modalContainer.classList.remove('is-letter');
  }

  // Action Button config (Letter never has action button)
  if (hotspot && hotspot.actionLabel && id !== 'letter') {
    modalBtnAction.hidden = false;
    modalBtnAction.style.display = '';
    modalBtnActionText.textContent = hotspot.actionLabel;
  } else {
    modalBtnAction.hidden = true;
    modalBtnAction.style.display = 'none';
  }

  // Show Modal
  modalBackdrop.hidden = false;
  // Trigger reflow for transition
  void modalBackdrop.offsetWidth;
  modalBackdrop.classList.add('active');

  if (triggerElement) {
    triggerElement.setAttribute('aria-expanded', 'true');
  }

  // Shift focus to close button for keyboard accessibility without scrolling
  setTimeout(() => {
    try {
      modalBtnClose?.focus({ preventScroll: true });
    } catch (err) {
      modalBtnClose?.focus();
    }
  }, 100);
}

/**
 * Opens the special closing rest note.
 */
export function openRestCard(triggerElement = null) {
  if (!modalBackdrop || !modalContainer) return;

  lastFocusedElement = triggerElement || document.activeElement;
  currentOpenId = 'rest';

  if (modalBadge) modalBadge.textContent = 'Istirahat Malam';
  if (modalTitle) modalTitle.textContent = REST_CARD_COPY.title;
  if (modalSubtitle) modalSubtitle.textContent = REST_CARD_COPY.subtitle;
  if (modalBody) modalBody.textContent = REST_CARD_COPY.body;

  modalContainer.classList.remove('is-letter');
  modalContainer.classList.add('is-rest');
  if (modalBtnAction) {
    modalBtnAction.hidden = true;
    modalBtnAction.style.display = 'none';
  }

  modalBackdrop.hidden = false;
  void modalBackdrop.offsetWidth;
  modalBackdrop.classList.add('active');

  setTimeout(() => {
    try {
      modalBtnClose?.focus({ preventScroll: true });
    } catch (err) {
      modalBtnClose?.focus();
    }
  }, 100);
}

/**
 * Closes the modal and returns focus to the trigger.
 */
export function closeModal() {
  if (!modalBackdrop) return;

  modalBackdrop.classList.remove('active');

  setTimeout(() => {
    modalBackdrop.hidden = true;
    modalContainer?.classList.remove('is-letter', 'is-rest');
    if (modalBtnAction) {
      modalBtnAction.hidden = true;
      modalBtnAction.style.display = 'none';
    }

    if (currentOpenId) {
      const btn = document.getElementById(`hotspot-${currentOpenId}`);
      if (btn) btn.setAttribute('aria-expanded', 'false');
    }

    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      try {
        lastFocusedElement.focus({ preventScroll: true });
      } catch (err) {
        lastFocusedElement.focus();
      }
    }

    // Force viewport to top-left (prevent browser auto-scrolling window horizontally on mobile)
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
      if (document.documentElement) document.documentElement.scrollLeft = 0;
      if (document.body) document.body.scrollLeft = 0;
      const vp = document.querySelector('.viewport-container');
      if (vp) vp.scrollLeft = 0;
    }

    currentOpenId = null;
  }, 250);
}

export function isModalOpen() {
  return modalBackdrop && !modalBackdrop.hidden && modalBackdrop.classList.contains('active');
}

/**
 * Plays a subtle bounce/lift animation on the separated object sprite when activated
 */
function pulseObjectSprite(id) {
  const map = {
    bed: 'obj-bed-wrap',
    letter: 'obj-letter-wrap',
    plush: 'stitch-companion',
    laptop: 'obj-laptop-wrap',
    lamp: 'obj-lamp-wrap'
  };
  const el = document.getElementById(map[id]);
  if (!el) return;
  el.classList.add('is-interacting');
  setTimeout(() => {
    el.classList.remove('is-interacting');
  }, 650);
}

/**
 * Object Micro-Interactions
 */
function handleActionClick(id) {
  switch (id) {
    case 'bed':
      triggerBedAction();
      break;
    case 'plush':
      triggerPlushAction();
      break;
    case 'laptop':
      triggerLaptopAction();
      break;
    case 'lamp':
      toggleLamp();
      break;
    default:
      break;
  }
}

export function triggerBedAction() {
  const blanket = document.getElementById('blanket-warmth');
  pulseObjectSprite('bed');
  if (blanket) {
    blanket.classList.add('active');
    setTimeout(() => {
      blanket.classList.remove('active');
    }, 4500);
  }
  showToast('Selimut hangat membalutmu... selamat istirahat sayang 🛏️✨');
  closeModal();
}

export function triggerPlushAction() {
  const stitch = document.getElementById('stitch-companion');
  const burst = document.getElementById('plush-heart-burst');

  if (stitch) {
    stitch.style.transform = 'translate(-50%, -50%) scale(1.15)';
    setTimeout(() => {
      stitch.style.transform = '';
    }, 500);
  }

  if (burst) {
    burst.innerHTML = '💖';
    burst.classList.remove('animate');
    void burst.offsetWidth;
    burst.classList.add('animate');
  }

  showToast('*memeluk boneka Stitch erat-erat* Kamu nggak sendirian 💕');
  closeModal();
}

export function triggerLaptopAction() {
  const laptop = document.getElementById('obj-laptop-wrap');
  if (laptop) {
    laptop.classList.add('is-closed');
    setTimeout(() => {
      laptop.classList.remove('is-closed');
    }, 6000);
  }
  showToast('Kerjaan sudah ditutup & boleh menunggu besok. Kamu prioritas sekarang 💻💤');
  closeModal();
}

export function toggleLamp() {
  const stage = document.querySelector('.scene-stage');
  const lampBloom = document.getElementById('lamp-bloom');
  isLampWarm = !isLampWarm;

  if (stage) {
    if (isLampWarm) {
      stage.classList.remove('is-dimmed');
    } else {
      stage.classList.add('is-dimmed');
    }
  }

  if (lampBloom) {
    if (isLampWarm) {
      lampBloom.classList.remove('dimmed');
      showToast('Lampu kembali dinyalakan, sudut kamarmu kembali hangat 💡✨');
    } else {
      lampBloom.classList.add('dimmed');
      showToast('Cahaya kamar diredupkan agar suasana lebih tenang dan rileks 🌙');
    }
  }
  closeModal();
}

/**
 * Floating feedback toast
 */
export function showToast(message, duration = 3200) {
  if (!toastElement) return;

  toastElement.textContent = message;
  toastElement.hidden = false;
  toastElement.style.opacity = '1';

  clearTimeout(toastElement._timer);
  toastElement._timer = setTimeout(() => {
    toastElement.style.opacity = '0';
    setTimeout(() => {
      toastElement.hidden = true;
    }, 300);
  }, duration);
}

export const interactionsManager = {
  init: initInteractions,
  openModal,
  openRestCard,
  closeModal,
  isModalOpen,
  triggerBedAction,
  triggerPlushAction,
  triggerLaptopAction,
  toggleLamp,
  showToast
};

export default interactionsManager;
