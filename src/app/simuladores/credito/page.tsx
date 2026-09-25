import { Suspense } from "react";
import { getRates } from "@/lib/storage";
import { CreditSimulator } from "@/components/simulators/CreditSimulator";
import { Sparkles } from "lucide-react";

export const metadata = {
  title: "Simulador de Crédito | Finanzas Contigo",
  description:
    "Calcula tu cuota mensual estimada de Crédito de Libre Inversión, Vivienda o Vehículo de forma rápida, clara y transparente.",
};

export default async function SimuladorCreditoPage() {
  const ratesConfig = await getRates();

  return (
    <div className="py-10 lg:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Encabezado */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-bank-50 border border-bank-100 text-bank-700 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Herramienta Oficial de Simulación</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Simulador de Crédito Financiero
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          Ingresa el valor deseado, el plazo en meses y conoce al instante el valor de tu cuota estimada con nuestras tasas vigentes.
        </p>
      </div>

      <Suspense fallback={<div className="text-center py-12 text-slate-500">Cargando simulador...</div>}>
        <CreditSimulator ratesConfig={ratesConfig} />
      </Suspense>

    </div>
  );
}
