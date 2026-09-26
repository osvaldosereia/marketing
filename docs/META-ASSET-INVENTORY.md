# META-ASSET-INVENTORY — Dona Antônia Marketing

Atualizado em: 2026-09-25
Status: inventário read-only; nenhuma credencial reutilizada.

# 1. Ativos encontrados no legado

Conta Instagram Business usada nos cenários:
- @dona_antonia_cuiaba

ID técnico observado no legado:
- Instagram Professional account id registrado nos cenários antigos.

Conexões Make antigas:
- Facebook/Instagram connection usada para publicação e comentários;
- status atual observado: **expiring**.

Cenários legados relevantes:
- publicação de carrossel Instagram;
- publicação de carrosséis gerados por IA;
- trigger de novo comentário Instagram;
- resposta pública ao comentário;
- private reply via Graph API;
- geração de Stories/ofertas;
- outbound WhatsApp Business Cloud.

Todos esses cenários permanecem apenas como **evidência técnica**.

# 2. Capacidades já provadas historicamente

## Instagram
- criação/publicação de carrossel;
- trigger de comentário;
- resposta pública;
- private reply associado a comentário.

## WhatsApp Business Cloud
No legado, outbound já suportou:
- texto;
- áudio;
- imagem;
- botões;
- lista;
- CTA URL;
- WhatsApp Flow.

Isso demonstra experiência prévia da conta/infraestrutura com APIs oficiais, mas não autoriza reusar tokens ou Make como runtime.

# 3. Riscos de credenciais

Auditoria dos cenários antigos encontrou:
- conexão Facebook/Instagram expiring;
- credenciais/token Meta embutidos em configuração antiga;
- credencial GitHub embutida em cenário antigo.

Regra:
**tratar credenciais legadas como comprometidas/obsoletas e rotacionar antes da implantação do Marketing OS.**

Não:
- copiar token do Make;
- importar token em novo sistema;
- reaproveitar segredo visto em cenário;
- manter segredo hardcoded.

# 4. Estratégia de credenciais nova

Antes do primeiro deploy conectado:

1. identificar Meta Business atual;
2. identificar/confirmar Facebook Page;
3. confirmar Instagram Business ligado à Page;
4. identificar Meta App que será canônico;
5. gerar OAuth novo;
6. solicitar somente scopes necessários;
7. concluir Business Verification/App Review quando exigido;
8. armazenar segredo/tokens somente server-side;
9. rotacionar/revogar tokens legados;
10. registrar capability health.

# 5. Capability registry

O Marketing OS terá tabela/configuração de capabilities por conexão.

Exemplo:
- instagram_publish_image;
- instagram_publish_carousel;
- instagram_publish_reel;
- instagram_publish_story;
- instagram_read_comments;
- instagram_reply_comment;
- instagram_private_reply;
- instagram_messaging;
- facebook_publish_post;
- facebook_publish_reel;
- facebook_messenger;
- facebook_story_publish;
- whatsapp_asset_share;
- papoai_send_image;
- email_campaign_send.

Estados:
- unknown;
- requested;
- granted;
- poc_passed;
- enabled;
- blocked;
- expired.

Nenhuma UI mostra botão de automação se a capability não estiver `poc_passed`/enabled.

# 6. Rotação

Checklist pré-cutover:
- revogar token Meta hardcoded legado;
- rotacionar GitHub token legado;
- substituir conexão Make expiring por OAuth novo no Marketing OS;
- verificar que nenhum segredo está em Git;
- verificar nenhum segredo está em client JS;
- secrets no cofre/server;
- testar revoke/refresh.

# 7. Make

Não deletar imediatamente os cenários históricos relevantes.

Enquanto a implantação não estiver homologada:
- manter inativos;
- não executar;
- usar apenas para referência;
- registrar equivalência de capability.

Depois do cutover:
- exportar evidência necessária;
- remover/arquivar cenários e credenciais antigas conforme plano de limpeza.

# 8. POCs que dependem de ativo real

- listar Page e IG Professional;
- ler perfil;
- ler media;
- ler comments;
- responder comentário canário;
- publicar imagem canário;
- carrossel;
- Story Business;
- Reel;
- private reply em comentário de teste;
- Instagram Messaging;
- Facebook Page post;
- Facebook Reel;
- Messenger.

Cada POC registra:
- Graph API version;
- scopes;
- request;
- response id;
- erro;
- resultado;
- capability state.
