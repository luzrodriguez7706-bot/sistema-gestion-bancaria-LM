import { getInstitutionInfo } from "@/lib/storage";
import {
  ShieldCheck,
  Zap,
  HeartHandshake,
  Compass,
  Eye,
  HelpCircle,
  BookOpen,
  CheckCircle2,
  GraduationCap,
  Calculator,
  Layers,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Nosotros y Ayuda | Finanzas Contigo",
  description:
    "Conoce la misión, visión, pilares de servicio y guía de uso del sistema de información de gestión bancaria Finanzas Contigo.",
};

export default async function NosotrosPage() {
  const institution = await getInstitutionInfo();

  return (
    <div className="py-12 lg:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* 1. Encabezado */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-bank-50 border border-bank-100 text-bank-700 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Identidad Institucional y Orientación</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
          Sobre Finanzas Contigo
        </h1>
        <p className="text-base sm:text-lg text-slate-600">
          Una solución concebida para transformar y centralizar la experiencia de atención al cliente y la consulta de productos financieros.
        </p>
      </div>

      {/* 2. Misión y Visión (Sección solicitada en la EV9) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Misión */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-8 sm:p-10 space-y-4 hover:border-bank-300 transition">
          <div className="w-12 h-12 rounded-2xl bg-bank-50 border border-bank-100 text-bank-600 flex items-center justify-center">
            <Compass className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Nuestra Misión</h2>
          <p className="text-slate-600 text-base leading-relaxed">
            {institution.mision}
          </p>
        </div>

        {/* Visión */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-8 sm:p-10 space-y-4 hover:border-emerald-300 transition">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center">
            <Eye className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Nuestra Visión</h2>
          <p className="text-slate-600 text-base leading-relaxed">
            {institution.vision}
          </p>
        </div>

      </div>

      {/* 3. Módulo de Ayuda y Preguntas Frecuentes (Funcionalidad 'Ayuda' del documento EV9) */}
      <div className="bg-slate-50/80 rounded-3xl border border-slate-200/80 p-8 sm:p-12 space-y-8">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-bank-700 uppercase tracking-wider">
            <HelpCircle className="w-4 h-4 text-bank-600" />
            <span>Centro de Ayuda y Orientación al Usuario</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            ¿Cómo utilizar este sistema de información?
          </h2>
          <p className="text-sm text-slate-600">
            Guía rápida paso a paso para asesores y clientes sobre las herramientas de simulación y consulta.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-8 h-8 rounded-xl bg-bank-600 text-white font-bold flex items-center justify-center text-sm">
              1
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Consulta de Productos
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Ingresa al menú <strong>Productos</strong> para conocer las tasas referenciales, montos mínimos, plazos y requisitos de cada línea financiera.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-8 h-8 rounded-xl bg-bank-600 text-white font-bold flex items-center justify-center text-sm">
              2
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Simulación de Crédito y CDT
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              En la sección de <strong>Simuladores</strong>, ingresa el monto y plazo para obtener la cuota mensual estimada o el rendimiento final garantizado.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-8 h-8 rounded-xl bg-bank-600 text-white font-bold flex items-center justify-center text-sm">
              3
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Contacto y Asesoría
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Una vez realizada tu simulación, utiliza el botón de solicitud para enviar tus datos directamente a un asesor financiero.
            </p>
          </div>

        </div>

        {/* Preguntas Frecuentes */}
        <div className="space-y-4 pt-4 border-t border-slate-200">
          <h3 className="text-lg font-bold text-slate-900">
            Preguntas Frecuentes
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-1.5">
              <h4 className="font-bold text-slate-900">
                ¿El resultado de la simulación es una aprobación inmediata?
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                No. De acuerdo con el alcance del sistema, las simulaciones son estimaciones financieras ilustrativas. La aprobación formal requiere estudio de crédito y validación de documentos por parte del asesor.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-1.5">
              <h4 className="font-bold text-slate-900">
                ¿Puedo simular diferentes plazos y montos?
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Sí. Los simuladores permiten comparar cuotas en plazos desde 12 hasta 240 meses para créditos, y desde 3 hasta 36 meses para CDTs con recálculo automático.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Ficha Técnica y Proyecto Formativo SENA */}
      <div className="rounded-3xl bg-slate-900 text-slate-300 p-8 sm:p-10 space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-emerald-600/30 text-emerald-400 border border-emerald-500/30">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">
              Marco Académico y Formativo (SENA)
            </h2>
            <p className="text-xs text-slate-400">
              Desarrollado bajo los lineamientos de la competencia formativa EV9
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
            <span className="text-slate-400 block mb-1">Institución:</span>
            <span className="font-semibold text-white">
              {institution.datosAcademicos.institucion}
            </span>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
            <span className="text-slate-400 block mb-1">Programa:</span>
            <span className="font-semibold text-white">
              {institution.datosAcademicos.programa}
            </span>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
            <span className="text-slate-400 block mb-1">Competencia / Ficha:</span>
            <span className="font-semibold text-white">
              Ficha {institution.datosAcademicos.ficha}
            </span>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
            <span className="text-slate-400 block mb-1">Aprendiz / Sede:</span>
            <span className="font-semibold text-white">
              {institution.datosAcademicos.aprendiz} ({institution.datosAcademicos.sede})
            </span>
          </div>
        </div>
      </div>

    </div>
  );
}
