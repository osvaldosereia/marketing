import Link from "next/link";
import type { ReactNode } from "react";

const navigation = [
  { label: "Hoje", href: "/" },
  { label: "Oportunidades", href: "/opportunities" },
  { label: "Campanhas", href: "/campaigns" },
  { label: "Studio", href: "/studio" },
  { label: "Calendário", href: "/calendar" },
  { label: "Conversas", href: "/conversations" },
  { label: "WhatsApp", href: "/whatsapp" },
  { label: "Email", href: "/email" },
  { label: "Desempenho", href: "/performance" },
  { label: "Conexões", href: "/connections" },
];

export function AppShell({
  children,
  activeHref = "/",
}: {
  children: ReactNode;
  activeHref?: string;
}) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Link className="brand-lockup" href="/">
          <div className="brand-mark">DA</div>
          <div>
            <strong>Dona Antônia</strong>
            <span>Marketing OS</span>
          </div>
        </Link>

        <nav className="nav-list" aria-label="Navegação principal">
          {navigation.map((item) => (
            <Link
              className={
                item.href === activeHref ? "nav-item nav-item-active" : "nav-item"
              }
              href={item.href}
              key={item.href}
            >
              <span className="nav-dot" aria-hidden="true" />
              {item.label}
            </Link>
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
