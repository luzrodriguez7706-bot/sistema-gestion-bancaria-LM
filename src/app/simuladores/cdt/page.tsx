import { getRates } from "@/lib/storage";
import { CdtSimulator } from "@/components/simulators/CdtSimulator";
import { Sparkles } from "lucide-react";

export const metadata = {
  title: "Simulador de CDT | Finanzas Contigo",
  description:
    "Calcula el rendimiento y el valor final de tu inversión a término fijo (CDT) con respaldo Fogafín y tasas competitivas.",
};

export default async function SimuladorCdtPage() {
  const ratesConfig = await getRates();

  return (
    <div className="py-10 lg:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Encabezado */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Inversión Segura a Término Fijo</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Simulador de Inversión en CDT
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          Haz crecer tu dinero sin riesgos. Conoce los rendimientos garantizados según el monto y plazo que elijas.
        </p>
      </div>

      <CdtSimulator ratesConfig={ratesConfig} />

    </div>
  );
}
