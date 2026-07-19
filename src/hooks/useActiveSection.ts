import { useCallback, useEffect, useRef, useState } from 'react'
import {
  observedSectionIds,
  type SectionId,
} from '../data/navigation'
import { observeIntersection } from '../lib/intersectionObserver'

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState<SectionId>('inicio')
  const visibilityRef = useRef(new Map<SectionId, number>())

  const navigateToSection = useCallback((section: SectionId) => {
    const target = document.getElementById(section)
    if (!target) return

    const hash = `#${section}`
    if (window.location.hash !== hash) {
      window.history.pushState(null, '', hash)
    }

    setActiveSection(section)
    target.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth',
      block: 'start',
    })
  }, [])

  useEffect(() => {
    const navigateFromLocation = () => {
      const section = window.location.hash.slice(1) as SectionId
      if (!observedSectionIds.includes(section)) return

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          const target = document.getElementById(section)
          if (!target) return

          setActiveSection(section)
          target.scrollIntoView({
            behavior: window.matchMedia(
              '(prefers-reduced-motion: reduce)',
            ).matches
              ? 'auto'
              : 'smooth',
            block: 'start',
          })
        })
      })
    }

    navigateFromLocation()
    window.addEventListener('hashchange', navigateFromLocation)
    window.addEventListener('popstate', navigateFromLocation)

    return () => {
      window.removeEventListener('hashchange', navigateFromLocation)
      window.removeEventListener('popstate', navigateFromLocation)
    }
  }, [])

  useEffect(() => {
    const sections = observedSectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section))

    let animationFrame = 0
    const updateActiveSection = () => {
      animationFrame = 0
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
    }

    const cleanups = sections.map((section) =>
      observeIntersection(section, (entry) => {
        const id = entry.target.id as SectionId
        visibilityRef.current.set(
          id,
          entry.isIntersecting ? entry.intersectionRatio : 0,
        )
        window.cancelAnimationFrame(animationFrame)
        animationFrame = window.requestAnimationFrame(updateActiveSection)
      }),
    )

    return () => {
      window.cancelAnimationFrame(animationFrame)
      cleanups.forEach((cleanup) => cleanup())
    }
  }, [])

  return { activeSection, navigateToSection }
}
