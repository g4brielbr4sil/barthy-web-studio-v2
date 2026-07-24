import type { MouseEvent } from 'react'
import {
  navigation,
  type SectionId,
} from '../../data/navigation'

interface DesktopNavigationProps {
  activeSection: SectionId
  onNavigate: (section: SectionId) => void
}
export function DesktopNavigation({
  activeSection,
  onNavigate,
}: DesktopNavigationProps) {
  const navigate = (
    event: MouseEvent<HTMLAnchorElement>,
    section: SectionId,
  ) => {
    event.preventDefault()
    onNavigate(section)
  }

  return (
    <nav className="desktop-nav" aria-label="Navegação principal">
      {navigation.map((item) => (
        <a
          key={item.href}
          href={item.href}
          aria-current={
            activeSection === item.id ? 'location' : undefined
          }
          onClick={(event) => navigate(event, item.id)}
        >
          {item.label}
        </a>
      ))}
    </nav>
  )
}
