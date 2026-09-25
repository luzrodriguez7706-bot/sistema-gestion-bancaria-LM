import { Suspense } from "react";
import { getInstitutionInfo } from "@/lib/storage";
import { ContactForm } from "@/components/contact/ContactForm";
import { MapPin, Phone, Mail, Clock, Headphones, Sparkles, Building2 } from "lucide-react";

export const metadata = {
  title: "Canales de Contacto y Atención | Finanzas Contigo",
  description:
    "Comunícate con nuestros asesores financieros. Canales de atención presencial, telefónica y formulario en línea.",
};

export default async function ContactoPage() {
  const institution = await getInstitutionInfo();

  return (
    <div className="py-12 lg:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Encabezado */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-bank-50 border border-bank-100 text-bank-700 text-xs font-semibold">
          <Headphones className="w-3.5 h-3.5" />
          <span>Atención al Cliente Centralizada</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
          Estamos para ayudarte
        </h1>
        <p className="text-base sm:text-lg text-slate-600">
          Contáctanos por nuestros canales de atención o diligencia el formulario y te responderemos pronto.
        </p>
      </div>

      {/* Grid Pantalla 5: Canales a la izquierda y Formulario a la derecha */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* TARJETA AZUL CORPORATIVA DE CANALES DE ATENCIÓN (Pantalla 5 del prototipo) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-bank-900 via-bank-800 to-bank-950 text-white rounded-3xl p-8 sm:p-10 shadow-xl space-y-8 relative overflow-hidden">
          
          <div className="space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-bank-300">
              Canales Directos
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Finanzas Contigo
            </h2>
            <p className="text-sm text-bank-100 leading-relaxed">
              Nuestros asesores están disponibles para resolver tus dudas sobre simulaciones, requisitos y apertura de productos financieros.
            </p>
          </div>

          <div className="space-y-6 text-sm text-bank-100">
            
            {/* Dirección */}
            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-bank-700/60 text-bank-300 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-bank-300 block">
                  Dirección
                </span>
                <span className="text-white font-medium text-base">
                  {institution.contacto.direccion}
                </span>
                <span className="block text-xs text-bank-200 mt-0.5">
                  {institution.contacto.ciudad}
                </span>
              </div>
            </div>

            {/* Teléfono */}
            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-bank-700/60 text-bank-300 shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-bank-300 block">
                  Teléfono
                </span>
                <span className="text-white font-medium text-base">
                  {institution.contacto.telefono}
                </span>
                <span className="block text-xs text-bank-200 mt-0.5">
                  Línea Gratuita: {institution.contacto.lineaNacional}
                </span>
              </div>
            </div>

            {/* Correo electrónico */}
            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-bank-700/60 text-bank-300 shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-bank-300 block">
                  Correo electrónico
                </span>
                <span className="text-white font-medium text-base break-all">
                  {institution.contacto.correo}
                </span>
              </div>
            </div>

            {/* Horario de atención */}
            <div className="flex items-start gap-4 pt-2 border-t border-bank-700/60">
              <div className="p-2.5 rounded-xl bg-bank-700/60 text-bank-300 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-bank-300 block">
                  Horario de atención
                </span>
                <span className="text-white text-sm block">
                  {institution.contacto.horarios.lunesViernes}
                </span>
                <span className="text-bank-200 text-sm block">
                  {institution.contacto.horarios.sabados}
                </span>
              </div>
            </div>

          </div>

          <div className="pt-4 border-t border-bank-800 text-xs text-bank-300 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-bank-400" />
            <span>Red de oficinas y canales virtuales certificados</span>
          </div>

        </div>

        {/* FORMULARIO DE ENVÍO DE MENSAJE (Pantalla 5 del prototipo) */}
        <div className="lg:col-span-7">
          <Suspense fallback={<div className="p-12 text-center text-slate-500">Cargando formulario...</div>}>
            <ContactForm />
          </Suspense>
        </div>

      </div>

    </div>
  );
}
