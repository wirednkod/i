import { useEffect, useState } from 'react'

const skills = [
  'TypeScript',
  'React',
  'Node.js',
  'GraphQL',
  'Rust',
  'Polkadot / Substrate',
  'Java',
  'PostgreSQL',
  'Systems Design',
  'Developer Tooling',
]

const experience = [
  {
    role: 'Lead Engineer & Curriculum Producer',
    company: 'Polkadot Blockchain Academy (Remote)',
    dates: 'Feb 2024 - Jan 2026',
    highlights: [
      'Designed and evolved the Polkadot Blockchain Academy into the flagship education program.',
      'Architected and maintained the technical infrastructure across cohorts.',
      'Built PBA-X, the scalable online learning environment for advanced modules.',
    ],
  },
  {
    role: 'Senior Software Engineer',
    company: 'Parity Technologies (Remote)',
    dates: 'Feb 2021 - Jan 2024',
    highlights: [
      'Contributed to Substrate Connect with Smoldot-based light client integration.',
      'Improved decentralized dApp connectivity without centralized JSON-RPC reliance.',
      'Advanced Zombienet testing framework and migration to Rust for performance.',
    ],
  },
  {
    role: 'Software Engineer Team Lead',
    company: 'Intralot S.A. (Athens, Greece)',
    dates: 'Oct 2018 - Jan 2021',
    highlights: [
      'Led the Trading Tools Backoffice team for Sportsbook platform.',
      'Stack: React, Node.js, Java, Apollo, GraphQL.',
      'Grew team from 3 to 5 engineers while delivering production features.',
    ],
  },
  {
    role: 'Senior Software Engineer',
    company: 'Intrasoft International (Athens, Greece)',
    dates: 'Feb 2017 - Oct 2018',
    highlights: [
      'Built sportsbook backoffice with Java, Node.js, Postgres, React, TypeScript, GraphQL.',
      'Led a team of 3 engineers delivering the final product.',
    ],
  },
  {
    role: 'Full Stack Senior Software Engineer',
    company: 'BDSwiss (Athens, Greece)',
    dates: 'Aug 2015 - Aug 2016',
    highlights: [
      'Owned SPAs from scratch, integrations, and production support.',
      'Bridged requirements into reliable front-end and back-end systems.',
    ],
  },
  {
    role: 'Software Engineering Senior Analyst',
    company: 'Accenture (Athens, Greece)',
    dates: 'Apr 2011 - Jul 2015',
    highlights: [
      'Led integration and modernization of telecom VAS platforms.',
      'Delivered SOA integration solutions and migration to modern stacks.',
    ],
  },
]

const projects = [
  {
    name: 'Substrate Connect',
    description: 'Light client framework for direct, trusted dApp connectivity.',
    stack: 'Rust, TypeScript, Smoldot',
  },
  {
    name: 'Zombienet',
    description: 'Testing framework for Polkadot/Substrate network orchestration.',
    stack: 'Rust, TypeScript',
  },
  {
    name: 'PBA-X',
    description: 'Scalable online learning platform for advanced Web3 curricula.',
    stack: 'Web platform, curriculum systems',
  },
]

const education = [
  {
    program: 'Protocol Track (5-week course)',
    school: 'Polkadot Blockchain Academy, Buenos Aires, Argentina',
    date: 'Graduated Feb 2023',
  },
  {
    program: 'M.A. Graphic Arts & Multimedia',
    school: 'Open University, Patra - Greece',
    date: 'Graduated Aug 2012',
  },
  {
    program: 'B.Sc. Applied IT & Multimedia',
    school: 'Technological Educational Institute, Crete - Greece',
    date: 'Graduated Jan 2006',
  },
  {
    program: 'Computer Graphics & Multimedia (Socrates Scheme)',
    school: 'University of Technology, Brno - Czechia',
    date: '6-month program',
  },
]

const languages = ['Greek (Native)', 'English (Professional)', 'German (Elementary)']

type ThemeMode = 'dark' | 'light'

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window === 'undefined') return 'dark'
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  })

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  return (
    <div className="min-h-screen terminal-bg terminal-text">
      <div className="pointer-events-none fixed inset-0 bg-grain grid-overlay" />
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-6 pb-16 pt-10">
        <header className="flex items-center justify-between text-xs uppercase tracking-[0.4em] terminal-muted">
          <span className="terminal-text">NK</span>
          <div className="flex items-center gap-6">
            <nav className="hidden items-center gap-6 md:flex">
              <a className="hover:terminal-text" href="#skills">
                Skills
              </a>
              <a className="hover:terminal-text" href="#experience">
                Experience
              </a>
              <a className="hover:terminal-text" href="#github">
                GitHub
              </a>
              <a className="hover:terminal-text" href="#contact">
                Contact
              </a>
            </nav>
            <button
              type="button"
              onClick={toggleTheme}
              className="terminal-toggle"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              <svg viewBox="0 0 48 36" aria-hidden="true">
                <rect x="3" y="3" width="42" height="30" rx="3" />
                <path d="M9 11h14" />
                <path d="M9 18h8" />
                <path d="M20 18l5-3-5-3" />
                <path d="M9 25h22" />
              </svg>
            </button>
          </div>
        </header>

        <section className="mt-14 flex flex-col gap-10">
          <div className="terminal-panel shadow-soft p-6">
            <p className="text-xs uppercase tracking-[0.4em] terminal-muted">/ intro</p>
            <h1 className="mt-4 text-3xl uppercase terminal-text md:text-4xl">
              Nikolaos Kontakis — Lead Engineer
            </h1>
            <p className="mt-4 max-w-2xl text-sm terminal-muted">
              I build things that connect ideas to impact. I take a hands-on, end-to-end approach
              from concept and specification to prototyping, implementation, and iteration.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-xs uppercase tracking-[0.3em] terminal-muted">
              <span className="terminal-pill">Athens, Greece · Remote</span>
              <span className="terminal-pill">Web3 Infrastructure</span>
              <span className="terminal-pill">Developer Education</span>
            </div>
          </div>

          <div className="terminal-panel p-6">
            <p className="text-xs uppercase tracking-[0.4em] terminal-muted">/ now</p>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm terminal-muted">
              <span>Building scalable education platforms for Polkadot</span>
            </div>
            <div className="mt-4 text-xl terminal-text">Shipping dependable systems for teams</div>
          </div>
        </section>

        <section id="skills" className="mt-16">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] terminal-muted">/ skills</p>
            <h2 className="mt-3 text-2xl terminal-text">Stack I trust</h2>
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-4">
            {skills.map((skill) => (
              <div key={skill} className="terminal-panel px-4 py-3 text-xs uppercase tracking-[0.3em] terminal-muted">
                {skill}
              </div>
            ))}
          </div>
        </section>

        <section id="experience" className="mt-16">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] terminal-muted">/ experience</p>
            <h2 className="mt-3 text-2xl terminal-text">Shipping history</h2>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {experience.map((role) => (
              <article key={role.role} className="terminal-panel p-5">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <h3 className="text-xl terminal-text">{role.role}</h3>
                    <p className="mt-1 text-xs uppercase tracking-[0.3em] terminal-muted">
                      {role.company}
                    </p>
                  </div>
                  <span className="terminal-tag">{role.dates}</span>
                </div>
                <ul className="mt-4 space-y-2 text-sm terminal-muted">
                  {role.highlights.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full terminal-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="education" className="mt-16">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] terminal-muted">/ education</p>
            <h2 className="mt-3 text-2xl terminal-text">Training and degrees</h2>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {education.map((item) => (
              <div key={item.program} className="terminal-panel p-5">
                <h3 className="text-base terminal-text">{item.program}</h3>
                <p className="mt-2 text-sm terminal-muted">{item.school}</p>
                <p className="mt-3 text-[10px] uppercase tracking-[0.3em] terminal-muted">
                  {item.date}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3 text-xs uppercase tracking-[0.3em] terminal-muted">
            {languages.map((lang) => (
              <span key={lang} className="terminal-pill">
                {lang}
              </span>
            ))}
          </div>
        </section>

        <section id="github" className="mt-16">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] terminal-muted">/ github</p>
            <h2 className="mt-3 text-2xl terminal-text">Open-source nodes</h2>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {projects.map((project) => (
              <div key={project.name} className="terminal-panel p-5">
                <h3 className="text-lg terminal-text">{project.name}</h3>
                <p className="mt-2 text-sm terminal-muted">{project.description}</p>
                <p className="mt-3 text-[10px] uppercase tracking-[0.3em] terminal-muted">
                  {project.stack}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-6 text-xs uppercase tracking-[0.4em] terminal-muted">
            github.com/wirednkod
          </div>
        </section>

        <section id="contact" className="mt-16">
          <div className="terminal-panel p-6">
            <p className="text-xs uppercase tracking-[0.4em] terminal-muted">/ contact</p>
            <h2 className="mt-3 text-2xl terminal-text">Let&apos;s build something useful</h2>
            <p className="mt-3 text-sm terminal-muted">
              kontakisnikos@gmail.com · linkedin.com/in/nikolaoskontakis
            </p>
            <div className="mt-5 flex flex-wrap gap-3 text-xs uppercase tracking-[0.3em]">
              <a className="terminal-button" href="mailto:kontakisnikos@gmail.com">
                Email
              </a>
              <a className="terminal-button ghost" href="https://www.linkedin.com/in/nikolaoskontakis/">
                LinkedIn
              </a>
              <a className="terminal-button ghost" href="https://www.github.com/wirednkod">
                GitHub
              </a>
            </div>
          </div>
        </section>

        <footer className="mt-12 border-t terminal-border py-6 text-[10px] uppercase tracking-[0.4em] terminal-muted">
          © 2026 Nikolaos Kontakis · React + Vite + Tailwind
        </footer>
      </div>
    </div>
  )
}
