"use client";

import { useEffect, useState } from "react";
import type { Store } from "@/lib/types/contracts";
import { getStoresMock } from "@/lib/services/stores";

export default function AdminStoresPage() {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    getStoresMock()
      .then((data) => {
        if (active) setStores(data);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Lojas
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Visão geral das lojas cadastradas (dados mockados para o MVP).
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-2 text-left font-medium text-slate-500">
                Código
              </th>
              <th className="px-4 py-2 text-left font-medium text-slate-500">
                Nome
              </th>
              <th className="px-4 py-2 text-left font-medium text-slate-500">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {loading ? (
              <tr>
                <td
                  colSpan={3}
                  className="px-4 py-4 text-center text-slate-500"
                >
                  Carregando lojas...
                </td>
              </tr>
            ) : stores.length === 0 ? (
              <tr>
                <td
                  colSpan={3}
                  className="px-4 py-4 text-center text-slate-500"
                >
                  Nenhuma loja cadastrada no momento.
                </td>
              </tr>
            ) : (
              stores.map((store) => (
                <tr key={store.id}>
                  <td className="px-4 py-3 text-slate-900">{store.code}</td>
                  <td className="px-4 py-3 text-slate-900">{store.name}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                        store.status === "ACTIVE"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-slate-50 text-slate-500"
                      }`}
                    >
                      {store.status === "ACTIVE" ? "Ativa" : "Inativa"}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

