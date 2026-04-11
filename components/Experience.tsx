'use client'

import { useEffect, useRef, useState } from 'react'

const experiences = [
  {
    role: 'Full Stack Software Engineer',
    company: 'Ally Financial',
    location: 'Detroit, MI',
    period: '2024 — 2026',
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
    period: '2024',
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
    company: 'Blue Cross Blue Shield',
    location: 'Detroit, MI',
    period: '2024',
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
  const [open, setOpen]       = useState<number | null>(0)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.05 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="experience" ref={ref} className="bg-[#0D1A35] px-8 sm:px-12 py-28">
      <div className="max-w-7xl mx-auto">

        <div className={`flex items-end justify-between mb-12 reveal ${visible ? 'revealed' : ''}`}>
          <div>
            <span className="font-mono text-xs tracking-[0.18em] uppercase text-sapphire-500">03 — Experience</span>
            <h2 className="font-serif text-[clamp(36px,5vw,64px)] text-shellstone-300 mt-3 leading-tight">
              Where I&apos;ve Worked
            </h2>
          </div>
        </div>
        <div className="rule opacity-30 mb-0" />

        {/* Accordion-style experience rows */}
        {experiences.map((exp, i) => (
          <div
            key={exp.company}
            className={`border-b border-sapphire-800/50 reveal reveal-delay-${i + 1} ${visible ? 'revealed' : ''}`}
          >
            {/* Row header — always visible */}
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full text-left py-8 flex items-start sm:items-center justify-between gap-6 group"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8">
                <span className="font-serif text-[clamp(22px,3vw,36px)] text-shellstone-300 group-hover:text-quicksand-400 transition-colors duration-300 leading-tight">
                  {exp.company}
                </span>
                <span className="text-sm text-shellstone-600 tracking-wide">{exp.role}</span>
              </div>
              <div className="flex items-center gap-6 flex-shrink-0">
                <span className="font-mono text-xs text-shellstone-600 hidden sm:block">{exp.period}</span>
                <span className={`text-xl text-quicksand-400 transition-transform duration-300 ${open === i ? 'rotate-45' : ''}`}>+</span>
              </div>
            </button>

            {/* Expandable details */}
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${open === i ? 'max-h-[600px] pb-10' : 'max-h-0'}`}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-2">
                <div className="lg:col-span-2 space-y-3">
                  {exp.highlights.map((h, j) => (
                    <div key={j} className="flex gap-4 text-sm text-shellstone-500 leading-relaxed">
                      <span className="text-quicksand-400 flex-shrink-0 mt-0.5">—</span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex flex-wrap gap-2">
                    {exp.stack.map(tech => (
                      <span key={tech} className="text-xs px-3 py-1.5 rounded-full border border-sapphire-700/50 text-shellstone-500 bg-sapphire-900/20">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4">
                    <span className={`inline-block text-xs font-medium tracking-[0.12em] uppercase px-3 py-1 rounded-full border ${
                      exp.type === 'Full-time'  ? 'border-quicksand-400/30 text-quicksand-400' :
                      exp.type === 'Contract'   ? 'border-shellstone-400/30 text-shellstone-400' :
                                                  'border-sapphire-400/30 text-sapphire-400'
                    }`}>{exp.type}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Education */}
        <div className={`mt-16 pt-12 border-t border-sapphire-800/30 reveal reveal-delay-4 ${visible ? 'revealed' : ''}`}>
          <span className="font-mono text-xs tracking-[0.18em] uppercase text-sapphire-500 block mb-6">Education</span>
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <h3 className="font-serif text-[clamp(20px,2.5vw,30px)] text-shellstone-300 leading-tight">
                B.S. Computer Science
              </h3>
              <p className="text-shellstone-500 text-sm mt-2">Wayne State University — Detroit, MI</p>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-shellstone-600 tracking-wide sm:text-right">
              <span>Hackathon Team Lead</span>
              <span>Capstone Team Lead</span>
              <span>BSA President</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
