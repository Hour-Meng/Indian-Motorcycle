/**
 * ==============================================================================
 * SCROLLYTELLING CANVAS ENGINE & GSAP SCROLLTRIGGER SYNC
 * ==============================================================================
 */

gsap.registerPlugin(ScrollTrigger);

// ------------------------------------------------------------------------------
// 1. GLOBAL ENGINE CONFIGURATION
// ------------------------------------------------------------------------------
const isSubdirectory = window.location.pathname.includes("/scout-bobber-3d");

const CONFIG = {
  vehicleName: "Indian Scout Bobber",
  frameCount: 180,               // Total exported frames
  filePrefix: "ezgif-frame-",    // File prefix from ffmpeg/ezgif export
  fileExt: ".jpg",               // Image format
  zeroPadding: 3,                // 3 digits: 001 to 180
  imageDir: isSubdirectory ? "../images/" : "images/",
  fallbackDir: isSubdirectory ? "images/" : "../images/",
  scrubSmoothness: 0.5,          // ScrollTrigger scrub easing
  topSpeedValue: 130,            // Top speed for dynamic HUD calculation
};

// ------------------------------------------------------------------------------
// 2. DOM & STATE REFERENCES
// ------------------------------------------------------------------------------
const canvas = document.getElementById("bike-canvas");
const ctx = canvas.getContext("2d");

const loaderElement = document.getElementById("loader");
const loadProgressText = document.getElementById("load-progress");
const progressFill = document.getElementById("progress-fill");

const hudFrameNumber = document.getElementById("hud-frame-num");
const hudSpeedVal = document.getElementById("hud-speed-val");
const milestoneDots = document.querySelectorAll(".milestone-dot");

const images = [];
const bike = { frame: 0 };
let loadedImages = 0;

// ------------------------------------------------------------------------------
// 3. FRAME URL GENERATOR (1-Indexed with 3-digit Zero-Padding)
// ------------------------------------------------------------------------------
const currentFrame = (index, dir = CONFIG.imageDir) =>
  `${dir}${CONFIG.filePrefix}${(index + 1).toString().padStart(CONFIG.zeroPadding, "0")}${CONFIG.fileExt}`;

// ------------------------------------------------------------------------------
// 4. HIGH-DPI CANVAS SIZING & HIGH-QUALITY TEXTURE FILTERING
// ------------------------------------------------------------------------------
function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;

  // Set internal resolution multiplied by screen pixel ratio
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;

  // Set display size via CSS styling
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;

  // Enable high-quality texture filtering
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  render();
}
window.addEventListener("resize", resizeCanvas);

function render() {
  const currentIdx = Math.min(CONFIG.frameCount - 1, Math.max(0, Math.round(bike.frame)));
  const img = images[currentIdx];
  if (!img) return;

  // Compute aspect ratio scaling based on physical canvas dimensions
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
// 5. ASSET PRELOADER (180 Frames with Accurate Percentage Tracker)
// ------------------------------------------------------------------------------
function preloadImages() {
  let hasFailedOnce = false;

  for (let i = 0; i < CONFIG.frameCount; i++) {
    const img = new Image();
    const primaryUrl = currentFrame(i, CONFIG.imageDir);

    img.onload = () => {
      loadedImages++;
      const percent = Math.round((loadedImages / CONFIG.frameCount) * 100);

      if (loadProgressText) loadProgressText.innerText = `${percent}%`;
      if (progressFill) progressFill.style.width = `${percent}%`;

      if (loadedImages === CONFIG.frameCount) {
        if (loaderElement) {
          loaderElement.style.opacity = "0";
          setTimeout(() => {
            loaderElement.style.display = "none";
            document.body.classList.remove("is-loading");
          }, 600);
        }
        initAnimation();
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
// 6. GSAP SCROLLTRIGGER ANIMATION & TIMELINE
// ------------------------------------------------------------------------------
function initAnimation() {
  resizeCanvas();

  // Scrub frame sequence across total scroll length
  gsap.to(bike, {
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

  // Storyboard Overlay Timeline (4 Key Milestones)
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".scroll-container",
      start: "top top",
      end: "bottom bottom",
      scrub: 0.8,
    },
  });

  tl
    // Scene 1: Headlight / Intro Quality (Frames 0 - 45)
    .fromTo(".scene-1", { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 1 })
    .to(".scene-1", { autoAlpha: 0, y: -30, duration: 1 }, "+=1")

    // Scene 2: Ignition / Powertrain (Frames 46 - 90)
    .fromTo(".scene-2", { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 1 })
    .to(".scene-2", { autoAlpha: 0, y: -30, duration: 1 }, "+=1")

    // Scene 3: Gauges / Speed & Dynamics (Frames 91 - 135)
    .fromTo(".scene-3", { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 1 })
    .to(".scene-3", { autoAlpha: 0, y: -30, duration: 1 }, "+=1")

    // Scene 4: Burnout / Quote, Specs & CTA (Frames 136 - 180)
    .fromTo(".scene-4", { autoAlpha: 0, y: 40, scale: 0.96 }, { autoAlpha: 1, y: 0, scale: 1, duration: 1.5 });
}

// ------------------------------------------------------------------------------
// 7. REAL-TIME TELEMETRY & MILESTONE NAVIGATION
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

// Milestone Navigation Dot Click Handler
milestoneDots.forEach((dot) => {
  dot.addEventListener("click", () => {
    const sceneNumber = parseInt(dot.getAttribute("data-scene"), 10);
    const scrollHeight = document.querySelector(".scroll-container").offsetHeight - window.innerHeight;
    const targets = { 1: 0.05, 2: 0.35, 3: 0.65, 4: 0.95 };
    const targetScroll = (targets[sceneNumber] || 0) * scrollHeight;

    window.scrollTo({
      top: targetScroll,
      behavior: "smooth"
    });
  });
});

// ------------------------------------------------------------------------------
// 8. BOOTSTRAP
// ------------------------------------------------------------------------------
window.addEventListener("DOMContentLoaded", () => {
  preloadImages();
});