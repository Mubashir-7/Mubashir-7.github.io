import ScrollExpandMedia from '@/components/ui/scroll-expansion-hero'
import profileData from '../../../public/professional-profile.json'
import { GLSLHills } from '@/components/ui/glsl-hills'
export default function Hero() {
  const personalInfo = profileData.personal_information
  const summary = profileData.summary

  return (
    <section id="hero" aria-label="Hero section" className="relative min-h-screen bg-black overflow-hidden">
      <ScrollExpandMedia
        mediaType="image"
        mediaSrc="/hero_photo.png"
        bgComponent={<GLSLHills speed={0.4} />}
        title={personalInfo.name.toUpperCase()}
        subtitle={personalInfo.headline}
        textBlend
      >
        <div className="content-wrapper text-white">
          <div className="max-w-4xl space-y-7">
            <div className="space-y-4">
              <p className="section-label">Professional Summary</p>
              <p className="text-base md:text-xl leading-relaxed">{summary}</p>
            </div>
            <div className="flex flex-wrap gap-4 pt-2">
              <a href="#projects" className="btn-primary">Explore Projects</a>
              <a href="#contact" className="btn-outline">Work With Me</a>
            </div>
          </div>
        </div>
      </ScrollExpandMedia>
    </section>
  )
}
