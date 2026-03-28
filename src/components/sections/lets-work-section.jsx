"use client"

import React, { useState } from "react"
import { ArrowUpRight, Calendar } from "lucide-react"

export function LetsWorkTogether() {
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [isButtonHovered, setIsButtonHovered] = useState(false)

  const handleClick = (e) => {
    e.preventDefault()
    setIsClicked(true)

    setTimeout(() => {
      setShowSuccess(true)
    }, 500)
  }

  const handleBookCall = () => {
    window.open("https://calendly.com/mubashirajaz17/30min", "_blank")
  }

  return (
    <section id="contact" className="flex min-h-screen items-center justify-center px-6 bg-black text-white py-20 overflow-hidden relative">
      <div className="relative flex flex-col items-center gap-12 w-full max-w-4xl mx-auto">
        
        {/* Success / Booking state */}
        <div
          className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-8 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            opacity: showSuccess ? 1 : 0,
            transform: showSuccess ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
            pointerEvents: showSuccess ? "auto" : "none",
          }}
        >
          {/* Elegant heading */}
          <div className="flex flex-col items-center gap-3">
            <span
              className="text-xs font-semibold tracking-[0.4em] uppercase text-accent transition-all duration-500"
              style={{
                transform: showSuccess ? "translateY(0)" : "translateY(10px)",
                opacity: showSuccess ? 1 : 0,
                transitionDelay: "100ms",
              }}
            >
              Perfect
            </span>
            <h3
              className="text-4xl lg:text-5xl font-light tracking-tight text-white transition-all duration-500"
              style={{
                transform: showSuccess ? "translateY(0)" : "translateY(10px)",
                opacity: showSuccess ? 1 : 0,
                transitionDelay: "200ms",
              }}
            >
              Let's talk
            </h3>
          </div>

          {/* Book a call button */}
          <button
            onClick={handleBookCall}
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
            className="group relative flex items-center gap-4 transition-all duration-500 cursor-pointer mt-4"
            style={{
              transform: showSuccess
                ? isButtonHovered
                  ? "translateY(0) scale(1.05)"
                  : "translateY(0) scale(1)"
                : "translateY(15px) scale(1)",
              opacity: showSuccess ? 1 : 0,
              transitionDelay: "150ms",
            }}
          >
            {/* Left line */}
            <div
              className="h-px w-8 bg-white/30 transition-all duration-500 sm:w-16"
              style={{
                transform: isButtonHovered ? "scaleX(0)" : "scaleX(1)",
                opacity: isButtonHovered ? 0 : 0.5,
              }}
            />

            {/* Button content */}
            <div
              className="relative flex items-center gap-3 overflow-hidden rounded-full border px-8 py-4 transition-all duration-500 bg-white/5 backdrop-blur-md"
              style={{
                borderColor: isButtonHovered ? "var(--color-accent)" : "rgba(255,255,255,0.2)",
                backgroundColor: isButtonHovered ? "var(--color-accent)" : "rgba(255,255,255,0.05)",
                boxShadow: isButtonHovered ? "0 0 40px rgba(212,175,55,0.3)" : "none",
              }}
            >
              <Calendar
                className="size-5 transition-all duration-500"
                strokeWidth={2}
                style={{
                  color: isButtonHovered ? "#000" : "#fff",
                }}
              />
              <span
                className="text-sm md:text-base font-bold tracking-widest uppercase transition-all duration-500"
                style={{
                  color: isButtonHovered ? "#000" : "#fff",
                }}
              >
                Book a call
              </span>
              <ArrowUpRight
                className="size-5 transition-all duration-500"
                strokeWidth={2}
                style={{
                  color: isButtonHovered ? "#000" : "#fff",
                  transform: isButtonHovered ? "translate(3px, -3px) scale(1.1)" : "translate(0, 0) scale(1)",
                }}
              />
            </div>

            {/* Right line */}
            <div
              className="h-px w-8 bg-white/30 transition-all duration-500 sm:w-16"
              style={{
                transform: isButtonHovered ? "scaleX(0)" : "scaleX(1)",
                opacity: isButtonHovered ? 0 : 0.5,
              }}
            />
          </button>

          {/* Subtle subtext */}
          <span
            className="text-xs tracking-widest font-mono uppercase text-white/40 transition-all duration-500 mt-2"
            style={{
              transform: showSuccess ? "translateY(0)" : "translateY(10px)",
              opacity: showSuccess ? 1 : 0,
              transitionDelay: "450ms",
            }}
          >
            30 min intro call via Calendly
          </span>
        </div>

        {/* Pre-click Top Status Indicator */}
        <div
          className="flex items-center gap-3 transition-all duration-500 z-20"
          style={{
            opacity: isClicked ? 0 : 1,
            transform: isClicked ? "translateY(-20px)" : "translateY(0)",
            pointerEvents: isClicked ? "none" : "auto",
          }}
        >
          <span className="relative flex size-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
          </span>
          <span className="text-sm font-semibold tracking-[0.2em] uppercase text-white/60">
            Available for projects
          </span>
        </div>

        {/* Main "Let's Work Together" Hero Text */}
        <div
          className="group relative cursor-pointer z-20"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleClick}
          style={{
            pointerEvents: isClicked ? "none" : "auto",
          }}
        >
          <div className="flex flex-col items-center gap-6">
            <h2
              className="relative text-center text-6xl font-light tracking-tight text-white sm:text-7xl md:text-8xl lg:text-9xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                opacity: isClicked ? 0 : 1,
                transform: isClicked ? "translateY(-40px) scale(0.95)" : "translateY(0) scale(1)",
              }}
            >
              <span className="block overflow-hidden pb-2">
                <span
                  className="block transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    transform: isHovered && !isClicked ? "translateY(-5%)" : "translateY(0)",
                  }}
                >
                  Let's work
                </span>
              </span>
              <span className="block overflow-hidden pt-2">
                <span
                  className="block transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] delay-75"
                  style={{
                    transform: isHovered && !isClicked ? "translateY(-5%)" : "translateY(0)",
                  }}
                >
                  <span className="text-white/40 font-serif italic pr-4">together</span>
                </span>
              </span>
            </h2>

            {/* Center animated button circle */}
            <div className="relative mt-8 flex size-20 items-center justify-center sm:size-24">
              <div
                className="pointer-events-none absolute inset-0 rounded-full border border-white/20 transition-all ease-out"
                style={{
                  borderColor: isClicked ? "var(--color-accent)" : isHovered ? "var(--color-accent)" : "rgba(255,255,255,0.2)",
                  backgroundColor: isClicked ? "transparent" : isHovered ? "var(--color-accent)" : "rgba(255,255,255,0.05)",
                  transform: isClicked ? "scale(4)" : isHovered ? "scale(1.15)" : "scale(1)",
                  opacity: isClicked ? 0 : 1,
                  transitionDuration: isClicked ? "700ms" : "500ms",
                }}
              />
              <ArrowUpRight
                className="size-8 transition-all ease-[cubic-bezier(0.16,1,0.3,1)] sm:size-10"
                style={{
                  transform: isClicked
                    ? "translate(100px, -100px) scale(0.5)"
                    : isHovered
                      ? "translate(4px, -4px)"
                      : "translate(0, 0)",
                  opacity: isClicked ? 0 : 1,
                  color: isHovered && !isClicked ? "#000" : "#fff",
                  transitionDuration: isClicked ? "600ms" : "500ms",
                }}
              />
            </div>
          </div>

          {/* Left/Right expanding lines on hover */}
          <div className="absolute -left-12 top-1/2 -translate-y-1/2 sm:-left-24">
            <div
              className="h-px w-10 bg-accent transition-all duration-500 sm:w-20"
              style={{
                transform: isClicked ? "scaleX(0) translateX(-20px)" : isHovered ? "scaleX(1.5)" : "scaleX(1)",
                opacity: isClicked ? 0 : isHovered ? 1 : 0.3,
              }}
            />
          </div>
          <div className="absolute -right-12 top-1/2 -translate-y-1/2 sm:-right-24">
            <div
              className="h-px w-10 bg-accent transition-all duration-500 sm:w-20"
              style={{
                transform: isClicked ? "scaleX(0) translateX(20px)" : isHovered ? "scaleX(1.5)" : "scaleX(1)",
                opacity: isClicked ? 0 : isHovered ? 1 : 0.3,
              }}
            />
          </div>
        </div>

        {/* Bottom Subtext */}
        <div
          className="mt-12 flex flex-col items-center gap-6 text-center transition-all duration-500 delay-100 z-20"
          style={{
            opacity: isClicked ? 0 : 1,
            transform: isClicked ? "translateY(20px)" : "translateY(0)",
            pointerEvents: isClicked ? "none" : "auto",
          }}
        >
          <p className="max-w-lg text-base md:text-lg leading-relaxed text-neutral-400 font-light">
            Whether you need a full-stack AI platform architectural design, highly specialized LLM pipeline, or just a technical consultation, I am ready to ship. Let's create something undeniable together.
          </p>
          <a href="mailto:mubashirajaz14@gmail.com" className="text-sm font-mono tracking-widest uppercase text-white/50 hover:text-accent transition-colors">
            mubashirajaz14@gmail.com
          </a>
        </div>
      </div>
    </section>
  )
}
