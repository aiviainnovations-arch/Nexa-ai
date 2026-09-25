/**
 * Cinematic video slots.
 *
 * HOW TO ADD A VIDEO
 *  1. Put your file in /public/videos/ using the name shown below (e.g. hero-core.mp4).
 *  2. Set `enabled: true` for that slot.
 *  3. Restart `npm run dev` if it is running.
 *
 * While a slot is disabled (or the file is missing) the site shows the poster image
 * from /public/posters/ with a slow camera drift, so nothing ever looks broken.
 *
 * Ready-to-paste generation prompts are in VIDEO_PROMPTS.md.
 */
const base = import.meta.env?.BASE_URL ?? '/';

export type VideoSlot = {
  id: string;
  /** Flip to true after adding the file(s) to /public/videos */
  enabled: boolean;
  /** Which files exist. MP4 (H.264) is the safest; WebM (VP9) is optional and smaller. */
  formats: ('mp4' | 'webm')[];
  poster: string;
  /** Play the video on phones too? Default false to save data and battery. */
  playOnMobile: boolean;
  src: (ext: 'mp4' | 'webm') => string;
};

const slot = (id: string, opts: Partial<Pick<VideoSlot, 'enabled' | 'formats' | 'playOnMobile'>> = {}): VideoSlot => ({
  id,
  enabled: false,
  formats: ['webm', 'mp4'],
  playOnMobile: false,
  poster: `${base}posters/${id}.jpg`,
  src: (ext) => `${base}videos/${id}.${ext}`,
  ...opts,
});

export const videos = {
  /** Hero: an AI core forming from floating data -> /public/videos/hero-core.(mp4|webm) */
  heroCore: slot('hero-core', { enabled: true }),
  /** Workflow: raw information transforming into insights -> /public/videos/workflow.(mp4|webm) */
  workflow: slot('workflow', { enabled: true }),
  /** Features: close-up of the interface with charts and automation cards -> /public/videos/interface.(mp4|webm) */
  interface: slot('interface', { enabled: true }),
  /** CTA: abstract data flow -> /public/videos/dataflow.(mp4|webm) */
  dataflow: slot('dataflow', { enabled: true }),
};
