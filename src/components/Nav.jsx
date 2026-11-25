import { useEffect, useState } from 'react'

// `home` is '' on the home page; on other pages it's the home page's URL, so the links jump back there.
export default function Nav({ onOpenResume, home = '' }) {
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
        <a href={home || '#top'} className="nav-name">davin chen</a>
        <div className="nav-links">
          <a href={`${home}#projects`}>projects</a>
          <a href={`${home}#about`}>about</a>
          <button type="button" className="nav-resume" onClick={onOpenResume}>resume</button>
        </div>
      </div>
    </nav>
  )
}
