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

const typeStyles: Record<string, string> = {
  'Full-time': 'border-sage-300 text-sage-700 bg-sage-50',
  'Contract': 'border-brown-300 text-brown-600 bg-brown-50',
  'Internship': 'border-brown-200 text-brown-500 bg-brown-50',
}

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
    <section id="experience" ref={ref} className="py-28 relative paper-bg">
      <div className="absolute top-0 left-0 right-0 h-px bg-brown-100" />

      <div className="max-w-5xl mx-auto px-6">

        <div className={`mb-14 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs text-sage-500 font-medium tracking-widest uppercase mb-2">03 — Experience</p>
          <h2 className="font-serif font-bold text-4xl sm:text-5xl text-brown-900">
            Where I&apos;ve Worked
          </h2>
          <div className="section-divider mt-4" />
        </div>

        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-8 transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

          {/* Company selector */}
          <div className="lg:col-span-1 flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {experiences.map((e, i) => (
              <button
                key={e.company}
                onClick={() => setActive(i)}
                className={`flex-shrink-0 text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 border-l-2 ${
                  active === i
                    ? 'border-sage-500 bg-white text-sage-700 shadow-sm'
                    : 'border-transparent text-brown-500 hover:text-brown-800 hover:bg-white/60 hover:border-brown-200'
                }`}
              >
                {e.company}
              </button>
            ))}
          </div>

          {/* Experience detail */}
          <div className="lg:col-span-2 bg-white border border-brown-100 rounded-2xl p-8 card-shadow">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div>
                <h3 className="font-serif font-bold text-xl text-brown-900">{exp.role}</h3>
                <p className="text-sage-600 text-sm mt-1 font-medium">{exp.company} — {exp.location}</p>
              </div>
              <div className="text-right">
                <span className="text-xs text-brown-400 block">{exp.period}</span>
                <span className={`inline-block mt-1.5 text-xs px-2.5 py-0.5 rounded-full border font-medium ${typeStyles[exp.type]}`}>
                  {exp.type}
                </span>
              </div>
            </div>

            <ul className="space-y-3 mb-6">
              {exp.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-3 text-brown-600 text-sm leading-relaxed">
                  <span className="text-sage-400 mt-1 flex-shrink-0">▸</span>
                  {h}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2 pt-5 border-t border-brown-100">
              {exp.stack.map((tech) => (
                <span key={tech} className="text-xs px-2.5 py-1 rounded-md bg-brown-50 text-brown-500 border border-brown-200">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Education */}
        <div className={`mt-10 p-6 bg-white border border-brown-100 rounded-2xl card-shadow transition-all duration-700 delay-400 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs text-brown-400 tracking-widest uppercase mb-3 font-medium">Education</p>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-serif font-semibold text-brown-900 text-lg">Bachelor of Science in Computer Science</p>
              <p className="text-sage-600 text-sm mt-1 font-medium">Wayne State University — Detroit, MI</p>
            </div>
            <div className="flex flex-wrap gap-3 text-xs text-brown-400 font-medium">
              <span>Hackathon Team Lead</span>
              <span className="text-brown-200">|</span>
              <span>Capstone Team Lead</span>
              <span className="text-brown-200">|</span>
              <span>BSA President</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
