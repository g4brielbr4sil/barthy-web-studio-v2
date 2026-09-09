import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import {
  isSectionId,
  observedSectionIds,
  type SectionId,
} from '../data/navigation'
import { observeIntersection } from '../lib/intersectionObserver'

const navigationInterruptKeys = new Set([
  'PageUp',
  'PageDown',
  'Home',
  'End',
])

function getVisualTarget(section: SectionId): HTMLElement | null {
  const sectionElement = document.getElementById(section)
  if (!sectionElement) return null

  return (
    sectionElement.querySelector<HTMLElement>('[data-section-anchor]') ??
    sectionElement
  )
}

interface NavigationState {
  activeSection: SectionId
  isPastHero: boolean
  navigateToSection: (section: SectionId) => void
  navigateToForm: () => void
}

interface ObservedSection {
  id: SectionId
  element: HTMLElement
}

export function useActiveSection(): NavigationState {
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
    (
      section: SectionId,
      updateHistory: boolean,
      targetId: string = section,
    ) => {
      const visualTarget =
        targetId === section
          ? getVisualTarget(section)
          : document.getElementById(targetId)
      if (!visualTarget) return

      const reducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches

      finishProgrammaticNavigation()
      pendingSectionRef.current = section
      setActiveSection(section)

      const hash = `#${targetId}`
      if (updateHistory && window.location.hash !== hash) {
        window.history.pushState(null, '', hash)
      }

      const finishInterruptedNavigation = () => {
        finishProgrammaticNavigation()
        window.requestAnimationFrame(syncActiveSectionToViewport)
      }
      let scrollSettleTimeout = 0
      const onPointerInterruption = () => finishInterruptedNavigation()
      const onKeyboardInterruption = (event: KeyboardEvent) => {
        if (navigationInterruptKeys.has(event.key)) {
          finishInterruptedNavigation()
        }
      }
      const onScrollEnd = () => finishProgrammaticNavigation()
      const onProgrammaticScroll = () => {
        window.clearTimeout(scrollSettleTimeout)
        scrollSettleTimeout = window.setTimeout(
          finishProgrammaticNavigation,
          180,
        )
      }

      window.addEventListener('wheel', onPointerInterruption, { passive: true })
      window.addEventListener('touchstart', onPointerInterruption, {
        passive: true,
      })
      window.addEventListener('pointerdown', onPointerInterruption, {
        passive: true,
      })
      window.addEventListener('keydown', onKeyboardInterruption)
      window.addEventListener('scroll', onProgrammaticScroll, {
        passive: true,
      })

      const supportsScrollEnd = 'onscrollend' in window

      if (reducedMotion) {
        navigationTimeoutRef.current = window.setTimeout(
          finishProgrammaticNavigation,
          800,
        )
      } else if (supportsScrollEnd) {
        window.addEventListener('scrollend', onScrollEnd, { once: true })
        navigationTimeoutRef.current = window.setTimeout(
          finishProgrammaticNavigation,
          6000,
        )
      } else {
        navigationTimeoutRef.current = window.setTimeout(
          finishProgrammaticNavigation,
          6000,
        )
      }

      scrollEndCleanupRef.current = () => {
        window.clearTimeout(scrollSettleTimeout)
        window.removeEventListener('wheel', onPointerInterruption)
        window.removeEventListener('touchstart', onPointerInterruption)
        window.removeEventListener('pointerdown', onPointerInterruption)
        window.removeEventListener('keydown', onKeyboardInterruption)
        window.removeEventListener('scroll', onProgrammaticScroll)
        window.removeEventListener('scrollend', onScrollEnd)
      }

      window.requestAnimationFrame(() => {
        if (targetId !== section) {
          visualTarget.focus({ preventScroll: true })
        }
        visualTarget.scrollIntoView({
          behavior: reducedMotion || section === 'inicio' ? 'auto' : 'smooth',
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

  const navigateToForm = useCallback(
    () => scrollToSection('contato', true, 'formulario'),
    [scrollToSection],
  )

  useEffect(() => {
    let locationNavigationFrame = 0

    const navigateFromLocation = () => {
      const hashSection = window.location.hash.slice(1)
      const isFormAnchor = hashSection === 'formulario'
      const isContentAnchor = hashSection === 'conteudo'
      const section = isSectionId(hashSection)
        ? hashSection
        : isFormAnchor
          ? 'contato'
          : 'inicio'
      const targetId =
        isFormAnchor || isContentAnchor ? hashSection : section

      window.cancelAnimationFrame(locationNavigationFrame)
      locationNavigationFrame = window.requestAnimationFrame(() => {
        locationNavigationFrame = window.requestAnimationFrame(() => {
          locationNavigationFrame = 0
          scrollToSection(section, false, targetId)
        })
      })
    }

    navigateFromLocation()
    window.addEventListener('hashchange', navigateFromLocation)
    window.addEventListener('popstate', navigateFromLocation)

    return () => {
      window.cancelAnimationFrame(locationNavigationFrame)
      window.removeEventListener('hashchange', navigateFromLocation)
      window.removeEventListener('popstate', navigateFromLocation)
    }
  }, [scrollToSection])

  useEffect(
    () => () => finishProgrammaticNavigation(),
    [finishProgrammaticNavigation],
  )

  useEffect(() => {
    const sections = observedSectionIds.reduce<ObservedSection[]>(
      (items, id) => {
        const element = document.getElementById(id)
        if (element) items.push({ id, element })
        return items
      },
      [],
    )

    if (typeof globalThis.IntersectionObserver === 'undefined') {
      let animationFrame = 0
      const updateFromScrollPosition = () => {
        animationFrame = 0
        const headerHeight =
          Number.parseFloat(
            getComputedStyle(document.documentElement).getPropertyValue(
              '--site-header-height',
            ),
          ) || 88
        const probe = headerHeight + window.innerHeight * 0.28
        const current =
          [...sections]
            .reverse()
            .find(
              ({ element }) =>
                element.getBoundingClientRect().top <= probe,
            ) ??
          sections[0]

        if (current && !pendingSectionRef.current) {
          setActiveSection(current.id)
        }

        const hero = sections.find(({ id }) => id === 'inicio')?.element
        if (hero) {
          setIsPastHero(hero.getBoundingClientRect().bottom <= probe)
        }
      }

      const requestUpdate = () => {
        window.cancelAnimationFrame(animationFrame)
        animationFrame = window.requestAnimationFrame(updateFromScrollPosition)
      }

      updateFromScrollPosition()
      window.addEventListener('scroll', requestUpdate, { passive: true })
      window.addEventListener('resize', requestUpdate, { passive: true })

      return () => {
        window.cancelAnimationFrame(animationFrame)
        window.removeEventListener('scroll', requestUpdate)
        window.removeEventListener('resize', requestUpdate)
      }
    }

    let animationFrame = 0
    const updateActiveSection = () => {
      animationFrame = 0
      syncActiveSectionToViewport()
    }

    const cleanups = sections.map(({ id, element }) =>
      observeIntersection(element, (entry) => {
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

  return {
    activeSection,
    isPastHero,
    navigateToSection,
    navigateToForm,
  }
}
