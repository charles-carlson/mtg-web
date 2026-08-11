---
version: "alpha"
name: "Marathon: Graphic Retro-Futurism"
description: "Hyper-saturated sci-fi interface inspired by Bungie's Marathon — flat contrasting color blocks (acid green, blood orange, cyan), near-black backgrounds, digital dithering/glitch texture, utilitarian stencil labels, lattice/3D-printed geometric patterns. Aggressive, clean, functional. Ideal for gaming, tech, product launch, and sci-fi brand sites."
colors:
  primary: "#D7FF00"
  secondary: "#FF3D1A"
  tertiary: "#00E5FF"
  neutral: "#0B0B0C"
  surface: "#1A1A1D"
  accent: "#F2F2F0"
typography:
  h1:
    fontFamily: "'Neue Machina', 'Eurostile', sans-serif"
    fontSize: 2.5rem
    fontWeight: 800
  body-md:
    fontFamily: "'Inter', sans-serif"
    fontSize: 1rem
    fontWeight: 400
  label-caps:
    fontFamily: "'JetBrains Mono', monospace"
    fontSize: 0.75rem
    fontWeight: 600
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral}"
    padding: 12px
---

## Overview

Bungie calls its own aesthetic "graphic retro-futurism" — a deconstruction of the original 1994 Marathon's industrial sci-fi bones, fused with modern rendering artifacts: digital dithering, lattice structures out of a 3D printer, and crisp Y2K graphic-design-poster energy. It is not moody or gritty. It's loud, flat, and utilitarian — signage that shouts its purpose, stickers that scream "CAUTION," compilers and Runners rendered in colors too saturated to be photoreal but too grounded to be cartoonish.

The palette lives at full volume: strong, flat, contrasting color blocks with almost no gradients or blending. Where most sci-fi UI reaches for gritty realism or moody chrome, Marathon reaches for acid-poster clarity — hyper-saturated, aggressively legible, "the utilitarian turned artistic." Bungie's own art director has described it as sitting somewhere between Wipeout and Ghost in the Shell, with Alberto Mielgo and Into the Spiderverse as visual touchstones rather than other games.

The old trilogy's grungy, low-fi terminal aesthetic still lives underneath — visible in dithered textures, stark scanline-like noise, and stenciled utility type — but it's been rebuilt with clean geometric forms, intentional negative space, and playful systems that feel sharp and iconic rather than dark and lo-fi. The result should feel tense, sterile, a little hostile — a world you have to navigate and an interface that talks back.

- Density: 6/10 — Dense, information-forward
- Variance: 9/10 — Loud, maximal contrast
- Motion: 5/10 — Glitchy but purposeful, not decorative

- **Style:** Graphic Retro-Futurism, Utilitarian Sci-Fi, Techwear, Y2K Cyberpunk
- **Keywords:** Digital dithering, lattice/3D-print structures, hazard signage, acid graphic posters, flat saturated color, terminal glitch, compiler readouts
- **Era:** Near-future / industrial colony (Tau Ceti IV)
- **Light/Dark:** Dark focused, with occasional stark white "clean room" surfaces

## Colors

- **Acid Yellow-Green** (#D7FF00) — Primary accent, calls-to-action, hazard/alert emphasis
- **Blood Orange** (#FF3D1A) — Secondary accent, warnings, high-priority state
- **Signal Cyan** (#00E5FF) — Tertiary accent, links, active/selected states, HUD readouts
- **Near-Black** (#0B0B0C) — Primary background, terminal void
- **Graphite Surface** (#1A1A1D) — Card and panel surfaces
- **Clean White** (#F2F2F0) — High-contrast text, "clean room" surfaces, stencil labels
- **Compiler Magenta** (#E619B8) — Rare emphasis accent, glitch highlight
- **Hazard Black** (#000000) — Stencil/label ground, diagonal hazard stripes with primary color

Flat color blocks only — no gradients, no soft blending. Contrast should feel loud and intentional, like hazard tape, not decorative.

## Typography

- **Display / Hero:** Bold geometric grotesque (Neue Machina, Eurostile, or similar) — Weight 800, tight tracking, all-caps optional for maximum poster impact
- **Body:** Clean humanist sans (Inter or similar) — Weight 400, 16px/1.6 line-height, max 68ch per line
- **UI Labels / Stencil / Readouts:** Monospace (JetBrains Mono) — 0.75rem, weight 600, wide letter-spacing, used for hazard labels, coordinates, and system text
- **Technical / Data:** Monospace — used for stats, timers, extraction countdowns, metadata

Scale:
- Hero: clamp(2.75rem, 6vw, 4.5rem)
- H1: 2.5rem
- H2: 1.75rem
- Body: 1rem / 1.6
- Small / Label: 0.75rem, letter-spacing 0.05em

## Layout

- **Grid:** CSS Grid primary. Max-width containment: 1280px, but allow deliberate bleed/overlap for hazard-stripe elements. 1.5rem side padding minimum.
- **Spacing rhythm:** Dense but intentional. Base unit: 0.5rem (8px).
- **Section vertical gaps:** clamp(3rem, 6vw, 6rem) — tighter than typical to keep the "information-dense terminal" feel.
- **Hero layout:** Asymmetric, poster-like composition with large type overlapping imagery.
- **Feature sections:** Asymmetric grid, cards of varying size treated like modular panel readouts. No 3-equal-columns.
- **Mobile collapse:** All multi-column layouts collapse below 768px. Stencil labels and hazard accents stay legible at small sizes — never shrink below readable minimums.
- **z-index contract:** base (0) / sticky-nav (100) / overlay (200) / modal (300) / toast (500).

## Elevation & Depth

Digital dithering texture (subtle noise overlay), glitch/RGB-split keyframes on hover/active states, lattice/wireframe patterns as decorative background layers, diagonal hazard stripes for emphasis panels.

- **Physics:** Sharp, snappy easing — not smooth ease-out. 120–200ms duration. Should feel like a HUD responding, not a soft UI transition.
- **Entry animations:** Fast fade + slight glitch-offset (2–4px RGB channel split) over 200ms. Staggered cascades for lists: 40ms between items — quicker than typical, terminal-boot feel.
- **Hover states:** Instant color invert or flat-fill swap (primary ↔ neutral), optional 1-frame glitch flicker.
- **Page transitions:** Quick dither-wipe or hard cut (150ms). Avoid soft crossfades — they undercut the utilitarian tone.
- **Performance:** Only transform, opacity, and filter (for dither/noise) animated. No layout-triggering properties.

## Shapes

Base corner radius: 0–2px. Marathon's world is sharp-edged and stenciled, not soft. Rounded corners should be rare and deliberate (e.g., a single circular HUD element), not a default.

## Components

- **Primary Button:** Sharp corners (0–2px). Flat acid-green fill, near-black text. Hover: hard invert to near-black fill / acid-green text, no shadow. Active: 1px hard offset, no easing. Bold uppercase label, letter-spaced.
- **Secondary / Ghost Button:** 1.5–2px hard-edged border in cyan or orange. Text matches border color. Hover: instant flat fill, text inverts to near-black.
- **Cards / Panels:** Sharp corners. Graphite surface, 1px hairline border in accent color. No soft shadows — use a hard 4px offset "sticker" shadow in a contrasting flat color instead of blur.
- **Inputs:** Stencil-style label above input, monospace, uppercase, letter-spaced. 1–2px hard border. Focus: border swaps to acid-green, no glow/blur. Error text below in blood orange.
- **Navigation:** Near-black surface. Active item: acid-green or cyan underline/tick, monospace label. Hazard-stripe accent optional for critical nav states.
- **Skeletons:** Dither/noise shimmer rather than soft gradient shimmer, matching component dimensions.
- **Empty / Alert States:** Hazard-stripe framed panel, stencil-label heading, icon-based composition (angular/geometric icon set, not rounded).

## Do's and Don'ts

- No emojis in UI — use an angular/geometric icon system only
- No soft gradients or color blending — flat contrasting blocks only
- No desaturated or muted palettes — saturation should read as loud and intentional
- No rounded, friendly corner radii as a default — sharp edges are the rule
- No 3-column equal-width feature layouts — use asymmetric, panel-like grids
- No `h-screen` — use `min-h-[100dvh]`
- No AI copywriting clichés: "Elevate", "Seamless", "Unleash", "Next-Gen"
- No broken external image links — use picsum.photos or inline SVG
- No generic lorem ipsum in demos — use terse, utilitarian, hazard-label-style copy where possible

- Do use flat, saturated, contrasting color blocks
- Do use digital dithering / glitch texture as an accent, not a gimmick
- Do use stencil/monospace labels for system and metadata text
- Do use lattice, wireframe, or hazard-stripe geometric patterns
- Do keep corners sharp; treat rounding as a rare exception
- Do let type and iconography feel like signage — legible at a glance, slightly aggressive

## Use Case

Gaming brand sites, hero-shooter/extraction game landing pages, sci-fi product launches, techwear/utility apparel, terminal-style dashboards, anything wanting a loud, utilitarian, near-future edge rather than a soft or corporate feel.
