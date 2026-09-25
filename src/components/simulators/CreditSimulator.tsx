"use client";

import { useState, useId } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ConfiguracionTasas, ResultadoSimulacionCredito } from "@/types/simulation";
import { calcularSimulacionCredito } from "@/lib/calculations";
import { formatCurrency, formatPercent } from "@/lib/formatters";
import {
  Calculator,
  Calendar,
  Percent,
  Layers,
  ArrowRight,
  Printer,
  Sparkles,
  Info,
  DollarSign,
  HelpCircle,
} from "lucide-react";

interface CreditSimulatorProps {
  ratesConfig: ConfiguracionTasas;
}

export function CreditSimulator({ ratesConfig }: CreditSimulatorProps) {
  const searchParams = useSearchParams();
  const initialType = searchParams.get("tipo") || "credito-libre-inversion";

  const creditOptions = Object.entries(ratesConfig.creditos).map(([id, item]) => ({
    id,
    ...item,
  }));

  const initialSelected =
    creditOptions.find((c) => c.id === initialType) || creditOptions[0] || {
      id: "credito-libre-inversion",
      nombre: "Crédito de Libre Inversión",
      tasaEA: 12.5,
      montoSugerido: 20000000,
      plazoSugeridoMeses: 36,
      plazoMinimoMeses: 12,
      plazoMaximoMeses: 60,
      montoMinimo: 1000000,
      montoMaximo: 50000000,
    };

  const [tipoCreditoId, setTipoCreditoId] = useState<string>(initialSelected.id);
  const [monto, setMonto] = useState<number>(initialSelected.montoSugerido || 20000000);
  const [plazoMeses, setPlazoMeses] = useState<number>(initialSelected.plazoSugeridoMeses || 36);
  const [tasaEA, setTasaEA] = useState<number>(initialSelected.tasaEA || 12.5);
  const [resultado, setResultado] = useState<ResultadoSimulacionCredito | null>(() => {
    return calcularSimulacionCredito(
      {
        tipoCreditoId: initialSelected.id,
        monto: initialSelected.montoSugerido || 20000000,
        plazoMeses: initialSelected.plazoSugeridoMeses || 36,
        tasaEA: initialSelected.tasaEA || 12.5,
      },
      initialSelected.nombre
    );
  });

  const selectedCreditConfig =
    creditOptions.find((c) => c.id === tipoCreditoId) || initialSelected;

  const handleTipoChange = (newId: string) => {
    setTipoCreditoId(newId);
    const cfg = creditOptions.find((c) => c.id === newId);
    if (cfg) {
      setTasaEA(cfg.tasaEA);
      setPlazoMeses(cfg.plazoSugeridoMeses);
      setMonto(cfg.montoSugerido);
    }
  };

  const handleSimular = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const res = calcularSimulacionCredito(
      {
        tipoCreditoId,
        monto,
        plazoMeses,
        tasaEA,
      },
      selectedCreditConfig.nombre
    );
    setResultado(res);
  };

  return (
    <div className="space-y-8">
      
      {/* Contenedor Principal de Dos Columnas (Pantalla 3 del Prototipo EV9) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* COLUMNA IZQUIERDA: FORMULARIO DE CAPTURA */}
        <div className="lg:col-span-6 bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <div className="p-3 rounded-2xl bg-bank-600 text-white shadow-md shadow-bank-600/30">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Simulador de Crédito
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Calcula tu cuota estimada de manera fácil y rápida.
              </p>
            </div>
          </div>

          <form onSubmit={handleSimular} className="space-y-5">
            
            {/* 1. Tipo de crédito */}
            <div className="space-y-1.5">
              <label htmlFor="tipoCredito" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Tipo de crédito
              </label>
              <div className="relative">
                <select
                  id="tipoCredito"
                  value={tipoCreditoId}
                  onChange={(e) => handleTipoChange(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-bank-500 transition cursor-pointer"
                >
                  {creditOptions.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.nombre}
                    </option>
                  ))}
                </select>
                <Layers className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* 2. Valor del crédito */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="monto" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Valor del crédito
                </label>
                <span className="text-xs text-slate-400">
                  Mín: {formatCurrency(selectedCreditConfig.montoMinimo)}
                </span>
              </div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-500">
                  $
                </span>
                <input
                  id="monto"
                  type="number"
                  step="500000"
                  min={selectedCreditConfig.montoMinimo}
                  max={selectedCreditConfig.montoMaximo}
                  value={monto}
                  onChange={(e) => setMonto(Number(e.target.value))}
                  required
                  className="w-full pl-9 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-bank-500 transition text-base"
                />
              </div>
              <div className="flex gap-2 pt-1 overflow-x-auto pb-1 text-xs">
                {[10000000, 20000000, 50000000, 100000000].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setMonto(val)}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-bank-50 hover:text-bank-700 text-slate-600 font-medium transition"
                  >
                    {formatCurrency(val)}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Plazo (meses) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="plazo" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Plazo (meses)
                </label>
                <span className="text-xs text-slate-400">
                  Entre {selectedCreditConfig.plazoMinimoMeses} y {selectedCreditConfig.plazoMaximoMeses} meses
                </span>
              </div>
              <div className="relative">
                <select
                  id="plazo"
                  value={plazoMeses}
                  onChange={(e) => setPlazoMeses(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-bank-500 transition cursor-pointer"
                >
                  {[12, 24, 36, 48, 60, 72, 84, 120, 180, 240]
                    .filter(
                      (m) =>
                        m >= selectedCreditConfig.plazoMinimoMeses &&
                        m <= selectedCreditConfig.plazoMaximoMeses
                    )
                    .map((m) => (
                      <option key={m} value={m}>
                        {m} meses ({Math.round((m / 12) * 10) / 10} años)
                      </option>
                    ))}
                </select>
                <Calendar className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* 4. Tasa de interés (% EA) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="tasa" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Tasa de interés (% EA)
                </label>
                <span className="text-xs text-emerald-600 font-semibold">Tasa Oficial Vigente</span>
              </div>
              <div className="relative">
                <input
                  id="tasa"
                  type="number"
                  step="0.01"
                  min="1"
                  max="40"
                  value={tasaEA}
                  onChange={(e) => setTasaEA(Number(e.target.value))}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-bank-500 transition"
                />
                <Percent className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              <p className="text-[11px] text-slate-400">
                La tasa efectiva anual es parametrizada por la entidad para este producto.
              </p>
            </div>

            {/* Botón Simular (Pantalla 3 del Prototipo) */}
            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-bank-600 hover:bg-bank-700 text-white font-bold text-base shadow-lg shadow-bank-600/30 hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Calculator className="w-5 h-5" />
              <span>Simular</span>
            </button>

          </form>
        </div>

        {/* COLUMNA DERECHA: RESULTADO DE LA SIMULACIÓN (Pantalla 3 del Prototipo EV9) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-gradient-to-b from-white to-bank-50/40 rounded-3xl border-2 border-bank-200/80 shadow-xl p-6 sm:p-8 space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <span className="text-xs font-extrabold uppercase tracking-wider text-bank-700 bg-bank-100/70 px-3 py-1 rounded-full">
                Resultado de la simulación
              </span>
              <span className="text-xs text-slate-400 font-medium">Finanzas Contigo</span>
            </div>

            {/* Resumen de parámetros */}
            <div className="space-y-3 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex justify-between items-center text-sm py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Valor crédito:</span>
                <span className="font-extrabold text-slate-900">
                  {formatCurrency(resultado?.monto || monto)}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Plazo:</span>
                <span className="font-extrabold text-slate-900">
                  {resultado?.plazoMeses || plazoMeses} meses
                </span>
              </div>
              <div className="flex justify-between items-center text-sm py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Tasa de interés:</span>
                <span className="font-extrabold text-bank-700">
                  {formatPercent(resultado?.tasaEA || tasaEA)}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm py-1">
                <span className="text-slate-500 font-medium">Tipo de crédito:</span>
                <span className="font-semibold text-slate-800">
                  {resultado?.tipoCreditoNombre || selectedCreditConfig.nombre}
                </span>
              </div>
            </div>

            {/* CUOTA MENSUAL ESTIMADA DESTACADA (idéntico al prototipo) */}
            <div className="bg-white rounded-2xl p-6 border-2 border-bank-600 shadow-md text-center space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Cuota mensual estimada
              </span>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-bank-700 tracking-tight">
                {formatCurrency(resultado?.cuotaMensualEstimada || 0)}
              </div>
              <span className="text-xs text-emerald-600 font-semibold block pt-1">
                Incluye estimación de capital, intereses y seguro deudor
              </span>
            </div>

            {/* Desglose total */}
            <div className="grid grid-cols-2 gap-3 text-xs bg-slate-100/80 p-4 rounded-xl">
              <div>
                <span className="text-slate-500 block">Total a Pagar (aprox):</span>
                <span className="font-bold text-slate-800 text-sm">
                  {formatCurrency(resultado?.totalPagar || 0)}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block">Intereses Estimados:</span>
                <span className="font-bold text-slate-800 text-sm">
                  {formatCurrency(resultado?.totalIntereses || 0)}
                </span>
              </div>
            </div>

            {/* DESCARGO LEGAL ESTRICTO DEL DOCUMENTO EV9 */}
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200/80 text-xs text-amber-900 leading-relaxed flex items-start gap-2.5">
              <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <p>
                <strong className="font-semibold">*Este valor es una estimación y puede variar según las políticas de la entidad.</strong>{" "}
                Los resultados son de carácter informativo y no constituyen una aprobación de crédito ni una oferta contractual definitiva.
              </p>
            </div>

            {/* CTA para conectar con un Asesor Financiero */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <Link
                href={`/contacto?asunto=Solicitud%20de%20Credito%20${encodeURIComponent(
                  selectedCreditConfig.nombre
                )}&mensaje=Deseo%20solicitar%20asesoría%20para%20un%20crédito%20por%20valor%20de%20${formatCurrency(
                  resultado?.monto || monto
                )}%20a%20un%20plazo%20de%20${resultado?.plazoMeses || plazoMeses}%20meses.`}
                className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
              >
                <span>Solicitar Asesoría para este Crédito</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                type="button"
                onClick={() => window.print()}
                className="py-3 px-4 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 font-semibold text-sm transition flex items-center justify-center gap-1.5"
                title="Imprimir resumen"
              >
                <Printer className="w-4 h-4" />
                <span className="hidden sm:inline">Imprimir</span>
              </button>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
