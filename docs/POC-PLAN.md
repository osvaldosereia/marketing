# POC-PLAN — Dona Antônia Marketing OS

Atualizado em: 2026-09-25
Status: plano de homologação.

# Regra

Nenhuma capability vira produção sem:
- fonte oficial;
- scope;
- token novo;
- canário;
- log;
- rollback.

# POC 0 — Segurança/Credenciais

- identificar Meta Business/Page/IG;
- OAuth novo;
- rotacionar tokens legados;
- rotacionar GitHub credential legada encontrada em Make;
- secret storage;
- health check.

Gate:
nenhum segredo legado é utilizado.

# POC 1 — Meta read-only

- listar Page;
- confirmar IG Business;
- perfil;
- media;
- comments;
- insights básicos.

Sem writes.

# POC 2 — Instagram single image

- conteúdo canário aprovado;
- render;
- container;
- status;
- publish;
- external id;
- metrics.

Rollback:
pause publisher.

# POC 3 — Facebook Page post

- single post;
- external id;
- read back.

# POC 4 — Instagram carousel

- 2–4 cards inicialmente;
- publicação;
- ordem correta;
- caption;
- read back.

# POC 5 — Instagram Story

- Business;
- 9:16;
- publicar;
- read/insight onde disponível.

# POC 6 — Reels

Instagram e Facebook separados:
- vídeo hosted;
- processing status;
- publish.

# POC 7 — Comment webhook

- comentário de conta teste;
- receber;
- dedupe;
- mostrar no Marketing;
- sem resposta automática.

# POC 8 — Comment reply

- AI draft;
- humano aprova;
- API responde;
- external reply id.

# POC 9 — Auto FAQ

Somente pergunta canária:
- preço/entrega;
- contexto real;
- auto reply;
- duplicate guard.

# POC 10 — Private Reply

- comentário de teste;
- uma mensagem privada oficial;
- provar regras;
- resposta do usuário;
- conversation becomes available.

# POC 11 — Instagram Messaging

- conversa iniciada pelo test user;
- sync conversation;
- reply;
- message id;
- webhook.

# POC 12 — WhatsApp Status share

- generate 1080x1920;
- mobile;
- share sheet;
- usuário escolhe WhatsApp;
- marcar manualmente published.

Não automatizar seleção de Status.

# POC 13 — WhatsApp 4 products

- 4 produtos reais;
- render;
- copy companion;
- PapoAI manual/adapter conforme contrato.

# POC 14 — Brevo

- domínio teste/autenticado;
- contato consentido canário;
- campaign;
- send test;
- webhook delivered/click/unsubscribe.

# POC 15 — stale guard

- gerar asset;
- alterar preço/estoque no ambiente canário;
- publicação deve bloquear;
- regenerar.

# POC 16 — scheduling

- schedule;
- claim;
- provider;
- retry;
- duplicate;
- clock America/Cuiaba.

# Critério para primeira produção

Liberar somente:
- single image;
- carousel;
- approved Story se POC;
- comment draft/response;
- Status manual;
- email test/approved.

Reels/private reply/auto-reply podem entrar depois se POCs estiverem verdes.
