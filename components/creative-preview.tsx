import type { ProductSnapshot } from "@/lib/domain";
import { brand } from "@/lib/brand";
import {
  renderFourProductOfferSvg,
  svgToDataUri,
} from "@/lib/renderer/four-product";

export function CreativePreview({
  products,
}: {
  products: ProductSnapshot[];
}) {
  const svg = renderFourProductOfferSvg({
    title: "4 ofertas para sua despensa",
    subtitle: "Protótipo visual · preços demonstrativos",
    products,
    brand,
    format: "conversation",
  });

  return (
    <section className="panel creative-panel">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Studio · protótipo</span>
          <h2>Oferta com 4 produtos</h2>
        </div>
        <span className="pill">Renderer determinístico</span>
      </div>

      <div className="creative-stage">
        <img
          className="creative-image"
          src={svgToDataUri(svg)}
          alt="Prévia demonstrativa de uma peça com quatro produtos em grade 2 por 2"
        />
      </div>

      <div className="creative-notes">
        <span>✓ exatamente 4 produtos</span>
        <span>✓ preço formatado por código</span>
        <span>✓ sem IA alterando embalagem</span>
        <span>✓ pronto para receber fotos reais via Bridge</span>
      </div>
    </section>
  );
}
