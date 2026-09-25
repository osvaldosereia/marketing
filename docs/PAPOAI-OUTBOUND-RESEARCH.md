# PapoAI Outbound — Pesquisa do Gate P1

Atualizado em: 2026-09-25  
Status: pesquisa; nenhum envio novo ativado.

# 1. Objetivo

Fechar o contrato técnico necessário para:

- evento comercial confiável;
- regra de jornada;
- PapoAI;
- WhatsApp;
- status da mensagem;
- resposta do cliente;
- continuidade da jornada.

A integração não será programada contra endpoint presumido.

---

# 2. O que está comprovado publicamente no PapoAI

O site/guia atuais do PapoAI confirmam que a plataforma oferece:

- API Oficial da Meta / WhatsApp Cloud API;
- WABA + webhooks;
- modelos/templates aprovados;
- modo coexistência;
- CRM;
- campanhas + funis + automações;
- follow-up automático;
- remarketing;
- mensagens, áudios e vídeos automáticos;
- etiquetas;
- Kanban;
- multiatendimento;
- relatórios;
- tracking de origem;
- integração declarada com:
  - Webhook;
  - MCP;
  - Supabase;
  - PostgreSQL;
  - Bling;
  - Make/n8n/Zapier;
- pós-venda;
- atualização de pedido/status de entrega;
- transferência automática para humano.

Plano Starter publicamente exibido em 2026-09-25:
- 1 WhatsApp;
- 4 atendentes/agentes;
- 2 departamentos;
- 1 robô;
- 1 campanha;
- até 10.000 envios de campanha/mês;
- conversas/contatos ilimitados;
- remarketing;
- conexão API oficial.

Esses dados de plano são comerciais e podem mudar. Não hardcodar limites no produto.

---

# 3. O que NÃO está documentado publicamente

Nas fontes públicas pesquisadas não foi encontrado contrato técnico oficial para clientes externos contendo:

- base URL da API de aplicação do PapoAI;
- autenticação outbound;
- POST send message;
- POST send template;
- payload de template;
- provider/client idempotency key;
- callback de sent/delivered/read/failed;
- endpoint de contatos;
- endpoint para tags;
- endpoint para mover Kanban;
- endpoint para iniciar/cancelar follow-up;
- endpoint para campanha;
- endpoint/template registry;
- documentação MCP com tools disponíveis.

Conclusão:
**Gate P1 continua aberto por falta de contrato outbound público.**

O fato de o site dizer “Webhook”, “MCP”, “Bling” ou “Supabase” confirma capacidade de integração, mas não define contrato suficiente para codificação segura.

---

# 4. O que já está comprovado na nossa conta — inbound

O Core da Dona Antônia recebe webhooks reais do PapoAI.

Evento observado:
- `message.received`.

Top-level observado:
- `company_id`;
- `event`;
- `data`;
- `webhook`.

`data`:
- `contact`;
- `message`;
- `session`.

`message` contém, conforme eventos reais:
- id;
- external_id / WAMID;
- direction;
- type;
- phone_number_from;
- phone_number_to;
- content;
- media_url;
- mimetype;
- timestamps;
- status.

Tipos observados:
- text;
- áudio OGG/Opus;
- imagem JPEG.

`session`:
- agentbot_id;
- contact_id;
- uid;
- user_id.

Webhook configurado observado:
- `PAPOAI - MENSAGENS RECEBIDAS - SUPABASE`.

Isso é suficiente para o lado **PapoAI -> Core**, mas não resolve Core -> PapoAI.

---

# 5. Evidência histórica — outbound já funcionou via Meta direta

No Make legado existe o cenário inativo:

`Dona Antônia - WhatsApp Outbound Event-Driven v3`

Ele prova que a Dona Antônia já teve outbound programável funcionando com a WhatsApp Business Cloud API oficial.

Capacidades configuradas:
- texto;
- áudio;
- imagem;
- botões interativos;
- listas;
- CTA URL;
- WhatsApp Flows;
- upload de mídia;
- resposta síncrona ao job do Supabase.

O desenho antigo era:

```
Supabase outbound job
  -> Make webhook
  -> WhatsApp Business Cloud
  -> WhatsApp
```

A conexão histórica ainda aparece como válida no inventário do Make, mas:
- Make não será reativado;
- credenciais não devem ser extraídas/copiad​as do Make;
- esse cenário serve somente como evidência do contrato Meta e do que já foi tecnicamente possível.

## Contrato de job antigo

O cenário já trabalhava com um envelope semelhante ao desejado agora:
- `event=outbound_delivery`;
- `job.id`;
- `job.recipient_e164`;
- `job.delivery_mode`;
- `job.body_text`;
- dados `interactive`.

Essa evidência reforça que o futuro `PapoAIAdapter` deve aceitar um contrato interno estável e esconder o fornecedor.

---

# 6. Meta direta como fallback, não como caminho principal

A infraestrutura histórica prova que podemos construir um `MetaCloudAdapter` no futuro.

Porém NÃO usar dois senders simultaneamente sem homologação.

Riscos de enviar fora do PapoAI:
- mensagem pode não aparecer corretamente no CRM;
- funil/follow-up pode não receber o evento esperado;
- métricas podem divergir;
- ownership de webhook/token/app pode conflitar;
- atendente pode não enxergar toda a conversa na plataforma;
- duplicidade se PapoAI também executar automação.

Decisão:
- PapoAI permanece sender preferido;
- Meta direta é fallback arquitetural;
- só ativar fallback após provar sincronização com o CRM/PapoAI ou após decisão explícita de substituir o sender.

---

# 7. Descoberta de arquitetura — PapoAI nativo deve fazer mais trabalho

Como o PapoAI já oferece:
- follow-up;
- funil/Kanban;
- campanhas;
- remarketing;
- IA;
- handoff humano,

a implementação ideal não é necessariamente nosso servidor agendar cada mensagem.

Existem dois modelos a homologar:

## Modelo A — Marketing agenda, PapoAI apenas envia
Marketing mantém todos os timers/jobs.

Vantagem:
- controle total.

Desvantagem:
- duplica recursos do PapoAI;
- mais código;
- mais cron/queue.

## Modelo B — Marketing dispara evento, PapoAI executa uma automação nativa
Exemplo conceitual:
```
order.delivered
 -> webhook/API PapoAI
 -> entra na jornada "Pós-venda Dona Antônia"
 -> PapoAI aguarda D+1
 -> envia template/check
 -> resposta cancela/avança fluxo
 -> humano se problema
```

Vantagem:
- usa follow-up/funil nativo;
- menos scheduler nosso;
- CRM PapoAI enxerga a jornada.

Desvantagem:
- exige API/webhook de entrada capaz de iniciar/mover fluxo;
- exige exportabilidade/auditoria para não ficarmos presos.

**Modelo B é o preferido se o PapoAI expuser controle suficiente.**

---

# 8. Perguntas obrigatórias para o PapoAI / conta

Precisamos obter respostas técnicas exatas:

1. Existe API REST pública/privada para enviar mensagem livre?
2. Existe endpoint para enviar template Meta aprovado?
3. Como autentica?
4. É por telefone, contact_id, session.uid ou outro identificador?
5. Retorna message id/WAMID?
6. Há webhook de sent/delivered/read/failed?
7. Como iniciar uma automação/funil por webhook/API?
8. Como criar/atualizar tags?
9. Como mover card no Kanban por API?
10. Como criar/cancelar follow-up?
11. Como acionar uma campanha para um único contato/segmento?
12. Existe endpoint para opt-in/opt-out?
13. Existe API de templates?
14. Existe MCP server? Quais tools/actions ele expõe?
15. Podemos enviar um evento externo `order.delivered` com campos customizados e iniciar uma régua?
16. É possível interromper uma régua automaticamente quando:
    - cliente responde;
    - novo pedido é criado;
    - opt-out;
    - reclamação?
17. O PapoAI aceita `idempotency_key` ou `external_event_id`?
18. Qual rate limit?
19. Qual política de retry?
20. Como registrar campos customizados de pedido/cliente?

Essas respostas devem ser documentadas antes do sender real.

---

# 9. POC mínima desejada

Quando contrato estiver disponível:

1. número canário;
2. evento técnico manual controlado;
3. enviar mensagem dentro da janela;
4. obter provider message id;
5. receber status;
6. cliente responde;
7. resposta chega no receiver já existente;
8. provar que conversa aparece corretamente no CRM PapoAI;
9. repetir o mesmo event/idempotency key;
10. provar ausência de duplicidade;
11. testar template fora da janela;
12. provar erro de template e retry seguro.

Nenhum cliente real entra no teste inicial.

---

# 10. Fontes públicas

PapoAI:
- https://papoai.com.br/
- https://papoai.com.br/planos/
- https://papoai.com.br/guia
- https://papoai.com.br/blog/automacao-whatsapp-fluxos
- https://papoai.com.br/blog/follow-up-automatico-whatsapp
- https://papoai.com.br/blog/disparo-em-massa-whatsapp
- https://papoai.com.br/blog/funil-de-vendas-whatsapp
- https://crm.papoai.com.br/terms

Meta:
- coleção oficial WhatsApp Business Platform no Postman.

Fonte interna:
- Make scenario 7290488 — somente inventário/evidência; não runtime.
