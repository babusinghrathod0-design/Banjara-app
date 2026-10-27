/**
 * Web Audio and Speech Synthesis for authentic Banjara devotional and folk melodies
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isPlayingDrone: boolean = false;
  private droneOscillators: OscillatorNode[] = [];
  private gainNode: GainNode | null = null;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play a soft devotional tanpura drone (Sa-Pa harmonic chord)
  public toggleDevotionalDrone(onStateChange?: (playing: boolean) => void) {
    this.initCtx();
    if (!this.ctx) return false;

    if (this.isPlayingDrone) {
      this.stopDrone();
      onStateChange?.(false);
      return false;
    }

    try {
      this.isPlayingDrone = true;
      const now = this.ctx.currentTime;
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.01, now);
      this.gainNode.gain.exponentialRampToValueAtTime(0.12, now + 1.5);
      this.gainNode.connect(this.ctx.destination);

      // Frequencies for C# Tanpura: C#3 (138.59 Hz), G#3 (207.65 Hz), C#4 (277.18 Hz)
      const freqs = [138.59, 207.65, 277.18, 415.3];
      this.droneOscillators = freqs.map((f, i) => {
        const osc = this.ctx!.createOscillator();
        osc.type = i % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(f, now);
        // Add subtle vibrato
        const lfo = this.ctx!.createOscillator();
        const lfoGain = this.ctx!.createGain();
        lfo.frequency.value = 0.2 + i * 0.1;
        lfoGain.gain.value = 1.2;
        lfo.connect(osc.frequency);
        lfo.start();

        osc.connect(this.gainNode!);
        osc.start();
        return osc;
      });

      onStateChange?.(true);
      return true;
    } catch {
      this.isPlayingDrone = false;
      onStateChange?.(false);
      return false;
    }
  }

  public stopDrone() {
    if (this.gainNode && this.ctx) {
      const now = this.ctx.currentTime;
      this.gainNode.gain.linearRampToValueAtTime(0.001, now + 0.8);
      setTimeout(() => {
        this.droneOscillators.forEach((osc) => {
          try {
            osc.stop();
            osc.disconnect();
          } catch {
            // ignore
          }
        });
        this.droneOscillators = [];
        this.isPlayingDrone = false;
      }, 800);
    } else {
      this.isPlayingDrone = false;
    }
  }

  public isDroneActive() {
    return this.isPlayingDrone;
  }

  // Play pleasant click / tap chime
  public playChime(freq = 587.33) {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + 0.1);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.35);
    } catch {
      // Audio not permitted yet
    }
  }

  // Play traditional Dholak / Nagada beat sound
  public playDholBeat() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Low punch (Bass)
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.18);

      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.26);

      // High slap (Treble)
      setTimeout(() => {
        if (!this.ctx) return;
        const now2 = this.ctx.currentTime;
        const osc2 = this.ctx.createOscillator();
        const gain2 = this.ctx.createGain();
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(480, now2);
        osc2.frequency.exponentialRampToValueAtTime(120, now2 + 0.08);

        gain2.gain.setValueAtTime(0.25, now2);
        gain2.gain.exponentialRampToValueAtTime(0.001, now2 + 0.12);

        osc2.connect(gain2);
        gain2.connect(this.ctx.destination);

        osc2.start(now2);
        osc2.stop(now2 + 0.14);
      }, 70);
    } catch {
      // ignore
    }
  }

  // Pronounce word using Web Speech Synthesis
  public speak(text: string) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/\(.*?\)/g, '').trim();
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'hi-IN';
    utterance.rate = 0.9;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const hindiVoice = voices.find((v) => v.lang.includes('hi') || v.lang.includes('IN'));
    if (hindiVoice) {
      utterance.voice = hindiVoice;
    }

    window.speechSynthesis.speak(utterance);
  }
}

export const soundEngine = new SoundEngine();
