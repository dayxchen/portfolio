import { links } from '../data.js'
import { GitHubIcon, LinkedInIcon, MailIcon, FileIcon } from './Icons.jsx'
import Reveal from './Reveal.jsx'
import SectionLabel from './SectionLabel.jsx'

export default function Footer({ onOpenResume }) {
  return (
    <footer className="section footer" id="contact">
      <Reveal>
        <SectionLabel number="03">contact</SectionLabel>
      </Reveal>
      <Reveal className="ticket contact-ticket" delay={90}>
        <div className="ticket-main">
          <h2>Let's talk</h2>
          <p className="sub">I'm always happy to chat about projects, internships, or anything flight related.</p>
        </div>
        <div className="ticket-stub footer-links">
          <a href={`mailto:${links.email}`} className="btn"><MailIcon /> Email</a>
          <a href={links.linkedin} className="btn" target="_blank" rel="noreferrer"><LinkedInIcon /> LinkedIn</a>
          <a href={links.github} className="btn" target="_blank" rel="noreferrer"><GitHubIcon /> GitHub</a>
          <button type="button" className="btn" onClick={onOpenResume}><FileIcon /> Resume</button>
        </div>
      </Reveal>
      <p className="credit">made by davin chen · berkeley, ca · © {new Date().getFullYear()}</p>
    </footer>
  )
}
