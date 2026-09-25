# HANDOFF — Dona Antônia Marketing OS

Atualizado em: 2026-09-25  
Fase: especificação pré-implementação. Nenhum sender/campanha programado.

## Repositório
`osvaldosereia/marketing`

## ESCOPO ATUAL CONGELADO

Trabalhar somente em:

**Bling -> eventos comerciais -> PapoAI -> WhatsApp -> pós-venda -> consentimento -> recompra**

Não retomar redes sociais/Google/Creative Studio/Ads até esta trilha estar executável.

## Documentos canônicos

Ler nesta ordem:
1. `README.md`
2. `docs/PROJECT-MASTER.md`
3. `docs/DECISIONS.md`
4. `docs/JOURNEY-MATRIX.md`
5. `docs/INTEGRATION-CONTRACT.md`
6. `docs/IMPLEMENTATION-ROADMAP.md`
7. `docs/RESEARCH-SOURCES.md`
8. `docs/BLING-PAPOAI-POSTSALE.md`
9. este `docs/HANDOFF.md`

`docs/WHATSAPP-PLATFORM-ALTERNATIVES.md` é referência de contingência, não escopo ativo.

Novos documentos importantes:
- `docs/PAPOAI-OUTBOUND-RESEARCH.md` — pesquisa profunda do Gate P1;
- `docs/PAPOAI-CONTRACT-CHECKLIST.md` — perguntas exatas para API/MCP/Webhook do PapoAI;
- `docs/BLING-DELIVERY-STATE-STRATEGY.md` — fonte correta para saiu/entregue.

## Estado Bling confirmado

Core: `osvaldosereia/SUCEDOAN12`
Supabase canônico: `ssbesxgaijknwsjbsbcz`

Runtime atual:
- mode=homologation;
- hub_enabled=false;
- webhooks_enabled=false para processamento geral;
- orders_enabled=true;
- catálogo de situações ready;
- status_updates_enabled=true;
- módulo Vendas id 98310;
- OAuth/read probes OK.

Webhooks reais já provados:
- order.updated;
- virtual_stock.updated;
- HMAC válido;
- assinatura inválida rejeitada;
- idempotência;
- rollback;
- eventos reais assinados.

Situações relevantes:
- 9 Atendido;
- 12 Cancelado;
- 24 Verificado;
- 915901 Aguardando confirmação;
- 915902 Aprovado / Separar.

Gap:
`ready` e `out_for_delivery` atualmente usam Bling `Verificado` (24).
Antes do canário "saiu para entrega", criar estado inequívoco ou usar evento canônico de expedição.

Correção crítica:
- Bling `Atendido` NÃO prova entrega física;
- documentação oficial diz que pode ser aplicado automaticamente ao gerar NF;
- `order.delivered` deverá nascer da confirmação do entregador/Core;
- opcionalmente espelhar no Bling uma situação personalizada `Entregue ao cliente`.

## Estado PapoAI confirmado

Receiver inbound existente no Core:
`papo-external-agent-v1`

Payload real:
- event.type=message.received;
- data.contact;
- data.message;
- data.session;
- message id/WAMID;
- direction;
- phone from/to;
- texto/mídia.

Core já normaliza e vincula conversa local.

Bloqueador P1:
**não foi encontrada documentação pública do endpoint outbound exato do PapoAI** para send message/send template.

Pesquisa adicional confirmou publicamente que o PapoAI oferece:
- campanhas/funis/automações;
- follow-up automático;
- remarketing;
- CRM/Kanban;
- templates;
- Webhook;
- MCP;
- Bling;
- Supabase.

Preferência arquitetural:
se o PapoAI permitir iniciar/parar uma régua por API/webhook, deixar timers/follow-up no PapoAI e manter no Marketing apenas política/estado/auditoria.

Make legado contém outbound Meta funcional com texto, áudio, imagem, botões, listas, CTA e Flows. É fallback técnico/documentação, não runtime.

Próximo trabalho deve obter o contrato PapoAI pela conta/suporte/documentação privada e homologar.

Verificação do ambiente ChatGPT em 2026-09-25:
- não existe conector/plugin PapoAI disponível diretamente;
- portanto operação direta daqui dependerá do MCP/API do PapoAI ou de um MCP próprio do Marketing.

## Consentimento

Estado real observado:
- clientes: 490;
- marketing_opt_in=true: 0;
- marketing_opt_in=false: 490.

Regra:
- transacional separado de marketing;
- não habilitar base histórica;
- criar consent ledger com prova;
- opt-out imediato.

## Histórico/recompra

Pedidos locais:
- 87 total;
- 80 com customer_id;
- 63 com telefone;
- 27 com bling_order_id;
- fontes heterogêneas.

Estruturas históricas antigas de customer purchase foram removidas na limpeza.
A função `refresh_customer_purchase_profile` é stale porque referencia tabela inexistente `customer_product_stats`.

Regra:
criar read model novo, pequeno e auditável quando a programação começar.

## Jornada V1

1. pedido confirmado;
2. saiu para entrega;
3. entregue;
4. D+1/D+2 check pós-venda;
5. problema -> humano + suppression;
6. pós-venda saudável;
7. pedir consentimento para ofertas/recompra;
8. opt-in;
9. elegibilidade de recompra;
10. mensagem de recompra;
11. novo pedido interrompe a cadência.

## Ordem de implantação

```
contrato PapoAI
→ shadow event bridge
→ sender canário
→ out_for_delivery
→ delivered
→ pós-venda
→ consentimento
→ read model recompra
→ recompra canário
→ escala
```

## Principais gates

P1 PapoAI outbound:
- send freeform;
- send template;
- provider id;
- status/callback;
- response round-trip.

B1 Bling:
- out_for_delivery inequívoco;
- delivered inequívoco.

C1 Consent:
- wording;
- sim/não;
- prova;
- revogação.

D1 Recompra:
- novo read model;
- pedidos válidos;
- estoque/preço revalidado.

## Últimos commits do projeto Marketing nesta rodada

- `4eb04a6` — PROJECT-MASTER
- `1ce1208` — JOURNEY-MATRIX
- `f4c27c7` — INTEGRATION-CONTRACT
- `a4ac106` — RESEARCH-SOURCES
- `76ee241` — IMPLEMENTATION-ROADMAP
- `7327404` — PAPOAI-OUTBOUND-RESEARCH
- `c25dfed` — BLING-DELIVERY-STATE-STRATEGY
- `bec9616` — atualização PROJECT-MASTER entrega/PapoAI
- `eb1ce6d` — decisões D017/D018
- `c1a1573` — PAPOAI-CONTRACT-CHECKLIST

## Próxima ação recomendada

**Não programar ainda.**

Próximo passo único:
obter/homologar o contrato outbound real do PapoAI e, preferencialmente, provar se um webhook/API externo consegue iniciar e cancelar uma régua/follow-up nativa.

Usar `docs/PAPOAI-CONTRACT-CHECKLIST.md` como checklist.

Depois disso, atualizar PROJECT-MASTER e liberar POC 1 shadow.

## Regra para nova janela

Não confiar em memória da conversa.
Ler os documentos canônicos e verificar commits mais recentes antes de agir.
