# PROJECT MASTER — Bling + PapoAI Pós-venda e Recompra

Atualizado em: 2026-09-25  
Projeto: Dona Antônia Marketing  
Repositório: `osvaldosereia/marketing`  
Status: especificação pré-implementação  
Escopo congelado: **Bling -> PapoAI -> WhatsApp -> pós-venda -> consentimento -> recompra**

---

# 1. Objetivo

Construir uma integração confiável e simples em que eventos reais do ciclo do pedido alimentem automaticamente o atendimento/pós-venda pelo WhatsApp e, depois, jornadas de recompra relevantes.

O projeto não é um novo ERP, não é um novo CRM completo e não substitui o PapoAI.

Papéis:

- **Bling**: ERP e fonte de eventos comerciais/fiscais relevantes.
- **Core Dona Antônia / SUCEDOAN12**: traduz estados técnicos em eventos de negócio confiáveis e mantém pedido/cliente/estoque.
- **PapoAI**: canal WhatsApp, CRM, IA, atendimento humano, templates, follow-up, funil e campanhas quando disponíveis.
- **Marketing**: política de jornadas, consentimento, pós-venda, recompra, histórico de comunicação e mensuração.

Objetivo final da primeira versão:

```
pedido muda no Bling/Core
        ↓
evento confiável
        ↓
regra de jornada
        ↓
PapoAI envia WhatsApp
        ↓
resposta do cliente volta pelo PapoAI
        ↓
jornada avança, pausa ou transfere para humano
        ↓
após pós-venda saudável + consentimento
        ↓
recompra segmentada
```

---

# 2. Fora do escopo até esta integração funcionar

Pausar pesquisa/implantação de:
- Instagram/Facebook publishing;
- Google Business Profile;
- Merchant Center;
- Threads/TikTok/Pinterest/YouTube;
- Meta Ads/Google Ads;
- Creative Studio;
- social inbox fora do WhatsApp;
- Marketing OS amplo.

Essas frentes poderão voltar depois.

---

# 3. Estado real confirmado em 2026-09-25

## 3.1 Bling

A infraestrutura Bling do Core está mais madura do que os drafts antigos indicavam.

Confirmado no runtime atual:
- OAuth dos domínios principais está saudável;
- `situacoes/modulos` já foi homologado;
- módulo Vendas identificado;
- catálogo de situações está em estado `ready`;
- `status_updates_enabled=true`;
- webhooks reais do Bling já chegaram ao receiver;
- assinatura HMAC foi validada;
- assinatura inválida foi rejeitada;
- idempotência de eventos foi testada;
- eventos `order.updated` reais foram recebidos;
- rollback do pedido canário também gerou evento real;
- eventos `virtual_stock.updated` reais foram recebidos e usados em homologação.

O runtime ainda permanece globalmente em modo de homologação:
- `hub_enabled=false`;
- `webhooks_enabled=false` para processamento geral;
- processamento de comunicação NÃO deve ser ligado antes da POC específica deste projeto.

Receiver existente no Core:
`admin-service-intelligence-v1?source=bling-webhook-v2`

Não criar um segundo receiver Bling no projeto Marketing.

## 3.2 Situações Bling atuais

Módulo Vendas atual: `98310`.

Situações relevantes observadas:
- `6` — Em aberto;
- `9` — Atendido;
- `12` — Cancelado;
- `15` — Em andamento;
- `21` — Em digitação;
- `24` — Verificado;
- `785956` — Aguardando etiqueta;
- `785957` — Em devolução;
- `915901` — Aguardando confirmação;
- `915902` — Aprovado / Separar.

Mapeamento operacional atual:
- created/storefront_received -> Aguardando confirmação;
- confirmed/processing -> Aprovado / Separar;
- ready -> Verificado;
- out_for_delivery -> Verificado;
- delivered -> Atendido;
- cancelled -> Cancelado.

### Gap crítico de estados

Hoje `ready` e `out_for_delivery` convergem para a mesma situação Bling `Verificado`.

Isso impede que somente um `order.updated` do Bling distinga:
- pedido pronto;
- pedido efetivamente saiu para entrega.

Antes de automatizar mensagem "saiu para entrega", escolher uma solução:

**Preferida:** criar situação Bling específica `Saiu para entrega` e transições homologadas.

Alternativa: usar evento canônico de expedição/rota do Core como fonte desse momento.

Como o foco deste projeto é integração Bling -> PapoAI, a situação explícita no Bling é a opção conceitualmente mais limpa, mas só deverá ser criada durante POC autorizada.

## 3.3 PapoAI

O Core já recebe eventos reais do PapoAI.

Estado observado:
- receiver `papo-external-agent-v1`;
- eventos reais `message.received`;
- payload possui `contact`, `message`, `session`;
- possui message id / WAMID, direction, tipo, telefones, conteúdo e mídia;
- textos, áudios e imagens já foram observados;
- mensagens inbound são normalizadas e vinculadas a conversa local;
- captura é idempotente;
- texto livre não cria pedido automaticamente.

### Gap crítico PapoAI

Ainda NÃO foi homologado um contrato outbound documentado e controlável para:

```
send_message(phone/contact, content)
send_template(phone/contact, template, variables)
schedule/followup(...)
move_funnel_stage(...)
set_tag(...)
stop_campaign(...)
```

O site público do PapoAI confirma:
- API oficial Meta;
- templates;
- campanhas/funis/automações;
- follow-up;
- CRM/Kanban;
- Webhook;
- Bling;
- Supabase;
- MCP;
mas a documentação pública encontrada não expõe o endpoint/contrato outbound exato.

**Este é o Gate P1 e o principal bloqueador técnico antes da programação de envio.**

Não inventar endpoint nem bypassar PapoAI com Cloud API Meta enquanto a estratégia aprovada for PapoAI-first.

## 3.4 Clientes e consentimento

Base atual observada:
- 490 clientes;
- `marketing_opt_in=true`: 0;
- `marketing_opt_in=false`: 490.

Conclusão:
- mensagens transacionais vinculadas a pedido devem ser tratadas separadamente das campanhas;
- recompra/promocional não pode assumir consentimento da base histórica;
- a primeira versão precisa incluir aquisição e revogação explícita de consentimento.

Nunca converter os 490 clientes para opt-in em lote.

## 3.5 Pedidos / histórico

Estado observado:
- 87 pedidos locais;
- 80 vinculados a cliente;
- 63 com telefone preenchido;
- 27 com `bling_order_id`;
- fontes misturadas: Bling import, shopping_room, storefront_v2, vitrine e legado;
- histórico local começa em janeiro/2026, mas é pequeno e heterogêneo.

As views/RPCs antigas de histórico de compras que apareciam em código histórico não existem mais no banco atual.

Existe função antiga `refresh_customer_purchase_profile` que referencia `customer_product_stats`, mas a tabela não existe atualmente. Não reutilizar essa função sem revisão.

**Recompra v1 deve usar um novo read model controlado, alimentado por pedidos válidos, e não ressuscitar estruturas legadas.**

---

# 4. Regras oficiais que condicionam o projeto

## Bling

O webhook é a fonte preferida para reação a mudanças:
- recurso `order`;
- ações `created`, `updated`, `deleted`;
- payload de pedido inclui `situacao.id`;
- eventos podem ser duplicados;
- não há garantia de ordem;
- receiver deve responder rapidamente;
- processamento deve ser assíncrono;
- assinatura deve ser validada.

## WhatsApp / Meta / PapoAI

Separar dois mundos:

### Comunicação transacional
Ligada a uma transação/pedido existente:
- confirmação;
- status de entrega;
- cancelamento;
- reagendamento;
- problema operacional.

Templates desse tipo são candidatos naturais à categoria Utility, sujeitos à aprovação/classificação final da Meta.

### Comunicação de marketing/recompra
- oferta;
- "hora de repor";
- promoção personalizada;
- reativação;
- indicação comercial.

Tratar como marketing e exigir consentimento/opt-in válido.

### Janela de atendimento
Dentro da janela ativa iniciada pelo cliente, mensagens livres podem ser usadas de acordo com as regras da plataforma. Fora dela, usar template aprovado.

---

# 5. Arquitetura

## Regra principal

**Bling nunca chama PapoAI diretamente como regra de negócio crítica.**

Mesmo que PapoAI ofereça um conector Bling pronto, o projeto deve manter um policy gate da Dona Antônia.

Arquitetura:

```
BLING
  ↓ webhook
CORE DONA ANTÔNIA
  ├─ valida assinatura
  ├─ idempotência
  ├─ reconcilia pedido
  └─ emite Business Event
           ↓
MARKETING BRIDGE
           ↓
JOURNEY ENGINE
  ├─ consent
  ├─ suppression
  ├─ timing
  ├─ dedupe
  └─ policy
           ↓
PAPOAI ADAPTER
           ↓
WHATSAPP
```

Resposta do cliente:

```
WHATSAPP
  ↓
PAPOAI
  ↓ webhook existente
CORE / MARKETING BRIDGE
  ↓
JOURNEY ENGINE
  ├─ resposta positiva
  ├─ opt-out
  ├─ reclamação
  ├─ recompra
  └─ humano
```

---

# 6. Eventos de negócio canônicos

Não expor IDs técnicos do Bling diretamente ao Marketing.

Contrato inicial:

- `order.awaiting_confirmation`
- `order.confirmed`
- `order.ready`
- `order.out_for_delivery`
- `order.delivered`
- `order.cancelled`
- `order.returned`
- `order.delivery_exception`
- `order.payment_exception`
- `customer.marketing_opted_in`
- `customer.marketing_opted_out`
- `customer.complaint_opened`
- `customer.complaint_resolved`
- `rebuy.eligible`
- `rebuy.suppressed`

Campos mínimos:

```json
{
  "event_id": "uuid",
  "type": "order.delivered",
  "occurred_at": "ISO-8601",
  "order_id": "uuid",
  "bling_order_id": "optional",
  "customer_id": "uuid",
  "phone_e164": "optional",
  "revision": 1,
  "source": "bling|core",
  "correlation_id": "uuid"
}
```

Dados sensíveis/completos não devem ser replicados sem necessidade.

---

# 7. Idempotência de comunicação

Uma mudança de estado pode gerar:
- evento duplicado do Bling;
- retry do worker;
- retry do PapoAI;
- resposta atrasada.

Nenhum deles pode duplicar mensagem.

Chave conceitual:

`customer_id + order_id + journey_step + revision`

Exemplo:
`cliente123:pedido456:out_for_delivery:v1`

Antes de enviar:
1. verificar se step já foi concluído;
2. verificar se mensagem já foi aceita pelo PapoAI;
3. registrar provider_message_id;
4. webhook/retry posterior apenas atualiza estado.

---

# 8. Jornada V1

## Etapa A — Pedido confirmado

Evento:
`order.confirmed`

Objetivo:
- confirmar que o pedido foi aceito;
- informar próximo passo;
- não enviar se a própria confirmação no PapoAI já acabou de gerar mensagem equivalente.

Classificação: transacional.

## Etapa B — Saiu para entrega

Evento:
`order.out_for_delivery`

Objetivo:
- informar que o pedido saiu;
- reduzir mensagens "meu pedido já saiu?";
- opcionalmente informar orientação simples de recebimento.

Classificação: transacional/Utility.

Gate:
- precisa existir estado inequívoco.

## Etapa C — Entrega concluída

Evento:
`order.delivered`

Objetivo:
- fechar ciclo operacional;
- agradecer;
- abrir canal de suporte;
- agendar pós-venda, não marketing imediato.

Se houver devolução, cancelamento, pagamento pendente ou incidente:
- não iniciar pós-venda comercial normal;
- abrir/sustentar suppression.

## Etapa D — Pós-venda

Referência inicial:
D+1 ou D+2 após entrega, ajustável.

Objetivo:
- perguntar se chegou tudo certo;
- detectar problema antes de vender novamente;
- coletar resposta simples.

Resultado:
- positivo/neutro -> pode seguir;
- problema/reclamação -> humano + `marketing_suppressed=true`;
- sem resposta -> não insistir agressivamente.

## Etapa E — Consentimento para ofertas/recompra

Só depois de atendimento saudável.

Consentimento deve ser:
- explícito;
- registrável;
- revogável;
- associado ao canal WhatsApp;
- com fonte, timestamp e versão do texto.

Exemplo conceitual:
"Posso te avisar pelo WhatsApp quando tiver ofertas e quando estiver perto da hora de repor sua compra?"

Preferir botão/resposta estruturada se PapoAI disponibilizar.

## Etapa F — Elegibilidade de recompra

Somente se:
- opt-in ativo;
- cliente ativo;
- sem complaint/suppression;
- nenhum pedido muito recente que torne a mensagem irrelevante;
- pedido histórico válido;
- produtos sugeridos ativos e vendáveis;
- estoque/preço revalidado no momento da preparação;
- frequência de contato respeitada.

## Etapa G — Recompra

Primeira versão deve ser simples.

Tipos:
1. repetir última compra/cesta;
2. lembrar reposição após intervalo;
3. informar oferta realmente relevante a produto/categoria previamente comprada;
4. reativar cliente inativo, com frequência limitada.

Nunca:
- inventar oferta;
- recomendar produto sem estoque;
- usar dado antigo de preço;
- mandar recompra para cliente com ocorrência aberta;
- insistir depois de opt-out.

---

# 9. Motor de recompra — estratégia incremental

## V1 — regra determinística

Sem IA preditiva.

- última compra válida;
- dias desde última compra;
- quantidade de compras;
- ticket;
- itens/categorias;
- novo pedido recente?;
- consentimento?;
- suppression?;
- produto ativo/estoque?;
- cooldown desde última campanha?.

Clientes com somente uma compra:
- entrar apenas em regra conservadora de reativação após janela definida.

Clientes com duas ou mais compras:
- calcular intervalo observado entre compras;
- futuramente usar mediana, não média, para reduzir distorção.

## V2 — produto/categoria

Quando houver histórico suficiente:
- intervalo por categoria;
- intervalo por produto;
- quantidade típica;
- afinidade de cesta;
- taxa de resposta.

## V3 — IA

OpenAI pode:
- escolher dentre produtos previamente elegíveis;
- ajustar linguagem ao histórico;
- resumir motivos;
- escolher variação de copy.

OpenAI NÃO decide:
- consentimento;
- se estoque existe;
- preço;
- desconto;
- se cliente está bloqueado;
- se mensagem pode ser enviada fora da janela;
- status real do pedido.

---

# 10. Consentimento e suppression

## Consentimento

O booleano atual no Core não é suficiente como trilha final.

Modelo futuro do Marketing:
- customer_id;
- channel = whatsapp;
- purpose = marketing_rebuy;
- status = opted_in | opted_out;
- captured_at;
- source = papoai | checkout | admin;
- proof/reference;
- wording_version;
- revoked_at.

O Core pode manter `marketing_opt_in` como espelho simplificado, mas a evidência detalhada pertence à camada de consentimento.

## Suppression

Bloquear marketing quando:
- opt-out;
- reclamação aberta;
- devolução;
- entrega com problema;
- pedido cancelado recente;
- fraude/abuso;
- telefone inválido;
- repetidas falhas de entrega de mensagem;
- frequência excedida;
- cliente pediu para não receber.

Transactional critical updates podem ter política separada quando legitimamente necessárias.

---

# 11. Requisitos para o PapoAI Adapter

Antes de código de produção, obter e testar contrato para:

## Obrigatórios
- enviar mensagem livre;
- enviar template aprovado;
- informar telefone/contact/session;
- receber provider message id;
- consultar/receber status sent/delivered/read/failed, se oferecido;
- receber resposta do cliente;
- opt-out;
- transferir/atribuir humano ou sinalizar atendimento;
- idempotência ou client reference quando disponível.

## Desejáveis
- criar/atualizar tag;
- mover Kanban/funil;
- criar follow-up;
- cancelar follow-up;
- criar campanha/segmento;
- consultar janela/conversa;
- consultar templates;
- usar botões/quick replies;
- executar WhatsApp Flow;
- expor métricas;
- MCP para operações administrativas.

Se não existir API pública, solicitar documentação/credenciais ao suporte PapoAI ou usar mecanismo de Webhook/MCP oficial oferecido pela conta.

---

# 12. Requisitos de mensagens/templates

Conjunto inicial candidato:

Transacionais:
- `da_pedido_confirmado_v1`
- `da_pedido_saiu_entrega_v1`
- `da_pedido_reagendado_v1`
- `da_pedido_cancelado_v1`
- `da_entrega_concluida_v1`

Pós-venda:
- `da_posvenda_satisfacao_v1`

Marketing:
- `da_recompra_lembrete_v1`
- `da_recompra_oferta_relevante_v1`
- `da_reativacao_cliente_v1`

A categoria final é definida pela Meta no processo de aprovação; não mascarar promoção como Utility.

---

# 13. Observabilidade mínima

Para cada tentativa:
- journey_step;
- event_id;
- customer_id;
- order_id;
- template/message type;
- PapoAI/provider id;
- requested_at;
- accepted_at;
- delivered_at;
- read_at;
- failed_at;
- failure code;
- reply_at;
- reply classification;
- opt-out;
- conversion/order id relacionado.

Dashboard inicial:
- eventos recebidos;
- mensagens elegíveis;
- bloqueadas por política;
- enviadas;
- entregues;
- lidas;
- respostas;
- problemas;
- opt-ins;
- opt-outs;
- recompra iniciada;
- recompra convertida.

---

# 14. Gates pré-implementação

## Gate B1 — Bling
Já praticamente verde:
- webhook real confirmado;
- assinatura/idempotência provadas;
- situações lidas.

Pendente para jornada:
- definir estado inequívoco de `out_for_delivery`;
- confirmar estado final inequívoco de entrega.

## Gate P1 — PapoAI outbound
Bloqueador atual:
- obter contrato real de envio;
- testar mensagem para número canário;
- testar template;
- obter message id;
- provar callback/status;
- provar resposta volta ao receiver existente.

## Gate C1 — Consentimento
- definir texto;
- definir captura;
- armazenar prova;
- testar opt-out;
- não migrar base histórica automaticamente.

## Gate D1 — Dados de recompra
- definir read model novo;
- usar apenas pedidos válidos;
- validar itens do pedido;
- revisar histórico Bling disponível;
- eliminar dependência de RPC/view legada inexistente.

## Gate S1 — Estados/suppression
- reclamação;
- devolução;
- cancelamento;
- entrega problemática;
- novo pedido recente.

---

# 15. Estratégia de implantação

Nada de envio em massa no primeiro dia.

## POC 0 — contrato PapoAI
Sem automação:
- documentar API;
- envio manual técnico canário;
- retorno/status.

## POC 1 — shadow
Bling/Core gera evento, Marketing decide a mensagem, mas NÃO envia.
Comparar decisão com operação real.

## POC 2 — transacional canário
Um único evento e um único número de teste:
- preferencialmente `out_for_delivery` após estado inequívoco.

## POC 3 — entregue + pós-venda
Pequeno conjunto autorizado:
- entrega;
- D+1/D+2;
- resposta;
- problema -> humano.

## POC 4 — consentimento
Captura estruturada:
- sim/não;
- prova;
- revogação.

## POC 5 — recompra canário
Somente clientes opt-in:
- regra simples;
- pequeno lote;
- verificar entrega/resposta/conversão.

## POC 6 — operação normal
Só após:
- zero duplicidade;
- suppression provado;
- opt-out provado;
- templates homologados;
- métricas;
- rollback.

---

# 16. Critério de pronto para iniciar programação

Programação poderá começar quando:
1. este PROJECT-MASTER for aceito como baseline;
2. contrato outbound PapoAI estiver obtido ou houver caminho oficial homologável;
3. situação/fonte `out_for_delivery` estiver definida;
4. mecanismo de consentimento estiver fechado;
5. read model de recompra estiver especificado;
6. templates candidatos estiverem definidos;
7. POC/rollback estiver documentado.

Não é necessário esperar toda a futura plataforma Marketing para começar. A primeira implementação será apenas desta integração.

---

# 17. Princípio final

A integração não deve ser "Bling mudou -> dispara WhatsApp".

Deve ser:

**Bling mudou -> Core confirma o fato -> Journey Engine pergunta se deve comunicar -> PapoAI executa -> resposta retroalimenta a jornada.**

É essa camada de política que impede mensagens duplicadas, inadequadas, fora de contexto ou promocionais sem consentimento.
