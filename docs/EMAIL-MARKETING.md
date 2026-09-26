# EMAIL-MARKETING — Dona Antônia

Atualizado em: 2026-09-25
Status: arquitetura pesquisada, sem integração iniciada.

# 1. Provedor recomendado para V1

**Brevo**.

Motivos atuais:
- plano gratuito: 300 envios/dia;
- armazenamento de até 100.000 contatos;
- campanhas de email;
- editor;
- relatórios;
- automação de marketing para até 2.000 contatos no plano gratuito informado;
- API oficial;
- Marketing Campaigns API;
- Contact Management API;
- webhooks para delivered/open/click/bounce/unsubscribe/contact changes.

Isso é mais adequado à V1 de marketing do que construir SMTP próprio.

Alternativa futura:
- Resend: excelente API e plano gratuito de 3.000 emails/mês / 100 por dia na consulta de 2026; avaliar se a estratégia virar mais developer-first.
- Mailchimp: sólido, porém plano free atual é muito menor (250 contatos e limites baixos), menos interessante para a primeira fase.

# 2. Arquitetura adapter

Não acoplar Marketing ao Brevo.

Interface:
- syncContact;
- unsubscribeContact;
- createCampaign;
- scheduleCampaign;
- sendTest;
- getCampaign;
- receiveWebhook.

Adapter:
`BrevoEmailAdapter`.

Assim o fornecedor pode mudar.

# 3. Consentimento

Email marketing deve ter:
- base legal definida;
- finalidade;
- fonte do email;
- consentimento/legitimate-interest assessment conforme caso;
- opt-out claro;
- suppression imediata.

Para simplificar risco e operação, V1 deve priorizar contatos com autorização explícita para ofertas.

ANPD:
- legítimo interesse exige finalidade, necessidade, balanceamento e salvaguardas;
- não tratar "temos o email porque comprou" como autorização automática irrestrita para qualquer campanha.

# 4. Conteúdo de email

Não enviar panfleto-imagem único.

Template:
- preheader;
- headline;
- mensagem curta;
- 4–8 produtos;
- preço em texto;
- CTA para catálogo/WhatsApp;
- rodapé;
- unsubscribe.

Segmentos:
- clientes de cesta;
- clientes por categoria;
- inativos;
- oferta relevante;
- aniversário, depois;
- pós-compra, depois.

# 5. Frequência inicial

- 1 campanha/semana;
- no máximo 2 quando a segunda for segmentada/relevante;
- suppression por reclamação/opt-out;
- evitar enviar a quem acabou de comprar a mesma oferta sem sentido.

# 6. Métricas

- delivered;
- unique opens (usar com cautela por privacidade/proxies);
- click;
- unsubscribe;
- spam;
- hard bounce;
- conversion/pedido;
- receita atribuída.

Priorizar click e pedido sobre open rate.

# 7. Requisitos técnicos

- domínio autenticado;
- SPF;
- DKIM;
- DMARC;
- sender consistente;
- tracking UTM;
- webhook;
- bounce suppression;
- unsubscribe sincronizado no Marketing/Core.

# 8. Fontes

Brevo:
https://help.brevo.com/hc/pt/articles/208589409-Sobre-os-planos-pagos-da-Brevo
https://developers.brevo.com/openapi.json
https://developers.brevo.com/reference/create-webhook

Resend:
https://resend.com/pricing

Mailchimp:
https://mailchimp.com/developer/marketing/docs/fundamentals/
https://mailchimp.com/pt-br/pricing/marketing/

ANPD:
https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/guia_orientativo_hipoteses_legais_tratamento_de_dados_pessoais_legitimo_interesse
