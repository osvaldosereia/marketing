import { SectionLayout } from "@/components/section-layout";

export default function PerformancePage() {
  return (
    <SectionLayout
      activeHref="/performance"
      eyebrow="Métricas de negócio"
      title="Desempenho"
      description="Pedidos e conversas terão prioridade sobre curtidas quando as integrações estiverem ativas."
    >
      <section className="metric-grid">
        {["Pedidos atribuídos", "Conversas", "Cliques", "Compartilhamentos"].map((label) => (
          <article className="metric-card" key={label}>
            <span>{label}</span>
            <strong>—</strong>
            <small>aguardando produção</small>
          </article>
        ))}
      </section>
    </SectionLayout>
  );
}
