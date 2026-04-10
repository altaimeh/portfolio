'use client'

import { useEffect, useState } from 'react'

const TITLES = [
  'Full Stack Engineer',
  'React Developer',
  'Java Spring Boot Dev',
  'AWS Cloud Practitioner',
]

export default function Hero() {
  const [titleIndex, setTitleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(true)
  }, [])

  useEffect(() => {
    const target = TITLES[titleIndex]
    let timeout: ReturnType<typeof setTimeout>

    if (!deleting && displayed.length < target.length) {
      timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 60)
    } else if (!deleting && displayed.length === target.length) {
      timeout = setTimeout(() => setDeleting(true), 2200)
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35)
    } else if (deleting && displayed.length === 0) {
      setDeleting(false)
      setTitleIndex((i) => (i + 1) % TITLES.length)
    }

    return () => clearTimeout(timeout)
  }, [displayed, deleting, titleIndex])

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center paper-bg overflow-hidden">

      {/* Subtle warm gradient top-right */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-sage-100/40 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-brown-100/60 blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">

        {/* Status pill */}
        <div
          className={`inline-flex items-center gap-2 mb-10 px-4 py-2 rounded-full border border-sage-200 bg-white/70 backdrop-blur-sm transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-sage-500 animate-pulse" />
          <span className="text-xs text-sage-600 tracking-widest uppercase font-medium">
            Available for opportunities
          </span>
        </div>

        {/* Name */}
        <h1
          className={`font-serif font-bold text-6xl sm:text-7xl md:text-8xl tracking-tight mb-4 leading-tight transition-all duration-700 delay-150 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <span className="text-brown-900">Al-Taimee</span>
          <br />
          <span className="text-sage-500">Hassan</span>
        </h1>

        {/* Typewriter title */}
        <div
          className={`text-lg sm:text-xl text-brown-500 mb-8 h-8 font-mono transition-all duration-700 delay-300 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <span>{displayed}</span>
          <span className="animate-blink text-sage-400">|</span>
        </div>

        {/* Summary */}
        <p
          className={`max-w-xl mx-auto text-brown-500 text-base leading-relaxed mb-12 transition-all duration-700 delay-500 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          3+ years building distributed, event-driven microservices in enterprise environments.
          Turning complex business requirements into scalable, production-grade applications.
        </p>

        {/* CTA buttons */}
        <div
          className={`flex flex-wrap items-center justify-center gap-4 transition-all duration-700 delay-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <a
            href="#experience"
            className="px-7 py-3 bg-sage-500 text-white font-medium text-sm rounded-lg hover:bg-sage-600 transition-colors duration-200 shadow-sm"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-7 py-3 border border-brown-300 text-brown-700 font-medium text-sm rounded-lg hover:border-sage-400 hover:text-sage-600 hover:bg-sage-50 transition-all duration-200"
          >
            Get In Touch
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-xs text-brown-400 tracking-widest uppercase font-medium">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-brown-400 to-transparent" />
      </div>
    </section>
  )
}
