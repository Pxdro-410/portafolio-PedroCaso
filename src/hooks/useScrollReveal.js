import { useEffect, useRef, useState } from 'react'

/**
 * useScrollReveal
 * Returns a ref and a boolean indicating whether the element
 * has entered the viewport. Used with Framer Motion to trigger
 * scroll-based animations without depending on the viewport variant.
 */
export function useScrollReveal(options = {}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Once visible, stop observing (animate only once)
          observer.unobserve(el)
        }
      },
      {
        threshold: options.threshold ?? 0.15,
        rootMargin: options.rootMargin ?? '0px 0px -50px 0px',
      }
    )

    observer.observe(el)

    return () => observer.disconnect()
  }, [options.threshold, options.rootMargin])

  return [ref, isVisible]
}
