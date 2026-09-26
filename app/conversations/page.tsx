import { SectionLayout } from "@/components/section-layout";

export default function ConversationsPage() {
  return (
    <SectionLayout
      activeHref="/conversations"
      eyebrow="Comentários e Direct"
      title="Conversas"
      description="Primeiro será inbox shadow + rascunho de IA. Auto-resposta só entra após policy e POC."
    >
      <section className="panel empty-state">
        <span className="eyebrow">Sem conexão Meta</span>
        <h2>Nenhum comentário foi importado</h2>
        <p>Isso é esperado e seguro na fundação inicial.</p>
      </section>
    </SectionLayout>
  );
}
