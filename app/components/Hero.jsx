"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const Hero = () => {
  const root = useRef(null);

  useGSAP(
    () => {
      gsap.from(".hero-line-inner", {
        yPercent: 100,
        duration: 1,
        stagger: 0.15,
        ease: "power4.out",
      });
      gsap.set([".circle-1", ".circle-2"], { xPercent: -50, yPercent: -50 });

      gsap.from(".visual-circle", {
        scale: 0,
        duration: 1,
        stagger: 0.2,
        ease: "back.out(1.7)",
        delay: 0.5,
      });

      gsap.to(".circle-1", {
        scale: 1.1,
        duration: 2.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 2,
      });

      gsap.to(".circle-2", {
        scale: 0.9,
        duration: 2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 2,
      });

      gsap.to(".float-card", {
        y: -15,
        duration: 2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      gsap.utils.toArray(".stat-number").forEach((el) => {
        const counter = { value: 0 };
        gsap.to(counter, {
          value: Number(el.dataset.value),
          duration: 2,
          delay: 1,
          ease: "power1.out",
          onUpdate: () => {
            el.textContent =
              Math.round(counter.value) + (el.dataset.suffix ?? "");
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      className="bg-[#0e0b1a] text-[#f5f3ff] font-['Inter'] overflow-x-hidden"
    >
      {/* NAV */}
      <nav className="nav absolute top-0 left-0 z-10 flex w-full items-center justify-between px-[7%] py-7">
        <div className="nav-logo font-['Syne'] text-2xl font-extrabold">
          lumo<span className="text-[#ff6b4a]">.</span>
        </div>
        <ul className="nav-links hidden gap-9 md:flex">
          {["Work", "Services", "About", "Contact"].map((link) => (
            <li key={link}>
              <a
                href="#"
                className="text-[0.95rem] text-[#a39fc0] no-underline"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#"
          className="nav-cta rounded-full border border-white/20 px-[22px] py-2.5 text-[0.9rem] text-[#f5f3ff] no-underline"
        >
          Let's talk
        </a>
      </nav>

      {/* HERO */}
      <section className="hero relative grid min-h-screen grid-cols-1 items-center gap-10 overflow-hidden px-[7%] pt-[120px] pb-20 lg:grid-cols-[1.1fr_1fr] lg:pt-[140px]">
        {/* blobs */}
        <div className="blob blob-1 absolute -top-[120px] -right-20 z-0 h-[420px] w-[420px] rounded-full bg-[#7c5cff] opacity-45 blur-[90px]" />
        <div className="blob blob-2 absolute -bottom-[100px] -left-20 z-0 h-[320px] w-[320px] rounded-full bg-[#ff6b4a] opacity-45 blur-[90px]" />

        {/* LEFT */}
        <div className="hero-content relative z-10">
          <div className="hero-badge mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[0.85rem] text-[#a39fc0]">
            <span className="h-2 w-2 rounded-full bg-[#ff6b4a]" />
            Creative digital studio
          </div>

          <h1 className="hero-title mb-6 font-['Syne'] text-[clamp(2.8rem,6vw,5.4rem)] leading-[1.02] font-extrabold tracking-[-2px]">
            <span className="block overflow-hidden">
              <span className="hero-line-inner block">We design</span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-line-inner block">
                <span className="bg-gradient-to-r from-[#ff6b4a] to-[#7c5cff] bg-clip-text text-transparent">
                  bold ideas
                </span>{" "}
                that
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-line-inner block">move people.</span>
            </span>
          </h1>

          <p className="hero-text mb-9 max-w-[480px] text-[1.08rem] leading-[1.7] text-[#a39fc0]">
            Lumo is a small studio crafting brands, websites and motion
            experiences that turn curious visitors into loyal fans.
          </p>

          <div className="hero-buttons mb-14 flex items-center gap-4">
            <a
              href="#"
              className="btn inline-block rounded-full bg-[#ff6b4a] px-8 py-4 font-medium text-white no-underline"
            >
              Start a project
            </a>
            <a
              href="#"
              className="btn inline-block rounded-full border border-white/25 px-8 py-4 font-medium text-[#f5f3ff] no-underline"
            >
              View our work
            </a>
          </div>

          <div className="hero-stats flex gap-7 md:gap-12">
            {[
              { value: 120, suffix: "+", label: "Projects shipped" },
              { value: 8, suffix: "", label: "Years of craft" },
              { value: 98, suffix: "%", label: "Happy clients" },
            ].map((stat) => (
              <div key={stat.label} className="stat">
                <div
                  className="stat-number font-['Syne'] text-[2.1rem] font-bold"
                  data-value={stat.value}
                  data-suffix={stat.suffix}
                >
                  0{stat.suffix}
                </div>
                <div className="mt-1 text-[0.85rem] text-[#a39fc0]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="hero-visual relative z-10 h-[420px] lg:h-[560px]">
          <div className="visual-main absolute top-10 right-10 bottom-10 left-[60px] overflow-hidden rounded-[32px] bg-[linear-gradient(145deg,#7c5cff,#3a1f9e_60%,#ff6b4a)]">
            <div className="visual-circle circle-1 absolute top-1/2 left-1/2 h-[260px] w-[260px] rounded-full border-2 border-white/25" />
            <div className="visual-circle circle-2 absolute top-1/2 left-1/2 h-[160px] w-[160px] rounded-full border-2 border-white/25 bg-white/10" />
            <div className="visual-circle circle-3 absolute top-[22%] left-[70%] h-6 w-6 rounded-full bg-white" />
          </div>

          <div className="float-card absolute top-2.5 left-0 flex items-center gap-3.5 rounded-[20px] border border-white/10 bg-[#1a1530] px-[22px] py-[18px] shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#ff6b4a]/15 text-xl">
              ✦
            </div>
            <div>
              <div className="text-[0.95rem] font-medium">Brand Identity</div>
              <div className="mt-0.5 text-[0.8rem] text-[#a39fc0]">
                Logo · Colors · Type
              </div>
            </div>
          </div>

          <div className="float-card absolute right-0 bottom-5 flex items-center gap-3.5 rounded-[20px] border border-white/10 bg-[#1a1530] px-[22px] py-[18px] shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#7c5cff]/20 text-xl">
              ⚡
            </div>
            <div>
              <div className="text-[0.95rem] font-medium">Web Experience</div>
              <div className="mt-0.5 text-[0.8rem] text-[#a39fc0]">
                Fast · Animated · Modern
              </div>
            </div>
          </div>
        </div>

        {/* SCROLL HINT */}
        <div className="hero-scroll absolute bottom-[30px] left-[7%] z-10 flex items-center gap-3 text-[0.8rem] tracking-[2px] text-[#a39fc0]">
          <span className="hero-scroll-line h-[50px] w-px bg-[#a39fc0]" />
          SCROLL
        </div>
      </section>
    </div>
  );
};

export default Hero;
