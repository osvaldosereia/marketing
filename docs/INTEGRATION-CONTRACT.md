# INTEGRATION CONTRACT — Core / Marketing / PapoAI

Atualizado em: 2026-09-25  
Status: especificação técnica, sem implementação.

# 1. Limites de responsabilidade

## Core Dona Antônia
Responsável por:
- receber Bling webhook;
- validar assinatura;
- deduplicar;
- reconciliar pedido;
- emitir evento de negócio;
- disponibilizar leitura mínima de pedido/cliente/itens;
- nunca expor credenciais Bling ao Marketing/PapoAI.

## Marketing
Responsável por:
- estado da jornada;
- consentimentos de marketing;
- suppression;
- cooldown;
- elegibilidade de pós-venda/recompra;
- histórico de tentativas;
- métricas;
- orquestrar PapoAI Adapter.

## PapoAI Adapter
Responsável por:
- traduzir comando interno em operação PapoAI;
- retornar provider ids;
- normalizar erro;
- normalizar status de mensagem;
- nunca conter regra de preço/estoque/pedido.

---

# 2. Business Event Envelope

```json
{
  "event_id": "uuid",
  "event_type": "order.delivered",
  "event_version": 1,
  "occurred_at": "2026-09-25T18:00:00-04:00",
  "source": "core",
  "correlation_id": "uuid",
  "customer_id": "uuid",
  "order_id": "uuid",
  "bling_order_id": 123456,
  "revision": 1,
  "data": {}
}
```

## Regras
- `event_id` único;
- processamento idempotente;
- `event_version` permite evolução;
- payload mínimo;
- sem segredo/token;
- Marketing busca detalhes por endpoint/read-model quando realmente precisar.

---

# 3. Read API / Marketing Bridge

Endpoints conceituais, não implementados:

## GET order context
`/marketing-bridge/orders/{order_id}`

Retorno mínimo:
- order_id;
- order_number;
- canonical_status;
- customer_id;
- phone_e164;
- total;
- confirmed_at;
- delivered_at;
- cancelled_at;
- returned_at;
- source;
- items resumidos;
- incident flags.

## GET customer context
`/marketing-bridge/customers/{customer_id}`

Retorno:
- customer_id;
- first name/display name mínimo;
- phone;
- active;
- last_order_at;
- order_count;
- marketing opt-in mirror;
- suppression operational flags.

## GET product candidates
Usado somente para recompra:
- product_id;
- name;
- active;
- sellable;
- stock/sellable quantity;
- current price;
- current offer;
- category.

O Marketing nunca recebe permissão de escrita nesses domínios.

---

# 4. PapoAI outbound interface

Contrato interno que queremos, independentemente da API real do PapoAI:

```ts
sendFreeform({
  customerRef,
  phoneE164,
  text,
  idempotencyKey,
  correlationId
})
```

```ts
sendTemplate({
  customerRef,
  phoneE164,
  templateName,
  language,
  variables,
  idempotencyKey,
  correlationId
})
```

Resposta normalizada:

```json
{
  "accepted": true,
  "provider": "papoai",
  "provider_message_id": "...",
  "provider_conversation_id": "...",
  "status": "accepted"
}
```

Erros normalizados:
- unauthorized;
- invalid_contact;
- template_not_found;
- template_rejected;
- outside_window_requires_template;
- rate_limited;
- provider_unavailable;
- duplicate;
- unknown.

A API real do PapoAI deverá ser adaptada a esse contrato.

---

# 5. Inbound PapoAI

O receiver existente já captura `message.received`.

Marketing deverá receber somente eventos derivados necessários:

- `whatsapp.customer_replied`;
- `whatsapp.opted_out`;
- `whatsapp.opted_in`;
- `whatsapp.complaint_intent`;
- `whatsapp.rebuy_intent`.

Não duplicar o receiver externo.

---

# 6. Message status

Se o PapoAI disponibilizar callback de status, normalizar:

- accepted;
- sent;
- delivered;
- read;
- failed.

Evento:

```json
{
  "type": "whatsapp.message_status_changed",
  "provider_message_id": "...",
  "status": "delivered",
  "occurred_at": "...",
  "correlation_id": "..."
}
```

Se PapoAI não disponibilizar status por webhook:
- documentar limitação;
- não criar polling agressivo;
- métricas ficam limitadas ao que o provedor fornece.

---

# 7. Idempotency

No Marketing:
`journey:{customer_id}:{order_id}:{step}:{revision}`

No Core:
usar event_id/provider event id já protegido pelo receiver Bling.

No adapter:
enviar client reference/idempotency key se a API PapoAI suportar.
Se não suportar, nossa própria ledger impede segundo envio.

---

# 8. Segurança

- PapoAI nunca recebe token Bling;
- Marketing nunca recebe refresh token Bling;
- credenciais PapoAI ficam em secret store/server only;
- nenhum segredo no browser;
- payloads de log não carregam conversa completa sem necessidade;
- minimizar telefone nos logs;
- todo send registra actor/system reason;
- operações de marketing respeitam consentimento.

---

# 9. Contrato de suppression

Função conceitual:

`canSend(customer_id, journey_step, message_class)`

Retorna:
- allowed;
- reason;
- consent state;
- suppression state;
- cooldown;
- active incident;
- recent order.

Reasons:
- allowed_transactional;
- allowed_marketing;
- no_marketing_consent;
- opted_out;
- complaint_open;
- returned_order;
- recent_order;
- cooldown;
- invalid_phone;
- duplicate;
- product_unavailable.

---

# 10. Contrato de recompra

Entrada:
- customer_id;
- as_of;
- purchase history read model;
- active products;
- consent.

Saída:
```json
{
  "eligible": true,
  "strategy": "repeat_last_basket",
  "due_at": "...",
  "candidate_products": [],
  "reason_codes": ["repeat_pattern"],
  "valid_until": "..."
}
```

Antes do envio, revalidar preço/estoque.

---

# 11. Gaps que bloqueiam implementação

1. endpoint/contrato outbound PapoAI;
2. template send PapoAI;
3. message status callbacks PapoAI;
4. mecanismo API para tags/funil/follow-up (desejável);
5. estado inequívoco `out_for_delivery`;
6. novo read model de histórico para recompra;
7. consent ledger.

Nenhum desses gaps deve ser resolvido inventando comportamento.
