import type {
  LoginAdminRequest,
  LoginAdminResponse,
} from "@/lib/types/contracts";

export async function fakeLoginAdmin(
  payload: LoginAdminRequest,
): Promise<LoginAdminResponse> {
  const { email, password } = payload;

  // Mock liberado para MVP: não bloquear acesso por credenciais
  // (a validação real será feita quando a API de auth estiver pronta)

  return {
    token: "mock-token-admin",
    user: {
      id: "admin-1",
      name: email || "Admin",
      role: "admin",
    },
  };
}

export type FakeCustomer = {
  document: string;
  identifier: string;
  name: string;
};

export async function fakeAuthCustomer(
  document: string,
  identifier: string,
): Promise<FakeCustomer> {
  if (!document.trim() || !identifier.trim()) {
    throw new Error("Informe documento e identificador do cliente.");
  }

  // Mock simples: qualquer combinação é aceita e gera um nome derivado
  const name = `Cliente ${identifier.substring(0, 3).toUpperCase()}`;

  return {
    document,
    identifier,
    name,
  };
}


