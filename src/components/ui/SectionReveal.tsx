import type {
  ElementType,
  HTMLAttributes,
  ReactNode,
} from 'react'
import { useEffect, useRef } from 'react'
import { useVisualCapabilities } from '../../hooks/useVisualCapabilities'
import { observeIntersection } from '../../lib/intersectionObserver'

interface SectionRevealProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
  as?: ElementType
  variant?: RevealVariant
}

export type RevealVariant =
  | 'heading'
  | 'content'
  | 'card'
  | 'list'
  | 'form'
  | 'footer'

type EditorialRevealModule =
  typeof import('../../motion/editorialReveal')

let editorialRevealModule: Promise<EditorialRevealModule | null> | null = null

function loadEditorialReveal(): Promise<EditorialRevealModule | null> {
  editorialRevealModule ??= import('../../motion/editorialReveal').catch(
    () => null,
  )
  return editorialRevealModule
}

export function SectionReveal({
  children,
  as: Component = 'div',
  className = '',
  variant = 'content',
  ...props
}: SectionRevealProps) {
  const rootRef = useRef<HTMLElement>(null)
  const hasRevealedRef = useRef(false)
  const { reducedMotion } = useVisualCapabilities()

  useEffect(() => {
    const root = rootRef.current
    if (!root || hasRevealedRef.current) return

    if (reducedMotion) {
      root.dataset.revealState = 'reduced'
      return
    }

    const explicitTargets = Array.from(
      root.querySelectorAll<HTMLElement>('[data-reveal-item]'),
    )
    const targets = (
      explicitTargets.length > 0
        ? explicitTargets
        : Array.from(root.children)
    ).filter(
      (child): child is HTMLElement => child instanceof HTMLElement,
    )
    if (targets.length === 0) return

    let disposed = false
    let cleanupAnimation: (() => void) | undefined
    let stopObserving: () => void = () => undefined
    let stopFallbackObservation: () => void = () => undefined
    let animationFrame = 0

    if (explicitTargets.length > 0) {
      root.dataset.revealExplicit = 'true'
    }
    root.dataset.revealState = 'pending'

    const finishWithoutMotion = () => {
      if (hasRevealedRef.current) return
      hasRevealedRef.current = true
      root.dataset.revealState = 'complete'
      stopObserving()
      stopFallbackObservation()
    }

    const reveal = () => {
      if (hasRevealedRef.current) return

      hasRevealedRef.current = true
      root.dataset.revealState = 'running'
      stopObserving()
      stopFallbackObservation()

      void loadEditorialReveal()
        .then((module) => {
          if (disposed) return

          if (!module) {
            root.dataset.revealState = 'fallback'
            return
          }

          cleanupAnimation = module.revealEditorialGroup({
            root,
            targets,
            variant,
            coarsePointer: window.matchMedia('(pointer: coarse)').matches,
            onComplete: () => {
              if (!disposed) root.dataset.revealState = 'complete'
            },
            onFailure: () => {
              if (!disposed) root.dataset.revealState = 'fallback'
            },
          })
        })
        .catch(() => {
          if (!disposed) root.dataset.revealState = 'fallback'
        })
    }

    const checkPosition = () => {
      animationFrame = 0
      const rect = root.getBoundingClientRect()
      const nearDocumentEnd =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 8

      if (
        (rect.top <= window.innerHeight * 0.94 && rect.bottom >= 0) ||
        (nearDocumentEnd && rect.top < window.innerHeight)
      ) {
        reveal()
      } else if (rect.bottom < 0) {
        finishWithoutMotion()
      }
    }

    const requestPositionCheck = () => {
      if (animationFrame) return
      animationFrame = window.requestAnimationFrame(checkPosition)
    }

    requestPositionCheck()

    const supportsIntersectionObserver =
      typeof (
        globalThis as typeof globalThis & {
          IntersectionObserver?: unknown
        }
      ).IntersectionObserver === 'function'

    if (supportsIntersectionObserver) {
      stopObserving = observeIntersection(
        root,
        (entry) => {
          if (entry.isIntersecting) {
            reveal()
            return
          }

          if (entry.boundingClientRect.bottom < 0) {
            finishWithoutMotion()
            return
          }

          requestPositionCheck()
        },
        {
          rootMargin: '0px 0px -4% 0px',
          threshold: [0, 0.01],
        },
      )
    } else {
      window.addEventListener('scroll', requestPositionCheck, {
        passive: true,
      })
      window.addEventListener('resize', requestPositionCheck, {
        passive: true,
      })
      stopFallbackObservation = () => {
        window.removeEventListener('scroll', requestPositionCheck)
        window.removeEventListener('resize', requestPositionCheck)
      }
    }

    return () => {
      disposed = true
      window.cancelAnimationFrame(animationFrame)
      stopObserving()
      stopFallbackObservation()
      cleanupAnimation?.()
      delete root.dataset.revealExplicit
      delete root.dataset.revealState
    }
  }, [reducedMotion, variant])

  return (
    <Component
      ref={rootRef}
      className={`section-reveal section-reveal--${variant} ${className}`}
      {...props}
    >
      {children}
    </Component>
  )
}
