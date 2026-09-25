# Dona Antônia — Marketing

Projeto independente de pesquisa, especificação e futura implementação das automações comerciais da Dona Antônia.

## Estado atual
**Fase:** especificação pré-implementação.  
**Nenhuma programação de sender/campanha iniciada neste repositório.**

## Escopo atual congelado

Até esta primeira integração estar executável e homologada, trabalhar somente em:

**Bling → eventos comerciais → PapoAI → WhatsApp → pós-venda → consentimento → recompra**

As frentes de Instagram, Facebook, Google, Ads, Creative Studio e demais canais permanecem pausadas.

## Objetivo da V1

Usar eventos confiáveis do Bling/Core para:
- avisos úteis do pedido;
- pós-venda;
- detecção de problema e handoff humano;
- captura explícita de consentimento;
- recompra relevante;
- interrupção automática de marketing em reclamação/devolução/opt-out;
- mensuração de resposta e nova compra.

## Papéis

- **Bling:** ERP e fonte de eventos.
- **Core Dona Antônia / SUCEDOAN12:** fonte operacional, reconciliação e business events.
- **PapoAI:** WhatsApp, CRM, IA, atendimento humano, templates, follow-up e campanhas quando oferecidos.
- **Marketing:** jornadas, consentimento, suppression, recompra e métricas.

## Princípios
1. Não duplicar Vitrine/Admin nem Bling.
2. Não reconstruir o PapoAI; integrar com ele.
3. Bling não dispara comunicação diretamente sem policy gate.
4. Marketing não recebe acesso irrestrito ao banco operacional.
5. Mensagem transacional não vale como consentimento de marketing.
6. Base histórica não recebe opt-in automático.
7. Priorizar APIs oficiais e recursos já incluídos.
8. Make não volta como runtime.
9. Toda decisão e programação futura será documentada.
10. Toda nova janela deve continuar pelo estado do repositório, não pela memória do chat.

## Documentação canônica

Leia nesta ordem:

1. `docs/PROJECT-MASTER.md`
2. `docs/DECISIONS.md`
3. `docs/JOURNEY-MATRIX.md`
4. `docs/INTEGRATION-CONTRACT.md`
5. `docs/IMPLEMENTATION-ROADMAP.md`
6. `docs/RESEARCH-SOURCES.md`
7. `docs/BLING-PAPOAI-POSTSALE.md`
8. `docs/HANDOFF.md`

Referência de contingência:
- `docs/WHATSAPP-PLATFORM-ALTERNATIVES.md`

## Regra de continuidade

Ao final de cada rodada relevante:
- atualizar documentação;
- registrar decisões;
- atualizar `HANDOFF.md`;
- registrar commits/estado;
- não avançar um gate que ainda não foi homologado.
