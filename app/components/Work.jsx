"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin);

const projects = [
  {
    id: "01",
    title: "Aurora Branding",
    tag: "Brand Identity",
    bg: "bg-[linear-gradient(145deg,#7c5cff,#3a1f9e)]",
  },
  {
    id: "02",
    title: "Nova Commerce",
    tag: "Web Experience",
    bg: "bg-[linear-gradient(145deg,#ff6b4a,#b8321a)]",
  },
  {
    id: "03",
    title: "Pulse App",
    tag: "Product Design",
    bg: "bg-[linear-gradient(145deg,#3a1f9e,#ff6b4a)]",
  },
  {
    id: "04",
    title: "Orbit Studio",
    tag: "Motion Design",
    bg: "bg-[linear-gradient(145deg,#1a1530,#7c5cff)]",
  },
  {
    id: "05",
    title: "Echo Records",
    tag: "Art Direction",
    bg: "bg-[linear-gradient(145deg,#ff6b4a,#7c5cff)]",
  },
  {
    id: "06",
    title: "Echo Records",
    tag: "Art Direction",
    bg: "bg-[linear-gradient(145deg,#ff6b4a,#7c5cff)]",
  },
  {
    id: "07",
    title: "Echo Records",
    tag: "Art Direction",
    bg: "bg-[linear-gradient(145deg,#ff6b4a,#7c5cff)]",
  },
  {
    id: "08",
    title: "Echo Records",
    tag: "Art Direction",
    bg: "bg-[linear-gradient(145deg,#ff6b4a,#7c5cff)]",
  },
  {
    id: "09",
    title: "Echo Records",
    tag: "Art Direction",
    bg: "bg-[linear-gradient(145deg,#ff6b4a,#7c5cff)]",
  },
  {
    id: "10",
    title: "Echo Records",
    tag: "Art Direction",
    bg: "bg-[linear-gradient(145deg,#ff6b4a,#7c5cff)]",
  },
  {
    id: "11",
    title: "Echo Records",
    tag: "Art Direction",
    bg: "bg-[linear-gradient(145deg,#ff6b4a,#7c5cff)]",
  },
  {
    id: "12",
    title: "Echo Records",
    tag: "Art Direction",
    bg: "bg-[linear-gradient(145deg,#ff6b4a,#7c5cff)]",
  },
  {
    id: "13",
    title: "Echo Records",
    tag: "Art Direction",
    bg: "bg-[linear-gradient(145deg,#ff6b4a,#7c5cff)]",
  },
  {
    id: "14",
    title: "Echo Records",
    tag: "Art Direction",
    bg: "bg-[linear-gradient(145deg,#ff6b4a,#7c5cff)]",
  },
];

export default function Work() {
  const root = useRef(null);
  const viewport = useRef(null);
  const track = useRef(null);
  const goToRef = useRef(() => {});

  useGSAP(
    () => {
      const cards = gsap.utils.toArray(".work-card");

      const getStep = () => cards[0].offsetWidth + 24;
      const getMax = () =>
        track.current.scrollWidth - viewport.current.offsetWidth;

      const skew = gsap.quickTo(cards, "skewX", {
        duration: 0.4,
        ease: "power3",
      });
      const tilt = (v) => skew(gsap.utils.clamp(-8, 8, v / -300));

      const st = ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: () => "+=" + getMax(),
        pin: true,
        pinSpacing: true,
        refreshPriority: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        animation: gsap.to(track.current, {
          x: () => -getMax(),
          ease: "none",
        }),
        scrub: 0.6,
        snap: {
          snapTo: (p) => {
            const max = getMax();
            const snapped = Math.round((p * max) / getStep()) * getStep();
            return gsap.utils.clamp(0, 1, snapped / max);
          },
          duration: { min: 0.2, max: 0.6 },
          ease: "power2.out",
        },
        onUpdate: (self) => {
          tilt(self.getVelocity());
          gsap.set(".work-progress-bar", { scaleX: 0.2 + self.progress * 0.8 });
        },
        onScrubComplete: () => tilt(0),
      });

      goToRef.current = (dir) => {
        const max = getMax();
        const current = Math.round((st.progress * max) / getStep());
        const next = gsap.utils.clamp(0, cards.length - 1, current + dir);
        const targetX = Math.min(next * getStep(), max);
        const scrollY = st.start + (targetX / max) * (st.end - st.start);

        gsap.to(window, {
          scrollTo: scrollY,
          duration: 0.9,
          ease: "power3.inOut",
        });
      };
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="bg-[#0e0b1a] px-[7%] py-24 font-['Inter'] text-[#f5f3ff]"
    >
      {/* header */}
      <div className="mb-12 flex items-end justify-between">
        <div>
          <p className="mb-3 text-[0.85rem] tracking-[2px] text-[#ff6b4a]">
            SELECTED WORK
          </p>
          <h2 className="font-['Syne'] text-[clamp(2rem,4vw,3.4rem)] leading-[1.05] font-extrabold tracking-[-1px]">
            Projects that
            <br />
            made noise.
          </h2>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => goToRef.current(-1)}
            className="grid h-12 w-12 place-items-center rounded-full border border-white/20 text-xl transition hover:bg-white/10"
          >
            ←
          </button>
          <button
            onClick={() => goToRef.current(1)}
            className="grid h-12 w-12 place-items-center rounded-full bg-[#ff6b4a] text-xl"
          >
            →
          </button>
        </div>
      </div>

      {/* carousel */}
      <div ref={viewport} className="overflow-hidden">
        <div
          ref={track}
          className="flex w-max cursor-grab gap-6 select-none active:cursor-grabbing"
        >
          {projects.map((p) => (
            <div
              key={p.id}
              className={`work-card flex h-[440px] w-[300px] shrink-0 flex-col justify-between rounded-[28px] p-7 sm:w-[340px] ${p.bg}`}
            >
              <span className="font-['Syne'] text-[0.9rem] opacity-70">
                {p.id}
              </span>
              <div>
                <p className="mb-2 text-[0.85rem] opacity-80">{p.tag}</p>
                <h3 className="font-['Syne'] text-[1.8rem] leading-tight font-bold">
                  {p.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* progress bar */}
      <div className="mt-10 h-[3px] w-full overflow-hidden rounded-full bg-white/10">
        <div className="work-progress-bar h-full origin-left rounded-full bg-[#ff6b4a]" />
      </div>
    </section>
  );
}
