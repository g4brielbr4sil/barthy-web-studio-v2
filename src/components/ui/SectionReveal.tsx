import type {
  ElementType,
  HTMLAttributes,
  ReactNode,
} from 'react'

interface SectionRevealProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
  as?: ElementType
}

export function SectionReveal({
  children,
  as: Component = 'div',
  className = '',
  ...props
}: SectionRevealProps) {
  return (
    <Component className={`section-reveal ${className}`} {...props}>
      {children}
    </Component>
  )
}
