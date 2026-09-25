# Alternativas ao PapoAI — WhatsApp, Atendimento e APIs

Atualizado em: 2026-09-25  
Status: pesquisa e contingência; nenhuma migração aprovada; nenhuma programação iniciada.

## Objetivo

Avaliar plataformas semelhantes ao PapoAI que possam servir como:
1. substituto futuro, se necessário;
2. referência funcional para o Marketing OS;
3. camada WhatsApp alternativa com API aberta e webhooks;
4. plataforma que permita ao Marketing OS controlar contatos, conversas, templates, campanhas, automações e atendimento humano.

Critérios:
- WhatsApp oficial / Meta;
- API REST/documentada;
- webhooks;
- mensagens e templates;
- contatos/CRM;
- atendimento humano/multiagente;
- automações;
- campanhas/follow-up;
- controle externo pelo Marketing OS;
- adequação ao Brasil;
- possibilidade de integrar sem Make.

## Resultado geral

Existem dois grupos diferentes de fornecedores:

### Grupo A — Plataforma pronta parecida com PapoAI
- Blip;
- Zenvia;
- WATI;
- respond.io;
- Twilio Flex (mais técnico e mais amplo).

### Grupo B — infraestrutura WhatsApp para construirmos nossa própria camada
- 360dialog;
- Gupshup;
- Twilio Messaging/Conversations sem Flex;
- Meta WhatsApp Cloud API direta.

Para a Dona Antônia, **não há motivo hoje para substituir o PapoAI apenas por substituir**. O PapoAI já está integrado à operação e o Core já captura eventos reais dele. Esta pesquisa deve ser mantida como contingência e como referência do que exigir das integrações futuras.

---

# 1. Blip

## Perfil
Plataforma brasileira de conversas/automação com Builder, Desk humano, WhatsApp oficial e APIs.

## Capacidades relevantes confirmadas
- Builder para automações;
- Blip Desk para atendimento humano;
- mensagens ativas WhatsApp;
- templates Meta;
- envio em massa/Broadcast;
- Scheduling;
- contatos;
- histórico;
- comandos para APIs internas da própria Blip;
- webhooks de mensagens, contatos e eventos;
- autenticação de webhook por OAuth 2.0 Client Credentials ou cabeçalhos customizados;
- WhatsApp Flows;
- Flow com Data Channel/API externa;
- API de comandos que permite criar/atualizar/publicar Flows;
- capacidade de enviar dados do bot para sistemas externos.

## Ponto técnico importante
A documentação da Blip mostra uma API de comandos ampla e WhatsApp Flows com endpoint externo. Isso permitiria manter preços, estoque, pedidos e regras na Dona Antônia e usar a Blip como camada de conversa.

## Limitações / cuidados
- alguns recursos podem depender do produto/plano contratado;
- algumas extensões são pagas;
- ao usar API oficial tradicional, o número pode deixar de operar no WhatsApp App/Web dependendo do modo de conexão;
- precisa validar custos comerciais antes de qualquer decisão.

## Adequação
**Alta como substituto funcional do PapoAI.**
Tem forte aderência ao mercado brasileiro e oferece atendimento humano + automação + API.

## Fontes oficiais
- https://docs.blip.ai/
- https://help.blip.ai/hc/pt-br/articles/4474381206423
- https://help.blip.ai/hc/pt-br/articles/4474389804823
- https://help.blip.ai/hc/pt-br/articles/19143153044375
- https://help.blip.ai/hc/pt-br/articles/7373954031127

---

# 2. Zenvia

## Perfil
CPaaS/Customer Cloud brasileira com APIs multicanal e ferramentas comerciais/atendimento.

## Capacidades relevantes
- WhatsApp;
- Instagram;
- Facebook Messenger;
- SMS;
- RCS;
- e-mail;
- API REST/OpenAPI;
- mensagens e webhooks;
- WhatsApp Flows;
- conteúdo estruturado;
- contatos/leads;
- automações;
- integração com sistemas externos.

A referência oficial expõe tipos de conteúdo WhatsApp como Flow e Flow Response, o que permite integrar experiências estruturadas com nosso backend.

## Ponto técnico
É interessante se quisermos concentrar vários canais em um fornecedor brasileiro e controlar via API.

## Limitações
- plataforma ampla pode ser maior/mais cara que a necessidade local da Dona Antônia;
- precisamos homologar exatamente quais recursos ficam disponíveis por API no plano comercial pretendido;
- não assumir que todo módulo da interface Customer Cloud possui endpoint equivalente.

## Adequação
**Alta como contingência multicanal**, especialmente se futuramente quisermos WhatsApp + outros canais no mesmo fornecedor.

## Fontes oficiais
- https://zenvia.github.io/
- https://zenvia.com/devs/
- https://zenvia.com/whatsapp/

---

# 3. WATI

## Perfil
Plataforma WhatsApp-first com inbox, campanhas e API.

## Capacidades confirmadas
- envio de template individual e em massa;
- agendamento de templates;
- criação de templates via API;
- categorias MARKETING, UTILITY e AUTHENTICATION;
- subtipos como:
  - CAROUSEL;
  - CATALOG;
  - CHECKOUT_BUTTON;
  - ORDER_STATUS;
  - LIMITED_TIME_OFFER;
- webhooks de:
  - mensagem recebida;
  - mensagem enviada;
  - sent;
  - delivered;
  - read;
  - reply;
  - falhas de template;
- identificação por telefone, Contact ID e BSUID em APIs recentes.

## Ponto técnico
A API é muito explícita e orientada à integração de aplicações externas. Para o Marketing OS isso é positivo.

## Limitações
- recursos de API dependem do plano;
- é focada principalmente em WhatsApp, não substitui sozinha todo o ecossistema de marketing social;
- exige comparar custo total com PapoAI antes de considerar migração.

## Adequação
**Alta se a prioridade for WhatsApp + campanhas + API**, menor se quisermos uma plataforma multicanal completa.

## Fontes oficiais
- https://docs.wati.io/reference/introduction-1
- https://docs.wati.io/reference/post_api-v1-sendtemplatemessages
- https://docs.wati.io/reference/post_api-ext-v3-messagetemplates-schedule
- https://docs.wati.io/reference/createwhatsapptemplatev1

---

# 4. respond.io

## Perfil
Inbox omnichannel + Workflows + automação + AI Agent + Developer API.

## Capacidades confirmadas
- WhatsApp Cloud API;
- inbox multiusuário;
- broadcast;
- métricas de agentes/equipe;
- Developer API;
- sincronização com CRM;
- automação de mensagens;
- disparo de Workflows por API;
- Workflows com Incoming Webhook;
- gatilhos por conversa, contato, anúncio Click-to-Chat e outras fontes;
- WhatsApp Coexistence em cenários suportados.

## API
A Developer API pode operar recursos centrais da plataforma e acionar Workflows.

## Restrições importantes
- Developer API: Growth Plan ou superior;
- Incoming Webhook em Workflow: Advanced ou superior, segundo a documentação atual;
- portanto, para integração realmente profunda, plano é fator importante.

## Adequação
**Muito boa tecnicamente**, mas precisamos avaliar preço. É especialmente atraente se o objetivo for uma central omnichannel já pronta, mantendo nosso Marketing OS como inteligência externa.

## Fontes oficiais
- https://respond.io/help/integrations/developer-api
- https://respond.io/help/workflows/workflow-triggers
- https://respond.io/help/whatsapp/whatsapp-cloud-api
- https://respond.io/help/whatsapp/whatsapp-api-quick-start

---

# 5. Twilio

## Perfil
Infraestrutura de comunicação programável. Pode ir de APIs puras até um contact center completo com Flex.

## Duas formas de usar

### Twilio Messaging / Conversations
Mais próximo de uma infraestrutura:
- WhatsApp API;
- mensagens inbound/outbound;
- templates;
- webhooks;
- Conversations;
- participantes;
- mensagens;
- webhooks por conversa;
- backend totalmente programável.

### Twilio Flex
Contact center completo:
- WhatsApp;
- SMS;
- Chat;
- e-mail em recursos atuais;
- Facebook Messenger em suporte/beta conforme documentação;
- roteamento de agentes;
- filas;
- supervisão;
- Interactions API;
- TaskRouter;
- Flex UI customizável;
- Studio para automações.

## Ponto técnico excepcional
A API atual de Conversations modela participantes explicitamente como CUSTOMER, HUMAN_AGENT e AI_AGENT. Isso combina muito bem com uma arquitetura futura em que OpenAI + humano + cliente coexistem na mesma conversa.

## Limitações
- muito mais técnico;
- Flex tende a ser excessivo para a operação atual da Dona Antônia;
- custo e complexidade podem superar o benefício;
- exige desenvolvimento maior para chegar à simplicidade do PapoAI.

## Adequação
**Excelente como infraestrutura se quisermos construir nosso próprio atendimento.**
**Baixa prioridade como substituição imediata do PapoAI.**

## Fontes oficiais
- https://www.twilio.com/docs/whatsapp/api
- https://www.twilio.com/docs/flex/conversations
- https://www.twilio.com/docs/flex/developer/conversations
- https://www.twilio.com/docs/api/conversations/v2/participant
- https://www.twilio.com/docs/flex/developer/conversations/interactions-api/interactions

---

# 6. 360dialog

## Perfil
BSP/infraestrutura especializada em WhatsApp Business Platform.

Não é uma plataforma de atendimento pronta no mesmo nível do PapoAI. É melhor entendida como acesso técnico ao WhatsApp com APIs e webhooks.

## Capacidades relevantes
- envio de mensagens;
- templates;
- webhooks;
- Marketing Messages API;
- catálogo;
- Single Product Message;
- Multi-Product Message;
- Product Card Carousel;
- pedidos enviados por webhook;
- gerenciamento de templates;
- grupos em recursos atuais;
- WhatsApp Calls / webhooks de chamadas em capacidades atuais.

## Recurso muito interessante para Dona Antônia
Multi-Product Templates podem exibir até 30 produtos em seções e permitir que o cliente monte um carrinho dentro do WhatsApp; o pedido é então entregue por webhook.

Isso deve ser estudado mesmo sem trocar o PapoAI, porque o recurso vem da plataforma WhatsApp/Meta e pode aparecer em provedores diferentes.

## Adequação
**Excelente camada API para construir algo próprio.**
Não é substituto plug-and-play do PapoAI sem construirmos inbox, agentes, regras e automações.

## Fontes oficiais
- https://docs.360dialog.com/docs/resources/templates
- https://docs.360dialog.com/docs/resources/templates/multi-product-templates
- https://docs.360dialog.com/docs/resources/templates/product-card-carousel-templates
- https://docs.360dialog.com/docs/messaging/calling/inbound-calls/how-to-handle-inbound-calls

---

# 7. Gupshup

## Perfil
CPaaS/BSP com APIs de WhatsApp e eventos/webhooks.

## Capacidades confirmadas
- envio de template via API;
- callbacks/webhooks;
- eventos:
  - sent;
  - delivered;
  - read;
  - failed;
  - opted-in;
  - opted-out;
  - eventos de template;
  - eventos de conta;
- Multi-Product Message Templates;
- catálogo e pedidos por webhook.

## Ponto técnico
A plataforma é adequada para quem prefere orquestrar praticamente tudo em software próprio e usar o fornecedor como acesso ao WhatsApp.

## Adequação
**Boa infraestrutura de WhatsApp**, mas menor aderência que Blip/Zenvia/WATI/respond.io se queremos também uma interface pronta e simples para o atendente.

## Fontes oficiais
- https://docs.gupshup.io/docs/template-messages
- https://docs.gupshup.io/docs/subscriptions-and-notifications
- https://docs.gupshup.io/docs/mpm-templates

---

# Comparativo técnico

| Plataforma | Inbox humano | Automação pronta | API ampla | Webhooks | Campanha/Templates | Multicanal | Melhor papel |
|---|---:|---:|---:|---:|---:|---:|---|
| PapoAI | sim | sim | a homologar | sim, já capturado | sim | principalmente WhatsApp | atual |
| Blip | sim | sim | alta | alta | alta | sim | alternativa completa |
| Zenvia | sim/ecossistema | sim | alta | alta | alta | muito alta | alternativa completa |
| WATI | sim | sim | alta | alta | muito alta | baixa/média | WhatsApp-first |
| respond.io | sim | muito alta | alta, plano Growth+ | alta | alta | alta | omnichannel |
| Twilio Flex | sim | configurável | muito alta | muito alta | alta | muito alta | construir contact center |
| 360dialog | não é foco | baixa | muito alta | muito alta | muito alta | WhatsApp | infraestrutura |
| Gupshup | parcial/ecossistema | configurável | alta | alta | alta | CPaaS | infraestrutura |

---

# Controle direto a partir do ChatGPT

Foi pesquisado o catálogo de integrações disponível no ambiente atual para:
- Blip;
- Zenvia;
- WATI;
- respond.io;
- Twilio;
- 360dialog;
- Gupshup.

**Nenhuma dessas sete possui hoje um conector nativo disponível neste ambiente do ChatGPT.**

Portanto, para que o ChatGPT consiga operar diretamente uma delas no futuro, teremos dois caminhos:
1. criar no Marketing OS nossa integração com a API e expor ações seguras ao assistente;
2. usar um conector/MCP oficial se alguma dessas empresas disponibilizar um no futuro.

A preferência arquitetural continua sendo o caminho 1 porque dá controle, auditoria e independência.

---

# Descobertas úteis independentemente do fornecedor

A pesquisa revelou recursos da própria plataforma WhatsApp que devemos incorporar ao projeto e verificar se o PapoAI já os oferece:

## WhatsApp Flows
Formulários/experiências estruturadas dentro do WhatsApp com possibilidade de Data Channel/backend.

Usos possíveis:
- cadastro;
- alteração de endereço;
- avaliação pós-venda;
- escolha de cesta;
- coleta de preferências;
- pesquisa de satisfação;
- recompra estruturada.

## Catálogo / Single Product / Multi-Product
Templates podem apresentar produtos do catálogo Meta dentro da conversa.

Uso potencial:
- ofertas;
- cesta complementar;
- recompra;
- seleção de produtos;
- campanhas segmentadas.

## Product Card Carousel
Até 10 cartões de produto em template, dependendo do recurso/provedor.

## Pedido via WhatsApp
Em experiências de catálogo suportadas, carrinhos/pedidos podem retornar por webhook.

## Limited-Time Offer / Order Status
Alguns provedores já expõem templates e subtipos recentes da Meta.

## Chamadas WhatsApp
APIs recentes já possuem suporte técnico para chamadas em certos fornecedores/configurações. Não é prioridade atual, mas deve ficar no radar.

---

# Decisão provisória para o Marketing OS

## Não migrar PapoAI agora
O PapoAI continua sendo o canal WhatsApp principal até haver razão concreta para trocar.

Motivos:
- já está operacional;
- já temos ponte/capture real;
- o banco atual capturou eventos `message.received`;
- os payloads reais observados incluem contact, message e session;
- já foram observadas mensagens de texto, áudio e imagem;
- migrar número/canal traz risco sem benefício comprovado.

## Homologar como alternativas de contingência
Ordem de estudo técnico, não decisão de compra:

### Blip
Primeiro candidato brasileiro caso precisemos substituir a plataforma completa.

### Zenvia
Segundo candidato para solução brasileira/multicanal.

### WATI / respond.io
Candidatos internacionais com forte API e operação WhatsApp/omnichannel.

### Twilio / 360dialog / Gupshup
Candidatos caso decidamos construir nossa própria camada de atendimento e usar somente infraestrutura WhatsApp.

---

# Requisito para PapoAI derivado desta pesquisa

Antes de qualquer migração, devemos confirmar com PapoAI se estão disponíveis para nossa conta:
- API documentada de contatos;
- API de conversas/mensagens;
- criar/alterar etiquetas;
- controlar Kanban/funil;
- criar/disparar campanhas;
- criar/agendar follow-up;
- gerir templates;
- obter métricas;
- webhooks de todos os eventos relevantes;
- WhatsApp Flows via API;
- catálogos/produtos;
- templates de catálogo/carrossel;
- eventos de pedido;
- opt-in/opt-out;
- origem do lead;
- integração bidirecional segura.

Se o PapoAI disponibilizar esses recursos com API/webhooks suficientes, permanecer nele será preferível à migração.

---


# Ranking por nível de controle via API

Este ranking responde uma pergunta diferente de "qual plataforma pronta é mais conveniente?". Aqui o critério é: **quanto do canal conseguimos controlar por código próprio, com o Marketing OS sendo o cérebro**.

## 1 — Meta WhatsApp Cloud API direta
Maior controle possível porque elimina a camada proprietária intermediária.

Permite operar diretamente:
- envio e recebimento de mensagens;
- texto, mídia e templates;
- criação, consulta, edição e exclusão de templates;
- webhooks;
- status de mensagens;
- WhatsApp Flows;
- Business Management API para WABA e ativos;
- catálogo e templates de catálogo/multi-produto conforme recursos Meta disponíveis.

Arquitetura:
`Marketing/Core -> Meta Graph/Cloud API -> WhatsApp`

Vantagens:
- menor dependência de fornecedor;
- acesso mais rápido a recursos novos da Meta;
- contrato técnico mais próximo da fonte;
- melhor base para expor posteriormente nossas próprias ferramentas/MCP ao ChatGPT.

Desvantagens:
- não entrega inbox humano, filas, Kanban, agentes e supervisão prontos;
- toda a camada operacional precisa ser construída ou mantida em outro sistema;
- exige cuidar de autenticação, webhooks, retries, observabilidade, templates e regras Meta.

**Conclusão:** melhor escolha para controle máximo, mas não necessariamente melhor escolha para substituir o PapoAI hoje.

## 2 — Twilio Messaging + Conversations
Entre intermediários, é a alternativa mais programável e arquiteturalmente flexível.

Destaques:
- WhatsApp por API;
- webhooks inbound;
- fallback URL;
- mensagens e mídia;
- Conversations API;
- participantes, mensagens e webhooks por conversa;
- APIs para configurar recursos;
- possibilidade de crescer para Flex/Studio/TaskRouter sem mudar completamente de fornecedor;
- multicanal.

**Conclusão:** melhor fornecedor intermediário se o objetivo for construir uma plataforma própria de atendimento em torno das APIs.

## 3 — 360dialog
Muito próxima do modelo WhatsApp/Meta e menos interessada em substituir nosso software.

Destaques:
- API dedicada ao WhatsApp;
- templates;
- webhooks;
- catálogo;
- Multi-Product Templates;
- até 30 produtos em até 10 seções em um template;
- cliente pode selecionar itens e enviar o carrinho;
- pedido retorna por webhook;
- estrutura de payload muito próxima da plataforma Meta.

**Conclusão:** candidata especialmente forte se quisermos manter nosso próprio CRM/IA/inbox e contratar apenas uma boa camada WhatsApp.

## 4 — Gupshup
Também oferece controle forte por API e webhooks.

Destaques:
- REST API;
- mensagens;
- templates;
- opt-in/opt-out;
- webhooks;
- status de envio;
- catálogo e templates de catálogo;
- recursos nem sempre disponíveis pela UI podem existir pela API.

**Conclusão:** boa infraestrutura, mas eu colocaria abaixo da 360dialog para o desenho específico da Dona Antônia.

## 5 — Blip
Melhor equilíbrio entre controle por API e operação pronta.

A documentação oficial da Blip expõe conceitos de mensagens, notificações, comandos, autenticação, SDKs e integração HTTP, além do Builder/Desk na plataforma.

**Conclusão:** se a pergunta for "quero substituir o PapoAI sem ter que construir todo o atendimento do zero, mas ainda quero bastante controle por API", Blip é uma das opções mais coerentes.

## 6 — WATI
API muito boa para WhatsApp, especialmente templates, contatos, mídia e campanhas.

A documentação atual recomenda API V3 para novas integrações. Também expõe criação de templates com categorias e subtipos como CAROUSEL, CATALOG, CHECKOUT_BUTTON, ORDER_STATUS e LIMITED_TIME_OFFER, além de webhooks de entrega/leitura/resposta.

**Conclusão:** forte para WhatsApp comercial e campanhas; menos interessante que Meta/Twilio/360dialog quando o objetivo principal é controle arquitetural máximo.

## 7 — respond.io
Tem Developer API, automação, CRM sync e acionamento de Workflows, mas partes importantes dependem dos planos Growth/Advanced.

**Conclusão:** excelente produto pronto/omnichannel, porém o controle profundo por API fica mais preso ao plano e às abstrações da própria plataforma.

## Hierarquia recomendada para Dona Antônia

### Se quisermos manter atendimento pronto
1. PapoAI, se a auditoria provar APIs suficientes.
2. Blip.
3. WATI ou respond.io.
4. Zenvia.

### Se quisermos construir nossa própria camada de atendimento
1. Meta Cloud API direta.
2. Twilio.
3. 360dialog.
4. Gupshup.

### Direção arquitetural preferida
Mesmo permanecendo no PapoAI, o Marketing OS deve ser desenhado para que a regra de negócio não dependa dele. O canal deve entrar por um adapter. Assim, no futuro:

`PapoAIAdapter`
`MetaCloudAdapter`
`TwilioAdapter`
`Dialog360Adapter`

podem alimentar o mesmo contrato interno de mensagens/eventos sem reescrever o Core.

---

# Conclusão

Para a Dona Antônia, a pergunta correta não é “qual é o melhor PapoAI alternativo?”, mas:

**qual fornecedor deixa o Marketing OS controlar o que precisamos sem obrigar a reconstruir atendimento que já funciona?**

Hoje:
- Blip e Zenvia são as contingências mais próximas de plataforma completa;
- WATI e respond.io têm integração forte e APIs úteis;
- Twilio, 360dialog e Gupshup dão mais liberdade para construir, porém exigem mais software próprio;
- PapoAI permanece como opção atual até concluirmos a auditoria de suas APIs e recursos.
