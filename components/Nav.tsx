'use client'

import { useState, useEffect } from 'react'

// In-page anchor links rendered on the right side of the nav bar.
// Each `href` matches an `id` on one of the section components in page.tsx,
// so the browser smooth-scrolls to that section when clicked.
const navLinks = [
  { label: 'Work',       href: '#experience' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Contact',    href: '#contact' },
]

/**
 * Nav
 * ---
 * Fixed top navigation bar shown on every section of the single-page site.
 * Starts transparent over the hero and fades to a blurred dark background
 * once the user scrolls past 60px, keeping the links legible over any
 * section below.
 */
export default function Nav() {
  // `scrolled` drives the background / blur toggle. Kept in state (rather
  // than read directly) so React can re-render the nav when the threshold
  // is crossed in either direction.
  const [scrolled, setScrolled] = useState(false)

  // Attach a scroll listener on mount that flips `scrolled` whenever the
  // user passes the 60px threshold. The cleanup function removes the
  // listener on unmount so no stale handlers leak between page navigations.
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
