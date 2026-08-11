# Status da integração com o Hermes — 2026-08-11

Contexto completo (auditoria da BWS, funil de receita, fila de próximas
ações) está em `hermes-agent/docs/HANDOFF_2026-08-11.md`. Este arquivo cobre
só o que mudou neste repositório, no branch local
`p0/hermes-integration-local` (criado a partir de `origin/main` @ `ceb8d31`,
2 commits, nada enviado ao remoto).

## O que foi corrigido

O formulário de contato (`src/components/contact/ContactForm.tsx`) enviava
campos em português (`nome`, `whatsapp`, `empresaProjeto`, `tipoSolucao`,
`mensagem`). O endpoint público do Hermes (`POST /api/public/barthy/leads`)
usa `extra="forbid"` e espera campos em inglês
(`name`, `phone`, `company`, `service`, `message`, `source`, `honeypot`) —
o payload antigo seria rejeitado com HTTP 422.

`src/lib/contact.ts` agora exporta `buildHermesLeadPayload()`, que faz essa
tradução antes do envio. `ContactForm.tsx` usa essa função no `onSubmit`.

**`VITE_BARTHY_CONTACT_ENDPOINT` continua vazio no `.env.example`** — apontar
para a URL real do Hermes em produção
(`https://44-199-249-92.sslip.io/api/public/barthy/leads`) é uma decisão que
fica para quando você decidir ligar esse canal (ver fila de prioridades no
handoff principal).

## Analytics (opcional, desligado por padrão)

`scripts/generate-seo-files.mjs` agora injeta o beacon do Cloudflare Web
Analytics no `dist/index.html` **somente se** `VITE_BARTHY_CF_ANALYTICS_TOKEN`
estiver definida. Vazio (padrão) = nenhum script de terceiro é adicionado.
Para ativar: Cloudflare dashboard → Analytics → Web Analytics → Add site →
copiar o token → configurar como env var no Cloudflare Pages.

## SEO/noindex

Revisado, nenhuma correção necessária — `generate-seo-files.mjs` já falha
fechado corretamente (`noindex` por padrão, só libera indexação com
`VITE_BARTHY_ALLOW_INDEXING=true` **e** `VITE_BARTHY_SITE_URL` válida em
HTTPS). Falta só configurar essas duas env vars em produção quando o domínio
estiver definido.

## WhatsApp

Sem mudança de código — já é seguro e já tem fallback (`getWhatsappUrl()` em
`src/lib/contact.ts`). Falta só configurar `VITE_BARTHY_WHATSAPP_URL` no
Cloudflare Pages com o link real (`https://wa.me/55DDDNUMERO`).

## Mobile — PR #22 (`fix/lp-mobile-stability`)

Esse PR foi aberto por você em 2026-08-08 e fechado sem merge, com a nota
"Não fazer merge antes da validação visual humana". Hoje eu testei o branch
inteiro numa worktree isolada (`pnpm install`, `typecheck`, `build`,
`audit:content`, `audit:a11y`, `test:responsive`, `audit:seo`) — **tudo passa**
e o branch está `MERGEABLE` contra o `main` atual. Não fiz merge porque a
validação pendente é visual, não técnica. Está pronto para você revisar
quando quiser.

## Como validar tudo isso localmente

```
corepack pnpm@11.9.0 install
corepack pnpm@11.9.0 run typecheck
corepack pnpm@11.9.0 run build
corepack pnpm@11.9.0 run audit:content
corepack pnpm@11.9.0 run audit:seo
corepack pnpm@11.9.0 run test:responsive
```

(`pnpm` puro não está no PATH deste ambiente Windows — use `corepack
pnpm@11.9.0 ...` ou instale `pnpm` globalmente.)
