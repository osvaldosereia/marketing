# CREATIVE-DESIGN-SYSTEM — Dona Antônia Marketing

Atualizado em: 2026-09-25
Status: conceito e especificação visual.

# 1. Conceito criativo

Posicionamento:
**mercado local simples, confiável, útil e próximo.**

A comunicação não deve parecer:
- atacadista nacional;
- marketplace genérico;
- arte de panfleto poluída;
- conteúdo de IA artificial.

Deve parecer:
- Dona Antônia;
- Cuiabá e Várzea Grande;
- preço legível;
- produto real;
- mensagem curta;
- atendimento próximo pelo WhatsApp.

Princípios:
1. produto real é protagonista;
2. preço e benefício legíveis em 1 segundo;
3. no máximo uma mensagem central por peça;
4. pouco texto dentro da imagem;
5. CTA simples;
6. identidade consistente;
7. nenhuma IA redesenha rótulo/logomarca/embalagem do produto.

# 2. Pipeline criativo

Fonte de verdade:
produto ativo -> foto real -> preço atual -> oferta válida -> estoque vendável -> categoria.

A IA pode:
- propor tema;
- escrever headline;
- escolher layout;
- sugerir agrupamento de produtos;
- gerar fundo/pattern/elementos decorativos;
- criar variações de copy.

A IA NÃO pode:
- gerar uma embalagem falsa;
- mudar marca/rótulo;
- criar preço;
- criar desconto;
- alterar volume/peso;
- afirmar estoque sem consulta.

Render final deve ser composição determinística:
- foto original recortada;
- tipografia;
- preço;
- selo;
- CTA;
- fundo gerado ou template.

# 3. Famílias de peças

## A. Oferta 4 produtos
Principal formato comercial.

Usos:
- WhatsApp em conversa;
- Status;
- Story;
- Feed adaptado.

Composição:
- título curto;
- 4 produtos;
- foto;
- nome curto;
- preço grande;
- unidade/embalagem;
- rodapé Dona Antônia;
- CTA para pedir pelo WhatsApp/catálogo.

Nunca mais de 4 produtos na peça destinada à conversa WhatsApp.

## B. Carrossel de ofertas
Estrutura sugerida:
1. capa: tema + benefício;
2. produtos 1–2;
3. produtos 3–4;
4. produtos 5–6;
5. cesta/combinação;
6. CTA.

Não é obrigatório ter 6 páginas; o engine escolhe conforme conteúdo.

## C. Produto destaque
Uma foto grande + benefício + preço.

## D. Cesta básica
Mostrar cesta + principais componentes.
Não poluir com preço unitário se a oferta é da cesta.

## E. Oferta por ocasião
- começo do mês;
- reposição de despensa;
- limpeza;
- café da manhã;
- almoço;
- fim de semana;
- volta às aulas;
- datas locais/nacionais relevantes.

## F. Conteúdo não-promocional
- dica de conservação;
- organização de despensa;
- economia doméstica;
- como escolher;
- bastidores/entrega;
- atendimento local;
- confiança/prova social autorizada.

Meta estratégica:
não transformar o perfil em encarte infinito.

# 4. Formatos mestres

## Feed Instagram/Facebook
Master recomendado:
- 1080x1350 (4:5) para peça estática vertical;
- versão 1080x1080 quando necessário.

## Story Instagram / WhatsApp Status
- 1080x1920;
- safe zones amplas no topo/rodapé;
- preço e CTA no centro visual;
- evitar texto nas áreas cobertas pela UI.

## Reels
- 1080x1920;
- estrutura modular 6–15s para ofertas;
- produto real;
- motion simples;
- legenda/copy fora da imagem quando possível.

## Email
Não transformar email em imagem única.
Usar:
- HTML responsivo;
- headline em texto;
- cards de produto;
- preço em texto;
- CTA;
- imagens com alt text.

# 5. Template 4 produtos — WhatsApp

Objetivo:
a pessoa conseguir entender a oferta sem ampliar a imagem.

Layout V1:
- cabeçalho 12–15%;
- grade 2x2;
- rodapé 10–12%.

Cada card:
- foto: 55–60%;
- nome: até 2 linhas;
- preço: elemento de maior contraste;
- complemento: unidade/peso.

Título:
- "Ofertas de hoje"
- "4 ofertas para sua despensa"
- "Economize na compra de hoje"

CTA:
- "Me diga quais você quer"
- "Peça aqui pelo WhatsApp"

A copy da mensagem acompanha a imagem e pode listar os quatro itens em texto para acessibilidade e busca.

# 6. Design tokens

O sistema deverá futuramente guardar:
- logo;
- cores oficiais;
- fontes;
- escalas tipográficas;
- bordas;
- sombras;
- padrões;
- safe zones;
- layouts.

Nunca hardcodar estilo em dezenas de funções.

Criar um renderer orientado por template:
`template + products + offer + brand_tokens -> asset`.

# 7. Validação antes de render/publicar

Obrigatório:
- produto ativo;
- foto válida;
- preço > 0;
- estoque vendável;
- oferta dentro da validade;
- unidade correta;
- nome legível;
- nenhuma duplicação;
- campanha não expirou.

Na publicação, revalidar preço/estoque.

Se mudou:
- bloquear asset;
- regenerar;
- nunca publicar valor antigo.

# 8. Revisão visual automática

Checks:
- texto fora da safe zone;
- preço pequeno;
- sobreposição;
- foto cortada;
- fundo muito próximo da embalagem;
- contraste baixo;
- número de caracteres;
- produto sem imagem;
- logo ausente;
- 4 produtos realmente presentes no template WhatsApp.

# 9. Biblioteca de variações

Cada campanha poderá gerar:
- Clean;
- Oferta Forte;
- Editorial;
- Econômica;
- Datas/ocasião.

Mas todas usam a mesma identidade.
Não variar ao ponto de parecer outra empresa.

# 10. Aprovação

Estados:
- draft;
- generated;
- quality_checked;
- awaiting_approval;
- approved;
- scheduled;
- published/shared;
- stale;
- failed.

Asset com preço vira `stale` quando preço/estoque/oferta muda antes da publicação.
