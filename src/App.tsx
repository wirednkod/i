import { useEffect, useState } from 'react'

const skills = [
  'React',
  'TypeScript',
  'Tailwind',
  'Node.js',
  'API Design',
  'Testing',
  'UX Collaboration',
  'Performance',
]

const experience = [
  {
    role: 'Frontend Engineer',
    company: 'Company Name',
    dates: 'Jan 2023 - Present',
    highlights: [
      'Led a design system refresh that improved shipping speed.',
      'Built a dashboard used by 10k+ monthly active users.',
    ],
  },
  {
    role: 'Full Stack Developer',
    company: 'Company Name',
    dates: 'Jun 2021 - Dec 2022',
    highlights: [
      'Shipped new onboarding flow with a 20% conversion lift.',
      'Partnered with product to define quarterly roadmap.',
    ],
  },
]

const projects = [
  {
    name: 'Project Alpha',
    description: 'Realtime collaboration tool with delightful UX.',
    stack: 'React, WebSockets, Tailwind',
  },
  {
    name: 'Project Atlas',
    description: 'Analytics platform with a clean reporting API.',
    stack: 'Node.js, PostgreSQL, Vite',
  },
  {
    name: 'Project Nova',
    description: 'Mobile-first marketing site with a bold aesthetic.',
    stack: 'React, Vite, CSS',
  },
]

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
          <span className="terminal-text">WK</span>
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
              Software engineer
            </h1>
            <p className="mt-4 max-w-2xl text-sm terminal-muted">
              I build fast, reliable web products. I like crisp UX, clean architecture, and shipping
              often.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-xs uppercase tracking-[0.3em] terminal-muted">
              <span className="terminal-pill">United States</span>
              <span className="terminal-pill">Remote / Hybrid</span>
              <span className="terminal-pill">React + TypeScript</span>
            </div>
          </div>

          <div className="terminal-panel p-6">
            <p className="text-xs uppercase tracking-[0.4em] terminal-muted">/ now</p>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm terminal-muted">
              <span className="terminal-badge">Open to roles</span>
              <span>Frontend + Product focus</span>
            </div>
            <div className="mt-4 text-xl terminal-text">Building sharp, human software</div>
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
            github.com/your-handle
          </div>
        </section>

        <section id="contact" className="mt-16">
          <div className="terminal-panel p-6">
            <p className="text-xs uppercase tracking-[0.4em] terminal-muted">/ contact</p>
            <h2 className="mt-3 text-2xl terminal-text">Let&apos;s build something useful</h2>
            <p className="mt-3 text-sm terminal-muted">
              your.email@example.com · linkedin.com/in/your-handle
            </p>
            <div className="mt-5 flex flex-wrap gap-3 text-xs uppercase tracking-[0.3em]">
              <a className="terminal-button" href="mailto:your.email@example.com">
                Email
              </a>
              <a className="terminal-button ghost" href="https://www.linkedin.com/in/your-handle">
                LinkedIn
              </a>
            </div>
          </div>
        </section>

        <footer className="mt-12 border-t terminal-border py-6 text-[10px] uppercase tracking-[0.4em] terminal-muted">
          © 2026 Your Name · React + Vite + Tailwind
        </footer>
      </div>
    </div>
  )
}
