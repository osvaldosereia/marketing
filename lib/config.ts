export type MarketingMode = "mock" | "connected";

export interface RuntimeConfig {
  mode: MarketingMode;
  productionWritesEnabled: boolean;
}

export function getRuntimeConfig(): RuntimeConfig {
  const mode =
    process.env.NEXT_PUBLIC_MARKETING_MODE === "connected"
      ? "connected"
      : "mock";

  return {
    mode,
    // Deliberately false in Round 1. This must only become configurable after
    // provider canaries and approval gates exist.
    productionWritesEnabled: false,
  };
}
