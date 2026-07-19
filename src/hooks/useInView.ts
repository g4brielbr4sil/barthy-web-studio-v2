import { useEffect, useRef, useState, type RefObject } from 'react'

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

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(Boolean(entry?.isIntersecting)),
      { root, rootMargin, threshold },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [root, rootMargin, threshold])

  return { ref, isInView }
}
