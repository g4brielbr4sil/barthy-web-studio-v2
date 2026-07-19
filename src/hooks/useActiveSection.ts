import { useCallback, useEffect, useRef, useState } from 'react'
import {
  observedSectionIds,
  type SectionId,
} from '../data/navigation'

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState<SectionId>('inicio')
  const visibilityRef = useRef(new Map<SectionId, number>())

  const activateSection = useCallback((section: SectionId) => {
    setActiveSection(section)
  }, [])

  useEffect(() => {
    const sections = observedSectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section))

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id as SectionId
          visibilityRef.current.set(
            id,
            entry.isIntersecting ? entry.intersectionRatio : 0,
          )
        })

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
      },
      {
        rootMargin: '-18% 0px -56% 0px',
        threshold: [0, 0.12, 0.3, 0.55, 0.8],
      },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return { activeSection, activateSection }
}
