'use client'

import { useEffect, useState } from 'react'
import ScrollExpandMedia from '@/components/ui/scroll-expansion-hero'

const sampleMediaContent = {
  image: {
    src: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1600&q=80',
    background: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1920&q=80',
    title: 'Autonomous Intelligence Systems',
    date: 'AI Engineering',
    scrollToExpand: 'Scroll To Expand',
    about: {
      overview: 'Built for teams that need dependable AI in production, not demos in slides.',
      conclusion: 'From architecture to deployment, every layer is designed for measurable outcomes.',
    },
  },
  video: {
    src: 'https://www.youtube.com/watch?v=6stlCkUDG_s',
    background: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80',
    title: 'Data Driven Decision Engines',
    date: 'Applied Machine Learning',
    scrollToExpand: 'Scroll To Expand',
    about: {
      overview: 'Reliable models start with robust pipelines, evaluation discipline, and business alignment.',
      conclusion: 'The goal is simple: convert complexity into strategic advantage.',
    },
  },
}

function MediaContent({ mediaType }) {
  const currentMedia = sampleMediaContent[mediaType]

  return (
    <div className="max-w-4xl mx-auto text-white">
      <h2 className="text-3xl font-bold mb-6">About This Experience</h2>
      <p className="text-lg mb-8">{currentMedia.about.overview}</p>
      <p className="text-lg mb-8">{currentMedia.about.conclusion}</p>
    </div>
  )
}

export default function ScrollExpansionHeroDemo() {
  const [mediaType, setMediaType] = useState('image')
  const currentMedia = sampleMediaContent[mediaType]

  useEffect(() => {
    window.scrollTo(0, 0)
    window.dispatchEvent(new Event('resetSection'))
  }, [mediaType])

  return (
    <div className="min-h-screen bg-black">
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <button
          onClick={() => setMediaType('video')}
          className={`px-4 py-2 rounded-lg ${
            mediaType === 'video' ? 'bg-white text-black' : 'bg-black/60 text-white border border-white'
          }`}
        >
          Video
        </button>
        <button
          onClick={() => setMediaType('image')}
          className={`px-4 py-2 rounded-lg ${
            mediaType === 'image' ? 'bg-white text-black' : 'bg-black/60 text-white border border-white'
          }`}
        >
          Image
        </button>
      </div>

      <ScrollExpandMedia
        mediaType={mediaType}
        mediaSrc={currentMedia.src}
        bgImageSrc={currentMedia.background}
        title={currentMedia.title}
        date={currentMedia.date}
        scrollToExpand={currentMedia.scrollToExpand}
        textBlend
      >
        <MediaContent mediaType={mediaType} />
      </ScrollExpandMedia>
    </div>
  )
}
