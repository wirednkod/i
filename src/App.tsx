import { useEffect, useState } from 'react'
import GitHubCalendar from 'react-github-calendar'

const skills = [
  'typescript',
  'react',
  'node.js',
  'rust',
  'postgresql',
  'systems design',
  'application design',
  'graphql',
  'substrate',
  'developer tooling',
  'java',
]

const experience = [
  {
    role: 'lead engineer & curriculum producer',
    company: 'polkadot blockchain academy (remote)',
    dates: 'feb 2024 - jan 2026',
    highlights: [
      'designed and evolved the polkadot blockchain academy into the flagship education program.',
      'architected and maintained the technical infrastructure across cohorts.',
      'built pba-x, the scalable online learning environment for advanced modules.',
    ],
  },
  {
    role: 'senior software engineer',
    company: 'parity technologies (remote)',
    dates: 'feb 2021 - jan 2024',
    highlights: [
      'contributed to substrate connect with smoldot-based light client integration.',
      'improved decentralized dapp connectivity without centralized json-rpc reliance.',
      'advanced zombienet testing framework and migration to rust for performance.',
    ],
  },
  {
    role: 'software engineer team lead',
    company: 'intralot s.a. (athens, greece)',
    dates: 'oct 2018 - jan 2021',
    highlights: [
      'led the trading tools backoffice team for sportsbook platform.',
      'stack: react, node.js, java, apollo, graphql.',
      'grew team from 3 to 5 engineers while delivering production features.',
    ],
  },
  {
    role: 'senior software engineer',
    company: 'intrasoft international (athens, greece)',
    dates: 'feb 2017 - oct 2018',
    highlights: [
      'built sportsbook backoffice with java, node.js, postgres, react, typescript, graphql.',
      'led a team of 3 engineers delivering the final product.',
    ],
  },
  {
    role: 'full stack senior software engineer',
    company: 'bdswiss (athens, greece)',
    dates: 'aug 2015 - aug 2016',
    highlights: [
      'owned spas from scratch, integrations, and production support.',
      'bridged requirements into reliable front-end and back-end systems.',
    ],
  },
  {
    role: 'software engineering senior analyst',
    company: 'accenture (athens, greece)',
    dates: 'apr 2011 - jul 2015',
    highlights: [
      'led integration and modernization of telecom vas platforms.',
      'delivered soa integration solutions and migration to modern stacks.',
    ],
  },
]

const githubUsername = 'wirednkod'

type GithubRepo = {
  id: number
  name: string
  html_url: string
  description: string | null
  language: string | null
  stargazers_count: number
}

const education = [
  {
    program: 'protocol track (5-week course)',
    school: 'polkadot blockchain academy, buenos aires, argentina',
    date: 'graduated feb 2023',
  },
  {
    program: 'm.a. graphic arts & multimedia',
    school: 'open university, patra - greece',
    date: 'graduated aug 2012',
  },
  {
    program: 'b.sc. applied it & multimedia',
    school: 'technological educational institute, crete - greece',
    date: 'graduated jan 2006',
  },
  {
    program: 'computer graphics & multimedia (socrates scheme)',
    school: 'university of technology, brno - czechia',
    date: '6-month program',
  },
]

const languages = ['greek (native)', 'english (professional)', 'german (elementary)']

type ThemeMode = 'dark' | 'light'

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window === 'undefined') return 'dark'
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  })
  const [repos, setRepos] = useState<GithubRepo[]>([])
  const [reposError, setReposError] = useState(false)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  useEffect(() => {
    let isMounted = true
    const loadRepos = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/${githubUsername}/repos?per_page=100&sort=updated`,
        )
        if (!response.ok) {
          throw new Error('failed to load repos')
        }
        const data = (await response.json()) as GithubRepo[]
        const sorted = [...data].sort((a, b) => b.stargazers_count - a.stargazers_count)
        if (isMounted) {
          setRepos(sorted.slice(0, 6))
        }
      } catch (error) {
        if (isMounted) {
          setReposError(true)
        }
      }
    }

    loadRepos()

    return () => {
      isMounted = false
    }
  }, [])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  return (
    <div className="min-h-screen terminal-bg terminal-text">
      <div className="pointer-events-none fixed inset-0 bg-grain grid-overlay" />
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-6 pb-16 pt-10">
        <header className="flex items-center justify-between text-sm tracking-[0.1em] terminal-muted">
          <span className="terminal-text text-lg font-semibold">nk</span>
          <div className="flex items-center gap-6">
            <nav className="hidden items-center gap-6 md:flex">
              <a className="terminal-link hover:terminal-text" href="#skills">
                skills
              </a>
              <a className="terminal-link hover:terminal-text" href="#experience">
                experience
              </a>
              <a className="terminal-link hover:terminal-text" href="#github">
                github
              </a>
              <a className="terminal-link hover:terminal-text" href="#contact">
                contact
              </a>
            </nav>
            <button
              type="button"
              onClick={toggleTheme}
              className="terminal-toggle"
              aria-label={`switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 4v2" />
                  <path d="M12 18v2" />
                  <path d="M4 12h2" />
                  <path d="M18 12h2" />
                  <path d="M6.3 6.3l1.4 1.4" />
                  <path d="M16.3 16.3l1.4 1.4" />
                  <path d="M6.3 17.7l1.4-1.4" />
                  <path d="M16.3 7.7l1.4-1.4" />
                  <circle cx="12" cy="12" r="4" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20 14.5A7.5 7.5 0 1 1 9.5 4a6 6 0 1 0 10.5 10.5z" />
                </svg>
              )}
            </button>
          </div>
        </header>

        <section className="mt-14 flex flex-col gap-10">
          <div className="terminal-panel p-6">
            <p className="text-sm font-semibold tracking-[0.1em] terminal-muted">/ intro</p>
            <h1 className="terminal-title mt-4 text-3xl terminal-text md:text-4xl">
              nikos kontakis
            </h1>
            <p className="mt-4 text-sm terminal-muted">
              i build things that connect ideas to impact. i take a hands-on, end-to-end approach
              from concept and specification to prototyping, implementation, and iteration.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-xs tracking-[0.1em] terminal-muted">
              <span className="terminal-pill">athens, greece · remote</span>
              <span className="terminal-pill">web3 infrastructure</span>
              <span className="terminal-pill">developer education</span>
            </div>
          </div>

          <div className="terminal-panel p-6">
            <p className="text-sm font-semibold tracking-[0.1em] terminal-muted">/ contributions</p>
            <div className="mt-4 github-calendar">
              <GitHubCalendar username={githubUsername} />
            </div>
          </div>
        </section>

        <section id="skills" className="mt-16">
          <div>
            <p className="text-sm font-semibold tracking-[0.1em] terminal-muted">/ skills</p>
            <h2 className="terminal-title mt-3 text-2xl terminal-text">stack</h2>
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-4">
            {skills.map((skill) => (
              <div
                key={skill}
                className="terminal-panel px-4 py-3 text-xs tracking-[0.1em] terminal-muted"
              >
                {skill}
              </div>
            ))}
          </div>
        </section>

        <section id="experience" className="mt-16">
          <div>
            <p className="text-sm font-semibold tracking-[0.1em] terminal-muted">/ experience</p>
            <h2 className="terminal-title mt-3 text-2xl terminal-text">shipping history</h2>
          </div>
          <div className="mt-6 grid gap-4">
            {experience.map((role) => (
              <article
                key={`${role.role}-${role.company}-${role.dates}`}
                className="terminal-panel p-5"
              >
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <h3 className="terminal-title text-xl terminal-text">{role.role}</h3>
                    <p className="mt-1 text-xs tracking-[0.1em] terminal-muted">{role.company}</p>
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
            <p className="text-sm font-semibold tracking-[0.1em] terminal-muted">/ education</p>
            <h2 className="terminal-title mt-3 text-2xl terminal-text">training and degrees</h2>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {education.map((item) => (
              <div key={item.program} className="terminal-panel p-5">
                <h3 className="terminal-title text-base terminal-text">{item.program}</h3>
                <p className="mt-2 text-sm terminal-muted">{item.school}</p>
                <p className="mt-3 text-[10px] tracking-[0.1em] terminal-muted">{item.date}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3 text-xs tracking-[0.1em] terminal-muted">
            {languages.map((lang) => (
              <span key={lang} className="terminal-pill">
                {lang}
              </span>
            ))}
          </div>
        </section>

        <section id="github" className="mt-16">
          <div>
            <p className="text-sm font-semibold tracking-[0.1em] terminal-muted">/ github</p>
            <h2 className="terminal-title mt-3 text-2xl terminal-text">open-source nodes</h2>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {repos.map((repo) => (
              <div key={repo.id} className="terminal-panel p-5">
                <h3 className="terminal-title text-lg terminal-text">{repo.name}</h3>
                <p className="mt-2 text-sm terminal-muted">
                  {repo.description ?? 'no description yet'}
                </p>
                <p className="mt-3 text-[10px] tracking-[0.1em] terminal-muted">
                  {(repo.language ?? 'unknown').toLowerCase()} · ★ {repo.stargazers_count}
                </p>
              </div>
            ))}
          </div>
          {repos.length === 0 && !reposError ? (
            <p className="mt-4 text-xs tracking-[0.1em] terminal-muted">
              loading github repositories...
            </p>
          ) : null}
          {reposError ? (
            <p className="mt-4 text-xs tracking-[0.1em] terminal-muted">
              unable to load repositories right now.
            </p>
          ) : null}
          <a
            className="terminal-link mt-6 inline-flex text-xs tracking-[0.1em] terminal-muted hover:terminal-text"
            href={`https://github.com/${githubUsername}`}
            target="_blank"
            rel="noreferrer"
          >
            see more..
          </a>
        </section>

        <section id="contact" className="mt-16">
          <div className="terminal-panel p-6">
            <p className="text-sm font-semibold tracking-[0.1em] terminal-muted">/ contact</p>
            <h2 className="terminal-title mt-3 text-2xl terminal-text">
              let&apos;s build something useful
            </h2>
            <div className="mt-5 flex flex-wrap gap-3 text-xs tracking-[0.1em]">
              <a
                className="terminal-button terminal-link"
                href="mailto:wirednkod@proton.me"
                target="_blank"
                rel="noreferrer"
              >
                mail::nikos
              </a>
              <a
                className="terminal-button terminal-link"
                href="https://www.github.com/wirednkod"
                target="_blank"
                rel="noreferrer"
              >
                github::wirednkod
              </a>
              <a
                className="terminal-button terminal-link"
                href="https://x.com/wirednkod"
                target="_blank"
                rel="noreferrer"
              >
                x::wirednkod
              </a>
              <a
                className="terminal-button terminal-link"
                href="https://www.linkedin.com/in/nikolaoskontakis/"
                target="_blank"
                rel="noreferrer"
              >
                linkedin::nikolaoskontakis
              </a>
              <a
                className="terminal-button terminal-link"
                href="https://t.me/Wirednkod"
                target="_blank"
                rel="noreferrer"
              >
                telegram::wirednkod
              </a>
            </div>
          </div>
        </section>

        <footer className="mt-12 border-t terminal-border py-6 text-[10px] tracking-[0.1em] terminal-muted">
          © 2026 nikos kontakis
        </footer>
      </div>
    </div>
  )
}
