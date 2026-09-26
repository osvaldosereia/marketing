import { getRuntimeConfig } from "@/lib/config";

export async function GET() {
  const config = getRuntimeConfig();

  return Response.json({
    ok: true,
    service: "dona-antonia-marketing-os",
    mode: config.mode,
    productionWritesEnabled: config.productionWritesEnabled,
    providers: {
      meta: "not_connected",
      papoai: "not_connected",
      brevo: "not_connected",
      coreBridge: "mock",
    },
  });
}
