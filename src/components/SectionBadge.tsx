interface SectionBadgeProps {
  number: string
  children: string
}

export function SectionBadge({ number, children }: SectionBadgeProps) {
  return (
    <div className="section-badge" aria-label={`Seção ${number}: ${children}`}>
      <span className="section-badge__number" aria-hidden="true">
        {number}
      </span>
      <span className="section-badge__label">{children}</span>
    </div>
  )
}
