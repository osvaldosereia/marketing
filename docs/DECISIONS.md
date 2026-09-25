# DECISIONS — Dona Antônia Marketing OS

Atualizado em: 2026-09-25

## Decisões vigentes

### D001 — Projeto separado do Vitrine/Admin
O Marketing OS será desenvolvido no repositório `osvaldosereia/marketing`, com ciclo de deploy e domínio técnico independentes.

Motivo: evitar que experimentos de marketing, APIs sociais, geração de mídia ou mudanças de plataforma afetem o checkout, pedidos, estoque, fiscal ou operação da Dona Antônia.

### D002 — Core operacional continua sendo a fonte de verdade
Marketing OS não será ERP e não será fonte de verdade de preço, estoque, pedido ou cliente fiscal.

Fontes:
- Vitrine/Core Dona Antônia: regras comerciais e operação;
- Bling: ERP/fiscal e dados que já são canônicos no projeto;
- PapoAI: canal WhatsApp, CRM e automações nativas de conversa;
- Marketing OS: campanhas, conteúdo, calendário, oportunidades, social inbox não-WhatsApp, reputação e métricas.

### D003 — PapoAI primeiro para WhatsApp
Não duplicar recursos do PapoAI.

Sempre que o PapoAI oferecer nativamente:
- atendimento;
- IA de conversa;
- áudio/imagem;
- multiatendimento;
- etiquetas;
- Kanban;
- funil;
- follow-up;
- campanhas;
- templates Meta;
- origem do lead;
- relatórios;
o Marketing OS deverá integrar/orquestrar em vez de reconstruir.

### D004 — Foco geográfico
Operação comercial local:
- Cuiabá/MT;
- Várzea Grande/MT.

A estratégia deve priorizar recursos de intenção local, reputação local, catálogo/local inventory, WhatsApp e mensuração de vendas locais.

### D005 — Prioridade para oficial + gratuito
Antes de contratar terceiros, estudar e usar recursos oficiais gratuitos ou incluídos nas plataformas existentes.

### D006 — Nenhum código de produção durante a fase de pesquisa
Até PROJECT-MASTER ser fechado:
- não criar banco;
- não criar Edge Functions;
- não conectar APIs em produção;
- não reativar Make;
- não modificar Vitrine/Admin.

### D007 — Make é inventário, não runtime
Cenários antigos podem ser lidos como evidência técnica e histórico. Não serão reativados como motor do Marketing OS.

### D008 — Integração por Bridge
A futura conexão Core -> Marketing será por API/eventos/read-model controlado. Marketing não ganhará acesso irrestrito ao banco operacional.

### D009 — Documentação é parte do produto
Toda rodada futura deve:
1. ler PROJECT-MASTER, HANDOFF e DECISIONS;
2. documentar mudanças;
3. atualizar HANDOFF antes de encerrar;
4. registrar decisões relevantes antes/depois da implementação.
