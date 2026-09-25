import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Finanzas Contigo | Sistema de Gestión Bancaria",
  description:
    "Sistema de información centralizado para consulta de productos financieros y simulación en tiempo real de créditos y Certificados de Depósito a Término (CDT).",
  keywords: ["Finanzas Contigo", "Simulador de Crédito", "Simulador CDT", "Gestión Bancaria", "SENA EV9"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full">
      <body className={`${inter.className} flex flex-col min-h-full`}>
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
