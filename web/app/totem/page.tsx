"use client";

import { useMemo, useState } from "react";
import {
  TOG_MOCK_CATEGORIES,
  TOG_MOCK_PRODUCTS,
  TotemProduct,
} from "@/lib/services/totem-products";

type CartItem = TotemProduct & { quantity: number };

const PAYMENT_TYPES = [
  "Crédito",
  "Débito",
  "Pix",
  "Dinheiro",
  "Limite de crédito",
] as const;
type PaymentType = (typeof PAYMENT_TYPES)[number];

export default function TotemPage() {
  const [step, setStep] = useState<"identificacao" | "pedido">("identificacao");
  const [customerName, setCustomerName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("refrigeracao");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [paymentType, setPaymentType] = useState<PaymentType | null>(null);
  const [creditLimit, setCreditLimit] = useState<number | null>(null);
  const [creditUsed, setCreditUsed] = useState<number | null>(null);

  const filteredProducts = useMemo(
    () => TOG_MOCK_PRODUCTS.filter((p) => p.category === selectedCategory),
    [selectedCategory],
  );

  const totalAmount = useMemo(
    () => cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [cart],
  );

  const creditAvailable = useMemo(
    () =>
      creditLimit != null && creditUsed != null ? creditLimit - creditUsed : null,
    [creditLimit, creditUsed],
  );

  const creditUsagePercent = useMemo(() => {
    if (creditLimit == null || creditUsed == null || creditLimit === 0) {
      return null;
    }
    return Math.min(100, Math.max(0, (creditUsed / creditLimit) * 100));
  }, [creditLimit, creditUsed]);

  const handleStartOrder = () => {
    if (!customerName) {
      alert("Informe o número de identificação do cliente para continuar.");
      return;
    }

    // Mock de limite de crédito para o MVP
    setCreditLimit(1500);
    setCreditUsed(350);
    setStep("pedido");
  };

  const handleAddToCart = (product: TotemProduct) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...current, { ...product, quantity: 1 }];
    });
  };

  const handleChangeQuantity = (productId: string, delta: number) => {
    setCart((current) =>
      current
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: Math.max(1, item.quantity + delta) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const handleFinish = () => {
    const payingWithLimit = paymentType === "Limite de crédito";
    if (
      payingWithLimit &&
      (creditAvailable == null || totalAmount > creditAvailable)
    ) {
      alert(
        "O valor do pedido excede o limite de crédito disponível para este cliente.",
      );
      return;
    }
    // No MVP apenas simulamos a finalização
    alert(
      `Pedido finalizado!\nCliente: ${customerName || "Não informado"}\nItens: ${
        cart.length
      }\nTotal: R$ ${totalAmount.toFixed(2)}\nPagamento: ${
        paymentType ?? "Não selecionado"
      }`,
    );
    setCart([]);
    setPaymentType(null);
    setCreditLimit(null);
    setCreditUsed(null);
    setStep("identificacao");
    setCustomerName("");
  };

  if (step === "identificacao") {
    return (
      <main className="flex min-h-dvh flex-col items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-3xl rounded-3xl bg-white p-10 shadow-2xl shadow-slate-300 border border-slate-200">
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-r from-[#1d4ed8] to-[#1e3a8a] shadow-md shadow-[#1d4ed8]/40">
              <span className="text-lg font-bold text-white">MP</span>
            </div>
            <span className="text-2xl font-bold tracking-tight text-slate-900">
              MP Express
            </span>
          </div>
          <h1 className="text-center text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-2">
            Bem-vindo ao Totem
          </h1>
          <p className="mb-10 text-center text-lg md:text-2xl text-slate-600">
            Identifique-se para começar seu pedido.
          </p>
          <label className="mb-6 block">
            <span className="mb-3 block text-xl text-slate-800">
              Número de identificação do cliente
            </span>
            <input
              className="w-full rounded-2xl border border-slate-300 bg-white px-5 py-4 text-2xl text-slate-900 placeholder:text-slate-400 focus:border-[#1d4ed8] focus:outline-none focus:ring-2 focus:ring-[#1d4ed8]/20"
              placeholder="Digite ou use o teclado abaixo..."
              inputMode="numeric"
              pattern="[0-9]*"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value.replace(/\D/g, ""))}
            />
          </label>

          <div className="mb-6 grid grid-cols-3 gap-3">
            {["1", "2", "3", "4", "5", "6", "7", "8", "9", "⌫", "0", "Limpar"].map(
              (key) => (
                <button
                  key={key}
                  type="button"
                  className="h-16 rounded-2xl bg-slate-100 text-2xl font-semibold text-slate-900 shadow-sm hover:bg-slate-200 active:bg-slate-300 transition"
                  onClick={() => {
                    if (key === "Limpar") {
                      setCustomerName("");
                    } else if (key === "⌫") {
                      setCustomerName((prev) => prev.slice(0, -1));
                    } else {
                      setCustomerName((prev) => `${prev}${key}`.slice(0, 12));
                    }
                  }}
                >
                  {key}
                </button>
              ),
            )}
          </div>
          <button
            type="button"
            className="mt-4 w-full rounded-2xl bg-linear-to-r from-[#1d4ed8] to-[#1e3a8a] px-8 py-5 text-2xl font-bold uppercase tracking-wide text-white shadow-lg shadow-[#1d4ed8]/40 transition hover:from-[#1e3a8a] hover:to-[#0b2559]"
            onClick={handleStartOrder}
          >
            Iniciar pedido
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-dvh bg-slate-50 text-slate-900">
      {/* Coluna principal: produtos */}
      <section className="flex-1 px-6 py-6 xl:px-10 xl:py-8">
        <header className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-lg text-slate-600">
              Olá,
              <span className="font-semibold text-[#1d4ed8]">
                {" "}
                {customerName || "Cliente"}
              </span>
            </p>
            <h1 className="text-3xl xl:text-4xl font-extrabold tracking-tight">
              Escolha seus produtos
            </h1>
          </div>
          <button
            type="button"
            className="rounded-2xl border border-slate-300 px-5 py-3 text-lg font-semibold text-slate-700 hover:border-slate-400 hover:bg-slate-100"
            onClick={() => setStep("identificacao")}
          >
            Trocar identificação
          </button>
        </header>

        {/* Categorias */}
        <div className="mb-6 flex gap-3 overflow-x-auto pb-1">
          {TOG_MOCK_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`whitespace-nowrap rounded-2xl px-5 py-3 text-xl font-semibold transition ${
                selectedCategory === cat.slug
                  ? "bg-linear-to-r from-[#1d4ed8] to-[#1e3a8a] text-white shadow-lg shadow-[#1d4ed8]/40"
                  : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
              }`}
              onClick={() => setSelectedCategory(cat.slug)}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Grid de produtos 3 colunas */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-3">
          {filteredProducts.map((product) => (
            <button
              key={product.id}
              type="button"
              onClick={() => handleAddToCart(product)}
              className="flex h-full flex-col justify-between rounded-3xl border border-slate-200 bg-white p-5 text-left shadow-md shadow-slate-200 transition hover:border-emerald-400 hover:shadow-emerald-200"
            >
              <div>
                <h2 className="mb-2 text-2xl font-bold">{product.name}</h2>
                <p className="mb-4 text-lg text-slate-600">
                  {product.description}
                </p>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-2xl font-extrabold text-[#1d4ed8]">
                  R$ {product.price.toFixed(2)}
                </span>
                <span className="rounded-full bg-linear-to-r from-[#1d4ed8] to-[#1e3a8a] px-4 py-2 text-lg font-semibold text-white shadow-sm shadow-[#1d4ed8]/40">
                  Adicionar
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Coluna lateral: resumo + pagamento */}
      <aside className="w-full max-w-md border-l border-slate-200 bg-white px-6 py-6 xl:px-8 xl:py-8 shadow-lg shadow-slate-200">
        <h2 className="mb-4 text-2xl font-bold">Seu pedido</h2>

        <div className="mb-6 rounded-2xl bg-slate-50 px-4 py-4 border border-slate-200">
          <p className="text-base text-slate-600">Total a pagar</p>
          <p className="text-3xl font-extrabold text-[#1d4ed8]">
            R$ {totalAmount.toFixed(2)}
          </p>
        </div>

        {creditLimit != null &&
          creditUsed != null &&
          creditAvailable != null &&
          creditUsagePercent != null && (
            <div className="mb-6 space-y-2">
              <div className="flex items-baseline justify-between text-xs uppercase tracking-wide text-slate-500">
                <span>Limite de crédito</span>
                <span>
                  Usado{" "}
                  <span className="font-semibold text-amber-600">
                    R$ {creditUsed.toFixed(2)}
                  </span>{" "}
                  de{" "}
                  <span className="font-semibold text-slate-800">
                    R$ {creditLimit.toFixed(2)}
                  </span>
                </span>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200">
                <div
                  className={`h-full rounded-full transition-all ${
                    creditUsagePercent > 80
                      ? "bg-red-500"
                      : creditUsagePercent > 60
                        ? "bg-amber-500"
                        : "bg-emerald-500"
                  }`}
                  style={{ width: `${creditUsagePercent}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">
                  Disponível{" "}
                  <span className="font-semibold text-emerald-600">
                    R$ {creditAvailable.toFixed(2)}
                  </span>
                </span>
                <span className="text-slate-500">
                  {creditUsagePercent.toFixed(0)}% do limite utilizado
                </span>
              </div>
            </div>
          )}

        <div className="mb-4">
          <p className="mb-3 text-lg font-semibold text-slate-800">Forma de pagamento</p>
          <div className="grid grid-cols-2 gap-3">
            {PAYMENT_TYPES.map((type) => (
              <button
                key={type}
                type="button"
                className={`rounded-2xl px-4 py-3 text-lg font-semibold transition ${
                  paymentType === type
                    ? "bg-linear-to-r from-[#1d4ed8] to-[#1e3a8a] text-white shadow-lg shadow-[#1d4ed8]/40"
                    : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
                }`}
                onClick={() => setPaymentType(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          disabled={cart.length === 0 || !paymentType}
          onClick={handleFinish}
          className="mt-2 w-full rounded-2xl bg-linear-to-r from-[#1d4ed8] to-[#1e3a8a] px-6 py-4 text-2xl font-bold uppercase tracking-wide text-white shadow-lg shadow-[#1d4ed8]/40 transition hover:from-[#1e3a8a] hover:to-[#0b2559] disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none disabled:shadow-none"
        >
          Finalizar pedido
        </button>

        <div className="mt-5 max-h-[40vh] space-y-3 overflow-y-auto pr-1">
          {cart.length === 0 && (
            <p className="text-lg text-slate-500">
              Nenhum item selecionado. Toque em um produto para adicioná-lo.
            </p>
          )}
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 border border-slate-200"
            >
              <div>
                <p className="text-lg font-semibold">{item.name}</p>
                <p className="text-sm text-slate-500">
                  R$ {item.price.toFixed(2)} cada
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-xl text-slate-800"
                  onClick={() => handleChangeQuantity(item.id, -1)}
                >
                  −
                </button>
                <span className="min-w-[2ch] text-center text-lg font-semibold">
                  {item.quantity}
                </span>
                <button
                  type="button"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-r from-[#1d4ed8] to-[#1e3a8a] text-xl text-white shadow-sm shadow-[#1d4ed8]/40"
                  onClick={() => handleChangeQuantity(item.id, 1)}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-3 text-center text-xs text-slate-500">
          * Fluxo mockado para demonstração. Integração real de pagamento será
          plugada na fase 4.
        </p>
      </aside>
    </main>
  );
}

