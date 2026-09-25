"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Landmark,
  Calculator,
  Briefcase,
  Info,
  PhoneCall,
  Menu,
  X,
  Settings,
  ChevronDown,
  Percent,
} from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [simulatorsOpen, setSimulatorsOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Corporativo "Finanzas Contigo" */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-bank-900 via-bank-700 to-bank-500 flex items-center justify-center text-white shadow-md shadow-bank-900/20 group-hover:scale-105 transition-transform duration-300">
              <Landmark className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight text-bank-950 flex items-center gap-1.5">
                FINANZAS <span className="text-bank-600">CONTIGO</span>
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Sistema de Gestión Bancaria
              </span>
            </div>
          </Link>

          {/* Navegación Desktop */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <Link
              href="/"
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                isActive("/") && pathname === "/"
                  ? "bg-bank-50 text-bank-700 shadow-sm"
                  : "text-slate-600 hover:text-bank-700 hover:bg-slate-50"
              }`}
            >
              Inicio
            </Link>

            <Link
              href="/productos"
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                isActive("/productos")
                  ? "bg-bank-50 text-bank-700 shadow-sm"
                  : "text-slate-600 hover:text-bank-700 hover:bg-slate-50"
              }`}
            >
              Productos
            </Link>

            {/* Dropdown Simuladores */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setSimulatorsOpen(!simulatorsOpen)}
                onBlur={() => setTimeout(() => setSimulatorsOpen(false), 200)}
                className={`px-3.5 py-2 rounded-lg text-sm font-semibold inline-flex items-center gap-1.5 transition-all duration-200 ${
                  isActive("/simuladores")
                    ? "bg-bank-50 text-bank-700 shadow-sm"
                    : "text-slate-600 hover:text-bank-700 hover:bg-slate-50"
                }`}
              >
                <span>Simuladores</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${simulatorsOpen ? "rotate-180" : ""}`} />
              </button>

              {simulatorsOpen && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-2 animate-in fade-in slide-in-from-top-2 duration-150">
                  <Link
                    href="/simuladores/credito"
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-bank-50 hover:text-bank-700 font-medium"
                    onClick={() => setSimulatorsOpen(false)}
                  >
                    <div className="p-1.5 rounded-lg bg-bank-100 text-bank-700">
                      <Calculator className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold">Simulador de Crédito</div>
                      <div className="text-xs text-slate-400">Calcula tu cuota mensual</div>
                    </div>
                  </Link>

                  <Link
                    href="/simuladores/cdt"
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 font-medium"
                    onClick={() => setSimulatorsOpen(false)}
                  >
                    <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700">
                      <Percent className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold">Simulador de CDT</div>
                      <div className="text-xs text-slate-400">Rendimiento garantizado</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/nosotros"
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                isActive("/nosotros")
                  ? "bg-bank-50 text-bank-700 shadow-sm"
                  : "text-slate-600 hover:text-bank-700 hover:bg-slate-50"
              }`}
            >
              Nosotros y Ayuda
            </Link>

            <Link
              href="/contacto"
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                isActive("/contacto")
                  ? "bg-bank-50 text-bank-700 shadow-sm"
                  : "text-slate-600 hover:text-bank-700 hover:bg-slate-50"
              }`}
            >
              Contacto
            </Link>
          </nav>

          {/* Botón Administración / CTA Asesor */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition"
              title="Panel Administrativo de Tasas y Parámetros"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Administrador</span>
            </Link>
            <Link
              href="/simuladores/credito"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-bank-600 hover:bg-bank-700 text-white text-sm font-semibold shadow-md shadow-bank-600/25 hover:shadow-lg transition-all"
            >
              <Calculator className="w-4 h-4" />
              <span>Simular Ahora</span>
            </Link>
          </div>

          {/* Botón Mobile Menu */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              href="/admin"
              className="p-2 text-slate-600 hover:text-bank-700 rounded-lg hover:bg-slate-100"
              title="Administración"
            >
              <Settings className="w-5 h-5" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-bank-700 rounded-lg hover:bg-slate-100"
              aria-label="Abrir Menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Menú Mobile desplegable */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-4 duration-200 shadow-xl">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-base font-semibold text-slate-700 hover:bg-bank-50 hover:text-bank-700"
          >
            Inicio
          </Link>
          <Link
            href="/productos"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-base font-semibold text-slate-700 hover:bg-bank-50 hover:text-bank-700"
          >
            Nuestros Productos
          </Link>
          <div className="pl-3 border-l-2 border-bank-200 space-y-1">
            <Link
              href="/simuladores/credito"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-slate-600 hover:text-bank-700"
            >
              Simulador de Crédito
            </Link>
            <Link
              href="/simuladores/cdt"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-slate-600 hover:text-bank-700"
            >
              Simulador de CDT
            </Link>
          </div>
          <Link
            href="/nosotros"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-base font-semibold text-slate-700 hover:bg-bank-50 hover:text-bank-700"
          >
            Nosotros y Ayuda
          </Link>
          <Link
            href="/contacto"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-base font-semibold text-slate-700 hover:bg-bank-50 hover:text-bank-700"
          >
            Canales de Contacto
          </Link>
          <Link
            href="/admin"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-base font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100"
          >
            Panel de Administración (Tasas y Parámetros)
          </Link>
        </div>
      )}
    </header>
  );
}
