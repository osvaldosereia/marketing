import { SectionLayout } from "@/components/section-layout";

const providers = [
  ["Meta / Instagram", "Não conectado", "OAuth novo será usado; credencial antiga não será reaproveitada."],
  ["Meta / Facebook", "Não conectado", "Page/Business serão homologados na POC read-only."],
  ["PapoAI", "Não conectado", "Adapter aguardará contrato oficial de integração."],
  ["Brevo", "Não conectado", "Email entra depois da autenticação de domínio."],
  ["Core Bridge", "Mock", "Somente leitura; sem acesso ao banco operacional nesta rodada."],
];

export default function ConnectionsPage() {
  return (
    <SectionLayout
      activeHref="/connections"
      eyebrow="Saúde de integrações"
      title="Conexões"
      description="Tokens nunca aparecem na interface. Capabilities só são habilitadas depois de POC."
    >
      <section className="provider-grid">
        {providers.map(([name, status, detail]) => (
          <article className="panel provider-card" key={name}>
            <div className="provider-status">
              <span className={status === "Mock" ? "health-dot" : "offline-dot"} />
              {status}
            </div>
            <h2>{name}</h2>
            <p>{detail}</p>
          </article>
        ))}
      </section>
    </SectionLayout>
  );
}
