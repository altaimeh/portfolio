'use client'

import { useState, useEffect } from 'react'

const navLinks = [
  { label: 'Work',       href: '#experience' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Contact',    href: '#contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
      scrolled ? 'bg-[#0A1628]/95 backdrop-blur-md' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-8 sm:px-12 py-6 flex items-center justify-between">
        {/* Wordmark */}
        <a href="#hero" className="font-sans text-sm font-semibold tracking-[0.18em] uppercase text-shellstone-300 hover:text-quicksand-400 transition-colors duration-300">
          Al-Taimee Hassan
        </a>

        {/* Links */}
        <div className="flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs font-medium tracking-[0.14em] uppercase text-shellstone-500 hover:text-quicksand-400 transition-colors duration-300 link-hover"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
