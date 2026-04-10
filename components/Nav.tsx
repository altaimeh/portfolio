'use client'

import { useState, useEffect } from 'react'

const navLinks = [
  { label: 'About', href: '#hero' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
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
        ? 'bg-brown-50/95 backdrop-blur-sm border-b border-brown-200/60 shadow-sm'
        : 'bg-transparent'
    }`}>
      <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
        <span className="font-serif text-lg font-semibold text-brown-800 tracking-wide">
          Al-Taimee Hassan
        </span>
        <div className="flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`text-sm font-medium tracking-wide transition-colors duration-200 hover-underline ${
                active === link.href.slice(1)
                  ? 'text-sage-600'
                  : 'text-brown-500 hover:text-brown-800'
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
