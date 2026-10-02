'use client';

class SoundManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private isMusicEnabled: boolean = true;
  private engineOsc: OscillatorNode | null = null;
  private engineGain: GainNode | null = null;
  private musicGain: GainNode | null = null;
  private initialized: boolean = false;
  private musicTimer: any = null;
  private musicStep: number = 0;

  constructor() {}

  public init() {
    if (this.initialized) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();

      // 1. Engine Sound Nodes
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

      // 2. Music Master Gain Node
      this.musicGain = this.ctx.createGain();
      this.musicGain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      this.musicGain.connect(this.ctx.destination);

      this.initialized = true;

      // Start relaxing lofi background music
      if (this.isMusicEnabled) {
        this.startBGM();
      }
    } catch (e) {
      console.warn('AudioContext not supported or restricted', e);
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.engineGain && this.ctx) {
      this.engineGain.gain.setValueAtTime(this.isMuted ? 0 : 0.03, this.ctx.currentTime);
    }
    if (this.musicGain && this.ctx) {
      this.musicGain.gain.setValueAtTime(this.isMuted ? 0 : 0.04, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public toggleMusic(): boolean {
    this.isMusicEnabled = !this.isMusicEnabled;
    if (this.musicGain && this.ctx) {
      this.musicGain.gain.setValueAtTime(this.isMusicEnabled && !this.isMuted ? 0.04 : 0, this.ctx.currentTime);
    }
    return this.isMusicEnabled;
  }

  public getIsMusicEnabled(): boolean {
    return this.isMusicEnabled;
  }

  // -------------------------------------------------------------
  // PROCEDURAL LOFI CHILL BACKGROUND MUSIC
  // -------------------------------------------------------------
  private startBGM() {
    if (this.musicTimer || !this.ctx || !this.musicGain) return;

    // Pleasant relaxing chords: Fmaj7 -> G6 -> Em7 -> Am7
    const chords = [
      [174.61, 220.00, 261.63, 329.63], // Fmaj7 (F3, A3, C4, E4)
      [196.00, 246.94, 293.66, 329.63], // G6 (G3, B3, D4, E4)
      [164.81, 196.00, 246.94, 293.66], // Em7 (E3, G3, B3, D4)
      [220.00, 261.63, 329.63, 392.00], // Am7 (A3, C4, E4, G4)
    ];

    const playNextBar = () => {
      if (!this.ctx || !this.musicGain || !this.isMusicEnabled || this.isMuted) {
        this.musicTimer = setTimeout(playNextBar, 2000);
        return;
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      const chord = chords[this.musicStep % chords.length];
      const now = this.ctx.currentTime;

      // Play soft warm chord notes
      chord.forEach((freq, i) => {
        if (!this.ctx || !this.musicGain) return;
        const osc = this.ctx.createOscillator();
        const noteGain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = i === 0 ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.05);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(380 + Math.random() * 80, now);

        noteGain.gain.setValueAtTime(0, now + i * 0.05);
        noteGain.gain.linearRampToValueAtTime(0.015, now + i * 0.05 + 0.3);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.4);

        osc.connect(filter);
        filter.connect(noteGain);
        noteGain.connect(this.musicGain);

        osc.start(now + i * 0.05);
        osc.stop(now + 2.5);
      });

      this.musicStep++;
      this.musicTimer = setTimeout(playNextBar, 2400); // 2.4s per bar (~100 BPM slow vibe)
    };

    playNextBar();
  }

  public updateEngine(speedNormalized: number, isAccelerating: boolean) {
    if (!this.initialized || !this.ctx || !this.engineOsc || !this.engineGain || this.isMuted) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    const targetFreq = 45 + Math.min(speedNormalized, 1.5) * 85 + (isAccelerating ? 20 : 0);
    this.engineOsc.frequency.setTargetAtTime(targetFreq, this.ctx.currentTime, 0.08);

    const targetGain = 0.02 + (isAccelerating ? 0.04 : 0) + Math.min(speedNormalized, 1.2) * 0.03;
    this.engineGain.gain.setTargetAtTime(targetGain, this.ctx.currentTime, 0.1);
  }

  public playHorn() {
    if (!this.initialized || !this.ctx || this.isMuted) {
      this.init();
      if (!this.ctx || this.isMuted) return;
    }
    if (this.ctx.state === 'suspended') this.ctx.resume();

    const t = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = 'sawtooth';
    osc2.type = 'sawtooth';
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
    osc.frequency.setValueAtTime(160 + Math.random() * 40, t);
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
