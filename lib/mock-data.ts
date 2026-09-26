import type {
  AttentionItem,
  CampaignDraft,
  MarketingOpportunity,
  ProductSnapshot,
  ScheduledContent,
} from "@/lib/domain";

export const mockProducts: ProductSnapshot[] = [
  {
    id: "mock-arroz",
    name: "Arroz Tipo 1 — pacote 5 kg",
    shortName: "Arroz Tipo 1",
    category: "Mercearia",
    priceCents: 2490,
    unitLabel: "5 kg",
    sellable: true,
    offerLabel: "Exemplo",
  },
  {
    id: "mock-feijao",
    name: "Feijão Carioca — pacote 1 kg",
    shortName: "Feijão Carioca",
    category: "Mercearia",
    priceCents: 799,
    unitLabel: "1 kg",
    sellable: true,
    offerLabel: "Exemplo",
  },
  {
    id: "mock-oleo",
    name: "Óleo de Soja — garrafa 900 ml",
    shortName: "Óleo de Soja",
    category: "Mercearia",
    priceCents: 699,
    unitLabel: "900 ml",
    sellable: true,
    offerLabel: "Exemplo",
  },
  {
    id: "mock-acucar",
    name: "Açúcar Cristal — pacote 2 kg",
    shortName: "Açúcar Cristal",
    category: "Mercearia",
    priceCents: 829,
    unitLabel: "2 kg",
    sellable: true,
    offerLabel: "Exemplo",
  },
];

export const mockOpportunities: MarketingOpportunity[] = [
  {
    id: "opp-1",
    kind: "offer",
    title: "Monte uma peça com 4 ofertas",
    reason: "Primeiro fluxo visual do projeto: preço grande, produto real e CTA simples.",
    suggestedChannel: "whatsapp",
    suggestedFormat: "whatsapp_offer",
    score: 94,
  },
  {
    id: "opp-2",
    kind: "basket",
    title: "Carrossel de cesta básica",
    reason: "Formato adequado para explicar valor e composição sem poluir uma única imagem.",
    suggestedChannel: "instagram",
    suggestedFormat: "carousel",
    score: 88,
  },
  {
    id: "opp-3",
    kind: "utility",
    title: "Conteúdo útil de reposição",
    reason: "Equilibra o perfil para não virar apenas um encarte de ofertas.",
    suggestedChannel: "facebook",
    suggestedFormat: "feed",
    score: 73,
  },
];

export const mockSchedule: ScheduledContent[] = [
  {
    id: "scheduled-1",
    campaignName: "Ofertas da semana — mock",
    channel: "instagram",
    format: "feed",
    status: "awaiting_approval",
    scheduledAt: "Hoje · 12:10",
  },
  {
    id: "scheduled-2",
    campaignName: "4 ofertas — mock",
    channel: "whatsapp",
    format: "status",
    status: "generated",
    scheduledAt: "Hoje · compartilhamento manual",
  },
  {
    id: "scheduled-3",
    campaignName: "Reposição de despensa — mock",
    channel: "email",
    format: "email",
    status: "draft",
    scheduledAt: "Sexta · 10:00",
  },
];

export const mockAttention: AttentionItem[] = [
  {
    id: "attention-1",
    title: "Aprovação pendente",
    detail: "1 peça demonstrativa está aguardando aprovação.",
    severity: "warning",
    actionLabel: "Revisar",
  },
  {
    id: "attention-2",
    title: "Meta ainda desconectada",
    detail: "Correto para a Rodada 1: nenhuma credencial de produção foi ligada.",
    severity: "info",
    actionLabel: "Ver plano",
  },
];

export const mockCampaign: CampaignDraft = {
  id: "campaign-mock-001",
  name: "4 ofertas para sua despensa",
  objective: "conversation",
  status: "generated",
  products: mockProducts,
  channels: ["whatsapp", "instagram", "facebook"],
  createdAt: "2026-09-25",
};
