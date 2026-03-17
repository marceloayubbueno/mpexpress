import type { Store, Terminal } from "@/lib/types/contracts";

const mockStores: Store[] = [
  {
    id: "store-1",
    code: "MP-001",
    name: "Loja Central",
    status: "ACTIVE",
  },
  {
    id: "store-2",
    code: "MP-002",
    name: "Loja Shopping",
    status: "ACTIVE",
  },
  {
    id: "store-3",
    code: "MP-003",
    name: "Loja Bairro",
    status: "INACTIVE",
  },
];

const mockTerminals: Terminal[] = [
  {
    id: "terminal-1",
    storeId: "store-1",
    status: "ONLINE",
    lastUsedAt: "2026-03-17T09:30:00Z",
  },
  {
    id: "terminal-2",
    storeId: "store-1",
    status: "OFFLINE",
    lastUsedAt: "2026-03-16T18:15:00Z",
  },
  {
    id: "terminal-3",
    storeId: "store-2",
    status: "ONLINE",
    lastUsedAt: "2026-03-17T10:05:00Z",
  },
];

export async function getStoresMock(): Promise<Store[]> {
  return mockStores;
}

export async function getTerminalsMock(storeId?: string): Promise<Terminal[]> {
  if (!storeId) return mockTerminals;
  return mockTerminals.filter((terminal) => terminal.storeId === storeId);
}

