# Barthy Web Studio V2

Proposta independente de landing page editorial e cinematográfica para a
Barthy Web Studio. O projeto foi criado do zero e não compartilha repositório,
componentes ou fluxo de publicação com a V1.

## Estado

- Implementação local completa
- Repositório isolado da V1
- Indexação desativada com `noindex, nofollow`
- Nenhum deploy executado
- Nenhuma configuração de DNS, Cloudflare, Hermes ou VPS alterada

## Direção da proposta

| V1 | V2 |
| --- | --- |
| Dark-first | Light-first |
| Técnica e modular | Editorial e cinematográfica |
| Conteúdo aprofundado | Narrativa mais curta |
| Muitos blocos operacionais | Poucos momentos visuais |
| Painéis escuros | Composições claras e amplas |
| Foco em estrutura | Foco em impacto e projetos |

A V2 usa um hero de tela cheia, tipografia em grande escala, espaço negativo,
movimentos internos controlados e três projetos reais como prova de repertório:
Levens, PNQC e Hermes.

## Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS 3.4
- CSS nativo para composição e movimento
- `shaders`
- `lucide-react`

Não foram adicionados router, Three.js, Pixi, GSAP, bibliotecas de UI,
formulário, modal, analytics ou scroll artificial.

## Requisitos

- Node.js 20.19 ou superior
- pnpm 11

## Desenvolvimento

```bash
pnpm install
pnpm dev
```

Abra o endereço local exibido pelo Vite.

## Validação e build

```bash
pnpm typecheck
pnpm build
pnpm preview
```

O artefato de produção é gerado em `dist/`.

## Variáveis de ambiente

Copie `.env.example` para `.env.local` e preencha somente os valores
confirmados:

```dotenv
VITE_BARTHY_WHATSAPP_URL=
VITE_BARTHY_CONTACT_ENDPOINT=
```

### WhatsApp

`VITE_BARTHY_WHATSAPP_URL` deve receber uma URL HTTP ou HTTPS completa e
confirmada. Sem ela, o botão não inventa número nem cria um link inválido. A
interface orienta o visitante a usar o e-mail oficial.

### Endpoint do formulário

`VITE_BARTHY_CONTACT_ENDPOINT` deve receber uma URL HTTP ou HTTPS completa.
Quando configurado, o formulário envia um `POST` com `Content-Type:
application/json` no seguinte formato:

```json
{
  "nome": "Nome da pessoa",
  "whatsapp": "(61) 99999-9999",
  "email": "email@exemplo.com",
  "empresaProjeto": "Nome do projeto",
  "tipoSolucao": "Landing page",
  "mensagem": "Contexto informado pela pessoa.",
  "source": "barthy-web-studio-v2"
}
```

Sem endpoint, nenhum request é disparado, os dados permanecem preenchidos e a
interface não apresenta sucesso falso. Falhas de rede ou respostas não
bem-sucedidas também preservam os campos.

Variáveis `VITE_` são públicas no navegador. Não coloque tokens, chaves ou
outros segredos nesses campos.

## Shader e fallback

O pacote utilizado é `shaders`, com os imports `Shader`, `Swirl`,
`ChromaFlow`, `RadialGradient`, `FlutedGlass` e `FilmGrain` vindos de
`shaders/react`.

A página mantém somente uma instância, carregada de forma assíncrona no hero.
O movimento autônomo possui paletas próprias para os temas claro e escuro. Em
dispositivos com ponteiro fino, o fundo reage ao cursor pela API nativa do
pacote. Em telas de toque, o fundo permanece autônomo e não acompanha gestos.
O canvas é removido quando a aba fica oculta e não é montado quando WebGPU não
está disponível ou quando `prefers-reduced-motion: reduce` está ativo. O fundo
CSS continua visível se o pacote ou o chunk falhar.

Limitação conhecida: a API pública atual do componente `Shader` não expõe uma
propriedade para fixar o DPR em `1.5` no desktop e `1` no mobile. A biblioteca
aplica o próprio limite interno. A mitigação desta proposta é manter um único
canvas, reduzir parâmetros, pausar fora de uso e preservar o fallback estático.
Não foi instalado pacote alternativo.

## Navegação e temas

A barra fixa oferece links diretos para Projetos, Estúdio, Soluções, Processo
e Contato no desktop, com indicação da seção ativa e glassmorphism adaptado ao
tema e ao estado de rolagem. A altura real do Header alimenta o alinhamento das
âncoras. Abaixo de 1024 px, permanecem apenas a navbar superior e o menu móvel
completo, com diálogo, conteúdo externo inerte, bloqueio de rolagem, foco
contido, fechamento por Escape e retorno de foco quando o menu é dispensado.

O tema padrão é claro. A preferência escolhida é persistida no navegador com a
chave `barthy-v2-theme` e aplicada por um script anterior à inicialização do
React para evitar a troca visual durante o carregamento. Os valores aceitos são
somente `light` e `dark`; valores inválidos voltam para o tema claro. A cor da
interface do navegador também acompanha o tema ativo.

## Conteúdo visual

As composições dos projetos são HTML, CSS e ícones, portanto não dependem de
imagens externas. Os espaços editoriais do estúdio possuem placeholders
intencionais até existirem fotografias aprovadas.

Para substituir os placeholders:

1. Adicione os arquivos:
   - `public/images/barthy-studio-small.webp`
   - `public/images/barthy-studio-large.webp`
2. Abra `src/data/projects.ts`.
3. Altere `editorialImages.small.enabled` e
   `editorialImages.large.enabled` para `true`.
4. Revise os textos alternativos antes do build.

### Vídeos futuros

`src/components/ProjectMedia.tsx` já aceita `videoSrc` e `posterSrc`. Nenhum
vídeo é solicitado na versão atual. Quando usados, devem ser curtos,
comprimidos, sem áudio, com poster, `playsInline` e carregamento controlado.
Em preferência por movimento reduzido, somente o poster é exibido.

## Acessibilidade e responsividade

- Um único `h1` e hierarquia semântica de títulos
- Link para pular ao conteúdo
- Menu móvel em diálogo com foco contido, fechamento por Escape e retorno do
  foco ao botão de origem
- Abas com setas, Home e End
- Diagrama progressivo de soluções com três, cinco e oito pontos conectados
- Formulário com labels, erros associados, foco no primeiro campo inválido e
  mensagens anunciadas
- Campo de tipo de solução nativo, com contraste e foco adaptados aos temas
- Alvos interativos com dimensão mínima de 44 px
- Contraste e foco visível
- Conteúdo preservado sem shader
- Movimento reduzido respeitado
- Layout sem rolagem horizontal de 320 a 2560 px

## Estrutura principal

```text
src/
  components/    seções, controles e visuais dos projetos
  data/          navegação, projetos e caminhos editoriais
  hooks/         mídia, visibilidade, horário e movimento
  lib/           contato e eventos locais
  styles/        tokens visuais
  App.tsx        composição da página
  index.css      direção visual e responsividade
public/
  favicon.svg
```

## Publicação futura no Cloudflare Pages

Nenhuma publicação foi feita por este projeto. Para uma integração Git futura:

- Repositório: `g4brielbr4sil/barthy-web-studio-v2`
- Branch: `main`
- Comando de build: `pnpm build`
- Diretório de saída: `dist`
- Versão do Node.js: 20.19 ou superior

Configure as variáveis públicas somente depois que URLs reais forem aprovadas.
Mantenha o projeto separado da produção e do domínio da V1.
