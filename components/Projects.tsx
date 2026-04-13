'use client'

import { useEffect, useRef, useState } from 'react'

const projects = [
  {
    number: '01',
    title: 'Pomodoro Timer',
    description: 'A clean, minimal productivity timer built around the Pomodoro Technique — featuring customizable work/break intervals, session tracking, and audio notifications.',
    tags: ['React', 'TypeScript', 'Tailwind CSS'],
    github: 'https://github.com/your-link-here',
  },
]

function PomodoroPreview() {
  return (
    <div className="w-full h-full bg-[#1a1a2e] select-none">
      <div className="flex items-center gap-1.5 px-4 py-3 bg-[#111122] border-b border-white/5">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
        <div className="ml-3 h-3.5 rounded bg-white/5 w-36" />
      </div>
      <div className="flex flex-col items-center justify-center gap-5 py-10 px-6">
        <div className="flex gap-1 bg-white/5 rounded-full p-1 text-xs">
          <span className="px-3 py-1 rounded-full bg-[#e07a5f] text-white font-medium text-xs">Pomodoro</span>
          <span className="px-3 py-1 text-white/35 text-xs">Short Break</span>
          <span className="px-3 py-1 text-white/35 text-xs">Long Break</span>
        </div>
        <div className="relative">
          <svg width="136" height="136" viewBox="0 0 136 136">
            <circle cx="68" cy="68" r="60" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="7" />
            <circle cx="68" cy="68" r="60" fill="none" stroke="#e07a5f" strokeWidth="7"
              strokeLinecap="round" strokeDasharray="376.9" strokeDashoffset="94"
              transform="rotate(-90 68 68)" opacity="0.88" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-mono font-bold text-white text-3xl leading-none">24:07</span>
            <span className="text-white/28 text-[10px] mt-1 tracking-widest uppercase">Focus</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/35 text-sm">↺</button>
          <button className="px-7 py-2.5 bg-[#e07a5f] text-white text-sm font-semibold rounded-full shadow-lg shadow-[#e07a5f]/20">Pause</button>
          <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/35 text-sm">⏭</button>
        </div>
        <div className="flex items-center gap-2">
          {[1,2,3,4].map(i => <span key={i} className={`w-2 h-2 rounded-full ${i <= 2 ? 'bg-[#e07a5f]' : 'bg-white/10'}`} />)}
          <span className="ml-1 text-white/25 text-xs">2 of 4</span>
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
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.05 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="projects" ref={ref} className="bg-[#0A1628] px-8 sm:px-12 py-28">
      <div className="max-w-7xl mx-auto">

        <div className={`flex items-end justify-between mb-12 reveal ${visible ? 'revealed' : ''}`}>
          <div>
            <span className="font-mono text-xs tracking-[0.18em] uppercase text-sapphire-500">04 — Projects</span>
            <h2 className="font-serif text-shellstone-300 mt-3 leading-tight" style={{ fontSize: 'clamp(36px,5vw,64px)' }}>
              Things I&apos;ve Built
            </h2>
          </div>
        </div>
        <div className="rule opacity-30 mb-12" />

        {/* Project tiles */}
        {projects.map((project, i) => (
          <div
            key={project.title}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-0 border border-sapphire-800/50 rounded-2xl overflow-hidden reveal reveal-delay-${i + 1} ${visible ? 'revealed' : ''} hover:border-quicksand-400/20 transition-colors duration-500 group`}
          >
            {/* App preview — left panel */}
            <div className="bg-[#0f0f1e] min-h-[360px]">
              <PomodoroPreview />
            </div>

            {/* Info — right panel */}
            <div className="flex flex-col justify-between p-8 sm:p-10 bg-royal-800/20">
              <div>
                <span className="font-mono text-xs text-shellstone-600 tracking-[0.18em] uppercase block mb-6">
                  Project {project.number}
                </span>
                <h3 className="font-serif text-shellstone-300 leading-tight mb-4 group-hover:text-quicksand-300 transition-colors duration-300" style={{ fontSize: 'clamp(28px,3vw,44px)' }}>
                  {project.title}
                </h3>
                <p className="text-sm text-shellstone-500 leading-relaxed mb-8 max-w-sm">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-xs px-3 py-1.5 rounded-full border border-sapphire-700/50 text-shellstone-500">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rule opacity-20 mb-6" />
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-sm font-medium text-shellstone-400 hover:text-quicksand-400 transition-colors duration-300 group/link link-hover"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                View on GitHub ↗
              </a>
            </div>
          </div>
        ))}

      </div>
    </section>
  )
}
