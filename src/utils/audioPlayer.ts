// Web Audio API romantic wedding piano melody player

class WeddingAudioPlayer {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private currentLoopTimer: number | null = null;
  private volume: number = 0.25;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Frequency mapping for romantic notes
  private noteToFreq(note: string): number {
    const notes: Record<string, number> = {
      'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23, 'G4': 392.00, 'A4': 440.00, 'B4': 493.88,
      'C5': 523.25, 'D5': 587.33, 'E5': 659.25, 'F5': 698.46, 'G5': 783.99, 'A5': 880.00, 'B5': 987.77,
      'C3': 130.81, 'G3': 196.00, 'A3': 220.00, 'F3': 174.61, 'E3': 164.81,
    };
    return notes[note] || 440;
  }

  private playTone(freq: number, startTime: number, duration: number, gainValue = 0.15) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();

    // Soft warm bell/piano harmonic tone
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, startTime);

    // Warm envelope
    gainNode.gain.setValueAtTime(0.0001, startTime);
    gainNode.gain.linearRampToValueAtTime(gainValue * this.volume, startTime + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(gainNode);
    gainNode.connect(this.ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + duration);
  }

  public playWeddingMelody() {
    this.initContext();
    if (!this.ctx) return;
    this.stop();
    this.isPlaying = true;

    // A sweet romantic melodic motif inspired by Canon in D / Romantic Wedding Piano
    const melody: Array<{ note: string; bass?: string; duration: number }> = [
      { note: 'F5', bass: 'F3', duration: 0.9 },
      { note: 'E5', duration: 0.45 },
      { note: 'D5', bass: 'D4', duration: 0.9 },
      { note: 'C5', duration: 0.45 },
      { note: 'B4', bass: 'G3', duration: 0.9 },
      { note: 'C5', duration: 0.45 },
      { note: 'A4', bass: 'A3', duration: 1.2 },

      { note: 'F4', bass: 'F3', duration: 0.9 },
      { note: 'G4', duration: 0.45 },
      { note: 'A4', bass: 'C4', duration: 0.9 },
      { note: 'C5', duration: 0.45 },
      { note: 'G4', bass: 'G3', duration: 1.4 },

      { note: 'A4', bass: 'A3', duration: 0.9 },
      { note: 'B4', duration: 0.45 },
      { note: 'C5', bass: 'C4', duration: 0.9 },
      { note: 'E5', duration: 0.45 },
      { note: 'D5', bass: 'F3', duration: 1.4 },
      { note: 'C5', bass: 'C3', duration: 1.8 },
    ];

    const playSequence = () => {
      if (!this.isPlaying || !this.ctx) return;
      let now = this.ctx.currentTime + 0.1;
      let totalDuration = 0;

      melody.forEach(item => {
        const freq = this.noteToFreq(item.note);
        this.playTone(freq, now, item.duration, 0.22);

        if (item.bass) {
          const bassFreq = this.noteToFreq(item.bass);
          this.playTone(bassFreq, now, item.duration * 1.5, 0.16);
        }

        const step = item.duration * 0.85;
        now += step;
        totalDuration += step;
      });

      // Loop after completion
      this.currentLoopTimer = window.setTimeout(() => {
        if (this.isPlaying) {
          playSequence();
        }
      }, (totalDuration + 1.2) * 1000);
    };

    playSequence();
  }

  public stop() {
    this.isPlaying = false;
    if (this.currentLoopTimer) {
      clearTimeout(this.currentLoopTimer);
      this.currentLoopTimer = null;
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.playWeddingMelody();
      return true;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }
}

export const weddingAudio = new WeddingAudioPlayer();
