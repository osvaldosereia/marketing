# RESEARCH SOURCES — Bling + PapoAI + WhatsApp

Atualizado em: 2026-09-25

Este arquivo registra apenas fontes públicas/oficiais usadas para fechar o projeto atual.

# Bling

## Webhooks
https://developer.bling.com.br/webhooks

Usos confirmados:
- comunicação reativa em tempo real;
- recursos `order`, `product`, `stock`, `virtual_stock`, `product_supplier`, `invoice`, `consumer_invoice`;
- ações `created`, `updated`, `deleted`;
- payload `order.updated` contém `situacao.id`;
- validação por assinatura;
- necessidade de idempotência;
- eventos podem chegar fora de ordem;
- resposta 2xx rápida;
- retries do provedor.

## Referência API
https://developer.bling.com.br/referencia

Usos:
- Pedido de Venda;
- Situações;
- Situações/Módulos;
- Transições;
- Contatos;
- Produtos;
- Estoque;
- NF-e;
- demais domínios necessários à reconciliação.

## Aplicativos/OAuth
https://developer.bling.com.br/aplicativos

Usos:
- escopos;
- autorização;
- recursos habilitados para webhook.

---

# PapoAI

## Site oficial
https://papoai.com.br/

Capacidades públicas declaradas relevantes:
- API Oficial Meta / WhatsApp Cloud API;
- WABA + webhooks;
- templates;
- coexistência;
- CRM;
- IA;
- integrações via Webhook;
- Supabase;
- MCP;
- Bling;
- automações.

Observação:
a presença de uma integração listada não prova o contrato API outbound específico necessário ao nosso projeto. Esse contrato precisa ser obtido/homologado.

## Follow-up automático
https://papoai.com.br/blog/follow-up-automatico-whatsapp

Pontos:
- cadências;
- janela de 24h;
- template fora da janela;
- critérios para parar follow-up;
- reengajamento longo.

## Funil de vendas
https://papoai.com.br/blog/funil-de-vendas-whatsapp

Pontos:
- etapa Pós-venda;
- pós-venda como ponto para recompra/indicação;
- Kanban;
- follow-up;
- métricas.

## Automação WhatsApp
https://papoai.com.br/blog/automacao-whatsapp-fluxos

Pontos:
- pedido/status;
- pós-venda;
- NPS;
- carrinho/orçamento;
- transferência humana;
- pós-venda abre espaço para recompra.

## Disparo em massa / opt-in
https://papoai.com.br/blog/disparo-em-massa-whatsapp

Pontos:
- template;
- opt-in;
- segmentação;
- limite de frequência;
- opt-out;
- evitar disparo indiscriminado.

## Categorias/janela/custo
https://papoai.com.br/blog/api-oficial-whatsapp-precos

Pontos:
- Marketing;
- Utilidade;
- Autenticação;
- Serviço;
- janela de atendimento.

## CRM
https://papoai.com.br/blog/crm-para-whatsapp

Pontos:
- API oficial;
- Kanban;
- múltiplos atendentes;
- follow-up;
- origem;
- relatórios.

## Termos
https://crm.papoai.com.br/terms

Confirma integração da plataforma com API oficial WhatsApp e serviços de terceiros.

---

# Meta / WhatsApp Business Platform

## Coleção oficial Meta — WhatsApp Business Platform
https://www.postman.com/meta/whatsapp-business-platform/overview

## Templates
https://www.postman.com/meta/whatsapp-business-platform/folder/lczy75a/templates

Capacidades:
- listar templates;
- criar;
- editar;
- excluir;
- catálogo;
- multi-produto;
- quick replies;
- CTA.

## Exemplo oficial order_confirmation
Na coleção oficial Meta, exemplo categorizado como `UTILITY`.

## Exemplo oficial order_delivery_update
Na coleção oficial Meta, exemplo categorizado como `UTILITY`.

Princípio do projeto:
a classificação final é submetida/validada pela Meta; não usar categoria inadequada para reduzir custo.

---

# Fontes internas Dona Antônia

Projeto operacional:
`osvaldosereia/SUCEDOAN12`

Arquivos especialmente relevantes:
- `docs/projects/dona-antonia-operations-2/BLING-HOMOLOGATION-RUNBOOK.md`
- `docs/projects/dona-antonia-operations-2/PAPOAI-BRIDGE-FINAL-DRAFT.md`
- `docs/projects/dona-antonia-operations-2/HANDOFF.md`
- `docs/projects/dona-antonia-operations-2/HOMOLOGATION-STATUS.md`
- `docs/projects/dona-antonia-operations-2/SOURCE-OF-TRUTH.md`
- `docs/projects/dona-antonia-operations-2/RELIABILITY-WEBHOOKS-DRAFT.md`

Estado interno deve sempre prevalecer sobre um draft antigo quando houver evidência mais recente no runtime.

---

# Questões ainda sem fonte/contrato suficiente

PapoAI:
- endpoint externo oficial para enviar mensagem livre;
- endpoint externo para enviar template;
- callback/API de sent/delivered/read/failed;
- API de tags;
- API de funil/Kanban;
- API de follow-up;
- API de campanhas;
- API de consulta de templates;
- mecanismo de idempotência/client reference.

A implementação só pode assumir capacidades acima depois de documentação da conta ou teste oficial controlado.
