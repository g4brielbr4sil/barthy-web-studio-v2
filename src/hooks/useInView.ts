import { useEffect, useRef, useState, type RefObject } from 'react'
import { observeIntersection } from '../lib/intersectionObserver'

export function useInView<T extends Element>(
  options: IntersectionObserverInit = {},
): { ref: RefObject<T>; isInView: boolean } {
  const ref = useRef<T>(null)
  const [isInView, setIsInView] = useState(false)
  const { root = null, rootMargin = '0px', threshold = 0 } = options

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (!('IntersectionObserver' in window)) {
      setIsInView(true)
      return
    }

    return observeIntersection(node, (entry) => {
      const minimumRatio = Array.isArray(threshold)
        ? Math.min(...threshold)
        : threshold
      setIsInView(
        entry.isIntersecting && entry.intersectionRatio >= minimumRatio,
      )
    })
  }, [root, rootMargin, threshold])

  return { ref, isInView }
}
