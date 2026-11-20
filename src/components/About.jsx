import { about } from '../data.js'
import Reveal from './Reveal.jsx'
import SectionLabel from './SectionLabel.jsx'

export default function About() {
  return (
    <section className="section" id="about">
      <Reveal>
        <SectionLabel number="02">about</SectionLabel>
        <h2>A bit about me</h2>
      </Reveal>

      <Reveal className="about-text glass" delay={90}>
        {about.paragraphs.map((p) => <p key={p}>{p}</p>)}
        <h3>Things I'm into</h3>
        <ul className="interests">
          {about.interests.map((i) => <li key={i}>{i}</li>)}
        </ul>
      </Reveal>
    </section>
  )
}
