/**
 * ==============================================================================
 * INDIAN SCOUT BOBBER LUXURY LANDING PAGE & 3D SHOWCASE ENGINE
 * ==============================================================================
 */

gsap.registerPlugin(ScrollTrigger);

// ------------------------------------------------------------------------------
// 1. GLOBAL ENGINE CONFIGURATION
// ------------------------------------------------------------------------------
const isSubdirectory = window.location.pathname.includes("/scout-bobber-3d");

const CONFIG = {
  vehicleName: "Indian Scout Bobber",
  frameCount: 180,
  filePrefix: "ezgif-frame-",
  fileExt: ".jpg",
  zeroPadding: 3,
  imageDir: isSubdirectory ? "../images/" : "images/",
  fallbackDir: isSubdirectory ? "images/" : "../images/",
  scrubSmoothness: 0.5,
  topSpeedValue: 130,
};

// ------------------------------------------------------------------------------
// 2. DOM & STATE REFERENCES
// ------------------------------------------------------------------------------
const canvas = document.getElementById("bike-canvas");
const ctx = canvas ? canvas.getContext("2d") : null;

const loaderElement = document.getElementById("loader");
const loadProgressText = document.getElementById("load-progress");
const progressFill = document.getElementById("progress-fill");
const loaderStatusText = document.getElementById("loader-status-text");
const loaderFramesLoaded = document.getElementById("loader-frames-loaded");
const loaderHintMsg = document.getElementById("loader-hint-msg");

const hudFrameNumber = document.getElementById("hud-frame-num");
const hudSpeedVal = document.getElementById("hud-speed-val");
const milestoneDots = document.querySelectorAll(".milestone-dot");

const images = [];
const bike = { frame: 0 };
let loadedImages = 0;
let is3DInitialized = false;
let scrollTriggerInstance = null;
let timelineInstance = null;

// ------------------------------------------------------------------------------
// 3. FRAME URL GENERATOR
// ------------------------------------------------------------------------------
const currentFrame = (index, dir = CONFIG.imageDir) =>
  `${dir}${CONFIG.filePrefix}${(index + 1).toString().padStart(CONFIG.zeroPadding, "0")}${CONFIG.fileExt}`;

// ------------------------------------------------------------------------------
// 4. HIGH-DPI CANVAS SIZING & COVER MATH
// ------------------------------------------------------------------------------
function resizeCanvas() {
  if (!canvas || !ctx) return;
  const dpr = window.devicePixelRatio || 1;

  // Physical resolution
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;

  // Display size via CSS
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;

  // Enable high-quality texture filtering
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  render();
}

window.addEventListener("resize", () => {
  if (document.body.classList.contains("showcase-active")) {
    resizeCanvas();
    ScrollTrigger.refresh();
  }
});

function render() {
  if (!canvas || !ctx) return;
  const currentIdx = Math.min(CONFIG.frameCount - 1, Math.max(0, Math.round(bike.frame)));
  const img = images[currentIdx];
  if (!img) return;

  // Compute aspect ratio scaling (object-fit: cover)
  const hRatio = canvas.width / img.width;
  const vRatio = canvas.height / img.height;
  const ratio = Math.max(hRatio, vRatio);

  const centerShiftX = (canvas.width - img.width * ratio) / 2;
  const centerShiftY = (canvas.height - img.height * ratio) / 2;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(
    img,
    0, 0, img.width, img.height,
    centerShiftX, centerShiftY, img.width * ratio, img.height * ratio
  );
}

// ------------------------------------------------------------------------------
// 5. ASSET PRELOADER (180 HD Frames with Telemetry Stages)
// ------------------------------------------------------------------------------
const LOADING_STAGES = [
  { at: 10, title: "INITIALIZING SPEEDPLUS 1250 ENGINE", hint: "Configuring liquid-cooled dual overhead camshaft parameters..." },
  { at: 35, title: "PRELOADING 180 HIGH-DEFINITION FRAMES", hint: "Extracting 60FPS rotational camera sequence..." },
  { at: 70, title: "CALIBRATING SCROLL SCRUB SHADERS", hint: "Optimizing high-DPI canvas texture buffers..." },
  { at: 95, title: "SYSTEM READY TO IGNITE", hint: "180 HD frames synchronized. Scroll to explore." }
];

function updateLoaderStage(percent) {
  for (let i = LOADING_STAGES.length - 1; i >= 0; i--) {
    if (percent >= LOADING_STAGES[i].at) {
      if (loaderStatusText) loaderStatusText.innerText = LOADING_STAGES[i].title;
      if (loaderHintMsg) loaderHintMsg.innerText = LOADING_STAGES[i].hint;
      break;
    }
  }
}

function preloadImages(onComplete) {
  let hasFailedOnce = false;

  for (let i = 0; i < CONFIG.frameCount; i++) {
    const img = new Image();
    const primaryUrl = currentFrame(i, CONFIG.imageDir);

    img.onload = () => {
      loadedImages++;
      const percent = Math.round((loadedImages / CONFIG.frameCount) * 100);

      if (loadProgressText) loadProgressText.innerText = `${percent}%`;
      if (progressFill) progressFill.style.width = `${percent}%`;
      if (loaderFramesLoaded) loaderFramesLoaded.innerText = `${loadedImages} / ${CONFIG.frameCount} FRAMES`;

      updateLoaderStage(percent);

      if (loadedImages === CONFIG.frameCount) {
        setTimeout(() => {
          if (loaderElement) {
            loaderElement.style.opacity = "0";
            setTimeout(() => {
              loaderElement.style.display = "none";
            }, 600);
          }
          if (onComplete) onComplete();
        }, 300);
      }
    };

    img.onerror = () => {
      if (!hasFailedOnce) {
        hasFailedOnce = true;
        console.warn(`Frame failed at ${primaryUrl}. Trying fallback: ${CONFIG.fallbackDir}`);
      }
      img.onerror = null;
      img.src = currentFrame(i, CONFIG.fallbackDir);
    };

    img.src = primaryUrl;
    images.push(img);
  }
}

// ------------------------------------------------------------------------------
// 6. GSAP SCROLLTRIGGER ANIMATION INITIALIZATION
// ------------------------------------------------------------------------------
function init3DAnimation() {
  if (is3DInitialized) {
    resizeCanvas();
    ScrollTrigger.refresh();
    return;
  }

  resizeCanvas();

  // Frame Scrubbing Tween
  scrollTriggerInstance = gsap.to(bike, {
    frame: CONFIG.frameCount - 1,
    snap: "frame",
    ease: "none",
    scrollTrigger: {
      trigger: ".scroll-container",
      start: "top top",
      end: "bottom bottom",
      scrub: CONFIG.scrubSmoothness,
      onUpdate: (self) => {
        render();
        updateTelemetryHUD(Math.round(bike.frame), self.progress);
      },
    },
  });

  // Storyboard Overlay Timeline (4 Milestones)
  timelineInstance = gsap.timeline({
    scrollTrigger: {
      trigger: ".scroll-container",
      start: "top top",
      end: "bottom bottom",
      scrub: 0.8,
    },
  });

  timelineInstance
    // Milestone 1: Headlight / Intro (0 - 45)
    .fromTo(".scene-1", { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 1 })
    .to(".scene-1", { autoAlpha: 0, y: -30, duration: 1 }, "+=1")

    // Milestone 2: Ignition / Powertrain (46 - 90)
    .fromTo(".scene-2", { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 1 })
    .to(".scene-2", { autoAlpha: 0, y: -30, duration: 1 }, "+=1")

    // Milestone 3: Gauges / Speed & Dynamics (91 - 135)
    .fromTo(".scene-3", { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 1 })
    .to(".scene-3", { autoAlpha: 0, y: -30, duration: 1 }, "+=1")

    // Milestone 4: Summary Quote, Specs & CTA (136 - 180)
    .fromTo(".scene-4", { autoAlpha: 0, y: 40, scale: 0.96 }, { autoAlpha: 1, y: 0, scale: 1, duration: 1.5 });

  is3DInitialized = true;
}

// ------------------------------------------------------------------------------
// 7. REAL-TIME TELEMETRY & MILESTONE HUD
// ------------------------------------------------------------------------------
function updateTelemetryHUD(frameIndex, progress) {
  if (hudFrameNumber) {
    const formatted = (frameIndex + 1).toString().padStart(CONFIG.zeroPadding, "0");
    hudFrameNumber.innerText = `${formatted} / ${CONFIG.frameCount}`;
  }

  if (hudSpeedVal) {
    let currentSpeed = 0;
    if (progress > 0.45 && progress < 0.85) {
      const accelerationProgress = (progress - 0.45) / 0.4;
      currentSpeed = Math.round(accelerationProgress * CONFIG.topSpeedValue);
    } else if (progress >= 0.85) {
      currentSpeed = CONFIG.topSpeedValue;
    }
    hudSpeedVal.innerText = `${currentSpeed} MPH`;
  }

  let currentMilestone = 1;
  if (progress >= 0.75) currentMilestone = 4;
  else if (progress >= 0.5) currentMilestone = 3;
  else if (progress >= 0.25) currentMilestone = 2;

  milestoneDots.forEach((dot) => {
    const sceneIndex = parseInt(dot.getAttribute("data-scene"), 10);
    if (sceneIndex === currentMilestone) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
}

// Milestone Dot Click Navigation
milestoneDots.forEach((dot) => {
  dot.addEventListener("click", () => {
    const sceneNumber = parseInt(dot.getAttribute("data-scene"), 10);
    const scrollContainer = document.querySelector(".scroll-container");
    if (!scrollContainer) return;
    const scrollHeight = scrollContainer.offsetHeight - window.innerHeight;
    const targets = { 1: 0.05, 2: 0.35, 3: 0.65, 4: 0.95 };
    const targetScroll = (targets[sceneNumber] || 0) * scrollHeight;

    window.scrollTo({
      top: targetScroll,
      behavior: "smooth"
    });
  });
});

// ------------------------------------------------------------------------------
// 8. VIEW SWITCHING: LANDING PAGE <-> 3D SHOWCASE ROOM
// ------------------------------------------------------------------------------
function show3DShowcase(targetModel = "Scout Bobber") {
  document.body.classList.remove("landing-active");
  document.body.classList.add("showcase-active");

  window.scrollTo({ top: 0, behavior: "instant" });

  if (loaderElement && loadedImages < CONFIG.frameCount) {
    loaderElement.style.display = "flex";
    loaderElement.style.opacity = "1";
    loaderElement.style.visibility = "visible";
  }

  setTimeout(() => {
    init3DAnimation();
    resizeCanvas();
    ScrollTrigger.refresh();
  }, 100);
}

function hide3DShowcase() {
  document.body.classList.remove("showcase-active");
  document.body.classList.add("landing-active");

  const lineupSection = document.getElementById("lineup");
  if (lineupSection) {
    lineupSection.scrollIntoView({ behavior: "smooth" });
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

// ------------------------------------------------------------------------------
// 9. ACOUSTIC AMERICAN V-TWIN REV SIMULATOR (WEB AUDIO SYNTHESIZER)
// ------------------------------------------------------------------------------
class VTwinAudioEngine {
  constructor() {
    this.ctx = null;
    this.osc1 = null;
    this.osc2 = null;
    this.subOsc = null;
    this.noiseNode = null;
    this.filter = null;
    this.gainNode = null;
    this.isRevving = false;
    this.isMuted = false;
    this.currentRPM = 950;
    this.targetRPM = 950;
    this.animFrame = null;
  }

  init() {
    if (this.ctx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    this.ctx = new AudioContext();

    // Lowpass filter with resonance
    this.filter = this.ctx.createBiquadFilter();
    this.filter.type = "lowpass";
    this.filter.frequency.setValueAtTime(180, this.ctx.currentTime);
    this.filter.Q.setValueAtTime(4.0, this.ctx.currentTime);

    // Master Gain
    this.gainNode = this.ctx.createGain();
    this.gainNode.gain.setValueAtTime(0, this.ctx.currentTime);

    this.filter.connect(this.gainNode);
    this.gainNode.connect(this.ctx.destination);

    // Primary V-Twin Cylinders (Dual staggered oscillators)
    this.osc1 = this.ctx.createOscillator();
    this.osc1.type = "sawtooth";
    this.osc1.frequency.setValueAtTime(32, this.ctx.currentTime);

    this.osc2 = this.ctx.createOscillator();
    this.osc2.type = "triangle";
    this.osc2.frequency.setValueAtTime(32.5, this.ctx.currentTime);

    this.subOsc = this.ctx.createOscillator();
    this.subOsc.type = "sine";
    this.subOsc.frequency.setValueAtTime(16, this.ctx.currentTime);

    this.osc1.connect(this.filter);
    this.osc2.connect(this.filter);
    this.subOsc.connect(this.filter);

    this.osc1.start();
    this.osc2.start();
    this.subOsc.start();

    this.startRPMTicker();
  }

  startRPMTicker() {
    const update = () => {
      // Interpolate RPM
      const step = this.isRevving ? 320 : 180;
      if (this.currentRPM < this.targetRPM) {
        this.currentRPM = Math.min(this.targetRPM, this.currentRPM + step);
      } else if (this.currentRPM > this.targetRPM) {
        this.currentRPM = Math.max(this.targetRPM, this.currentRPM - step);
      }

      // Update Tachometer Needle (-120deg at 0 RPM to +120deg at 9000 RPM)
      const needleAngle = -120 + (this.currentRPM / 9000) * 240;
      const needleEl = document.getElementById("tacho-needle");
      if (needleEl) needleEl.style.transform = `rotate(${needleAngle}deg)`;

      const rpmDisplay = document.getElementById("tacho-rpm-display");
      if (rpmDisplay) rpmDisplay.innerText = Math.round(this.currentRPM).toLocaleString();

      const statusEl = document.getElementById("rev-engine-status");
      if (statusEl) {
        if (this.currentRPM > 6500) {
          statusEl.innerText = `REDLINE (${Math.round(this.currentRPM)} RPM)`;
          statusEl.className = "stat-val text-red";
        } else if (this.currentRPM > 2000) {
          statusEl.innerText = `ACCELERATING (${Math.round(this.currentRPM)} RPM)`;
          statusEl.className = "stat-val status-active";
        } else {
          statusEl.innerText = `IDLE (${Math.round(this.currentRPM)} RPM)`;
          statusEl.className = "stat-val status-active";
        }
      }

      // Update Audio Pitch
      if (this.ctx && this.osc1 && !this.isMuted) {
        const baseFreq = 28 + (this.currentRPM / 9000) * 160;
        const now = this.ctx.currentTime;
        this.osc1.frequency.setTargetAtTime(baseFreq, now, 0.05);
        this.osc2.frequency.setTargetAtTime(baseFreq * 1.02, now, 0.05);
        this.subOsc.frequency.setTargetAtTime(baseFreq * 0.5, now, 0.05);
        this.filter.frequency.setTargetAtTime(140 + (this.currentRPM / 9000) * 850, now, 0.05);
      }

      this.animFrame = requestAnimationFrame(update);
    };

    update();
  }

  pressThrottle() {
    this.init();
    if (this.ctx && this.ctx.state === "suspended") this.ctx.resume();
    this.isRevving = true;
    this.targetRPM = 7800 + Math.random() * 400;

    if (this.gainNode && !this.isMuted) {
      this.gainNode.gain.setTargetAtTime(0.28, this.ctx.currentTime, 0.08);
    }
  }

  releaseThrottle() {
    this.isRevving = false;
    this.targetRPM = 950;

    if (this.gainNode && !this.isMuted) {
      this.gainNode.gain.setTargetAtTime(0.08, this.ctx.currentTime, 0.3);
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.gainNode) {
      this.gainNode.gain.setValueAtTime(this.isMuted ? 0 : 0.08, this.ctx?.currentTime || 0);
    }
    const audioBtnText = document.getElementById("audio-toggle-text");
    if (audioBtnText) {
      audioBtnText.innerText = this.isMuted ? "Sound Muted" : "Sound Engine Active";
    }
  }
}

const vTwinAudio = new VTwinAudioEngine();

// ------------------------------------------------------------------------------
// 10. MODAL LOGIC & CONFIGURATOR
// ------------------------------------------------------------------------------
const customizerState = {
  basePrice: 12999,
  modelName: "Scout Bobber",
  colorAdd: 0,
  colorName: "Black Metallic",
  exhaustAdd: 0,
};

function updateCustomizerSummary() {
  const total = customizerState.basePrice + customizerState.colorAdd + customizerState.exhaustAdd;
  const priceDisplay = document.getElementById("customizer-total-price");
  if (priceDisplay) priceDisplay.innerText = `$${total.toLocaleString()}`;

  const badge = document.getElementById("customizer-model-badge");
  if (badge) badge.innerText = `${customizerState.modelName.toUpperCase()} // ${customizerState.colorName.toUpperCase()}`;
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
}

// ------------------------------------------------------------------------------
// 11. EVENT LISTENERS & DOM INITIALIZATION
// ------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  // 1. Start Preloading frames in background
  preloadImages();

  // 2. Triggers to Open 3D Showcase (Hero, Nav, Scene 4)
  const navLaunchBtn = document.getElementById("nav-launch-3d");
  if (navLaunchBtn) {
    navLaunchBtn.addEventListener("click", (e) => {
      e.preventDefault();
      show3DShowcase("Scout Bobber");
    });
  }

  const heroLaunchBtn = document.getElementById("hero-launch-3d");
  if (heroLaunchBtn) {
    heroLaunchBtn.addEventListener("click", () => {
      show3DShowcase("Scout Bobber");
    });
  }

  const close3DBtn = document.getElementById("btn-close-3d");
  if (close3DBtn) {
    close3DBtn.addEventListener("click", () => {
      hide3DShowcase();
    });
  }

  // 3. Always-On-Display Video Card Click -> Guide to Main Indian Scout Showcase Screen
  document.querySelectorAll(".video-card-interactive, .model-visual-preview").forEach((card) => {
    card.addEventListener("click", () => {
      const modelCard = card.closest(".model-card");
      const modelName = modelCard?.querySelector(".card-title")?.innerText || "Scout Bobber";
      show3DShowcase(modelName);
    });
  });

  // Model Card 3D launch buttons
  document.querySelectorAll(".btn-card-launch-3d").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const modelName = btn.closest(".model-card")?.querySelector(".card-title")?.innerText || "Scout Bobber";
      show3DShowcase(modelName);
    });
  });

  // 4. Model Filter Tabs
  const filterTabs = document.querySelectorAll(".filter-tab");
  const modelCards = document.querySelectorAll(".model-card");

  filterTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      filterTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      const filter = tab.getAttribute("data-filter");

      modelCards.forEach((card) => {
        const category = card.getAttribute("data-category");
        if (filter === "all" || category === filter) {
          card.style.display = "flex";
          gsap.fromTo(card, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 });
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // 5. Color Swatches Interaction
  document.querySelectorAll(".swatch").forEach((swatch) => {
    swatch.addEventListener("click", (e) => {
      e.stopPropagation();
      const parentSwatches = swatch.parentElement;
      parentSwatches.querySelectorAll(".swatch").forEach((s) => s.classList.remove("active"));
      swatch.classList.add("active");

      const card = swatch.closest(".model-card");
      if (card) {
        const glow = card.querySelector(".video-overlay-gradient");
        if (glow) {
          glow.style.boxShadow = `inset 0 0 40px ${swatch.style.background}`;
        }
      }
    });
  });

  // 6. V-Twin Rev Simulator Controls (Hold or Click)
  const throttleBtn = document.getElementById("btn-rev-throttle");
  if (throttleBtn) {
    // Pointer / Mouse events
    throttleBtn.addEventListener("mousedown", (e) => {
      e.preventDefault();
      throttleBtn.classList.add("revving");
      vTwinAudio.pressThrottle();
    });

    window.addEventListener("mouseup", () => {
      throttleBtn.classList.remove("revving");
      vTwinAudio.releaseThrottle();
    });

    // Touch events for mobile
    throttleBtn.addEventListener("touchstart", (e) => {
      e.preventDefault();
      throttleBtn.classList.add("revving");
      vTwinAudio.pressThrottle();
    });

    throttleBtn.addEventListener("touchend", () => {
      throttleBtn.classList.remove("revving");
      vTwinAudio.releaseThrottle();
    });
  }

  const audioToggleBtn = document.getElementById("btn-audio-toggle");
  if (audioToggleBtn) {
    audioToggleBtn.addEventListener("click", () => {
      vTwinAudio.toggleMute();
    });
  }

  // 7. Modals: Open & Close Event Wiring
  // Configurator Modal Triggers
  const navCustomizerBtn = document.getElementById("nav-btn-customizer");
  if (navCustomizerBtn) {
    navCustomizerBtn.addEventListener("click", () => openModal("modal-customizer"));
  }

  document.querySelectorAll(".btn-card-customizer").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      openModal("modal-customizer");
    });
  });

  const scene4ConfigBtn = document.getElementById("scene4-btn-configure");
  if (scene4ConfigBtn) {
    scene4ConfigBtn.addEventListener("click", () => {
      hide3DShowcase();
      setTimeout(() => openModal("modal-customizer"), 300);
    });
  }

  // Test Ride Modal Triggers
  const navTestRideBtn = document.getElementById("nav-btn-test-ride");
  if (navTestRideBtn) {
    navTestRideBtn.addEventListener("click", () => openModal("modal-test-ride"));
  }

  const heroTestRideBtn = document.getElementById("hero-open-test-ride");
  if (heroTestRideBtn) {
    heroTestRideBtn.addEventListener("click", () => openModal("modal-test-ride"));
  }

  const hubBookTestRide = document.getElementById("hub-book-test-ride");
  if (hubBookTestRide) {
    hubBookTestRide.addEventListener("click", () => openModal("modal-test-ride"));
  }

  const hubLocateDealer = document.getElementById("hub-locate-dealer");
  if (hubLocateDealer) {
    hubLocateDealer.addEventListener("click", () => openModal("modal-test-ride"));
  }

  const btn3dTestRide = document.getElementById("btn-3d-test-ride");
  if (btn3dTestRide) {
    btn3dTestRide.addEventListener("click", () => openModal("modal-test-ride"));
  }

  const scene4TestRide = document.getElementById("scene4-btn-test-ride");
  if (scene4TestRide) {
    scene4TestRide.addEventListener("click", () => openModal("modal-test-ride"));
  }

  // VIP Signup Trigger
  const vipSignupBtn = document.getElementById("hub-open-vip-signup");
  if (vipSignupBtn) {
    vipSignupBtn.addEventListener("click", () => openModal("modal-vip-signup"));
  }

  // Close Modals buttons
  document.getElementById("btn-close-customizer")?.addEventListener("click", () => closeModal("modal-customizer"));
  document.getElementById("btn-close-test-ride")?.addEventListener("click", () => closeModal("modal-test-ride"));
  document.getElementById("btn-close-vip")?.addEventListener("click", () => closeModal("modal-vip-signup"));

  // Close on Backdrop Click
  document.querySelectorAll(".modal-backdrop").forEach((backdrop) => {
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) {
        closeModal(backdrop.id);
      }
    });
  });

  // Close on ESC key
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.querySelectorAll(".modal-backdrop.open").forEach((m) => closeModal(m.id));
      if (document.body.classList.contains("showcase-active")) {
        hide3DShowcase();
      }
    }
  });

  // 8. Customizer Option Interactions
  document.querySelectorAll(".cust-select-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".cust-select-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      customizerState.basePrice = parseInt(btn.getAttribute("data-base-price") || "12999", 10);
      customizerState.modelName = btn.getAttribute("data-model-name") || "Scout Bobber";
      updateCustomizerSummary();
    });
  });

  document.querySelectorAll(".cust-color-pill").forEach((pill) => {
    pill.addEventListener("click", () => {
      document.querySelectorAll(".cust-color-pill").forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");
      customizerState.colorAdd = parseInt(pill.getAttribute("data-color-add") || "0", 10);
      customizerState.colorName = pill.getAttribute("data-color-name") || "Black Metallic";

      const glow = document.getElementById("customizer-glow");
      const hex = pill.style.getPropertyValue("--c");
      if (glow && hex) {
        glow.style.background = `radial-gradient(circle, ${hex} 0%, transparent 70%)`;
      }
      updateCustomizerSummary();
    });
  });

  document.querySelectorAll('input[name="cust-exhaust"]').forEach((radio) => {
    radio.addEventListener("change", () => {
      customizerState.exhaustAdd = parseInt(radio.value || "0", 10);
      updateCustomizerSummary();
    });
  });

  document.getElementById("cust-btn-submit")?.addEventListener("click", () => {
    alert(`Configuration Locked! Your custom ${customizerState.modelName} quote has been prepared. Total: $${(customizerState.basePrice + customizerState.colorAdd + customizerState.exhaustAdd).toLocaleString()}`);
    closeModal("modal-customizer");
  });

  // Form Submissions
  document.getElementById("form-test-ride")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("ride-name")?.value;
    alert(`Thank you, ${name}! Your official Indian Scout test ride reservation request has been submitted to your local dealer.`);
    closeModal("modal-test-ride");
  });

  document.getElementById("form-vip-signup")?.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Welcome to the Indian Scout VIP Club! Look out for exclusive drop notifications in your inbox.");
    closeModal("modal-vip-signup");
  });
});
