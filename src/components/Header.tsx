import React, { useState } from 'react';
import { Menu, X, ChevronRight, Layers } from 'lucide-react';

interface HeaderProps {
  onOpenDealerModal: () => void;
  onOpenEmailModal: () => void;
  onOpenCartModal: () => void;
  onSelectModel: (modelId: string) => void;
}

export function Header({ onOpenDealerModal, onOpenEmailModal, onOpenCartModal, onSelectModel }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full z-50 sticky top-0 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/5 transition-all">
      {/* Top Variation Preview Pill (as shown in user design reference) */}
      <div className="w-full flex justify-end px-6 lg:px-12 pt-2 pb-1 pointer-events-none">
        <div className="pointer-events-auto inline-flex items-center gap-2 bg-[#818cf8]/20 border border-[#818cf8]/40 text-[#c7d2fe] text-[10px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-lg backdrop-blur-md">
          <Layers className="w-3 h-3 text-[#a5b4fc]" />
          <span>Variation preview</span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="px-6 lg:px-12 py-3 flex items-center justify-between">
        {/* Left: Indian Motorcycle Logo Badge */}
        <div className="flex items-center gap-3">
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="w-8 h-8 bg-[#ff2c2c] rounded-full flex items-center justify-center font-black text-black text-base italic shadow-lg group-hover:scale-105 transition-transform">
              /
            </div>
            <span className="font-black uppercase tracking-[0.2em] text-sm sm:text-base font-display text-white">
              INDIAN MOTORCYCLE
            </span>
          </a>
        </div>

        {/* Center Navigation: MOTORCYCLES | OFF-ROAD | EXPERIENCE | OWNERS */}
        <div className="hidden md:flex items-center gap-8 lg:gap-10 text-xs font-bold uppercase tracking-[0.2em] text-white/80">
          <a
            href="#lineup"
            className="hover:text-[#ff2c2c] transition-colors py-1 cursor-pointer"
          >
            MOTORCYCLES
          </a>
          <a
            href="#heritage"
            className="hover:text-[#ff2c2c] transition-colors py-1 cursor-pointer"
          >
            OFF-ROAD
          </a>
          <button
            onClick={onOpenDealerModal}
            className="hover:text-[#ff2c2c] transition-colors py-1 uppercase font-bold tracking-[0.2em] text-xs cursor-pointer"
          >
            EXPERIENCE
          </button>
          <a
            href="#footer"
            className="hover:text-[#ff2c2c] transition-colors py-1 cursor-pointer"
          >
            OWNERS
          </a>
        </div>

        {/* Right CTA Button: BUILD YOURS */}
        <div className="hidden sm:flex items-center gap-4">
          <button
            onClick={onOpenDealerModal}
            className="bg-white text-black hover:bg-[#ff2c2c] hover:text-black px-5 py-2 text-xs font-black uppercase tracking-wider rounded-sm transition-all shadow-md active:scale-95"
          >
            BUILD YOURS
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-white hover:text-[#ff2c2c] focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden px-6 pt-3 pb-6 border-t border-white/5 flex flex-col space-y-3 bg-[#0a0a0a] animate-fadeIn">
          <a
            href="#lineup"
            onClick={() => setMobileMenuOpen(false)}
            className="text-white font-bold uppercase text-xs tracking-wider py-2 px-2 hover:bg-white/5 rounded"
          >
            Motorcycles
          </a>
          <a
            href="#heritage"
            onClick={() => setMobileMenuOpen(false)}
            className="text-white font-bold uppercase text-xs tracking-wider py-2 px-2 hover:bg-white/5 rounded"
          >
            Off-Road & Heritage
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenDealerModal();
            }}
            className="text-left text-white font-bold uppercase text-xs tracking-wider py-2 px-2 hover:bg-white/5 rounded flex items-center justify-between"
          >
            <span>Experience & Test Ride</span>
            <ChevronRight className="w-4 h-4 text-[#ff2c2c]" />
          </button>
          <a
            href="#footer"
            onClick={() => setMobileMenuOpen(false)}
            className="text-white font-bold uppercase text-xs tracking-wider py-2 px-2 hover:bg-white/5 rounded"
          >
            Owners
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenDealerModal();
            }}
            className="w-full bg-[#ff2c2c] text-black text-center py-2.5 font-bold uppercase tracking-wider text-xs rounded-sm mt-2"
          >
            Build Yours
          </button>
        </div>
      )}
    </header>
  );
}
