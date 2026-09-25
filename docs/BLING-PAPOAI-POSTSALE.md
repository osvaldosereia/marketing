# Bling -> PapoAI -> WhatsApp — Eventos de Pedido e Pós-venda

Atualizado em: 2026-09-25
Status: pesquisa/arquitetura; nenhuma programação nova nesta rodada.

## Conclusão principal

É tecnicamente viável e recomendado usar mudanças de pedido no Bling como gatilho para mensagens automáticas no WhatsApp via PapoAI.

Fluxo alvo:

```
Bling
  -> webhook order.updated
  -> Dona Antônia Event Bridge
  -> identifica situacao do pedido
  -> aplica regras/gates
  -> PapoAI
  -> WhatsApp do cliente
```

O Bling não precisa consultar periodicamente nem o Marketing OS deve fazer polling.

## Evidência Bling

A documentação oficial de Webhooks do Bling informa:
- recurso Pedido de Venda: `order`;
- ações: `created`, `updated`, `deleted`;
- payload de `order.updated` contém:
  - id do pedido;
  - número;
  - total;
  - contato.id;
  - loja.id;
  - situacao.id / valor;
- autenticação: `X-Bling-Signature-256` usando HMAC SHA-256;
- duplicatas podem ocorrer e devem ser tratadas com idempotência;
- entrega não é garantida em ordem;
- o receptor deve responder 2xx em até 5 segundos;
- Bling realiza retentativas por até 3 dias.

Fonte oficial:
- https://developer.bling.com.br/webhooks

## Situações do pedido

Situações de pedidos de venda são dinâmicas por conta. Não hardcodar IDs a partir de exemplos.

O projeto deve manter um catálogo local:
- bling_situation_id;
- module;
- label;
- semantic_state;
- customer_message_policy.

Exemplos de semantic_state internos:
- awaiting_confirmation;
- confirmed;
- separating;
- ready_for_dispatch;
- out_for_delivery;
- delivered;
- cancelled;
- returned;
- exception.

## PapoAI

O site público atual do PapoAI declara:
- API oficial WhatsApp/Meta;
- CRM;
- campanhas + funis + automações;
- remarketing;
- Webhook;
- Supabase;
- Bling;
- integração via MCP;
- automações para confirmação de pedido e status de entrega.

Fontes públicas:
- https://papoai.com.br/
- https://papoai.com.br/blog/automacao-whatsapp-fluxos
- https://papoai.com.br/blog/api-oficial-whatsapp-precos

## Regra Meta/PapoAI para mensagem

### Dentro da janela ativa
Se o cliente falou recentemente e a janela de atendimento estiver aberta, usar mensagem livre quando permitido.

### Fora da janela
Usar template aprovado.

Atualização transacional de pedido deve ser desenhada como template de utilidade quando se enquadrar nas regras da Meta.

Exemplos de templates candidatos:
- pedido_confirmado;
- pedido_em_separacao;
- pedido_saiu_entrega;
- entrega_concluida;
- pedido_cancelado;
- problema_entrega;
- pedido_reagendado.

Não transformar cada mudança técnica do ERP em mensagem.

## Quais mudanças realmente devem falar com o cliente

### Enviar
- pedido confirmado;
- pedido aprovado/separação iniciada, se útil;
- saiu para entrega;
- tentativa de entrega/problema relevante;
- entrega concluída;
- cancelamento;
- reagendamento;
- necessidade de ação do cliente.

### Não enviar
- sincronizado com Bling;
- reserva interna;
- atualização técnica;
- webhook recebido;
- geração de fila;
- transição interna sem valor para o cliente;
- NF-e em processamento, salvo se houver motivo comercial/fiscal relevante.

## Exemplo de regra

```
order.updated
  -> situation = OUT_FOR_DELIVERY
  -> localizar pedido canônico
  -> localizar customer_id / phone_e164
  -> verificar se mensagem já foi enviada para este estado
  -> verificar janela WhatsApp
  -> se janela aberta:
       mensagem operacional simples
     senão:
       template utility "pedido_saiu_entrega"
  -> registrar delivery/message id
```

## Idempotência

Chave recomendada:
`order_id + semantic_state + revision`

O mesmo webhook reenviado pelo Bling nunca deve gerar duas mensagens ao cliente.

## Fonte de verdade

Não usar o webhook isoladamente como verdade absoluta.

Ao receber `order.updated`:
1. autenticar assinatura;
2. registrar eventId;
3. responder 2xx rapidamente;
4. processar assíncrono;
5. reconciliar pedido/estado canônico;
6. somente então decidir mensagem.

## Onde fica a regra

Recomendação:
- Bling: fonte ERP/evento;
- Core Dona Antônia: interpreta estado operacional;
- PapoAI: executa WhatsApp;
- Marketing OS: define jornadas/pós-venda e observa resultado, mas não deve virar dono do pedido.

## Integração direta Bling -> PapoAI

O PapoAI anuncia integração com Bling e Webhook, então deve ser investigado se a conta atual permite configurar esse gatilho diretamente.

Mesmo se existir, para a Dona Antônia a arquitetura recomendada continua sendo:

`Bling -> Dona Antônia Bridge -> PapoAI`

Motivos:
- evitar mensagem duplicada;
- traduzir situação técnica em estado comercial;
- consultar telefone/cliente correto;
- bloquear mensagens inadequadas;
- cruzar entrega/pagamento;
- auditar;
- permitir trocar PapoAI no futuro sem alterar o Bling.

## Pós-venda derivado do Bling/Core

Após `delivered` confirmado:
- D+0: agradecimento/recibo/status final, quando apropriado;
- D+1/D+2: verificar satisfação, conforme política;
- depois: pedido neutro de avaliação Google;
- recompra baseada em histórico;
- reativação após período sem compra;
- campanhas por produtos efetivamente comprados;
- suspender marketing se houver reclamação/devolução/ocorrência.

## Capacidade atual do projeto Dona Antônia

Já existe no projeto operacional:
- webhook receiver Bling planejado/implementado com HMAC e idempotência;
- vínculo pedido local <-> `bling_order_id`;
- cliente/telefone no Core;
- captura real PapoAI inbound;
- contrato canônico de eventos PapoAI em evolução.

Gap principal para este fluxo:
- homologar API/ação outbound oficial do PapoAI para enviar mensagem/template por telefone/contato;
- mapear situações reais do Bling da conta;
- definir templates e regras de utilidade;
- registrar message_id e estado de entrega/leitura;
- impedir duplicidade.

## Decisão de arquitetura

Tratar Bling como **event source** e não como motor de comunicação.

Toda mensagem automática baseada em pedido deve passar por uma camada de política antes do PapoAI.
