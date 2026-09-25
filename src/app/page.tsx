import Link from "next/link";
import { getInstitutionInfo, getProducts } from "@/lib/storage";
import {
  ShieldCheck,
  Zap,
  HeartHandshake,
  ArrowRight,
  Calculator,
  Percent,
  CheckCircle2,
  Building,
  CreditCard,
  TrendingUp,
  ChevronRight,
  Clock,
  Sparkles,
} from "lucide-react";
import { formatCurrency, formatPercent } from "@/lib/formatters";

export default async function HomePage() {
  const institution = await getInstitutionInfo();
  const products = await getProducts();
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="space-y-16 lg:space-y-24 pb-16">
      
      {/* 1. SECCIÓN HERO (Pantalla 1 - Prototipo EV9) */}
      <section className="relative overflow-hidden bg-gradient-to-b from-bank-50/70 via-white to-slate-50 pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-slate-100">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.bank.100),white)] opacity-60" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-bank-100/80 border border-bank-200 text-bank-800 text-xs font-semibold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-bank-600" />
                <span>Plataforma Financiera Digital Centralizada</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-bank-950 tracking-tight leading-[1.15]">
                Bienvenido a <br className="hidden sm:inline" />
                <span className="text-bank-600">Finanzas Contigo</span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                {institution.eslogan} {institution.subtitulo}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/productos"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-bank-600 hover:bg-bank-700 text-white font-semibold text-base shadow-lg shadow-bank-600/25 hover:shadow-xl hover:-translate-y-0.5 transition-all"
                >
                  <span>Conocer nuestros productos</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/simuladores/credito"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-base border border-slate-200 shadow-sm hover:border-slate-300 transition-all"
                >
                  <Calculator className="w-4 h-4 text-bank-600" />
                  <span>Simular Crédito o CDT</span>
                </Link>
              </div>

              {/* Indicador de confianza rápida */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Cálculos financieros estandarizados
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Sin procesos manuales ni demoras
                </span>
              </div>
            </div>

            {/* Tarjeta Visual Destacada (Simulador interactivo rápido) */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md bg-white rounded-2xl shadow-xl shadow-slate-200/70 border border-slate-200/80 p-6 sm:p-8">
                <div className="flex items-center justify-between pb-5 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-bank-100 text-bank-700">
                      <Calculator className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">Simulación Rápida</h3>
                      <p className="text-xs text-slate-500">Prueba nuestros simuladores oficiales</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
                    100% en línea
                  </span>
                </div>

                <div className="space-y-4 pt-5">
                  <Link
                    href="/simuladores/credito"
                    className="group block p-4 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-bank-50/50 hover:border-bank-200 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CreditCard className="w-5 h-5 text-bank-600" />
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 group-hover:text-bank-700">
                            Simulador de Crédito
                          </h4>
                          <p className="text-xs text-slate-500">
                            Vivienda, Libre Inversión o Vehículo
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-bank-600 group-hover:translate-x-1 transition" />
                    </div>
                  </Link>

                  <Link
                    href="/simuladores/cdt"
                    className="group block p-4 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-emerald-50/50 hover:border-emerald-200 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <TrendingUp className="w-5 h-5 text-emerald-600" />
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700">
                            Simulador de CDT
                          </h4>
                          <p className="text-xs text-slate-500">
                            Calcula tu rentabilidad a plazo fijo
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition" />
                    </div>
                  </Link>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" /> Resultados inmediatos
                  </span>
                  <Link href="/contacto" className="text-bank-600 font-semibold hover:underline">
                    ¿Requieres un asesor? →
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. PILARES CORPORATIVOS (Pantalla 1 - Prototipo EV9: Seguridad, Rapidez, Confianza) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Nuestros Pilares de Atención
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            Diseñados para brindar transparencia, agilidad y seguridad a clientes y asesores financieros.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          
          {/* Seguridad */}
          <div className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow text-center sm:text-left">
            <div className="w-14 h-14 rounded-2xl bg-bank-50 border border-bank-100 text-bank-600 flex items-center justify-center mb-5 mx-auto sm:mx-0">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Seguridad</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Protegemos tu información con los más rigurosos estándares y políticas de confidencialidad financiera.
            </p>
          </div>

          {/* Rapidez */}
          <div className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow text-center sm:text-left">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center mb-5 mx-auto sm:mx-0">
              <Zap className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Rapidez</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Procesos ágiles y 100% digitales. Reduce tiempos en consultas y obtén respuestas inmediatas.
            </p>
          </div>

          {/* Confianza */}
          <div className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow text-center sm:text-left">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mb-5 mx-auto sm:mx-0">
              <HeartHandshake className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Confianza</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Más de 20 años acompañándote en la construcción de tu patrimonio con asesoría calificada y cercana.
            </p>
          </div>

        </div>
      </section>

      {/* 3. VISTA PREVIA DE PRODUCTOS DESTACADOS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold text-bank-600 uppercase tracking-wider">Portafolio Integral</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Productos Financieros para Cada Meta
            </h2>
          </div>
          <Link
            href="/productos"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-bank-600 hover:text-bank-700 transition"
          >
            <span>Ver todo el catálogo</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProducts.map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-lg transition-all p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide bg-slate-100 text-slate-700">
                    {prod.categoria}
                  </span>
                  <span className="text-xs font-bold text-bank-700 bg-bank-50 px-2.5 py-1 rounded-md">
                    {formatPercent(prod.tasaReferencialEA)}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2">{prod.nombre}</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">{prod.descripcion}</p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href={prod.categoria === "credito" ? "/simuladores/credito" : "/simuladores/cdt"}
                  className="text-sm font-semibold text-bank-600 hover:text-bank-700 inline-flex items-center gap-1"
                >
                  <span>Simular</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/productos"
                  className="text-xs font-medium text-slate-500 hover:text-slate-800"
                >
                  Más información
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. BANNER DE ORIENTACIÓN AL ASESOR Y CLIENTE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-bank-900 via-bank-800 to-bank-950 text-white p-8 sm:p-12 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              ¿Eres asesor o deseas atención personalizada?
            </h2>
            <p className="text-bank-100 text-sm sm:text-base leading-relaxed">
              Utiliza nuestras herramientas centralizadas para brindar a tus clientes cotizaciones formales, claras y en segundos, o escríbenos directamente a través de nuestros canales oficiales.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                href="/contacto"
                className="px-6 py-3 rounded-xl bg-white text-bank-900 font-bold text-sm hover:bg-bank-50 transition shadow"
              >
                Ir a Canales de Contacto
              </Link>
              <Link
                href="/nosotros"
                className="px-6 py-3 rounded-xl bg-bank-800/80 border border-bank-700 text-white font-semibold text-sm hover:bg-bank-700 transition"
              >
                Conocer la Entidad y Ayuda
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
