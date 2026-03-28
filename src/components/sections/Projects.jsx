/* ═══════════════════════════════════════════════════════════════════════════
   Projects.jsx  –  Portfolio / case-study showcase
   ═══════════════════════════════════════════════════════════════════════════
   PASTE YOUR PROJECTS CONTENT BELOW  ↓
   Suggested contents:
     • Filterable project grid / list
     • Project cards (thumbnail, title, tech tags, links)
     • Featured / pinned projects at top
     • "View all on GitHub" CTA
   ─────────────────────────────────────────────────────────────────────── */

import { LuminaSlider } from "@/components/ui/lumina-interactive-list";
import AdditionalProjectsGallery from "@/components/sections/AdditionalProjectsGallery";

export default function Projects() {
  return (
    <section
      id="projects"
      className="section-padding bg-black"
      aria-label="Projects section"
    >
      <div className="content-wrapper">
        {/* ── Section Heading ─────────────────────────────────────────── */}
        <div className="mb-12 animate-slide-up">
          <p className="section-label">What I&apos;ve built</p>
          <h2 className="section-title">Projects</h2>
          <div className="divider" aria-hidden="true" />
          <p className="section-subtitle max-w-2xl">
            From Enterprise LLM Agents to predictive medical systems, every build ships with purpose and impact.
          </p>
        </div>

        {/* ── WebGL Project Slider ─────────────────────────────────────── */}
        <LuminaSlider />

        {/* ── Additional Projects ─────────────────────────────────────── */}
        <AdditionalProjectsGallery />
      </div>
    </section>
  )
}
