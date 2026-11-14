import { useEffect, useRef } from 'react'
import { PlaneIcon } from './Icons.jsx'

// A dotted flight route that winds down the whole page behind the content.
// As you scroll, a plane flies along it, the flown part darkens, and it lands
// by the contact ticket. Everything is updated straight on the DOM (no React
// re-renders while scrolling).

const SAMPLES = 400
const TAKEOFF_PX = 160 // scroll distance over which the hero plane hands off

// Top/left of an element inside `page`, ignoring CSS transforms (the Reveal
// fade-in shifts elements by 18px until they appear).
function offsetIn(el, page) {
  let x = 0
  let y = 0
  let n = el
  while (n && n !== page) {
    x += n.offsetLeft
    y += n.offsetTop
    n = n.offsetParent
  }
  return { x, y }
}

// Smooth S-curves with vertical tangents, so y only ever increases.
function buildPath(points) {
  let d = `M ${points[0].x} ${points[0].y}`
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1]
    const b = points[i]
    const k = (b.y - a.y) * 0.55
    d += ` C ${a.x} ${a.y + k}, ${b.x} ${b.y - k}, ${b.x} ${b.y}`
  }
  return d
}

export default function FlightJourney() {
  const layerRef = useRef(null)
  const svgRef = useRef(null)
  const baseRef = useRef(null)
  const flownRef = useRef(null)
  const maskRef = useRef(null)
  const planeRef = useRef(null)
  const dotRef = useRef(null)
  const route = useRef(null) // { total, table, start, end }

  useEffect(() => {
    const layer = layerRef.current
    const page = layer.parentElement
    const root = document.documentElement
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0

    const layout = () => {
      const W = page.clientWidth
      const H = page.offsetHeight
      const hero = page.querySelector('.hero')
      const ticket = page.querySelector('.contact-ticket')
      if (!hero || !ticket || W === 0) return

      // Start where the hero's dotted arc ends (it's hidden on small screens).
      const pageRect = page.getBoundingClientRect()
      const arcEnd = page.querySelector('.arc-dot-end')?.getBoundingClientRect()
      const start =
        arcEnd && arcEnd.width > 0
          ? { x: arcEnd.left + arcEnd.width / 2 - pageRect.left, y: arcEnd.top + arcEnd.height / 2 - pageRect.top }
          : { x: W * 0.93, y: offsetIn(hero, page).y + hero.offsetHeight - 150 } // beside the buttons, clear of the text

      // Fly down the side gutters and only cross the page in the empty space
      // just above each section, so the route stays clear of the text.
      // Then swing in and land just above the contact ticket.
      const narrow = W < 560
      const above = narrow ? 110 : 180 // crossing starts this far above a section
      const below = narrow ? 30 : 40 // ...and ends before its label row
      const gutter = { left: W * 0.07, right: W * 0.93 }
      const lean = W * 0.03 // gutter runs lean inward a little so they aren't ruler-straight
      const points = [start]
      let side = 'right'
      const push = (x, y) => {
        if (y > points[points.length - 1].y + 1) points.push({ x, y })
      }
      ;['#projects', '#about'].forEach((sel) => {
        const el = page.querySelector(sel)
        if (!el) return
        const top = offsetIn(el, page).y
        push(gutter[side] + (side === 'left' ? lean : -lean), top - above)
        side = side === 'left' ? 'right' : 'left'
        push(gutter[side], top + below)
      })
      const contact = page.querySelector('#contact')
      if (contact) push(gutter[side] + (side === 'left' ? lean : -lean), offsetIn(contact, page).y - above * 0.7)
      const t = offsetIn(ticket, page)
      const end = { x: t.x + ticket.offsetWidth / 2, y: t.y - 14 }
      points.push(end)

      const d = buildPath(points)
      const svg = svgRef.current
      svg.setAttribute('width', W)
      svg.setAttribute('height', H)
      svg.setAttribute('viewBox', `0 0 ${W} ${H}`)
      baseRef.current.setAttribute('d', d)
      flownRef.current.setAttribute('d', d)
      maskRef.current.setAttribute('d', d)

      const path = baseRef.current
      const total = path.getTotalLength()
      const table = []
      for (let i = 0; i <= SAMPLES; i++) {
        const len = (total * i) / SAMPLES
        const p = path.getPointAtLength(len)
        table.push({ len, y: p.y })
      }
      route.current = { total, table, start, end }

      dotRef.current.style.transform = `translate(${end.x}px, ${end.y}px)`
      update()
    }

    const update = () => {
      frame = 0
      const r = route.current
      if (!r) return

      if (reduced.matches) {
        root.style.removeProperty('--takeoff')
        return
      }

      const max = root.scrollHeight - window.innerHeight
      const p = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0
      const targetY = r.start.y + p * (r.end.y - r.start.y)

      // Find the length along the path where it reaches targetY.
      const { table } = r
      let lo = 0
      let hi = table.length - 1
      while (lo < hi) {
        const mid = (lo + hi) >> 1
        if (table[mid].y < targetY) lo = mid + 1
        else hi = mid
      }
      let len = table[lo].len
      if (lo > 0) {
        const a = table[lo - 1]
        const b = table[lo]
        const f = b.y === a.y ? 0 : (targetY - a.y) / (b.y - a.y)
        len = a.len + f * (b.len - a.len)
      }

      const path = baseRef.current
      const pt = path.getPointAtLength(len)
      const ahead = path.getPointAtLength(Math.min(len + 1, r.total))
      const behind = path.getPointAtLength(Math.max(len - 1, 0))
      const angle = Math.atan2(ahead.y - behind.y, ahead.x - behind.x)

      planeRef.current.style.transform = `translate(${pt.x}px, ${pt.y}px) translate(-50%, -50%) rotate(${angle}rad)`
      maskRef.current.style.strokeDasharray = `${len} ${r.total}`
      root.style.setProperty('--takeoff', Math.min(window.scrollY / TAKEOFF_PX, 1).toFixed(3))
      dotRef.current.classList.toggle('is-landed', p > 0.98)
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    const observer = new ResizeObserver(layout)
    observer.observe(page)
    layout()
    window.addEventListener('scroll', onScroll, { passive: true })
    reduced.addEventListener('change', update)

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
      reduced.removeEventListener('change', update)
      cancelAnimationFrame(frame)
      root.style.removeProperty('--takeoff')
    }
  }, [])

  return (
    <div className="journey" ref={layerRef} aria-hidden="true">
      <svg ref={svgRef}>
        <defs>
          <mask id="journey-flown" maskUnits="userSpaceOnUse" x="0" y="0" width="100%" height="100%">
            <path ref={maskRef} className="journey-mask" />
          </mask>
        </defs>
        <path ref={baseRef} className="journey-route" />
        <path ref={flownRef} className="journey-route journey-flown" mask="url(#journey-flown)" />
      </svg>
      <span className="journey-dot" ref={dotRef} />
      <span className="journey-plane" ref={planeRef}>
        <PlaneIcon size={24} />
      </span>
    </div>
  )
}
