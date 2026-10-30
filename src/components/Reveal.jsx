import { useEffect, useRef, useState } from 'react'

// Fades its children in the first time they scroll into view.
export default function Reveal({ children, delay = 0, as: Tag = 'div', ...rest }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) {
      setShown(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={`reveal ${shown ? 'is-shown' : ''} ${rest.className ?? ''}`}
      style={{ transitionDelay: `${delay}ms`, ...rest.style }}
      id={rest.id}
    >
      {children}
    </Tag>
  )
}
