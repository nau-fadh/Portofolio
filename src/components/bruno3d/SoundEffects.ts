'use client';

class SoundManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private engineOsc: OscillatorNode | null = null;
  private engineGain: GainNode | null = null;
  private initialized: boolean = false;

  constructor() {
    // AudioContext will be initialized on first user interaction
  }

  public init() {
    if (this.initialized) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();

      // Create continuous engine humming oscillator
      this.engineOsc = this.ctx.createOscillator();
      this.engineGain = this.ctx.createGain();

      this.engineOsc.type = 'triangle';
      this.engineOsc.frequency.setValueAtTime(45, this.ctx.currentTime);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(220, this.ctx.currentTime);

      this.engineGain.gain.setValueAtTime(0, this.ctx.currentTime);

      this.engineOsc.connect(filter);
      filter.connect(this.engineGain);
      this.engineGain.connect(this.ctx.destination);

      this.engineOsc.start();
      this.initialized = true;
    } catch (e) {
      console.warn('AudioContext not supported or restricted', e);
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.engineGain && this.ctx) {
      if (this.isMuted) {
        this.engineGain.gain.setValueAtTime(0, this.ctx.currentTime);
      }
    }
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public updateEngine(speedNormalized: number, isAccelerating: boolean) {
    if (!this.initialized || !this.ctx || !this.engineOsc || !this.engineGain || this.isMuted) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    const targetFreq = 45 + Math.min(speedNormalized, 1.5) * 85 + (isAccelerating ? 20 : 0);
    this.engineOsc.frequency.setTargetAtTime(targetFreq, this.ctx.currentTime, 0.08);

    const targetGain = 0.03 + (isAccelerating ? 0.05 : 0) + Math.min(speedNormalized, 1.2) * 0.04;
    this.engineGain.gain.setTargetAtTime(targetGain, this.ctx.currentTime, 0.1);
  }

  public playHorn() {
    if (!this.initialized || !this.ctx || this.isMuted) {
      this.init();
      if (!this.ctx || this.isMuted) return;
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    const t = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = 'sawtooth';
    osc2.type = 'sawtooth';

    // Pleasant dual-tone two-frequency car horn (F#4 and A#4)
    osc1.frequency.setValueAtTime(370, t);
    osc2.frequency.setValueAtTime(466, t);

    gain.gain.setValueAtTime(0.08, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.ctx.destination);

    osc1.start(t);
    osc2.start(t);
    osc1.stop(t + 0.36);
    osc2.stop(t + 0.36);
  }

  public playHit(intensity: number = 1) {
    if (!this.initialized || !this.ctx || this.isMuted) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    const startFreq = 160 + Math.random() * 40;
    osc.frequency.setValueAtTime(startFreq, t);
    osc.frequency.exponentialRampToValueAtTime(30, t + 0.15);

    const vol = Math.min(0.12, Math.max(0.02, 0.05 * intensity));
    gain.gain.setValueAtTime(vol, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.16);
  }

  public playZoneChime() {
    if (!this.initialized || !this.ctx || this.isMuted) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();

    const t = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
    notes.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t + idx * 0.08);

      gain.gain.setValueAtTime(0.05, t + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.08 + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t + idx * 0.08);
      osc.stop(t + idx * 0.08 + 0.26);
    });
  }
}

export const sounds = new SoundManager();
