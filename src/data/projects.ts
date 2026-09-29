export type ProjectVariant = 'digital' | 'system' | 'automation'

export interface ProjectImage {
  /** Largest variant; also the `src` fallback. */
  src: string
  /** `url widthw` candidates, smallest first. */
  srcSet: string
  /** Intrinsic size of `src`, used for width/height to reserve space. */
  width: number
  height: number
}

/**
 * Region of the screen kept on small viewports, as fractions of the image:
 * left edge `x`, top edge `y` and visible width `w`. The layer's own aspect
 * ratio decides the visible height. Crops a real screen; never a new one.
 */
export interface ScreenCrop {
  x: number
  y: number
  w: number
}

export interface ProjectScreen {
  image: ProjectImage
  /** `sizes` for this layer, matching the variant's layout at each breakpoint. */
  sizes: string
  mobileCrop?: ScreenCrop
}

/**
 * Three real screens composed in depth: [protagonist, second, third].
 * Each variant positions the layers its own way (see projects.css).
 */
export interface LayeredVisual {
  kind: 'layered'
  screens: [ProjectScreen, ProjectScreen, ProjectScreen]
}

export type ProjectVisual = LayeredVisual

export interface Project {
  id: string
  variant: ProjectVariant
  category: string
  title: string
  description: string
  /** One accessible description for the whole composition. */
  alt: string
  visual: ProjectVisual
}

const projectImages = '/images/projects'

function webpVariants(name: string, widths: number[], height: (width: number) => number): ProjectImage {
  const largest = widths[widths.length - 1]
  return {
    src: `${projectImages}/${name}-${largest}.webp`,
    srcSet: widths.map((width) => `${projectImages}/${name}-${width}.webp ${width}w`).join(', '),
    width: largest,
    height: height(largest),
  }
}

/** Product frames are 1600×1000 artboards (16:10). */
const screenHeight = (width: number) => Math.round((width * 10) / 16)

/** Derived from real screenshots of the Solidariedade em Ação site. */
const solidariedade = {
  home: webpVariants('solidariedade-home', [640, 960, 1440], (width) => Math.round((width * 1077) / 1898)),
  projetos: webpVariants('solidariedade-projetos', [480, 960], (width) => Math.round((width * 1079) / 1890)),
  // Crop of the sign-up form fields only (820×671 region of the original).
  cadastro: webpVariants('solidariedade-cadastro', [400, 800], (width) => Math.round((width * 671) / 820)),
}

/** Final Elo screens (Projetos Final.dc.html · #sys-01..03). */
const elo = {
  atendimento: webpVariants('elo-atendimento', [640, 1024, 1440], screenHeight),
  negocios: webpVariants('elo-negocios', [560, 960], screenHeight),
  financeiro: webpVariants('elo-financeiro', [560, 960], screenHeight),
}

/** Final automation screens (Projetos Final.dc.html · #aut-01..03). */
const automacao = {
  execucao: webpVariants('automacao-execucao', [640, 1024, 1440], screenHeight),
  builder: webpVariants('automacao-builder', [560, 960], screenHeight),
  monitoramento: webpVariants('automacao-monitoramento', [560, 960], screenHeight),
}

export const projects: Project[] = [
  {
    id: 'solidariedade-em-acao',
    variant: 'digital',
    category: 'BWS Digital',
    title: 'Solidariedade em Ação',
    description:
      'Uma experiência web criada para apresentar propósito e iniciativas, conduzindo visitantes até a participação.',
    alt: 'Interface do site Solidariedade em Ação: página inicial, página de projetos e formulário de voluntariado.',
    visual: {
      kind: 'layered',
      screens: [
        { image: solidariedade.home, sizes: '(max-width: 767px) 82vw, (max-width: 1179px) 70vw, 660px' },
        { image: solidariedade.projetos, sizes: '(max-width: 767px) 72vw, (max-width: 1179px) 56vw, 520px' },
        { image: solidariedade.cadastro, sizes: '(max-width: 767px) 52vw, (max-width: 1179px) 30vw, 300px' },
      ],
    },
  },
  {
    id: 'elo',
    variant: 'system',
    category: 'BWS Sistemas',
    title: 'Elo',
    description:
      'Atendimento, contexto e próxima ação reunidos em uma única operação.',
    alt: 'Interface de atendimento, CRM e gestão financeira do Elo.',
    visual: {
      kind: 'layered',
      screens: [
        {
          image: elo.atendimento,
          sizes: '(max-width: 767px) 150vw, (max-width: 899px) 72vw, (max-width: 1179px) 36vw, 480px',
          // Conversation, client context and the next action.
          mobileCrop: { x: 0.44, y: 0, w: 0.56 },
        },
        {
          image: elo.negocios,
          sizes: '(max-width: 767px) 110vw, (max-width: 899px) 68vw, (max-width: 1179px) 34vw, 450px',
          // Pipeline columns and deal cards.
          mobileCrop: { x: 0.14, y: 0, w: 0.56 },
        },
        {
          image: elo.financeiro,
          sizes: '(max-width: 767px) 110vw, (max-width: 899px) 68vw, (max-width: 1179px) 34vw, 450px',
          // Revenue summary cards and the receivables table.
          mobileCrop: { x: 0.14, y: 0, w: 0.64 },
        },
      ],
    },
  },
  {
    id: 'fluxo-operacional',
    variant: 'automation',
    category: 'BWS Automação',
    title: 'Fluxo operacional',
    description:
      'Eventos, regras e ações conectados para transformar cada entrada em uma próxima ação acompanhável.',
    alt: 'Interfaces de execução, construção e monitoramento de fluxos automatizados.',
    visual: {
      kind: 'layered',
      screens: [
        {
          image: automacao.execucao,
          sizes: '(max-width: 767px) 135vw, (max-width: 899px) 68vw, (max-width: 1179px) 34vw, 460px',
          // Node chain and the live execution trace.
          mobileCrop: { x: 0.31, y: 0, w: 0.69 },
        },
        {
          image: automacao.builder,
          sizes: '(max-width: 767px) 110vw, (max-width: 899px) 58vw, (max-width: 1179px) 30vw, 400px',
          // Builder canvas with the flow being edited.
          mobileCrop: { x: 0.3, y: 0.03, w: 0.5 },
        },
        {
          image: automacao.monitoramento,
          sizes: '(max-width: 767px) 110vw, (max-width: 899px) 54vw, (max-width: 1179px) 28vw, 380px',
          // Execution counters, automations and their status.
          mobileCrop: { x: 0, y: 0, w: 0.62 },
        },
      ],
    },
  },
]
