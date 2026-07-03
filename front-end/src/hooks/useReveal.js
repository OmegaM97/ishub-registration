import { useEffect, useRef } from 'react'

/**
 * Adds the "is-visible" class to an element once it scrolls into view.
 * Pair with the .reveal CSS class defined in index.css.
 */
export default function useReveal({ threshold = 0.15 } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        node.classList.add('is-visible')
        observer.unobserve(node)
      }
    }, { threshold })

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold])

  return ref
}
