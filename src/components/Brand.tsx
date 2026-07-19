interface BrandProps {
  compact?: boolean
  inverse?: boolean
}

export function Brand({ compact = false, inverse = false }: BrandProps) {
  return (
    <a
      className={`brand ${inverse ? 'brand--inverse' : ''}`}
      href="#inicio"
      aria-label="Barthy Web Studio, voltar ao início"
    >
      <img
        className="brand__mark"
        src="/favicon.svg"
        width="36"
        height="36"
        alt=""
      />
      <span className="brand__name">
        Barthy
        {!compact && <span> Web Studio</span>}
      </span>
    </a>
  )
}
