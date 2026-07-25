import {
  useLayoutEffect,
  useRef,
  type RefObject,
} from 'react'

export function useHeaderHeight<T extends HTMLElement>(): RefObject<T> {
  const elementRef = useRef<T>(null)

  useLayoutEffect(() => {
    const element = elementRef.current
    if (!element) return

    let animationFrame = 0
    const updateHeaderHeight = () => {
      animationFrame = 0
      const height = Math.ceil(element.getBoundingClientRect().height)
      document.documentElement.style.setProperty(
        '--site-header-height',
        `${height}px`,
      )
    }

    updateHeaderHeight()

    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', updateHeaderHeight, { passive: true })
      return () => {
        window.removeEventListener('resize', updateHeaderHeight)
        document.documentElement.style.removeProperty('--site-header-height')
      }
    }

    const observer = new ResizeObserver(() => {
      window.cancelAnimationFrame(animationFrame)
      animationFrame = window.requestAnimationFrame(updateHeaderHeight)
    })
    observer.observe(element, { box: 'border-box' })

    return () => {
      window.cancelAnimationFrame(animationFrame)
      observer.disconnect()
      document.documentElement.style.removeProperty('--site-header-height')
    }
  }, [])

  return elementRef
}
