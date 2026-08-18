import React, { useState } from 'react';
import { DEALERSHIPS, MOTORCYCLE_LINEUP, MotorcycleModel } from '../data/motorcycles';
import { X, MapPin, Phone, CheckCircle2, ShieldCheck } from 'lucide-react';

interface DealerLocatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedModel?: MotorcycleModel | null;
}

export function DealerLocatorModal({ isOpen, onClose, preSelectedModel }: DealerLocatorModalProps) {
  if (!isOpen) return null;

  const [zipCode, setZipCode] = useState('94109');
  const [selectedDealer, setSelectedDealer] = useState(DEALERSHIPS[0]);
  const [selectedModel, setSelectedModel] = useState<string>(preSelectedModel?.id || 'scout-bobber-2025');
  const [date, setDate] = useState('2026-08-20');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isBooked, setIsBooked] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooked(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md p-2 sm:p-4 md:p-6 overscroll-contain">
      <div className="min-h-full flex items-start sm:items-center justify-center py-2 sm:py-6">
        <div className="relative w-full max-w-4xl bg-[#141414] text-white border border-white/10 rounded-2xl shadow-2xl overflow-hidden ring-1 ring-white/10 animate-fadeIn">
          {/* Header */}
          <div className="sticky top-0 z-30 bg-[#ff2c2c] text-black px-4 sm:px-6 py-3 sm:py-3.5 flex items-center justify-between shadow-lg">
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-black" />
              <h3 className="font-black uppercase font-display text-sm sm:text-base tracking-wide">
                FIND DEALER & SCHEDULE TEST RIDE
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

        {isBooked ? (
          <div className="p-10 text-center space-y-4 bg-[#0e0e0e]">
            <div className="w-16 h-16 bg-[#ff2c2c]/20 text-[#ff2c2c] rounded-full flex items-center justify-center mx-auto border border-[#ff2c2c]/40">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-2xl font-black uppercase font-display text-white">
              YOUR TEST RIDE IS CONFIRMED!
            </h4>
            <p className="text-xs text-white/70 max-w-md mx-auto leading-relaxed">
              We&apos;ve reserved the <strong>{MOTORCYCLE_LINEUP.find(m => m.id === selectedModel)?.name}</strong> for you at <strong>{selectedDealer.name}</strong> on <strong>{date}</strong>.
            </p>
            <div className="bg-[#161616] border border-white/5 p-4 rounded-lg max-w-md mx-auto text-left text-xs space-y-1 text-white/60">
              <div className="text-white font-bold">{selectedDealer.name}</div>
              <div>{selectedDealer.address}</div>
              <div>Phone: {selectedDealer.phone}</div>
            </div>
            <button
              onClick={() => {
                setIsBooked(false);
                onClose();
              }}
              className="bg-[#ff2c2c] hover:bg-white text-black px-8 py-3 rounded-sm text-xs font-black uppercase tracking-wider transition-all shadow-lg"
            >
              RETURN TO SHOWCASE
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 bg-[#0e0e0e]">
            {/* Left: Dealership Selector */}
            <div className="md:col-span-5 space-y-4 border-b md:border-b-0 md:border-r border-white/5 pb-6 md:pb-0 md:pr-4">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/50 block mb-1">
                  Enter ZIP / City:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    placeholder="Enter ZIP code"
                    className="flex-1 bg-[#161616] border border-white/10 text-white px-3 py-2 text-xs rounded-sm focus:outline-none focus:border-[#ff2c2c]"
                  />
                  <button className="bg-white text-black hover:bg-[#ff2c2c] px-3 py-2 text-xs font-bold uppercase rounded-sm transition-colors">
                    Search
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-[9px] font-bold uppercase tracking-widest text-white/40 block">
                  Authorized Indian Dealers Near You:
                </span>
                {DEALERSHIPS.map((dealer) => (
                  <div
                    key={dealer.id}
                    onClick={() => setSelectedDealer(dealer)}
                    className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${
                      selectedDealer.id === dealer.id
                        ? 'border-[#ff2c2c] bg-[#ff2c2c]/10 text-white ring-1 ring-[#ff2c2c]'
                        : 'border-white/5 bg-[#161616] text-white/70 hover:bg-[#1e1e1e]'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <span className="font-bold text-xs">{dealer.name}</span>
                      <span className="text-[10px] text-[#ff2c2c] font-mono font-bold">{dealer.distance}</span>
                    </div>
                    <p className="text-[10px] text-white/40 mt-1">{dealer.address}</p>
                    <div className="flex justify-between items-center text-[10px] text-white/40 mt-2">
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3 text-white/40" />
                        {dealer.phone}
                      </span>
                      <span className="text-[#ff2c2c] font-semibold">{dealer.inventory} Scouts in Stock</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Test Ride Booking Form */}
            <form onSubmit={handleSubmit} className="md:col-span-7 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#ff2c2c]">
                Select Model & Schedule Appointment
              </h4>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-white/50 block mb-1">
                  Motorcycle of Interest:
                </label>
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="w-full bg-[#161616] border border-white/10 text-white px-3 py-2 text-xs rounded-sm focus:outline-none focus:border-[#ff2c2c]"
                >
                  {MOTORCYCLE_LINEUP.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} ({m.price} MSRP) - {m.horsepower}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-white/50 block mb-1">
                    Preferred Date:
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[#161616] border border-white/10 text-white px-3 py-2 text-xs rounded-sm focus:outline-none focus:border-[#ff2c2c]"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-white/50 block mb-1">
                    Full Name:
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full bg-[#161616] border border-white/10 text-white px-3 py-2 text-xs rounded-sm focus:outline-none focus:border-[#ff2c2c]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-white/50 block mb-1">
                    Phone Number:
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(555) 000-0000"
                    className="w-full bg-[#161616] border border-white/10 text-white px-3 py-2 text-xs rounded-sm focus:outline-none focus:border-[#ff2c2c]"
                  />
                </div>
              </div>

              <div className="p-3 bg-[#161616] rounded-lg border border-white/5 text-[10px] text-white/50 space-y-1">
                <div className="flex items-center gap-1.5 text-white/80 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#ff2c2c]" />
                  <span>Rider Requirements:</span>
                </div>
                <p>Valid motorcycle endorsement (Class M) and helmet required for all demo rides.</p>
              </div>

              <button
                type="submit"
                className="w-full bg-[#ff2c2c] hover:bg-white text-black py-3 rounded-sm text-xs font-black uppercase tracking-wider transition-all shadow-lg"
              >
                CONFIRM TEST RIDE APPOINTMENT
              </button>
            </form>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
