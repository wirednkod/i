import { useEffect, useRef, useState } from 'react'
import GitHubCalendar from 'react-github-calendar'

const skills = [
  'typescript',
  'react',
  'node.js',
  'rust',
  'postgresql',
  'systems design',
  'agentic coding',
  'graphql',
  'substrate',
  'developer tooling',
  'java',
]

const experience = [
  {
    role: 'lead software engineer',
    company: 'phaedra botanicals · remote',
    dates: 'apr 2019 - present',
    highlights: [
      'defining the technical strategy.',
      'designing the architecture.',
      'building the automation roadmap powering product delivery and operations.',
    ],
  },
  {
    role: 'lead software engineer',
    company: 'polkadot blockchain academy · full-time · remote',
    dates: 'feb 2024 - jan 2026',
    highlights: [
      'led curriculum and technical infrastructure, shaping the academy into the flagship polkadot program.',
      'recruited and coordinated faculty from parity, web3foundation, and the wider web3 community.',
      'owned the technical stack (github classroom, automations, web platforms) and supported pba-x.',
    ],
  },
  {
    role: 'snr software engineer',
    company: 'parity technologies · full-time · remote',
    dates: 'feb 2021 - jan 2024',
    highlights: [
      'contributed to substrate connect with smoldot-based light client integration.',
      'enabled secure, resource-efficient dapp connectivity without centralized rpc endpoints.',
      'advanced zombienet testing framework and migration to rust for performance and stability.',
    ],
  },
  {
    role: 'lead software engineer',
    company: 'intralot · full-time · athens, greece',
    dates: 'apr 2020 - jan 2021',
    highlights: [
      'led the trading tools backoffice team for sportsbook platform.',
      'stack: react, node.js, apollo, graphql.',
    ],
  },
  {
    role: 'snr software engineer',
    company: 'intralot · full-time · athens, greece',
    dates: 'nov 2018 - apr 2020',
    highlights: [
      'application analysis and specification gathering.',
      'implemented algorithms and core logic for a next-gen betting sportsbook system.',
      'stack: java, graphql, react.',
    ],
  },
  {
    role: 'snr software engineer',
    company: 'intrasoft international · full-time · greece',
    dates: 'feb 2017 - oct 2018',
    highlights: ['built sportsbook backoffice with java, node.js, postgres, react, graphql.'],
  },
  {
    role: 'snr application engineer',
    company: 'first data corporation · full-time · athens, greece',
    dates: 'nov 2016 - jan 2017',
    highlights: ['owned anti-fraud application design, maintenance, and backend processes.'],
  },
  {
    role: 'snr software engineer - full stack',
    company: 'bdswiss · full-time · athens, greece',
    dates: 'aug 2015 - aug 2016',
    highlights: [
      'built spAs, integrations, and production support for trading platforms.',
      'stack: javascript, node.js, react, postgresql, mysql, html, css, sass.',
    ],
  },
  {
    role: 'software engineer',
    company: 'eastern mediterranean maritime archaeology foundation · athens, greece',
    dates: 'oct 2010 - apr 2019',
    highlights: [
      'gathered specs, built and supported web platforms, and managed migrations.',
      'stack: php, css, javascript, mysql.',
    ],
  },
  {
    role: 'software engineer',
    company: 'sophicus · athens, greece',
    dates: 'sep 2013 - sep 2015',
    highlights: ['built research platform with django, jquery, and mysql/sqlite.'],
  },
  {
    role: 'fellow',
    company: 'metavallon',
    dates: 'nov 2012 - feb 2018',
    highlights: ['early-stage startup support and acceleration.'],
  },
  {
    role: 'software engineering snr analyst',
    company: 'accenture · full-time · athens, greece',
    dates: 'apr 2011 - jul 2015',
    highlights: ['service delivery lead for telecom vas modernization and soa integrations.'],
  },
  {
    role: 'software engineering analyst',
    company: 'accenture · full-time · athens, greece',
    dates: 'oct 2009 - mar 2011',
    highlights: ['application operations and enterprise integration for telecom platforms.'],
  },
  {
    role: 'software developer',
    company: 'papaki.gr - usableweb s.a · heraklion, greece',
    dates: 'jun 2007 - feb 2008',
    highlights: ['web programmer for client websites and tooling.'],
  },
  {
    role: 'developer',
    company: 'computer planet · rethimno, greece',
    dates: 'apr 2006 - jun 2007',
    highlights: ['support programming with .net, sql, and access.'],
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
const EXPERIENCE_PREVIEW_COUNT = 3

type ThemeMode = 'dark' | 'light'

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window === 'undefined') return 'dark'
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  })
  const [repos, setRepos] = useState<GithubRepo[]>([])
  const [reposError, setReposError] = useState(false)
  const [showAllExperience, setShowAllExperience] = useState(false)
  const firstExpandedCardRef = useRef<HTMLElement | null>(null)
  const extraExperienceRef = useRef<HTMLDivElement | null>(null)
  const [extraExperienceHeight, setExtraExperienceHeight] = useState(0)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  useEffect(() => {
    let isMounted = true
    const loadRepos = async () => {
      try {
        const [response, libraryResponse, substrateConnectResponse] = await Promise.all([
          fetch(`https://api.github.com/users/${githubUsername}/repos?per_page=100&sort=updated`),
          fetch('https://api.github.com/repos/polkadot-ui/library'),
          fetch('https://api.github.com/repos/paritytech/substrate-connect'),
        ])
        if (!response.ok) {
          throw new Error('failed to load repos')
        }
        const data = (await response.json()) as GithubRepo[]
        const sorted = [...data].sort((a, b) => b.stargazers_count - a.stargazers_count)
        const topRepos = sorted.slice(0, 6)

        if (libraryResponse.ok) {
          const libraryRepo = (await libraryResponse.json()) as GithubRepo
          const demoRepoIndex = topRepos.findIndex((repo) => repo.name === 'sc-simple-demo')
          if (demoRepoIndex !== -1) {
            topRepos[demoRepoIndex] = libraryRepo
          }
        }

        if (substrateConnectResponse.ok) {
          const substrateConnectRepo = (await substrateConnectResponse.json()) as GithubRepo
          const parachainDemoRepoIndex = topRepos.findIndex(
            (repo) => repo.name === 'sc-parachain-demo',
          )
          if (parachainDemoRepoIndex !== -1) {
            topRepos[parachainDemoRepoIndex] = substrateConnectRepo
          }
        }

        const libraryIndex = topRepos.findIndex((repo) => repo.name === 'library')
        const substrateConnectIndex = topRepos.findIndex(
          (repo) => repo.name === 'substrate-connect',
        )
        if (libraryIndex !== -1 && substrateConnectIndex !== -1) {
          ;[topRepos[libraryIndex], topRepos[substrateConnectIndex]] = [
            topRepos[substrateConnectIndex],
            topRepos[libraryIndex],
          ]
        }

        const dashboardRepo = topRepos.find((repo) => repo.name === 'dashboard')
        if (dashboardRepo) {
          dashboardRepo.html_url = 'https://github.com/polkadot-fellows/dashboard'
        }

        if (isMounted) {
          setRepos(topRepos)
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

  useEffect(() => {
    if (!showAllExperience) {
      return
    }
    firstExpandedCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [showAllExperience])

  useEffect(() => {
    const updateExtraExperienceHeight = () => {
      setExtraExperienceHeight(extraExperienceRef.current?.scrollHeight ?? 0)
    }

    updateExtraExperienceHeight()
    window.addEventListener('resize', updateExtraExperienceHeight)
    return () => {
      window.removeEventListener('resize', updateExtraExperienceHeight)
    }
  }, [])

  useEffect(() => {
    setExtraExperienceHeight(extraExperienceRef.current?.scrollHeight ?? 0)
  }, [showAllExperience])

  const previewExperience = experience.slice(0, EXPERIENCE_PREVIEW_COUNT)
  const extraExperience = experience.slice(EXPERIENCE_PREVIEW_COUNT)
  const hasMoreExperience = extraExperience.length > 0

  return (
    <div className="min-h-screen terminal-bg terminal-text">
      <div className="pointer-events-none fixed inset-0 bg-grain grid-overlay" />
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-6 pb-16 pt-10">
        <header className="flex items-center justify-between text-sm tracking-[0.1em] terminal-muted">
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
        </header>

        <section className="mt-14 flex flex-col gap-10">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="terminal-panel p-6 md:col-span-2">
              <h2 className="terminal-title text-2xl terminal-text">/ intro</h2>
              <h1 className="terminal-title mt-4 text-3xl terminal-text md:text-4xl">
                nikos kontakis
              </h1>
              <p className="mt-4 text-sm terminal-muted">
                I lead engineering initiatives that turn product vision into measurable outcomes. I
                own delivery end-to-end, from discovery and specification to architecture,
                prototyping, implementation, and continuous iteration, while aligning teams and
                technical decisions around business impact.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 text-xs tracking-[0.1em] terminal-muted">
                <span className="terminal-pill">athens, greece · remote</span>
              </div>
            </div>

            <div id="contact" className="terminal-panel p-6 md:col-span-1 md:flex md:flex-col">
              <h2 className="terminal-title text-2xl terminal-text">/ contact</h2>
              <ul className="mt-4 space-y-2 text-sm tracking-[0.1em] md:flex md:flex-1 md:flex-col md:justify-center md:text-right">
                <li>
                  <a
                    className="terminal-link terminal-muted transition-colors duration-200 hover:terminal-text"
                    href="https://www.github.com/wirednkod"
                    target="_blank"
                    rel="noreferrer"
                  >
                    github::wirednkod
                  </a>
                </li>
                <li>
                  <a
                    className="terminal-link terminal-muted transition-colors duration-200 hover:terminal-text"
                    href="https://x.com/wirednkod"
                    target="_blank"
                    rel="noreferrer"
                  >
                    x::wirednkod
                  </a>
                </li>
                <li>
                  <a
                    className="terminal-link terminal-muted transition-colors duration-200 hover:terminal-text"
                    href="https://www.linkedin.com/in/nikolaoskontakis/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    linkedin::nikolaoskontakis
                  </a>
                </li>
                <li>
                  <a
                    className="terminal-link terminal-muted transition-colors duration-200 hover:terminal-text"
                    href="https://t.me/Wirednkod"
                    target="_blank"
                    rel="noreferrer"
                  >
                    telegram::wirednkod
                  </a>
                </li>
                <li>
                  <a
                    className="terminal-link terminal-muted transition-colors duration-200 hover:terminal-text"
                    href="mailto:wirednkod@proton.me"
                    target="_blank"
                    rel="noreferrer"
                  >
                    mail::nikos
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="terminal-panel p-6">
            <h2 className="terminal-title text-2xl terminal-text">/ contributions</h2>
            <div className="mt-4 github-calendar">
              <GitHubCalendar username={githubUsername} />
            </div>
          </div>
        </section>

        <section id="experience" className="mt-16">
          <div>
            <h2 className="terminal-title text-2xl terminal-text">/ experience</h2>
          </div>
          <div className="mt-6 grid gap-4">
            {previewExperience.map((role) => (
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
          {hasMoreExperience ? (
            <div
              className="overflow-hidden transition-[max-height,opacity] duration-500 ease-in-out"
              style={{
                maxHeight: showAllExperience ? `${extraExperienceHeight}px` : '0px',
                opacity: showAllExperience ? 1 : 0,
              }}
            >
              <div ref={extraExperienceRef} className="mt-4 grid gap-4">
                {extraExperience.map((role, index) => (
                  <article
                    key={`${role.role}-${role.company}-${role.dates}`}
                    className="terminal-panel p-5"
                    ref={index === 0 ? firstExpandedCardRef : undefined}
                  >
                    <div className="flex items-start justify-between gap-6">
                      <div>
                        <h3 className="terminal-title text-xl terminal-text">{role.role}</h3>
                        <p className="mt-1 text-xs tracking-[0.1em] terminal-muted">
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
            </div>
          ) : null}
          {hasMoreExperience ? (
            <button
              type="button"
              className="terminal-button mt-6 text-xs tracking-[0.1em]"
              onClick={() => setShowAllExperience((prev) => !prev)}
            >
              {showAllExperience ? 'show less' : 'show more'}
            </button>
          ) : null}
        </section>

        <section id="education" className="mt-16">
          <div>
            <h2 className="terminal-title text-2xl terminal-text">/ education</h2>
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
            <h2 className="terminal-title text-2xl terminal-text">/ repositories</h2>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {repos.map((repo) => (
              <div key={repo.id} className="terminal-panel p-5">
                <h3 className="terminal-title text-lg terminal-text">
                  <a
                    className="terminal-link hover:terminal-text"
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {repo.name}
                  </a>
                </h3>
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
            className="terminal-button mt-6 inline-flex text-xs tracking-[0.1em]"
            href={`https://github.com/${githubUsername}`}
            target="_blank"
            rel="noreferrer"
          >
            see more..
          </a>
        </section>

        <section id="skills" className="mt-16">
          <div>
            <h2 className="terminal-title text-2xl terminal-text">/ skills</h2>
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
            <div className="px-4 py-3 text-xs tracking-[0.1em] terminal-muted">more...</div>
          </div>
        </section>

        <footer className="mt-12 border-t terminal-border py-6 text-[10px] tracking-[0.1em] terminal-muted">
          © 2026 nikos kontakis
        </footer>
      </div>
    </div>
  )
}
