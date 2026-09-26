# AGENTS.md — Dona Antônia Marketing OS

## Antes de qualquer alteração

Leia nesta ordem:
1. README.md
2. docs/PROJECT-MASTER.md
3. docs/HANDOFF.md
4. docs/DECISIONS.md
5. docs/TECHNICAL-IMPLEMENTATION-PLAN.md
6. docs/POC-PLAN.md

## Regras de arquitetura

- Este repositório é separado do Vitrine/Admin.
- O Core Dona Antônia é fonte de verdade de produto, preço, estoque, cesta e pedido.
- Marketing acessa o Core por Bridge restrita e preferencialmente read-only.
- Nunca reutilize token/segredo encontrado em Make ou documentação antiga.
- Make é evidência histórica, não runtime.
- Meta: somente OAuth/API oficial.
- PapoAI: preferido para WhatsApp quando houver contrato oficial suficiente.
- WhatsApp Status termina com confirmação manual.
- Não implementar DM automática para novo seguidor.
- IA não inventa preço, estoque, desconto ou prazo.
- Foto/embalagem do produto não é redesenhada por IA.
- Toda ação externa precisa de idempotência, log e capability gate.

## Estado de segurança inicial

`NEXT_PUBLIC_MARKETING_MODE=mock`

Round 1 mantém:
- productionWritesEnabled=false;
- adapters Meta/PapoAI/Brevo bloqueados;
- Core Bridge em mock;
- nenhuma credencial externa necessária.

Não altere esse gate silenciosamente.

## Stack

- Next.js 16.3.x Active LTS
- React 19.3
- TypeScript 6
- CSS próprio
- futuro Supabase isolado para Marketing

## Comandos

```bash
npm install
npm run typecheck
npm run build
npm run dev
```

Ao instalar dependências pela primeira vez:
- gerar e commitar lockfile;
- não usar versões flutuantes para dependências críticas.

## Política de mudanças

Antes de integrar provider:
1. confirmar documentação oficial atual;
2. registrar Graph/API version;
3. criar capability;
4. testar read-only;
5. executar canário;
6. registrar evidência;
7. só então habilitar write.

## Final de cada rodada

- atualizar docs/HANDOFF.md;
- registrar o que foi implementado;
- registrar o que não foi validado;
- documentar ação humana pendente;
- deixar a próxima rodada explicitamente definida.
