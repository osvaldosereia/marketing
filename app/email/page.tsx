import { SectionLayout } from "@/components/section-layout";

export default function EmailPage() {
  return (
    <SectionLayout
      activeHref="/email"
      eyebrow="Brevo adapter"
      title="Email"
      description="Campanhas de email entram com consentimento, unsubscribe e domínio autenticado."
    >
      <section className="panel empty-state">
        <span className="eyebrow">Rodada futura</span>
        <h2>Editor responsivo + segmentos</h2>
        <p>O adapter está especificado, mas nenhum email pode ser enviado na Rodada 1.</p>
      </section>
    </SectionLayout>
  );
}
