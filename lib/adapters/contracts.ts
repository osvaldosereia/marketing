import type {
  ContentFormat,
  MarketingChannel,
  ProductSnapshot,
} from "@/lib/domain";

export type CapabilityState =
  | "unknown"
  | "requested"
  | "granted"
  | "poc_passed"
  | "enabled"
  | "blocked"
  | "expired";

export interface ProviderCapability {
  key: string;
  state: CapabilityState;
  lastTestedAt?: string;
}

export interface PublishRequest {
  idempotencyKey: string;
  channel: MarketingChannel;
  format: ContentFormat;
  caption?: string;
  assetUrl: string;
  scheduledAt?: string;
}

export interface PublishResult {
  accepted: boolean;
  externalId?: string;
  status: "accepted" | "published" | "failed";
  errorCode?: string;
}

export interface SocialComment {
  externalId: string;
  contentExternalId: string;
  authorRef: string;
  text: string;
  occurredAt: string;
}

export interface SocialAdapter {
  provider: "meta";
  getCapabilities(): Promise<ProviderCapability[]>;
  publish(request: PublishRequest): Promise<PublishResult>;
  replyToComment(input: {
    commentId: string;
    text: string;
    idempotencyKey: string;
  }): Promise<PublishResult>;
}

export interface PapoAIAdapter {
  provider: "papoai";
  sendImage(input: {
    phoneE164: string;
    imageUrl: string;
    caption?: string;
    idempotencyKey: string;
  }): Promise<PublishResult>;
}

export interface EmailAdapter {
  provider: "brevo";
  sendTest(input: {
    campaignRef: string;
    recipient: string;
  }): Promise<PublishResult>;
}

export interface CoreMarketingBridge {
  getProducts(ids: string[]): Promise<ProductSnapshot[]>;
}
