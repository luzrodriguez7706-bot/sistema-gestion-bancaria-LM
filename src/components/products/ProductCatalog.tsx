"use client";

import { useState } from "react";
import Link from "next/link";
import { ProductoFinanciero } from "@/types/product";
import { formatCurrency, formatPercent } from "@/lib/formatters";
import {
  Home,
  Car,
  Wallet,
  TrendingUp,
  PiggyBank,
  CheckCircle,
  FileText,
  Calculator,
  X,
  ArrowRight,
  Info,
  ShieldAlert,
} from "lucide-react";

interface ProductCatalogProps {
  products: ProductoFinanciero[];
}

export function ProductCatalog({ products }: ProductCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("todos");
  const [activeModalProduct, setActiveModalProduct] = useState<ProductoFinanciero | null>(null);

  const filteredProducts =
    selectedCategory === "todos"
      ? products
      : products.filter((p) => p.categoria === selectedCategory);

  const getProductIcon = (nombre: string) => {
    if (nombre.toLowerCase().includes("vivienda")) return <Home className="w-8 h-8 text-bank-600" />;
    if (nombre.toLowerCase().includes("vehículo") || nombre.toLowerCase().includes("vehiculo"))
      return <Car className="w-8 h-8 text-bank-600" />;
    if (nombre.toLowerCase().includes("cdt")) return <TrendingUp className="w-8 h-8 text-emerald-600" />;
    if (nombre.toLowerCase().includes("ahorro")) return <PiggyBank className="w-8 h-8 text-amber-600" />;
    return <Wallet className="w-8 h-8 text-bank-600" />;
  };

  return (
    <div className="space-y-8">
      {/* Filtros de categoría */}
      <div className="flex flex-wrap items-center justify-center gap-2 pb-2">
        {[
          { id: "todos", label: "Todos los Productos" },
          { id: "credito", label: "Líneas de Crédito" },
          { id: "inversion", label: "Inversión y CDT" },
          { id: "ahorro", label: "Cuentas de Ahorro" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedCategory(tab.id)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              selectedCategory === tab.id
                ? "bg-bank-700 text-white shadow-md shadow-bank-700/20"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid de Productos (Pantalla 2 - Prototipo EV9) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {filteredProducts.map((prod) => (
          <div
            key={prod.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
          >
            <div className="p-6 sm:p-7 space-y-5">
              <div className="flex items-start justify-between">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 group-hover:scale-105 transition-transform">
                  {getProductIcon(prod.nombre)}
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    Tasa Referencial
                  </span>
                  <span className="text-base font-extrabold text-bank-700">
                    {formatPercent(prod.tasaReferencialEA)}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-bank-700 transition">
                  {prod.nombre}
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed min-h-[48px]">
                  {prod.descripcion}
                </p>
              </div>

              {/* Parámetros clave */}
              <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 block">Monto Mínimo:</span>
                  <span className="font-semibold text-slate-800">
                    {formatCurrency(prod.montoMinimo)}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block">Plazo Máximo:</span>
                  <span className="font-semibold text-slate-800">
                    {prod.plazoMaxMeses > 0 ? `${prod.plazoMaxMeses} meses` : "Inmediato"}
                  </span>
                </div>
              </div>
            </div>

            {/* Acciones */}
            <div className="p-6 pt-0 space-y-2">
              <button
                type="button"
                onClick={() => setActiveModalProduct(prod)}
                className="w-full py-2.5 px-4 rounded-xl border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 hover:border-slate-300 transition flex items-center justify-center gap-1.5"
              >
                <Info className="w-4 h-4 text-slate-500" />
                <span>Más información</span>
              </button>

              {prod.categoria === "credito" && (
                <Link
                  href={`/simuladores/credito?tipo=${prod.id}`}
                  className="w-full py-2.5 px-4 rounded-xl bg-bank-600 hover:bg-bank-700 text-white font-semibold text-sm shadow-sm transition flex items-center justify-center gap-2"
                >
                  <Calculator className="w-4 h-4" />
                  <span>Simular Crédito</span>
                </Link>
              )}

              {prod.categoria === "inversion" && (
                <Link
                  href="/simuladores/cdt"
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-sm transition flex items-center justify-center gap-2"
                >
                  <TrendingUp className="w-4 h-4" />
                  <span>Simular CDT</span>
                </Link>
              )}

              {prod.categoria === "ahorro" && (
                <Link
                  href="/contacto?asunto=Apertura%20Cuenta%20de%20Ahorros"
                  className="w-full py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm shadow-sm transition flex items-center justify-center gap-2"
                >
                  <span>Solicitar Información</span>
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* MODAL DETALLADO DE PRODUCTO ("Más Información") */}
      {activeModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 p-6 sm:p-8 space-y-6">
            
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-bank-50 border border-bank-100">
                  {getProductIcon(activeModalProduct.nombre)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {activeModalProduct.nombre}
                  </h3>
                  <span className="text-xs font-semibold text-bank-600">
                    Tasa: {formatPercent(activeModalProduct.tasaReferencialEA)}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveModalProduct(null)}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-slate-600 text-sm leading-relaxed">
              {activeModalProduct.detalles}
            </p>

            {/* Beneficios */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Principales Beneficios</span>
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-600">
                {activeModalProduct.beneficios.map((b, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Requisitos */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-bank-600" />
                <span>Requisitos de Solicitud</span>
              </h4>
              <ul className="space-y-2 text-sm text-slate-600">
                {activeModalProduct.requisitos.map((r, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-bank-600 font-bold">•</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pie del modal */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setActiveModalProduct(null)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition"
              >
                Cerrar
              </button>

              {activeModalProduct.categoria === "credito" && (
                <Link
                  href={`/simuladores/credito?tipo=${activeModalProduct.id}`}
                  onClick={() => setActiveModalProduct(null)}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-bank-600 hover:bg-bank-700 text-white text-sm font-semibold shadow-md transition flex items-center justify-center gap-2"
                >
                  <Calculator className="w-4 h-4" />
                  <span>Simular este Crédito</span>
                </Link>
              )}

              {activeModalProduct.categoria === "inversion" && (
                <Link
                  href="/simuladores/cdt"
                  onClick={() => setActiveModalProduct(null)}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold shadow-md transition flex items-center justify-center gap-2"
                >
                  <TrendingUp className="w-4 h-4" />
                  <span>Simular este CDT</span>
                </Link>
              )}
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
