# IMPLEMENTATION ROADMAP — Bling + PapoAI Pós-venda/Recompra

Atualizado em: 2026-09-25  
Status: planejamento, sem programação iniciada neste repositório.

# Fase 0 — Fechar documentação e contratos

## 0.1 PapoAI
Obter:
- documentação/endpoint outbound;
- autenticação;
- send freeform;
- send template;
- provider message id;
- status callback;
- limites/rate limit;
- tags/funil/follow-up se disponíveis.

Gate:
**não programar sender real sem contrato.**

## 0.2 Bling
Já homologado:
- situações;
- order.updated real;
- assinatura;
- idempotência.

Pendente:
- fonte inequívoca para `out_for_delivery`;
- confirmar política de `delivered`.

## 0.3 Consentimento
Fechar:
- texto;
- botão/resposta;
- ledger;
- opt-out;
- suppression.

---

# Fase 1 — Fundação isolada do projeto Marketing

Futura programação, somente após autorização.

Criar domínio mínimo, separado do Admin:
- journey_events;
- journey_instances;
- journey_steps;
- communication_attempts;
- marketing_consents;
- communication_suppressions.

Não criar:
- cópia de produtos;
- cópia completa de clientes;
- ERP;
- inbox duplicado;
- catálogo duplicado.

Bridge fornece contexto sob demanda.

Critério:
nenhum efeito externo ainda.

---

# Fase 2 — Event Bridge em shadow mode

Core:
- após reconciliar Bling, emite business event.

Marketing:
- recebe;
- deduplica;
- decide o que FARIA;
- grava `would_send`;
- não chama PapoAI.

Testes:
- duplicata;
- fora de ordem;
- cancelamento;
- retorno;
- telefone ausente;
- pedido sem cliente;
- retry;
- estado revertido.

Gate:
100% decisões esperadas nos canários.

---

# Fase 3 — PapoAI Adapter canário

Primeira ação:
- número/controlado;
- mensagem/template de teste.

Validar:
- autenticação;
- accepted;
- message id;
- delivery status;
- resposta inbound retorna ao receiver;
- idempotência;
- erro/retry.

Sem campanhas.

---

# Fase 4 — Primeiro evento real: saiu para entrega

Pré-requisito:
estado inequívoco.

Apenas pedidos novos/canários.

Fluxo:
`order.out_for_delivery -> policy -> PapoAI -> WhatsApp`.

Rollback:
desativar journey sem desligar receiver Bling.

Gate:
- zero duplicidade;
- zero envio para pedido errado;
- telefone correto;
- mensagem entregue;
- auditoria completa.

---

# Fase 5 — Entregue + pós-venda

Adicionar:
- `order.delivered`;
- timer D+1/D+2;
- check de satisfação;
- classifier simples;
- humano para problema;
- suppression automático.

Sem marketing de recompra ainda.

Gate:
problema real impede qualquer mensagem comercial.

---

# Fase 6 — Consentimento

Captura:
- pergunta explícita;
- sim/não;
- prova da resposta;
- sync do espelho `marketing_opt_in`.

Opt-out:
- botão/intenção;
- efeito imediato.

Gate:
- cliente sem consentimento não recebe marketing;
- revogação cancela jobs pendentes.

---

# Fase 7 — Read model de recompra

Construir do zero, sem estruturas legadas removidas.

Fontes:
- pedidos canônicos válidos;
- order_items;
- histórico Bling adicional se necessário.

Campos derivados:
- first/last purchase;
- valid order count;
- days since last order;
- purchase intervals;
- product/category frequency;
- last basket;
- typical quantity;
- recent cancellation/return.

Gate:
amostra manual comparada pedido por pedido.

---

# Fase 8 — Recompra canário

Elegibilidade:
- opt-in;
- no suppression;
- histórico suficiente;
- nenhum novo pedido recente;
- estoque/preço atual;
- cooldown.

Começar com estratégia simples:
**repetir última cesta/última compra**, não recomendador complexo.

Pequeno grupo.

Métricas:
- eligible;
- sent;
- delivered;
- reply;
- opt-out;
- order;
- revenue.

---

# Fase 9 — Recompra inteligente

Depois de volume:
- intervalo por cliente;
- intervalo por categoria;
- oferta relevante;
- IA para copy e seleção dentre candidatos seguros.

Não fazer antes de dados suficientes.

---

# Fase 10 — Operação normal

Somente quando:
- templates aprovados;
- consent ledger;
- suppression;
- sender estável;
- métricas;
- rollback;
- custo conhecido;
- suporte humano definido.

# Ordem obrigatória

```
PapoAI contract
→ shadow
→ transactional canary
→ delivered
→ post-sale
→ consent
→ rebuy read model
→ rebuy canary
→ scale
```

Nunca inverter consentimento/recompra.
