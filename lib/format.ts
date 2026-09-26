export function formatCurrencyFromCents(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value / 100);
}

export function formatChannel(channel: string): string {
  const names: Record<string, string> = {
    instagram: "Instagram",
    facebook: "Facebook",
    whatsapp: "WhatsApp",
    email: "Email",
  };
  return names[channel] ?? channel;
}

export function formatStatus(status: string): string {
  const names: Record<string, string> = {
    draft: "Rascunho",
    generated: "Gerado",
    awaiting_approval: "Aguardando aprovação",
    approved: "Aprovado",
    scheduled: "Agendado",
    published: "Publicado",
    shared_manually: "Compartilhado",
    stale: "Desatualizado",
    failed: "Falhou",
  };
  return names[status] ?? status;
}
