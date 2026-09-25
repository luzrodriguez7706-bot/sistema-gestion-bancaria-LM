import Link from "next/link";
import { Landmark, Shield, Phone, Mail, MapPin, HeartHandshake } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Columna 1: Identidad */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-bank-600 flex items-center justify-center text-white shadow-md">
                <Landmark className="w-5 h-5 text-white" />
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                FINANZAS <span className="text-bank-400">CONTIGO</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Impulsamos tus metas con soluciones financieras a tu medida. Centralizamos información y simulaciones para brindar una atención ágil, clara y confiable.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-emerald-400">
              <Shield className="w-4 h-4" />
              <span>Vigilado e información centralizada</span>
            </div>
          </div>

          {/* Columna 2: Navegación Rápida */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Navegación</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition">Inicio</Link>
              </li>
              <li>
                <Link href="/productos" className="hover:text-white transition">Nuestros Productos</Link>
              </li>
              <li>
                <Link href="/simuladores/credito" className="hover:text-white transition">Simulador de Crédito</Link>
              </li>
              <li>
                <Link href="/simuladores/cdt" className="hover:text-white transition">Simulador de CDT</Link>
              </li>
              <li>
                <Link href="/nosotros" className="hover:text-white transition">Información Institucional</Link>
              </li>
              <li>
                <Link href="/contacto" className="hover:text-white transition">Canales de Atención</Link>
              </li>
              <li>
                <Link href="/admin" className="text-amber-400 hover:text-amber-300 transition">Panel de Administración</Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Canales de Atención */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Canales de Atención</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-bank-400 mt-0.5 shrink-0" />
                <span>Calle 123 # 45-67, Bogotá, Colombia</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-bank-400 shrink-0" />
                <span>PBX: (601) 123 4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-bank-400 shrink-0" />
                <span>contacto@finanzascontigo.com</span>
              </li>
              <li className="text-xs text-slate-500 pt-1">
                Lunes a Viernes: 8:00 a.m. - 5:00 p.m.<br />
                Sábados: 8:00 a.m. - 12:00 m.
              </li>
            </ul>
          </div>

          {/* Columna 4: Proyecto Formativo SENA */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Proyecto SENA EV9</h3>
            <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs text-slate-300 space-y-1.5">
              <div className="font-semibold text-white">Centro Pecuario y Agroempresarial</div>
              <div>Programa: <span className="text-bank-300 font-medium">Gestión Bancaria y Entidades Financieras</span></div>
              <div>Ficha: <span className="text-slate-100 font-mono">3230956</span></div>
              <div>Aprendiz: <span className="text-slate-200">Luz Marina Palacios Rodriguez</span></div>
              <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-700 mt-2">
                La Dorada, Caldas
              </div>
            </div>
          </div>

        </div>

        {/* Disclaimer Legal EV9 */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <p className="text-xs text-slate-500 text-center leading-relaxed max-w-4xl mx-auto">
            * Los resultados generados por los simuladores de crédito y CDT son valores aproximados de carácter exclusivamente ilustrativo y de orientación al cliente. No representan una aprobación formal de crédito ni una oferta contractual definitiva por parte de la entidad financiera. Las condiciones definitivas dependerán del estudio de crédito, las políticas de riesgo y la tasa vigente a la fecha de formalización.
          </p>
          <div className="mt-4 text-center text-xs text-slate-600">
            © {new Date().getFullYear()} Finanzas Contigo. Todos los derechos reservados. Desarrollado en Next.js con persistencia local.
          </div>
        </div>

      </div>
    </footer>
  );
}
