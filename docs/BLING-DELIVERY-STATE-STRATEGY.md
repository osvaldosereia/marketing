# Estratégia de Estados — Bling, Expedição e Pós-venda

Atualizado em: 2026-09-25  
Status: arquitetura pré-implementação.

# 1. Descoberta crítica

No Bling, a situação padrão **Atendido** não representa de forma confiável "entregue ao cliente".

A documentação oficial informa que:
- `Atendido` pode ser atribuído automaticamente ao gerar a nota fiscal;
- `Verificado` é próprio do Checkout de Pedidos/conferência;
- `Em andamento` representa pedido fechado ainda não entregue;
- situações personalizadas podem ser criadas;
- o Gerenciador de Transições permite definir destinos e ações.

Portanto:
**não usar Atendido como gatilho de pós-venda.**

# 2. Operação Dona Antônia

A Dona Antônia usa entrega local própria em Cuiabá e Várzea Grande.

Por isso, os status de rastreamento das integrações logísticas do Bling (Bling Envios, Mercado Envios etc.) não são fonte adequada para a entrega própria.

Fonte real da entrega:
- ferramenta/tela do entregador;
- confirmação de entrega;
- pagamento efetivo;
- timestamp real.

# 3. Fonte de evento por etapa

| Etapa | Fonte primária |
|---|---|
| aguardando confirmação | Core/Bling |
| confirmado | Core/Bling |
| separar | Bling/Core |
| conferido | Bling Checkout/Core |
| fiscal | Bling/SEFAZ |
| pronto | Core/Bling |
| saiu para entrega | Core entrega; opcional espelhar Bling |
| entregue | Core entrega; opcional espelhar Bling |
| cancelado antes saída | Core/Bling |
| retorno/devolução | Core + Bling conforme fluxo fiscal |

# 4. Situações personalizadas candidatas no Bling

Somente durante POC futura, estudar:
- `Saiu para entrega`;
- `Entregue ao cliente`;
- opcional `Problema na entrega`.

Essas situações devem:
- não lançar estoque de novo;
- não lançar contas de novo;
- não gerar NF novamente;
- não disparar ações fiscais duplicadas;
- servir como espelho operacional/relatório e webhook.

Não criar antes de testar no Gerenciador de Transições.

# 5. Fluxo preferido

```
Core entrega confirma SAÍDA
    ↓
business event order.out_for_delivery
    ↓
opcional atualiza situação Bling
    ↓
Marketing policy
    ↓
PapoAI WhatsApp
```

Entrega:

```
Entregador confirma entrega + pagamento
    ↓
Core fecha delivery
    ↓
business event order.delivered
    ↓
opcional atualiza Bling "Entregue ao cliente"
    ↓
Marketing agenda pós-venda
```

O Marketing não deve esperar o webhook de volta do Bling para considerar a entrega concluída se o Core foi a fonte física original. Isso evitaria round-trip artificial.

# 6. Papel do webhook Bling

Ainda é extremamente útil para:
- pedido confirmado/mudança comercial;
- cancelamento;
- alterações feitas diretamente no ERP;
- reconciliação;
- detectar divergência;
- manter o Core alinhado.

Mas entrega física local é domínio do Core/entregador.

# 7. Fontes oficiais

- Situações dos pedidos de venda:
  https://ajuda.bling.com.br/hc/pt-br/articles/360036457114-Situa%C3%A7%C3%B5es-dos-pedidos-de-venda
- Gerenciador de Transições:
  https://ajuda.bling.com.br/hc/pt-br/articles/360039070654-Gerenciador-de-transi%C3%A7%C3%B5es-para-situa%C3%A7%C3%B5es-de-pedidos-de-venda
- Webhooks:
  https://developer.bling.com.br/webhooks
