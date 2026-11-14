import { useEffect, useRef } from 'react'

// Soft clouds in the background sky that drift upward at different speeds as
// you scroll (parallax). Far clouds are small, faint and slow; near ones are
// bigger and faster. They wrap around, so they keep coming on a long page.
// top is a % of the viewport height and can be over 100 (starts below the fold).
const CLOUDS = [
  { top: 16, left: 4, width: 170, speed: 0.12, opacity: 0.5, blur: 3 },
  { top: 44, left: 74, width: 230, speed: 0.22, opacity: 0.55, blur: 2 },
  { top: 72, left: 30, width: 130, speed: 0.1, opacity: 0.4, blur: 4, wideOnly: true },
  { top: 98, left: 82, width: 310, speed: 0.38, opacity: 0.65, blur: 1 },
  { top: 128, left: 0, width: 270, speed: 0.32, opacity: 0.6, blur: 1.5, wideOnly: true },
]

const ASPECT = 0.45 // cloud height / width

function CloudShape() {
  return (
    <svg viewBox="0 0 200 90" width="100%" height="100%" fill="#fff">
      <circle cx="58" cy="58" r="28" />
      <circle cx="95" cy="42" r="36" />
      <circle cx="138" cy="54" r="30" />
      <circle cx="165" cy="66" r="20" />
      <rect x="30" y="56" width="150" height="30" rx="15" />
    </svg>
  )
}

export default function Clouds() {
  const refs = useRef([])

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0

    const update = () => {
      frame = 0
      const vh = window.innerHeight
      const scroll = reduced.matches ? 0 : window.scrollY
      CLOUDS.forEach((c, i) => {
        const el = refs.current[i]
        if (!el) return
        const h = c.width * ASPECT
        const span = vh + 2 * h
        const raw = (c.top / 100) * vh - scroll * c.speed
        const y = (((raw + h) % span) + span) % span - h
        el.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`
      })
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    reduced.addEventListener('change', schedule)
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      reduced.removeEventListener('change', schedule)
      cancelAnimationFrame(frame)
    }
  }, [])

  return CLOUDS.map((c, i) => (
    <span
      key={i}
      ref={(el) => (refs.current[i] = el)}
      className={`cloud ${c.wideOnly ? 'cloud-wide' : ''}`}
      style={{
        left: `${c.left}%`,
        width: c.width,
        height: c.width * ASPECT,
        opacity: c.opacity,
        filter: `blur(${c.blur}px)`,
      }}
    >
      <CloudShape />
    </span>
  ))
}
