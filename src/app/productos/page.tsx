import { getProducts } from "@/lib/storage";
import { ProductCatalog } from "@/components/products/ProductCatalog";
import { Sparkles } from "lucide-react";

export const metadata = {
  title: "Nuestros Productos Financieros | Finanzas Contigo",
  description: "Conoce nuestro portafolio de créditos de libre inversión, vivienda, vehículo, CDT y cuentas de ahorro con tasas preferenciales.",
};

export default async function ProductosPage() {
  const products = await getProducts();

  return (
    <div className="py-12 lg:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Encabezado según Prototipo EV9 Pantalla 2 */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-bank-50 border border-bank-100 text-bank-700 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Portafolio Oficial Centralizado</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
          Nuestros Productos Financieros
        </h1>
        <p className="text-base sm:text-lg text-slate-600">
          Encuentra el producto ideal para cada momento de tu vida. Consulta requisitos, características y simula tus opciones al instante.
        </p>
      </div>

      {/* Catálogo Interactivo */}
      <ProductCatalog products={products} />

    </div>
  );
}
