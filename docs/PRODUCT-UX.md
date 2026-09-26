# PRODUCT-UX — Dona Antônia Marketing OS

Atualizado em: 2026-09-25
Status: especificação de produto/UX.

# 1. Princípio de experiência

A ferramenta não abre em "Criar post".

Ela abre em **Hoje** e responde:
- o que vale publicar;
- o que está pronto;
- o que precisa aprovar;
- o que recebeu comentário;
- o que falhou;
- o que gerou resultado.

Visual:
- leve;
- Google-like;
- mobile/tablet friendly;
- poucas cores;
- cards claros;
- estados visíveis;
- ações grandes;
- detalhes técnicos escondidos.

# 2. Navegação

Menu:
1. Hoje
2. Oportunidades
3. Campanhas
4. Studio
5. Calendário
6. Conversas
7. WhatsApp
8. Email
9. Desempenho
10. Conexões
11. Configurações

# 3. Hoje

Cards principais:

## Precisa de você
- aprovar peça;
- comentário sensível;
- conexão vencendo;
- publicação falhou;
- asset stale;
- email aguardando aprovação.

## Próximas publicações
- horário;
- canal;
- preview;
- campanha;
- estado.

## Oportunidades
Exemplo:
- 4 produtos em oferta com estoque;
- cesta ainda não divulgada esta semana;
- categoria sem conteúdo há 12 dias.

## Interações
- comentários novos;
- DMs;
- human handoff.

## Resultado
- conversas;
- cliques;
- pedidos atribuídos;
- top conteúdo.

# 4. Oportunidades

Lista ordenada por relevância.

Card:
- motivo;
- produtos;
- canal sugerido;
- formato;
- janela recomendada;
- validade da oportunidade;
- CTA "Criar campanha".

Filtros:
- oferta;
- estoque;
- cesta;
- categoria;
- sazonal;
- conteúdo não-promocional.

# 5. Campanha

Página central.

Cabeçalho:
- objetivo;
- público;
- Cuiabá/VG;
- período;
- status.

Abas:
- Brief;
- Produtos;
- Conteúdos;
- Assets;
- Calendário;
- Performance.

Ações:
- Gerar;
- Regenerar copy;
- Trocar template;
- Aprovar tudo;
- Aprovar por canal;
- Agendar;
- Pausar.

# 6. Studio

Painel esquerdo:
- produtos;
- busca;
- filtros;
- tema;
- orientação.

Centro:
- canvas/preview.

Painel direito:
- template;
- formato;
- headline;
- preços;
- CTA;
- variações.

Preview tabs:
- Feed;
- Story;
- Status;
- WhatsApp 4 produtos;
- Email.

Não permitir edição livre que altere fatos de produto sem validação.

# 7. Calendário

Visual semanal como padrão.

Cada item mostra:
- canal icon;
- thumbnail;
- horário;
- status.

Drag-and-drop:
- muda schedule;
- valida conflito;
- não publica asset stale.

Filtros:
- Instagram;
- Facebook;
- WhatsApp;
- Email;
- campanha.

# 8. Conversas

Não substituir PapoAI/Meta inbox por completo no início.

V1:
- comentários;
- DMs que chegaram pela API;
- AI draft;
- auto-replied;
- needs human.

Filtros:
- preço;
- estoque;
- entrega;
- cesta;
- reclamação;
- spam.

Cada evento mostra:
- texto;
- post de origem;
- contexto;
- resposta proposta;
- motivo da política;
- ação.

Ações:
- Aprovar e responder;
- Editar;
- Responder manual;
- Ignorar;
- Encaminhar humano.

# 9. WhatsApp

Duas áreas:

## Status
- assets do dia;
- preview;
- botão Compartilhar;
- marcação manual "Publicado";
- expirações.

## Ofertas para conversa
- criar imagem 4 produtos;
- copiar texto;
- enviar via PapoAI quando integrado;
- ou abrir asset para uso manual.

Templates:
- Ofertas de hoje;
- Limpeza;
- Mercearia;
- Higiene;
- Cesta complementar.

# 10. Email

Lista:
- drafts;
- scheduled;
- sent.

Editor simplificado:
- assunto;
- preheader;
- hero;
- produtos;
- CTA;
- preview desktop/mobile.

Segmento:
- consentidos;
- cesta;
- categoria;
- inativos.

Ações:
- enviar teste;
- aprovar;
- agendar.

# 11. Desempenho

Filtros:
- período;
- canal;
- campanha;
- formato;
- produto;
- horário.

KPIs:
- reach/views;
- shares/saves;
- comments;
- conversations;
- clicks;
- orders;
- revenue.

Comparações:
- carrossel vs imagem;
- horário;
- template;
- tema;
- produto.

# 12. Conexões

Cards:
- Instagram;
- Facebook;
- PapoAI;
- Brevo;
- Core Bridge;
- OpenAI.

Cada card:
- conectado;
- última validação;
- scopes/capabilities;
- token expiry/health;
- último webhook;
- último erro.

Nunca mostrar token.

# 13. Configurações

Seções:
- Marca;
- IA;
- Política de comentários;
- Horários;
- Frequência;
- Aprovação;
- Consentimento;
- Templates;
- Notificações.

# 14. Modos de autonomia

## Manual
IA gera, humano aprova tudo.

## Assistido
Posts de baixo risco podem publicar após aprovação da campanha; comentários FAQ podem auto-responder.

## Autopilot controlado
Somente regras explicitamente aprovadas.

Nunca autopilot sem gate para:
- reclamação;
- desconto;
- alteração de preço;
- DM fora de regra;
- email sem consentimento.

# 15. Mobile

Prioridades mobile:
- Hoje;
- aprovar asset;
- responder comentário;
- compartilhar Status;
- ver calendário.

Studio avançado pode ser desktop/tablet first.

# 16. Acessibilidade

- contraste AA;
- fonte mínima legível;
- não depender só de cor;
- alt text onde suportado;
- copy textual acompanha imagem promocional;
- botões grandes.

# 17. Objetivo operacional

Um operador deve conseguir:
1. abrir Hoje;
2. aprovar conteúdos;
3. responder exceções;
4. compartilhar Status;
5. acompanhar o que foi publicado;

sem entender Graph API, tokens, Supabase ou prompts.
