import { ArrowRight } from 'lucide-react'
import type { MouseEventHandler } from 'react'

interface TextRollButtonProps {
  href: string
  children: string
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
      aria-label={children}
      onClick={onClick}
    >
      <span className="text-roll-button__clip" aria-hidden="true">
        <span className="text-roll-button__text text-roll-button__text--primary">
          {children}
        </span>
        <span
          className="text-roll-button__text text-roll-button__text--secondary"
          data-label={children}
        />
      </span>
      <span className="text-roll-button__icon" aria-hidden="true">
        <ArrowRight size={16} strokeWidth={2} />
      </span>
    </a>
  )
}
