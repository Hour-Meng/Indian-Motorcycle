import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, ArrowRight } from 'lucide-react';

interface OfficialHeroBannerProps {
  onExploreLineup: () => void;
  onOpenTestRide: () => void;
}

export function OfficialHeroBanner({ onExploreLineup, onOpenTestRide }: OfficialHeroBannerProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const slides = [
    {
      topWord: 'INDIAN',
      bottomWord: 'SCOUT',
      collection: 'Heritage Collection',
      modelName: 'Scout Bobber',
      hp: '105',
      torque: '82',
      displacement: '1250cc',
      bgImage: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=1400',
    },
    {
      topWord: 'CHIEF',
      bottomWord: 'VINTAGE',
      collection: '125th Anniversary Edition',
      modelName: 'Chief Vintage',
      hp: '92',
      torque: '120',
      displacement: '1890cc',
      bgImage: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=1400',
    },
    {
      topWord: 'PERFORMANCE',
      bottomWord: '101 SCOUT',
      collection: 'Apex Series',
      modelName: '101 Scout',
      hp: '111',
      torque: '82',
      displacement: '1250cc',
      bgImage: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80&w=1400',
    }
  ];

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [isPlaying, slides.length]);

  const slide = slides[currentSlide];

  return (
    <div id="hero" className="relative w-full min-h-[720px] md:min-h-[820px] bg-[#0a0a0a] text-[#f5f5f5] flex flex-col items-center justify-center overflow-hidden select-none py-12 md:py-16">
      {/* Radial Gradient Backdrop */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, #1c1c1c 0%, #0a0a0a 100%)',
          opacity: 0.85,
        }}
      />

      {/* Side Vertical Scroll Indicator from Editorial Design */}
      <div className="hidden xl:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col gap-8 items-center opacity-40 z-20 pointer-events-none">
        <p className="writing-vertical-rl rotate-180 uppercase tracking-[0.5em] text-[9px] text-white">
          Scroll to Explore Models
        </p>
        <div className="w-px h-24 bg-gradient-to-b from-white/0 via-white/50 to-white/0" />
      </div>

      {/* Main Editorial Stack Layout strictly matching Design HTML */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-7xl px-4">
        {/* Top Massive Headline */}
        <h1
          className="font-black uppercase text-center font-display tracking-tight text-white/90 leading-none transition-all duration-700"
          style={{
            fontSize: 'clamp(4rem, 14vw, 150px)',
            lineHeight: 0.8,
            letterSpacing: '-0.05em',
            opacity: 0.9,
          }}
        >
          {slide.topWord}
        </h1>

        {/* Centerpiece Showcase Card with Glow and Ring */}
        <div
          onClick={onExploreLineup}
          className="w-full max-w-[760px] h-[340px] md:h-[400px] my-[-20px] md:my-[-35px] rounded-2xl overflow-hidden relative shadow-[0_0_100px_rgba(255,44,44,0.18)] ring-1 ring-white/10 group cursor-pointer transition-all duration-500 hover:shadow-[0_0_130px_rgba(255,44,44,0.28)]"
        >
          {/* Card Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-20" />
          <div className="absolute inset-0 bg-[#161616] flex items-center justify-center z-10">
            <img
              src={slide.bgImage}
              alt={slide.modelName}
              className="w-full h-full object-cover object-center opacity-85 group-hover:scale-105 transition-transform duration-700 filter brightness-[0.9]"
            />
          </div>

          {/* Bottom Left: Collection Tag & Model Title */}
          <div className="absolute bottom-6 md:bottom-8 left-6 md:left-10 z-30">
            <p className="text-[#ff2c2c] text-xs font-bold tracking-widest uppercase mb-1">
              {slide.collection}
            </p>
            <h3 className="text-3xl md:text-5xl font-black uppercase italic font-display text-white tracking-tight">
              {slide.modelName}
            </h3>
          </div>

          {/* Bottom Right: Monospace Specs & Fast Actions */}
          <div className="absolute bottom-6 md:bottom-8 right-6 md:right-10 z-30 flex items-end gap-5 sm:gap-6">
            <div className="text-right">
              <p className="text-[10px] text-white/50 uppercase tracking-tighter font-semibold">HP</p>
              <p className="text-lg md:text-2xl font-mono font-bold text-white leading-tight">{slide.hp}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-white/50 uppercase tracking-tighter font-semibold">Torque</p>
              <p className="text-lg md:text-2xl font-mono font-bold text-white leading-tight">
                {slide.torque}<span className="text-xs text-white/70">lb-ft</span>
              </p>
            </div>
            <div className="hidden sm:block text-right">
              <p className="text-[10px] text-white/50 uppercase tracking-tighter font-semibold">Engine</p>
              <p className="text-sm md:text-base font-mono font-bold text-[#ff2c2c] leading-tight">{slide.displacement}</p>
            </div>
          </div>
        </div>

        {/* Bottom Massive Headline */}
        <h1
          className="font-black uppercase text-center font-display tracking-tight text-white/90 leading-none transition-all duration-700"
          style={{
            fontSize: 'clamp(4rem, 14vw, 150px)',
            lineHeight: 0.8,
            letterSpacing: '-0.05em',
            opacity: 0.9,
          }}
        >
          {slide.bottomWord}
        </h1>

        {/* Quick Action Navigation & Controls Under Banner */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 z-20">
          <button
            onClick={onExploreLineup}
            className="bg-[#ff2c2c] hover:bg-white text-black px-6 py-2.5 text-xs font-black uppercase tracking-widest rounded-sm transition-all shadow-lg flex items-center space-x-2"
          >
            <span>Explore Lineup</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onOpenTestRide}
            className="border border-white/20 hover:border-[#ff2c2c] hover:text-[#ff2c2c] bg-[#161616] text-white px-6 py-2.5 text-xs font-bold uppercase tracking-widest rounded-sm transition-all"
          >
            Book Test Ride
          </button>
        </div>

        {/* Carousel Slider Controls */}
        <div className="mt-6 flex items-center justify-center space-x-3 z-20">
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
            aria-label="Previous slide"
            className="w-8 h-8 rounded-full border border-white/10 bg-[#161616] hover:border-[#ff2c2c] hover:text-[#ff2c2c] text-white flex items-center justify-center transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center space-x-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  idx === currentSlide ? 'w-8 bg-[#ff2c2c]' : 'w-2 bg-white/20 hover:bg-white/50'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
            aria-label="Next slide"
            className="w-8 h-8 rounded-full border border-white/10 bg-[#161616] hover:border-[#ff2c2c] hover:text-[#ff2c2c] text-white flex items-center justify-center transition-all"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? 'Pause auto-play' : 'Resume auto-play'}
            className="p-1 text-white/50 hover:text-white transition-colors ml-2"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </div>
  );
}
