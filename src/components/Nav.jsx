import { useEffect, useState } from 'react'

export default function Nav({ onOpenResume }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="nav-inner">
        <a href="#top" className="nav-name">davin chen</a>
        <div className="nav-links">
          <a href="#projects">projects</a>
          <a href="#about">about</a>
          <button type="button" className="nav-resume" onClick={onOpenResume}>resume</button>
        </div>
      </div>
    </nav>
  )
}
