export interface ProductoFinanciero {
  id: string;
  nombre: string;
  categoria: "credito" | "inversion" | "ahorro";
  descripcion: string;
  detalles: string;
  tasaReferencialEA: number;
  plazoMinMeses: number;
  plazoMaxMeses: number;
  montoMinimo: number;
  montoMaximo: number;
  icono: string;
  beneficios: string[];
  requisitos: string[];
}
