import type { MouseEventHandler } from 'react'
import { BrandMark } from './BrandMark'

interface BrandLockupProps {
  compact?: boolean
  inverse?: boolean
  onClick?: MouseEventHandler<HTMLAnchorElement>
}

export function BrandLockup({
  compact = false,
  inverse = false,
  onClick,
}: BrandLockupProps) {
  return (
    <a
      className={`brand ${inverse ? 'brand--inverse' : ''}`}
      href="#inicio"
      aria-label="Barthy Web Studio, voltar ao início"
      onClick={onClick}
    >
      <BrandMark />
      <span className="brand__name">
        <strong>Barthy</strong>
        {!compact && (
          <>
            <span className="brand__web">Web</span>
            <span className="brand__studio">Studio</span>
          </>
        )}
      </span>
    </a>
  )
}
