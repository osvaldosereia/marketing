import { CreativePreview } from "@/components/creative-preview";
import { SectionLayout } from "@/components/section-layout";
import { mockProducts } from "@/lib/mock-data";

export default function WhatsAppPage() {
  return (
    <SectionLayout
      activeHref="/whatsapp"
      eyebrow="Assets de conversa e Status"
      title="WhatsApp"
      description="A publicação de Status termina com ação humana. Envio em conversa será integrado pelo PapoAI quando o contrato estiver homologado."
    >
      <CreativePreview products={mockProducts} />
    </SectionLayout>
  );
}
