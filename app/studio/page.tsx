import { CreativePreview } from "@/components/creative-preview";
import { SectionLayout } from "@/components/section-layout";
import { mockProducts } from "@/lib/mock-data";

export default function StudioPage() {
  return (
    <SectionLayout
      activeHref="/studio"
      eyebrow="Creative Studio"
      title="Studio"
      description="Composição determinística, fotos reais no futuro e IA apenas onde ela não pode alterar fatos comerciais."
    >
      <CreativePreview products={mockProducts} />
    </SectionLayout>
  );
}
