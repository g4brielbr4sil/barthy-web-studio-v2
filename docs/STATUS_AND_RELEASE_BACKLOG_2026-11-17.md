# Barthy Web Studio V2: checkpoint de 17/11/2026

## Estado verificado pelo repositório
- Repositório público do site institucional V2. Antes desta nota, último commit observado: 0e50027 (12/10/2026).
- README existente descreve React/TypeScript/Vite, integração configurável de briefing, controles de acessibilidade e qualidade, e fluxo de Cloudflare Pages.
- Nesta auditoria **não foram executados build, testes de navegador, acesso ao site público, envio de formulário ou deploy**. Não atribuir status atual de produção com base apenas em um README.

## Fila de retomada, sem criar funcionalidades desnecessárias
1. Validar site e formulários reais em ambiente autorizado: estados de erro, fallback, contatos, prevenção de falso sucesso, acessibilidade por teclado, dispositivos móveis e redução de movimento.
2. Conferir domínio, Search Console, sitemap, robots, SEO/Open Graph e Analytics consentido; registrar apenas quando verificável.
3. Inspecionar integração com Hermes por ambiente e permissões, sem inserir segredos em variáveis VITE_ ou em arquivos rastreados.
4. Atualizar portfólio/cases somente com autorização e fatos: demonstração não equivale a contrato, lead não equivale a venda.
5. Não refazer a identidade visual ou abrir novo produto sem problema validado e prioridade de negócio.

## Separação de estados
A V1 (barthy-web-studio) é repositório legado. BWS Flow é conceito em repositório privado. Hermes é aplicação distinta, com aprovações para comunicações externas. Este arquivo não muda seus estados.

Documentação de apoio: docs/PRODUCTION_CHECKLIST.md e docs/HERMES_INTEGRATION_STATUS.md. Nenhum arquivo funcional foi alterado.
