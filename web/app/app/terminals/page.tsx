"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Store, Terminal } from "@/lib/types/contracts";
import { getStoresMock, getTerminalsMock } from "@/lib/services/stores";

export default function AdminTerminalsPage() {
  const [stores, setStores] = useState<Store[]>([]);
  const [selectedStoreId, setSelectedStoreId] = useState<string | "all">("all");
  const [terminals, setTerminals] = useState<Terminal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    Promise.all([getStoresMock(), getTerminalsMock()])
      .then(([storesData, terminalsData]) => {
        if (!active) return;
        setStores(storesData);
        setTerminals(terminalsData);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const visibleTerminals =
    selectedStoreId === "all"
      ? terminals
      : terminals.filter((t) => t.storeId === selectedStoreId);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Totens
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Lista de totens por loja (dados mockados para o MVP).
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <label className="text-sm text-slate-600">
          Loja:
          <select
            className="ml-2 rounded-md border border-slate-300 bg-white px-2 py-1 text-sm text-slate-900"
            value={selectedStoreId}
            onChange={(e) =>
              setSelectedStoreId(e.target.value as string | "all")
            }
          >
            <option value="all">Todas</option>
            {stores.map((store) => (
              <option key={store.id} value={store.id}>
                {store.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-2 text-left font-medium text-slate-500">
                ID do Totem
              </th>
              <th className="px-4 py-2 text-left font-medium text-slate-500">
                Loja
              </th>
              <th className="px-4 py-2 text-left font-medium text-slate-500">
                Status
              </th>
              <th className="px-4 py-2 text-left font-medium text-slate-500">
                Última utilização
              </th>
              <th className="px-4 py-2 text-left font-medium text-slate-500">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-4 py-4 text-center text-slate-500">
                  Carregando totens...
                </td>
              </tr>
            ) : visibleTerminals.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-4 text-center text-slate-500">
                  Nenhum totem encontrado para o filtro atual.
                </td>
              </tr>
            ) : (
              visibleTerminals.map((terminal) => {
                const store = stores.find((s) => s.id === terminal.storeId);
                return (
                  <tr key={terminal.id}>
                    <td className="px-4 py-3 text-slate-900">
                      {terminal.id}
                    </td>
                    <td className="px-4 py-3 text-slate-900">
                      {store?.name ?? "—"}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                          terminal.status === "ONLINE"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-slate-50 text-slate-500"
                        }`}
                      >
                        {terminal.status === "ONLINE" ? "Online" : "Offline"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {terminal.lastUsedAt
                        ? new Date(terminal.lastUsedAt).toLocaleString("pt-BR")
                        : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href="/totem"
                        target="_blank"
                        className="inline-flex items-center justify-center rounded-md bg-linear-to-r from-[#1d4ed8] to-[#1e3a8a] px-3 py-1.5 text-xs font-semibold text-white shadow-sm shadow-[#1d4ed8]/30 transition hover:from-[#1e3a8a] hover:to-[#0b2559]"
                      >
                        Abrir totem
                      </Link>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

