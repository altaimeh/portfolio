'use client'

import { useEffect, useRef, useState } from 'react'

const experiences = [
  {
    role: 'Full Stack Software Engineer',
    company: 'Ally Financial',
    location: 'Detroit, MI',
    period: 'Feb 2024 – Jan 2026',
    type: 'Full-time',
    highlights: [
      'Migrated 20+ legacy JSP/Struts interfaces to React, reducing technical debt significantly.',
      'Built and maintained Java Spring Boot microservices with secure REST APIs and SQL integration.',
      'Achieved 100% test coverage on new components, improving overall coverage by ~35%.',
      'Owned end-to-end feature development across React/TypeScript frontend and Spring Boot backend.',
      'Supported production cloud deployments on AWS with CI/CD pipelines.',
    ],
    stack: ['React', 'TypeScript', 'Java', 'Spring Boot', 'AWS', 'SQL', 'CI/CD'],
  },
  {
    role: 'IT Specialist',
    company: 'Detroit Lions',
    location: 'Detroit, MI',
    period: 'Oct 2024 – Jan 2025',
    type: 'Contract',
    highlights: [
      'Served as technical point of contact for ticket authentication systems during live events.',
      'Used SQL to investigate ticketing discrepancies and validate system data.',
      'Resolved hardware and software issues related to ticket scanners and backend systems.',
    ],
    stack: ['SQL', 'Hardware', 'Systems Troubleshooting'],
  },
  {
    role: 'IT Analyst',
    company: 'Blue Cross Blue Shield of Michigan',
    location: 'Detroit, MI',
    period: 'May 2024 – Aug 2024',
    type: 'Internship',
    highlights: [
      'Built and deployed enterprise SharePoint solutions to enhance internal IT operations.',
      'Managed and triaged helpdesk tickets maintaining SLA targets.',
      'Coordinated with cross-functional teams on IT service delivery in an Agile environment.',
    ],
    stack: ['SharePoint', 'Agile', 'ITSM', 'Jira'],
  },
]

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const exp = experiences[active]

  return (
    <section id="experience" ref={ref} className="py-32 relative">
      {/* Subtle divider line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-navy-600/40 to-transparent" />

      <div className="max-w-6xl mx-auto px-6">

        <div className={`mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="font-mono text-accent-blue text-sm tracking-widest">03. EXPERIENCE</span>
          <h2 className="font-sans font-bold text-4xl sm:text-5xl text-white mt-2">
            Where I&apos;ve Worked
          </h2>
          <div className="mt-4 w-16 h-px bg-gradient-to-r from-accent-blue to-transparent" />
        </div>

        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-8 transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

          {/* Company selector */}
          <div className="lg:col-span-1 flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {experiences.map((e, i) => (
              <button
                key={e.company}
                onClick={() => setActive(i)}
                className={`flex-shrink-0 text-left px-4 py-3 rounded font-mono text-sm tracking-wide transition-all duration-200 border-l-2 ${
                  active === i
                    ? 'border-accent-blue bg-navy-800/60 text-accent-blue'
                    : 'border-navy-700 text-slate-400 hover:text-slate-200 hover:bg-navy-800/30 hover:border-navy-500'
                }`}
              >
                {e.company}
              </button>
            ))}
          </div>

          {/* Experience detail */}
          <div className="lg:col-span-2 bg-navy-900/50 border border-navy-700/50 rounded-lg p-8 glow-border">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div>
                <h3 className="font-sans font-bold text-xl text-white">{exp.role}</h3>
                <p className="text-accent-blue font-mono text-sm mt-1">{exp.company} — {exp.location}</p>
              </div>
              <div className="text-right">
                <span className="font-mono text-xs text-slate-400 block">{exp.period}</span>
                <span className={`inline-block mt-1 font-mono text-xs px-2 py-0.5 rounded-full border ${
                  exp.type === 'Full-time'
                    ? 'border-accent-cyan/30 text-accent-cyan bg-accent-cyan/5'
                    : exp.type === 'Contract'
                    ? 'border-purple-400/30 text-purple-300 bg-purple-400/5'
                    : 'border-emerald-400/30 text-emerald-300 bg-emerald-400/5'
                }`}>
                  {exp.type}
                </span>
              </div>
            </div>

            <ul className="space-y-3 mb-6">
              {exp.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-300 text-sm leading-relaxed">
                  <span className="text-accent-blue mt-0.5 flex-shrink-0">▸</span>
                  {h}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2 pt-4 border-t border-navy-700/40">
              {exp.stack.map((tech) => (
                <span key={tech} className="font-mono text-xs px-2.5 py-1 rounded bg-navy-700/50 text-slate-400 border border-navy-600/30">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Education */}
        <div className={`mt-12 p-6 bg-navy-900/40 border border-navy-700/40 rounded-lg transition-all duration-700 delay-400 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="font-mono text-xs text-slate-500 tracking-widest uppercase mb-3">Education</p>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-sans font-semibold text-white">Bachelor of Science in Computer Science</p>
              <p className="text-accent-blue font-mono text-sm mt-1">Wayne State University — Detroit, MI</p>
            </div>
            <div className="flex flex-wrap gap-3 text-xs font-mono text-slate-400">
              <span>Hackathon Team Lead</span>
              <span className="text-navy-500">|</span>
              <span>Capstone Team Lead</span>
              <span className="text-navy-500">|</span>
              <span>BSA President</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
