import { useCallback, useEffect, useRef, useState } from 'react'
import {
  observedSectionIds,
  type SectionId,
} from '../data/navigation'
import { observeIntersection } from '../lib/intersectionObserver'

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState<SectionId>('inicio')
  const [isPastHero, setIsPastHero] = useState(false)
  const visibilityRef = useRef(new Map<SectionId, number>())
  const pendingSectionRef = useRef<SectionId | null>(null)
  const navigationTimeoutRef = useRef<number | null>(null)
  const scrollEndCleanupRef = useRef<(() => void) | null>(null)

  const syncActiveSectionToViewport = useCallback(() => {
    if (pendingSectionRef.current) return

    const nextSection = observedSectionIds.reduce<SectionId>(
      (current, id) =>
        (visibilityRef.current.get(id) ?? 0) >
        (visibilityRef.current.get(current) ?? 0)
          ? id
          : current,
      'inicio',
    )

    if ((visibilityRef.current.get(nextSection) ?? 0) > 0) {
      setActiveSection((current) =>
        current === nextSection ? current : nextSection,
      )
    }
  }, [])

  const finishProgrammaticNavigation = useCallback(() => {
    pendingSectionRef.current = null

    if (navigationTimeoutRef.current !== null) {
      window.clearTimeout(navigationTimeoutRef.current)
      navigationTimeoutRef.current = null
    }

    scrollEndCleanupRef.current?.()
    scrollEndCleanupRef.current = null
  }, [])

  const scrollToSection = useCallback(
    (section: SectionId, updateHistory: boolean) => {
      const sectionElement = document.getElementById(section)
      if (!sectionElement) return

      const visualTarget =
        sectionElement.querySelector<HTMLElement>('[data-section-anchor]') ??
        sectionElement
      const reducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches

      finishProgrammaticNavigation()
      pendingSectionRef.current = section
      setActiveSection(section)

      const hash = `#${section}`
      if (updateHistory && window.location.hash !== hash) {
        window.history.pushState(null, '', hash)
      }

      const interruptKeys = new Set([
        'PageUp',
        'PageDown',
        'Home',
        'End',
      ])
      const finishInterruptedNavigation = () => {
        finishProgrammaticNavigation()
        window.requestAnimationFrame(syncActiveSectionToViewport)
      }
      const onPointerInterruption = () => finishInterruptedNavigation()
      const onKeyboardInterruption = (event: KeyboardEvent) => {
        if (interruptKeys.has(event.key)) finishInterruptedNavigation()
      }
      const onScrollEnd = () => finishProgrammaticNavigation()

      window.addEventListener('wheel', onPointerInterruption, { passive: true })
      window.addEventListener('touchstart', onPointerInterruption, {
        passive: true,
      })
      window.addEventListener('pointerdown', onPointerInterruption, {
        passive: true,
      })
      window.addEventListener('keydown', onKeyboardInterruption)

      const supportsScrollEnd =
        'onscrollend' in
        (window as unknown as Record<string, unknown>)

      if (reducedMotion) {
        navigationTimeoutRef.current = window.setTimeout(
          finishProgrammaticNavigation,
          800,
        )
      } else if (supportsScrollEnd) {
        window.addEventListener('scrollend', onScrollEnd, { once: true })
      } else {
        navigationTimeoutRef.current = window.setTimeout(
          finishProgrammaticNavigation,
          1500,
        )
      }

      scrollEndCleanupRef.current = () => {
        window.removeEventListener('wheel', onPointerInterruption)
        window.removeEventListener('touchstart', onPointerInterruption)
        window.removeEventListener('pointerdown', onPointerInterruption)
        window.removeEventListener('keydown', onKeyboardInterruption)
        window.removeEventListener('scrollend', onScrollEnd)
      }

      window.requestAnimationFrame(() => {
        visualTarget.scrollIntoView({
          behavior: reducedMotion ? 'auto' : 'smooth',
          block: 'start',
        })
      })
    },
    [finishProgrammaticNavigation, syncActiveSectionToViewport],
  )

  const navigateToSection = useCallback(
    (section: SectionId) => scrollToSection(section, true),
    [scrollToSection],
  )

  useEffect(() => {
    const navigateFromLocation = () => {
      const hashSection = window.location.hash.slice(1) as SectionId
      const section = observedSectionIds.includes(hashSection)
        ? hashSection
        : 'inicio'

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => scrollToSection(section, false))
      })
    }

    navigateFromLocation()
    window.addEventListener('hashchange', navigateFromLocation)
    window.addEventListener('popstate', navigateFromLocation)

    return () => {
      window.removeEventListener('hashchange', navigateFromLocation)
      window.removeEventListener('popstate', navigateFromLocation)
    }
  }, [scrollToSection])

  useEffect(
    () => () => finishProgrammaticNavigation(),
    [finishProgrammaticNavigation],
  )

  useEffect(() => {
    const sections = observedSectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section))

    let animationFrame = 0
    const updateActiveSection = () => {
      animationFrame = 0
      syncActiveSectionToViewport()
    }

    const cleanups = sections.map((section) =>
      observeIntersection(section, (entry) => {
        const id = entry.target.id as SectionId

        if (id === 'inicio') {
          setIsPastHero(
            !entry.isIntersecting &&
              entry.boundingClientRect.bottom <= window.innerHeight * 0.45,
          )
        }

        visibilityRef.current.set(
          id,
          entry.isIntersecting ? entry.intersectionRatio : 0,
        )

        if (pendingSectionRef.current) return

        window.cancelAnimationFrame(animationFrame)
        animationFrame = window.requestAnimationFrame(updateActiveSection)
      }),
    )

    return () => {
      window.cancelAnimationFrame(animationFrame)
      cleanups.forEach((cleanup) => cleanup())
    }
  }, [syncActiveSectionToViewport])

  return { activeSection, isPastHero, navigateToSection }
}
