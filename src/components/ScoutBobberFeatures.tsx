import React, { useState } from 'react';

export function ScoutBobberFeatures() {
  const [activeTab, setActiveTab] = useState<'engine' | 'stance' | 'tech' | 'heritage'>('engine');

  const featureDetails = {
    engine: {
      title: 'ALL-NEW SPEEDPLUS 1250CC V-TWIN',
      tagline: '105 HORSEPOWER • 82 FT-LBS OF RAW TORQUE',
      desc: 'Completely redesigned from the ground up. Liquid-cooled for exceptional thermal consistency and punchy low-end torque that pulls aggressively through all 6 gears. High-compression architecture delivers instantaneous throttle response.',
      specs: [
        { label: 'Displacement', val: '1250 cc (76.3 cu in)' },
        { label: 'Max Horsepower', val: '105 HP @ 7,250 RPM' },
        { label: 'Max Torque', val: '82 ft-lbs @ 6,300 RPM' },
        { label: 'Cooling System', val: 'Liquid Cooled' }
      ],
      image: 'images/ezgif-frame-088.jpg',
      badge: 'Official SpeedPlus 1250 Powertrain'
    },
    stance: {
      title: 'RAW, SLAMMED BOBBER SILHOUETTE',
      tagline: '25.6-INCH SEAT HEIGHT • AGGRESSIVE ERGONOMICS',
      desc: 'Chopped bobber rear fender, stripped-down front profile, side-mount license plate bracket, and bar-end mirrors create an unmistakable muscular stance. A slammed rear suspension drops the center of gravity for confident cornering.',
      specs: [
        { label: 'Seat Height', val: '25.6 in (Ultra Low)' },
        { label: 'Rear Suspension', val: 'Dual Inboard Shocks' },
        { label: 'Exhaust', val: 'Blacked-out Dual Pipes' },
        { label: 'Mirrors', val: 'Bar-End Stealth Mount' }
      ],
      image: 'images/ezgif-frame-160.jpg',
      badge: 'Slammed Bobber Chassis Architecture'
    },
    tech: {
      title: 'RIDE COMMAND 4" TOUCHSCREEN',
      tagline: 'TURN-BY-TURN GPS • 3 RIDE MODES • BLUETOOTH',
      desc: 'Class-leading 4-inch round display seamlessly merges retro analog gauge aesthetics with modern connected digital features. Enjoy turnkey navigation, real-time telemetry, and switch between Sport, Standard, and Tour throttle maps.',
      specs: [
        { label: 'Display Size', val: '4.0 in IPS Full Color' },
        { label: 'Riding Modes', val: 'Sport / Standard / Tour' },
        { label: 'Connectivity', val: 'Bluetooth & Navigation' },
        { label: 'USB Port', val: 'Standard 2.4A Fast Charge' }
      ],
      image: 'images/ezgif-frame-115.jpg',
      badge: 'Connected Digital Telemetry'
    },
    heritage: {
      title: 'OVER 100 YEARS OF RACING DNA',
      tagline: 'FIRST BUILT IN 1920 • REIMAGINED FOR 2026',
      desc: 'When the first Indian Scout emerged in 1920, it redefined speed and American motorcycle handling. Burt Munro made history at the Bonneville Salt Flats on a Scout. Today’s Scout Bobber honors that legacy with timeless bloodlines.',
      specs: [
        { label: 'Original Debut', val: '1920 Springfield, MA' },
        { label: 'Bonneville Record', val: '184.087 mph (Under 1000cc)' },
        { label: 'Frame Design', val: 'Cast Aluminum Backbone' },
        { label: 'Assembly', val: 'Spirit Lake, Iowa, USA' }
      ],
      image: 'images/ezgif-frame-015.jpg',
      badge: '1920-2026 Championship Heritage'
    }
  };

  const current = featureDetails[activeTab];

  return (
    <section id="heritage" className="w-full bg-[#0a0a0a] text-white py-20 px-6 lg:px-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#ff2c2c]">Engineering & Craftsmanship</span>
          <h2 className="text-3xl md:text-5xl font-black uppercase italic font-display text-white mt-1">
            BUILT WITHOUT COMPROMISE
          </h2>
          <p className="text-xs md:text-sm text-white/60 mt-3 leading-relaxed">
            Every millimeter of the Indian Scout Bobber is engineered for pure riding adrenaline, aggressive style, and American craftsmanship.
          </p>
        </div>

        {/* Feature Navigation Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 max-w-4xl mx-auto mb-10">
          {[
            { id: 'engine', label: 'SpeedPlus 1250cc' },
            { id: 'stance', label: 'Bobber Stance' },
            { id: 'tech', label: 'RIDE COMMAND Tech' },
            { id: 'heritage', label: 'Historic DNA' }
          ].map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3.5 px-4 rounded text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center text-center border cursor-pointer ${
                  isSelected
                    ? 'bg-[#ff2c2c] text-black border-[#ff2c2c] shadow-[0_0_25px_rgba(255,44,44,0.2)]'
                    : 'bg-[#161616] text-white/60 border-white/5 hover:text-white hover:bg-[#202020]'
                }`}
              >
                <span className="w-full text-center">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Detail Panel */}
        <div className="bg-[#161616] border border-white/5 rounded-2xl p-6 md:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Info & Specs (6 cols) */}
            <div className="lg:col-span-6 space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#ff2c2c]">
                {current.tagline}
              </span>
              <h3 className="text-2xl md:text-4xl font-black uppercase italic font-display text-white leading-tight">
                {current.title}
              </h3>
              <p className="text-xs md:text-sm text-white/60 leading-relaxed">
                {current.desc}
              </p>

              {/* Spec Grid */}
              <div className="grid grid-cols-2 gap-3 pt-4">
                {current.specs.map((s, idx) => (
                  <div key={idx} className="bg-[#0a0a0a] p-3 rounded-lg border border-white/5">
                    <span className="text-[9px] font-bold uppercase text-white/40 block">{s.label}</span>
                    <span className="text-xs md:text-sm font-bold text-white font-mono">{s.val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Feature Photo with Authentic Indian Scout Assets (6 cols) */}
            <div className="lg:col-span-6">
              <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-2xl group ring-1 ring-white/5 bg-black">
                <img
                  src={current.image}
                  alt={current.title}
                  className="w-full h-80 object-cover object-center transform transition-transform duration-700 group-hover:scale-105 filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end pointer-events-none">
                  <div className="bg-black/85 px-3.5 py-1.5 rounded backdrop-blur text-[10px] font-bold uppercase tracking-wider text-white border border-white/10 shadow-lg">
                    {current.badge}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
