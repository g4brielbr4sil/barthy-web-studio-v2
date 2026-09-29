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
 * BWS Digital: real screenshots layered as an editorial case.
 * primary = home, secondary = second page, detail = a cropped UI region.
 */
export interface CompositionVisual {
  kind: 'composition'
  primary: ProjectImage
  secondary: ProjectImage
  detail: ProjectImage
}

/**
 * BWS Sistemas / BWS Automação: one product screen (16:10 artboard).
 * `focus` is the object-position used when the viewport crops on small screens.
 */
export interface ScreenVisual {
  kind: 'screen'
  image: ProjectImage
  focus?: string
}

/**
 * Asset pending: the final screen is still being designed outside this repo.
 * Renders a neutral surface only; never a stand-in interface.
 */
export interface PendingVisual {
  kind: 'pending'
}

export type ProjectVisual = CompositionVisual | ScreenVisual | PendingVisual

export interface Project {
  id: string
  variant: ProjectVariant
  category: string
  title: string
  description: string
  /** Accessible description of the visual (applied once the visual exists). */
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

/** Derived from real screenshots of the Solidariedade em Ação site. */
const solidariedadeImages = {
  home: webpVariants('solidariedade-home', [640, 960, 1440], (width) => Math.round((width * 1077) / 1898)),
  projetos: webpVariants('solidariedade-projetos', [480, 960], (width) => Math.round((width * 1079) / 1890)),
  // Crop of the sign-up form fields only (820×671 region of the original).
  cadastro: webpVariants('solidariedade-cadastro', [400, 800], (width) => Math.round((width * 671) / 820)),
}

/** asset pending: replace with a ScreenVisual when the final artboard arrives. */
const ASSET_PENDING: PendingVisual = { kind: 'pending' }

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
      kind: 'composition',
      primary: solidariedadeImages.home,
      secondary: solidariedadeImages.projetos,
      detail: solidariedadeImages.cadastro,
    },
  },
  {
    id: 'elo',
    variant: 'system',
    category: 'BWS Sistemas',
    title: 'Elo',
    description:
      'Atendimento, contexto e próxima ação reunidos em uma única operação.',
    alt: 'Interface de atendimento multicanal com conversa e contexto operacional do cliente.',
    visual: ASSET_PENDING,
  },
  {
    id: 'fluxo-operacional',
    variant: 'automation',
    category: 'BWS Automação',
    title: 'Fluxo operacional',
    description:
      'Eventos, regras e ações conectados para transformar cada entrada em uma próxima ação acompanhável.',
    alt: 'Fluxo de automação conectando mensagem recebida, regras, tarefas e próxima ação.',
    visual: ASSET_PENDING,
  },
]
