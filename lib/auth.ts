export type MarketingRole = "owner" | "editor" | "viewer";

export interface MarketingActor {
  id: string;
  displayName: string;
  role: MarketingRole;
}

export function getMockActor(): MarketingActor {
  return {
    id: "mock-owner",
    displayName: "Operação Dona Antônia",
    role: "owner",
  };
}

export function canApprove(role: MarketingRole): boolean {
  return role === "owner" || role === "editor";
}

export function canManageConnections(role: MarketingRole): boolean {
  return role === "owner";
}
