import { useState, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

const RESUMES = [
  { label: 'AI Engineer Resume', href: '/resumes/Mubashir_AI_Resume.pdf' },
  { label: 'AI / Software Resume', href: '/resumes/Mubashir_Resume_AI.pdf' },
  { label: 'Data Scientist Resume', href: '/resumes/Mubashir_Resume_DS.pdf' },
  { label: 'Data Engineer Resume', href: '/resumes/Mubashir_Resume_Data.pdf' },
]

/* ─── Navigation links – update href values to match your section IDs ─── */
const NAV_LINKS = [
  { label: 'Home',       href: '#hero'       },
  { label: 'About',      href: '#about'      },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects',   href: '#projects'   },
  { label: 'Skills',     href: '#skills'     },
  { label: 'Services',   href: '#services'   },
  { label: 'Contact',    href: '#contact'    },
]

/* ── Hamburger / Close icon – pure SVG, no extra deps ─────────────────── */
function MenuIcon({ open }) {
  return (
    <svg
      className="w-6 h-6 text-light"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      {open ? (
        /* X icon */
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      ) : (
        /* Hamburger icon */
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
      )}
    </svg>
  )
}

/* ─────────────────────────────────────────────────────────────────────────
   Navbar
   – Fixed at top, blurs on scroll
   – Mobile drawer toggled via useState
   ───────────────────────────────────────────────────────────────────────── */
export default function Navbar({ filled = false }) {
  /* ── State: mobile menu open/closed ────────────────────────────────── */
  const [menuOpen, setMenuOpen] = useState(false)

  /* ── Close mobile menu on resize to desktop ─────────────────────────── */
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  /* ── Close menu when a link is clicked ──────────────────────────────── */
  const handleLinkClick = () => setMenuOpen(false)

  return (
    <header
      className={[
        'fixed top-0 inset-x-0 z-50 transition-all duration-300',
        filled
          ? 'bg-black border-b border-white shadow-lg shadow-black/20'
          : 'bg-transparent border-b border-transparent',
      ].join(' ')}
    >
      <nav
        className="content-wrapper flex items-center justify-between h-16"
        aria-label="Main navigation"
      >
        {/* ── Logo / Brand ─────────────────────────────────────────── */}
        <a
          href="#hero"
          className="font-mono text-white uppercase tracking-[0.14em] leading-[0.9]
                     text-[10px] md:text-xs font-bold focus-visible:outline-none
                     focus-visible:ring-2 focus-visible:ring-accent rounded"
          onClick={handleLinkClick}
        >
          <span className="block">Mubashir</span>
          <span className="block">Ajaz</span>
        </a>

        {/* ── Desktop Links ───────────────────────────────────────── */}
        <ul className={["hidden md:flex items-center gap-8", filled ? '' : 'opacity-0 pointer-events-none'].join(' ')} role="list">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a href={href} className="nav-link">
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* ── Desktop CTA ─────────────────────────────────────────── */}
        <div className={["hidden md:inline-flex relative group", filled ? '' : 'opacity-0 pointer-events-none'].join(' ')}>
          <button
            className="btn-outline flex items-center gap-2 text-xs py-2 px-4"
            aria-label="Download resume options"
          >
            Resume <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
          </button>
          
          {/* Dropdown Menu */}
          <div className="absolute top-full right-0 mt-2 w-48 bg-black/95 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl
                          opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300">
            <ul className="flex flex-col py-2" role="menu">
              {RESUMES.map((resume, idx) => (
                <li key={idx}>
                  <a
                    href={resume.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-2.5 text-xs font-semibold tracking-wide text-white/50 hover:text-accent hover:bg-white/5 transition-colors"
                    role="menuitem"
                  >
                    {resume.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Mobile: Hamburger Button ─────────────────────────────── */}
        <button
          type="button"
          className="md:hidden p-2 rounded-lg hover:bg-secondary/60
                     transition-colors focus-visible:outline-none
                     focus-visible:ring-2 focus-visible:ring-accent"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          disabled={!filled}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <MenuIcon open={menuOpen} />
        </button>
      </nav>

      {/* ── Mobile Drawer ─────────────────────────────────────────────── */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
        className={[
          'md:hidden overflow-hidden transition-all duration-300 ease-in-out',
          menuOpen && filled ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0',
          'bg-black backdrop-blur-md border-b border-white',
        ].join(' ')}
      >
        <ul className="content-wrapper flex flex-col gap-1 py-4" role="list">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                className="block py-3 text-muted text-sm font-medium border-b border-white
                           hover:text-light hover:pl-2 transition-all last:border-none"
                onClick={handleLinkClick}
              >
                {label}
              </a>
            </li>
          ))}

          {/* Resume link inside mobile menu too */}
          <li className="pt-3 pb-2 border-t border-white/10 mt-2">
            <span className="block text-[10px] font-semibold uppercase tracking-widest text-accent/60 mb-3 px-2">Download Resume</span>
            <div className="flex flex-col gap-2">
              {RESUMES.map((resume, idx) => (
                <a
                  key={idx}
                  href={resume.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline mx-2 text-center text-xs py-2"
                  onClick={handleLinkClick}
                >
                  {resume.label}
                </a>
              ))}
            </div>
          </li>
        </ul>
      </div>
    </header>
  )
}
