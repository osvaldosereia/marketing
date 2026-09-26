# META-OFFICIAL-CAPABILITIES — Dona Antônia Marketing

Atualizado em: 2026-09-25
Status: pesquisa oficial pré-implementação.

## Princípio

Toda automação social da Dona Antônia deve usar apenas APIs oficiais, permissões oficiais e comportamentos permitidos pela Meta.

Não usar:
- scraping;
- cookies/session hacks;
- automação de navegador;
- endpoints privados do Instagram;
- robôs que simulam clique;
- compra de seguidores;
- DM em massa fora das regras;
- automação de follow/unfollow;
- qualquer mecanismo que dependa de credenciais pessoais fora do OAuth oficial.

---

# 1. Instagram — capacidades confirmadas

Conta necessária:
- Instagram Professional;
- Business ou Creator;
- para Stories via Content Publishing, usar conta Business.

APIs oficiais:
- Instagram API with Facebook Login;
- Instagram API with Instagram Login.

Permissões relevantes com Facebook Login:
- pages_show_list;
- instagram_basic;
- instagram_content_publish;
- pages_read_engagement;
- instagram_manage_comments.

Para mensagens/conversas:
- instagram_basic;
- instagram_manage_messages;
- pages_manage_metadata;
- business verification e Advanced Access para produção com usuários externos, conforme o modelo usado.

Com Instagram Login:
- instagram_business_basic;
- instagram_business_content_publish;
- instagram_business_manage_messages;
- instagram_business_manage_comments.

## Publicação

Confirmado oficialmente:
- imagens;
- vídeos;
- Reels;
- Stories para conta Business;
- publicação programática via media container + media_publish.

Carrossel:
- implementar somente após homologar o limite e payload na versão Graph escolhida;
- tratar quantidade máxima como capability configurável, nunca valor hardcoded sem teste.

## Comentários

Confirmado:
- ler comentários das próprias mídias;
- responder comentários;
- gerenciar comentários;
- receber eventos via webhook quando suportados/configurados.

Uso com IA:
1. webhook recebe comentário;
2. classifier determina intenção;
3. policy decide se IA pode responder;
4. IA gera texto dentro de regras;
5. validação final;
6. API publica resposta;
7. auditoria guarda comment_id, reply_id, motivo e modelo.

Nunca deixar IA apagar/ocultar comentário automaticamente no V1 sem regra explícita.

## Direct / Messaging

Regra central:
- conversa normal começa quando a pessoa envia mensagem/interage de forma que abra conversa;
- recipient precisa ter enviado mensagem ao perfil profissional para Send API normal.

Inbox:
- Conversations API pode sincronizar conversas;
- mensagens antigas em Requests podem deixar de ser retornadas depois do período documentado pela Meta.

### Comentário -> resposta privada

Tratar como capacidade especial de Private Reply, não como DM comum.

Regra operacional conservadora para o projeto:
- no máximo uma resposta privada por comentário;
- responder em até 7 dias do comentário;
- a resposta privada inicial não será tratada como licença para sequência de DMs;
- somente depois de a pessoa responder/engajar é que a conversa normal segue a janela permitida.

Antes de produção, homologar o endpoint e os limites na versão oficial da API aprovada no App Review.

## Novo seguidor -> boas-vindas

**Não implementar automação.**

Motivo:
- não há webhook público oficial de "new follower" no conjunto documentado para Instagram Business;
- a Send API normal exige mensagem/interação do usuário;
- portanto enviar DM só porque alguém começou a seguir não será parte do produto.

Alternativas oficiais:
- boas-vindas após primeira DM;
- resposta após primeiro comentário;
- resposta a Story reply;
- icebreakers/quick replies no Direct;
- CTA no perfil;
- comentário com palavra-chave seguido de Private Reply dentro da regra oficial.

---

# 2. Facebook Page — capacidades confirmadas

Usar:
- Facebook Graph API;
- Page Access Token;
- tarefas/permissões oficiais.

Capacidades relevantes:
- agir em nome da Página;
- publicar conteúdo da Página;
- publicar Reels;
- ler/gerenciar engajamento conforme permissões;
- Messenger Platform para conversas.

Messenger:
- pages_messaging;
- pages_manage_metadata;
- pages_read_engagement;
- recipient precisa ter enviado mensagem à Página nos últimos 24h ou ter consentido com modalidade permitida fora da janela.

Quick Replies:
- até 13 opções, conforme documentação atual;
- podem coletar resposta estruturada e, em Messenger, solicitar telefone/e-mail quando suportado.

## Stories Facebook

Não prometer publicação automática até homologação.

A documentação oficial pesquisada nesta rodada confirma claramente Reels e Page/Messenger, mas não foi encontrada evidência oficial suficiente para assumir publicação programática de Facebook Page Stories na arquitetura V1.

Estratégia:
- Instagram Story automático;
- Facebook Story: capability = "manual_or_future" até POC oficial;
- se Meta oferecer crossposting oficial no ativo conectado, homologar antes de habilitar.

---

# 3. WhatsApp

WhatsApp Business Platform / Cloud API é API oficial para:
- enviar/receber mensagens;
- templates;
- mídia;
- webhooks;
- Flows;
- status de mensagem.

## Status do WhatsApp

Na documentação oficial/coleções atuais pesquisadas:
- não foi encontrado endpoint oficial de publicação de Status/Stories do WhatsApp.

Decisão:
- NÃO automatizar publicação de Status.

Ferramenta fará:
1. gerar arte 1080x1920;
2. validar preço/estoque;
3. salvar asset;
4. botão "Compartilhar";
5. abrir share sheet do sistema/dispositivo quando possível;
6. usuário escolhe WhatsApp -> Meu Status e confirma.

O último ato continua humano.

Não usar automação de tela, Accessibility hacks, emulador ou sessão WhatsApp Web.

---

# 4. Comentários + IA — política de segurança operacional

Categorias que podem receber resposta automática:
- preço simples, se o preço for consultado em fonte real;
- disponibilidade, se o estoque for consultado;
- cidade/entrega;
- formas de pagamento;
- pergunta simples sobre cesta;
- agradecimento;
- pergunta de link/catálogo.

Categorias que exigem humano:
- reclamação;
- pedido atrasado;
- chargeback/fraude;
- problema de pagamento;
- ameaça/processo;
- questão médica/alergia;
- insulto/agressão séria;
- dúvida ambígua;
- comentário envolvendo menor de idade;
- qualquer resposta que exija concessão, desconto ou promessa fora de política.

IA sempre recebe contexto estruturado, não inventa preço/estoque/prazo.

---

# 5. App Review / produção

Planejar desde o início:
- Business App;
- Business Verification;
- privacy policy;
- data deletion instructions;
- App Review;
- Advanced Access onde necessário;
- least privilege;
- tokens somente server-side;
- rotação e health check;
- logs de autorização;
- capability matrix por conta/token.

Não assumir que uma permissão concedida em modo de desenvolvimento estará automaticamente aprovada para produção.

---

# 6. Fontes oficiais principais

Meta Instagram:
https://www.postman.com/meta/instagram/overview
https://www.postman.com/meta/instagram/collection/6yqw8pt/instagram-api
https://www.postman.com/meta/instagram/folder/u4g5a2a/instagram-api-with-facebook-login
https://www.postman.com/meta/instagram/folder/1z5vxzu/instagram-api-with-instagram-login

Meta Facebook:
https://www.postman.com/meta/facebook/overview
https://www.postman.com/meta/facebook/documentation/r56bjfd/facebook-api

Messenger Platform:
https://www.postman.com/meta/messenger-platform-api/overview
https://www.postman.com/meta/messenger-platform-api/folder/22794852-255610cd-47f5-4f4d-b3fa-71aec360be9a

WhatsApp:
https://www.postman.com/meta/whatsapp-business-platform/overview
https://www.postman.com/meta/whatsapp-business-platform/documentation/wlk6lh4/whatsapp-cloud-api

## Regra documental

Antes de implementar qualquer capability:
- conferir versão Graph atual;
- conferir permissão;
- executar POC canário;
- registrar resultado;
- só então mudar capability para enabled.
