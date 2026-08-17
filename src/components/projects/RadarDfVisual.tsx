import { MapPin } from 'lucide-react'

export function RadarDfVisual() {
  return (
    <div className="project-visual radardf-visual" aria-hidden="true">
      <span className="radardf-visual__icon">
        <MapPin size={30} />
      </span>
      <span className="radardf-visual__eyebrow">RadarDF</span>
      <strong>Plataforma em construção</strong>
      <small>Vagas do Distrito Federal em um só lugar.</small>
    </div>
  )
}
