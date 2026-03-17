"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Eye,
  EyeOff,
  Shield,
  Zap,
  Clock,
  Bell,
  ShoppingBag,
} from "lucide-react";
import { fakeLoginAdmin } from "@/lib/services/auth";
import type { LoginAdminRequest } from "@/lib/types/contracts";
import { setAdminUserToStorage } from "@/lib/auth/admin-session";

const loginSchema = z.object({
  email: z.string().email("Informe um e-mail válido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values: LoginFormValues) {
    setSubmitError(null);

    const payload: LoginAdminRequest = {
      email: values.email,
      password: values.password,
    };

    try {
      const result = await fakeLoginAdmin(payload);
      setAdminUserToStorage(result.user);
      router.push("/app/dashboard");
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Não foi possível fazer login.",
      );
    }
  }

  return (
    <div className="flex min-h-dvh bg-linear-to-br from-[#f5f7ff] via-white to-slate-50">
      <div className="relative hidden overflow-hidden bg-linear-to-br from-[#1d4ed8] via-[#1e3a8a] to-[#0b2559] lg:flex lg:w-1/2">
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-transparent" />

        <div className="absolute left-20 top-20 h-32 w-32 rounded-full bg-white/10 blur-xl" />
        <div className="absolute bottom-40 right-20 h-24 w-24 rounded-full bg-white/10 blur-lg" />
        <div className="absolute left-10 top-1/2 h-16 w-16 rounded-full bg-white/10 blur-md" />

        <div className="relative z-10 flex flex-col justify-center px-12 py-20 text-white">
          <div className="mb-10">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                <ShoppingBag className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-4xl font-bold tracking-tight">MP Express</h1>
            </div>
            <h2 className="mb-4 text-2xl text-blue-200">
              Admin do Self Checkout
            </h2>
            <p className="text-lg text-blue-100">
              Gestão de lojas e totens com base pronta para evoluir com APIs reais.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 rounded-lg bg-white/10 p-4 backdrop-blur-sm">
              <Shield className="h-6 w-6 text-blue-200" />
              <span>Fluxo seguro</span>
            </div>
            <div className="flex items-center gap-3 rounded-lg bg-white/10 p-4 backdrop-blur-sm">
              <Zap className="h-6 w-6 text-blue-200" />
              <span>Rápido e simples</span>
            </div>
            <div className="flex items-center gap-3 rounded-lg bg-white/10 p-4 backdrop-blur-sm">
              <Clock className="h-6 w-6 text-blue-200" />
              <span>Operação contínua</span>
            </div>
            <div className="flex items-center gap-3 rounded-lg bg-white/10 p-4 backdrop-blur-sm">
              <Bell className="h-6 w-6 text-blue-200" />
              <span>Estados claros</span>
            </div>
          </div>

          <p className="mt-10 text-sm text-white/70">
            MVP de demonstração — dados e autenticação são mockados.
          </p>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="rounded-2xl border-0 bg-white/90 p-8 shadow-2xl backdrop-blur-sm">
            <div className="mb-6">
              <div className="mb-2 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1d4ed8]">
                  <ShoppingBag className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">MP Express</h1>
              </div>
              <p className="text-sm text-gray-600">Acesse a área administrativa</p>
            </div>

            <div className="mb-6">
              <h2 className="mb-1 text-lg font-semibold text-gray-900">
                Bem-vindo de volta
              </h2>
              <p className="text-sm text-gray-600">
                Use o e-mail{" "}
                <code className="font-mono text-xs align-baseline">
                  admin@mpx.local
                </code>{" "}
                e a senha <code className="font-mono text-xs">admin123</code> (mock)
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              {submitError && (
                <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {submitError}
                </div>
              )}

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="admin@mpx.local"
                  className="flex h-11 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1d4ed8] focus-visible:ring-offset-2 focus:border-[#1d4ed8] disabled:cursor-not-allowed disabled:opacity-50"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-xs text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Senha
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    className="flex h-11 w-full rounded-md border border-gray-200 bg-white px-3 py-2 pr-10 text-sm text-gray-900 placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1d4ed8] focus-visible:ring-offset-2 focus:border-[#1d4ed8] disabled:cursor-not-allowed disabled:opacity-50"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-600"
                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-linear-to-r from-[#1d4ed8] to-[#1e3a8a] text-sm font-medium text-white shadow-lg transition-all duration-200 hover:from-[#1e3a8a] hover:to-[#0b2559] hover:shadow-xl disabled:pointer-events-none disabled:opacity-60"
              >
                {isSubmitting ? "Entrando..." : "Entrar"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

