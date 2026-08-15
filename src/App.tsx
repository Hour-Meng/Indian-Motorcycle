/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroScrub } from './components/ui/hero-scrub';
import { LineupSection } from './components/LineupSection';
import { ScoutBobberFeatures } from './components/ScoutBobberFeatures';
import { AudioEngineRev } from './components/AudioEngineRev';
import { CustomizerModal } from './components/CustomizerModal';
import { DealerLocatorModal } from './components/DealerLocatorModal';
import { EmailSignupModal } from './components/EmailSignupModal';
import { Footer } from './components/Footer';
import { MOTORCYCLE_LINEUP, MotorcycleModel } from './data/motorcycles';

export default function App() {
  const [selectedModel, setSelectedModel] = useState<MotorcycleModel>(MOTORCYCLE_LINEUP[0]);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isDealerModalOpen, setIsDealerModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  // Model Cards matching the user's design reference
  const heroCards = [
    {
      id: 'scout-bobber-sixty',
      colorTag: 'CLASSIC BLACK',
      name: 'SCOUT BOBBER SIXTY',
      price: 'Starting at $10,749',
      collection: 'HERITAGE COLLECTION',
      hp: '78',
      torque: '65',
      modelData: MOTORCYCLE_LINEUP[1] || MOTORCYCLE_LINEUP[0],
    },
    {
      id: 'scout-bobber-twenty',
      colorTag: 'MILITARY GREY',
      name: 'SCOUT BOBBER TWENTY',
      price: 'Starting at $13,249',
      collection: 'HERITAGE COLLECTION',
      hp: '105',
      torque: '82',
      modelData: MOTORCYCLE_LINEUP[2] || MOTORCYCLE_LINEUP[0],
    },
    {
      id: 'scout-rogue',
      colorTag: 'DARK CHROME',
      name: 'SCOUT ROGUE',
      price: 'Starting at $12,749',
      collection: 'HERITAGE COLLECTION',
      hp: '100',
      torque: '72',
      modelData: MOTORCYCLE_LINEUP[0],
    },
  ];

  const [activeHeroCardId, setActiveHeroCardId] = useState<string>('scout-rogue');

  const activeCardData = heroCards.find((c) => c.id === activeHeroCardId) || heroCards[2];

  const handleHeroCardClick = (card: typeof heroCards[0]) => {
    setActiveHeroCardId(card.id);
    setSelectedModel(card.modelData);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleNavigateToLineup = () => {
    const el = document.getElementById('lineup');
    if (el) {
      (window as any).__isNavigatingScroll = true;
      el.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        (window as any).__isNavigatingScroll = false;
      }, 1000);
    }
  };

  const handleOpenCustomizer = (model: MotorcycleModel) => {
    setSelectedModel(model);
    setIsCustomizerOpen(true);
  };

  const handleOpenTestRide = (model?: MotorcycleModel) => {
    if (model) setSelectedModel(model);
    setIsDealerModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f5f5] flex flex-col font-primary selection:bg-[#ff2c2c] selection:text-black">
      {/* 1. Official Header with Variation Preview & Auto-hide on scroll */}
      <Header
        onOpenDealerModal={() => setIsDealerModalOpen(true)}
        onOpenEmailModal={() => setIsEmailModalOpen(true)}
        onOpenCartModal={() => setIsEmailModalOpen(true)}
        onNavigateToLineup={handleNavigateToLineup}
        onSelectModel={(id) => {
          const m = MOTORCYCLE_LINEUP.find((item) => item.id === id);
          if (m) {
            setSelectedModel(m);
            const card = heroCards.find((c) => c.modelData.id === m.id);
            if (card) setActiveHeroCardId(card.id);
          }
        }}
      />

      {/* 2. Hero Section: Cinematic Scroll-Scrubbed Zooming Hero Card with Storyboard Overlays */}
      <div id="hero" className="relative w-full bg-[#0a0a0a] pt-12 md:pt-0">
        <HeroScrub
          frameCount={180}
          frameUrl={(i) =>
            `images/ezgif-frame-${String((i % 180) + 1).padStart(3, '0')}.jpg`
          }
          titleTop="INDIAN"
          titleBottom="SCOUT"
          accentHex="#ff2c2c"
          collectionName={activeCardData.collection}
          modelName={activeCardData.name}
          hp={activeCardData.hp}
          torque={activeCardData.torque}
          onCardClick={handleNavigateToLineup}
        />

        {/* 3. Bottom Hero Cards Row (Directly below Hero, strictly matching screenshot layout) */}
        <div className="relative z-30 max-w-6xl mx-auto px-6 lg:px-8 -mt-24 sm:-mt-28 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {heroCards.map((card) => {
              const isActive = card.id === activeHeroCardId;
              return (
                <div
                  key={card.id}
                  onClick={() => handleHeroCardClick(card)}
                  className={`group relative cursor-pointer bg-[#121212]/90 backdrop-blur-md rounded-xl p-3.5 flex items-center gap-4 transition-all duration-300 shadow-2xl ${
                    isActive
                      ? 'border border-[#ff2c2c] ring-1 ring-[#ff2c2c] shadow-[0_0_35px_rgba(255,44,44,0.25)] bg-[#181818]'
                      : 'border border-white/10 hover:border-white/25 hover:bg-[#161616]'
                  }`}
                >
                  {/* Left Thumbnail Box with Always-On-Display Indian Scout Driving Video */}
                  <div className="w-24 h-16 sm:w-28 sm:h-18 rounded-lg bg-[#1e1e1e] overflow-hidden relative flex items-center justify-center border border-white/10 shrink-0">
                    <video
                      src="videos/Indian_scout_driving.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover filter brightness-[0.95] group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                    <span className="absolute bottom-1 right-1.5 bg-black/80 text-[8px] font-bold text-white/80 px-1.5 py-0.5 rounded tracking-tighter uppercase font-mono">
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
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. Official Lineup Showcase with Transparent WebP Cutouts & Dual-Slide Transitions */}
      <LineupSection
        selectedModelId={selectedModel?.id}
        onOpenCustomizer={handleOpenCustomizer}
        onOpenTestRide={handleOpenTestRide}
      />

      {/* 5. Scout Bobber Engineering & Heritage Deep Dive */}
      <ScoutBobberFeatures />

      {/* 6. Acoustic American V-Twin Rev Simulator */}
      <AudioEngineRev />

      {/* 7. Quick Action / Build & Price Pre-Order Banner */}
      <section className="w-full bg-[#ff2c2c] text-black py-12 px-6 lg:px-10 shadow-2xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-black/80 block">
              READY TO OWN AN AMERICAN ICON?
            </span>
            <h3 className="text-2xl md:text-4xl font-black uppercase italic font-display text-black mt-0.5">
              BUILD YOUR CUSTOM SCOUT BOBBER TODAY
            </h3>
            <p className="text-xs text-black/80 mt-1 max-w-xl font-medium">
              Customize factory colors, high-flow exhausts, ape hangers, and receive an instant quote from your local dealer.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => handleOpenCustomizer(selectedModel || MOTORCYCLE_LINEUP[0])}
              className="bg-black hover:bg-white hover:text-black text-white px-6 py-3 rounded-sm text-xs font-black uppercase tracking-wider transition-all shadow-xl active:scale-95 cursor-pointer"
            >
              LAUNCH CONFIGURATOR
            </button>
            <button
              onClick={() => handleOpenTestRide(selectedModel || undefined)}
              className="border-2 border-black hover:bg-black hover:text-white text-black px-6 py-3 rounded-sm text-xs font-black uppercase tracking-wider transition-all active:scale-95 cursor-pointer"
            >
              FIND LOCAL INVENTORY
            </button>
          </div>
        </div>
      </section>

      {/* 8. Comprehensive Footer */}
      <Footer />

      {/* Modals */}
      <CustomizerModal
        model={selectedModel}
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        onSelectTestRide={handleOpenTestRide}
      />

      <DealerLocatorModal
        isOpen={isDealerModalOpen}
        onClose={() => setIsDealerModalOpen(false)}
        preSelectedModel={selectedModel}
      />

      <EmailSignupModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
      />
    </div>
  );
}
