'use client'

import { useEffect, useState } from 'react'

const ROLES = [
  'Full Stack Engineer',
  'React Specialist',
  'Spring Boot Developer',
  'AWS Cloud Practitioner',
]

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting]   = useState(false)
  const [visible, setVisible]     = useState(false)

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
      className="relative min-h-screen flex flex-col justify-end pb-20 px-8 sm:px-12 bg-ink overflow-hidden"
    >
      {/* Radial glow */}
      <div
        className="absolute top-0 left-0 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle at 20% 20%, rgba(60,80,112,0.28) 0%, transparent 65%)' }}
      />

      {/* Top rule */}
      <div className="absolute top-0 left-0 right-0 h-px bg-sapphire-800/50" />

      {/* Available tag */}
      <div
        className="absolute top-[84px] right-8 sm:right-12 flex items-center gap-2 transition-all duration-700"
        style={{ opacity: visible ? 1 : 0, transitionDelay: '0.3s' }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-quicksand-400 animate-pulse" />
        <span className="text-xs font-medium tracking-[0.14em] uppercase text-shellstone-500">
          Available for opportunities
        </span>
      </div>

      <div className="max-w-7xl w-full mx-auto relative z-10">

        {/* Section index */}
        <div
          className="mb-6 transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(16px)', transitionDelay: '0s' }}
        >
          <span className="font-mono text-xs tracking-[0.18em] uppercase text-sapphire-500">01 — About</span>
        </div>

        {/* Giant name */}
        <h1 className="font-serif leading-[0.9] tracking-tight mb-10">
          <span
            className="block text-shellstone-300 transition-all duration-700"
            style={{
              fontSize: 'clamp(64px, 10vw, 148px)',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(24px)',
              transitionDelay: '0.08s',
            }}
          >
            Al-Taimee
          </span>
          <span
            className="block text-quicksand-400 transition-all duration-700"
            style={{
              fontSize: 'clamp(64px, 10vw, 148px)',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(24px)',
              transitionDelay: '0.18s',
            }}
          >
            Hassan.
          </span>
        </h1>

        {/* Rule */}
        <div
          className="h-px bg-sapphire-800/50 mb-8 transition-all duration-700"
          style={{ opacity: visible ? 0.5 : 0, transitionDelay: '0.3s' }}
        />

        {/* Bottom row */}
        <div
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(16px)', transitionDelay: '0.35s' }}
        >
          {/* Typewriter role */}
          <div className="font-mono text-sm text-shellstone-400 tracking-wide">
            <span>{displayed}</span>
            <span className="animate-blink text-quicksand-400">_</span>
          </div>

          {/* Description + CTAs */}
          <div className="flex flex-col sm:flex-row sm:items-end gap-8 sm:gap-16">
            <p className="text-sm text-shellstone-600 leading-relaxed max-w-xs">
              3+ years building enterprise-scale distributed systems and production-grade React applications.
            </p>
            <div className="flex items-center gap-8 flex-shrink-0">
              <a
                href="#experience"
                className="text-sm font-medium text-shellstone-300 hover:text-quicksand-400 transition-colors duration-300 link-hover tracking-wide"
              >
                View Work ↓
              </a>
              <a
                href="#contact"
                className="text-sm font-medium text-shellstone-300 hover:text-quicksand-400 transition-colors duration-300 link-hover tracking-wide"
              >
                Contact ↓
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
