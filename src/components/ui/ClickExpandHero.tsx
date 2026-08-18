'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  X,
  ChevronRight,
  Sliders,
  Shield,
  Zap,
  Gauge,
  ArrowRight,
  RotateCw,
} from 'lucide-react';
import { MotorcycleModel, MOTORCYCLE_LINEUP } from '../../data/motorcycles';

export interface HeroModelCard {
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

export const HERO_CARDS: HeroModelCard[] = [
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

interface ClickExpandHeroProps {
  onOpenCustomizer: (model: MotorcycleModel) => void;
  onOpenTestRide: (model: MotorcycleModel) => void;
  onNavigateToLineup: () => void;
  onModelSelect?: (model: MotorcycleModel) => void;
}

export function ClickExpandHero({
  onOpenCustomizer,
  onOpenTestRide,
  onNavigateToLineup,
  onModelSelect,
}: ClickExpandHeroProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [activeCardId, setActiveCardId] = useState<string>('scout-bobber-twenty');
  const [selectedColorIdx, setSelectedColorIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [telemetrySpeed, setTelemetrySpeed] = useState<number>(85);

  const videoRef = useRef<HTMLVideoElement>(null);

  const activeCard = HERO_CARDS.find((c) => c.id === activeCardId) || HERO_CARDS[1];
  const activeModel =
    MOTORCYCLE_LINEUP.find((m) => m.id === activeCard.modelId) ||
    MOTORCYCLE_LINEUP.find((m) => m.id === 'scout-bobber-twenty') ||
    MOTORCYCLE_LINEUP[0];

  const currentColor = activeModel.colors[selectedColorIdx] || activeModel.colors[0];

  // Dynamic telemetry simulation
  useEffect(() => {
    if (!isExpanded) return;
    const interval = setInterval(() => {
      setTelemetrySpeed((prev) => {
        const delta = Math.floor(Math.random() * 7) - 3;
        return Math.min(125, Math.max(65, prev + delta));
      });
    }, 600);
    return () => clearInterval(interval);
  }, [isExpanded]);

  const handleCardClick = (card: HeroModelCard) => {
    setActiveCardId(card.id);
    setSelectedColorIdx(0);
    const m = MOTORCYCLE_LINEUP.find((item) => item.id === card.modelId);
    if (m && onModelSelect) {
      onModelSelect(m);
    }
    // Click on card triggers the zoom expansion animation!
    setIsExpanded(true);
  };

  const handleCenterVideoClick = () => {
    // Click on center video triggers the zoom expansion animation!
    setIsExpanded(true);
  };

  const handleCloseExpanded = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(false);
  };

  const toggleVideoPlayback = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="relative w-full bg-[#0a0a0a] overflow-hidden select-none">
      {/* 1. HERO CONTAINER WITH RICH BURGUNDY RED GRADIENT BACKGROUND */}
      <div className="relative min-h-[92vh] flex flex-col items-center justify-between pt-16 pb-8 px-4 sm:px-6 lg:px-8">
        {/* Background Gradient & Lighting */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#6b080e] via-[#400508] to-[#0a0a0a] opacity-95" />
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 50% 40%, rgba(255, 44, 44, 0.28) 0%, rgba(0, 0, 0, 0.75) 75%)',
          }}
        />

        {/* Ambient Film Grain & Grid Overlay */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03] pointer-events-none" />

        {/* Top Headline: INDIAN (Parallax on expand) */}
        <motion.h2
          initial={{ opacity: 1, x: 0 }}
          animate={{
            opacity: isExpanded ? 0 : 1,
            x: isExpanded ? -200 : 0,
          }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 font-black uppercase text-center font-display tracking-tight text-white/90 drop-shadow-2xl select-none mt-2 sm:mt-4"
          style={{
            fontSize: 'clamp(3.5rem, 11.5vw, 9.5rem)',
            lineHeight: 0.85,
            letterSpacing: '-0.04em',
          }}
        >
          INDIAN
        </motion.h2>

        {/* 2. CENTER SHOWCASE / ZOOMING VIDEO CONTAINER */}
        <div className="relative z-20 w-full max-w-5xl flex items-center justify-center my-2">
          {/* Giant background text: SCOUT (Visible behind the video card) */}
          <motion.h1
            initial={{ opacity: 0.9, scale: 1 }}
            animate={{
              opacity: isExpanded ? 0 : 0.95,
              scale: isExpanded ? 1.2 : 1,
            }}
            transition={{ duration: 0.6 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-black uppercase tracking-tight text-white select-none pointer-events-none z-0 text-center drop-shadow-[0_10px_35px_rgba(0,0,0,0.8)]"
            style={{
              fontSize: 'clamp(5rem, 20vw, 17rem)',
              lineHeight: 0.75,
              letterSpacing: '-0.05em',
            }}
          >
            SCOUT
          </motion.h1>

          {/* Video Preview Card (Click to Zoom & Introduce Models) */}
          <motion.div
            layout
            onClick={handleCenterVideoClick}
            className="relative z-10 group cursor-pointer rounded-2xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.9)] border border-white/20 bg-black/80 will-change-transform"
            style={{
              width: 'min(92vw, 680px)',
              aspectRatio: '16 / 9',
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          >
            <video
              ref={videoRef}
              src="videos/Indian_scout_driving.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover filter brightness-[0.95] group-hover:scale-105 transition-transform duration-700"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

            {/* Click to Zoom Pill Indicator */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
              <motion.div
                initial={{ scale: 0.95, opacity: 0.9 }}
                animate={{ scale: [0.95, 1.05, 0.95], opacity: 1 }}
                transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                className="bg-[#ff2c2c] text-black px-5 py-2.5 rounded-full flex items-center gap-2 shadow-[0_0_35px_rgba(255,44,44,0.7)] font-black text-xs uppercase tracking-wider"
              >
                <Play className="w-4 h-4 fill-black" />
                <span>Click Video to Zoom & Explore Models</span>
              </motion.div>
              <span className="text-white/70 text-[10px] uppercase font-mono tracking-widest mt-2 bg-black/60 px-3 py-0.5 rounded backdrop-blur-sm border border-white/10">
                105 HP • SPEEDPLUS 1250 • 130 MPH
              </span>
            </div>

            {/* Bottom Card Tag */}
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between z-20 pointer-events-none">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#ff2c2c] font-bold bg-black/70 px-2 py-1 rounded border border-[#ff2c2c]/30 backdrop-blur-sm">
                {activeCard.colorTag}
              </span>
              <span className="text-white font-bold text-xs uppercase tracking-wider drop-shadow">
                {activeCard.name}
              </span>
            </div>
          </motion.div>
        </div>

        {/* 3. BOTTOM HERO CARDS ROW (Exact match to user's screenshot) */}
        <div className="relative z-30 w-full max-w-5xl mx-auto px-2 sm:px-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
            {HERO_CARDS.map((card) => {
              const isActive = card.id === activeCardId;
              return (
                <motion.div
                  key={card.id}
                  onClick={() => handleCardClick(card)}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.97 }}
                  className={`group relative cursor-pointer bg-[#121212]/95 backdrop-blur-md rounded-xl p-3.5 flex items-center gap-3.5 transition-all duration-300 shadow-2xl ${
                    isActive
                      ? 'border-2 border-[#ff2c2c] ring-2 ring-[#ff2c2c]/40 shadow-[0_0_35px_rgba(255,44,44,0.35)] bg-[#181818]'
                      : 'border border-white/10 hover:border-white/30 hover:bg-[#161616]'
                  }`}
                >
                  {/* Left Thumbnail Box with Always-On Indian Scout Driving Video */}
                  <div className="w-24 h-16 sm:w-26 sm:h-17 rounded-lg bg-[#1a1a1a] overflow-hidden relative flex items-center justify-center border border-white/10 shrink-0">
                    <video
                      src="videos/Indian_scout_driving.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover filter brightness-[0.95] group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                    <span className="absolute bottom-1 right-1.5 bg-black/85 text-[8px] font-bold text-white/90 px-1.5 py-0.5 rounded tracking-tighter uppercase font-mono border border-white/10">
                      PHOTO
                    </span>
                  </div>

                  {/* Right Model Information */}
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] text-[#ff2c2c] font-black uppercase tracking-wider block leading-tight mb-0.5">
                      {card.colorTag}
                    </span>
                    <h4 className="text-white font-black uppercase italic text-sm sm:text-base tracking-tight font-display leading-tight truncate">
                      {card.name}
                    </h4>
                    <span className="text-white/60 text-xs font-medium block mt-1">
                      {card.price}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. EXPANDED ZOOM ANIMATION & MODEL INTRODUCTION OVERLAY */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between overflow-y-auto overflow-x-hidden"
          >
            {/* Top Navigation & Telemetry Header */}
            <div className="relative z-30 w-full px-6 py-4 flex items-center justify-between border-b border-white/10 bg-black/60 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <span className="bg-[#ff2c2c] text-black text-[10px] font-black uppercase px-2.5 py-1 rounded font-mono">
                  MODEL SHOWCASE
                </span>
                <span className="text-white font-black text-sm uppercase tracking-wider hidden sm:inline-block">
                  {activeCard.name}
                </span>
              </div>

              {/* Telemetry Bar & Controls */}
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="hidden md:flex items-center gap-4 bg-[#141414] border border-white/10 px-3.5 py-1.5 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Gauge className="w-3.5 h-3.5 text-[#ff2c2c]" />
                    <span className="text-[10px] font-mono text-white/70 uppercase">Velocity</span>
                    <span className="text-xs font-mono font-black text-[#ff2c2c]">
                      {telemetrySpeed} MPH
                    </span>
                  </div>
                  <div className="w-[1px] h-3.5 bg-white/10" />
                  <div className="flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5 text-[#ff2c2c]" />
                    <span className="text-[10px] font-mono text-white/70 uppercase">Power</span>
                    <span className="text-xs font-mono font-black text-white">{activeCard.hp} HP</span>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  onClick={handleCloseExpanded}
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
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
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
                className="w-full lg:w-1/2 flex flex-col justify-between space-y-6"
              >
                {/* Header & Title */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-black uppercase tracking-[0.25em] text-[#ff2c2c]">
                      {activeCard.collection}
                    </span>
                    <span className="text-white/30">•</span>
                    <span className="text-xs text-white/60 font-mono">{activeCard.price}</span>
                  </div>

                  <h2 className="text-3xl sm:text-5xl font-black uppercase italic font-display text-white tracking-tight leading-none">
                    {activeCard.name}
                  </h2>

                  <p className="text-xs sm:text-sm text-white/70 mt-3 leading-relaxed">
                    {activeModel.description}
                  </p>
                </div>

                {/* Motorcycle Transparent Render Preview */}
                <div className="relative w-full aspect-[16/9] max-h-[220px] flex items-center justify-center bg-[#141414] rounded-xl border border-white/10 p-2 overflow-hidden">
                  <img
                    src={currentColor.imageUrl}
                    alt={activeCard.name}
                    className="w-full h-full object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.9)] transition-all duration-500"
                  />
                  <div className="absolute -bottom-2 w-3/4 h-8 bg-[#ff2c2c]/20 blur-xl rounded-full pointer-events-none" />
                </div>

                {/* Model Tabs Selector */}
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/50 block mb-2">
                    Switch Introduced Model:
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {HERO_CARDS.map((card) => {
                      const isSel = card.id === activeCardId;
                      return (
                        <button
                          key={card.id}
                          onClick={() => {
                            setActiveCardId(card.id);
                            setSelectedColorIdx(0);
                            const m = MOTORCYCLE_LINEUP.find((item) => item.id === card.modelId);
                            if (m && onModelSelect) onModelSelect(m);
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
                    <span className="text-[9px] font-bold text-white/40 uppercase block">Horsepower</span>
                    <span className="text-sm font-black font-mono text-[#ff2c2c]">{activeCard.hp} HP</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-white/40 uppercase block">Peak Torque</span>
                    <span className="text-sm font-bold font-mono text-white">{activeCard.torque} lb-ft</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-white/40 uppercase block">Displacement</span>
                    <span className="text-sm font-bold font-mono text-white">{activeCard.displacement}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-white/40 uppercase block">Seat Height</span>
                    <span className="text-sm font-bold font-mono text-white">{activeCard.seatHeight}</span>
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
                          className={`w-6 h-6 rounded-full transition cursor-pointer ${
                            selectedColorIdx === idx
                              ? 'ring-2 ring-offset-2 ring-offset-black ring-[#ff2c2c] scale-110'
                              : 'opacity-70 hover:opacity-100 ring-1 ring-white/20'
                          }`}
                          style={{ backgroundColor: c.hex }}
                          title={c.name}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action CTAs */}
                <div className="flex flex-wrap sm:flex-nowrap gap-3 pt-2">
                  <button
                    onClick={() => {
                      setIsExpanded(false);
                      onOpenCustomizer(activeModel);
                    }}
                    className="flex-1 bg-[#ff2c2c] hover:bg-white text-black px-5 py-3 rounded-sm text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-95"
                  >
                    <Sliders className="w-4 h-4" />
                    <span>Build & Price</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsExpanded(false);
                      onOpenTestRide(activeModel);
                    }}
                    className="flex-1 border border-white/20 hover:border-[#ff2c2c] hover:text-[#ff2c2c] bg-[#181818] text-white px-5 py-3 rounded-sm text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                  >
                    <span>Schedule Test Ride</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      setIsExpanded(false);
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
    </section>
  );
}

export default ClickExpandHero;
