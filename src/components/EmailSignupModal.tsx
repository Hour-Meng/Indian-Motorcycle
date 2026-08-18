import React, { useState } from 'react';
import { X, CheckCircle2, Mail, Tag } from 'lucide-react';

interface EmailSignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EmailSignupModal({ isOpen, onClose }: EmailSignupModalProps) {
  const [email, setEmail] = useState('');
  const [zip, setZip] = useState('');
  const [interest, setInterest] = useState('Scout Bobber');
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Handle ESC key to close
  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribed(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md p-2 sm:p-4 md:p-6 overscroll-contain">
      <div className="min-h-full flex items-start sm:items-center justify-center py-2 sm:py-6">
        <div className="relative w-full max-w-md bg-[#141414] text-white border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-fadeIn ring-1 ring-white/10">
          {/* Header */}
          <div className="sticky top-0 z-30 bg-[#ff2c2c] text-black px-4 sm:px-6 py-3 sm:py-3.5 flex items-center justify-between shadow-lg">
            <div className="flex items-center space-x-2">
              <Mail className="w-5 h-5 text-black" />
              <h3 className="font-black uppercase font-display text-sm sm:text-base tracking-wide">
                EXCLUSIVE OFFERS & NEWS
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-black/10 hover:bg-black hover:text-white text-black transition-all active:scale-95 shrink-0 cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

        {isSubscribed ? (
          <div className="p-8 text-center space-y-4 bg-[#0e0e0e]">
            <div className="w-14 h-14 bg-[#ff2c2c]/20 text-[#ff2c2c] rounded-full flex items-center justify-center mx-auto border border-[#ff2c2c]/40">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-black uppercase font-display text-white">
              YOU&apos;RE ON THE VIP LIST!
            </h4>
            <p className="text-xs text-white/70 leading-relaxed">
              Check your inbox for your <strong>$500 Genuine Indian Apparel & Accessories Voucher</strong> on any new Scout model purchase.
            </p>
            <button
              onClick={() => {
                setIsSubscribed(false);
                onClose();
              }}
              className="bg-[#ff2c2c] hover:bg-white text-black px-6 py-2.5 rounded-sm text-xs font-black uppercase tracking-wider transition-all"
            >
              RETURN TO SHOWCASE
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 bg-[#0e0e0e]">
            <div className="flex items-start gap-3 p-3 bg-[#161616] rounded-lg border border-white/5 text-xs">
              <Tag className="w-4 h-4 text-[#ff2c2c] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white block">Special Introductory Incentive</span>
                <span className="text-white/50 text-[11px]">
                  Sign up for new 2025 Scout updates, demo day invitations, and factory rebates.
                </span>
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-white/50 block mb-1">
                Email Address:
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="rider@example.com"
                className="w-full bg-[#161616] border border-white/10 text-white px-3 py-2 text-xs rounded-sm focus:outline-none focus:border-[#ff2c2c]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-white/50 block mb-1">
                  ZIP Code:
                </label>
                <input
                  type="text"
                  required
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  placeholder="90210"
                  className="w-full bg-[#161616] border border-white/10 text-white px-3 py-2 text-xs rounded-sm focus:outline-none focus:border-[#ff2c2c]"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-white/50 block mb-1">
                  Model Interest:
                </label>
                <select
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  className="w-full bg-[#161616] border border-white/10 text-white px-3 py-2 text-xs rounded-sm focus:outline-none focus:border-[#ff2c2c]"
                >
                  <option value="Scout Bobber">Scout Bobber</option>
                  <option value="101 Scout">101 Scout</option>
                  <option value="Scout Bobber Twenty">Scout Bobber Twenty</option>
                  <option value="Chief Vintage">Chief Vintage</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[10px] text-white/50">
              <input type="checkbox" required id="consent" className="accent-[#ff2c2c]" defaultChecked />
              <label htmlFor="consent">I agree to receive promotional communications from Indian Motorcycle.</label>
            </div>

            <button
              type="submit"
              className="w-full bg-[#ff2c2c] hover:bg-white text-black py-3 rounded-sm text-xs font-black uppercase tracking-wider transition-all shadow-lg"
            >
              UNLOCK EXCLUSIVE OFFERS
            </button>
          </form>
        )}
        </div>
      </div>
    </div>
  );
}
