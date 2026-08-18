'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MotorcycleModel, MOTORCYCLE_LINEUP } from '@/src/data/motorcycles';
import {
  ArrowLeft,
  ArrowRight,
  Sliders,
  Volume2,
  VolumeX,
  Gauge,
} from 'lucide-react';

interface IndianScoutExpansionHeroProps {
  initialModelId?: string;
  onClose: () => void;
  onOpenCustomizer: (model: MotorcycleModel) => void;
  onOpenTestRide: (model: MotorcycleModel) => void;
  onNavigateToLineup: () => void;
}

interface ModelInfo {
  id: string;
  name: string;
  subtitle: string;
  colorTag: string;
  price: string;
  collection: string;
  hp: string;
  torque: string;
  displacement: string;
  seatHeight: string;
  dryWeight: string;
  fuelCapacity: string;
  overview: string;
  conclusion: string;
  modelData: MotorcycleModel;
}

export function IndianScoutExpansionHero({
  initialModelId = 'scout-bobber-twenty',
  onClose,
  onOpenCustomizer,
  onOpenTestRide,
  onNavigateToLineup,
}: IndianScoutExpansionHeroProps) {
  const modelSixty =
    MOTORCYCLE_LINEUP.find((m) => m.id === 'scout-sixty-bobber') ||
    MOTORCYCLE_LINEUP[1] ||
    MOTORCYCLE_LINEUP[0];
  const modelTwenty =
    MOTORCYCLE_LINEUP.find((m) => m.id === 'scout-bobber-twenty') ||
    MOTORCYCLE_LINEUP[2] ||
    MOTORCYCLE_LINEUP[0];
  const modelRogue =
    MOTORCYCLE_LINEUP.find((m) => m.id === 'scout-rogue') ||
    MOTORCYCLE_LINEUP[0];

  const modelsDict: Record<string, ModelInfo> = {
    'scout-bobber-twenty': {
      id: 'scout-bobber-twenty',
      name: 'SCOUT BOBBER TWENTY',
      subtitle: 'OLD-SCHOOL BOBBER ATTITUDE & APE HANGERS',
      colorTag: 'MILITARY GREY',
      price: 'Starting at $13,249',
      collection: 'HERITAGE COLLECTION',
      hp: '105 HP',
      torque: '82 ft-lbs',
      displacement: '1250 cc (76.3 cu in)',
      seatHeight: '27.4 in (695 mm)',
      dryWeight: '530 lbs (240 kg)',
      fuelCapacity: '3.4 gal (13 L)',
      overview:
        'A nod to the original 1920 Scout. Loaded with heritage styling, blacked-out wire-spoke wheels, floating leather solo saddle, and 10-inch mini-ape handlebars for an imposing upright riding posture.',
      conclusion:
        'Old-school bobber attitude meets modern American performance. Powered by the SpeedPlus 1250cc liquid-cooled V-Twin generating 105 HP and 82 ft-lbs of responsive torque with distinct staggered exhaust pulse notes.',
      modelData: modelTwenty,
    },
    'scout-bobber-sixty': {
      id: 'scout-bobber-sixty',
      name: 'SCOUT BOBBER SIXTY',
      subtitle: 'PURE RAW BOBBER ATTITUDE & NIMBLE AGILITY',
      colorTag: 'CLASSIC BLACK',
      price: 'Starting at $10,749',
      collection: 'HERITAGE COLLECTION',
      hp: '78 HP',
      torque: '65 ft-lbs',
      displacement: '999 cc (60 cu in)',
      seatHeight: '25.6 in (649 mm)',
      dryWeight: '510 lbs (231 kg)',
      fuelCapacity: '3.4 gal (13 L)',
      overview:
        'Stripped down to the bare essentials. Accessible, lightweight, and engineered with responsive liquid-cooled power for pure city carving and open highway throttle. Features a lightweight cast aluminum frame, blacked-out engine covers, and a low 25.6-inch center of gravity.',
      conclusion:
        'The Scout Bobber Sixty proves that less is more. Powered by the 999cc SpeedPlus V-Twin delivering 78 HP and 65 ft-lbs of responsive torque with pure American attitude.',
      modelData: modelSixty,
    },
    'scout-rogue': {
      id: 'scout-rogue',
      name: 'SCOUT ROGUE',
      subtitle: 'ICONIC AGGRESSIVE STRIPPED-DOWN STYLE',
      colorTag: 'DARK CHROME',
      price: 'Starting at $12,749',
      collection: 'HERITAGE COLLECTION',
      hp: '100 HP',
      torque: '72 ft-lbs',
      displacement: '1250 cc (76.3 cu in)',
      seatHeight: '25.6 in (649 mm)',
      dryWeight: '525 lbs (238 kg)',
      fuelCapacity: '3.4 gal (13 L)',
      overview:
        'Packed with attitude and styled for the bold. Equipped with an aggressive quarter fairing with tinted screen, mini-ape handlebars, sport-style contoured solo saddle, and blacked-out Dark Chrome finishes.',
      conclusion:
        'Born for riders who demand aggressive West Coast club style and modern performance power. Responsive 1250cc V-Twin generating 100 HP and agile handling.',
      modelData: modelRogue,
    },
  };

  const [activeKey, setActiveKey] = useState<string>(
    modelsDict[initialModelId] ? initialModelId : 'scout-bobber-twenty'
  );
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [telemetrySpeed, setTelemetrySpeed] = useState<number>(88);

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const aboutSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (modelsDict[initialModelId]) {
      setActiveKey(initialModelId);
    }
  }, [initialModelId]);

  // Telemetry speed simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetrySpeed((prev) => {
        const delta = Math.floor(Math.random() * 7) - 3;
        return Math.min(125, Math.max(70, prev + delta));
      });
    }, 600);
    return () => clearInterval(interval);
  }, []);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const currentModelInfo = modelsDict[activeKey] || modelsDict['scout-bobber-twenty'];
  const currentModel = currentModelInfo.modelData;

  const handleClose = () => {
    onClose();
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-2xl text-white overflow-y-auto overflow-x-hidden selection:bg-[#ff2c2c] selection:text-black"
    >
      {/* Top Floating Header with Controls: Redesigned for seamless mobile scaling */}
      <header className="sticky top-0 z-50 w-full px-3.5 sm:px-6 lg:px-8 py-3 bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/10 shadow-2xl flex items-center justify-between gap-2.5">
        {/* Left Side: Ergonomic Back to Main Screen Button */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={handleClose}
            className="group bg-white/5 hover:bg-[#ff2c2c] hover:text-black text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl border border-white/15 hover:border-[#ff2c2c] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 sm:gap-2 transition-all duration-200 cursor-pointer active:scale-95 shadow-md"
            aria-label="Back to Main Screen"
          >
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#ff2c2c] group-hover:text-black transition-transform group-hover:-translate-x-0.5" />
            <span className="hidden sm:inline">Back to Main Screen</span>
            <span className="sm:hidden font-bold">Back</span>
          </button>

          <span className="text-white/30 hidden md:inline-block">•</span>
          <span className="text-[#ff2c2c] font-black text-[11px] uppercase tracking-[0.2em] hidden md:inline-block">
            {currentModelInfo.collection}
          </span>
        </div>

        {/* Right Side: Horizontally-Scrollable & Scalable Model Tabs */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar scroll-smooth py-0.5 max-w-[62vw] sm:max-w-none">
          {Object.values(modelsDict).map((m) => {
            const isSel = m.id === activeKey;
            return (
              <button
                key={m.id}
                onClick={() => setActiveKey(m.id)}
                className={`px-2.5 sm:px-3.5 py-1.5 rounded-lg text-[10px] sm:text-xs font-bold uppercase tracking-wider shrink-0 transition-all cursor-pointer ${
                  isSel
                    ? 'bg-[#ff2c2c] text-black shadow-[0_0_20px_rgba(255,44,44,0.4)]'
                    : 'bg-[#141414] text-white/70 hover:text-white border border-white/10 hover:border-white/25'
                }`}
              >
                {m.name.replace('SCOUT ', '')}
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-col items-center">
        {/* 1. Zoomed-In Video Stage (Animated Zoom on Top of Screen) */}
        <motion.div
          key={activeKey}
          initial={{ scale: 0.85, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl rounded-2xl overflow-hidden border border-white/20 shadow-[0_25px_90px_rgba(0,0,0,0.95)] aspect-[16/9] bg-[#111] mb-6 sm:mb-8"
        >
          <video
            ref={videoRef}
            src="videos/Indian_scout_driving.mp4"
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="w-full h-full object-cover filter brightness-[0.95]"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 pointer-events-none" />

          {/* Overlaid Title & Subtitle */}
          <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 flex items-start justify-between z-20 pointer-events-none">
            <div>
              <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#ff2c2c] bg-black/70 px-2.5 py-1 rounded backdrop-blur-md border border-[#ff2c2c]/30 shadow-lg">
                {currentModelInfo.colorTag}
              </span>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase italic font-display text-white mt-1.5 sm:mt-2 tracking-tight drop-shadow-2xl leading-none">
                {currentModelInfo.name}
              </h1>
            </div>

            <div className="text-right">
              <span className="text-xs sm:text-sm font-mono font-bold text-white/90 bg-black/70 px-2.5 py-1 rounded border border-white/10 backdrop-blur-md block">
                {currentModelInfo.price}
              </span>
            </div>
          </div>

          {/* Bottom Video HUD Controls (Rev engine button cleanly removed) */}
          <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between z-20">
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={toggleMute}
                className="p-2 rounded-full bg-black/75 border border-white/20 text-white hover:text-[#ff2c2c] transition cursor-pointer backdrop-blur-md active:scale-95"
                title={isMuted ? 'Unmute Video' : 'Mute Video'}
                aria-label={isMuted ? 'Unmute Video' : 'Mute Video'}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <span className="text-[9px] sm:text-[10px] font-mono text-white/80 uppercase bg-black/75 px-2.5 sm:px-3 py-1 rounded border border-white/10 backdrop-blur-md truncate max-w-[180px] sm:max-w-none">
                SPEEDPLUS 1250 V-TWIN • 130 MPH
              </span>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-1.5 sm:gap-2 bg-black/75 border border-white/15 px-2.5 sm:px-3 py-1 rounded backdrop-blur-md">
                <Gauge className="w-3.5 h-3.5 text-[#ff2c2c]" />
                <span className="text-[11px] sm:text-xs font-mono font-bold text-[#ff2c2c]">{telemetrySpeed} MPH</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 2. About The Bike Section (Revealed smoothly right below the video) */}
        <motion.div
          ref={aboutSectionRef}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="w-full max-w-5xl bg-[#121212] border border-white/10 rounded-2xl p-5 sm:p-8 lg:p-10 shadow-2xl space-y-6 sm:space-y-8"
        >
          {/* Header & Overview */}
          <div className="border-b border-white/10 pb-6">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <div>
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] text-[#ff2c2c]">
                  Official Indian Motorcycle Specification
                </span>
                <h2 className="text-2xl sm:text-4xl font-black uppercase italic font-display text-white mt-1 leading-tight">
                  About The {currentModel.name}
                </h2>
              </div>
              <span className="bg-[#181818] border border-white/10 text-white text-[11px] sm:text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-lg">
                {currentModelInfo.price} MSRP
              </span>
            </div>

            <p className="text-sm sm:text-base text-white/80 leading-relaxed mt-4">
              {currentModelInfo.overview}
            </p>
            <p className="text-xs sm:text-sm text-white/60 leading-relaxed mt-2.5">
              {currentModelInfo.conclusion}
            </p>
          </div>

          {/* Motorcycle Render & Key Features */}
          <div className="bg-[#161616] border border-white/10 rounded-xl p-5 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="relative w-full md:w-1/2 aspect-[16/9] flex items-center justify-center">
              <img
                src={currentModel.colors[0]?.imageUrl || 'images/Indian-Scout.webp'}
                alt={currentModel.name}
                className="w-full h-full object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.9)] transition-all duration-500"
              />
              <div className="absolute -bottom-2 w-3/4 h-8 bg-[#ff2c2c]/15 blur-xl rounded-full pointer-events-none" />
            </div>

            <div className="w-full md:w-1/2 space-y-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#ff2c2c] block mb-1">
                  Engineered Platform:
                </span>
                <p className="text-xl font-black uppercase font-display text-white">{currentModel.name}</p>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/50 block mb-2">
                  Key Engineered Features:
                </span>
                <ul className="space-y-2 text-xs text-white/80">
                  {currentModel.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ff2c2c] shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Technical Specifications Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5 sm:gap-3 bg-[#161616] p-3.5 sm:p-4 rounded-xl border border-white/10">
            <div>
              <span className="text-[9px] font-bold uppercase tracking-wider text-white/40 block">Horsepower</span>
              <span className="text-xs sm:text-sm font-black font-mono text-[#ff2c2c]">{currentModelInfo.hp}</span>
            </div>
            <div>
              <span className="text-[9px] font-bold uppercase tracking-wider text-white/40 block">Peak Torque</span>
              <span className="text-xs sm:text-sm font-bold font-mono text-white">{currentModelInfo.torque}</span>
            </div>
            <div>
              <span className="text-[9px] font-bold uppercase tracking-wider text-white/40 block">Displacement</span>
              <span className="text-xs sm:text-sm font-bold font-mono text-white">{currentModelInfo.displacement}</span>
            </div>
            <div>
              <span className="text-[9px] font-bold uppercase tracking-wider text-white/40 block">Seat Height</span>
              <span className="text-xs sm:text-sm font-bold font-mono text-white">{currentModelInfo.seatHeight}</span>
            </div>
            <div>
              <span className="text-[9px] font-bold uppercase tracking-wider text-white/40 block">Dry Weight</span>
              <span className="text-xs sm:text-sm font-bold font-mono text-white">{currentModelInfo.dryWeight}</span>
            </div>
            <div>
              <span className="text-[9px] font-bold uppercase tracking-wider text-white/40 block">Fuel Tank</span>
              <span className="text-xs sm:text-sm font-bold font-mono text-white">{currentModelInfo.fuelCapacity}</span>
            </div>
          </div>

          {/* Actions Bar */}
          <div className="flex flex-wrap sm:flex-nowrap gap-3 sm:gap-4 items-center justify-between border-t border-white/10 pt-5 sm:pt-6">
            <div className="flex flex-wrap gap-2.5 sm:gap-3 w-full sm:w-auto">
              <button
                onClick={() => {
                  handleClose();
                  onOpenCustomizer(currentModel);
                }}
                className="flex-1 sm:flex-initial bg-[#ff2c2c] hover:bg-white text-black px-5 sm:px-6 py-3 rounded-lg text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl active:scale-95"
              >
                <Sliders className="w-4 h-4" />
                <span>Launch Configurator</span>
              </button>

              <button
                onClick={() => {
                  handleClose();
                  onOpenTestRide(currentModel);
                }}
                className="flex-1 sm:flex-initial border border-white/20 hover:border-[#ff2c2c] hover:text-[#ff2c2c] bg-[#181818] text-white px-5 sm:px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <span>Schedule Test Ride</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => {
                handleClose();
                onNavigateToLineup();
              }}
              className="text-white/60 hover:text-white text-xs font-bold uppercase tracking-wider underline cursor-pointer mt-2 sm:mt-0 text-center w-full sm:w-auto"
            >
              Explore Full Lineup →
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default IndianScoutExpansionHero;
