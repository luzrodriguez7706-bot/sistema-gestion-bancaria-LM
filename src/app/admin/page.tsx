import { getRates, getProducts, getMessages } from "@/lib/storage";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { ShieldAlert, Settings } from "lucide-react";

export const metadata = {
  title: "Panel de Administración | Finanzas Contigo",
  description:
    "Gestión y actualización de parámetros, tasas de interés, plazos y catálogo de productos del sistema de información bancaria.",
};

export default async function AdminPage() {
  const ratesConfig = await getRates();
  const products = await getProducts();
  const messages = await getMessages();

  return (
    <div className="py-10 lg:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Encabezado del Administrador */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Rol: Administrador del Sistema</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Panel de Gestión y Parámetros
          </h1>
          <p className="text-sm text-slate-500">
            Administra las tasas de interés oficiales, montos permitidos y consulta solicitudes recibidas sin bases de datos externas.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold">
            <Settings className="w-3.5 h-3.5 text-slate-500" />
            <span>Persistencia local: /data/*.json</span>
          </span>
        </div>
      </div>

      {/* Dashboard */}
      <AdminDashboard
        ratesConfig={ratesConfig}
        products={products}
        messages={messages}
      />

    </div>
  );
}
