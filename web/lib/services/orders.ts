import type {
  OrderItem,
  SubmitOrderRequest,
  SubmitOrderResponse,
} from "@/lib/types/contracts";

export async function fakeSubmitOrder(
  payload: SubmitOrderRequest,
): Promise<SubmitOrderResponse> {
  if (!payload.items.length) {
    throw new Error("Carrinho vazio.");
  }

  // Mock simples: gera um número de pedido baseado em timestamp
  const orderNumber = `MP-${Date.now().toString().slice(-6)}`;

  return { orderNumber };
}

export function calculateOrderTotal(items: OrderItem[]): number {
  return items.reduce(
    (acc, item) => acc + item.unitPriceCents * item.quantity,
    0,
  );
}

