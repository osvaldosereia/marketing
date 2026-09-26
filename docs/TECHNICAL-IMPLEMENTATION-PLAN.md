# TECHNICAL-IMPLEMENTATION-PLAN — Dona Antônia Marketing OS

Atualizado em: 2026-09-25
Status: arquitetura escolhida; sem implementação iniciada.

# 1. Decisão de stack

Aplicação separada do Vitrine/Admin.

## Frontend
Recomendação:
- Next.js/React;
- TypeScript;
- UI responsiva;
- server components/actions apenas onde ajudarem, sem acoplar lógica externa ao browser.

Motivos:
- calendário/Studio/inbox exigem UI de aplicação;
- previews e workflows complexos;
- bom suporte a rotas server-side e webhooks;
- deploy independente.

## Backend/data
Recomendação:
- Supabase separado para Marketing;
- Postgres;
- Auth;
- Storage para assets;
- Edge Functions apenas para webhooks/connectors que realmente precisem;
- pgmq/queue se necessário;
- pg_cron somente para rotinas inevitáveis, preferindo eventos.

Não reutilizar o banco operacional como banco do Marketing.

## Rendering
Preferir renderer determinístico no servidor:
- HTML/CSS/SVG/canvas -> PNG/JPEG;
- foto original do produto;
- tokens da marca;
- templates versionados.

OpenAI:
- briefing;
- copy;
- fundo/elementos;
- classificação;
- análise.

Não usar modelo de imagem para reproduzir produto.

# 2. Repositórios e deploy

Atual:
- `osvaldosereia/marketing`

Estrutura futura sugerida:

```
/apps/web
/packages/domain
/packages/adapters
/packages/renderer
/packages/policies
/packages/ui
/supabase
/docs
```

Não criar monorepo complexo se V1 não precisar; estrutura pode começar simples e evoluir.

Deploy:
- Marketing independente;
- subdomínio candidato: `marketing.donaantonia.com.br`;
- nunca compartilhar deploy do site público.

# 3. Boundary com Core

Criar `CoreMarketingBridge`.

Somente leitura para:
- produto;
- preço;
- estoque vendável;
- imagem;
- categoria;
- oferta;
- cesta;
- disponibilidade.

Eventos futuros:
- product.changed;
- offer.changed;
- stock.changed.

Marketing não escreve:
- produto;
- estoque;
- pedido;
- cliente operacional.

# 4. Adapters

Interfaces internas:

## InstagramAdapter
- connect;
- getCapabilities;
- publishImage;
- publishCarousel;
- publishReel;
- publishStory;
- listComments;
- replyComment;
- privateReply;
- listConversations;
- sendMessage;
- getInsights.

## FacebookAdapter
- publishPost;
- publishReel;
- listComments;
- replyComment;
- listConversations;
- sendMessage;
- getInsights.

## PapoAIAdapter
- sendImage;
- sendTemplate;
- sendMessage;
- tag/contact/followup conforme contrato homologado.

## EmailAdapter
- syncContact;
- sendTest;
- createCampaign;
- scheduleCampaign;
- unsubscribe;
- receiveWebhook.

## ShareAdapter
- prepareStatusShare;
- recordManualShare.

A UI trabalha com interfaces, não APIs externas diretamente.

# 5. Event model

Envelope:

```json
{
  "event_id":"uuid",
  "type":"instagram.comment.created",
  "occurred_at":"...",
  "provider":"meta",
  "account_id":"...",
  "external_id":"...",
  "correlation_id":"...",
  "payload_ref":"..."
}
```

Eventos:
- comment.created;
- message.received;
- publish.requested;
- publish.accepted;
- publish.failed;
- media.published;
- asset.stale;
- email.delivered;
- email.clicked;
- email.unsubscribed.

Payload bruto:
- armazenar somente se necessário;
- retenção definida;
- sanitização;
- evitar PII desnecessária.

# 6. Queue/outbox

Toda ação externa:
1. transação cria job/outbox;
2. worker claim idempotente;
3. adapter chama provider;
4. registra external id;
5. webhook atualiza estado;
6. retry com backoff em erro transitório.

Nunca:
- botão frontend chama Graph API diretamente;
- cron procura "qualquer coisa pendente" a cada minuto sem necessidade.

# 7. Idempotência

Keys:
- publish: `content_item_id + version + channel`;
- comment reply: `provider_comment_id + reply_policy_version`;
- private reply: `provider_comment_id + private_reply_v1`;
- email: `campaign_id + segment_snapshot + version`;
- asset render: `template_version + product_snapshot_hash + format`.

# 8. Stale guard

Toda peça comercial guarda snapshot:
- product id;
- price;
- offer;
- stock gate;
- generated_at.

Antes de publicar:
- Bridge revalida;
- divergência -> stale;
- job bloqueado;
- regenerar.

# 9. Comment AI policy

Pipeline:
- dedupe;
- language;
- spam/abuse;
- intent;
- product/order context;
- risk class;
- policy;
- AI draft;
- factual validation;
- send/human.

Risk:
- L0 agradecimento;
- L1 FAQ factual;
- L2 intenção comercial;
- L3 reclamação/operacional;
- L4 sensível/jurídico.

V1 auto only:
- L0/L1.

# 10. Creative renderer

Não gerar criativo inteiro por prompt de imagem.

Pipeline:
1. selecionar produtos;
2. snapshot;
3. recortar/normalizar fotos;
4. escolher template;
5. IA cria headline/fundo opcional;
6. renderer compõe;
7. checks;
8. asset.

Vantagens:
- rótulo fiel;
- preço fiel;
- layout consistente;
- regeneração rápida;
- menos custo.

# 11. Storage

Buckets conceituais:
- source-products-readonly/cache;
- generated-assets;
- campaign-exports;
- temp-render.

Assets:
- hash;
- MIME;
- dimensions;
- format;
- source ids;
- template version;
- stale flag.

Não duplicar indefinidamente imagens de produto se Bridge/URL segura resolver.

# 12. Segurança Supabase

- RLS em tabelas expostas;
- frontend nunca recebe service role/secret;
- autorização baseada em owner/editor;
- app metadata para papéis, não user_metadata;
- views com security_invoker quando expostas;
- funções privilegiadas fora de schema público quando possível;
- Storage policies específicas;
- logs sem tokens.

# 13. Auth/Roles V1

Roles:
- owner;
- editor;
- viewer.

Owner:
- conexões;
- políticas;
- publicar;
- email;
- config.

Editor:
- criar/editar;
- sugerir;
- aprovar conforme configuração.

Viewer:
- analytics/read only.

Começar simples.

# 14. Approval policy

V1:
- todo post precisa approval;
- email precisa approval;
- WhatsApp Status share é humano;
- comentários L0/L1 podem começar como draft-only e depois auto.

Depois:
- campanha aprovada pode liberar posts derivados;
- autopilot restrito.

# 15. Observabilidade

Painel técnico:
- connection health;
- webhook last seen;
- queue depth;
- failed jobs;
- rate limits;
- token expiry;
- provider errors.

Painel operacional:
- pending approvals;
- stale assets;
- comments awaiting;
- scheduled;
- failures.

# 16. Custos

Controlar:
- renders AI;
- OpenAI tokens;
- email volume;
- storage;
- egress;
- external API rate limits.

Cache:
- não regenerar copy/asset sem mudança;
- hash de inputs.

# 17. Fases técnicas

T0 — repositório/docs completos.
T1 — scaffold app + CI + auth + schema mínimo.
T2 — brand + campaigns + assets + calendar mock.
T3 — Core Bridge read-only.
T4 — renderer 4 products + Story/Feed.
T5 — Meta OAuth/read-only.
T6 — publish image canary.
T7 — carousel/story/reel.
T8 — comments + drafts.
T9 — private reply/messaging.
T10 — WhatsApp share + PapoAI.
T11 — Brevo.
T12 — analytics/learning.

# 18. Definition of Done V1

V1 está pronta quando:
- campanha com 4 produtos reais;
- gera Feed + Story/Status + WhatsApp 4 products;
- aprovação;
- agenda/publica Instagram e Facebook suportados;
- responde FAQ canário;
- private reply oficial canário;
- Status compartilhável;
- email teste/campanha;
- métricas básicas;
- nenhum segredo no cliente;
- rollback/pause;
- documentação atualizada.
