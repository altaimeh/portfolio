'use client'

import { useEffect, useRef, useState } from 'react'

const skillGroups = [
  {
    category: 'Languages',
    skills: ['TypeScript', 'Java', 'JavaScript (ES6+)', 'SQL'],
  },
  {
    category: 'Frontend',
    skills: ['React.js', 'Next.js', 'HTML5 / CSS3', 'Tailwind CSS', 'Webpack', 'Jest'],
  },
  {
    category: 'Backend',
    skills: ['Spring Boot', 'REST APIs', 'Microservices', 'SNS/SQS', 'Node.js', 'Ruby on Rails'],
  },
  {
    category: 'Cloud & DevOps',
    skills: ['AWS Cloud Services', 'Docker', 'Terraform', 'CI/CD Pipelines', 'GitLab', 'Serverless'],
  },
  {
    category: 'Tools & Methods',
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
    <section id="skills" ref={ref} className="py-28 relative bg-white">
      <div className="absolute top-0 left-0 right-0 h-px bg-brown-100" />

      <div className="max-w-5xl mx-auto px-6">

        {/* Section label */}
        <div className={`mb-14 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs text-sage-500 font-medium tracking-widest uppercase mb-2">02 — Skills</p>
          <h2 className="font-serif font-bold text-4xl sm:text-5xl text-brown-900">
            Technical Arsenal
          </h2>
          <div className="section-divider mt-4" />
        </div>

        {/* Skill groups grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {skillGroups.map((group, i) => (
            <div
              key={group.category}
              className={`bg-brown-50 border border-brown-100 rounded-xl p-6 card-shadow transition-all duration-700 hover:border-sage-200 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <h3 className="font-semibold text-brown-800 text-sm mb-4 tracking-wide">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-2.5 py-1 rounded-md bg-white text-brown-600 border border-brown-200 hover:border-sage-300 hover:text-sage-700 transition-colors duration-200"
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
          <p className="text-xs text-brown-400 tracking-widest uppercase mb-4 font-medium">Certifications</p>
          <div className="flex flex-wrap gap-3">
            {certs.map((cert) => (
              <div
                key={cert.name}
                className="flex items-center gap-3 px-5 py-3 rounded-xl border border-sage-200 bg-sage-50 hover:bg-sage-100 transition-colors duration-200"
              >
                <span className="font-mono text-sage-600 text-xs font-semibold">{cert.abbr}</span>
                <span className="text-brown-700 text-sm">{cert.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
