import { CreativePreview } from "@/components/creative-preview";
import {
  mockAttention,
  mockOpportunities,
  mockProducts,
  mockSchedule,
} from "@/lib/mock-data";
import { formatChannel, formatStatus } from "@/lib/format";

export function Dashboard() {
  return (
    <div className="dashboard">
      <header className="page-header">
        <div>
          <span className="eyebrow">Sexta-feira · Cuiabá</span>
          <h1>Hoje</h1>
          <p>
            Fundação do Marketing OS em modo seguro. Nenhuma API social está
            conectada nesta etapa.
          </p>
        </div>
        <button className="primary-action" type="button">
          + Nova campanha
        </button>
      </header>

      <section className="metric-grid" aria-label="Resumo">
        <article className="metric-card">
          <span>Para aprovar</span>
          <strong>1</strong>
          <small>peça demonstrativa</small>
        </article>
        <article className="metric-card">
          <span>Oportunidades</span>
          <strong>{mockOpportunities.length}</strong>
          <small>em dados mock</small>
        </article>
        <article className="metric-card">
          <span>Publicações</span>
          <strong>0</strong>
          <small>produção bloqueada</small>
        </article>
        <article className="metric-card">
          <span>Conexões</span>
          <strong>0</strong>
          <small>correto para R1</small>
        </article>
      </section>

      <div className="two-column">
        <section className="panel">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Prioridade</span>
              <h2>Precisa de você</h2>
            </div>
          </div>
          <div className="stack-list">
            {mockAttention.map((item) => (
              <article className="list-card" key={item.id}>
                <div className={"severity severity-" + item.severity} />
                <div className="list-card-body">
                  <strong>{item.title}</strong>
                  <p>{item.detail}</p>
                </div>
                <button type="button" className="secondary-action">
                  {item.actionLabel}
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="panel">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Calendário</span>
              <h2>Próximos conteúdos</h2>
            </div>
          </div>
          <div className="stack-list">
            {mockSchedule.map((item) => (
              <article className="schedule-row" key={item.id}>
                <span className={"channel-badge channel-" + item.channel}>
                  {formatChannel(item.channel)}
                </span>
                <div className="schedule-copy">
                  <strong>{item.campaignName}</strong>
                  <small>{item.scheduledAt}</small>
                </div>
                <span className="status-label">{formatStatus(item.status)}</span>
              </article>
            ))}
          </div>
        </section>
      </div>

      <div className="two-column lower-grid">
        <section className="panel">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Motor de oportunidade</span>
              <h2>O que vale criar</h2>
            </div>
          </div>
          <div className="opportunity-list">
            {mockOpportunities.map((opportunity) => (
              <article className="opportunity-card" key={opportunity.id}>
                <div className="score">{opportunity.score}</div>
                <div>
                  <strong>{opportunity.title}</strong>
                  <p>{opportunity.reason}</p>
                  <small>
                    {formatChannel(opportunity.suggestedChannel)} ·{" "}
                    {opportunity.suggestedFormat}
                  </small>
                </div>
              </article>
            ))}
          </div>
        </section>

        <CreativePreview products={mockProducts} />
      </div>
    </div>
  );
}
