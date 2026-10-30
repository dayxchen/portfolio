import { useCallback, useState } from 'react'
import { profile } from './data.js'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Projects from './components/Projects.jsx'
import About from './components/About.jsx'
import Footer from './components/Footer.jsx'
import ResumeModal from './components/ResumeModal.jsx'

export default function App() {
  const [resumeOpen, setResumeOpen] = useState(false)

  // Phones can't show a PDF inside the page reliably, so open it in a new tab there.
  const openResume = useCallback(() => {
    if (window.matchMedia('(max-width: 700px)').matches) {
      window.open(profile.resume, '_blank', 'noopener')
    } else {
      setResumeOpen(true)
    }
  }, [])
  const closeResume = useCallback(() => setResumeOpen(false), [])

  return (
    <>
      <div className="backdrop" aria-hidden="true">
        <span className="blob blob-a" />
        <span className="blob blob-b" />
      </div>
      <Nav onOpenResume={openResume} />
      <main>
        <Hero onOpenResume={openResume} />
        <Projects />
        <About />
      </main>
      <Footer onOpenResume={openResume} />
      <ResumeModal open={resumeOpen} onClose={closeResume} />
    </>
  )
}
