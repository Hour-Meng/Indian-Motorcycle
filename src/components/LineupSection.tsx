import React, { useState, useEffect } from 'react';
import { MotorcycleModel, MOTORCYCLE_LINEUP } from '../data/motorcycles';
import { ChevronLeft, ChevronRight, Check, Sliders, ArrowRight, Sparkles } from 'lucide-react';

interface LineupSectionProps {
  selectedModelId?: string;
  onOpenCustomizer: (model: MotorcycleModel) => void;
  onOpenTestRide: (model: MotorcycleModel) => void;
}

export function LineupSection({ selectedModelId, onOpenCustomizer, onOpenTestRide }: LineupSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState<number>(0);

  const categories = ['ALL', 'SCOUT BOBBER', '125TH ANNIV.', 'CRUISER'];

  const filteredLineup = activeCategory === 'ALL'
    ? MOTORCYCLE_LINEUP
    : MOTORCYCLE_LINEUP.filter(m => m.category === activeCategory);

  // Sync if an external modelId is selected via search/nav
  useEffect(() => {
    if (selectedModelId) {
      const idx = filteredLineup.findIndex(m => m.id === selectedModelId);
      if (idx !== -1) {
        setCurrentIndex(idx);
        setSelectedColorIndex(0);
      }
    }
  }, [selectedModelId, filteredLineup]);

  const currentModel = filteredLineup[currentIndex] || MOTORCYCLE_LINEUP[0];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredLineup.length);
    setSelectedColorIndex(0);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredLineup.length) % filteredLineup.length);
    setSelectedColorIndex(0);
  };

  const handleCategorySelect = (cat: string) => {
    setActiveCategory(cat);
    setCurrentIndex(0);
    setSelectedColorIndex(0);
  };

  const currentColor = currentModel.colors[selectedColorIndex] || currentModel.colors[0];

  return (
    <section id="lineup" className="relative w-full bg-[#0a0a0a] text-[#f5f5f5] pt-16 pb-12 overflow-hidden border-t border-white/5">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col md:flex-row md:items-end justify-between border-b border-white/5 pb-6 mb-8">
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
              className={`pb-1 transition-all relative ${
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

      {/* Main Motorcycle Display Stage */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative min-h-[540px] md:min-h-[620px] flex flex-col items-center justify-center">
        {/* Giant Background Typography strictly reflecting official site / editorial showcase */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-0 overflow-hidden text-center opacity-40">
          <h1
            className="text-white font-black uppercase tracking-tight leading-none transition-all duration-500 font-display"
            style={{
              fontSize: 'clamp(3rem, 11vw, 9.5rem)',
              lineHeight: 0.85,
              letterSpacing: '-0.04em',
            }}
          >
            {currentModel.bgTitle}
          </h1>
          <h2
            className="text-[#ff2c2c] font-extrabold uppercase tracking-widest mt-2 transition-all duration-500 font-display"
            style={{
              fontSize: 'clamp(1.1rem, 3.2vw, 3rem)',
              letterSpacing: '0.1em',
            }}
          >
            {currentModel.bgSubtitle}
          </h2>
        </div>

        {/* Center Motorcycle Cutout */}
        <div className="relative z-10 w-full max-w-4xl flex flex-col items-center justify-center my-4">
          <div className="relative w-full aspect-[16/10] max-h-[420px] flex items-center justify-center group">
            <img
              src={currentColor.imageUrl}
              alt={`${currentModel.name} - ${currentColor.name}`}
              className="w-full h-full object-contain max-h-[380px] filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)] transition-all duration-700 transform group-hover:scale-105"
            />
            {/* Studio Floor Red Accent Glow & Shadow */}
            <div className="absolute -bottom-6 w-3/4 h-10 bg-[#ff2c2c]/10 blur-2xl rounded-full pointer-events-none" />
            <div className="absolute -bottom-3 w-2/3 h-6 bg-black/80 blur-xl rounded-full pointer-events-none" />
          </div>

          {/* Model Price Pill */}
          <div className="mt-2 text-center z-20">
            <span className="bg-[#161616] border border-white/10 text-white text-[11px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-sm shadow-md">
              STARTING AT <span className="text-[#ff2c2c]">{currentModel.price}</span> MSRP*
            </span>
          </div>
        </div>

        {/* Carousel Navigation Arrows */}
        <button
          onClick={handlePrev}
          aria-label="Previous motorcycle"
          className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-13 md:h-13 rounded-full border border-white/10 bg-[#161616]/90 hover:border-[#ff2c2c] text-white hover:text-[#ff2c2c] shadow-2xl flex items-center justify-center transition-all hover:scale-105 focus:outline-none backdrop-blur-sm"
        >
          <ChevronLeft className="w-6 h-6 stroke-[2]" />
        </button>
        <button
          onClick={handleNext}
          aria-label="Next motorcycle"
          className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-13 md:h-13 rounded-full border border-white/10 bg-[#161616]/90 hover:border-[#ff2c2c] text-white hover:text-[#ff2c2c] shadow-2xl flex items-center justify-center transition-all hover:scale-105 focus:outline-none backdrop-blur-sm"
        >
          <ChevronRight className="w-6 h-6 stroke-[2]" />
        </button>
      </div>

      {/* Model Information & Color Swatches & Action Bar */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 mt-6 pt-6 border-t border-white/5">
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
                  className={`w-7 h-7 rounded-full transition-all flex items-center justify-center relative ${
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
              className="w-full sm:w-auto bg-[#ff2c2c] hover:bg-white text-black px-5 py-3 rounded-sm text-[11px] font-black uppercase tracking-wider shadow-lg transition-all flex items-center justify-center space-x-2"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Build & Price</span>
            </button>
            <button
              onClick={() => onOpenTestRide(currentModel)}
              className="w-full sm:w-auto border border-white/20 hover:border-[#ff2c2c] hover:text-[#ff2c2c] bg-[#161616] text-white px-5 py-3 rounded-sm text-[11px] font-bold uppercase tracking-wider transition-all flex items-center justify-center space-x-1.5"
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

      {/* Editorial Bottom Horizontal Carousel Quick-Picker matching Design HTML */}
      <div className="mt-12 pt-6 border-t border-white/5 bg-[#0d0d0d]">
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
                onClick={() => {
                  setCurrentIndex(idx);
                  setSelectedColorIndex(0);
                }}
                className={`min-w-[280px] cursor-pointer bg-[#161616] border rounded-lg p-3.5 flex items-center gap-3.5 transition-all ${
                  isSelected
                    ? 'border-[#ff2c2c] shadow-[0_0_30px_rgba(255,44,44,0.15)] ring-1 ring-[#ff2c2c]/40'
                    : 'border-white/5 hover:border-[#ff2c2c]/30 hover:bg-[#1a1a1a]'
                }`}
              >
                <div className="w-20 h-14 bg-[#222] rounded flex items-center justify-center overflow-hidden shrink-0 border border-white/5">
                  <img
                    src={bike.colors[0].imageUrl}
                    alt={bike.name}
                    className="w-full h-full object-contain p-1 filter drop-shadow"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[9px] text-[#ff2c2c] font-bold uppercase tracking-widest truncate">
                    {bike.category}
                  </p>
                  <p className="font-bold uppercase italic text-xs truncate text-white">
                    {bike.name}
                  </p>
                  <p className="text-[10px] text-white/40 font-mono">
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
