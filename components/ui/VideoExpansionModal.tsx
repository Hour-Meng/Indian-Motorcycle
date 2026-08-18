'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Volume2,
  VolumeX,
  Gauge,
  Zap,
  Sliders,
  ArrowRight,
  Check,
} from 'lucide-react';
import { MotorcycleModel, MOTORCYCLE_LINEUP } from '@/src/data/motorcycles';

export interface VideoHeroCard {
  id: string;
  colorTag: string;
  name: string;
  price: string;
  collection: string;
  hp: string;
  torque: string;
  engine: string;
  displacement: string;
  seatHeight: string;
  modelId: string;
}

export const VIDEO_HERO_CARDS: VideoHeroCard[] = [
  {
    id: 'scout-bobber-sixty',
    colorTag: 'CLASSIC BLACK',
    name: 'SCOUT BOBBER SIXTY',
    price: 'Starting at $10,749',
    collection: 'HERITAGE COLLECTION',
    hp: '78',
    torque: '65',
    engine: 'Liquid-Cooled 999cc SpeedPlus V-Twin',
    displacement: '999 cc (60 cu in)',
    seatHeight: '25.6 in (649 mm)',
    modelId: 'scout-sixty-bobber',
  },
  {
    id: 'scout-bobber-twenty',
    colorTag: 'MILITARY GREY',
    name: 'SCOUT BOBBER TWENTY',
    price: 'Starting at $13,249',
    collection: 'HERITAGE COLLECTION',
    hp: '105',
    torque: '82',
    engine: 'Liquid-Cooled 1250cc SpeedPlus V-Twin',
    displacement: '1250 cc (76.3 cu in)',
    seatHeight: '27.4 in (695 mm)',
    modelId: 'scout-bobber-twenty',
  },
  {
    id: 'scout-rogue',
    colorTag: 'DARK CHROME',
    name: 'SCOUT ROGUE',
    price: 'Starting at $12,749',
    collection: 'HERITAGE COLLECTION',
    hp: '100',
    torque: '72',
    engine: 'Liquid-Cooled SpeedPlus 1250cc V-Twin',
    displacement: '1250 cc (76.3 cu in)',
    seatHeight: '25.6 in (649 mm)',
    modelId: 'scout-rogue',
  },
];

interface VideoExpansionModalProps {
  isOpen: boolean;
  initialCardId?: string;
  onClose: () => void;
  onOpenCustomizer: (model: MotorcycleModel) => void;
  onOpenTestRide: (model: MotorcycleModel) => void;
  onNavigateToLineup: () => void;
}

export function VideoExpansionModal({
  isOpen,
  initialCardId = 'scout-bobber-twenty',
  onClose,
  onOpenCustomizer,
  onOpenTestRide,
  onNavigateToLineup,
}: VideoExpansionModalProps) {
  const [activeCardId, setActiveCardId] = useState<string>(initialCardId);
  const [selectedColorIdx, setSelectedColorIdx] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [telemetrySpeed, setTelemetrySpeed] = useState<number>(85);

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (initialCardId) {
      setActiveCardId(initialCardId);
      setSelectedColorIdx(0);
    }
  }, [initialCardId, isOpen]);

  // Telemetry speed sweep
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setTelemetrySpeed((prev) => {
        const delta = Math.floor(Math.random() * 9) - 4;
        return Math.min(130, Math.max(68, prev + delta));
      });
    }, 550);
    return () => clearInterval(interval);
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const activeCard =
    VIDEO_HERO_CARDS.find((c) => c.id === activeCardId) || VIDEO_HERO_CARDS[1];
  const activeModel =
    MOTORCYCLE_LINEUP.find((m) => m.id === activeCard.modelId) ||
    MOTORCYCLE_LINEUP.find((m) => m.id === 'scout-bobber-twenty') ||
    MOTORCYCLE_LINEUP[0];

  const currentColor =
    activeModel.colors[selectedColorIdx] || activeModel.colors[0];

  const handleClose = () => {
    onClose();
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col justify-between overflow-y-auto overflow-x-hidden select-none"
        >
          {/* Top Bar with Telemetry and Controls */}
          <div className="relative z-30 w-full px-6 py-4 flex items-center justify-between border-b border-white/10 bg-black/70 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <span className="bg-[#ff2c2c] text-black text-[10px] font-black uppercase px-2.5 py-1 rounded font-mono">
                MODEL SHOWCASE
              </span>
              <span className="text-white font-black text-sm uppercase tracking-wider hidden sm:inline-block">
                {activeCard.name}
              </span>
            </div>

            <div className="flex items-center gap-3 sm:gap-4">
              <div className="hidden md:flex items-center gap-4 bg-[#141414] border border-white/10 px-3.5 py-1.5 rounded-lg">
                <div className="flex items-center gap-2">
                  <Gauge className="w-3.5 h-3.5 text-[#ff2c2c]" />
                  <span className="text-[10px] font-mono text-white/70 uppercase">
                    Velocity
                  </span>
                  <span className="text-xs font-mono font-black text-[#ff2c2c]">
                    {telemetrySpeed} MPH
                  </span>
                </div>
                <div className="w-[1px] h-3.5 bg-white/10" />
                <div className="flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-[#ff2c2c]" />
                  <span className="text-[10px] font-mono text-white/70 uppercase">
                    Power
                  </span>
                  <span className="text-xs font-mono font-black text-white">
                    {activeCard.hp} HP
                  </span>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={handleClose}
                className="w-9 h-9 rounded-full bg-[#181818] border border-white/20 hover:border-[#ff2c2c] text-white hover:text-[#ff2c2c] flex items-center justify-center transition-all cursor-pointer active:scale-95"
                aria-label="Close Model Showcase"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main Stage: Immersive Video Zoom & Dynamic Model Introduction */}
          <div className="relative flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col lg:flex-row items-center justify-center gap-8 z-10">
            {/* Left Column: Zoomed Video Player with HUD */}
            <motion.div
              initial={{ scale: 0.85, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.85, y: 30, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full lg:w-1/2 relative rounded-2xl overflow-hidden border border-white/20 shadow-[0_20px_80px_rgba(0,0,0,0.8)] aspect-[16/9] bg-[#111]"
            >
              <video
                ref={videoRef}
                src="videos/Indian_scout_driving.mp4"
                autoPlay
                loop
                muted={isMuted}
                playsInline
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

              {/* Video HUD Overlays */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-20">
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleMute}
                    className="p-2 rounded-full bg-black/60 border border-white/20 text-white hover:text-[#ff2c2c] transition cursor-pointer"
                  >
                    {isMuted ? (
                      <VolumeX className="w-4 h-4" />
                    ) : (
                      <Volume2 className="w-4 h-4" />
                    )}
                  </button>
                  <span className="text-[10px] font-mono text-white/80 uppercase bg-black/60 px-2.5 py-1 rounded border border-white/10">
                    SPEEDPLUS 1250 DUAL OVERHEAD CAM
                  </span>
                </div>

                <span className="text-xs font-mono font-bold text-[#ff2c2c] bg-black/70 px-3 py-1 rounded border border-[#ff2c2c]/40">
                  {activeCard.colorTag}
                </span>
              </div>
            </motion.div>

            {/* Right Column: Model Introduction & Interactive Specifications */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="w-full lg:w-1/2 flex flex-col justify-between space-y-5"
            >
              {/* Header & Title */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-black uppercase tracking-[0.25em] text-[#ff2c2c]">
                    {activeCard.collection}
                  </span>
                  <span className="text-white/30">•</span>
                  <span className="text-xs text-white/60 font-mono">
                    {activeCard.price}
                  </span>
                </div>

                <h2 className="text-3xl sm:text-5xl font-black uppercase italic font-display text-white tracking-tight leading-none">
                  {activeCard.name}
                </h2>

                <p className="text-xs sm:text-sm text-white/70 mt-3 leading-relaxed">
                  {activeModel.description}
                </p>
              </div>

              {/* Motorcycle Transparent Render Preview */}
              <div className="relative w-full aspect-[16/9] max-h-[200px] flex items-center justify-center bg-[#141414] rounded-xl border border-white/10 p-2 overflow-hidden">
                <img
                  src={currentColor.imageUrl}
                  alt={activeCard.name}
                  className="w-full h-full object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.9)] transition-all duration-500"
                />
                <div className="absolute -bottom-2 w-3/4 h-8 bg-[#ff2c2c]/20 blur-xl rounded-full pointer-events-none" />
              </div>

              {/* Model Switcher Tabs */}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/50 block mb-2">
                  Introduced Model:
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {VIDEO_HERO_CARDS.map((card) => {
                    const isSel = card.id === activeCardId;
                    return (
                      <button
                        key={card.id}
                        onClick={() => {
                          setActiveCardId(card.id);
                          setSelectedColorIdx(0);
                        }}
                        className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                          isSel
                            ? 'border-[#ff2c2c] bg-[#ff2c2c]/10 ring-1 ring-[#ff2c2c]'
                            : 'border-white/10 bg-[#141414] hover:border-white/30 hover:bg-[#1a1a1a]'
                        }`}
                      >
                        <span className="text-[9px] font-bold text-[#ff2c2c] uppercase block truncate">
                          {card.colorTag}
                        </span>
                        <span className="text-xs font-bold text-white uppercase italic block truncate font-display">
                          {card.name}
                        </span>
                        <span className="text-[10px] text-white/50 font-mono block mt-0.5">
                          {card.price}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Technical Specifications Monospace Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-[#121212] p-3 rounded-lg border border-white/10">
                <div>
                  <span className="text-[9px] font-bold text-white/40 uppercase block">
                    Horsepower
                  </span>
                  <span className="text-sm font-black font-mono text-[#ff2c2c]">
                    {activeCard.hp} HP
                  </span>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-white/40 uppercase block">
                    Peak Torque
                  </span>
                  <span className="text-sm font-bold font-mono text-white">
                    {activeCard.torque} lb-ft
                  </span>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-white/40 uppercase block">
                    Displacement
                  </span>
                  <span className="text-sm font-bold font-mono text-white">
                    {activeCard.displacement}
                  </span>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-white/40 uppercase block">
                    Seat Height
                  </span>
                  <span className="text-sm font-bold font-mono text-white">
                    {activeCard.seatHeight}
                  </span>
                </div>
              </div>

              {/* Color Swatch Selector */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">
                    Color: <strong className="text-white">{currentColor.name}</strong>
                  </span>
                  <div className="flex items-center space-x-2">
                    {activeModel.colors.map((c, idx) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColorIdx(idx)}
                        className={`w-6 h-6 rounded-full transition cursor-pointer flex items-center justify-center ${
                          selectedColorIdx === idx
                            ? 'ring-2 ring-offset-2 ring-offset-black ring-[#ff2c2c] scale-110'
                            : 'opacity-70 hover:opacity-100 ring-1 ring-white/20'
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      >
                        {selectedColorIdx === idx && (
                          <Check className={`w-3 h-3 ${c.hex === '#e2e5e8' ? 'text-black' : 'text-white'}`} />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action CTAs */}
              <div className="flex flex-wrap sm:flex-nowrap gap-3 pt-2">
                <button
                  onClick={() => {
                    handleClose();
                    onOpenCustomizer(activeModel);
                  }}
                  className="flex-1 bg-[#ff2c2c] hover:bg-white text-black px-5 py-3 rounded-sm text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-95"
                >
                  <Sliders className="w-4 h-4" />
                  <span>Build & Price</span>
                </button>

                <button
                  onClick={() => {
                    handleClose();
                    onOpenTestRide(activeModel);
                  }}
                  className="flex-1 border border-white/20 hover:border-[#ff2c2c] hover:text-[#ff2c2c] bg-[#181818] text-white px-5 py-3 rounded-sm text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <span>Schedule Test Ride</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    handleClose();
                    onNavigateToLineup();
                  }}
                  className="border border-white/10 hover:border-white/30 text-white/80 hover:text-white px-4 py-3 rounded-sm text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center cursor-pointer"
                >
                  <span>Full Lineup</span>
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default VideoExpansionModal;
