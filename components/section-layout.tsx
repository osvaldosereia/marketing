import type { ReactNode } from "react";
import { AppShell } from "@/components/app-shell";

export function SectionLayout({
  activeHref,
  eyebrow,
  title,
  description,
  action,
  children,
}: {
  activeHref: string;
  eyebrow: string;
  title: string;
  description: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <AppShell activeHref={activeHref}>
      <div className="dashboard">
        <header className="page-header">
          <div>
            <span className="eyebrow">{eyebrow}</span>
            <h1>{title}</h1>
            <p>{description}</p>
          </div>
          {action}
        </header>
        {children}
      </div>
    </AppShell>
  );
}
