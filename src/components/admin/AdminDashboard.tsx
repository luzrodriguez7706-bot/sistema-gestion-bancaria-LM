"use client";

import { useState, useTransition } from "react";
import { ConfiguracionTasas } from "@/types/simulation";
import { ProductoFinanciero } from "@/types/product";
import { MensajeContacto } from "@/types/contact";
import { updateCreditRate, updateCdtTermRate, markMessageRead } from "@/actions/adminActions";
import { formatCurrency, formatPercent } from "@/lib/formatters";
import {
  Settings,
  Percent,
  TrendingUp,
  Inbox,
  CheckCircle2,
  AlertCircle,
  Save,
  Clock,
  Layers,
  Phone,
  Mail,
  User,
  Calendar,
  Loader2,
} from "lucide-react";

interface AdminDashboardProps {
  ratesConfig: ConfiguracionTasas;
  products: ProductoFinanciero[];
  messages: MensajeContacto[];
}

export function AdminDashboard({ ratesConfig, products, messages }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<"credito" | "cdt" | "mensajes">("credito");
  const [isPending, startTransition] = useTransition();

  // Estado para tasas de crédito
  const [creditRates, setCreditRates] = useState(ratesConfig.creditos);
  // Estado para tasas de CDT
  const [cdtPlazos, setCdtPlazos] = useState(ratesConfig.cdt.plazos);

  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleSaveCreditRate = (creditoId: string) => {
    const cred = creditRates[creditoId];
    if (!cred) return;

    setNotification(null);
    startTransition(async () => {
      const res = await updateCreditRate(
        creditoId,
        cred.tasaEA,
        cred.montoMinimo,
        cred.montoMaximo,
        cred.plazoMinimoMeses,
        cred.plazoMaximoMeses
      );
      if (res.success) {
        setNotification({ type: "success", message: res.message });
      } else {
        setNotification({ type: "error", message: res.message });
      }
    });
  };

  const handleSaveCdtRate = (meses: number, tasaEA: number) => {
    setNotification(null);
    startTransition(async () => {
      const res = await updateCdtTermRate(meses, tasaEA);
      if (res.success) {
        setNotification({ type: "success", message: res.message });
      } else {
        setNotification({ type: "error", message: res.message });
      }
    });
  };

  const handleMarkAsRead = (messageId: string) => {
    startTransition(async () => {
      await markMessageRead(messageId);
    });
  };

  return (
    <div className="space-y-8">
      
      {/* Alertas de notificación */}
      {notification && (
        <div
          className={`p-4 rounded-2xl flex items-center justify-between text-sm ${
            notification.type === "success"
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
              : "bg-rose-50 text-rose-800 border border-rose-200"
          }`}
        >
          <div className="flex items-center gap-2">
            {notification.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-600" />
            )}
            <span className="font-semibold">{notification.message}</span>
          </div>
          <button
            onClick={() => setNotification(null)}
            className="text-xs uppercase font-bold hover:underline"
          >
            Cerrar
          </button>
        </div>
      )}

      {/* Selector de Pestañas Administrativas */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab("credito")}
          className={`px-5 py-2.5 rounded-xl text-sm font-bold transition flex items-center gap-2 ${
            activeTab === "credito"
              ? "bg-bank-700 text-white shadow-md shadow-bank-700/20"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Tasas y Parámetros de Crédito</span>
        </button>

        <button
          onClick={() => setActiveTab("cdt")}
          className={`px-5 py-2.5 rounded-xl text-sm font-bold transition flex items-center gap-2 ${
            activeTab === "cdt"
              ? "bg-emerald-700 text-white shadow-md shadow-emerald-700/20"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Tasas de CDT por Plazo</span>
        </button>

        <button
          onClick={() => setActiveTab("mensajes")}
          className={`px-5 py-2.5 rounded-xl text-sm font-bold transition flex items-center gap-2 ${
            activeTab === "mensajes"
              ? "bg-slate-900 text-white shadow-md"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          <Inbox className="w-4 h-4" />
          <span>Mensajes de Contacto ({messages.length})</span>
        </button>
      </div>

      {/* PESTAÑA 1: GESTIÓN DE TASAS DE CRÉDITO */}
      {activeTab === "credito" && (
        <div className="space-y-6">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
            <span>
              Cualquier cambio guardado aquí se actualizará de inmediato en los simuladores y en el archivo local{" "}
              <code>data/rates.json</code> y <code>data/products.json</code>.
            </span>
            <span className="font-mono text-[11px] text-slate-400">
              Última act: {new Date(ratesConfig.ultimaActualizacion).toLocaleTimeString()}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {Object.entries(creditRates).map(([id, cred]) => (
              <div
                key={id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{cred.nombre}</h3>
                    <span className="text-xs text-slate-400 font-mono">ID: {id}</span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-bank-50 text-bank-700 font-bold text-xs">
                    Tasa actual: {formatPercent(cred.tasaEA)}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 text-sm">
                  {/* Tasa EA */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Tasa de Interés (% EA)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.01"
                        min="1"
                        max="40"
                        value={cred.tasaEA}
                        onChange={(e) =>
                          setCreditRates({
                            ...creditRates,
                            [id]: { ...cred, tasaEA: Number(e.target.value) },
                          })
                        }
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-bank-500"
                      />
                      <Percent className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  {/* Monto Mínimo */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Monto Mínimo ($)
                    </label>
                    <input
                      type="number"
                      step="500000"
                      value={cred.montoMinimo}
                      onChange={(e) =>
                        setCreditRates({
                          ...creditRates,
                          [id]: { ...cred, montoMinimo: Number(e.target.value) },
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-bank-500"
                    />
                  </div>

                  {/* Monto Máximo */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Monto Máximo ($)
                    </label>
                    <input
                      type="number"
                      step="1000000"
                      value={cred.montoMaximo}
                      onChange={(e) =>
                        setCreditRates({
                          ...creditRates,
                          [id]: { ...cred, montoMaximo: Number(e.target.value) },
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-bank-500"
                    />
                  </div>

                  {/* Plazo Mínimo */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Plazo Mínimo (meses)
                    </label>
                    <input
                      type="number"
                      value={cred.plazoMinimoMeses}
                      onChange={(e) =>
                        setCreditRates({
                          ...creditRates,
                          [id]: { ...cred, plazoMinimoMeses: Number(e.target.value) },
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-bank-500"
                    />
                  </div>

                  {/* Plazo Máximo */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Plazo Máximo (meses)
                    </label>
                    <input
                      type="number"
                      value={cred.plazoMaximoMeses}
                      onChange={(e) =>
                        setCreditRates({
                          ...creditRates,
                          [id]: { ...cred, plazoMaximoMeses: Number(e.target.value) },
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-bank-500"
                    />
                  </div>

                  {/* Botón Guardar */}
                  <div className="flex items-end">
                    <button
                      type="button"
                      disabled={isPending}
                      onClick={() => handleSaveCreditRate(id)}
                      className="w-full py-2.5 px-4 rounded-xl bg-bank-600 hover:bg-bank-700 text-white font-bold text-sm shadow-sm transition flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isPending ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Save className="w-4 h-4" />
                      )}
                      <span>Guardar Parámetros</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PESTAÑA 2: GESTIÓN DE TASAS DE CDT */}
      {activeTab === "cdt" && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="pb-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Tasas de CDT por Plazo de Inversión
              </h3>
              <p className="text-xs text-slate-500">
                Ajusta las tasas efectivas anuales según el periodo de captación.
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">
              Respaldo Fogafín
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cdtPlazos.map((item, idx) => (
              <div
                key={item.meses}
                className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-emerald-600" />
                    <span className="font-extrabold text-slate-800 text-base">
                      {item.meses} Meses
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">
                    {item.meses >= 12 ? `${item.meses / 12} año(s)` : `${item.meses * 30} días`}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Tasa de Rentabilidad (% EA)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.05"
                      min="0.1"
                      max="30"
                      value={item.tasaEA}
                      onChange={(e) => {
                        const updated = [...cdtPlazos];
                        updated[idx].tasaEA = Number(e.target.value);
                        setCdtPlazos(updated);
                      }}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-base"
                    />
                    <Percent className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <button
                  type="button"
                  disabled={isPending}
                  onClick={() => handleSaveCdtRate(item.meses, item.tasaEA)}
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Actualizar {item.meses}M</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PESTAÑA 3: MENSAJES Y SOLICITUDES DE CONTACTO */}
      {activeTab === "mensajes" && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="pb-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Bandeja de Solicitudes y Mensajes
              </h3>
              <p className="text-xs text-slate-500">
                Mensajes registrados localmente desde el formulario de contacto (<code>data/messages.json</code>).
              </p>
            </div>
            <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
              {messages.length} mensajes en total
            </span>
          </div>

          {messages.length === 0 ? (
            <div className="py-12 text-center text-slate-400 space-y-2">
              <Inbox className="w-12 h-12 mx-auto text-slate-300" />
              <p>No hay mensajes en la bandeja de entrada aún.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-5 rounded-2xl border transition-all ${
                    msg.leido
                      ? "bg-slate-50/70 border-slate-200"
                      : "bg-bank-50/40 border-bank-200 shadow-sm"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200/60">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-bank-600 text-white font-bold flex items-center justify-center text-sm">
                        {msg.nombreCompleto.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{msg.nombreCompleto}</h4>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <Mail className="w-3.5 h-3.5" /> {msg.correo}
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone className="w-3.5 h-3.5" /> {msg.telefono}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400 font-mono">
                        {new Date(msg.fecha).toLocaleDateString()} {new Date(msg.fecha).toLocaleTimeString()}
                      </span>
                      {!msg.leido && (
                        <button
                          type="button"
                          onClick={() => handleMarkAsRead(msg.id)}
                          className="text-xs px-2.5 py-1 rounded-lg bg-bank-600 text-white font-semibold hover:bg-bank-700 transition"
                        >
                          Marcar leído
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="pt-3 space-y-1.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-bank-800">
                      Asunto: {msg.asunto}
                    </span>
                    <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                      {msg.mensaje}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
}
