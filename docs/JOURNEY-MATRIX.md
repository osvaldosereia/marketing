# JOURNEY MATRIX — Pós-venda e Recompra WhatsApp

Atualizado em: 2026-09-25  
Status: desenho funcional pré-implementação.

## Princípio

Cada mensagem deve existir porque houve um evento de negócio claro e uma política permitiu o envio. Nenhuma mudança puramente técnica do ERP gera mensagem.

| Evento canônico | Momento | Objetivo | Tipo | Pré-condições | Bloqueios | Próximo passo |
|---|---|---|---|---|---|---|
| order.awaiting_confirmation | imediato | pedir confirmação quando necessário | transacional | pedido válido, telefone, resumo atual | confirmação já feita; revisão antiga | confirmado/cancelado |
| order.confirmed | imediato | confirmar aceite | transacional | não houve confirmação equivalente recente | duplicidade | aguardar operação |
| order.ready | opcional | normalmente nenhum envio | interno | — | padrão = não enviar | out_for_delivery |
| order.out_for_delivery | imediato | avisar saída | Utility candidato | estado inequívoco, telefone | duplicidade/cancelamento | delivered/exception |
| order.delivery_exception | imediato | solicitar/avisar ação | Utility candidato | exceção real | — | humano/reagendamento |
| order.delivered | imediato ou fechamento | agradecer e abrir suporte | transacional/pós-venda | entrega real | devolução/payment exception | pós-venda |
| order.cancelled | imediato | confirmar cancelamento | Utility candidato | cancelamento real | duplicidade | encerrar/suppress |
| order.returned | imediato/interno | suporte humano | sem marketing | retorno real | sempre bloqueia marketing | resolver |
| postsale.check | D+1/D+2 | confirmar que chegou tudo certo | template conforme janela | entrega saudável | complaint, return, opt-out operacional | satisfação |
| postsale.problem | imediato após resposta | encaminhar humano | serviço | problema detectado | — | resolução |
| customer.marketing_opted_in | após consentimento | habilitar ofertas/recompra | consentimento | resposta explícita | — | elegibilidade |
| customer.marketing_opted_out | imediato | parar marketing | controle | qualquer pedido de saída | — | suppress |
| rebuy.eligible | data calculada | reengajar/repor | MARKETING | opt-in, histórico válido, estoque/preço atual | suppression, pedido recente | campanha |
| rebuy.converted | após novo pedido | medir conversão e parar cadência | interno | vínculo campanha/pedido | — | novo ciclo |

---

# 1. Pedido confirmado

## Enviar quando
- a confirmação ocorreu fora da própria conversa PapoAI ou não houve mensagem equivalente;
- pedido existe e está íntegro.

## Não enviar quando
- PapoAI acabou de confirmar o pedido e já respondeu;
- retry/webhook duplicado;
- pedido foi cancelado imediatamente.

## Dados permitidos
- número do pedido;
- resumo curto;
- previsão conforme regra operacional vigente;
- forma de pagamento quando útil e correta.

Não usar informação fiscal/técnica desnecessária.

---

# 2. Saiu para entrega

Esse é o primeiro caso recomendado para POC transacional.

## Motivo
- evento simples;
- alto valor para o cliente;
- baixa ambiguidade;
- fácil validar manualmente.

## Bloqueador atual
O Bling atual mapeia tanto `ready` quanto `out_for_delivery` para `Verificado`.

Antes da POC:
- criar/homologar situação específica no Bling; OU
- usar evento canônico da expedição local.

Não disparar usando apenas `Verificado` até resolver.

---

# 3. Entrega concluída

## O evento precisa ser confiável
Não assumir que todo pedido histórico com status textual `delivered` possui `delivered_at` consistente.

Para novos pedidos, o evento deve nascer do processo atual de entrega/fechamento e reconciliar com Bling.

## Ações
1. encerrar notificações de rota;
2. verificar incidentes/pagamento/retorno;
3. registrar início potencial de pós-venda;
4. não iniciar oferta imediatamente.

---

# 4. Check pós-venda

Timing inicial recomendado para teste: D+1 ou D+2.

Objetivo:
- "chegou tudo certo?";
- detectar erro;
- oferecer suporte.

Não transformar o primeiro contato pós-venda em promoção.

## Resposta positiva
- marcar pós-venda saudável;
- cliente pode ser convidado posteriormente a consentir marketing;
- futuro: avaliação/recomendação.

## Resposta negativa
- abrir atendimento humano;
- `marketing_suppressed=true`;
- cancelar qualquer recompra/follow-up comercial já agendado;
- somente retomar marketing após resolução e consentimento válido.

## Sem resposta
- não criar longa cadência de cobrança de satisfação;
- no máximo uma política conservadora futura, a homologar.

---

# 5. Consentimento

Hoje a base do Core possui 0 clientes com opt-in ativo.

## Regra
Recompra de marketing só começa depois de resposta explícita.

## Preferência de UX
Botões/quick replies se o PapoAI disponibilizar:
- Sim, pode me avisar
- Não quero receber

## Evidência
Guardar:
- customer_id;
- phone;
- timestamp;
- source;
- external_message_id da pergunta;
- external_message_id da resposta;
- wording_version;
- resposta;
- status atual.

## Revogação
Palavras/intenção de saída ou botão de opt-out revogam imediatamente:
- parar;
- sair;
- não quero;
- não me mande;
- cancelar ofertas;
- equivalente semanticamente inequívoco.

IA pode classificar a intenção, mas opt-out explícito deve ter caminho determinístico.

---

# 6. Recompra

## Recompra de cesta
Caso de maior valor inicial.

Exemplos de elegibilidade:
- cesta básica previamente comprada;
- cliente costuma voltar em intervalo semelhante;
- nenhuma compra recente;
- opt-in;
- cesta continua ativa;
- preço recalculado no momento;
- itens disponíveis conforme regra do Core.

CTA ideal:
- repetir/abrir última cesta;
- abrir catálogo personalizado;
- responder no próprio WhatsApp.

## Recompra de itens
Somente depois de histórico suficiente.

Evitar listar 10 produtos aleatórios. Selecionar por:
- compra real anterior;
- frequência;
- relevância;
- estoque atual;
- oferta válida.

## Oferta de validade
Pode ser usada em recompra somente se:
- cliente comprou produto/categoria compatível;
- oferta ainda válida;
- quantidade promocional disponível;
- opt-in;
- frequência de marketing respeitada.

---

# 7. Cooldowns iniciais

Valores serão homologados por teste, não hardcoded como verdade eterna.

Sugestão inicial conservadora:
- nunca duas mensagens de marketing no mesmo dia;
- máximo uma ação de recompra ativa por cliente;
- novo pedido cancela recompra pendente;
- opt-out cancela tudo;
- reclamação/retorno cancela tudo;
- mensagens transacionais não contam como autorização para marketing.

---

# 8. Métricas por etapa

Transacional:
- eligible;
- sent;
- delivered;
- read;
- failed;
- duplicate_suppressed.

Pós-venda:
- sent;
- response rate;
- healthy;
- issue detected;
- human handoff;
- resolved.

Consentimento:
- asked;
- opt_in;
- opt_out;
- no_response.

Recompra:
- eligible;
- suppressed;
- sent;
- delivered;
- reply;
- clicked/opened catalog;
- new order;
- revenue attributed;
- unsubscribe.

---

# 9. Política de IA

OpenAI pode:
- classificar resposta de satisfação;
- classificar intenção de recompra;
- resumir reclamação;
- adaptar texto dentro de template/campo permitido;
- escolher itens dentre candidatos aprovados.

OpenAI não pode:
- conceder opt-in sem resposta explícita;
- remover suppression;
- inventar preço;
- inventar desconto;
- afirmar estoque;
- alterar pedido;
- decidir categoria Meta para burlar política;
- insistir após opt-out.
