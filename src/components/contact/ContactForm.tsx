"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { submitContactMessage } from "@/actions/contactActions";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export function ContactForm() {
  const searchParams = useSearchParams();
  const defaultAsunto = searchParams.get("asunto") || "";
  const defaultMensaje = searchParams.get("mensaje") || "";

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: "idle" | "success" | "error";
    message: string;
  }>({
    type: "idle",
    message: "",
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "idle", message: "" });

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const result = await submitContactMessage(formData);
      if (result.success) {
        setStatus({
          type: "success",
          message: result.message,
        });
        form.reset();
      } else {
        setStatus({
          type: "error",
          message: result.message,
        });
      }
    } catch (err) {
      setStatus({
        type: "error",
        message: "Ocurrió un error al enviar el mensaje. Inténtelo de nuevo.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Envíanos tu mensaje
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Diligencia los siguientes campos y un asesor financiero se comunicará contigo a la mayor brevedad.
        </p>
      </div>

      {status.type === "success" && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-start gap-3 animate-in fade-in duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
          <div>
            <div className="font-bold">¡Mensaje registrado exitosamente!</div>
            <div className="text-xs text-emerald-700 mt-0.5">{status.message}</div>
          </div>
        </div>
      )}

      {status.type === "error" && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-start gap-3 animate-in fade-in duration-200">
          <AlertCircle className="w-5 h-5 text-rose-600 mt-0.5 shrink-0" />
          <div>
            <div className="font-bold">No se pudo enviar el mensaje</div>
            <div className="text-xs text-rose-700 mt-0.5">{status.message}</div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Fila 1: Nombre y Correo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="nombreCompleto" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Nombre completo *
            </label>
            <input
              id="nombreCompleto"
              name="nombreCompleto"
              type="text"
              required
              placeholder="Ej. Andrés Pérez"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-bank-500 text-sm transition"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="correo" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Correo electrónico *
            </label>
            <input
              id="correo"
              name="correo"
              type="email"
              required
              placeholder="correo@ejemplo.com"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-bank-500 text-sm transition"
            />
          </div>
        </div>

        {/* Fila 2: Teléfono y Asunto */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="telefono" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Teléfono de contacto *
            </label>
            <input
              id="telefono"
              name="telefono"
              type="tel"
              required
              placeholder="Ej. 310 123 4567"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-bank-500 text-sm transition"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="asunto" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Asunto *
            </label>
            <input
              id="asunto"
              name="asunto"
              type="text"
              required
              defaultValue={defaultAsunto}
              placeholder="Ej. Solicitud de información crédito"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-bank-500 text-sm transition"
            />
          </div>
        </div>

        {/* Mensaje */}
        <div className="space-y-1.5">
          <label htmlFor="mensaje" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
            Mensaje *
          </label>
          <textarea
            id="mensaje"
            name="mensaje"
            rows={4}
            required
            defaultValue={defaultMensaje}
            placeholder="Describe tu solicitud o inquietud detalladamente..."
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-bank-500 text-sm transition resize-none"
          />
        </div>

        {/* Botón Enviar Mensaje (Verde con icono como en el prototipo EV9) */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base shadow-lg shadow-emerald-600/30 hover:shadow-xl transition flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Guardando en el sistema...</span>
            </>
          ) : (
            <>
              <span>Enviar mensaje</span>
              <Send className="w-4 h-4" />
            </>
          )}
        </button>

      </form>
    </div>
  );
}
