# Checklist de produção da Barthy Web Studio V2

## Conteúdo e operação

- [ ] Confirmar o posicionamento final da operação Barthy Web Studio.
- [ ] Revisar os cases apresentados e as permissões de uso de marca.
- [x] Confirmar o WhatsApp oficial; `VITE_BARTHY_WHATSAPP_URL` é opcional porque o código mantém o mesmo link como fallback público.
- [ ] Confirmar `VITE_BARTHY_CONTACT_ENDPOINT` e o contrato de resposta.
- [x] Definir `VITE_BARTHY_SITE_URL` com o domínio HTTPS definitivo.
- [ ] Confirmar `VITE_BARTHY_OG_IMAGE` ou usar `/og-barthy.svg` no domínio.
- [x] Manter `VITE_BARTHY_ALLOW_INDEXING=false` em preview.
- [ ] Usar `VITE_BARTHY_ALLOW_INDEXING=true` somente na produção definitiva.
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

- [x] Criar ou confirmar o projeto da V2 no Cloudflare Pages.
- [x] Vincular o repositório `g4brielbr4sil/barthy-web-studio-v2`.
- [x] Definir a branch de produção como `main`.
- [ ] Usar `pnpm build`.
- [ ] Usar `dist` como diretório de saída.
- [ ] Configurar Node.js 22.13 ou superior.
- [ ] Cadastrar somente variáveis públicas confirmadas (ver abaixo).
- [ ] Validar os headers publicados.
- [ ] Validar o preview antes de promover produção.
- [ ] Confirmar que o build definitivo gerou canonical, `robots.txt` público e `sitemap.xml` (aguardando a liberação de indexação; canonical/OG já corretos mesmo com noindex).
- [ ] Confirmar que previews continuam com meta e header `noindex, nofollow`.

### Variáveis de produção no Cloudflare Pages

O domínio oficial já está ativo, com `www` e `pages.dev` redirecionando para o
apex:

```env
VITE_BARTHY_WHATSAPP_URL=https://wa.me/5561920002364?text=Ol%C3%A1!%20Conheci%20o%20trabalho%20de%20voc%C3%AAs%20pelo%20site%20da%20*Barthy%20Web%20Studio*%20e%20tenho%20um%20projeto%20em%20mente.%20Poderiam%20me%20orientar%20sobre%20os%20pr%C3%B3ximos%20passos%3F
VITE_BARTHY_SITE_URL=https://barthywebstudio.tech
VITE_BARTHY_ALLOW_INDEXING=false
```

O WhatsApp já funciona sem configuração adicional no Cloudflare Pages: a env
var documenta e permite sobrescrever o endereço, enquanto `src/lib/contact.ts`
usa o canal oficial acima como fallback quando ela está ausente ou inválida.

Para ligar o envio do formulário direto no CRM do Hermes, falta cadastrar:

```env
VITE_BARTHY_CONTACT_ENDPOINT=https://44-199-249-92.sslip.io/api/public/barthy/leads
```

Essa URL nunca é hardcoded no bundle: `src/lib/contact.ts` lê a env var e só
aceita URL absoluta HTTPS. Sem ela, o formulário exibe o aviso de envio
indisponível e mantém o fallback por e-mail, sem simular sucesso.

Nenhum token do Hermes vai para o frontend. O endpoint é público e autoriza pelo
header `Origin`, então `https://barthywebstudio.tech` precisa estar em
`HERMES_PUBLIC_LEAD_ORIGINS` no Hermes antes de qualquer envio real. Sem isso a
resposta é `403`.

Depois de cadastrar a variável, um novo deploy é necessário: variáveis `VITE_`
entram no bundle em tempo de build.

## GitHub

- [ ] Confirmar GitHub Actions aprovado.
- [ ] Adicionar URL do deploy ao repositório.
- [ ] Adicionar description e topics.
- [ ] Criar release da primeira versão pública.
- [ ] Adicionar screenshots ao README.
