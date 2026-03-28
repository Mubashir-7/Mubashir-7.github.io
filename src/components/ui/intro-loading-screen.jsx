import { useEffect, useRef, useState } from 'react'
import TextBlockAnimation from '@/components/ui/text-block-animation'

const SCREEN_BACKGROUNDS = [
  'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1800&q=80',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1800&q=80',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1800&q=80',
]

export default function IntroLoadingScreen({ onComplete }) {
  const [activeScreen, setActiveScreen] = useState(0)
  const [isCompleting, setIsCompleting] = useState(false)
  const scrollContainerRef = useRef(null)

  useEffect(() => {
    const steps = [0, 1, 2]
    const timers = []

    steps.forEach((step, index) => {
      const timer = setTimeout(
        () => {
          setActiveScreen(step)
          if (scrollContainerRef.current) {
            const height = scrollContainerRef.current.clientHeight
            scrollContainerRef.current.scrollTo({
              top: height * step,
              behavior: 'smooth',
            })
          }
        },
        900 + index * 1900,
      )
      timers.push(timer)
    })

    const doneTimer = setTimeout(() => {
      setIsCompleting(true)
      setTimeout(() => onComplete?.(), 700)
    }, 6900)
    timers.push(doneTimer)

    return () => {
      timers.forEach((timer) => clearTimeout(timer))
    }
  }, [onComplete])

  return (
    <div
      className={[
        'fixed inset-0 z-[100] bg-black transition-opacity duration-700',
        isCompleting ? 'opacity-0 pointer-events-none' : 'opacity-100',
      ].join(' ')}
    >
      <div
        ref={scrollContainerRef}
        className="h-full overflow-hidden snap-y snap-mandatory"
        aria-live="polite"
      >
        <section className="relative h-screen snap-start overflow-hidden">
          <img
            src={SCREEN_BACKGROUNDS[0]}
            alt="AI engineering visual"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/45" />

          <div className="relative h-full content-wrapper flex flex-col justify-center">
            <TextBlockAnimation animateOnScroll={false} blockColor="#ffffff" duration={0.75}>
              <h1 className="text-[clamp(1rem,3vw,3.4rem)] font-bold text-white leading-tight max-w-5xl">
                I engineer AI systems that perform when outcomes matter.
              </h1>
            </TextBlockAnimation>
          </div>
        </section>

        <section className="relative h-screen snap-start overflow-hidden">
          <img
            src={SCREEN_BACKGROUNDS[1]}
            alt="Data driven intelligence visual"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/45" />

          <div className="relative h-full content-wrapper flex flex-col justify-center">
            <TextBlockAnimation animateOnScroll={false} blockColor="#ffffff" duration={0.7}>
              <h2 className="text-[clamp(1rem,2.9vw,3.1rem)] font-semibold text-white leading-tight max-w-5xl">I turn complex data into decisions leaders can trust.</h2>
            </TextBlockAnimation>
          </div>
        </section>

        <section className="relative h-screen snap-start overflow-hidden">
          <img
            src={SCREEN_BACKGROUNDS[2]}
            alt="Scalable AI growth visual"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/45" />

          <div className="relative h-full content-wrapper flex flex-col justify-center">
            <TextBlockAnimation animateOnScroll={false} blockColor="#ffffff" duration={0.75}>
              <h2 className="text-[clamp(1rem,2.9vw,3.1rem)] font-semibold text-white leading-tight max-w-5xl">From model to market, I build AI that drives measurable growth.</h2>
            </TextBlockAnimation>
          </div>
        </section>
      </div>


    </div>
  )
}
