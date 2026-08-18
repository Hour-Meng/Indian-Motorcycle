import React, { useState, useEffect } from 'react';
import { MotorcycleModel, ACCESSORIES_LIST } from '../data/motorcycles';
import { X, Check, Calculator, Send } from 'lucide-react';

interface CustomizerModalProps {
  model: MotorcycleModel | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectTestRide: (model: MotorcycleModel) => void;
}

export function CustomizerModal({ model, isOpen, onClose, onSelectTestRide }: CustomizerModalProps) {
  const [selectedTrim, setSelectedTrim] = useState<'Standard' | 'Limited' | 'Limited+Tech'>('Limited+Tech');
  const [selectedAccessories, setSelectedAccessories] = useState<string[]>(['acc-exhaust']);
  const [financingMonths, setFinancingMonths] = useState<number>(60);
  const [downPayment, setDownPayment] = useState<number>(2500);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Handle ESC key to close
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !model) return null;

  const trimPrice = selectedTrim === 'Standard' ? 0 : selectedTrim === 'Limited' ? 700 : 1700;

  const accessoriesTotal = selectedAccessories.reduce((sum, accId) => {
    const item = ACCESSORIES_LIST.find(a => a.id === accId);
    return sum + (item ? item.price : 0);
  }, 0);

  const totalPrice = model.priceNum + trimPrice + accessoriesTotal;
  const loanAmount = Math.max(0, totalPrice - downPayment);
  const interestRate = 0.0599;
  const monthlyRate = interestRate / 12;
  const monthlyPayment = loanAmount > 0
    ? Math.round((loanAmount * monthlyRate * Math.pow(1 + monthlyRate, financingMonths)) / (Math.pow(1 + monthlyRate, financingMonths) - 1))
    : 0;

  const toggleAccessory = (id: string) => {
    setSelectedAccessories(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const defaultImage = model.colors[0]?.imageUrl || 'images/Indian-Scout.webp';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md p-2 sm:p-4 md:p-6 overscroll-contain">
      <div className="min-h-full flex items-start sm:items-center justify-center py-2 sm:py-6">
        <div className="relative w-full max-w-5xl bg-[#141414] text-white border border-white/10 rounded-2xl shadow-2xl overflow-hidden ring-1 ring-white/10 animate-fadeIn">
          {/* Sticky Header Bar - Always Accessible */}
          <div className="sticky top-0 z-30 bg-[#ff2c2c] text-black px-4 sm:px-6 py-3 sm:py-3.5 flex items-center justify-between shadow-lg">
            <div className="flex items-center space-x-2 min-w-0 pr-2">
              <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest bg-black text-white px-2 py-0.5 rounded-sm shrink-0">
                CONFIGURATOR
              </span>
              <span className="font-black uppercase font-display text-sm sm:text-base tracking-wide truncate">
                BUILD & PRICE: {model.name}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-black/10 hover:bg-black hover:text-white text-black transition-all active:scale-95 shrink-0 cursor-pointer"
              aria-label="Close Configurator"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content Body */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-4 sm:p-6 bg-[#0e0e0e]">
            {/* Left Column: Visual & Live Summary */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
              <div className="bg-[#161616] border border-white/5 rounded-lg p-4 flex flex-col items-center justify-center min-h-[220px] sm:min-h-[260px] relative">
                <img
                  src={defaultImage}
                  alt={model.name}
                  className="w-full object-contain max-h-[200px] sm:max-h-[220px] drop-shadow-2xl"
                />
                <div className="absolute top-3 left-3 bg-[#ff2c2c] text-black text-[9px] font-black uppercase px-2 py-0.5 rounded-sm">
                  {selectedTrim} TRIM
                </div>
              </div>

              {/* Price Summary Box */}
              <div className="bg-[#161616] border border-white/5 rounded-lg p-4 space-y-2">
                <div className="flex justify-between text-xs text-white/50">
                  <span>Base MSRP ({model.name})</span>
                  <span className="font-mono font-bold text-white">${model.priceNum.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs text-white/50">
                  <span>Trim Upgrade ({selectedTrim})</span>
                  <span className="font-mono font-bold text-white">+${trimPrice}</span>
                </div>
                <div className="flex justify-between text-xs text-white/50">
                  <span>Accessories ({selectedAccessories.length} selected)</span>
                  <span className="font-mono font-bold text-white">+${accessoriesTotal.toLocaleString()}</span>
                </div>
                <div className="border-t border-white/5 pt-2 flex justify-between items-baseline">
                  <span className="text-[11px] font-bold uppercase text-white/70">Total Estimated MSRP</span>
                  <span className="text-xl sm:text-2xl font-black text-[#ff2c2c] font-mono">
                    ${totalPrice.toLocaleString()}*
                  </span>
                </div>
                <div className="bg-[#0a0a0a] p-2.5 rounded border border-white/5 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-1.5 text-white/70">
                    <Calculator className="w-4 h-4 text-[#ff2c2c]" />
                    <span className="text-[11px] sm:text-xs">Est. Payment ({financingMonths}m @ 5.99%)</span>
                  </div>
                  <span className="font-black text-white font-mono text-sm sm:text-base">
                    ${monthlyPayment}/mo
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => {
                    setFormSubmitted(true);
                    setTimeout(() => setFormSubmitted(false), 4000);
                  }}
                  className="w-full bg-[#ff2c2c] hover:bg-white text-black py-3 rounded-lg text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center space-x-2 shadow-lg active:scale-95 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>REQUEST QUOTE & LOCK BUILD</span>
                </button>
                <button
                  onClick={() => {
                    onClose();
                    onSelectTestRide(model);
                  }}
                  className="w-full border border-white/10 hover:border-[#ff2c2c] text-white py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all text-center active:scale-95 cursor-pointer"
                >
                  SCHEDULE TEST RIDE WITH THIS BUILD
                </button>
              </div>
              {formSubmitted && (
                <div className="bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 p-2.5 rounded-lg text-xs text-center animate-fadeIn">
                  ✓ Build sent to your nearest authorized Indian Motorcycle dealer!
                </div>
              )}
            </div>

            {/* Right Column: Customization Controls */}
            <div className="lg:col-span-7 space-y-6 lg:overflow-y-auto lg:max-h-[580px] lg:pr-2">
              {/* 1. Trim Level */}
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#ff2c2c] mb-2">
                  1. Select Technology & Equipment Trim
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {[
                    { name: 'Standard', desc: 'Analog gauge, LED headlamp, ABS option', addPrice: 0 },
                    { name: 'Limited', desc: 'Cruise control, traction control, 3 ride modes, USB', addPrice: 700 },
                    { name: 'Limited+Tech', desc: '4-inch touchscreen, RIDE COMMAND GPS, push-button start', addPrice: 1700 }
                  ].map((trim) => (
                    <button
                      key={trim.name}
                      onClick={() => setSelectedTrim(trim.name as any)}
                      className={`p-3 text-left rounded-lg border transition-all cursor-pointer ${
                        selectedTrim === trim.name
                          ? 'border-[#ff2c2c] bg-[#ff2c2c]/10 text-white ring-1 ring-[#ff2c2c]'
                          : 'border-white/5 bg-[#161616] text-white/50 hover:text-white hover:border-white/20'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-xs uppercase text-white">{trim.name}</span>
                        <span className="text-[10px] font-mono text-white/50">
                          {trim.addPrice === 0 ? 'Included' : `+$${trim.addPrice}`}
                        </span>
                      </div>
                      <p className="text-[10px] text-white/40 leading-tight">{trim.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Genuine Indian Accessories */}
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#ff2c2c] mb-2">
                  2. Factory Accessories & Custom Packages
                </h4>
                <div className="space-y-2">
                  {ACCESSORIES_LIST.map((acc) => {
                    const isSelected = selectedAccessories.includes(acc.id);
                    return (
                      <div
                        key={acc.id}
                        onClick={() => toggleAccessory(acc.id)}
                        className={`p-3 rounded-lg border flex items-center justify-between cursor-pointer transition-all ${
                          isSelected
                            ? 'border-[#ff2c2c] bg-[#ff2c2c]/10 text-white'
                            : 'border-white/5 bg-[#161616] text-white/70 hover:bg-[#1f1f1f] hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-4 h-4 rounded flex items-center justify-center border ${
                              isSelected ? 'bg-[#ff2c2c] border-[#ff2c2c] text-black' : 'border-white/20'
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <div>
                            <span className="text-xs font-bold block">{acc.name}</span>
                            <span className="text-[9px] text-white/40 uppercase">{acc.category}</span>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-[#ff2c2c] font-mono">+${acc.price}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 3. Financing Estimate Calculator Slider */}
              <div className="bg-[#161616] p-4 rounded-lg border border-white/5 space-y-3">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-white/70 flex items-center gap-1.5">
                  <Calculator className="w-3.5 h-3.5 text-[#ff2c2c]" />
                  <span>Estimate Monthly Loan Payments</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="flex justify-between text-[10px] text-white/50 mb-1">
                      <span>Down Payment</span>
                      <span className="font-mono font-bold text-white">${downPayment.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      step="250"
                      value={downPayment}
                      onChange={(e) => setDownPayment(Number(e.target.value))}
                      className="w-full accent-[#ff2c2c] cursor-pointer"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-[10px] text-white/50 mb-1">
                      <span>Loan Term</span>
                      <span className="font-mono font-bold text-white">{financingMonths} Months</span>
                    </div>
                    <div className="flex gap-1.5">
                      {[36, 48, 60, 72].map((term) => (
                        <button
                          key={term}
                          onClick={() => setFinancingMonths(term)}
                          className={`flex-1 py-1 text-[10px] font-mono font-bold rounded border transition-all cursor-pointer ${
                            financingMonths === term
                              ? 'bg-[#ff2c2c] text-black border-[#ff2c2c]'
                              : 'bg-[#0a0a0a] text-white/50 border-white/10 hover:text-white'
                          }`}
                        >
                          {term}m
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Mobile Action Bar: Extra guarantee mobile users can exit comfortably */}
          <div className="bg-[#121212] border-t border-white/10 px-4 py-3 flex items-center justify-between sm:hidden">
            <button
              onClick={onClose}
              className="bg-white/10 hover:bg-[#ff2c2c] hover:text-black text-white px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
            >
              <X className="w-3.5 h-3.5" />
              <span>Exit Configurator</span>
            </button>
            <span className="text-xs font-mono font-bold text-[#ff2c2c]">
              ${totalPrice.toLocaleString()} MSRP
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomizerModal;

