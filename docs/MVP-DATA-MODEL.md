# MVP-DATA-MODEL — Dona Antônia Marketing OS

Atualizado em: 2026-09-25
Status: modelo conceitual mínimo; não criar tabelas ainda.

Objetivo: evitar banco gigante antes de haver produto.

# 1. `marketing_connections`

Uma linha por conexão externa.

Campos conceituais:
- id;
- provider;
- external_account_ref;
- display_name;
- status;
- token_secret_ref;
- granted_scopes;
- expires_at;
- last_ok_at;
- last_error;
- metadata.

Nunca guardar token plaintext em coluna comum.

# 2. `marketing_capabilities`

- connection_id;
- capability;
- state;
- api_version;
- last_tested_at;
- evidence.

Unique:
connection + capability.

# 3. `campaigns`

- id;
- name;
- objective;
- audience;
- starts_at;
- ends_at;
- status;
- brief;
- created_by;
- approved_at.

# 4. `campaign_products`

Snapshot de intenção, não fonte de verdade.

- campaign_id;
- product_id;
- sort_order;
- role.

Na geração/publicação, buscar dados atuais pelo Bridge.

# 5. `content_items`

Uma variante editorial por canal/formato.

- id;
- campaign_id;
- channel;
- format;
- caption;
- headline;
- cta;
- status;
- scheduled_at;
- approved_at;
- published_external_id;
- published_at.

# 6. `assets`

- id;
- campaign_id;
- content_item_id;
- kind;
- storage_path;
- width;
- height;
- mime_type;
- template_key;
- template_version;
- source_hash;
- commercial_snapshot;
- stale;
- created_at.

# 7. `publish_jobs`

- id;
- content_item_id;
- channel;
- idempotency_key;
- status;
- attempts;
- scheduled_at;
- claimed_at;
- external_id;
- last_error;
- completed_at.

# 8. `social_events`

Normalized events.

- id;
- provider;
- event_type;
- external_id;
- account_ref;
- content_external_id;
- author_ref;
- text;
- occurred_at;
- raw_ref;
- status.

Unique provider + external_id + event_type.

# 9. `social_actions`

- id;
- social_event_id;
- action_type;
- policy_decision;
- ai_draft;
- final_text;
- status;
- idempotency_key;
- external_action_id;
- completed_at.

# 10. `email_subscriptions`

- id;
- customer_ref/email_hash/ref;
- email;
- status;
- source;
- consent_at;
- wording_version;
- unsubscribed_at;
- provider_contact_ref.

PII policy deve ser definida antes.

# 11. `performance_snapshots`

- id;
- content_item_id;
- provider;
- captured_at;
- metrics jsonb.

Começar jsonb porque métricas variam por canal.
Depois normalizar o que realmente for usado.

# 12. `audit_log`

- actor;
- action;
- entity;
- entity_id;
- occurred_at;
- reason;
- metadata mínima.

# 13. O que NÃO criar na V1

Não criar inicialmente:
- tabela própria de produtos;
- tabela própria de estoque;
- tabela própria de clientes completa;
- CRM duplicado;
- prompt table para cada microação;
- dezenas de filas;
- tabela por rede social.

# 14. RLS

Todas as tabelas de app em schema exposto:
- RLS enabled;
- owner/editor/viewer policies conforme necessidade;
- workers usam server context.

Secrets:
- fora das tabelas expostas.

# 15. Evolução

Adicionar tabela apenas quando houver caso de uso comprovado:
- experiments;
- opportunity_scores;
- creative_templates;
- comment_policy_rules;
- attribution;
- segments.

Não antecipar complexidade.
