<div align="center">

# Nexa AI

**Turn data into intelligence.**

A fictional, premium AI SaaS product concept with a cinematic hero, a working interactive AI workspace demo and animated dashboards.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-View%20Site-05070D?style=for-the-badge)](https://aiviainnovations-arch.github.io/Nexa-ai/)
[![License: MIT](https://img.shields.io/badge/License-MIT-2563EB?style=for-the-badge)](LICENSE)

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-0055FF?logo=framer&logoColor=white)

<img src="public/posters/screenshots/Screenshot%202026-10-01%20034902.png" alt="Nexa AI hero: Turn data into intelligence" width="900">

</div>

> **Disclaimer:** Nexa AI is not a real product. All metrics, names and scenarios are fictional demo content (see `src/data/demo.ts`). There is no real authentication, billing, database or backend, and no compliance or certification badges (SOC 2, ISO, GDPR and so on) are shown or claimed.

---

## Table of contents

- [Overview](#overview)
- [Screenshots](#screenshots)
- [Features](#features)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Project structure](#project-structure)
- [Customisation](#customisation)
- [Performance and mobile](#performance-and-mobile)
- [Cinematic videos](#cinematic-videos)
- [Deploying](#deploying)
- [License](#license)

---

## Overview

Nexa AI is a single-page landing site for an imaginary AI workspace that helps teams analyse information, automate repetitive work and turn complex data into actionable insights. It was built by Aivia Innovations to show design and frontend range in the AI SaaS space: a dark, deep-navy interface with azure, iris and aqua accents, animated analytics, and an interactive workspace you can actually use.

## Screenshots

### Hero

<p align="center">
  <img src="public/posters/screenshots/Screenshot%202026-10-01%20034902.png" alt="Hero with floating data, analytics, insights and automation cards around the Nexa logo" width="900">
</p>

<sub>A 3D-style hero: floating product cards around the Nexa mark, layered over a particle field.</sub>

### Product dashboard and AI workspace

<table>
  <tr>
    <td width="50%"><img src="public/posters/screenshots/Screenshot%202026-10-01%20034919.png" alt="AI Overview dashboard with live metrics"><br><sub><b>Product dashboard</b> - animated metrics, AI insight and recommended next actions</sub></td>
    <td width="50%"><img src="public/posters/screenshots/Screenshot%202026-10-01%20034951.png" alt="Interactive AI workspace demo"><br><sub><b>AI workspace</b> - pick a prompt or type your own and watch Nexa respond</sub></td>
  </tr>
</table>

### Features and solutions

<table>
  <tr>
    <td width="50%"><img src="public/posters/screenshots/Screenshot%202026-10-01%20034924.png" alt="Six capabilities, one workspace"><br><sub><b>Features</b> - six capabilities in one workspace</sub></td>
    <td width="50%"><img src="public/posters/screenshots/Screenshot%202026-10-01%20034930.png" alt="Six capabilities built around your team"><br><sub><b>Solutions</b> - pick a team to see which capabilities do the work</sub></td>
  </tr>
</table>

### How it works and closing call to action

<table>
  <tr>
    <td width="50%"><img src="public/posters/screenshots/Screenshot%202026-10-01%20034934.png" alt="From information to action: Connect, Analyze, Understand, Act"><br><sub><b>Workflow</b> - Connect, Analyze, Understand, Act</sub></td>
    <td width="50%"><img src="public/posters/screenshots/Screenshot%202026-10-01%20034939.png" alt="Ready to build what's next call to action"><br><sub><b>Call to action</b> - closing section and portfolio links</sub></td>
  </tr>
</table>

---

## Features

- **Cinematic 3D-style hero** with floating product cards and a particle canvas
- **Interactive AI workspace demo:** choose a prompt or type your own and watch a simulated analysis play out
- **Animated dashboards and analytics** with counters, sparklines and SVG charts, with no chart library
- **Solutions explorer:** switch teams (customer support, operations, finance and more) to see tailored scenarios
- **Four cinematic background videos** (mp4 and webm) with poster fallbacks
- **Lite mode on phones:** fewer particles, simpler hero, no cursor effects, videos replaced by posters
- **Respects "Reduce motion"** at the OS level
- **All content in data files:** metrics, copy, scenarios and workflow steps live in `src/data/demo.ts`

## Tech stack

| Area | Tools |
| --- | --- |
| Framework | React 18, TypeScript |
| Build | Vite 5 |
| Styling | Tailwind CSS 3, PostCSS |
| Animation | Framer Motion |
| Charts | Custom SVG path helpers (`src/lib/chart.ts`) |
| Fonts | Inter Tight, Inter and JetBrains Mono |

## Getting started

Requires **Node.js 18+**.

```bash
git clone https://github.com/aiviainnovations-arch/Nexa-ai.git
cd Nexa-ai

npm install
npm run dev      # usually http://localhost:5173
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run typecheck` | TypeScript check, no emit |

## Project structure

```text
├── index.html                 # SEO meta, fonts, favicon
├── public/
│   ├── videos/                # 4 cinematic background videos (mp4 + webm)
│   ├── posters/               # poster and fallback images (and README screenshots)
│   ├── favicon.svg
│   └── og-image.jpg           # Open Graph share image
├── src/
│   ├── main.tsx / App.tsx     # entry point, section composition, code-splitting
│   ├── index.css              # design tokens, base styles, reduced-motion rules
│   ├── config/
│   │   ├── site.ts            # brand copy, nav links, portfolio links, performance switches
│   │   └── videos.ts          # which videos are enabled and their filenames
│   ├── data/demo.ts           # ALL fictional demo content
│   ├── hooks/                 # useMediaQuery / useLite, useSpotlight
│   ├── lib/chart.ts           # small SVG chart-path helpers
│   ├── components/
│   │   ├── ui/                # Button, Icon, Logo, Reveal, Tilt, Magnetic, Counter...
│   │   ├── hero/              # 3D-style hero scene and particle canvas
│   │   └── Nav, Footer, CinematicVideo
│   └── sections/              # Hero, ProductDashboard, Solutions, Workspace,
│                              # Features, Workflow, Analytics, Security, CTA
├── tailwind.config.js         # colour system, fonts, keyframes
├── vite.config.ts
└── VIDEO_PROMPTS.md           # how to swap in real AI-generated video
```

## Customisation

**Text, numbers and demo data.** Edit `src/data/demo.ts`. Every metric, chip, chart series, recommendation and workflow step on the site lives in this one file.

**Brand copy and links.** Edit `src/config/site.ts`. Search for `REPLACE` to find the placeholder links (`aiva.contactUrl`, `aiva.workUrl`, `aiva.websiteUrl`) and put your real ones in.

**Colours and fonts.** Edit the `colors` block in `tailwind.config.js` and the reusable surface styles (such as `.glass`) in `src/index.css`. The palette:

| Token | Hex | Use |
| --- | --- | --- |
| `ink` | `#05070D` | Page background |
| `navy` | `#0B1020` | Secondary surface |
| `panel` | `#111827` | Raised surface |
| `azure` | `#2563EB` | Primary accent |
| `iris` | `#7C3AED` | Secondary accent |
| `aqua` | `#22D3EE` | Live-data accent |
| `mist` | `#F3F5FA` | Primary text |
| `steel` | `#8A94A8` | Secondary text |

**Images.** The favicon is `public/favicon.svg`. The share image is `public/og-image.jpg`; regenerate it and keep the filename. Video posters live in `public/posters/`.

## Performance and mobile

Behaviour is centralised in `src/config/site.ts`:

```ts
performance: {
  liteEnabled: true,     // set false to force the full effect on all screens
  liteBelow: 768,        // viewport width (px) below which lite mode starts
  particlesDesktop: 56,  // particle count on larger screens
  particlesLite: 22,     // particle count in lite mode
},
```

In lite mode the hero uses a smaller card layout, the particle field uses fewer particles, cursor-follow, tilt and magnetic effects are disabled, and background videos fall back to their poster image unless a slot sets `playOnMobile: true` in `src/config/videos.ts`.

## Cinematic videos

The four background videos are generated placeholders. To replace them with your own AI-generated clips, drop `.mp4` / `.webm` files into `public/videos/` using the same filenames; no code changes are needed. Ready-to-paste prompts for Veo, Sora, Gemini, Runway and others are in [`VIDEO_PROMPTS.md`](VIDEO_PROMPTS.md).

## Deploying

The build is a static `dist/` folder that works on any static host. The repo includes a GitHub Actions workflow in `.github/workflows/`.

**GitHub Pages.** `vite.config.ts` sets the base path to match this repository:

```ts
base: '/Nexa-ai/',
```

Change it if you rename the repo, and use `'/'` for a custom domain or a `<username>.github.io` site. Then enable **Settings → Pages → Source: GitHub Actions** and push to `main`.

**Vercel, Netlify, Cloudflare Pages.** Build command `npm run build`, output directory `dist`. Set `base: '/'` first.

## License

Released under the [MIT License](LICENSE).

---

<div align="center">

Designed and built by **Aivia Innovations**. Nexa AI is a fictional concept.

</div>
