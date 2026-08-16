---
name: interactive-media-expansion
description: Guidelines and patterns for integrating click-to-zoom media expansion components, in-place modal zooms, and seamless product introductions without disrupting primary page flows.
---

# Interactive Media Expansion & In-Place Zoom Pattern

## Core Principles

### 1. Preserve Page Context
- Never replace the main page hero or navigation when asked to trigger an expansion from a sub-element (e.g. video cards, thumbnails).
- Keep the main screen (e.g., 3D canvas scrubbers, hero headers) intact for normal page scrolling.

### 2. In-Place Glassmorphic Overlays
- Render the expansion experience as a backdrop-blurred overlay (`bg-black/90 backdrop-blur-2xl`) directly on top of the current screen.
- Avoid rendering disconnected static backgrounds (e.g. default placeholder nature backgrounds) that clash with the site's dark/brand atmosphere.

### 3. Automated Smooth Zoom on Click
- When opened via click, trigger an automated `requestAnimationFrame` or Framer Motion zoom animation (transitioning from compact card dimensions `300x400` to full widescreen `95vw x 85vh` over ~0.75–1.2s).
- Do not require the user to manually wheel-scroll to start the zoom when explicitly triggered via click.

### 4. Direct Introduction & About Integration
- Immediately position the subject introduction section directly below the zoomed video:
  - **About Section**: Comprehensive overview and engineering conclusion.
  - **Visual Asset**: Transparent 3D cutouts with colorway pickers.
  - **Technical Metrics Grid**: Monospace specifications (HP, torque, displacement, weight).
  - **Action CTAs**: Configurator, test ride scheduler, and lineup navigation.

### 5. Effortless Return & Keyboard Support
- Implement clean dismissal handlers: `Esc` key, backdrop click, and prominent "Back to Main Screen" buttons that return users directly to their previous scroll position.
