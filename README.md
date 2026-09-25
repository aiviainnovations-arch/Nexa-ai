# Nexa AI — AIVA portfolio concept
![Uploading Screenshot 2026-09-22 123641.png…]()


A fictional, premium AI SaaS product built to demonstrate AIVA's design and frontend
capabilities: cinematic 3D-style hero, a working interactive AI workspace demo, animated
dashboards and analytics, and four generated cinematic background videos.

**Stack:** React + Vite + TypeScript + Tailwind CSS + Framer Motion.

Everything on the site is fictional demo content for a portfolio piece — see `src/data/demo.ts`.

---

## 1. Setup

Requires **Node.js 18+**.

```bash
cd nexa-ai
npm install
npm run dev
```

Open the URL that Vite prints (usually `http://localhost:5173`).

Other commands:

```bash
npm run build      # production build -> dist/
npm run preview    # preview the production build locally
npm run typecheck  # TypeScript check, no emit
```

## 2. Folder structure

```
nexa-ai/
├── index.html                 SEO meta, fonts, favicon
├── public/
│   ├── videos/                4 cinematic background videos (mp4 + webm)
│   ├── posters/                poster/fallback images for each video
│   ├── favicon.svg
│   └── og-image.jpg           Open Graph share image
├── src/
│   ├── main.tsx / App.tsx     entry point, section composition, code-splitting
│   ├── index.css              design tokens, base styles, reduced-motion rules
│   ├── config/
│   │   ├── site.ts            brand copy, nav links, AIVA links, performance switches
│   │   └── videos.ts          which cinematic videos are enabled + their filenames
│   ├── data/demo.ts           ALL fictional demo content (metrics, copy, scenarios…)
│   ├── hooks/                 useMediaQuery/useLite, useSpotlight
│   ├── lib/chart.ts           small SVG chart-path helpers (no chart library needed)
│   ├── components/
│   │   ├── ui/                Button, Icon, Logo, Reveal, Tilt, Magnetic, Counter…
│   │   ├── hero/               the 3D-style hero Scene + particle canvas
│   │   ├── Nav.tsx, Footer.tsx, CinematicVideo.tsx
│   └── sections/               one file per landing-page section (Hero, ProductDashboard,
│                                Solutions, Workspace, Features, Workflow, Analytics,
│                                Security, CTA)
├── tailwind.config.js          colour system, fonts, keyframes
├── vite.config.ts
└── VIDEO_PROMPTS.md            how to swap in real AI-generated video + ready prompts
```

## 3. How to change things

**Text, numbers, demo data** — edit `src/data/demo.ts`. Every metric, chip, chart series,
recommendation and workflow step used across the whole site lives in this one file.

**Brand copy, nav links, AIVA contact links** — edit `src/config/site.ts`. Search for
`REPLACE` to find the placeholder links (`aiva.contactUrl`, `aiva.workUrl`, `aiva.websiteUrl`)
and put your real ones in.

**Colours / fonts / spacing** — edit `tailwind.config.js` (the `colors` block) and
`src/index.css` (`@layer components` for reusable surface styles like `.glass`).

**Images** — the favicon is `public/favicon.svg` (inline gradient mark). The Open Graph share
image is `public/og-image.jpg`, regenerate it however you like and keep the same filename.
Poster images for each video are in `public/posters/`.

**Videos** — see `VIDEO_PROMPTS.md`. Short version: drop replacement `.mp4`/`.webm` files into
`public/videos/` using the same filenames, no code changes required.

## 4. Disabling/adjusting heavy 3D and effects on mobile

Performance behaviour is centralised in `src/config/site.ts`:

```ts
performance: {
  liteEnabled: true,     // turn off entirely to force the full effect on all screens
  liteBelow: 768,        // viewport width (px) below which the "lite" mode kicks in
  particlesDesktop: 56,  // particle count on larger screens
  particlesLite: 22,     // particle count in lite mode
},
```

In "lite" mode (phones, by default): the hero 3D scene uses a smaller, simpler card layout,
the particle field uses fewer particles, cursor-follow/tilt/magnetic effects are disabled
(they check for a fine pointer via `useFinePointer`), and background videos are skipped in
favour of the poster image (unless a slot sets `playOnMobile: true` in `src/config/videos.ts`).

The whole site also fully respects the OS-level **"Reduce motion"** accessibility setting —
when it's on, animations are minimized or skipped everywhere automatically.

## 5. Deploying

This is a static site — `npm run build` outputs a `dist/` folder you can host anywhere
(Vercel, Netlify, Cloudflare Pages, GitHub Pages, S3, etc.).

**Vercel / Netlify:** point the project at this repo, build command `npm run build`, output
directory `dist`. No configuration needed.

**A sub-path (e.g. GitHub Pages at `/nexa-ai/`):** build with the base path set:

```bash
VITE_BASE=/nexa-ai/ npm run build
```

## 6. Replacing placeholder videos with your own AI-generated ones

Full instructions and ready-to-paste prompts (Veo, Sora, Gemini, Runway, etc.) are in
[`VIDEO_PROMPTS.md`](./VIDEO_PROMPTS.md).

## 7. Notes

- All product data, metrics and names are fictional demo content for this portfolio piece.
- No real authentication, billing, database or backend is included, by design — see the
  original project brief for why.
- No compliance/certification badges (SOC 2, ISO, GDPR, etc.) are shown or claimed anywhere.
