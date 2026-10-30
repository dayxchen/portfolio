import { profile, links } from '../data.js'
import { GitHubIcon, LinkedInIcon, PlaneIcon } from './Icons.jsx'

// Same curve is used by the SVG line and the plane's CSS offset-path.
const ARC = 'M 12 196 C 120 40, 300 18, 408 92'

export default function Hero({ onOpenResume }) {
  return (
    <header className="hero" id="top">
      <div className="flight-arc" aria-hidden="true">
        <svg viewBox="0 0 420 220" width="420" height="220">
          <path d={ARC} className="arc-line" />
          <circle cx="12" cy="196" r="5" className="arc-dot" />
          <circle cx="408" cy="92" r="5" className="arc-dot arc-dot-end" />
        </svg>
        <span className="arc-plane" style={{ offsetPath: `path('${ARC}')` }}>
          <PlaneIcon size={26} />
        </span>
      </div>

      <p className="hero-hello hero-in" style={{ '--d': '0ms' }}>hi, I'm</p>
      <h1 className="hero-name hero-in" style={{ '--d': '80ms' }}>{profile.name}</h1>
      <p className="hero-tag hero-in" style={{ '--d': '160ms' }}>{profile.tagline}</p>
      <div className="ctas hero-in" style={{ '--d': '240ms' }}>
        <a href="#projects" className="btn btn-primary">View projects</a>
        <button type="button" className="btn" onClick={onOpenResume}>Resume</button>
        <a href={links.github} className="btn" target="_blank" rel="noreferrer">
          <GitHubIcon /> GitHub
        </a>
        <a href={links.linkedin} className="btn" target="_blank" rel="noreferrer">
          <LinkedInIcon /> LinkedIn
        </a>
      </div>
    </header>
  )
}
