# Estabilização técnica pós-lançamento

## Itens corrigidos nesta rodada

- Navegação inicial sem hash preserva a posição natural ou restaurada pelo navegador. Hashes válidos, menu, formulário e histórico continuam usando a navegação programática existente.
- Gestos de roda, toque ou ponteiro cancelam uma navegação de localização ainda pendente antes que `scrollIntoView()` seja executado.
- O shader só é importado depois que `navigator.gpu.requestAdapter()` confirma um adaptador compatível. Ambientes incompatíveis permanecem no fallback já existente.
- As três imagens PNQC mantêm os arquivos originais e recebem variantes responsivas de 480, 960 e 1440 pixels.
- O relógio mantém o elemento `time`, mas expõe a hora e “em Brasília” como conteúdo semântico, sem `aria-label` proibido.
- A altura do header usa o `borderBoxSize` entregue pelo `ResizeObserver`, evitando uma leitura geométrica síncrona no caminho normal.
- O build gera CSP com hashes dos scripts inline e com a origem HTTPS configurada do Hermes. Também publica HSTS, COOP e os headers defensivos já existentes.
- `llms.txt` agora tem título e links somente para destinos públicos existentes.

## Decisões conscientes

### Trusted Types

`require-trusted-types-for 'script'` não foi habilitado nesta rodada. A página usa React, um shader de terceiros e Cloudflare Web Analytics opcional. Sem uma execução de produção em modo report-only que cubra essas três superfícies, impor Trusted Types poderia bloquear um sink usado por dependência externa. A CSP já restringe scripts por origem e hash; Trusted Types deve ser validado separadamente antes de enforcement.

### Shader e CSP

O aviso `This environment does not allow eval - using default writer as fallback` permanece conhecido e não bloqueante. O shader funciona com o writer alternativo da própria biblioteca; `unsafe-eval` não deve ser adicionado à CSP para ocultar esse aviso.

### Contraste

Os alertas de contraste do Lighthouse permanecem pendentes para uma rodada visual específica. Nenhum token, foreground, background, borda, opacidade, terracota, laranja ou tema foi alterado, preservando a identidade aprovada. A futura correção precisa validar conjuntamente texto secundário, badges, controles e estados nos temas claro e escuro.

### LCP do Hero

O atraso observado está ligado principalmente ao reveal intencional do título: as duas linhas usam `headline-in` por 680 ms, com atrasos de 260 ms e 360 ms. Remover ou antecipar perceptivelmente essa sequência mudaria a experiência aprovada. Como não foi identificada otimização invisível de risco baixo, o timing, o texto, o layout e o shader foram preservados.

### Itens externos ou de baixo impacto

Não foram alterados o TTL e o JavaScript do beacon da Cloudflare, source maps, tamanho total do DOM, CSS inicial ou preconnect. Esses pontos são externos, já pequenos ou não possuem candidato comprovadamente útil nesta página.

### SEO e Search Console

Canonical, metadata, robots, sitemap, headings e estrutura editorial foram preservados. A amostra atual do Search Console não justifica mudança de conteúdo ou novas páginas.
