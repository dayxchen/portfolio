import { useEffect, useRef, useState } from 'react'

// Plays once, muted, when the card is mostly in view, then rests on its last frame with a replay button.
// With "reduce motion" on (or if the browser blocks playback) it shows the poster and a play button instead.
function CardVideo({ src, poster, title }) {
  const ref = useRef(null)
  const [status, setStatus] = useState(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'paused' : 'waiting'
  )

  const play = () => {
    const v = ref.current
    if (!v) return
    v.currentTime = 0
    setStatus('playing')
    v.play().catch(() => setStatus('paused'))
  }

  useEffect(() => {
    const v = ref.current
    if (!v || status !== 'waiting') return
    if (!('IntersectionObserver' in window)) {
      setStatus('paused')
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect()
          play()
        }
      },
      { threshold: 0.6 }
    )
    observer.observe(v)
    return () => observer.disconnect()
  }, [status])

  const showButton = status === 'ended' || status === 'paused'

  return (
    <div className="card-image card-video">
      <video
        ref={ref}
        src={src}
        poster={poster}
        muted
        playsInline
        preload="metadata"
        aria-label={`${title} teaser video`}
        onEnded={() => setStatus('ended')}
      />
      {showButton && (
        <button type="button" className="video-btn" onClick={play}>
          <span aria-hidden="true">{status === 'ended' ? '↻' : '▶'}</span>
          {status === 'ended' ? 'Replay' : 'Play teaser'}
        </button>
      )}
    </div>
  )
}

// Styled like a boarding pass: main section, perforation, then a stub with the links.
export default function ProjectCard({ project }) {
  const { title, date, kind, image, video, poster, description, points, tags, links } = project
  return (
    <article className="ticket card">
      <div className="ticket-main">
        {video ? (
          <CardVideo src={video} poster={poster} title={title} />
        ) : (
          image && (
            <div className="card-image">
              <img src={image} alt={`Screenshot of ${title}`} loading="lazy" />
            </div>
          )
        )}
        <div className="card-body">
          <h3>{title}</h3>
          <dl className="ticket-fields">
            <div>
              <dt>Date</dt>
              <dd>{date}</dd>
            </div>
            {kind && (
              <div>
                <dt>Type</dt>
                <dd>{kind}</dd>
              </div>
            )}
          </dl>
          <p>{description}</p>
          {points?.length > 0 && (
            <ul className="points">
              {points.map((p) => <li key={p}>{p}</li>)}
            </ul>
          )}
          <ul className="tags" aria-label="Built with">
            {tags.map((t) => <li key={t}>{t}</li>)}
          </ul>
        </div>
      </div>
      <div className="ticket-stub card-links">
        {links.map((l) => (
          <a key={l.href} href={l.href} target="_blank" rel="noreferrer">
            {l.label} <span aria-hidden="true">→</span>
          </a>
        ))}
      </div>
    </article>
  )
}
