"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Gauge, Zap, ShieldCheck } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const PIN_VH_MULTIPLE = 3.2;
const IMMERSE_OVERFILL = 1.04;
const CARD_START_SCALE_DESKTOP = 0.6;
const CARD_START_SCALE_MOBILE = 0.82;

export type HeroScrubProps = {
  frameCount: number;
  frameUrl: (index: number) => string;
  titleTop: string;
  titleBottom: string;
  bgClassName?: string;
  accentHex?: string;
  defaultAspect?: number;
  collectionName?: string;
  modelName?: string;
  hp?: string | number;
  torque?: string | number;
  onCardClick?: () => void;
};

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);
  return reduced;
}

export function HeroScrub({
  frameCount,
  frameUrl,
  titleTop,
  titleBottom,
  bgClassName = "bg-[#0a0a0a]",
  accentHex = "#ff2c2c",
  defaultAspect = 16 / 9,
  collectionName = "HERITAGE COLLECTION",
  modelName = "SCOUT BOBBER",
  hp = "100",
  torque = "72",
  onCardClick,
}: HeroScrubProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const lastDrawnRef = useRef<number>(-1);
  const bgRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const titleTopRef = useRef<HTMLHeadingElement>(null);
  const titleBottomRef = useRef<HTMLHeadingElement>(null);

  // Overlays refs
  const idleBadgeRef = useRef<HTMLDivElement>(null);
  const scene1Ref = useRef<HTMLDivElement>(null);
  const scene2Ref = useRef<HTMLDivElement>(null);
  const scene3Ref = useRef<HTMLDivElement>(null);
  const scene4Ref = useRef<HTMLDivElement>(null);

  const [ready, setReady] = useState(false);
  const [framesOk, setFramesOk] = useState(true);
  const [aspect, setAspect] = useState<number>(defaultAspect);
  const [liveSpeed, setLiveSpeed] = useState<number>(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    let cancelled = false;
    let errored = 0;
    const images: HTMLImageElement[] = new Array(frameCount);
    imagesRef.current = images;

    const onFirstReady = (img: HTMLImageElement) => {
      if (cancelled) return;
      const canvas = canvasRef.current;
      if (canvas && img.naturalWidth && img.naturalHeight) {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0);
        lastDrawnRef.current = 0;
        setAspect(img.naturalWidth / img.naturalHeight);
      }
      setReady(true);
    };

    const onErr = () => {
      errored++;
      if (!cancelled && errored >= 5) setFramesOk(false);
    };

    const loadOne = (i: number) => {
      const img = new window.Image();
      img.decoding = "async";
      if (i < 4)
        (img as HTMLImageElement & { fetchPriority?: string }).fetchPriority = "high";
      img.onerror = onErr;
      if (i === 0) img.onload = () => onFirstReady(img);
      img.src = frameUrl(i);
      images[i] = img;
    };

    const INITIAL = Math.min(25, frameCount);
    for (let i = 0; i < INITIAL; i++) loadOne(i);

    const BATCH = 20;
    let cursor = INITIAL;
    let timer: ReturnType<typeof setTimeout> | null = null;
    const loadNext = () => {
      if (cancelled) return;
      const end = Math.min(frameCount, cursor + BATCH);
      for (let i = cursor; i < end; i++) loadOne(i);
      cursor = end;
      if (cursor < frameCount) timer = setTimeout(loadNext, 60);
    };
    timer = setTimeout(loadNext, 150);

    const fallbackTimer = window.setTimeout(() => {
      if (!cancelled && !images[0]?.complete) setFramesOk(false);
    }, 4500);

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
      window.clearTimeout(fallbackTimer);
    };
  }, [reduced, frameCount, frameUrl]);

  // Scroll-driven choreography & Storyboard Overlays
  useEffect(() => {
    if (reduced || !ready || !framesOk) return;
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const startScale = () =>
        window.innerWidth < 768 ? CARD_START_SCALE_MOBILE : CARD_START_SCALE_DESKTOP;

      const immerseScale = () => {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const baseW = Math.min(vw * 0.96, vh * 0.72 * aspect);
        const baseH = Math.min(vh * 0.72, (vw * 0.96) / aspect);
        if (baseW <= 0 || baseH <= 0) return 1.5;
        return Math.max(vw / baseW, vh / baseH) * IMMERSE_OVERFILL;
      };

      const isLoaded = (i: number) => {
        const img = imagesRef.current[i];
        return !!img && img.complete && img.naturalWidth > 0;
      };

      const drawFrame = (index: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        let useIdx = index;
        if (!isLoaded(useIdx)) {
          let found = -1;
          for (let d = 1; d < frameCount; d++) {
            if (useIdx - d >= 0 && isLoaded(useIdx - d)) { found = useIdx - d; break; }
            if (useIdx + d < frameCount && isLoaded(useIdx + d)) { found = useIdx + d; break; }
          }
          if (found === -1) return;
          useIdx = found;
        }
        if (lastDrawnRef.current === useIdx) return;
        const img = imagesRef.current[useIdx];
        const ctx2 = canvas.getContext("2d");
        if (!ctx2 || !img) return;
        ctx2.drawImage(img, 0, 0, canvas.width, canvas.height);
        lastDrawnRef.current = useIdx;
      };

      // Set explicit initial states: Titles 100% visible and centered
      gsap.set(cardRef.current, { scale: startScale(), transformOrigin: "50% 50%" });
      gsap.set(titleTopRef.current, { opacity: 1, x: 0, clearProps: "transform" });
      gsap.set(titleBottomRef.current, { opacity: 1, x: 0, clearProps: "transform" });
      gsap.set(idleBadgeRef.current, { opacity: 1, y: 0 });

      // Master Timeline for Card Scale & Titles
      const master = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.4,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Check if navigation skip is active
            if ((window as any).__isNavigatingScroll) {
              return; // Do not scrub video frames during navigation clicks
            }

            const p = self.progress;
            const mapped = gsap.utils.clamp(0, 1, (p - 0.08) / 0.84);
            const frameIdx = Math.min(frameCount - 1, Math.floor(mapped * frameCount));
            drawFrame(frameIdx);

            // Compute dynamic speed for speedometer scene (0 to 130 MPH)
            if (p >= 0.45 && p <= 0.82) {
              const speedProgress = (p - 0.45) / 0.37;
              setLiveSpeed(Math.round(speedProgress * 130));
            } else if (p > 0.82) {
              setLiveSpeed(130);
            } else {
              setLiveSpeed(0);
            }
          },
        },
      });

      // 1. Initial Scale & Title slide out (starts at 0.06 to ensure full visibility at scroll 0)
      master.to(idleBadgeRef.current, { opacity: 0, y: 10, duration: 0.06, ease: "power1.in" }, 0.02);
      master.to(cardRef.current, { scale: 1, ease: "power2.out", duration: 0.12 }, 0.04);
      master.to(titleTopRef.current, {
        x: () => (window.innerWidth < 768 ? "-70vw" : "-60vw"),
        letterSpacing: "0.02em",
        opacity: 0,
        ease: "power2.inOut",
        duration: 0.16,
      }, 0.06);
      master.to(titleBottomRef.current, {
        x: () => (window.innerWidth < 768 ? "70vw" : "60vw"),
        letterSpacing: "0.02em",
        opacity: 0,
        ease: "power2.inOut",
        duration: 0.16,
      }, 0.06);

      // 2. Full Immersive Zoom
      master.to(cardRef.current, { scale: immerseScale(), ease: "power2.in", duration: 0.65 }, 0.16);

      // 3. Zoom Out & Restore Titles at End of Scrub
      master.to(cardRef.current, { scale: startScale(), ease: "power3.inOut", duration: 0.2 }, 0.8);
      master.to(titleTopRef.current, {
        x: 0, opacity: 1, letterSpacing: "-0.04em", ease: "power2.inOut", duration: 0.2,
      }, 0.8);
      master.to(titleBottomRef.current, {
        x: 0, opacity: 1, letterSpacing: "-0.04em", ease: "power2.inOut", duration: 0.2,
      }, 0.8);
      master.to(idleBadgeRef.current, { opacity: 1, y: 0, duration: 0.15, ease: "power2.out" }, 0.85);

      // Storyboard Overlays Timeline
      const storyTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
        },
      });

      storyTimeline
        // Scene 1: Introduce Scout Bobbers (Frames 0 - 45)
        .fromTo(scene1Ref.current, { opacity: 0, y: 30, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.15 })
        .to(scene1Ref.current, { opacity: 0, y: -20, duration: 0.1 }, "+=0.1")

        // Scene 2: Powertrain & Quality (Frames 46 - 90)
        .fromTo(scene2Ref.current, { opacity: 0, y: 30, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.15 })
        .to(scene2Ref.current, { opacity: 0, y: -20, duration: 0.1 }, "+=0.1")

        // Scene 3: Speedometer (How Fast It Is) & Height / Dimensions (Frames 91 - 135)
        .fromTo(scene3Ref.current, { opacity: 0, y: 30, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.18 })
        .to(scene3Ref.current, { opacity: 0, y: -20, duration: 0.1 }, "+=0.1")

        // Scene 4: Full Reveal / Legend (Frames 136 - 180)
        .fromTo(scene4Ref.current, { opacity: 0, y: 30, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.15 })
        .to(scene4Ref.current, { opacity: 0, duration: 0.08 }, "+=0.05");

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, [ready, framesOk, reduced, aspect, frameCount]);

  const tallHeight = `${(PIN_VH_MULTIPLE + 1) * 100}vh`;

  return (
    <section
      ref={sectionRef}
      className={`relative w-full overflow-clip text-white ${bgClassName}`}
      style={{ height: tallHeight }}
      aria-label="Cinematic scroll-scrubbed hero"
    >
      <div
        ref={stickyRef}
        className="sticky top-0 flex h-[100svh] w-full flex-col items-center justify-center overflow-hidden pt-14 sm:pt-16 md:pt-20 pb-4"
      >
        <div ref={bgRef} aria-hidden className="absolute inset-0 z-0" style={{ backgroundColor: accentHex }} />
        <div aria-hidden className="absolute inset-0 z-0 bg-black/40" />
        <div aria-hidden className="absolute inset-0 z-0" style={{
          background: "radial-gradient(ellipse at 50% 45%, rgba(255,255,255,0.06) 0%, rgba(0,0,0,0) 65%)",
        }} />
        <div aria-hidden className="absolute inset-0 z-0" style={{
          background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.7) 100%)",
        }} />

        {/* Vertical Side Indicator: SCROLL TO EXPLORE */}
        <div className="hidden xl:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col items-center gap-6 z-20 pointer-events-none opacity-40">
          <span
            className="text-[9px] uppercase font-bold tracking-[0.45em] text-white/80"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            SCROLL TO EXPLORE MODELS
          </span>
          <div className="w-[1px] h-20 bg-gradient-to-b from-white/60 via-white/20 to-transparent" />
        </div>

        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-1 sm:gap-2">
          {/* Top Headline: INDIAN (With clean vertical clearance below navbar) */}
          <h2
            ref={titleTopRef}
            className="font-black uppercase text-center font-display tracking-tight text-white select-none relative z-20 mt-4 sm:mt-6 md:mt-8"
            style={{
              fontSize: "clamp(3.6rem, 12.5vw, 10.5rem)",
              lineHeight: 0.82,
              letterSpacing: "-0.04em",
              opacity: 1,
              transform: "translate3d(0, 0, 0)",
            }}
          >
            {titleTop}
          </h2>

          {/* Center Showcase Card with Canvas & Overlays */}
          <div
            ref={cardRef}
            onClick={onCardClick}
            className="relative overflow-hidden rounded-[16px] md:rounded-[20px] shadow-[0_20px_100px_rgba(0,0,0,0.75)] ring-1 ring-white/15 will-change-transform group cursor-pointer z-10"
            style={{
              width: `min(94vw, calc(70svh * ${aspect}))`,
              height: `min(70svh, 94vw / ${aspect})`,
              aspectRatio: aspect,
            }}
          >
            <div aria-hidden className="pointer-events-none absolute inset-0 z-20 shadow-[inset_0_0_120px_rgba(0,0,0,0.55)]" />
            <div aria-hidden className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-black/90 via-transparent to-black/30" />
            
            {framesOk ? (
              <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full object-cover" />
            ) : (
              <div className="absolute inset-0 bg-[#161616] flex items-center justify-center">
                <img
                  src="images/Indian-Scout.webp"
                  alt="Scout Bobber"
                  className="w-full h-full object-contain p-8"
                />
              </div>
            )}

            {/* A. IDLE OVERLAY: Heritage Collection & Scout Bobber (Visible in Idle at top) */}
            <div
              ref={idleBadgeRef}
              className="absolute inset-0 z-30 pointer-events-none p-5 sm:p-8 flex flex-col justify-between"
            >
              <div className="flex justify-between items-start">
                <span className="bg-black/60 border border-white/10 backdrop-blur-md px-3 py-1 rounded-sm text-[10px] font-mono tracking-widest text-[#ff2c2c] uppercase font-bold">
                  2026 SPEEDPLUS 1250
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <span className="text-[#ff2c2c] text-[10px] sm:text-xs font-black tracking-widest uppercase block mb-1">
                    {collectionName}
                  </span>
                  <h3 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase italic font-display text-white tracking-tight leading-none drop-shadow-lg">
                    {modelName}
                  </h3>
                </div>

                <div className="flex items-end gap-5 sm:gap-7 text-right">
                  <div>
                    <span className="text-[10px] text-white/50 uppercase tracking-wider font-bold block leading-none mb-1">HP</span>
                    <span className="text-xl sm:text-2xl md:text-3xl font-mono font-bold text-white leading-none">{hp}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-white/50 uppercase tracking-wider font-bold block leading-none mb-1">TORQUE</span>
                    <span className="text-xl sm:text-2xl md:text-3xl font-mono font-bold text-white leading-none">
                      {torque}<span className="text-xs text-white/70 font-sans font-normal ml-1">lb-ft</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* B. SCENE 1 OVERLAY: "Introduce Scout Bobbers" + Signature Lighting Quality */}
            <div
              ref={scene1Ref}
              className="absolute inset-0 z-40 pointer-events-none p-6 sm:p-10 flex flex-col justify-end bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-0"
            >
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 bg-[#ff2c2c] text-black text-[10px] font-black uppercase px-2.5 py-0.5 rounded-sm tracking-widest mb-2 shadow-md">
                  <Zap className="w-3 h-3" />
                  <span>01 // SIGNATURE ILLUMINATION</span>
                </div>
                <h3 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase italic font-display text-white tracking-tight leading-none mb-2 drop-shadow-xl">
                  Introduce Scout Bobbers
                </h3>
                <p className="text-xs sm:text-sm text-white/80 font-medium leading-relaxed max-w-lg">
                  Aggressive chopped fenders, slammed 2-inch suspension, and full LED halo lighting engineered with iconic stripped-down American craftsmanship.
                </p>
              </div>
            </div>

            {/* C. SCENE 2 OVERLAY: SpeedPlus 1250 Engine & Powertrain Quality */}
            <div
              ref={scene2Ref}
              className="absolute inset-0 z-40 pointer-events-none p-6 sm:p-10 flex flex-col justify-end bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-0"
            >
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 bg-[#ff2c2c] text-black text-[10px] font-black uppercase px-2.5 py-0.5 rounded-sm tracking-widest mb-2 shadow-md">
                  <ShieldCheck className="w-3 h-3" />
                  <span>02 // ENGINE CRAFTSMANSHIP</span>
                </div>
                <h3 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase italic font-display text-white tracking-tight leading-none mb-2 drop-shadow-xl">
                  SpeedPlus 1250cc V-Twin
                </h3>
                <p className="text-xs sm:text-sm text-white/80 font-medium leading-relaxed max-w-lg">
                  Liquid-cooled dual overhead camshafts generating 105 HP and 82 ft-lbs of responsive torque with distinct staggered exhaust pulse notes.
                </p>
              </div>
            </div>

            {/* D. SCENE 3 OVERLAY: Speedometer (Speed) & Dimensions (Height & Ground Clearance) */}
            <div
              ref={scene3Ref}
              className="absolute inset-0 z-40 pointer-events-none p-6 sm:p-10 flex flex-col justify-between bg-gradient-to-t from-black/95 via-black/30 to-black/60 opacity-0"
            >
              {/* Top HUD: Speedometer Sweep */}
              <div className="flex items-center justify-between w-full">
                <div className="inline-flex items-center gap-2 bg-black/80 border border-white/10 backdrop-blur-md px-3 py-1.5 rounded-sm">
                  <Gauge className="w-4 h-4 text-[#ff2c2c] animate-pulse" />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-white">
                    SPEEDOMETER TELEMETRY
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[9px] text-white/50 uppercase font-bold tracking-wider block">CURRENT VELOCITY</span>
                  <div className="text-3xl sm:text-5xl font-black font-mono text-[#ff2c2c] leading-none">
                    {liveSpeed} <span className="text-sm font-sans font-bold text-white">MPH</span>
                  </div>
                </div>
              </div>

              {/* Bottom HUD: Height & Dimensions */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-black/80 border border-white/10 p-3.5 rounded-lg backdrop-blur-md">
                <div>
                  <span className="text-[9px] font-bold text-white/50 uppercase tracking-wider block">SEAT HEIGHT</span>
                  <span className="text-sm sm:text-base font-mono font-bold text-white">25.6 in (649 mm)</span>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-white/50 uppercase tracking-wider block">TOP SPEED</span>
                  <span className="text-sm sm:text-base font-mono font-bold text-[#ff2c2c]">130 MPH</span>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-white/50 uppercase tracking-wider block">DRY WEIGHT</span>
                  <span className="text-sm sm:text-base font-mono font-bold text-white">522 lbs (237 kg)</span>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-white/50 uppercase tracking-wider block">GROUND CLEARANCE</span>
                  <span className="text-sm sm:text-base font-mono font-bold text-white">4.7 in (120 mm)</span>
                </div>
              </div>
            </div>

            {/* E. SCENE 4 OVERLAY: Summary & Pre-Order */}
            <div
              ref={scene4Ref}
              className="absolute inset-0 z-40 pointer-events-none p-6 sm:p-10 flex flex-col justify-end bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-0"
            >
              <div className="max-w-xl">
                <span className="text-[10px] text-[#ff2c2c] font-black uppercase tracking-widest block mb-1">
                  OFFICIAL INDIAN MOTORCYCLE
                </span>
                <h3 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase italic font-display text-white tracking-tight leading-none mb-2">
                  Ride The Legend
                </h3>
                <p className="text-xs sm:text-sm text-white/80 font-medium leading-relaxed max-w-lg">
                  Experience the ultimate harmony of heritage style and raw modern power. Explore the lineup below or customize your Scout Bobber today.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Headline: SCOUT (Always 100% visible at top) */}
          <h2
            ref={titleBottomRef}
            className="font-black uppercase text-center font-display tracking-tight text-white select-none relative z-20 mb-2 sm:mb-4"
            style={{
              fontSize: "clamp(3.6rem, 12.5vw, 10.5rem)",
              lineHeight: 0.82,
              letterSpacing: "-0.04em",
              opacity: 1,
              transform: "translate3d(0, 0, 0)",
            }}
          >
            {titleBottom}
          </h2>
        </div>
      </div>
    </section>
  );
}
