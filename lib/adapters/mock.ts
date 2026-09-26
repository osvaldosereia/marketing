import type {
  CoreMarketingBridge,
  EmailAdapter,
  PapoAIAdapter,
  ProviderCapability,
  PublishRequest,
  PublishResult,
  SocialAdapter,
} from "@/lib/adapters/contracts";
import type { ProductSnapshot } from "@/lib/domain";
import { mockProducts } from "@/lib/mock-data";

function blockedResult(): PublishResult {
  return {
    accepted: false,
    status: "failed",
    errorCode: "provider_not_connected_round_1",
  };
}

export class MockMetaAdapter implements SocialAdapter {
  provider = "meta" as const;

  async getCapabilities(): Promise<ProviderCapability[]> {
    return [
      { key: "instagram_publish_image", state: "unknown" },
      { key: "instagram_publish_carousel", state: "unknown" },
      { key: "instagram_publish_story", state: "unknown" },
      { key: "instagram_reply_comment", state: "unknown" },
      { key: "instagram_private_reply", state: "unknown" },
      { key: "facebook_publish_post", state: "unknown" },
    ];
  }

  async publish(_request: PublishRequest): Promise<PublishResult> {
    return blockedResult();
  }

  async replyToComment(): Promise<PublishResult> {
    return blockedResult();
  }
}

export class MockPapoAIAdapter implements PapoAIAdapter {
  provider = "papoai" as const;

  async sendImage(): Promise<PublishResult> {
    return blockedResult();
  }
}

export class MockBrevoAdapter implements EmailAdapter {
  provider = "brevo" as const;

  async sendTest(): Promise<PublishResult> {
    return blockedResult();
  }
}

export class MockCoreMarketingBridge implements CoreMarketingBridge {
  async getProducts(ids: string[]): Promise<ProductSnapshot[]> {
    return mockProducts.filter((product) => ids.includes(product.id));
  }
}
