'use client'

import { useEffect, useRef, useState } from 'react'

const links = [
  {
    label: 'Email',
    value: 'taimeeh12@gmail.com',
    href: 'mailto:taimeeh12@gmail.com',
    icon: '✉',
    mono: 'mailto:',
  },
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
  {
    label: 'Phone',
    value: '313-327-9329',
    href: 'tel:3133279329',
    icon: '☎',
    mono: 'tel:',
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
    <section id="contact" ref={ref} className="py-32 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-navy-600/40 to-transparent" />

      {/* Bottom glow */}
      <div className="absolute inset-0 flex items-end justify-center pointer-events-none pb-0">
        <div className="w-[500px] h-[200px] bg-accent-blue/5 blur-[80px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className={`mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="font-mono text-accent-blue text-sm tracking-widest">04. CONTACT</span>
          <h2 className="font-sans font-bold text-4xl sm:text-5xl text-white mt-2">
            Let&apos;s Connect
          </h2>
          <div className="mt-4 w-16 h-px bg-gradient-to-r from-accent-blue to-transparent" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* CTA text */}
          <div className={`transition-all duration-700 delay-100 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-slate-300 text-lg leading-relaxed mb-6">
              I&apos;m currently open to new full-stack and software engineering roles. Whether you have a question, an opportunity, or just want to say hi — my inbox is always open.
            </p>
            <p className="font-mono text-sm text-slate-500">
              <span className="text-accent-blue">const</span> status ={' '}
              <span className="text-emerald-400">&quot;open_to_work&quot;</span>;
            </p>
          </div>

          {/* Links */}
          <div className={`space-y-3 transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {links.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-navy-900/50 border border-navy-700/50 rounded-lg glow-border group transition-all duration-200 hover:bg-navy-800/60"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <span className="w-8 h-8 flex items-center justify-center rounded bg-navy-700/60 font-mono text-xs text-accent-blue border border-navy-600/40 flex-shrink-0">
                  {link.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-mono text-xs text-slate-500 tracking-widest uppercase">{link.label}</p>
                  <p className="text-slate-200 text-sm truncate group-hover:text-accent-blue transition-colors duration-200">
                    <span className="text-navy-400 mr-1">{link.mono}</span>
                    {link.value.replace('mailto:', '').replace('https://', '').replace('tel:', '')}
                  </p>
                </div>
                <span className="text-slate-600 group-hover:text-accent-blue transition-colors duration-200 text-sm">↗</span>
              </a>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className={`mt-24 pt-8 border-t border-navy-800/60 flex flex-wrap items-center justify-between gap-4 transition-all duration-700 delay-500 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          <span className="font-mono text-xs text-slate-600">
            <span className="text-accent-blue">{'>'}</span> Al-Taimee Hassan © {new Date().getFullYear()}
          </span>
          <span className="font-mono text-xs text-slate-600">
            Built with Next.js · TypeScript · Tailwind CSS
          </span>
        </div>
      </div>
    </section>
  )
}
