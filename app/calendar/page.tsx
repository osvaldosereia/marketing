import { SectionLayout } from "@/components/section-layout";
import { mockSchedule } from "@/lib/mock-data";
import { formatChannel, formatStatus } from "@/lib/format";

const windows = ["09:30–10:30", "11:30–13:30", "17:30–19:00"];

export default function CalendarPage() {
  return (
    <SectionLayout
      activeHref="/calendar"
      eyebrow="America/Cuiaba"
      title="Calendário"
      description="As janelas iniciais são hipóteses de teste. O sistema aprenderá os melhores horários com dados próprios."
    >
      <div className="calendar-grid">
        {windows.map((window, index) => (
          <section className="panel calendar-slot" key={window}>
            <span className="eyebrow">Janela {String.fromCharCode(65 + index)}</span>
            <h2>{window}</h2>
            {mockSchedule[index] ? (
              <div className="calendar-content">
                <strong>{mockSchedule[index].campaignName}</strong>
                <span>{formatChannel(mockSchedule[index].channel)}</span>
                <small>{formatStatus(mockSchedule[index].status)}</small>
              </div>
            ) : (
              <p className="empty-copy">Sem conteúdo agendado.</p>
            )}
          </section>
        ))}
      </div>
    </SectionLayout>
  );
}
