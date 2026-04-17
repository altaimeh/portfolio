import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Skills from '@/components/Skills'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'

/**
 * Home
 * ----
 * The single-page portfolio route ("/"). This page is intentionally a
 * vertical scroll of standalone section components. Each component owns
 * its own layout, animations, and data — this file just decides the
 * order in which they render on the landing page:
 *
 *   Nav        → fixed top navigation bar
 *   Hero       → name + intro (section 01)
 *   Skills     → technical skills + certs (section 02)
 *   Experience → work history accordion (section 03)
 *   Projects   → featured project cards (section 04)
 *   Contact    → contact form + links  (section 05)
 */
export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Nav />
      <Hero />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
    </main>
  )
}
