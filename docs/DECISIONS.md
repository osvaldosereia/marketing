# DECISIONS — Dona Antônia Marketing OS

Atualizado em: 2026-09-25

## Decisões vigentes

### D001 — Projeto separado
Marketing fica no repositório `osvaldosereia/marketing` e será aplicação/runtime separados do Vitrine/Admin.

### D002 — Core é fonte de verdade
Preço, estoque, produto, cesta, pedido e regras comerciais pertencem ao Core/Bling. Marketing lê por Bridge.

### D003 — Oficial somente
Meta/WhatsApp/Instagram/Facebook: somente APIs oficiais, OAuth, App Review e permissões aprovadas.

### D004 — PapoAI primeiro no WhatsApp
Quando PapoAI oferecer capacidade oficial suficiente, usar o PapoAI em vez de reconstruir atendimento.

### D005 — Make não volta
Make antigo é apenas inventário/evidência.

### D006 — IA não inventa fatos comerciais
OpenAI cria estratégia/copy/visual/classificação, mas preço/estoque/desconto/prazo vêm de fonte determinística.

### D007 — Foto real de produto
IA não redesenha embalagem, rótulo ou marca. Arte usa composição com foto original.

### D008 — Novo seguidor não recebe DM automática
Não há gatilho oficial suportado para automação de novo seguidor. Recurso removido.

### D009 — Comment -> Direct somente pela capability oficial
Private reply segue limite/janela oficial e não vira sequência de mensagens sem nova interação válida.

### D010 — WhatsApp Status manual no último passo
Marketing gera e compartilha asset, mas usuário confirma publicação no WhatsApp. Sem automação de tela.

### D011 — Facebook Story não é promessa V1
Só habilitar se POC comprovar endpoint oficial vigente. Caso contrário manual.

### D012 — Brevo é provider preferido de email V1
Usar adapter para evitar lock-in.

### D013 — Email exige consentimento/suppression
Não transformar email de pedido em marketing irrestrito.

### D014 — Horários aprendidos
Benchmarks externos alimentam os primeiros testes; após dados suficientes, a própria performance Dona Antônia define horários.

### D015 — Métrica de negócio acima de vaidade
Pedidos, conversas e cliques > likes.

### D016 — Asset com preço pode expirar
Mudança de preço/estoque/oferta antes da publicação torna asset stale e bloqueia publicação.

### D017 — Comentário crítico vai para humano
Reclamação, pedido atrasado, pagamento, jurídico e incerteza não recebem auto-reply irrestrito.

### D018 — Market local
Cuiabá e Várzea Grande. Estratégia não busca audiência nacional sem motivo.

### D019 — Escopo ampliado por decisão do usuário em 2026-09-25
O escopo anterior focado em Bling/PapoAI pós-venda deixa de ser exclusivo.
A nova frente prioritária é:
- Instagram;
- Facebook;
- comment/DM oficial;
- WhatsApp creative assets;
- email marketing;
- Creative/Strategy/Calendar/Analytics.

A pesquisa de pós-venda continua preservada e poderá se integrar posteriormente.

### D020 — Documentação obrigatória
Toda rodada futura:
1. ler PROJECT-MASTER e HANDOFF;
2. atualizar decisões relevantes;
3. registrar commits;
4. atualizar HANDOFF antes de terminar.
