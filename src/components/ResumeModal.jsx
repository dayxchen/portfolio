import { useEffect, useRef } from 'react'
import { profile } from '../data.js'

export default function ResumeModal({ open, onClose }) {
  const closeRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const previous = document.activeElement
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      previous?.focus?.()
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label="Resume" onClick={onClose}>
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <div className="modal-bar">
          <span className="modal-title">Resume</span>
          <div className="modal-actions">
            <a className="btn btn-small" href={profile.resume} download="Davin-Chen-Resume.pdf">Download PDF</a>
            <button ref={closeRef} type="button" className="btn btn-small" onClick={onClose}>
              Close <span aria-hidden="true">✕</span>
            </button>
          </div>
        </div>
        <iframe className="modal-pdf" src={`${profile.resume}#view=FitH`} title="Davin Chen resume" />
      </div>
    </div>
  )
}
