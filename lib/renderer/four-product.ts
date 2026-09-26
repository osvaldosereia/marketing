import type { BrandTokens, ProductSnapshot } from "@/lib/domain";
import { formatCurrencyFromCents } from "@/lib/format";

export type OfferRenderFormat = "conversation" | "story";

interface OfferRenderInput {
  title: string;
  subtitle: string;
  products: ProductSnapshot[];
  brand: BrandTokens;
  format?: OfferRenderFormat;
}

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function splitName(value: string, max = 20): [string, string] {
  const words = value.trim().split(/\s+/);
  let first = "";
  let second = "";

  for (const word of words) {
    if (!second && (first + " " + word).trim().length <= max) {
      first = (first + " " + word).trim();
    } else {
      second = (second + " " + word).trim();
    }
  }

  if (!second) second = " ";
  return [first || value.slice(0, max), second.slice(0, max + 6)];
}

export function renderFourProductOfferSvg(input: OfferRenderInput): string {
  const format = input.format ?? "conversation";
  const width = 1080;
  const height = format === "story" ? 1920 : 1350;
  const products = input.products.slice(0, 4);

  if (products.length !== 4) {
    throw new Error("four_product_renderer_requires_exactly_four_products");
  }

  if (products.some((product) => !product.sellable || product.priceCents <= 0)) {
    throw new Error("four_product_renderer_received_unsellable_product");
  }

  const headerHeight = format === "story" ? 300 : 230;
  const footerHeight = format === "story" ? 180 : 145;
  const gap = 24;
  const outer = 56;
  const gridTop = headerHeight + 30;
  const gridBottom = height - footerHeight - 30;
  const cardWidth = (width - outer * 2 - gap) / 2;
  const cardHeight = (gridBottom - gridTop - gap) / 2;

  const cards = products
    .map((product, index) => {
      const col = index % 2;
      const row = Math.floor(index / 2);
      const x = outer + col * (cardWidth + gap);
      const y = gridTop + row * (cardHeight + gap);
      const [line1, line2] = splitName(product.shortName);
      const price = formatCurrencyFromCents(product.priceCents);
      const circleY = y + cardHeight * 0.34;
      const initials = product.shortName
        .split(" ")
        .slice(0, 2)
        .map((word) => word[0]?.toUpperCase() ?? "")
        .join("");

      return `
        <g>
          <rect x="${x}" y="${y}" width="${cardWidth}" height="${cardHeight}" rx="32" fill="${input.brand.surface}" stroke="${input.brand.border}" stroke-width="2"/>
          <circle cx="${x + cardWidth / 2}" cy="${circleY}" r="${Math.min(cardWidth, cardHeight) * 0.19}" fill="${input.brand.accentSoft}"/>
          <text x="${x + cardWidth / 2}" y="${circleY + 14}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="54" font-weight="800" fill="${input.brand.accent}">${escapeXml(initials)}</text>
          <text x="${x + 34}" y="${y + cardHeight * 0.63}" font-family="Arial, Helvetica, sans-serif" font-size="35" font-weight="700" fill="${input.brand.text}">${escapeXml(line1)}</text>
          <text x="${x + 34}" y="${y + cardHeight * 0.70}" font-family="Arial, Helvetica, sans-serif" font-size="30" fill="${input.brand.mutedText}">${escapeXml(line2)}</text>
          <text x="${x + 34}" y="${y + cardHeight * 0.84}" font-family="Arial, Helvetica, sans-serif" font-size="52" font-weight="900" fill="${input.brand.accent}">${escapeXml(price)}</text>
          <text x="${x + 34}" y="${y + cardHeight * 0.91}" font-family="Arial, Helvetica, sans-serif" font-size="26" fill="${input.brand.mutedText}">${escapeXml(product.unitLabel)}</text>
        </g>`;
    })
    .join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <rect width="100%" height="100%" fill="${input.brand.background}"/>
    <rect x="0" y="0" width="${width}" height="${headerHeight}" fill="${input.brand.accent}"/>
    <text x="${outer}" y="${format === "story" ? 132 : 100}" font-family="Arial, Helvetica, sans-serif" font-size="${format === "story" ? 72 : 64}" font-weight="900" fill="#ffffff">${escapeXml(input.title)}</text>
    <text x="${outer}" y="${format === "story" ? 210 : 164}" font-family="Arial, Helvetica, sans-serif" font-size="${format === "story" ? 38 : 32}" fill="#e8f3ed">${escapeXml(input.subtitle)}</text>
    ${cards}
    <rect x="0" y="${height - footerHeight}" width="${width}" height="${footerHeight}" fill="${input.brand.accent}"/>
    <text x="${outer}" y="${height - footerHeight / 2 + 6}" font-family="Arial, Helvetica, sans-serif" font-size="34" font-weight="700" fill="#ffffff">${escapeXml(input.brand.brandName)} · ${escapeXml(input.brand.marketLabel)}</text>
    <text x="${width - outer}" y="${height - footerHeight / 2 + 6}" text-anchor="end" font-family="Arial, Helvetica, sans-serif" font-size="29" fill="#e8f3ed">${escapeXml(input.brand.whatsappLabel)}</text>
  </svg>`;
}

export function svgToDataUri(svg: string): string {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
