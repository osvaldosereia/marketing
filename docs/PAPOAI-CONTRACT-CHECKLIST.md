# PapoAI — Checklist para liberar o contrato de integração

Atualizado em: 2026-09-25

Objetivo: obter somente as informações necessárias para implementar a integração Dona Antônia sem Make.

## Precisamos confirmar com o PapoAI

1. API ou webhook para um sistema externo iniciar uma automação/funil para um contato.
2. API para enviar mensagem livre dentro da janela permitida.
3. API para enviar template aprovado fora da janela.
4. Método de autenticação.
5. Identificador aceito: telefone, contact_id, session.uid etc.
6. Retorno de message id/WAMID.
7. Webhooks de sent, delivered, read e failed.
8. Idempotency key / external event id.
9. Criar/remover etiquetas por API.
10. Mover card/etapa Kanban por API.
11. Criar/iniciar/cancelar follow-up por API.
12. Interromper follow-up automaticamente quando o cliente responder.
13. Interromper quando um webhook externo informar novo pedido, cancelamento ou reclamação.
14. Acionar uma campanha para um único contato ou segmento.
15. Registrar opt-in e opt-out com evidência.
16. Consultar templates aprovados e sua categoria/status.
17. Botões/quick replies em templates e mensagens interativas.
18. WhatsApp Flows controláveis por integração.
19. Campos customizados de contato/pedido.
20. Rate limits e política de retry.
21. MCP oficial: endpoint, autenticação e lista de tools/actions disponíveis.
22. Webhook de entrada: se pode receber `order.confirmed`, `order.out_for_delivery`, `order.delivered` e iniciar uma régua.

## Caso de uso que deve ser explicado ao suporte

```
Bling/Core informa: order.delivered
PapoAI:
  -> associa o contato pelo telefone
  -> agenda pós-venda D+1/D+2
  -> envia template se necessário
  -> se cliente responder com problema, cancela marketing e transfere ao humano
  -> se resposta saudável, permite etapa de consentimento
  -> se consentiu, futura régua de recompra
```

Precisamos saber quais partes o PapoAI executa nativamente e quais exigem nossa API.

## Regra

Não solicitar nem enviar ao suporte:
- token Bling;
- service role Supabase;
- dados reais de clientes;
- dump de banco.

Usar somente payload canário/fictício durante homologação.
