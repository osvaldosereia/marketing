# SOCIAL-RESEARCH-SOURCES — Dona Antônia Marketing

Atualizado em: 2026-09-25

## Meta — Instagram

Oficial:
- https://www.postman.com/meta/instagram/overview
- https://www.postman.com/meta/instagram/collection/6yqw8pt/instagram-api
- https://www.postman.com/meta/instagram/folder/u4g5a2a/instagram-api-with-facebook-login
- https://www.postman.com/meta/instagram/folder/1z5vxzu/instagram-api-with-instagram-login

Pontos confirmados:
- Professional accounts;
- content publishing;
- Stories apenas Business no modelo pesquisado;
- Reels;
- comentários;
- messaging;
- permissões específicas;
- Advanced Access/business verification para produção em certas funções de conversa.

## Meta — Facebook/Messenger

Oficial:
- https://www.postman.com/meta/facebook/overview
- https://www.postman.com/meta/facebook/documentation/r56bjfd/facebook-api
- https://www.postman.com/meta/messenger-platform-api/overview
- https://www.postman.com/meta/messenger-platform-api/folder/22794852-255610cd-47f5-4f4d-b3fa-71aec360be9a

Pontos:
- Page Access Token;
- Page actions;
- Reels publishing;
- Messenger Send API;
- 24h/consent rules;
- Conversations API;
- quick replies.

## Meta — WhatsApp

Oficial:
- https://www.postman.com/meta/whatsapp-business-platform/overview
- https://www.postman.com/meta/whatsapp-business-platform/documentation/wlk6lh4/whatsapp-cloud-api

Pontos:
- messages;
- templates;
- media;
- webhooks;
- message status;
- Flows.

Não foi encontrado endpoint oficial de publicação de WhatsApp Status na coleção/documentação pesquisada. Projeto mantém publicação final manual.

## Private reply / follower limitation

A API oficial de Messaging confirma que mensagens normais exigem uma conversa iniciada/interação válida.

Para Private Reply, a pesquisa de ecossistema atual que referencia documentação Meta aponta regra conservadora:
- uma mensagem privada por comentário;
- até 7 dias;
- conversa normal somente se o usuário responder/engajar.

Referência secundária atual:
- https://commentwatchdog.com/pt-BR/blog/private-replies-24-hour-window

Novo seguidor:
não foi identificado webhook público oficial de follower para Instagram Professional. Não implementar.

Referência secundária atual:
- https://ajuda.syncro.chat/en/instagram/automacoes-novo-seguidor-limitacoes

Antes de código, homologar a capability na documentação Meta/App Review vigente.

## Email

Brevo:
- https://help.brevo.com/hc/pt/articles/208589409-Sobre-os-planos-pagos-da-Brevo
- https://developers.brevo.com/openapi.json
- https://developers.brevo.com/reference/create-webhook

Estado pesquisado:
- Free;
- 300 emails/dia;
- até 100k contatos armazenados;
- marketing campaign;
- automação;
- APIs;
- webhooks.

Resend:
- https://resend.com/pricing

Mailchimp:
- https://mailchimp.com/developer/marketing/docs/fundamentals/
- https://mailchimp.com/pt-br/pricing/marketing/

## LGPD / ANPD

- https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/guia_orientativo_hipoteses_legais_tratamento_de_dados_pessoais_legitimo_interesse
- https://www.gov.br/anpd/pt-br/acesso-a-informacao/perguntas-frequentes

Princípio:
consentimento é uma base legal possível; legítimo interesse exige análise concreta, finalidade, necessidade, balanceamento e salvaguardas.

## Horários / benchmarks 2026

Sprout Social:
- https://sproutsocial.com/insights/best-times-to-post-on-instagram/
- https://sproutsocial.com/insights/best-times-to-post-on-facebook/

Buffer:
- https://buffer.com/resources/when-is-the-best-time-to-post-on-instagram/
- https://buffer.com/resources/state-of-social-media-engagement-2026/

Hootsuite:
- https://blog.hootsuite.com/best-time-to-post-on-instagram/

Uso:
somente seed para experimento.
Após dados próprios, Marketing OS substitui horários genéricos por janelas aprendidas da conta Dona Antônia.

## Regra de atualização

APIs sociais mudam rápido.
Antes de cada fase de implementação:
- verificar documentação oficial atual;
- registrar API version;
- registrar scopes;
- executar POC;
- atualizar este arquivo.
