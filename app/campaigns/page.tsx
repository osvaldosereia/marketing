import { SectionLayout } from "@/components/section-layout";
import { mockCampaign } from "@/lib/mock-data";
import { formatCurrencyFromCents, formatStatus } from "@/lib/format";

export default function CampaignsPage() {
  return (
    <SectionLayout
      activeHref="/campaigns"
      eyebrow="Campanha-mãe"
      title="Campanhas"
      description="Uma campanha organiza objetivo, produtos e variações por canal sem duplicar a verdade comercial."
      action={<button className="primary-action">+ Nova campanha</button>}
    >
      <section className="panel">
        <div className="campaign-card">
          <div className="campaign-main">
            <span className="pill">{formatStatus(mockCampaign.status)}</span>
            <h2>{mockCampaign.name}</h2>
            <p>Objetivo: iniciar conversa e levar para o catálogo/WhatsApp.</p>
            <div className="tag-row">
              {mockCampaign.channels.map((channel) => (
                <span className="soft-tag" key={channel}>{channel}</span>
              ))}
            </div>
          </div>
          <div className="campaign-products">
            {mockCampaign.products.map((product) => (
              <div className="mini-product" key={product.id}>
                <div className="mini-product-thumb">{product.shortName.slice(0, 2).toUpperCase()}</div>
                <div>
                  <strong>{product.shortName}</strong>
                  <small>{formatCurrencyFromCents(product.priceCents)}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SectionLayout>
  );
}
