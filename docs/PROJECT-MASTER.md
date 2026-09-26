# PROJECT MASTER — Dona Antônia Marketing OS

Atualizado em: 2026-09-25
Repositório: `osvaldosereia/marketing`
Status: pesquisa, arquitetura e especificação — sem programação de produção iniciada.

# 1. Missão

Criar uma ferramenta própria de marketing para a Dona Antônia, separada do Vitrine/Admin, focada no mercado local de Cuiabá e Várzea Grande.

A ferramenta deve:
- planejar;
- criar;
- revisar;
- aprovar;
- agendar;
- publicar;
- responder;
- medir;
- aprender.

Canais iniciais:
1. Instagram;
2. Facebook;
3. WhatsApp — assets de Status e imagens de oferta durante conversa;
4. Email marketing.

Tudo deve usar:
- APIs oficiais;
- OAuth oficial;
- políticas Meta;
- LGPD;
- PapoAI para WhatsApp quando ele já oferecer a capacidade;
- nenhuma gambiarra.

---

# 2. Regras inegociáveis

1. Não usar scraping/endpoints privados.
2. Não automatizar "novo seguidor -> DM" porque não há gatilho oficial suportado para isso.
3. Não publicar WhatsApp Status por automação de tela; gerar asset e abrir compartilhamento manual.
4. Não inventar preço, estoque, desconto ou prazo.
5. Produto deve usar foto real; IA não redesenha embalagem/rótulo.
6. Preço e estoque são revalidados imediatamente antes de publicar/enviar.
7. Comentário crítico/reclamação vai para humano.
8. Mensagem privada segue janela/permissão oficial.
9. Email tem opt-out e suppression.
10. Todo comportamento externo tem log e idempotência.
11. Marketing fica separado do sistema operacional.
12. O Core é fonte de verdade de produto/preço/estoque/pedido.

---

# 3. Arquitetura

```
CORE DONA ANTÔNIA
 produtos / preço / estoque / cestas / pedidos
            |
            | Bridge somente leitura/eventos
            v
       MARKETING OS
  ------------------------
  Opportunity Engine
  Campaign Planner
  Creative Studio
  Approval
  Calendar
  Social Publisher
  Comment/DM Engine
  WhatsApp Asset Studio
  Email Engine
  Analytics
  Learning
  ------------------------
      |       |       |
      v       v       v
    META    PAPOAI   BREVO
 Instagram  WhatsApp Email
 Facebook
```

## Marketing OS não pode:
- alterar estoque;
- alterar preço;
- alterar pedido;
- emitir fiscal;
- assumir regra ERP.

## Banco próprio

Preferência arquitetural:
- Marketing com banco/runtime próprio;
- Core expõe bridge mínima;
- não compartilhar service role do Core;
- não acoplar Marketing às tabelas internas do Admin.

---

# 4. Módulos da ferramenta

## 4.1 Hoje

Dashboard:
- oportunidades;
- posts de hoje;
- pendências de aprovação;
- comentários aguardando;
- DMs que precisam humano;
- assets WhatsApp prontos;
- email agendado;
- falhas de integração;
- métricas rápidas.

## 4.2 Oportunidades

Gerar oportunidades com dados reais:
- oferta ativa;
- estoque alto;
- validade/promocional;
- cesta;
- categoria;
- sazonalidade;
- produto pouco divulgado;
- campanha com bom histórico;
- necessidade de conteúdo não promocional.

Cada oportunidade:
- objetivo;
- canal;
- urgência;
- razão;
- produtos;
- validade;
- score;
- recomendação de formato.

IA explica a oportunidade.
Score comercial crítico deve ser determinístico.

## 4.3 Campanhas

Campanha é unidade mãe.

Campos:
- nome;
- objetivo;
- público;
- cidade;
- produtos;
- início/fim;
- canais;
- CTA;
- regras;
- orçamento = 0 nesta fase orgânica;
- status.

Uma campanha gera variações:
- Instagram Feed;
- Instagram Carousel;
- Instagram Story;
- Facebook;
- WhatsApp Status;
- WhatsApp 4-product image;
- Email.

## 4.4 Creative Studio

Funções:
- selecionar produtos;
- buscar por categoria/oferta;
- gerar tema/headline;
- escolher template;
- renderizar;
- criar variações;
- preview por canal;
- quality check;
- aprovar.

Detalhamento em:
`docs/CREATIVE-DESIGN-SYSTEM.md`.

## 4.5 Calendário

Visual:
- mês;
- semana;
- dia.

Estados:
- draft;
- generated;
- awaiting_approval;
- approved;
- scheduled;
- published;
- shared_manually;
- stale;
- failed.

Permitir:
- arrastar horário;
- duplicar campanha;
- adaptar conteúdo;
- pausar publicação.

## 4.6 Instagram/Facebook Publisher

Somente APIs oficiais.

Instagram:
- feed;
- imagem/vídeo;
- carousel;
- Reels;
- Stories Business;
- comments;
- insights;
- messaging conforme permissões.

Facebook:
- Page posts/reels;
- engagement;
- Messenger;
- Story automático somente se API oficial for homologada.

Capability matrix em:
`docs/META-OFFICIAL-CAPABILITIES.md`.

## 4.7 Comment & Conversation Engine

Entrada:
- comment webhook;
- DM/message webhook.

Pipeline:
```
event
 -> dedupe
 -> moderation
 -> intent
 -> lookup Core
 -> policy
 -> AI draft
 -> validation
 -> auto reply OU human queue
```

Respostas públicas:
- habilitar primeiro.

Private reply:
- capability separada;
- usar apenas quando comentário justificar;
- uma resposta privada inicial;
- não iniciar sequência sem engajamento permitido.

DM normal:
- continuar somente quando usuário iniciou conversa/janela válida.

Novo seguidor:
- não existe automação oficial no backlog.

## 4.8 WhatsApp Asset Studio

### Status
Gera:
- 1080x1920;
- preview;
- download;
- botão Compartilhar.

Objetivo:
"dois cliques", mas com confirmação humana final.

### Oferta na conversa
Template fixo:
- 4 produtos;
- grade 2x2;
- preço;
- nome;
- identidade;
- CTA.

Fluxo preferido:
- Marketing gera asset;
- PapoAI recebe/select asset;
- atendente/automação envia dentro das regras da conversa.

Se API PapoAI permitir envio seguro:
- automatizar via adapter.
Caso contrário:
- asset fica pronto para operador usar.

## 4.9 Email Marketing

Provider recomendado V1:
**Brevo**.

Motivos:
- plano gratuito adequado;
- marketing campaigns;
- contatos;
- automações;
- webhooks;
- API.

Detalhamento:
`docs/EMAIL-MARKETING.md`.

## 4.10 Analytics

Por conteúdo:
- reach;
- views;
- impressions onde disponível;
- likes;
- comments;
- shares;
- saves;
- replies;
- DMs;
- clicks;
- site visits;
- WhatsApp starts;
- attributed orders.

Por campanha:
- canal;
- formato;
- template;
- tema;
- horário;
- produto;
- receita atribuída.

Não otimizar por curtida isoladamente.

---

# 5. Funcionalidade oficial x manual

| Função | Estado planejado |
|---|---|
| Instagram imagem/feed | automático oficial |
| Instagram carrossel | automático após POC oficial |
| Instagram Reel | automático oficial |
| Instagram Story | automático oficial para Business |
| Responder comentário IG | automático/híbrido oficial |
| Private reply após comentário | oficial, regra estrita |
| DM normal | oficial após início/interação permitida |
| Boas-vindas a novo seguidor | NÃO implementar |
| Facebook Page post | automático oficial |
| Facebook Reel | automático oficial |
| Facebook Messenger | oficial dentro das regras |
| Facebook Story | POC/manual até confirmar API |
| WhatsApp Status | asset + compartilhamento manual |
| WhatsApp imagem 4 ofertas | gerar automático; envio via PapoAI conforme contrato |
| Email marketing | automático via Brevo após consentimento |

---

# 6. Estratégia local

Não construir estratégia nacional.

Área comercial:
- Cuiabá;
- Várzea Grande.

Implica:
- copy local;
- calendário local;
- horário America/Cuiaba;
- CTA para entrega local;
- não segmentar conteúdo para cidades sem atendimento;
- não gastar esforço em crescimento de follower sem conversão local.

---

# 7. Conteúdo

Pilares iniciais:
- ofertas;
- cestas;
- solução de compra;
- utilidade/economia;
- confiança local;
- bastidores;
- sazonal.

Distribuição inicial:
- 40% produto/oferta;
- 20% cesta/solução;
- 15% utilidade;
- 10% confiança;
- 10% sazonal;
- 5% interação.

Revisar por dados.

---

# 8. Horários e cadência

Timezone:
`America/Cuiaba`.

Benchmarks externos são somente seed.

Testes iniciais:
- 09:30–10:30;
- 11:30–13:30;
- 17:30–19:00.

Cadência:
- feed 4–5/semana;
- carrossel 2/semana;
- Reels 1–2/semana depois da POC;
- Stories 2–4 frames/dia em operação;
- Status 1–3 assets/dia;
- email 1/semana inicialmente.

Após 4 semanas:
- sistema calcula horários próprios por formato.

Detalhamento:
`docs/CONTENT-PUBLISHING-STRATEGY.md`.

---

# 9. IA

## OpenAI como estrategista
Pode:
- sugerir campanha;
- copy;
- briefing;
- classificar comentário;
- responder FAQ;
- resumir performance;
- recomendar teste;
- criar fundo/elemento visual.

## OpenAI não decide fatos
Não pode:
- preço;
- estoque;
- desconto;
- validade;
- prazo;
- política comercial;
- consentimento;
- permissão Meta.

## Guardrails de comentário
Auto:
- FAQ clara;
- agradecimento;
- link;
- disponibilidade validada;
- preço validado.

Humano:
- reclamação;
- conflito;
- jurídico;
- pagamento;
- pedido atrasado;
- promessas/exceções.

---

# 10. Data model conceitual

Entidades futuras:
- marketing_connections;
- marketing_capabilities;
- campaigns;
- campaign_products;
- creative_briefs;
- assets;
- asset_variants;
- content_items;
- publishing_jobs;
- approvals;
- social_events;
- comments;
- conversations_ref;
- ai_reply_drafts;
- policy_decisions;
- email_contacts;
- email_consents;
- email_campaigns;
- performance_snapshots;
- attribution_events;
- experiments.

Não criar todas antes de precisar.
Modelo final será definido na fase técnica.

---

# 11. Segurança

- OAuth oficial;
- tokens server side;
- Vault/secret manager;
- least privilege;
- token health check;
- refresh controlado;
- App Review;
- Business Verification;
- privacy policy;
- data deletion;
- audit log;
- never log tokens;
- nunca expor Graph token no frontend.

---

# 12. Email e LGPD

Não assumir que ter email = consentimento irrestrito.

V1:
- consentimento explícito preferido;
- unsubscribe em todo email;
- suppression;
- fonte de consentimento;
- timestamp;
- finalidade;
- não reativar unsubscribe.

ANPD:
se usar legítimo interesse em algum caso, documentar finalidade, necessidade, balanceamento, salvaguardas e expectativa do titular.

---

# 13. Fases de implantação

## Fase 0 — documentação
Atual.

Entregáveis:
- capabilities;
- design;
- estratégia;
- provider email;
- arquitetura;
- segurança;
- POC plan.

## Fase 1 — fundação isolada
- novo app Marketing;
- banco próprio;
- auth Owner;
- brand tokens;
- campaigns;
- assets;
- calendar;
- mock data.

Sem APIs externas.

## Fase 2 — Core Bridge
Read-only:
- produtos;
- preços;
- estoque;
- ofertas;
- cestas.

Sem escrita operacional.

## Fase 3 — Creative Studio
- 4-product template;
- feed;
- story/status;
- carousel;
- render determinístico;
- aprovação.

## Fase 4 — Meta read-only
- OAuth;
- account health;
- media/insights;
- comments read;
- webhooks shadow.

## Fase 5 — Meta publishing canary
Ordem:
1. Instagram single image;
2. Facebook Page;
3. carousel;
4. Instagram Story;
5. Reels.

Sempre conta real + conteúdo canário aprovado.

## Fase 6 — Comments/DM
1. comment read;
2. AI draft human approval;
3. auto public FAQ;
4. private reply canary;
5. DM workflow;
6. human escalation.

## Fase 7 — WhatsApp assets/PapoAI
- status generator;
- share;
- 4 products;
- PapoAI bridge.

## Fase 8 — Email
- Brevo;
- domain authentication;
- contacts consent;
- test campaign;
- webhook metrics.

## Fase 9 — learning
- analytics;
- horário próprio;
- creative performance;
- experiments;
- recommendation engine.

---

# 14. POCs obrigatórias

Antes de produção:
- Meta permissions;
- App Review;
- Instagram Story;
- carousel;
- comment webhook;
- reply;
- private reply;
- DM window;
- Facebook publishing;
- Messenger;
- PapoAI image send;
- WhatsApp manual share UX;
- Brevo campaign/webhook;
- stale asset block.

---

# 15. Critério de qualidade

A ferramenta deve responder:

1. O que vale publicar?
2. Por quê?
3. Em qual canal?
4. Em qual formato?
5. Qual horário?
6. Qual produto/preço real?
7. Foi aprovado?
8. Foi publicado?
9. Como performou?
10. Gerou conversa/pedido?
11. O que devemos testar depois?

Se só "gera posts", o projeto falhou.

---

# 16. Documentos filhos

- `META-OFFICIAL-CAPABILITIES.md`
- `CREATIVE-DESIGN-SYSTEM.md`
- `CONTENT-PUBLISHING-STRATEGY.md`
- `EMAIL-MARKETING.md`

Projeto pós-venda anterior preservado:
- `BLING-PAPOAI-POSTSALE.md`
- `PAPOAI-OUTBOUND-RESEARCH.md`
- `JOURNEY-MATRIX.md`
- `INTEGRATION-CONTRACT.md`

Esses documentos não são apagados; tornam-se uma frente futura/conectável.
