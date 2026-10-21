# Lumo: GSAP Animation Playground

A small creative-studio landing page built to practice **GSAP** animation in a modern React stack. It has two sections: an animated hero and a scroll-driven horizontal project carousel.

## Features

### Hero

- **Masked line reveal**: the headline slides up line by line from behind an `overflow-hidden` mask
- **Elastic circles**: the visual circles pop in with `back.out` easing, then breathe in a looping `sine.inOut` yoyo
- **Floating cards**: the "Brand Identity" and "Web Experience" cards bob up and down continuously
- **Animated counters**: the stats (`120+`, `8`, `98%`) count up from zero using a tweened proxy object and `onUpdate`
- **Gradient text and blurred blobs** for the background atmosphere

### Work carousel

- **Scroll-pinned horizontal scroll**: the section pins in place while vertical scrolling moves the cards sideways (`ScrollTrigger` with `pin` and `scrub`)
- **Card-by-card snapping**: scrolling settles on the nearest card
- **Velocity-based skew**: cards lean in the direction you scroll, using `gsap.quickTo`
- **Live progress bar** that follows the scroll progress
- **Prev / Next buttons** that scroll the page to the matching card with `ScrollToPlugin`

## Tech Stack

| Tool                                                           | Purpose                                   |
| -------------------------------------------------------------- | ----------------------------------------- |
| [Next.js](https://nextjs.org/) (App Router)                    | Framework                                 |
| [React](https://react.dev/)                                    | UI                                        |
| [GSAP](https://gsap.com/) `3.15`                               | Animation engine                          |
| [@gsap/react](https://www.npmjs.com/package/@gsap/react) `2.1` | `useGSAP` hook for safe setup and cleanup |
| GSAP plugins: `ScrollTrigger`, `ScrollToPlugin`                | Pinning, scrubbing, programmatic scroll   |
| [Tailwind CSS](https://tailwindcss.com/)                       | Styling                                   |
| Inter and Syne (Google Fonts)                                  | Typography                                |

## Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
app/
├── page.jsx          # Composes the sections
└── components/
    ├── Hero.jsx      # Animated hero section
    └── Work.jsx      # Pinned horizontal-scroll carousel
```

Adjust the paths to match your folder layout.

## How the Carousel Works

1. `ScrollTrigger` pins the section. The pin distance equals the track's overflow (`scrollWidth - viewport width`), so the last card lands exactly as the pin releases.
2. A scrubbed tween maps scroll progress to the track's `x` position.
3. A `snap` function rounds progress to the nearest card.
4. `onUpdate` reads `self.getVelocity()` to drive the skew and `self.progress` to drive the progress bar.
5. The arrow buttons compute the target card's scroll position and tween `window` there with `ScrollToPlugin`.

## Customizing

- **Projects**: edit the `projects` array at the top of `Work.jsx` (`id`, `title`, `tag`, `bg` gradient).
- **Colors**: the palette is `#0e0b1a` (background), `#ff6b4a` (coral), `#7c5cff` (violet) and `#a39fc0` (muted text). Search and replace to re-theme.
- **Feel**: tweak `scrub`, the skew clamp (`-8` to `8`) and the snap `duration` in `Work.jsx`.

## Troubleshooting

- **Layout jumps or wrong pin length**: web fonts load after ScrollTrigger measures the page. Call `ScrollTrigger.refresh()` once `document.fonts.ready` resolves.
- **`_context is not a function`**: make sure there is only one copy of `gsap` (`npm ls gsap`) and that every GSAP import comes from the same package.
- **Next.js**: all animated components need the `"use client"` directive.
