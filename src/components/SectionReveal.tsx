import type { ElementType, ReactNode } from 'react'

interface SectionRevealProps {
  children: ReactNode
  as?: ElementType
  className?: string
}

export function SectionReveal({
  children,
  as: Component = 'div',
  className = '',
}: SectionRevealProps) {
  return (
    <Component className={`section-reveal ${className}`}>{children}</Component>
  )
}
