// Styled like a boarding pass: main section, perforation, then a stub with the links.
export default function ProjectCard({ project }) {
  const { title, date, kind, image, description, points, tags, links } = project
  return (
    <article className="ticket card">
      <div className="ticket-main">
        {image && (
          <div className="card-image">
            <img src={image} alt={`Screenshot of ${title}`} loading="lazy" />
          </div>
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
