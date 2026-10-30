import { PlaneIcon } from './Icons.jsx'

// "✈ 01 PROJECTS - - - - -" row. The dashed route draws in when its Reveal parent shows.
export default function SectionLabel({ number, children }) {
  return (
    <div className="section-label">
      <span className="sl-plane"><PlaneIcon size={15} /></span>
      <span className="sl-num">{number}</span>
      <span className="sl-text">{children}</span>
      <span className="sl-route" aria-hidden="true" />
    </div>
  )
}
