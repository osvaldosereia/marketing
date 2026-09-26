# Dona Antônia — Marketing OS

Projeto independente para criar a central de marketing da Dona Antônia para Cuiabá e Várzea Grande.

## Estado
**Fase:** pesquisa, arquitetura e especificação.
**Código de produção:** ainda não iniciado neste repositório.

## Escopo prioritário atual

- Instagram: posts, carrosséis, Reels, Stories, comentários e Direct dentro das regras oficiais;
- Facebook: Página, Reels, engajamento e Messenger;
- IA para resposta de comentários com policy/handoff;
- Private Reply após comentário quando permitido oficialmente;
- WhatsApp: geração de Status para compartilhamento manual;
- WhatsApp/PapoAI: peças de oferta com 4 produtos para uso em conversa;
- Email marketing;
- calendário, Creative Studio, aprovação e analytics.

## Regras

1. Somente APIs oficiais.
2. Nada de scraping, endpoint privado ou automação de tela.
3. Não existe no projeto "DM automática para novo seguidor".
4. WhatsApp Status termina com confirmação manual.
5. Preço/estoque vêm do Core e são revalidados.
6. IA não altera produto/rótulo nem inventa fatos.
7. Marketing é separado do Vitrine/Admin.
8. PapoAI continua preferido para WhatsApp.
9. Toda evolução deve ser documentada.

## Leia primeiro

1. `docs/PROJECT-MASTER.md`
2. `docs/DECISIONS.md`
3. `docs/HANDOFF.md`
4. `docs/META-OFFICIAL-CAPABILITIES.md`
5. `docs/CREATIVE-DESIGN-SYSTEM.md`
6. `docs/CONTENT-PUBLISHING-STRATEGY.md`
7. `docs/EMAIL-MARKETING.md`
8. `docs/SOCIAL-RESEARCH-SOURCES.md`

## Frente preservada

A pesquisa anterior de Bling/PapoAI pós-venda continua no repositório e poderá ser conectada futuramente:
- `docs/BLING-PAPOAI-POSTSALE.md`
- `docs/PAPOAI-OUTBOUND-RESEARCH.md`
- `docs/JOURNEY-MATRIX.md`
- `docs/INTEGRATION-CONTRACT.md`

## Continuidade

Antes de programar em uma nova janela:
- ler PROJECT-MASTER;
- ler HANDOFF;
- verificar últimos commits;
- não depender apenas da memória do chat.

## Desenvolvimento local

```bash
npm install
npm run typecheck
npm run build
npm run dev
```

A aplicação inicia em modo mock por padrão. Nenhuma integração externa é necessária para visualizar a fundação.

Primeira implementação registrada em `docs/ROUND-01-FOUNDATION.md`.
