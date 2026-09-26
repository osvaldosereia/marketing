# HANDOFF — Dona Antônia Marketing OS

Atualizado em: 2026-09-25
Fase: pesquisa/arquitetura. Nenhuma automação social de produção implementada.

## Repositório
`osvaldosereia/marketing`

## Escopo prioritário atual

Construir ferramenta separada do Vitrine/Admin para:
- Instagram/Facebook oficiais;
- carrosséis/posts/Reels/Stories quando suportados;
- comentários + IA;
- Private Reply após comentário conforme regra Meta;
- Direct dentro das janelas/permissões;
- WhatsApp Status: asset + compartilhamento manual;
- WhatsApp/PapoAI: imagem com 4 produtos;
- email marketing;
- Creative Studio;
- calendário;
- analytics/aprendizado.

## Decisões críticas

- somente APIs oficiais;
- não automatizar boas-vindas a novo seguidor;
- não automatizar WhatsApp Status por clique robótico;
- Instagram Stories oficial somente Business;
- Facebook Story fica manual/POC até endpoint oficial ser confirmado;
- PapoAI permanece preferido no WhatsApp;
- Brevo é provider preferido para email V1;
- OpenAI cria/analisa, mas preço e estoque vêm do Core;
- foto real do produto é obrigatória;
- reclamações e casos críticos vão para humano;
- horários externos são apenas seed; aprender com dados próprios.

## Arquitetura

Marketing será aplicação/runtime próprios.

Core Dona Antônia:
- produtos;
- preços;
- estoque;
- ofertas;
- cestas;
- pedidos.

Marketing lê por Bridge controlada.

Adapters previstos:
- MetaInstagramAdapter;
- MetaFacebookAdapter;
- PapoAIAdapter;
- BrevoEmailAdapter;
- SystemShareAdapter para Status.

## Documentos canônicos

1. `README.md`
2. `docs/PROJECT-MASTER.md`
3. `docs/DECISIONS.md`
4. `docs/META-OFFICIAL-CAPABILITIES.md`
5. `docs/CREATIVE-DESIGN-SYSTEM.md`
6. `docs/CONTENT-PUBLISHING-STRATEGY.md`
7. `docs/EMAIL-MARKETING.md`
8. `docs/SOCIAL-RESEARCH-SOURCES.md`
9. este HANDOFF.

## Conteúdo V1

Cadência inicial:
- Feed: 4–5/semana;
- Carrossel: 2/semana;
- Reel: 1–2/semana após POC;
- Story: 2–4 frames/dia operacional;
- Status: 1–3 assets/dia para compartilhamento;
- Email: 1/semana.

Janelas iniciais Cuiabá:
- 09:30–10:30;
- 11:30–13:30;
- 17:30–19:00.

Depois substituir por dados reais.

## Criativos

Produto real + composição determinística.

Template prioritário:
**4 produtos por imagem**, grade 2x2, para conversa WhatsApp.

Formats:
- Feed 1080x1350;
- Story/Status 1080x1920;
- Reels 1080x1920.

Asset com preço vira stale se preço/estoque/oferta mudar.

## Meta — capability

Confirmado:
- IG feed/content publishing;
- IG Reels;
- IG Stories Business;
- comments;
- messaging;
- FB Reels;
- Messenger.

Gate:
- App Review;
- Business Verification;
- Advanced Access onde necessário;
- scopes/tokens.

Não confirmado para V1:
- Facebook Story publishing API.

Proibido no projeto:
- new follower -> DM.

## Email

Provider V1:
Brevo.

Antes:
- domínio;
- SPF;
- DKIM;
- DMARC;
- consent;
- unsubscribe;
- webhook.

## Próxima etapa antes de código

Fechar POC plan técnico:
1. criar app Meta/validar ativo existente;
2. mapear conta IG Business + Page;
3. levantar tokens/scopes atuais sem expor segredo;
4. definir Bridge do Core;
5. definir schema mínimo Marketing;
6. definir templates visuais finais;
7. preparar branch/projeto isolado;
8. só então começar implementação por canários.

## Commits desta rodada

- `8b5655f` — Meta official capabilities;
- `0c15cee` — Creative Design System;
- `3f3ab3d` — content/publishing strategy;
- `ad75d85` — email marketing;
- `2717a44` — novo Project Master;
- `5be6462` — decisões atualizadas.

## Regra para próxima janela

Não confiar apenas na conversa.
Ler documentação e commits mais recentes antes de mudar arquitetura ou iniciar código.
