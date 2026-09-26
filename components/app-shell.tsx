import type { ReactNode } from "react";

const navigation = [
  "Hoje",
  "Oportunidades",
  "Campanhas",
  "Studio",
  "Calendário",
  "Conversas",
  "WhatsApp",
  "Email",
  "Desempenho",
  "Conexões",
];

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-lockup">
          <div className="brand-mark">DA</div>
          <div>
            <strong>Dona Antônia</strong>
            <span>Marketing OS</span>
          </div>
        </div>

        <nav className="nav-list" aria-label="Navegação principal">
          {navigation.map((item, index) => (
            <button
              className={index === 0 ? "nav-item nav-item-active" : "nav-item"}
              key={item}
              type="button"
            >
              <span className="nav-dot" aria-hidden="true" />
              {item}
            </button>
          ))}
        </nav>

        <div className="sidebar-foot">
          <span className="health-dot" aria-hidden="true" />
          Modo mock · sem APIs externas
        </div>
      </aside>

      <main className="main-content">{children}</main>
    </div>
  );
}
