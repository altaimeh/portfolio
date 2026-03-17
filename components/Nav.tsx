'use client'

import { useState, useEffect } from 'react'

const navLinks = [
  { label: 'about', href: '#hero' },
  { label: 'skills', href: '#skills' },
  { label: 'experience', href: '#experience' },
  { label: 'contact', href: '#contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('hero')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      const sections = ['hero', 'skills', 'experience', 'contact']
      for (const s of sections.reverse()) {
        const el = document.getElementById(s)
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(s)
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled
        ? 'bg-navy-950/90 backdrop-blur-md border-b border-navy-700/40'
        : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <span className="font-mono text-accent-blue text-sm tracking-widest">
          <span className="text-navy-400">{'>'}</span> alt.dev
        </span>
        <div className="flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`font-mono text-xs tracking-widest uppercase transition-colors duration-200 hover-underline ${
                active === link.href.slice(1)
                  ? 'text-accent-blue'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
