'use client'

import { useEffect, useRef, useState } from 'react'

const links = [
  { label: 'LinkedIn', value: 'linkedin.com/in/altaimee', href: 'https://linkedin.com/in/altaimee', icon: 'in' },
  { label: 'GitHub',   value: 'github.com/altaimeh',     href: 'https://github.com/altaimeh',      icon: 'gh' },
]

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.05 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="contact" ref={ref} className="bg-[#0D1A35] px-8 sm:px-12 pt-28 pb-16">
      <div className="max-w-7xl mx-auto">

        <div className={`mb-16 reveal ${visible ? 'revealed' : ''}`}>
          <span className="font-mono text-xs tracking-[0.18em] uppercase text-sapphire-500 block mb-6">05 — Contact</span>
          {/* Large CTA headline */}
          <h2 className="font-serif leading-[0.95] tracking-tight">
            <span className="block text-[clamp(48px,7vw,110px)] text-shellstone-300">Let&apos;s build</span>
            <span className="block text-[clamp(48px,7vw,110px)] text-quicksand-400">something.</span>
          </h2>
        </div>

        <div className="rule opacity-30 mb-14" />

        {/* Links row */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 gap-px bg-sapphire-800/30 rounded-xl overflow-hidden mb-16 reveal reveal-delay-2 ${visible ? 'revealed' : ''}`}>
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-4 px-8 py-7 bg-[#0D1A35] hover:bg-royal-800/60 transition-colors duration-300 group"
            >
              <div className="flex items-center gap-5">
                <span className="w-9 h-9 rounded-lg bg-sapphire-900/60 border border-sapphire-700/50 flex items-center justify-center font-mono text-xs font-semibold text-quicksand-400">
                  {link.icon}
                </span>
                <div>
                  <p className="text-xs font-medium tracking-[0.12em] uppercase text-shellstone-600 mb-1">{link.label}</p>
                  <p className="text-sm text-shellstone-300 group-hover:text-quicksand-300 transition-colors duration-300">{link.value}</p>
                </div>
              </div>
              <span className="text-shellstone-600 group-hover:text-quicksand-400 transition-colors duration-300 text-lg">↗</span>
            </a>
          ))}
        </div>

        {/* Footer */}
        <div className={`flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-sapphire-800/40 reveal reveal-delay-3 ${visible ? 'revealed' : ''}`}>
          <span className="text-xs text-shellstone-700 tracking-wide">
            Al-Taimee Hassan © {new Date().getFullYear()}
          </span>
          <span className="text-xs text-shellstone-700 tracking-wide">
            Next.js · TypeScript · Tailwind CSS
          </span>
        </div>

      </div>
    </section>
  )
}
