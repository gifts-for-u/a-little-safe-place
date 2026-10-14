/**
 * The Safe Place — Motion & Multi-Tier Parallax Engine
 * Coordinates gyroscope, mouse pointer, ambient breathing, and reduced-motion modes.
 */

export function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

export function lerp(start, end, factor) {
  return start + (end - start) * factor;
}

/**
 * Normalizes device orientation angles (gamma & beta) to [-1.0, 1.0].
 * Standard reading: gamma (roll left/right: -15 to +15), beta (pitch up/down: 30 to 60 sitting tilt)
 */
export function normalizeOrientation(gamma, beta) {
  const MAX_TILT = 15;
  // Gamma: roll
  const clampedGamma = clamp(gamma || 0, -MAX_TILT, MAX_TILT);
  const normX = clampedGamma / MAX_TILT;

  // Beta: pitch (typical holding angle ~45 deg, normalize delta)
  const neutralBeta = 45;
  const deltaBeta = (beta !== null && beta !== undefined ? beta : neutralBeta) - neutralBeta;
  const clampedBeta = clamp(deltaBeta, -MAX_TILT, MAX_TILT);
  const normY = clampedBeta / MAX_TILT;

  return { x: normX, y: normY };
}

class MotionEngine {
  constructor() {
    this.targetX = 0;
    this.targetY = 0;
    this.currentX = 0;
    this.currentY = 0;

    this.isGyroActive = false;
    this.isReducedMotion = false;
    this.hasPointerMoved = false;

    this.listeners = new Set();
    this.animFrameId = null;
    this.isRunning = false;

    this._onPointerMove = this._onPointerMove.bind(this);
    this._onDeviceOrientation = this._onDeviceOrientation.bind(this);
    this._onVisibilityChange = this._onVisibilityChange.bind(this);
    this._loop = this._loop.bind(this);
  }

  init() {
    if (typeof window === 'undefined') return;

    // Detect prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.isReducedMotion = mediaQuery.matches;
    mediaQuery.addEventListener?.('change', (e) => {
      this.isReducedMotion = e.matches;
      if (this.isReducedMotion) {
        this.targetX = 0;
        this.targetY = 0;
        this.currentX = 0;
        this.currentY = 0;
      }
    });

    // Listen to mouse pointer tracking
    window.addEventListener('pointermove', this._onPointerMove, { passive: true });
    document.addEventListener('visibilitychange', this._onVisibilityChange);

    this.start();
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.animFrameId = window.requestAnimationFrame(this._loop);
  }

  stop() {
    this.isRunning = false;
    if (this.animFrameId) {
      window.cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
  }

  /**
   * Request Gyroscope permission (required on iOS 13+)
   */
  async requestGyroPermission() {
    if (typeof window === 'undefined') return false;

    if (
      typeof window.DeviceOrientationEvent !== 'undefined' &&
      typeof window.DeviceOrientationEvent.requestPermission === 'function'
    ) {
      try {
        const permissionState = await window.DeviceOrientationEvent.requestPermission();
        if (permissionState === 'granted') {
          this.enableGyro();
          return true;
        } else {
          console.warn('DeviceOrientation permission was denied.');
          this.disableGyro();
          return false;
        }
      } catch (err) {
        console.warn('Error requesting DeviceOrientation permission:', err);
        this.disableGyro();
        return false;
      }
    } else if ('ondeviceorientation' in window) {
      // Android and standard browsers without explicit prompt
      this.enableGyro();
      return true;
    } else {
      console.warn('Device orientation is not supported on this device.');
      return false;
    }
  }

  enableGyro() {
    if (typeof window === 'undefined') return;
    window.addEventListener('deviceorientation', this._onDeviceOrientation, { passive: true });
    this.isGyroActive = true;
    this._dispatchStateChange();
  }

  disableGyro() {
    if (typeof window === 'undefined') return;
    window.removeEventListener('deviceorientation', this._onDeviceOrientation);
    this.isGyroActive = false;
    this._dispatchStateChange();
  }

  async toggleGyro() {
    if (this.isGyroActive) {
      this.disableGyro();
      return false;
    } else {
      return await this.requestGyroPermission();
    }
  }

  _onPointerMove(e) {
    if (this.isReducedMotion || this.isGyroActive) return;
    this.hasPointerMoved = true;

    const width = window.innerWidth || 1;
    const height = window.innerHeight || 1;

    // Normalized to [-1.0, 1.0] from screen center
    const x = (e.clientX - width / 2) / (width / 2);
    const y = (e.clientY - height / 2) / (height / 2);

    this.targetX = clamp(x, -1, 1);
    this.targetY = clamp(y, -1, 1);
  }

  _onDeviceOrientation(e) {
    if (this.isReducedMotion || !this.isGyroActive) return;
    const { x, y } = normalizeOrientation(e.gamma, e.beta);
    this.targetX = x;
    this.targetY = y;
  }

  _onVisibilityChange() {
    if (document.hidden) {
      this.stop();
    } else {
      this.start();
    }
  }

  _loop(timestamp) {
    if (!this.isRunning) return;

    if (this.isReducedMotion) {
      this.currentX = 0;
      this.currentY = 0;
    } else {
      // If gyro is off and mouse is idle, apply gentle ambient breathing drift
      if (!this.isGyroActive && !this.hasPointerMoved) {
        this.targetX = Math.sin(timestamp * 0.0006) * 0.25;
        this.targetY = Math.cos(timestamp * 0.0008) * 0.2;
      }

      // Smooth LERP interpolation
      this.currentX = lerp(this.currentX, this.targetX, 0.08);
      this.currentY = lerp(this.currentY, this.targetY, 0.08);
    }

    // Notify all subscribers
    const state = {
      x: this.currentX,
      y: this.currentY,
      targetX: this.targetX,
      targetY: this.targetY,
      isGyroActive: this.isGyroActive,
      isReducedMotion: this.isReducedMotion
    };

    for (const callback of this.listeners) {
      try {
        callback(state);
      } catch (err) {
        console.error('Error in motion subscriber:', err);
      }
    }

    this.animFrameId = window.requestAnimationFrame(this._loop);
  }

  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  _dispatchStateChange() {
    if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
      window.dispatchEvent(new CustomEvent('gyro-state-change', {
        detail: { isGyroActive: this.isGyroActive }
      }));
    }
  }

  destroy() {
    this.stop();
    this.disableGyro();
    if (typeof window !== 'undefined') {
      window.removeEventListener('pointermove', this._onPointerMove);
      document.removeEventListener('visibilitychange', this._onVisibilityChange);
    }
    this.listeners.clear();
  }
}

export const motionEngine = new MotionEngine();
export default motionEngine;
