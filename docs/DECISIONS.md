# DECISIONS — Dona Antônia Marketing OS

Atualizado em: 2026-09-25

## Decisões vigentes

### D001 — Projeto separado do Vitrine/Admin
O Marketing OS será desenvolvido no repositório `osvaldosereia/marketing`, com ciclo de deploy e domínio técnico independentes.

Motivo: evitar que experimentos de marketing ou integrações externas afetem checkout, pedidos, estoque, fiscal ou operação.

### D002 — Core operacional continua sendo a fonte de verdade
Marketing não será ERP nem fonte de verdade de preço, estoque, pedido ou cliente fiscal.

Fontes:
- Vitrine/Core Dona Antônia: regras comerciais e operação;
- Bling: ERP/fiscal e eventos;
- PapoAI: canal WhatsApp, CRM e automações nativas de conversa;
- Marketing: jornadas, consentimento, pós-venda, recompra e métricas.

### D003 — PapoAI primeiro para WhatsApp
Não duplicar atendimento, IA de conversa, multiatendimento, Kanban, follow-up, campanhas e templates quando o PapoAI os oferecer com contrato suficiente.

### D004 — Foco geográfico
Operação comercial somente Cuiabá/MT e Várzea Grande/MT nesta fase.

### D005 — Prioridade para oficial + gratuito/incluído
Antes de contratar terceiros, usar APIs oficiais e recursos já pagos/incluídos quando atenderem ao requisito.

### D006 — Sem código de produção durante pesquisa
Até PROJECT-MASTER e gates mínimos:
- não criar banco de produção;
- não criar sender real;
- não ativar campanha;
- não reativar Make;
- não modificar Vitrine/Admin por este projeto.

### D007 — Make é inventário, não runtime
Cenários antigos servem somente como evidência/referência.

### D008 — Integração por Bridge
Core -> Marketing por eventos/read API controlados. Marketing não recebe acesso irrestrito ao banco operacional ou credenciais Bling.

### D009 — Documentação é parte do produto
Toda rodada:
1. ler PROJECT-MASTER, HANDOFF e DECISIONS;
2. registrar decisão/mudança;
3. atualizar HANDOFF;
4. não depender da memória de um chat.

### D010 — Escopo congelado até executar
Até esta integração estar executável e homologada, o projeto Marketing trabalha apenas em:
**Bling -> PapoAI -> WhatsApp -> pós-venda -> consentimento -> recompra.**

Demais canais sociais ficam pausados.

### D011 — Bling não chama PapoAI sem policy gate
Mesmo se houver conector Bling nativo no PapoAI, mudanças de status passam pelo Core/Marketing policy layer antes do envio.

Motivos:
- idempotência;
- tradução de estado técnico;
- suppression;
- consentimento;
- auditoria;
- portabilidade futura.

### D012 — Transacional e marketing são separados
Mensagem necessária sobre pedido não concede consentimento de marketing.

Recompra/oferta exige opt-in válido e revogável.

### D013 — Base histórica não recebe opt-in automático
Estado observado: 0/490 clientes com opt-in ativo.
Nunca alterar a base em lote apenas para habilitar campanhas.

### D014 — Outbound PapoAI é gate obrigatório
Não programar sender usando endpoint presumido.

Antes:
- obter contrato outbound oficial/da conta;
- provar envio;
- provar template;
- obter provider message id;
- validar callback/status quando disponível.

### D015 — Recompra não reutiliza read models legados removidos
Construir read model novo baseado em pedidos válidos e itens reais.
Não reativar `customer_purchase_summary_v1`, `get_customer_purchase_history_v1` ou `customer_product_stats` sem projeto explícito.

### D016 — Primeiro canário transacional
O primeiro envio automático recomendado é `order.out_for_delivery`, após existir um estado inequívoco.

Hoje `ready` e `out_for_delivery` compartilham a situação Bling `Verificado`; isso precisa ser resolvido antes.


### D017 — Atendido não significa entrega física
A situação padrão `Atendido` do Bling não será usada como gatilho de pós-venda, pois pode ser aplicada automaticamente na geração da NF.

Fonte primária de `order.delivered`:
- confirmação física no Core/tela do entregador.

O Bling poderá receber uma situação personalizada de espelho depois da POC.

### D018 — Preferir automação nativa do PapoAI se controlável
Se o PapoAI permitir iniciar/parar régua/follow-up por API/webhook e expuser status suficiente, usar o PapoAI para timers/cadências em vez de recriar scheduler próprio.

Fallback:
- Marketing agenda e chama sender PapoAI;
- Meta Cloud API direta somente como contingência explicitamente homologada, nunca em paralelo silencioso com o PapoAI.
