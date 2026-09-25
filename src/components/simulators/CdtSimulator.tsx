"use client";

import { useState } from "react";
import Link from "next/link";
import { ConfiguracionTasas, ResultadoSimulacionCDT } from "@/types/simulation";
import { calcularSimulacionCDT } from "@/lib/calculations";
import { formatCurrency, formatPercent } from "@/lib/formatters";
import {
  TrendingUp,
  Calendar,
  Percent,
  ShieldCheck,
  ArrowRight,
  Printer,
  Info,
  Sparkles,
  Award,
} from "lucide-react";

interface CdtSimulatorProps {
  ratesConfig: ConfiguracionTasas;
}

export function CdtSimulator({ ratesConfig }: CdtSimulatorProps) {
  const cdtConfig = ratesConfig.cdt || {
    montoSugerido: 10000000,
    plazoSugeridoMeses: 12,
    montoMinimo: 500000,
    plazos: [
      { meses: 3, tasaEA: 8.0 },
      { meses: 6, tasaEA: 8.5 },
      { meses: 12, tasaEA: 9.0 },
      { meses: 18, tasaEA: 9.25 },
      { meses: 24, tasaEA: 9.6 },
      { meses: 36, tasaEA: 10.0 },
    ],
  };

  const [montoInversion, setMontoInversion] = useState<number>(cdtConfig.montoSugerido || 10000000);
  const [plazoMeses, setPlazoMeses] = useState<number>(cdtConfig.plazoSugeridoMeses || 12);

  // Obtener tasa para el plazo seleccionado
  const plazoActual = cdtConfig.plazos.find((p) => p.meses === plazoMeses) || {
    meses: 12,
    tasaEA: 9.0,
  };
  const [tasaEA, setTasaEA] = useState<number>(plazoActual.tasaEA);

  const [resultado, setResultado] = useState<ResultadoSimulacionCDT | null>(() => {
    return calcularSimulacionCDT({
      montoInversion: cdtConfig.montoSugerido || 10000000,
      plazoMeses: cdtConfig.plazoSugeridoMeses || 12,
      tasaEA: plazoActual.tasaEA || 9.0,
    });
  });

  const handlePlazoChange = (meses: number) => {
    setPlazoMeses(meses);
    const p = cdtConfig.plazos.find((item) => item.meses === meses);
    if (p) {
      setTasaEA(p.tasaEA);
    }
  };

  const handleCalcular = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const res = calcularSimulacionCDT({
      montoInversion,
      plazoMeses,
      tasaEA,
    });
    setResultado(res);
  };

  return (
    <div className="space-y-8">
      {/* Estructura de 2 Columnas idéntica a la Pantalla 4 del prototipo */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* COLUMNA IZQUIERDA: FORMULARIO SIMULADOR DE CDT */}
        <div className="lg:col-span-6 bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <div className="p-3 rounded-2xl bg-emerald-600 text-white shadow-md shadow-emerald-600/30">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Simulador de CDT
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Calcula el rendimiento de tu inversión en CDT.
              </p>
            </div>
          </div>

          <form onSubmit={handleCalcular} className="space-y-5">
            
            {/* 1. Valor de la inversión */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="montoInversion" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Valor de la inversión
                </label>
                <span className="text-xs text-slate-400">
                  Mínimo: {formatCurrency(cdtConfig.montoMinimo)}
                </span>
              </div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-500">
                  $
                </span>
                <input
                  id="montoInversion"
                  type="number"
                  step="100000"
                  min={cdtConfig.montoMinimo}
                  value={montoInversion}
                  onChange={(e) => setMontoInversion(Number(e.target.value))}
                  required
                  className="w-full pl-9 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition text-base"
                />
              </div>

              {/* Botones rápidos de monto */}
              <div className="flex gap-2 pt-1 overflow-x-auto pb-1 text-xs">
                {[2000000, 5000000, 10000000, 20000000].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setMontoInversion(val)}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-600 font-medium transition"
                  >
                    {formatCurrency(val)}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Tiempo de inversión */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="tiempoInversion" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Tiempo de inversión
                </label>
                <span className="text-xs text-emerald-600 font-semibold">Tasa garantizada</span>
              </div>
              <div className="relative">
                <select
                  id="tiempoInversion"
                  value={plazoMeses}
                  onChange={(e) => handlePlazoChange(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition cursor-pointer"
                >
                  {cdtConfig.plazos.map((p) => (
                    <option key={p.meses} value={p.meses}>
                      {p.meses} meses ({p.meses >= 12 ? `${p.meses / 12} año(s)` : `${p.meses * 30} días`}) — {p.tasaEA}% EA
                    </option>
                  ))}
                </select>
                <Calendar className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* 3. Tasa de rentabilidad (% EA) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="tasaRentabilidad" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Tasa de rentabilidad (% EA)
                </label>
                <span className="text-xs text-slate-400">Parametrizada por el banco</span>
              </div>
              <div className="relative">
                <input
                  id="tasaRentabilidad"
                  type="number"
                  step="0.01"
                  min="0.1"
                  max="30"
                  value={tasaEA}
                  onChange={(e) => setTasaEA(Number(e.target.value))}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                />
                <Percent className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Botón Calcular (Pantalla 4 del prototipo) */}
            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base shadow-lg shadow-emerald-600/30 hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
            >
              <TrendingUp className="w-5 h-5" />
              <span>Calcular</span>
            </button>

          </form>

          {/* Garantía Fogafín */}
          <div className="pt-3 border-t border-slate-100 flex items-center gap-2.5 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Inversión respaldada y protegida con Seguro de Depósito Fogafín.</span>
          </div>
        </div>

        {/* COLUMNA DERECHA: RESULTADO DE LA SIMULACIÓN CDT */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-gradient-to-b from-white to-emerald-50/40 rounded-3xl border-2 border-emerald-200/80 shadow-xl p-6 sm:p-8 space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full">
                Resultado de la simulación
              </span>
              <span className="text-xs text-slate-400 font-medium">Finanzas Contigo</span>
            </div>

            {/* Resumen de parámetros */}
            <div className="space-y-3 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex justify-between items-center text-sm py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Valor inversión:</span>
                <span className="font-extrabold text-slate-900">
                  {formatCurrency(resultado?.montoInversion || montoInversion)}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Tiempo:</span>
                <span className="font-extrabold text-slate-900">
                  {resultado?.plazoMeses || plazoMeses} meses
                </span>
              </div>
              <div className="flex justify-between items-center text-sm py-1">
                <span className="text-slate-500 font-medium">Tasa de rentabilidad:</span>
                <span className="font-extrabold text-emerald-700">
                  {formatPercent(resultado?.tasaEA || tasaEA)}
                </span>
              </div>
            </div>

            {/* RENDIMIENTO ESTIMADO Y TOTAL AL VENCIMIENTO */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Rendimiento estimado */}
              <div className="bg-white rounded-2xl p-5 border border-emerald-200 shadow-sm text-center space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                  Rendimiento estimado
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 tracking-tight">
                  {formatCurrency(resultado?.rendimientoEstimado || 0)}
                </div>
                <span className="text-[11px] text-slate-400 block">Ganancia neta esperada</span>
              </div>

              {/* Valor total al vencimiento */}
              <div className="bg-white rounded-2xl p-5 border-2 border-emerald-600 shadow-md text-center space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                  Valor total al vencimiento
                </span>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {formatCurrency(resultado?.valorTotalVencimiento || 0)}
                </div>
                <span className="text-[11px] text-emerald-700 font-semibold block">Capital + Rendimiento</span>
              </div>

            </div>

            {/* DESCARGO LEGAL ESTRICTO DEL DOCUMENTO EV9 */}
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200/80 text-xs text-amber-900 leading-relaxed flex items-start gap-2.5">
              <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <p>
                <strong className="font-semibold">*Este valor es una estimación y puede variar según las políticas de la entidad.</strong>{" "}
                La retención en la fuente aplicable a los rendimientos financieros se calculará de acuerdo con la normatividad tributaria vigente al momento de la liquidación.
              </p>
            </div>

            {/* Acciones */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <Link
                href={`/contacto?asunto=Apertura%20de%20CDT&mensaje=Deseo%20abrir%20un%20CDT%20por%20valor%20de%20${formatCurrency(
                  resultado?.montoInversion || montoInversion
                )}%20a%20un%20plazo%20de%20${resultado?.plazoMeses || plazoMeses}%20meses.`}
                className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
              >
                <span>Solicitar Apertura de este CDT</span>
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
