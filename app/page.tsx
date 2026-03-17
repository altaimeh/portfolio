import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Skills from '@/components/Skills'
import Experience from '@/components/Experience'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <main className="relative bg-navy-950 min-h-screen">
      <Nav />
      <Hero />
      <Skills />
      <Experience />
      <Contact />
    </main>
  )
}
