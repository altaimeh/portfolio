'use client'

import { useEffect, useRef, useState } from 'react'

const links = [
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/altaimee',
    href: 'https://linkedin.com/in/altaimee',
    icon: 'in',
    mono: 'https://',
  },
  {
    label: 'GitHub',
    value: 'github.com/altaimeh',
    href: 'https://github.com/altaimeh',
    icon: 'gh',
    mono: 'https://',
  },
]

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="contact" ref={ref} className="py-28 relative bg-white">
      <div className="absolute top-0 left-0 right-0 h-px bg-brown-100" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className={`mb-14 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs text-sage-500 font-medium tracking-widest uppercase mb-2">05 — Contact</p>
          <h2 className="font-serif font-bold text-4xl sm:text-5xl text-brown-900">
            Let&apos;s Connect
          </h2>
          <div className="section-divider mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* CTA text */}
          <div className={`transition-all duration-700 delay-100 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-brown-600 text-base leading-relaxed mb-6">
              I&apos;m currently open to new full-stack and software engineering roles. Whether you have a question, an opportunity, or just want to say hi — my inbox is always open.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sage-50 border border-sage-200">
              <span className="w-2 h-2 rounded-full bg-sage-500 animate-pulse" />
              <span className="text-xs text-sage-700 font-medium">Open to work</span>
            </div>
          </div>

          {/* Links */}
          <div className={`space-y-3 transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {links.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-brown-50 border border-brown-100 rounded-xl card-shadow group transition-all duration-200 hover:border-sage-200 hover:bg-white"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <span className="w-9 h-9 flex items-center justify-center rounded-lg bg-white font-mono text-xs text-sage-600 border border-brown-200 flex-shrink-0 font-semibold">
                  {link.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-brown-400 tracking-widest uppercase font-medium mb-0.5">{link.label}</p>
                  <p className="text-brown-700 text-sm truncate group-hover:text-sage-600 transition-colors duration-200">
                    {link.value.replace('mailto:', '').replace('https://', '').replace('tel:', '')}
                  </p>
                </div>
                <span className="text-brown-300 group-hover:text-sage-500 transition-colors duration-200">↗</span>
              </a>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className={`mt-24 pt-8 border-t border-brown-100 flex flex-wrap items-center justify-between gap-4 transition-all duration-700 delay-500 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          <span className="text-xs text-brown-400 font-medium">
            Al-Taimee Hassan © {new Date().getFullYear()}
          </span>
          <span className="text-xs text-brown-300">
            Built with Next.js · TypeScript · Tailwind CSS
          </span>
        </div>
      </div>
    </section>
  )
}
