export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="pt-1">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Visão geral dos totens e lojas (dados mockados nesta fase).
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-medium text-slate-500">Lojas ativas</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">3</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-medium text-slate-500">Totens online</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">7</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-medium text-slate-500">Vendas do dia (mock)</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">R$ 12.450,00</p>
        </div>
      </div>
    </div>
  );
}

