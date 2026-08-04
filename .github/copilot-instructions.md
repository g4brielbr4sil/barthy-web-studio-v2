# Instruções do projeto BarthyWebV2

## Contexto

Este projeto é a landing page e o portfólio institucional da Barthy Web Studio.

A aplicação deve transmitir uma identidade visual premium, tecnológica, noturna, moderna e profissional.

## Tecnologias

- React 18
- TypeScript
- Vite
- Tailwind CSS
- CSS nativo
- Lucide React
- Shaders e efeitos visuais quando já existentes no projeto

## Linguagem e comunicação

- Responder, explicar alterações e produzir documentação em português do Brasil.
- Escrever de forma clara, direta, natural e profissional.
- Evitar textos genéricos, exageros, jargões desnecessários e tom que pareça produzido automaticamente.
- Manter nomes oficiais de tecnologias, bibliotecas, APIs, comandos, arquivos e identificadores no idioma original.
- Descrever somente funcionalidades, resultados e responsabilidades comprovados pelo projeto.
- Diferenciar o que está concluído, em produção, em desenvolvimento ou planejado.
- Seguir o padrão definido em `CONTRIBUTING.md`.

## Regras de desenvolvimento

- Não modificar arquivos fora do escopo solicitado.
- Não remover funcionalidades existentes sem autorização.
- Não alterar a identidade visual sem solicitação explícita.
- Preservar responsividade para desktop, tablet e celular.
- Preferir componentes reutilizáveis.
- Evitar código duplicado.
- Usar TypeScript com tipos explícitos sempre que necessário.
- Não usar `any` sem justificativa.
- Manter os componentes pequenos e organizados.
- Não adicionar dependências sem explicar a necessidade.
- Não executar comandos destrutivos.
- Não fazer commit, push, merge ou deploy sem autorização.
- Antes de alterar vários arquivos, apresentar um plano resumido.
- Depois das alterações, informar quais arquivos foram modificados.
- Executar ou recomendar testes de build, lint e TypeScript.
- Corrigir apenas problemas diretamente relacionados à solicitação.

## Banco de dados

- Não sugerir Supabase.
- Para aplicações leves ou locais, preferir SQLite.
- Para projetos PHP ou ambientes locais, preferir MariaDB ou MySQL.
- Usar MongoDB somente quando um modelo documental fizer sentido.

## Segurança

- Nunca inserir senhas, tokens, chaves ou credenciais no código.
- Nunca expor arquivos `.env`.
- Nunca alterar configurações de produção sem autorização.
- Nunca realizar deploy automaticamente.

## Git

- Criar branches com nomes claros.
- Produzir commits pequenos e objetivos.
- Usar Conventional Commits com o prefixo técnico em inglês e a descrição em português.
- Usar títulos de Pull Request no mesmo padrão dos commits.
- Estruturar descrições de Pull Request com mudança, motivo, impacto, validação e escopo preservado.
- Não reescrever o histórico publicado apenas para traduzir mensagens antigas.
- Não enviar arquivos temporários ou dados privados ao repositório.
