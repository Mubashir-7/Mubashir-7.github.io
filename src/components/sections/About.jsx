/* ═══════════════════════════════════════════════════════════════════════════
   About.jsx  –  Personal background & skills section
   ═══════════════════════════════════════════════════════════════════════════
   PASTE YOUR ABOUT CONTENT BELOW  ↓
   Suggested contents:
     • Profile photo / avatar
     • Bio paragraph(s)
     • Skills grid / tag cloud
     • Experience timeline or fun facts
     • Downloadable resume button
   ─────────────────────────────────────────────────────────────────────── */

import profileData from '../../../public/professional-profile.json'
import React from 'react'
import { ZoomParallax } from '@/components/ui/zoom-parallax'

export default function About() {
  // Ordered images: the first (index 0) will scale up to cover the screen eventually.
  // We use images reflecting the user's skills and personal hobbies.
  const images = [
    {
      src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1280&q=80', // Center: Stunning coding setup (Loader Cover)
      alt: 'Professional software engineering setup',
    },
    {
      src: 'https://images.unsplash.com/photo-1511886929837-354d827aae26?auto=format&fit=crop&w=1280&q=80', // Person playing football
      alt: 'Person playing football',
    },
    {
      src: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1280&q=80', // Aesthetic Badminton
      alt: 'Badminton match dynamic shot',
    },
    {
      src: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=1280&q=80', // Programming matrix vibe
      alt: 'Programming and code architecture',
    },
    {
      src: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&w=1280&q=80', // Programmer typing in dark
      alt: 'Programmer typing in dark',
    },
    {
      src: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1280&q=80', // Tokyo aesthetic
      alt: 'Tokyo street aesthetic (Anime vibe)',
    },
    {
      src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1280&q=80', // Data science / analytics
      alt: 'Data science representation',
    },
  ];

  return (
    <section id="about" className="bg-black relative" aria-label="About section">
      {/* ── Zoom Parallax Section ──────────────────────────────────────── */}
      {/* The Parallax happens first. It scales until the central image covers the screen.
          Once finished, the user scrolls into the text content. */}
      <div className="w-full relative z-0">
        <div className="absolute top-10 left-0 w-full flex items-center justify-center z-10 pointer-events-none">
          <h2 className="text-center text-3xl md:text-5xl font-bold text-white drop-shadow-md">
            Professional &amp; Personal Highlights
          </h2>
        </div>
        <ZoomParallax images={images} />
      </div>

      {/* ── Content Section ──────────────────────────────────────── */}
      {/* Text seamlessly flowing below the completed Zoom Parallax */}
      <div className="section-padding content-wrapper relative z-10 bg-black pt-20">
        <div className="mb-12 animate-slide-up">
          <p className="section-label">Get to know me</p>
          <h2 className="section-title">About Me</h2>
          <div className="divider" aria-hidden="true" />
          <p className="section-subtitle max-w-2xl">
            I craft intelligent systems while finding balance through sports and creative media.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          <div className="flex-1 space-y-12 animate-slide-up">
            <div>
              <h3 className="text-2xl font-semibold text-white mb-4">Professional Summary</h3>
              <p className="text-muted leading-relaxed text-lg">
                {profileData.summary}
              </p>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold text-white mb-4">Beyond the Code</h3>
              <p className="text-muted leading-relaxed text-lg">
                When I am not actively involved in writing software or constructing complex AI architectures, I firmly believe in maintaining an active, balanced life. 
                I have a deep love for sports, particularly <strong>football</strong> and <strong>badminton</strong>, which keep me active and competitive. 
                I also find tremendous relaxation and inspiration in taking the time to wind down and watch <strong>anime</strong>.
              </p>
            </div>
          </div>
          
          <div className="flex-1 space-y-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-2xl font-semibold text-white">Core Expertise</h3>
            <ul className="space-y-4">
              {profileData.core_expertise.map((item, index) => (
                <li key={index} className="flex gap-4 items-start">
                  <span className="text-white mt-1.5 opacity-50">▹</span>
                  <span className="text-muted text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
