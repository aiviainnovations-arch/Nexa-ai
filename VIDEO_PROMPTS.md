# Cinematic video assets

The site already ships with four real, generated background videos in `public/videos/`
(procedurally rendered, not stock or copyrighted footage) so the site looks complete out of the box:

| Slot | Files | Used in |
|---|---|---|
| `hero-core` | `hero-core.mp4` / `.webm` | Hero section background |
| `workflow` | `workflow.mp4` / `.webm` | "From information to action" section background |
| `interface` | `interface.mp4` / `.webm` | Features section, close-up banner |
| `dataflow` | `dataflow.mp4` / `.webm` | Final CTA section background |

They're short (8s), seamless, muted loops at 1280x720, optimized for web (H.264 MP4 + VP9 WebM).
You're welcome to replace any of them with a real AI-generated video for an even more premium look.

## How to replace a video

1. Generate or export your clip (see prompts below).
2. Export **both** an `.mp4` (H.264) and, ideally, a `.webm` (VP9) — MP4 alone is fine too.
3. Name the files to match the slot exactly, e.g. `hero-core.mp4` and `hero-core.webm`.
4. Drop them into `public/videos/`, overwriting the existing files.
5. That's it — no code changes needed. `src/config/videos.ts` already points at these filenames.

Recommended specs: 1280x720 or larger, 15-30s or a seamlessly loopable shorter clip, muted (the
player always mutes), H.264 baseline/high profile MP4 with `+faststart`, under ~8MB per clip so
the page stays fast.

To disable a slot again (falls back to the poster image in `public/posters/`), set
`enabled: false` for that slot in `src/config/videos.ts`.

## Prompts for AI video generation (Veo / Sora / Gemini / Runway, etc.)

### 1. Hero — "AI core forming from floating data"
> A cinematic, premium 3D motion graphic on a near-black background (#05070D). Small glowing
> particles in electric blue, violet and cyan drift and slowly converge into a glowing rounded
> cube at the center of the frame — an "AI core." Thin glowing connection lines and orbiting
> rings surround it. Soft floating glass UI cards with data bars and text lines hover nearby,
> connected to the core by faint dashed lines. Subtle camera drift, shallow depth of field,
> soft bloom. No text, no logos, no people. Loopable, 8-12 seconds, muted, minimal and elegant,
> not busy or cluttered. Enterprise SaaS aesthetic, not sci-fi or cyberpunk.

### 2. Workflow — "raw information transforming into insight"
> Cinematic abstract motion graphic, near-black background. On the left, scattered chaotic
> points of light in blue/cyan/violet drift randomly like noise. As they move right across the
> frame they gradually organize into four evenly spaced glowing rings connected by clean lines,
> becoming ordered rows of light by the right edge of the frame. Represents "raw data becoming
> structured insight." Soft glow, shallow depth of field, no text, no logos. Loopable, 8-12
> seconds, muted, calm and premium, not chaotic or overwhelming.

### 3. Features — "cinematic close-up of an AI interface"
> Cinematic close-up motion graphic of a futuristic dark SaaS dashboard: several soft glassy
> UI panels floating in layered depth, showing animated bar charts, a smooth glowing line
   chart, and a large glowing KPI number ticking upward. Background panels are blurred (shallow
> depth of field), foreground panel sharp. Panels drift gently with parallax. Deep navy/black
> background (#05070D), electric blue and cyan accents, soft glow. No real logos or text beyond
> abstract chart shapes. Loopable, 8-12 seconds, muted, premium enterprise product feel.

### 4. CTA — "abstract data flow"
> Minimal, premium abstract motion graphic: thin streaking lines of light in electric blue,
> cyan and violet flow diagonally across a near-black background (#05070D), like a gentle
> meteor shower of data. Soft central glow, shallow depth of field, very calm and elegant pacing.
> No text, no logos, no people. Loopable, 8-12 seconds, muted, cinematic and minimal — this plays
> behind a large heading, so it must stay subtle and not compete with text on top of it.

**Tip:** keep every clip fairly dark and low-contrast in its center-safe area, since text and UI
are always overlaid on top with a dark gradient wash for legibility.
