# Checklist de produção da Barthy Web Studio V2

Este documento registra pendências de publicação. Nenhuma ação externa foi
executada nesta rodada.

## Bloqueadores antes de publicar

- [ ] Confirmar `VITE_BARTHY_CONTACT_ENDPOINT` e seu contrato de resposta.
- [ ] Confirmar `VITE_BARTHY_WHATSAPP_URL` sem inventar número.
- [ ] Validar o formulário em homologação sem dados pessoais reais.
- [ ] Adicionar fotografias aprovadas do estúdio e revisar textos alternativos.
- [ ] Adicionar vídeos somente com poster, compressão e aprovação.
- [ ] Confirmar imagem social, título e descrição finais.
- [ ] Definir domínio ou subdomínio separado da V1.
- [ ] Comparar V1 e V2 no preview antes de qualquer troca pública.
- [ ] Decidir se o repositório deve permanecer público.
- [ ] Definir analytics e aviso de privacidade somente após aprovação.
- [ ] Remover `noindex, nofollow` apenas quando a publicação for autorizada.

## Compatibilidade e acessibilidade

- [ ] Testar em Android físico com Chrome e economia de bateria.
- [ ] Testar em iPhone/iPad com Safari.
- [ ] Testar Firefox desktop.
- [ ] Testar navegação completa por teclado.
- [ ] Testar leitor de tela em Header, Soluções, formulário e Footer.
- [ ] Revisar `prefers-reduced-motion: reduce`.
- [ ] Revisar sem WebGPU e sem aceleração gráfica.
- [ ] Revisar sem `backdrop-filter`.
- [ ] Confirmar ausência de rolagem horizontal entre 320 px e 2560 px.

## Cloudflare Pages

- [ ] Configurar integração Git com `main` somente após aprovação.
- [ ] Usar `pnpm build` e diretório `dist`.
- [ ] Fixar Node.js 22.13 ou superior.
- [ ] Cadastrar apenas variáveis públicas confirmadas.
- [ ] Conferir os headers publicados a partir de `public/_headers`.
- [ ] Confirmar o fallback de SPA fornecido pelo Pages.
- [ ] Validar preview automático antes de promover qualquer versão.

## Estado atual

- Endpoint do formulário: não configurado no repositório.
- WhatsApp: não configurado no repositório.
- Indexação: bloqueada por meta tag e header.
- Deploy manual: não executado.
- DNS, Cloudflare, Hermes, VPS e backend: não alterados.
