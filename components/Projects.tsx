'use client'

import { useEffect, useRef, useState } from 'react'

// ─── Project data ────────────────────────────────────────────────────────────
// The first entry is always the "featured" tile (large, 2/3 width).
// The second entry is the "secondary" tile (1/3 width, same row).
// Any further entries flow into a 3-column sub-grid below.
// To add a project: push a new object here — no layout changes needed.
const projects = [
  {
    number: '01',
    title: 'Stock Tracker',
    description: 'A real-time stock portfolio dashboard that lets you track holdings, monitor live price movements, and visualize daily gains and losses at a glance.',
    tags: ['React', 'TypeScript', 'REST APIs', 'Tailwind CSS'],
    github: 'https://github.com/your-stocktracker-link-here',
    preview: 'stocktracker',
    featured: true,
  },
  {
    number: '02',
    title: 'Pomodoro Timer',
    description: 'A clean, minimal productivity timer built around the Pomodoro Technique — featuring customizable work/break intervals, session tracking, and audio notifications.',
    tags: ['React', 'TypeScript', 'Tailwind CSS'],
    github: 'https://github.com/your-link-here',
    preview: 'pomodoro',
    featured: false,
  },
]

// ─── Stock Tracker preview ───────────────────────────────────────────────────
function StockTrackerPreview() {
  const stocks = [
    { ticker: 'AAPL', name: 'Apple Inc.',    price: '211.42', change: '+1.84',  pct: '+0.88%', up: true,  shares: 12, value: '2,537' },
    { ticker: 'NVDA', name: 'NVIDIA Corp.',  price: '924.73', change: '+18.20', pct: '+2.01%', up: true,  shares: 4,  value: '3,699' },
    { ticker: 'TSLA', name: 'Tesla Inc.',    price: '176.08', change: '-3.41',  pct: '-1.90%', up: false, shares: 18, value: '3,169' },
    { ticker: 'MSFT', name: 'Microsoft',     price: '415.56', change: '+2.10',  pct: '+0.51%', up: true,  shares: 8,  value: '3,324' },
    { ticker: 'AMZN', name: 'Amazon',        price: '198.32', change: '+3.72',  pct: '+1.91%', up: true,  shares: 15, value: '2,975' },
  ]

  const allocs = [
    { label: 'Tech',    pct: 58, color: '#5A749A' },
    { label: 'EV',      pct: 22, color: '#E0C58F' },
    { label: 'Retail',  pct: 12, color: '#9AB4CC' },
    { label: 'Other',   pct: 8,  color: '#3C5070' },
  ]

  return (
    <div className="w-full h-full flex flex-col select-none" style={{ background: '#080c14', fontFamily: "'JetBrains Mono', monospace" }}>

      {/* ── App chrome / top bar ── */}
      <div style={{ background: '#060a11', borderBottom: '1px solid rgba(255,255,255,0.04)', padding: '8px 14px', display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
        <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'rgba(248,113,113,0.55)', display: 'inline-block' }} />
        <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'rgba(250,204,21,0.55)', display: 'inline-block' }} />
        <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'rgba(74,222,128,0.55)', display: 'inline-block' }} />
        <div style={{ marginLeft: 10, height: 13, borderRadius: 4, background: 'rgba(255,255,255,0.04)', width: 160 }} />
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 16 }}>
          {['Portfolio', 'Watchlist', 'News'].map(t => (
            <span key={t} style={{ fontSize: 9, color: t === 'Portfolio' ? '#E0C58F' : 'rgba(255,255,255,0.25)', letterSpacing: '0.1em', textTransform: 'uppercase', borderBottom: t === 'Portfolio' ? '1px solid #E0C58F' : 'none', paddingBottom: 2 }}>{t}</span>
          ))}
        </div>
      </div>

      {/* ── Main content ── */}
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '14px 16px', gap: 12 }}>

        {/* Portfolio header row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
          <div>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.28)', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 4 }}>Total Portfolio</div>
            <div style={{ fontSize: 26, fontWeight: 700, color: 'white', lineHeight: 1, letterSpacing: '-0.02em' }}>$48,320.14</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 5 }}>
              <span style={{ fontSize: 11, color: '#4ade80', fontWeight: 600 }}>▲ +$842.36</span>
              <span style={{ fontSize: 10, color: 'rgba(74,222,128,0.6)' }}>+1.77% today</span>
            </div>
          </div>

          {/* Sparkline */}
          <svg width="110" height="46" viewBox="0 0 110 46" style={{ flexShrink: 0 }}>
            <defs>
              <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4ade80" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#4ade80" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0,38 C12,32 20,26 30,20 C40,14 48,22 60,15 C72,8 82,11 95,5 L95,46 L0,46 Z" fill="url(#sg)" />
            <path d="M0,38 C12,32 20,26 30,20 C40,14 48,22 60,15 C72,8 82,11 95,5" fill="none" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="95" cy="5" r="2.5" fill="#4ade80" />
          </svg>
        </div>

        {/* Time range pills */}
        <div style={{ display: 'flex', gap: 4 }}>
          {['1D', '1W', '1M', '3M', '1Y'].map((r, i) => (
            <span key={r} style={{ fontSize: 9, padding: '3px 8px', borderRadius: 999, background: i === 0 ? 'rgba(224,197,143,0.12)' : 'rgba(255,255,255,0.04)', border: `1px solid ${i === 0 ? 'rgba(224,197,143,0.3)' : 'rgba(255,255,255,0.06)'}`, color: i === 0 ? '#E0C58F' : 'rgba(255,255,255,0.3)', cursor: 'default' }}>{r}</span>
          ))}
        </div>

        <div style={{ height: 1, background: 'rgba(255,255,255,0.05)' }} />

        {/* Holdings label */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.28)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>Holdings</span>
          <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.28)', letterSpacing: '0.08em' }}>5 positions</span>
        </div>

        {/* Stock rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {stocks.map(s => (
            <div key={s.ticker} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '5px 8px', borderRadius: 7, background: 'rgba(255,255,255,0.02)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 24, height: 24, borderRadius: 6, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 700, color: 'rgba(255,255,255,0.5)', flexShrink: 0 }}>
                  {s.ticker[0]}
                </div>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.8)' }}>{s.ticker}</div>
                  <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.22)', marginTop: 1 }}>{s.shares} shares</div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.75)' }}>${s.price}</div>
                <div style={{ fontSize: 8, fontWeight: 600, color: s.up ? '#4ade80' : '#f87171', marginTop: 1 }}>{s.change} ({s.pct})</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', marginTop: 'auto' }} />

        {/* Allocation bar */}
        <div>
          <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.28)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 6 }}>Allocation</div>
          <div style={{ display: 'flex', height: 5, borderRadius: 999, overflow: 'hidden', gap: 2 }}>
            {allocs.map(a => (
              <div key={a.label} style={{ width: `${a.pct}%`, background: a.color, borderRadius: 999 }} />
            ))}
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 6 }}>
            {allocs.map(a => (
              <div key={a.label} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: a.color, display: 'inline-block', flexShrink: 0 }} />
                <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.35)' }}>{a.label} {a.pct}%</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

// ─── Pomodoro preview ────────────────────────────────────────────────────────
function PomodoroPreview() {
  return (
    <div className="w-full h-full select-none" style={{ background: '#1a1a2e' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '10px 14px', background: '#111122', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'rgba(248,113,113,0.55)', display: 'inline-block' }} />
        <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'rgba(250,204,21,0.55)', display: 'inline-block' }} />
        <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'rgba(74,222,128,0.55)', display: 'inline-block' }} />
        <div style={{ marginLeft: 10, height: 13, borderRadius: 4, background: 'rgba(255,255,255,0.05)', width: 130 }} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: '28px 20px', height: 'calc(100% - 37px)' }}>
        <div style={{ display: 'flex', gap: 3, background: 'rgba(255,255,255,0.05)', borderRadius: 999, padding: 3 }}>
          {['Pomodoro', 'Short Break', 'Long Break'].map((t, i) => (
            <span key={t} style={{ padding: '4px 12px', borderRadius: 999, background: i === 0 ? '#e07a5f' : 'transparent', color: i === 0 ? 'white' : 'rgba(255,255,255,0.3)', fontSize: 10, fontWeight: i === 0 ? 600 : 400, fontFamily: 'Sora, sans-serif' }}>{t}</span>
          ))}
        </div>
        <div style={{ position: 'relative', width: 110, height: 110 }}>
          <svg width="110" height="110" viewBox="0 0 110 110">
            <circle cx="55" cy="55" r="48" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
            <circle cx="55" cy="55" r="48" fill="none" stroke="#e07a5f" strokeWidth="6" strokeLinecap="round" strokeDasharray="301.6" strokeDashoffset="75" transform="rotate(-90 55 55)" opacity="0.9" />
          </svg>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: 'white', fontSize: 22, lineHeight: 1 }}>24:07</span>
            <span style={{ color: 'rgba(255,255,255,0.28)', fontSize: 9, marginTop: 4, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Focus</span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <button style={{ width: 30, height: 30, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: 'none', color: 'rgba(255,255,255,0.3)', fontSize: 13, cursor: 'default', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>↺</button>
          <button style={{ padding: '8px 22px', background: '#e07a5f', color: 'white', fontSize: 12, fontWeight: 600, borderRadius: 999, border: 'none', cursor: 'default', fontFamily: 'Sora, sans-serif' }}>Pause</button>
          <button style={{ width: 30, height: 30, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: 'none', color: 'rgba(255,255,255,0.3)', fontSize: 13, cursor: 'default', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>⏭</button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          {[1, 2, 3, 4].map(i => (
            <span key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: i <= 2 ? '#e07a5f' : 'rgba(255,255,255,0.1)', display: 'inline-block' }} />
          ))}
          <span style={{ marginLeft: 4, fontSize: 10, color: 'rgba(255,255,255,0.25)', fontFamily: 'Sora, sans-serif' }}>2 of 4</span>
        </div>
      </div>
    </div>
  )
}

// ─── Preview registry ─────────────────────────────────────────────────────────
const PREVIEWS: Record<string, () => JSX.Element> = {
  stocktracker: StockTrackerPreview,
  pomodoro:     PomodoroPreview,
}

// ─── GitHub icon ──────────────────────────────────────────────────────────────
function GithubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

// ─── Info panel (right side of any card) ─────────────────────────────────────
function InfoPanel({ project, size }: { project: typeof projects[0], size: 'lg' | 'sm' }) {
  return (
    <div className="flex flex-col justify-between p-7 sm:p-8 bg-royal-800/20 h-full">
      <div>
        <span className="font-mono text-[10px] text-shellstone-700 tracking-[0.18em] uppercase block mb-4">
          Project {project.number}
        </span>
        <h3
          className="font-serif text-shellstone-300 leading-tight mb-3 group-hover:text-quicksand-300 transition-colors duration-300"
          style={{ fontSize: size === 'lg' ? 'clamp(24px,2.5vw,38px)' : 'clamp(20px,2vw,30px)' }}
        >
          {project.title}
        </h3>
        <p className="text-sm text-shellstone-500 leading-relaxed mb-6" style={{ maxWidth: size === 'lg' ? '300px' : '240px' }}>
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map(tag => (
            <span key={tag} className="text-[10px] px-3 py-1 rounded-full border border-sapphire-700/50 text-shellstone-600">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div>
        <div className="rule opacity-20 my-5" />
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 text-sm font-medium text-shellstone-400 hover:text-quicksand-400 transition-colors duration-300 link-hover"
        >
          <GithubIcon />
          View on GitHub ↗
        </a>
      </div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
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

  const featured   = projects[0]
  const secondary  = projects[1]
  const subProjects = projects.slice(2)

  return (
    <section id="projects" ref={ref} className="bg-[#0A1628] px-8 sm:px-12 py-28">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className={`mb-12 reveal ${visible ? 'revealed' : ''}`}>
          <span className="font-mono text-xs tracking-[0.18em] uppercase text-sapphire-500">04 — Projects</span>
          <h2 className="font-serif text-shellstone-300 mt-3 leading-tight" style={{ fontSize: 'clamp(36px,5vw,64px)' }}>
            Things I&apos;ve Built
          </h2>
        </div>
        <div className="rule opacity-30 mb-10" />

        {/* ── Featured row ── */}
        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-3 mb-3 reveal reveal-delay-1 ${visible ? 'revealed' : ''}`}>

          {/* Featured tile — 2/3 width, tall */}
          {featured && (() => {
            const Preview = PREVIEWS[featured.preview]
            return (
              <div className="lg:col-span-2 border border-sapphire-800/50 rounded-2xl overflow-hidden hover:border-quicksand-400/20 transition-colors duration-500 group relative" style={{ minHeight: 440 }}>
                {/* Featured badge */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-quicksand-400/10 border border-quicksand-400/25 backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-quicksand-400" />
                  <span className="font-mono text-[9px] text-quicksand-400 tracking-[0.14em] uppercase">Featured</span>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 h-full" style={{ minHeight: 440 }}>
                  <div className="h-full" style={{ minHeight: 440 }}>
                    <Preview />
                  </div>
                  <InfoPanel project={featured} size="lg" />
                </div>
              </div>
            )
          })()}

          {/* Secondary tile — 1/3 width */}
          {secondary && (() => {
            const Preview = PREVIEWS[secondary.preview]
            return (
              <div className="border border-sapphire-800/50 rounded-2xl overflow-hidden hover:border-quicksand-400/20 transition-colors duration-500 group flex flex-col" style={{ minHeight: 440 }}>
                <div className="flex-1" style={{ minHeight: 260 }}>
                  <Preview />
                </div>
                <InfoPanel project={secondary} size="sm" />
              </div>
            )
          })()}
        </div>

        {/* ── Sub-grid (project 3+) — only renders when there are more projects ── */}
        {subProjects.length > 0 && (
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 reveal reveal-delay-2 ${visible ? 'revealed' : ''}`}>
            {subProjects.map((project) => {
              const Preview = PREVIEWS[project.preview]
              return (
                <div
                  key={project.title}
                  className="border border-sapphire-800/50 rounded-2xl overflow-hidden hover:border-quicksand-400/20 transition-colors duration-500 group flex flex-col"
                  style={{ minHeight: 320 }}
                >
                  <div className="flex-1 relative overflow-hidden">
                    {Preview ? <Preview /> : (
                      <div className="w-full h-full bg-[#090e1a] flex items-center justify-center">
                        <span className="font-mono text-xs text-sapphire-700">{project.number}</span>
                      </div>
                    )}
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(8,15,30,0.85) 0%, transparent 50%)' }}>
                      <div className="absolute bottom-0 left-0 p-5">
                        <div className="font-mono text-[9px] text-quicksand-400/60 tracking-[0.18em] uppercase mb-1">{project.number}</div>
                        <div className="font-serif text-shellstone-300 text-lg leading-tight">{project.title}</div>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {project.tags.slice(0, 3).map(tag => (
                            <span key={tag} className="text-[9px] px-2 py-0.5 rounded-full bg-quicksand-400/8 border border-quicksand-400/20 text-quicksand-400/70">{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-5 py-4 bg-royal-800/20 border-t border-sapphire-800/40 flex items-center justify-between">
                    <p className="text-xs text-shellstone-600 leading-relaxed line-clamp-2 max-w-[200px]">{project.description}</p>
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-shellstone-600 hover:text-quicksand-400 transition-colors duration-300 ml-4 flex-shrink-0">
                      <GithubIcon />
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        )}

      </div>
    </section>
  )
}
