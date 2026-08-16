import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';

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
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Dynamic smart navbar: hides when scrolling down, reappears immediately when scrolling up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // When near the top, always show navbar
      if (currentScrollY < 60) {
        setIsVisible(true);
      }
      // Scrolling down -> hide navbar smoothly
      else if (currentScrollY > lastScrollY + 5 && currentScrollY > 100) {
        setIsVisible(false);
      }
      // Scrolling up -> reveal navbar immediately
      else if (currentScrollY < lastScrollY - 5) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const smoothNavigateTo = (targetId: string | 'top') => {
    (window as any).__isNavigatingScroll = true;
    window.dispatchEvent(new CustomEvent('navigatingHeroSkip', { detail: { target: targetId } }));

    if (targetId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }

    setTimeout(() => {
      (window as any).__isNavigatingScroll = false;
    }, 900);
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    smoothNavigateTo('top');
  };

  const handleLineupClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigateToLineup) {
      onNavigateToLineup();
    } else {
      smoothNavigateTo('lineup');
    }
  };

  const handleHeritageClick = (e: React.MouseEvent) => {
    e.preventDefault();
    smoothNavigateTo('heritage');
  };

  const handleOwnersClick = (e: React.MouseEvent) => {
    e.preventDefault();
    smoothNavigateTo('footer');
  };

  return (
    <header
      className={`w-full z-50 fixed top-0 left-0 right-0 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible
          ? 'translate-y-0 opacity-100 pointer-events-auto shadow-2xl'
          : '-translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      {/* Sleek Navigation Bar */}
      <nav className="px-6 lg:px-12 py-3 flex items-center justify-between">
        {/* Left: Actual Indian Motorcycle Official Logo */}
        <div className="flex items-center gap-3">
          <a
            href="#hero"
            onClick={handleLogoClick}
            className="flex items-center group cursor-pointer"
            aria-label="Indian Motorcycle Home"
          >
            <img
              src="images/nav-bar-logo-indian-motorcycles.svg"
              alt="Indian Motorcycle"
              className="h-7 sm:h-8 w-auto object-contain brightness-100 group-hover:opacity-90 transition-opacity"
            />
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

        {/* Right Tools: BUILD YOURS Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenDealerModal}
            className="bg-white text-black hover:bg-[#ff2c2c] hover:text-black px-4 sm:px-5 py-1.5 sm:py-2 text-xs font-black uppercase tracking-wider rounded-sm transition-all shadow-md active:scale-95 cursor-pointer"
          >
            BUILD YOURS
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white hover:text-[#ff2c2c] focus:outline-none ml-1"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
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
