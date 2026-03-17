'use client'

import { useEffect, useRef, useState } from 'react'

const skillGroups = [
  {
    category: 'Languages',
    icon: '{ }',
    skills: ['TypeScript', 'Java', 'JavaScript (ES6+)', 'SQL'],
  },
  {
    category: 'Frontend',
    icon: '</>',
    skills: ['React.js', 'Next.js', 'HTML5 / CSS3', 'Tailwind CSS', 'Webpack', 'Jest'],
  },
  {
    category: 'Backend',
    icon: '///',
    skills: ['Spring Boot', 'REST APIs', 'Microservices', 'SNS/SQS', 'Node.js', 'Ruby on Rails'],
  },
  {
    category: 'Cloud & DevOps',
    icon: '☁',
    skills: ['AWS Cloud Services', 'Docker', 'Terraform', 'CI/CD Pipelines', 'GitLab', 'Serverless'],
  },
  {
    category: 'Tools & Methods',
    icon: '⚙',
    skills: ['Agile / Scrum', 'Jira', 'Postman', 'Power BI', 'LangChain', 'LLMs'],
  },
]

const certs = [
  { name: 'AWS Certified Cloud Practitioner', abbr: 'CLF-C02' },
  { name: 'AWS Certified AI Practitioner', abbr: 'AIF-C01' },
]

export default function Skills() {
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
    <section id="skills" ref={ref} className="py-32 relative">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section label */}
        <div className={`mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="font-mono text-accent-blue text-sm tracking-widest">02. SKILLS</span>
          <h2 className="font-sans font-bold text-4xl sm:text-5xl text-white mt-2">
            Technical Arsenal
          </h2>
          <div className="mt-4 w-16 h-px bg-gradient-to-r from-accent-blue to-transparent" />
        </div>

        {/* Skill groups grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {skillGroups.map((group, i) => (
            <div
              key={group.category}
              className={`glow-border bg-navy-900/60 border border-navy-700/50 rounded-lg p-6 transition-all duration-700 hover:border-navy-500/70 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-accent-blue text-base">{group.icon}</span>
                <span className="font-sans font-semibold text-white text-sm tracking-wide">
                  {group.category}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="font-mono text-xs px-2.5 py-1 rounded bg-navy-700/60 text-slate-300 border border-navy-600/40 hover:border-accent-blue/40 hover:text-accent-blue transition-colors duration-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div
          className={`transition-all duration-700 delay-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <p className="font-mono text-xs text-slate-500 tracking-widest uppercase mb-4">Certifications</p>
          <div className="flex flex-wrap gap-4">
            {certs.map((cert) => (
              <div
                key={cert.name}
                className="flex items-center gap-3 px-5 py-3 rounded-lg border border-accent-blue/25 bg-navy-800/40 hover:border-accent-blue/50 transition-colors duration-200"
              >
                <span className="font-mono text-accent-blue text-xs font-semibold">{cert.abbr}</span>
                <span className="text-slate-300 text-sm">{cert.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
