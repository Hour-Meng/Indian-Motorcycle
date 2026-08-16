import React from 'react';
import { ArrowUp } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer" className="w-full bg-[#0a0a0a] text-[#f5f5f5] border-t border-white/5 pt-16 pb-12 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Top Banner Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-white/5 text-center">
          <div className="flex flex-col items-center justify-center p-3">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider block text-white text-center">
              2-Year Factory Warranty
            </span>
            <span className="text-[11px] text-white/40 mt-1.5 text-center font-medium">
              Unlimited mileage protection
            </span>
          </div>
          <div className="flex flex-col items-center justify-center p-3">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider block text-white text-center">
              400+ Dealer Network
            </span>
            <span className="text-[11px] text-white/40 mt-1.5 text-center font-medium">
              Certified service & parts
            </span>
          </div>
          <div className="flex flex-col items-center justify-center p-3">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider block text-white text-center">
              Riders Roadside Support
            </span>
            <span className="text-[11px] text-white/40 mt-1.5 text-center font-medium">
              24/7 assistance on the road
            </span>
          </div>
          <div className="flex flex-col items-center justify-center p-3">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider block text-white text-center">
              Spirit Lake, Iowa
            </span>
            <span className="text-[11px] text-white/40 mt-1.5 text-center font-medium">
              Proudly assembled in the USA
            </span>
          </div>
        </div>

        {/* Links Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 py-12 border-b border-white/5 text-xs">
          <div>
            <h4 className="font-black uppercase font-display text-sm text-white mb-4 tracking-wider">
              Scout Lineup
            </h4>
            <ul className="space-y-2 text-white/50">
              <li><a href="#lineup" className="hover:text-[#ff2c2c] transition-colors">Scout Bobber</a></li>
              <li><a href="#lineup" className="hover:text-[#ff2c2c] transition-colors">Scout Bobber Twenty</a></li>
              <li><a href="#lineup" className="hover:text-[#ff2c2c] transition-colors">101 Scout</a></li>
              <li><a href="#lineup" className="hover:text-[#ff2c2c] transition-colors">Scout Sixty Bobber</a></li>
              <li><a href="#lineup" className="hover:text-[#ff2c2c] transition-colors">Sport Scout</a></li>
              <li><a href="#lineup" className="hover:text-[#ff2c2c] transition-colors">Scout Classic</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black uppercase font-display text-sm text-white mb-4 tracking-wider">
              Shopping Tools
            </h4>
            <ul className="space-y-2 text-white/50">
              <li><a href="#customizer" className="hover:text-[#ff2c2c] transition-colors">Build & Price Customizer</a></li>
              <li><a href="#lineup" className="hover:text-[#ff2c2c] transition-colors">Compare Models & Specs</a></li>
              <li><a href="#footer" className="hover:text-[#ff2c2c] transition-colors">Current Special Offers</a></li>
              <li><a href="#footer" className="hover:text-[#ff2c2c] transition-colors">Estimate Payments</a></li>
              <li><a href="#footer" className="hover:text-[#ff2c2c] transition-colors">Value Your Trade-In</a></li>
              <li><a href="#footer" className="hover:text-[#ff2c2c] transition-colors">Request Digital Brochure</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black uppercase font-display text-sm text-white mb-4 tracking-wider">
              Parts & Gear
            </h4>
            <ul className="space-y-2 text-white/50">
              <li><a href="#customizer" className="hover:text-[#ff2c2c] transition-colors">Scout Exhausts & Intake</a></li>
              <li><a href="#customizer" className="hover:text-[#ff2c2c] transition-colors">Bobber Seats & Luggage</a></li>
              <li><a href="#footer" className="hover:text-[#ff2c2c] transition-colors">Riding Jackets & Helmets</a></li>
              <li><a href="#footer" className="hover:text-[#ff2c2c] transition-colors">Maintenance Kits & Oil</a></li>
              <li><a href="#footer" className="hover:text-[#ff2c2c] transition-colors">RIDE COMMAND Accessories</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black uppercase font-display text-sm text-white mb-4 tracking-wider">
              About Indian
            </h4>
            <ul className="space-y-2 text-white/50">
              <li><a href="#heritage" className="hover:text-[#ff2c2c] transition-colors">1901 Heritage & History</a></li>
              <li><a href="#heritage" className="hover:text-[#ff2c2c] transition-colors">Burt Munro & Bonneville</a></li>
              <li><a href="#footer" className="hover:text-[#ff2c2c] transition-colors">Indian Motorcycle Racing</a></li>
              <li><a href="#footer" className="hover:text-[#ff2c2c] transition-colors">Indian Motorcycle Riders Group</a></li>
              <li><a href="#footer" className="hover:text-[#ff2c2c] transition-colors">Careers & Polaris Brand</a></li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1">
            <h4 className="font-black uppercase font-display text-sm text-white mb-4 tracking-wider">
              Headquarters
            </h4>
            <p className="text-white/50 text-xs leading-relaxed mb-3">
              Indian Motorcycle Company<br />
              2100 Highway 55<br />
              Medina, MN 55340 USA
            </p>
            <button
              onClick={scrollToTop}
              className="mt-2 flex items-center space-x-1.5 text-xs text-[#ff2c2c] hover:text-white font-bold uppercase transition-colors"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom Legal & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] text-white/40 gap-4">
          <p>
            © 2026 Indian Motorcycle International, LLC. All Rights Reserved. Indian® and Scout® are registered trademarks.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-[10px] tracking-wider uppercase">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Terms of Use</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Safety Recalls</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Accessibility</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
