'use client'

import { useEffect, useRef, useState } from 'react'

const projects = [
  {
    title: 'Pomodoro Timer',
    description:
      'A clean, minimal productivity timer built around the Pomodoro Technique. Features customizable work and break intervals, session tracking, and audio notifications — helping you stay focused and avoid burnout.',
    tags: ['React', 'TypeScript', 'Tailwind CSS'],
    github: 'https://github.com/your-link-here',
    preview: 'pomodoro',
  },
]

function PomodoroPreview() {
  return (
    <div className="w-full bg-[#1a1a2e] rounded-xl overflow-hidden select-none">
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 px-4 py-3 bg-[#16213e] border-b border-white/5">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
        <div className="ml-3 flex-1 h-4 rounded bg-white/5 max-w-[160px]" />
      </div>

      {/* App body */}
      <div className="px-6 py-8 flex flex-col items-center gap-5">
        {/* Mode tabs */}
        <div className="flex gap-1 bg-white/5 rounded-full p-1 text-xs">
          <span className="px-3 py-1 rounded-full bg-[#e07a5f] text-white font-medium">Pomodoro</span>
          <span className="px-3 py-1 rounded-full text-white/40">Short Break</span>
          <span className="px-3 py-1 rounded-full text-white/40">Long Break</span>
        </div>

        {/* Timer ring */}
        <div className="relative flex items-center justify-center">
          <svg width="140" height="140" viewBox="0 0 140 140">
            <circle cx="70" cy="70" r="62" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
            <circle
              cx="70" cy="70" r="62"
              fill="none"
              stroke="#e07a5f"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray="389.5"
              strokeDashoffset="97"
              transform="rotate(-90 70 70)"
              opacity="0.85"
            />
          </svg>
          <div className="absolute text-center">
            <div className="text-white font-mono font-bold text-3xl leading-none">24:07</div>
            <div className="text-white/30 text-xs mt-1 tracking-widest uppercase">Focus</div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/40 text-sm hover:bg-white/10">↺</button>
          <button className="px-7 py-2.5 bg-[#e07a5f] hover:bg-[#d4694e] text-white text-sm font-semibold rounded-full shadow-lg shadow-[#e07a5f]/20 transition-colors">
            Pause
          </button>
          <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/40 text-sm hover:bg-white/10">⏭</button>
        </div>

        {/* Session dots */}
        <div className="flex items-center gap-2">
          {[1,2,3,4].map((i) => (
            <span
              key={i}
              className={`w-2 h-2 rounded-full ${i <= 2 ? 'bg-[#e07a5f]' : 'bg-white/10'}`}
            />
          ))}
          <span className="ml-2 text-white/30 text-xs">Session 2 of 4</span>
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
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
    <section id="projects" ref={ref} className="py-28 relative bg-white">
      <div className="absolute top-0 left-0 right-0 h-px bg-brown-100" />

      <div className="max-w-5xl mx-auto px-6">

        {/* Section header */}
        <div className={`mb-14 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs text-sage-500 font-medium tracking-widest uppercase mb-2">04 — Projects</p>
          <h2 className="font-serif font-bold text-4xl sm:text-5xl text-brown-900">
            Things I&apos;ve Built
          </h2>
          <div className="section-divider mt-4" />
        </div>

        {/* Project tiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <div
              key={project.title}
              className={`bg-brown-50 border border-brown-100 rounded-2xl overflow-hidden card-shadow transition-all duration-700 hover:border-sage-200 group ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* App preview */}
              <div className="p-5 bg-gradient-to-br from-[#1a1a2e] to-[#16213e]">
                <PomodoroPreview />
              </div>

              {/* Info */}
              <div className="p-6">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="font-serif font-bold text-xl text-brown-900">{project.title}</h3>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-medium text-brown-400 hover:text-sage-600 transition-colors duration-200 flex-shrink-0 mt-1"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                    GitHub ↗
                  </a>
                </div>

                <p className="text-sm text-brown-500 leading-relaxed mb-5">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-md bg-white text-brown-600 border border-brown-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
