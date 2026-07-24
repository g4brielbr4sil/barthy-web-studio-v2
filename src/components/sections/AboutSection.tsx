import { EditorialVisual } from '../editorial/EditorialVisual'
import { SectionBadge } from '../ui/SectionBadge'
import { SectionReveal } from '../ui/SectionReveal'
import { TextRollButton } from '../ui/TextRollButton'

export function AboutSection() {
  return (
    <section id="estudio" className="about section-shell" aria-labelledby="about-title">
      <div className="stage">
        <SectionReveal className="section-heading">
          <SectionBadge number="01">Conheça a Barthy</SectionBadge>
          <h2 id="about-title">
            Estratégia, design e tecnologia trabalhando como uma única estrutura.
          </h2>
        </SectionReveal>

        <div className="about__composition">
          <div className="about__visual about__visual--small">
            <EditorialVisual size="small" />
          </div>

          <SectionReveal className="about__copy">
            <p>
              Criamos páginas, sistemas e fluxos digitais para empresas e
              profissionais que precisam apresentar melhor seu trabalho,
              organizar o atendimento e transformar processos em experiências
              mais claras.
            </p>
            <TextRollButton
              href="#solucoes"
              source="about"
              variant="outline"
            >
              Conhecer o estúdio
            </TextRollButton>
          </SectionReveal>

          <div className="about__visual about__visual--large">
            <EditorialVisual size="large" />
          </div>
        </div>
      </div>
    </section>
  )
}
