import { EditorialVisual } from './EditorialVisual'
import { SectionBadge } from './SectionBadge'
import { SectionReveal } from './SectionReveal'
import { TextRollButton } from './TextRollButton'

export function About() {
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
