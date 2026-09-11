# Status da integração com o Hermes

Domínio oficial: `https://barthywebstudio.tech` (apex; `www` e o `pages.dev` do
projeto redirecionam para ele).

Contrato do lado do Hermes: `hermes-agent/docs/BARTHY_CRM_INTAKE.md`.

## Fluxo

```
Formulário da BWS (https://barthywebstudio.tech)
  → POST HTTPS público, sem token, Content-Type: application/json
  → Hermes valida o header Origin                → 403 se não autorizada
  → Hermes valida o payload (extra="forbid")     → 422 se houver campo extra
  → honeypot preenchido                          → 400
  → rate limit por IP (10 envios / 10 min)       → 429
  → ProspectLead + CommercialActivity + ActionLog
  → 201 {"status": "ok", "lead_id": <id>}
```

O formulário só mostra sucesso quando a resposta é `ok` **e** o corpo confirma
`status: "ok"`. Qualquer outro desfecho vira erro visível, preserva os campos
preenchidos e oferece o fallback por e-mail.

## Código

`src/lib/contact.ts` traduz o formulário para o schema do Hermes em
`buildHermesLeadPayload()`. O backend usa `extra="forbid"`, então os nomes
internos em português (`nome`, `whatsapp`, `empresaProjeto`, `tipoSolucao`,
`mensagem`) nunca saem do navegador: viram
`name`, `phone`, `email`, `company`, `service`, `message`, mais
`source: "barthy-web-studio-v2"` e `honeypot: ""`.

`phone` e `email` são opcionais no schema e as chaves são omitidas quando o
campo está vazio, em vez de enviadas em branco. A interface exige pelo menos um
dos dois para garantir um canal de retorno. O WhatsApp é normalizado para E.164
antes do envio.

`safeHttpUrl()` aceita apenas URL absoluta HTTPS, com HTTP liberado só para
`localhost`, `127.0.0.1` e `[::1]` em desenvolvimento. Nenhuma URL de ambiente é
hardcoded no bundle.

`scripts/verify-contact-contract.mjs` (`pnpm test:contact`, incluído em
`pnpm quality`) verifica o payload, a normalização do telefone, a recusa de
endpoint inseguro e o tratamento de falha do formulário.

## Configuração pendente

`VITE_BARTHY_CONTACT_ENDPOINT` continua vazio no `.env.example` e precisa ser
cadastrado no Cloudflare Pages; o valor exato está em
`docs/PRODUCTION_CHECKLIST.md`. Do lado do Hermes, `HERMES_PUBLIC_LEAD_ORIGINS`
precisa conter `https://barthywebstudio.tech` antes de qualquer envio real, ou a
resposta é `403`.

Nenhum token do Hermes vai para o frontend.

## SEO/indexação

`scripts/generate-seo-files.mjs` falha fechado: `noindex` por padrão, só libera
indexação com `VITE_BARTHY_ALLOW_INDEXING=true` **e** `VITE_BARTHY_SITE_URL`
válida em HTTPS. A indexação permanece fechada por decisão atual.

## Analytics (opcional, desligado por padrão)

O beacon do Cloudflare Web Analytics é injetado em `dist/index.html` somente se
`VITE_BARTHY_CF_ANALYTICS_TOKEN` estiver definida. Vazio (padrão) = nenhum
script de terceiro é adicionado.

## WhatsApp

Sem mudança de código, já com fallback em `getWhatsappUrl()`. Falta só
configurar `VITE_BARTHY_WHATSAPP_URL` no Cloudflare Pages quando for a hora.

## Como validar localmente

```
corepack pnpm@11.9.0 install
corepack pnpm@11.9.0 run quality
```

(`pnpm` puro não está no PATH deste ambiente Windows — use `corepack
pnpm@11.9.0 ...` ou instale `pnpm` globalmente.)
