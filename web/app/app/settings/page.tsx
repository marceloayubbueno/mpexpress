"use client";

import { useState } from "react";

export default function AdminSettingsPage() {
  const [maxInstallments, setMaxInstallments] = useState(6);
  const [minInstallmentValue, setMinInstallmentValue] = useState(50);
  const [enableCredit, setEnableCredit] = useState(true);
  const [campaignPeriod, setCampaignPeriod] = useState("");

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Configurações
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Regras comerciais mockadas para demonstração (valores mantidos apenas em
          memória neste MVP).
        </p>
      </div>

      <div className="max-w-xl rounded-xl border border-slate-200 bg-white p-4">
        <div className="space-y-4 text-sm">
          <div className="flex flex-col gap-1">
            <label className="font-medium text-slate-700">
              Parcelas máximas
            </label>
            <input
              type="number"
              min={1}
              max={24}
              value={maxInstallments}
              onChange={(e) =>
                setMaxInstallments(Number(e.target.value) || 1)
              }
              className="w-32 rounded-md border border-slate-300 px-2 py-1 text-sm text-slate-900"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-medium text-slate-700">
              Parcela mínima (R$)
            </label>
            <input
              type="number"
              min={10}
              step={10}
              value={minInstallmentValue}
              onChange={(e) =>
                setMinInstallmentValue(Number(e.target.value) || 10)
              }
              className="w-40 rounded-md border border-slate-300 px-2 py-1 text-sm text-slate-900"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              id="enableCredit"
              type="checkbox"
              checked={enableCredit}
              onChange={(e) => setEnableCredit(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-sky-600"
            />
            <label
              htmlFor="enableCredit"
              className="text-sm font-medium text-slate-700"
            >
              Habilitar crediário
            </label>
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-medium text-slate-700">
              Período de campanhas
            </label>
            <input
              type="text"
              placeholder="Ex.: Março/2026"
              value={campaignPeriod}
              onChange={(e) => setCampaignPeriod(e.target.value)}
              className="rounded-md border border-slate-300 px-2 py-1 text-sm text-slate-900"
            />
          </div>

          <p className="pt-2 text-xs text-slate-500">
            Estas configurações são apenas ilustrativas nesta fase e não são
            persistidas em servidor.
          </p>
        </div>
      </div>
    </div>
  );
}

