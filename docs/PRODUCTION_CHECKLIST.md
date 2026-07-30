# Checklist de produção da Barthy Web Studio V2

## Conteúdo e operação

- [ ] Confirmar o posicionamento final da operação Barthy Web Studio.
- [ ] Revisar os cases apresentados e as permissões de uso de marca.
- [ ] Confirmar `VITE_BARTHY_WHATSAPP_URL`.
- [ ] Confirmar `VITE_BARTHY_CONTACT_ENDPOINT` e o contrato de resposta.
- [ ] Validar o formulário sem dados pessoais reais.
- [ ] Adicionar fotografias e vídeos somente após aprovação.
- [ ] Revisar título, descrição e imagem social.

## Screenshots para portfólio

- [ ] Capturar Hero em desktop.
- [ ] Capturar Hero em mobile.
- [ ] Capturar seção de soluções.
- [ ] Capturar cases.
- [ ] Capturar formulário sem dados pessoais.
- [ ] Exportar versões WebP otimizadas.
- [ ] Adicionar textos alternativos.

## Compatibilidade e acessibilidade

- [ ] Executar `pnpm audit:a11y`.
- [ ] Executar `pnpm test:responsive`.
- [ ] Testar Android físico.
- [ ] Testar Safari em iPhone ou iPad.
- [ ] Testar Firefox desktop.
- [ ] Testar navegação completa por teclado.
- [ ] Revisar leitor de tela.
- [ ] Revisar `prefers-reduced-motion`.
- [ ] Revisar ausência de WebGPU.
- [ ] Revisar ausência de `backdrop-filter`.
- [ ] Confirmar ausência de overflow horizontal.

## Cloudflare Pages

- [ ] Criar ou confirmar o projeto da V2 no Cloudflare Pages.
- [ ] Vincular o repositório `g4brielbr4sil/barthy-web-studio-v2`.
- [ ] Definir a branch de produção como `main`.
- [ ] Usar `pnpm build`.
- [ ] Usar `dist` como diretório de saída.
- [ ] Configurar Node.js 20.19 ou superior.
- [ ] Cadastrar somente variáveis públicas confirmadas.
- [ ] Validar os headers publicados.
- [ ] Validar o preview antes de promover produção.
- [ ] Remover `noindex, nofollow` somente depois da publicação definitiva.

## GitHub

- [ ] Confirmar GitHub Actions aprovado.
- [ ] Adicionar URL do deploy ao repositório.
- [ ] Adicionar description e topics.
- [ ] Criar release da primeira versão pública.
- [ ] Adicionar screenshots ao README.
