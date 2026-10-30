import { projects, moreProjects, links } from '../data.js'
import ProjectCard from './ProjectCard.jsx'
import Reveal from './Reveal.jsx'
import SectionLabel from './SectionLabel.jsx'

export default function Projects() {
  return (
    <section className="section" id="projects">
      <Reveal>
        <SectionLabel number="01">projects</SectionLabel>
        <h2>Things I've built</h2>
        <p className="sub">A few projects I'm proud of, mostly about flights, data, and making things easy to use.</p>
      </Reveal>

      <div className="grid">
        {projects.map((p, i) => (
          <Reveal key={p.title} delay={i * 90} className="grid-item">
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </div>

      <Reveal className="more glass">
        <h3>More on GitHub</h3>
        <ul>
          {moreProjects.map((p) => (
            <li key={p.title}>
              <a href={p.href} target="_blank" rel="noreferrer">{p.title}</a>
              <span>{p.description}</span>
            </li>
          ))}
        </ul>
        <a className="more-all" href={links.github} target="_blank" rel="noreferrer">
          See everything on GitHub <span aria-hidden="true">→</span>
        </a>
      </Reveal>
    </section>
  )
}
