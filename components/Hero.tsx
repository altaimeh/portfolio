'use client'

import { useEffect, useState } from 'react'

const ROLES = [
  'Full Stack Engineer',
  'React Specialist',
  'Spring Boot Developer',
  'AWS Cloud Practitioner',
]

export default function Hero() {
  const [roleIndex, setRoleIndex]   = useState(0)
  const [displayed, setDisplayed]   = useState('')
  const [deleting, setDeleting]     = useState(false)
  const [visible, setVisible]       = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const target = ROLES[roleIndex]
    let timeout: ReturnType<typeof setTimeout>
    if (!deleting && displayed.length < target.length)
      timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 58)
    else if (!deleting && displayed.length === target.length)
      timeout = setTimeout(() => setDeleting(true), 2600)
    else if (deleting && displayed.length > 0)
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 32)
    else { setDeleting(false); setRoleIndex(i => (i + 1) % ROLES.length) }
    return () => clearTimeout(timeout)
  }, [displayed, deleting, roleIndex])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-end pb-20 px-8 sm:px-12 bg-[#0A1628] overflow-hidden"
    >
      {/* Subtle radial glow top-left */}
      <div className="absolute top-0 left-0 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle at 20% 20%, rgba(60,80,112,0.28) 0%, transparent 65%)' }} />

      {/* Top rule + available label */}
      <div className="absolute top-0 left-0 right-0">
        <div className="rule opacity-30" />
      </div>

      {/* Available tag — top right */}
      <div className={`absolute top-8 right-8 sm:right-12 flex items-center gap-2 transition-all duration-700 delay-300 ${visible ? 'opacity-100' : 'opacity-0'}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-quicksand-400 animate-pulse" />
        <span className="text-xs font-medium tracking-[0.14em] uppercase text-shellstone-500">
          Available for opportunities
        </span>
      </div>

      {/* Main content — bottom-aligned, editorial */}
      <div className="max-w-7xl w-full mx-auto">
        {/* Index label */}
        <div className={`mb-6 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <span className="font-mono text-xs tracking-[0.18em] uppercase text-sapphire-500">01 — About</span>
        </div>

        {/* Giant name */}
        <h1 className="font-serif leading-[0.9] tracking-tight mb-10">
          <span
            className={`block text-[clamp(64px,10vw,148px)] text-shellstone-300 transition-all duration-900 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '0.05s' }}
          >
            Al-Taimee
          </span>
          <span
            className={`block text-[clamp(64px,10vw,148px)] text-quicksand-400 transition-all duration-900 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '0.15s' }}
          >
            Hassan.
          </span>
        </h1>

        {/* Bottom row — typewriter left, description right */}
        <div className={`rule mb-8 transition-all duration-700 ${visible ? 'opacity-50' : 'opacity-0'}`} style={{ transitionDelay: '0.3s' }} />
        <div
          className={`flex flex-col sm:flex-row sm:items-end justify-between gap-8 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '0.35s' }}
        >
          {/* Role typewriter */}
          <div className="font-mono text-sm text-shellstone-400 tracking-wide">
            <span>{displayed}</span>
            <span className="animate-blink text-quicksand-400">_</span>
          </div>

          {/* Description + CTA */}
          <div className="flex flex-col sm:flex-row sm:items-end gap-8 sm:gap-16">
            <p className="text-sm text-shellstone-600 leading-relaxed max-w-xs">
              3+ years building enterprise-scale distributed systems and production-grade React applications.
            </p>
            <div className="flex items-center gap-8 flex-shrink-0">
              <a href="#experience" className="text-sm font-medium text-shellstone-300 hover:text-quicksand-400 transition-colors duration-300 link-hover tracking-wide">
                View Work ↓
              </a>
              <a href="#contact" className="text-sm font-medium text-shellstone-300 hover:text-quicksand-400 transition-colors duration-300 link-hover tracking-wide">
                Contact ↓
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
