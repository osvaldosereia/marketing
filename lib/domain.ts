export type MarketingChannel =
  | "instagram"
  | "facebook"
  | "whatsapp"
  | "email";

export type ContentFormat =
  | "feed"
  | "carousel"
  | "reel"
  | "story"
  | "status"
  | "whatsapp_offer"
  | "email";

export type WorkflowStatus =
  | "draft"
  | "generated"
  | "awaiting_approval"
  | "approved"
  | "scheduled"
  | "published"
  | "shared_manually"
  | "stale"
  | "failed";

export type OpportunityKind =
  | "offer"
  | "basket"
  | "category"
  | "seasonal"
  | "utility"
  | "trust";

export interface ProductSnapshot {
  id: string;
  name: string;
  shortName: string;
  category: string;
  priceCents: number;
  unitLabel: string;
  imageUrl?: string;
  sellable: boolean;
  offerLabel?: string;
}

export interface MarketingOpportunity {
  id: string;
  kind: OpportunityKind;
  title: string;
  reason: string;
  suggestedChannel: MarketingChannel;
  suggestedFormat: ContentFormat;
  score: number;
  expiresAt?: string;
}

export interface ScheduledContent {
  id: string;
  campaignName: string;
  channel: MarketingChannel;
  format: ContentFormat;
  status: WorkflowStatus;
  scheduledAt: string;
}

export interface AttentionItem {
  id: string;
  title: string;
  detail: string;
  severity: "info" | "warning" | "critical";
  actionLabel: string;
}

export interface CampaignDraft {
  id: string;
  name: string;
  objective: string;
  status: WorkflowStatus;
  products: ProductSnapshot[];
  channels: MarketingChannel[];
  createdAt: string;
}

export interface BrandTokens {
  brandName: string;
  marketLabel: string;
  siteLabel: string;
  whatsappLabel: string;
  background: string;
  surface: string;
  text: string;
  mutedText: string;
  accent: string;
  accentSoft: string;
  border: string;
  radius: number;
}
