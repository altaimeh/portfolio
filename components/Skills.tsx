'use client'

import { useEffect, useRef, useState } from 'react'

const skillGroups = [
  { category: 'Languages',      skills: ['TypeScript', 'Java', 'JavaScript (ES6+)', 'SQL'] },
  { category: 'Frontend',       skills: ['React.js', 'Next.js', 'HTML5 / CSS3', 'Tailwind CSS', 'Webpack', 'Jest'] },
  { category: 'Backend',        skills: ['Spring Boot', 'REST APIs', 'Microservices', 'SNS/SQS', 'Node.js', 'Ruby on Rails'] },
  { category: 'Cloud & DevOps', skills: ['AWS Cloud Services', 'Docker', 'Terraform', 'CI/CD Pipelines', 'GitLab', 'Serverless'] },
  { category: 'Tools',          skills: ['Agile / Scrum', 'Jira', 'Postman', 'Power BI', 'LangChain', 'LLMs'] },
]

const certs = [
  { abbr: 'CLF-C02', name: 'AWS Certified Cloud Practitioner' },
  { abbr: 'AIF-C01', name: 'AWS Certified AI Practitioner' },
]

export default function Skills() {
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
    <section id="skills" ref={ref} className="bg-[#0A1628] px-8 sm:px-12 py-28">
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <div className={`flex items-end justify-between mb-12 reveal ${visible ? 'revealed' : ''}`}>
          <div>
            <span className="font-mono text-xs tracking-[0.18em] uppercase text-sapphire-500">02 — Skills</span>
            <h2 className="font-serif text-[clamp(36px,5vw,64px)] text-shellstone-300 mt-3 leading-tight">
              Technical Arsenal
            </h2>
          </div>
        </div>
        <div className="rule mb-0 opacity-30" />

        {/* Category rows */}
        {skillGroups.map((group, i) => (
          <div
            key={group.category}
            className={`border-b border-sapphire-800/50 py-7 flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-0 reveal reveal-delay-${i + 1} ${visible ? 'revealed' : ''}`}
          >
            {/* Category name */}
            <div className="sm:w-48 flex-shrink-0">
              <span className="text-xs font-medium tracking-[0.14em] uppercase text-shellstone-600">
                {group.category}
              </span>
            </div>
            {/* Skills */}
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="text-sm text-shellstone-400 px-3 py-1.5 rounded-full border border-sapphire-700/50 bg-sapphire-900/30 hover:border-quicksand-400/40 hover:text-quicksand-300 transition-all duration-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}

        {/* Certifications */}
        <div className={`mt-16 reveal reveal-delay-6 ${visible ? 'revealed' : ''}`}>
          <span className="font-mono text-xs tracking-[0.18em] uppercase text-sapphire-500 block mb-6">
            Certifications
          </span>
          <div className="flex flex-wrap gap-4">
            {certs.map((cert) => (
              <div key={cert.name} className="flex items-center gap-3 px-5 py-3 rounded-full border border-quicksand-400/20 bg-royal-800/30 hover:border-quicksand-400/45 transition-all duration-300">
                <span className="font-mono text-xs font-semibold text-quicksand-400">{cert.abbr}</span>
                <span className="text-sm text-shellstone-400">{cert.name}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
