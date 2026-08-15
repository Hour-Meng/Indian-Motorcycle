import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight, Layers } from 'lucide-react';

interface HeaderProps {
  onOpenDealerModal: () => void;
  onOpenEmailModal: () => void;
  onOpenCartModal: () => void;
  onSelectModel: (modelId: string) => void;
  onNavigateToLineup?: () => void;
}

export function Header({
  onOpenDealerModal,
  onOpenEmailModal,
  onOpenCartModal,
  onSelectModel,
  onNavigateToLineup,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolledDown, setIsScrolledDown] = useState(false);

  // Auto-hide navigation bar when scrolling down, show when at the top
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setIsScrolledDown(true);
      } else {
        setIsScrolledDown(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLineupClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigateToLineup) {
      onNavigateToLineup();
    } else {
      const el = document.getElementById('lineup');
      if (el) {
        (window as any).__isNavigatingScroll = true;
        el.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          (window as any).__isNavigatingScroll = false;
        }, 1000);
      }
    }
  };

  const handleHeritageClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('heritage');
    if (el) {
      (window as any).__isNavigatingScroll = true;
      el.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        (window as any).__isNavigatingScroll = false;
      }, 1000);
    }
  };

  const handleOwnersClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('footer');
    if (el) {
      (window as any).__isNavigatingScroll = true;
      el.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        (window as any).__isNavigatingScroll = false;
      }, 1000);
    }
  };

  return (
    <header
      className={`w-full z-50 fixed top-0 left-0 right-0 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/5 transition-all duration-500 ease-out ${
        isScrolledDown
          ? '-translate-y-full opacity-0 pointer-events-none'
          : 'translate-y-0 opacity-100 pointer-events-auto shadow-2xl'
      }`}
    >
      {/* Top Variation Preview Pill */}
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
          <button
            onClick={handleLineupClick}
            className="hover:text-[#ff2c2c] transition-colors py-1 cursor-pointer font-bold uppercase tracking-[0.2em] text-xs bg-transparent border-0"
          >
            MOTORCYCLES
          </button>
          <button
            onClick={handleHeritageClick}
            className="hover:text-[#ff2c2c] transition-colors py-1 cursor-pointer font-bold uppercase tracking-[0.2em] text-xs bg-transparent border-0"
          >
            OFF-ROAD
          </button>
          <button
            onClick={onOpenDealerModal}
            className="hover:text-[#ff2c2c] transition-colors py-1 uppercase font-bold tracking-[0.2em] text-xs cursor-pointer bg-transparent border-0"
          >
            EXPERIENCE
          </button>
          <button
            onClick={handleOwnersClick}
            className="hover:text-[#ff2c2c] transition-colors py-1 cursor-pointer font-bold uppercase tracking-[0.2em] text-xs bg-transparent border-0"
          >
            OWNERS
          </button>
        </div>

        {/* Right CTA Button: BUILD YOURS */}
        <div className="hidden sm:flex items-center gap-4">
          <button
            onClick={onOpenDealerModal}
            className="bg-white text-black hover:bg-[#ff2c2c] hover:text-black px-5 py-2 text-xs font-black uppercase tracking-wider rounded-sm transition-all shadow-md active:scale-95 cursor-pointer"
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
          <button
            onClick={(e) => {
              setMobileMenuOpen(false);
              handleLineupClick(e);
            }}
            className="text-left text-white font-bold uppercase text-xs tracking-wider py-2 px-2 hover:bg-white/5 rounded"
          >
            Motorcycles
          </button>
          <button
            onClick={(e) => {
              setMobileMenuOpen(false);
              handleHeritageClick(e);
            }}
            className="text-left text-white font-bold uppercase text-xs tracking-wider py-2 px-2 hover:bg-white/5 rounded"
          >
            Off-Road & Heritage
          </button>
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
          <button
            onClick={(e) => {
              setMobileMenuOpen(false);
              handleOwnersClick(e);
            }}
            className="text-left text-white font-bold uppercase text-xs tracking-wider py-2 px-2 hover:bg-white/5 rounded"
          >
            Owners
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenDealerModal();
            }}
            className="w-full bg-[#ff2c2c] text-black text-center py-2.5 font-bold uppercase tracking-wider text-xs rounded-sm mt-2 cursor-pointer"
          >
            Build Yours
          </button>
        </div>
      )}
    </header>
  );
}
