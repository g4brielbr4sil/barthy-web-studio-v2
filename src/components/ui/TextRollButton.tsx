import { ArrowRight } from 'lucide-react'
import type { MouseEventHandler, ReactNode } from 'react'

interface TextRollButtonProps {
  href: string
  children: ReactNode
  variant?: 'navy' | 'terra' | 'outline'
  className?: string
  onClick?: MouseEventHandler<HTMLAnchorElement>
}

export function TextRollButton({
  href,
  children,
  variant = 'navy',
  className = '',
  onClick,
}: TextRollButtonProps) {
  return (
    <a
      className={`text-roll-button text-roll-button--${variant} ${className}`}
      href={href}
      onClick={onClick}
    >
      <span className="text-roll-button__clip">
        <span className="text-roll-button__text">{children}</span>
        <span className="text-roll-button__text" aria-hidden="true">
          {children}
        </span>
      </span>
      <span className="text-roll-button__icon" aria-hidden="true">
        <ArrowRight size={16} strokeWidth={2} />
      </span>
    </a>
  )
}
