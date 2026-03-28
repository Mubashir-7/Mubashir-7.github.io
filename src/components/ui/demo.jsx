import { ArrowDown } from 'lucide-react'
import TextBlockAnimation from '@/components/ui/text-block-animation'

export default function DemoOne() {
  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col">
      <div className="flex-1 flex flex-col">
        <section className="min-h-screen flex flex-col items-center justify-center relative px-6">
          <div className="max-w-4xl w-full">
            <TextBlockAnimation
              blockColor="#ffffff"
              animateOnScroll={false}
              delay={0.2}
              duration={0.8}
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-tight">
                Don&apos;t just inform.
                <br />
                <span className="inline-block bg-white text-black px-3 pb-1 rounded-md mt-2">
                  Captivate.
                </span>
              </h1>
            </TextBlockAnimation>
          </div>

          <div className="absolute bottom-12 flex flex-col items-center gap-2 opacity-60">
            <span className="text-xs uppercase tracking-widest text-white/70">
              Scroll to Reveal
            </span>
            <ArrowDown className="w-5 h-5 text-white/70 animate-bounce" />
          </div>
        </section>

        <section className="min-h-[80vh] flex flex-col justify-center items-center px-6 py-24 bg-black">
          <div className="max-w-3xl w-full space-y-16">
            <TextBlockAnimation blockColor="#ffffff" duration={0.7}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">This is what I do.</h2>
            </TextBlockAnimation>

            <TextBlockAnimation blockColor="#ffffff" stagger={0.03}>
              <p className="text-lg md:text-2xl leading-relaxed text-white/85">
                You stopped scrolling because the motion caught your eye. That&apos;s the power of
                <strong> GSAP</strong> and <strong> React</strong> properly combined.
              </p>
            </TextBlockAnimation>

            <div className="pl-6 border-l-2 border-white/50">
              <TextBlockAnimation blockColor="#ffffff" duration={0.6}>
                <p className="text-base md:text-lg italic text-white/70">
                  &quot;If you want your website to feel alive, we should talk.&quot;
                </p>
              </TextBlockAnimation>
            </div>
          </div>
        </section>

        <footer className="h-[40vh] md:h-[50vh] flex items-center justify-center border-t border-white/20 bg-black">
          <TextBlockAnimation blockColor="#ffffff" duration={0.8}>
            <a
              href="mailto:mubashirajaz14@gmail.com"
              className="text-4xl md:text-6xl lg:text-7xl font-black hover:text-white/80 transition-colors cursor-pointer"
            >
              Let&apos;s Build It.
            </a>
          </TextBlockAnimation>
        </footer>
      </div>
    </div>
  )
}
