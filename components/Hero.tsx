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
    <section id="hero" className="relative min-h-screen grid-bg flex items-center justify-center overflow-hidden">
      {/* Radial glow backdrop */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-navy-600/10 blur-[120px]" />
      </div>
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] rounded-full bg-accent-blue/5 blur-[80px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Tag line */}
        <div
          className={`inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-navy-600/60 bg-navy-800/40 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
          <span className="font-mono text-xs text-slate-400 tracking-widest uppercase">
            Available for opportunities
          </span>
        </div>

        {/* Name */}
        <h1
          className={`font-sans font-extrabold text-6xl sm:text-7xl md:text-8xl tracking-tight mb-4 transition-all duration-700 delay-150 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <span className="text-white">Al-Taimee</span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-cyan glow-text">
            Hassan
          </span>
        </h1>

        {/* Typewriter title */}
        <div
          className={`font-mono text-xl sm:text-2xl text-slate-300 mb-8 h-8 transition-all duration-700 delay-300 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <span className="text-navy-300">{'>'}</span>{' '}
          <span>{displayed}</span>
          <span className="animate-blink text-accent-blue">|</span>
        </div>

        {/* Summary */}
        <p
          className={`max-w-2xl mx-auto text-slate-400 text-lg leading-relaxed mb-12 transition-all duration-700 delay-500 ${
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
            className="px-8 py-3 bg-accent-blue text-navy-950 font-mono font-semibold text-sm rounded tracking-wider hover:bg-accent-cyan transition-colors duration-200"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-8 py-3 border border-navy-500 text-slate-300 font-mono text-sm rounded tracking-wider hover:border-accent-blue hover:text-accent-blue transition-all duration-200"
          >
            Get In Touch
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="font-mono text-xs text-slate-500 tracking-widest">SCROLL</span>
        <div className="w-px h-12 bg-gradient-to-b from-slate-500 to-transparent" />
      </div>
    </section>
  )
}
