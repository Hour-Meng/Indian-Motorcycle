import React, { useState, useRef } from 'react';
import { VolumeX, Play, Flame } from 'lucide-react';

export function AudioEngineRev() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [rpm, setRpm] = useState(1200);
  const [selectedExhaust, setSelectedExhaust] = useState<'stock' | 'stage1' | 'straight'>('stage1');
  const audioCtxRef = useRef<AudioContext | null>(null);
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);

  const startAudio = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      // V-Twin characteristic uneven lope pulse
      osc1.type = 'sawtooth';
      osc2.type = 'triangle';

      const baseFreq = rpm / 60; // fundamental Hz
      osc1.frequency.setValueAtTime(baseFreq * 1.5, ctx.currentTime);
      osc2.frequency.setValueAtTime(baseFreq * 0.75, ctx.currentTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(selectedExhaust === 'stage1' ? 480 : selectedExhaust === 'straight' ? 850 : 320, ctx.currentTime);
      filter.Q.setValueAtTime(selectedExhaust === 'stage1' ? 4 : 2, ctx.currentTime);

      gain.gain.setValueAtTime(0.2, ctx.currentTime);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();

      osc1Ref.current = osc1;
      osc2Ref.current = osc2;
      gainNodeRef.current = gain;
      filterRef.current = filter;

      setIsPlaying(true);
    } catch {
      console.log('Web Audio not supported');
    }
  };

  const stopAudio = () => {
    if (audioCtxRef.current) {
      audioCtxRef.current.close();
      audioCtxRef.current = null;
      setIsPlaying(false);
    }
  };

  const handleRevThrottle = (newRpm: number) => {
    setRpm(newRpm);
    if (audioCtxRef.current && osc1Ref.current && osc2Ref.current && filterRef.current) {
      const baseFreq = newRpm / 50;
      const t = audioCtxRef.current.currentTime;
      osc1Ref.current.frequency.setTargetAtTime(baseFreq * 1.6, t, 0.08);
      osc2Ref.current.frequency.setTargetAtTime(baseFreq * 0.8, t, 0.08);
      const filterCutoff = selectedExhaust === 'stage1' ? 400 + (newRpm * 0.25) : 300 + (newRpm * 0.2);
      filterRef.current.frequency.setTargetAtTime(filterCutoff, t, 0.08);
    }
  };

  const quickRevBurst = () => {
    if (!isPlaying) {
      startAudio();
    }
    handleRevThrottle(5400);
    setTimeout(() => {
      handleRevThrottle(1200);
    }, 700);
  };

  return (
    <section id="audio-rev" className="w-full bg-[#0a0a0a] text-white py-20 px-6 lg:px-10 border-t border-white/5 relative overflow-hidden">
      {/* Background subtle radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#ff2c2c]/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#ff2c2c] flex items-center justify-center gap-1.5">
            <Flame className="w-3.5 h-3.5" />
            <span>SpeedPlus 1250cc Acoustic Simulator</span>
          </span>
          <h2 className="text-3xl md:text-5xl font-black uppercase italic font-display text-white mt-1">
            HEAR THE AMERICAN V-TWIN ROAR
          </h2>
          <p className="text-xs text-white/60 mt-2 leading-relaxed">
            Experience the pulse and distinct rumble of the 105 HP liquid-cooled SpeedPlus V-Twin engine. Select your exhaust setup and twist the throttle.
          </p>
        </div>

        <div className="bg-[#161616] border border-white/5 rounded-2xl p-6 md:p-10 shadow-2xl max-w-3xl mx-auto ring-1 ring-white/5">
          {/* Tachometer RPM Display */}
          <div className="flex flex-col items-center justify-center mb-6">
            <div className="text-center">
              <span className="text-6xl md:text-7xl font-mono font-black tracking-tight text-white">
                {rpm}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#ff2c2c] block mt-1">
                RPM • SPEEDPLUS 1250
              </span>
            </div>

            {/* Visual RPM Bar */}
            <div className="w-full max-w-md h-2.5 bg-[#0a0a0a] rounded-full mt-5 overflow-hidden border border-white/5 p-0.5">
              <div
                className="h-full bg-gradient-to-r from-neutral-400 via-[#ff2c2c]/70 to-[#ff2c2c] rounded-full transition-all duration-100 shadow-[0_0_10px_rgba(255,44,44,0.5)]"
                style={{ width: `${Math.min(100, (rpm / 7500) * 100)}%` }}
              />
            </div>
            <div className="flex justify-between w-full max-w-md text-[9px] font-mono text-white/40 mt-1.5 uppercase">
              <span>IDLE (1,100)</span>
              <span>TORQUE PEAK (6,300)</span>
              <span>REDLINE (8,200)</span>
            </div>
          </div>

          {/* Exhaust Profile Switcher */}
          <div className="mb-6">
            <label className="text-[10px] font-bold uppercase tracking-widest text-white/50 block mb-2 text-center">
              Select Exhaust Tuning:
            </label>
            <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
              <button
                onClick={() => setSelectedExhaust('stock')}
                className={`py-2 px-3 text-[11px] font-bold uppercase tracking-wider rounded-sm border transition-all ${
                  selectedExhaust === 'stock'
                    ? 'bg-[#ff2c2c] text-black border-[#ff2c2c]'
                    : 'bg-[#0a0a0a] text-white/50 border-white/5 hover:text-white'
                }`}
              >
                Factory Stock
              </button>
              <button
                onClick={() => setSelectedExhaust('stage1')}
                className={`py-2 px-3 text-[11px] font-bold uppercase tracking-wider rounded-sm border transition-all ${
                  selectedExhaust === 'stage1'
                    ? 'bg-[#ff2c2c] text-black border-[#ff2c2c]'
                    : 'bg-[#0a0a0a] text-white/50 border-white/5 hover:text-white'
                }`}
              >
                Stage 1 2-into-1
              </button>
              <button
                onClick={() => setSelectedExhaust('straight')}
                className={`py-2 px-3 text-[11px] font-bold uppercase tracking-wider rounded-sm border transition-all ${
                  selectedExhaust === 'straight'
                    ? 'bg-[#ff2c2c] text-black border-[#ff2c2c]'
                    : 'bg-[#0a0a0a] text-white/50 border-white/5 hover:text-white'
                }`}
              >
                Competition
              </button>
            </div>
          </div>

          {/* Interactive Controls */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            {!isPlaying ? (
              <button
                onClick={startAudio}
                className="bg-[#ff2c2c] hover:bg-white text-black px-6 py-3 rounded-sm text-xs font-black uppercase tracking-widest shadow-lg flex items-center space-x-2 transition-all hover:scale-105"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>IGNITE & IDLE ENGINE</span>
              </button>
            ) : (
              <button
                onClick={stopAudio}
                className="bg-[#0a0a0a] hover:bg-[#202020] text-white px-6 py-3 rounded-sm text-xs font-bold uppercase tracking-widest border border-white/20 flex items-center space-x-2 transition-all"
              >
                <VolumeX className="w-3.5 h-3.5" />
                <span>KILL SWITCH</span>
              </button>
            )}

            <button
              onClick={quickRevBurst}
              className="bg-white hover:bg-[#ff2c2c] text-black px-6 py-3 rounded-sm text-xs font-black uppercase tracking-widest shadow-lg flex items-center space-x-2 transition-all active:scale-95"
            >
              <Flame className="w-3.5 h-3.5" />
              <span>TWIST THROTTLE (REV)</span>
            </button>
          </div>

          {/* Manual Throttle Slider */}
          <div className="mt-6 pt-4 border-t border-white/5 max-w-md mx-auto">
            <div className="flex justify-between items-center text-[10px] font-bold text-white/50 mb-1 tracking-wider uppercase">
              <span>THROTTLE CONTROL</span>
              <span className="text-[#ff2c2c] font-mono">{rpm} RPM</span>
            </div>
            <input
              type="range"
              min="1100"
              max="7200"
              step="50"
              value={rpm}
              onChange={(e) => handleRevThrottle(Number(e.target.value))}
              className="w-full accent-[#ff2c2c] cursor-pointer bg-[#0a0a0a]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
