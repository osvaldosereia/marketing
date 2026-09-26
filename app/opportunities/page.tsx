import { SectionLayout } from "@/components/section-layout";
import { mockOpportunities } from "@/lib/mock-data";
import { formatChannel } from "@/lib/format";

export default function OpportunitiesPage() {
  return (
    <SectionLayout
      activeHref="/opportunities"
      eyebrow="Motor de oportunidade"
      title="Oportunidades"
      description="Sugestões explicáveis. Na Rodada 1 elas usam dados mock; depois virão do Bridge do Core."
    >
      <section className="panel">
        <div className="opportunity-list">
          {mockOpportunities.map((item) => (
            <article className="opportunity-card" key={item.id}>
              <div className="score">{item.score}</div>
              <div>
                <strong>{item.title}</strong>
                <p>{item.reason}</p>
                <small>
                  {formatChannel(item.suggestedChannel)} · {item.suggestedFormat}
                </small>
              </div>
            </article>
          ))}
        </div>
      </section>
    </SectionLayout>
  );
}
