"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import "../../index.css";

const slides = [
  {
    title: "Walmart USA",
    subtitle: "Advanced Software Engineering",
    description:
      "Certificate of completion for the Advanced Software Engineering Job Simulation. Focused on data structures, system architecture, and agile methodologies.",
    accent: "#0071CE",
    imageUrl:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
    pdfUrl: "/walmart_cert.pdf"
  },
  {
    title: "Quantium",
    subtitle: "Data Analytics",
    description:
      "Data Analytics Job Simulation. Conducted deep-dive data analysis, customer segmentation, and visual presentations to drive business insights for retail datasets.",
    accent: "#E2211C",
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    pdfUrl: "/quantium_cert.pdf"
  },
  {
    title: "Deloitte Australia",
    subtitle: "Data Analytics",
    description:
      "Completed the Deloitte Technology Data Analytics Job Simulation. Showcased proficiency in extracting actionable insights and strategic consulting practices.",
    accent: "#86BC25",
    imageUrl:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
    pdfUrl: "/deloitte_cert.pdf"
  },
  {
    title: "J.P. Morgan",
    subtitle: "Quantitative Research",
    description:
      "Quantitative Research Job Simulation. Modeled financial data, analyzed market phenomena, and built predictive tools using Python and mathematics.",
    accent: "#ADD8E6",
    imageUrl:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop",
    pdfUrl: "/jpm_cert.pdf"
  },
  {
    title: "Advanced UX Design",
    subtitle: "Job Simulation",
    description:
      "Advanced UX Design Job Simulation. Designed comprehensive wireframes, conducted user interaction research, and built high-fidelity prototypes.",
    accent: "#E20074",
    imageUrl:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop",
    pdfUrl: "/ux_design_cert.pdf"
  },
];

export default function ElegantCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState("next");
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);
  const progressRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const SLIDE_DURATION = 6000;
  const TRANSITION_DURATION = 800;

  const goToSlide = useCallback(
    (index, dir) => {
      if (isTransitioning || index === currentIndex) return;
      setDirection(dir || (index > currentIndex ? "next" : "prev"));
      setIsTransitioning(true);
      setProgress(0);

      setTimeout(() => {
        setCurrentIndex(index);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 50);
      }, TRANSITION_DURATION / 2);
    },
    [isTransitioning, currentIndex]
  );

  const goNext = useCallback(() => {
    const nextIndex = (currentIndex + 1) % slides.length;
    goToSlide(nextIndex, "next");
  }, [currentIndex, goToSlide]);

  const goPrev = useCallback(() => {
    const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
    goToSlide(prevIndex, "prev");
  }, [currentIndex, goToSlide]);

  useEffect(() => {
    if (isPaused) return;

    progressRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 100 / (SLIDE_DURATION / 50);
      });
    }, 50);

    intervalRef.current = setInterval(() => {
      goNext();
    }, SLIDE_DURATION);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [currentIndex, isPaused, goNext]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 60) {
      if (diff > 0) goNext();
      else goPrev();
    }
  };

  const currentSlide = slides[currentIndex];

  return (
    <div
      className="carousel-wrapper"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background accent wash */}
      <div
        className="carousel-bg-wash"
        style={{
          background: `radial-gradient(ellipse at 70% 50%, ${currentSlide.accent}18 0%, transparent 70%)`,
        }}
      />

      <div className="carousel-inner">
        {/* Left: Text Content */}
        <div className="carousel-content">
          <div className="carousel-content-inner">
            {/* Collection number */}
            <div
              className={`carousel-collection-num ${isTransitioning ? "transitioning" : "visible"}`}
            >
              <span className="carousel-num-line" />
              <span className="carousel-num-text">
                {String(currentIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
              </span>
            </div>

            {/* Title */}
            <h2
              className={`carousel-title ${isTransitioning ? "transitioning" : "visible"}`}
            >
              {currentSlide.title}
            </h2>

            {/* Subtitle */}
            <p
              className={`carousel-subtitle ${isTransitioning ? "transitioning" : "visible"}`}
              style={{ color: currentSlide.accent }}
            >
              {currentSlide.subtitle}
            </p>

            {/* Description */}
            <p
              className={`carousel-description ${isTransitioning ? "transitioning" : "visible"}`}
            >
              {currentSlide.description}
            </p>
            
            <div className={`carousel-cta-row ${isTransitioning ? "transitioning" : "visible"}`}>
              {currentSlide.pdfUrl && (
                <a
                  href={currentSlide.pdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="carousel-view-cert-btn"
                  style={{ color: currentSlide.accent, borderColor: `${currentSlide.accent}55` }}
                >
                  View Certificate
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              )}

              {/* Navigation Arrows */}
              <div className="carousel-nav-arrows">
                <button onClick={goPrev} className="carousel-arrow-btn" aria-label="Previous slide">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                </button>
                <button onClick={goNext} className="carousel-arrow-btn" aria-label="Next slide">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Image */}
        <div className="carousel-image-container">
          <div
            className={`carousel-image-frame ${isTransitioning ? "transitioning" : "visible"}`}
          >
            <img
              src={currentSlide.imageUrl}
              alt={currentSlide.title}
              className="carousel-image"
            />
            <div
              className="carousel-image-overlay"
              style={{
                background: `linear-gradient(135deg, ${currentSlide.accent}22 0%, transparent 50%)`,
              }}
            />
          </div>

          {/* Decorative frame corner */}
          <div className="carousel-frame-corner carousel-frame-corner--tl" style={{ borderColor: currentSlide.accent }} />
          <div className="carousel-frame-corner carousel-frame-corner--br" style={{ borderColor: currentSlide.accent }} />
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="carousel-progress-bar">
        {slides.map((slide, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`carousel-progress-item ${index === currentIndex ? "active" : ""}`}
            aria-label={`Go to slide ${index + 1}`}
          >
            <div className="carousel-progress-track">
              <div
                className="carousel-progress-fill"
                style={{
                  width: index === currentIndex ? `${progress}%` : index < currentIndex ? "100%" : "0%",
                  backgroundColor: index === currentIndex ? currentSlide.accent : undefined,
                }}
              />
            </div>
            <span className="carousel-progress-label">{slide.title}</span>
          </button>
        ))}
      </div>
      {/* Styles for the elegant carousel specifically added via inline styling to keep scoped easily since it relies on classes from provided CSS */}
      <style dangerouslySetInnerHTML={{__html: `
        .carousel-wrapper {
          position: relative;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          height: 600px;
          background-color: #050505;
          color: #ffffff;
          overflow: hidden;
          font-family: inherit;
          border-radius: 20px;
        }

        .carousel-bg-wash {
          position: absolute;
          inset: 0;
          transition: background 1.2s ease;
          pointer-events: none;
        }

        .carousel-inner {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        @media (min-width: 768px) {
          .carousel-inner {
            flex-direction: row;
          }
        }

        /* Content Area */
        .carousel-content {
          flex: 1;
          display: flex;
          align-items: center;
          padding: 3rem 2rem 2rem;
          z-index: 10;
        }

        @media (min-width: 768px) {
          .carousel-content {
            padding: 4rem;
          }
        }

        .carousel-content-inner {
          max-width: 400px;
        }

        .carousel-collection-num {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .carousel-num-line {
          width: 2rem;
          height: 1px;
          background-color: currentColor;
          opacity: 0.3;
        }

        .carousel-num-text {
          font-family: monospace;
          font-size: 0.875rem;
          letter-spacing: 0.1em;
          opacity: 0.5;
        }

        .carousel-title {
          font-size: 2.5rem;
          font-weight: 300;
          line-height: 1.1;
          margin-bottom: 0.5rem;
          letter-spacing: -0.02em;
        }

        @media (min-width: 768px) {
          .carousel-title {
            font-size: 3.5rem;
          }
        }

        .carousel-subtitle {
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          margin-bottom: 2rem;
          font-weight: 500;
          transition: color 0.8s ease;
        }

        .carousel-description {
          font-size: 1rem;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 3rem;
          font-weight: 300;
        }

        /* CTA Row: View Certificate + Nav Arrows */
        .carousel-cta-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .carousel-view-cert-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8125rem;
          font-weight: 500;
          padding: 0.5rem 1rem;
          border: 1px solid;
          border-radius: 9999px;
          text-decoration: none;
          transition: opacity 0.3s ease, background 0.3s ease;
          white-space: nowrap;
        }

        .carousel-view-cert-btn:hover {
          opacity: 0.75;
        }

        /* Navigation Arrows */
        .carousel-nav-arrows {
          display: flex;
          gap: 0.75rem;
          flex-shrink: 0;
        }

        .carousel-arrow-btn {
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: transparent;
          color: white;
          display: flex;
          align-items: center;
          justify-center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .carousel-arrow-btn svg {
            margin: auto;
        }

        .carousel-arrow-btn:hover {
          background: white;
          color: black;
          transform: scale(1.05);
        }

        /* Image Area */
        .carousel-image-container {
          flex: 1;
          position: relative;
          padding: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @media (min-width: 768px) {
          .carousel-image-container {
            padding: 4rem;
          }
        }

        .carousel-image-frame {
          position: relative;
          width: 100%;
          height: 100%;
          max-height: 60vh;
          overflow: hidden;
          background-color: #111;
        }

        @media (min-width: 768px) {
          .carousel-image-frame {
            max-height: none;
            aspect-ratio: 3/4;
          }
        }

        .carousel-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 6s ease-out;
        }

        .carousel-image-overlay {
          position: absolute;
          inset: 0;
          transition: background 1.2s ease;
        }

        /* Decorative Corners */
        .carousel-frame-corner {
          position: absolute;
          width: 2rem;
          height: 2rem;
          border: 0 solid transparent;
          transition: border-color 1.2s ease;
        }

        @media (min-width: 768px) {
          .carousel-frame-corner {
            width: 4rem;
            height: 4rem;
          }
        }

        .carousel-frame-corner--tl {
          top: 1rem;
          left: 1rem;
          border-top-width: 2px;
          border-left-width: 2px;
        }

        .carousel-frame-corner--br {
          bottom: 1rem;
          right: 1rem;
          border-bottom-width: 2px;
          border-right-width: 2px;
        }

        @media (min-width: 768px) {
          .carousel-frame-corner--tl {
            top: 2rem;
            left: 2rem;
          }
          .carousel-frame-corner--br {
            bottom: 2rem;
            right: 2rem;
          }
        }

        /* Progress Bar */
        .carousel-progress-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          display: flex;
          padding: 1.5rem 2rem;
          gap: 1rem;
          z-index: 20;
          background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%);
        }

        @media (min-width: 768px) {
          .carousel-progress-bar {
            padding: 2rem 4rem;
            gap: 2rem;
          }
        }

        .carousel-progress-item {
          flex: 1;
          background: transparent;
          border: none;
          padding: 0;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          opacity: 0.4;
          transition: opacity 0.3s ease;
        }

        .carousel-progress-item:hover {
          opacity: 0.7;
        }

        .carousel-progress-item.active {
          opacity: 1;
        }

        .carousel-progress-track {
          width: 100%;
          height: 2px;
          background: rgba(255, 255, 255, 0.2);
          overflow: hidden;
          position: relative;
        }

        .carousel-progress-fill {
          height: 100%;
          width: 0%;
          background: white;
          transition: background-color 0.8s ease;
        }

        .carousel-progress-label {
          color: white;
          font-size: 0.625rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-weight: 500;
          text-align: left;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* Transitions */
        .transitioning {
          opacity: 0 !important;
          transform: translateY(10px);
        }

        .carousel-title,
        .carousel-subtitle,
        .carousel-description,
        .carousel-collection-num,
        .carousel-image-frame {
          transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .visible {
          opacity: 1;
          transform: translateY(0);
        }

        .carousel-image-frame.transitioning {
          transform: scale(0.98);
        }

        .carousel-image-frame.visible .carousel-image {
          transform: scale(1.05);
        }

        .carousel-image-frame.transitioning .carousel-image {
          transition: none;
          transform: scale(1);
        }

        /* Staggered text animations */
        .carousel-collection-num.visible { transition-delay: 0.1s; }
        .carousel-title.visible { transition-delay: 0.15s; }
        .carousel-subtitle.visible { transition-delay: 0.2s; }
        .carousel-description.visible { transition-delay: 0.25s; }
      `}} />
    </div>
  );
}
