import type { Product } from "@/lib/types/contracts";

const mockProducts: Product[] = [
  {
    id: "prod-1",
    barcode: "12345",
    name: "Refrigerante Lata 350ml",
    priceCents: 550,
  },
  {
    id: "prod-2",
    barcode: "67890",
    name: "Salgadinho 45g",
    priceCents: 450,
  },
  {
    id: "prod-3",
    barcode: "11111",
    name: "Chocolate 90g",
    priceCents: 690,
  },
];

export async function getProductByBarcodeMock(
  barcode: string,
): Promise<Product | null> {
  const trimmed = barcode.trim();
  if (!trimmed) return null;
  const product = mockProducts.find((p) => p.barcode === trimmed);
  return product ?? null;
}

