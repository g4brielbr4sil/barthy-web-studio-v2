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
    const writeHeaderHeight = (height: number) => {
      animationFrame = 0
      document.documentElement.style.setProperty(
        '--site-header-height',
        `${Math.ceil(height)}px`,
      )
    }

    if (typeof ResizeObserver === 'undefined') {
      const measureHeaderHeight = () => {
        window.cancelAnimationFrame(animationFrame)
        animationFrame = window.requestAnimationFrame(() => {
          writeHeaderHeight(element.getBoundingClientRect().height)
        })
      }

      measureHeaderHeight()
      window.addEventListener('resize', measureHeaderHeight, { passive: true })
      return () => {
        window.cancelAnimationFrame(animationFrame)
        window.removeEventListener('resize', measureHeaderHeight)
        document.documentElement.style.removeProperty('--site-header-height')
      }
    }

    const observer = new ResizeObserver(([entry]) => {
      const borderBox = Array.isArray(entry.borderBoxSize)
        ? entry.borderBoxSize[0]
        : entry.borderBoxSize
      const height =
        borderBox?.blockSize ?? element.getBoundingClientRect().height

      window.cancelAnimationFrame(animationFrame)
      animationFrame = window.requestAnimationFrame(() => {
        writeHeaderHeight(height)
      })
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
