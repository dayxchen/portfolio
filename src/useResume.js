import { useCallback, useState } from 'react'
import { profile } from './data.js'

// Opens the resume in a modal, or in a new tab on phones (they can't show a PDF inside the page reliably).
export default function useResume() {
  const [resumeOpen, setResumeOpen] = useState(false)

  const openResume = useCallback(() => {
    if (window.matchMedia('(max-width: 700px)').matches) {
      window.open(profile.resume, '_blank', 'noopener')
    } else {
      setResumeOpen(true)
    }
  }, [])
  const closeResume = useCallback(() => setResumeOpen(false), [])

  return { resumeOpen, openResume, closeResume }
}
