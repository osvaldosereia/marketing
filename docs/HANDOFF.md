# HANDOFF — Dona Antônia Marketing OS

Atualizado em: 2026-09-25
Fase: pesquisa e especificação. Código de produto ainda não iniciado.

## Repositório
`osvaldosereia/marketing`

## Objetivo atual
Produzir uma especificação completa, baseada em fontes oficiais e no estado real da Dona Antônia, antes da programação.

## Decisões já fechadas
- Marketing OS separado do Vitrine/Admin.
- Core/Bling permanecem fonte de verdade operacional.
- PapoAI permanece responsável pelo WhatsApp e seus recursos nativos devem ser reaproveitados.
- Foco comercial somente Cuiabá e Várzea Grande.
- Priorizar recursos oficiais e gratuitos.
- Make não volta como runtime.
- Nada de programação nesta fase.

## Documentos existentes
- `README.md` — escopo e regras do projeto.
- `docs/DECISIONS.md` — decisões arquiteturais.
- `docs/WHATSAPP-PLATFORM-ALTERNATIVES.md` — estudo de Blip, Zenvia, WATI, respond.io, Twilio, 360dialog e Gupshup.
- este `docs/HANDOFF.md`.

## Achados já confirmados
- repositório Marketing nasceu vazio;
- Supabase operacional possui base real de clientes, pedidos, produtos e consentimento de marketing;
- PapoAI continua sendo o canal WhatsApp atual e o Core já captura webhooks reais;
- foram observados 39 eventos PapoAI normalizados no banco no momento da pesquisa;
- payload real PapoAI observado: `message.received`, com objetos `contact`, `message` e `session`;
- tipos reais observados incluem texto, áudio OGG/Opus e imagem JPEG;
- legado Make prova que já houve publicação nativa no Instagram e automação comentário -> resposta -> privado;
- Google Merchant Center oferece listagens gratuitas e listagens locais gratuitas no Brasil;
- Bling possui webhooks oficiais para pedido, produto, estoque, estoque virtual, fornecedor-produto e notas;
- alternativas PapoAI pesquisadas: Blip, Zenvia, WATI, respond.io, Twilio, 360dialog e Gupshup;
- nenhuma dessas sete possui conector nativo disponível no ambiente ChatGPT atual;
- Blip e Zenvia são as contingências mais próximas como plataforma pronta;
- Twilio/360dialog/Gupshup são mais adequadas se decidirmos construir uma camada própria.

## Decisão sobre PapoAI
Não migrar agora. Antes, auditar quais APIs e recursos estão disponíveis na conta atual:
- contatos;
- conversas/mensagens;
- etiquetas;
- Kanban/funil;
- follow-up;
- campanhas;
- templates;
- métricas;
- webhooks;
- WhatsApp Flows;
- catálogo/product templates;
- opt-in/opt-out;
- origem do lead.

## Próximo passo de pesquisa
Consolidar:
- capacidades/permissões Meta;
- Google Business Profile;
- PapoAI e contrato real de integração;
- Google Merchant/Analytics/Search Console;
- recursos locais gratuitos adicionais;
- Bling pós-venda;
- atribuição;
- arquitetura e roadmap;
- depois criar `docs/PROJECT-MASTER.md` consolidado antes de programar.

## Regra para nova janela
Antes de responder/programar:
1. ler `README.md`;
2. se já existir, ler `docs/PROJECT-MASTER.md`;
3. ler `docs/DECISIONS.md`;
4. ler `docs/WHATSAPP-PLATFORM-ALTERNATIVES.md`;
5. ler este HANDOFF;
6. verificar commits mais recentes.

Não confiar apenas em memória da conversa.
