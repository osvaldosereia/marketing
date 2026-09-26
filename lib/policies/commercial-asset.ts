import type { ProductSnapshot } from "@/lib/domain";

export interface CommercialProductSnapshot {
  productId: string;
  priceCents: number;
  sellable: boolean;
}

export interface CommercialAssetSnapshot {
  products: CommercialProductSnapshot[];
}

export interface FreshnessCheck {
  fresh: boolean;
  reasons: string[];
}

export function createCommercialSnapshot(
  products: ProductSnapshot[],
): CommercialAssetSnapshot {
  return {
    products: products.map((product) => ({
      productId: product.id,
      priceCents: product.priceCents,
      sellable: product.sellable,
    })),
  };
}

export function checkCommercialAssetFreshness(
  snapshot: CommercialAssetSnapshot,
  current: ProductSnapshot[],
): FreshnessCheck {
  const currentById = new Map(current.map((product) => [product.id, product]));
  const reasons: string[] = [];

  for (const saved of snapshot.products) {
    const product = currentById.get(saved.productId);
    if (!product) {
      reasons.push(`${saved.productId}:missing`);
      continue;
    }
    if (!product.sellable) reasons.push(`${saved.productId}:not_sellable`);
    if (product.priceCents !== saved.priceCents) {
      reasons.push(`${saved.productId}:price_changed`);
    }
  }

  return {
    fresh: reasons.length === 0,
    reasons,
  };
}
