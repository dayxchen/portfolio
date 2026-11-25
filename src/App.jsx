import { useEffect } from 'react'
import useResume from './useResume.js'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Projects from './components/Projects.jsx'
import About from './components/About.jsx'
import Footer from './components/Footer.jsx'
import ResumeModal from './components/ResumeModal.jsx'
import Clouds from './components/Clouds.jsx'
import FlightJourney from './components/FlightJourney.jsx'

export default function App() {
  const { resumeOpen, openResume, closeResume } = useResume()

  // The page is drawn by React after load, so the browser can miss a link like /portfolio/#crave.
  // Jump there once it exists. Skipped on Back/Forward, where the browser restores the exact spot itself.
  useEffect(() => {
    const nav = performance.getEntriesByType('navigation')[0]
    if (nav?.type === 'back_forward' || !location.hash) return
    document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView({ behavior: 'instant' })
  }, [])

  return (
    <>
      <div className="backdrop" aria-hidden="true">
        <span className="blob blob-a" />
        <span className="blob blob-b" />
        <Clouds />
      </div>
      <div className="page">
        <FlightJourney />
        <Nav onOpenResume={openResume} />
        <main>
          <Hero onOpenResume={openResume} />
          <Projects />
          <About />
        </main>
        <Footer onOpenResume={openResume} />
      </div>
      <ResumeModal open={resumeOpen} onClose={closeResume} />
    </>
  )
}
