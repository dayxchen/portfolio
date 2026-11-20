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

const DOWN = { x: 0, y: 1 }
const unit = (x, y) => {
  const l = Math.hypot(x, y) || 1
  return { x: x / l, y: y / l }
}

// Cubic curves between nodes, each leaving and arriving along its node's
// tangent `t`, so the route bends smoothly through every node. Handles are
// shortened to keep the curve on screen and so y only ever increases.
function buildPath(nodes, W) {
  const lo = W * 0.02
  const hi = W * 0.98
  const reach = (p, dx, h) => {
    if (dx > 0) return Math.max(0, Math.min(h, (hi - p.x) / dx))
    if (dx < 0) return Math.max(0, Math.min(h, (lo - p.x) / dx))
    return h
  }
  let d = `M ${nodes[0].x} ${nodes[0].y}`
  for (let i = 1; i < nodes.length; i++) {
    const a = nodes[i - 1]
    const b = nodes[i]
    const h = Math.hypot(b.x - a.x, b.y - a.y) * 0.39
    let ha = reach(a, a.t.x, h)
    let hb = reach(b, -b.t.x, h)
    const used = a.t.y * ha + b.t.y * hb
    const room = (b.y - a.y) * 0.9
    if (used > room) {
      ha *= room / used
      hb *= room / used
    }
    d += ` C ${a.x + a.t.x * ha} ${a.y + a.t.y * ha}, ${b.x - b.t.x * hb} ${b.y - b.t.y * hb}, ${b.x} ${b.y}`
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

      // Fly down the side gutters and only cross the page in the empty band
      // between sections, banking through wide turns at each end so the route
      // stays clear of the text. Then swing in and land on the contact ticket.
      const narrow = W < 560
      const gutter = { left: W * 0.07, right: W * 0.93 }
      const lean = W * 0.03 // long gutter runs bow inward a little so they aren't ruler-straight
      const R = narrow ? W * 0.1 : Math.min(150, W * 0.11) // turn radius into and out of a crossing
      const band = narrow ? 20 : 30 // a crossing descends from `band` above a section's top to `band` below
      const nodes = [{ ...start, t: DOWN }]
      const last = () => nodes[nodes.length - 1]
      const add = (x, y, t = DOWN) => {
        if (y > last().y + 1) nodes.push({ x, y, t })
      }
      // Run down the gutter on `from`, then turn inward to start a crossing at y.
      const enter = (from, y) => {
        const x = gutter[from]
        const dir = from === 'left' ? 1 : -1
        const prev = last()
        if (Math.abs(prev.x - x) < 1 && y - R - prev.y > 4 * R) add(x + dir * lean, (prev.y + y - R) / 2)
        if (y - R - last().y > R * 0.75) add(x, y - R)
        return { x: x + dir * R, y }
      }
      let side = 'right'
      ;['#projects', '#about'].forEach((sel) => {
        const el = page.querySelector(sel)
        if (!el) return
        const top = offsetIn(el, page).y
        const to = side === 'left' ? 'right' : 'left'
        const a = enter(side, top - band)
        const b = { x: gutter[to] + (to === 'left' ? R : -R), y: top + band }
        const u = unit(b.x - a.x, b.y - a.y)
        add(a.x, a.y, u)
        add(b.x, b.y, u)
        add(gutter[to], b.y + R)
        side = to
      })
      const t = offsetIn(ticket, page)
      const end = { x: t.x + ticket.offsetWidth / 2, y: t.y - 14 }
      const contact = page.querySelector('#contact')
      if (contact) {
        const a = enter(side, offsetIn(contact, page).y - band)
        add(a.x, a.y, unit(end.x - a.x, end.y - a.y))
      }
      // Come in on a slanted approach rather than dropping straight down.
      nodes.push({ ...end, t: unit(Math.sign(end.x - last().x) * 0.8, 1) })

      const d = buildPath(nodes, W)
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
