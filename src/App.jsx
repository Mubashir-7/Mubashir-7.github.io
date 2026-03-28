/* ─────────────────────────────────────────────────────────────────────────
   App.jsx  –  Root layout wrapper
   Stack  : React 18 + Tailwind CSS 3
   ─────────────────────────────────────────────────────────────────────── */

import { useEffect, useState } from 'react'

import Navbar  from './components/layout/Navbar'
import Footer  from './components/layout/Footer'
import IntroLoadingScreen from '@/components/ui/intro-loading-screen'

/* ── Section imports – add or remove sections freely ──────────────────── */
import Hero     from './components/sections/Hero'
import About    from './components/sections/About'
import ExperienceTimeline from './components/sections/ExperienceTimeline'
import Projects from './components/sections/Projects'
import SkillsGallery from './components/sections/SkillsGallery'
import Certifications from './components/sections/Certifications'
import Volunteering from './components/sections/Volunteering'
import Services from './components/sections/Services'
import Contact  from './components/sections/Contact'

/* ─────────────────────────────────────────────────────────────────────────
   App
   ─────────────────────────────────────────────────────────────────────── */
export default function App() {
  const [isIntroComplete, setIsIntroComplete] = useState(false)
  const [isPastAbout, setIsPastAbout] = useState(false)

  useEffect(() => {
    if (!isIntroComplete) return

    const updateNavbarVisibility = () => {
      const aboutSection = document.getElementById('about')
      if (!aboutSection) {
        setIsPastAbout(false)
        return
      }

      const threshold = aboutSection.offsetTop - 100
      setIsPastAbout(window.scrollY >= threshold)
    }

    updateNavbarVisibility()
    window.addEventListener('scroll', updateNavbarVisibility, { passive: true })
    window.addEventListener('resize', updateNavbarVisibility)

    return () => {
      window.removeEventListener('scroll', updateNavbarVisibility)
      window.removeEventListener('resize', updateNavbarVisibility)
    }
  }, [isIntroComplete])

  if (!isIntroComplete) {
    return <IntroLoadingScreen onComplete={() => setIsIntroComplete(true)} />
  }

  return (
    /*
     * Outermost shell:
     *  • `min-h-screen flex flex-col` → footer is always pushed to the bottom
     *  • `custom-scrollbar`           → styled scrollbar on Webkit browsers
     *  • `bg-background text-light`   → tokens from tailwind.config.js
     */
    <div className="min-h-screen flex flex-col bg-black text-light custom-scrollbar">

      {/* ── Persistent Navigation ─────────────────────────────────────── */}
      <Navbar filled={isPastAbout} />

      {/* ── Main Content ──────────────────────────────────────────────────
          `pt-16` offsets the content below the fixed navbar (h-16).
          The `content-wrapper` and `section-padding` classes are applied
          inside each individual section component, keeping this wrapper
          neutral so sections can choose full-bleed or constrained layouts.
      ──────────────────────────────────────────────────────────────────── */}
      <main id="main-content" className="flex-1 pt-0" tabIndex={-1}>

        {/* ── Hero ──────────────────────────────────────────────────────
            Full-screen landing; always first.
        ─────────────────────────────────────────────────────────────── */}
        <Hero />

        {/* ── About ─────────────────────────────────────────────────────
            Personal background, skills, and story.
        ─────────────────────────────────────────────────────────────── */}
        <About />

        {/* ── Experience Timeline ───────────────────────────────────────
            Timeline of education and professional experience.
        ─────────────────────────────────────────────────────────────── */}
        <ExperienceTimeline />

        {/* ── Projects ──────────────────────────────────────────────────
            Showcase of work, case studies, and open-source.
        ─────────────────────────────────────────────────────────────── */}
        <Projects />

        {/* ── Skills ──────────────────────────────────────────────────
            Cards Stack based showcase of Technical skills.
        ─────────────────────────────────────────────────────────────── */}
        <SkillsGallery />

        {/* ── Certifications ────────────────────────────────────────────
            Job Simluations and ISO certificates
        ─────────────────────────────────────────────────────────────── */}
        <Certifications />

        {/* ── Volunteering ──────────────────────────────────────────────
            Community Service and Campaigns 
        ─────────────────────────────────────────────────────────────── */}
        <Volunteering />

        {/* ── Services ──────────────────────────────────────────────────
            Vertical animated tabs for Professional Services.
        ─────────────────────────────────────────────────────────────── */}
        <Services />

        {/* ── Contact ───────────────────────────────────────────────────
            Contact form / reach-out invitation.
        ─────────────────────────────────────────────────────────────── */}
        <Contact />

        {/* ── ADD MORE SECTIONS BELOW ───────────────────────────────────
            Example:
              import Experience from './components/sections/Experience'
              <Experience />

              import Testimonials from './components/sections/Testimonials'
              <Testimonials />
        ─────────────────────────────────────────────────────────────── */}

      </main>

      {/* ── Footer ────────────────────────────────────────────────────── */}
      <Footer />

    </div>
  )
}
