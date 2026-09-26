# ROUND 01 — Fundação Isolada do Marketing OS

Data: 2026-09-25
Status: **implementada no código**
Produção externa: **desabilitada**

## Objetivo da rodada

Transformar o repositório de documentação em uma aplicação real e segura, sem conectar Meta, PapoAI, Brevo ou Core de produção.

## Implementado

### Aplicação
- Next.js App Router;
- React;
- TypeScript strict;
- CSS próprio responsivo;
- shell visual do Marketing OS;
- navegação funcional.

### Rotas
- `/` — Hoje;
- `/opportunities`;
- `/campaigns`;
- `/studio`;
- `/calendar`;
- `/conversations`;
- `/whatsapp`;
- `/email`;
- `/performance`;
- `/connections`;
- `/api/health`.

### Domínio
Criados contratos para:
- canais;
- formatos;
- workflow status;
- produtos snapshot;
- oportunidades;
- campanhas;
- agenda;
- capabilities;
- publish result;
- adapters.

### Segurança de escrita
Por padrão:
- `productionWritesEnabled=false`;
- Meta adapter mock bloqueia publicação;
- PapoAI adapter mock bloqueia envio;
- Brevo adapter mock bloqueia envio;
- CoreMarketingBridge retorna apenas mock.

Erro normalizado:
`provider_not_connected_round_1`.

### Renderer 4 produtos
Implementado primeiro renderer determinístico em SVG.

Características:
- exatamente quatro produtos;
- grid 2x2;
- moeda pt-BR;
- formatos conversation/story;
- não depende de IA para preço;
- rejeita produto não vendável;
- rejeita preço inválido;
- base preparada para fotos reais quando o Core Bridge entrar.

A prévia atual usa placeholders/identificadores porque não existe Bridge de produção nesta rodada.

### Stale guard
Implementada política de snapshot comercial:
- product id;
- preço;
- sellable.

A checagem marca divergência quando:
- produto sumiu;
- produto ficou indisponível;
- preço mudou.

Isso será conectado ao publish gate nas próximas rodadas.

### UI
A tela Hoje mostra:
- atenção;
- oportunidades;
- calendário;
- estado das conexões;
- preview da peça 4 produtos.

Studio e WhatsApp reutilizam o renderer.

Conexões deixa explícito que providers não estão ligados.

## Dependências

Fixadas:
- Next.js 16.3.6;
- React 19.3.0;
- React DOM 19.3.0;
- TypeScript 6.0.3;
- tipos React/React DOM/Node.

Motivo:
- Next 16 é Active LTS;
- 16.3.6 inclui atualização crítica de segurança de 22/09/2026;
- TypeScript 6 escolhido nesta base para compatibilidade conservadora do toolchain atual.

## Validação realizada

Validação estrutural:
- imports e limites de domínio revisados;
- nenhum segredo adicionado;
- nenhum token Make copiado;
- nenhuma dependência Supabase adicionada;
- nenhum provider write habilitado;
- rotas e contratos revisados estaticamente.

### Limitação do ambiente desta rodada

O ambiente de execução disponível para esta conversa não consegue resolver github.com/registry externamente pelo container, portanto não foi possível executar `npm install` + `next build` diretamente aqui.

Isso NÃO será tratado como build verde.

Gate para próxima rodada:
- instalar dependências em runner/deploy autorizado;
- gerar lockfile;
- executar `npm run typecheck`;
- executar `npm run build`;
- corrigir qualquer incompatibilidade antes de conectar banco/provider.

## Não implementado intencionalmente

- Supabase de Marketing;
- autenticação real;
- Core Bridge real;
- Meta OAuth;
- publicação;
- comentários;
- PapoAI;
- Brevo;
- Storage;
- jobs/queues;
- cron;
- deploy.

## Risco conhecido

Credenciais legadas do Make continuam consideradas comprometidas/obsoletas.
Não devem ser copiadas.

## Próxima rodada

Round 2:
1. validar build em ambiente com dependências;
2. gerar lockfile;
3. criar persistência local/isolada do domínio;
4. preparar schema mínimo do Supabase Marketing sem tocar Core;
5. implementar repositories e outbox;
6. conectar stale guard ao workflow;
7. manter providers em mock.
