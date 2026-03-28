"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";

const SERVICES = [
  {
    id: "01",
    title: "AI Agent & LLM Development",
    description: "Designing end-to-end intelligent agentic architectures, RAG pipelines, and GPT-powered automation systems tailored for enterprise needs.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1500&auto=format&fit=crop"
  },
  {
    id: "02",
    title: "Full-Stack AI Integration",
    description: "I don't just train models. I architect and ship responsive, modular web and mobile applications that seamlessly integrate complex predictive AI backends.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1500&auto=format&fit=crop"
  },
  {
    id: "03",
    title: "Predictive Analytics & ML",
    description: "Engineering robust healthcare, finance, and industrial machine learning solutions utilizing Ensemble Methods, SVMs, and Deep Neural Networks.",
    image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=1500&auto=format&fit=crop"
  },
  {
    id: "04",
    title: "Data Engineering & Systems",
    description: "Building scalable Vector Databases, optimizing complex Big Data pipelines, and pushing systems-level programming limits using C/C++.",
    image: "https://plus.unsplash.com/premium_photo-1663100722417-6e36673fe0ed?q=80&w=1500&auto=format&fit=crop"
  }
];

const AUTO_PLAY_DURATION = 5000;

export default function VerticalTabs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handleNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % SERVICES.length);
  }, []);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + SERVICES.length) % SERVICES.length);
  }, []);

  const handleTabClick = (index) => {
    if (index === activeIndex) return;
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
    setIsPaused(false);
  };

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      handleNext();
    }, AUTO_PLAY_DURATION);

    return () => clearInterval(interval);
  }, [activeIndex, isPaused, handleNext]);

  const variants = {
    enter: (direction) => ({
      y: direction > 0 ? "-100%" : "100%",
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      y: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      y: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  return (
    <section id="services" className="w-full bg-[#050505] py-20 lg:py-32">
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left Column: Content */}
          <div className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1 pt-4">
            <div className="space-y-1 mb-12">
              <h2 className="tracking-tighter text-balance text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                How I can <span className="text-accent italic font-serif">help</span> you
              </h2>
              <span className="text-xs font-semibold text-white/40 uppercase tracking-[0.3em] block ml-1 mt-4">
                (SERVICES)
              </span>
            </div>

            <div className="flex flex-col space-y-0">
              {SERVICES.map((service, index) => {
                const isActive = activeIndex === index;
                return (
                  <button
                    key={service.id}
                    onClick={() => handleTabClick(index)}
                    className={cn(
                      "group relative flex items-start gap-5 py-6 md:py-8 text-left transition-all duration-500 border-t border-white/10 first:border-0",
                      isActive
                        ? "text-white"
                        : "text-white/40 hover:text-white"
                    )}
                  >
                    <div className="absolute left-[-16px] md:left-[-24px] top-0 bottom-0 w-[2px] bg-white/10">
                      {isActive && (
                        <motion.div
                          key={`progress-${index}-${isPaused}`}
                          className="absolute top-0 left-0 w-full bg-accent origin-top"
                          initial={{ height: "0%" }}
                          animate={
                            isPaused ? { height: "0%" } : { height: "100%" }
                          }
                          transition={{
                            duration: AUTO_PLAY_DURATION / 1000,
                            ease: "linear",
                          }}
                        />
                      )}
                    </div>

                    <span className="text-[10px] md:text-xs font-mono font-medium mt-1.5 tabular-nums opacity-50">
                      /{service.id}
                    </span>

                    <div className="flex flex-col gap-3 flex-1">
                      <span
                        className={cn(
                          "text-2xl md:text-3xl lg:text-3xl font-bold tracking-tight transition-colors duration-500",
                          isActive ? "text-white" : ""
                        )}
                      >
                        {service.title}
                      </span>

                      <AnimatePresence mode="wait">
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{
                              duration: 0.3,
                              ease: [0.23, 1, 0.32, 1],
                            }}
                            className="overflow-hidden"
                          >
                            <p className="text-neutral-400 text-sm md:text-base font-normal leading-relaxed max-w-sm pb-2 pt-1">
                              {service.description}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Image Gallery */}
          <div className="lg:col-span-7 flex flex-col justify-center h-full order-1 lg:order-2">
            <div
              className="relative group/gallery"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div className="relative aspect-4/5 md:aspect-4/3 lg:aspect-[16/12] rounded-3xl md:rounded-[2.5rem] overflow-hidden bg-white/5 border border-white/10 shadow-2xl shadow-black">
                <AnimatePresence
                  initial={false}
                  custom={direction}
                  mode="popLayout"
                >
                  <motion.div
                    key={activeIndex}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      y: { type: "spring", stiffness: 260, damping: 32 },
                      opacity: { duration: 0.4 },
                    }}
                    className="absolute inset-0 w-full h-full cursor-pointer"
                    onClick={handleNext}
                  >
                    <img
                      src={SERVICES[activeIndex].image}
                      alt={SERVICES[activeIndex].title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105 m-0 p-0 block"
                    />

                    {/* Gradient Overlay for aesthetic matching */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  </motion.div>
                </AnimatePresence>

                <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 flex gap-3 md:gap-4 z-20">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrev();
                    }}
                    className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-black/60 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/40 transition-all active:scale-95 shadow-lg"
                    aria-label="Previous"
                  >
                    <ArrowLeft size={20} strokeWidth={2} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNext();
                    }}
                    className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-black/60 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/40 transition-all active:scale-95 shadow-lg"
                    aria-label="Next"
                  >
                    <ArrowRight size={20} strokeWidth={2} />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
