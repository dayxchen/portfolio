import useResume from '../useResume.js'
import Nav from './Nav.jsx'
import Footer from './Footer.jsx'
import ResumeModal from './ResumeModal.jsx'
import Clouds from './Clouds.jsx'
import Reveal from './Reveal.jsx'
import SectionLabel from './SectionLabel.jsx'
import { CardVideo } from './ProjectCard.jsx'

const home = import.meta.env.BASE_URL

// Came here from the home page: go back in history, so the browser puts you exactly where you were.
// Opened directly (shared link, new tab): the plain link jumps to the project's card instead.
function backToCard(e) {
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
  try {
    const from = new URL(document.referrer)
    if (from.origin === location.origin && from.pathname === home && history.length > 1) {
      e.preventDefault()
      history.back()
    }
  } catch {
    // No referrer: follow the link.
  }
}

// [bold lead, rest] pairs.
function LeadList({ items }) {
  return (
    <ul className="cs-leads">
      {items.map(([lead, rest]) => (
        <li key={lead}>
          <strong>{lead}</strong> {rest}
        </li>
      ))}
    </ul>
  )
}

// A project details page. The content comes from data.js (craveDetails, flightPassportDetails, …).
export default function ProjectPage({ project: d }) {
  const { resumeOpen, openResume, closeResume } = useResume()

  return (
    <>
      <div className="backdrop" aria-hidden="true">
        <span className="blob blob-a" />
        <span className="blob blob-b" />
        <Clouds />
      </div>
      <div className="page">
        <Nav onOpenResume={openResume} home={home} />
        <main>
          <header className="cs-hero">
            <a className="cs-back hero-in" style={{ '--d': '0ms' }} href={`${home}#${d.id}`} onClick={backToCard}>
              <span aria-hidden="true">←</span> All projects
            </a>
            <h1 className="cs-title hero-in" style={{ '--d': '60ms' }}>{d.title}</h1>
            <p className="cs-lede hero-in" style={{ '--d': '120ms' }}>{d.lede}</p>

            <div className="ticket cs-ticket hero-in" style={{ '--d': '180ms' }}>
              <dl className="ticket-main cs-facts">
                {d.facts.map(([label, value]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
              <div className="ticket-stub cs-stub">
                <div className="cs-links">
                  {d.links.map((l, i) => (
                    <a
                      key={l.href}
                      href={l.href}
                      className={`btn ${i === 0 ? 'btn-primary' : ''}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {l.label} <span aria-hidden="true">→</span>
                    </a>
                  ))}
                </div>
                {d.liveNote && <p className="cs-note">{d.liveNote}</p>}
              </div>
            </div>

            <div className="cs-media hero-in" style={{ '--d': '240ms' }}>
              <CardVideo src={d.video} poster={d.poster} title={d.title} />
            </div>
          </header>

          <section className="section cs-section">
            <Reveal>
              <SectionLabel number="01">how it works</SectionLabel>
              <h2>{d.howTitle}</h2>
            </Reveal>
            <Reveal className="glass cs-panel" delay={90}>
              <ol className="cs-steps">
                {d.howItWorks.map((step) => <li key={step}>{step}</li>)}
              </ol>
            </Reveal>
          </section>

          <section className="section cs-section">
            <Reveal>
              <SectionLabel number="02">my part</SectionLabel>
              <h2>What I built</h2>
              <p className="sub">{d.partSub}</p>
            </Reveal>
            <Reveal className="glass cs-panel" delay={90}>
              <LeadList items={d.myPart} />
              {d.theirPart && <p className="cs-team">{d.theirPart}</p>}
            </Reveal>
          </section>

          <section className="section cs-section">
            <Reveal>
              <SectionLabel number="03">design choices</SectionLabel>
              <h2>Why it feels the way it does</h2>
              <p className="sub">{d.designSub}</p>
            </Reveal>
            <div className="cs-grid">
              {d.design.map((item, i) => (
                <Reveal key={item.title} className="glass cs-choice" delay={(i % 2) * 90}>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </Reveal>
              ))}
            </div>
          </section>
        </main>
        <Footer onOpenResume={openResume} number="04" />
      </div>
      <ResumeModal open={resumeOpen} onClose={closeResume} />
    </>
  )
}
