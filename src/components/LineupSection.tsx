import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { MotorcycleModel, MOTORCYCLE_LINEUP } from '../data/motorcycles';
import { ChevronLeft, ChevronRight, Check, Sliders, ArrowRight } from 'lucide-react';

interface LineupSectionProps {
  selectedModelId?: string;
  onOpenCustomizer: (model: MotorcycleModel) => void;
  onOpenTestRide: (model: MotorcycleModel) => void;
}

export function LineupSection({ selectedModelId, onOpenCustomizer, onOpenTestRide }: LineupSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState<number>(0);

  const trackRef = useRef<HTMLDivElement>(null);
  const isAnimatingRef = useRef<boolean>(false);
  const extendedIndexRef = useRef<number>(1);
  const isDraggingRef = useRef<boolean>(false);
  const startXRef = useRef<number>(0);

  const categories = ['ALL', 'SCOUT BOBBER', '125TH ANNIV.'];

  const filteredLineup = activeCategory === 'ALL'
    ? MOTORCYCLE_LINEUP
    : MOTORCYCLE_LINEUP.filter(m => m.category === activeCategory);

  const N = filteredLineup.length;

  // Extended array with clone of last item at start and clone of first item at end
  const extendedLineup = N > 0 ? [
    filteredLineup[N - 1], // Clone of last item (extendedIndex = 0)
    ...filteredLineup,     // Real items (extendedIndex = 1 to N)
    filteredLineup[0],     // Clone of first item (extendedIndex = N + 1)
  ] : [];

  const totalSlides = extendedLineup.length;

  // Initialize track position on mount or category change
  useEffect(() => {
    if (!trackRef.current || totalSlides === 0) return;
    extendedIndexRef.current = 1;
    setCurrentIndex(0);
    setSelectedColorIndex(0);
    isAnimatingRef.current = false;
    gsap.set(trackRef.current, {
      xPercent: -1 * (100 / totalSlides),
    });
  }, [activeCategory, totalSlides]);

  // Sync if external modelId is selected via hero card / header
  useEffect(() => {
    if (selectedModelId) {
      const idx = filteredLineup.findIndex(m => m.id === selectedModelId);
      if (idx !== -1 && idx !== currentIndex) {
        goToRealIndex(idx);
      }
    }
  }, [selectedModelId]);

  const goToRealIndex = (targetRealIndex: number) => {
    if (!trackRef.current || totalSlides === 0 || isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    const targetExtended = targetRealIndex + 1;
    extendedIndexRef.current = targetExtended;
    setCurrentIndex(targetRealIndex);
    setSelectedColorIndex(0);

    gsap.to(trackRef.current, {
      xPercent: -targetExtended * (100 / totalSlides),
      duration: 0.95,
      ease: 'power3.out',
      overwrite: 'auto',
      onComplete: () => {
        isAnimatingRef.current = false;
      },
    });
  };

  const handleNext = () => {
    if (!trackRef.current || totalSlides === 0 || isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    const nextExtended = extendedIndexRef.current + 1;
    extendedIndexRef.current = nextExtended;

    // Calculate real index for info display
    const nextRealIndex = (currentIndex + 1) % N;
    setCurrentIndex(nextRealIndex);
    setSelectedColorIndex(0);

    gsap.to(trackRef.current, {
      xPercent: -nextExtended * (100 / totalSlides),
      duration: 0.95,
      ease: 'power3.out',
      overwrite: 'auto',
      onComplete: () => {
        // If we reached the clone of the first item at index N + 1, seamless snap to index 1
        if (nextExtended >= N + 1) {
          extendedIndexRef.current = 1;
          gsap.set(trackRef.current, {
            xPercent: -1 * (100 / totalSlides),
          });
        }
        isAnimatingRef.current = false;
      },
    });
  };

  const handlePrev = () => {
    if (!trackRef.current || totalSlides === 0 || isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    const prevExtended = extendedIndexRef.current - 1;
    extendedIndexRef.current = prevExtended;

    // Calculate real index for info display
    const prevRealIndex = (currentIndex - 1 + N) % N;
    setCurrentIndex(prevRealIndex);
    setSelectedColorIndex(0);

    gsap.to(trackRef.current, {
      xPercent: -prevExtended * (100 / totalSlides),
      duration: 0.95,
      ease: 'power3.out',
      overwrite: 'auto',
      onComplete: () => {
        // If we reached the clone of the last item at index 0, seamless snap to index N
        if (prevExtended <= 0) {
          extendedIndexRef.current = N;
          gsap.set(trackRef.current, {
            xPercent: -N * (100 / totalSlides),
          });
        }
        isAnimatingRef.current = false;
      },
    });
  };

  const handleCategorySelect = (cat: string) => {
    setActiveCategory(cat);
  };

  // Touch Swipe Support
  const handleTouchStart = (e: React.TouchEvent) => {
    isDraggingRef.current = true;
    startXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    const diff = startXRef.current - e.changedTouches[0].clientX;
    if (diff > 45) {
      handleNext();
    } else if (diff < -45) {
      handlePrev();
    }
  };

  const currentModel = filteredLineup[currentIndex] || MOTORCYCLE_LINEUP[0];
  const currentColor = currentModel?.colors[selectedColorIndex] || currentModel?.colors[0];

  return (
    <section id="lineup" className="relative w-full bg-[#0a0a0a] text-[#f5f5f5] pt-16 pb-12 overflow-hidden border-t border-white/5">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col md:flex-row md:items-end justify-between border-b border-white/5 pb-6 mb-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#ff2c2c]">
            Heritage & Innovation Lineup
          </span>
          <h2 className="text-4xl md:text-6xl font-black uppercase font-display tracking-tight text-white mt-1">
            MOTORCYCLES
          </h2>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-8 mt-4 md:mt-0 text-xs uppercase tracking-[0.15em] font-medium">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategorySelect(cat)}
              className={`pb-1 transition-all relative cursor-pointer ${
                activeCategory === cat
                  ? 'text-[#ff2c2c] font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#ff2c2c]'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Motorcycle Infinite Looping Carousel Stage */}
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 relative min-h-[460px] sm:min-h-[520px] md:min-h-[560px] flex items-center justify-center overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Continuous Looping Strip */}
        <div className="w-full overflow-hidden relative">
          <div
            ref={trackRef}
            className="flex will-change-transform"
            style={{ width: `${totalSlides * 100}%` }}
          >
            {extendedLineup.map((bike, idx) => {
              // Real index check for active styling
              const realBikeIndex = (idx === 0) ? N - 1 : (idx === totalSlides - 1) ? 0 : idx - 1;
              const isCurrent = realBikeIndex === currentIndex;
              const bikeColor = isCurrent ? currentColor : bike.colors[0];

              return (
                <div
                  key={`ext-${bike.id}-${idx}`}
                  className="flex-shrink-0 relative min-h-[460px] sm:min-h-[520px] md:min-h-[560px] flex flex-col items-center justify-center px-4"
                  style={{ width: `${100 / totalSlides}%` }}
                >
                  {/* Giant Background Typography: Moves continuously in the track */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-0 px-4 text-center opacity-30 sm:opacity-35">
                    <h1
                      className="text-white font-black uppercase tracking-tight leading-none font-display w-full max-w-5xl mx-auto truncate"
                      style={{
                        fontSize: 'clamp(2.5rem, 8.5vw, 7.5rem)',
                        lineHeight: 0.9,
                        letterSpacing: '-0.03em',
                      }}
                    >
                      {bike.bgTitle}
                    </h1>
                    <h2
                      className="text-[#ff2c2c] font-extrabold uppercase tracking-widest mt-2 font-display w-full max-w-4xl mx-auto truncate"
                      style={{
                        fontSize: 'clamp(0.85rem, 2.4vw, 2rem)',
                        letterSpacing: '0.12em',
                      }}
                    >
                      {bike.bgSubtitle}
                    </h2>
                  </div>

                  {/* Center Transparent Motorcycle Cutout */}
                  <div className="relative z-10 w-full max-w-5xl flex flex-col items-center justify-center my-2 pointer-events-none">
                    <div className="relative w-full aspect-[16/9] max-h-[360px] md:max-h-[420px] flex items-center justify-center group pointer-events-auto">
                      <img
                        src={bikeColor.imageUrl}
                        alt={`${bike.name} - ${bikeColor.name}`}
                        className={`w-full h-full object-contain filter drop-shadow-[0_25px_40px_rgba(0,0,0,0.95)] transition-transform duration-700 transform ${
                          isCurrent ? 'scale-100 group-hover:scale-105' : 'scale-95 opacity-80'
                        }`}
                      />
                      {/* Studio Floor Red Accent Glow & Shadow */}
                      <div className="absolute -bottom-4 w-3/4 h-12 bg-[#ff2c2c]/15 blur-2xl rounded-full pointer-events-none" />
                      <div className="absolute -bottom-2 w-2/3 h-8 bg-black/90 blur-xl rounded-full pointer-events-none" />
                    </div>

                    {/* Model Price Pill */}
                    <div className="mt-1 text-center z-20 pointer-events-auto">
                      <span className="bg-[#161616]/90 border border-white/10 text-white text-[11px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-sm shadow-xl backdrop-blur-md">
                        STARTING AT <span className="text-[#ff2c2c]">{bike.price}</span> MSRP*
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Carousel Navigation Arrows */}
        <button
          onClick={handlePrev}
          aria-label="Previous motorcycle"
          className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-13 md:h-13 rounded-full border border-white/10 bg-[#161616]/90 hover:border-[#ff2c2c] text-white hover:text-[#ff2c2c] shadow-2xl flex items-center justify-center transition-all hover:scale-105 focus:outline-none backdrop-blur-sm cursor-pointer active:scale-95"
        >
          <ChevronLeft className="w-6 h-6 stroke-[2]" />
        </button>
        <button
          onClick={handleNext}
          aria-label="Next motorcycle"
          className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-13 md:h-13 rounded-full border border-white/10 bg-[#161616]/90 hover:border-[#ff2c2c] text-white hover:text-[#ff2c2c] shadow-2xl flex items-center justify-center transition-all hover:scale-105 focus:outline-none backdrop-blur-sm cursor-pointer active:scale-95"
        >
          <ChevronRight className="w-6 h-6 stroke-[2]" />
        </button>
      </div>

      {/* Model Information & Color Swatches & Action Bar */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 mt-4 pt-6 border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Column 1: Model Title & Short Bio (4 cols) */}
          <div className="lg:col-span-4">
            <span className="text-[10px] text-[#ff2c2c] font-bold uppercase tracking-widest block mb-1">
              Official Indian Model
            </span>
            <h3 className="text-2xl md:text-3xl font-black uppercase italic font-display text-white leading-tight">
              {currentModel.name}
            </h3>
            <p className="text-xs font-bold uppercase tracking-wider text-white/60 mt-1">
              {currentModel.subtitle}
            </p>
            <p className="text-xs text-white/50 mt-2 line-clamp-2 leading-relaxed">
              {currentModel.description}
            </p>
          </div>

          {/* Column 2: Color Palette Swatch Selector (4 cols) */}
          <div className="lg:col-span-4 flex flex-col items-start lg:items-center">
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/50 mb-2">
              Colorway: <strong className="text-white">{currentColor.name}</strong>
            </span>
            <div className="flex items-center space-x-3">
              {currentModel.colors.map((c, i) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColorIndex(i)}
                  title={c.name}
                  className={`w-7 h-7 rounded-full transition-all flex items-center justify-center relative cursor-pointer ${
                    selectedColorIndex === i
                      ? 'ring-2 ring-offset-2 ring-offset-[#0a0a0a] ring-[#ff2c2c] scale-110'
                      : 'opacity-70 hover:opacity-100 hover:scale-105 ring-1 ring-white/20'
                  }`}
                  style={{ backgroundColor: c.hex }}
                >
                  {selectedColorIndex === i && (
                    <Check className={`w-3.5 h-3.5 ${c.hex === '#e2e5e8' ? 'text-black' : 'text-white'}`} />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Column 3: CTAs (Build & Price, Schedule Test Ride) (4 cols) */}
          <div className="lg:col-span-4 flex flex-wrap sm:flex-nowrap items-center justify-start lg:justify-end gap-3">
            <button
              onClick={() => onOpenCustomizer(currentModel)}
              className="w-full sm:w-auto bg-[#ff2c2c] hover:bg-white text-black px-5 py-3 rounded-sm text-[11px] font-black uppercase tracking-wider shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer active:scale-95"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Build & Price</span>
            </button>
            <button
              onClick={() => onOpenTestRide(currentModel)}
              className="w-full sm:w-auto border border-white/20 hover:border-[#ff2c2c] hover:text-[#ff2c2c] bg-[#161616] text-white px-5 py-3 rounded-sm text-[11px] font-bold uppercase tracking-wider transition-all flex items-center justify-center space-x-1.5 cursor-pointer active:scale-95"
            >
              <span>Schedule Ride</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Technical Specs Monospace Metric Bar */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 bg-[#161616] p-4 rounded-lg border border-white/5">
          <div className="border-r border-white/5 last:border-0 pr-2">
            <span className="text-[9px] font-bold uppercase tracking-wider text-white/40 block">Displacement</span>
            <span className="text-sm font-bold text-white font-mono">{currentModel.displacement}</span>
          </div>
          <div className="border-r border-white/5 last:border-0 pr-2">
            <span className="text-[9px] font-bold uppercase tracking-wider text-white/40 block">Peak Power</span>
            <span className="text-sm font-bold text-[#ff2c2c] font-mono">{currentModel.horsepower}</span>
          </div>
          <div className="border-r border-white/5 last:border-0 pr-2">
            <span className="text-[9px] font-bold uppercase tracking-wider text-white/40 block">Peak Torque</span>
            <span className="text-sm font-bold text-white font-mono">{currentModel.torque}</span>
          </div>
          <div className="border-r border-white/5 last:border-0 pr-2">
            <span className="text-[9px] font-bold uppercase tracking-wider text-white/40 block">Seat Height</span>
            <span className="text-sm font-bold text-white font-mono">{currentModel.seatHeight}</span>
          </div>
          <div className="border-r border-white/5 last:border-0 pr-2">
            <span className="text-[9px] font-bold uppercase tracking-wider text-white/40 block">Dry Weight</span>
            <span className="text-sm font-bold text-white font-mono">{currentModel.weight}</span>
          </div>
          <div>
            <span className="text-[9px] font-bold uppercase tracking-wider text-white/40 block">Fuel Tank</span>
            <span className="text-sm font-bold text-white font-mono">{currentModel.fuelCapacity}</span>
          </div>
        </div>
      </div>

      {/* Editorial Bottom Horizontal Carousel Quick-Picker */}
      <div className="mt-10 pt-6 border-t border-white/5 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-3 flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
            Quick Select Model
          </span>
          <span className="text-[10px] text-white/40 uppercase">
            {filteredLineup.length} Models Available
          </span>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex gap-4 overflow-x-auto pb-4 pt-1 no-scrollbar">
          {filteredLineup.map((bike, idx) => {
            const isSelected = bike.id === currentModel.id;
            return (
              <div
                key={bike.id}
                onClick={() => goToRealIndex(idx)}
                className={`min-w-[260px] cursor-pointer bg-[#161616] border rounded-lg p-3 flex items-center gap-3 transition-all ${
                  isSelected
                    ? 'border-[#ff2c2c] shadow-[0_0_30px_rgba(255,44,44,0.18)] ring-1 ring-[#ff2c2c]'
                    : 'border-white/5 hover:border-[#ff2c2c]/40 hover:bg-[#1a1a1a]'
                }`}
              >
                <div className="w-18 h-12 bg-[#202020] rounded flex items-center justify-center overflow-hidden shrink-0 border border-white/5 p-1">
                  <img
                    src={bike.colors[0].imageUrl}
                    alt={bike.name}
                    className="w-full h-full object-contain filter drop-shadow"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[9px] text-[#ff2c2c] font-bold uppercase tracking-widest truncate">
                    {bike.category}
                  </p>
                  <p className="font-bold uppercase italic text-xs truncate text-white">
                    {bike.name}
                  </p>
                  <p className="text-[10px] text-white/50 font-mono">
                    Starting at {bike.price}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
